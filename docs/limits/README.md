# Limits


CloudLinux has support for the following limits:

| |  |  |  | |
|-|--|--|--|-|
|Limits | Units | Default Value | Description | Supported Kernels / OS|
| | % of a core, or HZ | 100% | speed limit, relative to a single core, or specified in HZ (portable across s) | all|
|[deprecated] | % of | 25% | Limit (smallest of & NCPU is used) | all|
|[NCPU](/cpu_limits/) [deprecated] | number of cores | 1 CORE | Max number of cores (smallest of & NCPU used) | all|
|[PMEM](/memory_limits/) | KB | 1024MB | Physical memory limit (RSS field in ps/RES in top). Also includes shared memory and disk cache | CL5 hybrid kernel, CL5 lve1.x+ kernel, CL6 and CL7|
|[VMEM](/memory_limits/) | KB | 0 | Virtual memory limit (VSZ field in ps/VIRT in top) | all|
|[IO](/io_limits/) | KB/sec | 1024KB/sec | IO throughput - combines both read & write operations | CL7, CL6 lve1.1.9+ kernel, CL5 hybrid kernel|
|IOPS [lve1.3+] | Operations per second | 1024 | Restricts total number of read/write operations per second. | CL7, CL6 and CL5 hybrid kernels lve1.3+|
|[NPROC](/number_of_processes_limit/) | number | 100 | Max number of processes within LVE | CL5 hybrid kernel, CL5 lve1.x+ kernel, CL6 and CL7|
|[EP](/entry_processes_limit/) | number | 20 | Limit on entry processes. Usually represents max number of concurrent connections to apache dynamic scripts as well as SSH and cron jobs running simultaneously. | all|

Note. It is always better to disable VMEM limits (set them to 0) in your system at all because they are deprecated in CloudLinux 6/7 system and are causing unexpected issues.

Bellow you can find recommendations for your typical shared hosting setup. The recommendations don't depend on the power of your server. They only depend on how "fast" you want your hosting accounts to be.

**Typical Hosting Account**

```

PMEM=512MB
VMEM=0
IO=1024KB/s
IOPS=1024
NPROC=100
EP=20
```

**High End Hosting Account**

```

PMEM=1GB
VMEM=0
IO=4096KB/s
IOPS=1024
NPROC=100
EP=40
```

## Understanding LVE


LVE is a kernel level technology developed by the CloudLinux team. The technology has common roots with container based virtualization and uses cgroups in its latest incarnation. It is lightweight and transparent. The goal of LVE is to make sure that no single web site can bring down your web server.

Today, a single site can consume all , IO, Memory resources or Apache processes - and bring the server to a halt. LVE prevents that. It is done via collaboration of Apache module, PAM module and kernel.

[mod_hostinglimits](/hostinglimits_module_for_apache/) is Apache module that:

·        detects VirtualHost from which the request came;
·        detects if it was meant for CGI or PHP script;
·        puts Apache process used to serve that request into LVE for the user determined via SuexecUserGroup directive for that virtual host;
·        lets Apache to serve the request;
·        removes Apache process from user's LVE.

The kernel makes sure that all LVEs get fair share of the server's resources, and that no customer can use more then the limits set for that customer.
Today we can limit , (virtual and physical), IO, number of processes as well as the number of entry processes (concurrent connections to apache).

Each LVE limits amount of entry processes (Apache processes entering into LVE) to prevent single site exhausting all Apache processes. If the limit is reached, then mod_hostinglimits will not be able to place Apache process into LVE, and will return error code 508. This way very heavy site would slow down and start returning 508 errors, without affecting other users.

If the site is limited by or IO, then the site will start responding slower.
If the site is limited by memory or number of processes limits, then the user will recieve 500 or 503 errors that server cannot execute the script.



To use LVE you should have CloudLinux kernel installed, and LVE module loaded. You can check the kernel by running the following command:

```
$ uname -r
```

You should see something like 2.6.18-294.8.1.el5.lve0.8.60. The kernel should have lve in its name. To see if lve kernel module is loaded run:

```
$ lsmod|grep lve
lve                    46496  0 
```

Starting from kernels lve1.4.x iolimits module is a part of kmod-lve and could not be used separately.

You can toggle LVE on/ff by editing and setting LVE_ENABLE variable to or .

Setting it to will enable LVE, setting it to will disable LVE.

You can toggle IO limits by editing and setting IO_LIMITS_ENABLED variable to or .

You need to reboot the server, after you set this option to make the changes live.



