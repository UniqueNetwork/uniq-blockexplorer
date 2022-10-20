import styled from 'styled-components/macro';

export const CoverContainer = styled.div.attrs<{ src?: string }>((props) => ({
  src: props.src,
}))<{ src?: string }>`
  background-image: ${(props) => (props.src ? `url(${props.src})` : 'none')};
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 2px solid white;
  box-sizing: border-box;
  border-radius: 48px;
  height: 88px;
  width: 88px;
  top: calc(100% - 46px);
  left: calc(50% - 46px);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  svg {
    width: 88px;
    height: 88px;

    @media (max-width: 767px) {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 767px) {
    width: 64px;
    height: 64px;
    top: calc(100% - 32px);
    left: calc(50% - 32px);
  }
`;
