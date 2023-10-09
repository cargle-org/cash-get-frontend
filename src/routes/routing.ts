/* eslint-disable @typescript-eslint/ban-ts-comment */
import { generatePath } from "react-router-dom";

export type Links = "ROOT" | "AUTH" | "DASHBOARD" | "ERROR";

export const LINKS: Record<Links, Links> = {
  ROOT: "ROOT",
  AUTH: "AUTH",
  DASHBOARD: "DASHBOARD",
  ERROR: "ERROR",
};
// Can be potentially made even smarter:
// see https://www.smashingmagazine.com/2021/01/dynamic-static-typing-typescript/

type Route<Params = void> = {
  path: string;
  link: Params extends void ? () => string : () => string;
  section: Links;
};

function createRoute<Params = void>(path: string, section: Links): Route<Params> {
  return {
    path,
    section,
    // @ts-ignore
    link: (params?: Params) => generatePath(path, params ?? {}),
  };
}

// prettier-ignore
const routes = {
    root: createRoute('/', LINKS.ROOT),
    /** Auth Routes */
    auth : createRoute('auth', LINKS.AUTH),
    signIn : createRoute('sign-in', LINKS.AUTH),
    logout : createRoute('logout', LINKS.AUTH),
    /** Dashboard Routes */
    dashboard : createRoute('dashboard', LINKS.DASHBOARD),
    dashbaordAgent : createRoute('agent', LINKS.DASHBOARD),
    dashboardShop : createRoute('shop', LINKS.DASHBOARD),
    dashboardOrder : createRoute('order', LINKS.DASHBOARD),
    dashboardCreateOrder : createRoute('create-order', LINKS.DASHBOARD),
    dashboardActiveOrders : createRoute('active', LINKS.DASHBOARD),
    dashboardOpenOrders : createRoute('open', LINKS.DASHBOARD),
    dashboardCompletedOrders : createRoute('completed', LINKS.DASHBOARD),
    dashboardSingleOrders : createRoute('single', LINKS.DASHBOARD),

    /** Not Found  */
    404: createRoute('/404', LINKS.ERROR),
} as const;

type RouteId = keyof typeof routes;

// Use with <Route /> or <Page />
// @ts-ignore
export const pathTo: Record<RouteId, string> = Object.fromEntries(Object.entries(routes).map(([id, route]) => [id, route.path]));

// Use with <RouterLink />
// @ts-ignore
export const linkTo: {
  [R in RouteId]: (typeof routes)[R]["link"];
} = Object.keys(routes).reduce((acc, key) => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  acc[key] = routes[key].link;
  return acc;
}, {});

export const sectionOf: Record<string, Links> = Object.fromEntries(Object.entries(routes).map(([, route]) => [route.path, route.section]));