The best way to control LVE limits is using LVE Manager in your favorite control panel. Alternatively, you can use command line tool lvectl to control limits.
The limits are saved in 

Example:

```
<?xml version="1.0" ?>
<lveconfig>
<defaults>
<cpu limit="25"/>
<ncpu limit="1"/>
<io limit="1024"/>
<mem limit="262144"/>
<other maxentryprocs="200"/>
<pmem limit="262144"/>
<nproc limit="0"/>
</defaults>
<lve id="532">
<cpu limit="30"/>
<ncpu limit="5"/>
</lve>
</lveconfig>
```


Sets limit to 25%, IO limit to 1024KB/s, virtual memory limit to 1GB (memory limit is set as a number of 4096 bytes pages), physical memory limit to 1GB, cores per LVE to 1, maximum entry processes to 200 and no limit for number of processes for all LVEs. It also sets the limit of 30% and number of processes limit to 5 for LVE with ID 532.




One of the best way to monitor current usage is [lvetop](/lvetop/) :

```
$ lvetop
ID     EP    PNO    TNO    CPU    MEM    I/O
test    1     2            2     2%    728     0   
```

You can also check the content of file that has all the data about LVE usage for all LVEs:

```
[root@localhost tests]$ cat /proc/lve/list 
4:LVE        EP        lCPU        lIO        CPU        MEM        IO        lMEM        lEP        nCPU        fMEM        fEP
0        0        75        25        0        0        0        262144        20        2        0        0
500        0        75        25        0        0        0        4294967 20        3        2        1        
700        1        75        25        1403247        202        0        262144        20        2        0        0
```

Additionally you can use tool lveps to see usage, and processes within LVE.

## Command-line Tools


[lvectl](/lvectl/)

[lveps](/lveps/)

[lvetop](/lvetop/)

[cldetect](/cldetect/)

[lve-stats](/lve_stats_old/)

`o` [Storing statistics in MySQL](/storing_statistics_in_mysql/)

`o` [Storing statistics in PostgreSQL](/storing_statistics_in_postgres/)

`o` [Compacting in multi-server settings](/compacting_in_multi-server/)

[lve-stats 2](/lve-stats_2/)

`o` [Installation](/lve-stats_2_installation/)

`o` [Configuration](/lve-stats_2_configuration/)

`o` [Command Line Tools](/lve-stats_2_command_line_tools/)

[lveinfo](/lveinfo/)

[lvechart](/lvechart/)

[dbgovchart](/mysql_governor_dbgovchart/)

[lve-read-snapshot](/lve-read-snapshot/)

[lve-create-db](/lve-create-db/)

`o` [Plugins](/lve-stats_2_plugins/)

`o` [Creating a Plugin for LVE Stats 2](/creating_a_plugin/)

[Introduction](/lve-stats_2_plugin_introduction/)

[Server Plugin Arrangement](/server_plugin_arrangement/)

[Plugin Configuration](/plugin_configuration/)

[Types of Plugins](/types_of_plugins/)

[Examples of Plugins](/plugins_examples/)









`o` [/var/lve/info file](/var_lve_info_file/)

`o` [Troubleshooting](/lve-stats_2_troubleshooting/)


### lvectl


lvectl is the primary tool for LVE management. To use it, you have to have administrator access. lvectl is a part of lve-utils package.

The syntax of lvectl is:

Usage:

| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |




Reset all LVEs settings based on configuration in :

```
$ lvectl apply all
```

Set new default & Physical memory limit:

```
$ lvectl set default --speed=100% --pmem=256m
```

Reset all LVE's killing processes inside them:

```
$ lvectl destroy all
```

Show list of LVEs and their limits:

```
$ lvectl list
```


### lveps


**lveps** tool shows information about running LVEs, processes and threads belonging to them, usage consumed by LVEs and their individual processes/threads. LVE is only reported if it is considered active (at least one thread belongs to that LVE or was running during measurement in dynamic mode).

**Usage** :

Options:










Command like will display processes running inside 'active' LVEs.

| | |
|-|-|
| | The number of seconds LVE/process/thread has been running (each /core is counted separately), or the average CPU load (100% is all resources) if used with .|
|MEM | The number of megabytes of resident memory in use by LVE/process/thread (shared memory is not included).|
|IO | The number of kilobytes read and written in sum by LVE, or kb/sec if used with -d.|
|ID | LVE ID or username.|
|EP | The number of entry processes inside  LVE.|
|COM | Command name for this process.|
|PID | PID of the process.|
|PNO | The number of processes belonging to the LVE.|
|TID | TID of the thread.|
|TNO | The number of threads belonging to the LVE.|
|DO | The number of disk operations belonging to the LVE from the time it was created.|
|DT | Total amount of disk transfer in megabytes from LVE creation time.|
|IOPS | The number of I/O operations per second|






