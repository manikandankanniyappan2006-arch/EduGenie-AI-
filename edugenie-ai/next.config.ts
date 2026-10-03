module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    USE_LOCAL_EXPLANATION: process.env.USE_LOCAL_EXPLANATION,
    LOCAL_EXPLANATION_MODEL: process.env.LOCAL_EXPLANATION_MODEL,
  },
};