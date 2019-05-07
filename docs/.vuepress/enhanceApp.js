export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  router.beforeEach((to, from, next) => {
    if (to.fullPath === "/") {
      next(siteData.themeConfig.defaultURL);
    } else {
      next();
    }
  });
};
