# Kernel Settings


[Kernel Config Variables](/kernel_settings/#kernel-config-variables)
 
[Virtualized /proc filesystem](/kernel_settings/#virtualized-proc-filesystem)

[SecureLinks](/kernel_settings/#securelinks)

`o` [Symlink Owner Match Protection](/kernel_settings/#symlink-owner-match-protection)

`o` [Link Traversal Protection](/kernel_settings/#link-traversal-protection)

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


Starting from **lvemanager 4.0-25.5** , **lve-utils 3.0-21.2** , and **cagefs-6.1-26** , CloudLinux OS utilities can read/write kernel config variables from a custom config _ _ (earlier, the parameters were read/written only from ).

CloudLinux OS utilities get parameter by using _sysctl_ system utility. So for now, even if a config variable is not set in the _sysctl.conf_ and in the _/etc/sysctl.d_ config files, this variable will be read by _sysctl_ utility directly from _/proc/sys_ .

If some kernel variable was set in _/etc/sysctl.d/90-cloudlinux.conf_ do

```
sysctl --system
```

to apply the parameters before reading and after writing.

Starting from ** cagefs-6.1-27**  will be migrated (one time) from into . If this variable is not set in either file, it will default to 0.
It is strongly advised against setting this variable in . Define it in or in some other config file with an index number greater than , e.g. .

Starting from **lve-utils-3.0-23.7**  and will be migrated (one time) from into .

For **lve-utils** versions from 3.0-21.2 to 3.0-23.7 the migration was performed the same way, but during every package install/update.
Variables setting guidelines are the same as for CageFS (see above).



## Virtualized /proc filesystem


You can prevent user from seeing processes of other users (via ps/top command) as well as special files in /proc file system by setting fs.proc_can_see_other_uid sysctl.

To do that, edit /etc/sysctl.conf

```
fs.proc_can_see_other_uid=0
fs.proc_super_gid=600
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
/proc/cpuinfo
/proc/version
/proc/stat
/proc/uptime
/proc/loadavg
/proc/filesystems
/proc/stat
/proc/cmdline
/proc/meminfo
/proc/mounts
/proc/tcp
/proc/tcp6
/proc/udp
/proc/udp6
/proc/assocs
/proc/raw
/proc/raw6
/proc/unix
/proc/dev
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

```
fs.enforce_symlinksifowner = 1
fs.symlinkown_gid = 48
```

| | |
|-|-|
| | do not check ownership|
| | deny if ownership doesn’t match target, and process matches|

When set to 1, processes with 48 will not be able to follow if they are owned by , but point to file owned .

Please, note that is deprecated and can cause issues for the system operation.

**_fs.symlinkown_gid_**

On standard installation, is usually running under 48.
On servers, is running under user nobody, 99.

To change of processes that cannot follow , edit the file , add the line:

```
fs.symlinkown_gid = XX
```

And execute:

```
$ sysctl -p
```

To disable owner match protection feature, set in , and execute

```
$ sysctl -p
```
  


flag enables following the with root ownership. If , then does not verify the owned by

For example, in the path is a , which leads to a process directory.  The owner is . When excludes this element from the verification. When , the verification will be performed, which could block the access to _ fd_ and cause violation of the web-site performance.

It is recommended to set _/proc/sys/fs/global_root_enable=0_ by default. If needed, set _ /proc/sys/fs/global_root_enable=1 _ to increase the level of protection. 




### Link Traversal Protection 


is extremely powerful at stopping most information disclosure attacks, where a hacker could read sensitive files like .

Yet, does not work in each and every situation. For example, on servers, it is not enabled in server, file manager and webmail, as well as some FTP servers don’t include proper change rooting.

This allows an attacker to create symlink or hardlink to a sensitive file like and then use , filemanager, or webmail to read the content of that file.

Starting with _ _ CL6 _ kernel 2.6.32-604.16.2.lve1.3.45_ , you can prevent such attacks by preventing user from creating symlinks and hardlinks to files that they don’t own.

This is done by set following kernel options to 1:

```
fs.protected_symlinks_create = 1
fs.protected_hardlinks_create = 1
```
  

   

 

```
fs.protected_symlinks_create = 0
fs.protected_hardlinks_create = 0
```

Then setup:

```
fs.protected_symlinks_allow_gid = id_of_group_linksafe
fs.protected_hardlinks_allow_gid = id_of_group_linksafe
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


Starting with kernel 3.10.0-427.18.s2.lve1.4.21 ( 7) and 2.6.32-673.26.1.lve1.4.17 ( 6) we re-implemented to protect against family of vulnerabilities. It prevents end user from using any related functionality, including such commands as or .

By default, doesn't prevent functionality.

Defaults:

```
kernel.user_ptrace = 1
kernel.user_ptrace_self = 1
```

The option disables functionality, option disables .

To disable all functionality change both options to 0, add this section to :

```
## CL. Disable ptrace for users
kernel.user_ptrace = 0
kernel.user_ptrace_self = 0
##
```

Apply changes with:

```
$ sysctl -p
```

Different software could need different access to , you may need to change only one option to 0 to make them working. In this case, there will be only partial protection. 



## Xen XVDA


2.6.32 kernels have different mode of naming drives.

By adding to kernel boot line in you will make sure no naming translation is done, and the drives will be identified as .

By default, this option is set to 1 in the kernel, and drives are detected as .
This is needed only for CloudLinux 6 and kernels.


## TPE Extension (deprecated)









The kernel supports feature out of the box. You can configure it using following files:

·        /proc/sys/kernel/grsecurity/grsec_lock
·        /proc/sys/kernel/grsecurity/tpe
·        /proc/sys/kernel/grsecurity/tpe_gid
·        /proc/sys/kernel/grsecurity/tpe_restrict_all

To enable feature in a standard way just add following to the end of your

```
#GRsecurity 
kernel.grsecurity.tpe = 1 
kernel.grsecurity.tpe_restrict_all = 1 
kernel.grsecurity.grsec_lock = 1 
 
```

And do:

```
# sysctl -p
```
  


 This feature was adopted from .

## IO


**[lve1.2.29+]**

When customer reaches
By defining

This option is

_For _

To enable Limits latency and set it to 10 seconds:

```
# echo 10000 > /sys/module/kmodlve/parameters/latency
```

To disable latency:

```
# echo 2000000000 > /sys/module/kmodlve/parameters/latency
```

It is possible to set, for example, 1000 as a permanent value. To do so, create a file with the following content:



_For _

To enable Limits latency and set it to 10 seconds:

```
# echo 10000 > /sys/module/iolimits/**parameters/latency
```

To disable latency:

```
# echo 2000000000 > /sys/module/iolimits/**parameters/latency
```


## Hybrid Kernel




6 Hybrid Kernel is 7 (3.10.0) kernel compiled for

Please find information on the main features of 3.10 kernel branch on the links:

[https://kernelnewbies.org/Linux_3.10#head-e740f930dfd021616cc42e8abf21c79d0b07e217](https://kernelnewbies.org/Linux_3.10#head-e740f930dfd021616cc42e8abf21c79d0b07e217)

[https://www.kernel.org/pub/linux/kernel/v3.0/ChangeLog-3.10.1](https://www.kernel.org/pub/linux/kernel/v3.0/ChangeLog-3.10.1)

How to migrate from the normal to hybrid channel: 




1. Update from production

2. Run script.

3. Reboot after script execution is completed.

```
yum update rhn-client-tools
normal-to-hybrid
reboot
```

How to migrate from hybrid to the normal channel:




1. Run script.

2. Reboot after script execution is completed.

```
hybrid-to-normal
reboot
```

**Known limitations and issues** :

1. We do not remove Hybrid kernel after migration from Hybrid to the normal channel, but we remove package which is needed to boot Hybrid kernel. This is because 6 does not allow to remove the package of currently running kernel. Proper removal procedure will be implemented, but for now, we should warn users _not to boot Hybrid kernel if they have migrated to normal channel_ .

2. Kernel module signature isn't checking for now, as 3.10 kernel is using x509 certificates to generate keys and CL6 cannot detect signatures created in such way. The solution will be implemented.

## Reading 


CloudLinux kernel provides real time usage data in file.

All the statistics can be read from that file in real time. Depending on your kernel version you will get either Version 6 of the file, or version 4 of the file.
You can detect the version by reading the first line of the file. It should look like:

4:LVE... for version 4

First line presents headers for the data.
Second line shows default limits for the server, with all other values being 0.
The rest of the lines present limits & usage data on per bases.

Version 6 (CL6 & hybrid kernels):

```
6:LVE        EP        lCPU        lIO        CPU        MEM        IO        lMEM        lEP        nCPU        fMEM        fEP        lMEMPHY        lCPUW        lNPROC        MEMPHY        fMEMPHY        NPROC        fNPROC
0        0        25        1024        0        0        0        262144        20        1        0        0        262144        100        0        0        0        00
300        0        25        1024        1862407        0        0        262144        20        1        0        0        262144        100        0        31        000
```

Version 4 (CL 5 kernel):

```
4:LVE        EP        lCPU        lIO        CPU        MEM        IO        lMEM        lEP        nCPU        fMEM        fEP
0        0        25        25        0        0        0        262144        20        1        0        0
300        0        25        25        15103019        0        0        262144        20        1        0        0
```


| |  |  | |
|-|--|--|-|
|**Label** | **Description** | **Value** | **Supported versions**|
| |  | number | |
| | Number of | number | |
| | Limit | % relative to total | |
| | limits for CL6 or priority for CL5 | KB/s for v6, from 1 to 100 for v4 | |
| | usage since reboot | in nanoseconds for v6, hertz for v4 | |
| | Virtual memory usage | number of 4k pages | |
| | usage | KB/s for v6, 0 for v4 | |
| | Virtual memory limit | number of 4k pages | |
| | limit | number | |
| | Number of cores limit | number of cores | |
| | faults | number of faults | |
| | faults | number of faults | v6+|
| | Physical memory limit | number | v6+|
| | weight (not used) | from 1 to 100 | v6+|
| | limit | number | v6+|
| | Physical memory usage | number of 4k pages | v6+|
| | Physical memory faults | number of faults | v6+|
| |  | number | v6+|
| | faults | number of faults | v6+|
| | operations since reboot | number | v8+|

## flashcache


_* Available only for x86_64, _

is a module originally written and released by and ) in April of 2010. It is a kernel module that allows Writethrough caching of a drive on another drive. This is most often used for caching a rotational drive on a smaller solid-state drive for performance reasons. This gives you the speed of an and the size of a standard rotational drive for recently cached files. originally wrote the module to speed up database , but it is easily extended to any .

To install on 6 & Hybrid servers:

```
$ yum install flashcache
```

More info on : [https://github.com/facebook/flashcache/](https://github.com/facebook/flashcache/)

has a good page explaining how to use :
[https://wiki.archlinux.org/index.php/Flashcache](https://wiki.archlinux.org/index.php/Flashcache)


## OOM Killer


When reaches its memory limit, the processes inside that are killed by and appropriate message is written to . When any hits huge number of memory limits in short period of time, then could cause system overload. Starting from kernel 2.6.32-673.26.1.lve1.4.15 ( 6) and from kernel 3.10.0-427.18.2.lve1.4.14 ( 7) heavy could be disabled. If so - lightweight will be used instead.

By default is enabled, to disable it please run:

_For _ :

```
# echo 1 > /proc/sys/ubc/ubc_oom_disable
```

Also, add the following to file to apply the same during boot:

```
ubc.ubc_oom_disable=1
```

_For _

```
# echo 1 > /proc/sys/kernel/memcg_oom_disable
```

Also, add the following to _ _ file to apply the same during boot:

```
kernel.memcg_oom_disable=1
```



## File System Quotas


In file system, the process with enabled capability is not checked on the quota exceeding by default. It allows userland utilities and to operate without fails even if a user exceeds a quota.

To disable quota checking in file system set option to 1 using the following command:

```
# echo 1 > /proc/sys/fs/xfs/cap_res_quota_disable
```



