"use client";
import { useEffect, useRef } from "react";

export default function BlogViewTracker({ slug }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const cookieKey = `blog_viewed_${slug}`;
    const alreadyViewed = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${cookieKey}=`));

    if (!alreadyViewed) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frontend/blog-details/view?slug=${slug}`, {
        method: "POST",
      })
        .then(() => {
          const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
          document.cookie = `${cookieKey}=1; expires=${expires}; path=/; SameSite=Lax`;
        })
        .catch(() => {});
    }
  }, [slug]);

  return null;
}
