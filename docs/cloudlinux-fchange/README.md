# File Change API



[General Information](/general/)

[Usage and Integration](/usage_and_integration/)

[Installation and Configuration](/installation_and_configuration/)

[Configuration Details](/configuration_details/)

[Low-level access](/low-level_access/)



## General




One of the main problems on a shared hosting system for file backup operations is to figure out which files have changed. Using on a 1T drive with a large number of small files and directories guarantees slow startup times, and a lot of context switching between kernel and userspace - generating additional load. On the other hand scanning disk for newly modified files is very intensive, and can kill the performance of the fastest disks.



is a kernel level technology with the user space interface that buffers lists of modified files in the kernel and then off-loads that list to user space daemon.

After that - any software (with enough permissions) can get a list of files that has been modified for the last 24 hours.

The software is very simple to use and produces the  list of modified files. As such we expect file backup software, including integrated cPanel backup system to integrate with this soon.

## Usage and Integration


**Userland utilities**

is a utility for getting the list of changed files.

It is supposed to be run by a super user only.

Command line parameters:

```
-t | --timestamp retrieve file names for files modified after specified timestamp
-u | --uid       retrieve file names for particular UID only
```

If no UID specified, are retrieved for all users. If no timestamp specified, all database events are shown.

**Output Format**

```
protocol version (1 right now), timestamp (in seconds) - up to which time data was collected
UID:absolute path to file changed
UID:absolute path to file changed
…
```
   


**_Examples:_**

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

**Getting changed files by end user**



**_Examples:_**

```
[user@localhost ~]$ cloudlinux-backup-helper-uid            
 
  1,1495530576
1000:/home/user/.bash_history
 
[user@localhost ~]$ cloudlinux-backup-helper-uid -t 1495547922
1,1495548343
1000:/home/user/file1.txt
1000:/home/user/file2.txt
```

This command is available within CageFS.

## Installation and Configuration






6 (requires Hybrid kernel) or 7
Kernel Version: 3.10.0-427.36.1.lve1.4.47



To install system run:


_CloudLinux 7_  _ _
```
yum install cloudlinux-fchange --enablerepo=cloudlinux-updates-testing
```

_CloudLinux 6 Hybrid_  _ _
```
yum install cloudlinux-fchange --enablerepo=cloudlinux-hybrid-testing
```

Configuration file can be found in

Database containing list of modified files is located at by default.



After successful installation the event collecting daemon starts automatically, providing all data are in place.

To start daemon:

_CloudLinux 7_  _ _
```
systemctl start cloudlinux-file-change-collector
```

_CloudLinux 6 Hybrid _  _ _
```
service cloudlinux-file-change-collector start
```

To stop daemon:

_CloudLinux 7 _  _ _
```
systemctl stop cloudlinux-file-change-collector
```

_CloudLinux 6 Hybrid_  _ _
```
service cloudlinux-file-change-collector stop
```



To uninstall run:

```
yum remove cloudlinux-fchange
```


## Configuration Details


Configuration resides in . The following is the default configuration (see comments):


































































  


## Low-level access



  The kernel exposes the functionality to folder.

- enable/disable the functionality. Write 1 to this file to enable, 0 to disable. If disabled, no events are coming to events file.

- the modified files log itself. Events in the format are constantly appending to the end of the file if datacycle enabled. File events are never duplicated: if we have file modification event, we would not get file deletion event if the file has been later deleted. This events buffer has limited capacity, therefore from time to time, the events log requires flushing.

- a file for clearing events log. For flushing, the last from the events file is written to this file. Right after this, events log is truncated to that .

- forbidding users with UIDs equal or bigger that set in this file writing to their home directories. At the boot, the file has -1. When it’s written positive value, say 500, the system starts effectively preventing users from modifying their home dirs (on write attempt a user gets error). This feature is designed to prevent users from updating their home dirs when events are not handled.

- just counter of log entries of events file.

- this file has minimal UID of events to be handled. Events from users with smaller UID are not handled. By default 500 (non-system users in redhat-based systems).

