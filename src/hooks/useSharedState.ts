import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DEFAULT_SHARED_STATE } from "../constants";
import { SharedState } from "../types";

type ReturnValue = [SharedState, Dispatch<SetStateAction<SharedState>>];

const STORAGE_KEY = "shared-state";
const emitter = new EventTarget();

export function useSharedState(): ReturnValue {
  const [state, setState] = useState(readItem);

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) {
        return;
      }

      setState(readItem());
    };

    addEventListener("storage", listener);
    return () => removeEventListener("storage", listener);
  }, []);

  useEffect(() => {
    const listener = () => setState(readItem());
    emitter.addEventListener("change", listener);
    return () => emitter.removeEventListener("change", listener);
  }, []);

  const updateState: Dispatch<SetStateAction<SharedState>> = useCallback(
    (actionOrState) => {
      if (typeof actionOrState === "function") {
        const newState = actionOrState(state);
        writeItem(newState);
      } else {
        writeItem(actionOrState);
      }
      emitter.dispatchEvent(new Event("change"));
    },
    [state],
  );

  return [state, updateState];
}

function readItem(): SharedState {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (!rawData) {
    return DEFAULT_SHARED_STATE;
  }
  try {
    const data = JSON.parse(rawData);
    return {
      ...DEFAULT_SHARED_STATE,
      ...data,
    };
  } catch {
    return DEFAULT_SHARED_STATE;
  }
}

function writeItem(state: SharedState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
