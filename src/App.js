import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./component/header";
import Main from "./pages/main";
import Join from "./pages/join";
import Login from "./pages/login";
import Create from "./pages/create";
import MyStory from "./pages/myStory";
import OpenStory from "./pages/openStory";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/my-story" element={<MyStory />} />
        <Route path="/open-story" element={<OpenStory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
