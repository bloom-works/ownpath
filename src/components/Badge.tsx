import { Tag } from "@trussworks/react-uswds";
import { PropsWithChildren } from "react";
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

type BadgeProps = {
    bgColor: 'blue' | 'yellow';
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
};

export default function Badge({ Icon, bgColor, text }: PropsWithChildren<BadgeProps>) {
    return (
        <StyledBadge background={`var(--badge-bg-${bgColor})`}>
            <span className="badge-icon"><Icon /></span>{' '}<span className="badge-text">{text}</span>
        </StyledBadge>
    );
}