import FooterNav from "@/components/layout/FooterNav";
import AuthProtector from "@/components/layout/AuthProtector";
import Header from "@/components/layout/Header";
import StoriesShowCase from "@/_components/StoriesShowCase";
import { AllPosts } from "@/_components/AllPosts";

export default function ProtectedPage() {
  return (
    <AuthProtector>
      <div className="relative max-w-[1280px] mx-auto">
        <Header />

        <div className="flex max-w-[520px] mx-auto  flex-col mt-26 gap-4 "> 
          <div className="max-w-[100vw] h-[100px] overflow-x-auto no-scrollbar">
            <StoriesShowCase />
          </div>

          <div className="flex-1 pb-40   ">
            <AllPosts />
          </div>
        </div>

        <FooterNav />
      </div>
    </AuthProtector>
  );
}
