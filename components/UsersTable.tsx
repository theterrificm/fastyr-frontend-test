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
  
  

interface UserData {
id: number;
name: string;
username: string;
email: string;
phone: string;
website: string;
}

 const tableHead = [{
    name: "Id",
 },
 {
    name: "Name",
 },
 {
    name: "Username",
 },
 {
    name: "Email",
 },
 {
    name: "Phone",
 },
 {
    name: "Website",
 },
] 

const UsersTable = ({data}: {data: UserData[]}) => {
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
                    {tableHead.map((head) => (
                        <TableHead key={head.name}>{head.name}</TableHead>

                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
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