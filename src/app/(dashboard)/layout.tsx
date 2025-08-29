import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import "../globals.css";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="">
        <DashboardSidebar />
      </div>
      <div className="w-full bg-[#F4F4F4]">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
