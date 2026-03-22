import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";

export const dynamic = "force-dynamic";

export default async function VenuePage() {
  const venues = getVenues();

  return (
    <main>
      <VenueCatalog venuesJson={venues} />
    </main>
  );
}
