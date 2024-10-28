"use client";
import { gql, useQuery } from '@apollo/client';
import UsersTable from '@/components/UsersTable';
import { SkeletonCard } from '@/components/Skeleton';

const GET_USERS = gql`
    query GetUsers {
        users {
            data
            {
                id
                name
                username
                email
                phone
                website      
            }      
        }   
    }
 `;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS); 

  if (loading) return <SkeletonCard />;

  if (error) return <p>Error : {error.message}</p>;


  return (
    <div className="">
      <UsersTable data={data.users.data}/>
    </div>
  ) 
  
}

export default Users