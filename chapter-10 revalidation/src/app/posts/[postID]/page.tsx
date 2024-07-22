import { Metadata } from "next";
import getPostsData, { getPost } from "../../../../lib/getPostsData";
import NotFound from "./not-found";
import getFormattedDate from "../../../../lib/getFormattedDate";
import Link from "next/link";

type Props = {
  params: { postID: string };
};
const postData: blogPost[] = getPostsData();

export function generateMetadata({ params: { postID } }: Props) {
  const post = postData.find((post) => post.id === postID);
  if (!post)
    return {
      title: "Post Not Found",
    };
  else
    return {
      title: post.title,
    };
}
const PostPage = async ({ params: { postID } }: Props) => {
  const post = postData.find((post) => post.id === postID);
  if (!post) return NotFound();
  const postHtml = await getPost(postID);
  const pubDate = getFormattedDate(postHtml.date);
  return (
    <main className='px-6 prose prose-xl prose-zinc dark:prose-invert mx-auto'>
      <h1 className='text-3xl mt-4 mb-0'>{postHtml.title}</h1>
      <p className='mt-0'>{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: postHtml.content }} />
        <p>
          <Link href='/'>← Back to home</Link>
        </p>
      </article>
    </main>
  );
};
export default PostPage;

export function generateStaticParams() {
  const postsData: blogPost[] = getPostsData();
  const params = postsData.map((post) => post.id);
  return params;
}
