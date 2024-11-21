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

  try {
    const articlesSnapshot = await db.collection("Articles").get();

    // Map through documents to retrieve only the title and author
    const articles = articlesSnapshot.docs.map((doc) => {
      const { articleID, title, author } = doc.data();
      return { articleID, title, author };
    });

    return res.status(200).send(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};
