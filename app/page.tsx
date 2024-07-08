import Link from "next/link";

const Home = () => {
  return (
    <div>
      Home
      <br />
      <Link href={"/about"}>Go To About</Link>
    </div>
  );
};
export default Home;
