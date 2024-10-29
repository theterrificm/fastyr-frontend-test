import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
  interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    }
    company: {
      name: string;
    }
    
    }


const Cards = ({data}: { data: UserData[]}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-5"> */}
        {data.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
                <Card >
                    <CardHeader>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>Username: {user.username}</CardDescription>
                    </CardHeader>
                    <CardContent className="sm:p-6">
                        <div>
                          <b>Email:</b>
                          <p className="truncate">{user.email}</p>

                        </div>
                        <b>Phone:</b>
                        <p>{user.phone}</p>
                        <b>Address:</b>
                        <p>{user?.address?.street}, {user?.address.suite}, {user?.address.city}, {user?.address.zipcode}</p>
                        <b>Company:</b>
                        <p>{user?.company.name}</p>
                        <b>Website:</b>
                        <p>{user?.website}</p>


                    </CardContent>
                    
                </Card>
            </Link>
        ))}
    </div>
  )
}

export default Cards