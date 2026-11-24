import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CookieBanner } from "@/components/titans/CookieBanner";
import { SITE } from "@/config/site";

describe("banner de cookies", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
  });

  it("fica oculto quando GA4_ID e META_PIXEL_ID estão vazios", async () => {
    expect(SITE.GA4_ID).toBe("");
    expect(SITE.META_PIXEL_ID).toBe("");

    await act(async () => root.render(<CookieBanner />));

    expect(container.querySelector('[role="region"][aria-label="Aviso de cookies"]')).toBeNull();
  });
});
