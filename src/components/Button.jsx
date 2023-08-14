import { handleShowAdd } from "../utils/add"
import { Button as BootstrapButton } from 'react-bootstrap';
import { handleLogout } from "../utils/handle";

const Button = () => {
  return <></>
}

const Create = ({ setShowAdd, children }) => {
  return (
    <>
      <BootstrapButton style={{ width: "fit-content" }} className="mb-2" variant="primary" onClick={() => handleShowAdd(setShowAdd)}>
        {children}
      </BootstrapButton>
    </>
  )
}

const Logout = ({ cookies, navigate, children }) => {
  return (
    <>
      <BootstrapButton style={{ width: "fit-content" }} className="mb-2" variant="secondary" onClick={() => handleLogout(cookies, navigate)}>
        {children}
      </BootstrapButton>
    </>
  )
}

Button.Create = Create
Button.Logout = Logout

export default Button