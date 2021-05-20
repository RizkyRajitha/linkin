import { useForm } from "react-hook-form";

export default function LinkCard({ id, name, link, register }) {
  const {
    //   register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  console.log("dada - " + id);
  const fieldName = `links[${id}]`;
  return (
    <>
      <div class="card">
        <div class="card-body">
          <fieldset name={fieldName} key={fieldName}>
            <div className="mb-3 small">
              <label className="form-label">Name {id}</label>
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
              <label className="form-label">Name {id}</label>
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
