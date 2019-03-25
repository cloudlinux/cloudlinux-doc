# Kernel Settings


[Kernel Config Variables](/kernel_settings/#kernel-config-variables)
 
[Virtualized /proc filesystem](/kernel_settings/#virtualized-proc-filesystem)

[SecureLinks](/kernel_settings/#securelinks)

[Symlink Owner Match Protection](/kernel_settings/#symlink-owner-match-protection)

[Link Traversal Protection](/kernel_settings/#link-traversal-protection)

[ptrace Block](/kernel_settings/#ptrace-block)

[Xen XVDA detection](/kernel_settings/#xen-xvda)

[TPE Extension](/kernel_settings/#tpe-extension-deprecated)

[IO Limits latency](/kernel_settings/#io)

[Hybrid Kernel](/kernel_settings/#hybrid-kernel)

[Reading LVE usage](/kernel_settings/#reading)

[flashcache](/kernel_settings/#flashcache)

[OOM Killer for LVE Processes](/kernel_settings/#oom-killer)

[File System Quotas](/kernel_settings/#file-system-quotas)


## Kernel Config Variables


Starting from **lvemanager 4.0-25.5** , **lve-utils 3.0-21.2** , and **cagefs-6.1-26** , CloudLinux OS utilities can read/write kernel config variables from a custom config `/etc/sysctl.d/90-cloudlinux.conf` _ _ (earlier, the parameters were read/written only from `sysctl.conf` ).

CloudLinux OS utilities get parameter by using _sysctl_ system utility. So for now, even if a config variable is not set in the _sysctl.conf_ and in the _/etc/sysctl.d_ config files, this variable will be read by _sysctl_ utility directly from _/proc/sys_ .

If some kernel variable was set in _/etc/sysctl.d/90-cloudlinux.conf_ do

```
sysctl --system
```

to apply the parameters before reading and after writing.

Starting from ** cagefs-6.1-27**  `fs.proc_can_see_other_uid` will be migrated (one time) from `/etc/sysctl.conf` into `/etc/sysctl.d/90-cloudlinux.conf` . If this variable is not set in either file, it will default to 0.
It is strongly advised against setting this variable in `90-cloudlinux.conf` . Define it in `/etc/sysctl.conf` or in some other config file with an index number greater than `90-cloudlinux.conf` , e.g. `/etc/sysctl.d/95-custom.conf` .

Starting from **lve-utils-3.0-23.7**  `fs.proc_super_gid` and `fs.symlinkown_gid` will be migrated (one time) from `/etc/sysctl.conf` into ` /etc/sysctl.d/90-cloudlinux.conf` .

For **lve-utils** versions from 3.0-21.2 to 3.0-23.7 the migration was performed the same way, but during every package install/update.
Variables setting guidelines are the same as for CageFS (see above).



## Virtualized /proc filesystem


You can prevent user from seeing processes of other users (via ps/top command) as well as special files in /proc file system by setting fs.proc_can_see_other_uid sysctl.

To do that, edit /etc/sysctl.conf

```
fs.proc_can_see_other_uid=0fs.proc_super_gid=600
```

And do:

```
# sysctl -p
```

fs.proc_can_see_other_uid=0

If fs.proc_can_see_other_uid is set to 0, users will not be able to see special files. If it is set to 1 - user will see other processes IDs in /proc filesystem.

fs.proc_super_gid=XX

The fs.proc_super_gid sets group ID which will see system files in /proc, add any users to that group so they will see all files in /proc. Usually needed by some monitoring users like nagios or zabbix and [cldetect utility](/limits/#cldetect) can configure few most commonly used monitoring software automatically.

Virtualized /proc filesystem will only display following files (as well as directories for PIDs for the user) to unprivileged users:

```
/proc/cpuinfo/proc/version/proc/stat/proc/uptime/proc/loadavg/proc/filesystems/proc/stat/proc/cmdline/proc/meminfo/proc/mounts/proc/tcp/proc/tcp6/proc/udp/proc/udp6/proc/assocs/proc/raw/proc/raw6/proc/unix/proc/dev
```
   




In **lve-utils-2.1-3.2** and later _/proc_ can be remounted with " _hidepid=2"_ option to enable additional protection for procfs. This remount is performed in lve_namespaces service.
This option is in sync with _ fs.proc_can_see_other_uid_ kernel parameter described above.
When _/etc/sysctl.conf_ does not contain _ fs.proc_can_see_other_uid _ setting, the protection is off (procfs is remounted with _hidepid=0_ option). In this case _fs.proc_super_gid_ setting is ignored. Users are able to see full _/proc_ including processes of other users on a server. This is a default behavior.

If _/etc/sysctl.conf_ contains _"fs.proc_can_see_other_uid=1"_ setting, then /proc will be remounted with _"hidepid=0" _ option (disable _“hidepid”_ protection for all users).
If _/etc/sysctl.conf_ contains _ "fs.proc_can_see_other_uid=0" _ setting, then /proc will be remounted with _"hidepid=2"_ option (enable _“hidepid”_ protection for all users).
If _/etc/sysctl.conf_ contains _"fs.proc_can_see_other_uid=0"_ and _"fs.proc_super_gid=$GID"_ settings, then _/proc_ will be remounted with _"hidepid=2, gid=$GID"_ options (enable _“hidepid”_ for all users except users in group with gid $GID).

To apply /etc/sysctl.conf changes, you should execute

```
service lve_namespaces restart
```
 Or 
```
/usr/share/cloudlinux/remount_proc.py
```

So, admin can prevent users from seeing processes of other users via _ “fs.proc_can_see_other_uid_ ” and _ "fs.proc_super_gid"_ settings in _/etc/sysctl.conf_ , like earlier.

Also, you can override this by specifying desired options for _/proc_ in _/etc/fstab_ .

To disable hidepid, add to _ /etc/fstab_ the following:

```
proc /proc proc defaults,hidepid=0,gid=0 0 0
```

Or you can specify desired hidepid and gid values explicitly:

```
proc /proc proc defaults,hidepid=2,gid=clsupergid 0 0
```
 You should execute 
```
mount -o remount /proc
```
 to apply _/etc/fstab _ changes.
But we recommend to manage procfs mount options via _ /etc/sysctl.conf_ as described above for backward compatibility. 





## SecureLinks


CloudLinux provides comprehensive protection against symbolic link attacks popular in shared hosting environment.

The protection requires setting multiple kernel options to be enabled.

### Symlink Owner Match Protection


**_fs.enforce_symlinksifowner_**

To protect against symlink attack where attacker tricks Apache web server to read some other user PHP config files, or other sensitive file, enable:

_fs.enforce_symlinksifowner=1_ .

Setting this option will deny any process running under gid _fs.symlinkown_gid_ to follow the symlink if owner of the link doesn’t match the owner of the target file.

Defaults:
<span class="notranslate"> </span>
```
fs.enforce_symlinksifowner = 1fs.symlinkown_gid = 48
```

| | |
|-|-|
|<span class="notranslate"> _fs.enforce_symlinksifowner = 0_ </span> | do not check <span class="notranslate"> symlink </span> ownership|
|<span class="notranslate"> _fs.enforce_symlinksifowner = 1_ </span> | deny if <span class="notranslate"> symlink </span> ownership doesn’t match target, and process <span class="notranslate"> gid </span> matches <span class="notranslate"> _symlinkown_gid _ </span>|

When <span class="notranslate"> _fs.enforce_symlinksifowner_ </span> set to 1, processes with <span class="notranslate"> GID </span> 48 will not be able to follow <span class="notranslate"> symlinks </span> if they are owned by <span class="notranslate"> user1 </span> , but point to file owned <span class="notranslate"> user2 </span> .

Please, note that <span class="notranslate"> _fs.enforce_symlinksifowner = 2_ </span> is deprecated and can cause issues for the system operation.
<span class="notranslate"> </span>
**_fs.symlinkown_gid_**

On standard <span class="notranslate"> RPM Apache </span> installation, <span class="notranslate"> Apache </span> is usually running under <span class="notranslate"> GID </span> 48.
On <span class="notranslate"> cPanel </span> servers, <span class="notranslate"> Apache </span> is running under user nobody, <span class="notranslate"> GID </span> 99.

To change <span class="notranslate"> GID </span> of processes that cannot follow <span class="notranslate"> symlink </span> , edit the file <span class="notranslate"> _/etc/sysctl.conf_ </span> , add the line:
<span class="notranslate"> </span>
```
fs.symlinkown_gid = XX
```

And execute:
<span class="notranslate"> </span>
```
$ sysctl -p
```

To disable <span class="notranslate"> symlink </span> owner match protection feature, set <span class="notranslate"> _fs.enforce_symlinksifowner = 0_ </span> in <span class="notranslate"> _/etc/sysctl.conf_ </span> , and execute
 <span class="notranslate"> </span>
```
$ sysctl -p
```
  


<span class="notranslate"> _proc/sys/fs/global_root_enable_ </span> flag enables following the <span class="notranslate"> symlink </span> with root ownership. If <span class="notranslate"> _global_root_enable=0_ </span> , then <span class="notranslate"> Symlink Owner Match Protection </span> does not verify the <span class="notranslate"> symlink </span> owned by <span class="notranslate"> root.  </span>

For example, in the path <span class="notranslate"> _/proc/self/fd_ ,  _self_ </span> is a <span class="notranslate"> symlink </span> , which leads to a process directory.  The <span class="notranslate"> symlink </span> owner is <span class="notranslate"> root </span> . When <span class="notranslate"> _global_root_enable=0_ , Symlink Owner Match Protection </span> excludes this element from the verification. When <span class="notranslate"> _global_root_enable=1_ </span> , the verification will be performed, which could block the access to _ fd_ and cause violation of the web-site performance.

It is recommended to set _/proc/sys/fs/global_root_enable=0_ by default. If needed, set _ /proc/sys/fs/global_root_enable=1 _ to increase the level of protection. 




### Link Traversal Protection 


<span class="notranslate"> [CageFS](http://docs.cloudlinux.com/cagefs.html) </span> is extremely powerful at stopping most information disclosure attacks, where a hacker could read sensitive files like <span class="notranslate"> _/etc/passwd_ </span> .

Yet, <span class="notranslate"> CageFS </span> does not work in each and every situation. For example, on <span class="notranslate"> cPanel </span> servers, it is not enabled in <span class="notranslate"> WebDAV </span> server, <span class="notranslate"> cPanel </span> file manager and webmail, as well as some FTP servers don’t include proper change rooting.

This allows an attacker to create symlink or hardlink to a sensitive file like <span class="notranslate"> _/etc/passwd_ </span> and then use <span class="notranslate"> WebDAV </span> , filemanager, or webmail to read the content of that file.

Starting with _ _ CL6 _ kernel 2.6.32-604.16.2.lve1.3.45_ , you can prevent such attacks by preventing user from creating symlinks and hardlinks to files that they don’t own.

This is done by set following kernel options to 1:

```
fs.protected_symlinks_create = 1fs.protected_hardlinks_create = 1
```
  

   

 

```
fs.protected_symlinks_create = 0fs.protected_hardlinks_create = 0
```

Then setup:

```
fs.protected_symlinks_allow_gid = id_of_group_linksafefs.protected_hardlinks_allow_gid = id_of_group_linksafe
```

This is for example needed by PHP Selector to work (new versions of Alt-PHP can already correctly configure those settings).

To manually adjust the settings, edit: _/etc/sysctl.d/cloudlinux-linksafe.conf_
and execute: 
```
sysctl -p /etc/sysctl.d/cloudlinux-linksafe.conf
```
 or:

```
sysctl --system
```

 


## ptrace Block


Starting with kernel 3.10.0-427.18.s2.lve1.4.21 ( <span class="notranslate"> CloudLinux </span> 7) and 2.6.32-673.26.1.lve1.4.17 ( <span class="notranslate"> CloudLinux </span> 6) we re-implemented <span class="notranslate"> ptrace block </span> to protect against <span class="notranslate"> ptrace </span> family of vulnerabilities. It prevents end user from using any <span class="notranslate"> ptrace </span> related functionality, including such commands as <span class="notranslate"> strace, lsof </span> or <span class="notranslate"> gdb </span> .

By default, <span class="notranslate"> CloudLinux </span> doesn't prevent <span class="notranslate"> ptrace </span> functionality.

Defaults:
<span class="notranslate"> </span>
```
kernel.user_ptrace = 1kernel.user_ptrace_self = 1
```

The option <span class="notranslate"> kernel.user_ptrace </span> disables <span class="notranslate"> PTRACE_ATTACH </span> functionality, option <span class="notranslate"> kernel.user_ptrace_self </span> disables <span class="notranslate"> PTRACE_TRACEME </span> .

To disable all <span class="notranslate"> ptrace </span> functionality change both <span class="notranslate"> sysctl </span> options to 0, add this section to <span class="notranslate"> /etc/sysctl.conf </span> :
<span class="notranslate"> </span>
```
## CL. Disable ptrace for userskernel.user_ptrace = 0kernel.user_ptrace_self = 0##
```

Apply changes with:
<span class="notranslate"> </span>
```
$ sysctl -p
```

Different software could need different access to <span class="notranslate"> ptrace </span> , you may need to change only one option to 0 to make them working. In this case, there will be only partial <span class="notranslate"> ptrace </span> protection. 



## Xen XVDA


2.6.32 kernels have different mode of naming <span class="notranslate"> Xen XVDA </span> drives.

By adding <span class="notranslate"> xen_blkfront.sda_is_xvda=0 </span> to kernel boot line in <span class="notranslate"> grub.conf </span> you will make sure no naming translation is done, and the drives will be identified as <span class="notranslate"> xvde </span> .

By default, this option is set to 1 in the kernel, and drives are detected as <span class="notranslate"> xvda </span> .
This is needed only for CloudLinux 6 and <span class="notranslate"> Hybrid </span> kernels.


## TPE Extension (deprecated)




<span class="notranslate"> CloudLinux 5.x (kernel 2.6.18) has limited support for trusted path execution extension. </span>
<span class="notranslate"> CloudLinux 6.x (kernel 2.6.32) and  <span class="notranslate"> CloudLinux 5.x with hybrid kernel don't have  <span class="notranslate"> TPE extension </span> </span> </span>



The kernel supports <span class="notranslate"> TPE </span> feature out of the box. You can configure it using following files:
<span class="notranslate"> </span>
·        /proc/sys/kernel/grsecurity/grsec_lock
·        /proc/sys/kernel/grsecurity/tpe
·        /proc/sys/kernel/grsecurity/tpe_gid
·        /proc/sys/kernel/grsecurity/tpe_restrict_all

To enable <span class="notranslate"> TPE </span> feature in a standard way just add following to the end of your <span class="notranslate"> /etc/sysctl.conf </span>

```
#GRsecurity kernel.grsecurity.tpe = 1 kernel.grsecurity.tpe_restrict_all = 1 kernel.grsecurity.grsec_lock = 1  
```

And do:
<span class="notranslate"> </span>
```
# sysctl -p
```
  


 This <span class="notranslate"> Trusted Path Execution </span> feature was adopted from <span class="notranslate"> grsecurity </span> .

## IO


**[lve1.2.29+]**

When customer reaches <span class="notranslate"> IO Limit, the processes that are waiting for  <span class="notranslate"> IO will be placed to sleep to make sure they don't go over the limit. That could make some processes sleep for a very long time. </span> </span>
By defining <span class="notranslate"> IO latency, you can make sure that no process sleeps due to  <span class="notranslate"> IO limit for more then X milliseconds. By doing so, you will also let customers to burst through the limits, and use up more than they were limited too in some instances. </span> </span>

This option is <span class="notranslate"> OFF by default. </span>

_For _ <span class="notranslate"> CloudLinux 6 and  <span class="notranslate"> CloudLinux 7 (since Hybrid kernel lve1.4.x.el5h): </span> </span>

To enable <span class="notranslate"> IO </span> Limits latency and set it to 10 seconds:
 <span class="notranslate"> </span>
```
# echo 10000 > /sys/module/kmodlve/parameters/latency
```

To disable latency:
 <span class="notranslate"> </span>
```
# echo 2000000000 > /sys/module/kmodlve/parameters/latency
```

It is possible to set, for example, 1000 as a permanent value. To do so, create a file <span class="notranslate"> </span> with the following content:
<span class="notranslate"> </span>


_For _ <span class="notranslate"> CloudLinux </span> _ 5 (OBSOLETE):_

To enable <span class="notranslate"> IO </span> Limits latency and set it to 10 seconds:
<span class="notranslate"> </span>
```
# echo 10000 > /sys/module/iolimits/**parameters/latency
```

To disable latency:
<span class="notranslate"> </span>
```
# echo 2000000000 > /sys/module/iolimits/**parameters/latency
```


## Hybrid Kernel


<span class="notranslate"> **CloudLinux**  6 Hybrid kernel </span>

<span class="notranslate"> CloudLinux </span> 6 Hybrid Kernel is <span class="notranslate"> CloudLinux </span> 7 (3.10.0) kernel compiled for <span class="notranslate"> CloudLinux 6 OS. New 3.10 kernel features a set of performance and scalability improvements related to  <span class="notranslate"> IO </span> , networking and memory management, available in  <span class="notranslate"> CloudLinux 7 OS </span> . It also features improved  <span class="notranslate"> CPU </span>  scheduler for better overall system throughput and latency. </span>

Please find information on the main features of 3.10 kernel branch on the links:

[https://kernelnewbies.org/Linux_3.10#head-e740f930dfd021616cc42e8abf21c79d0b07e217](https://kernelnewbies.org/Linux_3.10#head-e740f930dfd021616cc42e8abf21c79d0b07e217)

[https://www.kernel.org/pub/linux/kernel/v3.0/ChangeLog-3.10.1](https://www.kernel.org/pub/linux/kernel/v3.0/ChangeLog-3.10.1)

How to migrate from the normal to hybrid channel: 




1. Update <span class="notranslate"> rhn-client-tools </span> from production

2. Run <span class="notranslate"> normal-to-hybrid </span> script.

3. Reboot after script execution is completed.
<span class="notranslate"> </span>
```
yum update rhn-client-toolsnormal-to-hybridreboot
```

How to migrate from hybrid to the normal channel:




1. Run <span class="notranslate"> hybrid-to-normal </span> script.

2. Reboot after script execution is completed.
<span class="notranslate"> </span>
```
hybrid-to-normalreboot
```

**Known limitations and issues** :

1. We do not remove Hybrid kernel after migration from Hybrid to the normal channel, but we remove <span class="notranslate"> linux-firmware </span> package which is needed to boot Hybrid kernel. This is because <span class="notranslate"> CloudLinux </span> 6 does not allow to remove the package of currently running kernel. Proper removal procedure will be implemented, but for now, we should warn users _not to boot Hybrid kernel if they have migrated to normal channel_ .

2. Kernel module signature isn't checking for now, as 3.10 kernel is using x509 certificates to generate keys and CL6 cannot detect signatures created in such way. The solution will be implemented.

## Reading 


CloudLinux kernel provides real time usage data in file.

All the statistics can be read from that file in real time. Depending on your kernel version you will get either Version 6 of the file, or version 4 of the file.
You can detect the version by reading the first line of the file. It should look like:
<span class="notranslate"> 
6:LVE... for version 6 </span>
4:LVE... for version 4

First line presents headers for the data.
Second line shows default limits for the server, with all other values being 0.
The rest of the lines present limits & usage data on per <span class="notranslate"> LVE </span> bases.

Version 6 (CL6 & hybrid kernels):
<span class="notranslate"> </span>
```
6:LVE        EP        lCPU        lIO        CPU        MEM        IO        lMEM        lEP        nCPU        fMEM        fEP        lMEMPHY        lCPUW        lNPROC        MEMPHY        fMEMPHY        NPROC        fNPROC0        0        25        1024        0        0        0        262144        20        1        0        0        262144        100        0        0        0        00300        0        25        1024        1862407        0        0        262144        20        1        0        0        262144        100        0        31        000
```

Version 4 (CL 5 kernel):
<span class="notranslate"> </span>
```
4:LVE        EP        lCPU        lIO        CPU        MEM        IO        lMEM        lEP        nCPU        fMEM        fEP0        0        25        25        0        0        0        262144        20        1        0        0300        0        25        25        15103019        0        0        262144        20        1        0        0
```


| |  |  | |
|-|--|--|-|
|**Label** | **Description** | **Value** | **Supported versions**|
|<span class="notranslate"> LVE </span> | <span class="notranslate"> LVE ID </span> | number | |
|<span class="notranslate"> EP </span> | Number of <span class="notranslate"> entry processes </span> | number | |
|<span class="notranslate"> lCPU </span> | <span class="notranslate"> CPU </span> Limit | % relative to total <span class="notranslate"> CPU power </span> | |
|<span class="notranslate"> lIO </span> | <span class="notranslate"> IO </span> limits for CL6 or <span class="notranslate"> IO </span> priority for CL5 | KB/s for v6, from 1 to 100 for v4 | |
|<span class="notranslate"> CPU </span> | <span class="notranslate"> CPU </span> usage since reboot | in nanoseconds for v6, hertz for v4 | |
|<span class="notranslate"> MEM </span> | Virtual memory usage | number of 4k pages | |
|<span class="notranslate"> IO </span> | <span class="notranslate"> IO </span> usage | KB/s for v6, 0 for v4 | |
|<span class="notranslate"> lMEM </span> | Virtual memory limit | number of 4k pages | |
|<span class="notranslate"> lEP </span> | <span class="notranslate"> Entry Processes </span> limit | number | |
|<span class="notranslate"> nCPU </span> | Number of cores limit | number of cores | |
|<span class="notranslate"> fMEM </span> | <span class="notranslate"> Virtual memory </span> faults | number of faults | |
|<span class="notranslate"> fEP </span> | <span class="notranslate"> Entry Processes </span> faults | number of faults | v6+|
|<span class="notranslate"> lMEMPHY </span> | Physical memory limit | number | v6+|
|<span class="notranslate"> lCPUW </span> | <span class="notranslate"> CPU </span> weight (not used) | from 1 to 100 | v6+|
|<span class="notranslate"> lNPROC </span> | <span class="notranslate"> Number of processes </span> limit | number | v6+|
|<span class="notranslate"> MEMPHY </span> | Physical memory usage | number of 4k pages | v6+|
|<span class="notranslate"> fMEMPHY </span> | Physical memory faults | number of faults | v6+|
|<span class="notranslate"> NPROC </span> | <span class="notranslate"> Number of processes </span> | number | v6+|
|<span class="notranslate"> fNPROC </span> | <span class="notranslate"> Number of processes </span> faults | number of faults | v6+|
|<span class="notranslate"> IOPS </span> | <span class="notranslate"> IO </span> operations since reboot | number | v8+|

## flashcache


_* Available only for x86_64, _ <span class="notranslate"> CloudLinux </span> _ 6 and Hybrid servers_

<span class="notranslate"> Flashcache </span> is a module originally written and released by <span class="notranslate">  Facebook (Mohan Srinivasan, Paul Saab </span> and <span class="notranslate"> Vadim Tkachenko </span> ) in April of 2010. It is a kernel module that allows Writethrough caching of a drive on another drive. This is most often used for caching a rotational drive on a smaller solid-state drive for performance reasons. This gives you the speed of an <span class="notranslate"> SSD </span> and the size of a standard rotational drive for recently cached files. <span class="notranslate"> Facebook </span> originally wrote the module to speed up database <span class="notranslate"> I/O </span> , but it is easily extended to any <span class="notranslate"> I/O </span> .

To install on <span class="notranslate"> CloudLinux </span> 6 & Hybrid servers:
<span class="notranslate"> </span>
```
$ yum install flashcache
```

More info on <span class="notranslate"> flashcache </span> : [https://github.com/facebook/flashcache/](https://github.com/facebook/flashcache/)

<span class="notranslate"> ArchLinux </span> has a good page explaining how to use <span class="notranslate"> flashcache </span> :
[https://wiki.archlinux.org/index.php/Flashcache](https://wiki.archlinux.org/index.php/Flashcache)


## OOM Killer


When <span class="notranslate"> LVE </span> reaches its memory limit, the processes inside that <span class="notranslate"> LVE </span> are killed by <span class="notranslate"> OOM Killer </span> and appropriate message is written to <span class="notranslate"> /var/log/messages </span> . When any <span class="notranslate"> LVE </span> hits huge number of memory limits in short period of time, then <span class="notranslate"> OOM Killer </span> could cause system overload. Starting from kernel 2.6.32-673.26.1.lve1.4.15 ( <span class="notranslate"> CloudLinux </span> 6) and from kernel 3.10.0-427.18.2.lve1.4.14 ( <span class="notranslate"> CloudLinux </span> 7) heavy <span class="notranslate"> OOM Killer </span> could be disabled. If so - lightweight <span class="notranslate"> SIGKILL </span> will be used instead.

By default <span class="notranslate"> OOM Killer </span> is enabled, to disable it please run:

_For _ <span class="notranslate"> CloudLinux </span> _ 6_ :
<span class="notranslate"> </span>
```
# echo 1 > /proc/sys/ubc/ubc_oom_disable
```

Also, add the following to <span class="notranslate"> _/etc/sysctl.conf_ </span> file to apply the same during boot:
<span class="notranslate"> </span>
```
ubc.ubc_oom_disable=1
```

_For _ <span class="notranslate"> CloudLinux </span> _ 7:_
<span class="notranslate"> </span>
```
# echo 1 > /proc/sys/kernel/memcg_oom_disable
```

Also, add the following to _ _ <span class="notranslate"> /etc/sysctl.conf </span> file to apply the same during boot:
<span class="notranslate"> </span>
```
kernel.memcg_oom_disable=1
```



## File System Quotas


In <span class="notranslate"> **Ext4** </span> file system, the process with enabled capability <span class="notranslate"> CAP_SYS_RESOURCE </span> is not checked on the quota exceeding by default. It allows userland utilities <span class="notranslate"> _selectorctl_ </span> and <span class="notranslate"> _cagefs_ </span> to operate without fails even if a user exceeds a quota.

To disable quota checking in <span class="notranslate"> **XFS** </span> file system set <span class="notranslate"> _cap_res_quota_disable_ </span> option to 1 using the following command:
<span class="notranslate"> </span>
```
# echo 1 > /proc/sys/fs/xfs/cap_res_quota_disable
```



