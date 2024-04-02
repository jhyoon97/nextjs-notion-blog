import { atom } from "jotai";

import type { TableOfContentsInterface } from "@/types/app";

export const tableOfContentsAtom = atom<TableOfContentsInterface>([]);
