import { useSelector } from "react-redux"
import { getTodo, todoSelector } from "../stores/todoSlice"
import { useEffect } from "react"

export function useTodo(dispatch) {
  const { status } = useSelector(state => state.todoSlice)
  const todo = useSelector(todoSelector.selectAll)

  useEffect(() => {
    dispatch(getTodo())
  }, [dispatch])

  return [status, todo]
}