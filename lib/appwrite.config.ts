import { FormFieldType } from "@/app/(tabs)/create";
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    ImageGravity,
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

interface FileInput {
    mimeType: string; // e.g., "image/png", "video/mp4"
    name: string;     // file name
    size?: number;    // optional file size
    uri: string;          // File path or URI
    [key: string]: any; // Allow other optional fields
}

type FileType = "image" | "video";

// upload File
export async function uploadFile(file: FileInput, type: FileType) {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, size: file.size ?? 0, ...rest };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;

    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getFilePreview(fileId: string, type: FileType) {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                ImageGravity.Top,
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) {
            throw new Error("File not found");
        }

        return fileUrl;

    } catch (error: any) {
        throw new Error(error);

    }
}


// crate new video post
export async function createVideoPost(form: FormFieldType) {

    if (!form.video || !form.thumbnail) {
        throw new Error("Video and thumbnail are required");
    }

    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([

            // @ts-ignore
            uploadFile(form.thumbnail, "image"),
            // @ts-ignore
            uploadFile(form.video, "video"),
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                prompt: form.prompt,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                creator: form.userId
            }
        )

    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get video posts created by user
export async function getUserPosts(userId: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("creator", userId)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get video posts that matches search query
export async function searchPosts(query: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search("title", query)]
        );


        if (!posts) throw new Error("Something went wrong");

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get latest created video posts
export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}