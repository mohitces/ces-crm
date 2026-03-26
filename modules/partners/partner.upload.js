const fs = require('fs');
const path = require('path');
const multer = require('multer');

const baseDir = path.join(__dirname, '../../uploads/partners');
const logoDir = path.join(baseDir, 'logos');
const bannerDir = path.join(baseDir, 'banners');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const isLogo = file.fieldname === 'logo';
    const target = isLogo ? logoDir : bannerDir;
    ensureDir(target);
    cb(null, target);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ext || '.jpg';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
