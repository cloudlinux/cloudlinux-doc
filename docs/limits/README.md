# Limits

* [Understanding limits](/limits/#understanding-limits)
* [SPEED limit](/limits/#speed-limit)
* [Memory limit](/limits/#memory-limit)
* [IO](/limits/#io)
* [IOPS](/limits/#iops)
* [Entry processes](/limits/#entry-processes)
* [Number of processes](/limits/#number-of-processes)
* [Inodes](/limits/#inodes)
* [Network traffic bandwidth control and accounting system](/limits/#network-traffic-bandwidth-control-and-accounting-system)
* [Limits validation](/limits/#limits-validation)
* [Compatibility matrix](/limits/#compatibility-matrix)
* [Reseller Limits](/limits/#reseller-limits)

CloudLinux has support for the following limits:

| |  |  |  | |
|--|---|--|--|--|
|Limits | Units | Default Value | Description | Supported Kernels / OS|
|<span class="notranslate"> [SPEED](/limits/#speed-limit) </span> | % of a core, or HZ | 100% | <span class="notranslate"> CPU </span> speed limit, relative to a single core, or specified in HZ (portable across <span class="notranslate"> CPU </span> s) | all|
|<span class="notranslate">[CPU](/deprecated/#cpu-limits)</span> [deprecated] | % of <span class="notranslate"> CPU </span> | 25% | <span class="notranslate"> CPU </span> Limit (smallest of <span class="notranslate"> CPU </span> & NCPU is used) | all|
|[NCPU](/deprecated/#cpu-limits) [deprecated] | number of cores | 1 CORE | Max number of cores (smallest of <span class="notranslate"> CPU </span> & NCPU used) | all|
|[PMEM](/limits/#physical-memory-limit) | KB | 1024MB | Physical memory limit (RSS field in ps/RES in top). Also includes shared memory and disk cache | all|
|[VMEM](/limits/#virtual-memory-limit) | KB | 0 | Virtual memory limit (VSZ field in ps/VIRT in top) | all|
|[IO](/limits/#io) | KB/sec | 1024KB/sec | IO throughput - combines both read & write operations | CL8, CL7, CL6 lve1.1.9+ kernel|
|[IOPS](/limits/#iops) [lve1.3+] | Operations per second | 1024 | Restricts total number of read/write operations per second. | all|
|[NPROC](/limits/#number-of-processes) | number | 100 | Max number of processes within LVE | all|
|[EP](/limits/#entry-processes) | number | 20 | Limit on entry processes. Usually represents max number of concurrent connections to apache dynamic scripts as well as SSH and cron jobs running simultaneously. | all|



::: warning Note
It is always better to disable VMEM limits (set them to 0) in your system at all because they are deprecated and are causing unexpected issues.
:::

Bellow you can find recommendations for your typical shared hosting setup. The recommendations don't depend on the power of your server. They only depend on how "fast" you want your hosting accounts to be.

**Typical Hosting Account**

* <span class="notranslate">SPEED=100%</span>
* <span class="notranslate">PMEM=512MB</span>
* <span class="notranslate">VMEM=0</span>
* <span class="notranslate">IO=1024KB/s</span>
* <span class="notranslate">IOPS=1024</span>
* <span class="notranslate">NPROC=100</span>
* <span class="notranslate">EP=20</span>

**High End Hosting Account**

* <span class="notranslate">SPEED=200%</span>
* <span class="notranslate">PMEM=1GB</span>
* <span class="notranslate">VMEM=0</span>
* <span class="notranslate">IO=4096KB/s</span>
* <span class="notranslate">IOPS=1024</span>
* <span class="notranslate">NPROC=100</span>
* <span class="notranslate">EP=40</span>

## Understanding limits

* [Checking if LVE is installed](/limits/#checking-if-lve-is-installed)
* [Controlling LVE limits](/limits/#controlling-lve-limits)
* [Checking LVE usage](/limits/#checking-lve-usage)

LVE is a kernel level technology developed by the CloudLinux team. The technology has common roots with container based virtualization and uses cgroups in its latest incarnation. It is lightweight and transparent. The goal of LVE is to make sure that no single web site can bring down your web server.

Today, a single site can consume all <span class="notranslate"> CPU, IO, Memory</span> resources or Apache processes - and bring the server to a halt. LVE prevents that. It is done via collaboration of Apache module, PAM module and kernel.

[mod_hostinglimits](/cloudlinux_os_components/#hostinglimits-module-for-apache) is Apache module that:

* detects VirtualHost from which the request came;
* detects if it was meant for CGI or PHP script;
* puts Apache process used to serve that request into LVE for the user determined via SuexecUserGroup directive for that virtual host;
* lets Apache to serve the request;
* removes Apache process from user's LVE.

The kernel makes sure that all LVEs get fair share of the server's resources, and that no customer can use more then the limits set for that customer.
Today we can limit <span class="notranslate">CPU </span>, <span class="notranslate"> Memory </span> (virtual and physical), IO, number of processes as well as the number of entry processes (concurrent connections to apache).

Each LVE limits amount of entry processes (Apache processes entering into LVE) to prevent single site exhausting all Apache processes. If the limit is reached, then <span class="notranslate">mod_hostinglimits</span> will not be able to place Apache process into LVE, and will return error code 508. This way very heavy site would slow down and start returning 508 errors, without affecting other users.

* If the site is limited by <span class="notranslate"> CPU </span> or <span class="notranslate">IO</span>, then the site will start responding slower.
* If the site is limited by memory or number of processes limits, then the user will receive 500 or 503 errors that server cannot execute the script.

#### Checking if LVE is installed

To use LVE you should have CloudLinux kernel installed, and LVE module loaded. You can check the kernel by running the following command:

<div class="notranslate">

```
$ uname -r
```
</div>

You should see something like 2.6.32-896.16.1.lve1.4.53.el6.x86_64. The kernel should have lve in its name. To see if lve kernel module is loaded run:

<div class="notranslate">

```
$ lsmod|grep lve
lve                    46496  0
```
</div>

Starting from kernels lve1.4.x iolimits module is a part of kmod-lve and could not be used separately.

* You can toggle LVE on/off by editing <span class="notranslate">`/etc/sysconfig/lve`</span> and setting <span class="notranslate">`LVE_ENABLE`</span> variable to <span class="notranslate">`yes`</span> or <span class="notranslate">`no`</span>.

    Setting it to <span class="notranslate">`yes`</span> will enable LVE, setting it to <span class="notranslate">`no`</span> will disable LVE.

* You can toggle IO limits by editing <span class="notranslate">`/etc/sysconfig/iolimits`</span> and setting <span class="notranslate">`IO_LIMITS_ENABLED`</span> variable to <span class="notranslate">`yes`</span> or <span class="notranslate">`no`</span>.

You need to reboot the server, after you set this option to make the changes live.

#### Controlling LVE limits

The best way to control LVE limits is using <span class="notranslate">LVE Manager</span> in your favorite control panel. Alternatively, you can use command line tool `lvectl` to control limits.
The limits are saved in <span class="notranslate">`/etc/container/ve.cfg`</span> 

Example:

<div class="notranslate">

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
</div>

Sets <span class="notranslate">CPU</span> limit to 25%, <span class="notranslate">IO</span> limit to 1024KB/s, <span class="notranslate">virtual memory</span> limit to 1GB (memory limit is set as a number of 4096 bytes pages), <span class="notranslate">physical memory</span> limit to 1GB, <span class="notranslate"> CPU</span> cores per LVE to 1, maximum entry processes to 200 and no limit for number of processes for all LVEs. It also sets the limit of 30% and number of processes limit to 5 for LVE with ID 532.

#### Checking LVE usage


One of the best way to monitor current usage is [lvetop](/command-line_tools/#lvetop):

<div class="notranslate">

```
$ lvetop
         ID     EP    PNO    TNO    CPU    MEM    I/O
         test    1     2            2     2%    728     0   
```
</div>

You can also check the content of <span class="notranslate">`/proc/lve/list`</span> file that has all the data about LVE usage for all LVEs:

<div class="notranslate">

```
[root@localhost tests]$ cat /proc/lve/list 
4:LVE        EP        lCPU        lIO        CPU        MEM        IO        lMEM        lEP        nCPU        fMEM        fEP
0        0        75        25        0        0        0        262144        20        2        0        0
500        0        75        25        0        0        0        4294967 20        3        2        1        
700        1        75        25        1403247        202        0        262144        20        2        0        0
```
</div>

Additionally, you can use tool [lveps](/command-line_tools/#lveps) to see <span class="notranslate">CPU</span> usage, and processes within LVE.

## SPEED limit

:::tip Note
<span class="notranslate">lve-utils 1.4+</span>
:::

<span class="notranslate">CPU SPEED</span> limit allows to set <span class="notranslate">CPU</span> limit in terms of % of a single core, or as a fixed number of Hz.

<span class="notranslate">`--speed=XX%`</span> would set performance relative to one core.

For example:

* <span class="notranslate"> `--speed=50%` </span> would mean 1/2 core.
* <span class="notranslate"> `--speed=100%` </span> would mean 1 core,
* <span class="notranslate"> `--speed=150%` </span> would mean 1.5 cores

<span class="notranslate"> `--speed=XXmhz` </span> would automatically detect <span class="notranslate"> CPU </span> speed of each core, and adjust the <span class="notranslate"> CPU </span> scheduler to make sure user cannot go over that limit.

For example, on 1ghz <span class="notranslate"> CPU </span> , setting of <span class="notranslate"> `--speed=2ghz` </span> would mean 2 cores, while on 4ghz <span class="notranslate"> CPU </span> same setting would mean 1/2 of a core.

This should allow hosting companies to set same approximate performance level limits across different hardware using single setting.

:::tip Note
Note. We strongly recommend setting <span class="notranslate">CPU</span> speed limits not less than 100%. As such limits cause <span class="notranslate">CPU</span> context switching which leads to increased `%sys`.
:::

## Memory limit

Memory is controlled using virtual (VMEM) and physical (PMEM) memory limits.

### Virtual memory limit

Virtual memory limit corresponds to the amount of memory processes can allocate within LVE. You can see individual process virtual memory usage by monitoring <span class="notranslate">VIRT</span> column in <span class="notranslate"> top </span> output for the process.

When process tries to allocate more memory, CloudLinux checks if the new total virtual memory used by all processes within LVE is more then a limit set. In such case CloudLinux will prevent memory from being allocated and increments fVMEM counter. In most cases, but not all of them - this causes process to fail. For CGI/PHP scripts it will usually cause 500 and 503 error.

:::tip Note
It is recommended to disable VMEM limits (set them to 0) in your system at all because they are deprecated in CloudLinux 6 and 7 system and can cause unexpected issues.
:::

### Physical memory limit

Physical memory limit corresponds to the amount of memory actually used by end customer's processes. You can see individual process physical memory usage by monitoring RES column in top output for the process. Because similar processes (like PHP) share a lot of their memory, physical memory usage is often much lower then virtual memory usage.

Additionally physical memory includes shared memory used by the customer, as well as disk cache.
In case of disk cache – if a user is starting to lack physical memory, the memory used for disk cache will be freed up, without causing any memory faults.

When LVE goes over physical memory limit, CloudLinux will first free up memory used for disk cache, and if that is not enough, it will kill some of the processes within that LVE, and increment fPMEM counter. This will usually cause web server to serve 500 and 503 errors. Physical memory limit is a much better way to limit memory for shared hosting.

### Troubleshooting

* [Checking personal users disk cache (If lveinfo shows memory usage but there are no processes there)](/limits/#checking-personal-users-disk-cache-if-lveinfo-shows-memory-usage-but-there-are-no-processes-there)

#### Checking personal users disk cache (If lveinfo shows memory usage but there are no processes there)

If you see no processes under some user, but lve manager keeps telling it is using some memory, then most probably memory is taken by users disk cache. To check personal users disk cache (if lveinfo shows memory usage but not processes there) for CloudLinux 6:

<div class="notranslate">

```
cat /proc/bc/XXX/meminfo
```
</div>

On **CloudLinux 7 and CloudLinux 6 Hybrid** systems, the file is different:

<div class="notranslate">

```
cat /proc/bc/lveXXX/meminfo
```
</div>

Look for this line: <span class="notranslate"> `Cached: 67300 kB` </span>

On **CloudLinux 8 and CloudLinux 7 Hybrid** systems:

<div class="notranslate">

```
cat /sys/fs/cgroup/memory/lveXXX/memory.stat
```
</div>

Look for this line: <span class="notranslate"> `cache 1662976` </span>

where XXX is a user id, could be found out by:

<div class="notranslate">

```
id username
```
</div>

## IO

IO limits restrict the data throughput for the customer. They are in KB/s. When limit is reached, the processes are throttled (put to sleep). This makes sure that processes within LVE cannot go over the limit,. Yet don't stop working, nor getting killed – they just work slower when the limit is reached.

IO limits are available with kernels **el6.lve1.x** and higher.

The IO limits will only affect <span class="notranslate"> DISK IO</span>, and will have no effect on network. It also doesn't take into consideration any disk cache accesses. So, even if file is loaded from disk cache 1000 times – it will not be counted towards <span class="notranslate">IO</span> limits.

## IOPS

<span class="notranslate">IOPS</span> limits restrict the total number of read/write operations per second. When the limit is reached the read/write operations stop until current second expires.

## Entry processes

<span class="notranslate"> Entry processes </span> limit controls the number of entries into LVE. Each time a process 'enters' into LVE, we increment the counter. Each time process exits LVE, we decrement the counter. We don't count processes that are created inside LVE itself. It is also know as <span class="notranslate"> 'Apache concurrent connections' </span> limit.

The process enter's into LVE when there is a new HTTP request for CGI/PHP.

This limit was created to prevent DoS attacks against web server. One of the fairly popular attacks is to tie up all the Apache connections by hitting some slow page on a server. Once all Apache slots are used up, no one else will be able to connect to the web server, causing it to appear to be down. The issue is worsened by <span class="notranslate"> CPU </span> limits, as once site starts to get slow due to <span class="notranslate"> CPU </span> limit – it will respond to requests slower and slower, causing more and more connections to be tied up.

To solve that, we have created entry processes (often called concurrent connections) limit. It will limit the number of concurrent connections to Apache, causing web server to serve error 508 page (<span class="notranslate"> Resource Limit Reached</span>), once there number of concurrent requests for the site goes above the limit.

## Number of processes

<span class="notranslate"> NPROC </span> controls the total number of processes and threads within LVE. Once the limit is reached, no new process can be created (until another one dies). When that happens <span class="notranslate"> NPROC </span> counter is incremented. Apache might return 500 or 503 errors in such case.

## Inodes

:::tip Note
Supported on cPanel, Plesk, and DirectAdmin control panels
:::

<span class="notranslate"> LVE Manager inodes </span> limits extension allows setting <span class="notranslate"> inode </span> limits for the customers. An <span class="notranslate"> inode </span> is a data structure on a file system used to keep information about a file or a folder. The number of <span class="notranslate"> inodes </span> indicates the number of files and folders an account has. <span class="notranslate"> inodes </span> limits work on the level of <span class="notranslate"> disk quota </span> , and will be enabled on <span class="notranslate"> /home </span> partition only.

<span class="notranslate"> LVE Manager </span> allows to set <span class="notranslate"> soft </span> and <span class="notranslate"> hard IO </span> limit.

* <span class="notranslate"> Hard </span> limit prevents a user from writing data to disk.

* <span class="notranslate"> Soft </span> limit can be exceeded for a period of time. The grace period can be set using: <span class="notranslate"> edquota -t </span> .

* You can set <span class="notranslate"> inodes </span> limits using <span class="notranslate"> LVE Manager </span> , the same way you would set any other LVE Limits:

::: tip Note
We do not collect statistical information on the inodes like we do for other LVE limits.
:::

The limits can be set on the level of individual [account](/lve_manager/#actions) or [package](/lve_manager/#packages).

Sometimes <span class="notranslate">disk quota</span> breaks, so do <span class="notranslate"> inodes </span> limits. You can reset them through the <span class="notranslate">_Options_</span> tab of <span class="notranslate">LVE Manager</span>:

![](/images/inodelimitsoptions_zoom70.png)

The same can be achieved using [cloudlinux-config](/command-line_tools/#cloudlinux-config) CLI utility

End users can monitor their inodes usage through cPanel only (not available on Plesk and DirectAdmin):

![](/images/inodescpanel.png)

End user can also see the usage inside resource usage menu.

## Network traffic bandwidth control and accounting system

:::tip Note
Requires kernel lve1.4.4.el6 or higher, or lve1.4.56.el7 or higher
:::

Network traffic bandwidth control and accounting systems in CloudLinux 6 allows for each LVE container:

* Limiting outgoing network traffic bandwidth
* Accounting incoming and outgoing network traffic

:::tip Note
The system supports IPv4 only protocol.
:::

### How to limit outgoing network traffic

All outgoing IP packets generated inside LVE container are marked with LVE identifier. Traffic control utility tc from iproute2 package uses this marker to set required bandwidth.

:::tip Note
CloudLinux doesn’t limit the network traffic itself, it only marks IP packets with specific LVE id.
:::

**Example 1:**

1. We create class with <span class="notranslate"> HTB qdiscs </span> and rate <span class="notranslate"> 10kbit </span>:

<div class="notranslate">

```
tc qdisc add dev eth1 root handle 1: htb

tc class add dev eth1 parent 1: classid 1:1 htb rate 10kbit
```
</div>

2. All packets marked with LVE id will be processed by class 1:1 (rate <span class="notranslate"> 10kbit </span>).

<div class="notranslate">

```
tc filter add dev eth1 parent 1: handle 2121 fw flowid 1:1
```
</div>

**Example 2:**

1. As an example we create class with <span class="notranslate"> HTB qdiscs </span> and rate <span class="notranslate">100mbit</span> and class 1:10 will be used by default:

<div class="notranslate">

```
tc qdisc add dev eth3 root handle 1: htb default 10

tc class add dev eth3 parent 1: classid 1:1 htb rate 100mbit
```
</div>

2. For class 1:1 we create two branches with rate 5 <span class="notranslate"> mbit </span> and 10 <span class="notranslate"> kbit </span> accordingly, with classid 1:10 and 1:20.

<div class="notranslate">

```
tc class add dev eth3 parent 1:1 classid 1:10 htb rate 5mbit

tc class add dev eth3 parent 1:1 classid 1:20 htb rate 10kbit
```
</div>

3. All packets marked with LVE id=2121 are processed by 10 kbit class.

<div class="notranslate">

```
tc filter add dev eth3 protocol ip parent 1: prio 1 handle 2121 fw flowid 1:20

```
</div>

More info about `tc` and its syntax can be found on the link [http://tldp.org/HOWTO/Traffic-Control-HOWTO/index.html](http://tldp.org/HOWTO/Traffic-Control-HOWTO/index.html)

### Traffic accounting

Traffic accounting is performed for each LVE container. Network statistics is collected at <span class="notranslate">`/proc/lve/list`</span> file. Network-related data found at fields:

* <span class="notranslate">`lNETO`</span> - output traffic limit by volume, equals 0*
* <span class="notranslate">`lNETI`</span> - input traffic limit by volume, equals 0*
* <span class="notranslate">`NETO`</span> - current outgoing traffic value
* <span class="notranslate">`NETI`</span> - current incoming traffic value

The data is also collected at <span class="notranslate">`/proc/lve/per-lve/<id>/net_stat`</span>, where `id` is an LVE container identifier.

<span class="notranslate">`net_stat`</span> file contains 4 values in one row:

* Outgoing traffic limit by volume, equals 0*
* Incoming traffic limit by volume, equals 0*
* Current outgoing traffic value
* Current incoming traffic value

:::tip Note
The current version of CloudLinux network control system doesn’t limit network traffic volume for a specific period of time (for example 3GB per day), it limits only network bandwidth.

Network limits are supported only for processes inside LVE. By default it does not limit static content, but only PHP/cgi scripts processed by Apache and processes launched over ssh etc.
:::


## Limits validation

* [Exceptions list (validation is not supported)](/limits/#exceptions-list-validation-is-not-supported)
* [Existing limits validation](/limits/#existing-limits-validation)
* [Best practice](/limits/#best-practice)

Starting from <span class="notranslate">**lve-utils**</span> **version 3.1-1**, the validation of EP and NPROC limits is supported. If an administrator sets the NPROC limit less than (EP + 15), the following warning is shown:

<div class="notranslate">

```
error: You're trying to set invalid LVE limits.
NPROC limit must be greater than EP + 15 limit, because number of processes and threads within LVE includes
also Apache processes/threads, SSH sessions and etc, which enter into LVE.
```
 </div>

Validation does not affect limits operation in any way. Even if invalid limits have been set, they will be applied for users/resellers.

Commands that support validation:

1. <span class="notranslate">`lvectl set`</span>

This command allows validation of an LVE ID which does not have a corresponding UID in the system. I.e., you can set limits for any LVE ID and they can be validated.


2. <span class="notranslate">`lvectl set-user`</span>

This command allows validation when setting limits using a user name instead of LVE ID.


3. <span class="notranslate">`lvectl set-reseller`</span>

This command supports limits validation both for inactive reseller and active one.

4. <span class="notranslate">`lvectl set-reseller-default`</span>

This command supports validation when setting default limits for a reseller.


5. <span class="notranslate">`lvectl package-set`</span>

This command supports limits validation both for packages existing in the system and nonexisting ones.


6. The <span class="notranslate">`cloudlinux-package`</span> and <span class="notranslate">`cloudlinux-limits`</span> commands support all validation types described above, and support limits validation and exceptions lists as described below.

#### Exceptions list (validation is not supported)


1.    a) When EP limit for a package is greater than a custom NPROC limit for a user included in this package.

 **OR**
 
 b) when NPROC limit for a package is less than a custom EP limit for a user included in this package.
 

2.    a) When default EP limit for a hoster is greater than a custom NPROC limit for a user/package which inherits the default limit.

 **OR**
 
 b) When default NPROC limit for a hoster is less than a custom EP limit for a user/package which inherits the default limit.
 

3. When using the following commands:

 a) <span class="notranslate">`lvectl set-reseller --all`</span>

 b) <span class="notranslate">`cloudlinux-limits --json enable-reseller-limits --all`</span>


#### Existing limits validation

 
The automatic validation using <span class="notranslate">`cldiag`</span> utility by cron job is enabled on a server by default. You can disable it in the <span class="notranslate">`/etc/sysconfig/cloudlinux`</span> config file using <span class="notranslate">`ENABLE_CLDIAG`</span> option (**Warning!** This option disables all automatic checks using cldiag!) When calling this utility automatically by cron, it checks all limits existing on the server and send an administrator a report with limits check results. You can use the following command to validate existing limits: <span class="notranslate">`cldiag --check-lve-limits`</span>.


The important difference between checking existing and setting limits is that even if validation fails when setting limits (see exceptions list above), checking existing limits will catch invalid limits in any case. I.e. even if a server administrator set invalid limits, validation of existing limits will catch invalid limit in any case.

#### Best practice

Set NPROC limit greater than (EP + 15).



## Compatibility matrix


| |  |  |  |  |  |  | |
|-|--|--|--|--|--|--|-|
|<span class="notranslate"> Web Server / PHP </span> | <span class="notranslate"> CPU </span> | <span class="notranslate"> Virtual & Physical Memory </span> | <span class="notranslate"> EP </span> | NPROC | <span class="notranslate"> IO </span> | CageFS | <span class="notranslate"> PHP Selector </span>|
|Apache / suPHP | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / FCGID | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / CGI | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / PHP-FPM | Yes<sup> 2</sup> | Yes | Yes | Yes | Yes | Yes<sup> 2</sup> | No|
|Apache / mod_php (DSO) | Yes | No | Yes | Yes | Yes | No | No|
|Apache / mod_ruid2 | Yes | No | Yes | Yes | Yes | No | No|
|Apache / MPM ITK | Yes | No | Yes | Yes | Yes | Yes<sup> 1</sup> | No|
|LiteSpeed | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|NGINX / PHP-FPM | Yes<sup> 2</sup> | Yes | No | Yes | Yes | Yes | No|
|SSH | Yes | Yes | Yes | Yes | Yes | Yes<sup> 2</sup> | Yes|
|<span class="notranslate">Cron Jobs</span> | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|<span class="notranslate">Apache / mod_lsapi</span> | Yes | Yes | Yes | Yes | Yes | Yes | Yes|

1. Requires patched version of MPM-ITK. CL httpd RPM has ITK worker with the patch. Patch is also available at: [https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)
2. PHP binaries from sources other than DirectAdmin/CloudLinux OS require recompile with patches available at: [https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)


:::tip Note
Please note that mod_lsapi does not work when php-fpm is enabled because php-fpm is also a PHP Handler just as mod_lsapi.
:::

:::tip Note
<span class="notranslate">`mod_lsapi`</span> is an Apache module whilst LiteSpeed is a standalone solution and does not use any of Apache modules (since it provides its own implementation of these modules). Moreover, it is advised to leave your Apache configuration as is just in case you decide to switch back from LiteSpeed.
:::


## Reseller limits

**Reseller limits** is a feature that allows hosters to limit the resources each reseller can operate. Reseller limits put a restriction on the cumulative resources this reseller and his end-users can use at any given moment in time.  

Reseller limits feature also enables hosters to give their resellers controls over the end-user’s resources. Resellers can assign limits to their end-users as they want, even if they are higher than the limits assigned to the reseller. The reseller’s end-users will not be limited by the reseller limits unless their **cumulative usage** goes above the limits the hoster assigned to their reseller.

:::warning
Reseller cannot manage INODE or MYSQL limits. Neither his own, nor for his users.
:::

- [Design](/limits/#design)
- [Requirements](/limits/#requirements)
- [Configuration](/limits/#configuration)
    - [Enabling Reseller limits](/limits/#enabling-reseller-limits)
    - [How to disable Reseller limits](/limits/#how-to-disable-reseller-limits)
    - [More resources](/limits/#more-resources)

### Design

To understand the qwirks of how Reseller Limits operate, we need to look more closely into the four types of users that a typical shared hosting server has:

![](/images/ResellerLimits-diagram.png)

Reseller himself (green box on the scheme) is a virtual entity. When a hoster enables reseller limits, the entity itself cannot hit the limits. There is usually an end-user with the same username as the reseller that acts as a regular reseller’s end-user. When the hoster sets Reseller limits, he limits the group of end-users he owns, including the reseller's end-user with the same username.  

Resellers can configure their end-users limits differently. There are several scenarios when Reseller limits will get activated:  

- A reseller can assign limits to their end-users that are higher than the limits hoster assigned to this reseller. In this case, the end-user will be limited by reseller limit when he reaches it. 
- A reseller can assign limits to their end-users that are lower than the limits hoster assigned to this reseller. In this case, the end-user will be limited by his limit and not by the reseller limits when he reaches it.
- Reseller limits will get activated when all reseller’s resources are consumed by his users at any given moment.

As you probably have already understood, the reseller will technically be able to assign his/her end-users limits higher than his Reseller limits. However, it won’t be possible for the end-users to go over the reseller limits no matter what his individual limit is.

### Requirements

1. CloudLinux OS should be [installed](/cloudlinux_installation/) on the server.
2. You also need to check that your kernel supports Reseller limits feature
    * CloudLinux 6 and kernels **2.16+**: not supported, you need to [migrate to Hybrid](/cloudlinux_os_kernel/#how-to-migrate-from-the-normal-to-hybrid-channel-cl6h).
    * CloudLinux 6 Hybrid: supported starting from **3.10.0-714.10.2.lve1.5.3.el6h** kernel.
    * CloudLinux 7: supported starting from **3.10.0-714.10.2.lve1.5.3.el7** kernel.
    * CloudLinux 7 Hybrid: supported
    * CloudLinux 8: supported 
3. lvemanager package version **3.0-18+** and later installed. If you don’t have it, update your system

### Configuration

#### Enabling Reseller limits 

If you have decided to jump on board and enable Reseller limits for your resellers you should do the following:

1. Make sure that you run CloudLinux with the kernel and lvemanager that meets the [necessary requirements](/limits/#requirements). 
2. Log in with a hoster access.
3. You can create a new reseller account or configure an existing reseller account to have Reseller limits enabled. Consult your control panel documentation on how to do that.
4. For cPanel servers when creating an account, make sure to tick two checkboxes **Make this account a reseller** and **Make the account own itself** in the _Reseller Settings_ box.

![](/images/ResellerLimits-cPanel.png)

Selecting **Make the account own itself** makes the reseller full owner of all his accounts, including the end-user account with the same username. This option is integral to making reseller limits work for the reseller account. If you don’t select it, Reseller limits will not be applied. If the reseller account you want to limit with Reseller limits has already existed, you need to make sure it is properly owned. Go to _WHM_ -> _Modify account_ -> find the account with the same username as your reseller -> change the owner to the username of your reseller.

5. Now that preparations are done, go to _CloudLinux LVE Manager_ -> _Users_ tab, choose a reseller and click on the pencil icon.
6. When the pop-up opens, move the slider _Manage Limits_ -> Click _AGREE_  when asked _Are you sure you want to enable limits_ -> assign the limits to that reseller. Finally, click _Save_.

![](/images/ResellerLimits-enabling.png)

:::tip 
When you move a user from one reseller to another on DirectAdmin you need to manually change its package because the packages aren’t moved together with users. If you don’t reassign the package, the limits for the user you have moved will be reset to default. 
:::

#### How to disable Reseller limits

1. Go to the _Users_ tab, choose a particular reseller and click on the pencil icon.
2. In the pop-up move the slider _Manage Limits_. Click _AGREE_ for the question _Are you sure you want to disable limits_. Then click _Save_.

If you disable Reseller limits everything will work the same as before. All the end user limits set by the reseller will be saved. But all custom default reseller limits will be disabled.


#### More resources

It is possible that you still have some questions left unanswered about Reseller limits. That’s why we have more knowledge sources that you can check out:

- [FAQ section in our support knowledgebase](https://cloudlinux.zendesk.com/hc/en-us/articles/115005515269-CloudLinux-Reseller-Limits-FAQ)
- [Reseller limits UI explained](/lve_manager/#reseller-interface)
