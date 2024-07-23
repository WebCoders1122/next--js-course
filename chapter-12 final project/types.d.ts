type blogPost = {
  id: string;
  title: string;
  date: string;
};

//github remote filetree type
type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

type Meta = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

type BlogPost = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};
