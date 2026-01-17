import { Outlet } from "@tanstack/react-router";

export const Layout = () => {
  return (
    <div>
      <header>
        <h1>E-commerce Store</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 E-commerce Store</p>
      </footer>
    </div>
  );
};
