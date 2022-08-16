import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import Protected from "./components/Protected";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/account"
            element={
              <Protected>
                {" "}
                <Account />{" "}
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
