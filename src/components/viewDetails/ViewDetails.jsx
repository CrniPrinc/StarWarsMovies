/* eslint-disable react/prop-types */
import "../../css/ViewDetails.scss";

const ViewDetails = ({ slug, setViewDetails, columns, data }) => {
  return (
    <form className="viewForm">
      <h3>View {slug} details</h3>
      <span onClick={() => setViewDetails(false)}>X</span>
      {columns
        .filter((column) => column.field !== "id")
        .map((column) => (
          <div className="item" key={column.field}>
            <label>{column.headerName}</label>
            <input value={data[column.field]} disabled />
          </div>
        ))}

      <button className="cancel" onClick={() => setViewDetails(false)}>
        Cancel
      </button>
    </form>
  );
};

export default ViewDetails;
