"use client";
import { useQuery } from '@apollo/client';
import { SkeletonCard } from '@/components/skeleton';
import Cards from '@/components/card';
import { AddUser } from '@/components/adduser';
import { GET_USERS } from '@/app/constants';

const UsersPage = () => {
  // Execute the GET_USERS query
  const { loading, error, data } = useQuery(GET_USERS);

  // Display a loading skeleton while the query is in progress
  if (loading) return <SkeletonCard />;
  // Display an error message if the query fails
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="py-5">
      {/* Add user button positioned at the top right */}
      <div className="flex justify-end">
        <AddUser />
      </div>
      {/* Render the list of user cards */}
      <Cards data={data.users.data} />
    </div>
  );
};

export default UsersPage;

