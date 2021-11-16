import { useForm } from "react-hook-form";
import { isEmpty } from "../lib/side";

import styles from "../styles/form.module.css";

const GeneralForm = ({ data, update, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: data });

  let avatarImageUrl = watch(["avatarUrl"])[0];
  let bgImageUrl = watch(["bgImgUrl"])[0];

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>General Details</h3>
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
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                {...register("handlerDescription")}
              ></textarea>
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Linktree Width</label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className={
                    errors.linktreeWidth
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Linktree Width "
                  {...register("linktreeWidth", {
                    // max: { message: "Width must be below 100%", value: 100 },
                    min: {
                      message: "Linktree Width must be above 0em",
                      value: 0,
                    },
                  })}
                />{" "}
                <span className="input-group-text">px</span>{" "}
                {errors.linktreeWidth && (
                  <div className="invalid-feedback">
                    {errors.linktreeWidth.message}
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Link padding</label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className={
                    errors.linkPadding
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Link padding "
                  {...register("linkPadding", {
                    // max: { message: "Width must be below 100%", value: 100 },
                    min: { message: "Padding must be above 0em", value: 0 },
                  })}
                />{" "}
                <span className="input-group-text">em</span>{" "}
                {errors.linkPadding && (
                  <div className="invalid-feedback">
                    {errors.linkPadding.message}
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Avatar width</label>
              <div className="input-group mb-3">
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
                />{" "}
                <span className="input-group-text">%</span>{" "}
                {errors.avatarwidth && (
                  <div className="invalid-feedback">
                    {errors.avatarwidth.message}
                  </div>
                )}
              </div>
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
                square images are better. can use image providers Ex -(
                <a href="https://imgur.com/" target="_blank">
                  imgur
                </a>{" "}
                <a href="https://cloudinary.com/" target="_blank">
                  cloudinary
                </a>
                )
              </div>
              {errors.avatarUrl && (
                <div className="invalid-feedback">
                  {errors.avatarUrl.message}
                </div>
              )}
              {}
              {!isEmpty(avatarImageUrl) && (
                <img
                  src={avatarImageUrl}
                  className={styles.previewImage + " img-thumbnail"}
                  alt="image Loading failed"
                ></img>
              )}
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Background Image Url</label>
              <input
                type="text"
                className={
                  errors.bgImgUrl ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Background Image Url"
                {...register("bgImgUrl", {
                  pattern: {
                    message: "Should be a valid Image URL",
                    value:
                      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                  },
                })}
              />

              <div className="form-text">
                image will cover the whole area. To remove image keep this input
                field empty . can use image providers Ex - (
                <a href="https://imgur.com/" target="_blank">
                  imgur
                </a>{" "}
                <a href="https://cloudinary.com/" target="_blank">
                  cloudinary
                </a>{" "}
                )
              </div>
              {errors.bgImgUrl && (
                <div className="invalid-feedback">
                  {errors.bgImgUrl.message}
                </div>
              )}

              {!isEmpty(bgImageUrl) && (
                <img
                  src={bgImageUrl}
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
export default GeneralForm;
