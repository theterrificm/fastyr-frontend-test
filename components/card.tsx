import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
//   import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
//   import { Button } from "./ui/button";
import Link from "next/link";
  interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    }


const Cards = ({data}: { data: UserData[]}) => {
  return (
    <div className="grid grid-cols-3 gap-6 py-5">
        {data.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
                <Card >
                    <CardHeader>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>Username: {user.username}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <b>Email:</b>
                        <p>{user.email}</p>
                        <b>Phone:</b>
                        <p>{user.phone}</p>
                        <b>Address:</b>
                        <p>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
                        <b>Company:</b>
                        <p>{user.company.name}</p>
                        <b>Website:</b>
                        <p>{user.website}</p>


                    </CardContent>
                    <CardFooter className=' gap-4'>
                        <b>Total Posts:</b>
                        <p>{user.posts.meta?.totalCount ? user.posts.meta.totalCount : 0 }</p>
                      
                        {/* <Button variant="destructive"><TrashIcon /></Button>
                        <Button variant="secondary"><Pencil2Icon /></Button> */}
                    </CardFooter>
                </Card>
            </Link>
        ))}
    </div>
  )
}

export default Cards