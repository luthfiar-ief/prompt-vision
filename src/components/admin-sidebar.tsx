import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { GraduationCap, LayoutDashboard, Users, FileCheck2, Upload, Settings } from "lucide-react";

const items = [
  { title: "Ringkasan", url: "/admin", icon: LayoutDashboard },
  { title: "Mahasiswa", url: "/admin/students", icon: Users },
  { title: "Terbitkan Sertifikat", url: "/admin/issue", icon: Upload },
  { title: "Sertifikat Terbit", url: "/admin/minted", icon: FileCheck2 },
  { title: "Pengaturan", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-semibold">VeriChain</div>
            <div className="text-[10px] uppercase tracking-widest opacity-70">Konsol Admin</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Registri</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={path === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-2 text-xs opacity-70 group-data-[collapsible=icon]:hidden">
          Masuk sebagai <span className="font-mono">registrar@kampus.ac.id</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
