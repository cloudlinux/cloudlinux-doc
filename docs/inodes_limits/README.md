# inodes


**[cPanel Only]**

<span class="notranslate"> LVE Manager inodes </span> limits extension allows setting <span class="notranslate"> inode </span> limits for the customers. An <span class="notranslate"> inode </span> is a data structure on a file system used to keep information about a file or a folder. The number of <span class="notranslate"> inodes </span> indicates the number of files and folders an account has. <span class="notranslate"> inodes </span> limits work on the level of <span class="notranslate"> disk quota </span> , and will be enabled on <span class="notranslate"> /home </span> partition only.

<span class="notranslate"> LVE Manager </span> allows to set <span class="notranslate"> soft </span> and <span class="notranslate"> hard IO </span> limit.

* <span class="notranslate"> Hard </span> limit prevents a user from writing data to disk.

* <span class="notranslate"> Soft </span> limit can be exceeded for a period of time. The grace period can be set using: <span class="notranslate"> edquota -t </span> .

* You can set <span class="notranslate"> inodes </span> limits using <span class="notranslate"> LVE Manager </span> , the same way you would set any other LVE Limits:

::: tip Note
We do not collect statistical information on the inodes like we do for other LVE limits.
:::

![](/images/inodes_zoom70.png)


The limits can be set on the level of individual account or package:

![](/images/inodespackages_zoom70.png)



Sometimes <span class="notranslate"> disk quota </span> breaks, so do <span class="notranslate"> inodes </span> limits. You can reset them through the <span class="notranslate"> _Options_ </span> tab of <span class="notranslate"> LVE Manager </span> :

![](/images/inodelimitsoptions_zoom70.png)



End users can monitor their inodes usage through cPanel:

![](/images/inodescpanel.png)

End user can also see the usage inside resource usage menu.



## cl-quota


<span class="notranslate"> **cl-quota**   </span> utility is designed to control <span class="notranslate"> disk quotas </span> and provides:

* Setting user and package limits.

* Integration with panel packages.

* Limits synchronization.

* Automatic inheritance of panel limits to all appropriate users. 

::: tip Note
cl-quota works only with inodes soft/hard limits (soft/hard file limits in setquota/repquota utilities terminology). Block limits are not controlled by cl-quota utility in any way, they are not taken into account and do not affect the data that they issue. That is why hereinafter it is the inode limits that are implied by the word “limits”.
:::