### lvetop


lvetop utility allows to monitor LVE usage:

| |  |  |  |  |  |  | |
|-|--|--|--|--|--|--|-|
| |  |  |  |  |  |  | |
| |  |  |  |  |  |  | |
| |  |  |  |  |  |  | |
| |  |  |  |  |  |  | |
| |  |  |  |  |  |  | |
| |  |  |  |  |  |  | |

lvetop fields:











### cldetect




**cldetect** is used to detect installed software, and adjust CloudLinux options accordingly.

**Usage** : /usr/bin/cldetect [--options]





























Each time _lve-utils_ package is installed or upgraded it does some automatic system re-configuration to make some software (like nagios) work correctly, if it’s installed, by calling _cldetect --setup-supergids_ command.

Starting from **_lve-utils 3.0-21_** a behaviour of _cldetect --set-nagios_ (now, it’s a part of _cldetect --setup-supergids_ ) command slightly changed.

| |  | |
|-|--|-|
| | **Old behavior** | **New behavior**|
|If **fs.proc_super_gid** is 0 (which means it’s not configured) or it’s set to some GID that doesn’t exist in the system. | Command will set _sysctl fs.proc_super_gid_ to point to Nagios GID. | Command will create special _clsupergid_ group, setup _sysctl fs.proc_super_gid_ to point to it’s GID and add Nagios user to this group.|

If **fs.proc_super_gid** was configured by an admin to some existing group, the command will just add Nagios user to this group.


## SPEED Limits




limit allows to set limit in terms of % of a single core, or as a fixed number of Hz.

would set performance relative to one core. For example:

would mean 1/2 core.
would mean 1 core,
would mean 1.5 cores

would automatically detect speed of each core, and adjust the scheduler to make sure user cannot go over that limit.

For example, on 1ghz , setting of would mean 2 cores, while on 4ghz same setting would mean 1/2 of a core.

This should allow hosting companies to set same approximate performance level limits across different hardware using single setting.




## CPU Limits


[deprecated]

This limit is no longer used, and is used instead



Limits are set by and parameters. specifies the % of total of the server available to LVE. specifies the number of cores available to LVE. The smallest of the two is used to define how much power will be accessible to the customer. For example:
1 core,
| |  |  | |
|-|--|--|-|
|Cores Per Server | Limit | Limit | Real limit|
|1 | 25% | 1 | 25% of 1 core|
|2 | 25% | 1 | 50% of 1 core|
|2 | 25% | 2 | 50% of 1 core|
|4 | 25% | 1 | 100% of 1 core (full core)|
|4 | 25% | 2 | 1 core|
|4 | 50% | 1 | 1 core|
|4 | 50% | 2 | 2 cores|
|8 | 25% | 1 | 1 core|
|8 | 25% | 2 | 2 cores|
|8 | 50% | 2 | 2 cores|
|8 | 50% | 3 | 3 cores|

When user hits limit, processes within that limit are slowed down. For example, if you set your limit to 10%, and processes inside LVE want to use more then 10% they will be throttled (put to sleep) to make sure they don't use more then 10%. In reality, processes don't get time above the limit, and it happens much more often then 1 second interval, but the end result is that processes are slowed down so that their usage is never above the limit set.



## Memory Limits


Memory is controlled using virtual (VMEM) and physical (PMEM) memory limits.



Virtual memory limit corresponds to the amount of memory processes can allocate within LVE. You can see individual process virtual memory usage by monitoring column in output for the process.

When process tries to allocate more memory, CloudLinux checks if the new total virtual memory used by all processes within LVE is more then a limit set. In such case CloudLinux will prevent memory from being allocated and increments fVMEM counter. In most cases, but not all of them - this causes process to fail. For CGI/PHP scripts it will usually cause 500 and 503 error.







Physical memory limit corresponds to the amount of memory actually used by end customer's processes. You can see individual process physical memory usage by monitoring RES column in top output for the process. Because similar processes (like PHP) share a lot of their memory, physical memory usage is often much lower then virtual memory usage.

