import Image from "next/image";
import getPostsData from "../../lib/getPostsData";
import { Metadata } from "next";
import PostListing from "./components/PostListing";

export const metadata: Metadata = {
  title: "Welcome to MyBlog",
};
// export const revalidate = 20;
export default function Home() {
  const postData: blogPost[] = getPostsData();

  return (
    <main className='bg-slate-700 prose prose-xl text-white mx-auto'>
      {postData.map((post: blogPost) => {
        return (
          <PostListing
            key={post.id}
            post={post}
          />
        );
      })}
    </main>
  );
}
