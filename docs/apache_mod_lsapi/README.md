# Apache mod_lsapi


Apache mod_lsapi is a module based on LiteSpeed Technologies API for PHP. It offers excellent PHP performance, low memory footprint coupled with great security and support for opcode caching.



mod_lsapi is a part of Apache;
Apache passes handling for PHP request to mod_lsapi;
mod_lsapi uses liblsapi to transfers request lsphp daemon;
lsphp processes request and return data to mod_lsapi;
each user has lsphp processes in separate CageFS/LVE;
If there is no requests for lsapi_backend_pgrp_max_idle seconds, lsphp process is terminated;
If no lsphp processes available when new request comes, new lsphp process is created;
lsphp can process lsapi_backend_children requests simultaneously.


![](/images/mod_lsapidiagrammnew.jpg)



lsphp - PHP + LSAPI. What is LSAPI? LiteSpeed Server Application Programming Interface (LSAPI) is designed specifically for seamless, optimized communication between LiteSpeed Web Server and third party web applications. Now this protocol is available for Apache 2.2/2.4.

Using LSAPI, we have seen higher performance than Apache with mod_php, easier installation than php-fpm and easier integration with any control panel. LSAPI means faster and more stable dynamic web pages.



CageFS (installed and initialized) - optional, mod_lsapi can work without CageFS
Alt-PHP (optional for EasyApache 4 and for DirectAdmin)
ea-php (for EasyApache 4 only)
Apache with SuExecuUserGroup directive for each user's VirtualHost
mod_ruid2 disabled
apache itk disabled



| |  | |
|-|--|-|
|**Options** | **Description** | **Level**|
| | mod_php emulation | httpd.conf, virtualhost, htaccess|
| | Switching mod_lsapi handler on or off | httpd.conf|
| | number of usec to wait while lsPHP starts (if not started on request) | httpd.conf|
| | number of retries to connects to lsPHP daemon | httpd.conf|
| | httpd.conf, On - stop lsphp services on apache restart, Off - leave live started lsphp services on apache restart (for php+opcache). The lsphp will not restart, even if Apache gets restarted. | httpd.conf|
| | sets env variable LSAPI_CHILDREN # Maximum number of simultaneously running child backend processes. # Optional, a default value is equal to EP. # min value is 2; max value is 10000. If var value is more, 10000 will be used. | httpd.conf|
| | sets env variable LSAPI_MAX_PROCESS_TIME # Optional. Default value is 300. # Timeout to kill runaway processes | httpd.conf|
| | sets env variable LSAPI_PGRP_MAX_IDLE, in seconds. # Controls how long a control process will wait for a new request before it exits. # 0 stands for infinite. # Optional, default value is 30. # Should be more or equal to 0. | httpd.conf|
| | enable debugging for mod_lsapi, acceptable values: on/off | httpd.conf|
| | Path to back end lsphp sockets. By default /var/run/mod_lsapi  | httpd.conf|
| | Invoke master lsPHP process not per VirtualHost but per account | httpd.conf|
| | Sets PHPRC env variaable | httpd.conf, virtualhost|
| | Set user & group for requests  | httpd.conf, virtualhost, directory |
| | Set user id & group id for requests  | httpd.conf, virtualhost, directory|
| | Use default apache UID/GID if no uid/gid set. Values: On/Off. If Off, and no UID/GID set, error 503 will be returned. Default - Off   | httpd.conf|
| | check target PHP script permissions. If set to On, lsapi will check that script is owned by the same user, as user under which it is being executed. Return 503 error if they don't match. Default: Off | httpd.conf|
| | Time to wait for response from the lsphp daemon, in seconds. 0 stands for infinity. For preventing long running processes which can use EP (limit number of entry processes). Default value is 300.  | httpd.conf|
| | env variable LSAPI_ALLOW_CORE_DUMP (On or Off). Pass LSAPI_ALLOW_CORE_DUMP to lsphp or not. If it will be passed - core dump on lsphp crash will be created. # Off by default # By default a LSAPI application will not leave a core dump file when crashed. If you want to have # LSAPI PHP dump a core file, you should set this environment variable. If set, regardless the # value has been set to, core files will be created under the directory that the PHP script in. LSAPI_ALLOW_CORE_DUMP | httpd.conf|
| | On/Off - disable php_* directives, default On. | httpd.conf, virtualhost, htaccess|
| | On/Off - disable enable connect pool, default Off | httpd.conf|
| | It is relevant only with lsapi_with_connection_pool option switched on. Controls how long a worker process will wait for a new request before it exits. | httpd.conf|
| | It is relevant only with lsapi_with_connection_pool option switched on. Controls how many requests a worker process will process before it exits. | httpd.conf|
| | Pass env variable to lsphp. By default lsphp environment have only TEMP, TMP and PATH variables set. Example: lsapi_set_env TMP "/var/lsphp-tmp" Note: PATH env var default "/usr/local/bin:/usr/bin:/bin" cannot be changed because of security reasons. To change it, use explicitly lsapi_set_env_path option | httpd.conf|
| | Change PATH variable in the environment of lsPHP processes. | httpd.conf|
| | Check or not permissions of target php scripts | httpd.conf|
| | Check or not the owner of DOCUMENT ROOT | httpd.conf|
| | Enable .user.ini files for backend. Same as suphp, php-fpm and fcgid mechanism of .user.ini. Default value is Off | httpd.conf, virtualhost|
| | On/Off. If lsapi_enable_user_ini option is set to On, then enable/disable processing .user.ini file in home directory also. Default value is Off | httpd.conf, virtualhost|
| | Enable/disable CRIU for lsphp freezing. Can be: On/Off. Default: Off | httpd.conf|
| | Set path to socket for communication with criu service [should be path] - default: /var/run/criu/criu_service.socket | httpd.conf|
| | Enable/disable flag for notification about lsphp started. This method avoid cycles of waiting for lsphp start/ Can be: On/Off. Default: On | httpd.conf|
| | Number of request when lsphp should be freezed. Should be [number] - default 0 | httpd.conf|
| | Method of requests counting. Off - use shared memory. Signals - use signals from child processes to parent. Default: Off | httpd.conf|
| | Path to folder where imgs of freezed PHP will be stored. Should be path. Default: /var/run/mod_lsapi/ | httpd.conf|
| | Disabling HTTP responses buffering on Apache level. On - enable buffering. Off - disable buffering | httpd.conf, virtualhost, htaccess|
| | can be used only when lsapi_backend_use_own_log is On. On - backend processes of the all virtual hosts will share the common log file. Off - every virtual host will have its own backend log file. | httpd.conf, virtualhost|
| | Redirecting log output of backend processes from Apache error_log to dedicated log file or files, depending on value of lsapi_backend_common_own_log option. | httpd.conf, virtualhost|
| | Enable or disable phpini_* directive processing. Default value is Off | httpd.conf, virtualhost, directory|
| | When lsapi_process_phpini option switched to Off, these values will be silently ignored. lsapi_phpini values with absolute filename of php.ini file can be inserted into .htaccess files in order to set custom php.ini which will override/complement settings from system default php.ini. | httpd.conf, virtualhost, directory|
| | Acceptable values: on/off: If a new HTTP request is coming to LSPHP daemon when all LSPHP workers are still busy, it can process this situation in two different ways. In REJECT mode LSPHP daemon will reject such request immediately. Otherwise, in legacy mode LSPHP daemon will put this request into infinite queue, until one or more LSPHP daemon becomes free. When HTTP request is rejected in REJECT mode, mod_lsapi will write into Apache error_log the following message: Connect to backend rejected, and client will receive 507 HTTP response.  By default LSPHP daemon in CloudLinux uses REJECT mode. It can be switched off with this option. | httpd.conf, virtualhost|
| | Enable or disable a mechanism to avoid creation of zombie processes by lsphp. Default value is Off. | httpd.conf, virtualhost|
| | To disable addition of PWD variable. Default value is Off. If set to On, the PWD variable will not be added into a backend environment. | httpd.conf, virtualhost|




