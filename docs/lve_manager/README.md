# CloudLinux Manager UI

* [Installation wizard](/lve_manager/#installation-wizard)
* [CloudLinux Manager](/lve_manager/#cloudlinux-manager)
* [Inodes limits](/limits/#inodes)
* [Control panel integration guide](/lve_manager/#control-panel-integration-guide)

<span class="notranslate">CloudLinux Manager</span> is a plugin for most popular control panels including cPanel, Plesk, DirectAdmin and ISPmanager (InterWorx coming soon). It allows you to control and monitor limits, and set limits on per package bases.

<span class="notranslate">CloudLinux Manager</span> is installed by default on most servers. If it is missing you can always install it by running:

<div class="notranslate">

```
$ yum install lvemanager
```
</div>

## Installation wizard

<div class="notranslate">

* [Overview](/lve_manager/#overview)
* [Set up](/lve_manager/#set-up)
* [CloudLinux OS components](/lve_manager/#cloudlinux-os-components)
  * [CageFS](/lve_manager/#cagefs)
  * [LSAPI](/lve_manager/#lsapi)
  * [MySQL Governor](/lve_manager/#mysql-governor)
  * [Node.js Selector](/lve_manager/#node-js-selector)
  * [Ruby Selector](/lve_manager/#ruby-selector)
  * [Python Selector](/lve_manager/#python-selector)
  * [PHP Selector](/lve_manager/#php-selector)
* [Installation process and possible errors](/lve_manager/#installation-process-and-possible-errors)
  * [Wizard fatal error](/lve_manager/#wizard-fatal-error)

#### Overview

<span class="notranslate">CloudLinux OS Shared Installation Wizard </span> allows you to easily install and set up CloudLinux OS components on your server with cPanel, Plesk or DirectAdmin.

#### Set up

As you have CloudLinux OS Shared installed, navigate to <span class="notranslate"> CloudLinux OS Shared CloudLinux Manager </span> in your control panel. CloudLinux OS Shared Installation Wizard starts automatically if `lvemanager` package is installed for the first time (not updated).

![](/images/installationwizardmain_zoom70.png)

To start setting up your CloudLinux OS Shared, click <span class="notranslate">_Start Wizard_</span>, otherwise click <span class="notranslate">_Skip Wizard_</span>, and you will be redirected to the <span class="notranslate"> CloudLinux Manager Dashboard</span>.

:::tip Note
Installation statuses of all components are duplicated inside their corresponding boxes on the <span class="notranslate">Dashboard</span>. All <span class="notranslate">Wizard</span> actions are available there as well. <span class="notranslate">Dashboard</span> will be automatically updated as soon as the installation process finishes.
:::

![](/images/wizard-dashboard_zoom60.png)

The next step is selecting required components to be installed.
![](/images/installationwizardstep1_zoom70.png)

Click <span class="notranslate">_Finish and Install_</span> to complete installation or click <span class="notranslate">_Skip Wizard_</span> to go back to the <span class="notranslate"> Dashboard</span>.

You can find a complete description of the CloudLinux OS components below.

#### CloudLinux OS components
</div>
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

LSAPI requires CRIU to operate and we also recommend you to use mod_suexec. You can find details in our [documentation](/cloudlinux_os_components/#apache-mod-lsapi-pro).

<div class="notranslate">

#### **MySQL Governor**

</div>

Monitors MySQL usage to throttle abusers, preventing server overload and improving overall performance.

![](/images/wizard_mysqlgovernor_zoom90.png)

:::tip Note
<span class="notranslate">MySQL Governor</span> can be automatically installed only with cPanel/WHM and DirectAdmin - use CLI instructions available [here](/command-line_tools/#mysql-governor) in all other cases.
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

Go to <span class="notranslate">CloudLinux Manager</span> settings to set up <span class="notranslate"> PHP Selector</span> options and parameters. Read more in the [PHP Selector documentation](/cloudlinux_os_components/#installation-and-update-4). 

:::tip Note
CageFS should be enabled for PHP Selector to operate.
:::

When the components to be installed are selected and configured, and installation is started, you will be redirected to the <span class="notranslate">CloudLinux Manager | Dashboard</span>.

#### Installation process and possible errors

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

#### **Wizard fatal error**

In case of a fatal error, you will see the following warning.

![](/images/wizardbroken_zoom70.png)


* Click ![](/images/wizard_download_btn.png) to download the error log.
* Click ![](/images/wizard_try_again_btn.png) to try to install module(s) again.
* Click ![](/images/wizard_close_btn.png) to cancel installation. The canceled modules will be removed from the installation process.

You can contact our support team for further assistance anytime by [submitting a ticket in our helpdesk system](https://cloudlinux.zendesk.com/hc/requests/new).


## CloudLinux Manager

* [Notifications color codes](/lve_manager/#notifications-color-codes)

<span class="notranslate">cPanel CloudLinux Manager</span> administrator interface allows monitoring and managing limits for hosts end users, managing packages and monitoring statistics.

Administrator credentials allow controlling limits for host users.

![](/images/lvemanagermainmenu_zoom80.png)

Log in as administrator to get access to the following functionality:

* <span class="notranslate">Dashboard</span> provides a quick overview of statistics and all administrative information for server administrators.
* <span class="notranslate">Current usage</span> tab - allows monitoring users resource usage at the moment;
* <span class="notranslate">Users</span> tab with the list of all users allows viewing and managing all the users limits;
* <span class="notranslate">Statistics</span> tab displays the statistics of resource usage for proper timeframe or proper users;
* <span class="notranslate">Options</span> tab - allows setting LVE Faults email notifications for users;
* <span class="notranslate">Packages</span> allows managing packages limits;
* <span class="notranslate">PHP Selector</span> tab.

For more details, please go to the [ImunifyAV documentation](https://docs.imunifyav.com/).

<div class="notranslate">

#### Notifications color codes <sup><Badge text="CloudLinux Manager 5.3.7-1+"/></sup>

In the CloudLinux Manager UI we use the following color codes for notifications:

* ![](/images/pic_warning.png) warning
* ![](/images/pic_error.png) error
* ![](/images/pic_info.png) information
* ![](/images/pic_success.png) success

The following actions are available in the action notifications (error, success)
 * follow a link
 * copy a command
 * copy a whole traceback

The following actions are available in the system notifications (information, warning):
* follow a link
* copy a command
* copy a whole message
* mark a notification as “Read”
* snooze a notification


</div>

### Dashboard

:::tip Note
Available starting from CloudLinux Manager 4.0-26.8
:::

CloudLinux OS Shared dashboard provides a quick overview of statistics and all administrative information for server administrators.

Go to <span class="notranslate">CloudLinux Manager | Dashboard</span>.

![](/images/dashboard_zoom70.png)

The <span class="notranslate">CloudLinux OS Shared Dashboard</span> provides the following information:

* <span class="notranslate">End Users hitting limits</span> — number of users reaching their limit in any kind of resource. Data is within the last 24 hours.
* <span class="notranslate">Resellers hitting limits</span> —  number of enrolled Resellers that are reaching their limit in any kind of resource. Data is within the last 24 hours.
* <span class="notranslate">[Node.js Selector](/lve_manager/#node-js-selector-2)</span> block displays the following data:
  * <span class="notranslate">Node.js Selector</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span>) —  displays a current status of the <span class="notranslate">Node.js Selector</span>.
  
    * To manage <span class="notranslate">Node.js Selector</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">LVE Manager | Options | Node.js Selector</span>.

    * Click _Install_ to install <span class="notranslate">Node.js Selector</span>, you will be redirected to <span class="notranslate">CloudLinux Manager | Options | Node.js.Selector</span>.
  * Default version — the current default version of Node.js set in your system. Click <span class="notranslate">_Manage_</span> to change the default version account wide.
  * <span class="notranslate">Applications</span> —  number of installed/all applications for the account.
* <span class="notranslate">Ruby Selector</span> block displays the following data:
  * <span class="notranslate">Ruby Selector</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span>) — displays a current status of the Ruby Selector.

    * To manage <span class="notranslate">Ruby Selector</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">CloudLinux Manager | Options | Ruby Selector</span>.

    * Click <span class="notranslate">_Install_</span> to install <span class="notranslate">Ruby Selector</span>, you will be redirected to <span class="notranslate">CloudLinux Manager | Options | Ruby Selector</span>.

  * <span class="notranslate">Applications</span> — number of installed/all applications for the account.
* <span class="notranslate">[PHP Selector](/lve_manager/#php-selector-2)</span> block displays the following data:
  * <span class="notranslate">Default version</span> — the default version of PHP binaries.
  Click <span class="notranslate">_Manage_</span> to change the default version, enable or disable <span class="notranslate">PHP Selector</span>, change the list of supported versions, and choose default modules. You will be redirected to <span class="notranslate">CloudLinux Manager | PHP Selector</span>.<br>
  PHP Selector (cPanel) has malfunctions warnings about [the most common issues](/lve_manager/#errors).
  ![](/images/PHPSelectorDashboardMalfunction.png)
* <span class="notranslate">[Python Selector](/lve_manager/#python-selector-2)</span> block displays the following data:
  * <span class="notranslate">Python Selector</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span> — displays a current status of the Python Selector.
  
    * To manage <span class="notranslate">Python Selector</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">CloudLinux Manager | Options | Python Selector</span>.

    * Click <span class="notranslate">_Install_</span> to install <span class="notranslate">Python Selector</span>, you will be redirected to <span class="notranslate">CloudLinux Manager | Options | Python Selector</span>.
  * <span class="notranslate">Applications</span> —  number of installed/all applications for the account.
* [Reseller Limits](/lve_manager/#reseller-interface) block displays the following data:
  * <span class="notranslate">Reseller Limits</span> status (<span class="notranslate">Enabled/Disabled</span>). To manage <span class="notranslate">Reseller Limits</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">CloudLinux Manager | Users</span> tab.
  * Reseller’s accounts with Reseller Limits/all —  the number of Reseller accounts with Reseller Limits enabled versus the total number of Reseller accounts.
  * Reseller’s End Users with enabled Reseller Limits/all — the number of end users with Reseller Limits enabled versus all End Users that belong to all resellers.
* <span class="notranslate">[MySQL Governor](/cloudlinux_os_components/#mysql-governor)</span> block displays the following data:
  * <span class="notranslate">MySQL Governor</span> status (<span class="notranslate">Enabled/Disabled/Not installed/Skipped</span>). To manage <span class="notranslate">MySQL Governor</span>, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">CloudLinux Manager | Options | MySQL Governor Mode of Operation</span>. Click <span class="notranslate">_Install_</span> to install <span class="notranslate">MySQL Governor</span>.
  * <span class="notranslate">[Mode](/cloudlinux_os_components/#modes-of-operation)</span> — displays the <span class="notranslate">MySQL Governor</span> mode of operation. Click <span class="notranslate">_Manage_</span> to change the mode.
    * <span class="notranslate">Single</span> — single LVE is used for all customers that go over their DB limits (deprecated).
    * <span class="notranslate">Off</span> — monitor Only, no DB query limits are applied.
    * <span class="notranslate">All</span> — all queries are run inside user's LVE.
    * <span class="notranslate">Abusers</span> — only queries that go over DB limits are executed inside that user's LVE (this is the default mode).
  * <span class="notranslate">Database version</span> —  displays a current version of <span class="notranslate">MySQL/MariaDB/Percona</span> server installed in the system.
* [CageFS](/cloudlinux_os_components/#cagefs) block displays the following data:
  * <span class="notranslate">CageFS</span> status (<span class="notranslate">Enabled/Disabled/Not installed</span>). To manage CageFS, click <span class="notranslate">_Manage_</span>. You will be redirected to <span class="notranslate">CloudLinux Manager | Options | CageFS</span>. Click <span class="notranslate">_Install_</span> to install CageFS.
  * <span class="notranslate">Mode</span> displays the current CageFS mode of operation.
  * <span class="notranslate">End users</span> — displays the number of users with CageFS enabled/all.
* [ModLSAPI](/cloudlinux_os_components/#apache-mod-lsapi-pro) block displays the following data:
  * Mod_lsapi status (<span class="notranslate">Enabled/Disabled/Not installed</span>). Click <span class="notranslate">_Install_</span> to install Mod_lsapi.
  * Module version displays the running version of Mod_lsapi.
  * [Criu_status](/cloudlinux_os_components/#criu-support) displays the status of lsapi_criu:
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


### Current usage

Choose <span class="notranslate">_Current usage_</span> tab to monitor users resource usage at the moment displayed in the table.

<span class="notranslate">Current usage</span> table provides the information on the usage of <span class="notranslate"> Speed, memory, IO, IOPS, Number of Processes</span>, and <span class="notranslate"> Entry Processes</span>.

<span class="notranslate"> Resource usage </span> values are being refreshed every 10 seconds which is set in <span class="notranslate">_Auto-refresh_</span> field. You can refresh the table manually by clicking <span class="notranslate">_Refresh now_</span> or you can freeze the values by clicking pause button. Usage values will not change until the next manual refresh.

Tick <span class="notranslate">_Hide MySQL usage_</span> checkbox to hide the information on MySQL usage.

To expand the list of users click on the number above and in the dropdown choose the number of user to be displayed on the page.

![](/images/man_01_zoom73.png)

The list of users can be filtered by <span class="notranslate">_Username_</span> and <span class="notranslate">_Domain_</span>.

Hoster can **view** all types of users:
* <span class="notranslate">End users</span>
* <span class="notranslate">Resellers</span>
* <span class="notranslate">Reseller’s end users</span>
* <span class="notranslate">Reseller’s end users (no Reseller limit)</span>.

But hoster can only **manage**:
* <span class="notranslate">End users</span>
* <span class="notranslate">Resellers</span>
* <span class="notranslate">Reseller’s end users (no Reseller limit)</span>

To manage Reseller’s end users hoster should login as a reseller.

### Users

* [Actions](/lve_manager/#actions)
* [Group actions for users with enabled CageFS](/lve_manager/#group-actions-for-users-with-enabled-cagefs)

Choose <span class="notranslate">_Users_</span> tab to view the list of all users in the system and manage their limits.

![](/images/userstabhoster_zoom70.png)

:::tip Note
A hoster can view the list of resellers’ end users and their limits, but can not manage resellers’ end users limits (if those are set by reseller).
:::

* Tick <span class="notranslate">_Show users with CageFS enabled_</span> to show users with CageFS file system enabled.
* Tick <span class="notranslate">_Show only ignored users_</span> to show users with ignored <span class="notranslate">MySQL Governor</span>.

The following filters are available:
* <span class="notranslate">Manage by</span>
  * <span class="notranslate">End users</span>
  * <span class="notranslate">Resellers</span>
  * <span class="notranslate">Reseller's end users</span>
  * <span class="notranslate">Reseller's end users (no Reseller limit)</span>
* <span class="notranslate">Show only</span>
  * <span class="notranslate">Ignored users</span> - show users with ignored MySQL Governor.
  * <span class="notranslate">Users with CageFS enabled</span>

Also, you can search user by his <span class="notranslate">Username</span>, <span class="notranslate">domain</span> or <span class="notranslate">LVE ID</span> in the <span class="notranslate">_Search_</span> field.

#### Actions

Click pencil icon in <span class="notranslate">_Actions_</span> column to edit limits for a particular user. The following actions are available:

* Enable/disable <span class="notranslate">CageFS</span>
* <span class="notranslate">**Reset**</span> - to reset limits to default values
* Apply <span class="notranslate">**Do not limit**</span> to set the limits to unlimited;
* Setting the limits values:
  * <span class="notranslate"> SPEED </span>
  * <span class="notranslate"> SPEED MYSQL </span>
  * <span class="notranslate"> VMEM </span>
  * <span class="notranslate"> PMEM </span> 
  * <span class="notranslate"> IO </span>
  * <span class="notranslate"> MySQL IO </span>
  * <span class="notranslate"> IOPS </span>
  * <span class="notranslate"> EP </span>
  * <span class="notranslate"> NPROC </span>
  * <span class="notranslate"> INODES </span> (hard and soft) (for <span class="notranslate">end users</span> and <span class="notranslate">resellers’ end users (with no Reseller Limits)</span>, if a hoster has enabled <span class="notranslate">_Initial quotas_</span> in cPanel settings).

Click <span class="notranslate">_Save_</span> to save changes or <span class="notranslate">_Cancel_</span> to close the pop-up.

![](/images/actionshoster.png)

Click on <span class="notranslate">_History_</span> symbol to view the history of a particular user resource usage. Choose time frame to view the history for a particular time period.

![](/images/historyhoster.jpg)

#### Group actions for users with enabled CageFS

:::warning Note
If CageFS is disabled, group actions are not available. See how you can enable CageFS:
* [Managing users](/cloudlinux_os_components/#managing-users)
* [CageFS CLI](/command-line_tools/#cagefs)
* via cPanel CageFS User Manager plugin.
:::

* **View users with enabled CageFS**
  
  To view users with enabled CageFS, click <span class="notranslate">_Show only >> Users with CageFS enabled_</span>
  ![](/images/CageFSEnabledUsers.png)

* **Disable CageFS for several users**

  To disable CageFS for several users, do the following.

  * Select a particular user or select all users
  * Click <span class="notranslate">_CageFS_ >> _Disable_</span>.

  ![](/images/GroupDisableCageFS.png)

### Statistics

Choose <span class="notranslate">_Statistics_</span> tab to view end users, resellers and resellers’ end users limits usage statistics.

The following parameters can be displayed in the statistics table:

* <span class="notranslate"> SPEED </span> usage per user;
* <span class="notranslate"> IO </span> usage per user;
* <span class="notranslate"> EP </span> usage per user;
* <span class="notranslate"> VMEM </span> usage per user;
* <span class="notranslate"> PMEM </span> usage per user;
* <span class="notranslate"> NPROC </span> usage per user;
* <span class="notranslate"> IOPS </span> usage per user;
* <span class="notranslate"> MySQL </span> usage per user.

Click <span class="notranslate">_Show_</span> and select columns from the drop-down to set which parameters should be displayed in the table.

Statistics table can be filtered by:

* <span class="notranslate"> Timeframe </span> - to view the statistics for a particular period;
* <span class="notranslate"> Limit </span> - to view a particular limit type usage only;
* <span class="notranslate"> Top LVEs </span> - to view top used limits only;
* <span class="notranslate"> LVE approaching limit </span> - to view the limits that are approaching maximum provided value;
* <span class="notranslate"> Fault LVE </span> - the limits that have reached the maximum value.

Click <span class="notranslate">_Manage_</span> to choose type of users to be displayed - <span class="notranslate">End users, Resellers, Resellers’ end users</span> or <span class="notranslate">Resellers’ end users (no Reseller limit)</span> by ticking checkbox in the drop-down.

![](/images/statisticstabhoster_zoom70.png)

Click chart symbol in the <span class="notranslate">_View_</span> column to view the detailed resource usage history for a particular account. Use timeframe drop-down to view the history for a particular period of time.

![](/images/history_charts_zoom70.png)

### Options

The following sections are available to set the required options:

* <span class="notranslate">[LVE Faults Email Notifications](/lve_manager/#lve-faults-email-notifications)</span> - allows to set the required type of notification
* <span class="notranslate">[Faults to include](/lve_manager/#faults-to-include)</span> - allows to include required limits to the notifications
* <span class="notranslate">[Minimum number of Faults to notify](/lve_manager/#minimum-number-of-faults-to-notify)</span> - allows to set a number of faults required for the notification to be sent for hoster, reseller, and user
* <span class="notranslate">[Inode limits](/lve_manager/#inode-limits)</span> - allows to manage inode limits
* <span class="notranslate">[User interface settings](/lve_manager/#user-interface-settings)</span> - allows to manage user interface settings
* <span class="notranslate">[MySQL Governor settings](/lve_manager/#mysql-governor-settings)</span> - allows to manage MySQL Governor settings (if MySQL Governor is installed)
* <span class="notranslate">[CageFS](/lve_manager/#cagefs-2)</span> - allows to manage CageFS settings
* <span class="notranslate">[Node.js](/lve_manager/#node-js)</span> - allows to enable/disable and manage Node.js Selector
* <span class="notranslate">[Python Selector](/lve_manager/#python-selector-section)</span> - allows to enable/disable and manage Python Selector

![](/images/options-general.png)

#### LVE Faults Email Notifications

Starting from CloudLinux Manager v.7.3.0-1 and LVE-Stats v.4.1.4-1 users can disable in their Resource Usage plugin email notifications about hitting LVE limits by themselves.

To allow users to do so, the administrator should enable the _Notify Customers_ and _Notify Reseller’s Customers_ options.

Unfortunately, it is not possible to disable LVE Faults Email Notifications for all users by default so that users can enable the feature themselves in their interface.

But it is possible to enable LVE Faults Email Notifications for all users by default, so that users can disable the feature themselves in their interface.

A hoster can set email notifications for panel administrator, reseller customer, and resellers’ customers in cases of limits faults. Choose <span class="notranslate">_Options_</span> tab to manage LVE Faults email notifications.

![](/images/lve-faults-email-notifications.png)

The following types of notification are available:

* **<span class="notranslate">Notify Hoster</span>** - receive notifications on users and its own LVE faults
* **<span class="notranslate">Notify Reseller</span>** - allows reseller receiving notifications on their user's LVE faults
* **<span class="notranslate">Notify Customers</span>** - allow host's users receiving notifications on their LVE faults
* **<span class="notranslate">Notify Reseller's customers</span>** - allows resller's users receiving notifications on their LVE faults


#### Faults to include

![](/images/faults-to-include.png)

Tick checkboxes to include required limits to the notifications:

* **<span class="notranslate">SPEED</span>** - include <span class="notranslate">_SPEED_</span> limit fault to the notification
* **<span class="notranslate">IO</span>** - include <span class="notranslate">_I/O_</span> limit fault info to the notification
* **<span class="notranslate">IOPS</span>** - include <span class="notranslate">_IOPS_</span> limit fault info to the notification
* **<span class="notranslate">Memory</span>** - include <span class="notranslate">_Memory_</span> limit fault info to the notification
* **<span class="notranslate">Concurrent connections</span>** - include <span class="notranslate">_concurrent connections_</span> limit fault info to the notification
* **<span class="notranslate">NPROC</span>** - include <span class="notranslate">_NPROC_</span> limit fault info to the notification.

#### Minimum number of Faults to notify

![](/images/minimum-number-of-faults-to-notify.png)

Set a number of faults required for the notification to be sent for:

* <span class="notranslate">Hoster and Reseller</span>
* <span class="notranslate">User</span>

Set the frequency of email notifications sending to: 

* <span class="notranslate">Hoster and Reseller</span>
* <span class="notranslate">User</span>

#### Inode limits

![](/images/inode-limits.png)

Allows to reset inode limits and show/hide end-user inode usage.

#### User interface settings

![](/images/user-interface-settings.png)

Allows to manage user interface settings:

* **<span class="notranslate">Hide LVE end user usage statistic</span>** - a user will not be able to see his usage statistic in his web interface
* **<span class="notranslate">Hide Ruby App in web-interface</span>** - a user will not be able to see Ruby Selector in his web interface

#### MySQL Governor settings

![](/images/mysql-governor-settings.png)

Allows to manage MySQL Governor settings.

<span class="notranslate">**MySQL Governor Mode of operation**</span>

* <span class="notranslate">**Off**</span> - monitor Only – not throttle customer's queries, only monitor MySQL usage.
* <span class="notranslate">**Single**</span> - single restricted LVE for all restricted customers – all queries for all restricted customers  well be sharing the same LVE.
* <span class="notranslate">**Abusers**</span> - use LVE for a user to restrict queries (default mode) –  if a user goes over the limits, all his queries will execute inside his LVE.
* <span class="notranslate">**All**</span> - always run queries inside user's LVE – limits are applied to both PHP & MySQL queries at the same time.

<span class="notranslate">**MySQL Governor restrict type mode**</span>

* <span class="notranslate">Period</span> – allows to restrict users for a specified time period
* <span class="notranslate">Limit</span> (default mode) – allows to restrict/automatically unrestrict users that hit limits/don't hit limits during 'unlimit=time'

<span class="notranslate">**Unlimit users automatically in**</span>

Allows to unlimit users automatically if they don't hit the limits during the specified number of seconds/minutes/hours/days.

<span class="notranslate">**Restricted time periods**</span>

User restriction time period for different levels of restriction and the timeout to apply a higher restriction level.

* <span class="notranslate">Level1</span>
* <span class="notranslate">Level2</span>
* <span class="notranslate">Level3</span>
* <span class="notranslate">Level4</span>
* <span class="notranslate">Timeout</span>

<span class="notranslate">**User maximum connections**</span>

The number of simultaneous connections of a restricted user (in the LVE mode).

<span class="notranslate">**Path to script**</span>

To be triggered when account is restricted.

<span class="notranslate">**MySQL Governor restrict-log file URL and format**</span>

* <span class="notranslate">URL</span> – where the log file is placed in the file system
* <span class="notranslate">Format</span> – log file format: <span class="notranslate">short</span>, <span class="notranslate">medium</span>, <span class="notranslate">long</span>, <span class="notranslate">very long</span>

<span class="notranslate">**MySQL Governor error-log file URL and logging level**</span>

* <span class="notranslate">URL</span> – where the log file is placed in the file system
* <span class="notranslate">Level</span> – logging level: error, debug

<span class="notranslate">**Kill slow SELECT queries**</span>

* <span class="notranslate">Kill slow queries</span> – stop running slow select queries
* <span class="notranslate">URL</span> – log file URL, where killed queries will be saved 
* <span class="notranslate">Timeout</span> – number of seconds while slow request can be finished, otherwise, it will be canceled

<span class="notranslate">**Gather data for detailed statistics**</span>

Tick if yes.

<span class="notranslate">**Log restricted user's queries**</span>

Tick if yes.


#### CageFS

![](/images/options-cagefs.png)

Allows to manage CageFS settings:

* **CageFS** - enable/disable CageFS
* **<span class="notranslate">CageFS Skeleton</span>** - click to update CageFS skeleton. See: [Updating CageFS skeleton](/control_panel_integration/#updating-cagefs-skeleton)
* **<span class="notranslate">New users will be disabled by default in CageFS</span>** - toggle to enable/disable new users in CageFS by default.

#### Node.js

![](/images/options-nodejs.png)

Allows to enable/disable and manage Node.js Selector.

See more:

* [Node.js Selector UI](/lve_manager/#node-js-selector-2)
* [Node.js Selector](/cloudlinux_os_components/#node-js-selector)

#### Python Selector section

![](/images/options-python-selector.png)

Allows to enable/disable and manage Python Selector.

See more:

* [Python Selector UI](/lve_manager/#python-selector-2)
* [Python Selector](/cloudlinux_os_components/#python-selector)

When you've done with settings, click <span class="notranslate">**Save Changes**</span> to apply changes.

### Packages

<span class="notranslate"> Packages</span> tab allows setting the limits for as many users as you need by editing packages of proper limits. Each account belonging to a proper package adheres to those limits.

:::tip Note
Limits from the package will not be applied if the package’s owner differs from the owner of the account you’re trying to apply limits to. Default limits will be applied instead.
:::

Choose <span class="notranslate">_Packages_</span> tab to view and modify:

* limits for user packages (created by hoster);
* limits for reseller packages (created by hoster);
* limits for resellers’ end users packages if reseller limits are not set for that reseller (hoster access allows identifying a particular reseller’s end user belonging to a particular reseller (created by reseller)).
  
![](/images/packageshostertab_zoom70.png)

To modify package limits click on a pencil symbol in <span class="notranslate">_Actions_</span> column in a particular package row. The following limits for this package are available for setting:

* <span class="notranslate"> SPEED</span> in percent (%);
* <span class="notranslate"> Virtual memory (VMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> Physical memory (PMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> I/O limits (IO)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> IOPS</span> limits;
* <span class="notranslate"> Concurrent connections (EP)</span>;
* <span class="notranslate"> Number of processes (NPROC)</span> (can be set as unlimited by setting 0);
* <span class="notranslate"> INODES (hard and soft)</span> (for end users and resellers’ end users (with no Reseller Limits), if a hoster has enabled <span class="notranslate">_Initial quotas_</span> in cPanel settings.)

When limits are set click <span class="notranslate">_Save_</span> to apply changes or <span class="notranslate">_Cancel_</span> to close the window.

### MySQL Governor

It's possible to manage MySQL Governor package limits for hosting packages and this will increase the convenience of administration.

The possibility to manage MySQL Governor package limits was added starting from:

```
governor-mysql - 1.2-80
lvemanager - 7.8.3-1
lve-utils - 6.4.6-1
alt-python27-cllib - 3.2.40-1
```

This can be done via CloudLinux Manager or via a command line.
**All principles** of working with MySQL Governor package limits are the same as for LVE limits:

- Initial limits for package can be settled from the the LVE extension (cPanel only) or they are inherited from the DEFAULT package (user).
- Non default (updated) package limits will not be  changed in case DEFAULT limits are changed.
- Users in the package inherit package’s limits  or have individual limits.
- Individual user limits can be reseted to the package’s limits.
- In case of reseller’s packages and users Mysql Governor limits can be managed only by admin.

#### How to manage MySQL Governor limits

To view the package limits open this page:

![](/images/mysql_packages_limits.png)

To manage the package limits edit the needed package:

![](/images/mysql_packages_limits_edit.png)

#### How to install

```
yum update governor-mysql lvemanager lve-utils alt-python27-cllib  --enablerepo=cloudlinux-updates-testing
```

### PHP Selector

* [Selector tab](/lve_manager/#selector-tab)
* [Selector tab additional features (cPanel)](/lve_manager/#selector-tab-additional-features)<sup> CloudLinux Manager 6.0.1-2</sup>
  * [PHP Selector troubleshooting (cPanel)](/lve_manager/#php-selector-troubleshooting)<sup> CloudLinux Manager 6.0.1-2</sup>
* [PHP Selector diagnostic tool and notifications](/lve_manager/#php-selector-diagnostic-tool-and-notifications)<sup> CloudLinux Manager 6.0.1-2</sup>

#### Selector tab

<span class="notranslate"> Selector</span> tab allows controlling <span class="notranslate">PHP Selector</span> settings.

* In <span class="notranslate">_Selector is_</span> section choose <span class="notranslate">`Enabled`</span> or <span class="notranslate">`Disabled`</span> from the dropdown list to enable or disable <span class="notranslate">PHP Selector</span>.
* In <span class="notranslate">_Default PHP version_</span> choose a proper PHP version or <span class="notranslate"> Native</span> from dropdown list to apply.
* In <span class="notranslate">_Hide php extensions for end-user_</span> you can enable/disable the ability for end-user to select PHP extensions in his web interface.
* In <span class="notranslate">_Supported versions_</span> choose required PHP versions to support.

Choose default modules from the list for a proper PHP version or for native.

![](/images/php_selector.png)

:::tip Note
You can also use [PHP Selector CLI](/command-line_tools/#php-selector)
:::

####  Selector tab additional features <Badge text="cPanel" /> <Badge text="CloudLinux Manager 6.0.1-2" />

Go to cPanel admin interface → CloudLinux manager → Selector

![](/images/NewSelector.png)

<span class="notranslate">_Selector_</span> tab has two sub tabs: <span class="notranslate">_Main settings_</span> and <span class="notranslate">_Domains_</span>.

* <span class="notranslate">_Main settings_</span> sub tab allows to config general settings for PHP Selector
  * <span class="notranslate">_Selector is_</span>: allows to enable/disable PHP Selector
  * <span class="notranslate">_Default PHP version_</span>: allows to set PHP version by default
  * <span class="notranslate">_Hide PHP extensions for end-user_</span>: allows to hide PHP extensions
  * <span class="notranslate">_Hide "My domains" page for end-user_</span>: allows to disable such tab for end-user
  * <span class="notranslate">_Supported versions_</span>: allows to select supported PHP versions 
* <span class="notranslate">_Domains_</span> sub tab contains the list of User-Domain pairs to visualize which PHP Selector is used by a domain

![](/images/Domains.png)

Admin can filter the list:

![](/images/SelectorFilters.png)

If an admin clicks <span class="notranslate">_Use PHP selector_</span> in the <span class="notranslate">_Action_</span> table, the PHP version for a domain in MultiPHP Selector is changed to the system default version and <span class="notranslate">`php-fpm`</span> is disabled. Users' websites will use the version set in CloudLinux OS Shared PHP Selector (user interface). Group operation also can be used.

![](/images/UsePHPSelector.png)

#### PHP Selector troubleshooting <Badge text="cPanel"/> <Badge text="CloudLinux Manager 6.0.1-2" />


You can see the following errors in the <span class="notranslate">_Domains_</span> tab.

1. <span class="notranslate">PHP Selector cannot be activated for this domain. Initialize CageFS in the Options tab first</span>.

![](/images/Error1.png)

**Solution**

Initialize CageFS in the Options tab (see [installation instructions](/cloudlinux_os_components/#installation-instructions-for-cpanel-users)).

![](/images/CageFSInit.png)

2. <span class="notranslate">PHP Selector cannot be activated for this domain. Enable CageFS for this user in the Users tab first</span>.

![](/images/Error2.png)

**Solution**

Enable CageFS in the Users tab (see [installation instructions](/cloudlinux_os_components/#installation-instructions-for-cpanel-users)).

![](/images/CageFSEnable.png)

* You can enable CageFS for one user by individual slider (for lve 1001 in the picture above)
* You can enable CageFS for a group of user by the CageFS button (for lve 1002, 1003 in the picture above)

3. Some PHP related issues need to be resolved in order to enable domain management. Find the list of PHP related issues that prevent domain management above.

![](/images/Error3.png)

**Solution**

If you cannot see Diagnostic tool notifications, you can restart it. Then you can fix the issues using [these instructions](/lve_manager/#php-selector-diagnostic-tool-and-notifications).

#### PHP Selector diagnostic tool and notifications <Badge text="CloudLinux Manager 6.0.1-2" />

The diagnostic tool allows to catch some issues. You can start diagnostic by clicking <span class="notranslate">_Run diagnostic_</span> button.

![](/images/RunDiagnostic.png)

The most popular errors and solutions:

1. Your PHP Handler does not support CLoudLinux OS Shared PHP Selector

![](/images/Issue1.png)
   
**Solution**: install `mod_suexec` (see instructions [here](/cloudlinux_os_components/#installation-5)) and then run the following command:

<div class="notranslate">

```
cagefsctl --force-update
```
</div>

2. Incorrect config file format

![](/images/Issue2.png)
       
**Solution**: correct the file format via SSH.

3. Some domains have neither PHP version selected in MultiPHP Manager no system default version or have `php-fpm` enabled.

![](/images/Issue3.png)

**Solution**: see [installation instructions](/cloudlinux_os_components/#installation-instructions-for-cpanel-users) for cPanel users

4. MultiPHP system default version is not ea-php

![](/images/Issue4.png)

**Solution**: see [installation instructions](/cloudlinux_os_components/#installation-instructions-for-cpanel-users) for cPanel users

In the CloudLinux Manager v.6.0.6-1 the diagnostic tool can not catch problems with CageFS. See [installation instructions](/cloudlinux_os_components/#installation-instructions-for-cpanel-users) for cPanel users.




### Python Selector

* [How to enable/disable Python Selector](/lve_manager/#how-to-enable-disable-python-selector)
* [How to manage Python Selector](/lve_manager/#how-to-manage-python-selector)
* [Enable and disable particular Python version](/lve_manager/#enable-and-disable-particular-python-version)
* [Install and delete particular Python version](/lve_manager/#install-and-delete-particular-python-version)
* [Make a particular Python version as a default](/lve_manager/#make-a-particular-python-version-as-a-default)
* [Applications column](/lve_manager/#applications-column)

Hoster interface allows to enable and disable Python Selector and manage individual Python versions.

Go to <span class="notranslate">CloudLinux Manager → Options Tab → Python Selector</span>.

A list of installed Python versions is displayed. There are several columns in the list.
* <span class="notranslate">Version</span> — displays Python version.
* <span class="notranslate">Path</span> — Python package location.
* <span class="notranslate">Applications</span> — number of applications that use this Python version. Click on an application number to go to the list of applications.
* <span class="notranslate">Enabled</span> — displays if particular Python version is enabled.
* <span class="notranslate">Actions</span> — allows to install, delete, and make default a particular Python version.

To display all changes immediately click <span class="notranslate">_Refresh_</span>.

![](/images/PythonGeneral.png) 

#### How to enable/disable Python Selector

To enable Python Selector move a slider to <span class="notranslate">_Enable_</span> and complete the action by clicking <span class="notranslate">_Agree_</span> or click <span class="notranslate">_Cancel_</span> to close the popup.
To disable Python Selector move a slider back to <span class="notranslate">_Disable_</span>.

:::tip Note
If you disable Python, all users won't be able to manage their applications
:::

![](/images/PythonEnableDisable.png)

::: tip Note
Python Selector icon in end user interface is hidden when Python is disabled.
:::

![](/images/PythonEndUserIcon.png)

#### How to manage Python Selector 

In the list of installed Python versions you can enable and disable, install and delete, and set a particular Python version as a default.
 
#### Enable and disable particular Python version
 
To enable particular Python version do the following:

* Move a disabled slider in the <span class="notranslate">Enabled</span> column for a particular Python version.
* In the confirmation popup click <span class="notranslate">_Agree_</span> to save changes or <span class="notranslate">_Cancel_</span> to close popup.

![](/images/PythonEnabled.png)

To disable particular Python version do the following:

* Move an enabled slider in the <span class="notranslate">Enabled</span> column for a particular Python version.
* In the confirmation popup click <span class="notranslate">_Agree_</span> to save changes or <span class="notranslate">_Cancel_</span> to close popup.
 
#### Install and delete particular Python version
 
To install particular Python version do the following:

* Click <span class="notranslate">_Install_</span> button in the Actions column for a particular Python version.
* In the confirmation popup click <span class="notranslate">_Agree_</span> to save changes or <span class="notranslate">_Cancel_</span> to close popup.
 
To delete particular Python version do the following:

* Click <span class="notranslate">_Bin_</span> icon in the <span class="notranslate">Actions</span> column for a particular Python version.
* In the confirmation popup click <span class="notranslate">_Agree_</span> to start uninstalling process. Or close popup without changes by clicking <span class="notranslate">_Cancel_</span> button.

:::tip Note
It is impossible:
* to remove default Python version
* to remove version with applications
* to install or remove version if another installation/uninstalling process is running
:::

![](/images/PythonInstall.png)

#### Make a particular Python version as a default

:::tip Note
You can set a particular Python version as a default version in the CloudLinux OS Shared [installation wizard](/lve_manager/#cloudlinux-installation-wizard) during the first installation.
:::

To make a particular Python version as a default version, do the following:

* Click <span class="notranslate">_Double-Tick_</span> icon in the Actions column for a particular Python version.
* In the confirmation popup click <span class="notranslate">_Agree_</span> to save changes or <span class="notranslate">_Cancel_</span> to close popup.
 
:::tip Note
It is impossible to make disabled Python version as a default version
:::

![](/images/PythonChangeDefaultVersion.png)

#### Applications column
 
To view and operate with the list of domains with Python versions click a number in the <span class="notranslate">_Applications_</span> column for a particular Python version. A section with a list of Domains for particular Python version will be displayed.

![](/images/PythonDomains.png)

Domains are displayed by three. To load more domains click <span class="notranslate">_Load More_</span> button.
 
To change Python version for a particular application do the following:

* Click <span class="notranslate">_Double-Arrow_</span> icon in the <span class="notranslate">_Actions_</span> column in a particular application row. A confirmation popup will be displayed.
* In the popup choose Python version from a dropdown.
* Click <span class="notranslate">_Change_</span> to confirm the action or <span class="notranslate">_Cancel_</span> to close the popup.
* To refresh state of applications in current version you can click <span class="notranslate">_Refresh_</span>.
 
:::tip Note
All packages of the application(s) will be re-installed.
:::

:::tip Note
You can also use [Python Selector CLI](/command-line_tools/#hoster)
:::

See also: [Python Selector client plugin](/lve_manager/#python-selector-client-plugin)


### Node.js Selector

* [How to enable/disable Node.js](/lve_manager/#how-to-enable-disable-node-js)
* [How to manage Node.js](/lve_manager/#how-to-manage-node-js)
* [Enable and disable particular Node.js version](/lve_manager/#enable-and-disable-particular-node-js-version)
* [Install and delete particular Node.js version](/lve_manager/#install-and-delete-particular-node-js-version)
* [Make a particular Node.js version as a default](/lve_manager/#make-a-particular-node-js-version-as-a-default)
* [Applications column](/lve_manager/#applications-column-2)
* [Application error log](/lve_manager/#application-error-log)


Hoster interface allows to enable and disable Node.js, and manage individual Node.js versions.

Go to <span class="notranslate"> _CloudLinux Manager → Options Tab → Node.js Section_ </span>. A list of installed Node.js versions is displayed. There are several columns in the list.

* <span class="notranslate"> Version </span> — displays Node.js version.
* <span class="notranslate"> Path </span> — Node.js package location.
* <span class="notranslate"> Applications </span> — number of applications that use this Node.js version. Click on a digit to go to the list of applications.
* <span class="notranslate"> Enabled </span> — displays if particular Node.js version is enabled.
* <span class="notranslate"> Actions </span> — allows to install, delete, and make default a particular Node.js version.

To display all changes immediately click <span class="notranslate"> _Refresh_ </span> link.

![](/images/nodejsgeneral_zoom70.png)

#### How to enable/disable Node.js

* To enable Node.js move the slider to <span class="notranslate">_Enable_</span>.
* To disable Node.js move the slider back to <span class="notranslate">_Disable_</span>. 

::: tip Note
If you disable Node.js, its version for all your applications will not be changed, but you can not add a new application to this version.
:::

![](/images/nodejsslider_zoom70.png)

::: tip Note
<span class="notranslate">Node.js Selector</span> icon in end user interface is hidden when Node.js is disabled.
:::

![](/images/nodejsselectorlogo_zoom70.png)

#### How to manage Node.js

The list of installed Node.js versions allows to enable and disable, install and delete, and set a particular Node.js version as a default.

#### Enable and disable particular Node.js version

To enable particular Node.js version do the following:
* Move a disabled slider in the <span class="notranslate"> _Enabled_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

![](/images/nodejsenable_zoom70.png)

To disable particular Node.js version do the following:
* Move an enabled slider in the <span class="notranslate"> _Enabled_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

#### Install and delete particular Node.js version

To install particular Node.js version do the following:
* Click <span class="notranslate"> _Install_ </span> button in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

To delete particular Node.js version do the following:
* Click <span class="notranslate"> _Bin_ </span> icon in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to start uninstall process.
* Or just close a pop-up without any changes.

::: warning Note
It is impossible:  
* to remove default Node.js version;
* to remove version with applications;
* to install or remove version if another installation/uninstall process is running.
:::

![](/images/nodejsconfirmation_zoom70.png)

#### Make a particular Node.js version as a default

To make a particular Node.js version as a default do the following:
* Click <span class="notranslate"> _Double-Tick_ </span> icon in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

::: tip Note
It is impossible to make a disabled version default.
:::


![](/images/nodejsmakedefault_zoom70.png)

#### Applications column

To view and operate with the list of domains with Node.js versions click on a number in the <span class="notranslate"> _Applications_ </span> column for a particular Node.js version. A section with a list of Domains for particular Node.js version will be displayed.

![](/images/nodejsselectordomains_zoom70.png)

Domains are displayed by three. To load more domains click on <span class="notranslate"> _Load More_ </span> button.


To change Node.js version for a particular application do the following:
* Click <span class="notranslate"> _Double-Arrow_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row. A confirmation pop-up will be displayed.
* In the pop-up choose Node.js version from a drop-down.
* Click <span class="notranslate"> _Change_ </span> to confirm the action or <span class="notranslate"> _Cancel_ </span> to close the pop-up.
* To refresh state of applications in current version you can click <span class="notranslate"> _Refresh_ </span> link. 

:::tip Note
All packages of the application(s) will be re-installed.
:::

:::tip Note
You can also use [Node.js Selector CLI](/command-line_tools/#hoster-2)
:::

See also: [Node.js Selector client plugin](/lve_manager/#node-js-selector-client-plugin)

#### Application error log

Since <span class="notranslate">alt-mod-passenger</span> version 5.3.7-3 we have included support for the PassengerAppLogFile directive.
<div class="notranslate">

``` 
Syntax: PassengerAppLogFile path
Default: PassengerAppLogFile path-to-passenger-log-file
Context: virtual host, htaccess
```
</div>
 
By default, <span class="notranslate">Passenger</span> log messages are all written to the Passenger log file. With this option, you can have the app specific messages logged to a different file in addition. In <span class="notranslate"> alt-mod-passenger </span>, you can use it in the context of a virtual host or in the htaccess file.

See also: [Node.js Selector CLI tools](/command-line_tools/#node-js-selector).

### Website monitoring tool and Slow Site analyzer

* [Website monitoring tab](/lve_manager/#website-monitoring-tab)
* [Main](/lve_manager/#main)
* [PHP Slow Site analyzer](/lve_manager/#php-slow-site-analyzer)
* [Settings](/lve_manager/#settings)
* [What is the density threshold?](/lve_manager/#what-is-the-density-threshold)
* [Email notifications](/lve_manager/#email-notifications)
* [The cloudlinux-ssa-manager CLI utility](/command-line_tools/#the-cloudlinux-ssa-manager-utility)
* [The wmt-api CLI utility](/command-line_tools/#the-wmt-api-utility)
* [FAQ](/lve_manager/#faq)

**Website monitoring tool** is a new tool that collects the statistics of the domains' availability and responsiveness, as well as errors that occur when accessing these domains. An admin can get email reports with the statistics. The website monitoring tool uses the simple curl request like `curl http://domain.com` to get domains’ statistics.

**PHP Slow Site analyzer** is a new tool that generates daily reports for the server administrator with information about the top N slow PHP-based domains and URLs. Slow Site analyzer tracks all PHP-based requests and selects slow ones by certain rules.   

:::tip Note
Slow Site analyzer is not available for CloudLinux OS Shared 6.
:::
 
**Installation**

To install the tool, run the following command:

```
yum update lvemanager
```

:::warning Warning
For now, there is no any possibility to remove the `alt-php-ssa` and `cl-web-monitoring-tool` packages so that the _Website monitoring_ tab will be removed. This possibility will be added in the future releases.

You can turn off the _Website monitoring_, _PHP Sites Analyzer_ in the _[Settings](/lve_manager/#settings)_ subtab, so sites statistics will stop collecting and there will be no additional load on the server.
:::

#### Website monitoring tab

You can configure the Website monitoring tool and Slow Site analyzer and view the daily reports in the CloudLinux Manager -> Website monitoring tab.

There are Main, PHP Site analyzer, and Settings subtabs here.

#### Main

This subtab views the latest report (for the previous day) of the Website monitoring tool.

![](/images/WebsiteMonitoringMain.png)

Remember that report is created every 24 hours and all changes in configuration (the _Settings_ tab) or in the list of domains will be applied for the next 24 hours (from midnight).

* **Total number of requests** - requests that were sent to all domains, existing on the servers
* **Successful requests** - the number of requests for all domains with ![](/images/Code200.png)
* **Requests with errors** - the number of requests for all domains which status code is not 200
* **Not started requests due to short check interval** - this metric is used to adjust configuration. If it is not equal 0, an admin should increase the value of Requests sending interval, because the tool does not fit into this interval to send requests to all domains.
* **Slowest websites in 24h and Websites with most errors in 24h** - in these sections you can find the number of domains that was exposed here.

  ![](/images/TopSlow.png)


#### PHP Slow Site analyzer

:::tip Note
The Slow Site analyzer is not available for CloudLinux OS Shared 6.
:::

![](/images/WebsiteMonitoringPHPSiteAnalyzer.png)

This is an example of a report from the Slow Site analyzer. The report shows the number of slow requests per domain and its URLs and the average duration of each slow URL.

You can find the explanation of the **Slow requests density in period** [here](/lve_manager/#what-is-the-density-threshold).


#### Settings

Here, an admin can configure the Website monitoring and the PHP Site analyzer.

:::tip Note
All settings which was changed after starting Website monitoring and Slow site analyzer will be applied for the next 24h (from midnight).
:::

To enable or disable **Website monitoring**, use the following slider.

![](/images/WebsiteMonitoringSlider.png)

* **Top N slow websites to show** - this number (N) will be used to select the top N domains from the list of all domains, sorted by response duration (Slowest websites list). And this number also will be used to select the top N domains from the list of all domains, sorted by amount of errors (Websites with most errors list).
* **Requests sending interval** - this is a period in minutes between requests to the same domain.
* **Domain response timeout** - if there is no answer from the website for this period of time, the Website Monitoring tool will regard this behaviour as the `HTTP 408` error.
* **Concurrent requests limit** - how many concurrent requests can be done by the Website Monitoring tool.

To enable or disable the **Slow site analyzer**, use the following slider.

:::tip Note
Slow Site analyzer is not available for CloudLinux OS Shared 6.
:::

![](/images/WebsiteMonitoringSlider1.png)

* **Top N slow websites to show** - this number (N) will be used to select the top N domains from the list of all domains, marked as slow.
* **Top slow URLs** - this number (N) will be used to select the top N URLs for each domain, marked as slow.
* **Slow request duration** - the duration of a request in seconds. 
* **Slow requests number & Analysis time** - how many requests with a certain request duration should be done in time to mark the domain as a slow one.
* **Slow requests density threshold** can be in the interval [0..1], by default it is 0.8. The **density threshold** can be disabled. And the **Domains and URLs Ignore List** can be specified.

#### What is the density threshold?

We try to find the most interesting requests for the optimisation from all number of requests to domains during 24 hours. The _Density threshold_ parameter helps to find the most visited URLs and the most popular requests. 

A density threshold is a numerical measure of some type of correlation, meaning the power of the statistical relationship between slow requests and all requests to the domain. If this parameter is enabled then the resulting table will contain slow requests that have exceeded the specified threshold. Requests with the highest density are usually the most distributed per day and are considered valuable to users, thus interesting for optimization.

Slow requests that represent bursts of activity and are weakly related to all activity per domain typically have a low density and will be weeded out.

#### Email notifications

Email notifications are created by the Web monitoring tools. 

**Example of the Web monitoring tools report**.

![](/images/EmailNotifications.png)

**Example of the PHP Slow site analyzer report**.

![](/images/SlowSiteAnalyzerEmailNotifications.png)


#### FAQ

Q: Does this feature consume a lot server resources for collecting website and PHP data? If I enable it can this slow down the server?

A: The load depends on the number of websites and the Website monitoring tool settings. Basically, the Website monitoring should not create a significant load and you can keep it always on.

---

Q: Can I change the default value to 10, for example for the "Top N slow websites to show" setting?

A: This number is simply the number of the slowest responding sites. All sites are sampled during the day. When generating a report, all sites' responses are sorted by response time from highest to lowest, and to make the report readable, only the first N sites are taken. You can specify N as all existing sites or only the 5 slowest. This number does not affect the server load, it only affects the report that will be visible in the UI or emailed to the administrator.

---

Q: What would you recommend: to enable the Website monitoring tool for some days and then disable or I can keep it always turned on?

A: The load depends on the number of websites and the Website monitoring tool settings. Basically, the Website monitoring tool should not create a significant load and you can keep it always on.

### Reseller interface

Reseller interface is designed to manage limits for resellers’ end users, to monitor statistics and the history of resource usage and to modify reseller’s end user packages limits.

Log in under a particular reseller credentials to have access to the following functionality:

* <span class="notranslate">[Current Usage](/lve_manager/#current-usage-tab)</span> tab - allows to monitor resellers’ end users resource usage at the moment;
* <span class="notranslate"> [Historical Usage](/lve_manager/#historical-usage-tab)</span> tab - allows to control resellers’ end users resource usage history;
* <span class="notranslate"> [Users](/lve_manager/#users-tab)</span> tab with the list of all resellers’ end users allows to view and manage all the reseller’s end user limits;
* <span class="notranslate"> [Statistics](/lve_manager/#statistics-tab)</span> tab displays the statistics of resource usage for particular timeframe or particular reseller's end user;
* <span class="notranslate"> [Options](/lve_manager/#options-tab)</span> tab allows to set LVE Faults email notifications.
* <span class="notranslate"> [Packages](/lve_manager/#packages-tab)</span> tab allows to manage reseller’s end user packages limits.

:::warning
Reseller can manage all his end users via Reseller Interface. Reseller cannot manage <span class="notranslate"> INODE </span> or <span class="notranslate"> MYSQL </span> limits, neither his own nor for his users.
:::

<div class="notranslate">

#### Current Usage tab

</div>

Current usage table provides the information on the usage of the following:
* <span class="notranslate"> SPEED (All)</span>
* <span class="notranslate">memory (MEM)</span>
* data throughput <span class="notranslate">(IO)(All)</span>
* read/write operations per second (<span class="notranslate">IOPS</span>)
* <span class="notranslate">number of processes (PNO)</span>
* <span class="notranslate">entry processes (EP)</span>

Resource usage data is being refreshed every 10 seconds which is set by default in <span class="notranslate">_Auto-refresh_</span> field. You can set <span class="notranslate">_Auto-refresh time_</span> by choosing the value from the drop-down.

You can refresh the table manually by clicking <span class="notranslate">_Refresh now_</span> or you can freeze the values by clicking <span class="notranslate">_pause_</span> button.

Usage values will not change until the next manual refresh. To unfreeze click on <span class="notranslate">_unpause_</span> button. The countdown will continue.

:::warning
Reseller cannot manage <span class="notranslate">INODE</span> or MYSQL limits. Neither his own, nor for his users.
:::

The bottom line star in the table displays the total reseller resource usage. It means, that all the usage of resellers’ end users and of his own is displayed as a summary for each parameter.


![](/images/currentusagetabresellerr_zoom70.png)

<div class="notranslate">

#### Historical Usage tab

</div>

Choose <span class="notranslate">_Historical Usage_</span> tab to view reseller and resellers’ end users resource usage history and faults. The list of users can be filtered by <span class="notranslate">_Timeframe_</span>.

When reseller’s end user reaches the limits set by hoster for the reseller, this will be displayed on the chart. 

:::tip Note
In this case reseller’s end user would not necessarily reaches his limits set by the reseller. These faults are not displayed on the chart.
:::

On the <span class="notranslate">_Historical Usage_</span> page the reseller is also able to see the list of <span class="notranslate">_Top 5 Reseller’s end users_</span> (based on resource usage, for the same period as charts/overall usage). Click <span class="notranslate">_History_</span> in the <span class="notranslate">_Actions_</span> column to view resource usage statistics for particular user.

Click <span class="notranslate">_LVE Statistics_</span> on the top of the <span class="notranslate">Top 5</span> list to go to the <span class="notranslate">_Statistics_</span> page to view or manage the rest of users.

![](/images/historicalusageresellertab_zoom70.png)

<div class="notranslate">

#### Users tab

</div>

Choose <span class="notranslate">_Users_</span> tab to view and manage the list of all resellers’ end users and resource usage limits provided for them. The following limits are available for the resellers’ end users:

* <span class="notranslate">SPEED</span>
* <span class="notranslate">PMEM</span>
* <span class="notranslate">IO</span>
* <span class="notranslate">IOPS</span>
* <span class="notranslate">EP</span>
* <span class="notranslate">NPROC</span>

You can filter the list by <span class="notranslate">_Username_, _Domain_, _LVE ID_.</span>

Tick <span class="notranslate">_Show only ignored users_</span> to display only users with <span class="notranslate">MySQL Governor</span> disabled.

![](/images/userstabreseller_zoom70.png)

<div class="notranslate">

#### Actions column

</div>

Click on a pencil icon in <span class="notranslate">_Actions_</span> column to edit limits for a particular user. The following actions are available:

* Click <span class="notranslate">Reset</span> to reset limits to default values.
* Click <span class="notranslate">Apply</span> for <span class="notranslate">Do not limit</span> to set unlimited resources to a user.
* Set values for <span class="notranslate"> PEED, PMEM, IO, IOPS, EP</span>, and NPROC and click <span class="notranslate">_Save_</span> to save changes or <span class="notranslate">_Cancel_</span> to close the window.

![](/images/userstabpopup_zoom70.png)

<div class="notranslate">

#### Statistics tab

</div>

Choose <span class="notranslate">_Statistics_</span> tab to view resource usage limits statistics.

<span class="notranslate">_Statistics_</span> table can be filtered by <span class="notranslate">_Timeframe_, _Limit_, _Top LVEs_, _LVE approaching limit_, _Fault LVE_</span>.

The following parameters are displayed:

* <span class="notranslate"> SPEED</span> per user;
* <span class="notranslate"> PMEM</span> usage per user;
* <span class="notranslate"> IO</span> usage per user;
* <span class="notranslate"> EP</span> usage per user;
* <span class="notranslate"> NPROC</span> usage per user;
* <span class="notranslate"> IOPS</span> usage per user.

![](/images/statisticstabreseller_zoom70.png)


Use <span class="notranslate">_Charts_</span> in the <span class="notranslate">_View_</span> column to view detailed resource usage charts for a particular period of time.

For example, 7 days period chart.

![](/images/sevendayschartresellers_zoom70.png)

<div class="notranslate">


#### Options tab

</div>

Choose <span class="notranslate">_Options_</span> tab to set user email notifications for resellers’ end users.

In <span class="notranslate">_LVE Faults email notifications_</span> section tick appropriate checkboxes to set the required type of notification.

Starting from CloudLinux Manager v.7.3.0-1 and LVE-Stats v.4.1.4-1 users can disable in their Resource Usage plugin email notifications about hitting LVE limits by themselves.

To allow users to do so, the reseller should enable the _Notify Customers_ and _Notify Reseller’s Customers_ options.

Unfortunately, it is not possible to disable LVE Faults Email Notifications for all users by default so that users can enable the feature themselves in their interface.

But it is possible to enable LVE Faults Email Notifications for all users by default, so that users can disable the feature themselves in their interface.


![](/images/optionsresellernotify_zoom70.png)

* <span class="notranslate">_Notify me on users faults_</span> - notify reseller when his users have exceeded limits.
* <span class="notranslate">_Notify Customers_</span> - notify resellers’ end users when they have exceeded limits.
* <span class="notranslate">_Notify me when I hit my limits_</span> - notify reseller when overall resource usage limits are reached.

In <span class="notranslate">_Faults to include_</span> section tick checkboxes to include particular limits to email notifications.

![](/images/options02_zoom70.png)

In <span class="notranslate">_Minimum number of Faults to notify_</span> section enter the number of faults required for the notification to be sent for reseller and customer. You can also set the reseller notification frequency.

Set the frequency of sending the reseller email notifications in <span class="notranslate">_Notify Reseller Every ... days/hours/minutes/seconds_</span> section.

![](/images/options03_zoom70.png)

Click <span class="notranslate">_Save Changes_</span> to apply changes.

<div class="notranslate">

#### Packages tab

</div>

Choose <span class="notranslate">_Packages_</span> tab to view and modify limits for reseller’s packages.

![](/images/packagesreseller_zoom70.png)

Click pencil icon in a package row to set the following limits for a package:

* <span class="notranslate">SPEED</span> limit;
* <span class="notranslate">Physical memory (PMEM)</span> (can be set as unlimited by setting 0);
* <span class="notranslate">I/O</span> limits;
* <span class="notranslate">IOPS</span> limits;
* <span class="notranslate">Concurrent connections (EP)</span> limits.

When limits are set click <span class="notranslate">_Save_</span> to apply changes.




### LVE plugins branding

:::tip Note
Requires <span class="notranslate">CloudLinux Manager</span> 2.0-33+
:::

It is possible to apply branding to the LVE Plugins in cPanel end users’ interface. To brand the cPanel end users'  interface please do the following:

* Create a script that will patch <span class="notranslate">CloudLinux Manager</span> files (with branding data, for example, image and logo) after every update of <span class="notranslate">`lvemanager rpm`</span> package;

* Locate this script in <span class="notranslate">`/usr/share/l.v.e-manager/branding_script`</span>;

* Make this script executable by running the command:

<div class="notranslate">

```
chmod a+x /usr/share/l.v.e-manager/branding_script
```
</div>

When done, the branding script will be executed while every update of <span class="notranslate">lvemanager</span> package and all branding changes will be applied in the end user’s interface.

:::tip Note
Modifying the <span class="notranslate">CloudLinux Manager WHM</span> plugin (<span class="notranslate">`/usr/local/cpanel/whostmgr/docroot/cgi/CloudLinux.cgi`</span>) via <span class="notranslate">`branding_script`</span> is not allowed.
:::


### User message for PHP version

Since version 1.0-4 <span class="notranslate">CloudLinux Manager</span> acquired a feature of adding user messages to PHP versions*. To add a message, you should create a file in <span class="notranslate">`/opt/alt/phpXX/name_modifier`</span> with a message that you want to be shown to a user.

For example, if you need to add the following message <span class="notranslate">`Don't use this PHP version`</span> to PHP version 4.4, you should create the following file:

<div class="notranslate">

```
/opt/alt/php44/name_modifier:

echo 'Don`t use this php version' > /opt/alt/php44/name_modifier
```
</div>

As a result, <span class="notranslate">CloudLinux Manager</span> will automatically pick up this message and will show it in web-interface to administrator (see Figure 1.1 for cPanel, Figure 1.2 for DirectAdmin) and to user (see Figure 2.1 for cPanel, Figure 2.2 for DirectAdmin). You can add messages to other PHP versions this way as well.

| |
|:---:|
|![](/images/PHP_version_message_cPanel_admin.png)|
| Figure 1.1 cPanel CloudLinux Manager (administrator)| 


| |
|:---:|
|![](/images/PHP_version_message_DirectAdmin_admin.png)|
| Figure 1.2 DirectAdmin CloudLinux Manager (administrator)| 


| |
|:---:|
|![](/images/PHP_version_message_cPanel_user.png)|
| Figure 2.1 cPanel CloudLinux Manager (user)|


| |
|:---:|
|![](/images/PHP_version_message_DirectAdmin_user.png)|
| Figure 2.2 DirectAdmin CloudLinux Manager (user)| 

:::tip Note
*For cPanel and DirectAdmin only.
:::

## Client plugins

* [Resource Usage client plugin](/lve_manager/#resource-usage-client-plugin)
* [Dashboard](/lve_manager/#dashboard-2)
* [Current Usage](/lve_manager/#current-usage-3)
  * [Current Usage table](/lve_manager/#current-usage-table)
  * [Filters](/lve_manager/#filters)
  * [Charts](/lve_manager/#charts)
  * [Usage](/lve_manager/#usage)
* [Snapshot](/lve_manager/#snapshot)
  * [Server processes snapshots](/lve_manager/#server-processes-snapshots)
  * [Process list](/lve_manager/#process-list)
  * [Database queries (cPanel only)](/lve_manager/#database-queries-cpanel-only)
  * [HTTP queries](/lve_manager/#http-queries)
* [Python Selector client plugin](/lve_manager/#python-selector-client-plugin)
  * [How to manage an application](/lve_manager/#how-to-manage-an-application)
  * [Create application](/lve_manager/#create-application)
  * [Start application](/lve_manager/#start-application)
  * [Stop application](/lve_manager/#stop-application)
  * [Restart application](/lve_manager/#restart-application)
  * [Remove application](/lve_manager/#remove-application)
  * [Edit application](/lve_manager/#edit-application)
  * [Migrate application](/lve_manager/#migrate-application)
* [Node.js Selector client plugin](/lve_manager/#node-js-selector-client-plugin)
  * [How to manage application](/lve_manager/#how-to-manage-application)
  * [Start application](/lve_manager/#start-application-2)
  * [Stop application](/lve_manager/#stop-application-2)
  * [Restart application](/lve_manager/#restart-application-2)
  * [Remove application](/lve_manager/#remove-application-2)
  * [Edit application](/lve_manager/#edit-application-2)
* [Ruby Selector client plugin](/lve_manager/#ruby-selector-client-plugin)
* [PHP Selector client plugin](/lve_manager/#php-selector-client-plugin)
  * [PHP Selector. My Domains tab (cPanel)](/lve_manager/#php-selector-my-domains-tab) <sup>CloudLinux Manager 6.0.1-2</sup>
* [CloudLinux Manager options](/lve_manager/#cloudlinux-manager-options)
  * [Changing settings manually](/lve_manager/#changing-settings-manually)
  * [Changing settings in the config file](/lve_manager/#changing-settings-in-the-config-file)

### Resource Usage client plugin

Client resource usage plugin for cPanel, Plesk, and DirectAdmin allows host’s end users to view and monitor resource usage.


Go to your control panel and click _CPU and concurrent connection usage_.

![](/images/client_resource_usage.png)

Here you can see three tabs:

* **<span class="notranslate">Dashboard</span>**: displays the general condition of your site. If your site is limited, this displays on the Dashboard.
* **<span class="notranslate">Current usage</span>**: here you can find full information on the resource usage displayed in charts and tables.
* **<span class="notranslate">Snapshot</span>**: server snapshots with processes list and database and HTTP queries.

![](/images/RU-dashboard.png)

#### Dashboard

Go to the <span class="notranslate">_Dashboard_</span> tab to see the general condition of your site.
If your site is limited, you can see this on the <span class="notranslate">_Dashboard_</span> with the resource you are limited over.
To see detailed information about resource usage, click <span class="notranslate">_Details_</span>.

If your site is not limited, you will see the plain <span class="notranslate">Dashboard</span>.

![](/images/RU-no-issues.png)

#### Current Usage

Go to the <span class="notranslate">_Current Usage_</span> tab to see the detailed information about resource usage on your server.

![](/images/RU-current-usage.png)

:::tip Note
It's possible to add the <span class="notranslate">`normalized_user_cpu = N`</span> value to the <span class="notranslate">`/etc/sysconfig/cloudlinux`</span> file. So you can see for example CPU Usage X/200 (%) in the scenario where a user's LVE CPU limit is 200%. If the value is equal to `Y`, CPU Usage cannot get greater than 100%.
:::


#### Current Usage table

The <span class="notranslate">_Current Usage_</span> table displays resource usage.

:::warning Warning
**<span class="notranslate">Inodes</span>** usage is displayed if it is enabled and **<span class="notranslate">Inodes</span>** limits are set for the user. cPanel only.
:::

![](/images/RU-current-usage-table.png)

* **<span class="notranslate">Description</span>**: resource name
* **<span class="notranslate">Usage</span>**: resource usage value
* **<span class="notranslate">Limit</span>**: resource usage limit
* **<span class="notranslate">Fault</span>**: number of faults

#### Filters

You can filter charts and the Usage table by timeframe and time unit (day, hour, minute).

#### Charts

The following resources are displayed in charts:

* <span class="notranslate">CPU</span>
* <span class="notranslate">Virtual Memory</span>
* <span class="notranslate">Physical Memory</span>
* <span class="notranslate">Input/Output</span>
* <span class="notranslate">Io operations</span>
* <span class="notranslate">Entry Processes</span>
* <span class="notranslate">Processes</span>
  
All charts have the color legend:

* Green — average resource usage
* Red — limit set for this parameter
* Blue — database
* Green-cyan — faults (limit violations)
  
You can also see the Faults chart with all faults for all resources.

![](/images/RU-faults-chart.png)

#### Usage

The <span class="notranslate">_Usage_</span> table displays information on each resource usage sorted by timeframe and time unit.

![](/images/RU-usage-table.png)

* **<span class="notranslate">From-To</span>**: period
* **<span class="notranslate">A</span>**: average
* **<span class="notranslate">L</span>**: limit
* **<span class="notranslate">F</span>**: faults

Use controls below the table to navigate through it.

#### Snapshot

Go to the <span class="notranslate">_Snapshot_</span> tab to see server snapshots with processes list and database and HTTP queries.

![](/images/RU-snapshots.png)

You can choose a date and a snapshot to display in the table.

#### Server processes snapshots

In case when a CloudLinux OS Shared user hits LVE limits, appropriate faults are generated and [lvestats](/deprecated/#lve-stats-0-x) package generates server processes snapshot. Snapshot is a list of running applications and a list of running MySQL queries right after the faults happened.

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

To access <span class="notranslate">**Snapshots**</span> you can also use [lve-read-snapshot](/command-line_tools/#lve-read-snapshot) utility.

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

#### Process list

Displays information on processes in the selected snapshot.

* **<span class="notranslate">PID</span>**: process ID
* **<span class="notranslate">CMD</span>**: what command was run
* **<span class="notranslate">CPU</span>**: CPU usage
* **<span class="notranslate">MEM</span>**: memory usage
  
#### Database queries (cPanel only)

Displays information on database queries in the selected snapshot.

![](/images/RU-db-queries.png)

#### HTTP queries

Displays information on HTTP queries in the selected snapshot.

![](/images/RU-HTTP-queries.png)


#### Turning On / Off email notifications per user

:::warning The following packages are required:
* lvemanager-7.3.0-1
* lve-stats-4.1.4-1
:::

A user can disable LVE-Stats notifications about hitting LVE limits by himself.

The feature is available via **Resource Usage client plugin** | **Options** | **LVE Stats Email Notifications**

![](/images/TurningOnOffNotifications.png)

### Python Selector client plugin

:::tip Note
Python Selector icon in end user interface is hidden when Python is disabled
:::

![](/images/PythonEndUserIcon.png)

End User interface allows end users to setup and manage Python for their web applications.

Go to <span class="notranslate">cPanel → Software Section → Setup Python App</span>.
 
Web Applications page is displayed.

![](/images/PythonEUWebApp.png)

There are several columns in the list:

* <span class="notranslate">App URI</span> — application URI including the domain.
* <span class="notranslate">App Root Directory</span> — application root directory relative to user's home.
* <span class="notranslate">Status — started/stopped</span> — displays if an application is running or not and version of the application.
* <span class="notranslate">Actions</span> — allows to migrate, start, restart, stop, edit, and remove a particular application.

#### How to manage an application

#### Create application

1. Click <span class="notranslate">_Create Application_</span> to create an application. The Create Application tab opens.

    ![](/images/PythonCreateApp1.png)

2. Specify the following:
    * <span class="notranslate">Python version</span> — select from the dropdown (required);
    * <span class="notranslate">Application root</span> — physical address to your application on a server that corresponds with its URI (required);
    * <span class="notranslate">Application URL</span> —  HTTP/HTTPS link to your application (optional);
    * <span class="notranslate">Application startup file</span> — the file where WSGI callable object is located. It is required for application to run. Default is <span class="notranslate">`passenger_wsgi.py`</span>;
    * Application Entry point — WSGI callable object for your application (optional). Default is <span class="notranslate">`application`</span>;
    * <span class="notranslate">Passenger log file</span> — starting from CloudLinux Manager 5.1.0-2 you can set paths to Passenger logs for Python applications via UI (or using [cloudlinux-selector utility](/command-line_tools/#new-python-selector)).
3. Optionally, add environment variable. To do so, click <span class="notranslate">_Add Variable_</span> and specify variable name and value, then click the <span class="notranslate">_Done_</span> or <span class="notranslate">_Cancel_</span> to close an adding form.

To delete or edit environment variable, click <span class="notranslate">_Bin_</span> or <span class="notranslate">_Pencil_</span> for the required variable.

![](/images/PythonEnvVar.png)

#### Start application
 
To start a stopped application do the following:

* Click <span class="notranslate">_Start_</span> in the <span class="notranslate">_Actions_</span> column in a stopped application row.
* When an action is completed a <span class="notranslate">_Start_</span> changes to <span class="notranslate">_Stop_</span>.
 
#### Stop application
 
To stop a started application do the following:

* Click <span class="notranslate">_Stop_</span> icon in the <span class="notranslate">_Actions_</span> column in a started application row.
* When an action is completed a <span class="notranslate">_Stop_</span> changes to <span class="notranslate">_Start_</span>.

![](/images/PythonStartStopApp.png)

#### Restart application
 
To restart a started application do the following:

* Click <span class="notranslate">_Restart_</span> in the <span class="notranslate">_Actions_</span> column in a started application row. A current row is blocked and when a process is completed it will be unblocked.
 
#### Remove application
 
To remove application do the following:

* Click <span class="notranslate">_Bin_</span> in the <span class="notranslate">_Actions_</span> column in a particular application row.
* In the confirmation popup click <span class="notranslate">_Agree_</span> to start removing or <span class="notranslate">_Cancel_</span> to close the popup.
* When an action is completed an application will be removed from the <span class="notranslate">_Web Applications_</span> table and a confirmation popup will be displayed.

![](/images/PythonRestartRemove.png)

#### Edit application
 
To edit application do the following:

* Click the <span class="notranslate">_Pencil_</span> in the <span class="notranslate">_Actions_</span> column in a particular application row. A particular application tab opens.

![](/images/PythonSelectorEditApp.png)

The following actions are available:

* Restart application — click <span class="notranslate">_Restart_</span>.
* Stop application — click <span class="notranslate">_Stop App_</span>.
* Remove application — click <span class="notranslate">_Destroy_</span> and confirm the action in a popup.
* Change Python version — choose Python version from a dropdown.
* Change Application root — specify in a field a physical address to the application on a server that corresponds with its URI.
* Change Application URL — specify in a field an HTTP/HTTPS link to the application.
* Open Application URL — click the <span class="notranslate">_Open_</span>.
* Change Application startup file — specify as <span class="notranslate">`NAME.py`</span> file.
* Change Application Entry point — specify WSGI callable object for your application.
* Passenger log file — starting from CloudLinux Manager 5.1.0-2 you can set paths to Passenger logs for Python applications via UI (or using [cloudlinux-selector](/command-line_tools/#new-python-selector) utility).
* Run pip install command — click <span class="notranslate">_Run pip install_</span> to install the package(s) described in the configuration file.
* Add Configuration files — click <span class="notranslate">_Add_</span> and specify all required information.
* Edit available configuration file — click <span class="notranslate">_Edit_</span>, the file opens in a new popup.
* Remove available configuration file from the list — click <span class="notranslate">_Remove_</span> and confirm the action or click <span class="notranslate">_Cancel_</span> to close the popup.
* Add Environment variables — click <span class="notranslate">_Add Variable_</span> and specify a name and a value.
  
Click <span class="notranslate">_Save_</span> to save all changes or <span class="notranslate">_Cancel_</span> to close the tab.

#### Migrate application

For details see [How to migrate an application to the new Python Selector](/cloudlinux_os_components/#how-to-migrate-an-application-to-the-new-python-selector)


:::tip Note
You can also use [Python Selector CLI](/command-line_tools/#end-user)
:::

### Node.js Selector client plugin

:::tip Note
<span class="notranslate">Node.js Selector</span> icon in end user interface is hidden when Node.js is disabled.
:::

![](/images/Node.jsClientPlugin.png)

End User interface allows end users to setup and manage Node.js for their web applications.  
Go to <span class="notranslate">_cPanel → Software Section → Setup Node.js App_</span>.

<span class="notranslate">_Web Applications_</span> page is displayed.

![](/images/nodejsusermain_zoom70.png)

There are several columns in the list.
* <span class="notranslate"> App URI </span> — application URI including the domain.
* <span class="notranslate"> App Root Directory </span> — application root directory relative to user's home.
* <span class="notranslate"> Mode </span> — can be production or development.
* <span class="notranslate"> Status </span> — started/stopped — displays if an application is running or not and version of application.
* <span class="notranslate"> Actions </span> — allows to start, restart, stop, edit, and remove a particular application.

#### How to manage application

#### Start application

To start a stopped application do the following:
* Click <span class="notranslate"> _Start_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a stopped application row.
* When an action is completed a <span class="notranslate"> _Start_ </span> icon changes to <span class="notranslate"> _Stop_ </span> icon.

#### Stop application

To stop a started application do the following:
* Click <span class="notranslate"> _Stop_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a started application row.
* When an action is completed a <span class="notranslate"> _Stop_ </span> icon changes to <span class="notranslate"> _Start_ </span> icon.

![](/images/nodejsuseruistartstop_zoom70.png)

#### Restart application

To restart started application do the following:
* Click <span class="notranslate"> _Restart_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a started application row. A current row is blocked and when a process is completed it will be unblocked.

#### Remove application

To remove application do the following:
* Click <span class="notranslate"> _Bin_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row.
* In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to start removing or <span class="notranslate"> _Cancel_ </span> to close pop-up.
* When an action is completed an application will be removed from the <span class="notranslate"> _Web Applications_ </span> table and a confirmation pop-up will be displayed.

![](/images/nodejsuseruirestartremove_zoom70.png)

#### Edit application

To edit application do the following:
* Click <span class="notranslate"> _Pencil_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row. A particular application tab opens.

![](/images/Node.js-Selector-edit-app.png)

The following actions are available:
* Restart application — click <span class="notranslate"> _Restart_ </span> button.
* Stop Node.js — click <span class="notranslate"> _Stop Node.js_ </span> button.
* Run JavaScript script — click <span class="notranslate"> _Run JS Script_ </span> button to run a command specified in the <span class="notranslate"> Scripts </span> section of the <span class="notranslate"> package.json </span> file. Specify the name of the script to run plus any parameters then click <span class="notranslate"> Ok </span> .
* Remove application — click <span class="notranslate"> _Delete_ </span> button and confirm the action in a pop-up.
* Change Node.js version — choose Node.js version from a drop-down.
* Change Application mode — choose application mode from a drop-down. Available modes are <span class="notranslate"> _Production_ </span> and <span class="notranslate"> _Development_ </span> .
* Application root — specify in a field a physical address to the application on a server that corresponds with its URI.
* Application URL — specify in a field an HTTP/HTTPS link to the application.
* Application startup file — specify as <span class="notranslate"> NAME.js file </span>.
* Passenger log file — starting from CloudLinux Manager 5.1.0-2 you can set paths to Passenger logs for Node.js applications via UI (or using [cloudlinux-selector](/command-line_tools/#node-js-selector) utility).
* Run <span class="notranslate"> npm install command </span> — click <span class="notranslate"> _Run npm install_ </span> button to install the package(s) described in the <span class="notranslate"> package.json </span> file.
* Add Environment variables — click <span class="notranslate"> _Add Variable_ </span> and specify a name and a value.

:::tip Note
You can also use [Node.js Selector CLI](/command-line_tools/#end-user-2)
:::

### Ruby Selector client plugin

End user interface allows end users to setup and manage Ruby for their web applications.

Go to <span class="notranslate">_cPanel → Software Section → Setup Ruby App_</span>.

![](/images/RubyClientPluginStart.png)

Setup Ruby application page is displayed.

![](/images/RubyClientPlugin1.png)

Here you can do the following:

* Setup a new application.
* View/edit/restart/remove the existing application.

### PHP Selector client plugin

End user interface allows end users to select and manage PHP extensions and options for the particular PHP version.

Go to <span class="notranslate">_cPanel → Software Section → Select PHP Version_</span>.

![](/images/PHPSelectorClientPlugin.png)

PHP Extensions page opens.

![](/images/php_selector_customer.png)

Here you can choose extensions for the particular PHP version, the current PHP version and reset to default.

To manage PHP options, click <span class="notranslate">_Switch to PHP options_</span>.

![](/images/php_selector_options.png)

All changes are saved automatically.

* <span class="notranslate">`allow_url_fopen`</span>. Allows PHP file functions to retrieve data from remote locations over FTP or HTTP. This option is a great security risk, thus do not turn it on without necessity.
* <span class="notranslate">`display_errors`</span>. Determines whether errors should be printed to the screen as part of the output or if they should not be shown to a user.
* <span class="notranslate">`error_reporting`</span>. The error reporting level.
* <span class="notranslate">`file_uploads`</span>. Allows uploading files over HTTP.
* <span class="notranslate">`include_path`</span>. The list of directories where scripts look for files (similar to system's PATH variable). To separate directories, use a colon (`:`) For example: <span class="notranslate">`.:/dir/inc:/usr/lib/php`</span>
* <span class="notranslate">`log_errors`</span>. Tells whether to log errors. By default, errors are logged in the server's error log. Use the error_log directive to specify the path to your own log file.
* <span class="notranslate">`mail.force_extra_parameters`</span>. Additional parameters for the mail() function used to send mail. For example, to use your custom Sendmail configuration: <span class="notranslate">`-C /dir/conf.cf`</span>
* <span class="notranslate">`max_execution_time`</span>. The maximum time in seconds a script is allowed to run before it is terminated.
* <span class="notranslate">`max_input_time`</span>. The maximum time in seconds a script is allowed to parse input data.
* <span class="notranslate">`memory_limit`</span>. The maximum amount of memory in bytes a script is allowed to allocate. Set the value to -1 to have no memory limit (not recommended). Use shortcuts for byte values: K (kilo), M (mega), and G (giga). For example, 128M.
* <span class="notranslate">`open_basedir`</span>. The list of directories used to limit the files that can be opened by PHP. If the file is outside the specified directories, PHP scripts will refuse to open it. To separate directories, use a colon. For example: <span class="notranslate">`/dir/upload:/usr/tmp`</span>.
* <span class="notranslate">`post_max_size`</span>. The maximum size in bytes of data that can be posted with the POST method. Typically, should be larger than <span class="notranslate">`upload_max_filesize`</span> and smaller than <span class="notranslate">`memory_limit`</span>. Use shortcuts for byte values: K (kilo), M (mega), and G (giga). For example, 16M.
* <span class="notranslate">`session.save_path`</span>. The directory where PHP writes session data (files). For example: <span class="notranslate">`/dir/tmp`</span>
* <span class="notranslate">`short_open_tag`</span>. Allows the short form of the PHP open tag.
* <span class="notranslate">`upload_max_filesize`</span>. The maximum size in bytes of an uploaded file. Use shortcuts for byte values: K (kilo), M (mega), and G (giga). For example, 128M.

#### PHP Selector. My Domains tab <Badge text="cPanel" /> <Badge text="CloudLinux Manager 6.0.1-2" />

The <span class="notranslate">_My Domains_</span> tab contains a list of user’s domains to visualize which PHP Selector is used by domain.

![](/images/MyDomainsTab.png)

A user can configure a domain to use CloudLinux OS Shared <span class="notranslate">PHP Selector</span>.

1. Click <span class="notranslate">_Use PHP Selector_</span>
  
![](/images/UsePHPSelector1.png)

2. Set a version in <span class="notranslate">PHP Selector</span>

![](/images/SetVersion.png)

:::tip Note
If `php-fpm` is enabled for a domain the only administrator can set it to <span class="notranslate">_disable_</span>.
:::


### CloudLinux Manager options

You can change CloudLinux Manager settings for a server manually via cPanel/WHM or, if you have many servers, you can change CloudLinux Manager settings for them in the config file.

####  Changing settings manually

* Log in to cPanel, go to WHM, choose CloudLinux OS Shared and click <span class="notranslate">_Options_</span>.
* Change settings.

#### Changing settings in the config file

You can modify the following options in the config file <span class="notranslate">`/var/cpanel/cpanel.config`</span> directly for example via Puppet.

| | |
|-|-|
|<span class="notranslate">`lve_hideextensions`</span>| Hides (when =1) range of php extensions for user in <span class="notranslate"> Select PHP </span> version|
|<span class="notranslate">`lve_hideuserstat  `</span>| Hides (when =1) LVE statistics in <span class="notranslate">cPanel Stats Bar (UI)</span>|
|<span class="notranslate">`lve_showinodeusage`</span>| Displays (when =1) used inodes in cPanel (UI)|
|<span class="notranslate">`lve_hide_selector`</span>| Turns off <span class="notranslate">UI PHP Selector</span> (Select <span class="notranslate">PHP Version</span> option)|
|<span class="notranslate">`lve_enablerubyapp`</span>|Displays (when =1) Ruby Selector in user’s interface (UI)|


:::warning Note
It is not allowed to change <span class="notranslate">`lve_enablepythonapp`</span> option in the config file directly.
:::

You can use <span class="notranslate">`cloudlinux-selector`</span> utility to change <span class="notranslate">`lve_enablepythonapp`</span> option:

<div class="notranslate">

```
cloudlinux-selector set --json --interpreter=python --selector-status=enabled
```
</div>

Or you can change it via <span class="notranslate">WHM -> CloudLinux Manager -> Options -> Python Selector -> Python</span>

After modifying the config files directly, you should execute the following command to apply changes:

<div class="notranslate">

```
/usr/share/l.v.e-manager/utils/dynamicui.py --sync-conf=all
```
</div>


## cPanel LVE Extension

* [Add Package Extension](/lve_manager/#add-package-extension)
* [Edit Package Extensions](/lve_manager/#edit-package-extensions)

:::tip Note
<span class="notranslate">CloudLinux Manager</span> 1.0-9.8+
:::

<span class="notranslate"> cPanel LVE Extension </span> allows to control LVE limits for packages via cPanel hosting packages control interface and via <span class="notranslate"> cPanel WHM API </span> . It simplifies integration with existing billing systems for cPanel (like WHMCS for example).

#### Add Package Extension

To add LVE Settings to standard cPanel package, go to <span class="notranslate">_Packages_</span> | <span class="notranslate">_Add a Package_</span>.

:::tip Note
You can find the information on how to add a package in official cPanel documentation on the link: [https://documentation.cpanel.net/display/ALD/Add+a+Package](https://documentation.cpanel.net/display/ALD/Add+a+Package)
:::

![](/images/lve-extension_01.jpg)


Tick <span class="notranslate">_LVE Settings_</span> in the bottom of the page to open <span class="notranslate">_LVE Settings_</span> form.

![](/images/lve-extension_02.jpg)

You can specify the following options:

:::tip Note
Your changes to <span class="notranslate">_LVE Settings_</span> will appear in the system after a little while.
:::

| | |
|-|-|
|<span class="notranslate">Speed Settings</span> | Maximum CPU usage for an account. Must be in the range 1 - 100 (but obligatory > 0 ) if old format is used; use `%` or <span class="notranslate">`Mhz\Ghz`</span> to set <span class="notranslate">`CPU`</span> limit as speed; Type <span class="notranslate">`DEFAULT`</span> to use default value.|
|<span class="notranslate"> Memory Settings </span> |`Pmem` - Maximum physical memory usage for an account. `Vmem` - Maximum virtual memory usage for an account. Must be a positive number. Postfix allowed only in `KGMT`. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> Max entry proc Settings </span> | Maximum number of entry processes (concurrent connections) for an account. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> Nproc Settings </span> | Maximum number of processes usage for an account. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> IO Settings </span> | Maximum <span class="notranslate">I/O (input/output)</span> usage speed for an account. Is measured in <span class="notranslate">`Kb/s`</span>. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` for unlimited resource.|
|<span class="notranslate"> IOPS Settings </span> | Maximum <span class="notranslate">`IOPS`</span> (input/output operations per second) usage for an account. Must be a positive number. Type <span class="notranslate">`DEFAULT`</span> to use default value. Type `0` to unlimited resource.|

![](/images/lve-extension_03.jpg) 

Click <span class="notranslate">_Add_</span> to apply your changes.

#### Edit Package Extensions

You can edit limits in any convenient for you way - in <span class="notranslate">_Edit a Package_</span> section, in the  <span class="notranslate">CloudLinux Manager </span> or even via WHM API.

<span class="notranslate">**Edit a Package**</span>

To edit package extensions, go to <span class="notranslate"> _Packages_</span> | <span class="notranslate">_Edit a Package_</span>. Choose a package from the <span class="notranslate">_Package_</span> list and click <span class="notranslate">_Edit_</span>.

![](/images/lve-extension_04.jpg)

<span class="notranslate">**CloudLinux Manager**</span>

To edit package extensions, go to <span class="notranslate">CloudLinux Manager</span> | <span class="notranslate">Server Configuration</span> | <span class="notranslate"> CloudLinux OS Shared CloudLinux Manager</span> | <span class="notranslate"> Packages</span> and click pencil (edit) icon.

![](/images/lve-extension_05.jpg)

<span class="notranslate">**WHM API**</span>

To learn how to work with package extensions limits using WHM API, please read the official cPanel documentation: [https://documentation.cpanel.net/display/SDK/Guide+to+Package+Extensions+-+Data+Behavior+and+Changes](https://documentation.cpanel.net/display/SDK/Guide+to+Package+Extensions+-+Data+Behavior+and+Changes)

#### Control panel integration guide

[Here](/control_panel_integration/) you will find the instructions and common techniques used to integrate your software with CloudLinux OS Shared.
