import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  import { Button } from "@/components/ui/button"
  import Link from "next/link";
  
  



interface HeaderItem {
    name: string;
}


const UsersTable = ({header  ,data}: { header:HeaderItem[] ,data: UserData[]}) => {
  return (
    <div>
        <div className="container flex justify-between text-center items-center">
            <h1 className="font-semibold text-2xl" >All Users</h1>

            <Button className="my-5 place-self-end">Add User</Button>
        </div>
        <Table className="mt-5">
            <TableCaption>A list of all the users.</TableCaption>
            <TableHeader>
                <TableRow>
                    {header.map((head) => (
                        <TableHead key={head.name}>{head.name}</TableHead>

                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell><Link href={`/users/${user.id}`}> {user.name}</Link></TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell >{user.email}</TableCell>
                        <TableCell >{user.phone}</TableCell>
                        <TableCell >{user.website}</TableCell>
                    </TableRow>

                ))}
            </TableBody>
        </Table>
    </div>

  )
}

export default UsersTable