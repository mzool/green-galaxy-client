import loader from "../assets/loader.svg"

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"><img src={loader} alt="green-galaxy-loader" /></div>
    </div>
  );
};

export default Loader;
