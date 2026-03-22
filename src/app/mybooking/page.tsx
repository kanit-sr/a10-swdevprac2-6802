import BookingList from "@/components/BookingList";

export default function MyBookingPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Booking</h1>
      <BookingList />
    </main>
  );
}
