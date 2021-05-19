import React from "react";
import { Col, Row } from "rsuite";

import Header from "components/Header/Header";
import useTranslation from "next-translate/useTranslation";

const Clevers = () => {
  const { t } = useTranslation("common");
  return (
    // const [
    //   queryName,
    //   { data: queryNameData, loading: queryNameLoading },
    // ] = useLazyQuery(gqlQuery.queries.NAME_OF_QUERY);

    <>
      <div className="p-3">
        <Header
          {...{
            title: "Home",
            description: "Un super home para hacer lo que quieras",
          }}
        />
      </div>
      <Row>
        <Col size="24">{t("example")}</Col>
      </Row>
    </>
  );
};
export default Clevers;
