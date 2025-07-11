import { getAuthSession } from "@/lib/session";
import { AccountCircle, Logout } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Action Logs - One Click Drive",
  description: "Admin Action Logs",
};

const LogsLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getAuthSession();
  return (
    <>
      {session && (
        <AppBar position="static" color="inherit">
          <Toolbar className="flex justify-between">
            <div>
              <Image alt="logo" src="/logo.svg" width={180} height={90} />
            </div>

            <div className="flex gap-5 items-center">
              <div className="flex gap-2 items-center">
                <span>{session.user?.name}</span>
                <AccountCircle />
              </div>
              <form method="POST" action="/api/auth/signout">
                <input type="hidden" name="callbackUrl" value="/login" />
                <IconButton title="Logout" type="submit">
                  <Logout />
                </IconButton>
              </form>
            </div>
          </Toolbar>
        </AppBar>
      )}
      {children}
    </>
  );
};

export default LogsLayout;
