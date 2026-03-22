import Image from "next/image";
import { notFound } from "next/navigation";
import getVenue from "@/libs/getVenue";

export const dynamic = "force-dynamic";

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const resolvedParams = await params;
  const venueJson = await getVenue(resolvedParams.vid);
  const venue = venueJson.data;

  if (!venue) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDF2FB] px-6 py-16 font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .venue-card { font-family: 'DM Sans', sans-serif; }
        .venue-title { font-family: 'Playfair Display', serif; }

        .venue-image-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(10, 25, 60, 0.65) 100%
          );
        }

        .detail-row {
          display: flex;
          gap: 8px;
          align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid rgba(100, 140, 210, 0.2);
        }
        .detail-row:last-child { border-bottom: none; }
        .detail-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6B8FBF;
          white-space: nowrap;
          min-width: 120px;
        }
        .detail-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: #1A2C4E;
        }

        .price-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1A3A6B;
          color: #EDF5FF;
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          padding: 14px 36px;
          border-radius: 999px;
        }
        .price-pill span {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #89B4E8;
          margin-left: 2px;
        }

      `}</style>

      <div
        className="venue-card w-full max-w-4xl overflow-hidden rounded-3xl bg-[#F7FAFF]"
        style={{ boxShadow: "0 24px 60px rgba(20,60,130,0.15), 0 4px 16px rgba(20,60,130,0.08)" }}
      >
        {/* Image */}
        <div className="venue-image-wrap venue-image relative h-[560px] w-full overflow-hidden">
          <Image
            src={venue.picture}
            alt={venue.name}
            fill
            className="object-cover"
            draggable={false}
            priority
          />
          <div className="badge absolute bottom-4 left-4 z-10">
            <div
              className="rounded-full px-3 py-1 text-xs font-medium tracking-widest uppercase text-[#EDF5FF]"
              style={{
                background: "rgba(100,160,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(150,200,255,0.35)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Venue
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="card-body px-10 py-8 space-y-6">
          <h1 className="venue-title text-4xl font-semibold leading-tight text-[#0F2248]">
            {venue.name}
          </h1>

          <div>
            {[
              { label: "Address",     value: venue.address },
              { label: "Province",    value: venue.province },
              { label: "Postal Code", value: venue.postalcode },
              { label: "Tel",         value: venue.tel },
            ].map(({ label, value }) => (
              <div className="detail-row" key={label}>
                <span className="detail-label">{label}</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="pt-1 flex justify-center">
            <div className="price-pill">
              ฿ {venue.dailyrate}
              <span>/ day</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}