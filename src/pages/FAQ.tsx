import React from "react";
import { GridContainer, Grid, Accordion } from "@trussworks/react-uswds";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logPageView } from "../analytics";
import styled from "styled-components";

const StyledAccordionContent = styled.div`
margin: 2rem auto 3rem;
`;

function FAQ() {
  useEffect(() => {
    logPageView();
  }, []);

  const { t } = useTranslation();
  const PAGE_PREFIX = "pages.faq.";
  const COMPONENT_PREFIX = "components.faq.";
  const accordionsT: {
    title: React.ReactNode | string;
    content: React.ReactNode[];
  }[] = t(`${COMPONENT_PREFIX}accordions`, { returnObjects: true });
  const accordions: {
    title: React.ReactNode | string;
    content: React.ReactNode;
    expanded: boolean;
    id: string;
    headingLevel: any;
  }[] = [
    {
      title: "",
      content: "",
      expanded: true,
      id: "a1",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a2",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a3",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a4",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a5",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a6",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a7",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a8",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a9",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a10",
      headingLevel: "h4",
    },
    {
      title: "",
      content: "",
      expanded: false,
      id: "a11",
      headingLevel: "h4",
    },
  ];
  accordionsT.map((accordion, idx) => {
    let content = (
      <StyledAccordionContent key={idx}>
        {accordion.content.map((content, innerIdx) => (
          <p key={"content_" + innerIdx}>{content}</p>
        ))}
      </StyledAccordionContent>
    );
    accordions[idx].title = accordion.title;
    return (accordions[idx].content = content);
  });
  return (
    <GridContainer>
      <Grid row className="flex-justify-center">
        <h1>{t(`${PAGE_PREFIX}heading`)}</h1>
      </Grid>
      <Grid>
        <Accordion items={accordions} bordered={false} multiselectable={true} />
      </Grid>
    </GridContainer>
  );
}

export default FAQ;