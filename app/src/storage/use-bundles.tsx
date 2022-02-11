import useSWR from "swr";
import { Bundle } from "../model/bundle";

const staticBundles: Bundle[] = [
  { id: "HP1", name: "Harry Potter - 1 Philosopher’s Stone" },
  { id: "HP2", name: "Harry Potter - 2 Chamber of Secrets" },
];

export function useBundles() {
  return useSWR("bundles", () => staticBundles);
}
