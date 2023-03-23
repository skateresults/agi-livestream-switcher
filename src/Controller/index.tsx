import { useState } from "react";
import { Nav } from "react-bootstrap";
import { useSharedState } from "../hooks/useSharedState";
import { SettingsModal } from "./SettingsModal";

export function Controller() {
  const [state, setState] = useSharedState();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <>
      <Nav variant="tabs">
        {state.sites.map((site, siteIndex) => (
          <Nav.Item key={siteIndex}>
            <Nav.Link
              active={state.currentSiteIndex === siteIndex}
              onClick={() => {
                setState((cur) => ({ ...cur, currentSiteIndex: siteIndex }));
              }}
            >
              {site.name}
            </Nav.Link>
          </Nav.Item>
        ))}
        <Nav.Item className="ms-auto" >
          <Nav.Link href="/agi-livestream-switcher/display" target="_blank" active={false}>
            Display
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link onClick={() => setSettingsModalOpen(true)} active={false}>
            Settings
          </Nav.Link>
        </Nav.Item>
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
