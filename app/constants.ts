import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query GetUsers {
        users {
            data {
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

export const GET_USER_DETAILS = gql`
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

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            username
            email
            phone
            website
            
        }
    }
`;

export const GET_ALBUMS = gql`
    query GetAlbums($page: Int) {
        albums (options: {
            paginate: {
                page: $page,
                limit: 10
            }
        }) 
        {
            data{
            id
            title
            user{
                id
                name
            }
            }
            links{
            first{
                page
                limit
            }
            next{
                page
                limit
            }
            last{
                page
                limit
            } 
            }
                    
                }   
        }
 `;

 export const CREATE_ALBUM = gql`
    mutation CreateAlbum($input: CreateAlbumInput!) {
        createAlbum(input: $input) {
            id
            title
            user{
            name
            }
        }
    }
`;



