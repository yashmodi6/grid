"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";

export function Branding() {
  return (
    <SidebarMenu className="mt-2">
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="size-4" />
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">Grid</span>
              <span className="text-muted-foreground truncate text-xs">Student Productivity</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
