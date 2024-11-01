import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "flowbite/dist/flowbite.css";

// Components
import Loader from "./pages/loader/loader";
import Header from "./components/Header";
import Landing from "./pages/landing/Landing";
import Portfolio from "./pages/portfolio/Portfolio";
import ProjectDetails from "./pages/portfolio/[project]/ProjectDetails";
import Resume from "./pages/resume/Resume";
import Contact from "./pages/contact/Contact";
import PageNotFound from "./pages/404/PageNotFound";
import { Analytics } from "@vercel/analytics/react";
import AboutMe from "./components/AboutMe"; // adjust the path as necessary

function App() {
  // Personal details for the user
  const personalDetails = {
    name: "Ben Hassen Mariem",
    location: "Tunisia",
    email: "mariem.benhassen@ensi-uma.tn",
    brand:
      "With a unique fusion of technical expertise, creative vision, and a deep understanding of human psychology, I craft digital experiences that prioritize the user's needs and emotions. By bridging the gap between functionality and empathy, I create products that not only perform flawlessly but also engage and inspire on a personal level",
  };

  const location = useLocation();

  // State to manage loader visibility
  const [showLoader, setShowLoader] = useState(true);

  const [originalTitle, setOriginalTitle] = useState();

  useEffect(() => {
    // Hide loader when initial route is loaded
    if (location.pathname !== "/") {
      setShowLoader(false);
    }

    // Store the original document title
    if (!originalTitle) {
      setOriginalTitle(document.title);
    }

    // Handle document title change when tab visibility changes
    const handleTabChange = () => {
      if (document.hidden) {
        document.title = "👋🏻 Git pulling you back in!";
      } else {
        document.title = originalTitle;
      }
    };

    // Listen for visibility change events
    window.addEventListener("visibilitychange", handleTabChange);
    return () =>
      window.removeEventListener("visibilitychange", handleTabChange);
  }, [location, originalTitle]);

  return (
    <>
      <Analytics />

      {showLoader ? (
        // Show loader until initial route is loaded
        <Loader setShowLoader={setShowLoader} />
      ) : (
        <>
          {/* Header */}
          <Header />
          {/* Define routes */}
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Landing
                  name={personalDetails.name}
                  tagline={personalDetails.tagline}
                />
              }
            />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/resume"
              element={<Resume brand={personalDetails.brand} />}
            />
            <Route path="/about" element={<AboutMe />} />

            <Route
              path="/contact"
              element={
                <Contact
                  name={personalDetails.name}
                  location={personalDetails.location}
                  email={personalDetails.email}
                />
              }
            />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route
              path="/portfolio/:projectTitle"
              element={<ProjectDetails />}
            />
            {/* Fallback route for unknown paths */}
            <Route path="*" element={<Navigate to="/page-not-found" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
