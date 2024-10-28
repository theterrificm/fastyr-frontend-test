import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu";
  import Link from "next/link";
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

  



const NavMenu = () => {
  return (
    <div className="container mx-auto gap-4 bg-slate-50 p-4 flex justify-center shadow-sm">
        <NavigationMenu >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    
                    <NavigationMenuTrigger >Users</NavigationMenuTrigger>
                    
                    <NavigationMenuContent>
                        <Link href="/users" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Users
                        </NavigationMenuLink>
                        </Link>
                        <Link href="/create-users" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Create A User
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Albums</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} >Create Albums</NavigationMenuLink>
                        </NavigationMenuContent>
                </NavigationMenuItem>
            
            </NavigationMenuList>
        </NavigationMenu>
    </div>

  )
}

export default NavMenu