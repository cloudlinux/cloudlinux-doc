# inodes


**[cPanel Only]**

limits extension allows setting limits for the customers. An is a data structure on a file system used to keep information about a file or a folder. The number of indicates the number of files and folders an account has. limits work on the level of , and will be enabled on partition only.

allows to set and limit.

limit prevents a user from writing data to disk.

limit can be exceeded for a period of time. The grace period can be set using: .





You can set limits using , the same way you would set any other LVE Limits:


![](/images/inodes_zoom70.png)


The limits can be set on the level of individual account or package:

![](/images/inodespackages_zoom70.png)



Sometimes breaks, so do limits. You can reset them through the tab of :

![](/images/inodelimitsoptions_zoom70.png)



End users can monitor their inodes usage through cPanel:

![](/images/inodescpanel.png)

End user can also see the usage inside resource usage menu.



## cl-quota


utility is designed to control and provides:

Setting user and package limits.

Integration with panel packages.

Limits synchronization.

Automatic inheritance of panel limits to all appropriate users. 



[General Provisions](/cl-quota_general/)

[Setting Limits and Integration with Panel Packages](/set_limits_and_integration/)

[Limits Inheritance](/inheritance/)

[Caching and Synchronizing the Limits](/cache_synchronize/)

[ File](/db_file/)

[CLI Options/Examples](/cli_examples/)



### General Provisions


utility never sets/reads limits directly in the system, it uses standard utilities included into the package for this purpose.

 **will not work ** in the following cases:

are missing or working incorrectly;

the are not configured in the system.

only **performs** the minimal diagnostics of related errors:

verifies the availability of utilities on the disk;

verifies if are activated for a specified user (with a separate command), see below.

package which contains the required utilities, is not included in package dependencies by default, and activation is a long process which sometimes depends on the panel used, therefore, all the steps on configuration and activation must be carried out by yourself, does not perform these actions.

Error messages sent back to the console are extremely rare, to receive error messages use the command:

```
# cat /var/log/messages | grep clquota
```




### Setting Limits and Integration with Panel Packages


utility allows setting limits for users of the system.

