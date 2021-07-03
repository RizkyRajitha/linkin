import { isEmpty } from "../lib/side";
// import Image from "next/image";

export default function Home({
  handlerText,
  bgColor,
  handlerLink,
  avatarUrl,
  accentColor,
  avatarwidth,
  handlerFontSize,
  handlerFontColor,
  fontFamily,
  fontUrl,
  linkData,
  footerText,
  footerTextSize,
  footerBgColor,
  footerTextColor,
  preview = false,
}) {
  accentColor = isEmpty(accentColor) ? "#BDD7FF" : accentColor;
  avatarwidth = isEmpty(avatarwidth) ? "50" : avatarwidth;
  handlerFontSize = isEmpty(handlerFontSize) ? "15" : handlerFontSize;
  handlerFontColor = isEmpty(handlerFontColor) ? "#fff" : handlerFontColor;
  bgColor = isEmpty(bgColor) ? "#fff" : bgColor;
  fontFamily = isEmpty(fontFamily) ? "'Roboto', sans-serif" : fontFamily;
  fontUrl = isEmpty(fontUrl)
    ? "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    : fontUrl;
  footerTextSize = isEmpty(footerTextSize) ? 12 : footerTextSize;
  footerBgColor = isEmpty(footerBgColor) ? "#000000" : footerBgColor;
  footerTextColor = isEmpty(footerTextColor) ? "#ffffff" : footerTextColor;

  return (
    <div>
      <div className="outterwrap">
        <div className="wrap">
          <div className="profile">
            <img src={avatarUrl} className="photo" />
            <a
              className="handlerLink"
              href={`${handlerLink || "#"}`}
              target="_blank"
            >
              <span className="handlerText">{handlerText}</span>
            </a>
          </div>
          <div className="links">
            <ul>
              {/* {[...linkData, ...linkData, ...linkData].map((element, id) => { */}
              {linkData.map((element, id) => {
                return (
                  <li key={id}>
                    <a
                      href={`${element.linkUrl || "#"}`}
                      className="link"
                      target="_blank"
                      style={{
                        backgroundColor: element.bgColor || "#2c6bed",
                        color: element.textColor || "#ffffff",
                      }}
                    >
                      {element.iconClass && (
                        <i className={`${element.iconClass} icon`}></i>
                      )}
                      <div className="d-flex w-100 align-items-center justify-content-center">
                        {element.displayText}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer d-flex align-items-center justify-content-center">
        {/* Copyright © 2021 All Rights Reserved by. */}
        {footerText}
      </div>
      <style
        jsx
        onError={(e) => {
          console.log(e);
        }}
      >{`
        @import url("${fontUrl}");

        @import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

        .outterwrap {
          margin: 0;
          padding: 15px;
          height: 100%;
          min-height: 96vh;
          width: 100%;
          font-family: ${fontFamily};
          background: ${bgColor};
        }

        .wrap {
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }

        .handlerLink {
          text-decoration: dashed;
        }

        .footer {
          position: absolute;
          right: 0;
          // bottom: 0;
          height: 4vh;
          ${preview ? "" : "left: 0 ; "}
          //padding: 1rem;
          background-color: ${footerBgColor};
          text-align: center;
          color: ${footerTextColor};
          font-size: ${footerTextSize}px;
          width: ${preview ? "40%" : "100%"};
        }

        a {
          color: ${handlerFontColor};
        }

        a:hover {
          color: ${accentColor};
        }

        .profile {
          text-align: center;
          color: #fff;
        }

        .photo {
          border-radius: 50%;
          width: ${avatarwidth}%;
          padding: 4px;
          background: #fff;
        }

        .handlerText {
          padding: 10px;
          font-weight: bold;
          display: block;
          font-size: ${handlerFontSize}px;
        }

        .links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .links ul li {
          margin: 14px 0;
        }
        .link {
          padding: 2rem;
          display: flex;
          text-align: center;
          text-decoration: none;
          border-radius: 4px;
          transition: ease all 0.3s;
          color: #fff;
          align-items: center;
        }
        .link:hover {
          opacity: 0.9;
        }

        .icon {
          // padding: 1rem;
          font-size: 1.7rem;
        }
      `}</style>
    </div>
  );
}
//

// position: absolute;
// right: 0;
// bottom: 0;
// ${preview ? "" : "left: 0 ; "}
// padding: 1rem;
// background-color: #000;
// text-align: center;
// color: #fff;
// font-size: 0.6rem;
// width: ${preview ? "50%" : "100%"};
