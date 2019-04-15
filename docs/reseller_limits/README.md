# Reseller Limits

## Overview

<span class="notranslate">Reseller limits</span> is a feature that allows hosters to set limits for the resources each reseller can operate with. Hoster also provides controls to the reseller on what resources each reseller’s end user will have. Reseller limits set by a hoster limit the total amount of resources resellers’ end users can consume altogether.

When a hoster has set reseller limits for the particular reseller he provides the reseller with an ability to set limits for his end users within the Reseller Interface.

## Types of Users

Starting from the **version 3.0-18**, <span class="notranslate">LVE Manager</span> operates with four types of users and their resource usage limits.

The types of users are as follows:

* <span class="notranslate">**End User**</span> is a type of user that purchases hosting directly from a hoster and uses it for his own purposes;
* <span class="notranslate">**Reseller**</span> is a type of user that buys hosting from a hoster and resells it to his end users;
* <span class="notranslate">**Reseller’s End User**</span> is a type of user that purchases hosting from a reseller and uses it for his own purposes.
* <span class="notranslate">**Reseller’s End User (no Reseller limit)**</span> is a type of user that purchases hosting from a reseller and uses it for his own purposes but does not have limits set by a reseller. These limits are set by the hoster.

## Types of Limits

See the comparison Table with types of limits.

