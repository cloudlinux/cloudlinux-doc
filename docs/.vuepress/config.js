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
  chainWebpack(config) {
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js')
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
            title: 'Содержание',
            collapsable: false,
            children: [
              "/ru/installation/",
              ["/ru/settings/", "Настройки"],
              ["/ru/command_line/", "Командная строка"],
              ["/ru/config_options/", "Опции конфига"],
              ["/ru/disabling_some_patches/", "Отключение патчей"],
              ["/ru/delayed_feed/", "Отложенные рассылки"],
              ["/ru/extra_patchse/", "Дополнительные патчи"],
              ["/ru/sticky_patches/", "Sticky патчи"],
              ["/ru/nagios_plugin/", "Плагин для Nagios"],
              ["/ru/zabbix_template/", "Плагин для Zabbix"],
              ["/ru/upgrade/", "Обновление"],
              ["/ru/uninsta/", "Удаление"],
              ["/ru/technology/", "Технология"],
              ["/ru/reseller_partner_ui/", "UI для реселлеров"],
              ["/ru/kernelcare_enterprise/", "Kernelcare Eportal"],
              ["/ru/kcare-nexpose/", "Kernelcare nexpose"],
              ["/ru/kernelcare_whmcs_plugin/", "WHMS плагин для Kernelcare"],
              ["/ru/proxy_settings/", "Настройки прокси"],
              ["/ru/eol_ubuntu_lts_kernels_suppor/", "Поддержка Ubuntu"],
              ["/ru/downloading_documentation/", "Скачать документацию"],
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