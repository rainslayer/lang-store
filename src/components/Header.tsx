import { Layout, Row } from "antd";
import Link from "antd/es/typography/Link";
import { ERoutes } from "../const/types";
import { HeaderCart } from "./HeaderCart";

export function Header() {
  return (
    <Layout.Header>
      <Row justify="space-between" align="middle">
        <Link className="nav_button home_button" href={ERoutes.Catalogue}>
          LangStore
        </Link>
        <HeaderCart />
      </Row>
    </Layout.Header>
  );
}
