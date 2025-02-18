import { GridFsStorage } from "multer-gridfs-storage";
import "dotenv/config";
import multer from "multer";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${username}:${password}@blog-application.hclt1.mongodb.net/`,
  file: (req, file) => {
    const match = [`image/png`, `image/jpeg`, `image/jpg`, `image/webp`];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-blog-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export const upload = multer({ storage });
