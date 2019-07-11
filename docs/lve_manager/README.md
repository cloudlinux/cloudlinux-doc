<div class="notranslate">

# LVE Manager

</div>

<span class="notranslate">LVE Manager</span> is a plugin for most popular control panels including cPanel, Plesk, DirectAdmin and ISPmanager (InterWorx coming soon). It allows you to control and monitor limits, and set limits on per package bases.

<span class="notranslate">LVE Manager</span> is installed by default on most servers. If it is missing you can always install it by running:

<div class="notranslate">

```
$ yum install lvemanager
```
</div>

<div class="notranslate">

## Dashboard

</div>

:::tip Note
Available starting from LVE Manager Beta version 4.0-26.8
:::

CloudLinux dashboard provides a quick overview of statistics and all administrative information for server administrators.

Go to <span class="notranslate">LVE Manager | Dashboard</span>.

![](/images/dashboard_zoom70.png)

The <span class="notranslate">Cloudlinux Dashboard</span> provides the following information:

* <span class="notranslate">End Users hitting limits</span> — number of users reaching their limit in any kind of resource. Data is within the last 24 hours.
* <span class="notranslate">Resellers hitting limits</span> —  number of enrolled Resellers that are reaching their limit in any kind of resource. Data is within the last 24 hours.
* <span class="notranslate">[Node.js Selector](/node_js_selector/)</span> block displays the following data:
  * <span class="notranslate">Node.js Selector</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span>) —  displays a current status of the <span class="notranslate">Node.js Selector</span>.
  
    * To manage <span class="notranslate">Node.js Selector</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">LVE Manager | Options | Node.js Selector</span>.

    * Click _Install_ to install <span class="notranslate">Node.js Selector</span>, you will be redirected to <span class="notranslate">LVE Manager | Options | Node.js.Selector</span>.
  * Default version — the current default version of Node.js set in your system. Click <span class="notranslate">_Manage_</span> to change the default version account wide.
  * <span class="notranslate">Applications</span> —  number of installed/all applications for the account.
* <span class="notranslate">[Ruby Selector](/ruby_selector/)</span> block displays the following data:
  * <span class="notranslate">Ruby Selector</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span>) — displays a current status of the Ruby Selector.

    * To manage <span class="notranslate">Ruby Selector</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">LVE Manager | Options | Ruby Selector</span>.

    * Click <span class="notranslate">_Install_</span> to install <span class="notranslate">Ruby Selector</span>, you will be redirected to <span class="notranslate">LVE Manager | Options | Ruby Selector</span>.

  * <span class="notranslate">Applications</span> — number of installed/all applications for the account.
* <span class="notranslate">[PHP Selector](/php_selector/)</span> block displays the following data:
  * <span class="notranslate">Default version</span> — the default version of PHP binaries.
  Click <span class="notranslate">_Manage_</span> to change the default version, enable or disable <span class="notranslate">PHP Selector</span>, change the list of supported versions, and choose default modules. You will be redirected to <span class="notranslate">LVE Manager | PHP Selector</span>.
* <span class="notranslate">[Python Selector](/python_selector/)</span> block displays the following data:
  * <span class="notranslate">Python Selector</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span> — displays a current status of the Python Selector.
  
    * To manage <span class="notranslate">Python Selector</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">LVE Manager | Options | Python Selector</span>.

    * Click <span class="notranslate">_Install_</span> to install <span class="notranslate">Python Selector</span>, you will be redirected to <span class="notranslate">LVE Manager | Options | Python Selector</span>.
  * <span class="notranslate">Applications</span> —  number of installed/all applications for the account.
* [Reseller Limits](/reseller_limits/) block displays the following data:
  * <span class="notranslate">Reseller Limits</span> status (<span class="notranslate">Enabled/Disabled</span>). To manage <span class="notranslate">Reseller Limits</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">LVE Manager | Users</span> tab.
  * Reseller’s accounts with Reseller Limits/all —  the number of Reseller accounts with Reseller Limits enabled versus the total number of Reseller accounts.
  * Reseller’s End Users with enabled Reseller Limits/all — the number of end users with Reseller Limits enabled versus all End Users that belong to all resellers.
