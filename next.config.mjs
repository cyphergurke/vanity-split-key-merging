
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: false,
    swcMinify: true,
    disable: false
});

export default withPWA({
    // other Next.js config options
});
