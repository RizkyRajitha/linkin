import { useForm } from "react-hook-form";

import styles from "../styles/form.module.css";

const GenaralForm = ({ data, update, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: data });

  let imageUrl = watch(["avatarUrl"]);

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>General Data</h3>
            <div className="mb-3 ">
              <label className="form-label">Handler name</label>
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter Handler name"
                {...register("handlerText")}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Handler link</label>
              <input
                type="text"
                className={
                  errors.handlerLink
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter Handler link"
                {...register("handlerLink", {
                  pattern: {
                    message: "Should be a valid URL",
                    value:
                      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                  },
                })}
              />
              <div className="form-text">
                Ex - https://www.instagram.com/[yourhandle]
              </div>

              {errors.handlerLink && (
                <div className="invalid-feedback">
                  {errors.handlerLink.message}
                </div>
              )}
            </div>{" "}
            {/* <div className="mb-3 ">
              <label className="form-label">Footer text</label>
              <input
                type="text"
                className={
                  errors.footerText ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Footer text"
                {...register("footerText")}
              />
            </div>{" "} */}
            {/* <div className="mb-3 ">
              <label className="form-label">Footer text</label>
              <input
                type="text"
                className={
                  errors.footerText ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Footer text"
                {...register("footerText")}
              />
            </div>{" "} */}
            <div className="mb-3 ">
              <label className="form-label">Avatar width</label>
              <input
                type="number"
                className={
                  errors.avatarwidth
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter Avatar width "
                {...register("avatarwidth", {
                  max: { message: "Width must be below 100%", value: 100 },
                  min: { message: "Width must be above 1%", value: 1 },
                })}
              />
              {errors.avatarwidth && (
                <div className="invalid-feedback">
                  {errors.avatarwidth.message}
                </div>
              )}
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Avatar Url</label>
              <input
                type="text"
                className={
                  errors.avatarUrl ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Avatar Url"
                {...register("avatarUrl", {
                  pattern: {
                    message: "Should be a valid Image URL",
                    value:
                      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                  },
                })}
              />

              <div className="form-text">
                square images are better. can use image providers Ex - (
                <a href="https://imgur.com/" target="_blank">
                  imgur
                </a>{" "}
                <a href="https://cloudinary.com/" target="_blank">
                  cloudinary
                </a>{" "}
                )
              </div>
              {errors.avatarUrl && (
                <div className="invalid-feedback">
                  {errors.avatarUrl.message}
                </div>
              )}

              {imageUrl && (
                <img
                  src={imageUrl}
                  className={styles.previewImage + " img-thumbnail"}
                  alt="image Loading failed"
                ></img>
              )}
            </div>{" "}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit(update)}
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
    </>
  );
};
export default GenaralForm;
