"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "../lib/actions";
import Logo from "@/components/Logo";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                // signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"} className="flex items-center justify-center">
            <Avatar className="xs:mr-0 mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback className=" dark:text-white text-black">CN</AvatarFallback>
            </Avatar>
            <p className="hidden md:flex xl:flex">{session.data?.user?.name}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="flex items-center"
          >
            <LogOutIcon className="mr-2 h-4 w-4" /> <p className="mt-[5px]">Sign Out</p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <div className="flex items-center"><DeleteIcon className="mr-2 h-4 w-4" /> <p className="mt-[5px]">Delete Account</p></div>

          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="text-bg-indigo-600 dark:text-[#e4e2dd] bg-indigo-200 py-2 dark:bg-indigo-600 z-10 relative mx-5 my-4 glassmorph">
      <div className="container pl-3 pr-0 mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Logo />
        </Link>

        {/* <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link className="hover:underline" href="/browse">
                Browse
              </Link>

              <Link className="hover:underline" href="/your-rooms">
                Your Rooms
              </Link>
            </>
          )}
        </nav> */}

        <div className="flex items-center gap-2">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} className="hover:bg-yellow-50 hover:scale-105 transition-transform duration-500">
              <LogInIcon size={20} className="mr-2" />  <p className="mt-[5px]">Sign In</p>
            </Button>
          )}
          <div className="hidden xl:flex md:flex px-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}