export default function ContactMap({ data }) {
  if (!data?.embedUrl) return null;

  const url = normalizeMapEmbed(data.embedUrl);

  return (
    <iframe
      src={url}
      loading="lazy"
      className="w-full h-[200px] sm:h-[200px] xl:h-[276px] 2xl:h-[368px]"
    />
  );
}

function normalizeMapEmbed(input) {
  if (!input) return null;

  // Case 1: Full iframe string
  if (input.includes("<iframe")) {
    const match = input.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }

  // Case 2: Already embed URL
  if (input.includes("/maps/embed")) {
    return input;
  }

  // Case 3: Normal Google Maps URL
  if (input.includes("google.com/maps")) {
    return input.replace(
      "https://www.google.com/maps?",
      "https://www.google.com/maps/embed?"
    );
  }

  return null;
}
