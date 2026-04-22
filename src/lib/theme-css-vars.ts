import type { SiteConfig } from "./site-config-schema";
import type { CSSProperties } from "react";

export function themeToCssVars(theme: SiteConfig["theme"]): CSSProperties {
  return {
    ["--color-bg" as string]: theme.background,
    ["--color-fg" as string]: theme.foreground,
    ["--color-muted-fg" as string]: theme.mutedFg,
    ["--color-accent" as string]: theme.accent,
    ["--color-accent-hover" as string]: theme.accentHover,
    ["--color-accent-soft" as string]: theme.accentSoft,
    ["--background" as string]: theme.background,
    ["--foreground" as string]: theme.foreground,
    ["--accent" as string]: theme.accent,
    ["--accent-hover" as string]: theme.accentHover,
  };
}
