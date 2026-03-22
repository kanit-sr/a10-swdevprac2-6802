"use client";

import { useSelector } from "react-redux";

type BookingItem = {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
};

type RootState = {
  bookSlice: {
    bookItems: BookingItem[];
  };
};

export default function BookingList() {
  const bookItems = useSelector((state: RootState) => state.bookSlice.bookItems);

  if (!bookItems.length) {
    return <div>No booking</div>;
  }

  return (
    <div>
      {bookItems.map((booking) => (
        <div key={`${booking.tel}-${booking.venue}-${booking.bookDate}`}>
          <p>{booking.nameLastname}</p>
          <p>{booking.venue}</p>
          <p>{booking.bookDate}</p>
        </div>
      ))}
    </div>
  );
}