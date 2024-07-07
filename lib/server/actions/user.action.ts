"use server";

import { SignUpParams, User, createBankAccountProps, exchangePublicTokenProps, signInProps } from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { encryptId, parseStringify } from "../../utils";
import { AccountsGetRequest, CountryCode, ItemPublicTokenExchangeRequest, LinkTokenCreateRequest, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { addFundingSource } from "./dwolla.action";

const { APPWRITE_DATABASE_ID, APPWRITE_USER_COLLECTION_ID, APPWRITE_BANK_COLLECTION_ID } = process.env;

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const userSession = await account.createEmailPasswordSession(email, password);

        return parseStringify(userSession);
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

export const signOut = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('finwrite-session');
        return await account.deleteSession('current');
    } catch (error) {
        console.error("Sign Out Error", error);
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const userAccount = await account.get();
        return parseStringify(userAccount);
    } catch (error) {
        console.error("Get Logged In User Error: ", error);
        return null;
    }
}

export async function createPlaidLinkToken(user: User) {
    try {
        const request: LinkTokenCreateRequest = {
            user: {
                client_user_id: user.$id
            },
            client_name: user.name,
            language: 'en',
            country_codes: [CountryCode.Us],
            products: [Products.Auth]
        };

        const response = await plaidClient.linkTokenCreate(request);
        return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
        console.error("CreatePlaidLinkToken Error: ", error);
    }
}

export async function createAppwriteBankAccount(data: createBankAccountProps) {
    try {
        const { database } = await createAdminClient();

        const bankAccount = await database.createDocument(APPWRITE_DATABASE_ID!, APPWRITE_BANK_COLLECTION_ID!, ID.unique(), data);

        return parseStringify(bankAccount);
    } catch (error) {
        console.error("Create Appwrite Bank Account Error: ", error);
    }
}

export async function exchangePublicToken({ user, publicToken }: exchangePublicTokenProps) {
    try {
        // Exchanging public token with permanent access token
        const tokenExchangeRequest: ItemPublicTokenExchangeRequest = {
            public_token: publicToken
        };
        const tokenExchangeResponse = await plaidClient.itemPublicTokenExchange(tokenExchangeRequest);
        const access_token = tokenExchangeResponse.data.access_token;
        const itemId = tokenExchangeResponse.data.item_id;

        // Getting accounts information from the token
        const accountsGetRequest: AccountsGetRequest = {
            access_token
        }
        const accountData = (await plaidClient.accountsGet(accountsGetRequest)).data.accounts[0];

        // Processor token for attaching it to bank account to recieve and send funds
        const processorTokenRequest: ProcessorTokenCreateRequest = {
            access_token,
            account_id: accountData.account_id,
            processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla
        }
        const processorToken = (await plaidClient.processorTokenCreate(processorTokenRequest)).data.processor_token;

        // Create funding source URL for the account to enable us to transfer the amount using this URL.
        const fundingSourceUrl = await addFundingSource({
            bankName: accountData.name,
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken
        });

        if (!fundingSourceUrl) throw Error

        await createAppwriteBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            sharableId: encryptId(accountData.account_id),
            accessToken: access_token,
            fundingSourceUrl
        })
    } catch (error) {
        console.error("Exchange Public Token Error: ", error);
    }
}