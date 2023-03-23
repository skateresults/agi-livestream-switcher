export interface SharedState {
  sites: { name: string; controllerUrl: string; displayUrl: string }[];
  currentSiteIndex: number;
}
