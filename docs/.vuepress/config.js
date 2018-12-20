const urls = require("./urls-mapping.js");

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
    // TODO: temporary!
    // "/ru/": {
    //   lang: "ru",
    //   title: "Документация",
    //   description: "Документация Kernelcare"
    // }
  },
  theme: "cloudlinux",

  themeConfig: {
    defaultURL: "/cloudlinux_installation/",
    redirectionMapping: urls,
    sidebarDepth: 2,
    logo: "/logo.svg",
    try_free: "https://cloudlinux.com/trial",
    bottomLinks: [
      { text: "How to", url: "#" },
      { text: "Getting started", url: "#" },
      {
        text: "Contact support",
        url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
      },
      { text: "Blog", url: "https://www.cloudlinux.com/blog" }
    ],
    social: [
      { url: "https://www.facebook.com/cloudlinux/", logo: "/fb.svg" },
      { url: "https://twitter.com/cloudlinuxos/", logo: "/tw.svg" },
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
        algolia: {
          apiKey: 'c81913402fd913c6851439a56d3ad963',
          indexName: 'cloudlinux',
          appId: 'HU6RMR9IB4'
        },

        sidebar: [
          {
            title: "Content",
            collapsable: false,
            children: [
              "/cloudlinux_installation/",
              "/limits/",
              "/lve_manager/",
              "/reseller_limits/",
              "/lve-stats_2/",
              "/cagefs/",
              "/mysql_governor/",
              "/php_selector/",
              "/python_and_ruby_selector/",
              "/node_js_selector/",
              "/inodes_limits/",
              "/kernel_settings/",
              "/apache_mod_lsapi/",
              "/cloudlinux-fchange/",
              "/mod_proctitle/",
              "/additional_packages/",
              "/integration_guide/",
              "/partner_portal/",
              "/cloudlinux_network/",
              "/cloudlinux_whmcs_plugin/",
              "/deprecated/",
              "/hardware_compatibility/",
              "/cloudlinux_life-cycle/",
              "/downloading_documentation/"
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
              "/ru/cloudlinux_installation/",
              "/ru/limits/",
              "/ru/lve_manager/",
              "/ru/reseller_limits/",
              "/ru/lve-stats_2/",
              "/ru/cagefs/",
              "/ru/mysql_governor/",
              "/ru/php_selector/",
              "/ru/python_and_ruby_selector/",
              "/ru/node_js_selector/",
              "/ru/inodes_limits/",
              "/ru/kernel_settings/",
              "/ru/apache_mod_lsapi/",
              "/ru/cloudlinux-fchange/",
              "/ru/mod_proctitle/",
              "/ru/additional_packages/",
              "/ru/integration_guide/",
              "/ru/partner_portal/",
              "/ru/cloudlinux_network/",
              "/ru/cloudlinux_whmcs_plugin/",
              "/ru/deprecated/",
              "/ru/hardware_compatibility/",
              "/ru/cloudlinux_life-cycle/",
              "/ru/downloading_documentation/"
            ]
          }
        ]
      }
    }
  }
};
