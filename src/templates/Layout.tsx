import React from "react";
import logo from "../assets/logo.svg";
import SearchIcon from "../components/atoms/SearchIcon";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const Button = ({
    children,
    className,
  }: {
    children: string;
    className?: string;
  }) => (
    <div
      className={`bg-red-700 text-white px-12 py-2 rounded-full ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
  return (
    <>
      <div className="bg-white font-montserrat py-3 px-4 lg:py-10 lg:px-36 flex flex-row justify-between relative">
        <img className="h-12 2xl:max-h-24" src={logo} />
        <div className="my-auto flex flex-row place-items-center gap-4 md:gap-8">
          <p className="text-red-700 font-bold hidden lg:block">
            Heart Attack and Stroke Symptoms
          </p>
          <div className="hidden 2xl:block">Volunteer</div>
          <div className="hidden lg:block">Learn CPR</div>
          <div className="hidden 2xl:block">SHOP</div>
          <div className="flex flex-row gap-3">
            <Button className="hidden xl:block">DONATE ONCE</Button>
            <Button className="hidden xl:block">DONATE MONTHLY</Button>
            <Button className="block xl:hidden py-2 px-4 font-bold text-sm">
              Donate Now
            </Button>
          </div>
          <div>
            <SearchIcon color="black" />
          </div>
        </div>
      </div>
      <div className="border-y flex justify-end bg-white p-4 lg:hidden">
        <p className="text-red-700 font-bold">
          Heart Attack and Stroke Symptoms
        </p>
      </div>
      <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
        <main className="max-w-[1024px] w-full mx-auto flex-grow mb-16 py-3 px-4 lg:py-10 lg:px-36">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
