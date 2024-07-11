import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Metadata } from "next";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import { notFound } from "next/navigation";
import getUsers from "@/lib/getUsers";
// export const metadata : Metadata ={
//     title:
// }

//params type declaration
type Params = {
  params: {
    userID: string;
  };
};

export async function generateMetadata({
  params: { userID },
}: Params): Promise<Metadata> {
  const user: User = await getUser(userID);
  if (!user) {
    return {
      title: "User Not Found",
    };
  }
  return {
    title: user.name,
    keywords: user.username,
    description: user.company.catchPhrase,
  };
}

export default async function UserPostsPage({ params: { userID } }: Params) {
  const postPromise: Promise<Post[]> = getUserPosts(userID);
  const user: User = await getUser(userID);
  if (!user) return notFound();
  return (
    <div>
      <h2 className='text-3xl m-5 font-bold'>{user.name}s Posts</h2>
      <Suspense fallback={<h2 className='text-3xl'>Posts are Loading...</h2>}>
        <UserPosts promise={postPromise} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  const usersData: Promise<User[]> = getUsers();
  const users = await usersData;

  return users.map((user) => ({
    userID: user.id.toString(),
  }));
}

// export async function generateStaticParams() {
//   const usersData: Promise<User[]> = getUsers();
//   const users = await usersData;
//   return users.map((user) => ({
//     userID: user.id.toString(),
//   }));
// }

// export async function generateStaticParams() {
//   const usersData: Promise<User[]> = getUsers();
//   const users = await usersData;

//   return users.map((user) => ({
//     userID: user.id.toString(),
//   }));
// }
