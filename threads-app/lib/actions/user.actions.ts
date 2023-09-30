"use server"

import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import { revalidatePath } from "next/cache";


export async function updateUser(
    username: string,
    name: string,
    bio: string,
    image: string,
    userID: string,
    path: string,
): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userID },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },   
            { upsert: true },    
        );
    
        if(path === "/profile/edit"){
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}

export async function fetchUser(userID: string) {
    try {
        connectToDB();

        return await User
            .findOne({ id: userID })
            // .populate({ path: "communities", model: Community});
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}