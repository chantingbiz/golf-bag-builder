"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FallbackImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

export function FallbackImage({ src, fallbackSrc, alt, ...props }: FallbackImageProps) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      {...props}
      alt={alt}
      src={current}
      onError={() => {
        if (!fallbackSrc) {
          return;
        }
        setCurrent((previous) => (previous === fallbackSrc ? previous : fallbackSrc));
      }}
    />
  );
}
