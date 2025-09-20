import Navbar from "@/app/(auth)/(components)/Header";
import Footer from "@/app/(auth)/(components)/Footer";

export default function PrivacyPolicyLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
