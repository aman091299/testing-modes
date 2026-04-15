/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
     images: {
    remotePatterns: [   {
        protocol: 'https',
        hostname: 'cambaytigerstage-media.farziengineer.co',
        port: '',
        pathname: '/hosted/**',
      },
      {
        protocol: 'https',
        hostname: 'cti.farziengineer.co',
        port: '',
        pathname: '/hosted/**',
      },
        {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/736x/15/6d/c4/**',
      }, {
        protocol: 'https',
        hostname: 'cti.farziengineer.co',
        port: '',
        pathname: '/banners**',
      },
        {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/thumb/**',
      },
        {
        protocol: 'https',
        hostname: 'cti.farziengineer.co',
   
        pathname: '/banners/**',
      },
        {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/**',
      },
        {
        protocol: 'https',
        hostname: 'cti.farziengineer.co',
        pathname: '/products/**',
      },
        {
        protocol: 'https',
        hostname: 'cti.farziengineer.co',
        port: '',
        pathname: '/collection-backgrounds/**',
      },
        {
        protocol: 'https',
        hostname: 'resizing.flixster.com',
        port: '',
        pathname: '/ow9yFonG_bqWdnu8JA9NxsO2xl8=/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/474x/22/e8/64/22e86453ecf0b4f62c3ba7a80711ac56.jpg',
      },
         {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dgnp4dfhy/image/upload/**',
      },


    ],
  },
};

export default nextConfig;