```
LoadModule lsapi_module modules/mod_lsapi.so
 
<IfModule lsapi_module>
         AddType application/x-httpd-lsphp .php
lsapi_backend_connect_timeout 100000
          lsapi_backend_connect_tries 10
          lsapi_backend_children 20
          lsapi_backend_pgrp_max_idle 30
          lsapi_backend_max_process_time 300
          lsapi_debug Off
</IfModule>
```




When installed, liblsapi will automatically create secret file used by mod_lsapi to communicate with backend:


owner root:root
perms: 400

for making security pass PHPRC and UID|GID on start lsphp

Algorithm of creating:

/bin/dd if=/dev/random of=/etc/sysconfig/modlsapi.secret bs=16 count=1




Use the following syntax to manage MODLSAPI install utility:

```
/usr/bin/switch_mod_lsapi [OPTIONS]
```

Options:

| | |
|-|-|
| | setup _mod_lsapi_ configurations for Apache|
| | only EasyApache 4 feature|
| | uninstall _mod_lsapi_ from Apache|
| | enable _ mod_lsapi_ for individual domain|
| | disable _mod_lsapi_ for individual domain|
| | sets up _mod_lsapi_ as a default way to serve PHP, making it enabled for all domains. Once that mode is enabled, you cannot disable _mod_lsapi_ for individual domain|
| | disable _mod_lsapi_ as a default way to serve PHP, disabling _mod_lsapi_ for all domains, including those selected earlier using _--enable-domain_|
| | build native lsphp for cPanel EA3|
| | build native lsphp for cPanel EA3 (with custom PHP source path)|
| | check PHP configuration|
| | switch verbose level on|
| | only with setup option (EA4)|
| | return usage statistics in JSON format;  the following statistics metrics are collected: control panel name; mod_lsapi version; liblsapi version; criu version and status; whether mod_lsapi is enabled; lsapi configuration options; number of domains, that use _mod_lsapi_ , per each installed PHP version (only supported for cPanel EA4, Plesk, and DirectAdmin).|

