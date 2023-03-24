import { useSharedState } from "./hooks/useSharedState";

export function Display() {
  const [state] = useSharedState();

  return (
    <>
      {!state.visible && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: state.backgroundColor,
          }}
        />
      )}

      {state.sites.map((site, siteIndex) => (
        <iframe
          key={siteIndex}
          src={site.displayUrl}
          title={site.name}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display:
              state.visible && state.currentSiteIndex === siteIndex
                ? "block"
                : "none",
          }}
        />
      ))}
    </>
  );
}
