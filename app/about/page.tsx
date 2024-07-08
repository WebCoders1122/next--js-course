import { Metadata } from "next";
import Link from "next/link";

const About = () => {
  return (
    <div>
      About page
      <br />
      <Link href={"/"}>Go to Home</Link>
    </div>
  );
};

export default About;
