"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [credential, setCredetials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCredentialsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setCredetials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = credential;
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success("Login successful");
          router.push("/dashboard");
        } else {
          toast.error("Invalid credentials");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-screen items-center justify-center flex !bg-[#F9FAFE]">
      <div className="!w-[400px] flex flex-col items-center h-[400px] rounded-lg justify-center bg-white !shadow-lg">
        <Image alt="logo" src="/logo.svg" width={180} height={90} />
        <span className="text-xl font-semibold pt-4">Login</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div className="m-4">
            <TextField
              name="email"
              type="email"
              className="w-[300px] !mt-2 !mb-2 lg:w-[356px]"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              value={credential.email}
              onChange={handleCredentialsChange}
            />
          </div>
          <div>
            <FormControl
              variant="outlined"
              className="w-[300px] lg:w-[356px] !mb-2"
              required
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={credential.password}
                onChange={handleCredentialsChange}
              />
            </FormControl>
          </div>
          <div>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              className="rounded-[4px] w-[300px] lg:w-[356px] !h-[36px] !bg-[#223E99] !mt-2 float-right"
            >
              {loading ? (
                <CircularProgress
                  sx={{
                    color: "white ",
                    height: "25px !important",
                    width: "25px !important",
                  }}
                />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
