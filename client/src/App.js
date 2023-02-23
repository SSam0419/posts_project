import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import allReducers from "./reducers";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import CreateUser from "./pages/CreateUser";

function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Nav />
      <button
        onClick={() => {
          dispatch({ type: "SIGN_IN" });
          navigate("/home");
        }}
      >
        <h1>++++++</h1>
      </button>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route
          path="/home"
          element={
            <Protected isLogged={isLogged}>
              <Home />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
