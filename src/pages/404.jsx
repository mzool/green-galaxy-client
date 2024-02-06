import TagsForSEO from "../components/utilities/reactHelmet";

const NotFound = () => {
  return (
    <div className="flex flex-raw items-center justify-center min-h-screen bg-green-50">
      <TagsForSEO
        title={"404-page not found"}
        descriptionOfThePage={"the page you searching for is not found"}
        urlToImageDescripeThePage={""}
        pageURL={"/404"}
      />
      <div className="bg-green-500 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl text-white font-semibold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-white mb-8">
          Sorry, the page you are looking for does not exist.
        </p>

        <button className="border-2 border-white text-white font-semibold mt-4 py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
          <a href="/"> Home Page</a>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
