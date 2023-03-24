import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSharedState } from "../hooks/useSharedState";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: Props) {
  const [state, setState] = useSharedState();

  return (
    <Modal show={open} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col xs={2}>Background color</Col>
          <Col xs={4}>
            <Form.Control
              type="color"
              value={state.backgroundColor}
              onChange={(e) =>
                setState((cur) => ({ ...cur, backgroundColor: e.target.value }))
              }
            />
          </Col>
        </Row>

        {state.sites.map((site, siteIndex) => (
          <Row key={siteIndex} className="mb-3">
            <Col xs={2}>
              <Form.Control
                type="text"
                id={`site-name-${siteIndex}`}
                placeholder="Name"
                value={site.name}
                onChange={(e) => {
                  const sites = [...state.sites];
                  sites[siteIndex].name = e.target.value;
                  setState((cur) => ({ ...cur, sites }));
                }}
              />
            </Col>
            <Col xs={4}>
              <Form.Control
                type="text"
                id={`site-controller-url-${siteIndex}`}
                placeholder="Controller URL"
                value={site.controllerUrl}
                onChange={(e) => {
                  const sites = [...state.sites];
                  sites[siteIndex].controllerUrl = e.target.value;
                  setState((cur) => ({ ...cur, sites }));
                }}
              />
            </Col>
            <Col xs={4}>
              <Form.Control
                type="text"
                id={`site-display-url-${siteIndex}`}
                placeholder="Display URL"
                value={site.displayUrl}
                onChange={(e) => {
                  const sites = [...state.sites];
                  sites[siteIndex].displayUrl = e.target.value;
                  setState((cur) => ({ ...cur, sites }));
                }}
              />
            </Col>
            <Col xs={2}>
              <Button
                variant="danger"
                onClick={() => {
                  const sites = [...state.sites];
                  sites.splice(siteIndex, 1);
                  setState((cur) => ({ ...cur, sites }));
                }}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        <Button
          onClick={() =>
            setState((cur) => ({
              ...cur,
              sites: [
                ...cur.sites,
                { name: "", controllerUrl: "", displayUrl: "" },
              ],
            }))
          }
        >
          Add site
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
