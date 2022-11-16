import React, { useCallback, MouseEvent } from 'react';
import styled from 'styled-components/macro';
import { Heading, Text } from '@unique-nft/ui-kit';
import { Link, useNavigate } from 'react-router-dom';

import { SVGIcon } from '@app/components';

const Page404 = () => {
  const navigate = useNavigate();
  const backClickHandler = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // if user opened token page with a direct link, redirect him to main, otherwise redirect him back
      if (window.history.length > 2) {
        window.history.back();
      } else {
        navigate('/');
      }
    },
    [navigate],
  );

  return (
    <Wrapper>
      <SVGIcon name={'icon404'} width={800} height={355} />
      <HeadingStyled size="2">Oops...</HeadingStyled>
      <TextStyled>Page not found.</TextStyled>
      <TextStyled>
        You can go <BackLink onClick={backClickHandler}>back</BackLink> or go to the&nbsp;
        <Link to={'/'}>main page</Link>
      </TextStyled>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const HeadingStyled = styled(Heading)`
  margin-top: calc(var(--gap) * 4) !important;
  text-align: center;
`;

const TextStyled = styled(Text)`
  display: block;
  text-align: center;
`;

const BackLink = styled.a`
  cursor: pointer;
`;

export default Page404;
