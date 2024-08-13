const slugify = require('slugify');

const generateUniqueSlug = async (name, ModelClass) => {
  let baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await ModelClass.query().findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

module.exports = {
  generateUniqueSlug,
};
