import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import RegLayout from "./layouts/RegLayout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>Home</Layout>} />
        <Route path="/register" element={<RegLayout><Register /></RegLayout>} />
        <Route path="/login" element={<RegLayout><SignIn /></RegLayout>} />
      </Routes>
    </Router>
  )
}

export default App