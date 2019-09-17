# CloudLinux OS kernel

## Hybrid Kernels


<span class="notranslate">**CloudLinux 6 Hybrid kernel**</span>

<span class="notranslate"> CloudLinux </span> 6 Hybrid Kernel is <span class="notranslate"> CloudLinux </span> 7 (3.10.0) kernel compiled for CloudLinux 6 OS. New 3.10 kernel features a set of performance and scalability improvements related to  <span class="notranslate"> IO </span> , networking and memory management, available in  <span class="notranslate"> CloudLinux 7 OS </span> . It also features improved  <span class="notranslate"> CPU </span>  scheduler for better overall system throughput and latency.

Please find information on the main features of 3.10 kernel branch on the links:

[https://kernelnewbies.org/Linux_3.10#head-e740f930dfd021616cc42e8abf21c79d0b07e217](https://kernelnewbies.org/Linux_3.10#head-e740f930dfd021616cc42e8abf21c79d0b07e217)

[https://www.kernel.org/pub/linux/kernel/v3.0/ChangeLog-3.10.1](https://www.kernel.org/pub/linux/kernel/v3.0/ChangeLog-3.10.1)

<span class="notranslate"> **CloudLinux 7 Hybrid kernel** </span>

<span class="notranslate"> CloudLinux </span> 7 Hybrid Kernel is essentially EL8-based (4.18) kernel compiled for CloudLinux OS 7.

You can find more information on 4.18 kernel branch using this link:

[https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/8.0_release_notes/new-features#kernel](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/8.0_release_notes/new-features#kernel)

How to migrate from the normal to hybrid channel (**CL6h**): 

::: tip Note
The system must be registered in CLN.
:::


1. Update <span class="notranslate"> rhn-client-tools </span> from production

2. Run <span class="notranslate"> normal-to-hybrid </span> script.

3. Reboot after script execution is completed.

<div class="notranslate">

```
yum update rhn-client-tools
normal-to-hybrid
reboot
```
</div>

How to migrate from the normal to hybrid channel (**CL7h**): 

::: tip Note
The system must be registered in CLN.
:::


1. Update <span class="notranslate"> rhn-client-tools rhn-check rhn-setup </span> from testing repository

2. Run <span class="notranslate"> normal-to-hybrid </span> script.

3. Reboot after script execution is completed.

<div class="notranslate">

```
yum update rhn-client-tools rhn-check rhn-setup
normal-to-hybrid
reboot
```
</div>

How to migrate from hybrid to the normal channel (for both CL6h and CL7h):

::: tip Note
The system should be registered in CLN.
:::


1. Run <span class="notranslate"> hybrid-to-normal </span> script.

2. Reboot after script execution is completed.

<div class="notranslate">

```
hybrid-to-normal
reboot
```
</div>

**Known limitations and issues of CloudLinux 6 Hybrid kernel**

1. We do not remove Hybrid kernel after migration from Hybrid to the normal channel, but we remove <span class="notranslate"> linux-firmware </span> package which is needed to boot Hybrid kernel. This is because <span class="notranslate"> CloudLinux </span> 6 does not allow to remove the package of currently running kernel. Proper removal procedure will be implemented, but for now, we should warn users _not to boot Hybrid kernel if they have migrated to normal channel_.

2. Kernel module signature isn't checking for now, as 3.10 kernel is using x509 certificates to generate keys and CL6 cannot detect signatures created in such way. The solution will be implemented.

**Known limitations and issues of CloudLinux 7 Hybrid kernel**

Features that are absent in the current kernel build:

* Per LVE traffic accounting

Note that Symlink Owner Match Protection is enabled by default in CL7 Hybrid kernel. To disable it, use `sysctl` utility:

<div class="notranslate">

```
sysctl -w fs.enforce_symlinksifowner=0
```
</div>

Find more details on [symlink owner match protection](/kernel_settings/#securelinks).


## SecureLinks


CloudLinux provides comprehensive protection against symbolic link attacks popular in shared hosting environment.

The protection requires setting multiple kernel options to be enabled.

### Symlink owner match protection


**_fs.enforce_symlinksifowner_**

To protect against symlink attack where attacker tricks Apache web server to read some other user PHP config files, or other sensitive file, enable:
<div class="notranslate">

```
fs.enforce_symlinksifowner=1
```
</div>

Setting this option will deny any process running under gid _fs.symlinkown_gid_ to follow the symlink if owner of the link doesn’t match the owner of the target file.

Defaults:
<div class="notranslate">

```
fs.enforce_symlinksifowner = 1
fs.symlinkown_gid = 48
```
</div>

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
<div class="notranslate">

```
fs.symlinkown_gid = XX
```
</div>
And execute:
<div class="notranslate">

```
$ sysctl -p
```
</div>

To disable <span class="notranslate"> symlink </span> owner match protection feature, set <span class="notranslate"> _fs.enforce_symlinksifowner = 0_ </span> in <span class="notranslate"> _/etc/sysctl.conf_ </span> , and execute

<div class="notranslate">

```
$ sysctl -p
```
</div>  

::: danger
/proc/sys/fs/global_root_enable [CloudLinux 7 kernel only] [applicable for kernels 3.10.0-427.36.1.lve1.4.42+]
:::

<span class="notranslate"> _proc/sys/fs/global_root_enable_ </span> flag enables following the <span class="notranslate"> symlink </span> with root ownership. If <span class="notranslate"> _global_root_enable=0_ </span> , then <span class="notranslate"> Symlink Owner Match Protection </span> does not verify the <span class="notranslate"> symlink </span> owned by <span class="notranslate"> root.  </span>

For example, in the path <span class="notranslate"> _/proc/self/fd_ ,  _self_ </span> is a <span class="notranslate"> symlink </span> , which leads to a process directory.  The <span class="notranslate"> symlink </span> owner is <span class="notranslate"> root </span> . When <span class="notranslate"> _global_root_enable=0_ , Symlink Owner Match Protection </span> excludes this element from the verification. When <span class="notranslate"> _global_root_enable=1_ </span> , the verification will be performed, which could block the access to _fd_ and cause violation of web site performance.

It is recommended to set _/proc/sys/fs/global_root_enable=0_ by default. If needed, set _/proc/sys/fs/global_root_enable=1_ to increase the level of protection. 

::: tip Note
Starting from lve-utils 3.0-21.2, fs.symlinkown_gid parameter values for httpd service user and fs.proc_super_gid for nagios service user is written to /etc/sysctl.d/90-cloudlinux.conf.
:::


### Link traversal protection 


<span class="notranslate"> [CageFS](/cloudlinux_os_components/#cagefs) </span> is extremely powerful at stopping most information disclosure attacks, where a hacker could read sensitive files like <span class="notranslate">_/etc/passwd_</span> .

Yet, <span class="notranslate"> CageFS </span> does not work in each and every situation. For example, on <span class="notranslate"> cPanel </span> servers, it is not enabled in <span class="notranslate"> WebDAV </span> server, <span class="notranslate"> cPanel </span> file manager and webmail, as well as some FTP servers don’t include proper change rooting.

This allows an attacker to create symlink or hardlink to a sensitive file like <span class="notranslate"> _/etc/passwd_ </span> and then use <span class="notranslate"> WebDAV </span> , filemanager, or webmail to read the content of that file.

Starting with CL6 _kernel 2.6.32-604.16.2.lve1.3.45_, you can prevent such attacks by preventing user from creating symlinks and hardlinks to files that they don’t own.

This is done by set following kernel options to 1:
<div class="notranslate">

```
fs.protected_symlinks_create = 1
fs.protected_hardlinks_create = 1
```
</div>  

::: danger
We do not recommend to use protected_symlinks option for cPanel users as it might break some of the cPanel functionality.
:::   

::: tip Note
Link Traversal Protection is disabled by default for the new CloudLinux OS installations/convertations.
:::

<div class="notranslate"> 

```
fs.protected_symlinks_create = 0
fs.protected_hardlinks_create = 0
```
</div>
Then setup:
<div class="notranslate">

```
fs.protected_symlinks_allow_gid = id_of_group_linksafe
fs.protected_hardlinks_allow_gid = id_of_group_linksafe
```
</div>
This is for example needed by PHP Selector to work (new versions of Alt-PHP can already correctly configure those settings).

To manually adjust the settings, edit: _/etc/sysctl.d/cloudlinux-linksafe.conf_
and execute:
<div class="notranslate">
 
```
sysctl -p /etc/sysctl.d/cloudlinux-linksafe.conf
```
</div>
 or:
<div class="notranslate"> 

```
sysctl --system
```
</div>
 
:::tip Note
Starting from lvemanager 4.0-25.5, if there is no /etc/sysctl.d/cloudlinux-linksafe.conf config file, selectorctl for PHP with --setup-without-cagefs and --revert-to-cagefs keys writes fs.protected_symlinks_create and fs.protected_hardlinks_create parameters to /etc/sysctl.d/90-cloudlinux.conf.
:::

## File change API

### General

**General description**


One of the main problems on a shared hosting system for file backup operations is to figure out which files have changed. Using <span class="notranslate"> INOTIFY </span> on a 1T drive with a large number of small files and directories guarantees slow startup times, and a lot of context switching between kernel and userspace - generating additional load. On the other hand scanning disk for newly modified files is very <span class="notranslate"> IO </span> intensive, and can kill the performance of the fastest disks.

**CloudLinux approach**

<span class="notranslate"> CloudLinux File Change API </span> is a kernel level technology with the user space interface that buffers lists of modified files in the kernel and then off-loads that list to user space daemon.

After that - any software (with enough permissions) can get a list of files that has been modified for the last 24 hours.

The software is very simple to use and produces the  list of modified files. As such we expect file backup software, including integrated cPanel backup system to integrate with this <span class="notranslate"> API </span> soon.

### Usage and integration


**Userland utilities**

<span class="notranslate">/usr/bin/cloudlinux-backup-helper </span> is a utility for getting the list of changed files.

It is supposed to be run by a super user only.

Command line parameters:
<div class="notranslate">

```
-t | --timestamp retrieve file names for files modified after specified timestamp
-u | --uid       retrieve file names for particular UID only
```
</div>
If no UID specified, are retrieved for all users. If no timestamp specified, all database events are shown.

**Output format**
<div class="notranslate">

```
protocol version (1 right now), timestamp (in seconds) - up to which time data was collected
UID:absolute path to file changed
UID:absolute path to file changed
…
```
</div>   

:::tip Note
The timestamp in output is needed so you can clearly identify from which timestamp to get list of changed files next.
:::

**_Examples:_**
<div class="notranslate">

```
[root@localhost ~]# cloudlinux-backup-helper -t 1495533489 -u <UID>
1,1495533925
1001:/home/user2/public_html/output.txt
1001:/home/user2/public_html/info.php
[root@localhost ~]# cloudlinux-backup-helper -t 1495533489
1,1495533925
1000:/home/user1/.bashrc
1001:/home/user2/public_html/output.txt
1001:/home/user2/public_html/info.php
1003:/home/user3/logs/data.log
```
</div>
**Getting changed files by end user**

<span class="notranslate">/usr/bin/cloudlinux-backup-helper-uid</span>  is a SUID wrapper for the  <span class="notranslate"> cloudlinux-backup-helper </span>  utility that enables an end user to get the list of files changed. It accepts timestamp argument only and retrieves data of the user who is running it only.

**_Examples:_**
<div class="notranslate">

```
[user@localhost ~]$ cloudlinux-backup-helper-uid               
1,1495530576
1000:/home/user/.bash_history 

[user@localhost ~]$ cloudlinux-backup-helper-uid -t 1495547922
1,1495548343
1000:/home/user/file1.txt
1000:/home/user/file2.txt
```
</div>
This command is available within CageFS.

### Installation and configuration


<span class="notranslate"> **cloudlinux-fchange-0.1-5** </span>

**Requirements**

<span class="notranslate"> CloudLinux OS </span> 6 (requires Hybrid kernel) or 7
Kernel Version: 3.10.0-427.36.1.lve1.4.47

**Installation and configuration**

To install <span class="notranslate"> cloudlinux-fchange </span> system run:

_CloudLinux 7:_
<div class="notranslate">

```
yum install cloudlinux-fchange --enablerepo=cloudlinux-updates-testing
```
</div>

_CloudLinux 6 Hybrid:_

<div class="notranslate">

```
yum install cloudlinux-fchange --enablerepo=cloudlinux-hybrid-testing
```
</div>
Configuration file can be found in <span class="notranslate">/etc/sysconfig/cloudlinux-fchange </span>

Database containing list of modified files is located at <span class="notranslate">/var/lve/cloudlinux-fchange.db </span> by default.

**Starting and stopping**

After successful installation the event collecting daemon starts automatically, providing all <span class="notranslate"> kernel-exposed </span> data are in place.

To start daemon:
<span class="notranslate">_CloudLinux 7:_ </span>

<div class="notranslate">

```
systemctl start cloudlinux-file-change-collector
```
</div>

_CloudLinux 6 Hybrid:_

<div class="notranslate">

```
service cloudlinux-file-change-collector start
```
</div>
To stop daemon:
<span class="notranslate"> </span>
_CloudLinux 7:_

<div class="notranslate">

```
systemctl stop cloudlinux-file-change-collector
```
</div>

_CloudLinux 6 Hybrid:_

<div class="notranslate">

```
service cloudlinux-file-change-collector stop
```
</div>


To uninstall <span class="notranslate"> cloudlinux-fchange </span> run:
<div class="notranslate">

```
yum remove cloudlinux-fchange
```
</div>

### Configuration details


Configuration resides in <span class="notranslate">/etc/sysconfig/cloudlinux-fchange</span>. The following is the default configuration (see comments):
<div class="notranslate">

```
# sqlite database file path. If commented out a default value is used
#database_path=/var/lve/cloudlinux-fchange.db

# If uncommented paths starting with 'include' one are processed only
# Pay attention this parameter is a regular string, not a regex
# To include more than one item just specify several lines to include:
# include=/one
# include=/two

# If uncommented exclude paths which contain 'exclude'
# Pay attention this parameter is a regular string, not a regex
# To exclude more than one item just specify several lines to exclude:
# exclude=var
# exclude=tmp

# Daemon polling interval in seconds
polling_interval=5 

# Time to keep entries in days. Does not clean if commented out or zero
time_to_keep=1

# User read-only mode minimal UID
# If file change collector stopped, all users with UID >= user_ro_mode_min_uid
# are restricted to write to their home directory. This prevents to miss
# a file change event.
# Value of -1 (default) allows to disable the feature
user_ro_mode_min_uid=-1

# Minimal UID of events to be processed.
# Events of users with UID less then specified are not handled.
# By default 500 (non-system users for redhat-based systems)
#minimal_event_uid=500
 
# SQLite shared lock prevents setting more restrictive locks. That is a
# process cannot write to a database table when a concurrent process reads
# from the table. As saving data to database is considered far more important
# than getting them (data could be reread a second later after all), database
# writer could try to terminate concurrent reading processes. Just set
# terminate rivals to 'yes' to turn this ability on.
# terminate_rivals=no 

# Events to be handled. Currently the following types of events are processed:
# 1. file creation
# 2. file deletion
# 3. directory creation
# 4. directory deletion
# 5. file content/metadata modification
# 6. file/directory attributes/ownership modification
# 7. hardlink creation
# 8. symlink creation
# 9. file/directory moving/renaming
# By default all events are processed. Keep in mind that events for a filepath
# are cached, i.e if a file was deleted and then a file with the same absolute
# name is created, only the deletion event is triggerred. Changing file
# modification timestamp with command 'touch' will trigger modification event
# as if a file content is modified.
# Currently supported options are:
# file_created, file_modified, file_deleted, dir_created, dir_deleted,
# owner_changed, attrib_changed, moved, hardlink_created, symlink_created, all
# Options that don't have 'file' or 'dir' prefix, applied to both files and
# directories. To set more than one options, separate them with commas,
# e.g. event_types=file_created,file_deleted,file_modified. Unknown options are
# ignored.
#
# event_types=all
```
</div>

:::tip Note
Please keep in mind, that current implementation implies that one process is writing to a database and another is reading from it. As reading sets shared lock to a database table, the writing process cannot write to the table until the lock is released. That’s why passing a timestamp to cloudlinux-backup-helpermatters: this way the number of records to be returned is substantially decreased, lowering the processing time and filtering out old records. Likewise, pay attention to narrowing the scope of events being recorded. Chances are that changing attributes, ownership, directory creation/deletion, symlink events are not relevant and there’s no need to keep them.
:::

### Low-level access

:::tip Note
Using this options is dangerous, and might cause problems with <span class="notranslate">CloudLinux File Change API.</span>
:::

The kernel exposes the functionality to folder.

1. <span class="notranslate"> **enable** </span> - enable/disable the functionality. Write 1 to this file to enable, 0 to disable. If disabled, no events are coming to events file.

2. <span class="notranslate"> **events** </span> - the modified files log itself. Events in the format <span class="notranslate"> <EVENT_ID>:<EVENT_TYPE_ID>:<USER_ID>:<FILE_PATH> </span> are constantly appending to the end of the file if datacycle enabled. File events are never duplicated: if we have file modification event, we would not get file deletion event if the file has been later deleted. This events buffer has limited capacity, therefore from time to time, the events log requires flushing.

3. <span class="notranslate"> **flush** </span> - a file for clearing events log. For flushing, the last <span class="notranslate"> event_id </span> from the events file is written to this file. Right after this, events log is truncated to that <span class="notranslate"> event_id </span> .

4. <span class="notranslate"> **user_ro_mode** </span> - forbidding users with UIDs equal or bigger that set in this file writing to their home directories. At the boot, the file has -1. When it’s written positive value, say 500, the system starts effectively preventing users from modifying their home dirs (on write attempt a user gets <span class="notranslate"> ‘read-only filesystem’ </span> error). This feature is designed to prevent users from updating their home dirs when events are not handled.

5. <span class="notranslate"> **entries_in_buffer** </span> - just counter of log entries of events file.

6. <span class="notranslate"> **min_event_uid** </span> - this file has minimal UID of events to be handled. Events from users with smaller UID are not handled. By default 500 (non-system users in redhat-based systems).

## Tuned-profiles-cloudlinux

The <span class="notranslate"> **_tuned-profiles-cloudlinux_** </span> package brings a range of kernel under-the-hood tunings to address high LA, iowait issues what were detected earlier on particular users deploys. The package also encloses OOM adjustments to prioritize the elimination of overrun PHP, <span class="notranslate"> lsphp, Phusion Passenger </span> workers processes over other processes (e.g. ssh, a cron job).

There are three profiles provided by CloudLinux:
<div class="notranslate">

```
# tuned-adm list | grep cloudlinux
- cloudlinux-default          - Default CloudLinux tuned profile
- cloudlinux-dummy            - Empty CloudLinux tuned profile
- cloudlinux-vz               - Empty CloudLinux tuned profile
```
</div>


<span class="notranslate"> cloudlinux-dummy</span> and  <span class="notranslate"> cloudlinux-vz</span> are used for internal needs or when  <span class="notranslate"> Virtuozzo/OpenVZ </span>  detected and actually do nothing.  

<span class="notranslate"> cloudlinux-default </span> is one to be used, it actually does the following:

1. Switches CPU power consumption mode to the maximum. CPU operates at maximum performance at the maximum clock rate:

<div class="notranslate">

```
governor=performance
energy_perf_bias=performance
```
</div>

::: tip Note
If standard software CPU governors are used.
:::



 2. Applies the following kernel options:  
<span class="notranslate"> 
vm.force_scan_thresh=100 </span> - Improves kernel memory clean-up in case of big number of running LVE.

UBC parameters set the limits for the containers:

<span class="notranslate">  ubc.dirty_ratio=100 </span> - Defines maximum RAM percentage for dirty memory pages.
<span class="notranslate"> dirty_background_ratio=75</span> - Defines RAM percentage when to allow writing dirty pages on the disk.

3. _[CloudLinux 7 only]_ Detects used disk types and changes elevator to <span class="notranslate"> 'deadline' </span> for HDD and to <span class="notranslate"> 'noop' </span> for SSD in <span class="notranslate"> /sys/block/[blockname]/queue/scheduler </span> . 

::: tip Note
<span class="notranslate">The script uses /sys/block/[blockname]/queue/rotational flag, some RAID controllers can not set it properly. For example, SSD used for RAID but rotational is set to 1 by RAID driver. As a workaround add the following to /etc/rc.d/rc.local to make it applied on boot:</span>
:::

<div class="notranslate">

```
echo "noop" > /sys/block/[blockname]/queue/scheduler  
echo "0" > /sys/block/[blockname]/queue/rotational
```
</div>


Where <span class="notranslate"> _[blockname]_ </span> is used device name, like <span class="notranslate"> _sda/sdb_ </span> .

And make it executable:
<div class="notranslate">

```
chmod +x /etc/rc.d/rc.local
```
</div>

4. _[CloudLinux 7 only]_ The profile sets <span class="notranslate"> I/O </span> scheduler. For the normal discs the <span class="notranslate"> Deadline Scheduler </span> is set to improve <span class="notranslate"> IO </span> performance and decrease <span class="notranslate"> IO </span> latency, for SSD - noop.
When configuring scheduler <span class="notranslate"> I/O </span> queue is changed and set to the value 1024 which improves overall <span class="notranslate"> I/O </span> subsystem performance by caching <span class="notranslate"> IO </span> requests in memory.

5. Disables transparent <span class="notranslate"> HugePage </span> .

6. Provides adjustment group file for OOM-Killer to kill overrun php, lsphp and <span class="notranslate"> Phusion Passenger </span> workers first.

To install:

<div class="notranslate">

```
yum install tuned-profiles-cloudlinux
```
</div>

To start using a profile:

<div class="notranslate">

```
tuned-adm profile cloudlinux-default
```
</div>

To stop using a profile:

<div class="notranslate">

```
tuned-adm off
```
</div>


## Kernel config variables

Starting from **lvemanager 4.0-25.5** , **lve-utils 3.0-21.2** , and **cagefs-6.1-26** , CloudLinux OS utilities can read/write kernel config variables from a custom config /etc/sysctl.d/90-cloudlinux.conf (earlier, the parameters were read/written only from sysctl.conf ).

CloudLinux OS utilities get parameter by using _sysctl_ system utility. So for now, even if a config variable is not set in the _sysctl.conf_ and in the _/etc/sysctl.d_ config files, this variable will be read by _sysctl_ utility directly from _/proc/sys_ .

If some kernel variable was set in _/etc/sysctl.d/90-cloudlinux.conf_ do
<div class="notranslate">

```
sysctl --system
```
</div>
to apply the parameters before reading and after writing.

Starting from **cagefs-6.1-27**,  fs.proc_can_see_other_uid will be migrated (one time) from /etc/sysctl.conf into /etc/sysctl.d/90-cloudlinux.conf . If this variable is not set in either file, it will default to 0.
It is strongly advised against setting this variable in 90-cloudlinux.conf . Define it in /etc/sysctl.conf or in some other config file with an index number greater than 90-cloudlinux.conf , e.g. `/etc/sysctl.d/95-custom.conf`.

Starting from **lve-utils-3.0-23.7**  fs.proc_super_gid and fs.symlinkown_gid will be migrated (one time) from /etc/sysctl.conf into /etc/sysctl.d/90-cloudlinux.conf .

For **lve-utils** versions from 3.0-21.2 to 3.0-23.7 the migration was performed the same way, but during every package install/update.
Variables setting guidelines are the same as for CageFS (see above).

As requested by some our customers, we've implemented a new kernel setting to hide `/proc/net/{tcp,udp,unix}` files for additional security/isolation.
You can hide them by runnign `sysctl -w kernel.proc_disable_net=1` command, and by default, it's `0` (nothing hidden).

## Virtualized /proc filesystem

You can prevent user from seeing processes of other users (via ps/top command) as well as special files in /proc file system by setting fs.proc_can_see_other_uid sysctl.

To do that, edit /etc/sysctl.conf
<div class="notranslate">

```
fs.proc_can_see_other_uid=0
fs.proc_super_gid=600
```
</div>
And do:
<div class="notranslate">

```
# sysctl -p
```
</div>
fs.proc_can_see_other_uid=0

If fs.proc_can_see_other_uid is set to 0, users will not be able to see special files. If it is set to 1 - user will see other processes IDs in /proc filesystem.

fs.proc_super_gid=XX

The fs.proc_super_gid sets group ID which will see system files in /proc, add any users to that group so they will see all files in /proc. Usually needed by some monitoring users like nagios or zabbix and [cldetect utility](/command-line_tools/#cldetect) can configure few most commonly used monitoring software automatically.

Virtualized /proc filesystem will only display following files (as well as directories for PIDs for the user) to unprivileged users:
<div class="notranslate">

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
</div>   

:::tip Note
Starting from lve-utils 3.0-21.2, fs.proc_super_gid parameter in da_add_admin utility is written to /etc/sysctl.d/90-cloudlinux.conf.
:::

### Remounting procfs with "hidepid" option

In **lve-utils-2.1-3.2** and later `/proc` can be remounted with `hidepid=2` option to enable additional protection for procfs. This remount is performed in lve_namespaces service.
This option is in sync with `fs.proc_can_see_other_uid` kernel parameter described above.
When `/etc/sysctl.conf` does not contain `fs.proc_can_see_other_uid` setting, the protection is off (procfs is remounted with `hidepid=0` option). In this case `fs.proc_super_gid` setting is ignored. Users are able to see full `/proc` including processes of other users on a server. This is a default behavior.

If `/etc/sysctl.conf` contains `fs.proc_can_see_other_uid=1` setting, then `/proc` will be remounted with `hidepid=0` option (disable `hidepid` protection for all users).
If `/etc/sysctl.conf` contains `fs.proc_can_see_other_uid=0` setting, then `/proc` will be remounted with `hidepid=2` option (enable `hidepid` protection for all users).
If `/etc/sysctl.conf` contains `fs.proc_can_see_other_uid=0` and `fs.proc_super_gid=$GID` settings, then `/proc` will be remounted with `hidepid=2, gid=$GID` options (enable `hidepid` for all users except users in group with gid $GID).

To apply `/etc/sysctl.conf` changes, you should execute
<div class="notranslate">

```
service lve_namespaces restart
```
</div>
 Or
<div class="notranslate">
 
```
/usr/share/cloudlinux/remount_proc.py
```
</div>

So, admin can prevent users from seeing processes of other users via `fs.proc_can_see_other_uid` and `fs.proc_super_gid` settings in `/etc/sysctl.conf`, like earlier.

Also, you can override this by specifying desired options for `/proc` in `/etc/fstab`.

To disable hidepid, add to `/etc/fstab` the following:
<div class="notranslate">

```
proc /proc proc defaults,hidepid=0,gid=0 0 0
```
</div>
Or you can specify desired hidepid and gid values explicitly:
<div class="notranslate">

```
proc /proc proc defaults,hidepid=2,gid=clsupergid 0 0
```
</div>
 You should execute
<div class="notranslate">
 
```
mount -o remount /proc
```
</div>

to apply `/etc/fstab` changes.  
Nevertheless, we recommend to manage procfs mount options via `/etc/sysctl.conf` as described above for backward compatibility. 

::: tip Note
There is a known issue on CloudLinux 6 systems. User cannot see full /proc inside CageFS even when this user is in “super” group, that should see full /proc. This issue does not affect users with CageFS disabled. CloudLinux 7 is not affected.
:::

::: tip Note
Starting from lve-utils 3.0-21.2, lve_namespaces service can read parameters from the /etc/sysctl.d/90-cloudlinux.conf.
:::

::: tip Note
Even if fs.proc_can_see_other_uid and fs.proc_super_gid parameters are not set in config files but specified in /proc/sys, then when restarting lve_namespaces service the parameters from /proc/sys will be used. So, /proc will be remounted according to these parameters.
:::


## Ptrace block

Starting with kernel 3.10.0-427.18.s2.lve1.4.21 ( <span class="notranslate"> CloudLinux </span> 7) and 2.6.32-673.26.1.lve1.4.17 ( <span class="notranslate"> CloudLinux </span> 6) we re-implemented <span class="notranslate"> ptrace block </span> to protect against <span class="notranslate"> ptrace </span> family of vulnerabilities. It prevents end user from using any <span class="notranslate"> ptrace </span> related functionality, including such commands as <span class="notranslate"> strace, lsof </span> or <span class="notranslate"> gdb </span> .

By default, <span class="notranslate"> CloudLinux </span> doesn't prevent <span class="notranslate"> ptrace </span> functionality.

Defaults:
<div class="notranslate">

```
kernel.user_ptrace = 1
kernel.user_ptrace_self = 1
```
</div>

The option <span class="notranslate"> kernel.user_ptrace </span> disables <span class="notranslate"> PTRACE_ATTACH </span> functionality, option <span class="notranslate"> kernel.user_ptrace_self </span> disables <span class="notranslate"> PTRACE_TRACEME </span> .

To disable all <span class="notranslate"> ptrace </span> functionality change both <span class="notranslate"> sysctl </span> options to 0, add this section to <span class="notranslate"> /etc/sysctl.conf </span> :
<div class="notranslate">

```
## CL. Disable ptrace for users
kernel.user_ptrace = 0
kernel.user_ptrace_self = 0
##
```
</div>

Apply changes with:
<div class="notranslate">

```
$ sysctl -p
```
</div>

Different software could need different access to <span class="notranslate"> ptrace </span> , you may need to change only one option to 0 to make them working. In this case, there will be only partial <span class="notranslate"> ptrace </span> protection. 

::: danger
ptrace protection is known to break PSA service for Plesk 11
:::

## Xen XVDA

2.6.32 kernels have different mode of naming <span class="notranslate"> Xen XVDA </span> drives.

By adding <span class="notranslate"> xen_blkfront.sda_is_xvda=0 </span> to kernel boot line in <span class="notranslate"> grub.conf </span> you will make sure no naming translation is done, and the drives will be identified as <span class="notranslate"> xvde </span> .

By default, this option is set to 1 in the kernel, and drives are detected as <span class="notranslate"> xvda </span> .
This is needed only for CloudLinux 6 and <span class="notranslate"> Hybrid </span> kernels.

## IO limits latency

**[lve1.2.29+]**

When customer reaches <span class="notranslate"> IO Limit, the processes that are waiting for  <span class="notranslate"> IO will be placed to sleep to make sure they don't go over the limit. That could make some processes sleep for a very long time. </span> </span>
By defining <span class="notranslate"> IO latency, you can make sure that no process sleeps due to  <span class="notranslate"> IO limit for more then X milliseconds. By doing so, you will also let customers to burst through the limits, and use up more than they were limited too in some instances. </span> </span>

This option is <span class="notranslate"> OFF by default. </span>

_For CloudLinux 6 and CloudLinux 7 (since Hybrid kernel lve1.4.x.el5h):_

To enable <span class="notranslate"> IO </span> Limits latency and set it to 10 seconds:
<div class="notranslate">

```
# echo 10000 > /sys/module/kmodlve/parameters/latency
```
</div>
To disable latency:
<div class="notranslate">

```
# echo 2000000000 > /sys/module/kmodlve/parameters/latency
```
</div>

It is possible to set, for example, 1000 as a permanent value. To do so, create a file <span class="notranslate">/etc/modprobe.d/kmodlve.conf </span> with the following content:  
<span class="notranslate">`options kmodlve latency=1000` </span>


_For <span class="notranslate"> CloudLinux </span> 5 (OBSOLETE):_

To enable <span class="notranslate"> IO </span> Limits latency and set it to 10 seconds:
<div class="notranslate">

```
# echo 10000 > /sys/module/iolimits/**parameters/latency
```
</div>
To disable latency:
<div class="notranslate">

```
# echo 2000000000 > /sys/module/iolimits/**parameters/latency
```
</div>


## Reading LVE usage

CloudLinux kernel provides real time usage data in file.

All the statistics can be read from that file in real time. Depending on your kernel version you will get either Version 6 of the file, or version 4 of the file.
You can detect the version by reading the first line of the file. It should look like:
 
6:LVE... for version 6  
4:LVE... for version 4

First line presents headers for the data.
Second line shows default limits for the server, with all other values being 0.
The rest of the lines present limits & usage data on per <span class="notranslate"> LVE </span> bases.

Version 6 (CL6 & hybrid kernels):
<div class="notranslate">

```
6:LVE        EP        lCPU        lIO        CPU        MEM        IO        lMEM        lEP        nCPU        fMEM        fEP        lMEMPHY        lCPUW        lNPROC        MEMPHY        fMEMPHY        NPROC        fNPROC
0        0        25        1024        0        0        0        262144        20        1        0        0        262144        100        0        0        0        00
300        0        25        1024        1862407        0        0        262144        20        1        0        0        262144        100        0        31        000
```
</div>

| |  |  | |
|-|--|--|-|
|**Label** | **Description** | **Value** | **Supported versions**|
|<span class="notranslate"> LVE </span> | <span class="notranslate"> LVE ID </span> | number | |
|<span class="notranslate"> EP </span> | Number of <span class="notranslate"> entry processes </span> | number | |
|<span class="notranslate"> lCPU </span> | <span class="notranslate"> CPU </span> Limit | % relative to total <span class="notranslate"> CPU power </span> | |
|<span class="notranslate"> lIO </span> | <span class="notranslate"> IO </span> limits for CL6 | KB/s for v6, from 1 to 100 for v4 | |
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

## Flashcache

:::tip Note
Available only for x86_64, <span class="notranslate">CloudLinux</span> 6 and Hybrid servers
:::

<span class="notranslate"> Flashcache </span> is a module originally written and released by <span class="notranslate">  Facebook (Mohan Srinivasan, Paul Saab </span> and <span class="notranslate"> Vadim Tkachenko </span> ) in April of 2010. It is a kernel module that allows Writethrough caching of a drive on another drive. This is most often used for caching a rotational drive on a smaller solid-state drive for performance reasons. This gives you the speed of an <span class="notranslate"> SSD </span> and the size of a standard rotational drive for recently cached files. <span class="notranslate"> Facebook </span> originally wrote the module to speed up database <span class="notranslate"> I/O </span> , but it is easily extended to any <span class="notranslate"> I/O </span> .

To install on <span class="notranslate"> CloudLinux </span> 6 & Hybrid servers:
<div class="notranslate">

```
$ yum install flashcache
```
</div>

More info on <span class="notranslate"> flashcache </span> : [https://github.com/facebook/flashcache/](https://github.com/facebook/flashcache/)

<span class="notranslate"> ArchLinux </span> has a good page explaining how to use <span class="notranslate"> flashcache </span> :
[https://wiki.archlinux.org/index.php/Flashcache](https://wiki.archlinux.org/index.php/Flashcache)


## OOM killer for LVE processes

When <span class="notranslate">LVE</span> reaches its memory limit, the processes inside that <span class="notranslate"> LVE </span> are killed by <span class="notranslate"> OOM Killer </span> and appropriate message is written to <span class="notranslate"> /var/log/messages </span> . When any <span class="notranslate"> LVE </span> hits huge number of memory limits in short period of time, then <span class="notranslate"> OOM Killer </span> could cause system overload. Starting from kernel 2.6.32-673.26.1.lve1.4.15 ( <span class="notranslate"> CloudLinux </span> 6) and from kernel 3.10.0-427.18.2.lve1.4.14 ( <span class="notranslate"> CloudLinux </span> 7) heavy <span class="notranslate"> OOM Killer </span> could be disabled. If so - lightweight <span class="notranslate"> SIGKILL </span> will be used instead.

By default <span class="notranslate"> OOM Killer </span> is enabled, to disable it please run:

_For <span class="notranslate"> CloudLinux </span> 6_ :
<div class="notranslate">

```
# echo 1 > /proc/sys/ubc/ubc_oom_disable
```
</div>

Also, add the following to <span class="notranslate"> _/etc/sysctl.conf_ </span> file to apply the same during boot:
<div class="notranslate">

```
ubc.ubc_oom_disable=1
```
</div>

_For <span class="notranslate"> CloudLinux </span> 7:_
<div class="notranslate">

```
# echo 1 > /proc/sys/kernel/memcg_oom_disable
```
</div>

Also, add the following to <span class="notranslate"> _/etc/sysctl.conf_ </span> file to apply the same during boot:
<div class="notranslate">

```
kernel.memcg_oom_disable=1
```
</div>


## File system quotas


In <span class="notranslate"> **Ext4** </span> file system, the process with enabled capability <span class="notranslate"> CAP_SYS_RESOURCE </span> is not checked on the quota exceeding by default. It allows userland utilities <span class="notranslate"> _selectorctl_ </span> and <span class="notranslate"> _cagefs_ </span> to operate without fails even if a user exceeds a quota.

To disable quota checking in <span class="notranslate"> **XFS** </span> file system set <span class="notranslate"> _cap_res_quota_disable_ </span> option to 1 using the following command:
<div class="notranslate">

```
# echo 1 > /proc/sys/fs/xfs/cap_res_quota_disable
```
</div>