import React from "react";
import { useQuery } from "@apollo/client";
import { Col, Row } from "rsuite";
import { gqlUser } from "gql";

import Header from "components/Header/Header";

const Clevers = () => {
  // const [
  //   queryName,
  //   { data: queryNameData, loading: queryNameLoading },
  // ] = useLazyQuery(gqlQuery.queries.NAME_OF_QUERY);

  return (
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
        <Col size="24"></Col>
      </Row>
    </>
  );
};

export default Clevers;
