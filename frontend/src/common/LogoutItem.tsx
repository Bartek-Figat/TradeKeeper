import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function useHandleLogout() {
  const navigate = useNavigate();
  return () => {
    localStorage.removeItem("token");
    navigate('/');
  };
}

export function LogoutItem() {
  const handleLogout = useHandleLogout();
  return { icon: <ArrowLeftEndOnRectangleIcon />, label: "Logout", action: handleLogout };
}