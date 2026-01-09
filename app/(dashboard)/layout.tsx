import SideBar from "@/app/components/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full bg-(--bg-page)">
      <div className="min-w-xs shrink-0 hidden md:block">
        <SideBar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
