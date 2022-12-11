import {
  Button,
  Empty,
  Image,
  InputNumber,
  Row,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "antd/es/typography/Link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ICartItem, IProduct } from "src/const/types";
import { clearCart, setAmmount } from "src/features/cart/cartSlice";
import { store, StoreState } from "src/store";

const { Text } = Typography;

const columns: ColumnsType<ICartItem> = [
  {
    title: "Image",
    dataIndex: "image",
    render: (link: string, data: IProduct) => (
      <Image
        src={"https://test-frontend.dev.int.perx.ru" + link}
        alt={data.name}
        width={50}
        height={50}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (value: number) => <Text>${value}</Text>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 250,
    render: (value: number, item: ICartItem) => (
      <InputNumber
        name="amount"
        className="amount_input"
        value={value}
        onChange={(value: number | null) =>
          store.dispatch(setAmmount({ ...item, amount: value ?? item.amount }))
        }
      />
    ),
  },
  {
    title: "Total",
    render: (item: ICartItem) => (
      <Text>${(item.amount * item.price).toFixed(2)}</Text>
    ),
  },
];

export function Cart() {
  const { cart, count } = useSelector((state: StoreState) => state.cart);
  const data: ICartItem[] = useMemo(
    () =>
      Object.keys(cart).map((key: string) => {
        return {
          ...cart[key],
          name: key,
        };
      }),
    [cart]
  );

  if (count === 0) {
    return (
      <Empty
        description={
          <Text>
            Nothing in the cart yet. Go to the{" "}
            <Link href="/catalogue">catalogue</Link> and choose something
          </Text>
        }
      />
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.name}
      title={() => (
        <Row className="table_title" justify="space-between" align="middle">
          <Text strong>Cart</Text>

          <Button type="link" onClick={() => store.dispatch(clearCart())}>
            Clear cart
          </Button>
        </Row>
      )}
      summary={(pageData: readonly ICartItem[]) => {
        if (count) {
          const total = pageData
            .reduce(
              (acc: number, item: ICartItem) => acc + item.amount * item.price,
              0
            )
            .toFixed(2);

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1} />
              <Table.Summary.Cell index={2} />
              <Table.Summary.Cell index={3}>
                <Text>{count}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <Text>${total}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }
      }}
      bordered
    />
  );
}
