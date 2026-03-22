import Link from "next/link";

interface TopMenuItemProps {
    title: string;
    pageRef: string;
}


export default function TopMenuItem({ title, pageRef }: TopMenuItemProps) {
    return (
        <Link
            href={pageRef}
            className="
            relative px-1 py-2
            text-sm font-medium text-gray-600
            transition-colors duration-200
            hover:text-gray-900
            after:absolute after:left-0 after:-bottom-0.5
            after:h-[2px] after:w-0
            after:bg-gray-900
            after:transition-all after:duration-300
            hover:after:w-full
            "
        >
            {title}
        </Link>
    );
}