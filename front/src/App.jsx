import { NabBar } from "./components/NavBar";
import { DarkMode } from "./components/DarkMode";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <main className="transition-colors">
        <div>
          <DarkMode />
          <NabBar />
        </div>
        <section className="flex justify-center mt-5 sm:ml-40 sm:p-0 p-4">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default App;
