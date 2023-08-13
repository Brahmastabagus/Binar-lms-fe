import { toast } from "react-toastify";
import { deleteTodo, getTodo } from "../stores/todoSlice";

export const handleCloseDelete = (setShowDelete) => setShowDelete(false);
export const handleShowDelete = (index, setShowDelete, setIdDelete) => {
  setShowDelete(true)
  setIdDelete(index)
};
export const handleDelete = async (setLoading, dispatch, idDelete, setShowDelete) => {
  e => e.preventDefault()
  setLoading(true)

  const res = await dispatch(deleteTodo(idDelete))

  try {
    if (res.payload.status == "success") {
      await toast.success(`${res.payload.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      dispatch(getTodo())
      setLoading(false)
      setShowDelete(false)
    } else {
      await toast.error(`${res.payload.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

      setLoading(false)
    }
  } catch (err) {
    await toast.error(`${err.status}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    setLoading(false)
    setShowDelete(false)
  }
}