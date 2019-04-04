# File Change API



[General Information](/cloudlinux-fchange/#general)

[Usage and Integration](/cloudlinux-fchange/#usage-and-integration)

[Installation and Configuration](/cloudlinux-fchange/#installation-and-configuration)

[Configuration Details](/cloudlinux-fchange/#configuration-details)

[Low-level access](/cloudlinux-fchange/#low-level-access)



## General

**General description**


One of the main problems on a shared hosting system for file backup operations is to figure out which files have changed. Using <span class="notranslate"> INOTIFY </span> on a 1T drive with a large number of small files and directories guarantees slow startup times, and a lot of context switching between kernel and userspace - generating additional load. On the other hand scanning disk for newly modified files is very <span class="notranslate"> IO </span> intensive, and can kill the performance of the fastest disks.

**CloudLinux approach**

<span class="notranslate"> CloudLinux File Change API </span> is a kernel level technology with the user space interface that buffers lists of modified files in the kernel and then off-loads that list to user space daemon.

After that - any software (with enough permissions) can get a list of files that has been modified for the last 24 hours.

The software is very simple to use and produces the  list of modified files. As such we expect file backup software, including integrated cPanel backup system to integrate with this <span class="notranslate"> API </span> soon.

## Usage and Integration


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

**Output Format**
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

## Installation and Configuration


<span class="notranslate"> **cloudlinux-fchange-0.1-5** </span>

**Requirements**

<span class="notranslate"> CloudLinux OS </span> 6 (requires Hybrid kernel) or 7
Kernel Version: 3.10.0-427.36.1.lve1.4.47

**Installation and Configuration**

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

**Starting and Stopping**

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

## Configuration Details


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

## Low-level access

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

