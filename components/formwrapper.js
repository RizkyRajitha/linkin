import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../styles/formwrapper.module.css";

import ColorForm from "./colorform";
import LinksForm from "./linksform";
import GenaralForm from "./genaralform";
import FontForm from "./fontform";
import FooterForm from "./footerform";
import PasswordChangeForm from "./passwordchangeform";

import { ToastContainer, toast } from "react-toastify";

const PUBLICURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

const version = process.env.NEXT_PUBLIC_VERSION || "";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

function Formwrapper({ pageData, updatedPageData }) {
  const router = useRouter();

  const [activeForm, setactiveForm] = useState("genaralForm");
  const [loading, setloading] = useState(false);

  const savePageData = async (data) => {
    setloading(true);

    try {
      let res = await fetch(`${endpoint}/api/updatepagedata`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        if (res.message === "invalid_credential") {
          toast.error(`User creadentials are not valid`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(`Error ${res.message}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setloading(false);
        return;
      }

      toast.success(`successfully update page`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      updatedPageData(res.updatedPageData);
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
      toast.error(`Logout Error  : ${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className={styles.dashform}>
        <div className="d-flex justify-content-end mb-4">
          {version !== "" && (
            <div className="d-flex justify-content-start flex-grow-1 ms-2 mt-2 ">
              <span>{`v ${version}`}</span>
            </div>
          )}
          <button
            className={`btn btn-outline-primary logout-btn ${
              styles.logoutbtn
            } ${activeForm === "passwordchangeform" ? "active" : ""} `}
            onClick={() => {
              setactiveForm("passwordchangeform");
            }}
          >
            Change Password
          </button>
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
                General
              </button>{" "}
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  activeForm === "footerForm" ? "active" : ""
                } `}
                onClick={() => {
                  setactiveForm("footerForm");
                }}
              >
                Footer
              </button>{" "}
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
          {activeForm === "genaralForm" && (
            <GenaralForm
              data={pageData}
              update={savePageData}
              loading={loading}
            />
          )}
          {activeForm === "footerForm" && (
            <FooterForm
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
          {activeForm === "passwordchangeform" && <PasswordChangeForm />}
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default Formwrapper;
