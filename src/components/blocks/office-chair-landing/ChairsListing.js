// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";

// export default function ChairsListing() {
//   return (
//     <section className="w-full">
//       <div className="container">
//         <div
//           className={cn(
//             "w-full h-full border rounded-[6px] p-1 2xl:p-2">
//           <Image
//             src={item?.chairImage || "/images/placeholder.jpg"}
//             alt={item?.title}
//             width={1790}
//             height={505}
//             className="w-[40px] xl:w-[45px] 2xl:w-[70px] aspect-[1790/505] mx-auto mb-1 2xl:mb-1.5 block"
//             quality={100}
//           />
//           <div className="text-[8px] 2xl:text-[12px] leading-normal font-normal text-center text-[#282828] ">
//             {item?.title}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
