import { useForm } from "react-hook-form";

import styles from "../styles/genaralform.module.css";

const ColorForm = ({ data, update, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      bgColor: data.bgColor,
      accentColor: data.accentColor,
      handlerFontColor: data.handlerFontColor,
    },
  });

  // watch((data, { name, type }) => {
  //   console.log(data, name, type);

  //   let prePageData = { ...pageData };

  //   let keys = Object.keys(data);

  //   keys.map((x) => {
  //     prePageData[x] = data[x];
  //   });

  //   setpageData(prePageData);
  // });

  // const watchAllFields = watch();

  // useEffect(() => {
  // let prePageData = { ...pageData };

  // let keys = Object.keys(watchAllFields);

  // keys.map((x) => {
  //   prePageData[x] = watchAllFields[x];
  // });

  // setpageData(prePageData);
  // }, [watchAllFields]);

  // useWatch();

  // form;

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Colors</h3>
            <div className="mb-3 ">
              <label className="form-label">Background color</label>

              <input
                type="color"
                className="form-control form-control-color"
                // value="#563d7c"
                title="Choose Background color"
                {...register("bgColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Accent color </label>
              <input
                type="color"
                className="form-control form-control-color"
                // value="#563d7c"
                title="Choose Accent color"
                {...register("accentColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Handler Font color </label>
              <input
                type="color"
                className="form-control form-control-color"
                // value="#563d7c"
                title="Choose handler Font color"
                {...register("handlerFontColor")}
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
                  class="spinner-border spinner-border-sm"
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
