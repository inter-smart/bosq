import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_URL || "";

export async function GET(request) {
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const res = await fetch(`${API_BASE_URL}/api/frontend/profile/my-profile`, {
      headers: { cookie: cookieHeader },
    });

    if (!res.ok) {
      return NextResponse.json({ status: null }, { status: res.status });
    }

    const json = await res.json();
    const status = json?.data?.status ?? null;

    return NextResponse.json({ status });
  } catch {
    return NextResponse.json({ status: null }, { status: 500 });
  }
}
