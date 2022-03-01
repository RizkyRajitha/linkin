import { isEmpty, isHex } from "../lib/side";
import Links from "./linktree/links";
import SocialIcons from "./linktree/socialicons";
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
  iconsPosition,
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
  handlerLink = isEmpty(handlerLink) ? "#" : handlerLink;

  let bgImage = isEmpty(bgImgUrl)
    ? ""
    : `background-image: url("${bgImgUrl}");`;
  let bgRepeat = isEmpty(bgImgUrl) ? "" : "background-repeat: no-repeat;";
  let bgPosition = isEmpty(bgImgUrl) ? "" : "background-position: center;";
  let bgSize = isEmpty(bgImgUrl) ? "" : "background-size: cover;";

  return (
    <div>
      <div className="outterwrap">
        <div className="wrap">
          <div className="profile">
            {!isEmpty(avatarUrl) && <img src={avatarUrl} className="photo" />}
            <span className="handlerText">
              <a className="handlerLink" href={handlerLink} target="_blank">
                {handlerText}
              </a>
            </span>

            <p className="handlerDescription">{handlerDescription}</p>
          </div>

          {iconsPosition === "top" && <SocialIcons socialData={socialData} />}
          <Links linkData={linkData} linkPadding={linkPadding} />
          {iconsPosition === "bottom" && (
            <SocialIcons socialData={socialData} />
          )}
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

        @import url("https://use.fontawesome.com/releases/v5.15.4/css/all.css");

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
          ${bgImage}
          ${bgRepeat}
          ${bgPosition}
          ${bgSize}
        }

        .wrap {
          min-height: ${footerEnabled ? "94vh" : "98vh"};
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
