import { Row } from "antd";
import Link from "antd/es/typography/Link";
import { useSelector } from "react-redux";
import { ReactComponent as CartSvg } from "src/common/images/svg/cart.svg";
import { ERoutes } from "src/const/types";
import { StoreState } from "src/store";

export function HeaderCart() {
  const { count } = useSelector((state: StoreState) => state.cart);

  return (
    <Row align="middle" className="header_cart">
      <CartSvg />
      <Link className="nav_button" href={ERoutes.Cart}>
        Cart ({count})
      </Link>
    </Row>
  );
}
