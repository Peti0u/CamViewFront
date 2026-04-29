const PROXY_CONFIG = [
  {
    context: ['/cam-locale'],
    target: 'http://172.17.8.223:8765',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/cam-locale': '',
    },
    logLevel: 'debug',
  },
];

export default PROXY_CONFIG;
