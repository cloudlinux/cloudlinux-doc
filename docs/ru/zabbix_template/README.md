# Zabbix Template


Zabbix Template for KernelCare

check_kcare is a Nagios/Zabbix plugin that provides a way to monitor the out of date and inactive servers. It can provide information on servers assigned to the KernelCare key, or for all the servers in partner account.

You can download the plugin from [http://patches.kernelcare.com/downloads/nagios/check_kcare](http://patches.kernelcare.com/downloads/nagios/check_kcare)

/usr/lib/zabbix/externalscripts

(or any other directory configured for Zabbix external check scripts)

Script options:

| | |
|-|-|
|-z | Zabbix compatible format (Nagios otherwise)|
|-k KERNELCARE_KEY | retrieve status for servers associated with KEY|
|-l PARTNER_LOGIN --api-token TOKEN | retrieve status for all servers in partner account based on login/token|
|-c o,u,i -- return CRITICAL | list of coma separate o, u & i. o -- out of date, u - unknown kernel, i - inactive server|
|-w o,u,i -- return WARNING | list of coma separate o, u & i. o -- out of date, u - unknown kernel, i - inactive server|

You can download Zabbix template at:

[http://patches.kernelcare.com/downloads/nagios/kcare_zabbix_template.xml](http://patches.kernelcare.com/downloads/nagios/kcare_zabbix_template.xml)

