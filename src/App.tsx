import { memo } from "react";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import { Root } from "./root";

function App() {
  return (
    <>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}

export default memo(App);
