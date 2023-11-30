
const LoadingSpinner = (props) => {
  let {color} = props;
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-${color}`}></div>
    </div>
  );
};

export default LoadingSpinner;