import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./component/header";
import Intro from "./pages/intro";
import Join from "./pages/join";
import Login from "./pages/login";
import MyPage from "./pages/myPage";
import Create from "./pages/create";
import Loading from "./pages/loading";
import StoryComplete from "./pages/storyComplete";
import InteractiveStory from "./pages/interactiveStory";
import MyGallery from "./pages/myGallery";
import OpenGallery from "./pages/openGallery";
import StoryViewer from "./pages/storyViewer";
import Community from "./pages/community";
import CommunityView from "./pages/communityView";
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
          <Route path="/story-complete" element={<StoryComplete />} />
          <Route path="/interactive-story" element={<InteractiveStory />} />
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
          <Route path="/story-viewer" element={<StoryViewer />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community-view" element={<CommunityView />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
