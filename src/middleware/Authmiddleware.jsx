import { Navigate } from 'react-router';
import Cookies from 'universal-cookie';
// eslint-disable-next-line react/prop-types
const Authmiddleware = ({ children }) => {
  const cookies = new Cookies()

  const token = cookies.get('token')

  if (!(token)) {
    return <Navigate to="/" />
  }

  return children

}

export default Authmiddleware