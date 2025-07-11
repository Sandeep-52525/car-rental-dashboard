import { getAuthSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ListingTable from "@/components/ListingTable";
import { Button } from "@mui/material";
import Link from "next/link";

type ReqBody = {
  page: number;
  limit: number;
  status: "pending" | "approved" | "rejected" | null;
};

//same as getServerSideProps() method as per latest app routing
const getListings = async ({ page, limit, status }: ReqBody) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page,
      limit,
      status,
    }),
    cache: "no-store",
  });

  const rentalList = await res.json();
  return rentalList;
};

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
  }>;
}) => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);
  const status = (params?.status as ReqBody["status"]) || null;

  const listingData = await getListings({ page, limit, status });

  return (
    <div className="flex flex-col gap-4 p-4 ">
      <Button variant="contained" color="primary" className="w-fit">
        <Link href="/logs">View admin action logs</Link>
      </Button>
      <ListingTable
        currentPage={page}
        limit={limit}
        status={status}
        data={listingData.data}
        totalPages={listingData.totalPages}
      />
    </div>
  );
};

export default Dashboard;
