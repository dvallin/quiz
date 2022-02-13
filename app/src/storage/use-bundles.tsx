import useSWR, { SWRResponse } from "swr";
import { Bundle } from "../model/bundle";
import { fetchJson } from "./fetch-json";

export function useBundles(): SWRResponse<Bundle[], Error> {
  return useSWR("bundles", () => fetchJson("/assets/data/bundles.json"));
}
