
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../consts/routes';
import logo from '../../assets/logo.svg';

function Logo() {
  return (
    <div className="logo">
      <NavLink to={ROUTES.HOME.url}>
        <img src={logo} alt="Spaceso" />
      </NavLink>
    </div>
  )
}

export default Logo