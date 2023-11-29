import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function Ads(props = { ads: [null] }) {
  /// get props
  let { ads } = props;
  /// ads control
  let [num, setNum] = useState(0); /// ad to render
  let [theAd, setTheAd] = useState(ads[num][0]);
  /// control functions
  function nextAd() {
    setNum((prevNum) => (prevNum === ads.length - 1 ? 0 : prevNum + 1));
  }
  function prevAd() {
    setNum((prevNum) => (prevNum === 0 ? ads.length - 1 : prevNum - 1));
  }

  // Update the ad content when num changes
  useEffect(() => {
    setTheAd(ads[num][0]);
  }, [num, ads]);
  // automatically change ads
  function autoChangeAds() {
    const interval = setInterval(() => {
      nextAd();
    }, 5000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }
  // Start the autoChangeAds function when the component mounts
  useEffect(autoChangeAds, []);
  /// on hover 
  
  return (
    <div className="w-full h-5 bg-white flex flex-row m-0 gap-3 justify-center items-center text-center">
      <div className="m-0 p-0 h-5 w-5">
        <button onClick={prevAd} className="hover:bg-gray-200 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="green"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
      </div>
      <div className="text-green-600 ">
        <Link to={ads[num][1]}>{theAd}</Link>
      </div>
      <div className="m-0 p-0 h-5 w-5">
        <button onClick={nextAd} className="hover:bg-gray-200 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="green"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Ads;
