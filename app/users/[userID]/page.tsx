import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Metadata } from "next";
import { Suspense } from "react";
import UserPosts from "./components/page";

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
  const user = await getUser(userID);
  return {
    title: user.name,
    keywords: user.username,
    description: user.company.catchPhrase,
  };
}

export default async function UserPostsPage({ params: { userID } }: Params) {
  const user = await getUser(userID);
  const postPromise: Promise<Post[]> = getUserPosts(userID);

  return (
    <div>
      <h2 className='text-3xl m-5 font-bold'>{user.name}'s Posts</h2>
      <Suspense fallback={<h2 className='text-3xl'>Posts are Loading...</h2>}>
        <UserPosts promise={postPromise} />
      </Suspense>
    </div>
  );
}
