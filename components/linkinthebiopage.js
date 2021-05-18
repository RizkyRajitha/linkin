import { isEmptry } from "../lib/side";

// import Head from "next/head";

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
  preview = false,
}) {
  avatarwidth = isEmptry(avatarwidth) ? "50" : avatarwidth;
  handlerFontSize = isEmptry(handlerFontSize) ? "15" : handlerFontSize;
  handlerFontColor = isEmptry(handlerFontColor) ? "#000" : handlerFontColor;
  bgColor = isEmptry(bgColor) ? "#fff" : bgColor;
  fontFamily = isEmptry(fontFamily) ? "'Roboto', sans-serif" : fontFamily;
  fontUrl = isEmptry(fontUrl)
    ? "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    : fontUrl;

  console.log(
    handlerText,
    handlerFontColor,
    handlerFontSize,
    bgColor,
    avatarwidth
  );
  return (
    <div className="outterwrap">
      <div className="wrap">
        <div className="profile">
          <img src={avatarUrl} className="photo" />
          <a className="handlerLink" href={`${handlerLink}`} target="_blank">
            <span className="handlerText">{handlerText}</span>
          </a>
        </div>
        {/* <div className={style.links}>
          <ul>
            <li>
              <a
                href="https://www.wonderousnightsky.store/"
                className={style.link}
                target="_blank"
              >
                <i className={`fas fa-store ${style.iconpadding}`}></i>Checkout
                My Shop
              </a>
            </li>
            <li>
              <a
                href="https://www.paypal.com/paypalme/wonderousnightsky?locale.x=en_US"
                className={style.link}
                target="_blank"
              >
                <i
                  className={`fab fa-paypal ${style.iconpadding} ${style.paypalicon}`}
                ></i>
                Support My Page
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/wonderousnightsky/?hl=en"
                className={style.link}
                target="_blank"
              >
                <i
                  className={`fab fa-instagram ${style.iconpadding} ${style.paypalicon}`}
                ></i>
                DM for collaborations
              </a>
            </li>
          </ul> */}
        {/* <!-- <div className="card">
          <h3>Card</h3>
          <p>Just a card to display some information ...</p>
        </div> --> */}
        {/* </div> */}
        {/* <div className="footer">
          Copyright © 2021 All Rights Reserved by {footerText}.
        </div> */}
      </div>
      <style jsx>{`
        @import url("${fontUrl}");

        .outterwrap {
          margin: 0;
          padding: 15px;
          height: 100vh;
          width: 100%;
          font-family: ${fontFamily};
          background: ${bgColor};
        }

        .handlerLink {
          text-decoration: dashed;
        }

        .footer {
          position: absolute;
          right: 0;
          bottom: 0;
          ${preview ? "" : "left: 0 ; "}
          padding: 1rem;
          background-color: #000;
          text-align: center;
          color: #fff;
          font-size: 0.6rem;
          width: ${preview ? "50%" : "100%"};
        }

        a {
          color: ${handlerFontColor};
        }

        a:hover {
          color: ${accentColor};
        }

        .wrap {
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
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
      `}</style>
    </div>
  );
}
//
