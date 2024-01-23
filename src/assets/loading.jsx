
const LoadingSpinner = (props) => {
  let {color} = props;
  return (
    <div className="flex justify-center items-center h-screen w-full z-10">
      <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-l-2 border-r border-${color}`}/>
    </div>
  );
};

export default LoadingSpinner;
