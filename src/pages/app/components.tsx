import ToggleLang from "components/_Custom/Toggle/ToggleLang/ToggleLang";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Col, Row } from "rsuite";

const HomePage = () => {
  const { t } = useTranslation("common");
  return (
    <Row>
      <Col md={24} className="mb-5 flex items-center gap-3">
        <span className="block font-bold text-3xl">Next translate</span>{" "}
        <ToggleLang placement="bottom" />
      </Col>
      <Col xs={24}>
        <span className="block">{t("HOME.text")}</span>
      </Col>
    </Row>
  );
};

export default HomePage;
