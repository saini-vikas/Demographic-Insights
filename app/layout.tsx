import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { MobileSidebarTrigger } from "./components/AppSidebar/MobileSidebarTrigger";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Demographic Insights",
  description: "A web application that provides insights into demographic data, allowing users to explore and analyze population trends, age distributions, and other relevant information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <body className="flex bg-[#f0f4f8]">
        <SidebarProvider>
          <TooltipProvider>
            <div className="fixed left-3 top-3  flex flex-row justify-center items-center gap-5 md:hidden">
              <MobileSidebarTrigger />
            </div>
            <AppSidebar />
            <main className="flex w-full h-full">
              {children}
            </main>
          </TooltipProvider>
        </SidebarProvider>
      </body>
    </html >
  );
}
