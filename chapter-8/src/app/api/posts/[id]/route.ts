import { NextResponse } from "next/server";
const DATA_BASE_URL: string = "https://jsonplaceholder.typicode.com/posts";
export async function GET(request: Request, { params }: Props) {
  const id: string = params.id;
  const response = await fetch(DATA_BASE_URL + "/" + id);
  const data = await response.json();
  return NextResponse.json(data);
}

type Props = {
  params: { id: string };
};
