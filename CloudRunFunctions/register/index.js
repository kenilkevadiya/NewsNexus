const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.helloHttp = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*"); 
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send(""); 
  }

  if (req.method !== "POST") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required." });
  }

  try {
    const userDoc = await db.collection("Users").doc(email).get();
    if (userDoc.exists) {
      return res.status(400).send({ error: "User already exists." });
    }

    // Add user to Firestore
    await db.collection("Users").doc(email).set({
      email: email,
      password: password, 
    });

    return res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};
