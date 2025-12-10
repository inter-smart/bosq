export default function ContactMap({data}) {
  return (
    <iframe
      src={data?.embedUrl}
      className="w-full h-[200px] sm:h-[200px] xl:h-[276px] 2xl:h-[368px]"
    />
  );
}
