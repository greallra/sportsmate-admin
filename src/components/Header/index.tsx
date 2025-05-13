import React from 'react';
import logo from '../../assets/react.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import AvatarDropdown from './AvatarDropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NavigationMenuDemo() {
  const { user, logout } = useAuth();

  function logChange(e: any) {
    console.log(e);
  }

  return (
    <NavigationMenu className="bg-secondary" onValueChange={logChange} orientation="horizontal">
      <NavigationMenuItem className="list-none">
        <Link to="/events">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Events</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem className="list-none">
        <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={logout}>
          <Button>Logout</Button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
  if (user) {
    return (
      <NavigationMenu className="bg-secondary" onValueChange={logChange} orientation="horizontal">
        <NavigationMenuList>
          <NavigationMenuItem className="ml-4">{/* <AvatarDropdown /> */}</NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

          <NavigationMenuItem>
            <Link to="/events">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Events</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/createexchange">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Create Exchange</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={logout}>
              <Button>Logout</Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
          <Link to="/todos">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Todos</NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem className="mr-4">
            <AvatarDropdown />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  return (
    <NavigationMenu className="bg-secondary" onValueChange={logChange} orientation="horizontal">
      <NavigationMenuList>
        <NavigationMenuItem className="ml-4">
          <div className="h-9 w-11">
            <img src="/assets/zip/png/logo-no-background.png" alt="" />
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/admin">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Users</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/exchanges">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Exchanges</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/events">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Events</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* <NavigationMenuItem>
          <Link to="/signup">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sign Up</NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link to="/todos">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Todos</NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
      <NavigationMenuList>
        {/* <NavigationMenuItem className="mx-4 bg-white rounded-md">
          <Link to="/login">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Use on web</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <div>or</div> */}
        <NavigationMenuItem className="mx-4 bg-black text-white rounded-md">
          <Link to="/download">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Download the app</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';
