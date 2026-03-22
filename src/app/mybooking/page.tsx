import BookingList from "@/components/BookingList";

export default function MyBookingPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] px-4 py-10 sm:px-8 bg-[radial-gradient(circle_at_top_left,_#fde68a,_transparent_40%),radial-gradient(circle_at_top_right,_#bfdbfe,_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#e2e8f0)]">
      <section className="mx-auto w-full max-w-4xl">
        <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
            Reservation Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            My Booking
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Review upcoming venue reservations and cancel any slot you no longer need.
          </p>
        </div>

        <BookingList />
      </section>
    </main>
  );
}
