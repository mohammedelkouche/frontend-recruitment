// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    // This is only needed if you're using the older Pages Router approach
    // With App Router, we'll handle i18n through our custom middleware
    i18n: {
      locales: ['en', 'fr', 'es'],
      defaultLocale: 'en',
    },
  };
  
  export default nextConfig;