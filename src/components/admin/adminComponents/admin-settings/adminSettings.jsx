import AboutUsSettings from "./aboutUs";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
function AdminSettings() {
  /// get params
  let [searchParams, setSearchParams] = useSearchParams({
    page: "settings",
    toDo: "about-us",
  });
  /// render to do settings
  let [settingsToDo, setToDo] = useState("home-page");
  /// render base on searchParams
  useEffect(() => {
    setToDo(searchParams.get("toDo"));
  }, [searchParams]);

  /// rendering
  return <div className="p-4 w-full h-fit min-h-screen bg-white m-2">{settingsToDo === "about-us" && <AboutUsSettings />}</div>;
}

export default AdminSettings;
