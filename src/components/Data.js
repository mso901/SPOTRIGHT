/** @format */

import DataView from "./SideData/DataView.js";
function Data() {
  return (
    <div className="data">
      <div className="section">
        <div className="section_head">
          <h3>spot 치안</h3>
          <span>?</span>
        </div>
        <DataView />
        <ul>
          <li>cctv</li>
          <li>보안등</li>
          <li>거리</li>
        </ul>
      </div>
    </div>
  )
}

export default Data
