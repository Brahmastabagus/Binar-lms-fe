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