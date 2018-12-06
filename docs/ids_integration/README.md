# IDS Integrations


[ConfigServer Security & Firewall (CSF) integration](/csf/)
[ConfigServer eXploit Scanner (CXS) integration](/cxs/)
[Cloudflare support](/cloudflare_support/)

## CSF Integration


[ConfigServer Security & Firewall (CSF)](https://www.configserver.com/cp/csf.html) integration is intended to allow to use CSF along with Imunify360.

If CSF is **disabled** then Imunify360 becomes a primary IDS.
White List is loaded from CSF. Imunify360 and CSF work without any additional actions.
Gray List is not imported from CSF but it is possible to view and manage Gray List in Imunify360 interface. All changes **will not** be automatically exported to CSF.
Black List is not imported from CSF but it is possible to view and manage Black List in Imunify360 interface. All changes **will not** be automatically exported to CSF.

If CSF is **enabled** Imunify360 uses Login Failure Daemon (LFD) as source for security events instead of [OSSEC](http://ossec.github.io/%20) . CSF integration is enabled automatically when Imunify360 detects that CSF is running. No additional configuration is needed.

Black List, Gray List, and White List can be managed in Imunify360 regardless of CSF.
CSF Allow, Deny and Ignore Lists are not automatically imported from CSF. They can still be managed using CSF interface.
Imunify360 will not block addresses from CSF Allow and Ignore Lists.

![](/images/firewallblacklistwarning_zoom70.png)


It is possible to enable CSF when Imunify360 is already running. All IP addresses from Imunify360 White List will be exported to CSF ignore list. In about 30 seconds after CSF started, Imunify360 switches to CSF Integration mode.

To check if CSF integration is enabled go to Imunify360 → Firewall tab → White List section and check if there is a warning message " _CSF is enabled. Please manage IPs whitelisted in CSF using CSF user interface or config file_ ". It means that CSF and Imunify360 integration processed successfully.

To get events from Login Failure Daemon (LFD), Imunify360 automatically replaces BLOCK_REPORT variable to the file path of Imunify360 script.
In CSF integration mode, when some IP address is blocked by LFD, Imunify360 adds this IP address to its Graylist and then **removes it from CSF’s deny/tempdeny lists** . The latter is done to allow IP to have access to the Captcha and to store all automatically blocked IP addresses in a single place. Thus, no IP automatically added to CSF deny/tempdeny lists.

**Mod_security recommendation**

When mod_security is configured with SecRuleEngine On (blocking mode), CSF blocks IP addresses by mod_security events. The number of events to block IP address is defined by ` LF_MODSEC` variable in `csf.conf` . This can lead to a large number of false positives.

We recommend to set `LF_MODSEC` variable to 0.

In this case, Imunify360 will block IPs only by mod_security events with high severity.



## CXS Integration


[ConfigServer eXploit Scanner](https://configserver.com/cp/cxs.html) (CXS) has different types of malware scanning, which affects Imunify360 Malware Scanner functionality. Below we describe how to make Imunify360 Malware Scanner work properly. These functionalities can be configured at [Malware Scanner settings](/settings/) page, but CXS itself must be configured  as follows:

_Automatically scan all modified files_

CXS Watch daemon must be disabled.

_Automatically scan any files uploaded using web_

CXS ModSecurity vendor should be disabled.

_Automatically scan any file uploaded using ftp_

Imunify360 supports only [Pure-FTPd](https://www.pureftpd.org) . For Pure-FTPd CXS launches pure-uploadscript for the scan. Any pure-uploadscript used by CXS must be disabled.

_On-Demand scanning_

This type of scanning can be always run by Imunify360 and CXS separately. No special actions required.

**Note** _ that Imunify360 doesn’t make any imports from CXS._


## Cloudflare support


**_Starting from version 3.8, Imunify360 supports graylisting IP addresses behind Cloudflare._**

This is implemented by using Imunify360 WebShield reverse proxy. All traffic from Cloudflare IP addresses is redirected to the WebShield using iptables rules.
WebShield detects real visitor's IP address using CF-Connecting-IP and X-Forwarded-For headers, then forwards request to the backend for the valid IP addresses and shows captcha to graylisted IP addresses.

Cloudflare support is disabled by default. To enable it, add the following section to the Imunify360 config file ( _/etc/sysconfig/imunify360/imunify360.config_ ):

```
WEBSHIELD:
  known_proxies_support: true
```
```
 
```

