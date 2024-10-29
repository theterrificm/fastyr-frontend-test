"use client";
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SkeletonCard } from '@/components/skeleton';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DELETE_USER, GET_USER_DETAILS } from '@/app/constants';
import Link from 'next/link';

/**
 * UserDetailPage component displays details of a user and provides options to edit or delete the user.
 */
const UserDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_USER_DETAILS, {
    variables: { id },
  });
  const [deleteUserMutation] = useMutation(DELETE_USER);
  const { toast } = useToast();
  const router = useRouter();

  // Render a loading state while fetching user details
  if (loading) return <SkeletonCard />;
  // Render an error message if fetching fails
  if (error) return <p>Error: {error.message}</p>;

  /**
   * Handle the deletion of the user.
   * Upon successful deletion, displays a toast notification and redirects to the users list.
   */
  const handleDelete = async () => {
    await deleteUserMutation({
      variables: { id },
    }).then(() => {
      toast({
        title: "Deleted",
        description: "User deleted successfully",
      });
      router.push("/users");
    });
  };

  return (
    <div className="grid md:grid-cols-12 lg:grid-cols-6 gap-4 py-5">
      <div className="col-start-2 col-span-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{data.user.name}</CardTitle>
            <CardDescription>Username: {data.user.username}</CardDescription>
          </CardHeader>
          <CardContent>
            <b>Email:</b>
            <p className="mb-3">{data.user.email}</p>
            <b>Phone:</b>
            <p className="mb-3">{data.user.phone}</p>
            <b>Website:</b>
            <p className="mb-3">{data.user.website}</p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Link href={`/users/${id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailPage;
