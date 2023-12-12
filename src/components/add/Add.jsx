/* eslint-disable react/prop-types */
import "../../css/Add.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { snackBarActions } from "../../store/slices/snackBarSlice";
import { moviesAction } from "../../store/slices/moviesSlice";

const schema = yup.object({
  title: yup
    .string()
    .min(3)
    .required("Title must to be at least 3 characthers"),
  director: yup
    .string()
    .min(3)
    .required("Director must to be at least 3 characthers"),
  producer: yup
    .string()
    .min(3)
    .required("Producer must to be at least 3 characthers"),
  description: yup
    .string()
    .min(10)
    .required("escription must to be at least 10 characthers"),
});

const Add = ({ slug, setIsOpen, columns }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (slug === "movie") {
      dispatch(
        snackBarActions.showSnackbar({ message: "Successfully added movie" })
      );
      dispatch(
        moviesAction.addMovie({
          id: crypto.randomUUID(),
          title: data.title,
          director: data.director,
          producer: data.producer,
          description: data.description,
        })
      );
    }
    setIsOpen(false);
  };

  return (
    <form className="addForm" onSubmit={handleSubmit(onSubmit)}>
      <h3>Add new {slug}</h3>
      <span onClick={() => setIsOpen(false)}>X</span>
      {columns
        .filter((column) => column.field !== "id")
        .map((column) => (
          <div className="item" key={column.field}>
            <label>{column.headerName}</label>
            <input
              placeholder={column.headerName}
              {...register(column.field)}
              className={errors[column.field] ? "error" : ""}
            />
            {errors[column.field] && <p>{errors[column.field]?.message}</p>}
          </div>
        ))}
      <div className="buttons">
        <button className="cancel" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
        <button className="confirm">Confirm</button>
      </div>
    </form>
  );
};

export default Add;