Additionally physical memory includes shared memory used by the customer, as well as disk cache.
In case of disk cache -- if user is starting to lack physical memory, the memory used for disk cache will be freed up, without causing any memory faults.
When LVE goes over physical memory limit, CloudLinux will first free up memory used for disk cache, and if that is not enough, it will kill some of the processes within that LVE, and increment fPMEM counter. This will usually cause web server to serve 500 and 503 errors. Physical memory limit is a much better way to limit memory for shared hosting.





If you see no processes under some user, but lve manager keeps telling it is using some memory, then most probably memory is taken by users disk cache. To check personal users disk cache (if lveinfo shows memory usage but not processes there):

```
cat /proc/bc/XXX/meminfo
```

…
Cached: 67300 kB
…
where XXX is user id, could be taken with:

```
id username
```



## IO


IO limits restrict the data throughput for the customer. They are in KB/s. When limit is reached, the processes are throttled (put to sleep). This makes sure that processes within LVE cannot go over the limit,. Yet don't stop working, nor getting killed -- they just work slower when the limit is reached.

IO limits are available with kernels el6.lve1.x and higher.

The IO limits will only affect , and will have no effect on network. It also doesn't take into consideration any disk cache accesses. So, even if file is loaded from disk cache 1000 times -- it will not be counted towards limits.

## IOPS


limits restrict the total number of read/write operations per second. When the limit is reached the read/write operations stop until current second expires.

## Entry Processes


limit control the number of entries into LVE. Each time a process 'enters' into LVE, we increment the counter. Each time process exits LVE, we decrement the counter. We don't count processes that are created inside LVE itself. It is also know as limit.

The process enter's into LVE when there is a new HTTP request for CGI/PHP.

This limit was created to prevent DoS attacks against web server. One of the fairly popular attacks is to tie up all the Apache connections by hitting some slow page on a server. Once all Apache slots are used up, no one else will be able to connect to the web server, causing it to appear to be down. The issue is worsened by limits, as once site starts to get slow due to limit -- it will respond to requests slower and slower, causing more and more connections to be tied up.

To solve that, we have created entry processes (often called concurrent connections) limit. It will limit the number of concurrent connections to Apache, causing web server to serve error 508 page ( ), once there number of concurrent requests for the site goes above the limit.


## Number of Processes


controls the total number of processes and threads within LVE. Once the limit is reached, no new process can be created (until another one dies). When that happens counter is incremented. Apache might return 500 or 503 errors in such case.



## Network Traffic Bandwidth Control and Accounting System


_[Requires kernel lve1.4.4.el6 or higher, or lve1.4.56.el7 or higher]_

Network traffic bandwidth control and accounting systems in CloudLinux 6 allows for each LVE container:

Limiting outgoing network traffic bandwidth
Accounting incoming and outgoing network traffic

_The system supports IPv4 only protocol._



All outgoing IP packets generated inside LVE container and marked with LVE identifier. Traffic control utility tc from iproute2 package uses this marker to set required bandwidth.

**_Note._** _ CloudLinux doesn’t limit the network traffic itself, it only marks IP packets with specific LVE id._

**Example 1:**

1. We create class with and rate :




2. All packets marked with LVE id will be processed by class 1:1 (rate ).



**Example 2:**

1. As an example we create class with and rate and class 1:10 will be used by default:




2. For class 1:1 we create two branches with rate 5 and 10 accordingly, with classid 1:10 and 1:20.




3. All packets marked with LVE id=2121 are processed by 10 kbit class.



