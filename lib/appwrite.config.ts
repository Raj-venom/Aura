import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";


export const appwriteConfig = {

    endpoint: process.env.EXPO_PUBLIC_ENDPOINT!,
    platform: process.env.EXPO_PUBLIC_PLATFORM!,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID!,
    videoCollectionId: process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID!,
    storageId: process.env.EXPO_PUBLIC_STORAGE_ID!,

};


const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export async function createUser(email: string, password: string, username: string) {
    try {

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) {
            throw new Error("Account creation failed");
        }

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        )

        return newUser;

    } catch (error: any) {
        throw new Error(error);
    }
}

export async function signIn(email: string, password: string) {
    try {
        return await account.createEmailPasswordSession(email, password)
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function signOut() {
    try {
        return await account.deleteSession("current");
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getAccount() {
    try {
        return await account.get();

    } catch (error: any) {
        throw new Error(error);
    }
}


export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) {
            return null;
        }

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)],
        )

        if (!currentUser) {
            throw new Error("User not found");
        }

        return currentUser.documents[0];

    } catch (error: any) {
        console.log(error);
        return null;
    }
}