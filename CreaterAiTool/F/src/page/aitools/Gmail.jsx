import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "544336216579-ln7j370d5odq62oihqup936vng043s6t.apps.googleusercontent.com";
const API_KEY = "AIzaSyDkMA75qMWAF0_QYTjezE4E2jCOelXijQg"; // ⚠️ Change karo (security)

const SCOPES =
  "openid profile email https://www.googleapis.com/auth/gmail.readonly";
const Gmail = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
          ],
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();

          setIsLoggedIn(auth.isSignedIn.get());

          auth.isSignedIn.listen((status) => {
            setIsLoggedIn(status);
          });
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
    setEmails([]);
  };

  const fetchEmails = async () => {
    try {
      const res = await gapi.client.gmail.users.messages.list({
        userId: "me",
        maxResults: 5,
      });

      const messages = res.result.messages || [];

      const emailDetails = await Promise.all(
        messages.map(async (msg) => {
          const detail = await gapi.client.gmail.users.messages.get({
            userId: "me",
            id: msg.id,
          });
          return detail.result;
        })
      );

      setEmails(emailDetails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📧 Gmail API (React)</h2>

      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with Gmail</button>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={fetchEmails} style={{ marginLeft: "10px" }}>
            Fetch Emails
          </button>
        </>
      )}

      <ul style={{ marginTop: "20px" }}>
        {emails.map((mail, index) => {
          const subject =
            mail.payload.headers.find((h) => h.name === "Subject")?.value ||
            "No Subject";

          return (
            <li key={index}>
              <strong>📌 {subject}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Gmail;
