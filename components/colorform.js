import { useForm } from "react-hook-form";

import styles from "../styles/form.module.css";

const ColorForm = ({ data, update, loading }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      bgColor: data.bgColor,
      accentColor: data.accentColor,
      handlerFontColor: data.handlerFontColor,
      footerBgColor: data.footerBgColor,
      footerTextColor: data.footerTextColor,
      handlerDescriptionFontColor: data.handlerDescriptionFontColor,
    },
  });

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Colors</h3>
            <div className="mb-3 ">
              <label className="form-label">Background color</label>

              <input
                type="color"
                className="form-control form-control-color"
                title="Choose Background color"
                {...register("bgColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Accent color </label>
              <input
                type="color"
                className="form-control form-control-color"
                title="Choose Accent color"
                {...register("accentColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Handler Font color </label>
              <input
                type="color"
                className="form-control form-control-color"
                title="Choose handler Font color"
                {...register("handlerFontColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Description Font color </label>
              <input
                type="color"
                className="form-control form-control-color"
                title="Choose Description Font color"
                {...register("handlerDescriptionFontColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Footer Font color </label>
              <input
                type="color"
                className="form-control form-control-color"
                title="Choose handler Font color"
                {...register("footerTextColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Footer Background color </label>
              <input
                type="color"
                className="form-control form-control-color"
                title="Choose handler Font color"
                {...register("footerBgColor")}
              />
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
export default ColorForm;
