type SerpApiImageResult = {
  thumbnail?: string;
  original?: string;
};

type SerpApiResponse = {
  images_results?: SerpApiImageResult[];
};

const imageCache = new Map<string, string>();

export async function fetchProductImage(query: string): Promise<string | null> {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return null;
  }

  const cached = imageCache.get(normalizedQuery);
  if (cached) {
    return cached;
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return null;
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_images");
  url.searchParams.set("q", query);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("safe", "active");
  url.searchParams.set("num", "1");

  const response = await fetch(url.toString());
  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as SerpApiResponse;
  const firstImage = data.images_results?.[0];
  const imageUrl = firstImage?.thumbnail || firstImage?.original || null;

  if (imageUrl) {
    imageCache.set(normalizedQuery, imageUrl);
  }

  return imageUrl;
}
