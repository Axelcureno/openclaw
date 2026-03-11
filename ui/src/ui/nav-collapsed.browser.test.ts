import "../styles.css";
import { describe, expect, it } from "vitest";
import { mountApp, registerAppMountHooks } from "./test-helpers/app-mount.ts";

registerAppMountHooks();

describe("collapsed nav rail", () => {
  it("keeps a reserved icon rail with centered actions instead of collapsing to zero width", async () => {
    localStorage.setItem(
      "openclaw.control.settings.v1",
      JSON.stringify({
        gatewayUrl: "ws://127.0.0.1:18789",
        sessionKey: "main",
        lastActiveSessionKey: "main",
        theme: "claw",
        themeMode: "system",
        chatFocusMode: false,
        chatShowThinking: true,
        splitRatio: 0.6,
        navCollapsed: true,
        navWidth: 220,
        navGroupsCollapsed: {},
      }),
    );

    const app = mountApp("/chat");
    await app.updateComplete;

    const shell = app.querySelector<HTMLElement>(".shell");
    const rail = app.querySelector<HTMLElement>(".sidebar");
    const toggle = app.querySelector<HTMLElement>(".nav-collapse-toggle");
    const navItem = app.querySelector<HTMLAnchorElement>('a.nav-item[href="/chat"]');

    expect(shell).not.toBeNull();
    expect(rail).not.toBeNull();
    expect(toggle).not.toBeNull();
    expect(navItem).not.toBeNull();
    expect(shell!.classList.contains("shell--nav-collapsed")).toBe(true);
    expect(getComputedStyle(navItem!).justifyContent).toBe("center");
    expect(toggle!.getBoundingClientRect().width).toBeGreaterThan(40);
    expect(toggle!.getBoundingClientRect().width).toBeLessThan(48);
    expect(navItem!.getBoundingClientRect().width).toBeGreaterThan(40);
    expect(navItem!.getBoundingClientRect().width).toBeLessThan(48);
    expect(app.querySelector(".nav-item__text")).toBeNull();
  });
});
