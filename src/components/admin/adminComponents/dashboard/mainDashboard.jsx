import { useState } from "react";
import MainSales from "./sales/mainSales";
import DashboardSideBar from "./dashboardSideBar";
import OrdersChart from "./orders/ordersChart";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import MainUsers from "./users/mainUsers";
import MainCart from "./cartAnalysis/mainCart";
/// query
const GET_DATA = gql`
  query {
    getOrders {
      items {
        discount
        product {
          productName
          productId
          productCategory
          productPrice
          productBrand
        }
        color
        size
        otherVarient
        quantity
      }
      city
      email
      order_id
      order_status
    }
    getCarts {
      user {
        username
        email
        phone
      }
      items {
        size
        otherVarients
        color
        quantity
        product {
          productName
          productId
          productCategory
          productPrice
          productBrand
          productDiscount
        }
      }
      createdAt
      cart_id
    }
  }
`;

function MainDashboard() {
  /// get data
  const { loading, error, data } = useQuery(GET_DATA);
  /// to render
  const [element, setElement] = useState("sales");
  /// rendering
  return (
    <div className="grid grid-cols-8 w-full h-fit min-h-screen pt-2">
      {/* sidebar */}
      <DashboardSideBar setElement={setElement} />
      {/* main page */}
      <div className=" p-2 bg-white col-span-7 ">
        {element == "sales" && (
          <MainSales data={data} error={error} loading={loading} />
        )}
        {element == "orders" && (
          <OrdersChart data={data.getOrders} error={error} loading={loading} />
        )}
        {element == "users" && (
          <MainUsers
            data={data.getOrders.map((d) => {
              return d.email;
            })}
            error={error}
            loading={loading}
          />
        )}
        {element == "carts" && (
          <MainCart data={data.getCarts} error={error} loading={loading} />
        )}
      </div>
    </div>
  );
}

export default MainDashboard;
