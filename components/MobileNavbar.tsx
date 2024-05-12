'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavbar = ({ user }: MobileNavProps) => {
    const pathName = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image src='/icons/hamburger.svg' width={30} height={30} alt="menu" className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="border-none bg-white">
                    <Link href='/' className="mb-12 cursor-pointer items-center gap-1 px-4 flex">
                        <Image src='/icons/logo.svg' width={34} height={34} alt='FinNext Logo' />
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">FinNext</h1>
                    </Link>

                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`)
                                    return (
                                        <SheetClose asChild key={link.label}>
                                            <Link href={link.route} key={link.label} className={cn('mobilenav-sheet_close w-full', { 'bg-bankGradient': isActive })}>
                                                <Image src={link.imgURL} alt={link.label} height={20} width={20} className={cn({ 'brightness-[3] invert-0': isActive })} />
                                                <p className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </nav>
                        </SheetClose>
                    </div>

                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNavbar;