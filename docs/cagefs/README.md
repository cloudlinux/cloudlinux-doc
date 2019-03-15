# CageFS


CageFS is a virtualized file system and a set of tools to contain each user in its own 'cage'. Each customer will have its own fully functional CageFS, with all the system files, tools, etc.

The benefits of CageFS are:

·        Only safe binaries are available to user
·        User will not see any other users, and would have no way to detect presence of other users & their user names on the server
·        User will not be able to see server configuration files, such as Apache config files.
·        User's will have limited view of /proc file system, and will not be able to see other' users processes

At the same time, user's environment will be fully functional, and user should not feel in any way restricted. No adjustments to user's scripts are needed. CageFS will cage any scripts execution done via:

·        Apache (suexec, suPHP, mod_fcgid, mod_fastcgi)
·        LiteSpeed Web Server
·        Cron Jobs
·        SSH
·        Any other enabled service





## Installation


Minimum Requirements:

kernel: CL5 with lve0.8.54 or later, CL6 with lve1.2.17.1 or later, CL7.
7GB of disk space.

Depending on your setup, and number of users, you might also need:
Up to 8MB per customer in /var directory (to store custom /etc directory)
5GB to 20GB in /usr/share directory (to store safe skeleton of a filesystem)





To install CageFS:

```
$ yum install cagefs
$ /usr/sbin/cagefsctl --init
```

That last command will create skeleton directory that might be around 7GB in size. If you don't have enough disk space in /usr/share, use following commands to have cagefs-skeleton being placed in a different location:

```
$ mkdir /home/cagefs-skeleton
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton
```





CageFS will automatically detect and configure all necessary files for:
cPanel
Plesk
DirectAdmin
ISPmanager
Interworx
MySQL
PostgreSQL
LiteSpeed

Web interface to manage CageFS is available for cPanel, Plesk 10+, DirectAdmin, ISPmanager & Interworx. Command line tool would need to be used for other control panels.

Once you initialized the template you can start enabling users. By default CageFS is disabled for all users.

Starting from **cagefs-6.1-27**  _fs.proc_can_see_other_uid_ will be migrated (one time) from _/etc/sysctl.conf_ into _/etc/sysctl.d/90-cloudlinux.conf_ . If this variable is not set in either file, it will default to 0.

It is strongly advised against setting this variable in _90-cloudlinux.conf_ . Define it in _/etc/sysctl.conf_ or in some other config file with an index number greater than _90-cloudlinux.conf_ , e.g. _/etc/sysctl.d/95-custom.conf_ .

You can find more information on _fs.proc_can_see_other_uid_ automatic migration in [Kernel Config Variables](/kernel_settings/#kernel-config-variables) .


## Unistalling CageFS


To uninstall CageFS, start by disabling and removing all directories:


```
$ /usr/sbin/cagefsctl --remove-all
```


That command will: Disable CageFS for all customers, unmount CageFS for all users, removes directories. It will not remove /etc/cagefs directory.

Remove CageFS RPM:


```
$ yum remove cagefs
```



## Managing Users


CageFS provides for two modes of operations:

1.        Enabled for all, except those that are disabled.
2.        Disabled for all, except those that are enabled.

Mode #1 is convenient for production operation, where you want all new users to automatically be added to CageFS.
Mode #2 is convenient while you test CageFS, as it allows you to enable it on one by one for your customers.

To start using CageFS you have to select one of the mode of operations:

```
$ /usr/sbin/cagefsctl --enable-all
```

or

```
$ /usr/sbin/cagefsctl --disable-all
```

or

```
$ /usr/sbin/cagefsctl --toggle-mode
```

That will switch the operation mode, preserving current disabled/enabled users.

To enable individual user do:

```
$ /usr/sbin/cagefsctl --enable [username]
```

To disable individual user:

```
$ /usr/sbin/cagefsctl --disable [username]
```

To  list all enabled users:

```
$ /usr/sbin/cagefsctl --list-enabled
```

To list all disabled users:

```
$ /usr/sbin/cagefsctl --list-disabled
```

To see current mode of operation:

```
$ /usr/sbin/cagefsctl --display-user-mode
```


## Command-line Tools


_cagefsctl _ is used to manage CageFS. It allows initializing and updating CageFS, as well as enabling/disabling CageFS for individual users.

Use the following syntax to manage CageFS:


































Use the following syntax to manage users:














































Common options:






















## Running Command Inside CageFS




Sometimes you will need to execute a command as user inside CageFS.

If a user has shell enabled - you can simply use:

```
$ /bin/su - $USERNAME  -c "_command_"
```

Yet, if user has shell disabled, it wouldn't work. To solve this issue, we have added command:


```
$ /sbin/cagefs_enter_user $USERNAME "_command_"
```


If you disable CageFS for a user,  then will be executed without .

You can forcibly disable start via for all users (regardless if CageFS is enabled or disabled) by specifying the parameter _cagefs_enter_proxied=0_ in _/etc/sysconfig/cloudlinux_ .

_/bin/cagefs_enter.proxied_ can be executed instead of _/bin/cagefs_enter_ to enter CageFS without . Note that starting via is necessary to enable sending local notification messages to users with enabled CageFS. is executed via by default.


## Sanity Check




CageFS utility allows to check CageFS configuration consistency, so that an administrator can save the time investigating issues with CageFS and ensure that custom configuration is correct.

To start, run the command:

```
cagefsctl --sanity-check
```

At the moment 7 types of check are implemented:

_Check cagefs mount points exists_ - reads file and verifies if the directories specified in it really exist on the disk. To learn more visit [https://docs.cloudlinux.com/index.html?mount_points.html](https://docs.cloudlinux.com/index.html?mount_points.html) and [https://docs.cloudlinux.com/index.html?split_by_username.html](https://docs.cloudlinux.com/index.html?split_by_username.html)

_Check cagefs users.enabled is directory_ - ensures that if exists, then it is a directory, not a file (if it is recognized as a file, then it would cause a breakdown).

_Check cagefs users.disabled is directory_ - ensures that if exists, then it is a directory, not a file (if it is recognized as a file, then it would cause a breakdown).

_Check cagefs disable.etcfs exists_ - checks if exists.

_Check cagefs users can enter cagefs_ - chooses two users in the system with enabled CageFS (the first and the second ones in the unsorted list) and tries to log in to CageFS under their credentials and see what happens. It runs and compares the output with the and command retcode estimation.





_Check cagefs proxy commands configs are parsable_ - tries to load files and parse them to check the syntax. In case of any parsing error the test will fail. To learn more, visit [https://docs.cloudlinux.com/index.html?executing_by_proxy.html](https://docs.cloudlinux.com/index.html?executing_by_proxy.html) .

_Check cagefs virt.mp files syntax_ - reads all files (if any) and checks their syntax validity. At the moment there are only two checks of the syntax: the file is not empty if it exists, and the file is not starting with the sub directory definitions (with @). To learn more, visit [https://docs.cloudlinux.com/index.html?per_user_virtual_mount_points.html](https://docs.cloudlinux.com/index.html?per_user_virtual_mount_points.html)

_Check MultiPHP system default PHP version – _ checks that MultiPHP system default PHP version is **NOT** Alt-PHP. That means PHP Selector should work properly. If MultiPHP system default PHP version is Alt-PHP, PHP Selector does not work and should be disabled. To learn more on how to disable PHP Selector, visit [https://docs.cloudlinux.com/cpanel_lve_manager.html](https://docs.cloudlinux.com/cpanel_lve_manager.html) 

Possible results of the checks:

 - the check succeeded.

 - the check revealed a problem.

 - the check was skipped as it made no sense in such environment (e.g. wrong control panel) or can not be performed for some reason (e.g no users with enabled CageFS found). The actual result does not mean that a problem exists and can be considered as positive.

 - the check failed because of a problem inside the checker itself. Must be reported to the developers.

In case if at least one of the checks resulted neither nor then the checker will end with ret code >0.


## CageFS Quirks


Due to the nature of CageFS, some options will not work as before or will require some changes:

lastlog will not work ( _/var/log/lastlog_ ).
PHP will load php.ini from _/usr/selector/php.ini._ That file is actually a link to a real php.ini file from your system. So the same php.ini will be loaded in the end.
You have to run `cagefsctl --update` any time you have modified php.ini, or you want to get new/updated software inside CageFS.
CageFS installation changes jailshell to regular bash on cPanel - [read why](http://kb.cloudlinux.com/2015/11/why-cagefs-installation-change-jailshell-to-regular-bash-on-cpanel/) .



## Configuration


[File System Templates](/cagefs/#file-system-templates)

[Excluding Files](/cagefs/#excluding-files)

[Excluding Users](/cagefs/#excluding-users)

[Mount Points](/cagefs/#mount-points)

`o` [Per user virtual mount points](/cagefs/#per-user-virtual-mount-points)

`o` [Split by Username](/cagefs/#split-by-username)

[Base Home Directory](/cagefs/#base-home-directory)

[PostgreSQL support](/cagefs/#postgresql-support)

[PAM Configuration](/cagefs/#pam-configuration)

[Executing By Proxy](/cagefs/#executing-by-proxy)

[Custom /etc directory](/cagefs/#custom-etc-files-per-customer)

[Moving cagefs-skeleton directory](/cagefs/#moving-cagefs-skeleton-directory)

[Moving /var/cagefs directory](/cagefs/#moving-var-cagefs-directory)

[TMP directories](/cagefs/#tmp-directories)

[Syslog](/cagefs/#syslog)

[Excluding mount points](/cagefs/#excluding-mount-points)


### File System Templates


CageFS creates a filesystem template in directory. CageFS template will be mounted for each customer.  The template is created by running:

```
# /usr/sbin/cagefsctl --init
```


To update the template, you should run:

```
$ /usr/sbin/cagefsctl --update
```


The behavior of the commands (and the files copied into directory) depends on the configuration files in /etc/cagefs/conf.d
You can add additional files, users, groups and devices into CageFS template by adding .cfg file, and running:

```
$ /usr/sbin/cagefsctl --update
```


To delete files from CageFS template, remove corresponding .cfg file, and run:

```
$ /usr/sbin/cagefsctl --update
```


Here is an example file:

```
[openssh-clients]
```
```
comment=OpenSSH Clients
```
```
paths=/etc/ssh/ssh_config, /bin/hostname, /usr/bin/scp, /usr/bin/sftp, /usr/bin/slogin, /usr/bin/ssh, /usr/bin/ssh-add, /usr/bin/ssh-agent, /usr/bin/ssh-copy-id, /usr/bin/.ssh.hmac, /usr/bin/ssh-keyscan, /usr/libexec/openssh/sftp-server, /etc/environment, /etc/security/pam_env.conf
```
```
devices=/dev/ptmx
```


Example file:

```
[mail]
```
```
comment=Mail tools
```
```
paths=/bin/mail, /etc/aliases.db, /etc/mail, /etc/mailcap, /etc/mail.rc, /etc/mime.types, /etc/pam.d/smtp.sendmail, /etc/rc.d/init.d/sendmail, /etc/smrsh, /etc/sysconfig/sendmail, /usr/bin/hoststat, /usr/bin/Mail, /usr/bin/mailq.sendmail, /usr/bin/makemap, /usr/bin/newaliases.sendmail, /usr/bin/purgestat, /usr/bin/rmail.sendmail, /usr/lib64/sasl2/Sendmail.conf, /usr/lib/mail.help, /usr/lib/mail.tildehelp, /usr/lib/sendmail.sendmail, /usr/sbin/mailstats, /usr/sbin/makemap, /usr/sbin/praliases, /usr/sbin/sendmail.sendmail, /usr/sbin/smrsh, /var/log/mail, /var/spool/clientmqueue, /var/spool/mqueue
```
```
users=smmsp
```
```
groups=smmsp
```


There is an easy way to add/delete files from particular s into CageFS. That can be done by using options in . Like:

```
$ cagefsctl --addrpm ffmpeg
$ cagefsctl --update
```







### Excluding Files


To exclude files and directories from CageFS, edit file:



And add files or directories in there, one per line.

Please do not edit /etc/cagefs/black.list file because it is replaced during the update of CageFS package.

### Excluding Users


To exclude users from CageFS, create a file (any name would work) inside _ _ ` ` folder, and list users that you would like to exclude from CageFS in that file.


### Mount Points


CageFS creates individual namespace for each user, making it impossible for users to see each other's files and creating high level of isolation. The way namespace is organized:

1. with safe files is created
2.        Any directory from the server that needs to be shared across all users is mounted into
a.        list of such directories is defined in /etc/cagefs/cagefs.mp
3. directory for each user. Prefix is defined as last two digits of user id. User id is taken from /etc/passwd file.
4.        Separate /etc directory is created and populated for each user inside
5.        /tmp directory is mounted for each user separately into
6.        Additional custom directories can be mounted for each user by defining them in /etc/cagefs/cagefs.mp
7. You can define custom directories per user using [virt.mp](/cagefs/#per-user-virtual-mount-points) files [CageFS 5.1 and higher]

To define individual custom directories in /etc/cagefs/cagefs.mp following format is used:




This is useful when you need to give each user its own copy of a particular system directory, like:




Such entry would create separate for each user, with permissions set to 777

To modify mount points, edit /etc/cagefs/cagefs.mp. Here is an example of cagefs.mp:

```
/var/lib/mysql
/var/lib/dav
/var/www/cgi-bin
/var/spool
/dev/pts
/usr/local/apache/domlogs
/proc
/opt
@/var/spool/cron,700
@/var/run/screen,777
```


If you want to change mount points, make sure you re-initialize mount points for all customers:

```
$ cagefsctl --remount-all
```

This command will kill all current processes and reset mount points.



#### Per user virtual mount points


**[CageFS 5.1 and higher]**

* _Please, see _ 

Starting with CageFS 5.1 you can specify additional directories to be mounted inside user's CageFS. This can be specified for each user.
To specify virtual mount points for a user, create a file:




Inside that file, you can specify mount points in the following format:

```
virtdir1,mask
@subdir1,mask
@subdir2,mask
virdir2,mask
@subdir3,mask
@subdir4,mask
>virtdir3,mask
@subdir5,mask
@subdir6,mask
# comments
```


 is always optional, if missing 0755 is used
Create virtual directory , mount it to:
`o` 
`o` inside virtual directory, create directories
`o` mount to
`o` if is started with >, create directory , but don't mount it into . This is needed for cases when is inside home base dir.
if file /var/cagefs/[prefix]/[user]/virt.mp is missing -- no virt directories are loaded for that user.

Note that CageFS will automatically create those files for Plesk 10 & higher.

For example if we have plesk11.5 with two users , and :

```
cltest1 uid 10000 has domains: cltest1.com, cltest1-addon.com and sub1.cltest1.com
cltest2 uid 10001 has domains: cltest2.com, cltest2-addon.com
```


In such case we would have file _/var/cagefs/00/cltest1/virt.mp_ :

```
>/var/www/vhosts/system,0755
@cltest1-addon.com,0755
@cltest1.com,0755

```


and file: _ /var/cagefs/01/cltest2/virt.mp:_

```
>/var/www/vhosts/system
@cltest2-addon.com

```



#### Split by Username


**[CageFS 5.3.1+]**

Sometimes you might need to make sure that directory containing all users would show up as containing just that user inside CageFS. For example, if you have directory structure like:

```
/home/httpd/fcgi-bin/user1
/home/httpd/fcgi-bin/user2
```


Then we can add the following line to /etc/cagefs/cagefs.mp file:

```
%/home/httpd/fcgi-bin
```


and execute:

```
cagefsctl --remount-all
```


After that each subdirectory of /home/httpd/fcgi-bin will be mounted for appropriate user in CageFS: will be mounted for and will be mounted for .




#### Mounting user’s home directory inside CageFS


CageFS 6.1-1 (and later) has improved mounting user’s home directory that is applied for users with home directories like (where = 0,1,..9).

In such case, earlier versions of CageFS always mount user’s home directory to and create symlink when needed, so user’s home directory can be accessed both via _ _ and . This quirk leads to some rare incompatibilities between CageFS and other software (for example OpenCart), because real path of user’s home directory in CageFS and in real file system can differ.

New CageFS mounts user’s home directory in a way that its real path in CageFS is always the same as in real file system. Additionally, CageFS searches for symlinks like
and _ _ in real system and creates such symlinks in user’s CageFS when found.

This new mounting mode is enabled by default. You can switch to old mounting mode by executing the following commands:

```
# touch /etc/cagefs/disable.home.dirs.search
# cagefsctl --force-update
# cagefsctl --remount-all
```





### Base Home Directory


If you have a custom setup where home directories are in a special format, like: , you can specify it using regular expressions. This is needed by CageFS to create safe home space for end user, where no other users are visible.

We will create empty: , and then mount in that directory

To do that, create a file:

With content like:

```
^/home/
^/var/www/users/
```


If there is no such file, the home directory without last component will be considered as a base dir, like with
we would create , and then mount
in there

WIth as a home dir, we would assume that is the base directory, and we would create and then we would mount -- which would cause each user to see empty base directories for other users, exposing user names.


When you want to share directory structure among multiple users, you can add following line at the top of the file. This is useful on the systems that support sites with multiple users, with different home directories inside main 'site' directory.

```
mount_basedir=1
```


For example:

has home directory
has home directory
site admin has home directory

So, content of should be the following:


```
mount_basedir=1
^/var/www/vhosts/[^/]+
```


Directory structure in will be mounted in CageFS for appropriate users.
Each user will have access to whole directory structure in (according to their permissions).




### PostgreSQL support


CloudLinux 7:

CageFS works with any PostgreSQL version installed from CloudLinux or CentOS repositories. PostgreSQL packages fo CloudLinux 7 come from upstream (CentOS) unmodified. PostgreSQL’s socket is located in /var/run/postgresql directory. This directory is mounted to CageFS by default (in cagefs-5.5-6.34 or later).

When PostgreSQL has been installed after CageFS install, please add line:

```
/var/run/postgresql
```


tо /etc/cagefs/cagefs.mp file and then execute:

```
cagefsctl --remount-all 
```


The steps above are enough to configure CageFS to work with PostgreSQL.

CloudLinux 6:

CageFS provides separate /tmp directory for each end user. Yet, PostgreSQL keeps its Unix domain socket inside server's main /tmp directory. In addition to that -- the location is hard coded inside PostgreSQL libraries.

To resolve the issue, CloudLinux provides version of PostgreSQL with modified start up script that can store PostgreSQL's socket in /var/run/postgres. The script automatically creates link from /tmp to that socket to prevent PostgreSQL dependent applications from breaking.

In addition to that, CageFS knows how to correctly link this socket inside end user's /tmp directory.

To enable PostgreSQL support in CageFS:

1.        Make sure you have updated to latest version of PostgreSQL.

2.        Edit file /etc/sysconfig/postgres, and uncomment line.

3. Update CageFS configuration by running:

```
cagefsctl  --reconfigure-cagefs
```


4. Restart PostgreSQL by running:

```
$ service postgresql restart 
```


If you are using cPanel, you would also need to modify file: /etc/cron.daily/tmpwatch

And update line:

```
flags=-umc 
```


to:

```
flags=-umcl
```


to prevent symlink from being removed.


### PAM Configuration


CageFS depends on module tor PAM enabled services.When installed the module is automatically installed for following services:

·        sshd
·        crond
·        su

Following line is added to corresponding file in /etc/pam.d/:

```
session    required     pam_lve.so      100     1
```


Where 100 stands for minimum to put into , and 1 stands for CageFS enabled.


### Executing By Proxy


Some software has to run outside CageFS to be able to complete its job. This includes such programs as etc.

CloudLInux uses technology to accomplish this goal. You can define any program to run outside CageFS, by specifying it in file. Do not edit existing as it will be overwritten with next CageFS update.

Once program is defined, run this command to populate the skeleton:

```
$ cagefsctl --update
```

All the cPanel scripts located in that user might need to execute should be added to .



The syntax of _ _ files is as follows:

_ALIAS:wrapper_name=username:path_to_executable_


Obligatory parameters are and _ _ .

 - any name which is unique within all files;

 - the name of wrapper file, which is used as a replacement for executable file . Wrapper files are located in . If wrapper name is not specified, then default wrapper is used. Also, a reserved word can be used, it will intend that wrapper is not in use (installed before) - applied for the commands with several , as in the example below.

 e - the name of a user on whose behalf will run in the real system. If is not specified, then will run on behalf the same user that is inside CageFS.

 - the path to executable file which will run via .

Example of a simple command executed via :

```
SENDMAIL=/usr/sbin/sendmail
```


Example of command execution with custom wrapper under (privilege escalation). The command uses two , that is why in the second line is specified instead of wrapper name.

```
CRONTAB_LIST:cagefs.proxy.crontab=root:/usr/bin/crontab
CRONTAB_SAVE:noproceed=root:/usr/bin/crontab
```


Sometimes hosters may have users with non unique . Thus, may traverse users directory to find a specific one. That behavior turns into inappropriate if users directory is not cached locally (for example LDAP is in use).

To turn this feature off:

```
touch /etc/cagefs/proxy.disable.duid
```


Or to activate it back:

```
rm /etc/cagefs/proxy.disable.duid
```



### Custom /etc files per customer


**[4.0-5 and later]**

To create custom file in /etc directory for end user, create a directory:




Put all custom files, and sub-directories into that direcotry.

For example, if you want to create custom /etc/hosts file for , create a directory:



 Inside that directory, create a file hosts, with the content for that user.

After that execute:

```
$ cagefsctl --update-etc USER1
```


If you are making changes for multiple users, you can run:


```
$ cagefsctl --update-etc
```


To remove custom file, remove it from directory, and re-run:

```
$ cagefsctl --update-etc
```



### Moving cagefs-skeleton directory


Sometimes you might need to move from to another partition.

There are two ways:

1. If is not created yet ( wasn't executed), then execute:


```
$ mkdir /home/cagefs-skeleton 
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton 
$ cagefsctl --init
```

 2. If already exists:


```
$ cagefsctl --disable-cagefs 
$ cagefsctl --unmount-all
# To ensure that the following command prints empty output: 
$ cat /proc/mounts | grep cagefs 
# if you see any cagefs entries, execute "cagefsctl --unmount-all" again.
$ mv /usr/share/cagefs-skeleton /home/cagefs-skeleton 
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton
cagefsctl --enable-cagefs
```


On cPanel servers, if you place skeleton into directory, then you should configure the following option:

In _cPanel WHM_ choose and go to , then in change default _ _ value to (not ).







### Moving /var/cagefs directory


To move /var/cagefs to another location:

```
$ cagefsctl --disable-cagefs
$ cagefsctl --unmount-all
```


Verify that directory does not exist (if it exists - change name "cagefs.bak" to something else)

```
$ cp -rp /var/cagefs /new/path/cagefs
$ mv /var/cagefs /var/cagefs.bak
$ ln -s /new/path/cagefs /var/cagefs
$ cagefsctl --enable-cagefs
$ cagefsctl --remount-all
```


Verify that the following command gives empty output:

```
$ cat /proc/mounts | grep cagefs.bak
```


Then you can safely remove /var/cagefs.bak:

```
$ rm -rf /var/cagefs.bak
```


### TMP Directories


CageFS makes sure that each user has his own directory, and that directory is the part of end-user's quota.

The actual location of the directory is

Once a day, using cron job, will clean up user's directory from all the files that haven't been accessed during 30 days.

This can be changed by running:

```
$ cagefsctl --set-tmpwatch='/usr/sbin/tmpwatch -umclq 720'
```

Where 720 is the number of hours that the file had to be inaccessible to be removed.

By default this is done at 03:37 AM, but you can also force the clean up outdated files that match 'chosen period' of all user's directories without waiting for a job to be launched by . Just run:

```
$ cagefsctl --tmpwatch
```

The following path will be cleaned as well:

(actual location _ _ )

You can configure ` ` to clean custom directories inside .

Create configuration file and specify directive as follows:



After that directories and _ _ inside CageFS  will be cleaned automatically.

Note that actual location of those directories in real file system is and .

**Cleanup PHP sessions**

For cPanel servers, CageFS version 6.0-42 or higher performs cleaning of PHP sessions based on and directives specified in proper files.

directive default value is 1440 seconds. Those session files will be deleted, that were created or had metadata (ctime) changes more time ago than it is specified in

For versions value is normally .





This applies to the following versions (or later):

alt-php44-4.4.9-71;
alt-php51-5.1.6-81;
alt-php52-5.2.17-107;
alt-php53-5.3.29-59;
alt-php54-5.4.45-42;
alt-php55-5.5.38-24;
alt-php56-5.6.31-7;
alt-php70-7.0.23-5;
alt-php71-7.1.9-5;
alt-php72-7.2.0-0.rc.2.2.

When using EasyApache 3, value is normally _ _ or . Seettings for EasyApache 3 are usualy taken from the file

When using EasyApache 4, value is normally where corresponds to PHP version.

Cleaning is started by cron , which starts the script twice within one hour.

The settings for ea-php are located in or in , where corresponds to the PHP version.

The settings for alt-php are located in _ _ files, where corresponds to PHP version.

The cleaning script cleans php sessions for all PHP versions ( and ) regardless of whether a version is used or selected via or . When different values are specified for the same (for different php versions), the cleaning script will use the least value for cleaning . So, it is recommended to specify different for each PHP version.

Users can define custom value of _ _ via PHP Selector in order to configure PHP's garbage collector, but that will not affect the script for cleaning PHP sessions. The script cleans PHP sessions based on global values of and directives taken from files mentioned above. Settings in custom users’ files are ignored.

**Cleanup PHP session files in Plesk**

For Plesk servers, version 6.0-52 or higher is provided with a special cron job for removing obsolete PHP session files. Cleanup script runs once an hour (similar to how it is done in Plesk).

Each time the script runs, it performs the cleanup of the paths:

1. set by directive in files. If is missing, then is used. Session files lifetime is set by directive. If it is not found, then 1440 seconds value is used (24 minutes, as in Plesk). Lifetime set in the file is only taken into consideration if it is longer than 1440 seconds, otherwise 1440 seconds is used. All the installed versions are processed.

2. . Files lifetime is only defined by Plesk script . If the script is missing or returns errors, then this directory is not processed.

The following features are applied during the cleanup:

all the users with higher than specified in are processed. Each user is processed independently from one another.

only directories inside are being cleaned. The paths of the same name in the physical  file system are not processed.

in all the detected directories, all the files with the names that correspond to mask are removed, the rest of the files are ignored.

the files older than specified lifetime are removed.

all non-fatal errors (lack of rights, missing directory) are ignored and do not affect the further work of the script.

**Disable PHP sessions cleanup on cPanel and Plesk**

Here is a possible workaround for PHP session expiration problem (session lives longer than it is possible in a control panel). To use your own custom PHP sessions cleanup scripts - you can turn off built-in sessions cleanup implementation in the following way: 
add **clean_user_php_sessions=false** line to **/etc/sysconfig/cloudlinux** .



### Syslog


By default, should be available inside end user's . This is needed so that user's cronjobs and other things that user would get recorded in the system log files.

This is controlled using file with the following content:

```
$AddUnixListenSocket /usr/share/cagefs-skeleton/dev/log
```

To remove presence of inside CageFS, remove that file, and restart rsyslog service.


### Excluding mount points




By default, all mounts from the real file system is inherited by namespaces of all . So, destroying all may be required in order to unmount some mount in real file system completely. Otherwise, mount point remains busy after unmounting it in the real file system because this mount exists in namespaces of .

command saves all mounts from real file system as “default namespace” for later use in all . service executes command during startup.

In (and later) there is an ability to exclude specific mounts from namespaces for all .
In order to do so, please create a file with list of mounts to exclude (one mount per line) as regular expressions, and then execute :

```
# cat /etc/container/exclude_mounts.conf    
^/dir1/
^/dir2$
# lvectl start
```

After that, all new created will be without mount and without mounts that start with (like , etc). To apply changes to existing you should recreate :

```
# lvectl destroy all   
# lvectl apply all
```






## Control Panel Integration


CageFS comes with a plugin for various control panels.

The plugin allows to:

·        Initialize CageFS;

·        Select [mode of operation](/cagefs/#managing-users) ;

·        See and modify the list of enabled/disabled users;

·        Update CageFS skeleton.


### cPanel


CageFS plugin for cPanel is located in section of WHM.

It allows to initialize CageFS, select users CageFS will be enabled for, as well as update CageFS skeleton.

![](/images/_img1_zoom73.png)

To enable CageFS for a proper user (users), in choose a user from the list on the right ( users) and click . The user will move to the list on the left ( users).

To disable a user (users), choose a user from the list on the left ( users) and click . The user will move to the list on the right ( users).

To update CageFS Skeleton click .

![](/images/_img2_zoom71.png)




### Plesk


CageFS comes with a plugin for Plesk 10.x. It allows initializing and updating CageFS template, as well as managing users and mode of operation for CageFS.

In modules section choose CageFS:

![](/images/plesk_cagefs_icon.png)
To enable CageFS for a proper user (users), in choose a user from the list on the right ( users) and click . The user will move to the list on the left ( users).

To disable a user (users), choose a user from the list on the left ( users) and click . The user will move to the list on the right ( users).

To update click .

![](/images/plesk_cagefs_manager_disable_all.png)

### ISPManager


CageFS comes with plugin for to enable/disable CageFS on per user base. In edit user section chose tab. Mark checkbox and click to apply.

![](/images/ispmanager_cagefs_user_zoom98.png)

Or you can manage global CageFS settings via CageFS menu
![](/images/_img3.jpg)

