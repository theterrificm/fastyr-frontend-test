import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
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
                    <Link href="/users">
                        <NavigationMenuTrigger >Users</NavigationMenuTrigger>
                    </Link> 
                    <NavigationMenuContent>
                        <Link href={"/create-users"} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Create Users
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