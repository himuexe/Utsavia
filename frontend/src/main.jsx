import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./contexts/AppContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);