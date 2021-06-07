import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import debounce from "lodash.debounce";

export default function LinkCard({ item, updateLink, deleteLink, loading }) {
  const refSubmitButtom = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: item });

  useEffect(() => {
    // console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log(item);

    // cancel the debounce function when submited by enter
    debouncedSaveLinkData.cancel();

    // reset when the linkdata is change to the form update with new values
    if (item) {
      reset(item);
    }
  }, [item]);

  watch((data, { type }) => {
    // console.log(type);
    // event fired when reset the form with updated data
    if (type == undefined) {
      return;
    }
    debouncedSaveLinkData();
  });

  const debouncedSaveLinkData = useCallback(
    debounce(() => {
      refSubmitButtom?.current?.click();
    }, 1500),
    []
  );

  return (
    <>
      <div className="card mt-3">
        <div className="card-body py-2 px-4">
          {/* {console.log(errors)} */}
          {/* {JSON.stringify(item)} */}
          <form onSubmit={handleSubmit(updateLink)}>
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
              />{" "}
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
              />{" "}
              {errors.linkUrl && (
                <div className="invalid-feedback">{errors.linkUrl.message}</div>
              )}
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
        </div>{" "}
      </div>
    </>
  );
}
