import { useContext } from "react";
import { Context } from "../context/context";

export default function Header() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Context is null in component/Header");
  const { user } = ctx;

  return (
    <div className="">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt="User avatar"
          className="w-10 h-10 rounded-full cursor-pointer object-cover bg-no-repeat"
        />
      ) : (
        <img
          src="/user.jpg"
          alt="User avatar"
          className="w-10 h-10 rounded-full cursor-pointer object-cover bg-no-repeat"
        />
      )}
    </div>
  );
}
