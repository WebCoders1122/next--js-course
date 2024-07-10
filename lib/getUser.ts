export default async function getUser(userID: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userID}`
  );
  if (!response.ok) throw new Error("Fetching user failed");
  return response.json();
}
