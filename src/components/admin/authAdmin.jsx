import { useState, useEffect } from "react";
import LoadingSpinner from "../../assets/loading";
import Admin from "./admin";
import sendOTP from "../../functions/sendOTP.js";
import OTPForm from "./adminComponents/authAdminComponents/OTPForm.jsx";
import { useNavigate } from "react-router-dom";
import checkAdminCookie from "../../functions/checkAdminCookie.js";
function AuthAdmin({auth}) {
  /// rule
  const [rule, setRule] = useState("");
  //// navigate
  const navigate = useNavigate();
  /// is fetching
  const [isFetching, setIsFetching] = useState(true);
  //// show form or not
  const [form, setForm] = useState(false);
  //// show admin page
  const [adminPage, setAdmin] = useState(false);
  //// too many attempts
  const [tooMany, setTooMany] = useState(false);
  ///send otp to admin
  useEffect(() => {
    /// check if there is an admin cookie
    checkAdminCookie().then((res) => {
      if (res.status != 200) {
        //// send otp
        sendOTP().then((res) => {
          if (res.status == 429) {
            setTooMany(true);
          } else {
            res
              .json()
              .then((data) => {
                if (data.success) {
                  setForm(true);
                } else {
                  navigate("/profile");
                }
              })
              .finally(() => {
                setIsFetching(false);
              });
          }
        });
      } else {
        res
          .json()
          .then((data) => {
            if (data.success) {
              setRule(data.rule);
            }
          })
          .finally(() => {
            setAdmin(true);
            setIsFetching(false);
          });
      }
    });
  }, []);
  //// rendering
  if (tooMany) {
    return (
      <div className="w-full h-screen text-center font-bold text-red-600 text-2xl py-10">
        Too many request initiate in short time, please try again in hour.
      </div>
    );
  }
  /// show otp form
  if (form) {
    return <OTPForm admin={setAdmin} form={setForm} setRule={setRule}/>;
  }
  if (adminPage) {
    return <Admin rule={rule} auth={auth}/>;
  }
  if (isFetching) {
    /// is fetching
    return <LoadingSpinner color={"green-500"} />;
  }
}
export default AuthAdmin;
