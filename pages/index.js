import Head from "next/head";
// import Layout, { siteTitle } from "../components/layout";
import style from "../styles/landing.module.css";
// import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  let data;
  try {
    data = await fetch("http://localhost:3000/api/view").then((res) =>
      res.json()
    );
    console.log("nexttt");

    console.log(data);
  } catch (error) {
    console.log(error);
  }

  // .then((resolve) => {
  //   console.log(resolve);
  // })
  // .catch((reject) => {
  //   console.log(reject);
  // });

  return { props: { data } };
}

export default function Home({ data }) {
  return (
    <div className={style.outterwrap}>
      <div className={style.wrap}>
        <div className={style.profile}>
          <img src="/images/logo.jpg" className={style.photo} />
          <a
            className={style.instraghandler}
            href="https://www.instagram.com/wonderousnightsky/?hl=en"
          >
            <span className={style.profile_name}>{data.handlerText}</span>
          </a>
        </div>
        <div className={style.links}>
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
          </ul>
          {/* <!-- <div className="card">
          <h3>Card</h3>
          <p>Just a card to display some information ...</p>
        </div> --> */}
        </div>
        <div className={style.footer}>{data.footerText}</div>
      </div>
    </div>
  );
}
