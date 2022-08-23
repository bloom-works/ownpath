import React from "react";
import { GridContainer, Grid, Accordion } from "@trussworks/react-uswds";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { logPageView } from "../analytics";
import styled from "styled-components";
import { AccordionItemProps } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
          {itemKey === "toolkit" ? (
            <>
              {t("toolkitAnswer")}
              <ul>
                <li>
                  {t("toolkitAnswerDownloadFAQ")}{" "}
                  {/* For whatever reason using react-router <Link> makes these only function as page redirects,
                      not content downloads even with 'download' attribute, so use vanilla <a> instead */}
                  <a download href="/resources/BHA OwnPath FAQs (EN).pdf">
                    {t("languageValuesEnglish").split("/")[0].trim()}
                  </a>
                  ,{" "}
                  <a download href="/resources/BHA OwnPath FAQs (ES).pdf">
                    {t("languageValuesSpanish").split("/")[0].trim()}
                  </a>
                </li>
                <li>
                  {t("toolkitAnswerDownloadOnePager")}{" "}
                  <a download href="/resources/BHA OwnPath one pager (EN).pdf">
                    {t("languageValuesEnglish").split("/")[0].trim()}
                  </a>
                  ,{" "}
                  <a download href="/resources/BHA OwnPath one pager (ES).pdf">
                    {t("languageValuesSpanish").split("/")[0].trim()}
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <ReactMarkdown>
              {`${t("answerAbbreviation")}. ${t(`${itemKey}Answer`)}`}
            </ReactMarkdown>
          )}
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
