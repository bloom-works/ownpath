import React from "react";
import { Tag, Tooltip } from "@trussworks/react-uswds";
import styled from "styled-components";

const StyledBadge = styled(Tag)`
    color: var(--dark-blue);
    font-family: "MuseoSlab";
    border-radius: 1rem;
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
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

const StyledWrapperDiv = styled.div`
    + .usa-tooltip__body {
        font-family: "Source Sans Pro Web";
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
    bgColor: 'blue' | 'yellow';
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
};

type BadgeProps = CommonBadgeProps & ConditionalBadgeProps;

// ForwardRef of wrapper div around Tag component
type WrapperDivProps = React.PropsWithChildren<{
    className?: string;
}> &
    JSX.IntrinsicElements['div'] &
    React.RefAttributes<HTMLDivElement>;
const WrapperDivForwardRef: React.ForwardRefRenderFunction<
    HTMLDivElement,
    WrapperDivProps
> = ({ className, children, ...tooltipProps }: WrapperDivProps, ref) => (
    <StyledWrapperDiv ref={ref} className={className} {...tooltipProps}>
        {children}
    </StyledWrapperDiv>
);
const WrapperDiv = React.forwardRef(WrapperDivForwardRef);

export default function Badge({ Icon, bgColor, text, tooltipText, showTooltip = false }: BadgeProps) {
    const renderBadge = () => (
        <StyledBadge
            background={`var(--badge-bg-${bgColor})`}>
            <span className="badge-icon"><Icon /></span>{' '}<span className="badge-text">
                {text}
            </span>
        </StyledBadge>
    );

    return (
        showTooltip ?
            <Tooltip<WrapperDivProps>
                label={tooltipText ?? ''}
                position="top"
                className="margin-right-1"
                asCustom={WrapperDiv}>
                {renderBadge()}
            </Tooltip>
            :
            <>{renderBadge()}</>

    );
}
