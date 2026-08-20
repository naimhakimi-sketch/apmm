const STORAGE_KEY = "sidebarCollapsed";

/**
 * MYDS sidebar state.
 *
 * Two independent things, matching the MYDS shell:
 *  - `collapsed` (desktop): the rail state. The sidebar shrinks to an icon-only
 *    rail instead of disappearing. Persisted across reloads.
 *  - `mobileOpen` (below lg): the off-canvas drawer, which slides fully out of
 *    view and is always closed on first paint.
 */
export function useSidebar() {
  const collapsed = useState("myds-sidebar-collapsed", () => false);
  const mobileOpen = useState("myds-sidebar-mobile-open", () => false);

  function setCollapsed(value) {
    collapsed.value = value;
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    }
  }

  function toggleCollapsed() {
    setCollapsed(!collapsed.value);
  }

  // Used when a nested group is clicked while collapsed: MYDS expands the rail
  // first, then opens the group, rather than opening a submenu in a 5rem strip.
  function expand() {
    if (collapsed.value) setCollapsed(false);
  }

  function toggleMobile() {
    mobileOpen.value = !mobileOpen.value;
  }

  function closeMobile() {
    mobileOpen.value = false;
  }

  function restore() {
    if (process.client) {
      collapsed.value = localStorage.getItem(STORAGE_KEY) === "1";
    }
  }

  return {
    collapsed,
    mobileOpen,
    setCollapsed,
    toggleCollapsed,
    expand,
    toggleMobile,
    closeMobile,
    restore,
  };
}
