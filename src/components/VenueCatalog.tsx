import { VenueJson, VenueItem } from "../../interface";
import Card from "./Card";

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson>;
}) {
  const venues = await venuesJson;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .catalog-wrap {
          background: #EDF2FB;
          min-height: 100vh;
          padding: 48px 24px;
        }

        .catalog-header {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 600;
          color: #0F2248;
          margin-bottom: 8px;
        }

        .catalog-subheader {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #6B8FBF;
          letter-spacing: 0.04em;
          margin-bottom: 32px;
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
      `}</style>

      <div className="catalog-wrap">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 className="catalog-header">Venues</h1>
          <p className="catalog-subheader">Browse available spaces for your event</p>
        </div>

        <div className="catalog-grid">
          {venues.data.slice(0, 3).map((item: VenueItem) => (
            <Card
              key={item.id}
              venueName={item.name}
              imgSrc={item.picture}
              href={`/venue/${item.id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}