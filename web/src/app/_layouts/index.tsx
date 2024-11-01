"use client";
import { ReactNode } from "react";

import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Layout({
  children,
  breadcrumbItems,
}: {
  children: ReactNode;
  breadcrumbItems: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-between items-center gap-2 border-b px-4">
          <div className="flex shrink-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumbItems}
          </div>
          <Button
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: "/",
              });
            }}
            title="Sair"
            variant="outline"
            size="icon">
            <LogOut />
          </Button>
        </header>
        <div className="p-4 relative flex flex-1 flex-col bg-background">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
