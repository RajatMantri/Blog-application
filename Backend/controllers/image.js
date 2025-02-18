const url = "http://localhost:8000/";
import mongoose from "mongoose";

let gridfsBucket;
const conn = mongoose.connection;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
  console.log("✅ GridFS Initialized");
});

export const uploadImage = async (req, res) => {
  if (!req.file) {
    console.error("❌ No file uploaded.");
    return res.status(400).json({ message: "❌ No file uploaded" });
  }

  const imageUrl = `${url}file/${req.file.filename}`;

  return res.status(200).json({ imageUrl });
};

export const getImage = async (req, res) => {
  try {
    const fileCursor = gridfsBucket.find({ filename: req.params.filename });
    const files = await fileCursor.toArray();

    if (!files.length) {
      return res.status(404).json({ message: "❌ File not found" });
    }

    const stream = gridfsBucket.openDownloadStreamByName(req.params.filename);
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