[General Provisions](/inodes_limits/#general-provisions)

[Setting Limits and Integration with Panel Packages](/inodes_limits/#setting-limits-and-integration-with-panel-packages)

[Limits Inheritance](/inodes_limits/#limits-inheritance)

[Caching and Synchronizing the Limits](/inodes_limits/#caching-and-synchronizing-the-limits)

<span class="notranslate"> [Quotas DB](/inodes_limits/#quotas-db-file) </span> [ File](/inodes_limits/#quotas-db-file)

[CLI Options/Examples](/inodes_limits/#cli-options-examples)



### General Provisions


<span class="notranslate"> cl-quota </span> utility never sets/reads limits directly in the system, it uses standard <span class="notranslate"> setquota/repquota </span> utilities included into the <span class="notranslate"> quota </span> package for this purpose.

<span class="notranslate"> cl-quota </span>  **will not work** in the following cases:

* <span class="notranslate"> setquota/repquota </span> are missing or working incorrectly;

* the <span class="notranslate"> quotas </span> are not configured in the system.

<span class="notranslate"> cl-quota </span> only **performs** the minimal diagnostics of <span class="notranslate"> quota </span> related errors:

* verifies the availability of <span class="notranslate"> setquota/repquota </span> utilities on the disk;

* verifies if <span class="notranslate"> quotas </span> are activated for a specified user (with a separate command), see below.

<span class="notranslate"> quota </span> package which contains the required <span class="notranslate"> setquota/repquota </span> utilities, is not included in <span class="notranslate"> lvemanager </span> package dependencies by default, and <span class="notranslate"> quotas </span> activation is a long process which sometimes depends on the panel used, therefore, all the steps on <span class="notranslate"> quotas </span> configuration and activation must be carried out by yourself, <span class="notranslate"> cl-quota </span> does not perform these actions.

Error messages sent back to the console are extremely rare, to receive error messages use the command:
<div class="notranslate">

```
# cat /var/log/messages | grep clquota
```
</div>

::: tip Note
You should not set soft limit higher than hard limit. cl-quota does not control it in any way, but in some cases, the system can ban such limits combination and they won’t be set or will be set in some other way.
:::

### Setting Limits and Integration with Panel Packages


<span class="notranslate"> cl-quota </span> utility allows setting <span class="notranslate"> inodes </span> limits for users of the system.

<span class="notranslate"> cl-quota </span> integrates with the panels through a standard mechanism - [Integrating LVE Limits with Packages](http://docs.cloudlinux.com/index.html?lve_limits_with_packages.html) .

Panel users are such users whose UIDs are issued by the above panel integration mechanism. The list of panel packages and the information on the user's affiliation to a particular package is obtained from there as well.

When installing/reading the limits, the following peculiarities are applied:

1. When displaying <span class="notranslate"> quotas, cl-quota </span> displays information about the limits of all users - system and panel. No filter applied. The actual limit values are always displayed.

2. Limit value -1 for the packages (see below) is displayed as dash (-).

3. If <span class="notranslate"> cl-quota </span> is running under <span class="notranslate"> root </span> , it will display the limits returned by <span class="notranslate"> repquota </span> utility with no changes. If it is running under some other user, it will return data from a special cache file, see [“](/inodes_limits/#caching-and-synchronizing-the-limits) <span class="notranslate"> [Quotas](/inodes_limits/#caching-and-synchronizing-the-limits) </span> [ cache and synchronization”](/inodes_limits/#caching-and-synchronizing-the-limits) .

4. Limits setting only works for panel users, for all other users limits are not set (the command is ignored). The only exception - <span class="notranslate"> uid=0 </span> . The limits are never set for the <span class="notranslate"> root </span> user <span class="notranslate"> (uid=0) </span> , but they are stored in <span class="notranslate"> DB </span> file and are used by inheritance mechanism. See ["Limits Inheritance”](/inodes_limits/#limits-inheritance) .

5. <span class="notranslate"> Hard </span> and <span class="notranslate"> soft </span> limits are completely independent, <span class="notranslate"> сl-quota </span> does not apply any interdependencies to them. Setting only one of them (any) is acceptable, the other one will not change.

<span class="notranslate"> cl-quota </span> utility also supports package limits set/read. When setting package limits, they are set for all users of a particular package except for those whose limits are set individually. _See also_ [“Limits Inheritance”](/inodes_limits/#limits-inheritance) .

If package name is <span class="notranslate"> "default" </span> , then setting limits command is ignored. If some limits are set for this package in <span class="notranslate"> DB </span> file, they will be displayed along with all the others, but will not be used. _See also_ [“Limits inheritance”](/inodes_limits/#limits-inheritance) _._

Any positive numbers are allowed as limit values. <span class="notranslate"> cl-quota </span> neither controls nor changes these values except the following cases:

negative values are taken modulo;

fractional values are converted to integers by discarding the fractional part;

if the transferred value can not be turned into a number (for example, 67wg76), it is completely ignored and the limit is not set at all.

Then these values are transmitted directly to <span class="notranslate"> setquota </span> system utility for the actual setting of the limits.

Thus <span class="notranslate"> cl-quota </span> has two limit values, which are processed in a special way:

* 0: Means inheritance of the limit from the package where the user is located, or from <span class="notranslate"> uid=0 </span> . See also [“Limits inheritance”](/inodes_limits/#limits-inheritance) for more detailed information.

* -1: The real limits are set to 0, which means no limits, literally "unlimited". This is legit both for individual and for package limits. Limit value -1 is stored in the database as well as any other but is never displayed.

You can use the words <span class="notranslate"> “default” </span> and <span class="notranslate"> “unlimited” </span> instead of 0 and -1 respectively, they are fully interchangeable. See also [“DB File”](/inodes_limits/#quotas-db-file) and [“CLI Options”](/inodes_limits/#cli-options-examples) .

Individual and package limits are always saved in DB file. Limits from there are used when synchronizing <span class="notranslate"> quotas </span> . Please find more details in [“Limits Synchronization”](/inodes_limits/#caching-and-synchronizing-the-limits) .

Also, find detailed information on DB file itself in [“](/inodes_limits/#quotas-db-file) <span class="notranslate"> [Quotas](/inodes_limits/#quotas-db-file) </span> [ DB File”](/inodes_limits/#quotas-db-file) section.

Utility options are described in [“CLI Options”](/inodes_limits/#cli-options-examples) section.

### Limits Inheritance


When setting package limits to the package users, the inheritance principle is applied. It means that:

* If no individual limit is set to a user, then he inherits the limits of the package he belongs to.

* If no limit is set to a package (=0), then the users inherit uid=0 limits.

Limits of the package named <span class="notranslate"> “default” </span> (if found in the <span class="notranslate"> DB </span> file) will always be ignored and all the users of this package will get <span class="notranslate"> uid=0 </span> limits.


### Caching and Synchronizing the Limits


Any user of the system (including panel users) is always created with limits equal to 0. To assign him the limits of the corresponding package, the synchronization process is used.

During the synchronization, <span class="notranslate"> cl-quota </span> utility reads the database file and sets the limits from it to the users and packages specified therein.
This mode is designed to set the correct limits for the new users and to restore them for the existing ones. When recovering, the current limits are neither read nor analyzed.

Caching - is writing current limits to <span class="notranslate"> _/etc/container/cl-quotas.cache_ </span> file. If <span class="notranslate"> cl-quota </span> is not started from the <span class="notranslate"> root </span> for reading the current limits, then it returns data from this file.

When installing <span class="notranslate"> LVE Manager </span> package, a special <span class="notranslate"> cron job </span> is installed, which performs synchronization and caching ( <span class="notranslate"> cl-quota -YC </span> ) every 5 minutes. Therefore, the correct limits will be set for the user within 5 minutes from the moment of its creation.

Caching and synchronization can also be performed separately, see ["CLI Options"](/inodes_limits/#cli-options-examples) section.

To disable this feature add to the config file _/etc/sysconfig/cloudlinux_ .


### Quotas DB File


All <span class="notranslate"> cl-quota </span> limits settings are stored in along with the <span class="notranslate"> UID </span> or the name of the package the limit was set for.

When saving the limits to a file, the following rules are applied:

* If a limit value is non-integer or non-numeric, then the rules from <span class="notranslate"> "Setting limits and integrating with panel packages" </span> section are applied. The assigned value is saved to the file.

* Limits are always saved in pairs, no matter if only one limit was set or both. The pair looks as follows: <span class="notranslate"> soft_limit:hard_limit </span> .

* The values 0 and -1, when having a predetermined meaning, are saved as is without any transformations.

* The words <span class="notranslate"> “default” </span> and <span class="notranslate"> “unlimited” </span> are saved as 0 and -1 respectively.

* If both limits for a user/package were set as 0, then such user/package is not saved in the file, and if it was previously there - it will be removed. Therefore, if a user/package is not mentioned in the file, then all its limits are inherited. See ["Limits Inheritance"](/inodes_limits/#limits-inheritance) section.

The lists of panel users, packages, and user-package correspondence are not saved anywhere, this information is always subtracted from the panel.

Example:
<div class="notranslate">

```
/etc/container/cl-quotas.dat
[users]
0 = 1000:2000
500 = -1:-1
958 = 0:20000
[packages]
pack1 = 5000:-1
```
</div>
It follows that:

* uid=0 limits are set to 1000:2000 - all users in the default package will obtain these limits.

* Both limits are set as unlimited for a user with uid=500, which means that its real limits will always be 0:0. The package limits do not affect this user.

* <span class="notranslate"> Soft </span> limit of the user with uid=958 is inherited (0 means inheritance), his <span class="notranslate"> hard </span> limit is set to 20000 and it will not depend on the package limits or uid=0 limits.

* Limits 5000:-1 are set for pack1 package, therefore its real limits are: <span class="notranslate"> soft_limit=5000 </span> and <span class="notranslate"> hard_limit=0 </span> (unlimited).

* The users of <span class="notranslate"> pack1 </span> package will get <span class="notranslate"> pack1 </span> limits (5000:-1), the users of all the rest of the packages will get the limits of uid=0 because no limits are set for them. Exceptions: uid=500 and 958. uid=500 has both limits set individually, and uid=958 inherits only <span class="notranslate"> soft </span> limits.

### CLI Options/Examples


<span class="notranslate"> cl-quotа </span> utility has the following command line options:
<div class="notranslate">

```
-u | --user                  : specifies the user
-U | --user-id              : specifies the user ID
-S | --soft-limit            : sets the soft limit for a user. Pass 0 or 'default' to set package default limit. Pass -1 or 'unlimited' to cancel limit
-H | --hard-limit            : sets the hard limit for a user. Pass 0 or 'default' to set package default limit. Pass -1 or 'unlimited' to cancel limit
-V | --csv                  : returns data as comma separated values
-p | --package              : specifies a package to set or get limits
-P | --package-limits        : prints package limits
-a | --all-package-limits : prints all package limits (including packages without limits)
-Y | --sync                  : synchronizes packages and users limits with the database
-C | --cache-content        : cache quota data to a file the database
-F | --force                : save user quotas even when they are equal to defaults
       --check                : check if quotas is enabled/activated/suported; if disabled show diagnostic information; using with --user or --user-id options
```
</div>

<span class="notranslate"> **--user** </span> and <span class="notranslate"> **--user-id** </span> options are designed to specify user whose limits are required to be set or displayed. <span class="notranslate"> --user </span> specifies user name, <span class="notranslate"> --user-id - uid </span> . It is acceptable to specify one or another.

<span class="notranslate"> **--package** </span> - specifies package name.

<span class="notranslate"> **--soft-limit** ,  **--hard-limit** </span> - specify <span class="notranslate"> soft </span> and <span class="notranslate"> hard </span> limits values respectively. It is acceptable to use words <span class="notranslate"> “default” </span> or <span class="notranslate"> “unlimited” </span> as limit value.

<span class="notranslate"> **--csv** </span> - displays limits in <span class="notranslate"> csv </span> format (instead of data formatted in the table).

<span class="notranslate"> **--package-limits** </span> - displaying the limits of the packages created by the panel admin.

<span class="notranslate"> **--all-package-limits**   </span> - displaying the limits of all the packages, including the ones created by the resellers and packages with no users.

<span class="notranslate"> **--sync** </span> - synchronizes users <span class="notranslate"> quotas </span> and packages with the database.

<span class="notranslate"> **--cache-contents** </span> - performs <span class="notranslate"> quotas </span> caching.

<span class="notranslate"> **--force** </span> - saving user <span class="notranslate"> quotas </span> even if they are equal to the current.

<span class="notranslate"> **--check**   </span> - performs diagnostics for a specified user. Can be used only when a user is specified (along with <span class="notranslate"> --user / --user-id </span> ).

_Examples:_

1. Reading current user limits:

<div class="notranslate">

```
# cl-quota
# cl-quota --csv
```
</div>

2. Reading current package limits:

<div class="notranslate">

```
# cl-quota --package-limits
# cl-quota --all-package-limits
# cl-quota --package-limits --csv
# cl-quota --all-package-limits --csv
```
</div>

3. Specifying limits for a user:

<div class="notranslate">

```
# cl-quota --user-id=500 --soft-limit=0 --hard-limit=0
# cl-quota --user-id=500 --soft-limit=unlimited
# cl-quota --user-id=500 --soft-limit=0 --hard-limit=-1
# cl-quota --user-id=958 --hard-limit=20000 --soft-limit=0 --force
```
</div>

4. Specifying limits for a package:

<div class="notranslate">

```
# cl-quota --package pack1 --hard-limit=-1 --soft-limit=5000
# cl-quota --package pack1 --hard-limit=10000
# cl-quota --package pack1 --soft-limit=default
```
</div>

5. User diagnostics (with example output):

<div class="notranslate">

```
# cl-quota --user-id=500 --check
Quota disabled for user id 500 (home directory /home/cltest1); quotaon: Mountpoint (or device) / not found or has no quota enabled.
```
</div>

6. Synchronizing <span class="notranslate"> quotas with caching (executed in cron): </span>

<div class="notranslate">

```
# cl-quota -YC
```
</div>