This tool:

Creates native _lsphp_ (if it doesn't exist) by doing:
Removes config template for _mod_ruid2_
Configures Apache handler _application/x-httpd-lsphp_
Switches domain to _lsphp_ or enable global _lsphp_
For cPanel EA3 can build native lsphp

What commands are available for different control panels:

| |  |  |  |  |  |  | |
|-|--|--|--|--|--|--|-|
| | No Control Panel | cPanel EA3 | cPanel EA4 | DirectAdmin | Plesk | InterWorx | ISPManager|
| | + | + | + | + (no need in manual calling) | + | + | +|
| | - | - | + | - | - | - | -|
| | + | + | + | - | + | + | +|
| | - | + | - | - | - | - | -|
| | - | + | - | - | - | - | -|
| | - | + | + | +/-(custombuild) | - | - | -|
| | - | + | + | - | - | - | -|
| | - | + | - | +/-(custombuild) | - | - | -|
| | - | + | - | - | - | - | -|
| | + | + | + | + | + | + | +|
| | + | + | + | + | + | + | +|
| | - | - | + | - | - | - | -|
| | +(without domain info) | +(without domain info) | +(with domain info) | +(with domain info) | +(with domain info) | +(without domain info) | +(without domain info)|



mod_lsapi allows to use different handlers for different php versions. For example, a file with extension .php53 can be handled by php5.3 and a file with extension .php55 handled by php5.5 without PHP Selector.
Here is an extra config file which allows to set handlers and php binaries for these handlers - _ /etc/container/php.handler_ . Example of this file:

```
# cat /etc/container/php.handler
application/x-lsphp53 /opt/alt/php53/usr/bin/lsphp
application/x-lsphp55 /opt/alt/php55/usr/bin/lsphp
```

Default handler for lsphp is - _ application/x-httpd-lsphp_ , if I set in .htaccess such options:

```
<FilesMatch "\.(php4|php5|php3|php2|php|phtml)$">
SetHandler application/x-httpd-lsphp
</FilesMatch>
<FilesMatch "\.php53$">
SetHandler application/x-lsphp53</FilesMatch>
```

File index.php53 will be processed by php 5.3, but index.php processed by php standard, placed at /usr/local/bin/lsphp.

**Important:**

All custom PHP for _phpperdir_ mechanizm should be located in any place in the directory _ /opt/alt/, _ because before start _lsphp_ mod_lsapi checks as follows: _/usr/local/bin/lsphp_ or _/opt/alt/*/lsphp_ . Such location and binary file are allowed to execute. Use the folder _/opt/alt/[any path]_ for installing custom php.

For example:

_/opt/alt/php.perdir/php55/bin/lsphp_ - it will work with mod_lsapi.

But if the server has custom php in another location (for example _ /usr/local/php55/bin/lsphp_ ), then just make symlink to lsphp:

ln _-sf /usr/local/php55/bin/lsphp /opt/alt/php.perdir/php55/bin/lsphp_

and add it to php.handler:

_myhandler-php55 /opt/alt/php.perdir/php55/bin/lsphp_



mod_lsapi is a drop in replacement for suPHP. No configuration changes required. To switch from suPHP to mod_lsapi:



```
/usr/bin/switch_mod_lsapi --enable-global 
```
 Switch individual domains:

```
/usr/bin/switch_mod_lsapi --enable-domain test.example.tst - enablesmod_lsapi [only for domain test.example.tst]
```







## Installation


For all control panels - SuExecUserGroup should be present for each virtual host.
CageFS and will be installed by dependencies (for lsphp binaries).




```
$ yum install liblsapi liblsapi-devel 
$ yum install mod_lsapi 
```

If CageFS is not initialized:


```
$ cagefsctl --init
$ cagefsctl --enable-all
```
 
```
$ /usr/bin/switch_mod_lsapi --setup
# Enable for a single domain:
$ /usr/bin/switch_mod_lsapi --enable-domain [domain]
# or globally
$  /usr/bin/switch_mod_lsapi --enable-global
$ service httpd restart
```



How to convert EasyApache 4 for CloudLinux:

[https://www.cloudlinux.com/blog/entry/beta-easyapache-4-released-for-cloudlinux](https://www.cloudlinux.com/blog/entry/beta-easyapache-4-released-for-cloudlinux)


```
$ yum install liblsapi liblsapi-devel
$ yum install ea-apache24-mod_lsapi 
```

Alternatively you can install mod_lsapi through EasyApache 4 web interface, just set of ea-apache24-mod_lsapi in the list of available modules.

If CageFS is not initialized:


```
$ cagefsctl --init
$ cagefsctl --enable-all
$ /usr/bin/switch_mod_lsapi --setup
```




After updating ea-apache24-mod_lsapi all the domains are switched to the default handler and to turn on mod_lsapi back, it was necessary to enable lsapi handler through .

We noticed that it is not very convenient to enable lsapi handler through after update and automated this process.

So, if you update ea-apache24-mod_lsapi from stable or ea-apache24-mod_lsapi-1.1-9 or lower from beta, after the update you need to run to add lsapi handler to .

After this, you will be asked to enable lsapi handler for proper PHP versions, depending on how you used mod_lsapi before ( , and then restart Apache.

Please note that the following options were disabled for ea-apache24-mod_lsapi:




You can manage your domains with PHP version and lsapi handler from .

_Please note that lsapi PHP handler is only available for beta version_ .

_Example 1:_

1. ea-apache24-mod_lsapi-1.0-30 was installed and globally enabled.

2. The command was executed.

3. While is not called, mod_lsapi will work as before.

4. will return:

```
Instruction: 
patching file apache.pm
Patch was applied correctly...
Added hook for System::upcp to hooks registry
mod_lsapi switched to turning on and off through the MultiPHP                                                 Manager(/Home/Software/MultiPHP Manager)
You are using enabled globally mod_lsapi. Do you want to enable mod_lsapi through                 MultiPHP Manager?
Current PHP will be switched to lsapi handler:
ea-php53 SAPI: suphp
ea-php54 SAPI: suphp
ea-php55 SAPI: cgi
ea-php56 SAPI: suphp
ea-php70 SAPI: cgi
ea-php71 SAPI: suphp
If you type no then mod_lsapi will be disabled and you can enable it again from                 MultiPHP Manager.
Do you want to proceed? [y/N]
```

5. If N is chosen, then mod_lsapi moves to the new type of integration with cPanel and restores files . Mod_lsapi will be disabled.

6. If Y is chosen, then all installed versions will move to lsapi handler.

```
Setting ea-php53 to lsapi handler...
Setting ea-php54 to lsapi handler...
Setting ea-php55 to lsapi handler...
Setting ea-php56 to lsapi handler...
Setting ea-php70 to lsapi handler...
Setting ea-php71 to lsapi handler...
```

![](/images/mod_lsapi_handler.jpg)

_Example 2:_

1. ea-apache24-mod_lsapi-1.0-30 was installed and enabled only for one domain but all other domains have the same ea-php56 version.

2. The command was executed.

3. While is not called, mod_lsapi will work as before.

4. will return:

```
Instruction: 
patching file apache.pm
Patch was applied correctly...
Added hook for System::upcp to hooks registry
Domains that handled by ea-php56:
tstdomain01.com - lsapi
tstdomain02.com - suphp
There are domains which are using mod_lsapi through --enable-domain option.
This option is deprecated for EA4 and mod_lsapi switched to turning on and off through
the MultiPHP Manager(/Home/Software/MultiPHP Manager)
Do you want to enable mod_lsapi through MultiPHP Manager for ea-php56?
Domains which are using suphp will be switched to lsapi handler too.
If you type N then mod_lsapi will remain enabled on these domains.
However, enabling mod_lsapi for new domains is now possible only through MultiPHP
Manager.
Do you want to proceed? [y/N] y
Setting ea-php56 to lsapi handler...
Built /etc/apache2/conf/httpd.conf OK
Reconfiguration completed
```

5. If N is chosen, then mod_lsapi will move to the new type of integration with cPanel and will restore files . Mod_lsapi still will be enabled for domains like in example file.

6. If Y is chosen, then displayed PHP version will move to lsapi handler. According to the example, using ea-php56, will be switched to lsapi handler.




```
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_mode lsphp
$ ./build php n
$ ./build apache
```




```
$ yum install liblsapi liblsapi-devel 
$ yum install mod_lsapi 
$ /usr/bin/switch_mod_lsapi --setup
```






```
<Directory /var/www/*/data/>
php_admin_flag engine off
</Directory
```





```
<Directory /var/www/[username]/data/www/[domain]>
Options -ExecCGI -Includes
php_admin_flag engine on
</Directory>
```








```
$ yum install liblsapi liblsapi-devel 
$ yum install mod_lsapi 
$ /usr/bin/switch_mod_lsapi --setup
```

Disable php.conf or any other PHP handler and uncomment in and restart Apache.


```
$ service httpd restart
```



Follow these steps to install lsphp binaries needed for mod_lsapi:


```
$ yum install cagefs lvemanager cmake gcc httpd-devel apr-devel
$ yum groupinstall alt-php
$ cagefsctl --init
$ cagefsctl --enable-all
```

If lsphp already exists, copy it to (this step allows you to avoid installing alt-php).

Compile mod_lsapi:


```
$ yum install liblsapi liblsapi-devel
$ cd ~
$ wget 
$ tar zxvf mod_lsapi.tar.gz
$ cd mod_lsapi-0.2-7
$ cmake .
$ make
$ make install
```

This will:
-- Install: (or to another correct httpd modules path)
-- Install:
```
$ cp conf/mod_lsapi.conf /etc/httpd/conf/extra/ #(or another httpd conf directory)
```

If you want lsapi as global PHP handler, uncomment and disable current PHP handler. If server uses suPHP, you can enable lsphp for single hosts. Just add to site's .htaccess.

```
$ install/da_cb_install
```

For last preparation of CageFS and PHP Selector should be created by script `n`


```
$ service httpd restart
```




Native PHP - PHP installed and used before alt-php packages were installed. Usualy lsphp binary is not available on the servers without LiteSpeed, which means that it should be created (build from php sources with such options as usual php binary file but with LSAPI protocol built-in).

There are two ways to make native lsphp:

1) The quick one (supports all type of panels).

Native lsphp is made from alt-php56:


```
switch_mod_lsapi --setup
cp /opt/alt/php56/usr/bin/lsphp /usr/local/bin/
```





```
switch_mod_lsapi --build-native-lsphp
```





```
/usr/local/directadmin/custombuild/build set php1_mode lsphp
/usr/local/directadmin/custombuild/build php n
```


## Uninstall





```
$ /usr/bin/switch_mod_lsapi --uninstall
```





```
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_release [any other php type]
$ ./build php n
$ ./build apache
```





```
$ yum erase mod_lsapi
$ rm [path to mod_lsapi.conf]
# restore standard php handler
$ service httpd restart
```



## Troubleshooting




mod_lsapi errors will be located in error_log and sulsphp_log.
Note that errors can appear in both logs at the same time, and you might need to refer to both of them to solve the issue.

See next table for more details:

| |  | |
|-|--|-|
|**error_log** | **sulsphp_log** | **Solution**|
| |  | Increase pmem or vmem limits for the user uid.|
| |  | lsphp was killed. It can be due to apache restart or lfd. If you see this  message too often - change to in lsapi.conf or add to the following lines: pexe:/opt/alt/php.*/usr/bin/lsphp|
| |  | lsphp has crashed. Next slide will explain what to do (core dump creating). Also, check configuration options for apc and suhosin in php.ini. Once you have a core file generated at DocumentRoot contact [https://helpdesk.cloudlinux.com/](https://helpdesk.cloudlinux.com/) so we can investigate the cause.|
| |  | Incorrect lsphp file permissions. For fixing: cagefsctl --force-update.|
| |  | UID/GID are not set in  virtualhost. Set in lsapi.conf (it is by default since 0.1-98 version, this solution is for older versions).|
| |  | File is not owned by the user PHP executed by. To overwrite (insecure), set in lsapi.conf. |
| |  | Check if СageFS enabled. Try running|
| |  | Check if is not inside CageFS) exists and owner should be apache: apache for DirectAdmin, Plesk, iWorx, ISPManager and nobody for cPanel.|
| |  | Increase PMEM limits for the user UID.|
| |  | Increase value of for UID in vhost.conf or globally in lsapi.conf.|
| |  | Increase NPROC limits for the UID. It should be greater than EP and|
| |  | These errors occurs when the amount of PMEM limits is incommensurable with the number of EP. Increase PMEM limits or decrease EP number for the user UID.|
| |  | Increase LimitRequestBody (Apache) or/and SecRequestBodyNoFilesLimit (mod_security) configuration limits|
| |  | Check that ` ` disabled|




If apache runs under a username other than or , you should rebuild sulsphp (where username is built in for security reasons) with corresponding username:

```
$ yum install liblsapi liblsapi-devel 
$ cd ~
$ wget 
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-37
$ cmake -DHTTPD_USER=<new user name> .
$ make
$ make install
```

 This will:
-- Install: so (or to another correct httpd modules path)
-- Install:



Check if SuExecUserGroup specified for virtual hosts. This parameter is used by mod_lsapi for user identification.



Switch in lsapi.conf or value to:

Check if empty: , then run:


```
yum install lve-utils
```

Then restart cron service.



If you need to run PHP using mod_lsapi using users with UID < 99, you would need to re-compile sulsphp:


```
$ yum install liblsapi liblsapi-devel
$ cd ~
$ wget 
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-XX
$ cmake -DUID_MIN=80 -DGID_MIN=80 .
$ make
$ make install
```

will be installed
-- Installing: (or another httpd modules path)
-- Installing:




```
$ yum install liblsapi liblsapi-devel 
$ cd ~
$ wget http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz        
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-XX
$ cmake -DPARENT_NAME="<apache binary name>".
$ make
$ make install
```

Will be installed:
-- Installing: (or another httpd modules path)
-- Installing:

**6. WHMCS Status page not accessible after installing CL and mod_lsapi (cPanel).**

add userstat
add to file (to the end of file before
lsapi_user_group userstat userstat
</Directory>
service httpd restart

This is safe solution for easyapache rebuilding and cpanel-mod-lsapi updating.



Make php.ini for suhosin as recommended below:

[suhosin]
suhosin.simulation = Off
suhosin.mail.protect = 1
suhosin.cookie.disallow_nul = Off
suhosin.cookie.max_array_depth = 1000
suhosin.cookie.max_array_index_length = 500
suhosin.cookie.max_name_length = 500
suhosin.cookie.max_totalname_length = 500
suhosin.cookie.max_value_length = 200000
suhosin.cookie.max_vars = 16384
suhosin.get.disallow_nul = Off
suhosin.get.max_array_depth = 1000
suhosin.get.max_array_index_length = 500
suhosin.get.max_name_length = 500
suhosin.get.max_totalname_length = 500
suhosin.get.max_value_length = 1000000
suhosin.get.max_vars = 16384
suhosin.post.disallow_nul = Off
suhosin.post.max_array_depth = 1000
suhosin.post.max_array_index_length = 500
suhosin.post.max_name_length = 500
suhosin.post.max_totalname_length = 500
suhosin.post.max_value_length = 1000000
suhosin.post.max_vars = 16384
suhosin.request.disallow_nul = Off
suhosin.request.max_array_depth = 1000
suhosin.request.max_array_index_length = 500
suhosin.request.max_totalname_length = 500
suhosin.request.max_value_length = 1000000
suhosin.request.max_vars = 16384
suhosin.request.max_varname_length = 524288
suhosin.upload.max_uploads = 300
suhosin.upload.disallow_elf = Off
suhosin.session.cryptua = Off
suhosin.session.encrypt = Off
suhosin.session.max_id_length = 1024
suhosin.executor.allow_symlink = Off
suhosin.executor.disable_eval = Off
suhosin.executor.disable_emodifier = Off
suhosin.executor.include.max_traversal = 8




Make php.ini for APC as recommended below:

```
[apc]
...
apc.shm_segments=1
apc.shm_size=32
...
```

shared memory should be not less than 32MB



This means that lsphp was crashed. Solution:

Check if apc for user enabled. Tune its options as described in previous slide.
Check if suhosin is enabled for user. Tune its options as described in this article.
If previous items do not help, contact us at [https://helpdesk.cloudlinux.com/](https://helpdesk.cloudlinux.com/) 



Configure mod_lsapi to allow lsphp to generate core dumps. In mod_lsapi.conf:

```
lsapi_backend_coredump On
```


Enable core file generation in sysctl:

```
sysctl -w ‘kernel.core_uses_pid=1’
sysctl -w ‘kernel.core_pattern=core.%p’
```


Configure system to change max size of core files. In add:

```
user1 soft core unlimited
user1 hard core unlimited
```

where is the username for which lsphp crashes.

If exists, look up for the following lines:

```
if [ "$LIMITUSER" != "root" ]; then
ulimit -n 100 -u 35 -m 200000 -d 200000 -s 8192 -c 200000 -v unlimited 2>/dev/null
```

Substring must be replaced with .

Add line ` ` into script just after another invokes of the command.

Do cold restart of Apache with the command like this:

```
service httpd stop; sleep 2; killall lsphp; service httpd start
```


You can make sure that ulimit for lsphp is changed to unlimited successfully with the following command:

```
cat /proc/PID/limits | grep ‘Max core file size’
```


where PID is a pid of any lsphp process.

Core dump of lsphp will be created in the DocumentRoot of the corresponding virtual server.
On cPanel server it should map to ` `

**mod_lsapi is not included in output of httpd -M after installation and setup command for cPanel EasyApache 3**

1. Check if the file exists and not empty;

2. Check if output of the command

```
cat /usr/local/apache/conf/httpd.conf | grep "/usr/local/apache/conf/conf.d/\*\.conf"
```

is not empty.

If it is empty:

1. Add to section of string:

```
"include": '"/usr/local/apache/conf/conf.d/*.conf"'
 "include":
   "directive": 'include'
   "items":
...
     -
     "include": '"/usr/local/apache/conf/conf.d/*.conf"'
 "listen":
```

2. Do:

```
mkdir -p /usr/local/apache/conf/conf.d/;                                                                                 cp /usr/share/lve/modlscapi/confs/lsapi.conf /usr/local/apache/conf/conf.d/lsapi.conf
```


3. Call:


```
/scripts/rebuildhttpdconf
/scripts/restartsrv_httpd
```


## FAQ on mod_lsapi


Q: **_ Is it compatible with EasyApache?_**

A: Yes, it is. EasyApache works/fully integrates with mod_lsapi.

Q: **_Is it compatible with _**

A: Yes.

Q: **_ Are .htaccess PHP directives supported? For example, mod_php like directives?_**

A: Yes. mod_lsapi can read php_* and php_admin_* directives.

Q: **_ I have httpd.conf with SuExecUserGroup options. Do I need to add mod_lsapi related options for VirtualHost?_**

A: No need to change httpd.conf. mod_lsapi can read suPHP_UserGroup, RUidGid, SuExecUserGroup, AssignUserID parameters to determine user id under which site is running. Additionally you can use lsapi_uid_gid or lsapi_user_group as a native way to specify user / group ids.

Q: **_What is the difference between running mod_lsapi with lsapi_with_connection_pool mode _**

A: When  lsapi_with_connection_pool mode is , then the new backend lsphp process has to be created for each new incoming request. At least it requires mod_lsapi to connect to backend lsphp master-process and have it perform fork which leads to a slowdown.

With

Alternatively, we have another accelerating technology - [CRIU](/criu_support/) , which is faster and uses less memory. But it is in Beta so far and available for CL7 only (stable version will appear in the near future).

Q: **_Your PHP installation appears to be missing the… How to manage native PHP with mod_lsapi under EasyApache 3?_**

A: There are several ways to do that.

1. _Using _

To find in user’s panel choose _ _ icon _ _ as follows:

![](/images/mod_lsapi_faq.jpg)

From you can manage PHP version and choose the necessary extensions to be used by PHP. Choose proper PHP version from the drop-down and click . Mark proper checkboxes to choose extensions and click :

![](/images/mod_lsapi_faq_01.jpg)

This is a simple and convenient way to configure the user's PHP.

2. _Using native PHP from _

mod_lsapi installs alt-php56 as native by default (just copy of alt-php56):

![](/images/mod_lsapi_faq_02.jpg)

The native version is not designed to enable or disable PHP extensions through the web interface of the . This can lead to missing of the proper PHP extensions for customers applications.

For example, you can get the following reply from the website that is using and native PHP:

![](/images/mod_lsapi_faq_03.jpg)

There are two ways to solve this problem:

Use non-native PHP with proper extensions enabled via the (described above).
Use native PHP with properly configured .ini files (described below).

To configure native PHP, use an additional .ini file :

![](/images/mod_lsapi_faq_04.jpg)

By default it is empty. To solve the issue this way, the following strings must be added:

```
extension=/opt/alt/php56/usr/lib64/php/modules/mysqli.so
extension=/opt/alt/php56/usr/lib64/php/modules/pdo_mysql.so
extension=/opt/alt/php56/usr/lib64/php/modules/pdo.so
```

All available extensions for alt-php56 can be seen by running the command:


```
# ls /opt/alt/php56/usr/lib64/php/modules/
```

**Note.** Some extensions may conflict with each other, be careful when enabling them through the file.

3. _Using switch_mod_lsapi --build-native-lsphp as native._

You can find additional notes on native PHP installation (EasyApache 3 only) on the link: [https://docs.cloudlinux.com/mod_lsapi_installation.html](https://docs.cloudlinux.com/mod_lsapi_installation.html)

To see what kind of native PHP is used, use the command:


```
# /usr/local/bin/php -v
```

Output example:

```
PHP 5.6.30 (cli) (built: Jun 13 2017 06:23:21) 
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
```

The command builds the lsphp of the same version, it will be used as native via the PHP Selector, but with another .ini file to configure.

![](/images/mod_lsapi_faq_05.jpg)

We do not recommend to use this native PHP because it does not support [CRIU](/criu_support/) .

To revert alt-php56 to the native PHP, execute the following command:


```
# cp /opt/alt/php56/usr/bin/lsphp /usr/local/bin/
```



## Installing mod_lsapi for Plesk


Installation process is done with :


```
yum install liblsapi liblsapi-devel
yum install mod_lsapi
```

When completed - run a command to setup mod_lsapi and register LSPHP handlers in Plesk Panel:

/usr/bin/switch_mod_lsapi --setup

The command adds handlers to Plesk Panel so they become available for domains.

Managing PHP handlers is fully done with according to their documentation: [http://download1.parallels.com/Plesk/PP12/12.0/Doc/en-US/online/plesk-administrator-guide/70669.htm](http://download1.parallels.com/Plesk/PP12/12.0/Doc/en-US/online/plesk-administrator-guide/70669.htm)

Quick reference:

Enabling lsapi for single domain is done with , select desired LSPHP handler for domain.

Enabling lsapi for multiple domains is done with , select desired LSPHP handler to be used by all users under a plan. If a subscription is not locked (user changed nothing in it), after clicking domains will start using lsapi.

![](/images/screenshot_20161029_132208_zoom84.png)

There is no way to switch all plans to lsapi - it should be done one-by-one .



1. Chose 

From the dialog box, select PHP version.

![](/images/php_settings_zoom94.png)


Click _ _ and to confirm.

2. Now you can manage your PHP (versions and modules) from .

Chose .

From the dialog box select proper PHP version and PHP modules (or defaults).

![](/images/php_version_zoom94.png)
Click and to apply your choice _._

From now on, on your domain will be applied PHP with version and modules which are set by handled by mod_lsapi.

3. Summary.

1. For correct work of - chose for domain .
2. If any other LSPHP version is chosen in Plesk, then will not be available anymore.
3. For enabling native PHP from the vendor, select on the management page.



## CRIU Support


_[_



CRIU is , (pronounced ), is a software tool for Linux operating system. Using this tool, you can freeze a running application (or part of it) and checkpoint it as a collection of files on disk. You can then use the files to restore the application and run it exactly as it was during the time of freeze (more information on the link [https://criu.org/Main_Page](https://criu.org/Main_Page) ).

mod_lsapi-1.1-1 is the first beta version with freezing PHP implemented. mod_lsapi now supports the following parameters:

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Values** | **Default**|
| | Enable/disable CRIU for lsphp freezing. |  | |
| | Set path to socket for communication with criu service. | [path to socket] | |
| | Enable/disable flag for notification about lsphp started. This method avoid cycles of waiting for lsphp start. |  | |
| | Number of request when lsphp should be freezed. | [number] 0 - no freezing | 0|
| | Method of requests counting. - use shared memory. - use signals from child processes to parent. |  | |
| | Path to folder where imgs of freezed PHP will be stored. | [path] | |
| | Enable/Disable CRIU related debug logging. |  | |

Example:

_lsapi_criu On_
_lsapi_criu_socket_path /var/run/criu/criu_service.socket_
_lsapi_backend_semtimedwait On_
_lsapi_backend_initial_start 15_
_lsapi_criu_use_shm Off_
_lsapi_criu_debug Off_



When Apache module mod_lsapi detects CRIU enabled (lsapi_criu On) it prepares a directory for images (on the first request of virtualhost) to store ( ), and starts lsphp process. Lsphp increases counter ( ) via shared memory or signals, when counter reaches limit ( ), lsphp sends the request to CRIU for freezing. CRIU service makes images of requested processes. Lsphp will not be frozen if counter has not reached the limit. The next time when lsphp will be stopped, it will be unfrozen from the images.

The images of the processes will be saved even if Apache is restarted. But all images will be deleted after server restart by default configuration. This can be modified by setting the new path .

**Important!** If php.ini or configuration file from php.d is changed, the images must be deleted manually.

**Note ** that CRIU (version lower than criu-lve-3.6-1) can't correctly freeze with enabled. For correct work, must be in . For disabling:

Copy to and change there
```
# cat httpd.service
[Unit]
Description=Apache web server managed by cPanel EasyApache
ConditionPathExists=!/etc/httpddisable
ConditionPathExists=!/etc/apachedisable
ConditionPathExists=!/etc/httpdisable

[Service]
Type=forking
ExecStart=/usr/local/cpanel/scripts/restartsrv_httpd --no-verbose
PIDFile=/var/run/apache2/httpd.pid
PrivateTmp=false
 
[Install]
WantedBy=multi-user.target
 
```
` `
Or it would be technically better to provide a small override of service file rather than copying the whole new version in … ( [www.freedesktop.org/software/systemd/man/systemd.unit.html)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)) .


```
mkdir /etc/systemd/system/httpd.service.d
echo "[Service]" >  /etc/systemd/system/httpd.service.d/nopt.conf
echo "PrivateTmp=false" >> /etc/systemd/system/httpd.service.d/nopt.conf
```


and


```
# systemctl daemon-reload
```




Criu is installed with dependency to mod_lsapi-1.1 package. To activate it:

1. Enable service and start it:


```
systemctl enable criu
systemctl start criu
```


2. Edit lsapi.conf file, turn CRIU On and set some defaults:


```
lsapi_criu On
lsapi_criu_socket_path /var/run/criu/criu_service.socket
lsapi_backend_semtimedwait On
lsapi_backend_initial_start 15
lsapi_criu_use_shm Off
```


3. Restart apache:


```
service httpd restart
```




1. An option added to the Apache configuration for cleaning all the images earlier saved by CRIU.

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Value** | **Default**|
|` ` | This option allows cleaning all CRIU images on Apache restart. |  | |

On the next restart of Apache all of the images will be cleaned.

It can be enabled by writing in _lsapi.conf_ (Virtual Host and .htaccess do not allow to use this option).

Note that this option works only if is (default value is , it is set in _ lsapi.conf_ too).

2. If you need to clean CRIU images for one user you can simply add file to the user's directory with CRIU images (default ). On the next restart of lsphp the images will be cleaned.

3. Global reset flag for cleaning all earlier saved images by CRIU.

Current mod_lsapi allows cleaning all images only with one flag file.

Create _ _ file. Also don't forget to set such permissions (or for non cPanel) and access mode [700] to the _ _ directory.

Steps to do :


```
mkdir /usr/share/criu
mkdir /usr/share/criu/mod_lsapi
chown nobody:nobody /usr/share/criu/mod_lsapi
touch /usr/share/criu/mod_lsapi/lsphp.criu.reset
```


On the next requests to all virtual hosts images will be recreated (deleted first and created again later - it depends on lsapi_backend_initial_start value).

4. Аdded possibility to clean CRIU images from user space.

If a user needs to clean CRIU images for lsphp, he should create a file: _ _ . Where _ _ is a ServerName from the VirtualHost block in the configuration file. On the next restart of lsphp, the images will be cleaned.

_Example:_


```
cd; touch mod_lsapi_reset_me_criu.test.com
```


where _vhost.conf_ contains:

_ServerName criu.test.com_


This mode is enabled by default and creates a separate lsphp process for each virtual host.

flag will not work for a user when lsapi_per_user option is .

5. There is (default ) option in mod_lsapi that creates only one lsphp process for a user, regardless of the number of his virtual hosts. We don't recommend to use this option with CRIU, but if you use it, make sure that your virtual hosts (under the same user) have the same environment configurations. If they are not the same, this may cause undesirable lsphp process operation.


