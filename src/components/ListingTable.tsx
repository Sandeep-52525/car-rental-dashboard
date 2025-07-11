"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import type { Listing } from "../lib/types";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PaginationAndFilterControls from "./PaginationAndFilterControls";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const getStatusBadge = (status: string) => {
  const variants = {
    pending: "warning",
    approved: "success",
    rejected: "error",
  } as const;

  return (
    <Chip
      color={variants[status as keyof typeof variants] || "secondary"}
      variant="outlined"
      label={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  );
};

const ListingTable = ({
  currentPage,
  limit,
  status,
  data,
  totalPages,
}: {
  currentPage: number;
  limit: number;
  status: string | null;
  data: Listing[];
  totalPages: number;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const postActions = async (id: number, status: "approved" | "rejected") => {
    // const session = await getAuthSession();

    const res = await fetch(`/api/rentals/action/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminName: session?.user?.name ?? "Anonymous User",
        status,
      }),
      cache: "no-store",
    });

    const response = await res.json();
    if (response.status) {
      router.refresh();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      sortable: false,
    },
    {
      field: "model",
      headerName: "Model",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
    {
      field: "make",
      headerName: "Make",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
    {
      field: "year",
      headerName: "Year",
      width: 80,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      sortable: false,
      renderCell: (params) => getStatusBadge(params.value),
    },
    {
      field: "userName",
      headerName: "Owner Name",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
    {
      field: "userEmail",
      headerName: "Owner Email",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
    {
      field: "features",
      headerName: "Features",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value.join(", ")}>
          {params.value.join(", ")}
        </Tooltip>
      ),
    },
    {
      field: "pricePerDay",
      headerName: "Price/Day",
      width: 100,
      sortable: false,
      renderCell: (params) => <div>{params.value} AED</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.status !== "pending"
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <Tooltip title="Approve">
              <IconButton
                onClick={async () =>
                  await postActions(params.row.id, "approved")
                }
              >
                <DoneIcon color="success" sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject">
              <IconButton
                onClick={async () =>
                  await postActions(params.row.id, "rejected")
                }
              >
                <CloseIcon color="error" sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={() => router.push(`/edit/${params.row.id}`)}>
                <EditIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      slots={{
        footer: () => (
          <PaginationAndFilterControls
            currentPage={currentPage}
            limit={limit}
            status={status}
            totalPages={totalPages}
          />
        ),
      }}
      hideFooterPagination
      disableColumnMenu
      disableRowSelectionOnClick
    />
  );
};

export default ListingTable;
