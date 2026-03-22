"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { removeBooking } from "@/redux/features/bookSlice";
import type { AppDispatch, RootState } from "@/redux/store";

type BookingItem = {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
};

export default function BookingList() {
  const dispatch = useDispatch<AppDispatch>();
  const bookItems = useSelector((state: RootState) => state.bookSlice.bookItems);

  if (!bookItems.length) {
    return <div>No Venue Booking</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      {bookItems.map((booking) => (
        <div
          key={`${booking.tel}-${booking.venue}-${booking.bookDate}`}
          className="rounded-lg border border-gray-200 p-4"
        >
          <p>{booking.nameLastname}</p>
          <p>{booking.tel}</p>
          <p>{booking.venue}</p>
          <p>{booking.bookDate}</p>
          <Button
            variant="outlined"
            size="small"
            onClick={() => dispatch(removeBooking(booking))}
          >
            Cancel Booking
          </Button>
        </div>
      ))}
    </div>
  );
}