| |  |  | |
|-|--|--|-|
|**Limits** | **Reseller limits** | **Reseller’s end user limits** | **Hoster’s end user limits**|
|<span class="notranslate"> [SPEED](/limits/#speed-limits) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [PMEM](/limits/#memory-limits) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [IO](/limits/#io) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [IOPS Limits](/limits/#iops) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [EP](/limits/#entry-processes) </span> | Yes | Yes | Yes|
|<span class="notranslate"> [NPROC](/limits/#number-of-processes) </span> | Yes | Yes | Yes|
|<span class="notranslate"> Inodes </span> | Yes (default for all users) | No | Yes|
|<span class="notranslate"> MySQL Limits </span> | Yes (supported only for <span class="notranslate"> MySQL Governor ALL </span> mode) | Yes (supported only for <span class="notranslate"> MySQL Governor ALL </span> mode) | Yes|

### What happens when reseller or reseller's end user hits the limit?

:::tip Note
<span class="notranslate">**Reseller**</span> is a virtual entity. So, he cannot hit the limit. There is reseller's end user with the same name as reseller. This end user is limited as any other reseller's end user. When hoster sets Reseller limits he limits the group of resellers' end users including reseller's end user with the same name as the reseller.
:::

* Reseller's end user can hit reseller limit when end user's limit is bigger than reseller's limit. In such case end user will be limited by reseller limit.
* Reseller limit can be hit when all resellers’ end users in total use as much resources as reseller limit.
* Reseller's end user can hit his limit when end user limit is lower than reseller limit. In such case end user will be limited by his limit.

# Installation and Requirements

## Requirements

:::tip Note
Reseller Limits are only supported in kernel starting with the version **3.10.0-714.10.2.lve1.5.3.el7** for <span class="notranslate"> CloudLinux 7 kernel </span> and **3.10.0-714.10.2.lve1.5.3.el6h** for <span class="notranslate"> CloudLinux 6 Hybrid kernel </span>.
:::

:::tip Note
If you are using CloudLinux 6 kernel you would have to migrate to <span class="notranslate">CloudLinux 6 Hybrid</span> kernel first in order to be able to use new Reseller Limits functionality.
:::

## Installation

Use the detailed instruction below:

1. Install CloudLinux 7 or <span class="notranslate">CloudLinux 6 Hybrid</span> on a new server. Follow the instructions described [here](/cloudlinux_installation/#installing-new-servers). Or you can convert your CentOS 6.x or CentOS 7.x system to CloudLinux 6 or CloudLinux 7 respectively. To do this, follow the instructions described on the [link](/cloudlinux_installation/#converting-existing-servers).
2. If you have installed the CloudLinux 6, please convert it to the <span class="notranslate"> CloudLinux 6 Hybrid Kernel</span>. Follow the instructions described [here](/kernel_settings/#hybrid-kernel).
3. Install <span class="notranslate">LVE Manager</span> with <span class="notranslate">Reseller Limit</span> support or update it up to version 3.0-18 (or later) by running the following commands:

    <div class="notranslate">

    ```
    yum install kernel lve cagefs lvemanager lve-utils lve-stats --disableexcludes=main
    ```
    </div>


    <div class="notranslate">

    ```
    yum update
    ```
    </div>

    <div class="notranslate">

    ```
    reboot
    ```
    </div>

    For <span class="notranslate">CloudLinux 6 Hybrid</span> kernel with <span class="notranslate">Reseller Limit</span> support, please run the following commands:

    <div class="notranslate">

    ```
    yum install kernel lve cagefs lvemanager lve-utils lve-stats --disableexcludes=main
    ```
    </div>

    <div class="notranslate">

    ```
    yum update
    ```
    </div>

    <div class="notranslate">

    ```
    reboot
    ```
    </div>


## How to Enable and Disable Reseller Limits

To start using a new feature <span class="notranslate">**Reseller limits**</span> you would have to enable reseller limits for a particular reseller first.

To enable <span class="notranslate">**Reseller**</span> access, please do the following:

1. Log in with a Hoster access.
2. You can create a new account or give privileges to an existing account.
3. For new account tick a checkbox <span class="notranslate">`Make this account a reseller`</span> in the <span class="notranslate">`Reseller Settings`</span> box.

![](/images/resellersettings.png)

:::tip Note
If checkbox **<span class="notranslate">Make the account own itself</span> (i.e., the user can modify the account)**  is not selected when creating Reseller in cPanel WHM, then user account <span class="notranslate">**Reseller**</span> will belong to root, not to reseller <span class="notranslate">**Reseller**</span>. In such case, the user <span class="notranslate">**Reseller**</span> will be managed by the root. So, LVE limits specified by the root will be applied to the user <span class="notranslate">**Reseller**</span>. User <span class="notranslate">**Reseller**</span> will not be limited by <span class="notranslate">Reseller limits</span>.

When the checkbox is selected, user <span class="notranslate">**Reseller**</span> will be limited by Reseller limits (in addition to personal user limits set by Reseller).
:::

4. Give privileges to the proper Reseller account to make all features work.
5. Go to the <span class="notranslate">_Users_</span> tab and choose a particular reseller you want to enable Reseller limits for and click on the pencil icon.
6. In the pop-up move the slider <span class="notranslate">_Manage Limits_</span>. Click <span class="notranslate">_AGREE_</span> for the question <span class="notranslate">_Are you sure you want to enable limits_</span>, set limits for that reseller if you you want them to be different from the default limits, otherwise default server limits will be applied. Than click the <span class="notranslate">_Save_</span>.

![](/images/hmfile_hash_00664772.png)

    
:::tip Note
Resellers’ end users can use as much resources in total as it is provided for that particular reseller by a hoster. The summary usage of all end users that belong to that particular reseller will not exceed the amount of resources provided to reseller by a hoster. If no Reseller Limits are set, reseller’s end user will be limited by default limits set by a hoster.
:::

## How to Disable Reseller Limits

To disable Reseller limits, please do the following:

1. Go to the <span class="notranslate">_Users_</span> tab, choose a particular reseller and click on the pencil icon.
2. In the pop-up move the slider <span class="notranslate">_Manage Limits_</span>. Click <span class="notranslate">_AGREE_</span> for the question <span class="notranslate">_Are you sure you want to disable limits_</span>. Than click <span class="notranslate">_Save_</span>.

:::tip Note
If you disable Reseller limits everything will work the same as before. All the end user limits set by the reseller will be saved. But all custom default reseller limits will be disabled.
:::

## Hoster Interface

Hoster interface allows to monitor and manage limits for hosters’ end users, resellers and resellers’ end users, and also manage packages and monitor statistics.

Hoster credentials allow to control limits for hosters’ end users and resellers. To control reseller end user limits Hoster has to log in as Reseller.

Log in as Hoster to get access to the following functionality.

* <span class="notranslate">[Current Usage](/reseller_limits/#current-usage)</span> tab allows to monitor users and resellers resource usage at the moment.
* <span class="notranslate">[Users](/reseller_limits/#users)</span> tab with the list of all users and resellers allows viewing and managing all the users and resellers limits.
* <span class="notranslate">[Statistics](/reseller_limits/#statistics)</span> tab displays the statistics of resource usage for particular timeframe or particular user.
* <span class="notranslate">[Options](/reseller_limits/#options)</span> tab allows to set LVE faults email notifications for hoster, users, and resellers.
* <span class="notranslate">[Packages](/reseller_limits/#packages)</span> tab allows to manage resellers packages limits;
* <span class="notranslate">[Selector](/reseller_limits/#selector)</span> tab allows to control <span class="notranslate">PHP Selector</span> settings.

<div class="notranslate">

## Current Usage

</div>

Choose <span class="notranslate">Current Usage</span> tab to monitor users, resellers and resellers’ end users resource usage at the moment displayed in the table.

<span class="notranslate">Current Usage</span> table provides information on usage of the following:
* <span class="notranslate"> SPEED (All</span> and MySQL)
* <span class="notranslate"> memory (MEM)</span>
* data throughput (<span class="notranslate">IO) (All</span> and MySQL)
* read/write operations per second (<span class="notranslate">IOPS</span>)
* number of processes (<span class="notranslate">PNO</span>)
* entry processes (<span class="notranslate">EP</span>)

Resource usage values are being refreshed every 10 seconds by default which is set in <span class="notranslate">_Auto-refresh_</span> field. You can set <span class="notranslate">_Auto-refresh time_</span> by choosing a value from the drop-down.

You can refresh the table manually by clicking <span class="notranslate">_Refresh now_</span> or you can freeze the values by clicking <span class="notranslate">_pause_</span>. Usage values will not change until the next manual refresh. To unfreeze click <span class="notranslate">_unpause_</span>. The countdown will continue.

Tick <span class="notranslate">_Hide MySQL usage_</span> to hide the information on MySQL usage.

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

In the drop-down <span class="notranslate">_Show top_</span> you can choose the number of user to be displayed on the page.

![](/images/currentusagetabhoster_zoom60.png)

<div class="notranslate">

## Users

</div>

Choose <span class="notranslate">_Users_</span> tab to view the list of all users and manage their limits.

To filter the list by user type click <span class="notranslate">_Manage_</span> and in the drop-down choose:

* <span class="notranslate">End users</span> - to manage hosts end users only.
* <span class="notranslate">Resellers</span> - to manage resellers only.
* <span class="notranslate">Reseller’s end users</span> - to manage resellers’ end users only.
* <span class="notranslate">Reseller’s end users (no Reseller limits)</span> - to manage resellers’ end users that do not have limits specified by reseller (these limits are specified by the hoster).

To filter the list by <span class="notranslate">_Username_, _Domain_, _LveID_</span> click <span class="notranslate">_Filter by_</span> and choose the value in the drop-down.

:::tip Note
A hoster can view the list of resellers’ end users and their limits, but can not manage resellers’ end users limits (if those are set by reseller).
:::

A hoster can view the limits of all types of users and manage the limits for hosters’ end users and resellers’ end users (only those with Reseller Limits disabled).
* Tick <span class="notranslate">_Show users with CageFS enabled_</span> to show users with CageFS file system enabled.
* Tick <span class="notranslate">_Show only ignored users_</span> to show users with ignored <span class="notranslate">MySQL Governor</span>.

![](/images/userstabhoster_zoom70.png)

<div class="notrnslate">

### Actions

</div>

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

<div class="notranslate">

## Statistics

</div>

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

<div class="notranslate">

## Options

</div>

A hoster can set email notifications for panel administrator, reseller customer, and resellers’ customers in cases of limits faults. Choose <span class="notranslate">_Options_</span> tab to manage LVE Faults email notifications.

In <span class="notranslate">_LVE Faults Email Notifications_</span> section tick the required checkboxes to set a type of notification.

* <span class="notranslate"> _Notify Panel Administrator_ </span> - notify hoster when his end users have exceeded minimum number of faults set for particular limits.
* <span class="notranslate"> _Notify Reseller_ </span> - notify reseller when his end users have exceeded minimum number of faults set for particular limits.
* <span class="notranslate"> _Notify Customers_ </span> - notify hosters’ end users when they have exceeded limits.
* <span class="notranslate"> _Notify Reseller's customers_ </span> - notify resellers’ end users when they have exceeded limits.

![](/images/optionstabemailnotifhoster.png)

In <span class="notranslate">_Faults to include_</span> section tick the checkboxes to include required limits to the notifications.
Set the frequency of email notifications sending in <span class="notranslate">_Notify …. every.. days/hours/minutes/seconds_</span> section.

![](/images/optionshosterfaultstoinclude.png)

In <span class="notranslate">_Minimum number of Faults to notify_</span> section enter the number of faults required for the notification to be sent for <span class="notranslate">_Panel Admin & Reseller_</span> and <span class="notranslate">_User_</span>.

![](/images/optionstabhosterminimumftn.png)

* In <span class="notranslate">_Inodes limits_</span> section you can reset inode limits to default values and tick <span class="notranslate">_Show end-user inode usage_</span>.
* In <span class="notranslate">_User interface settings_</span> section tick the required checkboxes to apply user interface settings.
* In <span class="notranslate">_MySQL Governor settings_</span> section you can customize <span class="notranslate"> MySQL Governor</span>.

![](/images/optionstabhosterinodes.png)

<div class="notranslate">

## Packages

</div>

<span class="notranslate">_Packages_</span> tab allows to set the limits for as many users as you need by editing packages of the limits. Each account belonging to a particular package adheres to those limits.

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

<div class="notranslate">

## Selector

</div>

<span class="notranslate">_Selector_</span> tab allows to control <span class="notranslate">PHP Selector</span> settings.

* In <span class="notranslate">_Selector is_</span> choose <span class="notranslate">_Enabled_</span> or <span class="notranslate">_Disabled_</span> from the drop-down to enable or disable <span class="notranslate">PHP Selector</span>.

* In <span class="notranslate">_Default PHP version_</span> choose PHP version or <span class="notranslate">_Native_</span> from the drop-down to apply.

* In <span class="notranslate">_Supported versions_</span> choose required PHP versions to support.

Choose default modules from the list for a particular version of PHP or for <span class="notranslate">native</span>.

![](/images/selector01_zoom70.png)

![](/images/selector02_zoom70.png)


## Reseller Interface

Reseller interface is designed to manage limits for resellers’ end users, to monitor statistics and the history of resource usage and to modify reseller’s end user packages limits.

Log in under a particular reseller credentials to have access to the following functionality:

[ ](/reseller_limits/#current-usage) <span class="notranslate"> [Current Usage](/reseller_limits/#current-usage) </span> tab - allows to monitor resellers’ end users resource usage at the moment;
[ ](/reseller_limits/#historical-usage) <span class="notranslate"> [Historical Usage](/reseller_limits/#historical-usage) </span> tab - allows to control resellers’ end users resource usage history;
[ ](/reseller_limits/#users) <span class="notranslate"> [Users](/reseller_limits/#users) </span> tab with the list of all resellers’ end users allows to view and manage all the reseller’s end user limits;
[ ](/reseller_limits/#statistics) <span class="notranslate"> [Statistics](/reseller_limits/#statistics) </span> tab displays the statistics of resource usage for particular timeframe or particular reseller's end user;
[ ](/reseller_limits/#options) <span class="notranslate"> [Options](/reseller_limits/#options) </span> tab allows to set LVE Faults email notifications.
[ ](/reseller_limits/#packages) <span class="notranslate"> [Packages](/reseller_limits/#packages) </span> tab allows to manage reseller’s end user packages limits.

Please note that reseller can manage all his end users via Reseller Interface. Reseller cannot manage <span class="notranslate"> INODE </span> or <span class="notranslate"> MYSQL </span> limits, neither his own nor for his users.


### Current Usage


Current usage table provides the information on the usage of <span class="notranslate"> SPEED (All), memory (MEM), data throughput (IO) (All) </span> , read/write operations per second (IOPS), number of processes (PNO), and entry processes (EP).
Resource usage data is being refreshed every 10 seconds which is set by default in <span class="notranslate"> _Auto-refresh_ </span> field. You can set <span class="notranslate"> _Auto-refresh time_ </span> by choosing the value from the drop-down. You can refresh the table manually by clicking <span class="notranslate"> _Refresh now_ </span> or you can freeze the values by clicking <span class="notranslate"> _pause_ </span> button. Usage values will not change until the next manual refresh. To unfreeze click on <span class="notranslate"> _unpause_ </span> button. The countdown will continue.

Reseller cannot manage INODE or MYSQL limits. Neither his own, nor for his users.

The bottom line star in the table displays the total reseller resource usage. It means, that all the usage of resellers’ end users and of his own is displayed as a summary for each parameter.
![](/images/currentusagetabresellerr_zoom70.png)



### Historical Usage


Choose <span class="notranslate"> _Historical Usage_ </span> tab to view reseller and resellers’ end users resource usage history and faults. The list of users can be filtered by <span class="notranslate"> _Timeframe_ </span> .

When reseller’s end user reaches the limits set by hoster for the reseller, this will be displayed on the chart. Please note, that in this case reseller’s end user would not necessarily reaches his limits set by the reseller. These faults are not displayed on the chart.

On the <span class="notranslate"> _Historical Usage_ </span> page the reseller is also able to see the list of <span class="notranslate"> _Top 5 Reseller’s end users_ </span> (based on resource usage, for the same period as charts/overall usage). Click on a <span class="notranslate"> _History_ </span> icon in the <span class="notranslate"> _Actions_ </span> column to view resource usage statistics for particular user.

Click on <span class="notranslate"> _LVE Statistics_ </span> link in the top of the <span class="notranslate"> Top 5 </span> list to go to the _ _ <span class="notranslate"> Statistics </span> page to view or manage the rest of users.

![](/images/historicalusageresellertab_zoom70.png)


### Users


Choose <span class="notranslate"> _Users_ </span> tab to view and manage the list of all resellers’ end users and resource usage limits provided for them. The following limits are available for the resellers’ end users: <span class="notranslate"> SPEED, PMEM, IO, IOPS, EP, NPROC </span> .

You can filter the list by <span class="notranslate"> _Username_ ,  _Domain_ ,  _LVE ID_ . </span> Tick <span class="notranslate"> _Show only ignored users_ </span> checkbox to display only users with <span class="notranslate"> MySQL Governor </span> disabled.

![](/images/userstabreseller_zoom70.png)




Click on a pencil icon in <span class="notranslate"> _Actions_ </span> column to edit limits for a particular user. The following actions are available:

Click <span class="notranslate"> Reset </span> to reset limits to default values.
Click <span class="notranslate"> Apply </span> for <span class="notranslate"> Do not limit </span> to set unlimited resources to a user.
Set values for <span class="notranslate"> SPEED, PMEM, IO, IOPS, EP </span> , and NPROC and click <span class="notranslate"> _Save_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close the window.

![](/images/userstabpopup_zoom70.png)





### Statistics


Choose _Statistics_ tab to view resource usage limits statistics.

<span class="notranslate"> Statistics </span> table can be filtered by <span class="notranslate"> _Timeframe_ ,  _Limit_ ,  _Top LVEs_ ,  _LVE approaching limit_ ,  _Fault LVE_ </span> .

The following parameters are displayed:

 <span class="notranslate"> SPEED </span> per user;
 <span class="notranslate"> PMEM </span> usage per user;
 <span class="notranslate"> IO </span> usage per user;
 <span class="notranslate"> EP </span> usage per user;
 <span class="notranslate"> NPROC </span> usage per user;
 <span class="notranslate"> IOPS </span> usage per user.

![](/images/statisticstabreseller_zoom70.png)


Use _Charts_ icon in the _View_ column to view detailed resource usage charts for a particular period of time.

For example, 7 days period chart.

![](/images/sevendayschartresellers_zoom70.png)



### Options


Choose <span class="notranslate"> _Options_ </span> tab to set user email notifications for resellers’ end users.

In <span class="notranslate"> _LVE Faults email notifications_ </span> section tick appropriate checkboxes to set the required type of notification.

![](/images/optionsresellernotify_zoom70.png)


<span class="notranslate"> _Notify me on users faults_ </span> - notify reseller when his users have exceeded limits.
<span class="notranslate"> _Notify Customers_ </span> - notify resellers’ end users when they have exceeded limits.
<span class="notranslate"> _Notify me when I hit my limits_ </span> - notify reseller when overall resource usage limits are reached.

In <span class="notranslate"> _Faults to include_ </span> section tick checkboxes to include particular limits to email notifications.

![](/images/options02_zoom70.png)

In <span class="notranslate"> _Minimum number of Faults to notify_ </span> section enter the number of faults required for the notification to be sent for reseller and customer. You can also set the reseller notification frequency.

Set the frequency of sending the reseller email notifications in <span class="notranslate"> _Notify Reseller Every ... days/hours/minutes/seconds_ </span> section.

![](/images/options03_zoom70.png)

Click _Save Changes_ to apply changes.

### Packages


Choose <span class="notranslate"> _Packages_ </span> tab to view and modify limits for reseller’s packages.

![](/images/packagesreseller_zoom70.png)

Click on a pencil icon in a package row to set the following limits for a package:

 <span class="notranslate"> SPEED </span> limit;
 <span class="notranslate"> Physical memory (PMEM) </span> (can be set as unlimited by setting 0);
 <span class="notranslate"> I/O </span> limits;
 <span class="notranslate"> IOPS </span> limits;
 <span class="notranslate"> Concurrent connections (EP) </span> limits.

When limits are set click <span class="notranslate"> _Save_ </span> to apply changes.

