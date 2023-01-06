const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadController = {
  upload: async (req, res) => {
    try {
      const { file } = req.files;
      if (!file || Object.keys(file).length === 0) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "No files uploaded" });
      }
      if (file.size > 1024 * 1024) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File too large" });
      }
      const typeImgSupport = ["image/jpg", "image/jpeg", "image/png"];
      if (!typeImgSupport.some((type) => type === file.mimetype)) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({ message: "File format is not supported" });
      }
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "imgFolder" },
        async (err, result) => {
          if (err) throw new Error(err);
          removeTmp(file.tempFilePath);

          return res.json({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  destroy: async (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id) return res.status(400).json({ msg: "No image selected" });

      cloudinary.v2.uploader.destroy(public_id, async (err) => {
        if (err) throw new Error(err);

        return res.json({ msg: "Image deleted successfully" });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw new Error(err);
  });
};

module.exports = uploadController;
