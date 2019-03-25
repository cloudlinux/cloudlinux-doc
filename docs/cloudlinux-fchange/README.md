# File Change API



[General Information](/cloudlinux-fchange/#general)

[Usage and Integration](/cloudlinux-fchange/#usage-and-integration)

[Installation and Configuration](/cloudlinux-fchange/#installation-and-configuration)

[Configuration Details](/cloudlinux-fchange/#configuration-details)

[Low-level access](/cloudlinux-fchange/#low-level-access)



## General




One of the main problems on a shared hosting system for file backup operations is to figure out which files have changed. Using <span class="notranslate"> INOTIFY </span> on a 1T drive with a large number of small files and directories guarantees slow startup times, and a lot of context switching between kernel and userspace - generating additional load. On the other hand scanning disk for newly modified files is very <span class="notranslate"> IO </span> intensive, and can kill the performance of the fastest disks.



<span class="notranslate"> CloudLinux File Change API </span> is a kernel level technology with the user space interface that buffers lists of modified files in the kernel and then off-loads that list to user space daemon.

After that - any software (with enough permissions) can get a list of files that has been modified for the last 24 hours.

The software is very simple to use and produces the  list of modified files. As such we expect file backup software, including integrated cPanel backup system to integrate with this <span class="notranslate"> API </span> soon.

## Usage and Integration


**Userland utilities**

<span class="notranslate"> </span> is a utility for getting the list of changed files.

It is supposed to be run by a super user only.

Command line parameters:
<span class="notranslate"> </span>
```
-t | --timestamp retrieve file names for files modified after specified timestamp-u | --uid       retrieve file names for particular UID only
```

If no UID specified, are retrieved for all users. If no timestamp specified, all database events are shown.

**Output Format**
<span class="notranslate"> </span>
```
protocol version (1 right now), timestamp (in seconds) - up to which time data was collectedUID:absolute path to file changedUID:absolute path to file changed…
```
   


**_Examples:_**
<span class="notranslate"> </span>
```
[root@localhost ~]# cloudlinux-backup-helper -t 1495533489 -u <UID>1,14955339251001:/home/user2/public_html/output.txt1001:/home/user2/public_html/info.php[root@localhost ~]# cloudlinux-backup-helper -t 14955334891,14955339251000:/home/user1/.bashrc1001:/home/user2/public_html/output.txt1001:/home/user2/public_html/info.php1003:/home/user3/logs/data.log
```

**Getting changed files by end user**

<span class="notranslate">  is a SUID wrapper for the  <span class="notranslate"> cloudlinux-backup-helper </span>  utility that enables an end user to get the list of files changed. It accepts timestamp argument only and retrieves data of the user who is running it only. </span>

**_Examples:_**
<span class="notranslate"> </span>
```
[user@localhost ~]$ cloudlinux-backup-helper-uid               1,14955305761000:/home/user/.bash_history [user@localhost ~]$ cloudlinux-backup-helper-uid -t 14955479221,14955483431000:/home/user/file1.txt1000:/home/user/file2.txt
```

This command is available within CageFS.

## Installation and Configuration


<span class="notranslate"> **cloudlinux-fchange-0.1-5** </span>



<span class="notranslate"> CloudLinux OS </span> 6 (requires Hybrid kernel) or 7
Kernel Version: 3.10.0-427.36.1.lve1.4.47



To install <span class="notranslate"> cloudlinux-fchange </span> system run:

<span class="notranslate"> </span>
_CloudLinux 7_  _ _
```
yum install cloudlinux-fchange --enablerepo=cloudlinux-updates-testing
```

_CloudLinux 6 Hybrid_  _ _
```
yum install cloudlinux-fchange --enablerepo=cloudlinux-hybrid-testing
```

Configuration file can be found in <span class="notranslate"> </span>

Database containing list of modified files is located at <span class="notranslate"> </span> by default.



After successful installation the event collecting daemon starts automatically, providing all <span class="notranslate"> kernel-exposed </span> data are in place.

To start daemon:
<span class="notranslate"> </span>
_CloudLinux 7_  _ _
```
systemctl start cloudlinux-file-change-collector
```

_CloudLinux 6 Hybrid _  _ _
```
service cloudlinux-file-change-collector start
```

To stop daemon:
<span class="notranslate"> </span>
_CloudLinux 7 _  _ _
```
systemctl stop cloudlinux-file-change-collector
```

_CloudLinux 6 Hybrid_  _ _
```
service cloudlinux-file-change-collector stop
```



To uninstall <span class="notranslate"> cloudlinux-fchange </span> run:
<span class="notranslate"> </span>
```
yum remove cloudlinux-fchange
```


## Configuration Details


Configuration resides in <span class="notranslate"> </span> . The following is the default configuration (see comments):
 <span class="notranslate"> </span>

































































  


## Low-level access



  The kernel exposes the functionality to folder.

<span class="notranslate"> **enable** </span> - enable/disable the functionality. Write 1 to this file to enable, 0 to disable. If disabled, no events are coming to events file.

<span class="notranslate"> **events** </span> - the modified files log itself. Events in the format <span class="notranslate"> <EVENT_ID>:<EVENT_TYPE_ID>:<USER_ID>:<FILE_PATH> </span> are constantly appending to the end of the file if datacycle enabled. File events are never duplicated: if we have file modification event, we would not get file deletion event if the file has been later deleted. This events buffer has limited capacity, therefore from time to time, the events log requires flushing.

<span class="notranslate"> **flush** </span> - a file for clearing events log. For flushing, the last <span class="notranslate"> event_id </span> from the events file is written to this file. Right after this, events log is truncated to that <span class="notranslate"> event_id </span> .

<span class="notranslate"> **user_ro_mode** </span> - forbidding users with UIDs equal or bigger that set in this file writing to their home directories. At the boot, the file has -1. When it’s written positive value, say 500, the system starts effectively preventing users from modifying their home dirs (on write attempt a user gets <span class="notranslate"> ‘read-only filesystem’ </span> error). This feature is designed to prevent users from updating their home dirs when events are not handled.

<span class="notranslate"> **entries_in_buffer** </span> - just counter of log entries of events file.

<span class="notranslate"> **min_event_uid** </span> - this file has minimal UID of events to be handled. Events from users with smaller UID are not handled. By default 500 (non-system users in redhat-based systems).

