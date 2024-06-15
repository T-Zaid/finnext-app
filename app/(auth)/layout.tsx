import Image from "next/image";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex min-h-screen w-full font-inter justify-between">
            {children}
            <div className="auth-asset">
                <div>
                    <Image
                        src='icons/auth-image.svg'
                        alt='welcome image'
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </main>
    );
}
