import AuthProtector from "@/components/layout/AuthProtector";
import FooterNav from "@/components/layout/FooterNav";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
      <div className="relative">
        {children} <FooterNav />
      </div>
  );
}
