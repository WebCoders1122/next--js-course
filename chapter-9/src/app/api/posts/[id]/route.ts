import { NextResponse } from "next/server";
import { limiter } from "../../config/limiter";
const DATA_BASE_URL: string = "https://jsonplaceholder.typicode.com/posts";
export async function GET(request: Request, { params }: Props) {
  const remainingRequests = await limiter.removeTokens(1);
  console.log(remainingRequests);
  if (remainingRequests < 0)
    return new NextResponse(null, {
      status: 429,
    });
  const id: string = params.id;
  const response = await fetch(DATA_BASE_URL + "/" + id);
  const data = await response.json();
  return NextResponse.json(data);
}

type Props = {
  params: { id: string };
};
