import Image from "next/image";
import { Metadata } from "next";
import { getPostsMeta } from "../../lib/getPostsData";
import PostListing from "./components/PostListing";

export const metadata: Metadata = {
  title: "Welcome to MyBlog",
};
export const revalidate = 86400;

export default async function Home() {
  const postsMeta = await getPostsMeta();

  if (!postsMeta) return <div>Posts not founs</div>;

  return (
    <div className='mx-auto'>
      {postsMeta.map((post: Meta) => {
        return (
          <PostListing
            key={post.id}
            post={post}
          />
        );
      })}
    </div>
  );
}
