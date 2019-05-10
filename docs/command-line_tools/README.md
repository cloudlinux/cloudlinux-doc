# Command-line Tools

* [lvectl](/command-line_tools/#lvectl)
* [lveps](/command-line_tools/#lveps)
* [lvetop](/command-line_tools/#lvetop)
* [cldetect](/command-line_tools/#cldetect)
* [cldiag](/command-line_tools/#cldiag)
* [cloudlinux-config](/command-line_tools/#cloudlinux-config)
* [lve-stats](/deprecated/#lve-stats-0-x)
  * [Storing statistics in MySQL](/deprecated/#storing-statistics-in-mysql)
  * [Storing statistics in PostgreSQL](/deprecated/#storing-statistics-in-postgresql)
  * [Compacting in multi-server settings](/deprecated/#compacting-in-multi-server-settings)
* [lve-stats 2](/lve-stats_2/)
  * [Installation](/lve-stats_2/#installation)
  * [Configuration](/lve-stats_2/#configuration)
  * [Command Line Tools](/lve-stats_2/#command-line-tools)
    * [lveinfo](/lve-stats_2/#lveinfo)
    * [lvechart](/lve-stats_2/#lvechart)
    * [dbgovchart](/lve-stats_2/#dbgovchart)
    * [lve-read-snapshot](/lve-stats_2/#lve-read-snapshot)
    * [lve-create-db](/lve-stats_2/#lve-create-db)
  * [Plugins](/lve-stats_2/#plugins)
  * [Creating a Plugin for LVE Stats 2](/lve-stats_2/#creating-a-plugin-for-lve-stats_2)
    * [Introduction](/lve-stats_2/#introduction)
    * [Server Plugin Arrangement](/lve-stats_2/#server-plugin-arrangement)
    * [Plugin Configuration](/lve-stats_2/#plugin-configuration)
    * [Types of Plugins](/lve-stats_2/#types-of-plugins)
    * [Examples of Plugins](/lve-stats_2/#examples-of-plugins)
      * [Collector](/lve-stats_2/#collector)
      * [Analizer](/lve-stats_2/#analizer)
      * [Persistor](/lve-stats_2/#persistor)
      * [Notifier](/lve-stats_2/#notifier)
  * [/var/lve/info file](/lve-stats_2/#file-info-and-format-for-var-lve-info-file)
  * [Troubleshooting](/lve-stats_2/#troubleshooting)

## lvectl

lvectl is the primary tool for LVE management. To use it, you have to have administrator access. lvectl is a part of lve-utils package.

**lvectl syntax**

**Usage**: <span class="notranslate">`lvectl command [veid] [options]`</span>

**Commands**

|  |  |
|--|--|
| <span class="notranslate"> `apply`   </span> |apply config settings to specified LVE|
| <span class="notranslate"> `apply all`   </span> |apply config settings to all the LVEs|
| <span class="notranslate"> `apply-many` </span> |to apply LVE limits to multiple distinct LVEs (uids of users are read from stdin)|
| <span class="notranslate"> `set`   </span> |set parameters for a LVE and/or create a LVE|
| <span class="notranslate"> `set-user`   </span> |set parameters for a LVE and/or create a LVE using username instead of ID|
| <span class="notranslate"> `list` </span> |list loaded LVEs|
| <span class="notranslate"> `list-user`   </span> |list loaded LVEs, display username instead of user id|
| <span class="notranslate"> `limits` </span> |show limits for loaded LVEs|
| <span class="notranslate"> `delete` </span> |delete LVE and set configuration for that LVE to defaults|
| <span class="notranslate"> `delete-user` </span> |delete LVE and set configuration for that user to defaults|
| <span class="notranslate"> `destroy` </span> |destroy LVE (configuration file remains unchanged)|
| <span class="notranslate"> `destroy all` </span> |destroy all LVE (configuration file remains unchanged)|
| <span class="notranslate"> `destroy-many` </span> |to destroy LVE limits to multiple distinct LVEs (uids of users are read from stdin)|
| <span class="notranslate"> `package-set` </span> | set LVE parameters for a package|
| <span class="notranslate"> `package-list` </span> |list LVE parameters for packages|
| <span class="notranslate"> `package-delete` </span> |delete LVE parameters for a package|
| <span class="notranslate"> `paneluserslimits` </span> |show current user's limits for control panel|
| <span class="notranslate"> `limit` </span> |limit PID into specified LVE. Parameters PID LVE_ID|
| <span class="notranslate"> `release` </span> |release PID from LVE. Parameters PID|
| <span class="notranslate"> `set-binary` </span> |add binary to be run inside LVE on execution|
| <span class="notranslate"> `del-binary` </span> |remove binary from being run inside LVE on execution|
| <span class="notranslate"> `list-binaries` </span> |list all binaries to be run inside LVE on execution|
| <span class="notranslate"> `load-binaries` </span> |load binaries (used on startup) from config file|
| <span class="notranslate"> `reload-binaries` </span> |re-load list of binaries from config file|
| <span class="notranslate"> `help (-h)` </span> |show this message|
| <span class="notranslate"> `version (-v)` </span> |version number|
| <span class="notranslate"> `lve-version` </span> |LVE version number|
| <span class="notranslate"> `set-reseller` </span> |create LVE container and set LVE parameters for a reseller|
| <span class="notranslate"> `set-reseller-default` </span> |set default limits for resellers users|

**Options**

|  |  |
|--|--|
|<span class="notranslate"> `--cpu=N`   </span> |limit <span class="notranslate">`CPU`</span> usage; (deprecated. Use <span class="notranslate">`--speed`</span>)|
| <span class="notranslate"> `--speed=N%` </span> |limit <span class="notranslate">`CPU`</span> usage in percentage; 100% is one core|
| <span class="notranslate"> `--speed=Nmhz\ghz` </span> |limit <span class="notranslate">`CPU`</span> usage in mhz\ghz|
| <span class="notranslate"> `--ncpu=N` </span> |limit VCPU usage (deprecated)|
| <span class="notranslate"> `--io=N` </span> |define io limits (KB/s)|
| <span class="notranslate"> `--nproc=N` </span> |limit number of processes|
| <span class="notranslate"> `--pmem=N`   </span> |limit physical memory usage for applications inside LVE|
| <span class="notranslate"> `--iops=N` </span> |limit io per second|
| <span class="notranslate"> `--mem=N` </span> | mem alias for vmem (deprecated)|
| <span class="notranslate"> `--vmem=N` </span> |limit virtual memory for applications inside LVE|
| <span class="notranslate"> `--maxEntryProcs=N` </span> |limit number of entry processes|
| <span class="notranslate"> `--save` </span> |save configuration settings (use with set) (deprecated)|
| <span class="notranslate"> `--save-all-parameters` </span> |save all parameters even if they match with defaults settings|
| <span class="notranslate"> `--json` </span> |returns result of command json formatted|
| <span class="notranslate"> `--unlimited` </span> |set all limits to unlimited|
| <span class="notranslate"> `--save-username` </span> |save username in the config file. This parameter is used in conjunction with <span class="notranslate">`set-user`</span>|

**Examples**

* Reset all LVEs settings based on configuration in <span class="notranslate">`/etc/container/ve.cfg`</span>:
  
    <div class="notranslate">

    ```
    $ lvectl apply all
    ```
    </div>

* Set new default <span class="notranslate">CPU & Physical memory</span> limit:
  
    <div class="notranslate">

    ```
    $ lvectl set default --speed=100% --pmem=256m
    ```
    </div>

* Reset all LVE's killing processes inside them:
  
    <div class="notranslate">

    ```
    $ lvectl destroy all
    ```
    </div>

* Show list of LVEs and their limits:
  
    <div class="notranslate">

    ```
    $ lvectl list
    ```
    </div>

## lveps

**lveps** tool shows information about running LVEs, processes and threads belonging to them, <span class="notranslate"> CPU/memory/IO </span> usage consumed by LVEs and their individual processes/threads. LVE is only reported if it is considered active (at least one thread belongs to that LVE or was running during measurement in dynamic mode).

**Usage**:

<div class="notranslate"> 

```
lveps [-p] [-n] [-o <fmt1:width1,...>] [-d] [-c <time>] [-s <style>] [-t] [-h]
```
</div>

**Options**:

| | |
|-|-|
|`-p`| to print per-process/per-thread statistics|
|`-n`| to print LVE ID instead of username|
|`-o`| to use formatted output (fmt=id,ep,pid,tid,cpu,mem,io)|
|`-d`| to show dynamic cpu usage instead of total cpu usage|
|`-c`| to calculate average cpu usage for &lt;time&gt; seconds (used with `-d`)|
|`-r`| to run under realtime priority for more accuracy (needs privileges)|
|`-s`| to sort LVEs in output (cpu, process, thread, mem, io)|
|`-t`| to run in the top-mode|
|`-h`| to print this brief help message|


Command like <span class="notranslate">`lveps -p`</span> will display processes running inside 'active' LVEs.

| | |
|-|-|
|<span class="notranslate"> CPU </span> | The number of seconds LVE/process/thread has been running (each <span class="notranslate"> CPU </span> /core is counted separately), or the average CPU load (100% is all <span class="notranslate"> CPU </span> resources) if used with <span class="notranslate">`-d`</span>.|
|<span class="notranslate">MEM</span>| The number of megabytes of resident memory in use by LVE/process/thread (shared memory is not included).|
|<span class="notranslate">IO</span> | The number of kilobytes read and written in sum by LVE, or kb/sec if used with `-d`.|
|<span class="notranslate">ID</span> | LVE ID or username.|
|<span class="notranslate">EP</span> | The number of entry processes inside  LVE.|
|<span class="notranslate">COM</span> | Command name for this process.|
|<span class="notranslate">PID</span> | <span class="notranslate">PID</span> of the process.|
|<span class="notranslate">PNO</span> | The number of processes belonging to the LVE.|
|<span class="notranslate">TID</span> | <span class="notranslate">TID</span> of the thread.|
|<span class="notranslate">TNO</span> | The number of threads belonging to the LVE.|
|<span class="notranslate">DO</span> | The number of disk operations belonging to the LVE from the time it was created.|
|<span class="notranslate">DT</span> | Total amount of disk transfer in megabytes from LVE creation time.|
|<span class="notranslate">IOPS</span> | The number of I/O operations per second|

## lvetop

**lvetop** utility allows to monitor LVE usage:

<div class="notranslate">

```
ID        EP PNO TNO SPEED MEM  IO   IPOS
testuser1 0  1   1   0%    7    0    0
testuser2 0  0   0   5%    0    3    0
testuser3 1  2   2   0%    102  2727 0
testuser4 0  1   1   0%    12   84   1
testuser5 0  2   2   1%    52   0    0
```
</div>

**lvetop fields**:

| | |
|--|--|
|<span class="notranslate"> `ID`</span>|user name if LVE id matches user id in <span class="notranslate">`/etc/passwd`</span>, or LVE id|
|<span class="notranslate"> `EP`</span>|number of entry processes (concurrent scripts executed)|
|<span class="notranslate"> `PNO`</span>|number of processes within LVE|
|<span class="notranslate"> `TNO`</span>|number of threads within LVE|
|<span class="notranslate"> `CPU`</span>|<span class="notranslate"> CPU</span> usage by LVE, relative to total <span class="notranslate"> CPU </span>  resources of the server|
|<span class="notranslate"> `MEM`</span>|Memory usage by LVE, in KB|
|<span class="notranslate"> `I/O`</span>|<span class="notranslate"> I/O </span> usage|
|<span class="notranslate"> `IOPS`</span>|number of read/write operations per second|


## cldetect

:::tip Note
<span class="notranslate">lve-utils 1.2-10+</span>
:::

**cldetect** is used to detect installed software, and adjust CloudLinux options accordingly.

**Usage**:
<div class="notranslate">

```
/usr/bin/cldetect [--options]
```
</div>


|||
|----|--|
|<span class="notranslate">`cldetect -h`/`-h`/`--help`</span>|show this message|
|<span class="notranslate">`--detect-cp`</span>|prints control panel and its version (<span class="notranslate">CP_NAME,CP_VERSION</span>)|
|<span class="notranslate">`--detect-cp-full`</span>|prints control panel, version and panel specific data (<span class="notranslate">CP_NAME,CP_VERSION</span>,...). Specific data: for <span class="notranslate">ISP Manager5 - Master/Node</span>|
|<span class="notranslate">`--detect-cp-nameonly`</span>|prints control panel name (<span class="notranslate">CP_NAME</span>)|
|<span class="notranslate">`--get-admin-email`</span>|prints control panel admin email (<span class="notranslate">CP_ADMIN_EMAIL</span>)|
|<span class="notranslate">`--cxs-installed`</span>|check if CXS is installed. Returns 0 if installed, 1 otherwise|
|<span class="notranslate">`--cpanel-suphp-enabled`</span>|check if suPHP is enabled in cPanel.Returns 0 if enabled, 1 otherwise|
|<span class="notranslate">`--detect-litespeed`</span>|check if LiteSpeed is installed. Returns 0 if installed, 1 otherwise|
|<span class="notranslate">`--detect-postgresql`</span>|check if PostGreSQL is installed. Returns 0 if installed, 1 otherwise|
|<span class="notranslate">`--print-apache-gid`</span>|prints current apache gid|
|<span class="notranslate">`--print-da-admin`</span>|prints DirectAdmin admin user|
|<span class="notranslate">`--set-securelinks-gid`</span>|changes `/etc/sysctl.conf` if apache gid != 48 (default)|
|<span class="notranslate">`--set-nagios`</span>|do some adjustments to make nagios work correctly if it's installed. Called as a part of `--setup-supergids`|
|<span class="notranslate">`--setup-supergids`</span>|do some adjustments to make special users/software (nagios, cPanel’s mailman) work correctly if it is installed to the system|
|<span class="notranslate">`--cl-setup`</span>|check if CloudLinux is installing. Returns 0 if installing, 1 otherwise|
|<span class="notranslate">`--update-license`</span>|updates license|
|<span class="notranslate">`--update-new-key`</span>|updates license with new key|
|<span class="notranslate">`--check-license`</span>|check license. Returns OK if license is not older than 3 days, error message otherwise|
|<span class="notranslate">`-q`</span>|check license. Returns 0 if license is not older than 3 days, 1 otherwise|
|<span class="notranslate">`--no-valid-license-screen`</span>|returns no valid license found screen|
|<span class="notranslate">`--license-out-of-date-email`</span>|returns License out of Date Email.|
|<span class="notranslate">`--check-openvz`</span>|returns enviroment id|


#### **clsupergid auto-configuration**

Each time <span class="notranslate">`lve-utils`</span> package is installed or upgraded it does some automatic system re-configuration to make some software (like nagios) work correctly, if it’s installed, by calling <span class="notranslate">`cldetect --setup-supergids`</span> command.

Starting from <span class="notranslate">**_lve-utils 3.0-21_**</span> a behaviour of <span class="notranslate">`cldetect --set-nagios`</span> (now, it’s a part of <span class="notranslate">`cldetect --setup-supergids`</span>) command slightly changed.

| |  | |
|-|--|--|
| | **Old behavior** | **New behavior**|
|If <span class="notranslate">**fs.proc_super_gid**</span> is 0 (which means it’s not configured) or it’s set to some GID that doesn’t exist in the system.| Command will set <span class="notranslate">`sysctl fs.proc_super_gid`</span> to point to Nagios GID. | Command will create special <span class="notranslate">`clsupergid`</span> group, setup <span class="notranslate">`sysctl fs.proc_super_gid`</span> to point to it’s GID and add Nagios user to this group.|

If **fs.proc_super_gid** was configured by an admin to some existing group, the command will just add Nagios user to this group.

## cldiag

   
`cldiag` utility is included in |<span class="notranslate">`lve-utils`</span> package and is intended for:

* server diagnostics performed by a server administrator for detecting the most common errors in the configuration or software operation;
* the focused check of the servers for typical errors performed by the support engineers before proceeding to the detailed analysis of the customer tickets;
* servers automatic check by cron with the following generation of the reports and email them to the server administrator.

In all cases, for the negative checker result, the exit code will be > 0 (at the moment it will be equal to the number of failed checkers).

All the checkers support additional <span class="notranslate">`--json`</span> option with the unified output in an appropriate format.

For example:
 
<div class="notranslate"> 

```
# cldiag --symlinksifowner --json

{"total_errors": 0, "Check fs.enforce_symlinksifowner is correctly enabled in /etc/sysctl.conf": {"res": "OK", "msg": "fs.enforce_symlinksifowner = 1"}}
```
</div>

Each checker returns a typical result with the name of the check performed (brief description), one of the possible statuses of its execution, and detailed information on its fail or success.

For example:

<div class="notranslate">

```
Check fs.enforce_symlinksifowner is correctly enabled in /etc/sysctl.conf:

OK: fs.enforce_symlinksifowner = 1

Check suexec has cagefs jail:

SKIPPED: SuEXEC is not enabled
```
</div>

Possible checkers results:

1. <span class="notranslate">`OK`</span> - the check succeeded.
2. <span class="notranslate">`FAILED`</span> - the check revealed a problem.
3. <span class="notranslate">`SKIPPED`</span> - the check was skipped as it made no sense in the actual environment (e.g. wrong control panel) or it could not be executed for some reason (e.g. no users with enabled CageFS found). Such result doesn’t mean there is a problem and can be considered as a positive.
4. <span class="notranslate">`INTERNAL_TEST_ERROR`</span> - the check has failed because of a problem in the checker itself. Please report such problems using [https://cloudlinux.zendesk.com/agent/](https://cloudlinux.zendesk.com/agent/).

The utility includes several built-in checkers, and can also import and run checkers from other utilities.

Currently implemented checkers:

1. <span class="notranslate">`--diag-cp`</span>

Checks control panel and its configuration (for DirectAdmin only).

Checking control panel availability, thereby detecting it with our code. Displaying control panel name and version. Also, for DirectAdmin, checking if CloudLinux support is enabled in its config.

Fails if <span class="notranslate">`/usr/local/directadmin/custombuild/options.conf`</span> does not contain <span class="notranslate">`cloudlinux=yes`</span> line (for DirectAdmin control panel).

2. <span class="notranslate">`--symlinksifowner`</span>

Checks fs.enforce_symlinksifowner is correctly enabled in <span class="notranslate">`/etc/sysctl.conf`</span>.

Checking specified kernel setup described in [this docs section](/kernel_settings/#symlink-owner-match-protection) for deprecated value and displaying its current value.

Fails if <span class="notranslate">`/proc/sys/fs/enforce_symlinksifowner`</span> contains value `2` (it is deprecated and can cause issues for the system operation).
 

3. <span class="notranslate">`--check-suexec`</span>

Checks suexec has <span class="notranslate">cagefs</span> jail.

In case if <span class="notranslate">CageFS</span> is installed and SuEXEC is on, checking if <span class="notranslate">CageFS</span> is enabled for SuEXEC.
 
Fails if CageFS is not enabled for suexec binary.


4. <span class="notranslate">`--check-suphp`</span>

Checks suphp has <span class="notranslate">cagefs</span> jail.

In case if <span class="notranslate">CageFS</span> is installed and SuPHP is on, checking if <span class="notranslate">CageFS</span> is enabled for SuPHP.
 
Fails if CageFS is not enabled for suphp binary.

5. <span class="notranslate">`--check-usepam`</span>

Checks UsePAM in <span class="notranslate">`/etc/ssh/sshd_config`</span>.

Checking if <span class="notranslate">`/etc/ssh/sshd_config`</span> config file contains <span class="notranslate">`UsePAM yes`</span> line, which is required for pam_lve correct work with sshd.
 
Fails if <span class="notranslate">`/etc/ssh/sshd_config`</span> contains <span class="notranslate">`UsePAM no`</span> line. 

6. <span class="notranslate">`--check-symlinkowngid`</span>

Checks <span class="notranslate">`fs.symlinkown_gid`</span>.

First checking if user <span class="notranslate">`Apache`</span> is available in the system (on some panels users `httpd` or <span class="notranslate">`nobody`</span> with special GID are present instead of <span class="notranslate">`Apache`</span>, they are detected correctly as well). Then, if such user exists, checking that his GID equals to the one specified in sysctl or that this user belongs to this supplemental group. If these conditions are met, then the protection effect described in [this docs section](/kernel_settings/#symlink-owner-match-protection) is applied to this user, and the appropriate message will be displayed.
 
Fails if Apache user is not in the group specified in <span class="notranslate">`/proc/sys/fs/symlinkown_gid`</span>.

7. <span class="notranslate">`--check-cpanel-packages`</span>

Checks existence of all user's packages (cPanel only)

Reading <span class="notranslate">`PLAN=`</span> for all users from <span class="notranslate">`/var/cpanel/users`</span> and checking if all of them are present in <span class="notranslate">`/var/cpanel/packages`</span> and if not, then displaying them in pairs like <span class="notranslate">`user: plan`. `default`</span> and <span class="notranslate">`undefined`</span> packages are excluded from the check.

Fails if users from <span class="notranslate">`/var/cpanel/users/`</span> directory have non-existing packages (packages do not exist in <span class="notranslate">`/var/cpanel/packages/`</span> directory, except for <span class="notranslate">`undefined`</span> and <span class="notranslate">`default`</span>). 
 

8. <span class="notranslate">`--check-defaults-cfg`</span>

Checks <span class="notranslate">`/etc/cl.selector/default.cfg`</span>.

Checking that if this config exists, the default PHP version is not disabled in it. Also performing minimal syntax checks for PHP modules settings and displaying the incorrect.
 
Fails if there are some problems in <span class="notranslate">`/etc/cl.selector/default.cfg`</span> found.

Possible reasons for failure:
   * Default version is undefined, which means <span class="notranslate">`/etc/cl.selector/default.cfg`</span> file does not contain section [versions] with the defined default version. 
   * Default PHP version is disabled.

9. <span class="notranslate">`--check-cagefs`</span>

All checks for CageFS are described separately in [this docs section](/cagefs/#sanity-check) and their start from cagefsctl utility is completely equivalent to the start from cldiag and is designed only for a better experience.
 
This checker includes a set of CageFS sub-checkers, failure of one (or more) of them causes general checker failure.

10. <span class="notranslate">`--check-php-conf`</span>

Checks <span class="notranslate">`/etc/cl.selector/php.conf`</span>.

Checking the config syntax for acceptable blocks and directives.
 
Fails if <span class="notranslate">`/etc/cl.selector/php.conf`</span> has incorrect format.

 * File contains an invalid parameter (valid parameters: <span class="notranslate">`Directive`</span>, <span class="notranslate">`Default`</span>, <span class="notranslate">`Type`</span>, <span class="notranslate">`Comment`</span>, <span class="notranslate">`Range`</span>, <span class="notranslate">`Remark`</span>).
  
 * File contains an invalid setting for the parameter <span class="notranslate">`Type`</span> (valid settings for the  <span class="notranslate">`Type`</span> parameter: <span class="notranslate">`value`, `list`, `bool`</span>)

11.  <span class="notranslate">`--check-phpselector`</span>

Checks compatibility for the <span class="notranslate">PHP Selector</span>

Detecting which PHP handler has been configured on the server and checking its compatibility with the <span class="notranslate">CloudLinux PHP Selector</span> according to [this table](/limits/#compatibility-matrix) and displaying the corresponding message with the link to the documentation in case of a problem detected. No checks are performed for EasyApache3.

Failure reasons:
  * The installed <span class="notranslate">`mod_ruid`</span> package is incompatible with the <span class="notranslate">PHP Selector</span>
  * <span class="notranslate">`mod_suexec`</span> is not installed
  * <span class="notranslate">`mod_suphp`</span> is not installed
  * Absence of the <span class="notranslate">`/usr/local/lsws/conf/httpd_config.xml`</span> file (only for LiteSpeed server)

::: tip Note
The following checkers are available in <span class="notranslate">**lve-utils >= 3.1.2**</span>
:::
 

12. <span class="notranslate">`--check-lve-limits`</span>

Checks the validity of LVE limits on the server.

[See this page for detailed description](/limits/#lve-limits-validation).
 

13. <span class="notranslate">`--check-rpmdb`</span>

Checks the RPM database integrity.

Check that rpm database is operable and utils using it (e.g. yum) can work properly.

To start all available checkers at once, the keys <span class="notranslate">`-a | --all`</span> are used. This does not include Check compatibility for PHP Selector, it must be started separately with <span class="notranslate">`--check-phpselector`</span> key.

### Automatic problems notifications<sup> cPanel only</sup>

The utility generates HTML reports and emails them to the administrator. You can change email for notifications by adding the following line to the <span class="notranslate">`/etc/sysconfig/cloudlinux`</span>.

<div class="notranslate">

```
EMAIL=username@domain.zone
```
</div>
 
The automatic checks using cldiag utility by cron job is enabled on a server by default. You can disable it in the <span class="notranslate">`/etc/sysconfig/cloudlinux`</span> config file by adding <span class="notranslate">`ENABLE_CLDIAG=no`</span> option. When calling this utility automatically by cron, it checks all limits existing on the server and sends an administrator a report with limits check results.

**Usage examples**

* Run only one checker

<div class="notranslate">

```
# cldiag --check-phpselector

Check compatibility for PHP Selector:

  OK: It looks ok [php.conf:cgi with suexec, suphp]

There are 0 errors found.
```
</div>

* Run all available checkers

<div class="notranslate">

```
# cldiag -a

Check control panel and it's configuration(for DirectAdmin only):

  OK: Control Panel - cPanel; Version 79.9999;

Check fs.enforce_symlinksifowner is correctly enabled in sysctl conf:

  OK: fs.enforce_symlinksifowner = 1

Check suexec has cagefs jail:

  OK: binary has jail

Check suphp has cagefs jail:

  OK: binary has jail

There are 0 errors found.
```
</div>

### Common problems troubleshooting

Reasons and recommendations on how to fix common cldiag checkers failures.

* <a name="diag-cp"></a><span class="notranslate">`--diag-cp`</span>

  Checks control panel and its configuration (for DirectAdmin only).
  
  On servers with DirectAdmin control panel, CloudLinux support should be enabled in custombuild config. To do so, set <span class="notranslate">`yes`</span> for the <span class="notranslate">`cloudlinux`</span> parameter via <span class="notranslate">`/usr/local/directadmin/custombuild/build`</span> utility. Please read [this article](https://cloudlinux.zendesk.com/hc/articles/115004584909-PHP-Selector-and-DirectAdmin) to see how to set values to parameters.
* <a name="symlinksifowner"></a><span class="notranslate">`--symlinksifowner`</span>

  Checks <span class="notranslate">`fs.enforce_symlinksifowner`</span> is correctly enabled in <span class="notranslate">`/etc/sysctl.conf`</span>.

  To fix warning, change the value of <span class="notranslate">`/proc/sys/fs/enforce_symlinksifowner`</span>. See [Symlink Owner Match Protection](/kernel_settings/#symlink-owner-match-protection) to know more about the <span class="notranslate">`fs.enforce_symlinksifowner`</span> parameter and configure it correctly.
  
  Fixing that warning makes the server more protected against symlink attacks and enables protection of PHP configs and other sensitive files.
* <a name="check-symlinkowngid"></a><span class="notranslate">`--check-symlinkowngid`</span>
  
  Checks <span class="notranslate">`fs.symlinkown_gid`</span>.

  Symlink Owner Match Protection is not enabled for the <span class="notranslate">`Apache`</span> user. To enable it, see [Symlink Owner Match Protection](/kernel_settings/#symlink-owner-match-protection) and set value of apache GID to the <span class="notranslate">`fs.symlinkown_gid`</span> parameter.

  Enabling Symlink Owner Match Protection provides protection for the <span class="notranslate">`Apache `</span>user and it may improve your server security.
* <a name="check-suexec"></a><span class="notranslate">`--check-suexec`</span>

  Checks <span class="notranslate">`suexec`</span> has CageFS jail.

  Check that <span class="notranslate">`suexec`</span> package was installed from CloudLinux repository and if yes, try to reinstall it, probably <span class="notranslate">`suexec`</span> binary was broken.
  
  If you are running server without a control panel, you need to configure <span class="notranslate">`suexec`</span> by yourself. Please read [this article](https://cloudlinux.zendesk.com/hc/articles/115004524005-Configuring-CloudLinux-software-and-PHP-Handlers-on-a-server-with-no-control-panel) to setup suexec on your server.
  
  Fix that warning to be sure that users run their sites inside CageFS and provide stable work of sites that are using Apache suexec module. This may improve server security.
* <a name="check-suphp"></a><span class="notranslate">`--check-suphp`</span>
  
  Checks <span class="notranslate">`suphp`</span> has CageFS jail.

  Check that <span class="notranslate">`suphp`</span> package was installed from CloudLinux repo and if yes, try to reinstall it, probably <span class="notranslate">`suphp`</span> binary was broken. 

  If you are running server without a control panel, you need to configure suphp by yourself. Please read [this article | Installation and setup of a server using suPHP](https://cloudlinux.zendesk.com/hc/articles/115004524005-Configuring-CloudLinux-software-and-PHP-Handlers-on-a-server-with-no-control-panel) to setup <span class="notranslate">`suphp`</span> on your server.

  Fix that warning to be sure that users run their sites inside CageFS and provide stable work of sites that are using Apache suphp module. This may improve server security.
* <a name="check-usepam"><span class="notranslate">`--check-usepam`</span></a>
  
  Checks UsePAM in <span class="notranslate">`/etc/ssh/sshd_config`</span>.

  To fix the issue, replace <span class="notranslate">`UsePAM no`</span> with <span class="notranslate">`Use PAM yes`</span> in the <span class="notranslate">`/etc/ssh/sshd_config`</span> file.
  
  Fix the warning to provide correct work of <span class="notranslate">`pam_lve`</span> module with sshd and CageFS ssh sessions, for details, please [read this documentation about LVE PAM](/limits/#lve-pam-module).

* <a name="check-defaults-cfg"></a><span class="notranslate">`--check-defaults-cfg`</span>

  Checks <span class="notranslate">`/etc/cl.selector/default.cfg`</span>

  * In case of <span class="notranslate">`undefined default version`</span> error, go to <span class="notranslate">LVE Manager | Selector</span> Tab and set the default PHP version;
  * In case of <span class="notranslate">`default version disabled`</span> error, enable that version to fix the warning;

  <span class="notranslate">`/etc/cl.selector/defaults.cfg`</span> config file is used by the PHP Selector and stores its global options, so it is important to keep needed configurations and valid syntax for PHP modules settings to avoid <span class="notranslate">PHP Selector</span> misconfiguration.

* <a name="check-cagefs"></a><span class="notranslate">`--check-cagefs`</span>

  Depending on the error you get, resolution options may differ. See the full list of checks that <span class="notranslate">`--check-cagefs`</span> performs [here](/cagefs/#sanity-check). There you also can find possible failure reasons.

* <a name="check-phpselector"></a><span class="notranslate">`--check-phpselector`</span>

  Checks compatibility for the <span class="notranslate">PHP Selector</span>.
  
  Possible failures:

  * In case of installed `mod_ruid2` package - remove it, <span class="notranslate">PHP Selector</span> is incompatible with that module.
  * In case of non-installed `mod_suexec` package - install it.
  * In case of non-installed `mod_suphp` package - install it.
  * In case of unsupported handler - see [this table](/limits/#compatibility-matrix) to set the compatible handler.

## cloudlinux-config

**cloudlinux-config** utility shows/sets various parameters related to [LVE Manager](/lve_manager/#lve-manager-options) UI, [MySQL Governor](/mysql_governor/#configuration) and [faults notifications for LVE-Stats 2](/lve-stats_2/#configuration)

**Usage:**

<div class="notranslate">

```
cloudlinux-config get [--json] [--for-reseller resname ]
cloudlinux-config set [--json] --data <str> [--for-reseller resname ]
cloudlinux-config set [--json] --reset-inodes-limit
```
</div>

**Commands:**

| | |
|-|-|
| get| Shows the values of all supported parameters|
| set| Sets values for supported parameters|

**Options**

| | |
|-|-|
| --json| Sets/returns values in json format|
| --data| Sets values from the data string that follows|
| --for-reseller| Sets/limits the output only to the data related to reseller _resname_ |
| --reset-inodes-limit| Resets inode limits (in case disk quota breaks)|

**JSON data structure**

All options are enclosed inside `options` (Level 0) string. All options are enclosed in " ", while values come as is. Here's an example:

<div class="notranslate">

```
'{"options":{"L1_option1":value1, "L1_option2":value2}}'
```
</div>

Each Level1 option can have nested Level2 options specified using the same syntax, the same goes for Level2 and Level3 options respectively.

**LVE Manager UI settings**

| | | | |
|-|-|-|-|
| Level1| Level2| Possible values| Description|
| inodeLimits| showUserInodesUsage| true/false| Show end user inode usage|
| uiSettings| hideLVEUserStat| true/false| Hide LVE end user usage statistic|
| uiSettings| hidePHPextensions| true/false| Hide PHP extension selection|
| uiSettings| hidePythonApp| true/false| Hide Python App in web-interface|
| uiSettings| hideRubyApp| true/false| Hide Ruby App in web-interface|

**LVE-Stats 2 faults notification settings**

| | | | | | |
|-|-|-|-|-|-|
| Level1| Level2| Level3| Level4| Possible values| Description|
| faultsNotification| faultsToInclude| concurrentConnections| | true/false| Include concurrent connection value in notification emails|
| faultsNotification| faultsToInclude| cpu| | true/false| Include CPU consumption value in notification emails|
| faultsNotification| faultsToInclude| io| | true/false| Include IO value in notification emails|
| faultsNotification| faultsToInclude| iops| | true/false| Include IOPS value in notification emails|
| faultsNotification| faultsToInclude| mem| | true/false| Include RAM consumption value in notification emails|
| faultsNotification| faultsToInclude| nproc| | true/false| Include number of processes value in notification emails|
| faultsNotification| fminimumNumberOfFaultsToNotify| admin| | N| The minimum number of faults to notify for admin|
| faultsNotification| fminimumNumberOfFaultsToNotify| user| | N| The minimum number of faults to notify for users|
| faultsNotification| fminimumNumberOfFaultsToNotify| reseller*| | N| The minimum number of faults to notify for reseller|
| faultsNotification| fminimumNumberOfFaultsToNotify| customer*| | N| The minimum number of faults to notify for reseller's customers|
| faultsNotification| notify| admin| period| N| The period of faults notifications for admin|
| faultsNotification| notify| admin| unitOfTime| minutes/hours/days| Time units of period of faults notifications for admin|
| faultsNotification| notify| user| period| N| The period of faults notifications for users|
| faultsNotification| notify| user| unitOfTime| minutes/hours/days| Time units of period of faults notifications for users|
| faultsNotification| notify| reseller*| period| N| The period of faults notifications for resellers|
| faultsNotification| notify| reseller*| unitOfTime| minutes/hours/days| Time units of period of faults notifications for resellers|
| faultsNotification| notify| customer*| period| N| The period of faults notifications for reseller's customers|
| faultsNotification| notify| customer*| unitOfTime| minutes/hours/days| Time units of period of faults notifications for reseller's customers|
| faultsNotification| notifyAdmin| | | true/false| Send faults notifications to admin|
| faultsNotification| notifyResellerCustomers| | | true/false| Send faults notification to reseller users|
| faultsNotification| notifyResellerOnCustomers*| | | true/false| Send users' faults notifications to the respective reseller|
| faultsNotification| notifyReseller*| | | true/false| Send faults notification to reseller|
| faultsNotification| notifyCustomers| | | true/false| Send faults notifications to users|
| faultsNotification| notifyResellers| | | true/false| Send faults notification to resellers|

::: tip Note  
Options marked with (*) are for reseller use only
:::

**Examples**

* enable Python/Ruby Selector in User UI for cPanel users

<div class="notranslate">

```
$ cloudlinux-config set --json --data '{"options":{"uiSettings":{"hideRubyApp":false, "hidePythonApp":false}‌}}'
```
</div>
