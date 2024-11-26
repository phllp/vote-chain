import { Outlet, Link } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="h-full flex w-full min-h-[100svh] bg-blue-50">
      <aside className="min-h-full w-72 flex flex-col items-center p-4 text-white  bg-blue-900 ">
        <h1 className="text-2xl font-bold mb-10 mt-5">Vote Chain</h1>
        <nav className="flex flex-col h-full gap-4 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/vote" className="hover:underline">
            Vote
          </Link>
          <Link to="/candidates" className="hover:underline">
            Candidates
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="p-4 grow max-h-[100svh] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
