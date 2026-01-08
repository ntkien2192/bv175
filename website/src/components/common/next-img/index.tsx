'use client';
import { useState } from 'react';
import Image from 'next/legacy/image';

interface NextImgProps {
  id?: string;
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'none';
  quality?: number;
  loading?: 'lazy' | 'eager';
  [key: string]: any;
}

const srcDefault = '/assets/images/unavailable.png';

const NextImg = ({
  id,
  src,
  alt,
  className,
  width,
  height,
  objectFit = 'contain',
  loading = 'lazy',
  quality = 100,
  ...props
}: NextImgProps) => {
  const [fallback, setFallback] = useState('');
  const handleError = () => {
    setFallback(srcDefault);
  };

  return (
    <Image
      id={id}
      src={(src || fallback) + '?format=webp'}
      blurDataURL={src || fallback}
      alt={alt}
      className={
        className
          ? `${className} lazyload h-full w-full`
          : `lazyload h-full w-full`
      }
      onError={handleError}
      width={width}
      height={height}
      loading={loading}
      quality={quality}
      objectFit={objectFit}
      layout="fill"
      placeholder="blur"
      {...props}
    />
  );
};

export default NextImg;
