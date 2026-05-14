"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const MasonryGallery = ({ images }: { images: string[] }) => {
  // Create a repeating pattern of block heights to force a beautiful masonry look
  const getContainerHeight = (idx: number) => {
    const heights = ["h-64", "h-[28rem]", "h-80", "h-96", "h-72", "h-[22rem]"];
    return heights[idx % heights.length];
  };

  return (
    <section id="gallery" className="section-padding bg-paper-white relative">
      <div className="container-wide px-5 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-20 text-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-gold-metallic"></span>
            <span className="subheading text-slate">Portfolio</span>
            <span className="w-12 h-[1px] bg-gold-metallic"></span>
          </div>
          <h2 className="heading-section text-navy">
            Valuated <span className="italic text-gold-metallic font-light">Masterpieces</span>
          </h2>
        </div>

        {/* Masonry Layout: Uses CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 6) * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className={`relative break-inside-avoid w-full ${getContainerHeight(idx)} rounded overflow-hidden group border border-navy/5 shadow-sm hover:shadow-xl transition-all duration-700`}
            >
              <Image
                src={src}
                alt={`Valuated Collection Piece ${idx + 1}`}
                fill
                quality={85}
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 inline-block"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
