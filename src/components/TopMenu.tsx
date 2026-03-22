import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full bg-[#37353e]/95 backdrop-blur-md border-b border-[#d3dad9]/10 shadow-md sticky top-0 z-50">
      <nav className="w-full h-16 flex items-center justify-between" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>

        <div className="flex items-center">
          {session ? (
            <Link href="/api/auth/signout" className="text-sm font-medium text-[#d3dad9]/70 hover:text-[#d3dad9] transition-colors duration-200">
              Sign-Out
            </Link>
          ) : (
            <Link href="/api/auth/signin" className="text-sm font-medium text-[#d3dad9]/70 hover:text-[#d3dad9] transition-colors duration-200">
              Sign-In
            </Link>
          )}
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <TopMenuItem title="Booking" pageRef="/booking" />
          </div>

          <div className="flex items-center gap-2 pl-8 border-l border-[#d3dad9]/20">
            <div className="rounded-full overflow-hidden ring-2 ring-[#d3dad9]/20 shadow-sm hover:ring-[#d3dad9]/50 transition-all duration-200">
              <Image
                src="/img/logo.png"
                alt="Venue Explorer Logo"
                width={36}
                height={36}
                priority
                className="transition-transform duration-200 hover:scale-110"
              />
            </div>
            <span className="text-base font-bold text-[#d3dad9] tracking-widest uppercase select-none">
              Venue Explorer
            </span>
          </div>
        </div>

      </nav>
    </header>
  );
}