More info about tc and its syntax can be found on the link [http://tldp.org/HOWTO/Traffic-Control-HOWTO/index.html](http://tldp.org/HOWTO/Traffic-Control-HOWTO/index.html)



Traffic accounting is performed for each LVE container. Network statistics is collected at /proc/lve/list file. Network-related data found at fields:

- output traffic limit by volume, equals 0*
- input traffic limit by volume, equals 0*
- current outgoing traffic value
- current incoming traffic value

The data is also collected at /proc/lve/per-lve/\<id>/net_stat, where id is an LVE container identifier. net_stat file contains 4 values in one row:

Outgoing traffic limit by volume, equals 0*
Incoming traffic limit by volume, equals 0*
current outgoing traffic value
current incoming traffic value






## Compatibility Matrix


| |  |  |  |  |  |  | |
|-|--|--|--|--|--|--|-|
| |  |  |  | NPROC |  | CageFS | |
|Apache / suPHP | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / FCGID | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / CGI | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / PHP-FPM | Yes3 | Yes | Yes | Yes | Yes | Yes3 | No|
|Apache / mod_php | Yes | No | Yes | Yes | Yes | no | No|
|Apache / mod_ruid2 | Yes | No | Yes | Yes | Yes | no | No|
|Apache / MPM ITK | Yes | No | Yes | Yes | Yes | Yes1 | No|
|LiteSpeed | Yes | Yes2 | Yes | Yes | Yes | Yes | Yes|
|NGINX / PHP-FPM | Yes3 | Yes | No | Yes | Yes | Yes | No|
|SSH | Yes | Yes | Yes | Yes | Yes | Yes3 | Yes|
| | Yes | Yes | Yes | Yes | Yes | Yes | Yes|

1. Requires patched version of MPM-ITK. CL httpd RPM has ITK worker with the patch. Patch is also available at: [http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)
2. CloudLinux 7 and CloudLinux 6 kernels only. 3. The DirectAdmin and CloudLinux PHP provide patched version. For other PHP distributions, please, use patches available here: http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz


## Integration Components


CloudLinux uses various ways to integrate with existing system. By default we can integrate with:

·        PAM - using pam_lve
·        Apache - using mod_hostinglimits, apr library, patched suexec
·        LiteSpeed - built in integration

### LVE PAM module


pam_lve.so is a PAM module that sets up LVE environment. It provides easy way to setup LVE for SSH sessions, as well as other PAM enabled applications, such as crontab, su, etc...
pam_lve.so is installed by default when you convert existing server.

Installation:

```
# yum install pam_lve
```

After you install , add following line to PAM config file for the required application:

```
session    required     pam_lve.so 500 1 wheel,other
```

In this line:
·        500 stands for minimum UID for which LVE will be setup. For any user with UID < 500, LVE will not be setup.  If CageFS is installed, use:

·        1 stands for CageFS enabled (0 -- cagefs disabled)
·        3rd optional argument defines group of users that will not be placed into LVE or CageFS. Starting with pam_lve 0.3-7 you can specify multiple groups, comma separated





For example, to enable LVE for SSH access, add that line to /etc/pam.d/sshd. To enable LVE for SU, add that line to /etc/pam.d/su
By default module will not place users with group wheel into lve. If you want to use different group to define users that will not be placed into LVE by pam_lve - pass it as 3rd argument.





For preventing cases when user enters under usual user (using ssh) and then tries to enter as super user (via sudo or su) - pam_sulve was created, which tries to enter to LVE=1 and leaves it right away. If action fails, user gets message:





To check if pam_sulve is enabled on the server:

```
grep pam_sulve.so /etc/pam.d/*
```

should not be empty.

### LVE Wrappers


LVE Wrappers are the set of tools that allow system administrator to run various users, programs & daemons within Lightweight Virtual Environment. This allows system administrator to have control over system resources such program can have. Additionally it prevents misbehaving programs running within LVE to drain system resources and slow down or take down the whole system. The tools are provided by lve-wrappers RPM.

You can install them by running:

```
$ yum install lve-wrappers
```



LVE Wrappers provide two tools for placing programs inside LVE: lve_wrapper and lve_suwrapper.

**/bin/lve_wrapper** – can be used by any non-root user, as long as that user is in group lve (see /etc/groups file).

Syntax:

lve_wrapper <command_to_run>

Example:

```
$ lve_wrapper make install
```

The program will be executed within LVE with ID matching user's id.

**/bin/lve_suwrapper** – can be used by root user or any user in group lve (see /etc/groupsfile) to execute command within specified LVE

Syntax:

lve_suwrapper LVE_ID <command_to_run>

Example:

```
# lve_suwrapper 10000 /etc/init.d/postgresql start
```

**Switches** :

-f - force namespace
-n - without namespace

### MPM ITK


CloudLinux comes with built in. Yet, if you would like to build your own Apache, you need to apply our patch for

Download file:
Extract:
And apply this patch to your Apache source code.

When running , you should disable mod_hostinglimits. All the functionality needed by is already built into the patch.

Directives which can be used by Apache with patch:

 - uses ID as LVE ID
 - Error code to display on LVE error (508 by default)
 - same as - respond with when LVE error 508 occurs
 - ovverides id used for LVE ID instead of
 - overrides user to use to retrieve LVE ID, instead of AssignUserID

### HostingLimits


mod_hostinglimits works with existing modules, to put them into LVE context. In most cases the process will be placed into LVE with the ID of the user that sites belongs to. mod_hostinglimits detects the user from SuexecUserGroup ( module), (from mod_suphp), AssignUserID ( ), ) directives.

