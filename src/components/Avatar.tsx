import React, { FC } from 'react';

interface AvatarProps {
  size: 'large' | 'middle' | 'small' | 'x-small'
  src?: string,
  value?: string | Uint8Array | null;
  className?: string
}

const avatarSizes = { large: 72, middle: 64, small: 40, 'x-small': 24 };

const Avatar: FC<AvatarProps> = (props) => {
  const { className, size, src } = props;

  const avatarHeight = avatarSizes[size];

  return (
    <svg
      className={className}
      fill='none'
      height={avatarHeight}
      viewBox='0 0 72 72'
      width={avatarHeight}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        fill='url(#pattern0)'
        height='72'
        width='72'
      />
      <defs>
        <pattern
          height='1'
          id='pattern0'
          patternContentUnits='objectBoundingBox'
          width='1'
        >
          <use transform='translate(-0.00595238) scale(0.00595238)' />
        </pattern>
      </defs>
      {src && <image
        height='100%'
        href={src}
        preserveAspectRatio='xMinYMin slice'
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
        width='100%'
        x='0'
        y='0'
      />}
      {!src && (
        <image
          height='72'
          href='data:image/png;base64,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'
          width='72'
        />
      )}
    </svg>
  );
};

export default Avatar;
