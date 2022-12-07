import React from "react";
import { Tooltip } from "@trussworks/react-uswds";
import styled from "styled-components";

const StyledBadge = styled.div`
  color: var(--dark-blue);
  font-family: "MuseoSlab";
  border-radius: 1rem;
  font-size: 0.75rem;
  padding: 0.25rem 1rem;
  margin-bottom: 0.5rem;
  width: min-content;
  text-transform: inherit;
  &:hover {
    cursor: pointer;
  }
  .badge-icon,
  .badge-text {
    vertical-align: middle;
    display: inline-block;
  }
  .badge-icon {
    padding-bottom: 0.2rem;
  }
`;

type ConditionalBadgeProps =
  | {
      showTooltip?: false;
      tooltipText?: never;
    }
  | {
      showTooltip?: true;
      tooltipText: string;
    };

type CommonBadgeProps = {
  bgColor: "blue" | "yellow";
  Icon: React.ReactNode;
  text: string;
};

type BadgeProps = CommonBadgeProps & ConditionalBadgeProps;

// ForwardRef of wrapper div around Tag component
type WrapperDivProps = React.PropsWithChildren<{
  className?: string;
}> &
  JSX.IntrinsicElements["div"] &
  React.RefAttributes<HTMLDivElement>;
const WrapperDivForwardRef: React.ForwardRefRenderFunction<
  HTMLDivElement,
  WrapperDivProps
> = ({ className, children, ...tooltipProps }: WrapperDivProps, ref) => (
  <div ref={ref} className={className} {...tooltipProps}>
    {children}
  </div>
);
const WrapperDiv = React.forwardRef(WrapperDivForwardRef);

export default function Badge({
  Icon,
  bgColor,
  text,
  tooltipText,
  showTooltip = false,
}: BadgeProps) {
  const renderBadge = () => (
    <StyledBadge
      style={{ background: `var(--badge-bg-${bgColor})` }}
      className="text-no-wrap"
    >
      <span className="badge-icon">{Icon}</span>{" "}
      <span className="badge-text">{text}</span>
    </StyledBadge>
  );

  return showTooltip ? (
    <Tooltip<WrapperDivProps>
      label={tooltipText ?? ""}
      position="top"
      className="margin-right-1"
      asCustom={WrapperDiv}
    >
      {renderBadge()}
    </Tooltip>
  ) : (
    <>{renderBadge()}</>
  );
}
