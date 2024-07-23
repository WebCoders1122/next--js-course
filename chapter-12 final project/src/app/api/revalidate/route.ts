// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=47e03253d7742bfc6061430f5f5a46e159e0e6b3c0d2813ac6df14af23f23e1489a7d3a72b35cdb72d3884274c0c500fe81a

import { revalidatePath } from "next/cache";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.get("secret") === process.env.MY_SECRED_KEY) {
    revalidatePath("/");
    return Response.json({ revalidated: true, now: Date.now() });
  }
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}

type Props = {
  path: string;
  secret: string;
};
