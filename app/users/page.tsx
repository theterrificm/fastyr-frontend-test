"use client";
import { useQuery } from '@apollo/client';
import { SkeletonCard } from '@/components/Skeleton';
import Cards from '@/components/card';
import { AddUser } from '@/components/adduser';
import { GET_USERS } from '@/app/constants';


const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS); 

  if (loading) return <SkeletonCard />;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="py-5">

      <div className="flex justify-end">
        <AddUser  />
      </div>
      <Cards data={data.users.data} />
    </div>
  ) 
  
}

export default Users