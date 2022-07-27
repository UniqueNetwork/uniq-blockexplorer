import styled from 'styled-components';

interface BlurredCoverProps {
  color?: string;
  coverSrc?: string;
}

export const BlurredCover = styled.div<BlurredCoverProps>`
  background-image: url(${(props) => props.coverSrc});
  background-color: ${(props) => props.color};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(calc(var(--gap) * 2));
    -webkit-filter: blur(calc(var(--gap) * 2));
    -moz-filter: blur(calc(var(--gap) * 2));
    -o-filter: blur(calc(var(--gap) * 2));
    -ms-filter: blur(calc(var(--gap) * 2));
  height: 88px;
  width: 100%;
`;
