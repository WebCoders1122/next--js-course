import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Video from "@/app/components/Video";
import CustomImage from "@/app/components/CustomImage";

export const getPostdataByName = async (
  postName: string
): Promise<BlogPost | undefined> => {
  const res = await fetch(
    `https://raw.githubusercontent.com/webcoders1122/mdx-blogposts/main/${postName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  if (!res.ok) return undefined;
  // getting raw data of mdx file from res
  const rawMDX = await res.text();
  //this is to avoid 404 page as it got sucess status of 200
  if (rawMDX === "404: Not Found") return undefined;
  // to compile mdx files
  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
  }>({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          rehypeHighlight,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });
  //getting ids from file names for static paths
  const id = postName.replace(/\.mdx$/, "");
  //getting blogpost data
  const blogPostObject: BlogPost = {
    meta: {
      id: id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };
  return blogPostObject;
};

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  // to fetch remote mdx data from github repo
  const res = await fetch(
    "https://api.github.com/repos/webcoders1122/mdx-blogposts/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  if (!res.ok) return undefined;
  // make a filetree from github response
  const githubFileTree: Filetree = await res.json();
  //to get all mdx files from repo tree
  const mdxArray = githubFileTree.tree
    .map((file) => file.path)
    .filter((file) => file.includes("mdx"));
  //get posts meta details
  const postsMeta: Meta[] = [];
  for (const post of mdxArray) {
    const blogpost = await getPostdataByName(post);
    if (blogpost) {
      postsMeta.push(blogpost.meta);
    }
  }
  // to sort posts by date
  return postsMeta.sort((a, b) => (a.date < b.date ? 1 : -1));
}
