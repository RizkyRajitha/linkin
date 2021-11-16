import { isEmpty, isHex } from "../lib/side";
// import Image from "next/image";

export default function Home({
  handlerText,
  bgColor,
  handlerLink,
  avatarUrl,
  accentColor,
  avatarwidth,
  avatarBorderColor,
  handlerFontSize,
  handlerFontColor,
  fontFamily,
  fontUrl,
  linkData,
  socialData,
  footerText,
  footerTextSize,
  footerBgColor,
  footerTextColor,
  handlerDescriptionFontColor,
  handlerDescription,
  bgImgUrl,
  footerEnabled,
  linkPadding,
  linktreeWidth,
  preview = false,
}) {
  let linkPaddingLowWidth = isEmpty(linkPadding)
    ? "2em"
    : `${linkPadding * 0.5}em`;

  accentColor = isEmpty(accentColor) ? "#BDD7FF" : accentColor;
  avatarwidth = isEmpty(avatarwidth) ? "50" : avatarwidth;
  avatarBorderColor = isEmpty(avatarBorderColor) ? "#fff" : avatarBorderColor;
  handlerFontSize = isEmpty(handlerFontSize) ? "15" : handlerFontSize;
  handlerFontColor = isEmpty(handlerFontColor) ? "#fff" : handlerFontColor;
  bgColor = isEmpty(bgColor) ? "#fff" : bgColor;
  fontFamily = isEmpty(fontFamily) ? "'Roboto', sans-serif" : fontFamily;
  fontUrl = isEmpty(fontUrl)
    ? "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    : fontUrl;
  footerTextSize = isEmpty(footerTextSize) ? 12 : footerTextSize;
  footerBgColor = isEmpty(footerBgColor) ? "" : footerBgColor;
  footerTextColor = isEmpty(footerTextColor) ? "#ffffff" : footerTextColor;
  linkPadding = isEmpty(linkPadding) ? "2em" : `${linkPadding}em`;
  linktreeWidth = isEmpty(linktreeWidth) ? "320px" : `${linktreeWidth}px`;

  return (
    <div>
      <div className="outterwrap">
        <div className="wrap">
          <div className="profile">
            {!isEmpty(avatarUrl) && <img src={avatarUrl} className="photo" />}
            <span className="handlerText">
              <a
                className="handlerLink"
                href={`${handlerLink || "#"}`}
                target="_blank"
              >
                {handlerText}{" "}
              </a>
            </span>

            <p className="handlerDescription">{handlerDescription}</p>
          </div>
          <div className="social">
            <ul>
              {socialData.map((link, id) => {
                return (
                  <li key={id}>
                    <a
                      href={`${link.linkUrl || "#"}`}
                      className="social_icon"
                      target="_blank"
                      style={{
                        backgroundColor: link.bgColor || "#2c6bed",
                        color: link.textColor || "#ffffff",
                        borderRadius: `${link.borderRadius || "4"}px`,
                      }}
                    >
                      {link.iconClass && (
                        <i
                          className={`${link.iconClass} single_icon fa-fw`}
                        ></i>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="links">
            <ul>
              {linkData.map((link, id) => {
                return (
                  <li key={id}>
                    <a
                      href={`${link.linkUrl || "#"}`}
                      className="link"
                      target="_blank"
                      style={{
                        backgroundColor: link.bgColor || "#2c6bed",
                        color: link.textColor || "#ffffff",
                        borderRadius: `${link.borderRadius || "4"}px`,
                      }}
                    >
                      {link.iconClass && (
                        <i className={`${link.iconClass} icon`}></i>
                      )}
                      <div className="d-flex w-100 align-items-center justify-content-center">
                        {link.displayText}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {footerEnabled && (
          <div className="footer d-flex align-items-center justify-content-center">
            {/* Copyright © 2021 All Rights Reserved by. */}
            {footerText}
          </div>
        )}
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
          // padding: 15px;
          padding-top:2vh ;
          height: 100%;
          min-height: "100vh";
          // min-height: ${footerEnabled ? "96vh" : "100vh"};
          width: 100%;
          font-family: ${fontFamily};
          background: ${bgColor};
          ${bgImgUrl ? `background-image: url("${bgImgUrl}");` : ""}
          ${bgImgUrl ? `background-repeat: no-repeat;` : ""}
          ${bgImgUrl ? `background-position: center;` : ""}
          ${bgImgUrl ? `background-size: cover;` : ""}
        }

        .wrap {
          min-height: ${footerEnabled ? "94vh" : "100vh"};
          height: 100%;
          width: 100%;
          max-width: ${linktreeWidth};
          padding: 0  1em 0 1em;
          margin: 0 auto;
        }

        .handlerLink {
          text-decoration: dashed;
        }

        .handlerDescription {
          text-align: center;
          text-justify: inter-word;
          background: ${handlerDescriptionFontColor};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; 
          -moz-background-clip: text;
          -moz-text-fill-color: transparent;
          // color: ${handlerDescriptionFontColor};
        }

        .footer {
          // position: absolute;
          right: 0;
          // bottom: 0;
          height: 4vh;
          ${preview ? "" : "left: 0 ; "}
          //padding: 1rem;
          background: ${footerBgColor};
          // background-color: ${footerBgColor};
          text-align: center;
          color: ${footerTextColor};
          font-size: ${footerTextSize}px;
          // width: ${preview ? "40%" : "100%"};
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
          background: ${avatarBorderColor};
        }

        .handlerText {
          padding: 10px;
          font-weight: bold;
          display: block;
          font-size: ${handlerFontSize}px;
        }

        .social {
          // margin: 0 -2rem 0 -2rem;
        }
        .social ul {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          width: fit-content;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        .social ul li {
          margin: 7px;
        }

        .social_icon {
          display: inline-flex;
          padding: 0.5rem;
          text-align: center;
          text-decoration: none;
          border-radius: 4px;
          transition: ease all 0.3s;
          color: #fff;
          align-items: center;
        }

        .social_icon:hover {
          opacity: 0.9;
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
          padding: ${linkPadding};
          display: flex;
          text-align: center;
          text-decoration: none;
          border-radius: 4px;
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

        .single_icon {
          font-size: 2rem;
        }

        @media (max-width: 768px) {
          .link {
            padding : ${linkPaddingLowWidth};
            // padding: 1.2rem;
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
