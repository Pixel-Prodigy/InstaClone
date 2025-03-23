import SingleStory from "../components/ui/SingleStory";

export default function StoriesShowCase() {
  return (
    <div className="flex items-center ml-3 gap-4 no-scrollbar overflow-x-scroll max-w-[100vw] h-fit ">
      {Array.from({ length: 100 }).map((_, i) => (
        <SingleStory key={i} />
      ))}
    </div>
  );
}
