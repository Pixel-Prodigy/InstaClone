"use client";
import { Context } from "@/components/context/context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Context is null in /create");
  const { user } = ctx;
  const router = useRouter();
  const [details, setDetails] = useState<PostRequest>({
    hideComments: false,
    hideLikes: false,
    content: "",
    imageUrl: "",
    userId: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const sendPostRequest = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.PUBLIC_URL}/newPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/posts");
      }
    } catch (err) {
      console.error(
        "Caught an error in /create while making post request:",
        err
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid place-items-center min-h-screen min-w-screen px-4">
      <div className="bg-[#343434] w-full max-w-[530px] min-h-[500px] rounded-lg flex flex-col gap-4">
        <div className="border-b border-white/40 h-10 flex items-center justify-center bg-black">
          <p className="text-white text-xl font-bold">Create a post</p>
        </div>

        {!details.imageUrl ? (
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="flex flex-col items-center justify-center">
              <svg
                aria-label="Icon to represent media such as images or videos"
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="77"
                role="img"
                viewBox="0 0 97.6 77.3"
                width="96"
              >
                <title>Icon to represent media such as images or videos</title>
                <path
                  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                  fill="currentColor"
                ></path>
                <path
                  d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                  fill="currentColor"
                ></path>
                <path
                  d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="font-medium text-xl">
                Select the image for your post
              </span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 font-bold w-52 h-9 rounded-lg mt-4 relative text-white">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setDetails((prev) => ({
                        ...prev,
                        imageUrl: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              Select From Computer
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full max-h-[500px] gap-3 px-4">
            <div className="flex pt-3 max-h-[100px] w-full justify-center items-center h-full gap-4">
              <img
                src={details.imageUrl}
                alt="Selected Post Image"
                className=" object-cover max-h-[130px] rounded-lg"
              />
            </div>
            <div className="w-full  max-h-fit flex flex-col mt-6 relative gap-4">
              <textarea
                className="w-full min-h-[150px] h-full focus:outline-none p-2 bg-black text-white rounded-lg resize-none"
                placeholder="Write a caption..."
                maxLength={200}
                value={details.content}
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, content: e.target.value }))
                }
              />
              <p className="absolute bottom-2 right-4 z-20  text-white/50 text-sm">
                {details?.content?.length}/200
              </p>
            </div>
            <div className="flex max-h-fit mx-auto m-0 gap-2">
              <label className="flex items-center flex-col gap-2 text-white">
                <input
                  type="checkbox"
                  checked={details.hideComments}
                  className="w-6 h-6 text-white"
                  onChange={() =>
                    setDetails((prev) => ({
                      ...prev,
                      hideComments: !prev.hideComments,
                    }))
                  }
                />
                Hide Comments
              </label>
              <label className="flex items-center flex-col gap-2 text-white">
                <input
                  type="checkbox"
                  className="w-6 h-6 text-white"
                  checked={details.hideLikes}
                  onChange={() =>
                    setDetails((prev) => ({
                      ...prev,
                      hideLikes: !prev.hideLikes,
                    }))
                  }
                />
                Hide Likes
              </label>
            </div>
            <button
              disabled={loading}
              className="bg-blue-500 mx-auto  hover:bg-blue-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed w-52   rounded-lg py-2 px-4 text-white"
              onClick={sendPostRequest}
            >
              {loading ? "Loading..." : "Share Post"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
