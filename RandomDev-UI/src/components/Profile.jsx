import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfie";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user ? <EditProfile user={user} /> : null;
};

export default Profile;