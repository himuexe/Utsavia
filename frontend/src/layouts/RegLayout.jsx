import Header from "../components/Header";
import Footer from "../components/Footer";

const RegLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white ">
      <Header />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default RegLayout;
