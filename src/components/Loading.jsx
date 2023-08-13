import { Stack } from 'react-bootstrap'

const Loading = () => {
  return (
    <Stack direction="horizontal" className="py-5 mx-auto" gap={2}>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Stack>
  )
}

export default Loading