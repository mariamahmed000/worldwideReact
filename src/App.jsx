import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./themes";
import { useMemo } from "react";
import HomePage from "./pages/homePage/HomePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Login from "./pages/loginPage/Login";
import ErrorPage from "./pages/errorPage/errorPage";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/navbar";
import PrivateRoutes from "./components/utilities/PrivateRoutes";
import Home from "./pages/dashboardPage/Home";

function ConditionalNavbar() {
  const location = useLocation();
  if (location.pathname !== "/") {
    return <Navbar />;
  } else {
    return null;
  }
}

function App() {
  const Mode = useSelector((state) => state.auth.mode);

  const theme = useMemo(() => {
    return createTheme(themeSettings(Mode));
  }, [Mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ConditionalNavbar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/profile/:userId" element={<ProfilePage />}></Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Route>
            <Route path="/admin" element={<Home />}></Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
