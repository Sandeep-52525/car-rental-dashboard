import LogsTable from "@/components/LogsTable";
import { getAuthSession } from "@/lib/session";
import { Button } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";

const getLogs = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/logs`, {
    cache: "no-store",
  });

  const logs = await res.json();
  return logs;
};

const Page = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const logs = await getLogs();
  console.log(logs);

  return (
    <div className="flex flex-col gap-4 p-4 ">
      <Button variant="contained" color="primary" className="w-fit">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
      <LogsTable
        currentPage={1}
        data={logs.data}
        limit={2}
        status={null}
        totalPages={2}
      />
    </div>
  );
};

export default Page;
