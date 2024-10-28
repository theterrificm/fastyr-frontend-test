"use client";
import { gql, useQuery } from '@apollo/client';
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

const GET_USER_DETAILS = gql`
    query GetUserDetails($id: ID!) {
        user(id: $id) {
            id
            name
            username
            email
            phone
            website
        }
    }
`;

const UserDetail = () => {

    const {id} = useParams();

    const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { id },
    })

    if (loading) return <SkeletonCard />;
    if (error) return <p>Error : {error.message}</p>;


    return (
        <div className='grid grid-cols-6 gap-4'>
            <div className='col-start-2 col-span-4 text-center'>
                <Card>
                    <CardHeader>
                        <CardTitle>{data.user.name}</CardTitle>
                        <CardDescription>{data.user.username}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>{data.user.website}</p>
                    </CardFooter>
                </Card>

            </div>

        </div>
  )
}

export default UserDetail