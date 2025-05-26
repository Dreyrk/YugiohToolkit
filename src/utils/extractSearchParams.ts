export default function extractSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string | string[]> {
  const filters: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "edit") continue;

    if (typeof value !== "undefined") {
      filters[key] = value;
    }
  }

  return filters;
}

type CollectionFilterParams = {
  search?: string;
  types?: string[];
  onlyDuplicate?: boolean;
};

export function parseCollectionFilters(searchParams: Record<string, string | undefined>): CollectionFilterParams {
  const filters: CollectionFilterParams = {};

  const search = searchParams["search"];
  if (search) filters.search = search;

  const types = searchParams["types"];
  if (types) {
    filters.types = types
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  // Parse "onlyDuplicate"
  const onlyDuplicate = searchParams["onlyDuplicate"];
  if (onlyDuplicate !== undefined) {
    filters.onlyDuplicate = onlyDuplicate === "true";
  }

  return filters;
}
