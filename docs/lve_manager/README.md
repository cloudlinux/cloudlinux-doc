# LVE Manager


<span class="notranslate"> LVE Manager </span> is a plugin for most popular control panels including cPanel, Plesk, DirectAdmin and ISPmanager (InterWorx coming soon). It allows you to control and monitor limits, and set limits on per package bases.

<span class="notranslate"> LVE Manager </span> is installed by default on most servers. If it is missing you can always install it by running:
<span class="notranslate"> </span>
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
Node.js Selector status (Enabled/Disabled/Not installed) —  displays a current status of the Node.js Selector. To manage Node.js Selector click _Manage_ . You will be redirected to LVE Manager → Options → Node.js Selector.
Click _Install_ to install Node.js Selector, you will be redirected to LVE Manager → Options → Node.js.Selector.
Default version —  the current default version of Node.js set in your system. Click _Manage_ to change the default version account wide.
Applications —  number of installed/all applications for the account.
[Ruby Selector](/python_and_ruby_selector/) block displays the following data:
Ruby Selector status (Enabled/Disabled/Not installed) —  displays a current status of the Ruby Selector. To manage Ruby Selector click _Manage_ . You will be redirected to LVE Manager → Options → Ruby Selector.
Click _Install_ to install Ruby Selector, you will be redirected to LVE Manager → Options → Ruby Selector.
Applications —  number of installed/all applications for the account.
[PHP Selector](/php_selector/) block displays the following data:
Default version —  the default version of PHP binaries. Click _Manage_ to change the default version, enable or disable PHP Selector, change the list of supported versions, and choose default modules. You will be redirected to LVE Manager → PHP Selector.
[Python Selector](/python_and_ruby_selector/) block displays the following data:
Python Selector status (Enabled/Disabled/Not installed —  displays a current status of the Python Selector. To manage Python Selector click _Manage_ . You will be redirected to LVE Manager → Options → Python Selector.
Click _Install_ to install Python Selector, you will be redirected to LVE Manager → Options → Python Selector.
Applications —  number of installed/all applications for the account.
[Reseller Limits](/reseller_limits/) block displays the following data:
Reseller Limits status (Enabled/Disabled). To manage Reseller Limits click _Manage_ . You will be redirected to LVE Manager → Users tab.
Reseller’s accounts with Reseller Limits/all —  the number of Reseller accounts with Reseller Limits enabled versus the total number of Reseller accounts.
Reseller’s End Users with enabled Reseller Limits/all — the number of end users with Reseller Limits enabled versus all End Users that belong to all resellers.
[MySQL Governor](/mysql_governor/) block displays the following data:
MySQL Governor status (Enabled/Disabled/Not installed). To manage MySQL Governor click _Manage_ . You will be redirected to LVE Manager → Options → MySQL Governor Mode of Operation. Click _Install_ to install MySQL Governor.
[Mode](https://docs.cloudlinux.com/modes_of_operation.html) —  displays the MySQL Governor mode of operation. Click _Manage_ to change the mode.
Single — single LVE is used for all customers that go over their DB limits (deprecated).
Off — monitor Only, no DB query limits are applied.
All — all queries are run inside user's LVE.
Abusers — only queries that go over DB limits are executed inside that user's LVE (this is the default mode).
Database version —  displays a current version of MySQL/MariaDB/Percona server installed in the system.
[CageFS](/cagefs/) block displays the following data:
CageFS status (Enabled/Disabled/Not installed). To manage CageFS click _Manage_ . You will be redirected to LVE Manager → Options → CageFS. Click _Install_ to install CageFS.
Mode displays the current CageFS mode of operation.
End users —  displays the number of users with CageFS enabled/all.
[ModLSAPI](/apache_mod_lsapi/) block displays the following data:
Mod_lsapi status (Enabled/Disabled/Not installed) . Click _Install_ to install Mod_lsapi
Module version displays the running version of Mod_lsapi.
[Criu_status](https://docs.cloudlinux.com/criu_support.html) displays the status of lsapi_criu:
Running —  means that lsapi_criu is working.
Stopped —  means that lsapi_criu is not working.
Total Domains displays the total number of domains with Mod_lsapi configured as PHP handler.
Criu_version displays the running version of lsapi_criu.
LSAPI with connection pool.

**Notes:**
If statistics for server is absent for any reasons, you can update it by pressing the _Refresh_ button. This process can last from 10 seconds to one hour depending on your server's performance, number of users and applications.
If statistics collection is turned off it is not displayed. If you wish to get daily statistics for your server, please turn it on by adding `cl_statistics_enabled=1` parameter to the `/etc/sysconfig/cloudlinux` file.
Data for dashboard is collected once per day. If you want to update data manually, press _Refresh_ . This process can last from 10 seconds to one hour depending on your server's performance, number of users and applications.

## CloudLinux Installation Wizard



<span class="notranslate"> CloudLinux Installation Wizard </span> allows you to easily install and set up CloudLinux OS components on your server with cPanel, Plesk or DirectAdmin.

As you have CloudLinux OS installed, navigate to <span class="notranslate"> CloudLinux LVE Manager </span> in your control panel. CloudLinux Installation Wizard starts automatically if <span class="notranslate"> `lvemanager` </span> package is installed for the first time (not updated).

![](/images/installationwizardmain_zoom70.png)

To start setting up your CloudLinux OS, click <span class="notranslate"> _Start Wizard_ </span> button, otherwise click <span class="notranslate"> _Skip Wizard_ </span> , and you will be redirected to the <span class="notranslate"> LVE Manager Dashboard </span> .





![](/images/wizard-dashboard_zoom60.png)

The next step is selecting required components to be installed.
![](/images/installationwizardstep1_zoom70.png)
Click <span class="notranslate"> _Finish_   _and Install_ </span> to complete installation or click <span class="notranslate"> _Skip Wizard_ </span> to go back to the <span class="notranslate"> Dashboard </span> .
Find a complete description of the CloudLinux components below.





A virtualized per-user file system encapsulates each customer into a ‘cage’ preventing them from seeing each other files and viewing sensitive information (e.g., system files)

![](/images/wizardcagefs_zoom90.png)
Toggle the sliders to enable CageFS by default for new and/or existing users. 





It is the fastest and most reliable way to serve PHP pages for Apache web-servers, a drop-in replacement for SuPHP, FCGID, RUID2, and ITK.

![](/images/wizard_lsapi_zoom90.png)

LSAPI requires CRIU to operate and we also recommend you to use mod_suexec. You can find details in our [documentation](/apache_mod_lsapi/) .



Monitors MySQL usage to throttle abusers, preventing server overload and improving overall performance.

![](/images/wizard_mysqlgovernor_zoom90.png)



We recommend you to create a full database backup before the <span class="notranslate"> MySQL Governor </span> installation.



Allows end users to create Node.js applications and select the specific version of Node.js and other parameters.

![](/images/wizard_node.jsselector_zoom90.png)  Here you can choose versions to be installed and the version to be used as default.



Allows end users to select the specific version of <span class="notranslate"> Ruby </span> they need. 
![](/images/wizard_ruby_selector_zoom90.png)  Here you can choose <span class="notranslate"> Ruby </span> versions to be installed.



Allows end users to select the default version of <span class="notranslate"> Python </span> and set the required versions for installation.   ![](/images/wizard_python_selector_zoom90.png) 
Here you can choose <span class="notranslate"> Python </span> versions to be installed.



Allows end users to select the specific version of PHP they need, with over 120 PHP extensions to choose from.

![](/images/wizard_php_selector_zoom90.png)

Go to <span class="notranslate"> LVE Manager </span> settings to set up <span class="notranslate"> PHP Selector </span> options and parameters. Read more in the [ PHP Selector documentation](/php_selector/#installation-and-update) . 


When the components to be installed are selected and configured, and installation is started, you will be redirected to the <span class="notranslate"> LVE Manager → Dashboard </span> .



Installation status is displayed throughout the process in the <span class="notranslate"> Dashboard </span> . Click <span class="notranslate"> _Installing_ </span> to show modules installation state.

![](/images/wizard_installation_status_zoom70.png)

All installed modules are displayed on the <span class="notranslate"> Dashboard </span> .
When installation is completed successfully, you will see the following status.


![](/images/wizardsuccess_zoom90.png)

If you decide to remove failed module or a module to be installed by clicking the (X) button, a confirmation dialog will appear. After confirming the action, the module will disappear from the list.

![](/images/wizardinstallremove_zoom90.png)

If module installation fails, the Installing button changes to <span class="notranslate"> _Warning_ </span> and the module indicator will turn red.

![](/images/wizard_warning_zoom70.png)


Click ![](/images/wizard_download_btn.png) to download the error log.
Click ![](/images/wizard_try_again_btn.png) to try to install a module again.
Click ![](/images/wizard_close_btn.png) to remove a specific module from the installation queue. The module will be displayed on the <span class="notranslate"> Dashboard </span> but will not be installed.

If module auto-installation fails, you will see that the module indicator turns yellow.
![](/images/wizardautoinstallationfails_zoom80.png)
In this case, you can download a log for details and try to install the module again.



In case of a fatal error, you will see the following warning.

![](/images/wizardbroken_zoom70.png)


Click ![](/images/wizard_download_btn.png) to download the error log.
Click ![](/images/wizard_try_again_btn.png) to try to install module(s) again.
Click ![](/images/wizard_close_btn.png) to cancel installation. The canceled modules will be removed from the installation process.

You can contact our support team for further assistance anytime by [submitting a ticket in our helpdesk system](https://cloudlinux.zendesk.com/hc/requests/new) .











## cPanel LVE Manager


<span class="notranslate"> cPanel LVE Manager </span> Administrator interface allows monitoring and managing limits for hosts end users, managing packages and monitoring statistics.

Administrator credentials allow controlling limits for host users.

![](/images/lvemanagermainmenu_zoom80.png)

Log in as administrator to get access to the following functionality:

 <span class="notranslate"> Current usage </span> tab - allows monitoring users resource usage at the moment;
 <span class="notranslate"> Users </span> tab with the list of all users allows viewing and managing all the users limits;
 <span class="notranslate"> Statistics </span> tab displays the statistics of resource usage for proper timeframe or proper users;
 <span class="notranslate"> Options </span> tab - allows setting LVE Faults email notifications for users;
 <span class="notranslate"> Packages </span> allows managing packages limits;
tab.
ImunifyAV allows to get access to a brand new malware scanner installed with LVE Manager. Click ImunifyAV on the main menu to go to ImunifyAV interface and use the next-generation, automated security solution that automatically scans the file system for malware injection and quarantines infected files. For details, please go to [ImunifyAV documentation](https://docs.imunifyav.com/) . ( **Available starting from LVE Manager Beta version 4.0-26.8.** )



Choose <span class="notranslate"> _Current usage_ </span> tab to monitor users resource usage at the moment displayed in the table.

<span class="notranslate"> Current usage </span> table provides the information on the usage of <span class="notranslate"> Speed, memory, IO, IOPS, Number of Processes </span> , and <span class="notranslate"> Entry Processes </span> .

<span class="notranslate"> Resource usage </span> values are being refreshed every 10 seconds which is set in <span class="notranslate"> _Auto-refresh_ </span> field. You can refresh the table manually by clicking <span class="notranslate"> _Refresh now_ </span> or you can freeze the values by clicking pause button. Usage values will not change until the next manual refresh.

Tick <span class="notranslate"> _Hide MySQL usage_ </span> checkbox to hide the information on MySQL usage.

To expand the list of users click on the number above and in the dropdown choose the number of user to be displayed on the page.

![](/images/man_01_zoom73.png)



Choose <span class="notranslate"> Users </span> tab to view the list of all users of the system and manage their limits.

Click <span class="notranslate"> Filter by </span> to apply filters. The following filters available in the dropdown:

 <span class="notranslate"> Username. </span>
 <span class="notranslate"> Domain. </span>
 <span class="notranslate"> LVE ID. </span>

![](/images/man_02_zoom79.png)

Actions column:

Click on a pencil icon in <span class="notranslate"> Actions </span> column to edit a proper user limits.

Set proper LVE values:
 <span class="notranslate"> SPEED </span>
PMEM
VMEM
EP
IO
IOPS
NPROC
INODES

![](/images/man_03_zoom86.png)
![](/images/man_04_zoom86.png)

Click <span class="notranslate"> _Save_ </span> to apply changes or <span class="notranslate"> _Cancel_ </span> to close the window.



Choose <span class="notranslate"> Statistics </span> tab to view hosts users resource usage statistics.

The following parameters are displayed in the statistics table:

 <span class="notranslate"> CPU </span> usage per user;
 <span class="notranslate"> PMEM </span> usage per user;
 <span class="notranslate"> VMEM </span> usage per user;
 <span class="notranslate"> IO </span> (in Kb/sec per user).

<span class="notranslate"> Statistics </span> table can be filtered by:

 <span class="notranslate"> Timeframe </span> - to view the statistics for a proper period;
 <span class="notranslate"> Limit ID </span> - to view a proper limit type usage only;
 <span class="notranslate"> Top LVEs </span> - to view top used limits only;
 <span class="notranslate"> LVE approaching limit </span> - to view the limits that are approaching maximum allocated value;
 <span class="notranslate"> Fault LVE </span> - the limits that have reached the maximum value.

![](/images/man_05_zoom92.png)



An administrator can set email notifications for users and resellers in cases of limits faults. Choose <span class="notranslate"> _Options_ </span> tab to manage <span class="notranslate"> LVE Faults </span> email notifications.

In _LVE Faults_ email notifications section check proper checkboxes to set the required type of notification:

Notify me on users faults - to receive notifications on users LVE faults;
Notify customers - to allow hosts users receiving notifications on their LVE faults;
Notify me when I hit my limits - to receive notifications on LVE faults.

In _ _ <span class="notranslate"> Faults to include </span> section check proper checkboxes to include proper limits to the notifications:

 <span class="notranslate"> SPEED </span> - include speed limit fault to the notification;
 <span class="notranslate"> IO </span> - include <span class="notranslate"> I/O </span> limit fault info to the notification;
 <span class="notranslate"> IOPS </span> - include <span class="notranslate"> IOPS </span> limit fault info to the notification;
 <span class="notranslate"> Memory </span> - include <span class="notranslate"> Memory </span> limit fault info to the notification;
 <span class="notranslate"> Concurrent connections </span> - include <span class="notranslate"> concurrent connections </span> limit fault info to the notification.

In <span class="notranslate"> _Minimum number of Faults to notify_ </span> section enter proper number of faults required for the notification to be sent for:

Me - for an administrator;
User - for a User;

Set the frequency of email notifications sending in <span class="notranslate"> Notify me every.. hours/days </span> section.

Click <span class="notranslate"> _Save_ </span> to apply changes.

![](/images/lveman_08.jpg)
![](/images/lveman_09.jpg)



<span class="notranslate"> Packages </span> tab allows setting the limits for as many users as you need by editing packages of proper limits. Each account belonging to a proper package adheres to those limits.

Choose <span class="notranslate"> _Packages_ </span> tab to view and modify:

limits for hosts user’s packages (Created by Admin);
limits for reseller’s packages (Created by Admin).

![](/images/man_06_zoom82.png)

To modify package limits click on a pencil icon in <span class="notranslate"> Action </span> column in a proper package row. The following limits for this package are available for setting:

 <span class="notranslate"> SPEED </span> in percent (%);
 <span class="notranslate"> Virtual memory (VMEM) </span> (can be set as unlimited by setting 0);
 <span class="notranslate"> Physical memory (PMEM) </span> (can be set as unlimited by setting 0);
 <span class="notranslate"> Concurrent connections (EP) </span> ;
 <span class="notranslate"> Number of processes (NPROC) </span> (can be set as unlimited by setting 0);
 <span class="notranslate"> IOPS </span> limits;
 <span class="notranslate"> I/O limits (IO) </span> (can be set as unlimited by setting 0);
 <span class="notranslate"> INODES soft </span> ;
 <span class="notranslate"> INODES hard </span> .

When limits are set click <span class="notranslate"> _Save_ </span> to apply changes or <span class="notranslate"> _Cancel_ </span> to close the window.



<span class="notranslate"> Selector </span> tab allows controlling <span class="notranslate"> PHP Selector </span> settings.

In <span class="notranslate"> _Selector is_ </span> section choose <span class="notranslate"> _Enabled_ </span> or <span class="notranslate"> _Disabled_ </span> from dropdown list to enable or disable <span class="notranslate"> PHP Selector </span> .

In <span class="notranslate"> _Default PHP version_ </span> choose a proper PHP version or <span class="notranslate"> Native </span> from dropdown list to apply.

In <span class="notranslate"> _Supported versions_ </span> choose required PHP versions to support.

Choose default modules from the list for a proper PHP version or for native.

![](/images/lveman_092.jpg)
![](/images/lveman_093.jpg)



### LVE Manager Options


When you need to change <span class="notranslate"> LVE Manager </span> options in cPanel config file on big amount of servers, you don't have to edit file manually, therefore there is no need to login into cPanel on each server. Just go to WHM, choose CloudLinux and click on <span class="notranslate"> Options </span> - and you will be able to change settings from here.

<span class="notranslate"> root@toaster [~]# grep lve /var/cpanel/cpanel.config </span>

| | |
|-|-|
|`lve_hideextensions` | Hides (when =1) range of php extensions for user in <span class="notranslate"> Select PHP </span> version.|
|`lve_hideuserstat  ` | Hides (when =1) LVE statistics in <span class="notranslate"> cPanel Stats Bar (UI) </span> .|
|`lve_showinodeusage` | Displays (when =1) used inodes in cPanel (UI).|
|`lve_hide_selector    ` | Turns off <span class="notranslate"> UI PHP Selector </span> (Select <span class="notranslate"> PHP Version </span> option).|

### Server Processes Snapshots


In case when a CloudLinux user hits LVE limits, appropriate faults are generated and [lvestats](/deprecated/#lve-stats-0-x) package generates Server processes snapshot. Snapshot is a list of running applications and a list of running MySQL queries right after the faults happened.

Snapshots allow users to investigate the reason of account hitting its limits. Several snapshots are generated for each incident. An incident is a state when faults are generated in a close time period. The time period is configurable. By default, if faults are generated in 300 seconds time period, we consider them as a single incident.

The snapshot configuration options are available in

<span class="notranslate"> _/etc/sysconfig/lvestats.config/SnapshotSaver.cfg_ </span>

<span class="notranslate"> _period_between_incidents_  = 300, by default, time in seconds  </span>
<span class="notranslate"> _snapshots_per_minute_  = 2, by default, maximum number of snapshots per minute </span>
<span class="notranslate"> _max_snapshots_per_incident_  = 10, by default, maximum number of snapshots for an incident </span>

To access <span class="notranslate"> Snapshots </span> perform the following steps:

1. Go to cPanel interface, and select <span class="notranslate"> “CPU and Concurrent Connection Usage” </span> in <span class="notranslate"> **paper_latern** </span> theme:

![](/images/snapshots.jpg)

2. Click the <span class="notranslate"> Snapshots </span> in ** ** <span class="notranslate"> paper_latern </span> theme:

![](/images/snapshots2.jpg)

3. Select a date:

![](/images/snapshots3.jpg)

4. Select an appropriate <span class="notranslate"> Snapshot </span> in the combobox:

![](/images/snapshots4.jpg)
![](/images/snapshots5.jpg)





The list of MySQL queries is an output of a query:
<span class="notranslate"> </span>
_SELECT command, time, info FROM information_schema.processlist _
_WHERE user = '%username';_

### LVE Plugins Branding


_[Requires _ <span class="notranslate"> LVE Manager </span> _ 2.0-33+]_

It is possible to apply branding to the LVE Plugins in cPanel end users’ interface. To brand the cPanel end users'  interface please do the following:

Create a script that will patch <span class="notranslate"> LVE Manager </span> files (with branding data, for example, image and logo) after every update of <span class="notranslate"> lvemanager rpm </span> package;

Locate this script in <span class="notranslate"> _/usr/share/l.v.e-manager/branding_script_ </span> ;

Make this script executable by running the command:
<span class="notranslate"> </span>
```
chmod a+x /usr/share/l.v.e-manager/branding_script
```

When done, the branding script will be executed while every update of lvemanager package and all branding changes will be applied in the end user’s interface.




## User Message for PHP version


Since version 1.0-4 <span class="notranslate">  LVE Manager </span> acquired a feature of adding user messages to PHP versions*. To add a message, you should create a file in <span class="notranslate"> _/opt/alt/phpXX/name_modifier_ </span> with a message that you want to be shown to a user.

For example, if you need to add the following message <span class="notranslate">"Don't use this php version"</span> to PHP version 4.4, you should create the following file:
<span class="notranslate"> </span>
_/opt/alt/php44/name_modifier:_
_echo 'Don`t use this php version' > /opt/alt/php44/name_modifier_

As a result <span class="notranslate"> LVE Manager </span> will automatically pick up this message and will show it in web-interface to administrator ( _Figure 1.1 for cPanel, Figure 1.2 for DirectAdmin_ ) and to user ( _Figure 2.1 for cPanel, Figure 2.2 for DirectAdmin_ ). You can add messages to other PHP versions this way as well.

![](/images/screen1.1lvemanfeature_zoom74.png)
_Figure 1.1_


![](/images/screen1.2lvemanfeature_zoom76.png)
_Figure 1.2_

![](/images/screen2.1lvemanfeature_zoom72.png)
_Figure 2.1_


![](/images/screen2.2lvemanfeature_zoom75.png)
_Figure 2.2_
_*For cPanel and DirectAdmin only._

