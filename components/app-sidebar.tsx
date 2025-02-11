import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

interface SidebarItem {
  title: string;
  url: string;
}

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/home",
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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Money Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div
                      onClick={() => push(item.url)}
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
    </Sidebar>
  );
}