* <span class="notranslate">[MySQL Governor](/mysql_governor/)</span> block displays the following data:
  * <span class="notranslate">MySQL Governor</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span>). To manage <span class="notranslate">MySQL Governor</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">LVE Manager | Options | MySQL Governor Mode of Operation</span>. Click <span class="notranslate">_Install_</span> to install <span class="notranslate">MySQL Governor</span>.
  * <span class="notranslate">[Mode](/mysql_governor/#modes-of-operation)</span> — displays the <span class="notranslate">MySQL Governor</span> mode of operation. Click <span class="notranslate">_Manage_</span> to change the mode.
    * <span class="notranslate">Single</span> — single LVE is used for all customers that go over their DB limits (deprecated).
    * <span class="notranslate">Off</span> — monitor Only, no DB query limits are applied.
    * <span class="notranslate">All</span> — all queries are run inside user's LVE.
    * <span class="notranslate">Abusers</span> — only queries that go over DB limits are executed inside that user's LVE (this is the default mode).
  * <span class="notranslate">Database version</span> —  displays a current version of <span class="notranslate">MySQL/MariaDB/Percona</span> server installed in the system.
* [CageFS](/cagefs/) block displays the following data:
  * <span class="notranslate">CageFS</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span>). To manage CageFS, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">LVE Manager | Options | CageFS</span>. Click <span class="notranslate">_Install_</span> to install CageFS.
  * <span class="notranslate">Mode</span> displays the current CageFS mode of operation.
  * <span class="notranslate">End users</span> — displays the number of users with CageFS enabled/all.
