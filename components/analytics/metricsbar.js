import React, { useEffect, useState } from "react";
const MetricsBar = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div className="d-flex align-self-start">
              <div>Visitors</div>
            </div>
            <div className="d-flex align-self-end">
              <div>100</div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div className="d-flex align-self-start">
              <div>Visitors</div>
            </div>
            <div className="d-flex align-self-end">
              <div>100</div>
            </div>
          </div>
        </div>
        <div>
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Time
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div></div> */}
      </div>
    </>
  );
};
export default MetricsBar;
