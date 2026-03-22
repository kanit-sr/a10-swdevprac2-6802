import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookingItem = {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
};

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = {
  bookItems: [],
};

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const nextBooking = action.payload;

      // Keep one booking per venue/date; newer booking replaces older one.
      const existingIndex = state.bookItems.findIndex(
        (item) =>
          item.venue === nextBooking.venue && item.bookDate === nextBooking.bookDate
      );

      if (existingIndex >= 0) {
        state.bookItems[existingIndex] = nextBooking;
        return;
      }

      state.bookItems.push(nextBooking);
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      const bookingToRemove = action.payload;
      state.bookItems = state.bookItems.filter(
        (item) =>
          !(
            item.nameLastname === bookingToRemove.nameLastname &&
            item.tel === bookingToRemove.tel &&
            item.venue === bookingToRemove.venue &&
            item.bookDate === bookingToRemove.bookDate
          )
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;

export default bookSlice.reducer;