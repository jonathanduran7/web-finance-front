import { useAuth } from "@/app/context/auth.context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarItem {
  title: string;
  url: string;
  isActive?: boolean;
}

const initialItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/home",
    isActive: true,
  },
  {
    title: "Transacciones",
    url: "/dashboard/transactions",
  },
  {
    title: "Transferencias",
    url: "/dashboard/transfers",
  },
  {
    title: "Configuraciones",
    url: "/dashboard/settings",
  },
];

export function AppSidebar() {
  const { push } = useRouter();
  const { logout } = useAuth();
  const pathname = usePathname();
  const [items, setItems] = useState<SidebarItem[]>(initialItems);

  const handleItemClick = (url: string) => {
    setItems(
      items.map((item) => ({
        ...item,
        isActive: item.url === url,
      })),
    );
    push(url);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Money Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <div
                      onClick={() => handleItemClick(item.url)}
                      className="cursor-pointer"
                    >
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button
          className="text-primary bg-white rounded p-2"
          onClick={() => logout()}
        >
          Cerrar sesión
        </button>
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-500">© 2025 Money Tracker</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
