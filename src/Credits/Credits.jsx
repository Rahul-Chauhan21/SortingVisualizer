import React from "react";
import image from "./github-logo.svg";
import "./style.css";
function Credits() {
  return (
    <div className="credits">
      <div className="github">
        <a
          href="https://github.com/Rahul-Chauhan21/SortingVisualizer"
          title="Github"
        >
          <img height="32" width="32" src={image} alt="GitHub" />
        </a>
      </div>
      <div className="linkedin">
        <a
          href="https://www.linkedin.com/in/rahul-chauhan-80a32b194/"
          title="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 0 512 512"
            width="32px"
          >
            <g>
              <script xmlns="" className="active-path" />
              <script xmlns="" className="active-path" />
              <path
                d="m475.074219 0h-438.148438c-20.394531 0-36.925781 16.53125-36.925781 36.925781v438.148438c0 20.394531 16.53125 36.925781 36.925781 36.925781h438.148438c20.394531 0 36.925781-16.53125 36.925781-36.925781v-438.148438c0-20.394531-16.53125-36.925781-36.925781-36.925781zm-293.464844 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0"
                data-original="#000000"
                className="active-path"
                fill="#0E76A8"
              />
            </g>{" "}
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Credits;
