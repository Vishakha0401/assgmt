"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Calendar,
  FolderOpen,
  Home,
  MessagesSquare,
  Settings,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessagesSquare,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:border-r bg-background pt-16"
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5")} />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute right-0 w-1 h-8 bg-primary rounded-l-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="px-2 py-4 border-t">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
            {pathname === "/dashboard/settings" && (
              <motion.div
                layoutId="sidebar-active-indicator"
                className="absolute right-0 w-1 h-8 bg-primary rounded-l-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}