import { Fragment } from "react";
import { Link } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";

function CheckoutNav() {
  return (
    <Fragment>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <Link to={"/"} className="text-2xl font-bold text-green-700">
          Green Galaxy Checkout Page
        </Link>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-green-200 text-xs font-semibold text-emerald-700"
                  to={"/all-products"}
                >
                  {/* check */}
                  <CiCircleCheck className="text-green-700 text-4xl font-bold" />
                </Link>
                <span className="font-semibold text-gray-700">Shop</span>
              </li>
              <MdNavigateNext className="text-gray-700 text-2xl" />
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href={"#shipping"}
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#payment"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CheckoutNav;
