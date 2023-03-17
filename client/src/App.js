import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import NotFound from "./pages/NotFound";
import DiscussionBoardPage from "./pages/DiscussionBoardPage";
import PostPage from "./pages/PostPage";
import Protected from "./components/Protected";

import { useEffect, useState } from "react";
import useAccessToken from "./hook/useAccessToken";
import CreateFormPage from "./pages/CreateFormPage";
import { getFullscreenState } from "./slice/postSlice";
import UserProfile from "./pages/UserProfile";
import VisitUserProfile from "./pages/VisitUserProfile";
import { selectUser } from "./slice/userSlice";

function App() {
  const [fullscreen, setFullscreen] = useState(false);

  const full = useSelector(getFullscreenState);

  const user = useSelector(selectUser);

  useEffect(() => {
    setFullscreen(full);
  }, [full]);

  useAccessToken();

  return (
    <div className={`App ${fullscreen ? "Fullscreen" : ""}`}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<CreateUser />} />

        <Route
          path="/my_user_profile"
          element={
            <Protected>
              <UserProfile />
            </Protected>
          }
        />

        <Route
          path="/visit_user_profile/:userId"
          element={
            <Protected>
              <VisitUserProfile />
            </Protected>
          }
        />
        <Route path="/write_post" element={<CreateFormPage />} />
        <Route path="/post" element={<DiscussionBoardPage />}>
          <Route path=":post_id" element={<PostPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
