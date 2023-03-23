import { createRoot } from "react-dom/client";
import "./index.scss";
import { Router } from "./Router";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
root.render(<Router />);
