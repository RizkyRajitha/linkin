import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useStateValue } from "./context/state";
import LinkCard from "./socialcard";

import styles from "../styles/form.module.css";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const LinksForm = ({ pagedataid }) => {
  const [{ socialLinks }, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);
  const [isNewLinkInList, setisNewLinkInList] = useState(false);

  const addNewLink = () => {
    // console.log(links.length);
    // console.log(links[links.length - 1]);
    setisNewLinkInList(true);

    let newLink = socialLinks[socialLinks.length - 1];

    if (newLink && !newLink.hasOwnProperty("id")) {
      // console.log("new link on arr");
      return;
    }
    dispatch({
      type: "updateSocial",
      socialdata: [
        ...socialLinks,
        {
          linkUrl: "",
          pagedataid: pagedataid,
          bgColor: "#2c6bed",
          active: true,
          borderRadius: "4px",
        },
      ],
    });
  };

  const saveLinkData = async (socialdata) => {
    // console.log("save linkdata");
    // console.log(linkdata);
    setloading(true);

    let operation = "insertlinks";
    if (socialdata.hasOwnProperty("id")) {
      operation = `updatelinks`;
    }

    if (operation === "insertlinks") {
      setisNewLinkInList(false);
    }

    // console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/social/${operation}`, {
        method: "POST",
        body: JSON.stringify(socialdata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }

      dispatch({ type: "updateSocial", socialdata: res.updatedSocialData });
      toast.success(
        `${
          operation === "insertlinks"
            ? "Added new Social Icon "
            : "Updated Social Icon " + " successfully"
        }`,
        { autoClose: 1000 }
      );
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
    }
    setloading(false);
  };

  const deleteLink = async (id) => {
    let confirm = await Swal.fire({
      title: "Delete Social Icon",
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
      let res = await fetch(`${endpoint}/api/social/deletelink`, {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }
      dispatch({ type: "deleteSocial", id: id });
      toast.success(`Successfully deleted Social Icon`, { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
    }
    setloading(false);
  };

  const dragEndHnadler = async (data) => {
    // console.log(data);
    if (!data.destination) {
      return;
    }

    if (data.destination.index === data.source.index) {
      return;
    }

    setloading(true);

    const items = Array.from(socialLinks);
    const [reorderedItem] = items.splice(data.source.index, 1);
    items.splice(data.destination.index, 0, reorderedItem);

    let updateditems = items.map((item, index) => {
      item.orderIndex = index;
      return item;
    });

    dispatch({ type: "updateSocial", socialdata: updateditems });

    let orderData = updateditems.map((item) => {
      return {
        id: item.id,
        name: item.displayText,
        orderIndex: item.orderIndex,
      };
    });

    // console.log(orderData);

    try {
      let res = await fetch(`${endpoint}/api/social/reorderlinks`, {
        method: "POST",
        body: JSON.stringify({ orderData }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        return;
      }

      toast.success(`Successfully reordered links`, { autoClose: 1000 });
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
    }
  };

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-8 `}
        >
          <h3>Social Data</h3>
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
            Add new Social Icon
          </button>
          <DragDropContext onDragEnd={dragEndHnadler}>
            <Droppable droppableId="links" isDropDisabled={isNewLinkInList}>
              {(provided) => (
                <div
                  className="links"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {socialLinks.length > 0 &&
                    socialLinks.map((item, index) => {
                      return (
                        <LinkCard
                          key={index}
                          deleteLink={deleteLink}
                          updateLink={saveLinkData}
                          loading={loading}
                          item={item}
                          index={index}
                          isDragDisabled={isNewLinkInList}
                        />
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <ToastContainer
          position="bottom-left"
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
