import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import "../globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
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
      <div className="w-full">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
