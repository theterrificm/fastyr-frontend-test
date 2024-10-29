"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { GET_USER_DETAILS, UPDATE_USER } from '@/app/constants';
import { useToast } from "@/hooks/use-toast"


const EditUser = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_USER_DETAILS, {
        variables: { id },
    });
    const [updateUser, { updateData, loadingUpdate, errorUpdate }] = useMutation(UPDATE_USER);
    const { toast } = useToast()

    const [user, setUser] = useState({
        username: '',
        name: '',
        email: '',
        website: '',
        phone: '',
    });

    useEffect(() => {
        if (data && data.user) {
            setUser({
                username: data.user.username,
                name: data.user.name,
                email: data.user.email,
                website: data.user.website,
                phone: data.user.phone,
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await updateUser({ variables: { id, input: user } }).then((data) => {
                toast({
                    description: "User updated successfully!",
                })
                console.log(data)
            });
            console.log("User updated successfully!");
        } catch (err) {
            console.error("Failed to update user", err);
        }
    };

    if (loading) return "Loading";
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='py-5'>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <label className="block" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <label className="block" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={user.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <label className="block" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <label className="block" htmlFor="website">Website</label>
                    <input
                        type="text"
                        id="website"
                        value={user.website}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <label className="block" htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <Button disabled={loading || loadingUpdate}>
                    {loadingUpdate ? "Updating..." : "Update"}
                </Button>

            </form>
        </div>
    );
};

export default EditUser;
