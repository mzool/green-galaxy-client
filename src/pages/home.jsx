import HeroImage from "../components/home_components/heroImage";
import getLocation from "../functions/getLocation.js";
import { useEffect, useContext, Suspense, lazy } from "react";
import NewProducts from "../components/home_components/newProducts.jsx";
import WhoWeAre from "../components/home_components/whoWeAre.jsx";
import Sales from "../components/home_components/sales.jsx";
import theStore from "../store/store.js";
import LoadingSpinner from "../assets/loading.jsx";
const LazyOurBlog = lazy(() =>
  import("../components/home_components/ourBlog.jsx")
);
const LazyHero = lazy(() => import("../components/home_components/heroImage"));
////////////////////////////////
const Home = () => {
  //// store
  const { store } = useContext(theStore);

  //// get style   /// get location
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      getLocation();
    }, 3000);
  }, []);

  return (
    <div
      className={`w-full min-h-screen h-fit bg-white text-gray-700 flex flex-col gap-6 items-center justify-center`}
    >
      <Suspense fallback={<LoadingSpinner color={"green-600"} />}>
        <LazyHero link={"/all-products"} />
      </Suspense>
      <NewProducts />
      <Sales />
      <Suspense fallback={<LoadingSpinner color={"green-600"} />}>
        <LazyOurBlog />
      </Suspense>
      <WhoWeAre />
    </div>
  );
};

export default Home;
