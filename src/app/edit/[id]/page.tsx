import { EditListingForm } from "@/components/Form";
import Link from "next/link";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { redirect } from "next/navigation";

const getById = async (id: number) => {
  const res = await fetch(`/api/rentals/${id}`);

  const vehicleDetails = await res.json();
  return vehicleDetails;
};

export default async function EditListingPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const details = await getById(Number.parseInt(id));

  if (!details.status) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <IconButton title="Back">
          <Link href="/dashboard">
            <KeyboardArrowLeftIcon sx={{ fontSize: "30px", color: "black" }} />
          </Link>
        </IconButton>

        <h1 className="text-2xl font-bold tracking-tight">Edit Listing</h1>
      </div>

      <EditListingForm details={details} />
    </div>
  );
}
