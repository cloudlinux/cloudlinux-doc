export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  const redirectionMapping = siteData.themeConfig.redirectionMapping;
  router.beforeEach((to, from, next) => {
    if (redirectionMapping && redirectionMapping[to.redirectedFrom]) {
      next(redirectionMapping[to.redirectedFrom]);
    } else if (to.fullPath === "/") {
      next(siteData.themeConfig.defaultURL);
    } else {
      next();
    }
  });
};
