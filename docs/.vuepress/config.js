
module.exports = {

  base: "/",
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Documentation",
      description: "Kernelcare documentation"
    },
    "/ru/": {
      lang: "ru",
      title: "Документация",
      description: "Документация Kernelcare"
    }
  },
  theme: 'vuepress-theme-cloudlinux',
  // theme: '/Users/prefer/src/cloudlinux-doc-theme', # local path
  
  themeConfig: {
    sidebarDepth: 2,
    logo: "/kc-logo.svg",
    try_free: "https://cloudlinux.com/kernelcare-free-trial5",
    bottomLinks: [
      { text: "How to", url: "#" },
      { text: "Getting started", url: "#" },
      {
        text: "Contact support",
        url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
      },
      { text: "Blog", url: "https://www.cloudlinux.com/kernelcare-blog" }
    ],
    social: [
      { url: "https://www.facebook.com/kernelcare/", logo: "/fb.svg" },
      { url: "https://twitter.com/kernelcare", logo: "/tw.svg" },
      { url: "https://linkedin.com/company/cloudlinux", logo: "/in.svg" },
      {
        url: "https://www.youtube.com/channel/UCZ3YMHWnMP7TaxlXVay5-aw",
        logo: "/ytube.svg"
      }
    ],
    cloudlinuxSite: "https://cloudlinux.com",
    locales: {
      "/": {
        // text for the language dropdown
        selectText: "Languages",
        // label for this locale in the language dropdown
        label: "English",
        // text for the edit-on-github link
        editLinkText: "Edit this page on GitHub",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // algolia docsearch options for current locale
        algolia: {},

        sidebar: [
          {
            title: "Content",
            collapsable: false,
            children: [
            ]
          }
        ]
      },
      "/ru/": {
        selectText: "Выберите язык",
        label: "Русский",
        editLinkText: "Отредактировать на GitHub",
        serviceWorker: {
          updatePopup: {
            message: "Новый контент доступен",
            buttonText: "Обновить"
          }
        },
        algolia: {},
        sidebar: [
          {
            title: "Содержание",
            collapsable: false,
            children: [

            ]
          }
        ]
      }
    }
  }
};
