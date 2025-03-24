
import { BrowserRouter, Routes, Route } from "react-router";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import Layout from "./layout";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Genre from "./pages/Genre";
import SearchPage from "./pages/Searchpage";
import Platform from "./pages/Platform";
import Signup from "./pages/sign up";
import SignIn from "./pages/login/login";
import Account from "./pages/Account/account";
import SessionContextProvider from "./context/SessionContextProvider";
import FavContextProvider from "./context/FavContextProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";


// ProtectedRoute: Controlla se l'utente è autenticato


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Games />} />
          <Route path="/games/:genre" element={<Genre />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/platform/:platform" element={<Platform />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/account" element={<ProtectedRoute />}>
            <Route path="" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Root() {
  return (
    <SessionContextProvider>

      <FavContextProvider>
      <App />
      </FavContextProvider>

    </SessionContextProvider>
  );
}

export default Root;
