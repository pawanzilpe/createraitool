import React from "react";

function UserDetails({ name, email, age }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>User Details</h2>

      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "10px",
  },
};

export default UserDetails;
