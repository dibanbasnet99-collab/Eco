import { useState } from 'react';
import { Leaf } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EFECE2] via-[#E6E1D3] to-[#DCE3D7] text-[#2D4A3E] p-6 text-center"
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full border border-[#2D4A3E]/20 flex items-center justify-center mb-3 bg-[#F7F4EB]/70">
          <Leaf className="w-5 h-5 text-[#2D4A3E]" strokeWidth={1.6} />
        </div>
        <span className="font-display text-sm font-medium text-[#1E2420]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
