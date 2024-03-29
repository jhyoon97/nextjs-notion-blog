import { atomWithStorage } from "jotai/utils";

export const isDarkModeAtom = atomWithStorage("isDarkMode", true, undefined, {
  getOnInit: true,
});