* [ModLSAPI](/apache_mod_lsapi/) block displays the following data:
  * Mod_lsapi status (<span class="notranslate">Enabled/Disabled/Not installed</span>). Click <span class="notranslate">_Install_</span> to install Mod_lsapi.
  * Module version displays the running version of Mod_lsapi.
  * [Criu_status](/apache_mod_lsapi/#criu-support) displays the status of lsapi_criu:
    * <span class="notranslate">Running</span> —  means that lsapi_criu is working.
    * <span class="notranslate">Stopped</span> —  means that lsapi_criu is not working.
  * <span class="notranslate">Total Domains</span> displays the total number of domains with Mod_lsapi configured as PHP handler.
  * <span class="notranslate">Criu_version</span> displays the running version of lsapi_criu.
  * LSAPI with connection pool.

:::tip Note
* If statistics for server is absent for any reasons, you can update it by pressing the <span class="notranslate">_Refresh_</span> button. This process can last from 10 seconds to one hour depending on your server's performance, number of users and applications.
* If statistics collection is turned off it is not displayed. If you wish to get daily statistics for your server, please turn it on by adding <span class="notranslate">`cl_statistics_enabled=1`</span> parameter to the <span class="notranslate">`/etc/sysconfig/cloudlinux`</span> file.
* Data for the Dashboard is collected once per day. If you want to update data manually, press <span class="notranslate">_Refresh_</span>. This process can last from 10 seconds to one hour depending on your server's performance, number of users and applications.
:::

## CloudLinux Installation Wizard

### Overview

<span class="notranslate">CloudLinux Installation Wizard </span> allows you to easily install and set up CloudLinux OS components on your server with cPanel, Plesk or DirectAdmin.

### Set up

As you have CloudLinux OS installed, navigate to <span class="notranslate"> CloudLinux LVE Manager </span> in your control panel. CloudLinux Installation Wizard starts automatically if <span class="notranslate"> `lvemanager` </span> package is installed for the first time (not updated).

![](/images/installationwizardmain_zoom70.png)

To start setting up your CloudLinux OS, click <span class="notranslate">_Start Wizard_</span>, otherwise click <span class="notranslate">_Skip Wizard_</span>, and you will be redirected to the <span class="notranslate"> LVE Manager Dashboard</span>.

:::tip Note
Installation statuses of all components are duplicated inside their corresponding boxes on the <span class="notranslate">Dashboard</span>. All <span class="notranslate">Wizard</span> actions are available there as well. <span class="notranslate">Dashboard</span> will be automatically updated as soon as the installation process finishes.
:::

![](/images/wizard-dashboard_zoom60.png)

The next step is selecting required components to be installed.
![](/images/installationwizardstep1_zoom70.png)

Click <span class="notranslate"> _Finish_and Install_ </span> to complete installation or click <span class="notranslate">_Skip Wizard_</span> to go back to the <span class="notranslate"> Dashboard</span>.

You can find a complete description of the CloudLinux components below.

### CloudLinux Components

<div class="notranslate">

#### **CageFS**

</div>

A virtualized per-user file system encapsulates each customer into a ‘cage’ preventing them from seeing each other files and viewing sensitive information (e.g., system files)

![](/images/wizardcagefs_zoom90.png)

Toggle the sliders to enable CageFS by default for new and/or existing users. 

:::tip Note
CageFS is a requirement for PHP Selector operation.
:::

<div class="notranslate">

#### **LSAPI**

</div>

It is the fastest and most reliable way to serve PHP pages for Apache web-servers, a drop-in replacement for SuPHP, FCGID, RUID2, and ITK.

![](/images/wizard_lsapi_zoom90.png)

LSAPI requires CRIU to operate and we also recommend you to use mod_suexec. You can find details in our [documentation](/apache_mod_lsapi/).

<div class="notranslate">

### **MySQL Governor**

</div>

Monitors MySQL usage to throttle abusers, preventing server overload and improving overall performance.

![](/images/wizard_mysqlgovernor_zoom90.png)

:::tip Note
<span class="notranslate">MySQL Governor</span> can be automatically installed only with cPanel/WHM and DirectAdmin - use CLI instructions available [here](/mysql_governor/#installation) in all other cases.
:::

We recommend you to create a full database backup before the <span class="notranslate"> MySQL Governor </span> installation.

<div class="notranslate">

#### **Node.js Selector**

</div>

Allows end users to create Node.js applications and select the specific version of Node.js and other parameters.

![](/images/wizard_node.jsselector_zoom90.png)

Here you can choose versions to be installed and the version to be used as default.

<div class="notranslate">

#### **Ruby Selector**

</div>

Allows end users to select the specific version of <span class="notranslate"> Ruby</span> they need. 
![](/images/wizard_ruby_selector_zoom90.png)

Here you can choose <span class="notranslate">Ruby</span> versions to be installed.

<div class="notranslate">

#### **Python Selector**

</div>

Allows end users to select the default version of <span class="notranslate">Python</span> and set the required versions for installation.

![](/images/wizard_python_selector_zoom90.png) 


Here you can choose <span class="notranslate">Python</span> versions to be installed.

#### **PHP Selector**

Allows end users to select the specific version of PHP they need, with over 120 PHP extensions to choose from.

![](/images/wizard_php_selector_zoom90.png)

Go to <span class="notranslate">LVE Manager</span> settings to set up <span class="notranslate"> PHP Selector</span> options and parameters. Read more in the [PHP Selector documentation](/php_selector/#installation-and-update). 

:::tip Note
CageFS should be enabled for PHP Selector to operate.
:::

When the components to be installed are selected and configured, and installation is started, you will be redirected to the <span class="notranslate">LVE Manager | Dashboard</span>.

### Installation Process and Possible Errors

Installation status is displayed throughout the process in the <span class="notranslate">Dashboard</span>. Click <span class="notranslate">_Installing_</span> to show modules installation state.

![](/images/wizard_installation_status_zoom70.png)

All installed modules are displayed on the <span class="notranslate"> Dashboard</span>.
When installation is completed successfully, you will see the following status.

![](/images/wizardsuccess_zoom90.png)

If you decide to remove failed module or a module to be installed by clicking the (X) button, a confirmation dialog will appear.

After confirming the action, the module will disappear from the list.

![](/images/wizardinstallremove_zoom90.png)

If module installation fails, the Installing button changes to <span class="notranslate">_Warning_</span> and the module indicator will turn red.

![](/images/wizard_warning_zoom70.png)


* Click ![](/images/wizard_download_btn.png) to download the error log.
* Click ![](/images/wizard_try_again_btn.png) to try to install a module again.
* Click ![](/images/wizard_close_btn.png) to remove a specific module from the installation queue. The module will be displayed on the <span class="notranslate">Dashboard</span> but will not be installed.

If module auto-installation fails, you will see that the module indicator turns yellow.

![](/images/wizardautoinstallationfails_zoom80.png)

In this case, you can download a log for details and try to install the module again.

#### **Wizard Fatal Error**

In case of a fatal error, you will see the following warning.

![](/images/wizardbroken_zoom70.png)


* Click ![](/images/wizard_download_btn.png) to download the error log.
* Click ![](/images/wizard_try_again_btn.png) to try to install module(s) again.
* Click ![](/images/wizard_close_btn.png) to cancel installation. The canceled modules will be removed from the installation process.

You can contact our support team for further assistance anytime by [submitting a ticket in our helpdesk system](https://cloudlinux.zendesk.com/hc/requests/new).

## cPanel LVE Manager

<span class="notranslate">cPanel LVE Manager</span> Administrator interface allows monitoring and managing limits for hosts end users, managing packages and monitoring statistics.

Administrator credentials allow controlling limits for host users.

![](/images/lvemanagermainmenu_zoom80.png)

Log in as administrator to get access to the following functionality:

* <span class="notranslate"> Current usage </span> tab - allows monitoring users resource usage at the moment;
* <span class="notranslate"> Users </span> tab with the list of all users allows viewing and managing all the users limits;
* <span class="notranslate"> Statistics </span> tab displays the statistics of resource usage for proper timeframe or proper users;
* <span class="notranslate"> Options </span> tab - allows setting LVE Faults email notifications for users;
* <span class="notranslate"> Packages </span> allows managing packages limits;
* <span class="notranslate">PHP Selector</span> tab.
* ImunifyAV allows to get access to a brand new malware scanner installed with LVE Manager. Click ImunifyAV on the main menu to go to ImunifyAV interface and use the next-generation, automated security solution that automatically scans the file system for malware injection and quarantines infected files.

For more details, please go to the [ImunifyAV documentation](https://docs.imunifyav.com/).

:::tip Note
Available starting from LVE Manager Beta version 4.0-26.8.
:::

<div class="notranslate">

### Current usage

</div>

Choose <span class="notranslate">_Current usage_</span> tab to monitor users resource usage at the moment displayed in the table.

<span class="notranslate">Current usage</span> table provides the information on the usage of <span class="notranslate"> Speed, memory, IO, IOPS, Number of Processes</span>, and <span class="notranslate"> Entry Processes</span>.

<span class="notranslate"> Resource usage </span> values are being refreshed every 10 seconds which is set in <span class="notranslate">_Auto-refresh_</span> field. You can refresh the table manually by clicking <span class="notranslate">_Refresh now_</span> or you can freeze the values by clicking pause button. Usage values will not change until the next manual refresh.

Tick <span class="notranslate">_Hide MySQL usage_</span> checkbox to hide the information on MySQL usage.

To expand the list of users click on the number above and in the dropdown choose the number of user to be displayed on the page.

![](/images/man_01_zoom73.png)

<div class="notranslate">

### Users

</div>

Choose <span class="notranslate"> Users</span> tab to view the list of all users of the system and manage their limits.

Click <span class="notranslate">_Filter by_</span> to apply filters. The following filters available in the dropdown:

* <span class="notranslate"> Username</span>
* <span class="notranslate"> Domain</span>
* <span class="notranslate"> LVE ID</span>

![](/images/man_02_zoom79.png)

Actions column – click on a pencil icon in <span class="notranslate"> Actions</span> column to edit a proper user limits.

Set proper LVE values:
* <span class="notranslate">SPEED</span>
* <span class="notranslate">PMEM</span>
* <span class="notranslate">VMEM</span>
* <span class="notranslate">EP</span>
* <span class="notranslate">IO</span>
* <span class="notranslate">IOPS</span>
* <span class="notranslate">NPROC</span>
* <span class="notranslate">INODES</span>

![](/images/man_03_zoom86.png)
![](/images/man_04_zoom86.png)

Click <span class="notranslate"> _Save_ </span> to apply changes or <span class="notranslate"> _Cancel_ </span> to close the window.

<div class="notranslate">

### Statistics

</div>

Choose <span class="notranslate">Statistics</span> tab to view hosts users resource usage statistics.

The following parameters are displayed in the statistics table:

* <span class="notranslate"> CPU </span> usage per user;
* <span class="notranslate"> PMEM </span> usage per user;
* <span class="notranslate"> VMEM </span> usage per user;
* <span class="notranslate"> IO </span> (in Kb/sec per user).

<span class="notranslate"> Statistics </span> table can be filtered by:

* <span class="notranslate"> Timeframe </span> - to view the statistics for a proper period;
* <span class="notranslate"> Limit ID </span> - to view a proper limit type usage only;
* <span class="notranslate"> Top LVEs </span> - to view top used limits only;
* <span class="notranslate"> LVE approaching limit </span> - to view the limits that are approaching maximum allocated value;
* <span class="notranslate"> Fault LVE </span> - the limits that have reached the maximum value.

![](/images/man_05_zoom92.png)

<div class="notranslate">

### Options

</div>

An administrator can set email notifications for users and resellers in cases of limits faults.

Choose <span class="notranslate">_Options_</span> tab to manage <span class="notranslate">LVE Faults</span> email notifications.

In <span class="notranslate">_LVE Faults_</span> email notifications section check proper checkboxes to set the required type of notification:

* <span class="notranslate">Notify me on users faults</span> - to receive notifications on users LVE faults;
* <span class="notranslate">Notify customers</span> - to allow hosts users receiving notifications on their LVE faults;
* <span class="notranslate">Notify me when I hit my limits</span> - to receive notifications on LVE faults.

In <span class="notranslate">_Faults to include_</span> section check proper checkboxes to include proper limits to the notifications:

* <span class="notranslate"> SPEED </span> - include speed limit fault to the notification;
* <span class="notranslate"> IO </span> - include <span class="notranslate"> I/O </span> limit fault info to the notification;
* <span class="notranslate"> IOPS </span> - include <span class="notranslate"> IOPS </span> limit fault info to the notification;
* <span class="notranslate"> Memory </span> - include <span class="notranslate"> Memory </span> limit fault info to the notification;
* <span class="notranslate"> Concurrent connections </span> - include <span class="notranslate"> concurrent connections </span> limit fault info to the notification.

In <span class="notranslate">_Minimum number of Faults to notify_</span> section enter proper number of faults required for the notification to be sent for:

* <span class="notranslate">Me</span> - for an administrator;
* <span class="notranslate">User</span> - for a User;

Set the frequency of email notifications sending in <span class="notranslate"> Notify me every.. hours/days</span> section.

Click <span class="notranslate">_Save_</span> to apply changes.

![](/images/lveman_08.jpg)
![](/images/lveman_09.jpg)

<div class="notranslate">

### Packages

</div>

<span class="notranslate"> Packages</span> tab allows setting the limits for as many users as you need by editing packages of proper limits. Each account belonging to a proper package adheres to those limits.

Choose <span class="notranslate">_Packages_</span> tab to view and modify:

* limits for hosts user’s packages (Created by Admin);
* limits for reseller’s packages (Created by Admin).

![](/images/man_06_zoom82.png)

To modify package limits click on a pencil icon in <span class="notranslate">Action</span> column in a proper package row. The following limits for this package are available for setting:

* <span class="notranslate"> SPEED</span> in percent (%);
* <span class="notranslate"> Virtual memory (VMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> Physical memory (PMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> Concurrent connections (EP)</span>;
* <span class="notranslate"> Number of processes (NPROC)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> IOPS</span> limits;
* <span class="notranslate"> I/O limits (IO)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> INODES soft</span>;
* <span class="notranslate"> INODES hard</span>.

When limits are set click <span class="notranslate">_Save_</span> to apply changes or <span class="notranslate">_Cancel_</span> to close the window.

<div class="notranslate">

### Selector

</div>

<span class="notranslate"> Selector</span> tab allows controlling <span class="notranslate">PHP Selector</span> settings.

In <span class="notranslate">_Selector is_</span> section choose <span class="notranslate">`Enabled`</span> or <span class="notranslate">`Disabled`</span> from the dropdown list to enable or disable <span class="notranslate">PHP Selector</span>.

In <span class="notranslate">_Default PHP version_</span> choose a proper PHP version or <span class="notranslate"> Native</span> from dropdown list to apply.

In <span class="notranslate">_Supported versions_</span> choose required PHP versions to support.

Choose default modules from the list for a proper PHP version or for native.

![](/images/lveman_092.jpg)
![](/images/lveman_093.jpg)

### LVE Manager Options

When you need to change <span class="notranslate">LVE Manager</span> options in cPanel config file on big amount of servers, you don't have to edit file manually, therefore there is no need to login into cPanel on each server. Just go to WHM, choose CloudLinux and click <span class="notranslate">Options</span> - and you will be able to change settings from here.

<div class="notranslate">

```
root@toaster [~]# grep lve /var/cpanel/cpanel.config
```
</div>

| | |
|-|-|
|<span class="notranslate">`lve_hideextensions`</span>| Hides (when =1) range of php extensions for user in <span class="notranslate"> Select PHP </span> version.|
|<span class="notranslate">`lve_hideuserstat  `</span>| Hides (when =1) LVE statistics in <span class="notranslate"> cPanel Stats Bar (UI) </span> .|
|<span class="notranslate">`lve_showinodeusage`</span>| Displays (when =1) used inodes in cPanel (UI).|
|<span class="notranslate">`lve_hide_selector`</span>| Turns off <span class="notranslate">UI PHP Selector</span> (Select <span class="notranslate">PHP Version</span> option).|

### Server Processes Snapshots


In case when a CloudLinux user hits LVE limits, appropriate faults are generated and [lvestats](/deprecated/#lve-stats-0-x) package generates Server processes snapshot. Snapshot is a list of running applications and a list of running MySQL queries right after the faults happened.

Snapshots allow users to investigate the reason of account hitting its limits. Several snapshots are generated for each incident. An incident is a state when faults are generated in a close time period. The time period is configurable. By default, if faults are generated in 300 seconds time period, we consider them as a single incident.

The snapshot configuration options are available in

<div class="notranslate">

```
/etc/sysconfig/lvestats.config/SnapshotSaver.cfg
```
</div>

* <span class="notranslate">`period_between_incidents = 300`</span> by default, time in seconds
* <span class="notranslate">`snapshots_per_minute = 2`</span> by default, maximum number of snapshots per minute
* <span class="notranslate">`max_snapshots_per_incident = 10`</span> by default, maximum number of snapshots for an incident

To access <span class="notranslate">**Snapshots**</span> on Plesk you can use [lve-read-snapshot](/lve-stats_2/#lve-read-snapshot) utility.

To access <span class="notranslate">**Snapshots**</span> on cPanel perform the following steps:

1. Go to cPanel | <span class="notranslate">CPU and Concurrent Connection Usage</span> in <span class="notranslate"> **paper_latern**</span> theme:

![](/images/snapshots.jpg)

2. Click the <span class="notranslate">**Snapshots**</span> in <span class="notranslate">**paper_latern**</span> theme:

![](/images/snapshots2.jpg)

3. Select a date:

![](/images/snapshots3.jpg)

4. Select an appropriate <span class="notranslate">**Snapshot**</span> in the combobox:

![](/images/snapshots4.jpg)
![](/images/snapshots5.jpg)


:::tip Note
The list of processes in a snapshot is close but not similar to the real processes list when faults were generated. It happens because of delay when the faults are happened and the snapshot is taken by the system.
:::


The list of MySQL queries is an output of a query:

<div class="notranslate">

```
SELECT command, time, info FROM information_schema.processlist

WHERE user = '%username';
```
</div>

### LVE Plugins Branding

:::tip Note
Requires <span class="notranslate">LVE Manager</span> 2.0-33+
:::

It is possible to apply branding to the LVE Plugins in cPanel end users’ interface. To brand the cPanel end users'  interface please do the following:

* Create a script that will patch <span class="notranslate">LVE Manager</span> files (with branding data, for example, image and logo) after every update of <span class="notranslate">`lvemanager rpm`</span> package;

* Locate this script in <span class="notranslate">`/usr/share/l.v.e-manager/branding_script`</span>;

* Make this script executable by running the command:

<div class="notranslate">

```
chmod a+x /usr/share/l.v.e-manager/branding_script
```
</div>

When done, the branding script will be executed while every update of <span class="notranslate">lvemanager</span> package and all branding changes will be applied in the end user’s interface.

:::tip Note
Modifying the <span class="notranslate">LVE Manager WHM</span> plugin (<span class="notranslate">`/usr/local/cpanel/whostmgr/docroot/cgi/CloudLinux.cgi`</span>) via <span class="notranslate">`branding_script`</span> is not allowed.
:::


## User Message for PHP version

Since version 1.0-4 <span class="notranslate">LVE Manager</span> acquired a feature of adding user messages to PHP versions*. To add a message, you should create a file in <span class="notranslate">`/opt/alt/phpXX/name_modifier`</span> with a message that you want to be shown to a user.

For example, if you need to add the following message <span class="notranslate">`Don't use this PHP version`</span> to PHP version 4.4, you should create the following file:

<div class="notranslate">

```
/opt/alt/php44/name_modifier:

echo 'Don`t use this php version' > /opt/alt/php44/name_modifier
```
</div>

As a result, <span class="notranslate">LVE Manager</span> will automatically pick up this message and will show it in web-interface to administrator (see Figure 1.1 for cPanel, Figure 1.2 for DirectAdmin) and to user (see Figure 2.1 for cPanel, Figure 2.2 for DirectAdmin). You can add messages to other PHP versions this way as well.

![](/images/screen1.1lvemanfeature_zoom74.png)

_Figure 1.1_


![](/images/screen1.2lvemanfeature_zoom76.png)

_Figure 1.2_

![](/images/screen2.1lvemanfeature_zoom72.png)

_Figure 2.1_


![](/images/screen2.2lvemanfeature_zoom75.png)

_Figure 2.2_

:::tip Note
*For cPanel and DirectAdmin only.
:::

