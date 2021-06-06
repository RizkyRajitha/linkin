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

  // console.log("rerenmd");
  // console.log(item);
  // console.log("---------------------iiidd");
  // console.log(index);

  useEffect(() => {
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!111");
    // console.log(item);
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
      // console.log(data);
      if (loading) {
        return;
      }
      refSubmitButtom?.current?.click();
    }, 1500),
    []
  );

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
          {console.log(errors)}
          {JSON.stringify(item)}
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
                className="btn btn-outline-warning btn-sm"
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
