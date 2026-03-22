import { VenueByIdJson } from "../../interface";

export default async function getVenue(vid: string): Promise<VenueByIdJson> {
  const endpoints = [
    "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
    "https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues",
    "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues",
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${endpoint}/${vid}`, { cache: "no-store" });
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Try the next backend endpoint.
    }
  }

  throw new Error("Failed to fetch venue");
}