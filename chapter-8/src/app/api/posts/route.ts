//imports
import { NextResponse } from "next/server";

const DATA_BASE_URL: string = "https://jsonplaceholder.typicode.com/posts";

export async function GET() {
  const response = await fetch(DATA_BASE_URL);
  const data = await response.json();
  return NextResponse.json(data);
}
export async function POST(request: Request) {
  const newPost: Post = await request.json();
  try {
    const response = await fetch(DATA_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function PUT(request: Request) {
  const newPost: Post = await request.json();
  try {
    const response = await fetch(DATA_BASE_URL + "/" + newPost.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function PATCH(request: Request) {
  const newPost: Post = await request.json();
  try {
    const response = await fetch(DATA_BASE_URL + "/" + newPost.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function DELETE(request: Request) {
  const { id }: Partial<Post> = await request.json();
  console.log(id);
  if (!id) return NextResponse.json({ message: "please provide valid id" });
  try {
    const response = await fetch(DATA_BASE_URL + "/" + id, {
      method: "DELETE",
    });
    const deletedPost = await response.json();
    if (response.ok)
      return NextResponse.json({ message: `Post ${id} is deleted` });
  } catch (error) {
    return NextResponse.json(error);
  }
}

//ts types
type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};
