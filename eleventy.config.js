module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("absoluteUrl", (url, base = "https://trust.metaviews.ca") => {
    try {
      return new URL(url || "/", base).toString();
    } catch (_) {
      return base;
    }
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return new Date().toISOString();
    return new Date(dateObj).toISOString();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
