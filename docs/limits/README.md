# Limits

CloudLinux has support for the following limits:

| |  |  |  | |
|--|---|--|--|--|
|Limits | Units | Default Value | Description | Supported Kernels / OS|
|<span class="notranslate"> [SPEED](/limits/#speed-limits) </span> | % of a core, or HZ | 100% | <span class="notranslate"> CPU </span> speed limit, relative to a single core, or specified in HZ (portable across <span class="notranslate"> CPU </span> s) | all|
|<span class="notranslate"> CPU </span> [deprecated] | % of <span class="notranslate"> CPU </span> | 25% | <span class="notranslate"> CPU </span> Limit (smallest of <span class="notranslate"> CPU </span> & NCPU is used) | all|
|[NCPU](/limits/#cpu-limits) [deprecated] | number of cores | 1 CORE | Max number of cores (smallest of <span class="notranslate"> CPU </span> & NCPU used) | all|
|[PMEM](/limits/#memory-limits) | KB | 1024MB | Physical memory limit (RSS field in ps/RES in top). Also includes shared memory and disk cache | CL5 hybrid kernel, CL5 lve1.x+ kernel, CL6 and CL7|
|[VMEM](/limits/#memory-limits) | KB | 0 | Virtual memory limit (VSZ field in ps/VIRT in top) | all|
|[IO](/limits/#io) | KB/sec | 1024KB/sec | IO throughput - combines both read & write operations | CL7, CL6 lve1.1.9+ kernel|
|IOPS [lve1.3+] | Operations per second | 1024 | Restricts total number of read/write operations per second. | CL7 and CL6|
|[NPROC](/limits/#number-of-processes) | number | 100 | Max number of processes within LVE | CL6 and CL7|
|[EP](/limits/#entry-processes) | number | 20 | Limit on entry processes. Usually represents max number of concurrent connections to apache dynamic scripts as well as SSH and cron jobs running simultaneously. | all|

::: tip Note
It is always better to disable VMEM limits (set them to 0) in your system at all because they are deprecated in CloudLinux 6/7 system and are causing unexpected issues.
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

## Understanding LVE

LVE is a kernel level technology developed by the CloudLinux team. The technology has common roots with container based virtualization and uses cgroups in its latest incarnation. It is lightweight and transparent. The goal of LVE is to make sure that no single web site can bring down your web server.

Today, a single site can consume all <span class="notranslate"> CPU, IO, Memory</span> resources or Apache processes - and bring the server to a halt. LVE prevents that. It is done via collaboration of Apache module, PAM module and kernel.

[mod_hostinglimits](/limits/#hostinglimits) is Apache module that:

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

### Checking if LVE is installed

To use LVE you should have CloudLinux kernel installed, and LVE module loaded. You can check the kernel by running the following command:

<div class="notranslate">

```
$ uname -r
```
</div>

You should see something like 2.6.18-294.8.1.el5.lve0.8.60. The kernel should have lve in its name. To see if lve kernel module is loaded run:

<div class="notranslate">

```
$ lsmod|grep lve
lve                    46496  0
```
</div>

Starting from kernels lve1.4.x iolimits module is a part of kmod-lve and could not be used separately.

* You can toggle LVE on/ff by editing <span class="notranslate">`/etc/sysconfig/lve`</span> and setting <span class="notranslate">`LVE_ENABLE`</span> variable to <span class="notranslate">`yes`</span> or <span class="notranslate">`no`</span>.

    Setting it to <span class="notranslate">`yes`</span> will enable LVE, setting it to <span class="notranslate">`no`</span> will disable LVE.

* You can toggle IO limits by editing <span class="notranslate">`/etc/sysconfig/iolimits`</span> and setting <span class="notranslate">`IO_LIMITS_ENABLED`</span> variable to <span class="notranslate">`yes`</span> or <span class="notranslate">`no`</span>.

You need to reboot the server, after you set this option to make the changes live.

### Controlling LVE Limits

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

### Checking LVE Usage


One of the best way to monitor current usage is [lvetop](/limits/#lvetop):

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

Additionally you can use tool lveps to see <span class="notranslate">CPU</span> usage, and processes within LVE.

## LVE Limits Validation

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

### Exceptions List (validation is not supported)


1.    a) When EP limit for a package is greater than a custom NPROC limit for a user included in this package.

 **OR**
 
 b) when NPROC limit for a package is less than a custom EP limit for a user included in this package.
 

2.    a) When default EP limit for a hoster is greater than a custom NPROC limit for a user/package which inherits        the default limit.

 **OR**
 
 b) When default NPROC limit for a hoster is less than a custom EP limit for a user/package which inherits the default limit.
 

3. When using the following commands:

 a) <span class="notranslate">`lvectl set-reseller --all`</span>

 b) <span class="notranslate">`cloudlinux-limits --json enable-reseller-limits --all`</span>


### Existing Limits Validation

 
The automatic validation using <span class="notranslate">`cldiag`</span> utility by cron job is enabled on a server by default. You can disable it in the <span class="notranslate">`/etc/sysconfig/cloudlinux`</span> config file using <span class="notranslate">`ENABLE_CLDIAG`</span> option (**Warning!** This option disables all automatic checks using cldiag!) When calling this utility automatically by cron, it checks all limits existing on the server and send an administrator a report with limits check results. You can use the following command to validate existing limits: <span class="notranslate">`cldiag --check-lve-limits`</span>.


The important difference between checking existing and setting limits is that even if validation fails when setting limits (see exceptions list above), checking existing limits will catch invalid limits in any case. I.e. even if a server administrator set invalid limits, validation of existing limits will catch invalid limit in any case.

### Best Practice

Set NPROC limit greater than (EP + 15).


## SPEED Limits

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

## CPU Limits

:::tip Note
Deprecated

This limit is no longer used, and <span class="notranslate"> [SPEED](/limits/#speed-limits) </span> is used instead
:::

### CPU limits before lve-utils 1.4

<span class="notranslate"> CPU </span> Limits are set by <span class="notranslate"> CPU </span> and <span class="notranslate"> NCPU </span> parameters. <span class="notranslate"> CPU </span> specifies the % of total <span class="notranslate"> CPU </span> of the server available to LVE. <span class="notranslate"> NCPU </span> specifies the number of cores available to LVE. The smallest of the two is used to define how much <span class="notranslate"> CPU </span> power will be accessible to the customer.

| |  |  | |
|-|--|--|-|
|Cores Per Server | <span class="notranslate"> CPU </span> Limit | <span class="notranslate"> NCPU </span> Limit | Real limit|
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

When user hits <span class="notranslate"> CPU </span> limit, processes within that limit are slowed down. For example, if you set your <span class="notranslate"> CPU </span> limit to 10%, and processes inside LVE want to use more then 10% they will be throttled (put to sleep) to make sure they don't use more then 10%. In reality, processes don't get <span class="notranslate"> CPU </span> time above the limit, and it happens much more often then 1 second interval, but the end result is that processes are slowed down so that their usage is never above the <span class="notranslate"> CPU </span> limit set.

## Memory Limits

Memory is controlled using virtual (VMEM) and physical (PMEM) memory limits.

### Virtual Memory Limit

Virtual memory limit corresponds to the amount of memory processes can allocate within LVE. You can see individual process virtual memory usage by monitoring <span class="notranslate"> VIRT </span> column in <span class="notranslate"> top </span> output for the process.

When process tries to allocate more memory, CloudLinux checks if the new total virtual memory used by all processes within LVE is more then a limit set. In such case CloudLinux will prevent memory from being allocated and increments fVMEM counter. In most cases, but not all of them - this causes process to fail. For CGI/PHP scripts it will usually cause 500 and 503 error.

:::tip Note
It is recommended to disable VMEM limits (set them to 0) in your system at all because they are deprecated in CloudLinux 6 and 7 system and can cause unexpected issues.
:::

### Physical Memory Limit

Physical memory limit corresponds to the amount of memory actually used by end customer's processes. You can see individual process physical memory usage by monitoring RES column in top output for the process. Because similar processes (like PHP) share a lot of their memory, physical memory usage is often much lower then virtual memory usage.

Additionally physical memory includes shared memory used by the customer, as well as disk cache.
In case of disk cache – if a user is starting to lack physical memory, the memory used for disk cache will be freed up, without causing any memory faults.

When LVE goes over physical memory limit, CloudLinux will first free up memory used for disk cache, and if that is not enough, it will kill some of the processes within that LVE, and increment fPMEM counter. This will usually cause web server to serve 500 and 503 errors. Physical memory limit is a much better way to limit memory for shared hosting.

### Troubleshooting

#### **Checking personal users disk cache (If lveinfo shows memory usage but there are no processes there)**

If you see no processes under some user, but lve manager keeps telling it is using some memory, then most probably memory is taken by users disk cache. To check personal users disk cache (if lveinfo shows memory usage but not processes there):

<div class="notranslate">

```
cat /proc/bc/XXX/meminfo
```
</div>

…

Cached: 67300 kB

…

where XXX is user id, could be taken with:

<div class="notranslate">

```
id username
```
</div>

<div class="notranslate">

## IO

</div>

IO limits restrict the data throughput for the customer. They are in KB/s. When limit is reached, the processes are throttled (put to sleep). This makes sure that processes within LVE cannot go over the limit,. Yet don't stop working, nor getting killed – they just work slower when the limit is reached.

IO limits are available with kernels **el6.lve1.x** and higher.

The IO limits will only affect <span class="notranslate"> DISK IO</span>, and will have no effect on network. It also doesn't take into consideration any disk cache accesses. So, even if file is loaded from disk cache 1000 times – it will not be counted towards <span class="notranslate">IO</span> limits.

<div class="notranslate">

## IOPS

</div>

<span class="notranslate">IOPS</span> limits restrict the total number of read/write operations per second. When the limit is reached the read/write operations stop until current second expires.

<div class="notranslate">

## Entry Processes

</div>

<span class="notranslate"> Entry processes </span> limit controls the number of entries into LVE. Each time a process 'enters' into LVE, we increment the counter. Each time process exits LVE, we decrement the counter. We don't count processes that are created inside LVE itself. It is also know as <span class="notranslate"> 'Apache concurrent connections' </span> limit.

The process enter's into LVE when there is a new HTTP request for CGI/PHP.

This limit was created to prevent DoS attacks against web server. One of the fairly popular attacks is to tie up all the Apache connections by hitting some slow page on a server. Once all Apache slots are used up, no one else will be able to connect to the web server, causing it to appear to be down. The issue is worsened by <span class="notranslate"> CPU </span> limits, as once site starts to get slow due to <span class="notranslate"> CPU </span> limit – it will respond to requests slower and slower, causing more and more connections to be tied up.

To solve that, we have created entry processes (often called concurrent connections) limit. It will limit the number of concurrent connections to Apache, causing web server to serve error 508 page (<span class="notranslate"> Resource Limit Reached</span>), once there number of concurrent requests for the site goes above the limit.

<div class="notranslate">

## Number of Processes

</div>

<span class="notranslate"> NPROC </span> controls the total number of processes and threads within LVE. Once the limit is reached, no new process can be created (until another one dies). When that happens <span class="notranslate"> NPROC </span> counter is incremented. Apache might return 500 or 503 errors in such case.


## Network Traffic Bandwidth Control and Accounting System

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

All outgoing IP packets generated inside LVE container and marked with LVE identifier. Traffic control utility tc from iproute2 package uses this marker to set required bandwidth.

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




## Compatibility Matrix


| |  |  |  |  |  |  | |
|-|--|--|--|--|--|--|-|
|<span class="notranslate"> Web Server / PHP </span> | <span class="notranslate"> CPU </span> | <span class="notranslate"> Virtual & Physical Memory </span> | <span class="notranslate"> EP </span> | NPROC | <span class="notranslate"> IO </span> | CageFS | <span class="notranslate"> PHP Selector </span>|
|Apache / suPHP | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / FCGID | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / CGI | Yes | Yes | Yes | Yes | Yes | Yes | Yes|
|Apache / PHP-FPM | Yes<sup> 3</sup> | Yes | Yes | Yes | Yes | Yes<sup> 3</sup> | No|
|Apache / mod_php | Yes | No | Yes | Yes | Yes | No | No|
|Apache / mod_ruid2 | Yes | No | Yes | Yes | Yes | No | No|
|Apache / MPM ITK | Yes | No | Yes | Yes | Yes | Yes<sup> 1</sup> | No|
|LiteSpeed | Yes | Yes<sup> 2</sup> | Yes | Yes | Yes | Yes | Yes|
|NGINX / PHP-FPM | Yes<sup> 3</sup> | Yes | No | Yes | Yes | Yes | No|
|SSH | Yes | Yes | Yes | Yes | Yes | Yes<sup> 3</sup> | Yes|
|<span class="notranslate"> Cron Jobs </span> | Yes | Yes | Yes | Yes | Yes | Yes | Yes|

1. Requires patched version of MPM-ITK. CL httpd RPM has ITK worker with the patch. Patch is also available at: [http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)
2. CloudLinux 7 and CloudLinux 6 kernels only. 3. The DirectAdmin and CloudLinux PHP provide patched version. For other PHP distributions, please use patches available here: [http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)


:::tip Note
Please note that mod_lsapi does not work when php-fpm is enabled because php-fpm is also a PHP Handler just as mod_lsapi.
:::

## Integration Components

CloudLinux uses various ways to integrate with existing system. By default we can integrate with:

* PAM - using pam_lve
* Apache - using mod_hostinglimits, apr library, patched suexec
* LiteSpeed - built in integration

### LVE PAM module

pam_lve.so is a PAM module that sets up LVE environment. It provides easy way to setup LVE for SSH sessions, as well as other PAM enabled applications, such as crontab, su, etc.

pam_lve.so is installed by default when you convert existing server.

Installation:

<div class="notranslate">

```
# yum install pam_lve
```
</div>

After you install <span class="notranslate"> RPM </span>, add the following line to the PAM config file for the required application:

<div class="notranslate">

```
session    required     pam_lve.so 500 1 wheel,other
```
</div>

In this line:
* 500 stands for minimum UID for which LVE will be setup. For any user with UID < 500, LVE will not be setup. If <span class="notranslate">CageFS</span> is installed, use:
<span class="notranslate">`cagefsctl --set-min-uid UID`</span> to setup minimum UID. The parameter in PAM files will be ignored in that case.
* 1 stands for <span class="notranslate">CageFS</span> enabled (0 – <span class="notranslate">CageFS</span> disabled)
* 3rd optional argument defines group of users that will not be placed into LVE or <span class="notranslate">CageFS</span>. Starting with **pam_lve 0.3-7** you can specify multiple groups, comma separated.

:::tip Warning
It is crucial to place all users that su or sudo to root into that group. Otherwise, once such user gains root, user will be inside LVE, and all applications restarted by that user will be inside that user LVE as well.
:::

For example, to enable LVE for SSH access, add that line to the `/etc/pam.d/sshd`. To enable LVE for SU, add that line to the `/etc/pam.d/su`.

By default, module will not place users with group wheel into lve. If you want to use different group to define users that will not be placed into LVE by pam_lve - pass it as the 3rd argument.

:::tip Warning
Be careful when you test it, as if you incorrectly add this line to the `/etc/pam.d/sshd`, it will lock you out ssh. Don't log out of your current SSH session, until you sure it works.
:::

For preventing cases when user enters under usual user (using ssh) and then tries to enter as super user (via sudo or su) - pam_sulve was created, which tries to enter to LVE=1 and leaves it right away. If action fails, user gets message:

<div class="notranslate">

```
!!!!  WARNING: YOU ARE INSIDE LVE !!!!
```
</div>

To check if pam_sulve is enabled on the server:

<div class="notranslate">

```
grep pam_sulve.so /etc/pam.d/*
```
</div>

should not be empty.

### LVE Wrappers

LVE Wrappers are the set of tools that allow system administrator to run various users, programs & daemons within Lightweight Virtual Environment. This allows system administrator to have control over system resources such program can have. Additionally it prevents misbehaving programs running within LVE to drain system resources and slow down or take down the whole system. The tools are provided by lve-wrappers RPM.

You can install them by running:

<div class="notranslate">

```
$ yum install lve-wrappers
```
</div>

#### **Placing programs inside LVE**

LVE Wrappers provide two tools for placing programs inside LVE: <span class="notranslate">`lve_wrapper`</span> and `lve_suwrapper`.

`/bin/lve_wrapper` can be used by any non-root user, as long as that user is in group lve (see `/etc/groups` file).

**Syntax**

<div class="notranslate">

```
lve_wrapper <command_to_run>
```
</div>

**Example**

<div class="notranslate">

```
$ lve_wrapper make install
```
</div>

The program will be executed within LVE with ID matching user's id.

`/bin/lve_suwrapper` can be used by root user or any user in group lve (see `/etc/groups` file) to execute command within specified LVE.

**Syntax**

<div class="notranslate">

```
lve_suwrapper LVE_ID <command_to_run>
```
</div>

**Example**

<div class="notranslate">

```
# lve_suwrapper 10000 /etc/init.d/postgresql start
```
</div>

**Switches**

* `-f` - force namespace
* `-n` - without namespace

### MPM ITK

CloudLinux <span class="notranslate">httpd RPM</span> comes with <span class="notranslate"> MPM ITK </span> built in. Yet, if you would like to build your own Apache, you need to apply our patch for <span class="notranslate"> MPM ITK </span>

* Download file: [http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)
* Extract: <span class="notranslate">apache2.2-mpm-itk-seculrelve12.patch</span>
* And apply this patch to your Apache source code.

When running <span class="notranslate"> MPM ITK </span>, you should disable <span class="notranslate">mod_hostinglimits</span>. All the functionality needed by <span class="notranslate"> MPM ITK </span> is already built into the patch.

Directives which can be used by Apache with <span class="notranslate"> ITK </span> patch:

* <span class="notranslate">`AssignUserID`</span> - uses ID as LVE ID
* <span class="notranslate">`LVEErrorCodeITK`</span> - error code to display on LVE error (508 by default)
* <span class="notranslate">`LVERetryAfterITK`</span> - same as <span class="notranslate">`LVERetryAfter`</span> - respond with <span class="notranslate">`Retry-After`</span> header when LVE error 508 occurs
* <span class="notranslate">`LVEId`</span> - ovverides id used for LVE ID instead of <span class="notranslate">`AssignUserID`</span>
* <span class="notranslate">`LVEUser`</span> - overrides user to use to retrieve LVE ID, instead of AssignUserID

### HostingLimits module for Apache

mod_hostinglimits works with existing <span class="notranslate"> CGI/PHP </span> modules, to put them into LVE context. In most cases the <span class="notranslate"> CGI/PHP </span> process will be placed into LVE with the ID of the user that sites belongs to. mod_hostinglimits detects the user from `SuexecUserGroup` (<span class="notranslate">suexec</span> module), <span class="notranslate">`SuPHP_UserGroup`</span> (from mod_suphp), `AssignUserID` (<span class="notranslate">MPM ITK</span>), <span class="notranslate">`RUidGid` (mod_ruid2 </span> ) directives.

This can be overwritten via LVEId or LVEUser parameter on the Directory level.

:::tip Note
Those parameters will not work with mod_fcgid and mod_cgid.
:::

The order of detection looks as follows:

* LVEId
* LVEUser
* SuexecUserGroup
* suPHP_UserGroup
* RUidGid
* AssignUserID


:::tip Note
LVE doesn't work for mod_include #include due to its "filter" nature.
:::

Example:

<div class="notranslate">

```
LoadModule hostinglimits_module modules/mod_hostinglimits.so
<IfModule mod_hostinglimits.c>
 AllowedHandlers cgi-script php5-script php4-script
 SecureLinks On
</IfModule>
```
</div>

#### **Additional notes**

**mod_hostinglimits** (since version 1.0-22) supports <span class="notranslate">`min-uid - cagefsctl --set-min-uid=600`</span>.

Min UID is read on Apache start/restart and stored in the memory during apache runtime.

If the min UID has changed, you should restart Apache for **mod_hostinglimits** applying new min UID value. Full min UID is supported only with APR.

The following message should appear:

<div class="notranslate">

```
[notice] mod_hostinglimits: found apr extention version 3.
```
</div>

This means that the correct APR is installed with mod_hostinglimits.

mod_hostinglimist has variable for Apache CustomLog format string <span class="notranslate">`%{LVE_ID}y`</span>.

**How to use**:

LogFormat 

<div class="notranslate">

```
"%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i" req for lve "%{LVE_ID}y"
```
</div>

combined

shows in access_log the following info:

<div class="notranslate">

```
*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php HTTP/1.1" 200 43435 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500

*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php?=PHPE9568F34-D428-11d2-A769-00AA001ACF42 HTTP/1.1" 200 2524 "************/1.php""Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500

*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php?=PHPE9568F35-D428-11d2-A769-00AA001ACF42 HTTP/1.1" 200 2146 "************/1.php""Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500
```
</div>

### Installation

**cPanel**

Installed by default during EasyApache build. Requires <span class="notranslate">`lve-stats`</span> & <span class="notranslate">`lve-utils`</span> packages to be installed.

**DirectAdmin**

Can be built using <span class="notranslate"> custombuild</span>:

<div class="notranslate">

```
$ yum install liblve-devel
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set cloudlinux yes
$ ./build apache
$ ./build rewrite_confs
```
</div>

If you run `suphp`, then run the following:

<div class="notranslate">

```
$ ./build suphp
```
</div>

**Plesk**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**ISPmanager**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**InterWorx**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**H-Sphere**

Included by default in H-Sphere 3.5+

**Standard Apache from RPM**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**Custom Apache installation**

Compile from the source: [http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz)

<div class="notranslate">

```
$ wget http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz
$ yum install cmake
$ tar -zxvf mod_hostinglimits*.tar.gz
$ cd mod_hostinglimits*
$ cmake .
$ make
$ make install
```
</div>

* Apache Module Identifier: `hostinglimits_module`
* Source Files: `mod_hostinglimits.c`
* Compatibility: MPM prefork, worker, event, ITK


### Directives

<div class="notranslate">

#### **SecureLinks**

</div>

| | |
|-|-|
|**Description**| Makes sure that for any virtual hosts, only files owned by user specified via SuexecUserGroup or other ways as described above are served. For files owned by any other user apache will return <span class="notranslate">`Access Denied`</span> error. The directive will not affect VirtualHost without user id specified, or with uid < 100|
|**Syntax**| <span class="notranslate">`SecureLinks On`</span>|
|**Default**| <span class="notranslate">`SecureLinks Off`</span>|
|**Context**| server config|

Prevents apache from serving files not owned by user, stopping symlink attacks against php config files.

**Example**

<div class="notranslate">

```
SecureLinks On
```
</div>

***

<div class="notranslate">

#### **SkipErrors**

</div>

| | |
|-|-|
|**Description**| Allow apache to continue if LVE is not available|
|**Syntax**| <span class="notranslate">`SkipErrors On`</span>|
|**Default**| <span class="notranslate">`SkipErrors On`</span>|
|**Context**| server config|

Prevents Apache from exiting if LVE is not available.

**Example**

<div class="notranslate">

```
SkipErrors Off
```
</div>

***

<div class="notranslate">

#### **AllowedHandlers**

</div>

| | |
|-|-|
|**Description**| List of handlers that should be placed into LVE, support regexp|
|**Syntax**|`AllowedHandlers cgi-script %^php%  my-script`|
|**Default**| none|
|**Context**| server config|

This directive allows to list handlers which will be intercepted and placed into LVE.

**Examples**

* Match requests handled by cgi-script handler:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers cgi-script 
  ```
  </div>

* Match all requests:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers *
  ```
  </div>
  
* Match all requests that handled by handler that contains PHP:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers %php%
  ```
  </div>
* Match all requests handled by handler that starts with PHP:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers %^php%
  ```
  </div>

***

<div class="notranslate">

#### **DenyHandlers**

</div>

| | |
|-|-|
|**Description**| List of handlers that should not be placed into LVE, support regexp|
|**Syntax**| <span class="notranslate">`DenyHandlers text/html`</span>|
|**Default**| none|
|**Context**| server config|

This directive works together with AllowHandlers, to exclude some handlers from being allowed in LVE.

**Example**:

Match all requests, but <span class="notranslate">`text/*`</span>

<div class="notranslate">

```
AllowedHandlers *DenyHandlers %text/*%
```
</div>

***

<div class="notranslate">

#### **LVEErrorCode**

</div>

| | |
|-|-|
|**Description**| Error code to display once entry is rejected due to maxEntryProcs|
|**Syntax**| values from 500 to 510|
|**Default**| 508|
|**Context**| directory config|

Specifies ErrorCode to use on LVE error (like too many concurrent processes running).

The message that will be displayed by default is:
<div class="notranslate">

```
Resource Limit Is Reached.

The website is temporarily unable to serve your request as it exceeded resource limit. 

Please try again later.
```
</div>

You can redefine error message using `ErrorDocument` directive

Example:
<div class="notranslate">

```
LVEErrorCode 508ErrorDocument 508 508.html
```
</div>

***

<div class="notranslate">

#### **LVEid**

</div>

| | |
|-|-|
|**Description**| Allows to setup separate LVE ID on per directory level. If not set, user ID of a corresponding user is used.|
|**Syntax**|<span class="notranslate">`LVEId number`</span>|
|**Default**| User Id is used|
|**Context**| directory config|

Specifies LVE id for particular directory

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
 LVEId 10001
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVEUser**

</div>

| | |
|-|-|
|**Description**| Allows to setup separate LVE ID on per directory level.|
|**Syntax**|<span class="notranslate">`LVEUser username`</span>|
|**Default**| none|
|**Context**| directory config|

Specifies LVE ID for particular directory.

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
       LVEUser user1
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVEUserGroupID**

</div>

| | |
|-|-|
|**Description**| Use group ID instead of user ID for LVE container number.|
|**Syntax**| <span class="notranslate">`LVEUserGroupID On/Off`</span>|
|**Default**| User Id is used|
|**Context**| global config only|

* If the option enabled, group ID will be used instead of a user ID. Apache will display the following string in error logs:

<div class="notranslate">

```
mod_hostinglimits: use GroupID instead of UID 
mod_hostinglimits: found apr extension version 2 
mod_hostinglimits: apr_lve_environment_init_group check ok
```
</div>

* If a compatible apr library is not found, the following error message will be display in error logs.

<div class="notranslate">

```
mod_hostinglimits:  apr_lve_* not found!!!
```
</div>

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
       LVEUserGroupID On
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVERetryAfter**

</div>

| | |
|-|-|
|**Description**| Returns Retry-After header when LVE error 508 occurs.|
|**Syntax**|`LERetryAfter MINUTES`|
|**Default**| 240 minutes|
|**Context**| directory config|

Specifies interval for <span class="notranslate">`Retry-After`</span> header. The <span class="notranslate">`Retry-After`</span> response-header field can be used to indicate how long the service is expected to be unavailable to the requesting client.

**Example**:

<div class="notranslate">

```
LVERetryAfter 180
```
</div>

***

<div class="notranslate">

#### **LVESitesDebug**

</div>

| | |
|-|-|
|**Description**| Provides extended debug info for listed sites.|
|**Syntax**|<span class="notranslate">`LVESitesDebug test.com test2.com`</span>|
|**Default**| <span class="notranslate"> none </span>|
|**Context**| directory config|

Specifies virtual hosts to provide extra debugging information.

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
       LVESitesDebug abc.com yx.cnet
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVEParseMode**

</div>

| | |
|-|-|
|**Description**| Determines the way LVE ID will be extraced. In Conf|
|**Syntax**|`LVEParseMode CONF` `PATH` `OWNER` [`REDIS`](/limits/#redis-support-for-hostinglimits)|
|Default: | <span class="notranslate">`CONF`</span>|
|Context: | directory config|

* In `CONF` mode, standard way to extract LVE ID is used (SuexecUserGroup, LVEId, or similar directives).

* In <span class="notranslate">`PATH`</span> mode, username is extracted from the home directory path. The default way to match username is via the following regexp: <span class="notranslate">`/home/([^/]*)/`</span> . Custom regexp can be specified in LVEPathRegexp.

* In <span class="notranslate">`OWNER`</span> mode, the owner of the file is used as an LVE ID.

* In <span class="notranslate">[`REDIS`](/limits/#redis-support-for-hostinglimits)</span> mode, LVE ID is retrieved from Redis database.

**Example**:

<div class="notranslate">

```
LVEParseMode CONF
```
</div>

***

<div class="notranslate">

#### **LVEPathRegexp**

</div>

| | |
|-|-|
|**Description**| Regexp used to extract username from the path. Used in conjuction with `LVEParseMode PATH`|
|**Syntax**|`LVEPathRegexp regexp`|
|**Default**| <span class="notranslate">`/home/([^/]*)/`</span>|
|**Context**| directory config|

Used to extract usersname via path.

**Example**:

<div class="notranslate">

```
LVEPathRegexp /home/([^/]*)/
```
</div>

***

<div class="notranslate">

#### **LVELimitRecheckTimeout**

</div>

| | |
|-|-|
|**Description**| Timeout in milliseconds, a site will return EP without lve_enter for LA decreasing after this time|
|**Syntax**|`LVELimitRecheckTimeout number`|
|**Default**| 0|
|**Context**| httpd.conf, virtualhost|

Example:
<span class="notranslate"> </span>
```
LVELimitRecheckTimeout 1000
```

<div class="notranslate">

#### **LVEUse429**

</div>

| | |
|-|-|
|**Description**| Use 429 error code as code returned on max entry limits ( <span class="notranslate"> on/off </span> ).|
|**Syntax**|`LVEUse429 on`|
|**Default**|<span class="notranslate">`off`</span>|
|**Context**| httpd.conf, virtualhost|

**Example**:

<div class="notranslate">

```
LVEUse429 on
```
</div>

Available for RPM based panels, EasyApache 4 and DirectAdmin.

### Redis Support for HostingLimits

Redis support provides a way to query Redis database for LVE id, based on domain in the HTTP request. Given a database like:

<div class="notranslate">

```
xyz.com 10001
bla.com  10002
....
```
</div>

The module will retrieve corresponding LVE id from the database.

To enable Redis support, compile from source: [http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz](http://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz)

The compilation requires hiredis library.

<div class="notranslate">

```
$ wget http://repo.cloudlinux.com/cloudlinux/sources/da/mod_hostinglimits.tar.gz
$ yum install cmake
$ tar -zxvf mod_hostinglimits*.tar.gz
$ cd mod_hostinglimits*
$ cmake -DREDIS:BOOL=TRUE .
$ make
$ make install
```
</div>

To enable Redis mode, specify:

<div class="notranslate">

```
LVEParseMode REDIS
```
</div>

<div class="notranslate">

#### **LVERedisSocket**

</div>

| | |
|-|-|
|**Description**| Socket to use to connect to Redis database.|
|**Syntax**|<span class="notranslate">`LVERedisSocket path`</span>|
|**Default**|<span class="notranslate">`/tmp/redis.sock`</span>|
|**Context**| server config|

Used to specify location of Redis socket.

**Example**:

<div class="notranslate">

```
LVERedisSocket /var/run/redis.sock
```
</div>

<div class="notranslate">

#### **LVERedisAddr**

</div>

| | |
|-|-|
|**Description**| IP/port used to connect to Redis database instead of socket.|
|**Syntax**|<span class="notranslate">`LVERedisAddr IP PORT`</span>|
|**Default**| <span class="notranslate">`none`</span>|
|**Context**|<span class="notranslate">server config</span>|

Used to specify IP and port to connect to Redis instead of using Socket

**Example**:

<div class="notranslate">

```
LVERedisAddr 127.0.0.1 6993
```
</div>

#### **LVERedisTimeout**

| | |
|-|-|
|**Descriptin**| Number of seconds to wait before attempting to re-connect to Redis.|
|**Syntax**|<span class="notranslate">`LERetryAfter SECONDS`</span>|
|**Default**| 60 seconds|
|**Context**|<span class="notranslate">server config</span>|

Number of seconds to wait before attempting to reconnect to Redis after the last unsuccessful attempt to connect.

**Example**:

<div class="notranslate">

```
LVERedisTimeout 120
```
</div>

### cPanel/WHM JSON API


CloudLinux offers JSON API for [lvectl](/command-line_tools/#lvectl) via WHM. You can access it using the following URL:

<div class="notranslate">

```
https:/IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=list
```
</div>

The output will look as follows:

<div class="notranslate">

```
{"data":[{"ID":"default","CPU":"30","NCPU":"1","PMEM":"1024M","VMEM":"1024M","EP":"28","NPROC":"0","IO":"2048"}]}
```
</div>

#### **Parameters**

|||
|-|-|
|<span class="notranslate">`cgiaction`</span>|always <span class="notranslate">`jsonhandler`</span>|
|<span class="notranslate">`handler`</span>|should match [lvectl](/command-line_tools/#lvectl) command|

For commands like <span class="notranslate">`set`, `destroy`</span> & <span class="notranslate">`delete`</span>, where you need to specify LVE (user) ID, like `lveid=500` (matches user ID 500).

**Example**:

<div class="notranslate">

```
https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=500&speed=30%&io=2048

https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=500&speed=300Mhz&io=2048

https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=500&speed=3Ghz&io=2048
```
</div>

:::tip Note
**Speed** limit can be specified in several units of measure - <span class="notranslate"> %, MHz, GHz </span>. The figures will be different according to the unit of measure.
:::

**Output**:

<div class="notranslate">

```
{"status":"OK"}
```
</div>

To do `set default`, use `lveid=0`, like:

<div class="notranslate">

```
https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=0&speed=30%&io=2048
```
</div>

For commands like <span class="notranslate">`apply all`, `destroy all`</span>, use:

<div class="notranslate">

```
handler=apply-all

handler=destroy-all
```
</div>

You can use the following commands that allow to specify user name instead of user ID:

| | |
|-|-|
|<span class="notranslate">`set-user`</span> | Set parameters for a LVE and/or create a LVE using username instead of ID.|
|<span class="notranslate"> `list-user  ` </span> | List loaded LVEs, display username instead of user ID.|
|<span class="notranslate"> `delete-user ` </span> | Delete LVE and set configuration for that user to defaults.|

If the limits for users are set with <span class="notranslate"> cPanel LVE Extension </span>, then turnkey billing solutions can be applied (e.g. WHMCS).

### cPanel LVE Extension


:::tip Note
<span class="notranslate">LVE Manager</span> 1.0-9.8+
:::

<span class="notranslate"> cPanel LVE Extension </span> allows to control LVE limits for packages via cPanel hosting packages control interface and via <span class="notranslate"> cPanel WHM API </span> . It simplifies integration with existing billing systems for cPanel (like WHMCS for example).

#### **Add Package Extension**

To add LVE Settings to standard cPanel package, go to <span class="notranslate">_Packages_</span> | <span class="notranslate">_Add a Package_</span>.

:::tip Note
You can find the information on how to add a package in official cPanel documentation on the link: [https://documentation.cpanel.net/display/ALD/Add+a+Package](https://documentation.cpanel.net/display/ALD/Add+a+Package)
:::

![](/images/lve-extension_01.jpg)


Tick <span class="notranslate">_LVE Settings_</span> in the bottom of the page to open <span class="notranslate">_LVE Settings_</span> form.

![](/images/lve-extension_02.jpg)

You can specify the following options:

:::tip Note
Your changes to <span class="notranslate">_LVE Settings_</span> will appear in the system after a little while.
:::

| | |
|-|-|
|<span class="notranslate">Speed Settings</span> | Maximum CPU usage for an account. Must be in the range 1 - 100 (but obligatory > 0 ) if old format is used; use `%` or <span class="notranslate">`Mhz\Ghz`</span> to set <span class="notranslate">`CPU`</span> limit as speed; Type <span class="notranslate">`DEFAULT`</span> to use default value.|
|<span class="notranslate"> Memory Settings </span> |`Pmem` - Maximum physical memory usage for an account. `Vmem` - Maximum virtual memory usage for an account. Must be a positive number. Postfix allowed only in `KGMT`. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> Max entry proc Settings </span> | Maximum number of entry processes (concurrent connections) for an account. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> Nproc Settings </span> | Maximum number of processes usage for an account. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> IO Settings </span> | Maximum <span class="notranslate">I/O (input/output)</span> usage speed for an account. Is measured in <span class="notranslate">`Kb/s`</span>. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> IOPS Settings </span> | Maximum <span class="notranslate">`IOPS`</span> (input/output operations per second) usage for an account. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` to unlimited resource.|

![](/images/lve-extension_03.jpg) 

Click <span class="notranslate">_Add_</span> to apply your changes.

#### **Edit Package Extensions**

You can edit limits in any convenient for you way - in <span class="notranslate">_Edit a Package_</span> section, in the  <span class="notranslate">LVE Manager </span> or even via WHM API.

<span class="notranslate">**Edit a Package**</span>

To edit package extensions, go to <span class="notranslate"> _Packages_</span> | <span class="notranslate">_Edit a Package_</span>. Choose a package from the <span class="notranslate">_Package_</span> list and click <span class="notranslate">_Edit_</span>.

![](/images/lve-extension_04.jpg)

<span class="notranslate">**LVE Manager**</span>

To edit package extensions, go to <span class="notranslate">LVE Manager</span> | <span class="notranslate">Server Configuration</span> | <span class="notranslate"> CloudLinux LVE Manager</span> | <span class="notranslate"> Packages</span> and click pencil (edit) icon.

![](/images/lve-extension_05.jpg)

<span class="notranslate">**WHM API**</span>

To learn how to work with package extensions limits using WHM API, please read the official cPanel documentation: [https://documentation.cpanel.net/display/SDK/Guide+to+Package+Extensions+-+Data+Behavior+and+Changes](https://documentation.cpanel.net/display/SDK/Guide+to+Package+Extensions+-+Data+Behavior+and+Changes)
