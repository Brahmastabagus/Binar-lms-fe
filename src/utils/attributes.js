import { handleShowDelete } from "./delete"
import { handleCheck } from "./handle"
import { handleShowUpdate } from "./update"
import { handleShowView } from "./views"

const attributes = (data, index, dispatch, setShowView, setSelectData, setShowUpdate, setShowDelete, setIdDelete) => {
  return {
    data: data,
    id: index,
    handleCheck: () => handleCheck(data, dispatch),
    handleShowView: () => data?.completed ? false : handleShowView(data, setShowView, setSelectData),
    handleShowUpdate: (e) => {
      e.stopPropagation()
      data?.completed ? false : handleShowUpdate(data, setShowUpdate, setSelectData)
    },
    handleShowDelete: (e) => {
      e.stopPropagation()
      handleShowDelete(data?.id, setShowDelete, setIdDelete)
    }
  }
}

export default attributes