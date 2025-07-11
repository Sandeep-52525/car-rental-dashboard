"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import type { Listing } from "../lib/types";
import Tooltip from "@mui/material/Tooltip";

const LogsTable = ({
  data,
}: {
  currentPage: number;
  limit: number;
  status: string | null;
  data: Listing[];
  totalPages: number;
}) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Admin Name",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action Performed",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
  ];

  return (
    <div className="h-[70vh]">
    <DataGrid
      rows={data}
      columns={columns}
      hideFooterPagination
      disableColumnMenu
      disableRowSelectionOnClick
      />
      </div>
  );
};

export default LogsTable;
