import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./component/header";
import Intro from "./pages/intro";
import Join from "./pages/join";
import Login from "./pages/login";
import Create from "./pages/create";
import Loading from "./pages/loading";
import MyPage from "./pages/myPage";
import StoryViewer from "./pages/storyViewer";
import StoryComplete from "./pages/storyComplete";
import MyGallery from "./pages/myGallery";
import OpenGallery from "./pages/openGallery";
import Community from "./pages/community";
import Policy from "./pages/policy";

import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route path="/loading" element={<Loading />} />
          <Route path="/story-viewer" element={<StoryViewer />} />
          <Route path="/story-complete" element={<StoryComplete />} />
          <Route
            path="/my-gallery"
            element={
              <ProtectedRoute>
                <MyGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/open-gallery"
            element={
              <ProtectedRoute>
                <OpenGallery />
              </ProtectedRoute>
            }
          />
          <Route path="/community" element={<Community />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
