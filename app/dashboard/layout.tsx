"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full h-screen">
          <SidebarTrigger />
          <div className="p-5 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
