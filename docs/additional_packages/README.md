# Additional Packages


CloudLinux will package additional software needed by hosters for your convenience.

[Git for cPanel](/deprecated/#git-for-cpanel) (deprecated)

[alt-suexec](/additional_packages/#alt-suexec)

<span class="notranslate"> [tuned-profiles-cloudlinux](/additional_packages/#tuned-profiles-cloudlinux) </span>

[cloudlinux-fchange](/cloudlinux-fchange/)

## alt-suexec




If you use standard httpd from our repository, but your users' sites do not match standard Apache location of <span class="notranslate"> /var/www </span> , then you should use alt-suexec.
alt-suexec package brings suEXEC binaries pre-compiled for specific locations, like <span class="notranslate"> /home </span> .



Based on httpd 2.2 basic for 6 and httpd 2.4 basic for CloudLinux 7, the package brings to server a set of suEXECs with different <span class="notranslate"> DOCUMENT ROOT </span> s and <span class="notranslate"> MIN_UID/MIN_GID </span> parameters. The first set of suEXECs is listed by such modes:




The package also brings its own utility for installing specific suEXEC:
<span class="notranslate"> </span>
# switch_suexec -h

| | |
|-|-|
|-l | list of available suexec|
|-u | update suexec according to <span class="notranslate"> /etc/sysconfig/alt-suexec </span>|
|-s | set new suexec and install it|
|-p | set new suexec path and install it|
|-o | set new suexec owners and install it|
|-r | restore native apache suexec|

There are two ways to set up new suEXEC binary:

1) via config file _ _ <span class="notranslate"> /etc/sysconfig/alt-suexec </span>
2) via utility _switch_suexec_

Here are the examples of how to set up suEXEC with <span class="notranslate"> DOC_ROOT = "/home": </span>

**1.**

1) add string <span class="notranslate"> "USE_HOME" </span> to <span class="notranslate"> _/etc/sysconfig/alt-suexec_   </span>
2) run the command <span class="notranslate"> switch_suexec -u </span>

**2.**

1) <span class="notranslate"> switch_suexec -sUSE_HOME </span>

Result of both methods:
<span class="notranslate"> </span>
# cat /etc/sysconfig/alt-suexec
USE_HOME

Here is standard suEXEC for CloudLinux 6 clean server:
<span class="notranslate"> </span>
# /usr/sbin/suexec -V
-D AP_DOC_ROOT="/var/www"
-D AP_GID_MIN=100
-D AP_HTTPD_USER="apache"
-D AP_LOG_EXEC="/var/log/httpd/suexec.log"
-D AP_SAFE_PATH="/usr/local/bin:/usr/bin:/bin"
-D AP_UID_MIN=500
-D AP_USERDIR_SUFFIX="public_html"
-D AP_SAFE_DIRECTORY="/usr/local/safe-bin"

Here is output of new suEXEC after <span class="notranslate"> USE_HOME </span> installtion:
<span class="notranslate"> </span>
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
|-p | if suexec binary file will be placed not in standard way <span class="notranslate"> /usr/sbin </span> - specify this new path with p-option|
|-o | if suexec binary file not owned by <span class="notranslate"> root:apache </span> - specify new owner with o-option|

For most cases -p and -o options for standard Apache are useless.

Correct suEXEC will be restored even after httpd update or reinstall.

List of pre-built suEXEC binary files stored without suid bit and not executable.



For installation run the command:





If you need suEXEC with custom parameters absent in current set of alt-suexec, please submit a ticket on [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com/) and we will add new suEXEC with needed parameters.

## tuned-profiles-cloudlinux


The **_ _** <span class="notranslate"> tuned-profiles-cloudlinux </span> package brings a range of kernel under-the-hood tunings to address high LA, iowait issues what were detected earlier on particular users deploys. The package also encloses OOM adjustments to prioritize the elimination of overrun PHP, <span class="notranslate"> lsphp, Phusion Passenger </span> workers processes over other processes (e.g. ssh, a cron job).

There are three profiles provided by CloudLinux:






<span class="notranslate"> cloudlinux-dummy and  <span class="notranslate"> cloudlinux-vz are used for internal needs or when  <span class="notranslate"> Virtuozzo/OpenVZ </span>  detected and actually do nothing. </span> </span>

<span class="notranslate"> cloudlinux-default </span> is one to be used, it actually does the following:

1. Switches CPU power consumption mode to the maximum. CPU operates at maximum performance at the maximum clock rate:
<span class="notranslate"> </span>
```
governor=performanceenergy_perf_bias=performance
```





 2. Applies the following kernel options:
<span class="notranslate"> </span>
- Improves kernel memory clean-up in case of big number of running LVE.

UBC parameters set the limits for the containers:

<span class="notranslate">   </span> - Defines maximum RAM percentage for dirty memory pages.
<span class="notranslate"> </span> - Defines RAM percentage when to allow writing dirty pages on the disk.

3. _ [CloudLinux 7 only]_ Detects used disk types and changes elevator to <span class="notranslate"> 'deadline' </span> for HDD and to <span class="notranslate"> 'noop' </span> for SSD in <span class="notranslate"> /sys/block/[blockname]/queue/scheduler </span> . 


   <span class="notranslate"> </span>
```
echo "noop" > /sys/block/[blockname]/queue/scheduler  echo "0" > /sys/block/[blockname]/queue/rotational
```

Where <span class="notranslate"> _[blockname]_ </span> is used device name, like <span class="notranslate"> _sda/sdb_ </span> .

And make it executable:
<span class="notranslate"> </span>
```
chmod +x /etc/rc.d/rc.local
```

4. _ [CloudLinux 7 only]_ The profile sets <span class="notranslate"> I/O </span> scheduler. For the normal discs the <span class="notranslate"> Deadline Scheduler </span> is set to improve <span class="notranslate"> IO </span> performance and decrease <span class="notranslate"> IO </span> latency, for SSD - noop.
When configuring scheduler <span class="notranslate"> I/O </span> queue is changed and set to the value 1024 which improves overall <span class="notranslate"> I/O </span> subsystem performance by caching <span class="notranslate"> IO </span> requests in memory.

5. Disables transparent <span class="notranslate"> HugePage </span> .

6. Provides adjustment group file for OOM-Killer to kill overrun php, lsphp and <span class="notranslate"> Phusion Passenger </span> workers first.

To install:

<span class="notranslate"> </span>
```
yum install tuned-profiles-cloudlinux
```

To start using a profile:

<span class="notranslate"> </span>
```
tuned-adm profile cloudlinux-default
```

To stop using a profile:

<span class="notranslate"> </span>
```
tuned-adm off
```



