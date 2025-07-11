"use client";
import { Select, MenuItem, IconButton } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const limits = [2, 5, 10, 20];
const statuses = ["all", "pending", "approved", "rejected"];

const PaginationAndFilterControls = ({
  currentPage,
  limit,
  status,
  totalPages,
}: {
  currentPage: number;
  limit: number;
  totalPages: number;
  status: string | null;
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const updateQuery = (newParams: Record<string, string | number | null>) => {
    const url = new URLSearchParams(params.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "all") {
        url.delete(key);
      } else {
        url.set(key, value.toString());
      }
    });
    router.push(`?${url.toString()}`);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row  items-start md:items-center justify-between mb-4 pt-5 px-10 gap-2.5">
      <Select
        className=" capitalize"
        value={status ?? "all"}
        onChange={(e) =>
          updateQuery({
            status: e.target.value === "all" ? null : e.target.value,
            page: 1,
          })
        }
        size="small"
      >
        {statuses.map((s) => (
          <MenuItem key={s} value={s} className="capitalize">
            {s}
          </MenuItem>
        ))}
      </Select>
      <div className="flex gap-5">
        <Select
          value={limit}
          onChange={(e) =>
            updateQuery({ limit: Number(e.target.value), page: 1 })
          }
          size="small"
        >
          {limits.map((l) => (
            <MenuItem key={l} value={l}>
              {l}
            </MenuItem>
          ))}
        </Select>
        <div>
          <IconButton
            disabled={currentPage <= 1}
            onClick={() => updateQuery({ page: currentPage - 1 })}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <span>
            {currentPage} of {totalPages}
          </span>
          <IconButton
            disabled={totalPages === currentPage}
            onClick={() => updateQuery({ page: currentPage + 1 })}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PaginationAndFilterControls;
