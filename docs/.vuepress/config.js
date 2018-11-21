module.exports = {
  // title: 'Kernelcare documentation',
  // description: "A demo documentation using VuePress",
  base: "/",
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'Kernelcare documentation',
      description: 'Kernelcare documentation'
    },
    '/ru/': {
      lang: 'ru',
      title: 'Документация Kernelcare',
      description: 'Документация Kernelcare'
    }
  },
  themeConfig:{
    locales: {
      '/': {
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // text for the edit-on-github link
        editLinkText: 'Edit this page on GitHub',
        // config for Service Worker 
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // algolia docsearch options for current locale
        algolia: {},
        nav: [
          { text: 'Kernelcare', link: 'https://kernelcare.com'}
        ],
        sidebar: [
          {
            title: 'Content',
            collapsable: false,
            children: [
              "/installation/",
              "/settings/",
              "/command_line/",
              "/config_options/",
              "/disabling_some_patches/",
              "/delayed_feed/",
              "/extra_patchse/",
              "/sticky_patches/",
              "/nagios_plugin/",
              "/zabbix_template/",
              "/upgrade/",
              "/uninsta/",
              "/technology/",
              "/reseller_partner_ui/",
              "/kernelcare_enterprise/",
              "/kcare-nexpose/",
              "/kernelcare_whmcs_plugin/",
              "/proxy_settings/",
              "/eol_ubuntu_lts_kernels_suppor/",
              "/downloading_documentation/"
            ]
          }
        ]
      },
      '/ru/': {
        selectText: 'Выберите язык',
        label: 'Русский',
        editLinkText: 'Отредактировать на GitHub',
        serviceWorker: {
          updatePopup: {
            message: "Новый контент доступен",
            buttonText: "Обновить"
          }
        },
        nav: [
          { text: 'Kernelcare', link: 'https://kernelcare.com'}
        ],
        algolia: {},
        sidebar: [
          {
            title: 'Content',
            collapsable: false,
            children: [
              "/ru/installation/",
              "/ru/settings/",
              "/ru/command_line/",
              "/ru/config_options/",
              "/ru/disabling_some_patches/",
              "/ru/delayed_feed/",
              "/ru/extra_patchse/",
              "/ru/sticky_patches/",
              "/ru/nagios_plugin/",
              "/ru/zabbix_template/",
              "/ru/upgrade/",
              "/ru/uninsta/",
              "/ru/technology/",
              "/ru/reseller_partner_ui/",
              "/ru/kernelcare_enterprise/",
              "/ru/kcare-nexpose/",
              "/ru/kernelcare_whmcs_plugin/",
              "/ru/proxy_settings/",
              "/ru/eol_ubuntu_lts_kernels_suppor/",
              "/ru/downloading_documentation/"
            ]
          }
        ]
      }
    }
  },
    // nav: [
    //   { text: 'Kernelcare', link: 'https://kernelcare.com'}
    // ],
    // sidebar: [
    //   {
    //     title: 'Content',
    //     collapsable: false,
    //     children: [
    //       "/installation/",
    //       "/settings/",
    //       "/command_line/",
    //       "/config_options/",
    //       "/disabling_some_patches/",
    //       "/delayed_feed/",
    //       "/extra_patchse/",
    //       "/sticky_patches/",
    //       "/nagios_plugin/",
    //       "/zabbix_template/",
    //       "/upgrade/",
    //       "/uninsta/",
    //       "/technology/",
    //       "/reseller_partner_ui/",
    //       "/kernelcare_enterprise/",
    //       "/kcare-nexpose/",
    //       "/kernelcare_whmcs_plugin/",
    //       "/proxy_settings/",
    //       "/eol_ubuntu_lts_kernels_suppor/",
    //       "/downloading_documentation/"
    //     ]
    //   }
    // ]
  // }
}