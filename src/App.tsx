import { Layout } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components/Header";
import { ERoutes, IAppProps } from "./const/types";
import { setDealers } from "./features/dealers/dealersSlice";
import { Cart } from "./pages/Cart";
import { Catalogue } from "./pages/Catalogue";
import { StoreState } from "./store";

function AppComponent(props: IAppProps) {
  const dispatch = useDispatch();
  const { dealers } = props;
  const { route } = useSelector((state: StoreState) => state.router);

  useEffect(() => {
    dispatch(setDealers({ dealers }));
  }, [dealers]);

  return (
    <Layout>
      <Header />
      {route === ERoutes.Catalogue ? <Catalogue /> : <Cart />}
    </Layout>
  );
}

export default AppComponent;
