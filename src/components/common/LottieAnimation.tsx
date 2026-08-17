import React from 'react';

// Declare custom web component element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          autoplay?: boolean;
          loop?: boolean;
          speed?: number;
          mode?: string;
          background?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface LottieAnimationProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
}

export default function LottieAnimation({
  src,
  className = 'w-full h-full',
  autoplay = true,
  loop = true,
  speed = 1,
}: LottieAnimationProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <dotlottie-wc
        src={src}
        autoplay={autoplay}
        loop={loop}
        speed={speed}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