This can be overwritten via LVEId or LVEUser parameter on the Directory level. Note that those parameters will not work with mod_fcgid and mod_cgid. The order of detection looks as follows:

·         LVEId
·        LVEUser
·        SuexecUserGroup
suPHP_UserGroup
·        RUidGid
·        AssignUserID





Example:

```
LoadModule hostinglimits_module modules/mod_hostinglimits.so
<IfModule mod_hostinglimits.c>
AllowedHandlers cgi-script php5-script php4-script
SecureLinks On
</IfModule>
```



**mod_hostinglimits** (since version 1.0-22) supports . Min UID is read on Apache start/restart and stored in the memory during apache runtime. If min UID has changed, you should restart Apache for ** ** **mod_hostinglimits** applying new min UID value. Full min UID is supported only with APR.

The following message should appear: _[notice] mod_hostinglimits: found apr extention version 3_ . This means that the correct APR is installed with mod_hostinglimits.

mod_hostinglimist has variable for Apache CustomLog format string . How to use:

LogFormat combined

shows in access_log the following info:

```
*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php HTTP/1.1" 200 43435 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500
```
```
*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php?=PHPE9568F34-D428-11d2-A769-00AA001ACF42 HTTP/1.1" 200 2524 "************/1.php""Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500
```
```
*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php?=PHPE9568F35-D428-11d2-A769-00AA001ACF42 HTTP/1.1" 200 2146 "************/1.php""Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500
```



| | |
|-|-|
|cPanel | Installed by default during EasyApache build. Requires lve-stats & lve-utils packages to be installed.|
|DirectAdmin | Can be built using :|
|Plesk | |
|ISPmanager | |
|InterWorx | |
|H-Sphere | Included by default in H-Sphere 3.5+|
|Standard Apache from | |
|Custom Apache installation | Compile from the source: [http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz)|

| | |
|-|-|
|Apache Module Identifier: | hostinglimits_module|
|Source Files: | mod_hostinglimits.c|
|Compatibility: | MPM prefork, worker, event, ITK|



SecureLinks

| | |
|-|-|
|Description: | Makes sure that for any virtual hosts, only files owned by user specified via SuexecUserGroup or other ways as described above are served. For files owned by any other user apache will return error. The directive will not affect VirtualHost without user id specified, or with uid < 100|
|Syntax: | |
|Default: | |
|Context: | server config|

Prevents apache from serving files not owned by user, stopping symlink attacks against php config files.

Example:

```
SecureLinks On
```

SkipErrors

| | |
|-|-|
|Description: | Allow apache to continue if LVE is not available|
|Syntax: | |
|Default: | |
|Context: | server config|

Prevents Apache from exiting if LVE is not available.

Example:

```
SkipErrors Off
```

AllowedHandlers

| | |
|-|-|
|Description: | List of handlers that should be placed into LVE, support regexp|
|Syntax: | AllowedHandlers cgi-script %^php%  my-script|
|Default: | none|
|Context: | server config|

This directive allows to list handlers which will be intercepted and placed into LVE.

Example:

Match requests handled by cgi-script handler:

```
AllowedHandlers cgi-script 
```
Match all requests:

```
AllowedHandlers *
```
Match all requests that handled by handler that contains PHP:

```
AllowedHandlers %php%
```
Match all requests handled by handler that starts with PHP:

```
AllowedHandlers %^php%
```

DenyHandlers

| | |
|-|-|
|Description: | List of handlers that should not be placed into LVE, support regexp|
|Syntax: | |
|Default: | none|
|Context: | server config|

This directive works together with AllowHandlers, to exclude some handlers from being allowed in LVE.

Example:

Match all requests, but

```
AllowedHandlers *
DenyHandler %text/*%
```

LVEErrorCode

| | |
|-|-|
|Description: | Error code to display once entry is rejected due to maxEntryProcs|
|Syntax: | values from 500 to 510|
|Default: | 508|
|Context: | directory config|

Specifies ErrorCode to use on LVE error (like too many concurrent processes running). The message that will be displayed by default is:

Resource Limit Is Reached The website is temporarily unable to server your request as it exceeded resource limit. Please try again later. You can redefine error message using ErrorDocument directive

Example:

```
LVEErrorCode 508
ErrorDocument 508 508.html
```

LVEid

