import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./component/header";
import Intro from "./pages/intro";
import Join from "./pages/join";
import Login from "./pages/login";
import Create from "./pages/create";
import Loading from "./pages/loading";
import StoryViewer from "./pages/storyViewer";
import StoryComplete from "./pages/storyComplete";
import MyGallery from "./pages/myGallery";
import OpenGallery from "./pages/openGallery";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/story-viewer" element={<StoryViewer />} />
        <Route path="/story-complete" element={<StoryComplete />} />
        <Route path="/my-gallery" element={<MyGallery />} />
        <Route path="/open-gallery" element={<OpenGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
