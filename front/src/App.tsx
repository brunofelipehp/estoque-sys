import { Header } from "./components/Header";
import { Main } from "./components/main";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div>
      <Header />
      <div className="flex h-screen bg-zinc-50">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
