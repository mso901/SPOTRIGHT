/** @format */

import logo from './logo.png';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <input />
      </header>
      <nav>
        <ul>
          <li>menu1</li>
          <li>menu2</li>
          <li>menu3</li>
          <li>menu4</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
