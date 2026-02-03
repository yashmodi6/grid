"use client";

import {
  BookOpen,
  Calendar,
  CheckSquare,
  GraduationCap,
  HelpCircle,
  Home,
  Library,
  Settings,
  Timer
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

import { type UserDto } from "@/entities/user/model/dtos";

import { Branding } from "./nav-branding";
import { NavUser } from "./nav-user";

const workspaceItems = [
  { title: "Home", icon: Home, url: "/dashboard" },
  { title: "Todo", icon: CheckSquare, url: "/todo" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Timer", icon: Timer, url: "/timer" },
];

const universityItems = [
  { title: "Subjects", icon: BookOpen, url: "/subjects" },
  { title: "Grades", icon: GraduationCap, url: "/grades" },
  { title: "Library", icon: Library, url: "/resources" },
];

const bottomItems = [
  { title: "Help & Support", icon: HelpCircle, url: "/help" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar({ user }: { user: UserDto }) {
  return (
    <Sidebar collapsible="icon">
      {/* BRAND */}
      <SidebarHeader>
        <Branding />
      </SidebarHeader>

      <SidebarContent>
        {/* WORKSPACE */}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* UNIVERSITY */}
        <SidebarGroup>
          <SidebarGroupLabel>University</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {universityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* BOTTOM LIST */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-xs">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* USER */}
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name || "User",
            email: user.email,
            avatar: user.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
