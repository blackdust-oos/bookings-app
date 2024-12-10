import React from "react";
import { Outlet } from "react-router-dom";

interface SearchLayoutProps {
  // title: string;
  filters: React.ReactNode;
  children?: React.ReactNode;
}

const SearchLayout= ({  filters, children }: SearchLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </header> */}

      <div className="container mx-auto flex flex-col lg:flex-row mt-6 gap-6 px-4">

        <aside className="lg:w-1/4 bg-white shadow-md rounded-lg p-4" style={{height:'fit-content'}}>
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          {filters}
        </aside>

        <main className="lg:w-3/4  rounded-lg p-4">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default SearchLayout;
