import React from "react";
import type { LinksFunction } from "@remix-run/server-runtime";
import styles from "./AnimationLogin.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const AnimationLogin = () => {
  return (
    <div className="animation-login">
      <div className="arrow arrow--top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="270.11"
          height="649.9"
          overflow="visible"
        >
          <g className="item-to bounce-1">
            <path
              className="geo-arrow draw-in"
              d="M135.06 142.564L267.995 275.5 135.06 408.434 2.125 275.499z"
            />
          </g>
          <circle
            className="geo-arrow item-to bounce-2"
            cx="194.65"
            cy="69.54"
            r="7.96"
          />
          <circle
            className="geo-arrow draw-in"
            cx="194.65"
            cy="39.5"
            r="7.96"
          />
          <circle
            className="geo-arrow item-to bounce-3"
            cx="194.65"
            cy="9.46"
            r="7.96"
          />
          <g className="geo-arrow item-to bounce-2">
            <path
              className="st0 draw-in"
              d="M181.21 619.5l13.27 27 13.27-27zM194.48 644.5v-552"
            />
          </g>
        </svg>
      </div>
      <div className="arrow arrow--bottom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31.35"
          height="649.9"
          overflow="visible"
        >
          <g className="item-to bounce-1">
            <circle
              className="geo-arrow item-to bounce-3"
              cx="15.5"
              cy="580.36"
              r="7.96"
            />
            <circle
              className="geo-arrow draw-in"
              cx="15.5"
              cy="610.4"
              r="7.96"
            />
            <circle
              className="geo-arrow item-to bounce-2"
              cx="15.5"
              cy="640.44"
              r="7.96"
            />
            <g className="item-to bounce-2">
              <path
                className="geo-arrow draw-in"
                d="M28.94 30.4l-13.26-27-13.27 27zM15.68 5.4v552"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className="main">
        <div className="main__text-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="dotted-circle"
            width="352"
            height="352"
            overflow="visible"
          >
            <circle
              cx="176"
              cy="176"
              r="174"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeDasharray="12.921,11.9271"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimationLogin;
