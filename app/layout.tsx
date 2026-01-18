import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Background3D from "./_components/Background3D";
import OpeningLoading from "./_components/OpeningLoading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <OpeningLoading />
        <Background3D />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
