export default async function getUserPosts(userID: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userID}`
  );
  if (!response.ok) throw new Error("Error in fetching user posts");
  return response.json();
}
