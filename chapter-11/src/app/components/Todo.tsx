"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, ChangeEvent, MouseEvent, useState } from "react";

type Props = {
  todo: TodoType;
};
export default function Todo({ todo }: Props) {
  //router
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsFetching(true);
    const res = await fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    const data = await res.json();
    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.
      router.refresh();
    });
    console.log(data);
    setIsFetching(false);
  };
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true);
    const res = await fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "DELETE",
    });

    await res.json();

    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.
      router.refresh();
    });
    setIsFetching(false);
  };
  return (
    <div className='flex items-start justify-between gap-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full my-2'>
      <input
        className='w-8 h-8'
        type='checkbox'
        id='completed'
        name='completed'
        checked={todo.completed}
        onChange={handleChange}
      />
      <Link href={`/${todo.id}`}>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {todo.title}
        </h5>
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className='p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300'>
        Del
      </button>
    </div>
  );
}
