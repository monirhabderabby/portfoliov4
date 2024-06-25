import AdminProvider from "@/provider/admin-provider";
import { ReactNode } from "react";
import DashBoardNavbar from "./_components/dash-navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-white">
        <DashBoardNavbar />
        <main className="container">{children}</main>
      </div>
    </AdminProvider>
  );
}
