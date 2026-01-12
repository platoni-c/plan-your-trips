import SideBar from "@/app/components/SideBar";
import MobileHeader from "@/app/components/MobileHeader";
import MobileNav from "@/app/components/MobileNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row h-full bg-(--bg-page)">
      <MobileHeader />
      <div className="min-w-xs shrink-0 hidden md:block">
        <SideBar />
      </div>
      <div className="flex-1 pb-20 md:pb-0">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
