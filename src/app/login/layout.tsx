import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - One Click Drive",
  description: "Login Page",
};

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main>{children}</main>;
};

export default LoginLayout;
