import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import debounce from "lodash.debounce";

export default function LinkCard({ item, updateLink, deleteLink, loading }) {
  const refSubmitButtom = useRef(null);
  const [cardInfo, setCardInfo] = useState(item);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: item });

  useEffect(() => {
    // reset when the linkdata is change to the form update with new values
    if (cardInfo.id === undefined && item.id) {
      // console.log("reset with item");
      reset(item);
      setCardInfo(item);
    }
    // reset when the link is deleted to the card will show differert value
    if (cardInfo.id !== item.id) {
      // console.log("reset after delete");
      reset(item);
      setCardInfo(item);
    }
  }, [item]);

  watch((data, { type }) => {
    // console.log(type);
    //console.log(data);
    // event fired when reset the form with updated data
    if (type == undefined) {
      return;
    }
    debouncedSaveLinkData();
  });

  // debounced function to save the data after 1.5 seconds
  const debouncedSaveLinkData = useCallback(
    debounce(() => {
      refSubmitButtom?.current?.click();
    }, 1500),
    []
  );

  const submitAction = (data) => {
    // when the form is submited by enter , the debounced action is canceled to avoid uplicate debounce
    debouncedSaveLinkData.cancel();
    // console.log(data);
    updateLink(data);
  };

  return (
    <>
      <div className="card mt-3">
        <div className="card-body py-2 px-4">
          {/* {console.log(errors)} */}
          {/* {JSON.stringify(item)} */}
          <form onSubmit={handleSubmit(submitAction)}>
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
                  errors.displayText
                    ? "form-control form-control-sm mb-2 is-invalid"
                    : "form-control form-control-sm mb-2"
                }
                placeholder="Enter Link Display Text"
                // disabled={loading}
                {...register(`displayText`, {
                  required: true,
                })}
              />
              {errors.displayText && (
                <div className="invalid-feedback">
                  Link Display Text is required
                </div>
              )}
            </div>
            <div className="mb-1 small">
              {/* <label className="form-label small">Enter Link Url</label> */}
              <input
                type="text"
                className={
                  errors.linkUrl
                    ? "form-control form-control-sm mb-2  is-invalid"
                    : "form-control form-control-sm mb-2 "
                }
                placeholder="Enter Link Url"
                {...register(`linkUrl`, {
                  pattern: {
                    message: "Should be a valid URL",
                    value:
                      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                  },
                })}
              />
              {errors.linkUrl && (
                <div className="invalid-feedback">{errors.linkUrl.message}</div>
              )}
            </div>
            <div className="mb-1 small">
              {/* <label className="form-label small">Icon Class</label> */}
              <div className="form-text">
                Use{" "}
                <a
                  className="text-decoration-none"
                  href="https://fontawesome.com/v5.15/icons?d=gallery&p=2"
                  target="_blank"
                >
                  fontawesome
                </a>{" "}
                for icon classes
              </div>
            </div>
            <input
              type="text"
              className={
                errors.iconClass
                  ? "form-control form-control-sm mb-2  is-invalid"
                  : "form-control form-control-sm mb-2 "
              }
              placeholder="Enter Icon Class"
              {...register(`iconClass`)}
            />
            <div className="mb-3 ">
              {/* <label className="form-label">Border Radius</label> */}
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
                    min: { message: "Font Size must be above 0px", value: 0 },
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
                    {...register("bgColor")}
                  />
                </div>
              </div>
            </div>
            {/* <div className="mb-1 small ">
              <label className="form-label small">Link accent color </label>
              <input
                type="color"
                className="form-control form-control-sm mb-2 form-control-color"
                title="Choose Link accent color"
                placeholder="Choose Link accent color"
                {...register("accentColor")}
              />
            </div> */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-outline-danger btn-sm"
                type="button"
                disabled={loading}
                hidden={!item.id}
                onClick={() => {
                  deleteLink(item.id);
                }}
              >
                Delete
              </button>
            </div>
            <button hidden={true} ref={refSubmitButtom} type={"submit"} />
          </form>
        </div>
      </div>
    </>
  );
}
