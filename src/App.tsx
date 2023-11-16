import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/atoms/Loader";
import Auth0ErrorPage from "./pages/Auth0ErrorPage";
import HighlightResultsPage from "./pages/HighlightResultsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { AuthStatusEnum } from "./types/auth-status-enum";

const AuthStatus = import.meta.env.VITE_AUTH0_STATUS;

function App() {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();
  const currentLocation = window.location.href;
  const isAuthEnabled = AuthStatus !== AuthStatusEnum.Disabled;

  if (isAuthEnabled) {
    if (isLoading) {
      return (
        <div className="w-full h-screen flex justify-center items-center p-10">
          <Loader />
          <p className="text-[#C10E21] font-bold">Heart.org demo</p>
        </div>
      );
    }

    if (error) {
      return <Auth0ErrorPage error={error} />;
    }

    if (!isAuthenticated) {
      loginWithRedirect();
      return null;
    }
  }

  if (currentLocation.endsWith("/highlight")) {
    return <HighlightResultsPage />;
  }

  return <SearchResultsPage />;
}

export default App;
