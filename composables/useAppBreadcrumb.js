import menu from "~/navigation/index.js";

// Root of the MYDS breadcrumb trail.
const HOME = { label: "Utama", path: "/dashboard" };

function normalize(path) {
  if (!path) return "";
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

// "pengurusan-kontrak" -> "Pengurusan Kontrak", "lihatVesel" -> "Lihat Vesel"
function humanize(segment) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Flatten navigation/index.js into: normalized path -> trail of crumbs.
// Group nodes without a path stay in the trail as non-clickable labels;
// the ALL-CAPS section headers are skipped to keep the trail compact.
function buildIndex(nodes, ancestors, index) {
  for (const node of nodes || []) {
    if (!node) continue;

    if (!node.title) {
      buildIndex(node.child, ancestors, index);
      continue;
    }

    const trail = [...ancestors, { label: node.title, path: node.path || null }];

    if (node.path) index.set(normalize(node.path), trail);
    if (node.child && node.child.length) buildIndex(node.child, trail, index);
  }
}

let cachedIndex = null;

function navIndex() {
  if (!cachedIndex) {
    cachedIndex = new Map();
    buildIndex(menu, [], cachedIndex);
  }
  return cachedIndex;
}

/**
 * Derives the MYDS breadcrumb trail and page title for the current route.
 *
 * Resolution order:
 *  1. exact match in the sidebar navigation tree
 *  2. longest navigation path that prefixes the route (detail pages), with the
 *     remaining segments humanized
 *  3. humanized route segments
 *
 * Dynamic-segment values (route params) and the `/new/` folder artifact are
 * dropped so URLs like /new/lihatVesel/KM%20SIANGIN read as "Lihat Vesel".
 */
export function useAppBreadcrumb() {
  const route = useRoute();

  // A page may name its own leaf crumb with
  // definePageMeta({ breadcrumb: "..." }) — used by detail routes that are not
  // in the sidebar navigation.
  const override = computed(() => route.meta?.breadcrumb || null);

  const items = computed(() => {
    const index = navIndex();
    const current = normalize(route.path);

    const withOverride = (trail) => {
      if (!override.value) return trail;
      const parents = trail.slice(0, -1);
      return [...parents, { label: override.value, path: null }];
    };

    if (index.has(current)) return withOverride(index.get(current));

    const paramValues = new Set(
      Object.values(route.params || {})
        .flat()
        .map((value) => String(value))
    );

    const extras = (segments) =>
      segments
        .filter(Boolean)
        .filter((segment) => segment !== "new")
        .filter((segment) => !paramValues.has(segment))
        .map((segment) => ({ label: humanize(segment), path: null }));

    let bestPath = null;
    for (const path of index.keys()) {
      if (path === "/") continue;
      if (!current.startsWith(path + "/")) continue;
      if (!bestPath || path.length > bestPath.length) bestPath = path;
    }

    if (bestPath) {
      const rest = current.slice(bestPath.length).split("/");
      return withOverride([...index.get(bestPath), ...extras(rest)]);
    }

    return withOverride(extras(current.split("/")));
  });

  const title = computed(() => {
    const trail = items.value;
    if (trail.length) return trail[trail.length - 1].label;
    return route.meta?.title || "";
  });

  return { home: HOME, items, title };
}
