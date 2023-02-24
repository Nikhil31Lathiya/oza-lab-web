import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <i className="ti-shield menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ui-elements" className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i className="ti-palette menu-icon"></i>
            <span className="menu-title">UI Elements</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <NavLink to="/ui-elements/buttons" className="nav-link">Buttons</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ui-elements/typography" className="nav-link">Typography</NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <NavLink to="/form-elements" className="nav-link">
            <i className="ti-layout-list-post menu-icon"></i>
            <span className="menu-title">Form elements</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user-pages" className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <i className="ti-user menu-icon"></i>
            <span className="menu-title">User Pages</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <NavLink to="/user-pages/login" className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user-pages/login-2" className="nav-link">Login 2</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user-pages/register" className="nav-link">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user-pages/register-2" className="nav-link">Register 2</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user-pages/lock-screen" className="nav-link">Lockscreen</NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
