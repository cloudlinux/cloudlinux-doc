# Nagios Plugin


check_kcare is a Nagios plugin that provides a way to monitor the out of date and inactive servers. It can provide information on servers assigned to the KernelCare key, or for all the servers in partner account.

Start from installing Nagios monitoring system.

You can download the plugin from [http://patches.kernelcare.com/downloads/nagios/check_kcare](http://patches.kernelcare.com/downloads/nagios/check_kcare)

Place the plugin into ` /usr/lib64/nagios/plugins/ ` directory and make this script executable by running:

```
chmod +x /usr/lib64/nagios/plugins/check_kcare
```

Create _kcare.cfg_ configuration file from the template below and place it into _/etc/nagios/conf.d/_ directory.

You will also need to specify your KernelCare key instead of KERNELCARE_KEY. If the licenses are IP-based, you can find your login & API security token in _Profile_ section of your CLN account.

Restart Nagios service and go to Nagios Web UI (http://NAGIOS_IP/nagios/). Click on _Services_ link (top left under _Hosts_ ). You should be able to see a string showing an output from monitoring script (please see screenshots below).

Script options:

| | |
|-|-|
|-k KERNELCARE_KEY | retrieve status for servers associated with KEY|
|-l PARTNER_LOGIN --api-token TOKEN | retrieve status for all servers in partner account based on login/token|
|-c o,u,i -- return CRITICAL | list of coma separated o, u & i. o -- out of date, u - unknown kernel, i - inactive server|
|-w o,u,i -- return WARNING | list of coma separated o, u & i. o -- out of date, u - unknown kernel, i - inactive server|

Here is an example configuration for key-based KernelCare licenses (IP-based section is commented out here):

Example host to associate the KernelCare status check service with

```
define host {
       host_name                       kcare-service
       notifications_enabled           0
       max_check_attempts              1
       notification_interval           0
       check_period                    24x7
}
 
 
define command {
       command_name     check_kcare
       command_line     /usr/lib64/nagios/plugins/check_kcare -k $ARG1$
}
 
define command {
       command_name     check_kcare_opts
       command_line     /usr/lib64/nagios/plugins/check_kcare -k $ARG1$ -c $ARG2$ -w $ARG3$
}
define command {
       command_name     check_kcare_partner
       command_line     /usr/lib64/nagios/plugins/check_kcare -l $ARG1$ --api-token $ARG2$
}
 
define command {
       command_name     check_kcare_partner_opts
       command_line     /usr/lib64/nagios/plugins/check_kcare -k $ARG1$  -l $ARG1$ --api-token $ARG2$ -c $ARG2$ -w $ARG3$
}
 
define service {
       host_name                       kcare-service
       service_description             KernelCare Server Status Checker By Key
       check_command                   check_kcare!
       notifications_enabled           1
       check_interval                  240
       retry_interval                  60
       max_check_attempts              4
       notification_options            w,c,r
       check_period                     24x7
       notification_period             24x7
}
 
#define service {
#       host_name                       kcare-service
#       service_description             KernelCare Server Status Checker By login/token with outdated/inactive considered as critical
#       check_command                   check_kcare_partner_opts!partner_login!partner_token!o,i!u
#       notifications_enabled           1
#       check_interval                  240
#       retry_interval                  60
#       max_check_attempts              4
#       notification_options            w,c,r
#       check_period                     24x7
#       notification_period             24x7
#}
```


![](https://docs.kernelcare.com/nagiosservices_zoom70.png)



![](https://docs.kernelcare.com/hmfile_hash_6837b862.png)






