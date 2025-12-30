import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function BlogLayout({ children }: Props) {
  return (
    <>
      <Hero title="Blog" sub="ブログ" />
      <Sheet>{children}</Sheet>
    </>
  );
}
