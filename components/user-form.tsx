"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';


const CREATE_USER_MUTATION = gql`
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



const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  website: z.string().url({
    message: "Invalid URL.",
  }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Invalid phone number.",
  }),
  company: z.string().min(1, {
    message: "Company name is required.",
  }),
  
})

export function UserForm() {


  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      website: "",
      phone: "",
      company: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    

    console.log(values)
    try {
        console.log("name, username, email, phone, website")
        await createUser({
          variables: {
            input: {
              name: values.name,
              username: values.username,
              email: values.email,
              phone: values.phone,
              website: values.website,
            
            },
          },
        }).then(data => console.log( data));
        
        console.log("chained")
        
      } 
      catch (err) {
        console.error('Error creating user:', err);
      }
    };
  
    if(loading) return <p>Loading...</p>;
       
    return(
        <div>
            {data && <p>User Created: {data.createUser.name}</p>}
            
            {data ? (<div><p>{data.createUser.name}</p></div>) : 
                <ScrollArea  className="h-[400px] w-[350px] rounded-md border p-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                            <Input placeholder="musafhanif" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Musaf Hanif" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
        
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="musaf@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
        
                        <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
        
                <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
        
                        <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="submit">Submit</Button>
                    </form>
        
                </Form>
                </ScrollArea>
            
            }

        </div>
    )
   
    // return(
    //     <ScrollArea  className="h-[400px] w-[350px] rounded-md border p-4">
    //     <Form {...form} >
    //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
    //         <FormField
    //             control={form.control}
    //             name="username"
    //             render={({ field }) => (
    //             <FormItem>
    //                 <FormLabel>Username</FormLabel>
    //                 <FormControl>
    //                 <Input placeholder="musafhanif" {...field} />
    //                 </FormControl>
                    
    //                 <FormMessage />
    //             </FormItem>
    //             )}
    //         />
    //         <FormField
    //             control={form.control}
    //             name="name"
    //             render={({ field }) => (
    //                 <FormItem>
    //                 <FormLabel>Name</FormLabel>
    //                 <FormControl>
    //                     <Input placeholder="Musaf Hanif" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //                 </FormItem>
    //             )}
    //             />

    //             <FormField
    //             control={form.control}
    //             name="email"
    //             render={({ field }) => (
    //                 <FormItem>
    //                 <FormLabel>Email</FormLabel>
    //                 <FormControl>
    //                     <Input placeholder="musaf@example.com" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //                 </FormItem>
    //             )}
    //             />

    //             <FormField
    //             control={form.control}
    //             name="website"
    //             render={({ field }) => (
    //                 <FormItem>
    //                 <FormLabel>Website</FormLabel>
    //                 <FormControl>
    //                     <Input placeholder="https://example.com" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //                 </FormItem>
    //             )}
    //             />

    //     <FormField
    //             control={form.control}
    //             name="phone"
    //             render={({ field }) => (
    //                 <FormItem>
    //                 <FormLabel>Phone</FormLabel>
    //                 <FormControl>
    //                     <Input placeholder="+1234567890" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //                 </FormItem>
    //             )}
    //             />

    //             <FormField
    //             control={form.control}
    //             name="company"
    //             render={({ field }) => (
    //                 <FormItem>
    //                 <FormLabel>Company</FormLabel>
    //                 <FormControl>
    //                     <Input placeholder="Your Company Name" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //                 </FormItem>
    //             )}
    //             />
    //         <Button type="submit">Submit</Button>
    //         </form>

    //     </Form>
    //     </ScrollArea>
    // )
}
