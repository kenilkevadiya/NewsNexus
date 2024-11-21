const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

admin.initializeApp();
const db = admin.firestore();
const storage = new Storage();

const BUCKET_NAME = "news-nexus"; 

exports.helloHttp = async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).send({ error: "Method not allowed. Use POST." });
  }

  let body;
  try {
    body = req.body || JSON.parse(req.rawBody || "{}");
  } catch (error) {
    console.error("Error parsing request body:", error);
    return res.status(400).send({ error: "Invalid JSON payload." });
  }

  const { title, author, content, image } = body;

  if (!title || !author || !content || !image) {
    return res.status(400).send({ error: "Missing required fields: title, author, content, image." });
  }

  try {
    const matches = image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).send({ error: "Invalid image format. Must be Base64-encoded with type." });
    }

    const imageType = matches[1];
    const base64Data = matches[2];
    const fileExtension = imageType.split("/")[1];
    const buffer = Buffer.from(base64Data, "base64");

    const fileName = `${uuidv4()}.${fileExtension}`;
    const file = storage.bucket(BUCKET_NAME).file(fileName);

    await file.save(buffer, { metadata: { contentType: imageType } });

    const imageURL = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

    const articleID = uuidv4();
    const articleData = {
      articleID,
      title,
      author,
      content,
      imageURL,
    };
    await db.collection("Articles").doc(articleID).set(articleData);

    return res.status(201).send({
      message: "Article added successfully."
    });

    
  } catch (error) {
    console.error("Error adding article:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};