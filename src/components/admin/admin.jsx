import { useState, useEffect } from "react";
import AdminProducts from "./adminComponents/products/admin_product";
import MianBlogDashboard from "./adminComponents/blog/mainBlog";
import AdminSettings from "./adminComponents/admin-settings/adminSettings";
import AdminOrders from "./adminComponents/orders/adminOrders";
import GetAllEmployess from "./adminComponents/employees/getAllEmployess";
import MainDashboard from "./adminComponents/dashboard/mainDashboard";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import MainReturn from "./adminComponents/returns/mainReturn";
import MainMarketing from "./adminComponents/marketing/mainMarketing";
//// appolo server
const client = new ApolloClient({
  uri: `${import.meta.env.VITE_domain}${import.meta.env.VITE_graphqlAPI}`,
  cache: new InMemoryCache(),
});

function Admin({rule, auth}) {
  /// set search params
  let [page, setPage] = useState("settings");
  /// style
  const style = {
    btn: "w-fit py-2 px-4 flex flex-row gap-2 items-center justify-center hover:bg-gray-500",
  };
  /// window width
  const [window_width, setWidth] = useState(window.innerWidth);
  /// render or no
  let [show, setShow] = useState(true);
  //// if winidow < 900px you can not enter the page
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    if (window_width < 900) {
      setShow(false);
    } else {
      setShow(true);
    }
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, [window_width]);
  if (!show) {
    return (
      <div className="w-full h-screen text-center text-red-600">
        you can not access this page on mobile
      </div>
    );
  }
  return (
    <ApolloProvider client={client}>
      <div className="h-fit min-h-screen w-full bg-white flex flex-col ">
        {/* nave bar */}
        <div className="w-full row-span-1 bg-gray-700 text-white flex flex-row flex-wrap gap-2 p-4 items-center justify-center">
          {/* products */}
          <button className={style.btn} onClick={() => setPage("products")}>
            products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </button>
          {/* orders */}
          <button className={style.btn} onClick={() => setPage("orders")}>
            Orders
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
              />
            </svg>
          </button>
          {/* employees */}
          <button className={style.btn} onClick={() => setPage("employees")}>
            Employees{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </button>
          {/* dashboard */}
          <button className={style.btn} onClick={() => setPage("dashboard")}>
            Dashboard
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
              />
            </svg>
          </button>
          {/* returns */}
          <button className={style.btn} onClick={() => setPage("returns")}>
            Returns
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
              />
            </svg>
          </button>
          {/* blog */}
          <button className={style.btn} onClick={() => setPage("blog")}>
            blog
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          {/* marketing */}
          <button className={style.btn} onClick={() => setPage("marketing")}>
            Marketing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </button>
          <button className={style.btn} onClick={() => auth(false)}>
           back to profile page
          </button>
        </div>

        <div className="bg-white h-fit w-full row-span-7">
          {page === "products" && <AdminProducts />}
          {page === "orders" && <AdminOrders />}
          {page === "employees" ? (
            rule === "superAdmin" ? (
              <GetAllEmployess />
            ) : (
              <div className="h-screen w-full p-10 text-center text-red-500">
                UnAuthorized
              </div>
            )
          ) : null}

          {page === "settings" && <AdminSettings />}
          {page === "returns" && <MainReturn/>}
          {page === "dashboard" && <MainDashboard />}
          {page === "marketing" && <MainMarketing/>}
          {page === "blog" && <MianBlogDashboard />}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default Admin;
