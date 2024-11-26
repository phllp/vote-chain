import { Route, Routes } from "react-router-dom";
import Home from "./presentation/pages/home";
import BaseLayout from "./presentation/layouts/base-layout";
import Candidates from "./presentation/pages/candidates";
import Vote from "./presentation/pages/vote";

function App() {
  return (
    <>
      <Routes>
        {/* Rota com layout compartilhado */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/candidates" element={<Candidates />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
