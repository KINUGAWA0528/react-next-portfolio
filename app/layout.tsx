import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Background3D from "./_components/Background3D";
import OpeningLoading from "./_components/OpeningLoading";
import { PuzzleProvider } from "./_context/PuzzleContext";
import ScrollLock from "./_components/ScrollLock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <PuzzleProvider>
          <ScrollLock />
          <OpeningLoading />
          <Background3D />
          <Header />
          {children}
          <Footer />
        </PuzzleProvider>
      </body>
    </html>
  );
}
