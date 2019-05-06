# Apache mod_lsapi PRO


mod_lsapi PRO is an [Apache HTTP Server](https://httpd.apache.org/) module based on [LiteSpeed Technologies API](https://www.litespeedtech.com/open-source/litespeed-sapi) . It serves to execute PHP scripts on a web-server by analogy with other modules like mod_suphp, php-fpm, mod_php. However, mod_lsapi PRO usage offers excellent PHP performance, low memory footprint coupled with great security and support for opcode caching.

**How does it work?**

1. Apache passes handling for PHP request to mod_lsapi PRO;
2. mod_lsapi PRO use liblsapi to transfer request to lsphp parent process;
3. lsphp is forking child process which executes the request and returns data to mod_lsapi PRO;
![](/images/mod_lsapidiagrammnew.jpg)  
_mod_lsapi PRO integrates with Apache, allows to handle concurrent requests and manages the lsphp processes_

* If there are no requests for lsapi_backend_pgrp_max_idle seconds, lsphp parent process will be  terminated;
* If there are no lsphp child processes available when a new request comes, the new lsphp child process will be created;
* lsphp childs process concurrent requests simultaneously;
* The maximum number of simultaneously running lsphp child processes can be set by the lsapi_backend_children directive.

**What is lsphp?**

lsphp - PHP + LSAPI. What is PHP LSAPI? [LiteSpeed Server Application Programming Interface](https://www.litespeedtech.com/open-source/litespeed-sapi/php) (LSAPI) is designed specifically for seamless, optimized communication between LiteSpeed Web Server and third-party web applications. Now with mod_lsapi PRO this protocol is available for Apache 2.2/2.4.

Using mod_lsapi PRO, we have seen the higher performance than Apache with mod_php, easier installation than php-fpm and easier integration with any control panel. mod_lsapi PRO means faster and more stable dynamic web pages.

**Requirements**

Currently, the mod_lsapi is not compatible with:

* Apache mod_ruid2 - should be disabled;
* Apache mod_itk - should be disabled;
* PHP-FPM - should be disabled because PHP-FPM is also a PHP Handler just as mod_lsapi.

**Optional requirements**

* Configured [LVE](/limits/#understanding-lve) containers for end-users ( **recommended - higher security level** );
* Installed and configured [mod_hostinglimits](/limits/#hostinglimits) for Apache ( **recommended - higher security level** );
* Installed mod_suexec for Apache and configured [SuExecUserGroup](https://httpd.apache.org/docs/2.4/mod/mod_suexec.html#page-header) directive for each virtual host ( **recommended - higher security level** );
* Enabled [CageFS](/cagefs/) for end-users ( **recommended - higher security level** );
* [PHP Selector](/php_selector/) with alt-php - an easy way to select different PHP versions for each end-user provided by CloudLinux;
* ea-php - alternative to alt-php provided by cPanel (for cPanel only).

**Configuring mod_lsapi PRO**


In order to get mod_lsapi PRO work properly, you'll need to configure Apache. To do this, we use a separate _lsapi.conf_ file.

First of all, for the mod_lsapi PRO work, you need to ensure that the module is loaded. In your lsapi.conf you need to make sure the [LoadModule](http://httpd.apache.org/docs/current/mod/mod_so.html#loadmodule) directive has not been commented out. A correctly configured directive may look like this:
<div class="notranslate">

```
LoadModule lsapi_module modules/mod_lsapi.so
```
</div>

In order to enable the module to process requests, you need to add the lsapi_engine directive to your _lsapi.conf_ file as follows:
<div class="notranslate">

```
lsapi_engine On
```
</div>

The mod_lsapi PRO handler can be enabled using the [AddType](https://httpd.apache.org/docs/2.4/mod/mod_mime.html#addtype) directive. The AddType directive tells Apache that a given filename extension should be handled by mod_lsapi PRO. Apache will assume that and will attempt to execute it when that particular resource is requested by a client.
<div class="notranslate">

```
AddType application/x-httpd-lsphp .php
```
</div>

If no handler is explicitly set for a request, the specified content type will be used as the handler name, therefore, please disable php.conf or any other PHP handler for using mod_lsapi PRO. In this example application/x-httpd-lsphp is a default handler by which mod_lsapi PRO process requests with lsphp binary from _/usr/local/bin/_ directory.

The final lsapi.conf configuration might look like this:
<div class="notranslate">

```
LoadModule lsapi_module modules/mod_lsapi.so


<IfModule lsapi_module>      
	lsapi_engine On      
	AddType application/x-httpd-lsphp .php      
	lsapi_backend_connect_timeout 100000
	lsapi_backend_connect_tries 10
	lsapi_backend_children 20
	lsapi_backend_pgrp_max_idle 30
	lsapi_backend_max_process_time 300
	lsapi_debug Off
</IfModule>
```
</div>

In order to mod_lsapi PRO work lsapi.conf should be loaded to Apache through [Include](https://httpd.apache.org/docs/2.4/mod/core.html#include) directive.

For more detailed description of the module directives please visit [Configuration reference](/apache_mod_lsapi/#configuration-references).  
For installation guide mod_lsapi PRO please visit [Installation](/apache_mod_lsapi/#installation) .

## Configuration References

[mod_lsapi customization](/apache_mod_lsapi/#mod-lsapi-customization):
* [lsapi_engine](/apache_mod_lsapi/#lsapi-engine)  
* [lsapi_socket_path](/apache_mod_lsapi/#lsapi-socket-path)  
* [lsapi_poll_timeout](/apache_mod_lsapi/#lsapi-poll-timeout)  
* [lsapi_per_user](/apache_mod_lsapi/#lsapi-per-user)  
* [lsapi_output_buffering](/apache_mod_lsapi/#lsapi-output-buffering)  
* [lsapi_disable_reject_mode](/apache_mod_lsapi/#lsapi-disable-reject-mode)  
* [lsapi_terminate_backends_on_exit](/apache_mod_lsapi/#lsapi-terminate-backends-on-exit)  
* [lsapi_avoid_zombies](/apache_mod_lsapi/#lsapi-avoid-zombies)  
* [lsapi_use_req_hostname](/apache_mod_lsapi/#lsapi-use-req-hostname)  
* [lsapi_debug](/apache_mod_lsapi/#lsapi-debug)

[Tuning LSPHP backend](/apache_mod_lsapi/#tuning-lsphp-backend):
* [lsapi_set_env](/apache_mod_lsapi/#lsapi-set-env)
* [lsapi_set_env_path](/apache_mod_lsapi/#lsapi-set-env-path)
* [lsapi_backend_children](/apache_mod_lsapi/#lsapi-backend-children)
* [lsapi_backend_connect_tries](/apache_mod_lsapi/#lsapi-backend-connect-tries)
* [lsapi_backend_connect_timeout](/apache_mod_lsapi/#lsapi-backend-connect-timeout)
* [lsapi_backend_max_process_time](/apache_mod_lsapi/#lsapi-backend-max-process-time)
* [lsapi_backend_pgrp_max_idle](/apache_mod_lsapi/#lsapi-backend-pgrp-max-idle)
* [lsapi_backend_use_own_log](/apache_mod_lsapi/#lsapi-backend-use-own-log)
* [lsapi_backend_common_own_log](/apache_mod_lsapi/#lsapi-backend-common-own-log)
* [lsapi_backend_coredump](/apache_mod_lsapi/#lsapi-backend-coredump)
* [lsapi_backend_accept_notify](/apache_mod_lsapi/#lsapi-backend-accept-notify)
 
[Connection pool mode](/apache_mod_lsapi/#connection-pool-mode):
* [lsapi_with_connection_pool](/apache_mod_lsapi/#lsapi-with-connection-pool)
* [lsapi_backend_max_idle](/apache_mod_lsapi/#lsapi-backend-max-idle)
* [lsapi_backend_max_reqs](/apache_mod_lsapi/#lsapi-backend-max-reqs)

[CRIU support (CloudLinux 7 only)](/apache_mod_lsapi/#criu-support-cloudlinux7-only):
* [lsapi_criu](/apache_mod_lsapi/#lsapi-criu)
* [lsapi_criu_socket_path](/apache_mod_lsapi/#lsapi-criu-socket-path)
* [lsapi_criu_imgs_dir_path](/apache_mod_lsapi/#lsapi-criu-imgs-dir-path)
* [lsapi_backend_initial_start](/apache_mod_lsapi/#lsapi-backend-initial-start)
* [lsapi_criu_use_shm](/apache_mod_lsapi/#lsapi-criu-use-shm)
* [lsapi_backend_semtimedwait](/apache_mod_lsapi/#lsapi-backend-semtimedwait)
* [lsapi_reset_criu_on_apache_restart](/apache_mod_lsapi/#lsapi-reset-criu-on-apache-restart)

[PHP configuration management](/apache_mod_lsapi/#php-configuration-management):
* [lsapi_process_phpini](/apache_mod_lsapi/#lsapi-process-phpini)
* [lsapi_phpini](/apache_mod_lsapi/#lsapi-phpini)
* [lsapi_phprc](/apache_mod_lsapi/#lsapi-phprc)
* [lsapi_tmpdir](/apache_mod_lsapi/#lsapi-tmpdir)
* [lsapi_enable_user_ini](/apache_mod_lsapi/#lsapi-enable-user-ini)
* [lsapi_user_ini_homedir](/apache_mod_lsapi/#lsapi-user-ini-homedir)
* [lsapi_keep_http200](/apache_mod_lsapi/#lsapi-keep-http200)
* [lsapi_mod_php_behaviour](/apache_mod_lsapi/#lsapi-mod-php-behaviour)
* [php_value, php_admin_value, php_flag, php_admin_flag](/apache_mod_lsapi/#php-valuephp-admin-valuephp-flagphp-admin-flag)

[Security](/apache_mod_lsapi/#security):
* [lsapi_use_suexec](/apache_mod_lsapi/#lsapi-use-suexec)
* [lsapi_user_group](/apache_mod_lsapi/#lsapi-user-group)
* [lsapi_uid_gid](/apache_mod_lsapi/#lsapi-uid-gid)
* [lsapi_use_default_uid](/apache_mod_lsapi/#lsapi-use-default-uid)
* [lsapi_target_perm](/apache_mod_lsapi/#lsapi-target-perm)
* [lsapi_paranoid](/apache_mod_lsapi/#lsapi-paranoid)
* [lsapi_check_document_root](/apache_mod_lsapi/#lsapi-check-document-root)
* [lsapi_disable_forced_pwd_var](/apache_mod_lsapi/#lsapi-disable-forced-pwd-var)
* [lsapi_max_resend_buffer](/apache_mod_lsapi/#lsapi-max-resend-buffer)

#### **mod_lsapi customization**

#### **lsapi_engine**

**Syntax** : lsapi_engine on/off  
**Default** : lsapi_engine off  
**Context** : httpd.conf, htaccess  

**Description** :  
Switching mod_lsapi handler on or off.

---

#### **lsapi_socket_path**

**Syntax** : lsapi_socket_path [path]
**Default** : lsapi_socket_path `/var/run/mod_lsapi`  
**Context** : httpd.conf  

**Description:**  
Path to backend lsphp sockets. By default `/var/run/mod_lsapi`

---

#### **lsapi_poll_timeout**

**Syntax** : lsapi_poll_timeout [number]  
**Default** : lsapi_poll_timeout 300  
**Context** : httpd.conf, htaccess  

**Description** :  
Time to wait for response from the lsphp daemon, in seconds. 0 stands for infinity. For preventing long running processes which can use EP (limit number of entry processes). Default value is 300. Should be more or equal to 0. In the case of wrong format, the default value will be used.

---

#### **lsapi_per_user**

**Syntax** : lsapi_per_user On/Off  
**Default** : lsapi_per_user Off  
**Context** : httpd.conf  

**Description** :  
Invoke master lsPHP process not per VirtualHost but per account.
When On, invoke backend not per VirtualHost but per account.
Default value is Off.
It is possible, for example, to set it to On in global config file and to Off in config files of some particular Virtual Hosts.
Then these Virtual Hosts will have a dedicated backend process, while others will have backend processes shared on account basis.

---

#### **lsapi_output_buffering**

**Syntax** : lsapi_output_buffering On/Off  
**Default** : lsapi_output_buffering On  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
Enable or disable output buffering on Apache level. Default value is On.

---

#### **lsapi_disable_reject_mode**

**Syntax** : lsapi_disable_reject_mode On/Off  
**Default** : lsapi_disable_reject_mode Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
If a new HTTP request is coming to LSPHP daemon when all LSPHP workers are still busy, it can process this situation in two different ways. In REJECT mode LSPHP daemon will reject such request immediately. Otherwise, in legacy mode, LSPHP daemon will put this request into infinite queue, until one or more LSPHP daemon becomes free. When HTTP request is rejected in REJECT mode, mod_lsapi will write into Apache error_log the following message: Connect to backend rejected, and the client will receive 507 HTTP response.
By default LSPHP daemon in CloudLinux uses REJECT mode. It can be switched off with this option.

---

#### **lsapi_terminate_backends_on_exit**

**Syntax** : lsapi_terminate_backends_on_exit On/Off  
**Default** : lsapi_terminate_backends_on_exit On  
**Context** : httpd.conf  

**Description** :  
httpd.conf, On - stop lsphp services on apache restart, Off - leave live started lsphp services on apache restart (for php+opcache). The lsphp will not restart, even if Apache gets restarted.

---

#### **lsapi_avoid_zombies**

**Syntax** : lsapi_avoid_zombies On/Off  
**Default** : lsapi_avoid_zombies Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Enable or disable a mechanism to avoid creation of zombie processes by lsphp. Default value is Off.

---

#### **lsapi_use_req_hostname**

**Syntax** : lsapi_use_req_hostname On/Off  
**Default** : lsapi_use_req_hostname Off  
**Context** : httpd.conf, virtualhosts  

**Description** :  
By default, we are using hostname from the server_rec structure (off), it means that mod_lsapi takes hostname from the VirtualHost section of the configuration file. Using hostname from the request_rec structure (On) means that mod_lsapi takes hostname from the HOST section of the request. It could be useful for those who use dynamically generated configs for virtual hosts for example with mod_lua.

---

#### **lsapi_sentry**

**Syntax** : lsapi_sentry On/Off  
**Default** : lsapi_sentry On  
**Context** : httpd.conf  

**Description** :  
When this option is enabled, errors that occur in the operation of the mod_lsapi will be sent to the remote sentry server. You can see the error messages that were sent to the sentry server in the directory /var/log/mod_lsapi. If you do not want to send error notifications from your server, you can disable this directive in lsapi.conf.

---

#### **lsapi_debug**

**Syntax** : lsapi_debug On/Off  
**Default** : lsapi_debug Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Extended debug logging.

---

#### **Tuning LSPHP backend**

#### **lsapi_set_env**

**Syntax** : lsapi_set_env VAR_NAME [VAR_VALUE]  
**Default** : -  
**Context** : httpd.conf  

**Description** :  
Pass env variable to lsphp. By default lsphp environment have only TEMP, TMP and PATH variables set.  
Example: lsapi_set_env TMP "/var/lsphp-tmp"  
Note: PATH env var default "/usr/local/bin:/usr/bin:/bin" cannot be changed because of security reasons.  
To change it, use explicitly lsapi_set_env_path option.

---

#### **lsapi_set_env_path**

**Syntax** : lsapi_set_env_path [path(s)]  
**Default** : lsapi_set_env_path /usr/local/bin:/usr/bin:/bin  
**Context** : httpd.conf  

**Description** :  
Change PATH variable in the environment of lsPHP processes. Default path /usr/local/bin:/usr/bin:/bin will be used if not set.

---

#### **lsapi_backend_children**

**Syntax** : lsapi_backend_children [number]  
**Default** : lsapi_backend_children [EP]  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_CHILDREN  
Maximum number of simultaneously running child backend processes.  
Optional, a default value is equal to EP.  
min value is 2; max value is 10000. If var value is more, 10000 will be used.

---

#### **lsapi_backend_connect_tries**

**Syntax** : lsapi_backend_connect_tries [number]  
**Default** : lsapi_backend_connect_tries 20  
**Context** : httpd.conf  

**Description** :  
Number of retries to connects to lsPHP daemon.

---

#### **lsapi_backend_connect_timeout**

**Syntax** : lsapi_backend_connect_timeout [number]  
**Default** : lsapi_backend_connect_timeout 500000  
**Context** : httpd.conf  

**Description** :  
Number of usec to wait while lsPHP starts (if not started on request).

---

#### **lsapi_backend_max_process_time**

**Syntax** : lsapi_backend_max_process_time [number]  
**Default** : lsapi_backend_max_process_time 300  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_MAX_PROCESS_TIME  
Optional. Default value is 300.  
Timeout to kill runaway processes.

---

#### **lsapi_backend_pgrp_max_idle**

**Syntax** : lsapi_backend_pgrp_max_idle [number]  
**Default** : lsapi_backend_pgrp_max_idle 30  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_PGRP_MAX_IDLE, in seconds.    
Controls how long a control process will wait for a new request before it exits. # 0 stands for infinite.  
Optional, default value is 30.  
Should be more or equal to 0.  

---

#### **lsapi_backend_use_own_log**

**Syntax** : lsapi_backend_use_own_log On/Off  
**Default** : lsapi_backend_use_own_log Off  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
Redirecting log output of backend processes from Apache error_log to dedicated log file or files, depending on value of lsapi_backend_common_own_log option. If Off, use Apache error log file for backend output, or separate file otherwise.

---

#### **lsapi_backend_common_own_log**

**Syntax** : lsapi_backend_common_own_log On/Off  
**Default** : lsapi_backend_common_own_log Off  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
It will be used only when lsapi_backend_use_own_log set to On. On - backend processes of the all virtual hosts will share the common log file. Off - every virtual host will have its own backend log file.

---

#### **lsapi_backend_coredump**

**Syntax** : lsapi_backend_coredump On/Off  
**Default** : lsapi_backend_coredump Off  
**Context** : httpd.conf, htaccess  

**Description** :  
env variable LSAPI_ALLOW_CORE_DUMP (On or Off). Pass LSAPI_ALLOW_CORE_DUMP to lsphp or not. If it will be passed - core dump on lsphp crash will be created.  
Off by default.  
By default LSAPI application will not leave a core dump file when crashed. If you want to have LSAPI PHP dump a core file, you should set this environment variable. If set, regardless the value has been set to, core files will be created under the directory that the PHP script in.

---

#### **lsapi_backend_accept_notify**

**Syntax** : lsapi_backend_accept_notify On/Off  
**Default** : lsapi_backend_accept_notify On  
**Context** : httpd.conf, virtualhost  

**Description** :  
Switch LSAPI_ACCEPT_NOTIFY mode for lsphp. This option can be used both in Global and VirtualHost scopes.This mode is incompatible with PHP 4.4.

---

#### **Connection pool mode**

#### **lsapi_with_connection_pool**

**Syntax** : lsapi_with_connection_pool On/Off  
**Default** : lsapi_with_connection_pool Off  
**Context** : httpd.conf  

**Description** :  
On/Off - disable enable connect pool, default is Off.

---

#### **lsapi_backend_max_idle**

**Syntax** : lsapi_backend_max_idle [number]  
**Default** : lsapi_backend_max_idle 300  
**Context** : httpd.conf  

**Description** :  
It is relevant only with lsapi_with_connection_pool option switched on. Controls how long a worker process will wait for a new request before it exits. 0 stands for infinite. Should be more or equal to 0. In the case of wrong format default value will be used. Optional, default value is 300.

---

#### **lsapi_backend_max_reqs**

**Syntax** : lsapi_backend_max_reqs [number]  
**Default** : lsapi_backend_max_reqs 10000  
**Context** : httpd.conf  

**Description** :  
It is relevant only with lsapi_with_connection_pool option switched on. Controls how many requests a worker process will process before it exits. Should be more than 0. In the case of wrong format default value will be used. Optional, default value is 10000.

---

#### **CRIU support (CloudLinux 7 only)**

#### **lsapi_criu**

**Syntax** : lsapi_criu On/Off  
**Default** : lsapi_criu Off  
**Context** : httpd.conf  

**Description** :  
Enable/disable CRIU for lsphp freezing. Default: Off.

---

#### **lsapi_criu_socket_path**

**Syntax** : lsapi_criu_socket_path [path]  
**Default** : lsapi_criu_socket_path /var/run/criu/criu_service.socket  
**Context** : httpd.conf  

**Description** :  
Set path to socket for communication with criu service. Default: /var/run/criu/criu_service.socket.

---

#### **lsapi_criu_imgs_dir_path**

**Syntax** : lsapi_criu_imgs_dir_path [path]  
**Default** : lsapi_criu_imgs_dir_path /var/run/mod_lsapi/  
**Context** : httpd.conf  

**Description** :  
Path to folder where images of freezed PHP will be stored. Should be path. Default: /var/run/mod_lsapi/

---

#### **lsapi_backend_initial_start**

**Syntax** : lsapi_backend_initial_start [number]  
**Default** : lsapi_backend_initial_start 0  
**Context** : httpd.conf  

**Description** :  
Number of requests to virtualhost, when lsphp will be freezed.  Default: 0 - means disable freezing.

---

#### **lsapi_criu_use_shm**

**Syntax** : lsapi_criu_use_shm Off/Signals  
**Default** : lsapi_criu_use_shm Off  
**Context** : httpd.conf  

**Description** :  
Method of requests counting. Off - use shared memory. Signals - use signals from child processes to parent. Default: Off

---

#### **lsapi_backend_semtimedwait**

**Syntax** : lsapi_backend_semtimedwait On/Off  
**Default** : lsapi_backend_semtimedwait On  
**Context** : httpd.conf  

**Description** :  
Use semaphore for checking when lsphp process will be started. Speed of start lsphp increased with semaphore using. This method avoid cycles of waiting for lsphp start. Default: On.

----

#### **lsapi_reset_criu_on_apache_restart**

**Syntax** : lsapi_reset_criu_on_apache_restart On/Off  
**Default** : lsapi_reset_criu_on_apache_restart Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
This option allows cleaning all CRIU images on Apache restart.  
Setting lsapi_reset_criu_on_apache_restart to On means that on each Apache restart the CRIU images which are stored in directory specified by lsapi_criu_imgs_dir_path directive will be recreated on new request to domain(only after restart).  
If this option set to Off then CRIU images won’t be recreated on Apache restart.

----

#### **PHP configuration management**

#### **lsapi_process_phpini**

**Syntax** : lsapi_process_phpini On/Off  
**Default** : lsapi_process_phpini Off  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Enable or disable phpini_* directive processing. Default value is Off.

---

#### **lsapi_phpini**

**Syntax** : lsapi_phpini [path]  
**Default** : lsapi_phpini -  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
When lsapi_process_phpini option switched to Off, these values will be silently ignored. lsapi_phpini values with absolute filename of php.ini file can be inserted into .htaccess files in order to set custom php.ini which will override/complement settings from system default php.ini.

---

#### **lsapi_phprc**

**Syntax** : lsapi_phprc [No | Env | Auto | DocRoot]  
**Default** : lsapi_phprc No  
**Context** : httpd.conf, virtualhost  

**Description** :
The value of PHPRC env variable.  
Special values are "No", "Env", "Auto" and "DocRoot".  
Default value is "No" - without PHPRC at all.  
"Auto" value stands for php.ini from DocumentRoot of the corresponding VirtualHost if it is present, or from user's home directory otherwise "DocRoot" value stands for php.ini from DocumentRoot of the corresponding VirtualHost.  
"Env" value for using PHPRC from the environment, to set it with SetEnv config option, for example  
lsapi_phprc No  
lsapi_phprc Auto  
lsapi_phprc DocRoot  
lsapi_phprc Env  
lsapi_phprc /etc/

---

#### **lsapi_tmpdir**

**Syntax** : lsapi_tmpdir [path]  
**Default** : lsapi_tmpdir /tmp  
**Context** : httpd.conf, virtualhost  

**Description** :  
Set alternate request body temporary files directory.

---

#### **lsapi_enable_user_ini**

**Syntax** : lsapi_enable_user_ini On/Off  
**Default** : lsapi_enable_user_ini Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Enable .user.ini files for backend. Same as suphp, php-fpm and fcgid mechanism of .user.ini. Default value is Off.

---

#### **lsapi_user_ini_homedir**

**Syntax** : lsapi_user_ini_homedir On/Off  
**Default** : lsapi_user_ini_homedir Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
If lsapi_enable_user_ini option is set to On, then enable/disable processing .user.ini file in home directory also. Default value is Off.

---

#### **lsapi_keep_http200**

**Syntax** : lsapi_keep_http200 On/Off  
**Default** : lsapi_keep_http200 Off  
**Context** : httpd.conf, .htaccess  

**Description** :  
If set to On, always keep backend's response status as mod_php do. If set to Off, response status can be overridden by Apache as suphp do (in case of call via ErrorDocument directive).

---

#### **lsapi_mod_php_behaviour**

**Syntax** : lsapi_mod_php_behaviour On/Off  
**Default** : lsapi_mod_php_behaviour On  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
On/Off - disable php_* directives, default On.

---

#### **php_value, php_admin_value, php_flag, php_admin_flag**

**Syntax** : [php_value|php_admin_value|php_flag|php_admin_flag]  
**Default** :  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
mod_php emulation.

---

#### **Security**

#### **lsapi_use_suexec**

**Syntax** : lsapi_use_suexec On/Off  
**Default** : lsapi_use_suexec On  
**Context** : httpd.conf  

**Description** :  
Use or not suexec to a target user.

---

#### **lsapi_user_group**

**Syntax** : lsapi_user_group [user_name] [group_name]  
**Default** : -  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Set user & group for requests.  

---

#### **lsapi_uid_gid**

**Syntax** : lsapi_uid_gid [uid] [gid]  
**Default** : -  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Set user & group for request.

---

#### **lsapi_use_default_uid**

**Syntax** : lsapi_use_default_uid On/Off  
**Default** : lsapi_use_default_uid On  
**Context** : httpd.conf  

**Description** :  
Use default Apache UID/GID if no uid/gid set. Values: On/Off. If Off, and no UID/GID set, error 503 will be returned.

---

#### **lsapi_target_perm**

**Syntax** : lsapi_target_perm On/Off  
**Default** : lsapi_target_perm Off  
**Context** : httpd.conf  

**Description** :  
Check target PHP script permissions. If set to On, lsapi will check that script is owned by the same user, as user under which it is being executed. Return 503 error if they don't match. Default: Off.

---

#### **lsapi_paranoid**

**Syntax** : lsapi_paranoid On/Off  
**Default** : lsapi_paranoid Off  
**Context** : httpd.conf  

**Description** :  
Check or not permissions of target php scripts. Optional, default value is Off.

---

#### **lsapi_check_document_root**

**Syntax** : lsapi_check_document_root On/Off  
**Default** : lsapi_check_document_root On  
**Context** : httpd.conf  

**Description** :  
Check or not owner of DOCUMENT_ROOT. Optional, default value is On.

---

#### **lsapi_disable_forced_pwd_var**

**Syntax** : lsapi_disable_forced_pwd_var On/Off  
**Default** : lsapi_disable_forced_pwd_var Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
To disable addition of PWD variable. Default value is Off. If set to On, the PWD variable will not be added into a backend environment.

---

#### **lsapi_max_resend_buffer**

**Syntax** : lsapi_max_resend_buffer [number]tmp  
**Default** : lsapi_max_resend_buffer 200  
**Context** : httpd.conf, virtualhost  

**Description** :  
Maximum buffer in KiB to resend for request that has a body (like POST request body).


## Installation


mod_lsapi PRO can be installed through YUM package manager, however, the installation process varies depending on the control panel.

Select the control panel you are using:
* [cPanel](/apache_mod_lsapi/#cpanel)
* [Plesk](/apache_mod_lsapi/#plesk)
* [DirectAdmin](/apache_mod_lsapi/#directadmin)
* [No control panel](/apache_mod_lsapi/#no-control-panel)

### cPanel


**Installing on cPanel servers with EasyApache 4**

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install ea-apache24-mod_lsapi
```
</div>
After installing mod_lsapi PRO packages run the next command to setup mod_lsapi to cPanel:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that the mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now the lsapi handler is available for managing through cPanel MultiPHP Manager.

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/apache_mod_lsapi/#switch-mod-lsapi-tool) .


### Plesk


**Installing on Plesk servers**

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install mod_lsapi
```
</div>
Once completed, run the command to setup mod_lsapi PRO and register LSPHP handlers to Plesk Panel:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>

Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now LSPHPXY alt-php PHP handlers are available for managing through Plesk PHP Settings.

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/apache_mod_lsapi/#switch-mod-lsapi-tool) .


### DirectAdmin


**Installing on DirectAdmin servers**

Installation process is done with custombuild script:
<div class="notranslate">

```
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_mode lsphp
$ ./build php n
$ ./build apache
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now all domains under php1_mode are using lsphp handler and no further actions are required to enable mod_lsapi PRO on DirectAdmin.

### No control panel


**Installing on servers with no control panel**

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install mod_lsapi
```
</div>
Once completed, run a command to setup mod_lsapi PRO:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>

If you are using an alternative Apache - [httpd24](https://www.cloudlinux.com/cloudlinux-os-blog/entry/httpd24-updated-for-cloudlinux-6) , then install mod_lsapi as follows:

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install httpd24-mod_lsapi
```
</div>
Once completed, run a command to setup mod_lsapi PRO:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd24 restart
```
</div>

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/apache_mod_lsapi/#switch-mod-lsapi-tool) .


## Uninstall


Uninstall mod_lsapi PRO is performed depending on your control panel.

Select the control panel you are using:
* [cPanel](/apache_mod_lsapi/#cpanel)
* [Plesk](/apache_mod_lsapi/#plesk)
* [DirectAdmin](/apache_mod_lsapi/#directadmin)
* [No control panel](/apache_mod_lsapi/#no-control-panel)

### cPanel


**Uninstall procedure for cPanel servers with EasyApache 4**

To remove lsapi handler from cPanel MultiPHP Manager and uninstall mod_lsapi PRO, run a command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel ea-apache24-mod_lsapi
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now mod_lsapi PRO is fully uninstalled.


### Plesk


**Uninstall procedure for Plesk servers**

To unregister LSPHP handlers and uninstall mod_lsapi PRO, run the command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel mod_lsapi
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now LSPHPXY alt-php PHP handlers and mod_lsapi PRO are fully uninstalled.


### DirectAdmin


**Uninstall procedure for DirectAdmin servers**

Uninstall is done with custombuild script:
<div class="notranslate">

```
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_release [any other php mode]
$ ./build php n
$ ./build apache
```
</div>
The following PHP modes are available for DirectAdmin:

* mod_php
* fastcgi
* php-fpm
* suphp

Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now all domains under php1_mode are using the chosen handler and mod_lsapi PRO is fully uninstalled.

### No control panel


**Uninstall procedure for servers with no control panel**

To uninstall mod_lsapi PRO, run the command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel mod_lsapi
$ rm [path to mod_lsapi.conf]
```
</div>
Restart Apache to restore the standard PHP handler:
<div class="notranslate">

```
$ service httpd restart
```
</div>

If you are using an alternative Apache: - [httpd24](https://www.cloudlinux.com/cloudlinux-os-blog/entry/httpd24-updated-for-cloudlinux-6) , then uninstall mod_lsapi PRO as follows:

<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel httpd24-mod_lsapi
$ rm [path to mod_lsapi.conf]
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd24 restart
```
</div>
Now mod_lsapi PRO is fully uninstalled.


## switch_mod_lsapi tool


switch_mod_lsapi is the command line tool used to manage mod_lsapi PRO.

It has the following syntax:

`/usr/bin/switch_mod_lsapi [OPTIONS]`

`[OPTIONS]`  can be the main and an additional (for usage together with any other main option).

**Main options**

<div class="notranslate">

| | |
|-|-|
|**Option** | **Description**|
|`--setup` | setup _mod_lsapi_ configurations for Apache, including PHP handlers setup; create native lsphp (if it doesn't exist) by doing: `cp /opt/alt/php56/usr/bin/lsphp /usr/local/bin/` <br> _* NOT supported for DirectAdmin_ |
|`--setup-light` | setup PHP handlers only<br> _* supported for cPanel EasyApache 4 only_|
|`--uninstall` | uninstall _mod_lsapi_ from Apache<br> _* supported for cPanel (EasyApache 3 and EasyApache 4), Plesk, and servers without control panel_|
|`--enable-domain` | enable _mod_lsapi_ for individual domain<br> _* supported for cPanel EasyApache 3 only_|
|`--disable-domain` | disable _mod_lsapi_ for individual domain<br> _* supported for cPanel EasyApache 3 only_|
|`--enable-global` | sets up _mod_lsapi_ as a default way to serve PHP, making it enabled for all domains. Once that mode is enabled, you cannot disable _mod_lsapi_ for an individual domain.<br> _* supported for cPanel only (EasyApache 3 and EasyApache 4)_|
|`--disable-global` | disable _mod_lsapi_ as a default way to serve PHP, disabling _mod_lsapi_ for all domains, including those selected earlier using<br> _--enable-domain_ _* supported for cPanel EasyApache 3 only_|
|`--build-native-lsphp` | build native _lsphp_ for cPanel EasyApache 3<br> _* supported for cPanel EasyApache 3 only_|
|`--build-native-lsphp-cust` | build native _lsphp_ for cPanel EasyApache 3 (with custom PHP source path)<br> _* supported for cPanel EasyApache 3 only_|
|`--check-php` | check PHP configuration<br> _* NOT supported for DirectAdmin_|
|`--stat` | return usage statistics in JSON format; the following statistics metrics are collected:<br> • control panel name;<br> • mod_lsapi version;<br> • liblsapi version;<br> • criu version and status;<br> • whether mod_lsapi is enabled;<br> • lsapi configuration options;<br> • number of domains, that use _mod_lsapi_, per each installed PHP version including those set in PHP Selector _(this metric is supported for cPanel EasyApache 4, Plesk and DirectAdmin)_ .|

</div>

**Additional options**
<div class="notranslate">

| | |
|-|-|
|**Option** | **Description**|
|`--verbose` | switch verbose level on|
|`--force` | switch force mode on|
</div>

The following table presents which `[OPTIONS]` are supported for various panels:

| |  |  |  |  |  |  | |
|-|--|--|--|--|--|--|-|
| | No Control Panel | cPanel EA3 | cPanel EA4 | DirectAdmin | Plesk | InterWorx | ISPManager|
|`setup` | + | + | + | custombuild | + | + | +|
|`setup-light` | - | - | + | - | - | - | -|
|`uninstall` | + | + | + | custombuild | + | + | +|
|`enable-domain` | - | + | - | - | - | - | -|
|`disable-domain` | - | + | - | - | - | - | -|
|`enable-global` | - | + | + | custombuild | - | - | -|
|`disable-global` | - | + | - | custombuild | - | - | -|
|`build-native-lsphp` | - | + | - | - | - | - | -|
|`build-native-lsphp-cust` | - | + | - | - | - | - | -|
|`check-php` | + | + | + | - | + | + | +|
|`verbose` | + | + | + | - | + | + | +|
|`force` | + | + | + | - | + | + | +|
|`stat` | + <br> _*without domain info_ | + <br> _*without domain info_ | + | + | + | + <br> _*without domain info_ | + <br> _*without domain info_|



## Troubleshooting

**Debugging mod_lsapi issues: error_log & sulsphp_log**


mod_lsapi errors will be located in error_log and sulsphp_log.
Note that errors can appear in both logs at the same time, and you might need to refer to both of them to solve the issue.

See next table for more details:

| |  | |
|-|--|-|
|**error_log** | **sulsphp_log** | **Solution**|
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused. Increase memory limit for LVE ID |uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | Increase pmem or vmem limits for the user uid.|
|Error sending request: ReceiveLSHeader: nothing to read from backend socket |No need to check this log.  | lsphp was killed. It can be due to apache restart or lfd. If you see this  message too often - change <span class="notranslate">  lsapi_terminate_backends_on_exit </span> to <span class="notranslate"> Off </span> in lsapi.conf or add to <span class="notranslate"> /etc/csf/csf.pignore </span> the following lines: <span class="notranslate"> exe:/usr/local/bin/lsphp </span> pexe:/opt/alt/php.*/usr/bin/lsphp|
|Error sending request (lsphp is killed?): ReceiveLSHeader: nothing to read from backend socket, referer: http://XXXXXXX  Child process with pid: XXXXX was killed by signal: 11, core dump: 0 |No need to check this log.  | lsphp has crashed. Next slide will explain what to do (core dump creating). Also, check configuration options for apc and suhosin in php.ini. Once you have a core file generated at DocumentRoot contact [https://cloudlinux.zendesk.com/](https://cloudlinux.zendesk.com/hc/) so we can investigate the cause.|
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |file is writable by others: (///usr/local/bin/lsphp)  | Incorrect lsphp file permissions. For fixing: <span class="notranslate"> chmod 755 /usr/local/bin/lsphp </span> cagefsctl --force-update.|
|Could not determine uid/gid for request |No need to check this log.  | UID/GID are not set in  virtualhost. Set <span class="notranslate"> lsapi_use_default_uid On </span> in lsapi.conf (it is <span class="notranslate"> On </span> by default since 0.1-98 version, this solution is for older versions).|
|Own id for script file (/xxxx/xxx/xxxx) is xxx; should be xxxx |No need to check this log.  | File is not owned by the user PHP executed by. To overwrite (insecure), set <span class="notranslate"> lsapi_target_perm Off </span> in lsapi.conf. |
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |Entering jail error  | Check if СageFS enabled. Try running <span class="notranslate"> cagefsctl --remount-all. </span>|
|connect_lsphp: connect to lsphp failed: tries XXX exceeded with timeout XXXXX  Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp | Check if <span class="notranslate"> /tmp/lshttpd (global /tmp </span> is not inside CageFS) exists and owner should be apache: apache for DirectAdmin, Plesk, iWorx, ISPManager and nobody for cPanel.|
|Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp  | Increase PMEM limits for the user UID.|
|Reached max children process limit: XX, extra: 0, current: XX, please increase LSAPI_CHILDREN.<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp  | Increase value of <span class="notranslate"> lsapi_backend_children </span> for UID in vhost.conf or globally in lsapi.conf.|
|fork() failed, please increase process limit: Cannot allocate memory<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid:(xxx); gid:(xxx); uid limit warning: EP should be < than NPROC, current EP: XX, NPROC: XX<br><br>uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | Increase NPROC limits for the UID. It should be greater than EP and <span class="notranslate"> lsapi_backend_children. </span>|
|Child process with pid: XXXXXX was killed by signal: 9, core dump: 0<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: nothing to read from backend socket (LVE ID XXXX |uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | These errors occurs when the amount of PMEM limits is incommensurable with the number of EP. Increase PMEM limits or decrease EP number for the user UID.|
|totBytesRead (X) != bodyLen (X), referer: XXXX<br><br>Backend error on sending request(POST /XXXX HTTP/1.1); uri(/XXXX) content-length(X) (lsphp is killed?): ReceiveAckHdr: nothing to read from backend socket (LVE ID XXXX)<br><br>lsphp(XXXX): Child process with pid: XXXX was killed by signal: 15, core dump: 0 |No need to check this log.  | Increase LimitRequestBody (Apache) or/and SecRequestBodyNoFilesLimit (mod_security) configuration limits|
|Connect to backend failed: connect to lsphp failed: 13 |No need to check this log.  | Check that `mod_ruid2` is disabled|
|Connect to backend rejected on sending request(POST /XXXXX HTTP/1.1); uri(/XXXXX) |No need to check this log.|Set <span class="notranslate">`lsapi_disable_reject_mode On`</span> in your <span class="notranslate">`lsapi.conf`</span> and reload Apache. This way LSPHP daemon will put requests that cannot be served by LSPHP daemon right away into infinite queue, until one or more LSPHP daemon becomes free. Visit [Configuration Reference](/apache_mod_lsapi/#configuration-references) for more info.|


**Non-standard apache user**

If apache runs under a username other than <span class="notranslate"> "apache" </span> or <span class="notranslate"> "nobody" </span> , you should rebuild sulsphp (where username is built in for security reasons) with corresponding username:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel   
$ cd ~$ wget [http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz)  
$ tar zxvf mod_lsapi.tar.gz  
$ cd mod-lsapi-0.1-37  
$ cmake -DHTTPD_USER=<new user name> .  
$ make
$ make install
```
</div>
This will:<br>  
- Install: <span class="notranslate"> /usr/lib/apache/mod_lsapi. </span> so (or to another correct httpd modules path)<br>
- Install: <span class="notranslate"> /usr/sbin/sulsphp </span>

**lsphp started under user apache/nobody**

Check if SuExecUserGroup specified for virtual hosts. This parameter is used by mod_lsapi for user identification.

**Could not connect to lsphp backend: connect(/tmp/lshttpd/lsapi_application-x-httpd-lsphp_XXX.sock) failed: 111 Connection refused**

* Switch in lsapi.conf or <span class="notranslate"> mod_lsapi.conf </span> value to: <span class="notranslate"> lsapi_terminate_backends_on_exit Off </span>

* Check if empty: <span class="notranslate"> cat /etc/cron.d/kill_orphaned_php-cron | grep lsphp </span> , then run:

<div class="notranslate">

```
yum install lve-utils
```
</div>
Then restart cron service.

**Running PHP for users with UID < 99**

If you need to run PHP using mod_lsapi using users with UID < 99, you would need to re-compile sulsphp:

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ cd ~
$ wget [http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz)
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-XX
$ cmake -DUID_MIN=80 -DGID_MIN=80 .
$ make
$ make install
```
</div>
will be installed<br>  
- Installing: <span class="notranslate"> /usr/lib/apache/mod_lsapi.so </span> (or another httpd modules path)<br>
- Installing: <span class="notranslate"> /usr/sbin/sulsphp </span>

**Apache binary called not httpd (httpd.event, httpd.worker)**

<div class="notranslate">

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
</div>
Will be installed:<br>
- Installing: <span class="notranslate"> /usr/lib/apache/mod_lsapi.so </span> (or another httpd modules path)<br>
- Installing: <span class="notranslate"> /usr/sbin/sulsphp </span>

**WHMCS Status page not accessible after installing CL and mod_lsapi (cPanel).**

* add <span class="notranslate"> user: useradd </span> userstat
* add to file (to the end of file before <span class="notranslate"> </IfModule>) /usr/local/apache/conf/conf.d/lsapi.conf: <Directory /usr/local/apache/htdocs/>  </span>
lsapi_user_group userstat userstat
</Directory>
* service httpd restart

This is safe solution for easyapache rebuilding and cpanel-mod-lsapi updating.

**PHP page with Suhosin return 503 error**

Make php.ini for suhosin as recommended below:
<div class="notranslate">

```
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
```
</div>

**PHP page with APC return 503 error**

Make php.ini for APC as recommended below:
<div class="notranslate">

```
[apc]...apc.shm_segments=1apc.shm_size=32...
```
</div>
shared memory should be not less than 32MB

**Messages appearing in error_log: Child process with pid: XXXXX was killed by signal: 11, core dump: 0**

This means that lsphp was crashed. The solution is:

* Check if apc for user enabled. Tune its options as described in previous slide.
* Check if suhosin is enabled for user. Tune its options as described in this article.
* If previous items do not help, contact us at [https://helpdesk.cloudlinux.com/](https://helpdesk.cloudlinux.com/)

**How to get lsphp core dump on crash**

* Configure mod_lsapi to allow lsphp to generate core dumps. In mod_lsapi.conf:

<div class="notranslate">

```
lsapi_backend_coredump On
```
</div>

* Enable core file generation in sysctl:

<div class="notranslate">

```
sysctl -w ‘kernel.core_uses_pid=1’
sysctl -w ‘kernel.core_pattern=core.%p’
```
</div>

* Configure system to change max size of core files. In <span class="notranslate">/etc/security/limits.conf</span> add:

<div class="notranslate">

```
user1 soft core unlimited
user1 hard core unlimited
```
</div>
where <span class="notranslate">user1</span> is the username for which lsphp crashes.

* If <span class="notranslate">/etc/profile.d/limits.sh</span> exists, look up for the following lines:

<div class="notranslate">

```
if [ "$LIMITUSER" != "root" ]; then
ulimit -n 100 -u 35 -m 200000 -d 200000 -s 8192 -c 200000 -v unlimited 2>/dev/null
```
</div>
Substring <span class="notranslate">“-c 200000”</span> must be replaced with <span class="notranslate">“-c unlimited”</span> .

* Add line into <span class="notranslate">ulimit -c unlimited into apachectl</span> script just after another invokes of the <span class="notranslate">ulimit</span> command.

* Do cold restart of Apache with the command like this:

<div class="notranslate">

```
service httpd stop; sleep 2; killall lsphp; service httpd start
```
</div>

* You can make sure that ulimit for lsphp is changed to unlimited successfully with the following command:

<div class="notranslate">

```
cat /proc/PID/limits | grep ‘Max core file size’
```
</div>

where PID is a pid of any lsphp process. <span class="notranslate">ps -u user1 | grep lsphp </span>

* Core dump of lsphp will be created in the DocumentRoot of the corresponding virtual server.
On cPanel server it should map to

**mod_lsapi is not included in output of httpd -M after installation and setup command for cPanel EasyApache 3**

1. Check if the file <span class="notranslate"> _/usr/local/apache/conf/conf.d/lsapi.conf_ </span> exists and not empty;

2. Check if output of the command

<div class="notranslate">

```
cat /usr/local/apache/conf/httpd.conf | grep "/usr/local/apache/conf/conf.d/\*\.conf"
```
</div>
is not empty.

If it is empty:

1. Add to <span class="notranslate"> "include" </span> section of <span class="notranslate"> _/var/cpanel/conf/apache/main_ </span> string:

<span class="notranslate"> </span>
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

<div class="notranslate">

```
mkdir -p /usr/local/apache/conf/conf.d/;                                                                                 
cp /usr/share/lve/modlscapi/confs/lsapi.conf /usr/local/apache/conf/conf.d/lsapi.conf
```
</div>

3. Call:

<div class="notranslate">

```
/scripts/rebuildhttpdconf/scripts/restartsrv_httpd
```
</div>

## FAQ on mod_lsapi


Q: **_Is it compatible with EasyApache?_**

A: Yes, it is. EasyApache works/fully integrates with mod_lsapi.

Q: **_Is it compatible with <span class="notranslate"> PHP Selector </span> ?_**

A: Yes.

Q: **_Are .htaccess PHP directives supported? For example, mod_php like directives?_**

A: Yes. mod_lsapi can read php_* and php_admin_* directives.

Q: **_I have httpd.conf with SuExecUserGroup options. Do I need to add mod_lsapi related options for VirtualHost?_**

A: No need to change httpd.conf. mod_lsapi can read suPHP_UserGroup, RUidGid, SuExecUserGroup, AssignUserID parameters to determine user id under which site is running. Additionally you can use lsapi_uid_gid or lsapi_user_group as a native way to specify user / group ids.

Q: **_What is the difference between running mod_lsapi with lsapi_with_connection_pool mode_** <span class="notranslate"> On </span> **_and_** <span class="notranslate"> Off </span> **_?_**

A: When  lsapi_with_connection_pool mode is <span class="notranslate"> Off </span> , then the new backend lsphp process has to be created for each new incoming request. At least it requires mod_lsapi to connect to backend lsphp master-process and have it perform fork which leads to a slowdown.

With <span class="notranslate"> pool_mode enabled, mod_lsapi maintains persistent connections with backend which drastically increases performance (accelerates requests processing), but also increases the number of processes in LVE as well memory usage. Backend lsphp processes stays alive for lsapi_backend_max_idle time, or until lsapi_backend_max_reqs is reached (or Apache restarted).  </span>

Alternatively, we have another accelerating technology - [CRIU](/apache_mod_lsapi/#criu-support) , which is faster and uses less memory. But it is in Beta so far and available for CL7 only (stable version will appear in the near future).

Q: **_Your PHP installation appears to be missing the… How to manage native PHP with mod_lsapi under EasyApache 3?_**

A: There are several ways to do that.

1. _Using_ <span class="notranslate"> PHP Selector </span> _._

To find <span class="notranslate"> PHP Selector </span> in user’s panel choose <span class="notranslate"> _Select PHP Version_ </span> icon as follows:

![](/images/mod_lsapi_faq.jpg)

From <span class="notranslate"> PHP Selector </span> you can manage PHP version and choose the necessary extensions to be used by PHP. Choose proper PHP version from the drop-down and click <span class="notranslate"> _Set as current_ </span> . Mark proper checkboxes to choose extensions and click <span class="notranslate"> _Save_ </span> :

![](/images/mod_lsapi_faq_01.jpg)

This is a simple and convenient way to configure the user's PHP.

2. _Using native PHP from_ <span class="notranslate"> PHP Selector </span> _._

mod_lsapi installs alt-php56 as native by default (just copy of alt-php56):

![](/images/mod_lsapi_faq_02.jpg)

The native version is not designed to enable or disable PHP extensions through the web interface of the <span class="notranslate"> PHP Selector </span> . This can lead to missing of the proper PHP extensions for customers applications.

For example, you can get the following reply from the website that is using <span class="notranslate"> WordPress </span> and native PHP:

![](/images/mod_lsapi_faq_03.jpg)

There are two ways to solve this problem:

Use non-native PHP with proper extensions enabled via the <span class="notranslate"> PHP Selector </span> (described above).
Use native PHP with properly configured .ini files (described below).

To configure native PHP, use an additional .ini file <span class="notranslate"> _/opt/alt/php56/link/conf/default.ini_ </span> :

![](/images/mod_lsapi_faq_04.jpg)

By default it is empty. To solve the issue this way, the following strings must be added:

<div class="notranslate">

```
extension=/opt/alt/php56/usr/lib64/php/modules/mysqli.so
extension=/opt/alt/php56/usr/lib64/php/modules/pdo_mysql.so
extension=/opt/alt/php56/usr/lib64/php/modules/pdo.so
```
</div>
All available extensions for alt-php56 can be seen by running the command:

<div class="notranslate">

```
# ls /opt/alt/php56/usr/lib64/php/modules/
```
</div>

**Note.** Some extensions may conflict with each other, be careful when enabling them through the <span class="notranslate"> _default.ini_ </span> file.

3. _Using switch_mod_lsapi --build-native-lsphp as native._

You can find additional notes on native PHP installation (EasyApache 3 only) on the link: [https://docs.cloudlinux.com/apache_mod_lsapi/#installation](/apache_mod_lsapi/#installation)

To see what kind of native PHP is used, use the command:

<div class="notranslate">

```
# /usr/local/bin/php -v
```
</div>

Output example:
<div class="notranslate">

```
PHP 5.6.30 (cli) (built: Jun 13 2017 06:23:21) Copyright (c) 1997-2016 The PHP GroupZend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
```
</div>
The command <span class="notranslate">_switch_mod_lsapi --build-native-lsphp_ </span> builds the lsphp of the same version, it will be used as native via the PHP Selector, but with another .ini file to configure.

![](/images/mod_lsapi_faq_05.jpg)

We do not recommend to use this native PHP because it does not support [CRIU](/apache_mod_lsapi/#criu-support) .

To revert alt-php56 to the native PHP, execute the following command:

<div class="notranslate">

```
# cp /opt/alt/php56/usr/bin/lsphp /usr/local/bin/
```
</div>

Q: **_Is there any difference in using lsphp binaries from alt-php or ea-php packages with Litespeed Web Server compared to lsphp [from the source](https://www.litespeedtech.com/open-source/litespeed-sapi/php) ?_**

A: In this case, there is no difference. Our binaries fully correspond to the native behavior when used with Litespeed Web Server.

Q: **_Is it possible to use CRIU with Litespeed Web Server?_**

A: Yes, Litespeed Web Server officially supports CRIU on the servers with CloudLinux. For detailed information on setting up CRIU with a Litespeed Web Server, follow the [link](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:lsphp_criu_enable) . You can also use lsphp binaries from alt-php or ea-php packages for that purpose.


## CRIU Support


_[ <span class="notranslate"> CloudLinux </span> 7 only]_



CRIU is <span class="notranslate"> _Checkpoint/Restore In Userspace_ </span> , (pronounced <span class="notranslate"> kree-oo </span> ), is a software tool for Linux operating system. Using this tool, you can freeze a running application (or part of it) and checkpoint it as a collection of files on disk. You can then use the files to restore the application and run it exactly as it was during the time of freeze (more information on the link [https://criu.org/Main_Page](https://criu.org/Main_Page) ).

mod_lsapi-1.1-1 is the first beta version with freezing PHP implemented. mod_lsapi now supports the following parameters:

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Values** | **Default**|
|lsapi_criu | Enable/disable CRIU for lsphp freezing. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|
|lsapi_criu_socket_path | Set path to socket for communication with criu service. | [path to socket] | <span class="notranslate"> /var/run/criu/criu_service.socket </span>|
|lsapi_backend_semtimedwait | Enable/disable flag for notification about lsphp started. This method avoid cycles of waiting for lsphp start. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> On </span>|
|lsapi_backend_initial_start | Number of request when lsphp should be freezed. | [number] 0 - no freezing | 0|
|lsapi_criu_use_shm | Method of requests counting. <span class="notranslate"> Off </span> - use shared memory. <span class="notranslate"> Signals </span> - use signals from child processes to parent. | <span class="notranslate"> Off/Signals </span> | <span class="notranslate"> Off </span>|
|lsapi_criu_imgs_dir_path | Path to folder where imgs of freezed PHP will be stored. | [path] | <span class="notranslate"> /var/run/mod_lsapi/ </span>|
|lsapi_criu_debug | Enable/Disable CRIU related debug logging. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|

Example:
<div class="notranslate">

```
lsapi_criu On
lsapi_criu_socket_path /var/run/criu/criu_service.socket
lsapi_backend_semtimedwait On
lsapi_backend_initial_start 15
lsapi_criu_use_shm Off
lsapi_criu_debug Off
```
</div>

When Apache module mod_lsapi detects CRIU enabled (lsapi_criu On) it prepares a directory for images (on the first request of virtualhost) to store ( <span class="notranslate"> lsapi_criu_imgs_dir_path /var/run/mod_lsapi/[dir_name] </span> ), and starts lsphp process. Lsphp increases counter ( <span class="notranslate"> lsapi_criu_use_shm Off|Signals </span> ) via shared memory or signals, when counter reaches limit ( <span class="notranslate"> lsapi_backend_initial_start 15 </span> ), lsphp sends the request to CRIU for freezing. CRIU service makes images of requested processes. Lsphp will not be frozen if counter has not reached the limit. The next time when lsphp will be stopped, it will be unfrozen from the images.

The images of the processes will be saved even if Apache is restarted. But all images will be deleted after server restart by default configuration. This can be modified by setting the new path <span class="notranslate"> lsapi_criu_imgs_dir_path </span> .

**Important!** If php.ini or configuration file from php.d is changed, the images must be deleted manually.

**Note** that CRIU (version lower than criu-lve-3.6-1) can't correctly freeze <span class="notranslate"> lsphp </span> with <span class="notranslate"> PrivateTmp </span> enabled. For correct work, <span class="notranslate"> PrivateTmp </span> must be <span class="notranslate"> false </span> in <span class="notranslate"> httpd.service file </span> . For disabling:

Copy <span class="notranslate"> _httpd.service_ </span> to <span class="notranslate"> _/etc/systemd/system_ </span> and change there <span class="notranslate"> PrivateTmp: 
  </span>
<div class="notranslate">

```
# cat httpd.service
[Unit]
Description=Apache web server managed by cPanel Easy
ApacheConditionPathExists=!/etc/httpddisable
ConditionPathExists=!/etc/apachedisable
ConditionPathExists=!/etc/httpdisable

[Service]Type=forking
ExecStart=/usr/local/cpanel/scripts/restartsrv_httpd --no-verbose
PIDFile=/var/run/apache2/httpd.pid
PrivateTmp=false 

[Install]
WantedBy=multi-user.target 
```
</div>
Or it would be technically better to provide a small override of service file rather than copying the whole new version in <span class="notranslate"> /etc/systemd/system </span> 

[http://www.freedesktop.org/software/systemd/man/systemd.unit.html](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)

<div class="notranslate">

```
mkdir /etc/systemd/system/httpd.service.d
echo "[Service]" >  /etc/systemd/system/httpd.service.d/nopt.conf
echo "PrivateTmp=false" >> /etc/systemd/system/httpd.service.d/nopt.conf
```
</div>

and

<div class="notranslate">

```
# systemctl daemon-reload
```
</div>

**Installation**

Criu is installed with dependency to mod_lsapi-1.1 package. To activate it:

1. Enable service and start it:

<div class="notranslate">

```
systemctl enable criu
systemctl start criu
```
</div>

2. Edit lsapi.conf file, turn CRIU On and set some defaults:

<div class="notranslate">

```
lsapi_criu On
lsapi_criu_socket_path /var/run/criu/criu_service.socket
lsapi_backend_semtimedwait On
lsapi_backend_initial_start 15
lsapi_criu_use_shm Off
```
</div>

3. Restart apache:

<div class="notranslate">

```
service httpd restart
```
</div>



1. An option added to the Apache configuration for cleaning all the images earlier saved by CRIU.

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Value** | **Default**|
|<span class="notranslate">lsapi_reset_criu_on_apache_restart</span> | This option allows cleaning all CRIU images on Apache restart. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|

On the next restart of Apache all of the images will be cleaned.

It can be enabled by writing <span class="notranslate">lsapi_reset_criu_on_apache_restart On </span> in _lsapi.conf_ (Virtual Host and .htaccess do not allow to use this option).

Note that this option works only if <span class="notranslate">lsapi_terminate_backends_on_exit</span> is <span class="notranslate">  On  </span> (default value is <span class="notranslate"> On </span> , it is set in _lsapi.conf_ too).

2. If you need to clean CRIU images for one user you can simply add file to the user's directory with CRIU images (default <span class="notranslate"> _/var/run/mod_lsapi/lsapi_ * _criu_imgs_ </span> ). On the next restart of lsphp the images will be cleaned.

3. Global reset flag for cleaning all earlier saved images by CRIU.

Current mod_lsapi allows cleaning all images only with one flag file.

Create <span class="notranslate"> /usr/share/criu/mod_lsapi/lsphp.criu.reset </span> file. Also don't forget to set such permissions <span class="notranslate"> [nobody:nobody] </span> (or <span class="notranslate"> [apache:apache] </span> for non cPanel) and access mode [700] to the <span class="notranslate"> /usr/share/criu/mod_lsapi </span> directory.

Steps to do :

<div class="notranslate">

```
mkdir /usr/share/criumkdir /usr/share/criu/mod_lsapi
chown nobody:nobody /usr/share/criu/mod_lsapi
touch /usr/share/criu/mod_lsapi/lsphp.criu.reset
```
</div>

On the next requests to all virtual hosts images will be recreated (deleted first and created again later - it depends on lsapi_backend_initial_start value).

4. Аdded possibility to clean CRIU images from user space.

If a user needs to clean CRIU images for lsphp, he should create a file: <span class="notranslate"> ~/mod_lsapi_reset_me_[vhost_name] </span>. Where <span class="notranslate"> [vhost_name] </span> is a ServerName from the VirtualHost block in the configuration file. On the next restart of lsphp, the images will be cleaned.

_Example:_

<div class="notranslate">

```
cd; touch mod_lsapi_reset_me_criu.test.com
```
</div>

where _vhost.conf_ contains:  
<span class="notranslate">_ServerName criu.test.com_ </span>



This mode is enabled by default and creates a separate lsphp process for each virtual host.

<span class="notranslate"> _mod_lsapi_reset_me[vhost_name]_ </span> flag will not work for a user when lsapi_per_user option is <span class="notranslate"> On </span> .

5. There is (default <span class="notranslate"> off </span> ) option in mod_lsapi that creates only one lsphp process for a user, regardless of the number of his virtual hosts. We don't recommend to use this option with CRIU, but if you use it, make sure that your virtual hosts (under the same user) have the same environment configurations. If they are not the same, this may cause undesirable lsphp process operation.


