"use client";
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation'
import Image from 'next/image';
import { SkeletonCard } from '@/components/Skeleton';


const GET_ALBUM_DETAILS = gql`
    query GetAlbumDetails($id: ID!) {
        album(id: $id ){
            id
            title
            user{
            name
            }
            photos(options:{
            paginate:{
                page:1,
                limit:1
            }
            }){
            data{
                id
                title
                thumbnailUrl
                
            }
            }
        }
    }
`;
const AlbumDetails = () => {
    const {id} = useParams();

    const { loading, error, data } = useQuery(GET_ALBUM_DETAILS, {
    variables: { id },
    })

    if (loading) return <SkeletonCard />;
    if (error) return <p>Error : {error.message}</p>;
  return (
    <div className='py-5 text-center ' >
        <h1 className='text-2xl font-extrabold'>{data.album.title}</h1>
        <p>By: {data.album.user.name}</p>
        <hr />
        <div className='py-5'>
            <h2 className='text-xl font-bold'>Photos:</h2>
            <h3 className='text-lg font-bold'>{data.album.photos.data[0].title}</h3>
            <Image width={150} height={150} alt="thumbnail" src={data.album.photos.data[0].thumbnailUrl}></Image>
            
        </div>
    </div>
  )
}

export default AlbumDetails