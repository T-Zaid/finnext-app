import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex h-screen w-full font-inter">
            <Sidebar user={{firstName : "Tiger"}} />
            {children}
        </main>
    );
}
