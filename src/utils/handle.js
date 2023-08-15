import { toast } from "react-toastify";
import optionToast from "../constants/optionToast";
import { getTodo, setCompletedTodo } from "../stores/todoSlice";

export const handleCheck = async ({ id, title, completed }, dispatch) => {
  await dispatch(setCompletedTodo(id))
  dispatch(getTodo())

  if (completed == false) {
    toast.success(`${title} is completed`, optionToast);
  } else {
    toast.warning(`${title} is not completed`, optionToast);

  }
}
export const handleLogout = (cookies, navigate) => {
  cookies.remove("token", {
    path: "/",
    // expires: new Date(new Date().getTime() + 200 * 1000)
  });
  toast.error("You have successfully logged out", optionToast);

  setTimeout(() => {
    navigate("/")
  }, 2000);
  // window.location.replace('/')
}