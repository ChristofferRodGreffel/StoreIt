import SingIn from "./components/auth/SingIn";
import SingUp from "./components/auth/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import { AddSection } from "./components/pages/AddSection";
import { Profile } from "./components/pages/Profile";
import { Nav } from "./components/Nav";
import { Settings } from "./components/pages/Settings";
import { StoredItems } from "./components/pages/StoredItems";
import { useState } from "react";
import { ResetPassword } from "./components/pages/ResetPassword";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  return (
    <>
      {signedIn && <Nav />}
      <Routes>
        <Route path="/" element={<SingIn />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/add" element={<AddSection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/storage" element={<StoredItems />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