| | |
|-|-|
|Description: | Allows to setup separate LVE ID on per directory level. If not set, user ID of a corresponding user is used.|
|Syntax: | LVEId number|
|Default: | User Id is used|
|Context: | directory config|

Specifies LVE id for particular directory

Example:

```
<Directory "/home/user1/domain.com/forums">
LVEId 10001
</Directory>
```

LVEUser

| | |
|-|-|
|Description: | Allows to setup separate LVE ID on per directory level.|
|Syntax: | LVEUser username|
|Default: | none|
|Context: | directory config|

Specifies LVE ID for particular directory.

Example:

```
<Directory "/home/user1/domain.com/forums">
         LVEUser user1
</Directory>
```

LVEUserGroupID

| | |
|-|-|
|Description: | Use group ID instead of user ID for LVE container number.|
|Syntax: | |
|Default: | User Id is used|
|Context: | global config only|

If the option enabled, group ID will be used instead of a user ID. Apache will display the following string in error logs:

```
mod_hostinglimits: use GroupID instead of UID 
mod_hostinglimits: found apr extension version 2 
mod_hostinglimits: apr_lve_environment_init_group check ok
```

If a compatible apr library is not found, the following error message will be display in error logs.

```
mod_hostinglimits:  apr_lve_* not found!!!
```

Example:
_ _
```
<Directory "/home/user1/domain.com/forums">
         LVEUserGroupID On
</Directory>
```

LVERetryAfter

| | |
|-|-|
|Description: | Returns Retry-After header when LVE error 508 occurs.|
|Syntax: | LERetryAfter MINUTES|
|Default: | 240 minutes|
|Context: | directory config|

Specifies interval for header.  The response-header field can be used to indicate how long the service is expected to be unavailable to the requesting client.

Example:

```
LVERetryAfter 180
```

LVESitesDebug

| | |
|-|-|
|Description: | Provides extended debug info for listed sites.|
|Syntax: | |
|Default: | |
|Context: | directory config|

Specifies virtual hosts to provide extra debugging information.

Example: _ _

```
<Directory "/home/user1/domain.com/forums">
         LVESitesDebug abc.com yx.cnet
</Directory>
```

LVEParseMode

| | |
|-|-|
|Description: | Determines the way LVE ID will be extraced. In Conf|
|Syntax: | |
|Default: | |
|Context: | directory config|

In CONF mode, standard way to extract LVE ID is used (SuexecUserGroup, LVEId, or similar directives).

In mode, username is extracted from the home directory path. The default way to match username is via the following regexp: . Custom regexp can be specified in LVEPathRegexp.

In mode, the owner of the file is used as an LVE ID.

In mode, LVE ID is retrieved from Redis database.

Example:

```
LVEParseMode CONF
```


LVEPathRegexp

| | |
|-|-|
|Description: | Regexp used to extract username from the path. Used in conjuction with LVEParseMode PATH|
|Syntax: | LVEPathRegexp regexp|
|Default: | |
|Context: | directory config|

Used to extract usersname via path.

Example:

```
LVEPathRegexp /home/([^/]*)/
```

LVELimitRecheckTimeout

| | |
|-|-|
|Description: | Timeout in milliseconds, a site will return EP without lve_enter for LA decreasing after this time|
|Syntax: | LVELimitRecheckTimeout number|
|Default: | 0|
|Context: | httpd.conf, virtualhost|

Example:

```
LVELimitRecheckTimeout 1000
```

**LVEUse429**

| | |
|-|-|
|Description: | Use 429 error code as code returned on max entry limits ( ).|
|Syntax: | LVEUse429 on|
|Default: | |
|Context: | httpd.conf, virtualhost|

Example:

```
LVEUse429 on
```

Available for RPM based panels, EasyApache 4 and DirectAdmin.

#### Redis Support for HostingLimits


Redis support provides a way to query Redis database for LVE id, based on domain in the HTTP request. Given a database like:

```
xyz.com 10001
bla.com  10002
....
```

The module will retrieve corresponding LVE id from the database.

To enable Redis support, compile from source: [http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz)

The compilation requires hiredis library.

```
$ wget 
$ yum install cmake
$ tar -zxvf mod_hostinglimits*.tar.gz
$ cd mod_hostinglimits*
$ cmake -DREDIS:BOOL=TRUE .
$ make
$ make install
```

To enable Redis mode, specify:

```
LVEParseMode REDIS
```


LVERedisSocket

| | |
|-|-|
|Description: | Socket to use to connect to Redis database.|
|Syntax: | LVERedisSocket path|
|Default: | /tmp/redis.sock|
|Context: | server config|

