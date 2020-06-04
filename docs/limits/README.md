# Limits

* [Understanding limits](/limits/#understanding-limits)
* [SPEED limit](/limits/#speed-limit)
* [Memory limit](/limits/#memory-limit)
* [IO](/limits/#io)
* [IOPS](/limits/#iops)
* [Entry processes](/limits/#entry-processes)
* [Number of processes](/limits/#number-of-processes)
* [Network traffic bandwidth control and accounting system](/limits/#network-traffic-bandwidth-control-and-accounting-system)
* [Limits validation](/limits/#limits-validation)
* [Compatibility matrix](/limits/#compatibility-matrix)

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
|Apache / PHP-FPM | Yes<sup> 3</sup> | Yes | Yes | Yes | Yes | Yes<sup> 3</sup> | No|
|Apache / mod_php (DSO) | Yes | No | Yes | Yes | Yes | No | No|
|Apache / mod_ruid2 | Yes | No | Yes | Yes | Yes | No | No|
|Apache / MPM ITK | Yes | No | Yes | Yes | Yes | Yes<sup> 1</sup> | No|
|LiteSpeed | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|NGINX / PHP-FPM | Yes<sup> 3</sup> | Yes | No | Yes | Yes | Yes | No|
|SSH | Yes | Yes | Yes | Yes | Yes | Yes<sup> 3</sup> | Yes|
|<span class="notranslate"> Cron Jobs </span> | Yes | Yes | Yes | Yes | Yes | Yes | Yes|

1. Requires patched version of MPM-ITK. CL httpd RPM has ITK worker with the patch. Patch is also available at: [https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)
3. The DirectAdmin and CloudLinux PHP provide patched version. For other PHP distributions, please use patches available here: [https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)


:::tip Note
Please note that mod_lsapi does not work when php-fpm is enabled because php-fpm is also a PHP Handler just as mod_lsapi.
:::

:::warning Note
LiteSpeed is not compatible with <span class="notranslate">`mod_lsapi`</span> so we recommend it being disabled before installing LiteSpeed. The reason is that all the functionality that <span class="notranslate">`mod_lsapi`</span> offers is already built directly in LiteSpeed and by using <span class="notranslate">`mod_lsapi`</span> it can cause issues and performance decreases.
:::

<Disqus/>