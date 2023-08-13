import { toast } from "react-toastify";
import { getTodo, updateTodo } from "../stores/todoSlice";
import { optionToast } from "../constants/optionToast";

export const handleCloseUpdate = (setShowUpdate) => setShowUpdate(false);
export const handleShowUpdate = (data, setShowUpdate, setSelectData) => {
  setShowUpdate(true)
  setSelectData({ ...data })
};

export const handleUpdate = async (setLoading, dispatch, formValue, selectData, setShowUpdate) => {
  e => e.preventDefault()
  setLoading(true)

  const res = await dispatch(updateTodo({ ...formValue, id: selectData.id }))

  try {
    if (res.payload.status == "success") {
      await toast.success(`${res.payload.message}`, optionToast)
      dispatch(getTodo())
      setLoading(false)
      setShowUpdate(false)
    } else {
      await toast.error(`${res.payload.message}`, optionToast)
      setLoading(false)
    }
  } catch (err) {
    await toast.error(`${err.status}`, optionToast)
    setLoading(false)
    setShowUpdate(false)
  }
}