module.exports = {
  title: 'Kernelcare documentation',
  description: "A demo documentation using VuePress",
  base: "/kernelcare-doc/",
  themeConfig:{
    nav: [
      { text: 'Kernelcare', link: 'https://kernelcare.com'}
    ],
    sidebar: [
      {
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
  }
}