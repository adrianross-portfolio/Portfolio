"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { FlexCarouselItem } from "@/components/FlexCarousel";

type Props = {
  items: FlexCarouselItem[];
};

export default function MobileProjectCarousel({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  const activeItem = items[activeIndex];

  return (
    <div className="w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[color:var(--border-soft-color)] bg-black/5">
        <Image
          key={activeItem.src}
          src={activeItem.src}
          alt={activeItem.alt ?? activeItem.title ?? "Project preview"}
          fill
          priority={activeIndex === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-500"
        />

        {(activeItem.title || activeItem.subtitle) && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-5 pt-12 text-white">
            {activeItem.title && (
              <h3 className="text-lg font-semibold tracking-tight">
                {activeItem.title}
              </h3>
            )}

            {activeItem.subtitle && (
              <p className="mt-1 text-sm text-white/70">
                {activeItem.subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={activeIndex === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-6 bg-[color:var(--brand-accent)]"
                : "w-1.5 bg-[color:var(--border-soft-color)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
