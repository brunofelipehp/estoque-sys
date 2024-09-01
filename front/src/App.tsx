import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/main";
import "./main.css";

function App() {
	return (
		<div>
			<Header />
			<div className="flex h-screen bg-zinc-50 min-h-screen">
				<Sidebar />
				<Main />
			</div>
		</div>
	);
}

export default App;
