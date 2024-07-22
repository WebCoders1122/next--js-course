import Todos from "./components/Todos";

export const revalidate = 0;

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='max-w-lg'>
        <Todos />
      </div>
    </main>
  );
}
