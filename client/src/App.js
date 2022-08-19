import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import Protected from "./components/Protected";
import Schedule from "./pages/Schedule";
import MeetingSuccess from "./pages/MeetingSuccess";
import TempHome from "./pages/TempHome";
import Tempaccount from "./pages/Tempaccount";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route
            path="/schedule"
            element={
              <Protected>
                <Schedule />
              </Protected>
            }
          />
          <Route
            path="/meetingSuccess"
            element={
              <Protected>
                <MeetingSuccess />{" "}
              </Protected>
            }
          />
          <Route path="/tempHome" element={<TempHome />} />
          <Route path="/tempaccount" element={<Tempaccount />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
