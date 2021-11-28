import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useStateValue } from "./context/state";
import LinkCard from "./linkcard";

import styles from "../styles/form.module.css";
import { useForm } from "react-hook-form";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const LinksForm = ({ pagedataid }) => {
  const [{ links }, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);
  const [commonSettingsCollapse, setcommonSettingsCollapse] = useState(false);
  const [isNewLinkInList, setisNewLinkInList] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();
  const addNewLink = () => {
    // console.log(links.length);
    // console.log(links[links.length - 1]);
    setisNewLinkInList(true);

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
          textColor: "#ffffff",
          borderRadius: "4px",
        },
      ],
    });
  };

  const saveLinkData = async (linkdata) => {
    // console.log("save linkdata");
    // console.log(linkdata);
    setloading(true);

    let operation = "insertlinks";
    if (linkdata.hasOwnProperty("id")) {
      operation = `updatelinks`;
    }

    if (operation === "insertlinks") {
      setisNewLinkInList(false);
    }

    // console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/pages/${operation}`, {
        method: "POST",
        body: JSON.stringify(linkdata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }

      dispatch({ type: "updateLink", linkdata: res.updatedLinkData });
      toast.success(
        `${
          operation === "insertlinks"
            ? "Added new page link "
            : "Updated page link " + " successfully"
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
      let res = await fetch(`${endpoint}/api/pages/deletelink`, {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }
      dispatch({ type: "deleteLink", id: id });
      toast.success(`Successfully deleted link`, { autoClose: 1000 });
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

    const items = Array.from(links);
    const [reorderedItem] = items.splice(data.source.index, 1);
    items.splice(data.destination.index, 0, reorderedItem);

    let updateditems = items.map((item, index) => {
      item.orderIndex = index;
      return item;
    });

    dispatch({ type: "updateLink", linkdata: updateditems });

    let orderData = updateditems.map((item) => {
      return {
        id: item.id,
        name: item.displayText,
        orderIndex: item.orderIndex,
      };
    });

    // console.log(orderData);

    try {
      let res = await fetch(`${endpoint}/api/pages/reorderlinks`, {
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

  const updateCommonSettings = async (data) => {
    // console.log(data);
    // console.log(dirtyFields);
    // only get user changed data

    if (Object.keys(dirtyFields).length === 0) {
      return;
    }

    Object.keys(data).forEach((element) => {
      if (!dirtyFields[element]) {
        delete data[element];
      }
    });

    // console.log(data);

    let confirm = await Swal.fire({
      title: "Apply common settings",
      text: "All your links will apply these common settings",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, apply it!",
    });

    if (!confirm.isConfirmed) {
      return;
    }

    setloading(true);

    try {
      let res = await fetch(`${endpoint}/api/pages/applycommonsettigns`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }

      dispatch({ type: "updateLink", linkdata: res.updatedLinkData });

      toast.success(`Successfully applied common settings`, {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
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
          <div>
            <div className="mt-3 py-2">
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className={`accordion-button ${
                        commonSettingsCollapse ? "collapsed" : ""
                      } `}
                      type="button"
                      onClick={(e) => {
                        setcommonSettingsCollapse(!commonSettingsCollapse);
                      }}
                    >
                      Common Settings
                    </button>
                  </h2>{" "}
                  <div
                    className={`accordion-collapse collapse ${
                      commonSettingsCollapse ? "show" : ""
                    }  `}
                  >
                    <div className="accordion-body">
                      <form onSubmit={handleSubmit(updateCommonSettings)}>
                        {" "}
                        <div className="mb-3 ">
                          <div className="input-group mb-3">
                            <input
                              type="number"
                              className={
                                errors.borderRadius
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              placeholder="Enter Border Radius"
                              {...register("borderRadius", {
                                min: {
                                  message: "Border Radius must be above 0px",
                                  value: 0,
                                },
                              })}
                            />
                            <span className="input-group-text">px</span>
                            {errors.borderRadius && (
                              <div className="invalid-feedback">
                                {errors.borderRadius.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="mb-1 small ">
                              <label className="form-label small ">
                                Link Display Text Font color
                              </label>
                              <input
                                type="color"
                                className="form-control form-control-sm mb-2 form-control-color"
                                title="Choose Link text color"
                                placeholder="Choose Link text color"
                                {...register("textColor")}
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="mb-1 small ">
                              <label className="form-label small">
                                Link background color
                              </label>
                              <input
                                type="color"
                                className="form-control form-control-sm mb-2 form-control-color"
                                title="Choose Link background color"
                                placeholder="Choose Link background color"
                                {...register("bgColor", { required: "" })}
                              />
                            </div>
                          </div>
                        </div>{" "}
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={loading}
                        >
                          {loading && (
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DragDropContext onDragEnd={dragEndHnadler}>
            <Droppable droppableId="links" isDropDisabled={isNewLinkInList}>
              {(provided) => (
                <div
                  className="links"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {links.length > 0 &&
                    links.map((item, index) => {
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
