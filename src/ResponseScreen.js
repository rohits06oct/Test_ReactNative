import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResponseScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responseText = location.state?.responseText || "No response available.";

  // Convert text into readable format with bullet points & spacing
  const formattedResponse = responseText
    .replace(/\n\n/g, "<br/><br/>") // Double newline → Paragraph spacing
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text (**text** → <strong>text</strong>)
    .replace(/\* (.*?)\n/g, "<li>$1</li>") // Bullet points (* text → <li>text</li>)

  return (
    <div style={styles.container}>
      <h1>AI Generated Response</h1>
      <div style={styles.responseBox} dangerouslySetInnerHTML={{ __html: formattedResponse }}></div>
      <button style={styles.button} onClick={() => navigate("/registration/user/homescreen")}>
        Go Back
      </button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", maxWidth: "800px", margin: "auto" },
  responseBox: { padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "left", lineHeight: "1.6" },
  button: { marginTop: "20px", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" },
};

export default ResponseScreen;
