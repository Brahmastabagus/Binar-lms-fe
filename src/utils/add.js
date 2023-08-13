import { toast } from "react-toastify";
import { getTodo, setTodo } from "../stores/todoSlice";
import optionToast from "../constants/optionToast";

export const handleCloseAdd = (setShowAdd) => setShowAdd(false);
export const handleShowAdd = (setShowAdd) => setShowAdd(true);
export const handleAdd = async (setShowAdd, setLoading, formValue, decode, dispatch) => {
  e => {
    e.preventDefault()
  }
  setLoading(true)

  const res = await dispatch(setTodo({ ...formValue, user_id: decode.id }))

  try {
    if (res.payload.status == "success") {
      await toast.success(`${res.payload.message}`, optionToast)

      dispatch(getTodo())
      setLoading(false)
      setShowAdd(false)
    } else {
      await toast.error(`${res.payload.message}`, optionToast)

      setLoading(false)
    }
  } catch (err) {
    await toast.error(`${err.status}`, optionToast)

    setLoading(false)
    setShowAdd(false)
  }
}