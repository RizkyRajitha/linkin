import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../styles/formwrapper.module.css";
import Alert from "./alert";

import ColorForm from "./colorform";
import LinksForm from "./linksform";
import GenaralForm from "./genaralform";
import FontForm from "./fontform";

const PUBLICURL =
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || "http://localhost:3000";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

function Formwrapper({ pageData, updatedPageData }) {
  const router = useRouter();

  const [activeForm, setactiveForm] = useState("genaralForm");
  const [showAlert, setshowAlert] = useState({ msg: "", type: "danger" });
  const [loading, setloading] = useState(false);

  const savePageData = async (data) => {
    setloading(true);
    setshowAlert({
      msg: "",
      type: "",
    });

    try {
      let res = await fetch(`${endpoint}/api/updatepagedata`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        if (res.message === "invalid_credential") {
          setshowAlert({
            msg: "User creadentials are not valid",
            type: "danger",
          });
        } else {
          setshowAlert({
            msg: "Server Error",
            type: "danger",
          });
        }
        return;
      }

      // console.log(res);
      setshowAlert({
        msg: "updated",
        type: "success",
      });

      // setpageData(res.updatedPageData);
      updatedPageData(res.updatedPageData);
    } catch (error) {
      console.log(error);
      setshowAlert({
        msg: "Server Error" + error.message,
        type: "danger",
      });
    }
    setloading(false);
  };

  const logout = async () => {
    try {
      let res = await fetch(`${endpoint}/api/logout`).then((res) => res.json());
      console.log(res);

      if (res.success) {
        router.push("/admin");
      }
    } catch (error) {
      setshowAlert({
        msg: "Logout Error " + error.message,
        type: "danger",
      });
    }
  };

  return (
    <>
      <div className={styles.dashform}>
        <div className="d-flex justify-content-end mb-2">
          {" "}
          <a
            className={`btn btn-outline-primary logout-btn ${styles.logoutbtn}`}
            href={`${PUBLICURL}`}
            target="_blank"
          >
            visit
          </a>
          <button
            className={`btn btn-outline-secondary logout-btn ${styles.logoutbtn}`}
            onClick={() => logout()}
          >
            logout
          </button>
        </div>

        <div className="container">
          <div className="container d-flex justify-content-center">
            <div
              className="btn-group"
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
                className={`btn btn-outline-primary ${
                  activeForm === "fontForm" ? "active" : ""
                } `}
                onClick={() => {
                  setactiveForm("fontForm");
                }}
              >
                Fonts
              </button>{" "}
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  activeForm === "linksForm" ? "active" : ""
                } `}
                onClick={() => {
                  setactiveForm("linksForm");
                }}
              >
                Links
              </button>{" "}
              {/* <button
                type="button"
                className="btn btn-outline-primary"
                className={`btn btn-outline-primary ${
                  activeForm === "fontForm" ? "active" : ""
                } `}
                onClick={() => {
                  setactiveForm("fontForm");
                }}
              >
                TODO
              </button> */}
            </div>
          </div>
          {showAlert.msg && <Alert {...showAlert} />}
          {activeForm === "genaralForm" && (
            <GenaralForm
              data={pageData}
              update={savePageData}
              loading={loading}
            />
          )}
          {activeForm === "colorForm" && (
            <ColorForm
              data={pageData}
              update={savePageData}
              loading={loading}
            />
          )}{" "}
          {activeForm === "fontForm" && (
            <FontForm data={pageData} update={savePageData} loading={loading} />
          )}
          {activeForm === "linksForm" && <LinksForm pagedataid={pageData.id} />}
        </div>
      </div>
    </>
  );
}

export default Formwrapper;
