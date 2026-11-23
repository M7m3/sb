import { locksmith } from "./locksmith";
import { automotive } from "./automotive";
import type { Side } from "./site";
import type { SideContent } from "./types";

export const sideContent: Record<Side, SideContent> = { locksmith, automotive };
