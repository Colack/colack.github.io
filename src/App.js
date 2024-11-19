import React, { useState, useEffect } from "react";
import { marked } from "marked"; // Import the library
import "./App.css";

function App() {
  const [content, setContent] = useState("Loading...");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchMarkdown(url) {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setContent(marked.parse(text));
      } catch (error) {
        setContent("Failed to load content.");
      }
    }

    fetchMarkdown(
        "https://raw.githubusercontent.com/Colack/site/refs/heads/main/frontend/md/index.md"
    );
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
      <div className={`container ${darkMode ? "dark" : ""}`}>
        <div className="profile">
          <img
              src="https://github.com/Colack/site/blob/main/frontend/img/jack_portrait.jpg?raw=true"
              alt="GitHub Profile"
              className="profile-pic"
          />
          <p className="profile-text">
            Jack Spencer <br /> He / Him
          </p>
          <div className="profile-buttons">
            <button onClick={() => (window.location.href = "https://github.com/colack")}>
              GitHub
            </button>
            <button
                onClick={() =>
                    (window.location.href = "https://www.linkedin.com/in/jack-spencer-83a0a7277/")
                }
            >
              LinkedIn
            </button>
          </div>
          <div className="profile-buttons">
            <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
          </div>
        </div>
        {/* Render the parsed markdown */}
        <div id="content" dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
  );
}

export default App;
