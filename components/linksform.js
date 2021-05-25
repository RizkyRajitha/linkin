import { useState, useEffect } from "react";
import styles from "../styles/form.module.css";
import LinkCard from "./linkcard";

const LinksForm = ({ data, update, pagedataid, loading }) => {
  console.log(data);
  const [links, setlinks] = useState(data);

  useEffect(() => {
    // to sync newly added link with linkdata id ,
    //if not a new link is insertted without updateing old link
    setlinks([...data]);
  }, [data]);

  const addNewLink = () => {
    setlinks((pre) => {
      return [
        ...pre,
        {
          linkUrl: "",
          displayText: "",
          pagedataid: pagedataid,
          bgColor: "#2c6bed",
          active: true,
        },
      ];
    });
  };

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-8 col-xl-10 col-xxl-8 `}
        >
          <h3>Link Data</h3>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              addNewLink();
            }}
          >
            Add new
          </button>
          {links.map((item, index) => {
            // console.log(item);
            return (
              <LinkCard
                key={index}
                item={item}
                save={update}
                loading={loading}
              />
            );
          })}
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
