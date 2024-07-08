import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Application About Page",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-gray-900'>
      <div className='text-center font-medium text-xl'>About Navbar</div>
      {children}
      <div className='text-center font-medium text-xl text-gray-400'>
        About Footer
      </div>
    </div>
  );
}
