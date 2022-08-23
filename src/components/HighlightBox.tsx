import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

const Highlight = styled.div`
  background-color: #9ac6e533;
`;

type HighlightBoxProps = {
  size: "sm" | "md";
};

function HighlightBox({
  children,
  size,
}: PropsWithChildren<HighlightBoxProps>) {
  const padding = size === "sm" ? "padding-2" : "padding-3";
  return (
    <Highlight className={`radius-lg bg-primary-lighter ${padding}`}>
      {children}
    </Highlight>
  );
}

export default HighlightBox;
