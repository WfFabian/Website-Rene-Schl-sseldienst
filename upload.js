const AWS = require('aws-sdk');
const formidable = require('formidable');
const fs = require('fs');

// Konfiguriere AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

module.exports = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Fehler beim Verarbeiten der Datei' });
      return;
    }

    const file = files.file[0]; // Die Datei aus dem Formular
    const fileStream = fs.createReadStream(file.filepath);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Dein S3 Bucket
      Key: file.originalFilename,
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: 'public-read', // Optional: Damit die Datei öffentlich zugänglich ist
    };

    s3.upload(params, (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Fehler beim Hochladen der Datei' });
      } else {
        res.status(200).json({ message: 'Datei erfolgreich hochgeladen!', url: data.Location });
      }
    });
  });
};
