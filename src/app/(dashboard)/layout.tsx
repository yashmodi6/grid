// app/(dashboard)/layout.tsx
import type {ReactNode} from "react";
import {AppSidebar} from "@/widgets/sidebar";
import {SidebarInset, SidebarProvider} from "@/shared/ui/sidebar";
import {DashboardHeader} from "@/widgets/dashboard-header";

export default async function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
