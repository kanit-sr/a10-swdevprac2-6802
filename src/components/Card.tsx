"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import InteractiveCard from "@/components/InteractiveCard";

interface CardProps {
  venueName?: string;
  imgSrc?: string;
  href?: string;
  rating?: number;
  onRatingChange?: (rating: number) => void;
}

export default function Card({
  venueName = "The Bloom Pavilion",
  imgSrc = "/img/bloom.jpg",
  href,
  rating: initialRating,
  onRatingChange,
}: CardProps) {
  const [rating, setRating] = useState<number | null>(initialRating ?? 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .venue-card-outer {
          border-radius: 20px;
          overflow: hidden;
          background: #F7FAFF;
          box-shadow: 0 8px 32px rgba(20,60,130,0.10), 0 2px 8px rgba(20,60,130,0.06);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .venue-card-outer:hover {
          box-shadow: 0 16px 48px rgba(20,60,130,0.16), 0 4px 16px rgba(20,60,130,0.10);
          transform: translateY(-3px);
        }

        .venue-card-image-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }
        .venue-card-image-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 45%, rgba(10,25,60,0.55) 100%);
        }

        .venue-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 600;
          color: #0F2248;
          line-height: 1.3;
        }

        .venue-card-rating-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #6B8FBF;
          font-weight: 500;
        }

        .venue-card-divider {
          height: 1px;
          background: rgba(100,140,210,0.2);
          margin: 0 16px;
        }

        .venue-card-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          z-index: 10;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #EDF5FF;
          background: rgba(100,160,255,0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(150,200,255,0.35);
          padding: 4px 12px;
          border-radius: 999px;
        }

        .mui-rating-blue .MuiRating-iconFilled {
          color: #1A3A6B;
        }
        .mui-rating-blue .MuiRating-iconHover {
          color: #2E5FA3;
        }
        .mui-rating-blue .MuiRating-iconEmpty {
          color: rgba(100,140,210,0.35);
        }
      `}</style>

      <InteractiveCard>
        <div className="venue-card-outer">
          <Link href={href ?? "#"} className="block">
            {/* Image */}
            <div className="venue-card-image-wrap">
              <Image
                src={imgSrc}
                alt={venueName}
                fill
                className="object-cover"
                draggable={false}
              />
              <div className="venue-card-badge">Venue</div>
            </div>

            {/* Name + rating value */}
            <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3">
              <h2 className="venue-card-name">{venueName}</h2>
              {initialRating !== undefined && (
                <span className="venue-card-rating-value mt-1 shrink-0">
                  {rating?.toFixed(1)} / 5
                </span>
              )}
            </div>
          </Link>

          {/* Star rating */}
          {initialRating !== undefined && (
            <>
              <div className="venue-card-divider" />
              <div className="px-5 py-3 mui-rating-blue">
                <Rating
                  id={`${venueName} Rating`}
                  name={`${venueName} Rating`}
                  data-testid={`${venueName} Rating`}
                  value={rating}
                  onChange={(_, newValue) => {
                    const nextRating = newValue ?? 0;
                    setRating(nextRating);
                    onRatingChange?.(nextRating);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </InteractiveCard>
    </>
  );
}