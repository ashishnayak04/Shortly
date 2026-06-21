const urlService = require('../services/urlService');
const { validateUrl, validateAlias } = require('../utils/validators');

const createUrl = async (req, res, next) => {
  try {
    const { longUrl, customAlias, expiresAt } = req.body;

    const urlValidation = validateUrl(longUrl);
    if (!urlValidation.valid) {
      return res.status(400).json({ message: urlValidation.message });
    }

    const aliasValidation = validateAlias(customAlias);
    if (!aliasValidation.valid) {
      return res.status(400).json({ message: aliasValidation.message });
    }

    const url = await urlService.createShortUrl({ longUrl, customAlias, expiresAt });

    res.status(201).json({
      message: 'Short URL created successfully',
      url: {
        id: url._id,
        longUrl: url.longUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`}/${url.shortCode}`,
        qrCode: url.qrCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
        expiresAt: url.expiresAt,
      },
    });
  } catch (error) {
    if (error.message.includes('already taken')) {
      return res.status(409).json({ message: error.message });
    }
    next(error);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const url = await urlService.getUrlByShortCode(shortCode);
    res.redirect(301, url.longUrl);
  } catch (error) {
    if (error.message === 'This link has expired') {
      return res.status(410).json({ message: 'This link has expired' });
    }
    if (error.message === 'URL not found') {
      return res.status(404).json({ message: 'URL not found' });
    }
    next(error);
  }
};

const getAllUrls = async (req, res, next) => {
  try {
    const urls = await urlService.getAllUrls();
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

    const data = urls.map((url) => ({
      id: url._id,
      longUrl: url.longUrl,
      shortCode: url.shortCode,
      shortUrl: `${baseUrl}/${url.shortCode}`,
      qrCode: url.qrCode,
      clicks: url.clicks,
      lastVisited: url.lastVisited,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    }));

    res.json({ urls: data });
  } catch (error) {
    next(error);
  }
};

const getUrlStats = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const url = await urlService.getUrlStats(shortCode);
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

    res.json({
      shortCode: url.shortCode,
      longUrl: url.longUrl,
      shortUrl: `${baseUrl}/${url.shortCode}`,
      qrCode: url.qrCode,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastVisited: url.lastVisited,
      expiresAt: url.expiresAt,
    });
  } catch (error) {
    if (error.message === 'URL not found') {
      return res.status(404).json({ message: 'URL not found' });
    }
    next(error);
  }
};

const deleteUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    await urlService.deleteUrl(shortCode);
    res.json({ message: 'URL deleted successfully' });
  } catch (error) {
    if (error.message === 'URL not found') {
      return res.status(404).json({ message: 'URL not found' });
    }
    next(error);
  }
};

module.exports = {
  createUrl,
  redirectUrl,
  getAllUrls,
  getUrlStats,
  deleteUrl,
};
