const Url = require('../models/Url');
const QRCode = require('qrcode');
const { nanoid } = require('nanoid');

const generateShortCode = (length = 7) => {
  return nanoid(length);
};

const createShortUrl = async ({ longUrl, customAlias, expiresAt }) => {
  const shortCode = customAlias || generateShortCode();

  const existing = await Url.findOne({ shortCode });
  if (existing) {
    throw new Error('This custom alias is already taken. Please choose another one.');
  }

  const qrCodeDataUrl = await QRCode.toDataURL(shortCode, {
    width: 400,
    margin: 2,
    color: {
      dark: '#6366F1',
      light: '#FFFFFF',
    },
  });

  const url = await Url.create({
    longUrl,
    shortCode,
    qrCode: qrCodeDataUrl,
    expiresAt: expiresAt || null,
  });

  return url;
};

const getUrlByShortCode = async (shortCode) => {
  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new Error('URL not found');
  }

  if (url.expiresAt && new Date() > url.expiresAt) {
    throw Object.assign(new Error('This link has expired'), { statusCode: 410 });
  }

  url.clicks += 1;
  url.lastVisited = new Date();
  await url.save();

  return url;
};

const getAllUrls = async () => {
  return await Url.find().sort({ createdAt: -1 });
};

const getUrlStats = async (shortCode) => {
  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new Error('URL not found');
  }
  return url;
};

const deleteUrl = async (shortCode) => {
  const url = await Url.findOneAndDelete({ shortCode });
  if (!url) {
    throw new Error('URL not found');
  }
  return url;
};

module.exports = {
  createShortUrl,
  getUrlByShortCode,
  getAllUrls,
  getUrlStats,
  deleteUrl,
};
