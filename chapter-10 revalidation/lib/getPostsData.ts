import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src", "blogposts");
export default function getPostsData(): blogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((file) => {
    //to get specific file id
    const id = file.split(".")[0];
    //to readfile
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath);
    // getting file object
    const matterResult = matter(fileContents);
    const blogPostObj: blogPost = {
      id: id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };

    return blogPostObj;
  });
  return allPostsData;
}

export const getPost = async (postID: string) => {
  //to readfile
  const filePath = path.join(postsDirectory, postID + ".md");
  const fileContents = fs.readFileSync(filePath);
  // getting file object
  const matterResult = matter(fileContents);
  const pageHTML = await remark().use(html).process(matterResult.content);
  const blogPostData: blogPost & { content: string } = {
    id: postID,
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: pageHTML.toString(),
  };
  return blogPostData;
};
