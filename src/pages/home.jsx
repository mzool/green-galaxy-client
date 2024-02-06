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
import TagsForSEO from "../components/utilities/reactHelmet.jsx";
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
      <TagsForSEO
        title={"Home Page"}
        pageURL={"https://green-galaxy.net"}
        descriptionOfThePage={
          "Welcome to Green Galaxy online store, you can find a high quality items with low prices or you can join our warm community and reads our blogs and stories"
        }
        urlToImageDescripeThePage={""}
      />
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
