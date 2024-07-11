export default async function getUser(userID: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userID}`
  );
  if (!response.ok) return null;
  return response.json();
}
