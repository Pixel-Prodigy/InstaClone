"use client";
import { Context } from "@/components/context/context";
import Link from "next/link";
import { useCallback, useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import ErrorMessage from "@/components/ui/ErrorMessage";
export default function page() {
  const [signup, setSignup] = useState<User>({
    name: "",
    password: "",
    email: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AuthApiResponse | null>(null);
  const router = useRouter();
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Context is null in /signup");
  const { login, user } = ctx;
  const signupRequest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const data = await res.json();
      setResponse(data);

      if (res.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data));
        login(data.data);

        router.push("/login");
        setSignup({
          name: "",
          password: "",
          email: "",
          avatar: "",
        });
      }
    } catch (err) {
      console.error(
        "Caught an error in /signup while making signup request:",
        err
      );
    } finally {
      setLoading(false);
    }
  }, [signup]);

  return (
    <div className="grid place-items-center max-w-[500px] px-10 min-h-screen mx-auto">
      <div className="flex flex-col items-center w-full gap-8 -mt-10 ">
        <div className="overflow-hidden max-h-[55px]">
          <img
            src="https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png"
            className="w-[192px]"
          />
        </div>
        <div className="flex flex-col items-end w-full gap-4">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center group justify-center w-fit h-[95px] relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSignup((prev) => ({
                        ...prev,
                        avatar: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-[95px] h-[95px] py-2 bg-transparent text-transparent cursor-pointer rounded-full border-[1px] border-gray-500/20"
              />

              {!signup.avatar && (
                <FaCamera className="absolute top-1/2  left-1/2 group-hover:opacity-80 transition-all duration-400  -translate-1/2 text-2xl opacity-50 cursor-pointer" />
              )}
              <img
                src={signup?.avatar || "/user.jpg"}
                className={`object-cover w-[95px] absolute transition-all duration-400 cursor-pointer -z-1  h-[95px] rounded-full ${
                  signup.avatar
                    ? "opacity-100"
                    : "opacity-50 group-hover:opacity-70"
                }`}
                alt="User Avatar"
              />
            </div>
          </div>
          <Input
            onChange={(e) =>
              setSignup((prev) => ({ ...prev, name: e.target.value }))
            }
            value={signup?.name}
            type="text"
            placeholder="Username"
          />
          <Input
            onChange={(e) =>
              setSignup((prev) => ({ ...prev, email: e.target.value }))
            }
            value={signup?.email}
            type="email"
            placeholder="Email"
          />
          <div className="w-full flex items-center justify-between relative">
            <Input
              onChange={(e) =>
                setSignup((prev) => ({ ...prev, password: e.target.value }))
              }
              value={signup?.password}
              type={showPassword ? "text" : "password"}
              placeholder="Set Password "
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
          {response && !response.success && (
            <ErrorMessage message={response.message} />
          )}
        </div>

        <button
          disabled={
            !signup.email || !signup.password || !signup.name || loading
          }
          onClick={signupRequest}
          className="bg-sky-500 w-full font-bold py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-700 transition-all duration-400 cursor-pointer"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <h2 className="font-bold text-center w-full opacity-50">OR</h2>
        <div>
          <p className="text-gray-400/80">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#3797EF] hover:underline ml-1 cursor-pointer"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
