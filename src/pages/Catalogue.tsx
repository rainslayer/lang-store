import { Button, Form, Image, InputNumber, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { IProduct } from "src/const/types";
import { addToCart } from "src/features/cart/cartSlice";
import { useGetProductsQuery } from "src/features/catalogue/catalogueApi";
import { store, StoreState } from "src/store";

const { Text } = Typography;

interface IValues {
  amount: number;
}

const columns: ColumnsType<IProduct> = [
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
    title: "Add to cart",
    key: "add_to_cart",
    width: "35%",
    render: (data: IProduct) => {
      return (
        <Form
          className="add_to_cart__form"
          initialValues={{ amount: 1 }}
          onFinish={(values: IValues) =>
            store.dispatch(addToCart({ ...data, amount: values.amount }))
          }
        >
          <Form.Item name="amount">
            <InputNumber
              className="add_to_cart__input"
              addonBefore="Amount:"
              min={1}
            />
          </Form.Item>
          <Form.Item className="add_to_cart__button">
            <Button htmlType="submit">Add to cart</Button>
          </Form.Item>
        </Form>
      );
    },
  },
];

export function Catalogue() {
  const { dealers } = useSelector((state: StoreState) => state.dealers);
  const { data, isLoading } = useGetProductsQuery(dealers);

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.name}
      loading={isLoading}
      title={() => (
        <Text className="table_title" strong>
          Catalogue
        </Text>
      )}
      bordered
    />
  );
}
