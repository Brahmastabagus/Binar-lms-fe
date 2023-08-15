import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import optionToast from '../constants/optionToast';

const Authmiddleware = ({ children }) => {
  const cookies = new Cookies()

  const token = cookies.get('token')

  if (!(token)) {
    toast.error("Sign-in is required to access this page. Please log in or sign up.", optionToast);

    return (
      <>
        <ToastContainer />
        {
          setTimeout(() => {
            window.location.replace('/')
          }, 2000)
        }
      </>
    )
  }

  return children

}

export default Authmiddleware