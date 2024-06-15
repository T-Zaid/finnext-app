"use server";

import { SignUpParams, signInProps } from "@/types";
import { createAdminClient, createSessionClient } from "./appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

export const signIn = async (userData: signInProps) => {
    try {

    } catch (error) {
        console.error("Sign In Error", error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const { account } = await createAdminClient();
        const { email, password, firstName, lastName } = userData;

        const newUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("finwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error("Sign Up Error", error);
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const userAccount =  await account.get();
        return parseStringify(userAccount);
    } catch (error) {
        return null;
    }
}
