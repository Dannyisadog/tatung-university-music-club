import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Navigation from '@/components/navigation';
import ProfileDropdownMenu from '@/components/profile-dropdown-menu';

export default async function Header() {
  const session = await auth();

  return (
    <header className="container sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background">
      <div className="hidden flex-col gap-6 md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
        <Link
          href="/"
          className="flex h-8 w-8 items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src="/ttumc-logo.svg"
            alt="ttumc-logo"
            width={36}
            height={36}
            priority
          />
          <span className="sr-only">TTUMC</span>
        </Link>
        <Navigation />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Icon name="menu" className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Icon name="menu" className="h-6 w-6" />
              <span className="sr-only">TTUMC</span>
            </Link>
            <Link
              href="#/"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="#/"
              className="text-muted-foreground hover:text-foreground"
            >
              Rules
            </Link>
            <Link href="/booking" className="hover:text-foreground">
              Booking
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-2 md:ml-auto md:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon name="settings" className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        {session?.user ? (
          <ProfileDropdownMenu username={session?.user?.name} />
        ) : (
          <Link href="/signin">
            <Button type="submit">Sign in</Button>
          </Link>
        )}
      </div>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:hidden">
        <Image
          src="/ttumc-logo.svg"
          alt="ttumc-logo"
          width={40}
          height={40}
          priority
        />
      </Link>
    </header>
  );
}
