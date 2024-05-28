import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { LuLogOut } from "react-icons/lu";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getAllUsers, logout } from "../components/redux/actions/userAction";
const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Name", width: 230 },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    width: 200,
    renderCell: (params) => {
      return <div>{new Date(params.row.dateOfBirth).toLocaleDateString()}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "role",
    headerName: "Role",
    width: 90,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div
          style={{
            marginRight: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to={`/`}>
            <Button>
              <IoEye style={{ fontSize: "20px", color: "black" }} />
            </Button>
          </Link>
          <Link to={`/`}>
            <MdDelete style={{ fontSize: "20px", color: "red" }} />
          </Link>
        </div>
      );
    },
  },
];

const Home = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="w-full h-full px-10 flex flex-col">
      <div className="m-7 flex items-center justify-between">
        <div></div>
        <h1 className=" text-3xl">All Users</h1>
        <LuLogOut
          title="Logout"
          onClick={handleLogout}
          className="text-2xl cursor-pointer"
        />
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Home;
