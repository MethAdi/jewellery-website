"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const InfiniteMarquee = ({ images }: { images: string[] }) => {
  return (
    <div className="relative w-full overflow-hidden bg-navy py-16 border-y border-gold-metallic/20">
      {/* Fade edges for smooth entry/exit */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45, // Customize speed here
          }}
          className="flex gap-6 md:gap-10 px-4 w-max"
        >
          {/* Duplicate the array to create a perfectly seamless infinite loop */}
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="group relative w-56 h-72 md:w-72 md:h-96 shrink-0 rounded-sm overflow-hidden border border-white/5 opacity-80 hover:opacity-100 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] z-0 hover:z-10"
            >
              <Image
                src={src}
                alt={`Valued Jewellery piece ${index + 1}`}
                fill
                quality={85}
                sizes="(max-width: 768px) 14rem, 18rem"
                className="object-cover object-center transition-all duration-[800ms] ease-out group-hover:scale-[1.15] group-hover:rotate-3 group-hover:brightness-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
