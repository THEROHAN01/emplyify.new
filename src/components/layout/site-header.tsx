import { gccMenu, hireMenu, primaryNav } from "@/content/navigation";
import { ctas } from "@/content/site";
import { HeaderClient } from "./header";

/** Server wrapper: only the small nav arrays cross into the client bundle. */
export function SiteHeader() {
  return (
    <HeaderClient
      hireMenu={hireMenu}
      gccMenu={gccMenu}
      primaryNav={primaryNav}
      ctas={{ submitRole: ctas.submitRole, joinNetwork: ctas.joinNetwork }}
    />
  );
}
