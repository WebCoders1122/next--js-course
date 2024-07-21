import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const feedback: FeedbackType = await request.json();
  await console.log(feedback, "Body of Request");
  return NextResponse.json(feedback);
}

//ts types
type FeedbackType = {
  name: string;
  email: string;
  feedback: string;
};
