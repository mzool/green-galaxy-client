import ChatWithUs from "./chatWithUs";
import Security from "./security";
import PersonalInfoProfile from "./personalInfo";
import AllUserOrdrs from "./allUserOrders";
function ProfilePageContents(props) {
  /// get the section
  const { section } = props;
  return (
    <div className="h-fit">
      {section == "personalInfo" && <PersonalInfoProfile />}
      {section == "allUserOrders" && <AllUserOrdrs />}
      {section == "chat" && <ChatWithUs />}
      {section == "security" && <Security />}
    </div>
  );
}

export default ProfilePageContents;
