export default async function getUserPosts(userID: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userID}`
  );
  if (!response.ok) return undefined;
  return response.json();
}
