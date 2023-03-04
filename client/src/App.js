import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import CreateUser from "./pages/CreateUser";
import { selectUser } from "./slice/userSlice";
import NotFound from "./pages/NotFound";
import DiscussionBoardPage from "./pages/DiscussionBoardPage";
import DiscussionPostPage from "./pages/DiscussionPostPage";

import { useEffect, useState } from "react";
import useAccessToken from "./hook/useAccessToken";

function App() {
  const user = useSelector(selectUser);
  const isLogged = user.isLoggedIn;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useAccessToken();

  return (
    <div className="App">
      <Nav />
      <div className="space"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<CreateUser />} />
        <Route path="/post" element={<DiscussionBoardPage />}>
          <Route path=":post_id" element={<DiscussionPostPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
