/* eslint-disable react/prop-types */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../../css/DataTable.scss";
import DetailsOutlinedIcon from "@mui/icons-material/DetailsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from "react-redux";
import { moviesAction } from "../../store/slices/moviesSlice";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { snackBarActions } from "../../store/slices/snackBarSlice";
import Add from "../add/Add";
import Edit from "../edit/Edit";
import ViewDetails from "../viewDetails/ViewDetails";

export default function DataTable({ rows, columns, slug }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDeleteHandler = () => {
    if (slug === "movie") {
      dispatch(moviesAction.deleteMovie(deleteId));
      dispatch(
        snackBarActions.showSnackbar({
          message: "Successfully deleted movie",
        })
      );
    }
    setOpenDialog(false);
  };

  const editHandler = (data) => {
    setCurrentData(data);
    setIsEditing(true);
  };

  const viewDetailsHandler = (movie) => {
    setCurrentData(movie);
    setViewDetails(true);
  };

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="actions">
          <div
            className="viewDetails"
            onClick={() => viewDetailsHandler(params.row)}
          >
            <DetailsOutlinedIcon />
          </div>
          <div onClick={() => editHandler(params.row)}>
            <EditOutlinedIcon />
          </div>
          <div className="delete" onClick={() => deleteHandler(params.row.id)}>
            <DeleteOutlinedIcon />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      {(isAdding || isEditing || viewDetails) && <div className="backdrop" />}
      <button onClick={() => setIsAdding(true)}>Add new {slug}</button>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this movie?
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "green", color: "white" }}
            onClick={confirmDeleteHandler}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {isAdding && (
        <Add slug="movie" setIsOpen={setIsAdding} columns={columns} />
      )}
      {isEditing && (
        <Edit
          slug="movie"
          setIsEditing={setIsEditing}
          data={currentData}
          columns={columns}
        />
      )}
      {viewDetails && (
        <ViewDetails
          slug="movie"
          setViewDetails={setViewDetails}
          data={currentData}
          columns={columns}
        />
      )}
    </div>
  );
}
