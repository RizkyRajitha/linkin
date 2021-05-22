import { useForm } from "react-hook-form";

export default function LinkCard({ item, save, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm({ defaultValues: item });

  const saveLinkData = (data) => {
    save(data);
    // reset({}, { keepValues: true });
  };

  return (
    <>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-check form-switch d-grid gap-2 d-md-flex justify-content-md-end">
              <input
                className="form-check-input"
                type="checkbox"
                {...register(`active`)}
              />
              {/* <label className="form-check-label" for="flexSwitchCheckDefault">
                active
              </label> */}
            </div>
            <div className="mb-3 small">
              <label className="form-label">Link Display Text</label>
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter name"
                {...register(`displayText`)}
              />
            </div>
            <div className="mb-3 small">
              <label className="form-label">Enter Link Url</label>
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter link"
                {...register(`linkUrl`)}
              />
            </div>
            <div className="mb-3 small">
              <label className="form-label">Icon Class</label>
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter Icon Class"
                {...register(`iconClass`)}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Handler Font color </label>
              <input
                type="color"
                className="form-control form-control-color"
                title="Choose Link background color"
                {...register("bgColor")}
              />
            </div>{" "}
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Save
              </button>
            </div>
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
