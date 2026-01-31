// app/(dashboard)/layout.tsx
import type { ReactNode } from "react";
import { AppSidebar } from "@/widgets/sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { DashboardHeader } from "@/widgets/dashboard-header";

import { requireUser } from "@/shared/lib/auth/auth-utils";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset>
        <DashboardHeader user={user} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
