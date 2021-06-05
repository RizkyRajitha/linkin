import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useStateValue } from "./context/state";

import debounce from "lodash.debounce";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";
export default function LinkCard({ index, item }) {
  const [loading, setloading] = useState(false);
  const [{}, dispatch] = useStateValue();

  console.log("rerenmd");
  console.log(item);

  const {
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: item });

  const debouncedSave = useCallback(
    debounce((data) => saveToDb(data), 1000),
    []
  );

  const saveToDb = (nextValue) => {
    console.log(nextValue);
    saveLinkDataPost(nextValue);
  };

  watch((data, { type }) => {
    console.log(type);
    // event fired when reset the form with updated data
    if (type == undefined) {
      return;
    }
    debouncedSave(data);
  });

  const saveLinkDataPost = async (linkdata) => {
    console.log("links linkdata");
    console.log(linkdata);
    setloading(true);
    // setshowAlert({
    //   msg: "",
    //   type: "",
    // });

    let operation = "insertpagelinks";
    if (linkdata.hasOwnProperty("id")) {
      operation = `updatepagelinks`;
    }
    console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/${operation}`, {
        method: "POST",
        body: JSON.stringify(linkdata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // setshowAlert({
      //   msg:
      //     operation === "insertpagelinks"
      //       ? "Added new page link "
      //       : "Updated page link " + " successfully",
      //   type: "success",
      // });
      console.log(res);
      dispatch({ type: "changeTheme", linkdata: res.updatedLinkData });
      reset(res.updatedLinkData[index]);
    } catch (error) {
      // setshowAlert({
      //   msg: operation + "failed" + error.message,
      //   type: "danger",
      // });
    }
    setloading(false);
  };

  return (
    <>
      <div className="card mt-3">
        <div className="card-body py-2 px-4">
          {loading && (
            <div className="d-grid gap-2 d-md-flex justify-content-start">
              <span
                className="spinner-border text-info spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          )}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-check form-switch d-grid gap-2 d-md-flex justify-content-md-end">
              <input
                className="form-check-input"
                type="checkbox"
                {...register(`active`)}
              />
            </div>
            <div className="mb-1 small">
              {/* <label className="form-label small ">Link Display Text</label> */}
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control form-control-sm mb-2 is-invalid"
                    : "form-control form-control-sm mb-2"
                }
                placeholder="Enter Link Display Text"
                // disabled={loading}
                {...register(`displayText`)}
              />
            </div>
            <div className="mb-1 small">
              {/* <label className="form-label small">Enter Link Url</label> */}
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control form-control-sm mb-2  is-invalid"
                    : "form-control form-control-sm mb-2 "
                }
                placeholder="Enter Link Url"
                {...register(`linkUrl`)}
              />
            </div>
            <div className="mb-1 small">
              {/* <label className="form-label small">Icon Class</label> */}
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control form-control-sm mb-2  is-invalid"
                    : "form-control form-control-sm mb-2 "
                }
                placeholder="Enter Icon Class"
                {...register(`iconClass`)}
              />
            </div>
            <div className="mb-1 small ">
              {/* <label className="form-label small">Handler Font color </label> */}
              <input
                type="color"
                className="form-control form-control-sm mb-2 form-control-color"
                title="Choose Link background color"
                placeholder="Choose Link background color"
                {...register("bgColor")}
              />
            </div>{" "}
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-outline-warning btn-sm"
                type="button"
                disabled={!isDirty}
                hidden={!isDirty}
                onClick={() => {
                  reset({}, { keepDefaultValues: true });
                }}
              >
                Revert
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-sm"
                onClick={handleSubmit(saveLinkData)}
                disabled={!isDirty || loading}
                hidden={!isDirty}
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
            </div> */}
          </form>
        </div>{" "}
      </div>

      {/* <div class="card">
        <div class="card-body">
          <div className="mb-3 small">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={
                errors.handlerText ? "form-control is-invalid" : "form-control"
              }
              placeholder="Enter Handler name"
              {...register("name")}
            />
          </div>
          <div className="mb-3 small">
            <label className="form-label">Link</label>
            <input
              type="text"
              className={
                errors.handlerText ? "form-control is-invalid" : "form-control"
              }
              placeholder="Enter Handler name"
              {...register("link")}
            />
          </div>
        </div>
      </div> */}
    </>
  );
}
