"use client";

import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Trophy, Plus, Bell} from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-semibold tracking-tight">Dashboard</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1">
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>

        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Trophy className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        <Avatar className="ml-2 h-8 w-8">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback className="text-[14px] tracking-tight">Y</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
