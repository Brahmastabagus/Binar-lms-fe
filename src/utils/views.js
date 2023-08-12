export const handleCloseView = (setShowView) => setShowView(false);
export const handleShowView = (data, setShowView, setSelectData) => {
  setShowView(true)
  setSelectData({ ...data })
};