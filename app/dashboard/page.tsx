import { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | NextAuth",
  description: "Dashboard page",
};

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </AuthProvider>
  );
}