"use client";

import Link from "next/link";
import { User, LogOut, UserIcon } from "lucide-react";
import { profileSections } from "@/constants";
import logout from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SessionUser } from "@/types";

export default function UserDropdown({ user }: { user: SessionUser | null }) {
  if (!user) {
    return (
      <Button asChild variant="default">
        <Link href="/auth">
          <UserIcon className="mr-2 h-4 w-4" />
          Se connecter
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.img} alt="User avatar" />
            <AvatarFallback className="bg-glass">
              <User className="h-5 w-5 text-slate-100" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user?.pseudo || "Non défini"}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>

            {profileSections.map((section) => (
              <CommandGroup key={section.title} heading={section.title}>
                {section.links.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <CommandItem
                      key={link.href}
                      onSelect={() => (window.location.href = `/${link.href}`)}
                      className="cursor-pointer">
                      <div className={`p-2 rounded-md ${link.color} mr-2`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span>{link.title}</span>
                        <span className="text-xs text-muted-foreground">{link.description}</span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer text-red-600 focus:text-red-600">
          <form action={logout}>
            <button type="submit" className="flex items-center w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Se déconnecter</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
