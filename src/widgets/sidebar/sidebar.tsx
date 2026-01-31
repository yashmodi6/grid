import { Home, CheckSquare, Calendar, Timer, HelpCircle, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

import { type UserDto } from "@/entities/user/model/dtos";

import { Branding } from "./nav-branding";
import { NavUser } from "./nav-user";

const mainItems = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Todo", icon: CheckSquare, url: "/todo" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Timer", icon: Timer, url: "/timer" },
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
        {/* TOP LIST */}
        <SidebarGroup>
          <SidebarGroupLabel>Productivity</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
