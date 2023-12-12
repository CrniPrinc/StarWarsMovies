/* eslint-disable react/prop-types */
import "../../css/Edit.scss";
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

const Edit = ({ slug, setIsEditing, columns, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    const editedData = { id: data.id, ...formData };
    if (slug === "movie") {
      dispatch(
        snackBarActions.showSnackbar({ message: "Successfully edited movie" })
      );
      dispatch(moviesAction.editMovie(editedData));
    }
    setIsEditing(false);
  };

  return (
    <form className="editForm" onSubmit={handleSubmit(onSubmit)}>
      <h3>Edit {slug}</h3>
      <span onClick={() => setIsEditing(false)}>X</span>
      {columns
        .filter((column) => column.field !== "id")
        .map((column) => (
          <div className="item" key={column.field}>
            <label>{column.headerName}</label>
            <input
              defaultValue={data[column.field]}
              placeholder={column.headerName}
              {...register(column.field)}
              className={errors[column.field] && "error"}
            />
            {errors[column.field] && <p>{errors[column.field]?.message}</p>}
          </div>
        ))}

      <div className="buttons">
        <button className="cancel" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
        <button className="confirm">Confirm</button>
      </div>
    </form>
  );
};

export default Edit;
