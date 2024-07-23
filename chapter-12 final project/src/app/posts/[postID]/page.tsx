import NotFound from "./not-found";
import getFormattedDate from "../../../../lib/getFormattedDate";
import Link from "next/link";
import { getPostdataByName, getPostsMeta } from "../../../../lib/getPostsData";
import "highlight.js/styles/night-owl.css";

export const revalidate = 86400;

type Props = {
  params: { postID: string };
};
export async function generateMetadata({ params: { postID } }: Props) {
  const post: BlogPost | undefined = await getPostdataByName(`${postID}.mdx`);

  if (!post)
    return {
      title: "Post Not Found",
    };
  else
    return {
      title: post.meta.title,
      // description: post.meta.id,
      // tags: post.meta.tags,
      // date: post.meta.date,
    };
}
const PostPage = async ({ params: { postID } }: Props) => {
  const post: BlogPost | undefined = await getPostdataByName(`${postID}.mdx`);
  if (!post) return NotFound();
  const pubDate = getFormattedDate(post.meta.date);
  //for getting tags
  const tags = post.meta.tags.map((tag, i) => (
    <Link
      key={i}
      href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));
  return (
    <>
      <h2 className='text-3xl mt-4 mb-0'>{post.meta.title}</h2>
      <p className='mt-0 text-sm'>{pubDate}</p>
      <article>{post.content}</article>
      <section>
        <h3>Related:</h3>
        <div className='flex flex-row gap-4'>{tags}</div>
      </section>
      <p className='mb-10'>
        <Link href='/'>← Back to home</Link>
      </p>
    </>
  );
};
export default PostPage;

export async function generateStaticParams() {
  const postsData = await getPostsMeta();
  if (!postsData) return [];
  const params = postsData.map((post) => ({ postID: post.id }));
  return params;
}
