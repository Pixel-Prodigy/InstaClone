
import FooterNav from "@/components/layout/FooterNav";
import AuthProtector from "@/components/layout/AuthProtector";
import Header from "@/components/layout/Header";
import StoriesShowCase from "@/_components/StoriesShowCase";

export default function ProtectedPage() {
  return (
    <AuthProtector>
      <Header />
      <div className="mt-23 max-w-[1280px] px-6 no-scrollbar overflow-x-scroll mx-auto">
        <StoriesShowCase />
        sdf
      </div>

      <FooterNav />
    </AuthProtector>
  );
}