integrates with the panels through a standard mechanism - [Integrating LVE Limits with Packages](http://docs.cloudlinux.com/index.html?lve_limits_with_packages.html) .

Panel users are such users whose UIDs are issued by the above panel integration mechanism. The list of panel packages and the information on the user's affiliation to a particular package is obtained from there as well.

When installing/reading the limits, the following peculiarities are applied:

When displaying displays information about the limits of all users - system and panel. No filter applied. The actual limit values are always displayed.

Limit value -1 for the packages (see below) is displayed as dash (-).

If is running under , it will display the limits returned by utility with no changes. If it is running under some other user, it will return data from a special cache file, see _None_ _None_ .

Limits setting only works for panel users, for all other users limits are not set (the command is ignored). The only exception - . The limits are never set for the user , but they are stored in file and are used by inheritance mechanism. See _“_ .

and limits are completely independent, does not apply any interdependencies to them. Setting only one of them (any) is acceptable, the other one will not change.

utility also supports package limits set/read. When setting package limits, they are set for all users of a particular package except for those whose limits are set individually. _See also _ .

If package name is , then setting limits command is ignored. If some limits are set for this package in file, they will be displayed along with all the others, but will not be used. _See also _

Any positive numbers are allowed as limit values. neither controls nor changes these values except the following cases:

negative values are taken modulo;

fractional values are converted to integers by discarding the fractional part;

if the transferred value can not be turned into a number (for example, 67wg76), it is completely ignored and the limit is not set at all.

Then these values are transmitted directly to system utility for the actual setting of the limits.

Thus has two limit values, which are processed in a special way:

0. Means inheritance of the limit from the package where the user is located, or from . See also _None_ for more detailed information.

-1. The real limits are set to 0, which means no limits, literally "unlimited". This is legit both for individual and for package limits. Limit value -1 is stored in the database as well as any other but is never displayed.

You can use the words and instead of 0 and -1 respectively, they are fully interchangeable. See also _None_ and _ _ .

Individual and package limits are always saved in DB file . Limits from there are used when synchronizing . Please find more details in _  _ .

Also, find detailed information on DB file itself in _None_ _None_ section.

Utility options are described in _ _ section.

### Limits Inheritance


When setting package limits to the package users, the inheritance principle is applied. It means that:

If no individual limit is set to a user, then he inherits the limits of the package he belongs to.

If no limit is set to a package (=0), then the users inherit uid=0 limits.

Limits of the package named (if found in the file) will always be ignored and all the users of this package will get limits.


### Caching and Synchronizing the Limits


Any user of the system (including panel users) is always created with limits equal to 0. To assign him the limits of the corresponding package, the synchronization process is used.

During the synchronization, utility reads the database file and sets the limits from it to the users and packages specified therein.
This mode is designed to set the correct limits for the new users and to restore them for the existing ones. When recovering, the current limits are neither read nor analyzed.

Caching - is writing current limits to file. If is not started from the for reading the current limits, then it returns data from this file.

When installing package, a special is installed, which performs synchronization and caching ( ) every 5 minutes. Therefore, the correct limits will be set for the user within 5 minutes from the moment of its creation.

Caching and synchronization can also be performed separately, see _None_ section.

To disable this feature add to the config file _/etc/sysconfig/cloudlinux_ .


### Quotas DB File


All limits settings are stored in along with the or the name of the package the limit was set for.

When saving the limits to a file, the following rules are applied:

If a limit value is non-integer or non-numeric, then the rules from section are applied. The assigned value is saved to the file.

Limits are always saved in pairs, no matter if only one limit was set or both. The pair looks as follows: .

The values 0 and -1, when having a predetermined meaning, are saved as is without any transformations.

The words and are saved as 0 and -1 respectively.

If both limits for a user/package were set as 0, then such user/package is not saved in the file, and if it was previously there - it will be removed. Therefore, if a user/package is not mentioned in the file, then all its limits are inherited. See _None_ section.

The lists of panel users, packages, and user-package correspondence are not saved anywhere, this information is always subtracted from the panel.

Example:

```
/etc/container/cl-quotas.dat
[users]
0 = 1000:2000
500 = -1:-1
958 = 0:20000
[packages]
pack1 = 5000:-1
```

It follows that:

uid=0 limits are set to 1000:2000 - all users in the default package will obtain these limits.

Both limits are set as unlimited for a user with uid=500, which means that its real limits will always be 0:0. The package limits do not affect this user.

limit of the user with uid=958 is inherited (0 means inheritance), his limit is set to 20000 and it will not depend on the package limits or uid=0 limits.

Limits 5000:-1 are set for pack1 package, therefore its real limits are: and (unlimited).

The users of package will get limits (5000:-1), the users of all the rest of the packages will get the limits of uid=0 because no limits are set for them. Exceptions: uid=500 and 958. uid=500 has both limits set individually, and uid=958 inherits only limits.

### CLI Options/Examples


utility has the following command line options:














and options are designed to specify user whose limits are required to be set or displayed. specifies user name, . It is acceptable to specify one or another.

- specifies package name.

- specify and limits values respectively. It is acceptable to use words or as limit value.

- displays limits in format (instead of data formatted in the table).

- displaying the limits of the packages created by the panel admin.

- displaying the limits of all the packages, including the ones created by the resellers and packages with no users.

- synchronizes users and packages with the database.

- performs caching.

- saving user even if they are equal to the current.

- performs diagnostics for a specified user. Can be used only when a user is specified (along with ).

_Examples:_

1. Reading current user limits:

```
# cl-quota
# cl-quota --csv
```

2. Reading current package limits:

```
# cl-quota --package-limits
# cl-quota --all-package-limits
# cl-quota --package-limits --csv
# cl-quota --all-package-limits --csv
```

3. Specifying limits for a user:

```
# cl-quota --user-id=500 --soft-limit=0 --hard-limit=0
# cl-quota --user-id=500 --soft-limit=unlimited
# cl-quota --user-id=500 --soft-limit=0 --hard-limit=-1
# cl-quota --user-id=958 --hard-limit=20000 --soft-limit=0 --force
```

4. Specifying limits for a package:

```
# cl-quota --package pack1 --hard-limit=-1 --soft-limit=5000
# cl-quota --package pack1 --hard-limit=10000
# cl-quota --package pack1 --soft-limit=default
```

5. User diagnostics (with example output):

```
# cl-quota --user-id=500 --check
Quota disabled for user id 500 (home directory /home/cltest1); quotaon: Mountpoint (or device) / not found or has no quota enabled.
```

6. Synchronizing

```
# cl-quota -YC
```


