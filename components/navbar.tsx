"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Bell, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = pathname.startsWith("/admin");

  const handleSignOut = () => {
    signOut();
    router.push("/auth");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition duration-500",
        isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
      )}
    >
      <div className="px-4 md:px-6 lg:px-8 h-16 flex items-center">
        <Link href="/" className="flex items-center mr-6">
          <span className="text-2xl font-bold text-red-600">NETFLIXPRO</span>
        </Link>

        {!isAdmin && (
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/browse" className="text-foreground/60 hover:text-foreground">
              Home
            </Link>
            <Link href="/browse/series" className="text-foreground/60 hover:text-foreground">
              Series
            </Link>
            <Link href="/browse/movies" className="text-foreground/60 hover:text-foreground">
              Movies
            </Link>
            <Link href="/browse/my-list" className="text-foreground/60 hover:text-foreground">
              My List
            </Link>
          </div>
        )}

        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          {!isAdmin && (
            <>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              {user?.role === 'admin' ? (
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin Dashboard</Link>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}