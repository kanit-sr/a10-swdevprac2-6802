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
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/75 px-6 py-10 text-center text-slate-700 shadow-sm backdrop-blur-sm">
        <p className="text-lg font-semibold">No Venue Booking</p>
        <p className="mt-1 text-sm text-slate-500">
          Start by making a reservation from the booking page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {bookItems.map((booking) => (
        <div
          key={`${booking.tel}-${booking.venue}-${booking.bookDate}`}
          className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-slate-900">{booking.nameLastname}</p>
              <p className="text-sm text-slate-500">{booking.tel}</p>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium tracking-wide text-white">
              {booking.venue}
            </span>
          </div>

          <div className="mb-4 rounded-xl bg-slate-100/80 px-3 py-2 text-sm text-slate-700">
            Reserve Date: <span className="font-semibold">{booking.bookDate}</span>
          </div>

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => dispatch(removeBooking(booking))}
            sx={{ borderRadius: "999px", textTransform: "none", fontWeight: 600 }}
          >
            Cancel Booking
          </Button>
        </div>
      ))}
    </div>
  );
}