"use client";
import Link from "next/link";
import { useCallback, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/components/context/context";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/components/ui/input";
import ErrorMessage from "@/components/ui/ErrorMessage";
type Login = {
  email: string;
  password: string;
};
export default function page() {
  const [login, setLogin] = useState<Login>({
    password: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [response, setResponse] = useState<AuthApiResponse | null>(null);
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Context is null in /login");
  const { login: loginContext } = ctx;
  const LoginRequest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const data = await res.json();
      setResponse(data);

      if (res.ok && data.success) {
        loginContext(data.data, data.data.token);
        router.push("/");

        setLogin({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.error("Error in /login:", err);
    } finally {
      setLoading(false);
    }
  }, [login]);

  return (
    <div className="grid place-items-center max-w-[500px] px-10 min-h-screen mx-auto">
      <div className="flex flex-col items-center w-full gap-8 -mt-40 ">
        <div className="overflow-hidden max-h-[55px] mb-4">
          <img
            src="/insta.png
            "
            className="w-[192px]"
          />
        </div>
        <div className="flex flex-col items-end w-full gap-4">
          <Input
            onChange={(e) =>
              setLogin((prev) => ({ ...prev, email: e.target.value }))
            }
            value={login?.email}
            type="email"
            placeholder="Email"
          />
          <div className="w-full flex items-center justify-between relative">
            <Input
              onChange={(e) =>
                setLogin((prev) => ({ ...prev, password: e.target.value }))
              }
              value={login?.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password "
            />
            {showPassword ? (
              <FaEye
                className="absolute right-3 text-xl opacity-50 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-3 text-xl opacity-50 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <Link
            href="/login/forgotPassword"
            className="text-md text-center mt-[2px] hover:underline text-[#3797EF]"
          >
            Forgot Password?
          </Link>
          {response && !response.success && (
            <ErrorMessage message={response.message} />
          )}
        </div>

        <button
          disabled={!login.email || !login.password || loading}
          onClick={LoginRequest}
          className="bg-sky-500 w-full font-bold py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-700 transition-all duration-400 cursor-pointer"
        >
          {loading ? "Loading..." : "Log in"}
        </button>
        <h2 className="font-bold text-center w-full opacity-50">OR</h2>
        <div>
          <p className="text-gray-400/80">
            Dont have an account?{" "}
            <Link
              href="/signup"
              className="text-[#3797EF] hover:underline ml-1 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
