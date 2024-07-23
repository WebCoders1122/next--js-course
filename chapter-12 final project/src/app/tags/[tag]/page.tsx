import Link from "next/link";
import { getPostsMeta } from "../../../../lib/getPostsData";
import PostListing from "@/app/components/PostListing";

type Props = {
  params: { tag: string };
};

export const revalidate = 86400;
export async function generateStaticParams({ params: { tag } }: Props) {
  const posts = await getPostsMeta();
  if (!posts) return [];

  // get array of all tags
  const tags = new Set(posts.map((post) => post.tags).flat());
  const staticParams = Array.from(tags).map((tag) => {
    return { tag };
  });
  return staticParams;
}

export function generateMetadata({ params: { tag } }: Props) {
  return {
    title: `Posts about ${tag}`,
  };
}

export default async function TagPostList({ params: { tag } }: Props) {
  const posts = await getPostsMeta(); //deduped!

  if (!posts)
    return <p className='mt-10 text-center'>Sorry, no posts available.</p>;

  const postsWithTags = posts.filter((post) => post.tags.includes(tag));

  if (!postsWithTags.length) {
    return (
      <div className='text-center'>
        <p className='mt-10'>Sorry, no posts for that keyword.</p>
        <Link href='/'>Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <h2 className='text-3xl mt-4 mb-0'>Results for: #{tag}</h2>
      <section className='mt-6 mx-auto max-w-2xl'>
        <ul className='w-full list-none p-0'>
          {postsWithTags.map((post) => (
            <PostListing
              key={post.id}
              post={post}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