Used to specify location of Redis socket.

Example:

```
LVERedisSocket /var/run/redis.sock
```

LVERedisAddr

| | |
|-|-|
|Description: | IP/port used to connect to Redis database instead of socket.|
|Syntax: | LVERedisAddr IP PORT|
|Default: | |
|Context: | server config|

Used to specify IP and port to connect to Redis instead of using Socket

Example: _ _
_  _
```
LVERedisAddr 127.0.0.1 6993
```

LVERedisTimeout

| | |
|-|-|
|Description: | Number of seconds to wait before attempting to re-connect to Redis.|
|Syntax: | LERetryAfter SECONDS|
|Default: | 60 seconds|
|Context: | server config|

Number of seconds to wait before attempting to reconnect to Redis after the last unsuccessful attempt to connect.

Example:

```
LVERedisTimeout 120
```


### cPanel/WHM JSON API


CloudLinux offers JSON API for [lvectl](/lvectl/) via WHM. You can access it using the following URL:

_https:/IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=list_

The output will look as follows:

```
{"data":[{"ID":"default","CPU":"30","NCPU":"1","PMEM":"1024M","VMEM":"1024M","EP":"28","NPROC":"0","IO":"2048"}]}
```


always
should match [lvectl](/lvectl/) command

For commands like where you need to specify LVE (user) ID, like lveid=500 (matches user ID 500).

Example:





_[Note that _ **_speed_** _ limit can be specified in several units of measure - _

Output:

```
{"status":"OK"}
```

To do 'set default', use lveid=0, like:

_https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=0&speed=30%&io=2048_

For commands like use:




You can use the following commands that allow to specify user name instead of user ID:

| | |
|-|-|
| | Set parameters for a LVE and/or create a LVE using username instead of ID.|
| | List loaded LVEs, display username instead of user ID.|
| | Delete LVE and set configuration for that user to defaults.|

If the limits for users are set with , then turnkey billing solutions can be applied ( _e.g. WHMCS_ ).



### cPanel LVE Extension


_[_

allows to control LVE limits for packages via cPanel hosting packages control interface and via . It simplifies integration with existing billing systems for cPanel (like WHMCS for example).

**Add Package Extension**

To add LVE Settings to standard cPanel package, go to and choose .

**Note.**  _You can find the information on how to add a package in official cPanel documentation on the link:_

[https://documentation.cpanel.net/display/ALD/Add+a+Package](https://documentation.cpanel.net/display/ALD/Add+a+Package)


![](/images/lve-extension_01.jpg)


Tick checkbox in the bottom of the page to open form.

![](/images/lve-extension_02.jpg)

You can specify the following options:

Note that your changes to will appear in the system after a little while.

| | |
|-|-|
| | Maximum CPU usage for an account. Note: Must be in range 1 - 100 (but obligatory > 0 ) if old format is used; use % or to set limit as speed; Type “ ” to use default value.|
| | Pmem - Maximum physical memory usage for an account. Vmem - Maximum virtual memory usage for an account. Note: Must be a positive number. Postfix allowed only in [KGMT]. Type “ ” to use default value. Type “0” for unlimited resource.|
| | Maximum number of entry processes (concurrent connections) for an account. Note: Must be a positive number. Type “ ” to use default value. Type “0” for unlimited resource.|
| | Maximum number of processes usage for an account. Note: Must be a positive number. Type “ ” to use default value. Type “0” for unlimited resource.|
| | Maximum usage speed for an account. Is measured in . Note: Must be a positive number. Type “ Type “0” for unlimited resource.|
| | Maximum (input/output operations per second) usage for an account. Note: Must be a positive number. Type “ ” to use default value. Type “0” to unlimited resource.|

![](/images/lve-extension_03.jpg) 

Click _ _ to apply your changes.



You can edit limits in any convenient way for you - in section, in or even via WHM API.



To edit package extensions, choose and click . Choose a package from the list and click .

![](/images/lve-extension_04.jpg)



To edit package extensions in , in choose _ _ . Open tab and click pencil (edit) icon.

![](/images/lve-extension_05.jpg)



To learn how to work with package extensions limits using WHM API, please read the official cPanel documentation:

[https://documentation.cpanel.net/display/SDK/Guide+to+Package+Extensions+-+Data+Behavior+and+Changes](https://documentation.cpanel.net/display/SDK/Guide+to+Package+Extensions+-+Data+Behavior+and+Changes)






