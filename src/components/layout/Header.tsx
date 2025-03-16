import { FaCamera, FaTv, FaRegPaperPlane } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex fixed top-0 left-0 mb-80 px-10 w-full items-end h-[88px] justify-center pb-[14px] bg-[#101010] border-b-[1px]  border-b-gray-500/20">
      <div className="flex  items-center max-w-[1280px] justify-between  w-full h-fit ">
        <FaCamera className="w-[28px]  h-[24px] text-white cursor-pointer fill-none stroke-white stroke-20" />
        <div className="overflow-hidden  max-h-[36px] ">
          <img
            src="/insta.png
            "
            className="w-[125px]"
          />
        </div>
        <div className="flex items-center gap-x-4">
          <FaTv className="w-[28px] h-[24px] text-white cursor-pointer fill-none stroke-white stroke-20" />
          <FaRegPaperPlane className="w-[28px] h-[24px] text-white cursor-pointer fill-none stroke-white stroke-20" />
        </div>
      </div>
    </div>
  );
}
