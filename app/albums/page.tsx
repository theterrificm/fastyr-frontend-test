"use client"
import { useState } from "react";
import Link from "next/link";
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import {  useQuery } from '@apollo/client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import { GET_ALBUMS } from "@/app/constants";


const Albums =  () => {
    const [page, setPage] = useState(1);
    const { loading, error, data } = useQuery(GET_ALBUMS, {
        variables: { page },
    }); 

    // const nextPage = () => {
    //     setPage(page + 1);
    // }


    if (loading) return <p>Loading...</p>;
  
    if (error) return <p>Error : {error.message}</p>;
    
 
    return (
        <div className="container mx-auto py-10">
        
        <DataTable  columns={columns} data={data.albums.data} />
        
        <Pagination>
            <PaginationContent>
                {page !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious  onClick={() => setPage(page - 1)}/>
                    </PaginationItem>
                )}
                <Link onClick={() => setPage(1)}  href="#">
                    <PaginationItem >
                        1
                    </PaginationItem>
                </Link>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <Link onClick={() => setPage(data.albums.links.last.page)} href={"#"}>{data.albums.links.last.page}</Link>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext onClick={() => {setPage(page + 1)}} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

      </div>
    )
}

export default Albums