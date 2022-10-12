import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { deviceWidth } from '@app/hooks';

import { SVGIcon } from '../SVGIcon';

export const MobileModal = ({
  visible,
  onCloseModal,
  children,
  actions,
  title,
}: {
  visible: boolean;
  onCloseModal: () => void;
  children: JSX.Element;
  actions?: JSX.Element | null;
  title: string;
}) => {
  const [localVisible, setLocalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setLocalVisible(visible);
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setLocalVisible(visible);
      }, 500);
    }
  }, [visible]);

  if (!visible && !localVisible) {
    return <></>;
  }

  return (
    <Wrapper className={`${localVisible && visible && 'visible'}`}>
      <Background
        className={`${localVisible && visible && 'visible'}`}
        onClick={onCloseModal}
      />
      <Modal className={`${localVisible && visible && 'visible'}`}>
        <Content>
          <Header>
            <Heading2>{title}</Heading2>
            <Close onClick={onCloseModal}>
              <SVGIcon name="close" color="#091941" width={22} height={22} />
            </Close>
          </Header>
          <ModalBody>{children}</ModalBody>
          {actions && <Actions className="actions">{actions}</Actions>}
        </Content>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${deviceWidth.biggerThan.md} {
    display: none;
  }
`;

const Background = styled.div`
  background: #091941;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: 0.2s;
  &.visible {
    opacity: 0.7;
  }
`;

const Modal = styled.div`
  display: flex;
  z-index: 4;
  background: #fff;
  width: 100%;
  max-height: 0;
  height: 100%;
  bottom: 0;
  position: absolute;
  border-radius: var(--gap) var(--gap) 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.2s;
  &.visible {
    max-height: 624px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: var(--gap) var(--gap) calc(var(--gap) * 1.5);
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: calc(var(--gap) * 2);
  gap: 40px;
`;

const Actions = styled.div`
  border-top: 1px solid #eee;
  padding-top: calc(var(--gap) * 1.5);
  display: flex;
  justify-content: space-between;
  gap: var(--gap);
`;

const Close = styled.div`
  cursor: pointer;
  position: relative;
  width: 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading2 = styled.h2`
  font-family: Raleway;
`;
