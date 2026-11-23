import type { Service } from "./types";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** A service. The slug drives its key cut shape and the ?service= link. */
export const svc = (title: string, description: string): Service => ({ title, description, slug: slugify(title) });
