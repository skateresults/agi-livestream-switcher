import { useSharedState } from "./hooks/useSharedState";

export function Display() {
  const [state] = useSharedState();
  return (
    <>
      {state.sites.map((site, siteIndex) => (
        <iframe
          key={siteIndex}
          src={site.displayUrl}
          title={site.name}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: state.currentSiteIndex === siteIndex ? "block" : "none",
          }}
        />
      ))}
    </>
  );
}
