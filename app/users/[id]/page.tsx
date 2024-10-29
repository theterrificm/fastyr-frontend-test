"use client";
import { useQuery } from '@apollo/client';
import { useMutation} from '@apollo/client';
import { useParams } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { SkeletonCard } from '@/components/Skeleton';
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { DELETE_USER, GET_USER_DETAILS } from '@/app/constants';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const UserDetail = () => {

    const {id} = useParams();
    const { toast } = useToast()
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { id },
    })
    const [deleteUser, { loadingDel }] = useMutation(DELETE_USER);
    

    if (loading) return <SkeletonCard />;
    if (error) return <p>Error : {error.message}</p>;

    const handleDelete = async() => {
        console.log("clicked");
        await deleteUser({
            variables: {
              id: id
            },
          }).then(data => {
            toast({
                title: "Deleted",
                description: "User Deleted Successfully",
              })
            router.push("/users")
            console.log( data)
        });
        
        
    }


    return (
        <div className='grid md:grid-cols-12 lg:grid-cols-6 gap-4 py-5'>
            <div className='col-start-2 col-span-4 text-center'>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl'>{data.user.name}</CardTitle>
                        <CardDescription>Username: {data.user.username}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <b>Email:</b>
                        <p className='mb-3'> {data.user.email}</p>
                        <b>Phone:</b>
                        <p className='mb-3'> {data.user.phone}</p>
                        <b>Website:</b>
                        <p className='mb-3'>{data.user.website}</p>
                    </CardContent>
                    <CardFooter className='flex justify-center gap-4'>
                        <Button disabled={loadingDel} variant="destructive" onClick={handleDelete}>{loadingDel ? "Deleting..." : "Delete"}</Button>
                        <Link href={`/users/${id}/edit`}>
                            <Button variant="secondary">Edit</Button>
                        </Link>
                    </CardFooter>
                </Card>

            </div>

        </div>
  )
}

export default UserDetail