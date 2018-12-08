# Additional Packages


CloudLinux will package additional software needed by hosters for your convenience.

[Git for cPanel](/git_for_cpanel/)

[alt-suexec](/alt-suexec/)



[cloudlinux-fchange](/cloudlinux-fchange/)

## Git for cPanel


_Please note that this package is no longer needed, as since cPanel 11.38, you can install git without any issues on cPanel by running:_


```
$ yum install git
```


To install [git](http://git-scm.com/) on cPanel servers:


```
$ yum install git-cpanel
```


## alt-suexec




If you use standard httpd from our repository, but your users' sites do not match standard Apache location of , then you should use alt-suexec.
alt-suexec package brings suEXEC binaries pre-compiled for specific locations, like .



Based on httpd 2.2 basic for 6 and httpd 2.4 basic for CloudLinux 7, the package brings to server a set of suEXECs with different s and parameters. The first set of suEXECs is listed by such modes:


```
# switch_suexec -l
USE_HOME - DOCUMENT ROOT /home/ MIN_UID 500 MIN_GID 100 CALLER apache
USE_WWW - DOCUMENT ROOT /var/www/ MIN_UID 500 MIN_GID 100 CALLER apache
```


The package also brings its own utility for installing specific suEXEC:

# switch_suexec -h

| | |
|-|-|
|-l | list of available suexec|
|-u | update suexec according to|
|-s | set new suexec and install it|
|-p | set new suexec path and install it|
|-o | set new suexec owners and install it|
|-r | restore native apache suexec|

There are two ways to set up new suEXEC binary:

1) via config file _ _
2) via utility _switch_suexec_

Here are the examples of how to set up suEXEC with

**1.**

1) add string to
2) run the command

**2.**

1)

Result of both methods:

# cat /etc/sysconfig/alt-suexec
USE_HOME

Here is standard suEXEC for CloudLinux 6 clean server:

# /usr/sbin/suexec -V
-D AP_DOC_ROOT="/var/www"
-D AP_GID_MIN=100
-D AP_HTTPD_USER="apache"
-D AP_LOG_EXEC="/var/log/httpd/suexec.log"
-D AP_SAFE_PATH="/usr/local/bin:/usr/bin:/bin"
-D AP_UID_MIN=500
-D AP_USERDIR_SUFFIX="public_html"
-D AP_SAFE_DIRECTORY="/usr/local/safe-bin"

Here is output of new suEXEC after installtion:

# /usr/sbin/suexec -V
-D AP_DOC_ROOT="/home/"
-D AP_GID_MIN=100
-D AP_HTTPD_USER="apache"
-D AP_LOG_EXEC="/var/log/httpd/suexec.log"
-D AP_SAFE_PATH="/usr/local/bin:/usr/bin:/bin"
-D AP_UID_MIN=500
-D AP_USERDIR_SUFFIX="public_html"
-D AP_SAFE_DIRECTORY="/usr/local/safe-bin"

Description of other switch_suexec parameters:

| | |
|-|-|
|-p | if suexec binary file will be placed not in standard way - specify this new path with p-option|
|-o | if suexec binary file not owned by - specify new owner with o-option|

For most cases -p and -o options for standard Apache are useless.

Correct suEXEC will be restored even after httpd update or reinstall.

List of pre-built suEXEC binary files stored without suid bit and not executable.



For installation run the command:


```
yum install alt-suexec --enablerepo=cloudlinux-updates-testing
```



If you need suEXEC with custom parameters absent in current set of alt-suexec, please submit a ticket on [https://helpdesk.cloudlinux.com/](https://helpdesk.cloudlinux.com/) and we will add new suEXEC with needed parameters.

## tuned-profiles-cloudlinux


The **_ _** package brings a range of kernel under-the-hood tunings to address high LA, iowait issues what were detected earlier on particular users deploys. The package also encloses OOM adjustments to prioritize the elimination of overrun PHP, workers processes over other processes (e.g. ssh, a cron job).

There are three profiles provided by CloudLinux:








is one to be used, it actually does the following:

1. Switches CPU power consumption mode to the maximum. CPU operates at maximum performance at the maximum clock rate:

```
governor=performance
energy_perf_bias=performance
```





 2. Applies the following kernel options:

- Improves kernel memory clean-up in case of big number of running LVE.

UBC parameters set the limits for the containers:

- Defines maximum RAM percentage for dirty memory pages.
- Defines RAM percentage when to allow writing dirty pages on the disk.

3. _ [CloudLinux 7 only]_ Detects used disk types and changes elevator to for HDD and to for SSD in . 


  
```
echo "noop" > /sys/block/[blockname]/queue/scheduler  
echo "0" > /sys/block/[blockname]/queue/rotational
```

Where is used device name, like .

And make it executable:

```
chmod +x /etc/rc.d/rc.local
```

4. _ [CloudLinux 7 only]_ The profile sets scheduler. For the normal discs the is set to improve performance and decrease latency, for SSD - noop.
When configuring scheduler queue is changed and set to the value 1024 which improves overall subsystem performance by caching requests in memory.

5. Disables transparent .

6. Provides adjustment group file for OOM-Killer to kill overrun php, lsphp and workers first.

To install:


```
yum install tuned-profiles-cloudlinux
```

To start using a profile:


```
tuned-adm profile cloudlinux-default
```

To stop using a profile:


```
tuned-adm off
```



