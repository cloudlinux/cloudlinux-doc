# Config File Description


Imunify360 config file is available on the following location after installation:

_/etc/sysconfig/imunify360/imunify360.config_

In the config file it is possible to set up Imunify360 configuration. The following options are available:

```
AUTO_WHITELIST:
```

| | |
|-|-|
| | # set in minutes how long to keep automatically whitelisted IP|
| | # set in minutes for how long IP will be added to the WhiteList after it passes Imunify360 CAPTCHA|

```
DOS:
```
```
 
```
| | |
|-|-|
| | # allows to enable (true) or disable (false) DOS detection|
| | # set in minutes how often DOS detection should be launched|
| | # set the maximum simultaneous connections before IP will be blocked|

```
INCIDENT_LOGGING:
```
```
 
```
| | |
|-|-|
| | # minimum severity level for incidents displayed in UI. Please find the levels description [here](/general.htm#incidentslogging/)|
| | # incidents older than `num_days` are automatically deleted|
| | # how many incidents should be stored in Imunify360 log file|
| | # set auto refresh time for incidents in user interface|

```
 
```
```
MOD_SEC_BLOCK_BY_SEVERITY:
```
```
 
```
| | |
|-|-|
| | # allows to enable or disable option that moves IPs to GrayList if the ModSecurity rule is triggered|
| | # set a number of repeats of the ModSecurity incident from the same IP for adding it to GrayList|
| | # set a number of repeats of the ModSecurity incidents that got Access Denied error from the same IP for adding it to GrayList|
| | # set a period in seconds during which incident from the same IP will be recorded as a repeat|
| | # set a level of severity for DOS detection sensitivity. Read more [here](/settings/) about severity levels|

```
MOD_SEC_BLOCK_BY_CUSTOM_RULE:         
```

| | |
|-|-|
| | # set ModSecurity rule ID|
| | # set a period in seconds during which incident from the same IP will be recorded as a repeat|
| | # set a number of repeats of the ModSecurity incident from the same IP for adding it to GrayList|

```
MALWARE_SCANNING:
```

| | |
|-|-|
| | # allows to enable (true) or disable (false) automatic malicious file restore from backup if a clean copy exists, otherwise `default_action` is applied|
| | # default action on malicious file detected. Available options: `quarantine` - do not delete and move to quarantine,  `notify` - do not delete and send email notification, `delete` - delete malicious file|
| | #  allows to enable (true) or disable (false) email notification if file is detected as infected|
| | # enable (true) or disable (false) real-time scanning for modified files using [inotify](https://en.wikipedia.org/wiki/Inotify) library|
| | _# enable (true) or disable (false) real-time scanning for files uploaded through PureFTPd_|
| | _#  enable (true) or disable (false) real-time scanning of all the files_  _that were uploaded via http/https. Note it requires _|

```
CAPTCHA:
```

| | |
|-|-|
| | # set in seconds how often SSL certificate will be refreshed|
```
 
```
```
 
```
```
ERROR_REPORTING:
```

| | |
|-|-|
| | # automatically report errors to imunify360 team|

```
SEND_ADDITIONAL_DATA:
```

| | |
|-|-|
| | # send anonymized data from query string/post parameters, and cookies.|

```
NETWORK_INTERFACE:                   
```

| | |
|-|-|
| | # by default, Imunify360 will auto-configure iptables to filter all traffic. f you want iptables rules to be applied to a specific NIC only, list them here (e.g. eth1)|
| | # it is the same as `eth_device` , but configures ip6tables to use specific device|
| | # if you don't want iptables\ip6tables rules to be applied to specific NICs, list them here (e.g [eth1, eth2]).|

```
BACKUP_RESTORE:
```

| | |
|-|-|
| | # restore from backup files that are not older than `max_days_in_backup`|
| | # show CloudLinux Backup in the list of available backup system (true) or hide it (false)|
| | |

```
CAPTCHA_DOS:
```

| | |
|-|-|
| | # enable (true) or disable (false) CAPTCHA Dos protection|
| | # set a period in seconds during which requests to CAPTCHA from the same IP will be recorded as repeated|
| | # set the maximum number of repeated CAPTCHA requests after which IP is moved to the CAPTCHA Dos list without an ability to request CAPTCHA again|
| | # set in seconds the time on which to add the IP in CAPTCHA Dos list without an ability to request CAPTCHA again|

```
BLOCKED_PORTS:
```

| | |
|-|-|
| | # defines the default state of ports which is not explicitly set by user ( `denied` by default or `allowed` by default). Currently only `allowed` is supported|


