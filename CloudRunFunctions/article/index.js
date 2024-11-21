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
  
  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed. Use GET." });
  }

  const { articleID } = req.query;

  if (!articleID) {
    return res.status(400).send({ error: "articleID is required." });
  }

  try {
    // Fetch the article from Firestore
    const articleDoc = await db.collection("Articles").doc(articleID).get();

    if (!articleDoc.exists) {
      return res.status(404).send({ error: "Article not found." });
    }

    // Return the article data
    const articleData = articleDoc.data();
    return res.status(200).send(articleData);
  } catch (error) {
    console.error("Error fetching article:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};
