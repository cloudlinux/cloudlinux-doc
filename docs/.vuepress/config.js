const urls = require("./urls-mapping.js");
const sidebarUrls = require("./sidebar-urls");
const _slugify = require('vuepress/lib/markdown/slugify');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  base: "/",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
  ],
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Documentation",
      description: "CloudLinux Documentation"
    },
    "/ru/": {
      lang: "ru",
      title: "Документация",
      description: "Документация CloudLinux"
    }
  },
  theme: "cloudlinux",
  markdown: {
    slugify: (s) => {
      if (sidebarUrls[s]) {
        return sidebarUrls[s];
      }
      return _slugify(s);
    }
},

  themeConfig: {
    repo: "cloudlinux/cloudlinux-doc",
    editLinks: true,
    docsBranch: "dev",
    docsDir: "docs",
    
    translationSource: 'docs.cloudlinux.com',
    defaultURL: "/cloudlinux_installation/",
    redirectionMapping: urls,
    sidebarDepth: 2,
    logo: "/logo.svg",
    try_free: "https://cloudlinux.com/trial",

    social: [
      { url: "https://www.facebook.com/cloudlinux/", logo: "/fb.png" },
      { url: "https://twitter.com/cloudlinuxos/", logo: "/tw.png" },
      { url: "https://linkedin.com/company/cloudlinux", logo: "/in.png" },
      {
        url: "https://www.youtube.com/channel/UCZ3YMHWnMP7TaxlXVay5-aw",
        logo: "/ytube.png"
      }
    ],
    cloudlinuxSite: "https://cloudlinux.com",
    locales: {
      "/": {
        stayInTouch: "Stay in touch",
        bottomLinks: [
          {
            text: "How to",
            url:
              "https://cloudlinux.zendesk.com/hc/sections/115001344329-How-do-I"
          },
          {
            text: "Getting started",
            url: "https://www.cloudlinux.com/getting-started-with-cloudlinux-os"
          },
          {
            text: "Contact support",
            url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
          },
          { text: "Blog", url: "https://www.cloudlinux.com/blog" }
        ],

        // text for the language dropdown title
        title: "Language",
        // text for the language dropdown
        selectText: "En",
        // label for this locale in the language dropdown
        label: "English",
        // text for the edit-on-github link
        editLinkText: "Edit this page",
        tryFree: "Try Free",
        search: "Search",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {
          apiKey: "efaa28397ce47241021d716c439b80d1",
          indexName: "cloudlinuxos",
          appId: "0TCNL6CGX8"
        },

        sidebar: [
          {
            title: "Content",
            collapsable: false,
            children: [
              "/cloudlinux_installation/",
              "/limits/",
              "/command-line_tools/",
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
              "/cloudlinux_life-cycle/"
            ]
          }
        ]
      },
      "/ru/": {
        title: "Язык",
        selectText: "Рус",
        label: "Русский",
        editLinkText: "Редактировать",
        tryFree: "Попробовать бесплатно",
        search: "Поиск",
        serviceWorker: {
          updatePopup: {
            message: "Доступен Новый контент",
            buttonText: "Обновить"
          }
        },
        algolia: {
          apiKey: "efaa28397ce47241021d716c439b80d1",
          indexName: "cloudlinuxos-ru",
          appId: "0TCNL6CGX8"
        },
        stayInTouch: "Будем на связи",
        bottomLinks: [
            {
                text: "Инструкции",
                url: "https://cloudlinux.zendesk.com/hc/sections/115001344329-How-do-I"
            },
            {
                text: "С чего начать",
                url: "https://www.cloudlinux.com/getting-started-with-cloudlinux-os"
            },
            {
                text: "Техподдержка",
                url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
            },
            { text: "Блог", url: "https://www.cloudlinux.com/blog" }
        ],
        sidebar: [
          {
            title: "Содержание",
            collapsable: false,
            children: [
              "/ru/cloudlinux_installation/",
              "/ru/limits/",
              "/ru/command-line_tools/",
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
              "/ru/cloudlinux_life-cycle/"
            ]
          }
        ]
      }
    }
  }
};
