import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../styles/formwrapper.module.css";
import Alert from "./alert";
import ColorForm from "./colorform";

import GenaralForm from "./genaralform";
import FontForm from "./fontform";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

function Formwrapper({ data, update, loading, showmsg, showmsgtype }) {
  const router = useRouter();

  const [activeForm, setactiveForm] = useState("genaralForm");

  const logout = async () => {
    try {
      let res = await fetch(`${endpoint}/api/logout`).then((res) => res.json());
      console.log(res);

      if (res.success) {
        router.push("/admin");
      }
    } catch (error) {
      setshowmsg("Logout Error " + error.message);
    }
  };

  return (
    <>
      <div className={styles.dashform}>
        <div className="d-flex justify-content-end">
          {" "}
          <button
            className={`btn btn-primary logout-btn ${styles.logoutbtn}`}
            onClick={() => logout()}
          >
            {" "}
            logout
          </button>
        </div>

        <div className="container">
          <div className="container d-flex justify-content-center">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  activeForm === "genaralForm" ? "active" : ""
                } `}
                onClick={() => {
                  setactiveForm("genaralForm");
                }}
              >
                Genaral
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  activeForm === "colorForm" ? "active" : ""
                } `}
                onClick={() => {
                  setactiveForm("colorForm");
                }}
              >
                Colors
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                className={`btn btn-outline-primary ${
                  activeForm === "fontForm" ? "active" : ""
                } `}
                onClick={() => {
                  setactiveForm("fontForm");
                }}
              >
                Fonts
              </button>
            </div>
          </div>
          {showmsg && <Alert showmsg={showmsg} type={showmsgtype} />}
          {activeForm === "genaralForm" && (
            <GenaralForm data={data} update={update} loading={loading} />
          )}
          {activeForm === "colorForm" && (
            <ColorForm data={data} update={update} loading={loading} />
          )}{" "}
          {activeForm === "fontForm" && (
            <FontForm data={data} update={update} loading={loading} />
          )}
        </div>

        {/* <DataForm data={data} /> */}
      </div>
    </>
  );
}

export default Formwrapper;
