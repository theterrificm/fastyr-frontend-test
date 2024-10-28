"use client";
import { gql, useQuery } from '@apollo/client';
import UsersTable from '@/components/UsersTable';
import { SkeletonCard } from '@/components/Skeleton';
import Cards from '@/components/card';
import { AddUser } from '@/components/adduser';


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
                address { street, suite, city, zipcode }
                company { name}
                posts {
                  meta {
                    totalCount
                  }
                }     
            }      
        }   
    }
 `;





const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS); 


  if (loading) return <SkeletonCard />;

  if (error) return <p>Error : {error.message}</p>;



  return (
    <div className="py-5">

      <div className="flex justify-end">
        <AddUser  />
      </div>

      {/* <UsersTable header={tableHeader} data={data.users.data}/> */}
      <Cards data={data.users.data} />
    </div>
  ) 
  
}

export default Users