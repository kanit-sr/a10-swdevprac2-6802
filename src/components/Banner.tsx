"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./banner.module.css";

const bannerImages = [
  "/img/cover.jpg",
  "/img/cover2.jpg",
  "/img/cover3.jpg",
  "/img/cover4.jpg",
];

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  const handleBannerClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const handleSelectVenueClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push("/venue");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .welcome-message {
          position: absolute;
          top: 20px;
          right: 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(6px);
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <div className={styles.banner} onClick={handleBannerClick}>
        <Image
          src={bannerImages[currentImageIndex]}
          alt="Venue banner background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className={styles.overlay} />

        {session && (
          <div className="welcome-message">
            Welcome {session.user?.name}
          </div>
        )}

        <div className={styles.content}>
          <h1 className={styles.tagline}>where every event finds its venue</h1>
        </div>
        <button className={styles.selectVenueButton} onClick={handleSelectVenueClick}>
          Select Venue
        </button>
      </div>
    </>
  );
}