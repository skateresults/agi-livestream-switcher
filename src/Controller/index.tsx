import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { useSharedState } from "../hooks/useSharedState";
import { SettingsModal } from "./SettingsModal";

export function Controller() {
  const [state, setState] = useSharedState();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <>
      <Nav variant="tabs" className="align-items-center">
        {state.sites.map((site, siteIndex) => (
          <Nav.Item key={siteIndex}>
            <Nav.Link
              active={state.currentSiteIndex === siteIndex}
              onClick={() => {
                if (state.currentSiteIndex === siteIndex) {
                  return;
                }

                setState((cur) => ({
                  ...cur,
                  currentSiteIndex: siteIndex,
                  visible: false,
                }));
              }}
            >
              {site.name}
            </Nav.Link>
          </Nav.Item>
        ))}
        <Nav.Item>
          <Button
            size="sm"
            onClick={() => {
              setState((cur) => ({ ...cur, visible: !cur.visible }));
            }}
            className="ms-5"
            variant={state.visible ? "success" : "danger"}
          >
            {state.visible ? "Visible" : "Hidden"}
          </Button>
        </Nav.Item>

        <Button
          size="sm"
          href="/agi-livestream-switcher/#/display"
          target="_blank"
          className="ms-auto"
        >
          Display
        </Button>

        <Button
          onClick={() => setSettingsModalOpen(true)}
          size="sm"
          className="ms-1"
        >
          Settings
        </Button>
      </Nav>
      {state.sites.map((site, siteIndex) => (
        <iframe
          key={siteIndex}
          src={site.controllerUrl}
          title={site.name}
          style={{
            width: "100%",
            height: "calc(100% - 42px)",
            border: "none",
            display: state.currentSiteIndex === siteIndex ? "block" : "none",
          }}
        />
      ))}
      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </>
  );
}
