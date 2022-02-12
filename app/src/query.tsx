import { useHistory, useLocation } from "react-router";

export type QueryParam = string[] | string | undefined;

export const toBoolean = (param: QueryParam): boolean | undefined =>
  typeof param === "string" ? param === "true" : undefined;
export const toString = (param: QueryParam): string | undefined =>
  typeof param === "string" ? param : undefined;
export const toInteger = (param: QueryParam): number | undefined =>
  typeof param === "string" ? parseInt(param) : undefined;

export type Query = Record<string, QueryParam>;
export function createQuery(search: string): Query {
  const params = new URLSearchParams(search);
  const query: Query = {};
  for (const [key, value] of Array.from(params.entries())) {
    const current = query[key];
    switch (typeof current) {
      case "undefined":
        query[key] = value;
        break;
      case "string":
        query[key] = [current, value];
        break;
      default:
        current.push(value);
    }
  }
  return query;
}

export function makeSearch(params?: Query): string {
  const p = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    switch (typeof v) {
      case "string":
        p.set(k, v);
        break;
      case "object":
        v.forEach((entry) => p.append(k, entry));
        break;
    }
  });
  const search = p.toString();
  return search.length > 0 ? `?${search}` : "";
}

export function useQuery<T extends Query = Query>(): T {
  const location = useLocation();
  return createQuery(location.search) as T;
}

export interface Route {
  replaceQuery: (params: Query) => void;
  changePath: (path: string, params?: Query) => void;
}

export function useRoute(): Route {
  const { pathname } = useLocation();
  const history = useHistory();
  return {
    replaceQuery: (params) =>
      history.replace({ pathname, search: makeSearch(params) }),
    changePath: (path, params) => {
      history.push({ pathname: path, search: makeSearch(params) });
    },
  };
}
