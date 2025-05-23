"use client";
import { Coins, CoinsIcon, Ghost, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from "lucide-react";
import React, { use } from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const routes = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    label: "Workflows",
    icon: Layers2Icon,
    href: "workflows",
  },
  {
    label: "Credentials",
    icon: ShieldCheckIcon,
    href: "credentials",
  },
  {
    label: "Billing",
    icon: CoinsIcon,
    href: "billing",
  },
];

const DesktopSidebar = () => {
  const pathname = usePathname();
  const activeRoute = routes.find(route => route.href.length > 1 && pathname.includes(route.href)) || routes[0];
  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 boder-b-[1px] border-separate p-4">
        <Logo />
      </div>
      <div className="p-2">TODO CREDITS</div>
      <div className="flex flex-col p-2 ">
        {routes.map(route => {
          return (
            <Link
              key={route.href}
              href={route.href}
              className={buttonVariants({
                variant: activeRoute.href === route.href ? "sidebarItemActive" : "sidebarItem",
              })}
            >
              <route.icon size={20} />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const activeRoute = routes.find(route => route.href.length > 0 && pathname.includes(route.href)) || routes[0];
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} className="p-2">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] space-y-4" side="left">
            <Logo />
            <div className="flex flex-col gap1">
              {routes.map(route => {
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={buttonVariants({
                      variant: activeRoute.href === route.href ? "sidebarItemActive" : "sidebarItem",
                    })}
                    onClick={() => setIsOpen(prev => !prev)}
                  >
                    <route.icon size={20} />
                    <span>{route.label}</span>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
export { MobileSidebar };
