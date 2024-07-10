type Props = {
  promise: Promise<Post[]>;
};

export default async function UserPosts({ promise }: Props) {
  const posts = await promise;
  return (
    <>
      {posts && posts.length
        ? posts.map((post) => (
            <div
              key={post.id}
              className='m-5'>
              <article>
                <h2 className='text-2xl font-bold'>{post.title}</h2>
                <p>{post.body}</p>
              </article>
            </div>
          ))
        : null}
    </>
  );
}
