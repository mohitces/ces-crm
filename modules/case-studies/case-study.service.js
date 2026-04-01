const fs = require('fs');
const path = require('path');
const caseStudyRepository = require('./case-study.repository');
const AppError = require('../../utils/AppError');
const { destroyByPublicId, destroyByUrl, isCloudinaryUrl } = require('../../utils/cloudinary');

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const uniqueSlug = async (base, excludeId) => {
  let slug = base;
  let suffix = 1;

  while (true) {
    const existing = await caseStudyRepository.getCaseStudyBySlug(slug);
    if (!existing || (excludeId && existing._id.toString() === excludeId)) {
      return slug;
    }
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
};

const buildAssetInfo = (file) => {
  if (!file) return { url: '', publicId: '' };
  if (typeof file === 'string') return { url: file, publicId: '' };
  return {
    url: file.secure_url || file.url || '',
    publicId: file.public_id || file.publicId || '',
  };
};

const parseJson = (value) => {
  if (!value) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

const parseLines = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch (error) {
      // fall through
    }
    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const removeAsset = async (assetUrl, publicId) => {
  if (!assetUrl) return;
  if (publicId) {
    await destroyByPublicId(publicId);
    return;
  }
  if (isCloudinaryUrl(assetUrl)) {
    await destroyByUrl(assetUrl);
    return;
  }
  const filePath = path.join(__dirname, '../../', assetUrl);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const getCaseStudies = async () => caseStudyRepository.getCaseStudies();
const getPublishedCaseStudies = async () => caseStudyRepository.getPublishedCaseStudies();

const getCaseStudyById = async (id) => {
  const item = await caseStudyRepository.getCaseStudyById(id);
  if (!item) throw new AppError('Case study not found', 404);
  return item;
};

const getPublishedCaseStudyBySlug = async (slug) => {
  const item = await caseStudyRepository.getPublishedCaseStudyBySlug(slug);
  if (!item) throw new AppError('Case study not found', 404);
  return item;
};

const buildPayload = async (payload, files, existing) => {
  const slugBase = toSlug(payload.slug || payload.title || payload.clientName);
  const slug = await uniqueSlug(slugBase, existing ? existing._id.toString() : undefined);

  const snapshot = parseJson(payload.snapshot) || {};
  const about = parseJson(payload.about) || {};
  const challenges = parseJson(payload.challenges) || {};
  const solutions = parseJson(payload.solutions) || {};
  const results = parseJson(payload.results) || {};

  const highlights = parseLines(payload.highlights);
  const mediaUrls = parseLines(payload.mediaUrls);

  const logoFile = files?.find((file) => file.fieldname === 'clientLogo') || null;
  const bannerFile = files?.find((file) => file.fieldname === 'bannerImage') || null;
  const mediaFiles = files?.filter((file) => file.fieldname === 'mediaImages') || [];

  const logoInfo = logoFile ? buildAssetInfo(logoFile) : { url: payload.clientLogoUrl || existing?.clientLogo || '', publicId: payload.clientLogoPublicId || existing?.clientLogoPublicId || '' };
  const bannerInfo = bannerFile ? buildAssetInfo(bannerFile) : { url: payload.bannerImageUrl || existing?.bannerImage || '', publicId: payload.bannerImagePublicId || existing?.bannerImagePublicId || '' };

  const mediaInfos = mediaFiles.map((file) => buildAssetInfo(file));
  const mediaImages = [...mediaUrls, ...mediaInfos.map((file) => file.url)];
  const existingPublicIds =
    payload.mediaPublicIds !== undefined
      ? parseLines(payload.mediaPublicIds)
      : existing?.mediaPublicIds || [];
  const mediaPublicIds = [...existingPublicIds, ...mediaInfos.map((file) => file.publicId).filter(Boolean)];

  if (existing && logoFile) {
    await removeAsset(existing.clientLogo, existing.clientLogoPublicId);
  }

  if (existing && bannerFile) {
    await removeAsset(existing.bannerImage, existing.bannerImagePublicId);
  }

  return {
    clientName: payload.clientName?.trim() || existing?.clientName,
    slug,
    status: payload.status || existing?.status || 'draft',
    featured: payload.featured === 'true' || payload.featured === true,
    title: payload.title?.trim() || existing?.title,
    subtitle: payload.subtitle?.trim() || '',
    clientLogo: logoInfo.url,
    clientLogoPublicId: logoInfo.publicId,
    bannerImage: bannerInfo.url,
    bannerImagePublicId: bannerInfo.publicId,
    snapshot: {
      websiteUrl: snapshot.websiteUrl || '',
      country: snapshot.country || '',
      industry: snapshot.industry || '',
      platform: snapshot.platform || '',
      businessInsight: snapshot.businessInsight || '',
    },
    about: {
      brandIntro: about.brandIntro || '',
      whatTheyDo: about.whatTheyDo || '',
    },
    challenges: {
      problemStatements: parseLines(challenges.problemStatements),
    },
    solutions: {
      howWeHelped: solutions.howWeHelped || '',
      featuresUsed: parseLines(solutions.featuresUsed),
    },
    highlights,
    results: {
      benefits: parseLines(results.benefits),
    },
    media: {
      images: mediaImages,
    },
    mediaPublicIds,
  };
};

const createCaseStudy = async (payload, files) => {
  const data = await buildPayload(payload, files);
  return caseStudyRepository.createCaseStudy(data);
};

const updateCaseStudy = async (id, payload, files) => {
  const existing = await caseStudyRepository.getCaseStudyById(id);
  if (!existing) throw new AppError('Case study not found', 404);

  const data = await buildPayload(payload, files, existing);
  return caseStudyRepository.updateCaseStudy(id, data);
};

const deleteCaseStudy = async (id) => {
  const existing = await caseStudyRepository.getCaseStudyById(id);
  if (!existing) throw new AppError('Case study not found', 404);

  await removeAsset(existing.clientLogo, existing.clientLogoPublicId);
  await removeAsset(existing.bannerImage, existing.bannerImagePublicId);
  const images = existing.media?.images || [];
  const publicIds = existing.mediaPublicIds || [];
  for (let index = 0; index < images.length; index += 1) {
    await removeAsset(images[index], publicIds[index]);
  }

  await caseStudyRepository.deleteCaseStudy(id);
};

module.exports = {
  getCaseStudies,
  getPublishedCaseStudies,
  getCaseStudyById,
  getPublishedCaseStudyBySlug,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
