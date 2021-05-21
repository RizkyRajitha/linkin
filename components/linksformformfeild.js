import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import styles from "../styles/form.module.css";
import LinkCard from "./linkzcardformfeild";

const LinksForm = ({ data, update, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
  } = useForm({ defaultValues: { links: data } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });
  console.log(data);
  // const [links, setlinks] = useState([{ link: "asasa", name: "asasa" }]);

  const save = (linkdata) => {
    console.log("links linkdata");
    console.log(linkdata);
    console.log(dirtyFields);
  };

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-8 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Genaral Data</h3>
            <button
              type="button"
              className="btn btn-primary btn-block"
              // onClick={handleSubmit(update)}
              onClick={() => {
                // setlinks((pre) => {
                //   return [...pre, { link: "", name: "" }];
                // });
                append({ linkUrl: "", displayText: "" });
              }}
            >
              Add new
            </button>

            {fields.length &&
              fields.map((item, index) => {
                console.log(item);
                return (
                  <LinkCard
                    id={index}
                    item={item}
                    errors={errors}
                    register={register}
                  />
                );
              })}

            {/* {links.length &&
              links.map((ele) => {
                console.log(ele);
                return <LinkCard {...ele} />;
              })} */}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit(save)}
              // disabled={loading}
            >
              {/* {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )} */}
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default LinksForm;

/**
     const fieldName = `links[${index}]`;
                return (
                  <div class="card">
                    <div class="card-body">
                      <fieldset name={fieldName} key={fieldName}>
                        <div className="mb-3 small">
                          <label className="form-label">Name {index}</label>
                          <input
                            type="text"
                            className={
                              errors.handlerText
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder="Enter name"
                            // {...register("name")}
                            {...register(`${fieldName}.name`)}
                          />
                        </div>
                        <div className="mb-3 small">
                          <label className="form-label">Name {index}</label>
                          <input
                            type="text"
                            className={
                              errors.handlerText
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder="Enter link"
                            // {...register("name")}
                            {...register(`${fieldName}.link`)}
                          />
                        </div>
                      </fieldset>{" "}
                    </div>{" "}
                  </div>
                );
 */
