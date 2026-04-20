// eslint-disable-next-line no-restricted-imports
import Image from "next/image";

export default function CustomImage({ alt = "", title, ...props }) {
  return <Image alt={alt} title={title ?? alt} {...props} />;
}
