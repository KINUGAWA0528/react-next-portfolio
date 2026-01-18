import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";

type Props = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: Props) {
  return (
    <>
      <Hero title="Profile" sub="プロフィール" />
      <Sheet>{children}</Sheet>
    </>
  );
}
