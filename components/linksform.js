import styles from "../styles/form.module.css";
import LinkCard from "./linkcard";
import { useStateValue } from "./context/state";
import { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TEstt from "./test";

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
          autoClose: 5000,
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
          autoClose: 1000,
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, {
        autoClose: 5000,
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
          autoClose: 5000,
        });
        setloading(false);
        return;
      }
      dispatch({ type: "deleteLink", id: id });
      toast.success(`successfully deleted link`, {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, {
        autoClose: 5000,
      });
    }
    setloading(false);
  };

  const dragEndHnadler = async (data) => {
    // console.log(data);
    // console.log(characters);

    if (!data.destination) return;

    const items = Array.from(links);
    const [reorderedItem] = items.splice(data.source.index, 1);
    items.splice(data.destination.index, 0, reorderedItem);

    let updateditems = items.map((item, index) => {
      item.orderIndex = index;
      return item;
    });
    // let sorted = updateditems.sort()
    // console.log(updateditems);
    // console.log(items);

    dispatch({ type: "updateLink", linkdata: updateditems });

    // updateCharacters(updateditems);

    let orderData = updateditems.map((item) => {
      return {
        id: item.id,
        name: item.displayText,
        orderIndex: item.orderIndex,
      };
    });

    // console.log(orderData);

    try {
      let res = await fetch(`${endpoint}/api/reorderlinks`, {
        method: "POST",
        body: JSON.stringify({ orderData }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
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
          <DragDropContext onDragEnd={dragEndHnadler}>
            <Droppable droppableId="links">
              {(provided) => (
                <div
                  className="links"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {links.length &&
                    links.map((item, index) => {
                      console.log(index);
                      return (
                        <LinkCard
                          key={index}
                          deleteLink={deleteLink}
                          updateLink={saveLinkData}
                          loading={loading}
                          item={item}
                          index={index}
                        />
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* <TEstt /> */}
          {/* <DragDropContext onDragEnd={dragEndHnadler}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {[1, 2, 3].map((item, index) => {
                    return (
                      <Draggable draggableId={String(item)} index={index}>
                        {(provided) => {
                          return <li ref={provided.innerRef}>{item}</li>;
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext> */}
          {/* <DragDropContext onDragEnd={dragEndHnadler}>
            <Droppable droppableId="links">
              {(provided) => {
                console.log(provided);
                <ul
                  className="links"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {[1, 2, 3].map((item, index) => {
                    return (
                      <Draggable key={index} draggableId={index} index={index}>
                        {(provided1) => {
                          <li ref={provided1.ref}>{item}</li>;
                        }}
                      </Draggable>
                    );
                  })}
                </ul>;
              }}{" "}
            </Droppable>
          </DragDropContext> */}
          {/* {(provided) => {
                {
                  console.log(provided);
                }
                <ul
                  className="links"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {links &&
                    links.map((item, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={index}
                          index={index}
                        >
                          {(provided1) => {
                            <LinkCard
                              // {...provided1.draggableProps}
                              // {...provided1.dragHandleProps}
                              // ref={provided1.innerRef}
                              key={index}
                              item={item}
                              deleteLink={deleteLink}
                              updateLink={saveLinkData}
                              loading={loading}
                            />;
                          }}
                        </Draggable>
                      );
                    })}
                </ul>;
              }} */}
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
