import getUsers from "@/lib/getUsers";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users",
  keywords: "user-page, user, etc",
  description: "hello! this is user page",
};

export default async function UsersPage() {
  const userData: Promise<User[]> = getUsers();
  const users = await userData;
  const content = (
    <section>
      {users.map((user) => (
        <div key={user.id}>
          <Link
            href={`/users/${user.id}`}
            className='m-4 text-center'>
            {user.name}
          </Link>
        </div>
      ))}
    </section>
  );
  return (
    <div>
      <h2 className='text-2xl font-medium'>List of All Users</h2>
      {content}
    </div>
  );
}
