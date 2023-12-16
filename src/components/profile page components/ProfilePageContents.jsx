import AddressBook from "./AddressBook";
import ChatWithUs from "./chatWithUs";
import Security from "./security";
import Theme from "./theme";
import WishList from "./wishList";
import PersonalInfoProfile from "./personalInfo";
import AllUserOrdrs from "./allUserOrders";
function ProfilePageContents(props) {
  /// get the section
  const { section } = props;
  return (
    <div className="h-fit">
      {section == "personalInfo" && <PersonalInfoProfile />}
      {section == "allUserOrders" && <AllUserOrdrs />}
      {section == "addressBook" && <AddressBook />}
      {section == "chat" && <ChatWithUs />}
      {section == "security" && <Security />}
      {section == "theme" && <Theme />}
      {section == "wishList" && <WishList />}
    </div>
  );
}

export default ProfilePageContents;
