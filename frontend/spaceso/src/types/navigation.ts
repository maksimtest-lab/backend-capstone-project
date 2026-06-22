import type { Route } from "./route";

export type NavigationItem = Route;

export interface NavigationConfig {
    items: NavigationItem[];
}
