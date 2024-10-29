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
    <div className="md:flex container mx-auto gap-4 bg-transparent p-4 flex justify-center shadow-sm">
        <NavigationMenu  >
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
                        
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Albums</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <Link href="/albums" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                All Albums
                            </NavigationMenuLink>
                            </Link>
                            <Link href="/albums/import" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Import Albums
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuContent>
                        {/* <NavigationMenuContent>
                            <Link href="/albums/import" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Import Albums
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuContent> */}
                </NavigationMenuItem>
            
            </NavigationMenuList>
        </NavigationMenu>
    </div>

  )
}

export default NavMenu