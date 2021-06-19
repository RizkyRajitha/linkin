import styles from "../styles/form.module.css";
import LinkCard from "./linkcard";
import { useStateValue } from "./context/state";
import { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const LinksForm = ({ pagedataid }) => {
  const [{ links }, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);

  const addNewLink = () => {
    // console.log(links.length);
    // console.log(links[links.length - 1]);

    let newLink = links[links.length - 1];

    if (newLink && !newLink.hasOwnProperty("id")) {
      // console.log("new link on arr");
      return;
    }
    dispatch({
      type: "updateLink",
      linkdata: [
        ...links,
        {
          linkUrl: "",
          displayText: "",
          pagedataid: pagedataid,
          bgColor: "#2c6bed",
          active: true,
        },
      ],
    });
  };

  const saveLinkData = async (linkdata) => {
    // console.log("save linkdata");
    // console.log(linkdata);
    setloading(true);

    let operation = "insertpagelinks";
    if (linkdata.hasOwnProperty("id")) {
      operation = `updatepagelinks`;
    }
    // console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/${operation}`, {
        method: "POST",
        body: JSON.stringify(linkdata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setloading(false);
        return;
      }

      dispatch({ type: "updateLink", linkdata: res.updatedLinkData });
      toast.success(
        `${
          operation === "insertpagelinks"
            ? "Added new page link "
            : "Updated page link " + " successfully"
        }`,
        {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
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

  const deleteLink = async (id) => {
    let confirm = await Swal.fire({
      title: "Delete Link",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) {
      return;
    }
    // console.log("delete link");
    // console.log(id);
    setloading(true);

    try {
      let res = await fetch(`${endpoint}/api/deletepagelink`, {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setloading(false);
        return;
      }
      dispatch({ type: "deleteLink", id: id });
      toast.success(`successfully deleted link`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-8 `}
        >
          <h3>Link Data</h3>
          {loading && (
            <div className="d-grid gap-2 d-md-flex justify-content-end">
              <span
                className="spinner-border text-info spinner-border me-1"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          )}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={(e) => {
              addNewLink();
            }}
          >
            Add new link
          </button>
          {links &&
            links.map((item, index) => {
              return (
                <LinkCard
                  key={index}
                  item={item}
                  deleteLink={deleteLink}
                  updateLink={saveLinkData}
                  loading={loading}
                />
              );
            })}
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
        <div className="mb-5"></div>
      </div>
    </>
  );
};
export default LinksForm;
