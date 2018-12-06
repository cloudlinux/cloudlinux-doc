# Hosting Panels Firewall Rulsets Specific Settings


This section includes specific settings for each hosting panel that Imunify360 supports. It is important to follow these instructions to setup Imunify360 plugin properly.

**Note.** mod_security, the important software for Imunify360, is not installed automatically during Imunify360 installation process. Without mod_security, Imunify360 will lack the following features:

Web application firewall.
Malware scanning of files uploaded using web.

Mod_security installation process is specific for different panels.

Find the official cPanel documentation on the link: [https://documentation.cpanel.net/display/EA4/Apache+Module%3A+ModSecurity#ApacheModule:ModSecurity-InstallModSecHowtoinstalloruninstallmod_security2](https://documentation.cpanel.net/display/EA4/Apache+Module%3A+ModSecurity#ApacheModule:ModSecurity-InstallModSecHowtoinstalloruninstallmod_security2)

Find the official Plesk documentation on the link: [https://docs.plesk.com/en-US/onyx/administrator-guide/server-administration/web-application-firewall-modsecurity.73383/](https://docs.plesk.com/en-US/onyx/administrator-guide/server-administration/web-application-firewall-modsecurity.73383/)

**Important!** If mod_security is installed after Imunify360, it is important to execute the following command to add mod_security ruleset to Imunify360:

For cPanel/Plesk:

```
imunify360-agent install-vendors
```

If mod_security is installed before Imunify360, the rules will be installed automatically.

**Note** . If Imunify360 installer detects any existing ruleset, it installs only minimal set of its rules. So, you need to disable all third-party rulesets prior to Imunify360 installation to get the full ruleset installed automatically.

## cPanel



It is possible to enable Service Status checker for Imunify360. Perform the following steps:

1. Go to _Service Configuration_ and choose _Service Manager_ .

2. In _Additional Services_ section tick _imunify360-agent_ and _imunify360-captcha_ checkboxes.

3. Click _Save_ and wait until cPanel enables the Service Status checker for Imunify360.

![](/images/cpanel_set01_zoom83.png)

If succeeded, the status of Imunify360 service will be displayed at Service Status section of Server Status.

![](/images/cpanel_set02.jpg)

**ModSecurity Settings**
 
Recommended mod_security settings are:
Audit Log Level - Only log noteworthy transactions.
Connections Engine - Do not process the rules.
Rules Engine - Process the rules.

![](/images/modsecuritysettings.png)

It’s also recommended to disable any third-party _ mod_security_ vendors except Imunify360 ruleset (especially **OWASP** and **Comodo** ). These rulesets can cause large number of false-positives and duplicate Imunify360 ruleset.

To do so, go to ModSecurity Vendors section of cPanel main menu, and switch to “Off” all enabled vendors except Imunify360 ruleset.
If there is no Imunify360 ruleset installed, run ` imunify360-agent install-vendors` command.

![](/images/whmmodsecurityvendors_zoom70.png)

## Plesk



It is not recommended to use firewalld and Plesk Firewall simultaneously, because Plesk does not fully support such configuration. We recommend to disable firewalld by running the command on the server:

```
systemctl disable firewalld
```

Read more about the problem at Plesk Help Center in this [thread](https://support.plesk.com/hc/en-us/articles/115000905285-Plesk-Firewall-and-firewalld) .

**ModSecurity Configuration**

Web application firewall mode - On

![](/images/modsecurityconfigurationpleskonyx.png)

If any mod_security ruleset was installed during Imunify360 installation, Imunify360 will not install its own ruleset, because Plesk supports only one ruleset at once.

To check, if Imunify360 ruleset is installed, run the following as root:

```
# plesk sbin modsecurity_ctl -L --enabled
imunify360-full-apache
```
```
 
```
If the output does not contain imunify360, for example:

```
# plesk sbin modsecurity_ctl -L --enabled
tortix
```
```
 
```

Then remove existing ruleset and install Imunify360 one:

```
# plesk sbin modsecurity_ctl --disable-all-rules --ruleset tortix
# plesk sbin modsecurity_ctl --uninstall --ruleset tortix
# plesk sbin modsecurity_ctl -L --enabled
# imunify360-agent install-vendors
INFO    [+ 3785ms]                         defence360agent.simple_rpc|Executing ('install-vendors',), params: {}
INFO    [+ 8781ms]   defence360agent.subsys.panels.plesk.mod_security|Successfully installed vendor 'imunify360-full-apache'.
INFO    [+ 8782ms]                  defence360agent.subsys.web_server|Performing web_server graceful restart
OK
# plesk sbin modsecurity_ctl -L --enabled
imunify360-full-apache
```
 
## DirectAdmin


 
During installation on DirectAdmin, Imunify360 will try to install _mod_security_ automatically using custombuild 2.0.

**Note** that automatic installation of Imunify360 ruleset is only supported with custombuild 2.0.


