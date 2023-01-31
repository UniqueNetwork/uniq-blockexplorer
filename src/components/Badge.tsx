import React from 'react';
import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';

function Badge({
  id,
  children,
  className,
  tooltipDescription,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  tooltipDescription?: React.ReactNode;
}) {
  return (
    <BadgeWrapper>
      <BadgeContent data-tip data-for={`${id}-badge-tooltip`} className={className}>
        {children}
      </BadgeContent>
      {tooltipDescription && (
        <ReactTooltip
          event={tooltipDescription ? 'mouseenter' : undefined}
          id={`${id}-badge-tooltip`}
          effect="solid"
          eventOff="mouseleave"
          place={'top'}
          offset={{ top: 3, left: 0 }}
        >
          <span>{tooltipDescription}</span>
        </ReactTooltip>
      )}
    </BadgeWrapper>
  );
}

const BadgeWrapper = styled.div`
  position: absolute;
  top: var(--gap);
  right: var(--gap);
  left: var(--gap);
  display: flex;
  justify-content: flex-end;
  .__react_component_tooltip {
    width: 200px;
  }
`;

const BadgeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  background-color: var(--white-color);
  border: 1px solid var(--blue-gray-200);
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: var(--dark);
  z-index: 2;
`;

export default Badge;
