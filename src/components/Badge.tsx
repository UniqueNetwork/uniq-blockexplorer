import React from 'react';
import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';

export type BadgeContent = {
  text: React.ReactNode;
  tooltip?: React.ReactNode;
};

function Badges({
  id,
  className,
  tooltipDescription,
  badges,
}: {
  id: string;
  className?: string;
  tooltipDescription?: React.ReactNode;
  badges: BadgeContent[];
}) {
  return (
    <BadgeWrapper>
      {badges.map((badge) => (
        <>
          <BadgeContent data-tip data-for={`${id}-badge-tooltip`} className={className}>
            {badge.text}
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
              <span>{badge.tooltip}</span>
            </ReactTooltip>
          )}
        </>
      ))}
    </BadgeWrapper>
  );
}

const BadgeWrapper = styled.div`
  position: absolute;
  top: var(--gap);
  right: var(--gap);
  left: var(--gap);
  display: flex;
  gap: var(--gap);
  flex-direction: column;
  align-items: flex-end;
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

export default Badges;
