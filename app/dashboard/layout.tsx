"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SnackbarProvider } from "../context/snackbar.context";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <SnackbarProvider>
          <div className="w-full h-screen">
            <SidebarTrigger />
            <div className="p-5 h-full">{children}</div>
          </div>
        </SnackbarProvider>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
