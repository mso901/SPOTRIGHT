/** @format */

import logo from './logo.png';
import './App.css'
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
      <div className="section">
        <h3>spot 치안</h3>
        <ul>
          <li>cctv</li>
          <li>보안등</li>
          <li>거리</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
