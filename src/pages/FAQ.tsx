import React from "react";
import { GridContainer, Grid, Accordion } from "@trussworks/react-uswds";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logPageView } from "../analytics";
import styled from "styled-components";
import { AccordionItemProps } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const StyledAccordionContent = styled.div`
  margin: 2rem auto 3rem;
`;

function FAQ() {
  useEffect(() => {
    logPageView();
  }, []);

  const { t } = useTranslation();

  function getAccordionItem(itemKey: string): AccordionItemProps {
    return {
      title: `${t("questionAbbreviation")}. ${t(`${itemKey}Question`)}`,
      expanded: false,
      id: itemKey,
      content: (
        <StyledAccordionContent key={itemKey}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {`${t("answerAbbreviation")}. ${t(`${itemKey}Answer`)}`}
          </ReactMarkdown>
        </StyledAccordionContent>
      ),
      headingLevel: "h2",
    };
  }
  return (
    <GridContainer>
      <Grid row className="flex-justify-center">
        <h1>{t("faqPageHeading")}</h1>
      </Grid>
      <Grid>
        <Accordion
          items={[
            "whatIsOwnPath",
            "why",
            "addressingInequality",
            "missingProviders",
            "updateInfo",
            "increaseAccess",
            "accessibility",
            "feedback",
            "dataCollection",
            "updates",
            "moreInfo",
            "toolkit",
          ].map(getAccordionItem)}
          bordered={false}
        />
      </Grid>
    </GridContainer>
  );
}

export default FAQ;