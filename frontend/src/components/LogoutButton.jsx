import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 text-white">
      Logout
    </button>
  );
};

export default LogoutButton;
