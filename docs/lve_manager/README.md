# LVE Manager


is a plugin for most popular control panels including cPanel, Plesk, DirectAdmin and ISPmanager (InterWorx coming soon). It allows you to control and monitor limits, and set limits on per package bases.

is installed by default on most servers. If it is missing you can always install it by running:

```
$ yum install lvemanager
```


## Dashboard





CloudLinux dashboard provides a quick overview of statistics and all administrative information for server administrators.
Go to LVE Manager → Dashboard.

![](/images/dashboard_zoom70.png)

Cloudlinux Dashboard provides the following information:

End Users hitting limits — number of users reaching their limit in any kind of resource.  Data is within the last 24 hours.
Resellers hitting limits —  number of enrolled Resellers that are reaching  their limit in any kind of resource. Data is within the last 24 hours.
[Node.js Selector](/node_js_selector/) block displays the following data:
`o` Node.js Selector status (Enabled/Disabled/Not installed) —  displays a current status of the Node.js Selector. To manage Node.js Selector click _Manage_ . You will be redirected to LVE Manager → Options → Node.js Selector.
Click _Install_ to install Node.js Selector, you will be redirected to LVE Manager → Options → Node.js.Selector.
`o` Default version —  the current default version of Node.js set in your system. Click _Manage_ to change the default version account wide.
`o` Applications —  number of installed/all applications for the account.
[Ruby Selector](/python_and_ruby_selector/) block displays the following data:
`o` Ruby Selector status (Enabled/Disabled/Not installed) —  displays a current status of the Ruby Selector. To manage Ruby Selector click _Manage_ . You will be redirected to LVE Manager → Options → Ruby Selector.
Click _Install_ to install Ruby Selector, you will be redirected to LVE Manager → Options → Ruby Selector.
`o` Applications —  number of installed/all applications for the account.
[PHP Selector](/php_selector/) block displays the following data:
`o` Default version —  the default version of PHP binaries. Click _Manage_ to change the default version, enable or disable PHP Selector, change the list of supported versions, and choose default modules. You will be redirected to LVE Manager → PHP Selector.
[Python Selector](/python_and_ruby_selector/) block displays the following data:
`o` Python Selector status (Enabled/Disabled/Not installed —  displays a current status of the Python Selector. To manage Python Selector click _Manage_ . You will be redirected to LVE Manager → Options → Python Selector.
Click _Install_ to install Python Selector, you will be redirected to LVE Manager → Options → Python Selector.
`o` Applications —  number of installed/all applications for the account.
[Reseller Limits](/reseller_limits/) block displays the following data:
`o` Reseller Limits status (Enabled/Disabled). To manage Reseller Limits click _Manage_ . You will be redirected to LVE Manager → Users tab.
`o` Reseller’s accounts with Reseller Limits/all —  the number of Reseller accounts with Reseller Limits enabled versus the total number of Reseller accounts.
`o` Reseller’s End Users with enabled Reseller Limits/all — the number of end users with Reseller Limits enabled versus all End Users that belong to all resellers.
[MySQL Governor](/mysql_governor/) block displays the following data:
`o` MySQL Governor status (Enabled/Disabled/Not installed). To manage MySQL Governor click _Manage_ . You will be redirected to LVE Manager → Options → MySQL Governor Mode of Operation. Click _Install_ to install MySQL Governor.
`o` [Mode](https://docs.cloudlinux.com/modes_of_operation.html) —  displays the MySQL Governor mode of operation. Click _Manage_ to change the mode.
Single — single LVE is used for all customers that go over their DB limits (deprecated).
Off — monitor Only, no DB query limits are applied.
All — all queries are run inside user's LVE.
Abusers — only queries that go over DB limits are executed inside that user's LVE (this is the default mode).
`o` Database version —  displays a current version of MySQL/MariaDB/Percona server installed in the system.
[CageFS](/cagefs/) block displays the following data:
`o` CageFS status (Enabled/Disabled/Not installed). To manage CageFS click _Manage_ . You will be redirected to LVE Manager → Options → CageFS. Click _Install_ to install CageFS.
`o` Mode displays the current CageFS mode of operation.
`o` End users —  displays the number of users with CageFS enabled/all.
[ModLSAPI](/apache_mod_lsapi/) block displays the following data:
`o` Mod_lsapi status (Enabled/Disabled/Not installed) . Click _Install_ to install Mod_lsapi
`o` Module version displays the running version of Mod_lsapi.
`o` [Criu_status](https://docs.cloudlinux.com/criu_support.html) displays the status of lsapi_criu:
Running —  means that lsapi_criu is working.
Stopped —  means that lsapi_criu is not working.
`o` Total Domains displays the total number of domains with Mod_lsapi configured as PHP handler.
`o` Criu_version displays the running version of lsapi_criu.
`o` LSAPI with connection pool.

**Notes:**
If statistics for server is absent for any reasons, you can update it by pressing the _Refresh_ button. This process can last from 10 seconds to one hour depending on your server's performance, number of users and applications.
If statistics collection is turned off it is not displayed. If you wish to get daily statistics for your server, please turn it on by adding parameter to the file.
Data for dashboard is collected once per day. If you want to update data manually, press _Refresh_ . This process can last from 10 seconds to one hour depending on your server's performance, number of users and applications.

## cPanel LVE Manager


Administrator interface allows monitoring and managing limits for hosts end users, managing packages and monitoring statistics.

Administrator credentials allow controlling limits for host users.

![](/images/lvemanagermainmenu_zoom80.png)

Log in as administrator to get access to the following functionality:

 tab - allows monitoring users resource usage at the moment;
 tab with the list of all users allows viewing and managing all the users limits;
 tab displays the statistics of resource usage for proper timeframe or proper users;
 tab - allows setting LVE Faults email notifications for users;
 allows managing packages limits;
tab.
ImunifyAV allows to get access to a brand new malware scanner installed with LVE Manager. Click ImunifyAV on the main menu to go to ImunifyAV interface and use the next-generation, automated security solution that automatically scans the file system for malware injection and quarantines infected files. For details, please go to [ImunifyAV documentation](https://docs.imunifyav.com/) . ( **Available starting from LVE Manager Beta version 4.0-26.8.** )



Choose tab to monitor users resource usage at the moment displayed in the table.

table provides the information on the usage of , and .

values are being refreshed every 10 seconds which is set in field. You can refresh the table manually by clicking or you can freeze the values by clicking pause button. Usage values will not change until the next manual refresh.

Tick checkbox to hide the information on MySQL usage.

To expand the list of users click on the number above and in the dropdown choose the number of user to be displayed on the page.

![](/images/man_01_zoom73.png)



Choose tab to view the list of all users of the system and manage their limits.

Click to apply filters. The following filters available in the dropdown:





![](/images/man_02_zoom79.png)

Actions column:

Click on a pencil icon in column to edit a proper user limits.

Set proper LVE values:
`o` 
`o` PMEM
`o` VMEM
`o` EP
`o` IO
`o` IOPS
`o` NPROC
`o` INODES

![](/images/man_03_zoom86.png)
![](/images/man_04_zoom86.png)

Click to apply changes or to close the window.



Choose tab to view hosts users resource usage statistics.

The following parameters are displayed in the statistics table:

 usage per user;
 usage per user;
 usage per user;
 (in Kb/sec per user).

table can be filtered by:

 - to view the statistics for a proper period;
 - to view a proper limit type usage only;
 - to view top used limits only;
 - to view the limits that are approaching maximum allocated value;
 - the limits that have reached the maximum value.

![](/images/man_05_zoom92.png)



An administrator can set email notifications for users and resellers in cases of limits faults. Choose tab to manage email notifications.

In _LVE Faults_ email notifications section check proper checkboxes to set the required type of notification:

Notify me on users faults - to receive notifications on users LVE faults;
Notify customers - to allow hosts users receiving notifications on their LVE faults;
Notify me when I hit my limits - to receive notifications on LVE faults.

In _ _ section check proper checkboxes to include proper limits to the notifications:

 - include speed limit fault to the notification;
 - include limit fault info to the notification;
 - include limit fault info to the notification;
 - include limit fault info to the notification;
 - include limit fault info to the notification.

In section enter proper number of faults required for the notification to be sent for:

Me - for an administrator;
User - for a User;

Set the frequency of email notifications sending in section.

Click to apply changes.

![](/images/lveman_08.jpg)
![](/images/lveman_09.jpg)



tab allows setting the limits for as many users as you need by editing packages of proper limits. Each account belonging to a proper package adheres to those limits.

Choose tab to view and modify:

limits for hosts user’s packages (Created by Admin);
limits for reseller’s packages (Created by Admin).

![](/images/man_06_zoom82.png)

To modify package limits click on a pencil icon in column in a proper package row. The following limits for this package are available for setting:

 in percent (%);
 (can be set as unlimited by setting 0);
 (can be set as unlimited by setting 0);
 ;
 (can be set as unlimited by setting 0);
 limits;
 (can be set as unlimited by setting 0);
 ;
 .

When limits are set click to apply changes or to close the window.



tab allows controlling settings.

In section choose or from dropdown list to enable or disable .

In choose a proper PHP version or from dropdown list to apply.

In choose required PHP versions to support.

Choose default modules from the list for a proper PHP version or for native.

![](/images/lveman_092.jpg)
![](/images/lveman_093.jpg)



### LVE Manager Options


When you need to change options in cPanel config file on big amount of servers, you don't have to edit file manually, therefore there is no need to login into cPanel on each server. Just go to WHM, choose CloudLinux and click on - and you will be able to change settings from here.



| | |
|-|-|
| | Hides (when =1) range of php extensions for user in version.|
| | Hides (when =1) LVE statistics in .|
| | Displays (when =1) used inodes in cPanel (UI).|
| | Turns off (Select option).|

### Server Processes Snapshots


In case when a CloudLinux user hits LVE limits, appropriate faults are generated and [lvestats](/lve_stats_old/) package generates Server processes snapshot. Snapshot is a list of running applications and a list of running MySQL queries right after the faults happened.

Snapshots allow users to investigate the reason of account hitting its limits. Several snapshots are generated for each incident. An incident is a state when faults are generated in a close time period. The time period is configurable. By default, if faults are generated in 300 seconds time period, we consider them as a single incident.

The snapshot configuration options are available in







To access perform the following steps:

1. Go to cPanel interface, and select in theme:

![](/images/snapshots.jpg)

2. Click the in ** ** theme:

![](/images/snapshots2.jpg)

3. Select a date:

![](/images/snapshots3.jpg)

4. Select an appropriate in the combobox:

![](/images/snapshots4.jpg)
![](/images/snapshots5.jpg)





The list of MySQL queries is an output of a query:

_SELECT command, time, info FROM information_schema.processlist _
_WHERE user = '%username';_

### LVE Plugins Branding


_[Requires _

It is possible to apply branding to the LVE Plugins in cPanel end users’ interface. To brand the cPanel end users'  interface please do the following:

Create a script that will patch files (with branding data, for example, image and logo) after every update of package;

Locate this script in ;

Make this script executable by running the command:

```
chmod a+x /usr/share/l.v.e-manager/branding_script
```

When done, the branding script will be executed while every update of lvemanager package and all branding changes will be applied in the end user’s interface.




## User Message for PHP version


Since version 1.0-4 acquired a feature of adding user messages to PHP versions*. To add a message, you should create a file in with a message that you want to be shown to a user.

For example, if you need to add the following message to PHP version 4.4, you should create the following file:

_/opt/alt/php44/name_modifier:_
_echo 'Don`t use this php version' > /opt/alt/php44/name_modifier_

As a result will automatically pick up this message and will show it in web-interface to administrator ( _Figure 1.1 for cPanel, Figure 1.2 for DirectAdmin_ ) and to user ( _Figure 2.1 for cPanel, Figure 2.2 for DirectAdmin_ ). You can add messages to other PHP versions this way as well.

![](/images/screen1.1lvemanfeature_zoom74.png)
_Figure 1.1_


![](/images/screen1.2lvemanfeature_zoom76.png)
_Figure 1.2_

![](/images/screen2.1lvemanfeature_zoom72.png)
_Figure 2.1_


![](/images/screen2.2lvemanfeature_zoom75.png)
_Figure 2.2_
_*For cPanel and DirectAdmin only._

