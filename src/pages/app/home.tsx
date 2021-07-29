// import { useLazyQuery } from "@apollo/client";
// import { gqlExample } from "gql";
import Header from "components/Header/Header";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Col, Row } from "rsuite";

const Clevers = () => {
  const { t } = useTranslation("common");

  // const [queryName, { data: queryNameData, loading: queryNameLoading }] =
  //   useLazyQuery(gqlExample.queries.QUERY_EXAMPLE);

  return (
    <>
      <Header
        {...{
          title: "Home",
          description: "Un super home para hacer lo que quieras",
        }}
      />
      <Row className="pl-1">
        <Col size="24">{t("example")}</Col>
      </Row>
    </>
  );
};
export default Clevers;
