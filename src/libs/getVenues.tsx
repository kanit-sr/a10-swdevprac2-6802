import { VenueJson } from "../../interface";

export default async function getVenues(): Promise<VenueJson> {
  const endpoints = [
    "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
    "https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues",
    "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues",
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (res.ok) {
        return res.json();
      }
    } catch {
      // Try the next backend endpoint.
    }
  }

  throw new Error("fetch failed");
}