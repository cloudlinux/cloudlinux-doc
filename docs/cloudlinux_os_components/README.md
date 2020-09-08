#  CloudLinux OS components

* [Reseller limits](/cloudlinux_os_components/#reseller-limits)
* [LVE-Stats 2](/cloudlinux_os_components/#lve-stats-2)
* [CageFS](/cloudlinux_os_components/#cagefs)
* [MySQL Governor](/cloudlinux_os_components/#mysql-governor)
* [PHP Selector](/cloudlinux_os_components/#php-selector)
* [Python Selector](/cloudlinux_os_components/#python-selector)
* [Ruby Selector](/cloudlinux_os_components/#ruby-selector)
* [Node.js Selector](/cloudlinux_os_components/#node-js-selector)
* [Apache mod_lsapi PRO](/cloudlinux_os_components/#apache-mod-lsapi-pro)
* [Additional integration components](/cloudlinux_os_components/#additional-integration-components)
* [Apache suexec module](/cloudlinux_os_components/#apache-suexec-module)

## Reseller limits

See also [Reseller limits UI](/lve_manager/#reseller-interface).

### General information and requirements

* [Types of Users](/cloudlinux_os_components/#types-of-users)
* [Types of Limits](/cloudlinux_os_components/#types-of-limits)
* [What happens when reseller or reseller's end user hits the limit?](/cloudlinux_os_components/#what-happens-when-reseller-or-reseller-s-end-user-hits-the-limit)
* [Requirements](/cloudlinux_os_components/#requirements)

<span class="notranslate">Reseller limits</span> is a feature that allows hosters to set limits for the resources each reseller can operate with. Hoster also provides controls to the reseller on what resources each reseller’s end user will have. Reseller limits set by a hoster limit the total amount of resources resellers’ end users can consume altogether.

When a hoster has set reseller limits for the particular reseller he provides the reseller with an ability to set limits for his end users within the Reseller Interface.

#### Types of Users

Starting from the **version 3.0-18**, <span class="notranslate">LVE Manager</span> operates with four types of users and their resource usage limits.

The types of users are as follows:

* <span class="notranslate">**End User**</span> is a type of user that purchases hosting directly from a hoster and uses it for his own purposes;
* <span class="notranslate">**Reseller**</span> is a type of user that buys hosting from a hoster and resells it to his end users;
* <span class="notranslate">**Reseller’s End User**</span> is a type of user that purchases hosting from a reseller and uses it for his own purposes.
* <span class="notranslate">**Reseller’s End User (no Reseller limit)**</span> is a type of user that purchases hosting from a reseller and uses it for his own purposes but does not have limits set by a reseller. These limits are set by the hoster.

#### Types of Limits

See the comparison Table with types of limits.

| |  |  | |
|-|--|--|-|
|**Limits** | **Reseller limits** | **Reseller’s end user limits** | **Hoster’s end user limits**|
|<span class="notranslate">[SPEED](/limits/#speed-limit)</span>| Yes | Yes | Yes|
|<span class="notranslate">[PMEM](/limits/#physical-memory-limit)</span>| Yes | Yes | Yes|
|<span class="notranslate">[IO](/limits/#io)</span>| Yes | Yes | Yes|
|<span class="notranslate">[IOPS](/limits/#iops)</span>| Yes | Yes | Yes|
|<span class="notranslate">[EP](/limits/#entry-processes)</span>| Yes | Yes | Yes|
|<span class="notranslate">[NPROC](/limits/#number-of-processes)</span>| Yes | Yes | Yes|
|<span class="notranslate">[Inodes](/limits/#inodes) </span> | Yes (default for all users) | No | Yes|
|<span class="notranslate">[MySQL Limits](/cloudlinux_os_components/#mysql-governor) </span> | Yes (supported only for <span class="notranslate"> MySQL Governor ALL </span> mode) | Yes (supported only for <span class="notranslate"> MySQL Governor ALL </span> mode) | Yes|

#### What happens when reseller or reseller's end user hits the limit?

:::tip Note
<span class="notranslate">**Reseller**</span> is a virtual entity. So, he cannot hit the limit. There is reseller's end user with the same name as reseller. This end user is limited as any other reseller's end user. When hoster sets Reseller limits he limits the group of resellers' end users including reseller's end user with the same name as the reseller.
:::

* Reseller's end user can hit reseller limit when end user's limit is bigger than reseller's limit. In such case end user will be limited by reseller limit.
* Reseller limit can be hit when all resellers’ end users in total use as much resources as reseller limit.
* Reseller's end user can hit his limit when end user limit is lower than reseller limit. In such case end user will be limited by his limit.

#### Requirements

:::tip Note
Reseller Limits are only supported in kernel starting with the version **3.10.0-714.10.2.lve1.5.3.el7** for <span class="notranslate"> CloudLinux 7 kernel </span> and **3.10.0-714.10.2.lve1.5.3.el6h** for <span class="notranslate"> CloudLinux 6 Hybrid kernel </span>.
:::

:::tip Note
In case you wish to use the new Reseller limits features and you use CloudLinux 6 kernel, you have to migrate to <span class="notranslate">CloudLinux 6 Hybrid</span> kernel first.
:::

### Installation, enabling, and disabling

Use the detailed instruction below:

1. Install CloudLinux 7 or <span class="notranslate">CloudLinux 6 Hybrid</span> on a new server. Follow the instructions described [here](/cloudlinux_installation/#installing-new-servers). Or you can convert your CentOS 6.x or CentOS 7.x system to CloudLinux 6 or CloudLinux 7 respectively. To do this, follow the instructions described on the [link](/cloudlinux_installation/#converting-existing-servers).
2. If you have installed the CloudLinux 6, please convert it to the <span class="notranslate"> CloudLinux 6 Hybrid Kernel</span>. Follow the instructions described [here](/cloudlinux_os_kernel/#hybrid-kernels).
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


:::tip Note
When you move a user from one reseller to another on DirectAdmin, the LVE Manager's Reset function does not consider package limits of the end-user and reset them to defaults.
To solve this, you can do one of the following:
1. Change a package to one of Reseller's package for the moved users.
2. Create a package with the same name and limits for the Reseller with the moved users.
:::


### How to enable and disable Reseller limits

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

### How to disable Reseller limits

To disable Reseller limits, please do the following:

1. Go to the <span class="notranslate">_Users_</span> tab, choose a particular reseller and click on the pencil icon.
2. In the pop-up move the slider <span class="notranslate">_Manage Limits_</span>. Click <span class="notranslate">_AGREE_</span> for the question <span class="notranslate">_Are you sure you want to disable limits_</span>. Than click <span class="notranslate">_Save_</span>.

:::tip Note
If you disable Reseller limits everything will work the same as before. All the end user limits set by the reseller will be saved. But all custom default reseller limits will be disabled.
:::

See also [Reseller limits UI](/lve_manager/#reseller-interface).

## LVE-Stats 2
### General information and requirements

* [Why is it needed?](/cloudlinux_os_components/#why-is-it-needed)
* [Major improvements and features](/cloudlinux_os_components/#major-improvements-and-features)
* [What features will be implemented in the future?](/cloudlinux_os_components/#what-features-will-be-implemented-in-the-future)

#### Why is it needed?

* Old LVE-statistics store averages as integer numbers, as % of <span class="notranslate">CPU</span> usage. If user used 100% of <span class="notranslate">CPU</span> for 1 second within an hour, it is only 1-2% for a minute, and 0 for 5 minutes. Data in old LVE-statistics is aggregated to 1-hour intervals. So, such peak load will noExat be recorded and we need to store data with much higher precision.
* 100% <span class="notranslate">CPU</span> usage in old lve statistics means “all cores”. On 32 core servers usage is not visible for most users (as they are limited to 1 core).
* Old LVE-statistics does not provide a way to determine a cause of LVE faults, i.e. what processes are running when user hits LVE limits.Example
* Notifications in old LVE-statistics are not accurate because they are based on average values for <span class="notranslate">CPU, IO, IOPS.</span>
* Old LVE-statistics functionality is hard to extend.

#### Major improvements and features

* increased precision of statistics;
* <span class="notranslate">CPU</span> usage is calculated  in terms of % of a single core (100% usage means one core);
* lvestats-server emulates and tracks faults for <span class="notranslate">CPU, IO, IOPS</span>;
* lvestats-server saves “snapshots” of user’s processes and queries for each “incident” - added new lve-read-snapshot utility;
* improved notifications about hitting LVE limits (more informative and without false positives);
* implemented ability to add custom plugins;
* MySQL and <span class="notranslate">PostGreSQL</span> support;
* more pretty, scalable, interactive charts;
* snapshots include HTTP-requests.

:::tip Note
[`mod_proctitle`](/cloudlinux_os_components/#mod-proctitle) has to be enabled for HTTP request collection to be available
:::

#### What features will be implemented in the future?

* Notifications for control panels other than CPanel.
* Burstable Limits/server health: We are monitoring server health ( <span class="notranslate"> LA </span> , <span class="notranslate"> memory </span> , idle <span class="notranslate"> CPU </span> ) and automatically decreasing/increasing limits based on server health.
* <span class="notranslate">Reseller Limits</span>: plugin would analyze usage per group of users (reseller’s usage), and do actions.
* Suspend/notify plugin: would detect that user is being throttled for 10 minutes, and suspend him (just because), or notify, or increase limits.

### Installation and update

* [Downgrade](/cloudlinux_os_components/#downgrade)

To install, please execute:

<div class="notranslate">

```
yum install lve-stats
```
</div>

To update:

<div class="notranslate">

```
yum update lve-stats
```
</div>

Settings of old <span class="notranslate">lve-stats</span> (ver. 0.x) are imported automatically on the first install/update of a new <span class="notranslate">lve-stats</span> package.

SQLite database file is located in <span class="notranslate">`/var/lve/lvestats2.db`</span>, data from old <span class="notranslate">lve-stats</span> (ver. 0.x) are being migrated automatically in the background. Migrating process can last 2-8 hours (during this time lags are possible when admin is trying to check statistics, at the same time users will not be affected). Migrating the latest 30 days, <span class="notranslate">SQLite DB</span> stable migration is provided.

Currently, the new <span class="notranslate">lve-stats</span> supports all databases available in CloudLinux.

:::tip Note
You can also use [LVE-stats 2 CLI](/command-line_tools/#lve-stats-2)
:::

#### Downgrade

If you have any problems after update, downgrade <span class="notranslate">lve-stats2</span> to the previous stable version by running:

<div class="notranslate">

```
yum downgrade lve-stats
```
</div>

and contact CloudLinux support at [https://cloudlinux.zendesk.com/hc/requests/new](https://cloudlinux.zendesk.com/hc/en-us/requests/new)

:::tip Note
You may need to rename `*.rpmsave` files to original ones in order to restore settings for old <span class="notranslate">lve-stats (`/etc/sysconfig/lvestats`, `/etc/sysconfig/cloudlinux-notify`</span>).
:::

:::tip Note
You can also use [LVE-stats 2 CLI](/command-line_tools/#lve-stats-2)
:::

### Configuration

The main configuration file <span class="notranslate">`/etc/sysconfig/lvestats2`</span> contains the following options:

* <span class="notranslate">`db_type`</span> - selects appropriate database type to use;
* <span class="notranslate">`connect-string`</span> - connection string for <span class="notranslate">PostGreSQL</span> and MySQL database, has the following form:
  
  <div class="notranslate">

  ```
  connect_string = USER:PASSWORD@HOST[:PORT]/DATABASE
  ```
  </div>

  Default port is used for specific database, if port is not specified (typical port is 3306 for MySQL and 5432 for <span class="notranslate">PostGreSQL</span>). Connection string is not used for sqlite database.

* <span class="notranslate">`server_id`</span> - sets the name of the server (at most 10 characters). This option is to use with centralized database ( <span class="notranslate">PostGreSQL</span> or MySQL). For use with sqlite database, value of this option should be "localhost" (without quotes).
* <span class="notranslate">`plugins`</span> – path to directory containing custom plugins for <span class="notranslate">lve-stats</span> (default path <span class="notranslate">`/usr/share/lve-stats/plugins`</span>).
* <span class="notranslate">`db_timeout`</span> - period of time to write data to database (in seconds); default value is 60 seconds.
* <span class="notranslate">`timeout`</span> - timeout for custom plugins (seconds). If plugin execution does not finish within this period, plugin is terminated. Default value is 5 seconds.
* <span class="notranslate">`interval`</span> - duration of one cycle of <span class="notranslate">lvestats-server</span> (seconds). This should be less than total duration of execution of all plugins. Default value is 5 seconds. Increasing this parameter makes precision of statistics worse.
* <span class="notranslate">`keep_history_days`</span> - period of time (in days) to keep history in database. Old data is removed from database automatically. Default value is 60 days.
* <span class="notranslate">`mode`</span> – sets compatibility output mode (compatibility with older lveinfo version
  * Value `v1` enables compatibility with old version of <span class="notranslate">lveinfo</span>.
  * Value `v2` enables <span class="notranslate">`extended`</span> output mode, but can break LVE plugins for control panels (statistics in <span class="notranslate">LVE Manager</span>, <span class="notranslate">Resource Usage</span>, etc). Support of `v2` mode will be added to LVE plugins in the recent future. When mode parameter is absent, later version of <span class="notranslate">lveinfo</span> is implied.
* <span class="notranslate">`disable_snapshots`</span> - disable snapshots and incidents.
  Possible values:
    * <span class="notranslate">`true`</span>
    * <span class="notranslate">`false`</span>
* <span class="notranslate">`hide_lve_more_than_maxuid`</span> - disable displaying of lve ids more than max uid in resource usage.
  Possible values:
    * <span class="notranslate">`true`</span>
    * <span class="notranslate">`false`</span>

Configuration files for plugins are located in <span class="notranslate">`/etc/sysconfig/lvestats.config`</span> directory.

<span class="notranslate">`/etc/sysconfig/lvestats.config/SnapshotSaver.cfg`</span> contains the following options:

* <span class="notranslate">`period_between_incidents`</span> - the minimal interval of time between incidents (in seconds). If minimal interval of time between LVE faults is greater than value specified, than new "incident" will begin and new snapshots will be saved. Default value is 300 seconds.
* <span class="notranslate">`snapshots_per_minute`</span> - the maximum number of snapshots saved per minute for specific LVE id (default is `2`).
* <span class="notranslate">`max_snapshots_per_incident`</span> - the maximum number of snapshots saved for one "incident". Default is `10`.
* <span class="notranslate">`litespeed`</span> - enable or disable data import from LiteSpeed, default is `auto` (autodetect); `On`|`on`|`1` - force use litespeed; `Off`|`off`|`0` - force use apache

<span class="notranslate">`/etc/sysconfig/lvestats.config/StatsNotifier.cfg`</span> contains the following options:

* <span class="notranslate">`NOTIFY_ADMIN`</span> – enables notification for admin (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_RESELLER`</span> – enables notification for reseller (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_CUSTOMER`</span> - enables notification for customers (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_INCLUDE_RESELLER_CUSTOMER`</span> – `Y`=notify all users, `N`=notify only hoster's users (whos reseller is root), default = `N`;
* <span class="notranslate">`NOTIFY_CPU`</span> – notify about <span class="notranslate">CPU</span> faults when customer hits 100% of his <span class="notranslate">CPU</span> limit (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_IO`</span> - notify about <span class="notranslate">IO</span> faults when customer hits 100% of his <span class="notranslate">IO</span> limit (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_IOPS`</span> - notify about <span class="notranslate">IOPS</span> faults when customer hits 100% of his <span class="notranslate">IOPS</span> limit (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_MEMORY`</span> - notify about memory faults (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_EP`</span> – notify about entry processes faults (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_NPROC`</span> – notify about number of processes faults (<span class="notranslate">`Y/N`</span>, default `N`);
* <span class="notranslate">`NOTIFY_MIN_FAULTS_ADMIN`</span> – minimum number of faults to notify admin (default `1`);
* <span class="notranslate">`NOTIFY_MIN_FAULTS_USER`</span> – minimum number of faults to notify customer (default `1`);
* <span class="notranslate">`NOTIFY_INTERVAL_ADMIN`</span> – period of time to notify admin (default `12h`);
* <span class="notranslate">`NOTIFY_INTERVAL_USER`</span> – period of time to notify customer (default `12h`);
* <span class="notranslate">`NOTIFY_FROM_EMAIL`</span> - sender email address. For example: <span class="notranslate">`NOTIFY_FROM_EMAIL=main_admin@host.com`;</span>
* <span class="notranslate">`NOTIFY_FROM_SUBJECT`</span> - email message subject. For example: <span class="notranslate">`NOTIFY_FROM_SUBJECT=Message from notifier`</span>
* <span class="notranslate">`REPORT_ADMIN_EMAIL`</span> - custom email for admin reporting. For example: <span class="notranslate">`REPORT_ADMIN_EMAIL=report_email@host.com`</span>
* <span class="notranslate">`NOTIFY_CHARSET_EMAIL`</span> – charset type for email. Available for <span class="notranslate">__lve-stats-2.9.4-1__</span> and later. Default is <span class="notranslate">`us-ascii`</span>. For example: <span class="notranslate">`NOTIFY_CHARSET_EMAIL=utf-8`</span>

These values can also be set using [cloudlinux-config CLI](/command-line_tools/#cloudlinux-config) utility

Templates of notifications are located here:

* <span class="notranslate">`/usr/share/lve/emails/en_US/admin_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/reseller_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/user_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/admin_notify.html`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/reseller_notify.html`</span>

:::tip Note
Notifications about LVE faults are implemented for CPanel, Plesk, and DirectAdmin.
:::

After changing any options above, please restart <span class="notranslate">lvestats</span> service:

<div class="notranslate">

```
service lvestats restart
```
</div>

<span class="notranslate">`/etc/logrotate.d/lvestats`</span> - configuration file for <span class="notranslate">`/var/log/lve-stats.log rotation`</span>

:::tip Note
You can also use [LVE-stats 2 CLI](/command-line_tools/#lve-stats-2)
:::

### LVE-stats2 and DB servers compatible work setup

* [LVE-stats2 and MySQL DB server compatible work setup](/cloudlinux_os_components/#lve-stats2-and-mysql-db-server-compatible-work-setup)
* [LVE-stats2 and PostgreSQL DB server compatible work setup](/cloudlinux_os_components/#lve-stats2-and-postgresql-db-server-compatible-work-setup)
* [Customize LVE-stats2 notifications](/cloudlinux_os_components/#customize-lve-stats2-notifications)

#### LVE-stats2 and MySQL DB server compatible work setup

:::tip Note
Run all the commands below under root.
:::

**1. MySQL server setup**

If MySQL Server is not installed, then install it according to control panel documentation.

For non-panel system:

* CloudLinux 6
  
  <div class="notranslate">

  ```
  yum install mysql mysql-server
  service mysqld start
  chkconfig mysqld on
  ```
  </div>

* CloudLinux 7
  
  <div class="notranslate">

  ```
  yum install mariadb mariadb-server
  systemctl start mariadb.service
  systemctl enable mariadb.service
  ```
  </div>


**2. Database setup**

* Run MySQL administrative utility: <span class="notranslate">`mysql`</span>.
* In utility run the commands:

  * creating server DB. Also, check **_Note_** below.

  <div class="notranslate">

  ```
  CREATE DATABASE db_lvestats2;
  ```
  </div>

  * creating a user for <span class="notranslate">LVE Stats 2</span> server to work under. Also, check **_Note_** below.

  <div class="notranslate">

  ```
  CREATE USER 'lvestats2'@'localhost' IDENTIFIED BY 'lvestats2_passwd';
  ```
  </div>

  * granting all the privileges for all DB tables to the user. Use the username and DB name from the points above.

  <div class="notranslate">

  ```
  GRANT ALL PRIVILEGES ON db_lvestats2.* TO 'lvestats2'@'localhost';
  ```
  </div>

  * refreshing privileges information.

  <div class="notranslate">

  ```
  FLUSH PRIVILEGES;
  ```
  </div>

  * Exit administrative utility <span class="notranslate">`(Ctrl+d)`</span>.

:::tip Note
DB name, username and their passwords above are given for an example - you can use any of your choices. Using old DB from <span class="notranslate">LVE Stats</span> version 1 is also acceptable as <span class="notranslate">LVE Stats2</span> uses different tables and the old information will not be corrupted.
:::

**3.** <span class="notranslate">**LVE-stats2**</span> **setup**

* Stop <span class="notranslate">LVE Stats 2</span> server by running the command:

<div class="notranslate">

```
service lvestats stop
```
</div>

* In server configuration file <span class="notranslate">`/etc/sysconfig/lvestats2`</span>, edit the following options:
  * <span class="notranslate">`db_type = mysql`</span>
  * <span class="notranslate">`connect_string = lvestats2:lvestats2_passwd@localhost/db_lvestats2`</span>

:::tip Note
<span class="notranslate">`connect_string`</span> option value is used in format: <span class="notranslate">`user:pass@host/database`</span>.
Username, password and DB name must be the same as in point 2 of Database Setup above.
:::

* After making changes in configuration files run:

<div class="notranslate">

```
/usr/sbin/lve-create-db 
```
</div>

  For DB primary initialization (creating tables, indexes, etc). There is no need to create anything in the DB manually.

* When done, restart server by running:
  
<div class="notranslate">

```
service lvestats restart
```
</div>


**4. Additional security settings**

If you need to provide access to <span class="notranslate">LVE Stats</span> information utilities (<span class="notranslate">`lveinfo`, `lvechart`, `lve-read-snapshot`</span>) for different users, then we recommend creating one more DB user with read-only privilege to guarantee information security. It can be done by running the following commands in administrative utility:

* creating a user (check **_Note_** above)

<div class="notranslate"> </span>

```
CREATE USER 'lvestats2_read'@'localhost' IDENTIFIED BY 'lvestats2_read_passwd';
```
</div>

* granting read-only privilege to the user
  
<div class="notranslate">

```
GRANT SELECT ON db_lvestats2.* TO 'lvestats2_read'@'localhost';
```
</div>

* refreshing privileges information

<div class="notranslate">

```
FLUSH PRIVILEGES;
```
</div>

If <span class="notranslate">LVE Stats2</span> server is set correctly (see information below), the information utilities will work under this user.

If you need to provide access to information utilities to other users, then in order to guarantee information security you should do the following:

* Assign permission 600 to the main configuration file (<span class="notranslate">`/etc/sysconfig/lvestats2`</span>), so that it could be read only by <span class="notranslate">LVE Stats 2</span> server and by utilities that run under root.
* Copy <span class="notranslate">`/etc/sysconfig/lvestats2`</span> to <span class="notranslate">`/etc/sysconfig/lvestats2.readonly`</span>, assign permission 644 to the new file, so that it could be read by any user but could only be changed by root.
* In <span class="notranslate">`/etc/sysconfig/lvestats2.readonly`</span> file, in the line <span class="notranslate">`connect_string`</span>, specify DB user with read-only permission, created above.

These steps allow hiding main DB user username/password from other system users.

If there is no need in such access differentiation, then <span class="notranslate">`/etc/sysconfig/lvestats2`</span> file access permission should be 644, so that it could be read by all users and could be changed only by root.


**5. Using special characters in database password**

Since scheme <span class="notranslate">`://user:password@host[:port]/database_name`</span> [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) is used in <span class="notranslate">`connect_string`</span> config option, then usage of special characters in user DB password is not allowed.

To use special symbols in the password, it must be converted to [escape-sequence](https://en.wikipedia.org/wiki/Percent-encoding). You can convert a password to escape-sequence in a console as follows:

<div class="notranslate">

```
echo -n '[You_P@$$]:' | perl -MURI::Escape -ne 'print uri_escape($_)."\n"'
%5BYou_P%40%24%24%5D%3A
```
</div>

Or replace the symbols manually:

<div class="notranslate">

```
!    #    $    &    '    (    )    *    +    ,    /    :    ;    =    ?    @   [    ]
%21  %23  %24  %26  %27  %28  %29  %2A  %2B  %2C  %2F  %3A  %3B  %3D  %3F  %40  %5B %5D
```
</div>

After that <span class="notranslate">`сonnect_string`</span> will look as follows:

<div class="notranslate">

```
сonnect_string=lvestats2:%5BYou_P%40%24%24%5D%3A@localhost/db_lvestats2
```
</div>


#### LVE-stats2 and PostgreSQL DB server compatible work setup


:::tip Note
Run all the commands below under <span class="notranslate">root</span>.
:::

**1.** **<span class="notranslate">PostgreSQL</span>** **server installation and setup**

* **PostgreSQL installation and initialization**

  For control panels use proper documentation for installation on the links: [сPanel](https://documentation.cpanel.net/display/CKB/Install+or+Update+PostgreSQL+on+Your+cPanel+Server), [Plesk](https://kb.plesk.com/en/123729).

  For non-panel CloudLinux run the following commands:

    * CloudLinux 6

    <div class="notranslate">

    ```
    yum install postgresql-server postgresql
    service postgresql initdb
    service postgresql start
    chkconfig postgresql on
    ```
    </div>

    * CloudLinux 7

    <div class="notranslate">

    ```
    yum install postgresql-server postgresql
    postgresql-setup initdb
    systemctl start postgresql
    systemctl enable postgresql
    ```
    </div>

* **Setup**

  * In <span class="notranslate">`/var/lib/pgsql/data/pg_hba.conf`</span> config file change user authentication mode. Add the following lines (place before all other authentication parameters):
  
    <div class="notranslate">

    ```
    # IPv4 local connections for lve-stats-2.x
    host dblvestat all 127.0.0.1/32 password
    # IPv6 local connections for lve-stats-2.x
    host dblvestat all ::1/128 password
    ```
    </div>
    
    These lines enable user authentication by the password for <span class="notranslate">IP4/IP6</span> connections. You can set other modes if needed.

  * Apply config changes by running:

    <div class="notranslate">

    ```
    service postgresql restart
    ```
    </div>


**2. DB for** <span class="notranslate">**LVE-stats-2.x**</span> **- creating and setup**

* Run standard <span class="notranslate">PostgreSQL psql</span> administrative utility:

<div class="notranslate">

```
sudo -u postgres psql postgres 
```
</div>

OR for сPanel

<div class="notranslate">

```
psql -w -U postgres
```
</div>

* In utility run:

  * creating server DB. Also, check **_Note_** below.

    <div class="notranslate">

    ```
    CREATE DATABASE dblvestat;
    ```
    </div>

  * creating a user for <span class="notranslate">LVE Stats 2</span> server to work under. Also, check **_Note_** below.

    <div class="notranslate">

    ```
    CREATE USER lvestat WITH password 'passw';
    ```
    </div>

  * granting <span class="notranslate">lvestat</span> user all privileges for work with <span class="notranslate">dblvestat DB</span>.

    <div class="notranslate">

    ```
    GRANT ALL privileges ON DATABASE dblvestat TO lvestat;
    ```
    </div>

  * exit `psql` utility:

    <div class="notranslate">

    ```
    \q
    ```
    </div>

    OR alternatively:

    <div class="notranslate">

    ```
    Ctrl+d
    ```
    </div>


:::tip Note
DB name, username and their passwords above are given for an example - you can use any of your choices. Using old DB from <span class="notranslate">LVE Stats</span> version 1 is also acceptable as <span class="notranslate">LVE Stats 2</span> uses different tables and the old information will not be corrupted
:::

**3.** <span class="notranslate">**LVE-stats-2.x**</span> **setup**

* Stop <span class="notranslate">lve-stats2</span> server by running:

<div class="notranslate">

```
service lvestats stop
```
</div>

* In server config file <span class="notranslate">`/etc/sysconfig/lvestats2`</span> edit options for connecting to DB:
  
<div class="notranslate">

```
db_type = postgresql
connect_string=lvestat:passw@localhost/dblvestat
If DB is going to be used as centralized for multiple hosts then collect_usernames parameter must be changed:
collect_usernames=true
```
</div>

:::tip Note
<span class="notranslate">`connect_string`</span> option value is of the format: <span class="notranslate">`user:pass@host/database`</span>. Username, password and DB name must be the same as in Database Setup section above.
:::

* After making changes in configuration files, for DB primary initialization (creating tables, indexes, etc), run:

<div class="notranslate">

```
/usr/sbin/lve-create-db 
```
</div>

* There is no need to create anything in the DB manually. When done, restart server by running:

<div class="notranslate">

```
service lvestats restart
```
</div>

**4. Additional security settings**

If you need to provide access to <span class="notranslate">LVE Stats</span> information utilities (<span class="notranslate">`lveinfo`, `lve-read-snapshot`</span> ) for other users (or if <span class="notranslate">CageFS</span> is disabled), then in order to guarantee DB security the following steps are required:

* Create a DB user with read-only permission:

<div class="notranslate">

```
CREATE USER lvestat_read WITH password 'passw';
GRANT CONNECT ON DATABASE dblvestat to lvestat_read;
\connect dblvestat;
GRANT SELECT ON lve_stats2_history, lve_stats2_history_gov, lve_stats2_history_x60, lve_stats2_incident, lve_stats2_servers, lve_stats2_snapshot, lve_stats2_user TO lvestat_read;
```
</div>

* Assign root ownership and permission 600 to the main configuration file (<span class="notranslate">`/etc/sysconfig/lvestats2`</span>), so that it could be read only by <span class="notranslate">LVE Stats 2</span> server and by utilities that run under root.

* Copy <span class="notranslate">`/etc/sysconfig/lvestats2` to `/etc/sysconfig/lvestats2.readonly`</span>, assign permission 644 to the new file, so that it could be read by any user but could be changed only by root.

* In <span class="notranslate">`/etc/sysconfig/lvestats2.readonly`</span> file, in the line <span class="notranslate">`connect_string`</span>, specify DB user with read-only permission, created above.

  These steps allow hiding main DB user username/password from other system users.

  If there is no need in such access differentiation, then <span class="notranslate">`/etc/sysconfig/lvestats2`</span> file access permission should be 644, so that it could be read by all users and could be changed only by <span class="notranslate">root</span>.

* When done, restart server by running:

<div class="notranslate">

```
service lvestats restart
```
</div>


**5. Using special characters in database password**

Since scheme <span class="notranslate">`://user:password@host[:port]/database_name`</span> [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) is used in <span class="notranslate">`connect_string`</span> config option, then usage of special characters in user DB password is not allowed.

To use special symbols in the password, it must be converted to [escape-sequence](https://en.wikipedia.org/wiki/Percent-encoding). You can convert a password to escape-sequence in a console as follows:

<div class="notranslate">

```
echo -n '[You_P@$$]:' | perl -MURI::Escape -ne 'print uri_escape($_)."\n"'
%5BYou_P%40%24%24%5D%3A
```
</div>

OR replace the symbols manually:

<div class="notranslate">

```
!    #    $    &    '    (    )    *    +    ,    /    :    ;    =    ?    @    [    ]
%21  %23  %24  %26  %27  %28  %29  %2A  %2B  %2C  %2F  %3A  %3B  %3D  %3F  %40  %5B  %5D
```
</div>

After that <span class="notranslate">`сonnect_string`</span> will look as follows:

<div class="notranslate">

```
сonnect_string=lvestats2:%5BYou_P%40%24%24%5D%3A@localhost/db_lvestats2
```
</div>

#### Customize LVE-stats2 notifications 

<span class="notranslate">[Jinja2](http://jinja.pocoo.org/)</span> is used as a template engine for the notifications.

The templates for notifications are located in <span class="notranslate">`/usr/share/lve/emails/LOCALE`</span>, where <span class="notranslate">`LOCALE`</span> is the directory with localization name (language codes are formed according to <span class="notranslate">ISO 639-1</span> and <span class="notranslate">ISO 639-2</span>).

By default the templates for English are set: <span class="notranslate">`/usr/share/lve/emails/en_US.`</span>.

<span class="notranslate">`/usr/share/lve/emails/en_US`</span> contains the following templates:

* <span class="notranslate">`admin_notify.html`  `admin_notify.txt`</span> for administrator;
* <span class="notranslate">`reseller_notify.html` `reseller_notify.txt`</span> for reseller;
* <span class="notranslate">`user_notify.txt`</span> for user.

The notification is formed as <span class="notranslate">_Multipart content type_</span> [RFC1341(MIME)](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html).

The plain text is taken from the <span class="notranslate">`.txt`</span> files, html version - from the <span class="notranslate">`.html`</span> template.

In case when only one template is present (<span class="notranslate">`.txt`</span> or <span class="notranslate">`.html`</span>) the notification is sent as a <span class="notranslate">_Non-multipart content_  </span> type notification.

It is better to use <span class="notranslate">_Multipart content_</span> type notifications because when a mail client can not display an html-format message, then it will be displayed as plain text version.

To localize notifications, copy standard templates into directory with the proper locale name and translate the template. Also you can customize the main template making proper changes into it.

The list of variables that can be used in the template:

| |  | |
|-|--|-|
|Variable | Example | Description|
|<span class="notranslate">`TONAME`</span> | <span class="notranslate">`Customer`</span> | Notification receiver user name. Taken from profile in the control panel, by default - <span class="notranslate">`Customer`</span> for user, <span class="notranslate">`Administrator`</span> for administrator, <span class="notranslate">`Reseller`</span> for reseller.|
|<span class="notranslate">`TOMAIL`</span> | <span class="notranslate">`support@cloudlinux.com`</span> | Notification receiver email address.|
|<span class="notranslate">`DOMAIN`</span> | <span class="notranslate">`wordpress.test247.cloudlinux.com`</span> | Main domain. Available only for user.|
|<span class="notranslate">`LOCALE`</span> | <span class="notranslate">`en_US`</span> | Locale in which the notification is sent. Available only for user.|
|<span class="notranslate">`RESELLER`</span> | <span class="notranslate">`root`</span> | User reseller. Available only for user.|
|<span class="notranslate">`PERIOD`</span> | <span class="notranslate">`12 hours`</span> | Verification and notification sending period.|
|<span class="notranslate">`LOGIN`</span> | <span class="notranslate">`wordpress`</span> | User login in the system.|
|<span class="notranslate">`ID`</span> | `500` | User ID in the system.|
|<span class="notranslate"> `lPMem` `lEP` `PMemF` `lVMem` `anyF` `IOf` `VMemF` `lCPU` `aIOPS` `aEP` `aPMem` `IOPSf` `lIO` `lIOPS` `aIO` `EPf` `aCPU` `aVMem` `NprocF` `aNproc` `lNproc` `CPUf` </span> |  | See description in <span class="notranslate">`lveinfo --help`</span> output. Available only for users|
|<span class="notranslate">`STATS_HTML`</span> |  | html table with the list of users that exceeded limits. Available for administrator and reseller.|
|<span class="notranslate">`STATS`</span> |  | ASCII - table with the list of users that exceeded limits. Available only for admins and resellers.|

Sender’s email address by default is administrator email address from control panel settings <span class="notranslate">`(root@{hostn_name}`</span> if there is no email in the control panel).

It can be changed with <span class="notranslate">`NOTIFY_FROM_EMAIL`</span> option in the config <span class="notranslate">`/etc/sysconfig/lvestats.config/StatsNotifier.cfg`</span>

For example:

<span class="notranslate">`NOTIFY_FROM_EMAIL=support@hostername.com`</span>

To apply changes restart <span class="notranslate">`lve-stats`</span> service:

<div class="notranslate">

```
service lvestats restart
```
</div>

for CloudLinux 7

<div class="notranslate">

```
systemctl restart lvestats.service
```
</div>

Default subject is <span class="notranslate">`Hosting account resources exceeded`</span>.  It can be changed for each template (and for localized templates as well). To change subject, in the very beginning of the file (no blank lines allowed in the beginning of the template) add the field <span class="notranslate">`Subject:`</span>, leave two blank lines after it and add template body.

Customized subjects can be taken only from the templates with the resolution <span class="notranslate">`*.txt`</span> <span class="notranslate">(`admin_notify.txt`, `reseller_notify.txt`, `user_notify.txt`)</span>. Changes apply without <span class="notranslate">`lvestats`</span> restart.

For backward compatibility the subject can be also changed with the key <span class="notranslate"> `NOTIFY_FROM_SUBJECT`</span> in the config <span class="notranslate">`/etc/sysconfig/lvestats.config/StatsNotifier.cfg`</span>.

Customized subjects have the higher priority than the key <span class="notranslate">`NOTIFY_FROM_SUBJECT`</span>.

Example for the file <span class="notranslate">`user_notify.txt`</span>

<div class="notranslate" v-pre>
	
```
Subject: Customized subject example
Dear {{TONAME}},
 
Your {{DOMAIN}} web hosting account exceeded one or more of its resources within the last {{PERIOD}}.
{% if epf %}Exceeded the maximum of {{lep}} concurrent website connections. Your website was not available {{epf}} times because of this problem.
{% endif %}{% if pmemf %}Exceeded the physical memory limit of {{lpmem}}KB. Your website was not available {{pmemf}} times because of this problem.
{% endif %}{% if vmemf %}Exceeded the virtual memory limit of {{lvmem}}KB. Your website was not available {{vmemf}} times because of this problem.
{% endif %}{% if nprocf %}Exceeded the number of processes limit of {{lnproc}}. Your website was not available {{nprocf}} times because of this problem.
{% endif %}{% if cpuf %}You reached limit of {{lcpu}} of total server CPU usage {{cpuf}} times. Your website was forced to load slower to reduce its CPU usage.
{% endif %}{% if iof %}You reached limit of {{lio}}KB/s disk io rate {{iof}} times. The disk io speed for your account was slowed as a result of this problem.
{% endif %}{% if iopsf %}You reached limit of {{liops}} I/O operations {{iopsf}} times. The disk io speed for your account was slowed as a result of this problem.
{% endif %}
 
To view full details about your web hosting account's resource usage, including the time of each incident listed above, please click the link below and log into your cpanel hosting control panel, then click the "Resource Usage" link under the "Logs and Statistics" section.
http://{{DOMAIN}}:2083
 
If your account is regularly exceeding it's available resources, please consider upgrading to a higher level hosting plan that includes more resources. If you have any questions or need help with anything, just reply to this email and let us know.
 
Sincerely,
 
Your Friendly Web Hosting Support Team
```
</div>


### Plugins

* [Creating a plugin for LVE-stats2](/cloudlinux_os_components/#creating-a-plugin-for-lve-stats2)
* [Introduction](/cloudlinux_os_components/#introduction)
* [Server plugin arrangement](/cloudlinux_os_components/#server-plugin-arrangement)
* [Plugin configuration](/cloudlinux_os_components/#plugin-configuration)
* [Types of plugins](/cloudlinux_os_components/#types-of-plugins)
* [Examples of plugins](/cloudlinux_os_components/#examples-of-plugins)
  * [Collector](/cloudlinux_os_components/#collector)
  * [Analyzer](/cloudlinux_os_components/#analyzer)
  * [Persistor](/cloudlinux_os_components/#persistor)
  * [Notifier](/cloudlinux_os_components/#notifier)
* [File info and format for /var/lve/info file](/cloudlinux_os_components/#file-info-and-format-for-var-lve-info-file)

LVE-stats2 comes with a set of generic plugins:

| |  |  |  | |
|-|--|--|--|-|
|Plugin Name | Order | Default | Period (seconds) | Description|
|LVECollector | 1000 | Y | 5 | Collects usage/limits data from `/proc/lve/list`|
|CPUInfoCollector | 2000 | Y | 5 | collents info about <span class="notranslate"> CPU - `/proc/cpuinfo`</span>|
|LVEUsernamesCollector | 3000 | Y | 3600 | collects usernames & user ids to match <span class="notranslate">`uid <-> lve id`</span> later on|
|LVEUsageAnalyzer | 4000 | Y | 5 | analyzes usage of LVE|
|LveUsageAggregator | 5000 | Y | 60 | aggregates data by time periods|
|DBGovSaver | 6000 | Y | 5 | Saves data about database governor|
|FileSaver | 7000 | Y | 5 | Saves LVE data into <span class="notranslate">`/var/lve/info`</span> |
|CloudLinuxTopFileSaver | 8000 | Y | 60 | saves data used by <span class="notranslate"> cloudlinux-top to `/var/lve/cloudlinux-top.json`</span>|
|DBSaver | 9000 | Y | 60 | save LVE data to database|
|DbUsernamesSaver | 10000 | Y | 3600 | saves users name to database|
|DBSaverX60 | 11000 | Y | 3600 | saves aggregated hourly data into database|
|SnapshotSaver | 12000 | Y | 30 | collects & saves snapshots data|
|StatsNotifier | 13000 | Y | varied | notify user/admin based on usage|
|HistoryCleaner | 14000 | Y | 3600 | removes old usage|
|ResMEMCollector | 1500 | N | 30 | collects physical memory usage from processes RES field instead of <span class="notranslate">`/proc/lve/list`</span> |
|LVEDestroyer | - | N | 5 | destroys LVEs that weren't active for X iterations. Number of iterations is passed from config using iterations variable. <span class="notranslate">`iterations=0`</span> means plugin disabled|


To enable non-default plugin, copy or link it to `/usr/share/lve-stats/plugins` directory.

For example to enable `ResMEMCollector` plugin, do:

<div class="notranslate">

```
ln -s /usr/share/lve-stats/plugins.other/res_mem_collector.py /usr/share/lve-stats/plugins/
service lvestats restart
```
</div>


#### Creating a plugin for LVE-stats2

#### Introduction


<span class="notranslate"> LVE Stats 2 </span> complex has scalable architecture, which allows to connect custom plugins.


<span class="notranslate"> LVE Stats </span> server searches for plugins in the directory which is specified with plugins parameter of server’s _/etc/sysconfig/lvestats2_ configuration file. Default directory is <span class="notranslate"> _/usr/share/lve-stats/plugins_. </span>

Each plugin must be of a <span class="notranslate"> Python </span> class, must be written in <span class="notranslate"> Python </span> language and its file must have <span class="notranslate"> .py </span> extension. Files with all other extensions will be ignored. For normal server work access permission 400 is enough; owner – <span class="notranslate"> root </span> .

Plugin classes can be of the same name, but better not, because classes' names can affect the set of parameters in <span class="notranslate"> _set_config_ </span> method. You can find detailed plugins' configuring information below, in appropriate chapter.

Plugin class must contain <span class="notranslate"> _execute()_ </span> method, which is invoked by the server every 5 seconds (by default, can be changed by interval parameter of configuration file).
Also <span class="notranslate"> set_config </span> method (configuration settings) can be available. You can find more info in <span class="notranslate">[Plugins Configuration](/cloudlinux_os_components/#plugin-configuration)</span> chapter.

Additionally the following attributes can be set (plugin class instance variable):

* <span class="notranslate"> order (integer) </span> - defines plugin's position in the server's plugin list, (more info in <span class="notranslate"> Servers Plugin Arrangement </span> ).
* <span class="notranslate"> timeout (integer </span> or <span class="notranslate"> float </span> ) – the longest allowable duration of one launch of the plugin (execute method). Default value of <span class="notranslate"> timeout </span> parameter is 5 seconds.
* <span class="notranslate"> period (integer) </span> – sets the interval between two launches of execute plugin method in seconds. If not defined, then plugin runs every 5 seconds ( <span class="notranslate"> interval </span> parameter in configuration file).

When <span class="notranslate"> _execute()_   </span> method of the plugin is invoked, the server creates an attribute <span class="notranslate"> _now_ </span> in it, where launch time is recorded. This value is equal to what a standard Python function <span class="notranslate"> _time.time()_ </span> returns. All the plugins launched one after another receive the same  value of <span class="notranslate"> _now_   </span> attribute from the server. <span class="notranslate"> _now_ </span> is overwritten before <span class="notranslate"> _execute()_ </span> method is invoked.

The previous value of now attribute is not saved by the server. If plugin needs it, it has to save it by itself.

Plugin class can be inherited from <span class="notranslate"> _LveStatsPlugin_ </span> class, which is the part of the server itself. This is not obligatory, but inheritance can help to avoid different errors in servers work, particularly if a plugin doesn't contain required execute method.

<span class="notranslate"> _LveStatsPlugin_ </span> class is defined in the file: <span class="notranslate"> _/opt/alt/python27/lib/python2.7/site-packages/lvestats/core/plugin.py_ . </span>

#### Server plugin arrangement


When the server starts, it performs the search of plugins in the directory specified in _/etc/sysconfig/lvestats2_ configuration file. This directory is scanned only when the server starts, therefore if any plugin was added into the directory, the server has to be restarted with the following command:
<div class="notranslate">

```
service lvestats restart.
```
</div>

After successful restart, the plugins are graded and executed  ascending by <span class="notranslate"> _order_ </span> attribute. If any plugin <span class="notranslate"> _order_ </span> attribute is not set, it is considered as a <span class="notranslate"> Python </span> language constant _sys.maxint_ (which is usually 9223372036854775807). This in fact means that such plugins will be executed in the last.
If any plugins has similar <span class="notranslate"> _order_ </span> meanings, their execution order is unpredictable.

The server invokes <span class="notranslate"> _execute_ </span> method of all plugins one after another.

When the server invokes <span class="notranslate"> _execute()_ </span> method of any plugin, it transmits a data dictionary ( <span class="notranslate"> _lve_data_ </span> argument) into plugin. The dictionary is common for all the plugins. Any plugin can read, write and change any data in this dictionary. <span class="notranslate"> LVE Stats 2 </span> server doesn't control this area. That is why one must be careful while developing new plugins, in order not to change or corrupt other plugins' data which can break their functionality.

If an exception occurs in <span class="notranslate"> _execute()_ </span> method, its text and <span class="notranslate"> python </span> stack trace is recorded into server log _/var/log/lve-stats_ and all the changes made to <span class="notranslate"> _lve_data_ </span> dictionary before the exception happened are lost.

The keys of the <span class="notranslate"> _lve_data_ </span> dictionary are recommended to look like <span class="notranslate"> “ _PluginName_Key_ ” </span> , in order the plugins do not corrupt other data accidentally.

Server contains some standard plugins which define and use the following keys in the common dictionary <span class="notranslate"> lve_data: _LVE_VERSION, stats, old_stats, procs_ </span> and <span class="notranslate"> _lve_usage_ </span> . User plugins can use data from these keys, but it is recommended not to change them if there is no special need, because it can break the next plugins in the execution queue.

| | |
|-|-|
|Key | Content|
|<span class="notranslate"> `LVE_VERSION` </span> | LVE version. The same as console command <span class="notranslate"> `lvectl lve-version` </span> produces.|
|<span class="notranslate"> `stats` </span> | Dictionary, that contains lve id’s as keys and LVEStat class objects as values. Every LVEStat object contains values of usages and limits taken from <span class="notranslate"> _/proc/lve/list_ </span> file for every <span class="notranslate"> LVE Id </span> . Dictionary keys – <span class="notranslate"> integer lve id </span> , including 0 for “ <span class="notranslate"> default </span> ” LVE. This dictionary is updated on each iteration of lvestats-server (every 5 seconds by default). LVEStat – is a standard server class, it can be imported with the command from <span class="notranslate"> _lvestats.core.lvestat_ </span> `import LVEStat.` The class is described in the file <span class="notranslate"> _/opt/alt/python27/lib/python2.7/site-packages/lvestats/core/lvestat.py_ </span> . Here you can find the whole list of data fields and their functions.|
|<span class="notranslate"> `old_stats` </span> | _stats_ content from the previous iteration. Before the first iteration – empty dictionary.|
|<span class="notranslate"> `totalHz` </span> | When LVE_VERSION is 4, real <span class="notranslate"> CPU </span> frequency in <span class="notranslate"> Hz </span> multiplied by number of cores. When LVE_VERSION > 4, <span class="notranslate"> CPU </span> speed is in conventional units and equals to 1000000000 * cores (1 <span class="notranslate"> GHz </span> per core).|
|<span class="notranslate"> `procs` </span> | Quantity of <span class="notranslate">  CPU </span> cores.|
|<span class="notranslate"> `lve_usages` </span> | Contains accumulated LVE statistics for each 5-seconds interval in current minute. Cleared each minute.|
|<span class="notranslate"> `lve_usage` </span> | Contains aggregated LVE Statistics for “previous” minute to store to database. Overwritten each minute.|

Each plugin’s instance lifetime is from the moment it was loaded till the server stops working. But if <span class="notranslate"> _execute()_ </span> method working time exceeds timeout, the plugin will be terminated and restarted in the next iteration. All changes to the <span class="notranslate"> _lve_data_ </span> dictionary will be lost.

During servers graceful shutdown (restart, server shutdown, commands <span class="notranslate"> `service lvestats stop, service lvestats restart` </span> ), each plugin receives SIGTERM signal.
This is useful to correctly unload the plugin (terminate all subsidiary processes, save data to files etc.). If a plugin doesn't need to “finalize” its execution before termination, then there's no need to implement this signal handler. Below you can see an example of such handler.

::: tip Note
If a plugin implements handler for SIGTERM, then this handler must end with <span class="notranslate"> `sys.exit(0)` </span> command. Otherwise plugin process will not be terminated correctly and will become orphaned.
:::

#### Plugin configuration


<span class="notranslate"> LVE Stats 2 </span> Server allows to configure each plugin separately.

On initialization stage the server invokes <span class="notranslate"> _set_config()_ </span> method of the plugin and locates there a dictionary which contains:

* all parameters from file _/etc/sysconfig/lvestats2_ (global).
* plugin's individual configuration file parameters (if one exists). Configuration files must be located in <span class="notranslate"> _/etc/sysconfig/lvestats.config_ </span> directory, have .cfg extension and be the same format as _/etc/sysconfig/lvestats2_ . Files in this directory are matched with the plugins by name. For instance, if plugin class is <span class="notranslate"> _Plugin1_class_ </span> , then server will try to find and download <span class="notranslate"> _/etc/sysconfig/lvestats.config/Plugin1_class.cfg_. </span> Names are case sensitive. If any plugin doesn't have an individual configuration file, then it's not an error. In this case plugin will just receive parameters from _/etc/sysconfig/lvestats2_ .

::: tip Note
An individual configuration file of every plugin is loaded after server configuration file. That is why if it contains any parameters with names similar to ones of server config, then plugin will use parameters from its individual config rather than server config parameters.

If a plugin doesn't require any configuration to be done, then set_config method can be skipped.

In addition, plugins can use their own configuration methods.
:::

#### Types of plugins


According to server architecture, plugins can be of the following types:

* <span class="notranslate"> collectors </span>
* <span class="notranslate"> analyzers </span>
* <span class="notranslate"> persistors </span>
* <span class="notranslate"> notifiers </span>

<span class="notranslate"> Collectors </span> are designed to collect information; <span class="notranslate"> analyzers </span> – to analyze it and form some other data on its basis; <span class="notranslate"> persistors </span> – to save information from the common dictionary into files, databases, etc.; <span class="notranslate"> notifiers </span> - to notify system users about any events.

This division is rather arbitrary. There is an opportunity to execute all the actions on collection, analysis and saving the information in one and only plugin. But at the same time the division into functionally independent parts allows to build flexible and easily configurable system for collecting and processing the data.

Also it is possible to implement the systems of lazy-write, planning of collecting/processing tasks and notifying users about different events.


#### Examples of plugins


Here is a practical example of a user plugin.

Specification:

1. To trace specified file size changes. The name of file being traced must be specified in configuration file, which allows to change it without modifying the plugin itself. If file size has been changed, it has to be written as a message into our log. The name of log must be specified in configuration file as well.

2. File size must be checked with default interval (5 seconds), and log notification must be held once a minute (to avoid resource expend for possibly regular write).

3. System administrator must receive emails with file size at the moment the email was sent. These notifications must be sent even if the file size hasn’t been changed. Notification emails must be read periodicity from configuration file as well as sender/receiver emails .

As file size check, fixing the result and notification sending must be held with different periods, then it’s impossible to realize all the tasks by means of one plugin.
The fact that one minute (60 seconds) is multiple to 5 seconds doesn’t matter in this case, because default period can be changed in server’s configuration file, but the condition of fixing the result once a minute is a part of the specification, which can not be violated. In addition, notification email period is known in advance, as it is specified by user in configuration file.

That is why we realize 4 plugins: <span class="notranslate"> **collector, analyzer, persistor** </span> and <span class="notranslate"> **notifier** </span>.


#### **Collector**


<span class="notranslate"> Collector's </span> aim is to determine the size of a proper file.

<div class="notranslate">

```
# FSize_watcher_collector.py
# Example plugin for monitoring file size.
# Part 1. Collector

import os
from lvestats.core.plugin import LveStatsPlugin 

# Key name
COLLECTOR_KEY = 'FSizeWatcher_fsize'
COLLECTOR_KEY_FILENAME = 'FSizeWatcher_fname'  

class FSize_watcher_collector (LveStatsPlugin):
	# this plugin should be first in chain
	order = 0
	# File to monitoring
	file_to_monitoring = None 
	
	def __init__(self):
		pass 
		
	# Sets configuration to plugin
	def set_config(self, config):
		self.file_to_monitoring = config.get('file_to_monitoring', None)
		pass
	# Work method
	def execute(self, lve_data):
		try:
			# if monitoring file absent, do nothing
			if self.file_to_monitoring is None or not os.path.exists(self.file_to_monitoring):
		return 
		
			# Get file size
			stat_info = os.stat(self.file_to_monitoring)
			fsize = stat_info.st_size 
			
			# Place file name and file size to server data dictionary
			lve_data[COLLECTOR_KEY_FILENAME] = self.file_to_monitoring
			lve_data[COLLECTOR_KEY] = fsize
		except (OSError, IOError):
			# file absent or any other error - remove size from dictionary
			del lve_data[COLLECTOR_KEY]
```
</div>

Plugin algorithm is extremely simple – file size is read and written into data dictionary. Files name is read from <span class="notranslate"> _set_config_ </span> method configuration. If the name is not specified, then <span class="notranslate"> None </span> is written into appropriate variable. All the errors are completely ignored (e.g. if specified file doesn't exist or there's no way to read any of it's information).

<span class="notranslate"> _order_ </span> attribute is specified as 0 to make this plugin go the first among three. Data collector must always be the first in plugins logical chain, because it provides all the necessary information for the analyzer which goes the next. Specific values of <span class="notranslate"> _order_ </span> can be of any kind, but what is important is that when the server starts, all the plugins line up in proper sequence: <span class="notranslate"> collector – analyzer – persistor </span> .

In order to make plugin work, we have to create configuration file <span class="notranslate"> _/etc/sysconfig/lvestats.config/FSize_watcher_collector.cfg_ </span> with the following content:

<div class="notranslate">

```
# Config file for FSize_watcher_collector plugin
# Please define monitoring file here
# file_to_monitoring = /usr/local/cpanel/logs/error_log
file_to_monitoring = /usr/local/cpanel/logs/access_log
```
</div>

Note that file name <span class="notranslate"> _FSize_watcher_collector_ </span> without .cfg extension matches plugin class name.

<span class="notranslate"> _file_to_monitoring_ </span> option is read by plugin in <span class="notranslate"> _set_config_ </span> method and contains file’s full name for monitoring.

Files for monitoring, suggested in the actual example - <span class="notranslate"> _/usr/local/cpanel/logs/error_log_ and _/usr/local/cpanel/logs/access_log_ </span> - are real, these are cPanel control panel logs.

The first file is errors log; the second is appeal log, is refreshed during common work with panel (e.g. if user email address is changed).

Errors log tracking is more important, but appeal log monitoring allows to illustrate plugins work more in details, because it is refreshed more often.

Note that plugin can monitor one file only.

#### **Analyzer**


<span class="notranslate"> Analyzer </span> decides if the file's size has changed and gives a command to persistor to refresh log.

<div class="notranslate">

```
# FSize_watcher_analyzer.py
# Example plugin for monitoring file size.
# Part 2. Analyzer 

from lvestats.core.plugin import LveStatsPlugin 

# Key name from collector plugin
COLLECTOR_KEY = 'FSizeWatcher_fsize' 

# Key name 1 for saver plugin
SAVER_KEY = 'FSizeWatcher_fsize_to_store'
# Key name 2 for saver plugin
SAVER_DATA_PRESENCE = 'FSizeWatcher_fsize_present'  

class FSize_watcher_analyzer (LveStatsPlugin):
	# this plugin should be second in chain
	order = 1
	# Last file size
	file_last_size = 0
	# Plugin run period in secondsperiod = 60 
	
	def __init__(self):
		pass 
		
	# work method
	def execute(self, lve_data):
		# Default setting for saver
		lve_data[SAVER_DATA_PRESENCE] = 0
		# Check presence data
		if COLLECTOR_KEY not in lve_data:
		return 
		
		# Get file size from server data dictionary
		fsize = lve_data[COLLECTOR_KEY] 
		
		# Check, if file size changed, store it for saver plugin
		if fsize == self.file_last_size:
			return 
			
		# Put new size for saver plugin
		lve_data[SAVER_KEY] = fsize
		self.file_last_size = fsize
		lve_data[SAVER_DATA_PRESENCE] = 1
```
</div>

This plugin is extremely simple as well. It starts after <span class="notranslate"> collector (order=1) </span> , searches for file size in the dictionary and compares it with the previous index. If it has changed, then it writes a sign of presence of a new size into the dictionary. If no changes seen, then sign resets. The previous file size is stored in the plugin itself in <span class="notranslate"> _file_last_size_ </span> variable. Note that they are stored during the whole server <span class="notranslate"> lve-stats </span> lifetime.

If file size is not found in data dictionary, then plugin just ends.

All the errors are completely ignored.

<span class="notranslate"> Analyzer </span> is unconfigurable, that is why it doesn’t require any configuration file and it doesn’t contain <span class="notranslate"> _set_config_ </span> method.

Plugin starts every 60 seconds (1 minute), because we need data fixation to be performed one time in a minute.


#### **Persistor**


<span class="notranslate"> Persistor </span> saves information from the common dictionary into files, databases, etc.

<div class="notranslate">

```
# FSize_watcher_saver.py
# Example plugin for monitoring file size and last modification date-time.
# Part 3. Data saver 

import signal
import sys
import time
from lvestats.core.plugin import LveStatsPlugin 

# Key name 1 for saver plugin
SAVER_KEY = 'FSizeWatcher_fsize_to_store'
# Key name 2 for saver plugin
SAVER_DATA_PRESENCE = 'FSizeWatcher_fsize_present'
# Monitoring file name
COLLECTOR_KEY_FILENAME = 'FSizeWatcher_fname'  

class FSize_watcher_saver (LveStatsPlugin):
	# this plugin should be third in chain
	order = 2
	# Plugin run period in seconds
	period = 60
	# Log filename
	log_file_name = None
	# First run flag
	is_first_run = True 
	
	def __init__(self):
		signal.signal(signal.SIGTERM, self.sigterm_handler) 
		
	# Sets configuration to plugin
	def set_config(self, config):
		# Get log filename
		self.log_file_name = config.get('log_filename', None) 
		
	# work method
	def execute(self, lve_data):
		# do nothing, if log file not defined
		if not self.log_file_name:
			return
		try:
			# Check presence data
			if SAVER_DATA_PRESENCE not in lve_data or lve_data[SAVER_DATA_PRESENCE] == 0:
				# No data
				return
			# Get file size from server data dictionary
			fsize = lve_data[SAVER_KEY]
			
			# Store data to log
			f = open(self.log_file_name, 'a')
			if self.is_first_run:
				f.write('%s - FSize_watcher started. Monitoring file: %s, saving data period=%d sec\n' % (time.asctime(time.localtime()), lve_data[COLLECTOR_KEY_FILENAME], self.period))
				self.is_first_run = False
			f.write('%s - FSize_watcher: file size is %d bytes\n' % (time.asctime(time.localtime()), fsize))
			f.close()
		except:
			# Ignore all errors
			pass 
			
	# Terminate handler
	def sigterm_handler(self, signum, frame):
		if self.log_file_name:
			try:
				# Store data to log file
				f = open(self.log_file_name, 'a')
				f.write('%s - File watcher saver plugin: TERMINATE\n' % time.asctime(time.localtime()))
				f.close()
				pass
			except:
				# Ignore all errors
				pass
		# Terminate process
		sys.exit(0)
```
</div>

Configuration file <span class="notranslate">`/etc/sysconfig/lvestats.config/FSize_watcher_saver.cfg`</span>:
<div class="notranslate">

```
# Config file for FSize_watcher_saver.py plugin
# Please define log filename here
log_filename = /var/log/FSize_watcher.log
```
</div>

This plugin starts after <span class="notranslate"> analyzer (order=2) </span> , checks new file size <span class="notranslate"> `presence` </span> flag, and if positive – writes it into log. If the flag is cleared (which means the size hasn't changed), then plugin simply ends.

Starts once in a minute (period=60).

Also this plugin shows the work of signal handler.

Plugin constructor registers handler-function of a  proper signal: <span class="notranslate"> _signal.signal(signal.SIGTERM, self.sigterm_handler)_ .  </span> This means, that when the server finishes its work, then <span class="notranslate"> _sigterm_handler_ </span> method of plugin class will be invoked. In the actual example the function just writes a notification into log, tracing the fact of it's invocation.

Pay attention on <span class="notranslate"> _sys.exit(0)_ </span> command in the end of the handler. Find the information on it in <span class="notranslate"> [Server Plugin Arrangement](/cloudlinux_os_components/#server-plugin-arrangement) </span> section.

In addition see into examples of file log <span class="notranslate"> _/var/log/FSize_watcher.log_ </span> formed by the plugins above:
<div class="notranslate">

```
Tue Feb  3 13:06:24 2015 - FSize_watcher started. Monitoring file: /usr/local/cpanel/logs/access_log, saving data period=60 sec
Tue Feb  3 13:06:24 2015 - FSize_watcher: file size is 122972890 bytes
Tue Feb  3 13:07:25 2015 - FSize_watcher: file size is 122975507 bytes
Tue Feb  3 13:08:25 2015 - FSize_watcher: file size is 122978124 bytes
Tue Feb  3 13:09:25 2015 - FSize_watcher: file size is 122978997 bytes
Tue Feb  3 13:10:25 2015 - FSize_watcher: file size is 122981033 bytes
Tue Feb  3 13:11:25 2015 - FSize_watcher: file size is 122982052 bytes
Tue Feb  3 13:13:25 2015 - FSize_watcher: file size is 122983798 bytes
Tue Feb  3 13:20:15 2015 - File watcher saver plugin: TERMINATE
```
</div>

and
<div class="notranslate">

```
Thu Feb  5 13:07:27 2015 - FSize_watcher started. Monitoring file: /usr/local/cpanel/logs/error_log, saving data period=60 sec
Thu Feb  5 13:07:27 2015 - FSize_watcher: file size is 14771849 bytes
Thu Feb  5 14:03:32 2015 - FSize_watcher: file size is 14771995 bytes
Thu Feb  5 15:01:36 2015 - FSize_watcher: file size is 14772434 bytes
Thu Feb  5 17:15:47 2015 - FSize_watcher: file size is 14772873 bytes
Thu Feb  5 18:47:54 2015 - FSize_watcher: file size is 14775213 bytes
Thu Feb  5 19:11:56 2015 - FSize_watcher: file size is 14775652 bytes
Thu Feb  5 21:09:05 2015 - FSize_watcher: file size is 14776091 bytes
Thu Feb  5 23:06:14 2015 - FSize_watcher: file size is 14776530 bytes
Fri Feb  6 00:47:23 2015 - FSize_watcher: file size is 14778870 bytes
Fri Feb  6 01:02:24 2015 - FSize_watcher: file size is 14779309 bytes
Fri Feb  6 02:00:28 2015 - FSize_watcher: file size is 14779434 bytes
Fri Feb  6 03:16:34 2015 - FSize_watcher: file size is 14779873 bytes
Fri Feb  6 05:04:42 2015 - FSize_watcher: file size is 14779998 bytes
Fri Feb  6 05:12:43 2015 - FSize_watcher: file size is 14780437 bytes
Fri Feb  6 05:56:50 2015 - FSize_watcher: file size is 14780551 bytes
Fri Feb  6 06:01:50 2015 - FSize_watcher: file size is 14780975 bytes
Fri Feb  6 06:03:51 2015 - FSize_watcher: file size is 14782183 bytes
Fri Feb  6 06:04:51 2015 - FSize_watcher: file size is 14782575 bytes
Fri Feb  6 06:18:52 2015 - FSize_watcher: file size is 14782647 bytes
Fri Feb  6 06:21:52 2015 - FSize_watcher: file size is 14782898 bytes
Fri Feb  6 06:48:54 2015 - FSize_watcher: file size is 14785238 bytes
Fri Feb  6 07:09:56 2015 - FSize_watcher: file size is 14785677 bytes
Tue Feb  6 08:03:15 2015 - File watcher saver plugin: TERMINATE
```
</div>

You can see that log record is being held once a minute (what we actually need), new file size is written.

Also we can notice that handler <span class="notranslate"> SIG_TERM </span> was executed, signaling that plugin received the notification about server shut-down.


#### **Notifier**


<span class="notranslate">Notifier</span> informs system users about any events.
<div class="notranslate">

```
# FSize_watcher_saver.py
# Example plugin for monitoring file size and last modification date-time.
# Part 4. Notifier 

import time
import smtplib 

from lvestats.lib.commons import dateutil
from lvestats.core.plugin import LveStatsPlugin  


# Key name
COLLECTOR_KEY_FSIZE = 'FSizeWatcher_fsize'
COLLECTOR_KEY_FILENAME = 'FSizeWatcher_fname' 

# email message pattern
EMAIL_MESSAGE_PATTERN = """Hello, administrator!
Size of the file '%s' is %d bytes.
"""  


class FSize_watcher_notifier (LveStatsPlugin):
	# Default period
	DEFAULT_PERIOD_STR = '12h'
	# this plugin should be third in chainorder = 3
	# Timeout
	timeout = 20
	# Notifier Log filename
	log_file_name = '/var/log/FSize_watcher_notifier.log'
	# Email from address
	email_from = None
	# Email to address
	email_to = None
	# Email subject
	email_subject = None
	# Sets configuration to plugin
	def set_config(self, config):
		# Email settings
		self.email_from = config.get('notify_from_email', None)
		self.email_to = config.get('notify_to_email', None)
		self.email_subject = config.get('notify_from_subject', 'Message from FSize_watcher_notifier plugin')
		# Notify period
		s_period = config.get('notify_period', None)
		if s_period:
			self.period = dateutil.parse_period2(s_period)
		else:
			self.period = dateutil.parse_period2(FSize_watcher_notifier.DEFAULT_PERIOD_STR)
		f = open(self.log_file_name, 'a')
		f.write('%s - FSize_watcher_notifier plugin: configure\n' % time.asctime(time.localtime()))
		f.write('       - Period: %s\n' % self.period)
		f.write('       - From: %s\n' % self.email_from)
		f.write('       - To: %s\n' % self.email_to)
		f.write('       - Subject: \'%s\'\n' % self.email_subject)
		f.close() 
		
	# work method
	def execute(self, lve_data):
		if COLLECTOR_KEY_FSIZE not in lve_data or COLLECTOR_KEY_FILENAME not in lve_data:
			return
		if not self.email_from or not self.email_to:
			f = open(self.log_file_name, 'a')
			f.write('%s - FSize_watcher_notifier plugin error: email_from or email_to not set\n')
			f.close()
			return
		try:
			from email.mime.text import MIMEText
			# Send email
			msg = MIMEText(EMAIL_MESSAGE_PATTERN % (lve_data[COLLECTOR_KEY_FILENAME], lve_data[COLLECTOR_KEY_FSIZE]))
		msg['Subject'] = self.email_subject
		msg['From'] = self.email_from
		msg['To'] = self.email_to 
		
		s = smtplib.SMTP('localhost')
		s.sendmail(self.email_from, [self.email_to], msg.as_string())
			s.quit() 
			
		f = open(self.log_file_name, 'a')
			f.write('%s - FSize_watcher_notifier plugin: email message was successfully sent\n' % time.asctime(time.localtime()))
			f.close()
			except Exception as e:
			f = open(self.log_file_name, 'a')
			f.write('%s - FSize_watcher_notifier plugin error:\n%s\n' % (time.asctime(time.localtime()), str(e)))
			f.close()
```
</div>

Configuration file <span class="notranslate"> _/etc/sysconfig/lvestats.config/FSize_watcher_notifier.cfg_ : </span>
<div class="notranslate">

```
# Config file for FSize_watcher_notifier.py plugin
# Please define email options here 

NOTIFY_FROM_EMAIL=user@hostname
NOTIFY_FROM_SUBJECT=Message from FSize_watcher_notifier
NOTIFY_TO_EMAIL=admin@hostname
NOTIFY_PERIOD=12h
```
</div>

Plugin’s index number equals 3 ( <span class="notranslate"> order=3 </span> ), that is why <span class="notranslate"> notifier </span> starts after the rest. But since it uses only data formed by <span class="notranslate"> collector </span> , then its order may equal any number bigger that <span class="notranslate"> collectors </span> order (>0).

<span class="notranslate"> Notifier </span> reads the necessary parameters from the configuration (email address, topic, period) and writes them into its own log as reference.

Plugin’s <span class="notranslate"> _execute_ </span> method checks the availability of all the necessary data (email parameters, collectors data) and sends the message. All the notifications are written into the <span class="notranslate"> notifier's </span> own log.

If any data is missing,  the message is not sent.

Log example:
<div class="notranslate">

```
Thu Feb  5 11:51:34 2015 - FSize_watcher_notifier plugin: configure
       - Period: 60.0
       - From: user@hostname
       - To: admin@hostname
       - Subject: 'Message from FSize_watcher_notifier'
Thu Feb  5 11:51:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:52:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:53:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:54:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent
Thu Feb  5 11:57:00 2015 - FSize_watcher_notifier plugin: configure
       - Period: 43200.0
       - From: user@hostname
       - To: admin@hostname
       - Subject: 'Message from FSize_watcher_notifier'
Thu Feb  5 11:57:00 2015 - FSize_watcher_notifier plugin: email message was successfully sent
```
</div>

#### File info and format for /var/lve/info file


This file is used by control panels to display to user their 'current' usage. The file is updated every 5 seconds by lve-stats.

When writing to this file we make sure that: average <span class="notranslate"> CPU/IOPS/MEM </span> is never greater then <span class="notranslate"> LIMIT </span> for that resource.

Example:

0,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0
600,1,20,2492,2500,70,262144,0,0,262144,33,0,100,1,0,0,0,1024,1024,0,5,0,0
200,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0
500,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0

First line of the file is ' <span class="notranslate"> default limits </span> '.

Fields:
<div class="notranslate">

```
# 0 - id
# 1 - mep (average entry processes)
# 2 - lep  (limit ...)
# 3 - cpu_usage (average speed)
# 4 - lcpu (limit spped)
# 5 - mem_usage (average virtual memory)
# 6 - lmem (limit ...)
# 7 - mem_fault (number of virtual memory faults)
# 8 - mep_fault (number of entry processes faults)
LVE_VERSION >=6
# 9 - lmemphy (limit physical memory)
# 10 - memphy (average ...)
# 11 - memphy_fault (faults ...)
# 12 - lnproc (limit number of processes)
# 13 - nproc (average ...)
# 14 - nproc_fault (faults ...)
# 15 - lcpuw (CPU weight -- deprecated not used)
# 16 - io_usage (average IO usage)
# 17 - io_limit (limit ...)
LVE_VERSION >=8
#18 - liops  (limit IOPS)
#19 - iops (average IOPS)
```
</div>

:::tip Note
You can also use [LVE-stats 2 CLI](/command-line_tools/#lve-stats-2)
:::

### Troubleshooting

<span class="notranslate"> lvestats </span> service and utilities write fatal errors to system log.

There is <span class="notranslate">`/var/log/lve-stats.log`</span> file with additional information (warnings, tracebacks for errors).

## CageFS

### General information and requirements

* [Minimum Requirements](/cloudlinux_os_components/#minimum-requirements)
* [CageFS quirks](/cloudlinux_os_components/#cagefs-quirks)

CageFS is a virtualized file system and a set of tools to contain each user in its own 'cage'. Each customer will have its own fully functional CageFS, with all the system files, tools, etc.

The benefits of CageFS are:

* Only safe binaries are available to user
* User will not see any other users, and would have no way to detect presence of other users & their user names on the server
* User will not be able to see server configuration files, such as Apache config files.
* User's will have limited view of _/proc_ file system, and will not be able to see other users' processes

At the same time, user's environment will be fully functional, and user should not feel in any way restricted. No adjustments to user's scripts are needed. CageFS will cage any scripts execution done via:
* <span class="notranslate"> Apache (suexec, suPHP, mod_fcgid, mod_fastcgi) </span>
* <span class="notranslate"> LiteSpeed Web Server </span>
* <span class="notranslate"> Cron Jobs  </span>
* SSH
* Any other <span class="notranslate"> PAM </span> enabled service

::: tip Note
mod_php is not supported, MPM ITK requires a custom patch
:::

::: tip Note
CageFS is not supported for H-Sphere.
:::

See also [Compatibility Matrix](/limits/#compatibility-matrix).

#### Minimum Requirements:

* kernel: CL6 with lve1.2.17.1 or later, CL7.
* 7GB of disk space.

Depending on your setup, and number of users, you might also need:
* Up to 8MB per customer in `/var` directory (to store custom `/etc` directory)
* 5GB to 20GB in `/usr/share` directory (to store safe skeleton of a filesystem)

::: danger Warning
If at any time you decide to uninstall CageFS, please make sure you follow [uninstall instructions](/cloudlinux_os_components/#uninstalling)
:::

#### CageFS quirks


Due to the nature of CageFS, some options will not work as before or will require some changes:

* lastlog will not work (<span class="notranslate">`/var/log/lastlog`</span>).
* PHP will load `php.ini` from <span class="notranslate">`/usr/selector/php.ini`</span>. That file is actually a link to the real `php.ini` file from your system. So the same `php.ini` will be loaded in the end.
* You have to run <span class="notranslate">`cagefsctl --update`</span> any time you have modified `php.ini`, or you want to get new/updated software inside CageFS.
* CageFS installation changes <span class="notranslate">`jailshell`</span> to regular bash on cPanel - [read why](https://cloudlinux.zendesk.com/hc/articles/115004517685-Why-CageFS-installation-changes-jailshell-to-regular-bash-on-cPanel-).


### Installation and update

To install CageFS:
<div class="notranslate">

```
$ yum install cagefs
$ /usr/sbin/cagefsctl --init
```
</div>

That last command will create skeleton directory that might be around 7GB in size. If you don't have enough disk space in _/usr/share_, use following commands to have <span class="notranslate"> `cagefs-skeleton` </span> being placed in a different location:
<div class="notranslate">

```
$ mkdir /home/cagefs-skeleton
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton
```
</div>

The commands above should be executed before the <span class="notranslate">`cagefsctl --init`</span>.

Also, it is needed approximately 4Kb of disk space per one user for the <span class="notranslate">`/var/cagefs`</span> directory. You should place the <span class="notranslate">`/var/cagefs`</span> directory on partition, which is large enough and has disk quota enabled.

For example, to create the <span class="notranslate">`/var/cagefs`</span> directory on the <span class="notranslate">`/home`</span> partition, execute the following commands before the <span class="notranslate">`cagefsctl --init`</span>:

<div class="notranslate">

```
mkdir /home/cagefs
ln -s /home/cagefs /var/cagefs
```
</div>


:::danger IMPORTANT
Please make sure to turn on disk quota for a partition where the <span class="notranslate">`/var/cagefs`</span> directory is located, or move the <span class="notranslate">`/var/cagefs`</span> to a partition where disk quota is enabled. This is needed to prevent users from abusing disk quota inside CageFS.
:::

If the `/var/cagefs` directory is already created, you can move it. How to move the `/var/cagefs` directory:
[https://docs.cloudlinux.com/cloudlinux_os_components/#moving-var-cagefs-directory](https://docs.cloudlinux.com/cloudlinux_os_components/#moving-var-cagefs-directory)


::: danger IMPORTANT
If you are placing skeleton in <span class="notranslate">`/home`</span> directory on cPanel servers, you must configure the following option in cPanel WHM: <span class="notranslate"> **WHM -> Server Configuration -> Basic cPanel/WHM Setup -> Basic Config -> Additional home directories** </span>  
Change the value to blank (not default <span class="notranslate"> Home </span> ). Without changing this option, cPanel will create new accounts in incorrect places.
:::

CageFS will automatically detect and configure all necessary files for:
* cPanel
* Plesk
* DirectAdmin
* ISPmanager
* Interworx
* MySQL
* PostgreSQL
* LiteSpeed

Web interface to manage CageFS is available for cPanel, Plesk 10+, DirectAdmin, ISPmanager & Interworx. Command line tool would need to be used for other control panels.

Once you initialized the template you can start enabling users. By default CageFS is disabled for all users.

Starting from **cagefs-6.1-27** <span class="notranslate">`fs.proc_can_see_other_uid`</span> will be migrated (one time) from _/etc/sysctl.conf_ into _/etc/sysctl.d/90-cloudlinux.conf_ . If this variable is not set in either file, it will default to 0.

It is strongly advised against setting this variable in `90-cloudlinux.conf`. Define it in `/etc/sysctl.conf` or in some other config file with an index number greater than `90-cloudlinux.conf`, e.g. `/etc/sysctl.d/95-custom.conf`.

You can find more information on <span class="notranslate">`fs.proc_can_see_other_uid`</span> automatic migration in [Kernel Config Variables](/cloudlinux_os_kernel/#kernel-config-variables).


:::tip Note
You can also use [CageFS CLI](/command-line_tools/#cagefs)
:::

### Uninstalling

To uninstall CageFS, start by disabling and removing all directories:

<div class="notranslate">

```
$ /usr/sbin/cagefsctl --remove-all
```
</div>

That command will: disable CageFS for all customers, unmount CageFS for all users, removes <span class="notranslate"> _/usr/share/cagefs-skeleton_ & _/var/cagefs_ </span> directories. It will not remove _/etc/cagefs_ directory.

Remove CageFS RPM:

<div class="notranslate">

```
$ yum remove cagefs
```
</div>


### Managing users

CageFS provides for two modes of operations:

1. Enabled for all, except those that are disabled.
2. Disabled for all, except those that are enabled.

Mode #1 is convenient for production operation, where you want all new users to automatically be added to CageFS.
Mode #2 is convenient while you test CageFS, as it allows you to enable it on one by one for your customers.

To start using CageFS you have to select one of the mode of operations:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --enable-all
```
</div>
or
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --disable-all
```
</div>
or
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --toggle-mode
```
</div>
That will switch the operation mode, preserving current disabled/enabled users.

To enable individual user do:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --enable [username]
```
</div>
To disable individual user:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --disable [username]
```
</div>
To  list all enabled users:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --list-enabled
```
</div>
To list all disabled users:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --list-disabled
```
</div>
To see current mode of operation:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --display-user-mode
```
</div>


:::tip Note
You can also use [CageFS CLI](/command-line_tools/#cagefs)
:::

### Configuration

* [File system templates](/cloudlinux_os_components/#file-system-templates)

* [Excluding files](/cloudlinux_os_components/#excluding-files)

* [Excluding users](/cloudlinux_os_components/#excluding-users)

* [Mount points](/cloudlinux_os_components/#mount-points)

  * [Per user virtual mount points](/cloudlinux_os_components/#per-user-virtual-mount-points)

  * [Split by username](/cloudlinux_os_components/#split-by-username)
  
  * [Mounting user’s home directory inside CageFS](/cloudlinux_os_components/#mounting-users-home-directory-inside-cagefs)  

  * [How to hide directory inside mount point](/cloudlinux_os_components/#how-to-hide-directory-inside-mount-point)
  
  * [Example](/cloudlinux_os_components/#example)

* [Base home directory](/cloudlinux_os_components/#base-home-directory)

* [PostgreSQL support](/cloudlinux_os_components/#postgresql-support)

* [PAM configuration](/cloudlinux_os_components/#pam-configuration)

* [Filtering options for commands executed by proxyexec](/cloudlinux_os_components/#filtering-options-for-commands-executed-by-proxyexec)

* [Executing by proxy](/cloudlinux_os_components/#executing-by-proxy)

* [Users with duplicate UIDs](/cloudlinux_os_components/#users-with-duplicate-uids)

* [Examples](/cloudlinux_os_components/#examples)

  * [Example 1. Make users in CageFS be able to execute a script which must work outside CageFS](/cloudlinux_os_components/#example-1-make-users-in-cagefs-be-able-to-execute-a-script-which-must-work-outside-cagefs)

  * [Example 2. Permissions escalation](/cloudlinux_os_components/#example-2-permissions-escalation)

  * [Example 3. Custom proxyexec wrapper](/cloudlinux_os_components/#example-3-custom-proxyexec-wrapper)

* [Custom /etc files per customer](/cloudlinux_os_components/#custom-etc-files-per-customer)

* [Moving <span class="notranslate"> cagefs-skeleton </span> directory](/cloudlinux_os_components/#moving-cagefs-skeleton-directory)

* [Moving /var/cagefs directory](/cloudlinux_os_components/#moving-var-cagefs-directory)

* [TMP directories](/cloudlinux_os_components/#tmp-directories)

* [Syslog](/cloudlinux_os_components/#syslog)

* [Excluding mount points](/cloudlinux_os_components/#excluding-mount-points)

* [Shared memory (/dev/shm) isolation in CageFS](/cloudlinux_os_components/#shared-memory-dev-shm-isolation-in-cagefs)


#### File system templates

:::warning Note
Please do not modify any existing files in the <span class="notranslate">`/etc/cagefs/conf.d`</span> directory because they may be overwritten while updating CageFS package. You should create a new file with a unique name instead.
:::

CageFS creates a filesystem template in <span class="notranslate">`/usr/share/cagefs-skeleton`</span> directory. CageFS template will be mounted for each customer. The template is created by running:
<div class="notranslate">

```
# /usr/sbin/cagefsctl --init
```
</div>

To update the template, you should run:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --update
```
</div>

The behavior of the commands (and the files copied into <span class="notranslate"> _/usr/share/cagefs-skeleton_ </span> directory) depends on the configuration files in _/etc/cagefs/conf.d_  
You can add additional files, users, groups and devices into CageFS template by adding .cfg file, and running:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --update
```
</div>

To delete files from CageFS template, remove corresponding .cfg file, and run:
<div class="notranslate">

```
$ /usr/sbin/cagefsctl --update
```
</div>

Here is an example <span class="notranslate"> _openssh-clients.cfg_ </span> file:
<div class="notranslate">

```
[openssh-clients]

comment=OpenSSH Clients

paths=/etc/ssh/ssh_config, /bin/hostname, /usr/bin/scp, /usr/bin/sftp, /usr/bin/slogin, /usr/bin/ssh, /usr/bin/ssh-add, /usr/bin/ssh-agent, /usr/bin/ssh-copy-id, /usr/bin/.ssh.hmac, /usr/bin/ssh-keyscan, /usr/libexec/openssh/sftp-server, /etc/environment, /etc/security/pam_env.conf

devices=/dev/ptmx
```
</div>

Example <span class="notranslate"> _mail.cfg_ </span> file:
<div class="notranslate">

```
[mail]

comment=Mail tools

paths=/bin/mail, /etc/aliases.db, /etc/mail, /etc/mailcap, /etc/mail.rc, /etc/mime.types, /etc/pam.d/smtp.sendmail, /etc/rc.d/init.d/sendmail, /etc/smrsh, /etc/sysconfig/sendmail, /usr/bin/hoststat, /usr/bin/Mail, /usr/bin/mailq.sendmail, /usr/bin/makemap, /usr/bin/newaliases.sendmail, /usr/bin/purgestat, /usr/bin/rmail.sendmail, /usr/lib64/sasl2/Sendmail.conf, /usr/lib/mail.help, /usr/lib/mail.tildehelp, /usr/lib/sendmail.sendmail, /usr/sbin/mailstats, /usr/sbin/makemap, /usr/sbin/praliases, /usr/sbin/sendmail.sendmail, /usr/sbin/smrsh, /var/log/mail, /var/spool/clientmqueue, /var/spool/mqueue

users=smmsp

groups=smmsp
```
</div>

There is an easy way to add/delete files from particular <span class="notranslate"> RPMs </span> into CageFS. That can be done by using <span class="notranslate"> `--addrpm` and `--delrpm` </span> options in <span class="notranslate"> `cagefsctl` </span> . Like:
<div class="notranslate">

```
$ cagefsctl --addrpm ffmpeg
$ cagefsctl --update
```
</div>

::: tip Note
ffmpeg RPM should be installed on the system already.
:::


#### Excluding files


To exclude files and directories from CageFS, edit file:  
<span class="notranslate">`/etc/cagefs/custom.black.list`</span>  
And add files or directories in there, one per line.

Execute the following command to apply changes:
<div class="notranslate">

```
cagefsctl --force-update
```
</div>

Please do not edit <span class="notranslate">`/etc/cagefs/black.list`</span> file because it is replaced during the update of CageFS package.

#### Excluding users


To exclude users from CageFS, create a file (any name would work) inside <span class="notranslate">`/etc/cagefs/exclude`</span> folder, and list users that you would like to exclude from CageFS in that file (each user in separate line).

Then execute the following command to apply changes: 
<div class="notranslate">

```
cagefsctl --user-status USER
```
</div>

And check that the command shows <span class="notranslate">`Disabled`</span>.


#### Mount points


CageFS creates individual namespace for each user, making it impossible for users to see each other's files and creating high level of isolation. The way namespace is organized:

1. <span class="notranslate"> /usr/share/cagefs-skeleton </span> with safe files is created
2. Any directory from the server that needs to be shared across all users is mounted into <span class="notranslate">`/usr/share/cagefs-skeleton`</span>
(a list of such directories is defined in /etc/cagefs/cagefs.mp)
3. <span class="notranslate"> /var/cagefs/[prefix]/username </span> directory for each user. Prefix is defined as last two digits of user id. User id is taken from <span class="notranslate"> /etc/passwd </span> file.
4. Separate /etc directory is created and populated for each user inside <span class="notranslate"> /var/cagefs/[prefix]/username </span>
5. /tmp directory is mounted for each user separately into <span class="notranslate"> ~username/.cagefs/tmp directory </span>
6. Additional custom directories can be mounted for each user by defining them in /etc/cagefs/cagefs.mp
7. You can define custom directories per user using [virt.mp](/cloudlinux_os_components/#per-user-virtual-mount-points) files _[CageFS 5.1 and higher]_

To define individual custom directories in /etc/cagefs/cagefs.mp following format is used:

<span class="notranslate">`@/full/path/to/directory,permission notation`</span>


This is useful when you need to give each user its own copy of a particular system directory, like:

<span class="notranslate"> `@/var/run/screen,777` </span>


Such entry would create separate <span class="notranslate"> /var/run/screen </span> for each user, with permissions set to 777

To modify mount points, edit /etc/cagefs/cagefs.mp. Here is an example of cagefs.mp:
<div class="notranslate">

```
/var/lib/mysql
/var/lib/dav
/var/www/cgi-bin
/var/spool
/dev/pts
/usr/local/apache/domlogs
/proc
/opt
@/var/spool/cron,700
@/var/run/screen,777
```
</div>

If you want to change mount points, make sure you re-initialize mount points for all customers:
<div class="notranslate">

```
$ cagefsctl --remount-all
```
</div>
This command will kill all current processes and reset mount points.



#### **Per user virtual mount points**

_[CageFS 5.1 and higher]_

* _Please, see [Split by username](/cloudlinux_os_components/#split-by-username) feature, as it might be simpler to implement in some cases._ 

Starting with CageFS 5.1 you can specify additional directories to be mounted inside user's CageFS. This can be specified for each user.
To specify virtual mount points for a user, create a file:

<span class="notranslate"> `/var/cagefs/[prefix]/[user]/virt.mp` </span>


Inside that file, you can specify mount points in the following format:
<div class="notranslate">

```
virtdir1,mask
@subdir1,mask
@subdir2,mask
virdir2,mask
@subdir3,mask
@subdir4,mask
>virtdir3,mask
@subdir5,mask
@subdir6,mask
# comments
```
</div>

* <span class="notranslate"> _mask_ </span> is always optional, if missing 0755 is used
* Create virtual directory <span class="notranslate"> _subdir/virtdir_ </span> , mount it to:
  * <span class="notranslate"> skeleton _jaildir/virtdir_ </span>
  * inside virtual directory, create directories <span class="notranslate"> _subdir1, subdir2_ </span>
  * mount <span class="notranslate"> _virtdir1/subdir1_ </span> to <span class="notranslate"> _subdir/virtdir/subdir1_ </span>
  * if <span class="notranslate"> _virtdir_ </span> is started with >, create directory <span class="notranslate"> _subdir/virtdir_ </span> , but don't mount it into <span class="notranslate"> _jaildir_ </span> . This is needed for cases when <span class="notranslate"> _virtdir_ </span> is inside home base dir.
* if file _/var/cagefs/[prefix]/[user]/virt.mp_ is missing -- no virt directories are loaded for that user.

Note that CageFS will automatically create those files for Plesk 10 & higher.

For example if we have Plesk 11.5 with two users <span class="notranslate">_cltest1_</span>, and <span class="notranslate">_cltest2_</span>:
<div class="notranslate">

```
cltest1 uid 10000 has domains: cltest1.com, cltest1-addon.com and sub1.cltest1.com
cltest2 uid 10001 has domains: cltest2.com, cltest2-addon.com
```
</div>

In such case we would have file _/var/cagefs/00/cltest1/virt.mp_ :
<div class="notranslate">

```
>/var/www/vhosts/system,0755
@cltest1-addon.com,0755
@cltest1.com,0755
@sub1.cltest1.com,0755
```
</div>

and file: _/var/cagefs/01/cltest2/virt.mp:_
<div class="notranslate">

```
>/var/www/vhosts/system
@cltest2-addon.com
@cltest2.com
```
</div>


#### **Split by username**

_[CageFS 5.3.1+]_

Sometimes you might need to make sure that directory containing all users would show up as containing just that user inside CageFS. For example, if you have directory structure like:
<div class="notranslate">

```
/home/httpd/fcgi-bin/user1
/home/httpd/fcgi-bin/user2
```
</div>

Then we can add the following line to /etc/cagefs/cagefs.mp file:
<div class="notranslate">

```
%/home/httpd/fcgi-bin
```
</div>

and execute:
<div class="notranslate">

```
cagefsctl --remount-all
```
</div>

After that each subdirectory of <span class="notranslate"> _/home/httpd/fcgi-bin_ </span> will be mounted for appropriate user in CageFS: <span class="notranslate"> _/home/httpd/fcgi-bin/user1_ </span> will be mounted for <span class="notranslate"> user1 </span> and <span class="notranslate"> _/home/httpd/fcgi-bin/user2_ </span> will be mounted for <span class="notranslate"> user2 </span> .

#### **Mounting users home directory inside CageFS**


CageFS 6.1-1 (and later) has improved mounting user’s home directory that is applied for users with home directories like <span class="notranslate"> _/home/user_ or _/homeN/user_ </span> (where <span class="notranslate"> N </span> = 0,1,..9).

In such case, earlier versions of CageFS always mount user’s home directory to <span class="notranslate"> _/home/user_ </span> and create symlink <span class="notranslate"> _/homeN -> /home_ </span> when needed, so user’s home directory can be accessed both via <span class="notranslate"> _/home/user_ </span> and <span class="notranslate"> _/homeN/user_ </span> . This quirk leads to some rare incompatibilities between CageFS and other software (for example OpenCart), because real path of user’s home directory in CageFS and in real file system can differ.

New CageFS mounts user’s home directory in a way that its real path in CageFS is always the same as in real file system. Additionally, CageFS searches for symlinks like
<span class="notranslate"> _/homeX -> /homeY_ </span> and <span class="notranslate"> _/homeX/user -> /homeY/user_ </span> in real system and creates such symlinks in user’s CageFS when found.

This new mounting mode is enabled by default. You can switch to old mounting mode by executing the following commands:
<div class="notranslate">

```
# touch /etc/cagefs/disable.home.dirs.search
# cagefsctl --force-update
# cagefsctl --remount-all
```
</div>

:::tip Note
New mounting mode will be disabled automatically when "mounting base home directory" mode is enabled <span class="notranslate"> (`mount_basedir=1` setting in _/etc/cagefs/cagefs.base.home.dirs_ </span> file).
:::

#### How to hide directory inside mount point <sup><Badge type="warning" text="CageFS 6.4.7-1 +"/></sup>

:::tip Note
For files outside a mount point, use blacklisting, see: [Excluding files](/cloudlinux_os_components/#excluding-files)
:::

To hide directories inside a mount point, create a file in the <span class="notranslate">`/etc/cagefs/empty.dirs`</span> directory (you can use any name) with a list of directories to be hidden (these directories will look like empty for users in CageFS).
:::tip Note
Please do not edit the supplied config file (<span class="notranslate">`/etc/cagefs/empty.dirs/emptied_dirs.default`</span>).
:::

#### Example

Let’s take a <span class="notranslate">`/var/www`</span> directory which contains the following folders: <span class="notranslate">`icons`</span> and <span class="notranslate">`html`</span>.
To hide the <span class="notranslate">`/var/www`</span> directory content from users inside CageFS, we will do the following:

* Create the <span class="notranslate">`custom.empty`</span> file with a single record: <span class="notranslate">`/var/www`</span>
* Place the <span class="notranslate">`custom.empty`</span> file to the <span class="notranslate">`/etc/cagefs/empty.dirs`</span> directory
* Run the <span class="notranslate">`cagefsctl --remount-all`</span> command

Now, all users inside CageFS will see the <span class="notranslate">`/var/www`</span> directory as an empty directory even if there is <span class="notranslate">`/var/www/html`</span> in the <span class="notranslate">`/etc/cagefs/cagefs.mp`</span>.



#### Base home directory


If you have a custom setup where home directories are in a special format, like: <span class="notranslate"> _/home/$USERNAME/data_ </span> , you can specify it using regular expressions. This is needed by CageFS to create safe home space for end user, where no other users are visible.

We will create empty: <span class="notranslate"> _/var/cagefs/[prefix]/$USERNAME/home_ </span> , and then mount <span class="notranslate"> _/home/$USERNAME_ </span> in that directory

To do that, create a file: <span class="notranslate"> _/etc/cagefs/cagefs.base.home.dirs_ </span>

With content like:
<div class="notranslate">

```
^/home/
^/var/www/users/
```
</div>

If there is no such file, the home directory without last component will be considered as a base dir, like with
<span class="notranslate"> _/home/$USERNAME_ </span> we would create <span class="notranslate"> _/var/cagefs/[prefix]/$USERNAME/home_ </span> , and then mount
<span class="notranslate"> _/home/$USERNAME_ </span> in there

With <span class="notranslate"> _/home/$USERNAME/data_ </span> as a home dir, we would assume that <span class="notranslate"> _/home/$USERNAME_ </span> is the base directory, and we would create <span class="notranslate"> _/var/cagefs/[prefix]/$USERNAME/home/$USERNAME/data_ </span> and then we would mount <span class="notranslate"> _/home/$USERNAME/data_ </span> -- which would cause each user to see empty base directories for other users, exposing user names.

**Sharing home directory structure among users**

When you want to share directory structure among multiple users, you can add following line at the top of the <span class="notranslate"> _/etc/cagefs/cagefs.base.home.dirs_ </span> file. This is useful on the systems that support sites with multiple users, with different home directories inside the main 'site' directory.
<div class="notranslate">

```
mount_basedir=1
```
</div>

For example:

<span class="notranslate"> user1 </span> has home directory <span class="notranslate"> _/var/www/vhosts/sitename.com/web_users/user1_ </span>
<span class="notranslate"> user2 </span> has home directory <span class="notranslate"> _/var/www/vhosts/sitename.com/web_users/user2_ </span>
site admin has home directory <span class="notranslate"> _/var/www/vhosts/sitename.com_ </span>

So, content of <span class="notranslate"> _/etc/cagefs/cagefs.base.home.dirs_ </span> should be the following:

<div class="notranslate">

```
mount_basedir=1
^/var/www/vhosts/[^/]+
```
</div>

Directory structure in <span class="notranslate"> _/var/www/vhosts/sitename.com_ </span> will be mounted in CageFS for appropriate users.  
Each user will have access to whole directory structure in <span class="notranslate"> _/var/www/vhosts/sitename.com_ </span> (according to their permissions).

::: tip Note
You should execute <span class="notranslate"> `cagefsctl --remount-all` </span> in order to apply changes to CageFS (i.e. remount home directories).
:::

#### PostgreSQL support


CloudLinux 7:

CageFS works with any PostgreSQL version installed from CloudLinux or CentOS repositories. PostgreSQL packages for CloudLinux 7 come from the upstream (CentOS) unmodified. PostgreSQL’s socket is located in <span class="notranslate"> _/var/run/postgresql_ </span> directory. This directory is mounted to CageFS by default (in cagefs-5.5-6.34 or later).

When PostgreSQL has been installed after CageFS install, please add line:
<div class="notranslate">

```
/var/run/postgresql
```
</div>

tо _/etc/cagefs/cagefs.mp_ file and then execute:
<div class="notranslate">

```
cagefsctl --remount-all 
```
</div>

The steps above are enough to configure CageFS to work with PostgreSQL.

CloudLinux 6:

CageFS provides separate _/tmp_ directory for each end user. Yet, PostgreSQL keeps its Unix domain socket inside server's main _/tmp_ directory. In addition to that, the location is hard coded inside PostgreSQL libraries.

To resolve the issue, CloudLinux provides a version of PostgreSQL with modified start up script that can store PostgreSQL's socket in <span class="notranslate"> _/var/run/postgres._ </span> The script automatically creates link from _/tmp_ to that socket to prevent PostgreSQL dependent applications from breaking.

In addition to that, CageFS knows how to correctly link this socket inside end user's _/tmp_ directory.

To enable PostgreSQL support in CageFS:

1. Make sure you have updated to latest version of PostgreSQL.

2. Edit file _/etc/sysconfig/postgres_, and uncomment <span class="notranslate"> _SOCK_DIR_ </span> line.

3. Update CageFS configuration by running:

<div class="notranslate">

```
cagefsctl  --reconfigure-cagefs
```
</div>

4. Restart PostgreSQL by running:

<div class="notranslate">

```
$ service postgresql restart 
```
</div>

If you are using cPanel, you would also need to modify file: <span class="notranslate"> _/etc/cron.daily/tmpwatch_ </span>

And update line:
<div class="notranslate">

```
flags=-umc 
```
</div>

to:
<div class="notranslate">

```
flags=-umcl
```
</div>

to prevent symlink from being removed.

#### PAM configuration


CageFS depends on <span class="notranslate"> **pam_lve** </span> module for PAM enabled services. When installed, the module is automatically installed for following services:

* sshd
* crond
* su

The following line is added to corresponding file in `/etc/pam.d/`:
<div class="notranslate">
```
session    required     pam_lve.so      100     1
```
</div>

Where 100 stands for minimum <span class="notranslate"> UID </span> to put into <span class="notranslate">CageFS & LVE</span> , and 1 stands for CageFS enabled.


#### Filtering options for commands executed by proxyexec

You can disallow a user in CageFS to execute specific commands with some specific *dangerous* options via proxyexec.

To do so, you should create <span class="notranslate">`<command>.json`</span> file in the <span class="notranslate">`/etc/cagefs/filters`</span> directory and specify the names of options you want to disable.

For example, to disable some options of <span class="notranslate">`sendmail`</span> command, <span class="notranslate">`/etc/cagefs/filters/sendmail.json`</span> is created with the following content:

<div class="notranslate">

```
{
  "default": {
    "deny": [
      "-be",
      "-bem"
    ],
    "restrict_path": [
      "-C",
      "-D"
    ]
  },
  "/usr/sbin/sendmail": {
    "deny": [
      "-be",
      "-bem"
    ],
    "restrict_path": [
      "-C",
      "-D"
    ]
  },
  "/var/qmail/bin/sendmail": {
    "deny": [
      "-be",
      "-bem"
    ],
    "restrict_path": [
      "-C",
      "-D"
    ]
  },
  "/usr/sbin/sendmail.sendmail": {
    "deny": [
      "-be",
      "-bem"
    ],
    "restrict_path": [
      "-C",
      "-D"
    ]
  },
  "/usr/local/cpanel/bin/sendmail": {
    "deny": [
      "-be",
      "-bem"
    ],
    "restrict_path": [
      "-C",
      "-D"
    ]
  }
}
```
</div>

You can specify options for different paths separately (for example, <span class="notranslate">`/usr/sbin/sendmail`</span> or <span class="notranslate">`/var/qmail/bin/sendmail`</span>).

If the path to the program being executed does not match any path specified in the config file, then default parameters are used.

* <span class="notranslate">`deny`</span> list should contain options that should be disallowed for use by users (the black list of options, all other options will be allowed).
* You can specify the white list of options in the <span class="notranslate">`allow`</span> list (all other options will be denied).
* You cannot specify both white and black list (<span class="notranslate">`allow`</span> and <span class="notranslate">`deny`</span>).

It is possible to verify that a path specified as a parameter for an option does not refer outside of the user’s home directory. This check is performed for options specified in the <span class="notranslate">`restrict_path`</span> list. All issues are reported in <span class="notranslate">`/var/log/secure`</span> log file.


#### Executing by proxy


Some software has to run outside CageFS to be able to complete its job. It includes such programs as passwd, sendmail, etc. CageFS provides proxyexec technology to accomplish this goal: you can define any program to run outside CageFS by specifying it in any file located in the <span class="notranslate">`/etc/cagefs/`</span> which ends with <span class="notranslate">`.proxy.commands`</span>. In the examples below we use <span class="notranslate">`custom.proxy.commands`</span>, but you can use any other name, e.g. <span class="notranslate">`mysuperfile.proxy.commands`</span>.

::: tip Warning
Do not edit the existing <span class="notranslate">`/etc/cagefs/proxy.commands`</span> file as it will be overwritten with the next CageFS update.
:::

The syntax of the <span class="notranslate">`/etc/cagefs/[*.]proxy.commands`</span> file is as follows:

<div class="notranslate">

```
ALIAS[:wrapper_name]=[username:]path_to_executable
```

</div>

| Parameter          | Description |
| ------------------ | ----------- |
| <span class="notranslate">`ALIAS`</span>              | Any name unique within all <span class="notranslate">`/etc/cagefs/\[*.\]proxy.commands`</span> files. Used as an identifier.|
| <span class="notranslate">`wrapper_name`</span>       | Optional field. The name of the wrapper file which is used as a replacement for an executable file (set by <span class="notranslate">`path_to_executable`</span>) inside CageFS. <br><br>Possible values:<br>- a name of a wrapper you place into the <span class="notranslate">`/usr/share/cagefs/safeprograms`</span> directory;<br>- <span class="notranslate">`noproceed`</span> - a reserved word which means that the wrapper is not needed, e.g. when it is already installed by other ALIAS. Often used for the commands with several ALIAS as in the example below.<br>- omit this field - default wrapper <span class="notranslate">`cagefs.proxy.program`</span> will be used.<br><br>Used in cases when you'd like to give access only to the part of binary functions but it is not possible to do that using [options filtering](/cloudlinux_os_components/#filtering-options-for-commands-executed-by-proxyexec).<br>**Note**: wrapper works inside CageFS with user rights and executes “real” scripts using proxy daemon. |
| <span class="notranslate">`path_to_executable`</span> | A path to an executable file that will run via proxyexec.|
| <span class="notranslate">`username`</span>           | Optional field. A name of a user on whose behalf <span class="notranslate">`path_to_executable`</span> will run in the real system. If <span class="notranslate">`username`</span> is not specified, then <span class="notranslate">`path_to_executable`</span> will run on behalf of the same user who is inside CageFS. |


Once the program is defined, run this command to populate the skeleton:

<div class="notranslate">

```
$ cagefsctl --force-update
```

</div>

#### Users with duplicate UIDs

Sometimes hosters may have users with non-unique <span class="notranslate">UIDs</span>. Thus, <span class="notranslate">`proxyexec`</span> may traverse users' directories to find a specific one. That behavior turns into inappropriate if the user's directory is not cached locally (for example LDAP is used).

To turn this feature off, run:

<div class="notranslate">

```
touch /etc/cagefs/proxy.disable.duid
```
</div>

Or to activate it back, run:

<div class="notranslate">

```
rm /etc/cagefs/proxy.disable.duid
```
</div>


#### Examples

Let's have a script that must do some stuff outside CageFS and return a result to a user. Let's name it <span class="notranslate">`superbinary`</span> and place it into the <span class="notranslate">`/my/scripts/`</span> directory.

In the examples below, we will use a small script that:

* checks if it works inside or outside of CageFS
* prints a number of users in the <span class="notranslate">`/etc/passwd`</span> file

We use the <span class="notranslate">`/etc/passwd`</span> file because it is truncated inside the cage by default and we can easily see the difference between CageFS and the “real” system by just counting lines in it.

<div class="notranslate">

```
$ cat /opt/scripts/superbinary
#!/usr/bin/env bash
if [[ -e /var/cagefs ]]; then
  echo "I am running without CageFS"
else
  echo "I am running in CageFS"
fi;
echo "I am running as: `whoami`"
echo "Number or records in /etc/passwd: `cat /etc/passwd | wc -l`"
```
</div>

First, let’s check that CageFS works: create a user and disable the cage:

<div class="notranslate">

```
useradd test
cagefsctl --disable test
```
</div>

Then, run the following command as <span class="notranslate">`root`</span> and you will see the following output:

<div class="notranslate">

```
[root ~]# su - test -c "/my/scripts/superbinary"
I am running without CageFS
I am running as: test
Number or records in /etc/passwd: 49
```
</div>

Now, enable CageFS for the <span class="notrabslate">`test`</span> user and run the command again:

<div class="notranslate">

```
[root ~]# cagefsctl --enable test
[root ~]# su - test -c "/my/scripts/superbinary"
-bash: /my/scripts/superbinary: No such file or directory
```
</div>

As you can see the access to the file is restricted by CageFS.

#### Example 1. Make users in CageFS be able to execute a script which must work outside CageFS

Add the following line into the <span class="notranslate">`/etc/cagefs/custom.proxy.commands`</span>:

<div class="notranslate">

```
MYSUPERBINARY=/my/scripts/superbinary
```
</div>

Then run the <span class="notranslate">`cagefsctl --force-update`</span>, which will place a special wrapper instead of your script inside CageFS. And run your script again:

<div class="notranslate">

```
[root ~]# su - test -c "/my/scripts/superbinary"
I am running without CageFS
I am running as: test
Number or records in /etc/passwd: 49
```
</div>

To compare, let’s count a number of users in the <span class="notranslate">`/etc/passwd`</span> directly:

<div class="notranslate">

```
[root ~]# su - test -c "cat /etc/passwd | wc -l"
25
```
</div>

**Result**: the script escapes from CageFS and has access to all files which a user with disabled CageFS has.

#### Example 2. Permissions escalation

Let's imagine that you need to give the users the ability to run a script which gets information about their domains from the <span class="notranslate">`apache.conf`</span>. To do that, you need root permissions. You can achieve that with proxyexec.

First, run the following:

<div class="notranslate">

```
echo "MYSUPERBINARY=root:/my/scripts/superbinary" > /etc/cagefs/custom.proxy.commands
```
</div>

And then, run the example script again:

<div class="notranslate">

```
[root ~]# su - test -c "/my/scripts/superbinary"
I am running without cagefs
I am running as: root
Number or records in /etc/passwd: 49
```
</div>

As you can see, the script now works with root permissions, as set in the <span class="notranslate">`custom.proxy.commands`</span> file. In order to get information about a user who runs the script, use the following environment variables:

<div class="notranslate">

```
PROXYEXEC_UID
PROXYEXEC_GID
```
</div>

**Example**:

<div class="notranslate">

```
[root ~]# id test
uid=1226(test) gid=1227(test) groups=1227(test)
[root ~]# su - test -c "/my/scripts/superbinary"                                                
I am running without CageFS                                                                          
I am running as: root
Number or records in /etc/passwd: 49
PROXYEXEC_UID=1226
PROXYEXEC_GID=1227
```
</div>

**Result**: users can run the script that gains the root permissions and work outside CageFS. Of course, you can set any other user instead of root in the <span class="notranslate">`custom.proxy.commands`</span>.

#### Example 3. Custom proxyexec wrapper

Let’s modify the test binary in a next way:


<div class="notranslate">

```

[root ~]# cat /my/scripts/superbinary
#!/usr/bin/env bash
FILE="$1"
if [[ -e /var/cagefs ]]; then
  echo "I am running without CageFS"
else
  echo "I am running in CageFS"
fi;
echo "I am running as: `whoami`"
echo "Number or records in ${FILE}: `cat ${FILE} | wc -l`"
echo "PROXYEXEC_UID=${PROXYEXEC_UID}"
echo "PROXYEXEC_GID=${PROXYEXEC_GID}"
```
</div>

Now users can pass any path to the file as an argument. In order to restrict possible parameters (file paths) that users can pass, you can use the custom proxyexec wrapper.

First, duplicate the default wrapper and give it a name, e.g. <span class="notranslate">`cagefs.proxy.mysuperbinary`</span>.

<div class="notranslate">

```
[root ~]# cp /usr/share/cagefs/safeprograms/cagefs.proxy.program /usr/share/cagefs/safeprograms/cagefs.proxy.mysuperbinary
```
</div>

The default wrapper already contains a check that does not allow to run it by the root user:

<div class="notranslate">

```
#!/bin/bash
##CageFS proxyexec wrapper - ver 15
    
if [[ $EUID -eq 0 ]]; then
    echo 'Cannot be run as root'
    exit 1
fi
...
```
</div>

Add the new check below:

<div class="notranslate">

```
if [[ $1 == "/etc/passwd" ]]; then                                                    
    echo "it is not allowed for user to view this file!"                  
    exit 1      
fi
```
</div>

Now, set a custom binary name in the <span class="notranslate">`custom.proxy.commands`</span>:

<div class="notranslate">

```
[root ~]# cat /etc/cagefs/custom.proxy.commands
MYSUPERBINARY:cagefs.proxy.mysuperbinary=root:/my/scripts/superbinary
```
</div>

Run skeleton update and check that everything works as expected:

<div class="notranslate">

```
[root ~]# cagefsctl --force-update
[root ~]# su - test -c "/my/scripts/superbinary /etc/passwd"
it is not allowed for user to view this file!
[root ~]# su - test -c "/my/scripts/superbinary /etc/group"
I am running without CageFS
I am running as: root
Number or records in /etc/group: 76
PROXYEXEC_UID=1226
PROXYEXEC_GID=1227
```
</div>

::: tip Notes and warnings
1. Make sure that a directory with your script is not listed in the <span class="notranslate">`/etc/cagefs/cagefs.mp`</span> (is not mounted inside the cage). Otherwise, the proxyexec will not work because CageFS will not be able to replace your script with a special wrapper inside the cage.
2. Use this feature with caution because it gives users the ability to execute specified commands outside CageFS. SUID commands are extremely dangerous because they are executed not as a user, but as an owner of the file (typically root). You should give users the ability to execute safe commands only. These commands should not have known vulnerabilities. You should check that users cannot use these commands to get sensitive information on a server. You can disable specific dangerous options of programs executed via proxyexec using [filtering options](/cloudlinux_os_components/#filtering-options-for-commands-executed-by-proxyexec).
3. In cPanel, all the scripts located in the <span class="notranslate">`/usr/local/cpanel/cgi-sys/`</span>, that user might need to execute, should be added to the custom <span class="notranslate">`*.proxy.commands`</span> file.
:::

#### Custom /etc files per customer


_[4.0-5 and later]_

To create a custom file in /etc directory for end user, create a directory:  
<span class="notranslate"> _/etc/cagefs/custom.etc/[username]_ </span>

Put all custom files, and sub-directories into that direcotry.

For example, if you want to create custom <span class="notranslate"> _/etc/hosts_ file for USER1 </span> , create a directory:  
<span class="notranslate"> _/etc/cagefs/custom.etc/USER1_ </span>

Inside that directory, create a <span class="notranslate"> _hosts_ </span> file, with the content for that user.

After that execute:
<div class="notranslate">

```
$ cagefsctl --update-etc USER1
```
</div>

If you are making changes for multiple users, you can run:

<div class="notranslate">

```
$ cagefsctl --update-etc
```
</div>

To remove a custom file, remove it from <span class="notranslate"> _/etc/cagefs/custom.etc/[USER]_ </span> directory, and re-run:
<div class="notranslate">

```
$ cagefsctl --update-etc
```
</div>


#### Moving cagefs-skeleton directory


Sometimes you might need to move <span class="notranslate"> cagefs-skeleton </span> from <span class="notranslate"> _/usr/share_ </span> to another partition.

There are two ways:

1. If <span class="notranslate">`/usr/share/cagefs-skeleton`</span> is not created yet ( <span class="notranslate"> cagefsctl --init </span> wasn't executed), then execute:

<div class="notranslate">

```
$ mkdir /home/cagefs-skeleton 
$ ln -s /home/cagefs-skeleton /usr/share/cagefs-skeleton 
$ cagefsctl --init
```
</div>

2. If <span class="notranslate"> _/usr/share/cagefs-skeleton_ </span> already exists, see [this article](https://cloudlinux.zendesk.com/hc/en-us/articles/115004560129-How-do-I-move-usr-share-cagefs-skeleton-to-other-place-because-of-low-disk-space)

#### Moving /var/cagefs directory


To move <span class="notranslate">`/var/cagefs`</span> to another location:

<div class="notranslate">
 
```
$ cagefsctl --disable-cagefs
$ cagefsctl --unmount-all
```
</div>

Verify that <span class="notranslate">`/var/cagefs.bak`</span> directory does not exist (if it exists - change name "cagefs.bak" to something else)

<div class="notranslate">

```
$ cp -rp /var/cagefs /new/path/cagefs
$ mv /var/cagefs /var/cagefs.bak
$ ln -s /new/path/cagefs /var/cagefs
$ cagefsctl --enable-cagefs
$ cagefsctl --remount-all
```
</div>

Verify that the following command gives empty output:
<div class="notranslate">

```
$ cat /proc/mounts | grep cagefs.bak
```
</div>

Then you can safely remove /var/cagefs.bak:
<div class="notranslate">

```
$ rm -rf /var/cagefs.bak
```
</div>

#### TMP directories


CageFS makes sure that each user has his own <span class="notranslate"> _/tmp_ </span> directory, and that directory is the part of end-user's quota.

The actual location of the directory is <span class="notranslate"> _$USER_HOME/.cagefs/tmp_ </span>

Once a day, using cron job, <span class="notranslate"> CageFS </span> will clean up user's <span class="notranslate"> _/tmp_ </span> directory from all the files that haven't been accessed during 30 days.

This can be changed by running:
<div class="notranslate">

```
$ cagefsctl --set-tmpwatch='/usr/sbin/tmpwatch -umclq 720'
```
</div>

Where 720 is the number of hours that the file had to be inaccessible to be removed.

By default this is done at 03:37 AM, but you can also force the clean up outdated files that match 'chosen period' of all user's <span class="notranslate"> _/tmp_ </span> directories without waiting for a job to be launched by <span class="notranslate"> cronjob </span> . Just run:

<div class="notranslate">

```
$ cagefsctl --tmpwatch
```
</div>

The following paths will be cleaned as well:

* <span class="notranslate">`/var/cache/php-eaccelerator`</span> (actual location <span class="notranslate">`$USER_HOME/.cagefs/var/cache/php-eaccelerator`</span>)
* <span class="notranslate">`/opt/alt/phpNN/var/lib/php/session`</span> (actual location <span class="notranslate">`$USER_HOME/.cagefs/opt/alt/phpNN/var/lib/php/session`</span>), where NN corresponds to Alt-PHP version.


You can configure <span class="notranslate">`tmpwatch`</span> to clean custom directories inside <span class="notranslate"> CageFS</span>.

Create <span class="notranslate">`/etc/cagefs/cagefs.ini`</span> configuration file and specify <span class="notranslate">`tmpwatch_dirs`</span> directive as follows:

<span class="notranslate">`tmpwatch_dirs=/dir1,/dir2`</span>

After that directories <span class="notranslate">`/dir1`</span> and <span class="notranslate">`/dir2`</span> inside CageFS  will be cleaned automatically.

Note that actual location of those directories in real file system is <span class="notranslate">`$USER_HOME/.cagefs/dir1`</span> and <span class="notranslate">`$USER_HOME/.cagefs/dir2`</span>.

**Cleanup PHP sessions**

For cPanel servers, CageFS version 6.0-42 or higher performs cleaning of PHP sessions based on <span class="notranslate">`session.gc_maxlifetime`</span> and <span class="notranslate">`session.save_path`</span> directives specified in proper <span class="notranslate">`php.ini`</span> files.

<span class="notranslate">`session.gc_maxlifetime`</span> directive default value is 1440 seconds. Those session files will be deleted, that were created or had metadata (ctime) changes more time ago than it is specified in <span class="notranslate">`session.gc_maxlifetime`</span>.

For <span class="notranslate"> Alt-PHP </span> versions <span class="notranslate">`session.save_path`</span> value is normally <span class="notranslate">`/tmp`</span>.

::: tip Note
For new installations of Alt-PHP packages, <span class="notranslate">`session.save_path`</span> will be changed from `/tmp` to <span class="notranslate">`/opt/alt/phpNN/var/lib/php/session`</span>, where NN corresponds to Alt-PHP version.
:::

This applies to the following <span class="notranslate"> Alt-PHP </span> versions (or later):
* alt-php44-4.4.9-71;
* alt-php51-5.1.6-81;
* alt-php52-5.2.17-107;
* alt-php53-5.3.29-59;
* alt-php54-5.4.45-42;
* alt-php55-5.5.38-24;
* alt-php56-5.6.31-7;
* alt-php70-7.0.23-5;
* alt-php71-7.1.9-5;
* alt-php72-7.2.0-0.rc.2.2.

When using EasyApache 3, <span class="notranslate"> _session.save_path_ </span> value is normally <span class="notranslate"> _/var/cpanel/php/sessions/ea3_ </span> or <span class="notranslate"> _/tmp_ </span> . Seettings for EasyApache 3 are usualy taken from the file <span class="notranslate"> _/usr/local/lib/php.ini_ . </span>

When using EasyApache 4, <span class="notranslate"> _session.save_path_ </span> value is normally <span class="notranslate"> _/var/cpanel/php/sessions/ea-phpXX_ ,  </span> where <span class="notranslate"> _XX_ </span> corresponds to PHP version.

Cleaning is started by cron <span class="notranslate"> _/etc/cron.d/cpanel_php_sessions_cron_ </span> , which starts the script <span class="notranslate"> _/usr/share/cagefs/clean_user_php_sessions_ </span> twice within one hour.

The settings for ea-php are located in <span class="notranslate"> _/opt/cpanel/ea-phpXX/root/etc/php.d/local.ini_ </span> or in <span class="notranslate"> _/opt/cpanel/ea-phpXX/root/etc/php.ini_ </span> , where <span class="notranslate"> _XX_ </span> corresponds to the PHP version.

The settings for alt-php are located in <span class="notranslate"> _/opt/alt/phpXX/etc/php.ini_ </span> files, where <span class="notranslate"> _XX_ </span> corresponds to PHP version.

The cleaning script cleans php sessions for all PHP versions ( <span class="notranslate"> _ea-php_ </span> and <span class="notranslate"> _alt-php_ </span> ) regardless of whether a version is used or selected via <span class="notranslate"> MultiPHP Manager </span> or <span class="notranslate"> PHP Selector </span> . When different <span class="notranslate"> _session.gc_maxlifetime_ </span> values are specified for the same <span class="notranslate"> _session.save_path_ </span> (for different php versions), the cleaning script will use the least value for cleaning <span class="notranslate"> _session.save_path_ </span> . So, it is recommended to specify different <span class="notranslate"> _session.save_path_ </span> for each PHP version.

Users can define custom value of <span class="notranslate"> _session.gc_maxlifetime_ via PHP Selector </span> in order to configure PHP's garbage collector, but that will not affect the script for cleaning PHP sessions. The script cleans PHP sessions based on global values of <span class="notranslate"> _session.gc_maxlifetime_ </span> and <span class="notranslate"> _session.save_path_ </span> directives taken from files mentioned above. Settings in custom users’ <span class="notranslate"> php.ini </span> files are ignored.

**Cleanup PHP session files in Plesk**

For Plesk servers, <span class="notranslate"> CageFS </span> version 6.0-52 or higher is provided with a special cron job for removing obsolete PHP session files. Cleanup script runs once an hour (similar to how it is done in Plesk).

Each time the script runs, it performs the cleanup of the paths:

1. set by <span class="notranslate"> `session.save_path` </span> directive in <span class="notranslate"> _/opt/alt/phpXX/etc/php.ini_ </span> files. If <span class="notranslate"> session.save_path </span> is missing, then <span class="notranslate"> /tmp </span> is used. Session files lifetime is set by <span class="notranslate"> session.gc_maxlifetime </span> directive. If it is not found, then 1440 seconds value is used (24 minutes, as in Plesk). Lifetime set in the file is only taken into consideration if it is longer than 1440 seconds, otherwise 1440 seconds is used. All the installed <span class="notranslate"> Alt-PHP </span> versions are processed.

2. <span class="notranslate"> _/var/lib/php/session_ </span> . Files lifetime is only defined by Plesk script <span class="notranslate"> _/usr/lib64/plesk-9.0/maxlifetime_ </span> . If the script is missing or returns errors, then this directory is not processed.

The following features are applied during the cleanup:

* all the users with <span class="notranslate"> UID </span> higher than specified in <span class="notranslate"> _/etc/login.defs_ </span> are processed. Each user is processed independently from one another.
* only directories inside <span class="notranslate"> CageFS </span> are being cleaned. The paths of the same name in the physical  file system are not processed.
* in all the detected directories, all the files with the names that correspond to <span class="notranslate"> `sess_ ` search </span> mask are removed, the rest of the files are ignored.
* the files older than specified lifetime are removed.
* all non-fatal errors (lack of rights, missing directory) are ignored and do not affect the further work of the script.

**Disable PHP sessions cleanup on cPanel and Plesk**

Here is a possible workaround for PHP session expiration problem (session lives longer than it is possible in a control panel). To use your own custom PHP sessions cleanup scripts - you can turn off built-in sessions cleanup implementation in the following way: 
add <span class="notranslate"> `clean_user_php_sessions=false` line to _/etc/sysconfig/cloudlinux_ </span> .



#### Syslog


By default, <span class="notranslate"> _/dev/log_ </span> should be available inside end user's <span class="notranslate"> CageFS </span> . This is needed so that user's cronjobs and other things that user <span class="notranslate"> _dev/log_ </span> would get recorded in the system log files.

This is controlled using file <span class="notranslate"> _/etc/rsyslog.d/schroot.conf_ </span> with the following content:
<div class="notranslate">

```
$AddUnixListenSocket /usr/share/cagefs-skeleton/dev/log
```
</div>

To remove presence of <span class="notranslate"> _dev/log_ </span> inside CageFS, remove that file, and restart rsyslog service.


#### Excluding mount points

**How to exclude mounts from namespaces for all LVEs**


By default, all mounts from the real file system is inherited by namespaces of all <span class="notranslate"> LVEs </span> . So, destroying all <span class="notranslate"> LVEs </span> may be required in order to unmount some mount in real file system completely. Otherwise, mount point remains busy after unmounting it in the real file system because this mount exists in namespaces of <span class="notranslate"> LVEs </span> .

<span class="notranslate"> `lvectl start` </span> command saves all mounts from real file system as “default namespace” for later use in all <span class="notranslate"> LVEs </span> . <span class="notranslate"> **lve_namespaces** </span> service executes <span class="notranslate"> `lvectl start` </span> command during startup.

In <span class="notranslate"> **lve-utils-2.0-26** </span> (and later) there is an ability to exclude specific mounts from namespaces for all <span class="notranslate"> LVEs </span> .
In order to do so, please create a file <span class="notranslate"> _/etc/container/exclude_mounts.conf_ </span> with list of mounts to exclude (one mount per line) as regular expressions, and then execute <span class="notranslate"> `lvectl start` </span> :
<div class="notranslate">

```
# cat /etc/container/exclude_mounts.conf    
^/dir1/
^/dir2$
# lvectl start
```
</div>

After that, all new created <span class="notranslate"> LVEs </span> will be without <span class="notranslate"> _/dir2_ </span> mount and without mounts that start with <span class="notranslate"> _/dir1/_ </span> (like <span class="notranslate"> _/dir1/x_ ,  _/dir1/x/y_ </span> , etc). To apply changes to existing <span class="notranslate"> LVEs </span> you should recreate <span class="notranslate"> LVEs </span> :
<div class="notranslate">

```
# lvectl destroy all   
# lvectl apply all
```
</div>

::: tip Note
You should recreate all LVEs only once after creating <span class="notranslate"> _/etc/container/exclude_mounts.conf_ </span> file. After that the configuration changes will be applied to all new LVEs automatically.
:::

#### Shared memory (/dev/shm) isolation in CageFS

:::tip Note
Requires `cagefs-6.2.1-1` or later
:::

The `/dev/shm` in a real file system directory is “world-writable”. This directory from the real file system is mounted to CageFS by default, so `/dev/shm` directory is common for all users by default. However, it is possible to improve security and isolate `/dev/shm` (shared memory) for each user in CageFS.

To enable `/dev/shm` isolation, do the following steps:

1. Delete `/dev/shm` line from the `/etc/cagefs/cagefs.mp` file

  <div class="notranslate">

  ```
  sed -i -e '/^\/dev\/shm/d' /etc/cagefs/cagefs.mp
  ```
  </div>

2. Create a configuration file with mount options for shared memory
   
  <div class="notranslate">

  ```
  echo 'mode=0777' > /etc/cagefs/dev.shm.options
  ```
  </div>

3. Remount CageFS to apply changes
   
  <div class="notranslate">

  ```
  cagefsctl --remount-all
  ```
  </div>

You can also specify additional mount options.

For example, you can specify the size of shared memory in megabytes:

<div class="notranslate">

```
echo 'mode=0777,size=1m' > /etc/cagefs/dev.shm.options
cagefsctl --remount-all
```
</div>

Or you can specify the size of user’s physical memory limit (PMEM) in percentage:

<div class="notranslate">

```
echo 'mode=0777,size=50%' > /etc/cagefs/dev.shm.options
cagefsctl --remount-all
```
</div>

To disable `/dev/shm` isolation, do the following steps:

1. Delete configuration file

  <div class="notranslate">

  ```
  rm -f /etc/cagefs/dev.shm.options
  ```
  </div>

2. Validate `/etc/cagefs/cagefs.mp` file

  <div class="notranslate">

  ```
  cagefsctl --check-mp
  ```
  </div>

3. Add `/dev/shm` line to `/etc/cagefs/cagefs.mp` file

  <div class="notranslate">

  ```
  echo '/dev/shm' >> /etc/cagefs/cagefs.mp
  ```
  </div>

4. Remount CageFS to apply changes

  <div class="notranslate">

  ```
  cagefsctl --remount-all
  ```
  </div>

:::tip Note
you should specify `mode=0777`. It is required for the proper operation of shared memory inside CageFS. This is not a security issue because the `/dev/shm` directory is isolated for each user and visible inside a user’s CageFS only.
:::

:::tip Note
`/dev/shm` is mounted with `nosuid,nodev,noexec` mount options always (both in “isolated `/dev/shm`” mode and not). You cannot change this behavior.
:::

:::tip Note
“isolated `/dev/shm`” mode will become the default in the future CageFS releases.
:::

:::tip Note
when the size of the `/dev/shm` is specified in percentage of user’s physical memory limit (PMEM), you should remount CageFS after changing PMEM limit in order to change the size of shared memory allocated for the `/dev/shm` in user’s CageFS. To do so, execute `cagefsctl --remount-all`
:::

### Integration with control panels

* [cPanel](/cloudlinux_os_components/#cpanel)
* [Plesk](/cloudlinux_os_components/#plesk)
* [ISPManager](/cloudlinux_os_components/#ispmanager)

CageFS comes with a plugin for various control panels.

The plugin allows to:

* Initialize CageFS;

* Select [mode of operation](/cloudlinux_os_components/#managing-users);

* See and modify the list of enabled/disabled users;

* Update CageFS skeleton.

#### cPanel

CageFS plugin for cPanel is located in <span class="notranslate"> Plugins </span> section of WHM.

It allows to initialize CageFS, select users CageFS will be enabled for, as well as update CageFS skeleton.

![](/images/img1-zoom73.png)

To enable CageFS for a proper user (users), in <span class="notranslate"> CageFS User Manager </span> choose a user from the list on the right ( <span class="notranslate"> Disabled </span> users) and click <span class="notranslate"> Toggle </span> . The user will move to the list on the left ( <span class="notranslate"> Enabled </span> users).

To disable a user (users), choose a user from the list on the left ( <span class="notranslate"> Enabled </span> users) and click <span class="notranslate"> Disable CageFS </span> . The user will move to the list on the right ( <span class="notranslate"> Disabled </span> users).

To update CageFS skeleton, click <span class="notranslate"> Update CageFS Skeleton </span> .

![](/images/img2-zoom71.png)

#### Plesk

CageFS comes with a plugin for Plesk 10.x. It allows initializing and updating CageFS template, as well as managing users and mode of operation for CageFS.

In modules section choose CageFS:

![](/images/plesk_cagefs_icon.png)

To enable CageFS for a proper user (users), in <span class="notranslate"> CageFS User Manager </span> choose a user from the list on the right ( <span class="notranslate"> Disabled </span> users) and click <span class="notranslate"> Toggle </span> . The user will move to the list on the left ( <span class="notranslate"> Enabled </span> users).

To disable a user (users), choose a user from the list on the left ( <span class="notranslate"> Enabled </span> users) and click <span class="notranslate"> Disable CageFS </span> . The user will move to the list on the right ( <span class="notranslate"> Disabled </span> users).

To update CageFS skeleton, click <span class="notranslate"> Update CageFS Skeleton </span> .

![](/images/plesk_cagefs_manager_disable_all.png)

#### ISPManager

CageFS comes with plugin for <span class="notranslate"> ISP Manager </span> to enable/disable CageFS on per user base. In edit user section chose <span class="notranslate"> Permission </span> tab. Mark <span class="notranslate"> CageFS User Mode </span> checkbox and click <span class="notranslate"> OK </span> to apply.

![](/images/ispmanager_cagefs_user_zoom98.png)

Or you can manage global CageFS settings via CageFS menu
![](/images/img3.jpg)


See also [CageFS CLI tools](/command-line_tools/#cagefs).

## MySQL Governor
### General information and requirements

:::tip Note
<span class="notranslate">MySQL Governor</span> 0.8-32+
:::

<span class="notranslate"> MySQL Governor </span> is software to monitor and restrict MySQL usage in shared hosting environment. The monitoring is done via resource usage statistics per each MySQL thread.

<span class="notranslate"> MySQL Governor </span> can also kill off slow <span class="notranslate"> SELECT </span> queries.

<span class="notranslate"> MySQL Governor </span> has multiple modes of operations, depending on the configuration. It can work in monitor-only mode, or it can use different throttling scenarious.

<span class="notranslate"> MySQL Governor </span> allows to restrict customers who use too much resources. It supports following limits:

| |  | |
|-|--|-|
|<span class="notranslate"> CPU </span> | % | <span class="notranslate"> CPU </span> speed relative to one core. 150% would mean one and a half cores|
|<span class="notranslate"> READ </span> | bytes | bytes read. Cached reads are not counted, only those that were actually read from disk will be counted|
|<span class="notranslate"> WRITE </span> | bytes | bytes written. Cached writes are not counted, only once data is written to disk, it is counted|

You can set different limits for different periods: current, short, med, long. By default those periods are defined as 1 second, 5 seconds, 1 minute and 5 minutes. They can be re-defined using [configuration file](/cloudlinux_os_components/#configuration-and-operation). The idea is to use larger acceptable values for shorter periods. Like you could allow a customer to use two cores (200%) for one second, but only 1 core (on average) for 1 minute, and only 70% within 5 minutes. That would make sure that customer can burst for short periods of time.

When customer is restricted, the customer will be placed into special LVE with ID 3. All restricted customers will be placed into that LVE, and you can control amount of resources available to restricted customers. Restricted customers will also be limited to only 30 concurrent connections. This is done so they wouldn't use up all the MySQL connections to the server.


### Installation and update

* [Installation](/cloudlinux_os_components/#installation)
* [Upgrading database server](/cloudlinux_os_components/#upgrading-database-server)

#### Installation

::: danger IMPORTANT
Please make full database backup (including system tables) before you upgrade MySQL or switch to MariaDB. This action will prevent data loss in case if something goes wrong.
:::

**_MySQL Governor is compatible only with MySQL 5.x, 8.0; MariaDB & Percona Server 5.6._**

To install <span class="notranslate"> MySQL Governor </span> on your server install <span class="notranslate"> governor-mysql </span> package at first:

<div class="notranslate">

```
$ yum remove db-governor db-governor-mysql  # you can ignore errors if you don't have those packages installed
$ yum install governor-mysql
```
</div>

Then configure <span class="notranslate"> MySQL Governor </span> properly.

The installation is currently supported only on <span class="notranslate"> cPanel, Plesk, DirectAdmin, ISPmanager, InterWorx </span> , as well as on servers without control panel.

If you are installing <span class="notranslate"> CloudLinux </span> on a server running MySQL already, set your current MySQL version before calling installation script:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=mysqlXX
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

Please make sure to specify your current MySQL version instead of XX as follows:

* 55 — MySQL v5.5
* 56 — MySQL v5.6
* 57 — MySQL v5.7
* 80 — MySQL v8.0 [requires <span class="notranslate"> MySQL Governor </span> 1.2-37+; database packages are available in <span class="notranslate"> Beta </span> only, so, please use <span class="notranslate"> `--install-beta` </span> flag instead of <span class="notranslate"> `--install` </span> ]

If you are installing <span class="notranslate"> CloudLinux </span> on a server running <span class="notranslate"> MariaDB </span> already, do instead:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=mariadbXX
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

Please make sure to specify your current <span class="notranslate"> MariaDB </span> version instead of <span class="notranslate"> XX </span> as follows:

* 55 — MariaDB v5.5
* 100 — MariaDB v10.0
* 101 — MariaDB v10.1
* 102 — MariaDB v10.2
* 103 — MariaDB v10.3 [requires <span class="notranslate"> MySQL Governor 1.2-36+; for cPanel - MySQL Governor 1.2-41+] </span>
* 104 – MariaDB v10.4 [requires <span class="notranslate">MySQL Governor</span> 1.2-53+; database packages are available in <span class="notranslate">Beta</span> only, so, please use <span class="notranslate">`--install-beta`</span> flag instead of <span class="notranslate">`--install`</span>]

:::tip Note
MariaDB version 10.4 is not available for CloudLinux 6 yet.
:::


Installation for <span class="notranslate"> Percona Server 5.6 </span> [requires <span class="notranslate"> MySQL Governor </span> 1.1-22+ or 1.2-21+]:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=percona56
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>


Please note that <span class="notranslate"> MySQL/MariaDB/Percona </span> will be updated from <span class="notranslate"> CloudLinux </span> repositories.

If you are installing <span class="notranslate"> MySQL Governor </span> on a server without MySQL at all, you have an opportunity to choose desired MySQL version to be installed with <span class="notranslate"> MySQL Governor </span> installation script. Use <span class="notranslate"> --mysql-version </span> flag before calling the installation script:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

<span class="notranslate"> MYSQL_VERSION </span> could be chosen from the list of versions currently supported by <span class="notranslate"> MySQL Governor </span> :

| | |
|-|-|
|mysql51 |MySQL v5.1 |  
|mysql55 |MySQL v5.5 | 
|mysql56 |MySQL v5.6 | 
|mysql57 |MySQL v5.7 | 
|mysql80 |MySQL v8.0 [requires <span class="notranslate"> MySQL Governor </span> 1.2-37+; database packages available in beta only, so use <span class="notranslate"> --install-beta flag instead of --install] </span> | 
|mariadb55 |MariaDB v5.5 |
|mariadb100 |MariaDB v10.0 |
|mariadb101 |MariaDB v10.1 |
|mariadb102 |MariaDB v 10.2 |
|mariadb103 |MariaDB v 10.3 [requires <span class="notranslate"> MySQL Governor 1.2-36+; for cPanel - MySQL Governor 1.2-41+] </span> |
|mariadb104 |MariaDB v 10.4 [requires <span class="notranslate">MySQL Governor</span> 1.2-53+; database packages are available in <span class="notranslate">Beta</span> only, so use <span class="notranslate">`--install-beta`</span> flag instead of <span class="notranslate">`--install`</span>]|
|percona56 | <span class="notranslate"> Percona Server v 5.6 </span> |

Generally, <span class="notranslate"> stable </span> and <span class="notranslate"> beta </span> channels contain different version of MySQL packages - <span class="notranslate"> beta </span> contains newer version than <span class="notranslate"> stable </span> or the same one. If you would like to install  <span class="notranslate"> beta </span>  packages, use  <span class="notranslate"> --install-beta </span>  flag instead of  <span class="notranslate"> --install </span>  when calling installation script:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install-beta
```
</div>


Starting with <span class="notranslate"> MySQL Governor </span> version 1.2 when installing <span class="notranslate"> MySQL/MariaDB MySQL Governor </span> asks for a confirmation of a database version to be installed. To avoid such behavior for the automatic installations, please use <span class="notranslate"> --yes </span> flag.

For example:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install --yes
```
</div>


Please note that restore of previous packages in case of failed installation would also be confirmed with <span class="notranslate">`--yes`</span> flag.

::: danger IMPORTANT
Use <span class="notranslate"> --yes </span> flag on your own risk, because it confirms installation in any case - even in case if there are troubles during installation (for example, network problems causing incomplete download of packages), everything would be confirmed.
:::

:::tip Note
See also [MySQL Governor CLI](/command-line_tools/#mysql-governor)
:::

#### Upgrading database server

In order to change MySQL version you should run the following commands:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

where `MYSQL_VERSION` is the target database server version that should be replaced with the value from the table above.

::: danger IMPORTANT
Make sure you have full database backup (including system tables) before you switch. This action will prevent data loss in case if something goes wrong.
:::

### Uninstalling

To remove <span class="notranslate">MySQL Governor</span>:

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --delete
```
</div>

The script will install original MySQL server, and remove <span class="notranslate">MySQL Governor</span>.

### Configuration and operation

* [Configuration](/cloudlinux_os_components/#configuration-3)
* [Modes of operation](/cloudlinux_os_components/#modes-of-operation)
* [Starting and stopping](/cloudlinux_os_components/#starting-and-stopping)
* [Mapping a user to a database](/cloudlinux_os_components/#mapping-a-user-to-a-database)
* [Log files](/cloudlinux_os_components/#log-files)
* [Change MySQL version](/cloudlinux_os_components/#change-mysql-version)

#### Configuration

<span class="notranslate"> MySQL Governor </span> configuration is located in <span class="notranslate"> /etc/container/mysql-governor.xml </span> 

It is best to modify it using <span class="notranslate"> [dbctl](/command-line_tools/#dbctl) </span> tool.

Once configuration file is updated, please, restart the <span class="notranslate"> MySQL Governor </span> using:

<div class="notranslate">

```
$ service db_governor restart
```
</div>
Example configuration:
<div class="notranslate">

```
<governor> 

<!--  'off' - do not throttle anything, monitoring only -->
<!--  'abusers' - when user reaches the limit, put user's queries into LVE for that user -->
<!--  'all' - user's queries always run inside LVE for that user -->
<!--  'single' - single LVE=3 for all abusers. -->
<!-- 'on' - deprecated (old restriction type) -->
<!-- To change resource usage of restricted user in LVE mode use command /usr/sbin/lvectl set 3 --cpu=<new value> --ncpu=<new value> --io=<new value> --save-all-parameters -->
<lve use="on|single|off|abusers|all"/> 

<!-- connection information -->
<!-- If host, login and password are not present, this information is taken from /etc/my.cnf and ~root/.my.cnf -->
<!-- Use symbol specified in prefix to figure out hosting accounts (mysql username will be split using prefix_separator, and first part will be used as account name). If prefix is not set, or empty -- don’t use prefixes/accounts --> 

<!-- db governor will try to split MySQL user names using prefix separator (if present)and statistics will be aggregated for the prefix (account name) -->
<connector host="..." login="..." password=".." prefix_separator="_"/> 

<!-- Intervals define historical intervals for burstable limits. In seconds -->
<intervals short="5" mid="60" long="300"/> 

<!-- log all errors/debug info into this log -->
<log file=”/var/log/dbgovernor-error.log” mode=”DEBUG|ERROR”/> 

<!-- s -- seconds, m -- minutes, h -- hours, d -- days -->
<!-- on restart, restrict will disappear -->
<!-- log file will contain information about all restrictions that were take -->
<!-- timeout - penalty period when user not restricted, but if he hit his limit during this period he will be restricted with higher level of restrict (for more long time) -->
<!- level1, level2, level3, level4 - period of restriction user for different level of restriction. During this period all user's requests will be placed into LVE container -->

<!-- if user hits any of the limits during period of time specified in timeout, higher level of restrict will be used to restrict user. If user was already on level4, level4 will be applied again -->
<!-- attribute format set an restrict log format:
SHORT -  restrict info only
MEDIUM - restrict info, _all_tracked_values_
LONG - restrict info, _all_tracked_values_, load average and vmstat info
VERYLONG - restrict info, _all_tracked_values_, load average and vmstat info, slow query info -->
<!-- script -- path to script to be triggered when account is restricted -->
<!-- user_max_connections - The number of simultaneous connections of blocked user (in LVE mode) --> 

<!-- restriction levels/format are deprecated -->
<restrict level1="60s" level2="15m" level3="1h" level4="1d" timeout="1h"
log="/var/log/dbgovernor-restrict.log" format="SHORT|MEDIUM|LONG|VERYLONG"
script="/path/to/script"
user_max_connections="30"/> 

<!-- period (deprecated) - period based restriction that has multiple levels (see above) -->
<!-- limit (by default) - when user hits limits, the account will be marked as restricted and if user does not hit  limit again during "unlimit=1m" account will be unrestricted. This mode doesn't have any additional levels/penalties. -->
<restrict_mode use="period|limit" unlimit="1m"/>

<!-- killing slow SELECT queries (no other queries will be killed) -->
<!-- if "log" attribute was set all killed queries will be saved in log file -->
<!-- slow parameter in the <limit name="slow" current="30"/> will no be applied without enabling slow_queries --> 
<slow_queries run="on|off" log="/var/log/dbgovernor-kill.log"/> 
<!-- Enable or disable saving of statistics for lve-stats - On - enabled, Off-disabled -->
<statistic mode="on|off"></statistic>
<!-- Enable logging user queries on restrict, can be On or Off -->
<!-- Files are saved in /var/lve/dbgovernor-store and being kept here during 10 days -->
<logqueries use="on|off"></logqueries>
<default>
<!-- -1 not use limit(by default, current - required) -->
<limit name="cpu" current="150" short="100" mid="90" long="65"/>
<limit name="read" current="100000000" short="90000000" mid="80000000" long="70000000"/>
<limit name="write" current="100000000" short="90000000" mid="80000000" long="70000000"/>
<!-- Time to kill slow SELECT queries for account, can be different for accounts in seconds(but unit can be specified) -->
<!-- enabled only when slow_queries run="on" -->
<!-- s -- seconds, m -- minutes, h -- hours, d -- days -->
<limit name="slow" current="30"/>
</default>
<!-- name will matched account name, as extracted via prefix extraction --> 

<!-- mysql_name will match exact MySQL user name. If both name and mysql_name are present, system will produce error -->
<!-- mode restrict -- default mode, enforcing restrictions -->
<!-- mode norestrict -- track usage, but don’t restrict user --> 
<!-- mode ignore -- don’t track and don’t restrict user -->
<user name=”xxx” mysql_name=”xxx” mode=”restrict|norestrict|ignore”>
<limit...>
</user> 

<!-- debug mode for particular user. The information logged to restrict log. -->
<debug_user name="xxx"/> 

</governor>
```
</div>

These values can also be set using [cloudlinux-config](/command-line_tools/#cloudlinux-config) CLI utility


#### Modes of operation

:::tip Note
<span class="notranslate">MySQL Governor</span> 1.0+
:::

<span class="notranslate"> MySQL Governor </span> has multiple modes of operation. Some of them are experimental at this moment.  
Mode:  
<span class="notranslate"> **off -- Monitor Only** :  </span> In this mode <span class="notranslate"> MySQL Governor </span> will not throttle customer's queries, instead it will let you monitor the MySQL usage to see the abusers at any given moment in time (and historically). This mode is good when you are just starting and want to see what is going on  
<span class="notranslate"> **single -- Single restricted's LVE for all restricted customers (deprecated)** :  </span> In that mode once customer reaches the limits specified in the <span class="notranslate"> MySQL Governor </span> , all customer's queries will be running inside LVE with id 3. This means that when you have 5 customers restricted at the same time, all queries for all those 5 customers will be sharing the same LVE. The larger the number of restricted customers - the less resources per restricted customer will be available  
<span class="notranslate"> **abusers - Use LVE for a user to restrict queries (default mode)** :  </span> In that mode, once user goes over the limits specified in the <span class="notranslate"> MySQL Governor </span> , all customer's queries will execute inside that user's LVE. We believe this mode will help with the condition when the site is still fast, but MySQL is slow (restricted) for that user. If someone abuses MySQL, it will cause queries to share LVE with PHP processes, and PHP processes will also be throttled, causing fewer new queries being sent to MySQL. _Requires_ <span class="notranslate"> _dbuser-map_ </span> _file_  
<span class="notranslate"> **all - Always run queries inside user's LVE** :  </span> This way there is no need for separate limits for MySQL. Depending on overhead we see in the future, we might decide to use it as a primary way of operating <span class="notranslate"> MySQL Governor </span> . The benefit of this approach is that limits are applied to both PHP & MySQL at the same time, all the time, preventing any spikes whatsoever. _Requires_ <span class="notranslate"> _dbuser-map_ </span> _file_

If <span class="notranslate"> dbuser-map </span> file is absent on the server, " <span class="notranslate"> abusers </span> " mode emulates " <span class="notranslate"> single </span> ".

With <span class="notranslate"> **single**   </span> and <span class="notranslate"> **abusers**   </span> mode, once user is restricted, the queries for that user will be limited as long as user is using more than limits specified. After a minute that user is using less, we will unrestricted that user.

You can specify modes of operation using <span class="notranslate"> [dbctl](/command-line_tools/#dbctl) </span> or by changing [configuration file](/cloudlinux_os_components/#configuration-3).
<span class="notranslate"> dbuser-map </span> file is located in <span class="notranslate">`/etc/container/dbuser-map`</span>.

#### Starting and stopping

To start:
<div class="notranslate">

```
$ service db_governor start
```
</div>

To stop:
<div class="notranslate">

```
$ service db_governor stop
```
</div>

#### Mapping a user to a database 


**[** <span class="notranslate"> **MySQL Governor** </span> **1.x]**

Traditionally <span class="notranslate"> MySQL Governor </span> used prefixes to map user to database. With the latest version, we automatically generate <span class="notranslate"> user -> database user </span> mapping for <span class="notranslate"> cPanel </span>, <span class="notranslate"> Plesk </span> and <span class="notranslate"> DirectAdmin </span> control panels.

The mapping file is located in: <span class="notranslate"> /etc/container/dbuser-map </span>

The format of the file:
<div class="notranslate">

```
[dbuser_name1] [account_name1] [UID1]
...
[dbuser_nameN] [account_nameN] [UIDN]
```
</div>
For example:

<div class="notranslate">

```
pupkinas_u2 pupkinas 502
pupkinas_u1 pupkinas 502
pupkinas_u3 pupkinas 502
pupkin2a_uuu1 pupkin2a 505
pupkin10_p10 pupkin10 513
pupkin5a_u1 pupkin5a 508
pupkin3a_qq1 pupkin3a 506
pupkin3a_test22 pupkin3a 506
pupkin3a_12 pupkin3a 506
```
</div>

This would specify that db users: <span class="notranslate"> pupkinas_us2, pupkinas_u1, pupkinas_u3 </span> belong to user <span class="notranslate"> pupkinas </span> with uid (lve id) 502
db user <span class="notranslate"> pupkin2a_uuu1 </span> belongs to user <span class="notranslate"> pupkin2a </span> with uid 505, etc...

This file is checked for modifications every 5 minutes.

If you need to force reload of that file, run:
<div class="notranslate">

```
service db_governor restart
```
</div>

#### Log files


<span class="notranslate"> **Error_log** </span>

<span class="notranslate"> MySQL Governor </span> error log is used to track any problems that <span class="notranslate"> MySQL Governor </span> might have

<span class="notranslate"> **Restrict_log** </span>

Restrict log is located in <span class="notranslate"> /var/log/dbgovernor-restrict.log </span>

Restrictions:
<div class="notranslate">

```
_timestamp_ _username_ LIMIT_ENFORCED _limit_setting_ __current_value_                         _restrict_level__ SERVER_LOAD TRACKED_VALUES_DUMP
 ... 
```
</div>

* <span class="notranslate"> TRACKED_VALUES_DUMP=busy_time:xx,cpu_time:xx,... </span>
* <span class="notranslate"> SERVER_LOAD </span> = load averages followed by output of <span class="notranslate"> vmstat </span>
* <span class="notranslate"> TRACKED_VALUES_DUMP </span> is available with <span class="notranslate"> MEDIUM & LONG </span> format
* <span class="notranslate"> SERVER_LOAD </span> is available with <span class="notranslate"> LONG </span> format

#### Change MySQL version


If you would like to change to a different MySQL version, or switch to <span class="notranslate"> MariaDB </span> you have to start by backing up existing databases.

::: tip Note
For experienced users only. Changing MySQL version is a quite complicated procedure, it causes system table structural changes which can lead to unexpected results. Think twice before proceeding.
:::

::: danger IMPORTANT
Please make full database backup (including system tables) before you will do upgrade of MySQL or switch to MariaDB. This action will prevent data losing in case if something goes wrong.
:::

<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```
</div>

* If you are using <span class="notranslate"> cPanel </span> or <span class="notranslate"> DirectAdmin </span> - recompile <span class="notranslate"> Apache </span> .

To install beta version of MySQL:
<div class="notranslate">

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install-beta
```
</div>

<span class="notranslate"> MYSQL_VERSION </span> can be one of the following:

| | |
|-|-|
|<span class="notranslate"> auto </span> | default version of MySQL for given OS release (or cPanel settings)|
|mysql51 | MySQL v5.1|
|mysql55 | MySQL v5.5|
|mysql56 | MySQL v5.6|
|mysql57 | MySQL v5.7|
|mysql80 | MySQL v8.0 [requires MySQL Governor 1.2-37+; database packages are available in Beta only, so, please use `--install-beta` flag instead of ` --install` ]|
|mariadb55 | MariaDB v5.5|
|mariadb100 | MariaDB v10.0|
|mariadb101 | MariaDB v10.1|
|mariadb102 | MariaDB v 10.2|
|mariadb103 | MariaDB v 10.3 [requires <span class="notranslate"> MySQL Governor 1.2-36+; for cPanel - MySQL Governor 1.2-41+ </span> ]|
|mariadb104 |MariaDB v 10.4 [requires <span class="notranslate">MySQL Governor</span> 1.2-53+; database packages are available in <span class="notranslate">Beta</span> only, so use <span class="notranslate">`--install-beta`</span> flag instead of <span class="notranslate">`--install`</span>]||
|percona56 | Percona v 5.6|

* We don't recommend to downgrade from MySQL v5.6, MariaDB 10.x


:::tip Note
cPanel does not officially support MariaDB 10.4, that is why we don’t recommend to use it on cPanel servers. Use on your own risk for Plesk servers, because downgrade can corrupt your databases.
:::

:::tip Note
MariaDB version 10.4 is not available for CloudLinux 6 yet.
:::

::: tip Note
Starting from cPanel & WHM version 70, cPanel supports MySQL 5.7: https://blog.cpanel.com/being-a-good-open-source-community-member-why-we-hesitated-on-mysql-5-7/
:::

::: tip Note
Starting from cPanel & WHM version 78, cPanel supports MariaDB 10.3: https://documentation.cpanel.net/display/78Docs/MySQL+or+MariaDB+Upgrade 
:::

::: tip Note
cPanel does not officially support MySQL 8.0, that is why we don’t recommend to use it on cPanel servers. Use on your own risk for <span class="notranslate"> DirectAdmin and Plesk </span> servers, because downgrade can corrupt your databases.
:::

:::tip Note
See also MySQL Governor [CLI](/command-line_tools/#mysql-governor)
:::

### Backing up MySQL

On <span class="notranslate"> cPanel </span> server disable MySQL service monitoring before doing the job:
<div class="notranslate">

```
$ whmapi1 configureservice service=mysql enabled=1 monitored=0
```
</div>

Execute as <span class="notranslate"> root </span> :
<div class="notranslate">

```
$ mkdir -p ~/mysqlbkp
$ service mysql restart --skip-networking --skip-grant-tables
$ mysql_upgrade
$ mysqldump --all-databases --routines --triggers > ~/mysqlbkp/dbcopy.sql
$ service mysql stop
$ cp -r /var/lib/mysql/mysql ~/mysqlbkp/
$ service mysql start
```
</div>

On <span class="notranslate"> cPanel </span> server enable monitoring back:
<div class="notranslate">

```
$ whmapi1 configureservice service=mysql enabled=1 monitored=1
```
</div>

::: tip Note
This operation may take some time.
:::

See also [MySQL Governor CLI tools](/command-line_tools/#mysql-governor).

### Troubleshooting

**MariaDB 5.5 and MariaDB 10.0: How to set LimitNOFILE correctly for systemd.**

<span class="notranslate"> MariaDB 5.5 </span> and <span class="notranslate"> MariaDB 10.0 </span> have only file for managing the service, but the file has <span class="notranslate"> LSB </span> functions, so it is supported by <span class="notranslate"> `systemd` </span> .

For adding extra limits, do the following:

1. Run:

<div class="notranslate">

```
mkdir /etc/systemd/system/mariadb.service.d/
```
</div>

2. Run:

<div class="notranslate">

```
touch /etc/systemd/system/mariadb.service.d/limits.conf
```
</div>

3. Add the following content to the the file <span class="notranslate"> `/etc/systemd/system/mariadb.service.d/limits.conf` </span> :

<div class="notranslate">

```
[Service] 
LimitNOFILE=99999
```
</div>

**MySQL Governor lost connection to MySQL - “Can't connect to mysql” messages in /var/log/dbgovernor-error.log (Plesk and DirectAdmin)**

This may be caused by changing root/administrator credentials without updating MySQL <span class="notranslate"> Governor </span> configuration file.

When you change root or administrator credentials in <span class="notranslate"> Plesk or DirectAdmin, </span> you also need to update MySQL <span class="notranslate"> Governor </span> configuration file. This could be done with the following command (available since <span class="notranslate"> governor-mysql 1.2-38): </span>

<div class="notranslate">

```
/usr/share/lve/dbgovernor/mysqlgovernor.py --update-config-auth
```
</div>

The command updates credentials in MySQL <span class="notranslate">Governor</span> configuration file and restarts <span class="notranslate">`db_governor`</span> service afterwards.

After applying the command MySQL <span class="notranslate">Governor</span> successfully connects to MySQL.

## PHP Selector

### General information and requirements

The main requirements:

* CageFS is installed
* Alt-PHP packages are installed
* Mod_suexec is installed. You can find installation instruction [here](/cloudlinux_os_components/#apache-suexec-module)
* CageFS is initialized without errors
* CageFS is enabled for a domain user-owner
* An appropriate PHP handler is selected for PHP version which is system version. <span class="notranslate"> PHP Selector </span> is **compatible** with the following technologies: <span class="notranslate">_suPHP, mod_fcgid, CGI (suexec), LiteSpeed_</span>. See also [Compatibility Matrix](/limits/#compatibility-matrix).
* PHP version in the CloudLinux PHP selector does not equal to the Native PHP version

::: tip Note
PHP Selector is not supported for H-Sphere.
:::

::: tip Note
PHP Selector requires native PHP to be installed, otherwise you will get an error message with a proposal to install PHP package.
Here are some instructions for different control panels:
1. [for cPanel](https://documentation.cpanel.net/display/EA4/EasyApache+4+and+the+ea-php-cli+Package)
2. [for Plesk](https://support.plesk.com/hc/en-us/articles/115004177974-How-to-install-PHP-by-OS-vendor-in-Plesk-for-Linux)
3. [for DirectAdmin](https://help.directadmin.com/item.php?id=345)

After installing native PHP, please run the `cloudlinux-selector setup --interpreter=php --json` command in order to reconfigure CageFS and LVE Manager.
:::

### Installation and update

* [Update](/cloudlinux_os_components/#update)

The installation of <span class="notranslate"> PHP Selector </span> presumes that you already have  [CageFS](/cloudlinux_os_components/#cagefs) & <span class="notranslate">[LVE Manager](/lve_manager/) installed.</span>

Use [compatibility matrix](/limits/#compatibility-matrix) to check if your Web Server/PHP mode is supporting <span class="notranslate"> PHP Selector. </span> If not, you need a change to one of the supported models.

Installation of different versions of PHP & modules:
<div class="notranslate">

```
$ yum groupinstall alt-php
```
</div>

Update CageFS & <span class="notranslate"> LVE Manager with support for PHP Alternatives: </span> 
<div class="notranslate">

```
$ yum update cagefs lvemanager
```
</div>

<span class="notranslate">**cPanel/WHM**: Make sure 'Select PHP version' </span> is enabled in <span class="notranslate"> Feature Manager </span>.

:::warning IMPORTANT
Please, do not use settings like <span class="notranslate">`SuPHP_ConfigPath`, `PHPRC`, `PHP_INI_SCAN_DIR`</span>. Do not redefine path to <span class="notranslate">`php.ini`</span> and ini-files for PHP modules. Doing that can break <span class="notranslate">PHP Selector</span> functionality.
:::

For example, alternative php5.2 versions should load <span class="notranslate">`/opt/alt/php52/etc/php.ini`</span> file and scan <span class="notranslate">`/opt/alt/php52/etc/php.d`</span> directory for modules:
<div class="notranslate">

```
Configuration File (php.ini) Path         /opt/alt/php52/etc
Loaded Configuration File                 /opt/alt/php52/etc/php.ini
Scan this dir for additional .ini files   /opt/alt/php52/etc/php.d
additional .ini files parsed              /opt/alt/php52/etc/php.d/alt_php.ini
```
</div>

Those are default locations for <span class="notranslate">alt-php</span>.

If you need custom PHP settings per user, please change them via <span class="notranslate">"Edit PHP settings"</span> feature of <span class="notranslate"> PHP Selector </span> .

If a list of default modules is absent on the server in the <span class="notranslate">`/etc/cl.selector/defaults.cfg`</span> file for some alt-PHP version and there is `nd_mysqli` extension in this version, then on installation/update of the LVE Manager the `mysqli` extension will be disabled and `nd_mysqli` extension will be enabled automatically.

* If _nd_mysqli_ module is absent or a list of enabled modules is available, then they won't be changed automatically.
* If alt-PHP is not installed on LVE Manager installation/update, then they won’t be changed automatically.

To change the modules status (enabled/disabled) manually, run the following command in a console:
<div class="notranslate">

```
# /usr/sbin/cloudlinux-selector make-defaults-config --json --interpreter=php
```
</div>

#### Update

To update PHP Selector, run the following command:
<div class="notranslate">

```
yum groupupdate alt-php
```
</div>

This command allows to install newly released versions in <span class="notranslate"> PHP Selector. </span>

:::tip Note
See also PHP Selector [CLI](/command-line_tools/#php-selector)
:::

### Installation instructions for cPanel users

1. Install CageFS as root via SSH:

<div class="notranslate">

```
yum install cagefs
```
</div>

2. Install `alt-php` packages as root:

<div class="notranslate">

```
yum groupinstall alt-php
```
</div>

3. Install `mod_suexec` package as root. See installation instructions [here](/cloudlinux_os_components/#installation-5).
4. Verify that CageFS is initialized successfully.

  * via SSH by running the following command:

  <div class="notranslate">

  ```
  cagefsctl --check-cagefs-initialized
  ```
  </div>

  * via cPanel admin interface
  
  Go to <span class="notranslate">cPanel → Admin interface → LVE Manager → Dashboard</span> → click <span class="notranslate">_Refresh_</span>

  ![](/images/cageFS-verify.png)

  If there is a problem you can see _Not initialized_

  ![](/images/not-initialized.png)

5. Initilize CageF (if it is not initialized)

  * Via SSH

  <div clas="code">

  ```
  cagefsctl --init
  ```
  </div>

  * Via cPanel admin interface

    Go to cPanel → <span class="notranslate">Admin interface → LVE manager → Options → CageFS INIT</span>

    ![](/images/CageFS-init.png)

  If CageFS was initialized after refreshing Dashboard you will see that CageFS is enabled:

  ![](/images/CageFS-enabled.png)

6. Enable CageFS to a user

  Go to <span class="notranslate">cPanel → Admin interface → LVE manager → Users</span>

  ![](/images/enable-CageFS-to-user.png)

  * For one user by individual slider (for LVE 1001 in the picture above)
  * For a group of user by the _CageFS_ button (for LVE 1002 and 1003 in the picture above)

7. Check that system PHP version is not `alt-php` (it should be `ea-php`)

  Go to <span class="notranslate">cPanel → Admin interface → MultiPHP Manager → PHP versions</span>

  ![](/images/check-ea-php.png)

8. Check that an appropriate PHP handler is selected for PHP version which is system version

  Go to <span class="notranslate">cPanel Admin interface → MultiPHP Manager → PHP Handlers</span>

  ![](/images/php-handlers.png)

9. Check version for domain in MultiPHP Selector. It should be equal to the system default version

Go to <span class="notranslate">cPanel Admin interface → MultiPhp Manager → PHP versions</span> → scroll to <span class="notranslate">_Set PHP Version per Domain_</span>

10. Version for domain in User’s interface in PHP Selector should not be equal to the <span class="notranslate">Native</span> version.


### LiteSpeed support

::: tip Note
LiteSpeed detects CloudLinux OS and applies all settings out-of-the-box.
:::

If the settings were not applied, you can use the following steps to set up LiteSpeed to use <span class="notranslate"> PHP Selector. </span>

**How to set up LiteSpeed version lower than 5.3 to use PHP Selector**

To enable <span class="notranslate"> PHP Selector </span> with <span class="notranslate"> LiteSpeed Web Server </span> follow <span class="notranslate"> PHP Selector  </span> [installation guide](/cloudlinux_os_components/#installation-and-update-4) , and then adjust following settings in <span class="notranslate"> LiteSpeed </span> :

1. <span class="notranslate">CloudLinux (Admin Console | Configuration | Server | General): CageFS </span>
2. Enable <span class="notranslate">SuExec: Server | General | PHP SuEXEC | Yes </span>
3. Go to <span class="notranslate">_External App_</span> tab, the new <span class="notranslate"> **lsphp_selector** </span> is here.

:::tip Note
You can select any other application or create a custom one.
:::

![](/images/litespeed1_zoom70.png)

4. The <span class="notranslate">_Command_</span> line should be <span class="notranslate"> **/var/www/cgi-bin/cgi_wrapper/cloudlinux_wrapper** </span> on <span class="notranslate"> Plesk </span> . For other control panels, <span class="notranslate"> _Command_ </span> line should be <span class="notranslate"> **/usr/local/bin/lsphp** </span> .

<span class="notranslate"> _Run On Start Up_ </span> line must contain <span class="notranslate"> **Yes** </span> or <span class="notranslate"> **No** </span>.

For <span class="notranslate">Plesk</span>:

![](/images/litespeed3_zoom70.png)

For other control panels:

![](/images/litespeed2_zoom70.png)

Settings in text format:

| | |
|-|-|
|<span class="notranslate">Name</span>|<span class="notranslate">`lsphp_selector`</span>|
|<span class="notranslate">Address</span>|<span class="notranslate">`uds://tmp/lshttpd/lsphp_selector.sock`</span>|
|<span class="notranslate">Notes</span>|<span class="notranslate">Not Set</span>|
|<span class="notranslate">Max Connections</span>|`35`|
|<span class="notranslate">Environment</span>|<span class="notranslate">`PHP_LSAPI_MAX_REQUESTS=5000`</span><br><span class="notranslate">`PHP_LSAPI_CHILDREN=35`</span>|
|<span class="notranslate">Initial Request Timeout (secs)</span>|`60`|
|<span class="notranslate">Retry Timeout (secs)</span>|`0`|
|<span class="notranslate">Persistent Connection</span>|<span class="notranslate">`Yes`</span>|
|<span class="notranslate">Connection Keepalive Timeout</span>|<span class="notranslate">Not Set</span>|
|<span class="notranslate">Response Buffering</span>|<span class="notranslate">`No`</span>|
|<span class="notranslate">Auto Start</span>|<span class="notranslate">`Through CGI Daemon (Async)`</span>|
|<span class="notranslate">Command</span>|* For Plesk <span class="notranslate">`/var/www/cgi-bin/cgi_wrapper/cloudlinux_wrapper`</span><br>* For other control panels <span class="notranslate">`/usr/local/bin/lsphp`</span>|
|<span class="notranslate">Back Log</span>|`100`|
|<span class="notranslate">Instances</span>|`1`|
|<span class="notranslate">suEXEC User</span>|<span class="notranslate">Not Set</span>|
|<span class="notranslate">suEXEC Group</span>|<span class="notranslate">Not Set</span>|
|<span class="notranslate">umask</span>|<span class="notranslate">Not Set</span>|
|<span class="notranslate">Run On Start Up</span>|<span class="notranslate">`Yes`</span>|
|<span class="notranslate">Max Idle Time</span>|`70`|
|<span class="notranslate">Priority</span>|`0`|
|<span class="notranslate">Memory Soft Limit (bytes)</span>|`2047M`|
|<span class="notranslate">Memory Hard Limit (bytes)</span>|`2047M`|
|<span class="notranslate">Process Soft Limit</span>|`400`|
|<span class="notranslate">Process Hard Limit</span>|`500`|

1. Go to <span class="notranslate"> _Script Handler_ </span> tab. For required suffixes change the <span class="notranslate"> _Handler Name_ </span> to <span class="notranslate"> **lsphp_selector** </span> .

![](/images/litespeed4_zoom70.png)


![](/images/litespeed5_zoom70.png)

**Additional settings for LiteSpeed version 5.3 +**

Go to <span class="notranslate"> Server --> PHP </span> tab. Click <span class="notranslate"> _Edit_ </span> in the <span class="notranslate"> _PHP Handler Defaults_ </span> section. We recommend to set up the following settings:

* Set <span class="notranslate"> _Yes_ </span> in the <span class="notranslate"> _Run On Startup_ </span>
* Make sure to set <span class="notranslate"> _Max Idle Time_ </span> 

![](/images/litespeed_4_zoom70.png)

::: tip Note
In order to use <span class="notranslate"> PHP Selector and custom php.ini, lsphp5 </span> needs to be in SuEXEC non-daemon mode.
:::

::: tip Note
Some PHP configurations require more memory for SuExec to work properly. If you are getting error 500 after switching suEXEC to non-daemon mode, try to increase <span class="notranslate"> Memory Soft Limit and Memory Hard Limit for external App </span> to at least 650/800M.
:::

::: tip Note
If you have LiteSpeed installed not in standard location path, please create a symlink: <span class="notranslate"> 'ln -s /path/to/custom/lsws /usr/local/lsws' then run 'cagefsctl --setup-cl-selector'. </span>
:::

### ISPmanager support


As of July 2013, <span class="notranslate"> PHP Selector </span> support for <span class="notranslate"> ISPmanager </span> is limited to command line utilities. You should still be able to use it.

As always, <span class="notranslate"> PHP Selector </span> requires <span class="notranslate">  CGI, FCGI </span> or <span class="notranslate"> suPHP </span> to work.

You will need to do following modifications:

Create new file <span class="notranslate"> /usr/local/bin/php-cgi-etc: </span>
<div class="notranslate">

```
#!/bin/bash
/usr/bin/php-cgi -c /etc/php.ini "$@"
```
</div>
Make that file executable:
<div class="notranslate">

```
$ chmod +x /usr/local/bin/php-cgi-etc
```
</div>
Edit file <span class="notranslate"> /usr/local/ispmgr/etc/ispmgr.conf </span>

Add a line:
<div class="notranslate">

```
path phpcgibinary /usr/local/bin/php-cgi-etc
```
</div>

Make sure there is no other lines with <span class="notranslate">`path phpcgibinary`</span> defined in the file.

Restart <span class="notranslate"> ISPmanager </span> :
<div class="notranslate">

```
$ killall ispmgr
```
</div>

After that <span class="notranslate"> FCGID </span> wrappers <span class="notranslate">(`/var/www/[USER]/data/php-bin/php`)</span> for new users will be like this:

<span class="notranslate"> #!/usr/local/bin/php-cgi-etc </span>

You might need to edit/modify wrappers for existing users if you want them to be able to use <span class="notranslate">PHP Selector</span>. You can leave them as is for users that don't need such functionality.

### Uninstalling

* [Disabling PHP extension globally](/cloudlinux_os_components/#disabling-php-extension-globally)

It is not possible to remove <span class="notranslate"> PHP Selector </span> from the system completely as it is an essential part of <span class="notranslate"> LVE Manager </span> and CageFS packages. However, you can make PHP Selector unavailable for cPanel and Plesk users.

To do so, go to <span class="notranslate"> _LVE Manager → PHP Selector_ </span> and check <span class="notranslate"> _Disabled_ as PHP Selector </span> status. Doing so allows you to disable web-interface of the <span class="notranslate"> PHP Selector </span> in the user interface but does not reset custom settings (choosing a version of PHP and modules).

To disable <span class="notranslate"> PHP Selector </span> and make it has no effect on a PHP version on the sites, run the following command:

* this command resets PHP versions to Native:

<div class="notranslate">

```
cagefsctl --cl-selector-reset-versions
```
</div>

* this command resets PHP modules to Default:

<div class="notranslate">

```
cagefsctl --cl-selector-reset-modules
```
</div>

::: danger
These commands can affect PHP version of your clients’ web sites. Use them with caution as improper usage might cause your clients’ web sites down.
:::

#### Disabling PHP extension globally

If you want to disable PHP extension globally, you don't need to remove file <span class="notranslate"> /opt/alt/phpXX/etc/php.d.all/$EXTENSION.ini </span> . You should just comment out <span class="notranslate"> "extension=" </span> directives in it.

The extension will be visible in <span class="notranslate">PHP Selector</span> interface, but selecting it in users's interface will take no effect - extension will be disabled in fact.

Reinstalling of <span class="notranslate">`alt-php`</span> packages will not reset settings (will not enable extension again).

### Configuration and using

* [Setting default version and modules](/cloudlinux_os_components/#setting-default-version-and-modules)
* [Individual PHP.ini files](/cloudlinux_os_components/#individual-php-ini-files)
* [How to add additional php.ini file for a user inside CageFS](/cloudlinux_os_components/#how-to-add-additional-php-ini-file-for-a-user-inside-cagefs)
* [Substitute global php.ini for individual customer](/cloudlinux_os_components/#substitute-global-php-ini-for-individual-customer)
* [How to substitute global php.ini for individual customer on cPanel server with EasyApache4](/cloudlinux_os_components/#how-to-substitute-global-php-ini-for-individual-customer-on-cpanel-server-with-easyapache4)
* [Managing interpreter version](/cloudlinux_os_components/#managing-interpreter-version)
* [Including PHP Selector only with some packages - cPanel](/cloudlinux_os_components/#including-php-selector-only-with-some-packages-cpanel)
* [PHP extensions](/cloudlinux_os_components/#php-extensions)
* [FFmpeg](/cloudlinux_os_components/#ffmpeg)
* [Native PHP configuration](/cloudlinux_os_components/#native-php-configuration)
* [How to configure alt-php72-zts to use with PHP Selector](/cloudlinux_os_components/#how-to-configure-alt-php72-zts-to-use-with-php-selector)
* [Using](/cloudlinux_os_components/#using)
* [Custom PHP.ini options](/cloudlinux_os_components/#custom-php-ini-options)
* [End user files and directories](/cloudlinux_os_components/#end-user-files-and-directories)
* [Compiling your own extensions](/cloudlinux_os_components/#compiling-your-own-extensions)
* [Roll your own PHP](/cloudlinux_os_components/#roll-your-own-php)
* [Detect user's PHP version](/cloudlinux_os_components/#detect-user-s-php-version)
* [PHP Selector without CageFS](/cloudlinux_os_components/#php-selector-without-cagefs)
* [Configuring "global” php.ini options for all Alt-PHP versions](/cloudlinux_os_components/#configuring-global%E2%80%9D-php-ini-options-for-all-alt-php-versions)

#### Setting default version and modules

Administrator can set default interpreter version and extensions for all users. All file operations are actually done by CageFS. CageFS takes settings from <span class="notranslate">  /etc/cl.selector/defaults.cfg. </span> Currently the <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> is created and handled by <span class="notranslate"> CloudLinux PHP Selector </span> scripts. It has the following format:
<div class="notranslate">

```
[global]
selector=enabled

[versions]
php=5.4

[php5.4]
modules=json,phar

[php5.3]
modules=json,zip,fileinfo
```
</div>


#### Individual PHP.ini files

For each customer, inside CageFS, file <span class="notranslate"> alt_php.ini is located in /etc/cl.php.d/alt-phpXX (XX </span> - version of PHP, like 52 or 53). The file contains PHP extension settings and extension directives selected by customer. This file exists for each customer, for each PHP version.

Note, that this is <span class="notranslate"> 'local' to CageFS, </span> and different users will have different files. The file is not visible in <span class="notranslate"> /etc/cl.php.d </span> outside CageFS. If you would like to view that file, use:
<div class="notranslate">

```
# cagefsctl -e USERNAME 
```
</div>

to enter into CageFS for that user. Then type: <span class="notranslate"> `exit` </span> ; to exit from CageFS

This file has to be updated using <span class="notranslate"> `cagefsctl --rebuild-alt-php-ini` </span> after updating <span class="notranslate"> alt-php </span> RPMs

Admin can change individual settings for PHP extensions by changing that extension's ini file, like editing <span class="notranslate"> /opt/alt/php54/etc/php.d.all/eaccelerator.ini </span> and then running:
<div class="notranslate">

```
cagefsctl --rebuild-alt-php-ini
```
</div>
to propagate the change.

#### How to add additional php.ini file for a user inside CageFS

If you want to create additional `php.ini` file for a user inside CageFS in order to change some specific PHP options for that user, you can execute the following:

<div class="notranslate">

```
# su -s /bin/bash - USER
# cd /etc/cl.php.d/alt-php72/
# echo "upload_tmp_dir=/tmp" >> custom.ini
```
</div>

The commands above create `custom.ini` file that will be used for `alt-php72`. By default this approach is valid only for alt-php version selected via <span class="notranslate">PHP Selector</span>. When <span class="notranslate">`/etc/cl.selector/symlinks.rules`</span> file contains <span class="notranslate">`php.d.location = selector`</span> line, then the approach is valid for all alt-php versions regardless whether it is selected in PHP Selector or not.

You can find more details [here](/cloudlinux_os_components/#bundled-php-extensions).

But the recommended way is to modify PHP options via PHP Selector web or CLI interfaces, as described [here](/cloudlinux_os_components/#custom-php-ini-options).



#### Substitute global php.ini for individual customer


Sometimes you might want to have a single customer with a different php.ini, than the rest of your customers.

To do that, you will use <span class="notranslate"> [custom.etc directory functionality](/cloudlinux_os_components/#custom-etc-files-per-customer) </span>

1. Move default php.ini into <span class="notranslate"> _/etc_ </span> directory and create a symlink to it:

<div class="notranslate">

```
$ mv /usr/local/lib/php.ini /etc/php.ini
$ ln -fs /etc/php.ini /usr/local/lib/php.ini
```
</div>

2. Change path to php.ini in <span class="notranslate"> _/etc/cl.selector/native.conf_ </span> file to:

<div class="notranslate">

```
php.ini=/etc/php.ini
```
</div>

3. For each user that needs custom file, create directory <span class="notranslate"> _/etc/cagefs/custom.etc/USER_NAME/php.ini_ </span> .

For example if you want to create custom for <span class="notranslate"> USER1 </span> and <span class="notranslate"> USER2 </span> you would create files:  
<span class="notranslate"> _/etc/cagefs/custom.etc/USER1/php.ini_ </span>  
<span class="notranslate"> _/etc/cagefs/custom.etc/USER2/php.ini_ </span>

Create such files for each user that should have custom file.

4. Execute:

<div class="notranslate">

```
$ cagefsctl --force-update 
```
</div>

::: tip Notes

1. Make sure that `php.ini` load path is set to <span class="notranslate">`/etc/php.ini`</span>

2. Users will be able to override settings of those php.ini files (global or custom) via <span class="notranslate">PHP Selector</span>. If you want to prevent that, you should disable <span class="notranslate">PHP Selector</span> feature.

3. Even if <span class="notranslate">PHP Selector</span> is disabled, user can override PHP settings by using <span class="notranslate">`ini_set() php`</span> function in PHP script, or by <span class="notranslate">`php -c`</span> command line option.

4. If you modify anything in <span class="notranslate">`/etc/cagefs/custom.etc`</span> directory, you should execute:

<div class="notranslate">

```
$ cagefsctl --update-etc
```
</div>

in order to apply changes to CageFS for all users.

OR 

<div class="notranslate">

```
$ cagefsctl --update-etc user1 user2
```
</div>

to apply changes to CageFS for specific users.

:::

#### How to substitute global php.ini for individual customer on cPanel server with EasyApache4

:::tip Note
It is enough to put `php.ini` in the directory where PHP script is located in order to run the PHP script with a custom `php.ini` when using SuPHP. Also, you can use <span class="notranslate">cPanel MultiPHP Manager</span> to create user’s custom `php.ini` file, and this approach should work for CGI, FCGI, and LSAPI. Recommended ways to manage `php.ini` settings per user are to use <span class="notranslate">cPanel MultiPHP</span> or <span class="notranslate">CloudLinux PHP Selector</span> interfaces.
:::

1. For each user that needs custom file, create directory <span class="notranslate">`/etc/cagefs/custom.etc/USER_NAME/php.ini`</span>.
    
    For example, if you want to create a custom file for USER1 and USER2 you would create files:

    <div class="notranslate">

    ```
    /etc/cagefs/custom.etc/USER1/php.ini
    /etc/cagefs/custom.etc/USER2/php.ini
    ```
    </div>

    Create such files for each user that should have a custom file.

2. Execute the following command:

    <div class="notranslate">

    ```
    $ cagefsctl --force-update
    ```
    </div>

3. Configure `php.ini` load path for user’s domains.
   
* When using **suphp** handler, you should use `SuPHP_ConfigPath` directive in virtual host configuration for these domains, or use this directive in `.htaccess` files: `suPHP_ConfigPath/etc`.

* When using **mod_lsapi**, you should use `lsapi_phprc` directive in virtual host configuration: `lsapi_phprc/etc/`.
    You can find the detailed description of `mod_lsapi` directives [here](/cloudlinux_os_components/#configuration-references).

* When using **FCGI** or **CGI**, you should implement custom PHP wrapper and redefine the path to `php.ini` via `-c` command line option, like below:
    <div class="notranslate">

    ```
    #!/bin/bash
    [ -f /etc/php.ini ] && exec /usr/bin/php -c /etc/php.ini
    exec /usr/bin/php
    ```
    </div>

**Notes:**

1. You should restart Apache web server after modifying virtual host configuration for the domains.
2. Custom `php.ini` may break switching PHP version via <span class="notranslate">CloudLinux PHP Selector</span> or <span class="notranslate">cPanel MultiPHP Manager</span> for the appropriate users or domains.
3. When using cPanel ea-php for the domains, additional `php.ini` files may not be loaded, so you should load all needed PHP extensions in custom `/etc/php.ini` file:
![](/images/custom_file_cPanel1.png)
4. When using CloudLinux alt-php, additional `php.ini` files will be loaded:
![](/images/custom_file_cPanel2.png)
5. If you have modified anything in `/etc/cagefs/custom.etc` directory, you should execute one of the following:

    * to apply changes to CageFS for all users, run:
  
    <div class="notranslate">

    ```
    $ cagefsctl --update-etc
    ```
    </div>

    * to apply changes to CageFS for specific users, run:
  
    <div class="notranslate">

    ```
    $ cagefsctl --update-etc user1 user2
    ```
    </div>


#### Managing interpreter version


Managing interpreter versions is done by means of manipulating a set of symbolic links that point to different versions of interpreter binaries. For example, if default PHP binary is <span class="notranslate"> `/usr/local/bin/php` </span> :

* First we move the default binary inside CageFS to <span class="notranslate"> `/usr/share/cagefs-skeleton/usr/selector` </span> , and make <span class="notranslate"> /usr/local/bin/php </span> a symlink pointing to <span class="notranslate"> /etc/cl.selector/php </span> . This operation is done as part of CageFS deployment.
* Next suppose we have additional PHP version, say 7.2.5. The information about all additional interpreter binaries and paths for them is kept in <span class="notranslate"> /etc/cl.selector/selector.conf </span> . This config file is updated by RPM package manager each time alternative PHP package is added, removed or updated
* <span class="notranslate"> `/usr/bin/selectorctl --list --interpreter=php` </span> will get us list of all available PHP interpreter versions out of <span class="notranslate"> /etc/cl.selector/selector.conf file </span> .
Next we want to know which PHP version is active for a given user (to supply a selected option in options list). We type:
* <span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --user-current` </span> will retrieve PHP version set for a particular user. The script gets the path from <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector/php` </span> symlink, compares it with contents of <span class="notranslate"> /etc/cl.selector/selector.conf </span> file and if path is valid, prints out the current interpreter version.
* <span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --set-user-current=7.2` </span> sets the current PHP version for particular user by creating symlink in <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector` </span> directory. All old symlinks are removed, and new symlinks are set.


#### Including PHP Selector only with some packages (cPanel)


<span class="notranslate"> cPanel </span> has a ' <span class="notranslate"> Feature Manager </span> ' in WHM that allows you to disable <span class="notranslate"> PHP Selector </span> for some of the packages that you offer.

In reality it only disables the icon in <span class="notranslate"> cPanel </span> interface. Yet, in most cases it should be enough in shared hosting settings.

You can find more info on ' <span class="notranslate"> Feature Manager </span> ' here: [http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager](http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager)


Once <span class="notranslate"> PHP Selector </span> is enabled, you can find it in the <span class="notranslate"> Feature Manager </span> . Disabling it in <span class="notranslate"> Feature Manager </span> , will remove the icon for users that are using that particular <span class="notranslate"> 'Feature List' </span>

<img src="/images/screen1-phpselector-featuremanager.png" width="478" height="575" />


#### PHP extensions

**Configuring Alt-PHP modules loading**


<span class="notranslate"> CloudLinux PHP Selector </span> and Alt-PHP can be used in conjunction with <span class="notranslate"> Plesk PHP Selector </span> and <span class="notranslate"> cPanel MultiPHP </span> . To be compatible, <span class="notranslate"> CloudLinux PHP Selector </span> works as follows: modules that are selected in <span class="notranslate"> CloudLinux PHP Selector </span> are loaded for Alt-PHP version selected in <span class="notranslate"> CloudLinux PHP Selector </span> only. For the rest Alt-PHP versions default module set is loaded <span class="notranslate"> ( _/opt/alt/phpXX/etc/php.d/default.ini_ ) </span> . Described above is default behavior.

::: tip Note
If system default PHP version selected in <span class="notranslate"> cPanel MultiPHP Manager is not ea-php, then default module set is loaded for all Alt-PHP versions by default (/opt/alt/phpXX/etc/php.d/default.ini). </span>

When <span class="notranslate"> "php.d.location = selector" option is in effect, modules selected via PHP Selector </span> will be loaded for all alt-php versions.
:::


This behavior is implemented in CageFS-6.1-10 and later.

In <span class="notranslate"> LVE Manager </span> 1.0-9.40+ this behavior can be modified so that modules selected in <span class="notranslate"> CloudLinux PHP Selector </span> would be loaded for all Alt-PHP versions (with CageFS enabled), which can be quite useful if you use  ‘ <span class="notranslate"> per directory </span> ’ or ‘ <span class="notranslate"> per domain </span> ’ Alt-PHP configuration and want to select modules using <span class="notranslate"> CloudLinux PHP Selector </span> .

To modify it, create a file <span class="notranslate"> _/etc/cl.selector/symlinks.rules_ </span> (read-only for regular users) with the following content: <span class="notranslate"> _php.d.location = selector_ </span>

And run the command to apply changes:
<div class="notranslate">

```
/usr/bin/selectorctl --apply-symlinks-rules
```
</div>
To revert to the default behavior:

* Delete <span class="notranslate"> _/etc/cl.selector/symlinks.rules_ </span> file.
* Alternatively remove <span class="notranslate"> _php.d.location_ </span> option from the file.
* Alternatively set <span class="notranslate"> _default_ </span> value for <span class="notranslate"> _php.d.location_ </span> option.

And run the command to apply changes:
<div class="notranslate">

```
/usr/bin/selectorctl --apply-symlinks-rules
```
</div>

#### FFmpeg

Due to possible patent issues CloudLinux does not provide <span class="notranslate"> FFmpeg </span> libraries ( [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html) ). We highly recommend researching if you can legally install <span class="notranslate"> FFmpeg </span> extension on your server. This might differ based on where you and your servers are located. More information can be found on the link: [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html)

For your convenience we provide <span class="notranslate"> FFMPEG PHP </span> binding. For them to work, you need to install <span class="notranslate"> FFmpeg </span> package from the “ <span class="notranslate"> Nux Dextop </span> ” repository following the [instructions](http://li.nux.ro/repos.html).

Once <span class="notranslate"> FFmpeg </span> is installed you can install PHP bindings, by running:
<div class="notranslate">

```
yum install alt-php*ffmpeg 
```
</div>

Enable <span class="notranslate"> PHP-FFmpeg </span> extension via <span class="notranslate"> PHP Selector </span> :
<div class="notranslate">

```
selectorctl --enable-extensions=ffmpeg --user USERNAME --version X.Y
```
</div>

#### Native PHP configuration

<span class="notranslate">PHP Selector</span> requires access to the <span class="notranslate">native PHP</span> version for proper work. It is specified in the file <span class="notranslate">`/etc/cl.selector/native.conf`</span> of the following content (example):
<div class="notranslate">

```
php=/usr/bin/php-cgi
php-cli=/usr/bin/php
php.ini=/etc/php.ini
lsphp=/usr/local/bin/lsphp
php-fpm=/usr/local/sbin/php-fpm
```
</div>


Then execute the following command to apply changes.
<div class="notranslate">

```
cagefsctl --setup-cl-selector
```
</div>

The file is created when installing CageFS on the servers with <span class="notranslate"> cPanel, Plesk, DA, Interworx and ISP Manager </span> , if it is missing. On all other servers the file is not being created at all.

That is why, if the file is not created automatically, then it must be created manually and correct paths must be written to its directives.

Access permission 644 must be set:
<div class="notranslate">

```
chmod 0644 /etc/cl.selector/native.conf
```
</div>


#### How to configure alt-php72-zts to use with PHP Selector

**Requirements**

To use `alt-php72-zts` with PHP Selector you need the following:

* `cagefs-6.1.8-1` or later
* `alt-php72-zts-7.2.21-4` or later

**Using zts PHP**

1. Install `alt-php72-zts` with the following command:
  
  <div class="notranslate">

  ```
  yum install alt-php72-zts
  ```
  </div>

2. Make sure that <span class="notranslate">`/etc/cl.selector/selector.conf`</span> file contains correct paths to the PHP `zts` binaries.

  You should remove the old lines:

  <div class="notranslate">

  ```
  php 7.2 7.2.20 /opt/alt/php72/usr/bin/php-cgi
  php-cli 7.2 7.2.20 /opt/alt/php72/usr/bin/php
  ```
  </div>

  And replace them with the lines with the new paths:

  <div class="notranslate">

  ```
  php 7.2 7.2.20 /opt/alt/php72/usr/bin/zts-php-cgi
  php-cli 7.2 7.2.20 /opt/alt/php72/usr/bin/zts-php
  ```
  </div>

3. Make sure that <span class="notranslate">`/opt/alt/php72/etc/php.d.all`</span> path refers to the directory containing `ini` files for `zts` PHP extensions:

  <div class="notranslate">

  ```
  cd /opt/alt/php72/etc
  ln -fsn php.d.all.zts php.d.all
  ```
  </div>

4. Execute the following command:

  <div class="notranslate">

  ```
  cagefsctl --setup-cl-selector
  ```
  </div>


**Using non-zts PHP**

1. Make sure that <span class="notranslate">`/etc/cl.selector/selector.conf`</span> file contains correct paths to the `non-zts` PHP binaries.
   
  You should remove the old lines:
  
  <div class="notranslate">

  ```
  php 7.2 7.2.20 /opt/alt/php72/usr/bin/zts-php-cgi
  php-cli 7.2 7.2.20 /opt/alt/php72/usr/bin/zts-php
  ```
  </div>

And replace them with the lines with the new paths:

  <div class="notranslate">

  ```
  php 7.2 7.2.20 /opt/alt/php72/usr/bin/php-cgi
  php-cli 7.2 7.2.20 /opt/alt/php72/usr/bin/php
  ```
  </div>
  
2. Make sure that <span class="notranslate">`/opt/alt/php72/etc/php.d.all`</span> path refers to the directory containing `ini` files for `non-zts` PHP extensions:

  <div class="notranslate">

  ```
  cd /opt/alt/php72/etc
  ln -fsn php.d.all.def php.d.all
  ```
  </div>

3. Execute the following command:

  <div class="notranslate">

  ```
  cagefsctl --setup-cl-selector
  ```
  </div>

#### Using

Once <span class="notranslate">PHP Selector</span> is installed, you will see the <span class="notranslate">[**Selector**](/lve_manager/#selector-tab)</span> tab in the <span class="notranslate">**LVE Manager**</span>.

Customers can use [PHP Selector client plugin](/lve_manager/#php-selector-client-plugin) to change their PHP Selctor related settings.

#### Custom PHP.ini options

<span class="notranslate">PHP Selector</span> allows customer to edit php.ini settings. Admin has a full control over which settings can be modified.

To allow settings to be modifiable, it has to be whitelisted in <span class="notranslate">`/etc/cl.selector/php.conf`</span>.

Here are some of the examples of allowed directives:
<div class="notranslate">

```
Directive = safe_mode
Type      = bool
Remark    = <5.4.0
Comment   = Enables PHP safe mode. This mode puts a number of restrictions on scripts (say, access to file system) mainly for security reasons.
```
</div>

<div class="notranslate">

```
Directive = safe_mode_include_dir
Type      = value
Remark    = <5.4.0
Comment   = If PHP is in the safe mode and a script tries to access some files, files from this directory will bypass security (UID/GID) checks. The directory must also be in include_path. For example: /dir/inc
```
</div>

| | |
|-|-|
|Directive | php.ini setting|
|Type | bool, value (any text), list|
|Range | list of values for list Type|
|Comment | explanation of the setting to display in UI|

Default values, that are shown in <span class="notranslate"> PHP Selector </span> web interface, are taken from <span class="notranslate"> '/opt/alt/phpXX/usr/bin/php -i' </span> runtime values, if
directive is not there, it will use the output of phpinfo() function. So, if you wish to change default value of any option for
"alternative" php version, please modify <span class="notranslate"> /opt/alt/phpXX/etc/php.ini </span> files (where XX = 55, 54, 53, etc according to php version).

Admin can modify the settings using <span class="notranslate"> [selectorctl](/command-line_tools/#selectorctl) </span> command.

Users can use web interface to modify php.ini settings:

![](/images/php_selector_options.png)


#### End user files and directories

The following files and directories are created inside CageFS for each customer:

<span class="notranslate"> /etc/cl.selector </span> - PHP binaries symbolic links.

<span class="notranslate"> /usr/selector/php - Native PHP </span> binaries.

<span class="notranslate"> /etc/cl.php.d/alt-php* </span> - Links to enabled modules.

<span class="notranslate"> /home/user/.cl.selector/alt_phpXX.cfg </span> - Config file for custom PHP options.

like:

<span class="notranslate"> /etc/cl.php.d/alt-php54/fileinfo.ini - /opt/alt/php54/etc/php.d.all/fileinfo.ini </span>


#### Compiling your own extensions

Sometimes you might want to compile your own PHP extension for your users to use. In most cases, it is better to contact our support by sending us a support [ticket](https://cloudlinux.zendesk.com/hc/requests/new) . We will try to provide such extension for you via regular updates within 5-7 days.

If you have decided that you want to build it on your own, you would need to build it for each and every supported version of PHP that you have installed. The module installation process is a bit different from standard - you would need to use the version of phpize and php-config binaries that come with particular <span class="notranslate"> Alt-PHP </span> version.

The full process for PHP 5.X and 7.X looks as follows:

1. Download and unpack extension, cd into it's directory.

2. Execute our version of phpize if necessary:

<div class="notranslate">

```
/opt/alt/phpXX/usr/bin/phpize
```
</div>

3. Execute configure with our binary:

<div class="notranslate">

```
./configure --with-php-config=/opt/alt/phpXX/usr/bin/php-config
```
</div>

4. Make the <span class="notranslate"> .so </span> file:

<div class="notranslate">

```
make
```
</div>

5. Copy it to the modules directory (on 32-bit server, use <span class="notranslate"> usr/lib/php/modules </span> ).

<div class="notranslate">

```
cp -rp modules/*.so /opt/alt/phpXX/usr/lib64/php/modules/
```
</div>

6. Add ini file for module to <span class="notranslate"> `/opt/alt/phpXX/etc/php.d.all` . </span>

7. Register new <span class="notranslate"> Alt-PHP </span> version with:

<div class="notranslate">

```
$ cagefsctl --setup-cl-selector
```
</div>

#### Roll your own PHP

To add your own PHP version in <span class="notranslate"> PHP Selector </span> :

* Create directory in (like:  /opt/alt/php51), and mimic directory structure inside to be similar to the one of PHP versions bundled by <span class="notranslate"> CloudLinux </span> .
* Put all the ini files for all the modules into <span class="notranslate"> /opt/alt/php51/etc/php.d.all </span>
* Create a symbolic link <span class="notranslate"> /opt/alt/php51/etc/php.d -> /etc/cl.php.d/alt-php51 </span>

Place all such files into <span class="notranslate"> /opt/alt/php51/usr/lib/php/modules </span>

Add an absolute path to PHP binaries into <span class="notranslate"> /etc/cl.selector/selector.conf </span> using the following format:

<div class="notranslate">

```
php     5.1 5.1.2 /opt/alt/php51/usr/bin/php-cgi 
php-cli 5.1 5.1.2 /opt/alt/php51/usr/bin/php 
php-fpm 5.1 5.1.2 /opt/alt/php51/usr/sbin/php-fpm
   ^     ^    ^                ^----- absolute path
   |     |    |---------------------- real version
   |     | -------------------------- version to display
   |--------------------------------- binary to 'substitute'
```
</div>

Execute:
<div class="notranslate">

```
cagefsctl --setup-cl-selector
```
</div>

The new PHP version must be available now for selection in <span class="notranslate">PHP Selector</span>.

#### Detect user's PHP version


:::tip Note
<span class="notranslate">LVE Manager</span> 0.5-63 or higher
:::

<span class="notranslate"> PHP Selector </span> provides an easy way to figure out which versions are available and selected for end user from the command line. You can get this information by running:

<div class="notranslate">

```
$ selectorctl --interpreter=php --user-summary --user=USERNAME
```
</div>

<div class="notranslate">

```
The output:
5.2 e - -
5.3 e - s
5.4 e - -
5.5 e - -
native e d -
```
</div>

The first column defines the PHP version. <span class="notranslate"> _Native_ </span> means native PHP version, like the one installed by cPanel with EasyApache.

The second column will contain either <span class="notranslate"> **e** </span> or **-.** If <span class="notranslate"> **e**  </span> is present, it means that given version is enabled, and can be selected by the end user.

The third column can have values <span class="notranslate"> **d**   </span> or **-.** If <span class="notranslate"> **d** </span> is present, that version is considered a 'default' version. Only one PHP version will have **d** indicator.

The fourth column can have values <span class="notranslate"> **s**   </span> or **-.** If <span class="notranslate"> **s** is present, that is the selected version, currently being used by the end user. Only one PHP version will have  <span class="notranslate"> **s** </span>  indicator. </span>

In case a user is not inside CageFS, and as such doesn't use <span class="notranslate"> PHP Selector </span> , you will see the following error message:

<div class="notranslate">

```
ERROR:User USERNAME not in CageFS
```
</div>

#### PHP Selector without CageFS


**[LVE Manager 2.0-11.1 or higher]**

<span class="notranslate"> PHP Selector </span> can now be used with CageFS turned off (in case when there is only one user account on the server).

To install run:
<div class="notranslate">

```
yum groupinstall alt-phpyum install cagefs lvemanager
```
</div>

(no need to initialize or turn on CageFS)

<div class="notranslate">

```
selectorctl --setup-without-cagefs USER
```
</div>

( <span class="notranslate"> USER </span> - the name of a user who is using selector. If not specified, the first available cPanel account username will be used).

When executing <span class="notranslate">`--setup-without-cagefs`</span>, the following actions are performed:

* Creating symlinks to the user modules and options for each <span class="notranslate"> Alt-PHP </span> version:  
<span class="notranslate"> _/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini_ </span>

* In user home directory creating:  
<span class="notranslate"> _.cl.selector/_ </span>

“Backup” settings files (selected version, modules, options):  
<span class="notranslate"> _.cl.selector/defaults.cfg_ </span>  
<span class="notranslate"> _.cl.selector/alt_php44.cfg_ </span>

Symlinks to the selected version:  
<span class="notranslate"> _.cl.selector/lsphp -> /opt/alt/php44/usr/bin/lsphp_ </span>  
<span class="notranslate"> _.cl.selector/php.ini -> /opt/alt/php44/etc/php.ini_ </span>  
<span class="notranslate"> _.cl.selector/php-cli -> /opt/alt/php44/usr/bin/php_ </span>  
<span class="notranslate"> _.cl.selector/php -> /opt/alt/php44/usr/bin/php-cgi_ </span>  

Additional symlinks for environment variable <span class="notranslate"> $PATH </span> (search path) in the file <span class="notranslate"> ~/.bashrc </span> :  
<span class="notranslate"> _.cl.selector/selector.path/_ </span>  
<span class="notranslate"> _.cl.selector/selector.path/php-cgi -> ../php_ </span>  
<span class="notranslate"> _.cl.selector/selector.path/php -> ../php-cli_ </span>  

Generated ini files with selected modules and options for each version:
<span class="notranslate"> _.cl.selector/alt_php44.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php51.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php52.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php53.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php54.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php55.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php56.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php70.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php71.ini_ </span>  

Symlinks above are being created according to the settings in <span class="notranslate"> ~/.cl.selector/defaults.cfg </span> and <span class="notranslate"> ~/.cl.selector/alt_php44.cfg </span> files (44 - corresponding PHP version), which are storing <span class="notranslate"> PHP Selector </span> settings for the user. These files are usually taken from user home directory backup or when migrating account from another server. Thus, when migrating account from server to server, <span class="notranslate"> PHP Selector </span> settings are saved.

If no <span class="notranslate"> PHP Selector </span> settings backup files are found when running <span class="notranslate">`selectorctl --setup-without-cagefs`</span>, then default settings from <span class="notranslate">`/etc/cl.selector/defaults.cfg`</span> global file are applied (as in selector normal mode). If the file is absent, then native PHP version will be selected for the user.

* The following line: <span class="notranslate"> _PATH=$HOME/.cl.selector/selector.path:$HOME/.cl.selector:$PATH_ </span>

is being added to the user file <span class="notranslate">`~/.bashrc` </span>

<span class="notranslate"> Apache </span> PHP handlers settings are not changed.

* Also <span class="notranslate">`selectorctl --setup-without-cagefs`</span> command does the following: 

  * Turns off link traversal protection (linksafe);
  * Turns off cagefs service.

To get back to the selector normal mode (“with CageFS”) run:
<div class="notranslate">

```
selectorctl --revert-to-cagefs
```
</div>

(CageFS should be initialized by using <span class="notranslate">`cagefsctl --init`</span> command before running the command above)

This command removes symlinks:  
<span class="notranslate">`/opt/alt/php55/link/conf/alt_php.ini` -> `/home/USER/.cl.selector/alt_php55.ini`</span>
turns on link traversal protection (linksafe) and cagefs service.

:::tip Note
See also PHP Selector [CLI](/command-line_tools/#php-selector)
:::

#### Configuring "global” php.ini options for all Alt-PHP versions

:::tip Note
CageFS 6.0-33 or higher, <span class="notranslate">LVE Manager</span> 2.0-11.2 or higher
:::

There is <span class="notranslate">`/etc/cl.selector/global_php.ini`</span> file, where you can specify values of PHP options that should be applied for all <span class="notranslate"> Alt-PHP </span> versions that are installed on a server. These settings will also be automatically applied to the new <span class="notranslate"> Alt-PHP </span> versions that will be installed later.

Example:  
<span class="notranslate"> _# cat /etc/cl.selector/global_php.ini_ </span>  
<span class="notranslate"> _[Global PHP Settings]_ </span>  
<span class="notranslate"> _date.timezone = Europe/Warsaw_ </span>  
<span class="notranslate"> _error_log = error_log_ </span>  
<span class="notranslate"> _memory_limit = 192M_ </span>  
Sections are ignored. Only name of an option and a value have meaning.

When an option is absent in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, than it is not changed (applied) to php.ini for <span class="notranslate"> Alt-PHP </span> versions.

<span class="notranslate"> date.timezone </span> and <span class="notranslate"> error_log </span> options are handled differently than the others. When these options are not in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, than values for the options will be taken from <span class="notranslate"> "native" </span> php.ini file. And when the option is in php.ini for some <span class="notranslate"> Alt-PHP </span> version already (and its value is not empty), than value from <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> will be NOT applied.

:::tip Note
CageFS version 6.1.5-1 or later
:::

The behavior above is changed for cPanel servers with EasyApache 4. The <span class="notranslate">`/usr/local/lib/php.ini`</span> file is removed for new installations of cPanel v80 and later.

* When <span class="notranslate">`/usr/local/lib/php.ini`</span> file exists, <span class="notranslate">`error_log`</span> and <span class="notranslate">`date.timezone`</span> options will be taken from that <span class="notranslate">`php.ini`</span> file.
* When <span class="notranslate">`/usr/local/lib/php.ini`</span> file does not exist, <span class="notranslate">`error_log`</span> and <span class="notranslate">`date.timezone`</span> options will be taken from the <span class="notranslate">`php.ini`</span> file for system default PHP version selected in MultiPHP Manager.
  
This functionality works when the system default PHP version is <span class="notranslate">`ea-php`</span> only. When the system default PHP version is <span class="notranslate">`alt-php`, `error_log`</span> and <span class="notranslate">`date.timezone`</span> directives will be NOT taken from that <span class="notranslate">`php.ini`</span> file.


To confirm changes (not affecting <span class="notranslate"> "date.timezone" </span> and <span class="notranslate"> "error_log" </span> options) please run:

<div class="notranslate">

```
/usr/sbin/cagefsctl --setup-cl-selector
```
</div>

To confirm changes (including <span class="notranslate">`date.timezone`</span> and <span class="notranslate">`error_log`</span> options) please run:

<div class="notranslate">

```
/usr/bin/selectorctl --apply-global-php-ini
```
</div>
or

<div class="notranslate">

```
/usr/sbin/cagefsctl --apply-global-php-ini
```
</div>
(two commands above work the same way).

If you don't want to change <span class="notranslate">`error_log`</span>, but want to change <span class="notranslate">`date.timezone`</span>, you can execute:

<div class="notranslate">

```
selectorctl --apply-global-php-ini date.timezone
```
</div>

Similarly, command <span class="notranslate"> `selectorctl --apply-global-php-ini error_log` </span> applies <span class="notranslate"> error_log </span> and all other options specified in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, except <span class="notranslate"> date.timezone </span> .

So, you can specify 0, 1 or 2 parameters from the list: <span class="notranslate"> error_log, date.timezone </span> .

Using <span class="notranslate"> `--apply-global-php-ini` </span> without arguments applies all global PHP options including two above.

Example:

<div class="notranslate">

```
selectorctl --apply-global-php-ini error_log
selectorctl --apply-global-php-ini date.timezone
selectorctl --apply-global-php-ini date.timezone error_log
```
</div>

The latter command has the same effect as <span class="notranslate">`/usr/bin/selectorctl --apply-global-php-ini`</span>.

:::tip Note
See also PHP Selector [CLI](/command-line_tools/#php-selector)
:::


### Integration with control panels

* [PHP Selector integration with cPanel/WHM](https://cloudlinux.zendesk.com/hc/en-us/articles/360014084800-PHP-Selector-Integration-with-cPanel)
* [PHP Selector integration with Plesk](https://cloudlinux.zendesk.com/hc/en-us/articles/115004582105-PHP-Selector-Integration-with-Plesk-Panel)
* [PHP Selector integration with DirectAdmin](https://cloudlinux.zendesk.com/hc/en-us/articles/360010322460-PHP-Selector-Integration-with-DirectAdmin)

This is the list of commands that we use to integrate <span class="notranslate">PHP Selector</span> with control panels.

**PHP summary:**

Command:
<div class="notranslate">

```
/usr/bin/selectorctl --summary
```
</div>
Result:
<div class="notranslate">

```
4.4 e -
5.1 e -
5.2 e -
5.3 e -
5.4 e -
5.5 e -
5.6 e -
7.0 e -
7.1 e -
native e d
```
</div>
When native PHP version needs to be displayed:

Command:
<div class="notranslate">

```
/usr/bin/selectorctl --summary --show-native-version
```
</div>

Result:
<div class="notranslate">

```
4.4 e -
5.1 e -
5.2 e -
5.3 e -
5.4 e -
5.5 e -
5.6 e -
7.0 e -
7.1 e -
native(5.6) e d
```
</div>

The first column: PHP version  
The second column: enabled or not ( <span class="notranslate"> e </span> - enabled)  
The third column: if selected as default  ( <span class="notranslate"> d </span> - default)

**Set default version:**
<div class="notranslate">

```
/usr/bin/selectorctl --set-current=_VERSION_
```
</div>

**Disable version:**

<div class="notranslate">

```
/usr/bin/selectorctl --disable-alternative=_VERSION_
```
</div>

**Enable version:**

<div class="notranslate">

```
/usr/bin/selectorctl --enable-alternative=_VERSION_
```
</div>

**List extensions for a version:**

<div class="notranslate">

```
/usr/bin/selectorctl --list-extensions --version=5.6
```
</div>

Result:
<div class="notranslate">

```
- apc
- bcmath
- big_int
- bitset
- bloomy
~ bz2
- bz2_filter
~ calendar
- coin_acceptor
- crack
~ ctype
+ curl
```
</div>

+: enabled  
~: included in php binary (cannot be disabled)  
-: disabled

**Select default extensions (enable comma-separated list of extensions globally for a version):**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --enable-extensions=pdo,json,mysql
```
</div>

**Deselect default extensions (disable comma-separated list of extensions globally for a version):**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --disable-extensions=pdo,json,mysql
```
</div>

**Replace extensions with comma-separated list of extensions for a version globally:**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --replace-extensions=pdo,json,mysql
```
</div>

**Select PHP version for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --set-user-current=_VERSION_ --user=_USER_
```
</div>

**List enabled extensions for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --list-user-extensions --user=_USER_ --version=_VERSION_
```
</div>

**Enable comma-separated list of extensions for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --enable-user-extensions=pdo,json,mysql --user=_USER_ --version=_VERSION_
```
</div>

**Reset user’s extensions to defaults:**

<div class="notranslate">

```
/usr/bin/selectorctl --reset-user-extensions --user=_USER_ --version=_VERSION_
```
</div>

**Replace user extensions with comma-separated list of extensions:**

<div class="notranslate">

```
/usr/bin/selectorctl --replace-user-extensions=EXT_LIST --user=_USER_ --version=_VERSION_
```
</div>

<span class="notranslate"> _EXT_LIST_ </span> _a is comma separated list of PHP extensions (for example:_  <span class="notranslate"> _pdo,json,mysql_ </span> )

**List available options for php.ini editing:**

<div class="notranslate">

```
/usr/bin/selectorctl --print-options --user=_USER_ --version=_VERSION_ [--json]
```
</div>

**List available options for php.ini editing (print safe strings):**

<div class="notranslate">

```
/usr/bin/selectorctl --print-options-safe --user=_USER_ --version=_VERSION_ [--json]
```
</div>

**Set php.ini options for end user:**

<div class="notranslate">

```
/usr/bin/selectorctl --user=_USER_ --version=_VERSION_ --replace-options=_OPTIONS_ --base64 [--json]
```
</div>

Here is an example of how you can generate <span class="notranslate"> _OPTIONS_ in base64 </span> format:

<div class="notranslate">

```
OPTIONS=`echo disable_functions:exec,syslog|base64 -w 0`,`echo display_errors:off|base64 -w 0`,`echo post_max_size:128M|base64 -w 0`
echo $OPTIONS
```
</div>

See also [PHP Selector CLI tools](/command-line_tools/#php-selector).

### Bundled PHP extensions

Large number of PHP extensions are bundled with each version of PHP.

* [PHP 4.4 extensions](/cloudlinux_os_components/#php-4-4-extensions)
* [PHP 5.1 extensions](/cloudlinux_os_components/#php-5-1-extensions)
* [PHP 5.2 extensions](/cloudlinux_os_components/#php-5-2-extensions)
* [PHP 5.3 extensions](/cloudlinux_os_components/#php-5-3-extensions)
* [PHP 5.4 extensions](/cloudlinux_os_components/#php-5-4-extensions)
* [PHP 5.5 extensions](/cloudlinux_os_components/#php-5-5-extensions)
* [PHP 5.6 extensions](/cloudlinux_os_components/#php-5-6-extensions)
* [PHP 7.0 extensions](/cloudlinux_os_components/#php-7-0-extensions)
* [PHP 7.1 extensions](/cloudlinux_os_components/#php-7-1-extensions)
* [PHP 7.2 extensions](/cloudlinux_os_components/#php-7-2-extensions)
* [PHP 7.3 extensions](/cloudlinux_os_components/#php-7-3-extensions)
* [PHP 7.4 extensions](/cloudlinux_os_components/#php-7-4-extensions)

#### PHP 4.4 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|bcmath <br>bz2 <br>calendar <br>ctype <br>curl <br>dba <br>dbase <br>dbx <br>domxml <br>exif <br>fileinfo | ftp <br>gd <br>gettext <br>gmp <br>iconv <br>imap <br>interbase <br>ioncube_loader <br>ioncube_loader_4<br> ioncube_loader_5 <br>json <br>ldap  | mbstring <br>mcrypt <br>mhash <br>mysql <br>ncurses <br>odbc <br>openssl <br>overload <br>pcntl <br>pcre <br>pgsql  | posix <br>pspell <br>readline <br>recode <br>session <br>shmop <br>snmp <br>sockets <br>sourceguardian <br>standard <br>sybase_ct <br>sysvmsg  | sysvsem <br>sysvshm <br>tokenizer <br>wddx <br>xml <br>xmlrpc <br>zlib|
</div>

#### PHP 5.1 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|bcmath <br>big_int <br>bitset <br>bz2 <br>bz2_filter <br>calendar <br>coin_acceptor <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br>doublemetaphone <br>exif <br>ftp <br>gd <br>geoip | gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>ioncube_loader <br>ioncube_loader_4 <br> ioncube_loader_5 <br>ldap <br>libxml  | lzf <br>mbstring <br>mcrypt <br>memcache <br>msgpack <br>mysql <br>mysqli <br>ncurses <br>odbc <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br> pdo_oci | pgsql <br>posix <br>pspell <br>quickhash <br>radius <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>ssh2 <br>standard <br>stats  | stem <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>translit <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>zlib |
</div>

#### PHP 5.2 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apm <br>ares <br>bcmath <br>bcompiler <br>big_int <br>bitset <br>bloomy <br>bz2 <br>bz2_filter <br>calendar <br>coin_acceptor <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>enchant <br>exif <br>ffmpeg <br>fileinfo <br>filter <br> ftp | gd <br>gender <br>geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br> geos <br>haru <br>hash <br>hidef <br>htscanner <br>huffman <br> http <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br> ioncube_loader_5 <br>json <br>ldap <br>libxml | lzf <br> magickwand <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>msgpack <br>mssql <br>mysql <br>mysqli <br>ncurses <br>oauth <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br> pdo_oci | pgsql <br>phar <br>posix <br>pspell <br>quickhash <br>radius <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite <br>ssh2 <br>standard <br>stats <br>stem <br>stomp  | suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>translit <br>uploadprogress <br>uuid <br>wddx <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br> xhprof <br>yaf <br>yaz <br>zend_optimizer <br>zip <br>zlib|
</div>

#### PHP 5.3 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apcu <br>apm <br>ares <br>bcmath <br>bcompiler <br>big_int <br>bitset <br>bloomy <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>coin_acceptor <br>core <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br> filter <br>ftp | functional <br> gd <br>gender <br>geoip <br> geos <br> gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br> ioncube_loader_5 <br> jsmin <br>json <br>ldap <br>libevent <br>libxml <br>lzf | magickwand <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br> pdo_oci <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br> pgsql | phalcon <br>phar <br> posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br> solr <br>spl <br>spl_types <br>sqlite <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin | sybase_ct <br>sysvmsg <br> sysvsem <br> sysvshm <br>tidy <br> tideways <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br> xhprof <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

#### PHP 5.4 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>functional <br>gd <br> gender | geoip <br> geos <br>gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br> ioncube_loader_5 <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br> luasandbox <br>magickwand <br>mailparse <br>mbstring| mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br> pdo_oci <br>pgsql <br>phalcon <br>phar  | posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br> solr <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin <br>sybase_ct <br>sysvmsg | sysvsem <br>sysvshm <br>tidy <br> tideways <br> timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br> xhprofjsmin <br> yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

#### PHP 5.5 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br> diseval <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip | geos <br> gettext <br>gmagick <br>gmp <br>gnupg <br>gRPC <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br> ioncube_loader_5 <br>jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br> luasandbox <br>magickwand <br>mailparse <br>mbstring <br>mcrypt | memcache <br>memcached <br>mhash <br>mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br> pdo_oci <br>pgsql | phalcon <br>phalcon3 <br>phar <br>posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br> solr <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin | sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br> tideways <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br> xhprof <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq |
</div>


#### PHP 5.6 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbx <br>dom <br>doublemetaphone <br> diseval <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip <br>gettext | geos <br> gmagick <br>gmp <br>gnupg <br>gRPC <br>haru <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br> ioncube_loader_5 <br> jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br> luasandbox <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash | mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br> pdo_oci <br>pgsql <br>phalcon <br>phalcon3 | phar <br>posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br> solr | suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>translit <br> tideways <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br> xhprof <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

#### PHP 7.0 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>bitset <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br> diseval <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br> ffmpeg <br>gd <br>gender <br> geos | geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libsodium <br>libxml <br>lzf <br> luasandbox  <br>mailparse <br>mbstring <br>mcrypt | memcached <br> memcache <br>mongodb <br>mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br> pdo_oci  <br>pgsql <br>phalcon3 <br>phar | posix <br>propro <br>pspell <br> phalcon4 <br>raphf <br>rar <br>readline <br>redis <br>reflection <br> recode <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br> solr <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>suhosin <br>sysvmsg | swoole <br> sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br> tideways <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br>yaz <br> yaf <br>zip <br>zlib <br>zmq|
</div>

::: tip Note
To use <span class="notranslate">`newrelic`</span> extension you should set your own <span class="notranslate">`New Relic License Key`</span> in your own <span class="notranslate">`/opt/alt/php7*/etc/php.ini`</span> file.
Please find more info about <span class="notranslate">New Relic License Key</span> in the <span class="notranslate">[New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key)</span>.
:::


#### PHP 7.1 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|40-snuffleupagus <br> 40-vld <br> apcu <br>bcmath <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br> diseval <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br> ffmpeg <br>gd <br>gender <br>geoip <br>gettext | geos <br> gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libsodium <br>libxml <br>lzf <br> luasandbox <br>mailparse <br>mbstring <br>mcrypt <br>memcached | memcache <br> mongodb <br>mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar <br> pdf | pdo_oci <br> phalcon4 <br> posix <br>propro <br>pspell <br>raphf <br>rar <br>readline <br>redis <br>reflection <br> recode <br> solr <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>suhosin <br>sysvmsg | swoole <br> sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br> tideways <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br> yaf <br>zip <br>zlib <br>zmq|
</div>


::: tip Note
To use <span class="notranslate">`newrelic`</span> extension you should set your own <span class="notranslate">`New Relic License Key`</span> in your own <span class="notranslate">`/opt/alt/php7*/etc/php.ini`</span> file.
Please find more info about <span class="notranslate">New Relic License Key</span> in the <span class="notranslate">[New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key)</span>.
:::

#### PHP 7.2 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
| 40-snuffleupagus <br> 40-vld <br> apcu <br>bcmath <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dom <br> dbase <br> diseval  <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br> ffmpeg <br>gd <br>gender <br>geoip <br>gettext | geos <br> gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libxml <br>lzf <br>  luasandbox <br> mcrypt <br> memcache <br> mailparse <br>mbstring <br>memcached <br>mongodb | mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_dblib <br>pdo_firebird <br> pdf <br> pdo_oci <br> phalcon4  <br> pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar | posix <br>propro <br>pspell <br>raphf <br>readline <br>redis <br>reflection <br> recode <br> sodium <br> sourceguardian <br> swoole  <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>sysvmsg <br>sysvsem | sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br> tideways <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br> xdebug <br> yaf <br>yaml <br>zip <br>zlib <br>zmq|
</div>

::: tip Note 
To use <span class="notranslate">`newrelic`</span> extension you should set your own <span class="notranslate">`New Relic License Key`</span> in your own <span class="notranslate">`/opt/alt/php7*/etc/php.ini`</span> file.
You can find more info about <span class="notranslate">New Relic License Key</span> in the <span class="notranslate">[New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key)</span>.
:::


#### PHP 7.3 extensions


<div class="notranslate">

| |  |  |  | | |
|-|-|-|-|-|-|
|40-snuffleupagus <br> 40-vld <br> apcu <br> bz2 <br> brotli <br> calendar <br> core <br> ctype <br> curl <br> date <br> exif <br>enchant <br> filter <br> ftp <br> gettext <br> gmp <br>gnupg <br> hash <br> iconv <br> interbase <br> luasandbox | libxml <br>mysqlnd <br>opcache <br> openssl <br> pcntl <br> pcre <br>pdo_pgsql <br> phar <br> readline <br> reflection <br> session <br> shmop <br> simplexml <br> sourceguardian <br> spl <br> sqlite3 <br>standard <br> snmp <br> stats <br> tokenizer | trader <br>xmlreader <br>bcmath <br>fileinfo <br> grpc <br>intl <br>lzf <br>nd_mysqli <br>pdf <br>pdo <br>posix <br>swoole <br>uploadprogress <br>xmlrpc <br>gd <br>http <br>ioncube_loader <br> mbstring | nd_pdo_mysql <br>pdo_dblib <br>pdo_sqlite <br>propro <br>soap <br>sysvmsg <br>uuid <br>xmlwriter <br>dbase <br>gender <br>igbinary <br>mcrypt <br>newrelic <br> pdo_firebird <br>pdo_sqlsrv <br>pspell <br>sockets <br>sysvsem <br>vips <br>xsl | dba <br>geoip <br>imagick <br>json <br>memcached <br>oauth <br>pdo_mysql <br>pgsql <br> raphf <br>sodium <br>sysvshm <br>yaml <br>dom <br>geos <br>imap <br>ldap <br>mongodb <br>oci8 <br>pdo_oci | phalcon3 <br>recode <br>sqlsrv <br> tidy <br>wddx <br>yaz <br>eio <br>gmagick <br>inotify <br>leveldb <br>mysqli <br>odbc <br>pdo_odbc <br>phalcon4 <br>redis <br>ssh2 <br>timezonedb <br>xdebug <br>zip <br> xml <br> zlib| 

</div>

:::tip Note
To use <span class="notranslate">`newrelic`</span> extension you should set your own <span class="notranslate">`New Relic License Key`</span> in your own <span class="notranslate">`/opt/alt/php7*/etc/php.ini`</span> file.
You can find more info about <span class="notranslate">New Relic License Key</span> in the <span class="notranslate">[New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key)</span>.
:::

#### PHP 7.4 extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br> bcmath <br> brotli <br> bz2 <br> calendar <br> core <br> ctype <br> curl <br> date <br> dba <br> dbase <br> dom <br> eio <br> enchant <br> exif <br> fileinfo <br> filter <br> ftp <br> gd <br> gender <br> geoip <br> geos | gettext <br> gmagick <br> gmp <br> gnupg <br> grpc <br> hash <br> http <br> iconv <br> igbinary <br> imagick <br> imap <br> inotify <br> intl <br> json <br> ldap <br> libxml <br> luasandbox <br> lzf <br> mbstring <br> memcached <br> mongodb | mysqli <br> mysqlnd <br> nd_mysqli <br> nd_pdo_mysql <br> newrelic <br> oauth <br> oci8 <br> odbc <br> opcache <br> openssl <br> pcntl <br> pcre <br> pdf <br> pdo <br> pdo_dblib <br> pdo_firebird <br> pdo_mysql <br> pdo_oci <br> pdo_odbc <br> pdo_pgsql <br> pdo_sqlite <br> pdo_sqlsrv | pgsql <br> phalcon4 <br> phar <br> posix <br> propro <br> pspell <br> raphf <br> readline <br> redis <br> reflection <br> session <br> shmop <br> simplexml <br> snmp <br> soap <br> sockets <br> sodium <br> spl <br> sqlite3 <br> sqlsrv <br> standard | stats <br> swoole <br> sysvmsg <br> sysvsem <br> sysvshm <br> tidy <br> timezonedb <br> tokenizer <br> trader <br> uploadprogress <br> uuid <br> vips <br> xdebug <br> xml <br> xmlreader <br> xmlrpc <br> xmlwriter <br> xsl <br> yaml <br> zip <br> zlib |
</div>


## Python Selector

:::tip Note
This documentation is for the new version of Python Selector. You can find documentation for the old Python Selector [here](/cloudlinux_os_components/#python-selector-old)
:::


### General information and requirements

<span class="notranslate">Python Selector</span> is a CloudLinux component that allows each user to easily deploy and manage Python applications via application server.

* [Requirements](/cloudlinux_os_components/#requirements-2)

#### Requirements

:::danger Important!
Do not downgrade LVE Manager to versions lower than 4.2.2 if you have already migrated Python applications because it will break migrated applications.
:::

* Python Selector supports the following Alt-Python versions:
  * <span class="notranslate">`alt-python27 2.7.16`</span>, supported by CloudLinux 6, CloudLinux 7
  * <span class="notranslate">`alt-python33 3.3.7`</span>, supported by CloudLinux 6, CloudLinux 7
  * <span class="notranslate">`alt-python34 3.4.9`</span>, supported by CloudLinux 6, CloudLinux 7
  * <span class="notranslate">`alt-python35 3.5.6`</span>, supported by CloudLinux 6, CloudLinux 7
  * <span class="notranslate">`alt-python36-3.6.8`</span>, supported by CloudLinux 6, CloudLinux 7
  * <span class="notranslate">`alt-python36-3.7.2`</span>, supported by CloudLinux 6, CloudLinux 7
* This feature is available for CloudLinux 7, CloudLinux 6 hybrid and CloudLinux 6.
* New Python Selector requires LVE Manager version 4.2 or later.
* It supports cPanel and DirectAdmin servers. On DirectAdmin only on Apache. Plesk will not be supported.
* Python Selector uses <span class="notranslate">`mod_passenger`</span> to host Python. For more details about <span class="notranslate">`mod_passenger`</span>, please read [documentation](https://www.phusionpassenger.com/).
* Python Selector works with EasyApache 3 (note EOL at 1st September 2019), EasyApache 4 and LiteSpeed Web Server. Or Apache on DirectAdmin. 


### Migration to the new Python Selector 

* [How to migrate an application to the new Python Selector](/cloudlinux_os_components/#how-to-migrate-an-application-to-the-new-python-selector)

The new Python Selector has a bunch of new features:

* the ability to set environment variables for the application
* the ability to set dependencies from the file requirements
* the ability to start and stop applications as in Node.js Selector
* the ability to add and edit custom configurations
* the ability to install modules from the custom configurations

All existing Python applications (created before the update of LVE Manager to version 5.0.1-1) will work the same as before. You do not need to migrate them unless you’d like to use new features. These applications we define as old applications.

:::warning Important!
There are some risks during the migration process and the migration can fail. To avoid such issues and make it possible to solve them if any, only user who created a particular application is allowed to initiate the migration process.
:::

You do not need to migrate the new applications that will be created after the update to the LVE Manager 5.0.1-1. All new features are available for them.

:::warning Important!
You cannot migrate back to the old application. If you face any issue during the migration, please [contact our support team](https://cloudlinux.zendesk.com/hc/requests/new).
:::

#### How to migrate an application to the new Python Selector

:::tip Note
Only user who created an application can migrate it.
:::

To migrate a Python application:
* Log in to your control panel.
* Open Python Selector user interface.
    ![](/images/Python_general.png)
* Choose an application to migrate and click ![](/images/Migrate-btn.png) in the <span class="notranslate">_Actions_</span> section. You will see the popup.
    ![](/images/Python-migration.png)
* Click <span class="notranslate">_Migrate_</span> in the popup.
* After successful migration, you will see the confirmation popup.

If you face any issue during the migration, please [contact our support team](https://cloudlinux.zendesk.com/hc/requests/new).


### Installation and update

New clients can install Python Selector using the [CloudLinux Installation Wizard](/lve_manager/#cloudlinux-installation-wizard).

* [cPanel](/cloudlinux_os_components/#cpanel-2)
* [DirectAdmin](/cloudlinux_os_components/#directadmin)

#### cPanel

To use Python Selector, it is required to install the following:
* alternative Python packages by running the following command:
  
    <div class="notranslate">

    ```
    yum groupinstall alt-python
    ```
    </div>
* LVE Manager, LVE Utils and Phusion Passenger to create isolated Python environments by running the following command:

    <div class="notranslate">

    ```
    yum install lvemanager lve-utils alt-python-virtualenv ea-apache24-mod-alt-passenger
    ```
    </div>
 
__For EasyApache 3:__

<div class="notranslate">

```
yum install lve-utils lvemanager alt-python-virtualenv alt-mod-passenger
```
</div>

* CageFS for better security. See [CageFS documentation for details](/cloudlinux_os_components/#cagefs).


#### DirectAdmin
 
To use Python Selector, it is required to install the following:

* alternative Python packages by running the following command:

    <div class="notranslate">

    ```
    yum groupinstall alt-python
    ```
    </div>
 
* LVE Manager, LVE Utils and Phusion Passenger to create isolated Python environments by running the following command:

    <div class="notranslate">

    ```
    yum install lve-utils lvemanager alt-python-virtualenv alt-mod-passenger
    ```
    </div>

* CageFS for better security. See [CageFS documentation for details](/cloudlinux_os_components/#cagefs).

:::tip Note
After installation, please make sure that you have unmarked appropriate checkboxes in LVE Manager Options tab to show Python App in the web-interface.
:::
 
:::tip Note
Adding Python module requires executing permissions to <span class="notranslate">`gcc/make`</span> binaries. Please enable compilers in Compiler Access section of WHM, then run:

<div class="notranslate">

```
cagefsctl --force-update
```
</div>
:::


* See also [Python Selector UI](/lve_manager/#python-selector-2).
* See also [Python Selector CLI](/command-line_tools/#python-selector).

### Deploying Trac using Python Selector

* [Trac with MySQL](/cloudlinux_os_components/#trac-with-mysql)
* [EasyApache 4](/cloudlinux_os_components/#easyapache-4)

1. In <span class="notranslate">**Setup Python App**</span> create an application. <span class="notranslate">Trac</span> project <span class="notranslate">WSGI</span> script will be located in <span class="notranslate">**App Directory**</span> (e.g. <span class="notranslate">`trac`</span>).

<span class="notranslate">App URI</span> – is a <span class="notranslate">URL</span> where web-interface is located (e.g. <span class="notranslate">Trac</span> – web-interface is located in <span class="notranslate">`YOUR_DOMAIN/trac`</span>).

<span class="notranslate">Trac</span> needs <span class="notranslate">Python</span> version from **2.5** to **3.0,** in the actual example version 2.7 is used.

2. When the App is created, add the following modules: <span class="notranslate">`Trac`, `Genshi`, `MySQL-python`</span>.

2.1. Alternatively, connect to the server via SSH and perform the following steps:

<div class="notranslate"> 

```
source ~/virtualenv/trac/2.7/bin/activate
```
</div>

then:

<div class="notranslate"> 

```
~/virtualenv/trac/2.7/bin/easy_install Trac mysql-python (using easy_install)
```
</div>

or

<div class="notranslate">

```
~/virtualenv/trac/2.7/bin/pip install trac mysql-python
```
</div> 

(using <span class="notranslate">`pip`</span>).

3. In cPanel create MySQL database and a user. Add user to database.

![](/images/Python_trac1.png)

In this example DB <span class="notranslate">`tractest_trac`</span> and user <span class="notranslate">`tractest_trac`</span> were created.

4. Connect to the server via SSH using your cPanel account.

Create <span class="notranslate">Trac</span> project:

 <div class="notranslate">
 
 ```
 ~/virtualenv/trac/2.7/bin/trac-admin
 ~/trac_project initenv
 ```
 </div>

For the <span class="notranslate">`Database connection string`</span> parameter enter the following: <span class="notranslate">`mysql://user:password@localhost/database_name`</span> – here the data for connecting MySQL database are specified.

::: tip Note
In case of `... The charset and collation of database are 'latin1' and 'latin1_swedish_ci' error the database must be created with one of (('utf8', 'utf8_bin'), ('utf8mb4', 'utf8mb4_bin')) ...`  while creating the project, you should change database encoding.
:::

To change encoding, in cPanel run <span class="notranslate">phpMyAdmin</span>, choose <span class="notranslate">`DB`</span>, go to <span class="notranslate">`Operations`</span>, choose the necessary encoding in <span class="notranslate">`Collation`</span> section and click <span class="notranslate">`Go`</span>.

![](/images/trac2.jpg)

After that you have to repeat the procedure of creating a project. When done, the <span class="notranslate">`Trac`</span> project must appear: <span class="notranslate">`~/trac_project`</span>

5. To create project frontend run the following:

<div class="notranslate">

```
~/virtualenv/trac/2.7/bin/trac-admin ~/track_project deploy ~/trac
```
</div>

<span class="notranslate">`~/track_project`</span> — is the path to the project,
<span class="notranslate">`~/trac`</span> — is the path, that was specified while setting <span class="notranslate">`App Directory`</span>.

Create topic directory by default:

<div class="notranslate">

```
cd ~/public_html/trac
mkdir chrome 
cp -R ~/trac/htdocs/ ~/public_html/trac/chrome/
```
</div>

All project static files are located in this directory; the changes can be added here as well.

6. To add path to <span class="notranslate">WSGI</span> file in the created application:

Go back to <span class="notranslate">_cPanel Setup Python App_</span>, change <span class="notranslate">`WSGI file location`</span> for your application to <span class="notranslate">`cgi-bin/trac.wsgi`</span>, click <span class="notranslate">`Update`</span> to apply changes and then click <span class="notranslate">`Restart`</span>.

Your existing application now must look like the following:

![](/images/Python_trac2.png)

7. Adding authorization:

In <span class="notranslate">`~/public_html/trac/.htaccess`</span> after <span class="notranslate">`CLOUDLINUX PASSENGER CONFIGURATION`</span> section add the following lines:

<div class="notranslate">

```
AuthType Basic
AuthName "trac"
AuthUserFile /home/tractest/trac/passwd
Require valid-user
```
</div>

8. Add new user and create password file <span class="notranslate">`/usr/local/apache/bin/htpasswd`</span> with <span class="notranslate">`~/trac/passwd`</span> admin.

Enter password.

<div class="notranslate">

```
~/virtualenv/trac/2.7/bin/trac-admin  ~/track_project permission add admin TRAC_ADMIN
```
</div>

Add admin user to <span class="notranslate">`TRAC_ADMIN`</span> group.

Here the path <span class="notranslate">`trac`</span> directory is equal to <span class="notranslate">`App Directory`</span> in your project.

Now <span class="notranslate">`Trac`</span> is available via <span class="notranslate">`YOUR_DOMAIN/trac`</span>.


#### Trac with MySQL

To use <span class="notranslate">Trac</span> with MySQL database you should install <span class="notranslate"> alt-python27-devel </span> package.

To install run:
<div class="notranslate">

```
yum install alt-python27-devel --enablerepo=cloudlinux-updates-testing 
```
</div>

#### EasyApache 4

CloudLinux has <span class="notranslate"> Python Selector</span>, which allows creating applications with <span class="notranslate"> ea-apache24-mod-alt-passenger</span>. However, it does not allow using <span class="notranslate"> cPanel application manager</span>.

It is not correct to install both of those packages on the server because they contain the same <span class="notranslate"> passenger</span> module for Apache web server.

The new <span class="notranslate">ea-ruby24-mod_passenger</span> is available for download from our <span class="notranslate"> updates-testing (beta) </span> repository which allows you to run applications via <span class="notranslate"> cPanel application manager</span> and <span class="notranslate">CloudLinux Python Selector</span>.

To install run:
<div class="notranslate">

```
# yum install lvemanager alt-python-virtualenv
# yum install ea-ruby24-mod_passenger --enablerepo=cl-ea4-testing
```
</div>

## Ruby Selector

### General information and requirements

We have the ability to deploy <span class="notranslate">Ruby</span> applications via an application server. <span class="notranslate">Ruby Selector</span> uses <span class="notranslate">`mod_passenger`</span> to host <span class="notranslate"> Ruby</span> applications.

Ruby Selector works only on cPanel/WHM servers.

You can find a list of supported <span class="notranslate">`alt-ruby`</span> versions using the following commands.

<div class="notranslate">

```
yum grouplist | grep alt-ruby
```
</div>


### Installation and update

::: tip Note
The instructions below are suitable only for EasyApache 3 and EasyApache 4. You should follow [this instruction](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:enable_ruby_python_selector) if you use LiteSpeed.
:::

To use <span class="notranslate">Ruby Selector</span> install alternative <span class="notranslate">Ruby</span> packages:

<div class="notranslate">

```
yum groupinstall alt-ruby 
```
</div>

::: tip Note
After installation, please make sure that you have unmarked appropriate checkboxes in <span class="notranslate"> VE Manager Options</span> tab to show <span class="notranslate">Ruby App</span> in web-interface. Find the instructions on the [link](/cloudlinux_os_components/#hide-ruby-selector-icon).
:::

::: tip Note
Adding Ruby modules requires executing permissions to <span class="notranslate">`gcc/make`</span> binaries. Please enable compilers in Compiler Access section of WHM, then run: <span class="notranslate">`cagefsctl --force-update`</span>
:::

### Configuration and using

* [End user access](/lve_manager/#ruby-selector-client-plugin)
* [Hide Ruby Selector icon](/cloudlinux_os_components/#hide-ruby-selector-icon)
* [Deploying Redmine using Ruby Selector](/cloudlinux_os_components/#deploying-redmine-using-ruby-selector)
* [EasyApache 4](/cloudlinux_os_components/#easyapache-4-2)

#### End user access

You can find an example of Ruby application setup [here](https://cloudlinux.zendesk.com/hc/en-us/articles/115004495049-How-to-run-Redmine-with-Ruby-Selector)

:::tip Note
See also Ruby Selector [CLI](/command-line_tools/#ruby-selector) section.
:::

#### Hide Ruby Selector icon

It is possible to hide or show <span class="notranslate">Ruby Selector</span> icon by marking or unmarking proper checkboxes in <span class="notranslate"> LVE Manager Options</span> tab.

![](/images/CL-hide-ruby.png)

The same result can be accomplished in CLI by running:

<div class="notranslate">

```
cloudlinux-config set --json --data '{"options":{"uiSettings":{"hideRubyApp":false}}}'
```
</div>
 
:::tip Note
If you are using cPanel/WHM, you can also configure hide/show <span class="notranslate">CloudLinux Ruby Selectors</span> in <span class="notranslate">WHM | Feature Manager</span>.
For that, you’d need to first uncheck <span class="notranslate">`Hide Ruby App in web-interface`</span> in the <span class="notranslate">LVE Manager</span>. This will make the menu appear for all accounts. After that, you are free to disable this app in <span class="notranslate">WHM | Feature Manager</span> for the required feature lists.
:::

#### Deploying Redmine using Ruby Selector

::: tip Note
You can find <span class="notranslate"> Redmine </span> version 2.6.0 and newer deployment guide [here](https://cloudlinux.zendesk.com/hc/en-us/articles/115004495049-How-to-run-Redmine-with-Ruby-Selector)
:::

#### EasyApache 4

Starting with cPanel/WHM version 66 provides <span class="notranslate">ea-ruby24-mod_passenger</span> (more information on the [link](https://documentation.cpanel.net/display/66Docs/Application+Manager)), this allows creating <span class="notranslate"> Ruby </span> applications with cPanel application manager.

CloudLinux OS features its own <span class="notranslate"> Python and  Ruby Selectors </span> , which allows creating applications with <span class="notranslate"> ea-apache24-mod-alt-passenger </span>. However, it conflicts with <span class="notranslate"> cPanel application manager </span> .
Thus, avoid installing <span class="notranslate"> passenger </span> packages from both sources on the same server.

The new <span class="notranslate"> ea-ruby24-mod_passenger </span> is available for download from our <span class="notranslate"> updates-testing (beta) </span> repository which allows you to run applications via <span class="notranslate"> cPanel application manager </span> and <span class="notranslate"> Ruby Selector</span>.

To install, run:
<div class="notranslate">

```
# yum install lvemanager alt-python-virtualenv
# yum install ea-ruby24-mod_passenger --enablerepo=cl-ea4-testing
```
</div>

See also [Ruby Selector CLI tools](/command-line_tools/#ruby-selector).


## Node.js Selector
### General information and requirements

* [Requirements](/cloudlinux_os_components/#requirements-3)

<span class="notranslate"> Node.js Selector </span>  is a CloudLinux component that allows each user to easily create Node.js applications, choose Node.js version and other parameters for applications based on their needs.

#### **Requirements**

* <span class="notranslate"> Node.js Selector </span>  supports Node.js versions 6.x, 8.x, 9.x, 10.x, 11.x, 12.x and 14.x.
* <span class="notranslate"> Node.js Selector requires LVE Manager 4.0 </span> or later.
* It supports cPanel and DirectAdmin servers as well as non-panel installations (Plesk is not supported as it already has Node.js support.) For more details, please go to Plesk & Node.js documentation [here](https://www.plesk.com/blog/product-technology/node-js-plesk-onyx/) and [here](https://docs.plesk.com/en-US/onyx/administrator-guide/website-management/nodejs-support.76652/) .
* For more details about <span class="notranslate"> mod_passenger </span>  and Node.js, please read documentation  [here](https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/)  and  [here](https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/ownserver/apache/oss/el7/deploy_app.html) .
* <span class="notranslate"> Node.js Selector </span> supports both EasyApache 3 and EasyApache 4.

### Installation and update

:::tip Note
Node.js Selector support is added to LiteSpeed Web Server starting from the 5.3RC1 release. See details [here](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:node.js_selector).
:::

**cPanel**

To use <span class="notranslate">Node.js Selector</span>, install <span class="notranslate">Node.js</span> packages by running the following command:
<div class="notranslate">

```
yum groupinstall alt-nodejs
```
</div>
Also, please install <span class="notranslate"> LVE Manager, LVE Utils and Fusion Passenger </span> by running the following command:
<div class="notranslate">

```
yum install lvemanager lve-utils ea-apache24-mod-alt-passenger
```
</div>
For EasyApache 3:
<div class="notranslate">

```
yum install lvemanager lve-utils alt-mod-passenger
```
</div>
And we recommend to install CageFS for better security (not mandatory) by running the following command:
<div class="notranslate">

```
yum install cagefs
```
</div>

::: tip Note
If during Node.js Selector usage on cPanel servers you get "ENOMEM npm ERR! errno-12" error, try to increase Memory limit in <span class="notranslate"> cPanel WHM → Server Configuration → Tweak Settings → System → Max cPanel process memory, </span> then restart cPanel service with the following command to apply changes.
:::


CloudLinux 7:
<div class="notranslate">

```
systemctl restart cpanel.service
```
</div>

CloudLinux 6:
<div class="notranslate">
```
service cpanel restart
```
</div>

**DirectAdmin**

To use <span class="notranslate"> Node.js Selector, please install Node.js </span> packages by running the following command:
<div class="notranslate">

```
yum groupinstall alt-nodejs6 alt-nodejs8 alt-nodejs9
```
</div>
Also, please install <span class="notranslate"> LVE Manager, LVE Utils and Fusion Passenger </span> by running the following command:
<div class="notranslate">

```
yum install lvemanager lve-utils alt-mod-passenger
```
</div>
And we recommend to install CageFS for better security (not mandatory) by running the following command:
<div class="notranslate">

```
yum install cagefs
```
</div>



### Node.js deployment


* The first approach - remote usage of Node.js Interpreters of different versions
* The second approach - remote usage of the cloudlinux-selector utility.

* [Remote usage of Node.js interpreters](/cloudlinux_os_components/#remote-usage-of-node-js-interpreters)
* [Remote usage of the cloudlinux-selector utility](/cloudlinux_os_components/#remote-usage-of-the-cloudlinux-selector-utility)

#### Remote usage of Node.js interpreters

1. Create a Node.js project in <span class="notranslate"> IntelliJ IDEA/WebStorm </span> . You can download [this archive](https://docs.cloudlinux.com/nodejs_example.zip) and use it as a basis.
2. Install <span class="notranslate"> alt-nodejs </span> packages on the server in use. See [installation instructions](/cloudlinux_os_components/#installation-and-update-7).
3. Create an application on the server. You can do it by three ways:
  * Via UI of the Node.js plugin.
  * Using the following command to create an application:

<div class="notranslate">

```
cloudlinux-selector create --interprete=nodejs --json --app-root=<USER_NAME> --app-uri=<APP_NAME> --app-mode=develompent --version=<VERSION> --domain=<DOMAIN>
```
</div>  

::: tip Note
In the <span class="notranslate"> IntelliJ IDEA </span> you can create and run any remote script <span class="notranslate"> (Preferences — Remote SSH External Tools — Add).</span>
:::

![](/images/createapp_zoom70.png)

  * Choose a location of the application on the server and synchronize the files with the <span class="notranslate"> IntelliJ IDEA </span> project.
4. Set up <span class="notranslate"> Run/Debug Configurations </span> in the project created.

![](/images/setconfiguration_zoom70.png)

  * Specify a path to the remote Node.js interpreter. To be able to specify the remote interpreter, you should install the <span class="notranslate"> _Node.js Remote Interpreter_ </span> plugin first. Please find more information [here](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html) , using server access credentials for a user <span class="notranslate"> _(Main menu → Run → Edit configurations...)_ </span> .
  * Specify initial _JavaScript file_ that will be run with the <span class="notranslate"> _node_ </span> command (it is the _app.js_ file from the archive).
  * Specify <span class="notranslate"> _Path Mappings_ </span> between a local and a remote project <span class="notranslate"> _(Preferences → Deployments → Add)_ </span> . If you have created your application with the <span class="notranslate"> _cloudlinux-selector utility_ </span> or via plugin UI the <span class="notranslate"> _Path Mappings_ </span> should be as follows:

<div class="notranslate">

```
/home/<USER_NAME>/<APP_NAME>
```
</div>

5. Synchronize the project directories on the local and the remote machine as per <span class="notranslate"> _Path Mappings_ </span> specified.
6. Deploy the modules on the remote and the local machine with the <span class="notranslate"> **_npm install_** </span> command (if there are dependent modules). In the UI you can click the <span class="notranslate"> _Run NPM Install_ </span> button.
7. Run Node.js application with the configuration set at the 4th step <span class="notranslate"> _(Main menu → Run → Run… → Select configuration)_ </span> .

![](/images/runapp_zoom60.png)

8. If you are using the application from the archive attached, you can see the running application on port 3003 — <span class="notranslate"> _http://DOMAIN:3003_ . </span>

::: tip Note
The port should be available to a server user.
:::

![](/images/runningappdomain_zoom70.png)

The following information should be displayed on this page:
* A version of the running Node.js interpreter;
* Current environment variables;
* The current time.

So that, you can be sure that deployed modules are used properly.

If you’d like to use a different version of Node.js to run an application, change a path to the interpreter in the configuration settings of the running.  
To apply all changes to the project, synchronize all changes with the server and restart the running application.

9. To debug a script, set breakpoints in the code and run the configuration via Main Menu <span class="notranslate"> _(Main menu → Run → Debug… → Select configuration)_ </span> .

Useful links:
* <span class="notranslate"> IntelliJ IDEA </span> : [https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html)
* Plugin <span class="notranslate"> _Node.js Remote Interpreter_ </span> : [https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter](https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter)
* <span class="notranslate"> WebStorm </span> : [https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html)

::: tip Note
It is not required to install <span class="notranslate"> _Passenger_ </span> while working in <span class="notranslate"> IDE </span> if you are using this approach.
:::

#### Remote usage of the cloudlinux-selector utility


1. Create an application via UI or with the command as described in the Remote Usage of Node.js Interpreters approach, step 3 (a,b).
2. Set up project mapping on the local machine with the created remote application <span class="notranslate"> _/home/<USER_NAME>/<APP_NAME> (Preferences → Deployments → Add)_ </span>.
3. Set up the remote commands of <span class="notranslate"> cloudlinux-selector _(Preferences → Remote SSH External Tools → Add)_ </span> for the following actions:
  * Restart application;
  * Install packages;
  * Run script;
  * Change Node.js version for the application.
You can see the running app at <span class="notranslate"> http://DOMAIN/APPLICATION_URL </span>
To apply all changes, restart the application.

* See also [Node.js Selector CLI tools](/command-line_tools/#node-js-selector).
* See also [Node.js Selector UI](/lve_manager/#node-js-selector-2).

### Troubleshooting

* [Debugging errors](/cloudlinux_os_components/#debugging-errors)

#### Debugging errors

Since <span class="notranslate"> alt-mod-passenger-5.3.7-2,</span> directives such as PassengerFriendlyErrorPages and PassengerAppEnv are available for use from htaccess file. This allows end users to see errors from their application during the development process. For example, if you add one of the following lines to the htaccess file on the application page, you will see the information (if there was an error) similar to one on the picture.
<div class="notranslate">

```
PassengerAppEnv development
```
</div>
or
<div class="notranslate">

```
PassengerFriendlyErrorPages on
```
</div>

![](/images/errorapplog.png)

This is a much more convenient approach to developing an application and debugging errors. On the other hand, if these directives are turned off you will see:

![](/images/errorapplogsorry.png)

In this case, there is no useful information for debugging errors and this is suitable for production mode. More information about [PassengerFriendlyErrorPages](https://www.phusionpassenger.com/library/config/apache/reference/#passengerfriendlyerrorpages) and [PassengerAppEnv](https://www.phusionpassenger.com/library/config/apache/reference/#passengerappenv).


## Apache mod_lsapi PRO
### General information and requirements

mod_lsapi PRO is an [Apache HTTP Server](https://httpd.apache.org/) module based on [LiteSpeed Technologies API](https://www.litespeedtech.com/open-source/litespeed-sapi) . It serves to execute PHP scripts on a web-server by analogy with other modules like mod_suphp, php-fpm, mod_php. However, mod_lsapi PRO usage offers excellent PHP performance, low memory footprint coupled with great security and support for opcode caching.

**How does it work?**

1. Apache passes handling for PHP request to mod_lsapi PRO;
2. mod_lsapi PRO use liblsapi to transfer request to lsphp parent process;
3. lsphp is forking child process which executes the request and returns data to mod_lsapi PRO;
![](/images/mod_lsapidiagrammnew.jpg)  
_mod_lsapi PRO integrates with Apache, allows to handle concurrent requests and manages the lsphp processes_

* If there are no requests for lsapi_backend_pgrp_max_idle seconds, lsphp parent process will be  terminated;
* If there are no lsphp child processes available when a new request comes, the new lsphp child process will be created;
* lsphp childs process concurrent requests simultaneously;
* The maximum number of simultaneously running lsphp child processes can be set by the lsapi_backend_children directive.

**What is lsphp?**

lsphp - PHP + LSAPI. What is PHP LSAPI? [LiteSpeed Server Application Programming Interface](https://www.litespeedtech.com/open-source/litespeed-sapi/php) (LSAPI) is designed specifically for seamless, optimized communication between LiteSpeed Web Server and third-party web applications. Now with mod_lsapi PRO this protocol is available for Apache 2.2/2.4.

Using mod_lsapi PRO, we have seen the higher performance than Apache with mod_php, easier installation than php-fpm and easier integration with any control panel. mod_lsapi PRO means faster and more stable dynamic web pages.

**Requirements**

Currently, the mod_lsapi is not compatible with:

* Apache mod_ruid2 - should be disabled;
* Apache mod_itk - should be disabled;
* PHP-FPM - should be disabled because PHP-FPM is also a PHP Handler just as mod_lsapi.

**Optional requirements**

* Configured LVE containers for end-users ( **recommended - higher security level** );
* Installed and configured mod_hostinglimitsfor Apache ( **recommended - higher security level** );
* Installed mod_suexec for Apache and configured [SuExecUserGroup](https://httpd.apache.org/docs/2.4/mod/mod_suexec.html#page-header) directive for each virtual host ( **recommended - higher security level** );
* Enabled CageFS for end-users ( **recommended - higher security level** );
* PHP Selector with alt-php - an easy way to select different PHP versions for each end-user provided by CloudLinux;
* ea-php - alternative to alt-php provided by cPanel (for cPanel only).

### Installation

mod_lsapi PRO can be installed through YUM package manager, however, the installation process varies depending on the control panel.

Select the control panel you are using:
* [cPanel](/cloudlinux_os_components/#installing-on-cpanel-servers-with-easyapache-4)
* [Plesk](/cloudlinux_os_components/#installing-on-plesk-servers)
* [DirectAdmin](/cloudlinux_os_components/#installing-on-directadmin-servers)
* [No control panel](/cloudlinux_os_components/#installing-on-servers-with-no-control-panel)


:::tip Note
See also [mod_lsapi PRO](/command-line_tools/#apache-mod-lsapi-pro).
:::

#### Installing on cPanel servers with EasyApache 4

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install ea-apache24-mod_lsapi
```
</div>
After installing mod_lsapi PRO packages run the next command to setup mod_lsapi to cPanel:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that the mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now the lsapi handler is available for managing through cPanel MultiPHP Manager.

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/command-line_tools/#apache-mod-lsapi-pro).


#### Installing on Plesk servers

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install mod_lsapi
```
</div>
Once completed, run the command to setup mod_lsapi PRO and register LSPHP handlers to Plesk Panel:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>

Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>

Now LSPHPXY alt-php PHP handlers are available for managing through Plesk PHP Settings.

![](/images/plesk-php-settings.png)

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/command-line_tools/#apache-mod-lsapi-pro).


#### Installing on DirectAdmin servers

Installation process is done with custombuild script:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_mode lsphp
$ ./build php n
$ ./build apache
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now all domains under php1_mode are using lsphp handler and no further actions are required to enable mod_lsapi PRO on DirectAdmin.

#### Installing on servers with no control panel

Install mod_lsapi PRO and related packages through YUM package manager as follows:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install mod_lsapi
```
</div>
Once completed, run a command to setup mod_lsapi PRO:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd restart
```
</div>

If you are using an alternative Apache - [httpd24](https://www.cloudlinux.com/cloudlinux-os-blog/entry/httpd24-updated-for-cloudlinux-6) , then install mod_lsapi as follows:

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ yum install httpd24-mod_lsapi
```
</div>
Once completed, run a command to setup mod_lsapi PRO:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --setup
```
</div>
Now, when the module is installed, restart Apache to ensure that mod_lsapi PRO is enabled:
<div class="notranslate">

```
$ service httpd24 restart
```
</div>

For more details about swith_mod_lsapi, please visit [switch_mod_lsapi tool](/command-line_tools/#apache-mod-lsapi-pro).


### Uninstalling


Uninstall mod_lsapi PRO is performed depending on your control panel.

Select the control panel you are using:
* [cPanel](/cloudlinux_os_components/#uninstall-procedure-for-cpanel-servers-with-easyapache-4)
* [Plesk](/cloudlinux_os_components/#uninstall-procedure-for-plesk-servers)
* [DirectAdmin](/cloudlinux_os_components/#uninstall-procedure-for-directadmin-servers)
* [No control panel](/cloudlinux_os_components/#uninstall-procedure-for-servers-with-no-control-panel)


#### Uninstall procedure for cPanel servers with EasyApache 4

To remove lsapi handler from cPanel MultiPHP Manager and uninstall mod_lsapi PRO, run a command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel ea-apache24-mod_lsapi
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now mod_lsapi PRO is fully uninstalled.


#### Uninstall procedure for Plesk servers

To unregister LSPHP handlers and uninstall mod_lsapi PRO, run the command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel mod_lsapi
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now LSPHPXY alt-php PHP handlers and mod_lsapi PRO are fully uninstalled.


#### Uninstall procedure for DirectAdmin servers

Uninstall is done with custombuild script:
<div class="notranslate">

```
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set php1_release [any other php mode]
$ ./build php n
$ ./build apache
```
</div>
The following PHP modes are available for DirectAdmin:

* mod_php
* fastcgi
* php-fpm
* suphp

Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd restart
```
</div>
Now all domains under php1_mode are using the chosen handler and mod_lsapi PRO is fully uninstalled.

#### Uninstall procedure for servers with no control panel

To uninstall mod_lsapi PRO, run the command:
<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel mod_lsapi
$ rm [path to mod_lsapi.conf]
```
</div>
Restart Apache to restore the standard PHP handler:
<div class="notranslate">

```
$ service httpd restart
```
</div>

If you are using an alternative Apache: - [httpd24](https://www.cloudlinux.com/cloudlinux-os-blog/entry/httpd24-updated-for-cloudlinux-6), then uninstall mod_lsapi PRO as follows:

<div class="notranslate">

```
$ /usr/bin/switch_mod_lsapi --uninstall
```
</div>
Then remove packages with YUM package manager:
<div class="notranslate">

```
$ yum erase liblsapi liblsapi-devel httpd24-mod_lsapi
$ rm [path to mod_lsapi.conf]
```
</div>
Restart Apache afterwards:
<div class="notranslate">

```
$ service httpd24 restart
```
</div>
Now mod_lsapi PRO is fully uninstalled.


### Configuration

* [Configuration references](/cloudlinux_os_components/#configuration-references)

In order to get mod_lsapi PRO work properly, you'll need to configure Apache. To do this, we use a separate _lsapi.conf_ file.

First of all, for the mod_lsapi PRO work, you need to ensure that the module is loaded. In your lsapi.conf you need to make sure the [LoadModule](http://httpd.apache.org/docs/current/mod/mod_so.html#loadmodule) directive has not been commented out. A correctly configured directive may look like this:
<div class="notranslate">

```
LoadModule lsapi_module modules/mod_lsapi.so
```
</div>

In order to enable the module to process requests, you need to add the lsapi_engine directive to your _lsapi.conf_ file as follows:
<div class="notranslate">

```
lsapi_engine On
```
</div>

The mod_lsapi PRO handler can be enabled using the [AddType](https://httpd.apache.org/docs/2.4/mod/mod_mime.html#addtype) directive. The AddType directive tells Apache that a given filename extension should be handled by mod_lsapi PRO. Apache will assume that and will attempt to execute it when that particular resource is requested by a client.
<div class="notranslate">

```
AddType application/x-httpd-lsphp .php
```
</div>

If no handler is explicitly set for a request, the specified content type will be used as the handler name, therefore, please disable php.conf or any other PHP handler for using mod_lsapi PRO. In this example application/x-httpd-lsphp is a default handler by which mod_lsapi PRO process requests with lsphp binary from _/usr/local/bin/_ directory.

The final lsapi.conf configuration might look like this:
<div class="notranslate">

```
LoadModule lsapi_module modules/mod_lsapi.so


<IfModule lsapi_module>      
	lsapi_engine On      
	AddType application/x-httpd-lsphp .php      
	lsapi_backend_connect_timeout 100000
	lsapi_backend_connect_tries 10
	lsapi_backend_children 20
	lsapi_backend_pgrp_max_idle 30
	lsapi_backend_max_process_time 300
	lsapi_debug Off
</IfModule>
```
</div>

In order to mod_lsapi PRO work lsapi.conf should be loaded to Apache through [Include](https://httpd.apache.org/docs/2.4/mod/core.html#include) directive.

For more detailed description of the module directives please visit [Configuration reference](/cloudlinux_os_components/#configuration-references).  
For installation guide mod_lsapi PRO please visit [Installation](/cloudlinux_os_components/#installation-3).

#### Configuration references


[mod_lsapi customization](/cloudlinux_os_components/#mod-lsapi-customization):
* [lsapi_engine](/cloudlinux_os_components/#lsapi-engine)  
* [lsapi_socket_path](/cloudlinux_os_components/#lsapi-socket-path)  
* [lsapi_poll_timeout](/cloudlinux_os_components/#lsapi-poll-timeout)  
* [lsapi_per_user](/cloudlinux_os_components/#lsapi-per-user)  
* [lsapi_output_buffering](/cloudlinux_os_components/#lsapi-output-buffering)  
* [lsapi_disable_reject_mode](/cloudlinux_os_components/#lsapi-disable-reject-mode)  
* [lsapi_terminate_backends_on_exit](/cloudlinux_os_components/#lsapi-terminate-backends-on-exit)  
* [lsapi_avoid_zombies](/cloudlinux_os_components/#lsapi-avoid-zombies)  
* [lsapi_use_req_hostname](/cloudlinux_os_components/#lsapi-use-req-hostname)  
* [lsapi_debug](/cloudlinux_os_components/#lsapi-debug)

[Tuning LSPHP backend](/cloudlinux_os_components/#tuning-lsphp-backend):
* [lsapi_set_env](/cloudlinux_os_components/#lsapi-set-env)
* [lsapi_set_env_path](/cloudlinux_os_components/#lsapi-set-env-path)
* [lsapi_backend_children](/cloudlinux_os_components/#lsapi-backend-children)
* [lsapi_backend_connect_tries](/cloudlinux_os_components/#lsapi-backend-connect-tries)
* [lsapi_backend_connect_timeout](/cloudlinux_os_components/#lsapi-backend-connect-timeout)
* [lsapi_backend_max_process_time](/cloudlinux_os_components/#lsapi-backend-max-process-time)
* [lsapi_backend_pgrp_max_idle](/cloudlinux_os_components/#lsapi-backend-pgrp-max-idle)
* [lsapi_backend_use_own_log](/cloudlinux_os_components/#lsapi-backend-use-own-log)
* [lsapi_backend_common_own_log](/cloudlinux_os_components/#lsapi-backend-common-own-log)
* [lsapi_backend_coredump](/cloudlinux_os_components/#lsapi-backend-coredump)
* [lsapi_backend_accept_notify](/cloudlinux_os_components/#lsapi-backend-accept-notify)
* [lsapi_backend_pgrp_max_reqs](/cloudlinux_os_components/#lsapi-backend-pgrp-max-reqs)
* [lsapi_backend_pgrp_max_crashes](/cloudlinux_os_components/#lsapi-backend-pgrp-max-crashes)
 
[Connection pool mode](/cloudlinux_os_components/#connection-pool-mode):
* [lsapi_with_connection_pool](/cloudlinux_os_components/#lsapi-with-connection-pool)
* [lsapi_backend_max_idle](/cloudlinux_os_components/#lsapi-backend-max-idle)
* [lsapi_backend_max_reqs](/cloudlinux_os_components/#lsapi-backend-max-reqs)

[CRIU support (CloudLinux 7 only)](/cloudlinux_os_components/#criu-support-cloudlinux7-only):
* [lsapi_criu](/cloudlinux_os_components/#lsapi-criu)
* [lsapi_criu_socket_path](/cloudlinux_os_components/#lsapi-criu-socket-path)
* [lsapi_criu_imgs_dir_path](/cloudlinux_os_components/#lsapi-criu-imgs-dir-path)
* [lsapi_backend_initial_start](/cloudlinux_os_components/#lsapi-backend-initial-start)
* [lsapi_criu_use_shm](/cloudlinux_os_components/#lsapi-criu-use-shm)
* [lsapi_backend_semtimedwait](/cloudlinux_os_components/#lsapi-backend-semtimedwait)
* [lsapi_reset_criu_on_apache_restart](/cloudlinux_os_components/#lsapi-reset-criu-on-apache-restart)
* [lsapi_criu_debug](/cloudlinux_os_components/#lsapi-criu-debug)

[PHP configuration management](/cloudlinux_os_components/#php-configuration-management):
* [lsapi_process_phpini](/cloudlinux_os_components/#lsapi-process-phpini)
* [lsapi_phpini](/cloudlinux_os_components/#lsapi-phpini)
* [lsapi_phprc](/cloudlinux_os_components/#lsapi-phprc)
* [lsapi_tmpdir](/cloudlinux_os_components/#lsapi-tmpdir)
* [lsapi_enable_user_ini](/cloudlinux_os_components/#lsapi-enable-user-ini)
* [lsapi_user_ini_homedir](/cloudlinux_os_components/#lsapi-user-ini-homedir)
* [lsapi_keep_http200](/cloudlinux_os_components/#lsapi-keep-http200)
* [lsapi_mod_php_behaviour](/cloudlinux_os_components/#lsapi-mod-php-behaviour)
* [php_value, php_admin_value, php_flag, php_admin_flag](/cloudlinux_os_components/#php-valuephp-admin-valuephp-flagphp-admin-flag)

[Security](/cloudlinux_os_components/#security):
* [lsapi_use_suexec](/cloudlinux_os_components/#lsapi-use-suexec)
* [lsapi_user_group](/cloudlinux_os_components/#lsapi-user-group)
* [lsapi_uid_gid](/cloudlinux_os_components/#lsapi-uid-gid)
* [lsapi_use_default_uid](/cloudlinux_os_components/#lsapi-use-default-uid)
* [lsapi_target_perm](/cloudlinux_os_components/#lsapi-target-perm)
* [lsapi_paranoid](/cloudlinux_os_components/#lsapi-paranoid)
* [lsapi_check_document_root](/cloudlinux_os_components/#lsapi-check-document-root)
* [lsapi_disable_forced_pwd_var](/cloudlinux_os_components/#lsapi-disable-forced-pwd-var)
* [lsapi_max_resend_buffer](/cloudlinux_os_components/#lsapi-max-resend-buffer)

#### **mod_lsapi customization**

#### **lsapi_engine**

**Syntax** : lsapi_engine on/off  
**Default** : lsapi_engine off  
**Context** : httpd.conf, htaccess  

**Description** :  
Switching mod_lsapi handler on or off.

---

#### **lsapi_socket_path**

**Syntax** : lsapi_socket_path [path]
**Default** : lsapi_socket_path `/var/run/mod_lsapi`  
**Context** : httpd.conf  

**Description:**  
Path to backend lsphp sockets. By default `/var/run/mod_lsapi`

---

#### **lsapi_poll_timeout**

**Syntax** : lsapi_poll_timeout [number]  
**Default** : lsapi_poll_timeout 300  
**Context** : httpd.conf, htaccess  

**Description** :  
Time to wait for response from the lsphp daemon, in seconds. 0 stands for infinity. For preventing long running processes which can use EP (limit number of entry processes). Default value is 300. Should be more or equal to 0. In the case of wrong format, the default value will be used.

---

#### **lsapi_per_user**

**Syntax** : lsapi_per_user On/Off  
**Default** : lsapi_per_user Off  
**Context** : httpd.conf  

**Description** :  
Invoke master lsPHP process not per VirtualHost but per account.
When On, invoke backend not per VirtualHost but per account.
Default value is Off.
It is possible, for example, to set it to On in global config file and to Off in config files of some particular Virtual Hosts.
Then these Virtual Hosts will have a dedicated backend process, while others will have backend processes shared on account basis.

---

#### **lsapi_output_buffering**

**Syntax** : lsapi_output_buffering On/Off  
**Default** : lsapi_output_buffering On  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
Enable or disable output buffering on Apache level. Default value is On.

---

#### **lsapi_disable_reject_mode**

**Syntax** : lsapi_disable_reject_mode On/Off  
**Default** : lsapi_disable_reject_mode Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
If a new HTTP request is coming to LSPHP daemon when all LSPHP workers are still busy, it can process this situation in two different ways. In REJECT mode LSPHP daemon will reject such request immediately. Otherwise, in legacy mode, LSPHP daemon will put this request into infinite queue, until one or more LSPHP daemon becomes free. When HTTP request is rejected in REJECT mode, mod_lsapi will write into Apache error_log the following message: Connect to backend rejected, and the client will receive 507 HTTP response.
By default LSPHP daemon in CloudLinux uses REJECT mode. It can be switched off with this option.

---

#### **lsapi_terminate_backends_on_exit**

**Syntax** : lsapi_terminate_backends_on_exit On/Off  
**Default** : lsapi_terminate_backends_on_exit On  
**Context** : httpd.conf  

**Description** :  
httpd.conf, On - stop lsphp services on apache restart, Off - leave live started lsphp services on apache restart (for php+opcache). The lsphp will not restart, even if Apache gets restarted.

---

#### **lsapi_avoid_zombies**

**Syntax** : lsapi_avoid_zombies On/Off  
**Default** : lsapi_avoid_zombies Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Enable or disable a mechanism to avoid creation of zombie processes by lsphp. Default value is Off.

---

#### **lsapi_use_req_hostname**

**Syntax** : lsapi_use_req_hostname On/Off  
**Default** : lsapi_use_req_hostname Off  
**Context** : httpd.conf, virtualhosts  

**Description** :  
By default, we are using hostname from the server_rec structure (off), it means that mod_lsapi takes hostname from the VirtualHost section of the configuration file. Using hostname from the request_rec structure (On) means that mod_lsapi takes hostname from the HOST section of the request. It could be useful for those who use dynamically generated configs for virtual hosts for example with mod_lua.

---

#### **lsapi_sentry**

**Syntax** : lsapi_sentry On/Off  
**Default** : lsapi_sentry On  
**Context** : httpd.conf  

**Description** :  
When this option is enabled, errors that occur in the operation of the mod_lsapi will be sent to the remote sentry server. You can see the error messages that were sent to the sentry server in the directory /var/log/mod_lsapi. If you do not want to send error notifications from your server, you can disable this directive in lsapi.conf.

---

#### **lsapi_debug**

**Syntax** : lsapi_debug On/Off  
**Default** : lsapi_debug Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Extended debug logging.

---

#### **Tuning LSPHP backend**

#### **lsapi_set_env**

**Syntax** : lsapi_set_env VAR_NAME [VAR_VALUE]  
**Default** : -  
**Context** : httpd.conf  

**Description** :  
Pass env variable to lsphp. By default lsphp environment have only TEMP, TMP and PATH variables set.  
Example: lsapi_set_env TMP "/var/lsphp-tmp"  
Note: PATH env var default "/usr/local/bin:/usr/bin:/bin" cannot be changed because of security reasons.  
To change it, use explicitly lsapi_set_env_path option.

---

#### **lsapi_set_env_path**

**Syntax** : lsapi_set_env_path [path(s)]  
**Default** : lsapi_set_env_path /usr/local/bin:/usr/bin:/bin  
**Context** : httpd.conf  

**Description** :  
Change PATH variable in the environment of lsPHP processes. Default path /usr/local/bin:/usr/bin:/bin will be used if not set.

---

#### **lsapi_backend_children**

**Syntax** : lsapi_backend_children [number]  
**Default** : lsapi_backend_children [EP]  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_CHILDREN  
Maximum number of simultaneously running child backend processes.  
Optional, a default value is equal to EP.  
min value is 2; max value is 10000. If var value is more, 10000 will be used.

---

#### **lsapi_backend_connect_tries**

**Syntax** : lsapi_backend_connect_tries [number]  
**Default** : lsapi_backend_connect_tries 20  
**Context** : httpd.conf  

**Description** :  
Number of retries to connects to lsPHP daemon.

---

#### **lsapi_backend_connect_timeout**

**Syntax** : lsapi_backend_connect_timeout [number]  
**Default** : lsapi_backend_connect_timeout 500000  
**Context** : httpd.conf  

**Description** :  
Number of usec to wait while lsPHP starts (if not started on request).

---

#### **lsapi_backend_max_process_time**

**Syntax** : lsapi_backend_max_process_time [number]  
**Default** : lsapi_backend_max_process_time 300  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_MAX_PROCESS_TIME  
Optional. Default value is 300.  
Timeout to kill runaway processes.

---

#### **lsapi_backend_pgrp_max_idle**

**Syntax** : lsapi_backend_pgrp_max_idle [number]  
**Default** : lsapi_backend_pgrp_max_idle 30  
**Context** : httpd.conf  

**Description** :  
Sets env variable LSAPI_PGRP_MAX_IDLE, in seconds.    
Controls how long a control process will wait for a new request before it exits. # 0 stands for infinite.  
Optional, default value is 30.  
Should be more or equal to 0.  

---

#### **lsapi_backend_use_own_log**

**Syntax** : lsapi_backend_use_own_log On/Off  
**Default** : lsapi_backend_use_own_log Off  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
Redirecting log output of backend processes from Apache error_log to dedicated log file or files, depending on value of lsapi_backend_common_own_log option. If Off, use Apache error log file for backend output, or separate file otherwise.

---

#### **lsapi_backend_common_own_log**

**Syntax** : lsapi_backend_common_own_log On/Off  
**Default** : lsapi_backend_common_own_log Off  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
It will be used only when lsapi_backend_use_own_log set to On. On - backend processes of the all virtual hosts will share the common log file. Off - every virtual host will have its own backend log file.

---

#### **lsapi_backend_coredump**

**Syntax** : lsapi_backend_coredump On/Off  
**Default** : lsapi_backend_coredump Off  
**Context** : httpd.conf, htaccess  

**Description** :  
env variable LSAPI_ALLOW_CORE_DUMP (On or Off). Pass LSAPI_ALLOW_CORE_DUMP to lsphp or not. If it will be passed - core dump on lsphp crash will be created.  
Off by default.  
By default LSAPI application will not leave a core dump file when crashed. If you want to have LSAPI PHP dump a core file, you should set this environment variable. If set, regardless the value has been set to, core files will be created under the directory that the PHP script in.

---

#### **lsapi_backend_accept_notify**

**Syntax** : lsapi_backend_accept_notify On/Off  
**Default** : lsapi_backend_accept_notify On  
**Context** : httpd.conf, virtualhost  

**Description** :  
Switch LSAPI_ACCEPT_NOTIFY mode for lsphp. This option can be used both in Global and VirtualHost scopes.This mode is incompatible with PHP 4.4.

---

#### **lsapi_backend_pgrp_max_reqs**

**Syntax** : lsapi_backend_prgrp_max_reqs [number]  
**Default** : lsapi_backend_max_reqs 0  
**Context** : httpd.conf, virtualhost  

**Description** :  
Controls how many requests a control process will process before it exits. Should be more or equal to 0. In the case of wrong format, a default value will be used. Optional, the default value is 0, which means an unlimited number of requests.

---

#### **lsapi_backend_pgrp_max_crashes**

**Syntax** : lsapi_backend_prgrp_max_crashes [number]  
**Default** : lsapi_backend_max_crashes 0  
**Context** : httpd.conf, virtualhost

**Description** :  
Controls how many crashes of its worker processes a control process will detect before it exits. Should be more or equal to 0. In the case of wrong format, a default value will be used. Optional, the default value is 0, which means an unlimited number of crashes.

---

#### **Connection pool mode**

#### **lsapi_with_connection_pool**

**Syntax** : lsapi_with_connection_pool On/Off  
**Default** : lsapi_with_connection_pool Off  
**Context** : httpd.conf  

**Description** :  
On/Off - disable enable connect pool, default is Off.

---

#### **lsapi_backend_max_idle**

**Syntax** : lsapi_backend_max_idle [number]  
**Default** : lsapi_backend_max_idle 300  
**Context** : httpd.conf  

**Description** :  
It is relevant only with lsapi_with_connection_pool option switched on. Controls how long a worker process will wait for a new request before it exits. 0 stands for infinite. Should be more or equal to 0. In the case of wrong format default value will be used. Optional, default value is 300.

---

#### **lsapi_backend_max_reqs**

**Syntax** : lsapi_backend_max_reqs [number]  
**Default** : lsapi_backend_max_reqs 10000  
**Context** : httpd.conf  

**Description** :  
It is relevant only with lsapi_with_connection_pool option switched on. Controls how many requests a worker process will process before it exits. Should be more than 0. In the case of wrong format default value will be used. Optional, default value is 10000.

---

#### **CRIU support (CloudLinux 7 only)**

#### **lsapi_criu**

**Syntax** : lsapi_criu On/Off  
**Default** : lsapi_criu Off  
**Context** : httpd.conf  

**Description** :  
Enable/disable CRIU for lsphp freezing. Default: Off.

---

#### **lsapi_criu_socket_path**

**Syntax** : lsapi_criu_socket_path [path]  
**Default** : lsapi_criu_socket_path /var/run/criu/criu_service.socket  
**Context** : httpd.conf  

**Description** :  
Set path to socket for communication with criu service. Default: /var/run/criu/criu_service.socket.

---

#### **lsapi_criu_imgs_dir_path**

**Syntax** : lsapi_criu_imgs_dir_path [path]  
**Default** : lsapi_criu_imgs_dir_path /var/run/mod_lsapi/  
**Context** : httpd.conf  

**Description** :  
Path to folder where images of freezed PHP will be stored. Should be path. Default: /var/run/mod_lsapi/

---

#### **lsapi_backend_initial_start**

**Syntax** : lsapi_backend_initial_start [number]  
**Default** : lsapi_backend_initial_start 0  
**Context** : httpd.conf  

**Description** :  
Number of requests to virtualhost, when lsphp will be freezed.  Default: 0 - means disable freezing.

---

#### **lsapi_criu_use_shm**

**Syntax** : lsapi_criu_use_shm Off/Signals  
**Default** : lsapi_criu_use_shm Off  
**Context** : httpd.conf  

**Description** :  
Method of requests counting. Off - use shared memory. Signals - use signals from child processes to parent. Default: Off

---

#### **lsapi_backend_semtimedwait**

**Syntax** : lsapi_backend_semtimedwait On/Off  
**Default** : lsapi_backend_semtimedwait On  
**Context** : httpd.conf  

**Description** :  
Use semaphore for checking when lsphp process will be started. Speed of start lsphp increased with semaphore using. This method avoid cycles of waiting for lsphp start. Default: On.

----

#### **lsapi_reset_criu_on_apache_restart**

**Syntax** : lsapi_reset_criu_on_apache_restart On/Off  
**Default** : lsapi_reset_criu_on_apache_restart Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
This option allows cleaning all CRIU images on Apache restart.  
Setting lsapi_reset_criu_on_apache_restart to On means that on each Apache restart the CRIU images which are stored in directory specified by lsapi_criu_imgs_dir_path directive will be recreated on new request to domain(only after restart).  
If this option set to Off then CRIU images won’t be recreated on Apache restart.

----

#### **lsapi_criu_debug**

**Syntax**: lsapi_criu_debug On/Off  
**Default**: lsapi_criu_debug Off  
**Context**: httpd.conf, virtualhost  

**Description** :  
Enable/disable CRIU related debug logging.

----

#### **PHP configuration management**

#### **lsapi_process_phpini**

**Syntax** : lsapi_process_phpini On/Off  
**Default** : lsapi_process_phpini Off  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Enable or disable phpini_* directive processing. Default value is Off.

---

#### **lsapi_phpini**

**Syntax** : lsapi_phpini [path]  
**Default** : lsapi_phpini -  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
When lsapi_process_phpini option switched to Off, these values will be silently ignored. lsapi_phpini values with absolute filename of php.ini file can be inserted into .htaccess files in order to set custom php.ini which will override/complement settings from system default php.ini.

---

#### **lsapi_phprc**

**Syntax** : lsapi_phprc [No | Env | Auto | DocRoot]  
**Default** : lsapi_phprc No  
**Context** : httpd.conf, virtualhost  

**Description** :
The value of PHPRC env variable.  
Special values are "No", "Env", "Auto" and "DocRoot".  
Default value is "No" - without PHPRC at all.  
"Auto" value stands for php.ini from DocumentRoot of the corresponding VirtualHost if it is present, or from user's home directory otherwise "DocRoot" value stands for php.ini from DocumentRoot of the corresponding VirtualHost.  
"Env" value for using PHPRC from the environment, to set it with SetEnv config option, for example  
lsapi_phprc No  
lsapi_phprc Auto  
lsapi_phprc DocRoot  
lsapi_phprc Env  
lsapi_phprc /etc/

---

#### **lsapi_tmpdir**

**Syntax** : lsapi_tmpdir [path]  
**Default** : lsapi_tmpdir /tmp  
**Context** : httpd.conf, virtualhost  

**Description** :  
Set alternate request body temporary files directory.

---

#### **lsapi_enable_user_ini**

**Syntax** : lsapi_enable_user_ini On/Off  
**Default** : lsapi_enable_user_ini Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
Enable .user.ini files for backend. Same as suphp, php-fpm and fcgid mechanism of .user.ini. Default value is Off.

---

#### **lsapi_user_ini_homedir**

**Syntax** : lsapi_user_ini_homedir On/Off  
**Default** : lsapi_user_ini_homedir Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
If lsapi_enable_user_ini option is set to On, then enable/disable processing .user.ini file in home directory also. Default value is Off.

---

#### **lsapi_keep_http200**

**Syntax** : lsapi_keep_http200 On/Off  
**Default** : lsapi_keep_http200 Off  
**Context** : httpd.conf, .htaccess  

**Description** :  
If set to On, always keep backend's response status as mod_php does. If set to Off, response status can be overridden by Apache as suphp does (in case of call via ErrorDocument directive).

---

#### **lsapi_mod_php_behaviour**

**Syntax** : lsapi_mod_php_behaviour On/Off  
**Default** : lsapi_mod_php_behaviour On  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
On/Off - disable php_* directives, default On.

---

#### **php_value, php_admin_value, php_flag, php_admin_flag**

**Syntax** : [php_value|php_admin_value|php_flag|php_admin_flag]  
**Default** :  
**Context** : httpd.conf, virtualhost, htaccess  

**Description** :  
mod_php emulation.

---

#### **Security**

#### **lsapi_use_suexec**

**Syntax** : lsapi_use_suexec On/Off  
**Default** : lsapi_use_suexec On  
**Context** : httpd.conf  

**Description** :  
Use or not suexec to a target user.

---

#### **lsapi_user_group**

**Syntax** : lsapi_user_group [user_name] [group_name]  
**Default** : -  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Set user & group for requests.  

---

#### **lsapi_uid_gid**

**Syntax** : lsapi_uid_gid [uid] [gid]  
**Default** : -  
**Context** : httpd.conf, virtualhost, directory  

**Description** :  
Set user & group for request.

---

#### **lsapi_use_default_uid**

**Syntax** : lsapi_use_default_uid On/Off  
**Default** : lsapi_use_default_uid On  
**Context** : httpd.conf  

**Description** :  
Use default Apache UID/GID if no uid/gid set. Values: On/Off. If Off, and no UID/GID set, error 503 will be returned.

---

#### **lsapi_target_perm**

**Syntax** : lsapi_target_perm On/Off  
**Default** : lsapi_target_perm Off  
**Context** : httpd.conf  

**Description** :  
Check target PHP script permissions. If set to On, lsapi will check that script is owned by the same user, as user under which it is being executed. Return 503 error if they don't match. Default: Off.

---

#### **lsapi_paranoid**

**Syntax** : lsapi_paranoid On/Off  
**Default** : lsapi_paranoid Off  
**Context** : httpd.conf  

**Description** :  
Check or not permissions of target php scripts. Optional, default value is Off.

---

#### **lsapi_check_document_root**

**Syntax** : lsapi_check_document_root On/Off  
**Default** : lsapi_check_document_root On  
**Context** : httpd.conf  

**Description** :  
Check or not owner of DOCUMENT_ROOT. Optional, default value is On.

---

#### **lsapi_disable_forced_pwd_var**

**Syntax** : lsapi_disable_forced_pwd_var On/Off  
**Default** : lsapi_disable_forced_pwd_var Off  
**Context** : httpd.conf, virtualhost  

**Description** :  
To disable addition of PWD variable. Default value is Off. If set to On, the PWD variable will not be added into a backend environment.

---

#### **lsapi_max_resend_buffer**

**Syntax** : lsapi_max_resend_buffer [number]tmp  
**Default** : lsapi_max_resend_buffer 200  
**Context** : httpd.conf, virtualhost  

**Description** :  
Maximum buffer in KiB to resend for request that has a body (like POST request body).


See also [Apache mod_lsapi PRO CLI tools](/command-line_tools/#apache-mod-lsapi-pro).

### Troubleshooting

**Debugging mod_lsapi issues: error_log & sulsphp_log**


mod_lsapi errors will be located in error_log and sulsphp_log.
Note that errors can appear in both logs at the same time, and you might need to refer to both of them to solve the issue.

See next table for more details:

| |  | |
|-|--|-|
|**error_log** | **sulsphp_log** | **Solution**|
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused. Increase memory limit for LVE ID |uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | Increase pmem or vmem limits for the user uid.|
|Error sending request: ReceiveLSHeader: nothing to read from backend socket |No need to check this log.  | lsphp was killed. It can be due to apache restart or lfd. If you see this  message too often - change <span class="notranslate">  lsapi_terminate_backends_on_exit </span> to <span class="notranslate"> Off </span> in lsapi.conf or add to <span class="notranslate"> /etc/csf/csf.pignore </span> the following lines: <span class="notranslate"> exe:/usr/local/bin/lsphp </span> pexe:/opt/alt/php.*/usr/bin/lsphp|
|Error sending request (lsphp is killed?): ReceiveLSHeader: nothing to read from backend socket, referer: http://XXXXXXX  Child process with pid: XXXXX was killed by signal: 11, core dump: 0 |No need to check this log.  | lsphp has crashed. Next slide will explain what to do (core dump creating). Also, check configuration options for apc and suhosin in php.ini. Once you have a core file generated at DocumentRoot contact [https://cloudlinux.zendesk.com/](https://cloudlinux.zendesk.com/hc/) so we can investigate the cause.|
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |file is writable by others: (///usr/local/bin/lsphp)  | Incorrect lsphp file permissions. For fixing: <span class="notranslate"> chmod 755 /usr/local/bin/lsphp </span> cagefsctl --force-update.|
|Could not determine uid/gid for request |No need to check this log.  | UID/GID are not set in  virtualhost. Set <span class="notranslate"> lsapi_use_default_uid On </span> in lsapi.conf (it is <span class="notranslate"> On </span> by default since 0.1-98 version, this solution is for older versions).|
|Own id for script file (/xxxx/xxx/xxxx) is xxx; should be xxxx |No need to check this log.  | File is not owned by the user PHP executed by. To overwrite (insecure), set <span class="notranslate"> lsapi_target_perm Off </span> in lsapi.conf. |
|Could not connect to lsphp backend: connect to lsphp failed: 111 Connection refused |Entering jail error  | Check if СageFS enabled. Try running <span class="notranslate"> cagefsctl --remount-all. </span>|
|Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp  | Increase PMEM limits for the user UID.|
|Reached max children process limit: XX, extra: 0, current: XX, please increase LSAPI_CHILDREN.<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid: (xxx/xxxxxxxx)  gid: (xxx/xxxxxxxxxx)  cmd: /usr/local/bin/lsphp  | Increase value of <span class="notranslate"> lsapi_backend_children </span> for UID in vhost.conf or globally in lsapi.conf.|
|fork() failed, please increase process limit: Cannot allocate memory<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: backend process reset connection: errno 104 (possibly memory limit for LVE ID XXXX too small) |uid:(xxx); gid:(xxx); uid limit warning: EP should be < than NPROC, current EP: XX, NPROC: XX<br><br>uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | Increase NPROC limits for the UID. It should be greater than EP and <span class="notranslate"> lsapi_backend_children. </span>|
|Child process with pid: XXXXXX was killed by signal: 9, core dump: 0<br><br>Backend error on sending request(GET /XXXX HTTP/1.1); uri(/XXXX) content-length(0) (lsphp is killed?): ReceiveAckHdr: nothing to read from backend socket (LVE ID XXXX |uid: (xxx/xxxxxxxx) gid: (xxx/xxxxxxxxxx) cmd: /usr/local/bin/lsphp  | These errors occurs when the amount of PMEM limits is incommensurable with the number of EP. Increase PMEM limits or decrease EP number for the user UID.|
|totBytesRead (X) != bodyLen (X), referer: XXXX<br><br>Backend error on sending request(POST /XXXX HTTP/1.1); uri(/XXXX) content-length(X) (lsphp is killed?): ReceiveAckHdr: nothing to read from backend socket (LVE ID XXXX)<br><br>lsphp(XXXX): Child process with pid: XXXX was killed by signal: 15, core dump: 0 |No need to check this log.  | Increase LimitRequestBody (Apache) or/and SecRequestBodyNoFilesLimit (mod_security) configuration limits|
|Connect to backend failed: connect to lsphp failed: 13 |No need to check this log.  | Check that `mod_ruid2` is disabled|
|Connect to backend rejected on sending request(POST /XXXXX HTTP/1.1); uri(/XXXXX) |No need to check this log.|Set <span class="notranslate">`lsapi_disable_reject_mode On`</span> in your <span class="notranslate">`lsapi.conf`</span> and reload Apache. This way LSPHP daemon will put requests that cannot be served by LSPHP daemon right away into infinite queue, until one or more LSPHP daemon becomes free. Visit [Configuration Reference](/cloudlinux_os_components/#configuration-references) for more info.|


**Non-standard apache user**

If apache runs under a username other than <span class="notranslate"> "apache" </span> or <span class="notranslate"> "nobody" </span> , you should rebuild sulsphp (where username is built in for security reasons) with corresponding username:
<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel   
$ cd ~$ wget [https://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz)  
$ tar zxvf mod_lsapi.tar.gz  
$ cd mod-lsapi-0.1-37  
$ cmake -DHTTPD_USER=<new user name> .  
$ make
$ make install
```
</div>
This will:<br>  
- Install: <span class="notranslate"> /usr/lib/apache/mod_lsapi. </span> so (or to another correct httpd modules path)<br>
- Install: <span class="notranslate"> /usr/sbin/sulsphp </span>

**lsphp started under user apache/nobody**

Check if SuExecUserGroup specified for virtual hosts. This parameter is used by mod_lsapi for user identification.

**Could not connect to lsphp backend: connect failed: 111 Connection refused**

* Switch in lsapi.conf or <span class="notranslate"> mod_lsapi.conf </span> value to: <span class="notranslate"> lsapi_terminate_backends_on_exit Off </span>

* Check if empty: <span class="notranslate"> cat /etc/cron.d/kill_orphaned_php-cron | grep lsphp </span> , then run:

<div class="notranslate">

```
yum install lve-utils
```
</div>
Then restart cron service.

**Running PHP for users with UID < 99**

If you need to run PHP using mod_lsapi using users with UID < 99, you would need to re-compile sulsphp:

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel
$ cd ~
$ wget [https://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz)
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-XX
$ cmake -DUID_MIN=80 -DGID_MIN=80 .
$ make
$ make install
```
</div>
will be installed<br>  
- Installing: <span class="notranslate"> /usr/lib/apache/mod_lsapi.so </span> (or another httpd modules path)<br>
- Installing: <span class="notranslate"> /usr/sbin/sulsphp </span>

**Apache binary called not httpd (httpd.event, httpd.worker)**

<div class="notranslate">

```
$ yum install liblsapi liblsapi-devel 
$ cd ~
$ wget https://repo.cloudlinux.com/cloudlinux/sources/da/mod_lsapi.tar.gz        
$ tar zxvf mod_lsapi.tar.gz
$ cd mod-lsapi-0.1-XX
$ cmake -DPARENT_NAME="<apache binary name>".
$ make
$ make install
```
</div>
Will be installed:<br>
- Installing: <span class="notranslate"> /usr/lib/apache/mod_lsapi.so </span> (or another httpd modules path)<br>
- Installing: <span class="notranslate"> /usr/sbin/sulsphp </span>

**WHMCS Status page not accessible after installing CL and mod_lsapi (cPanel).**

* add <span class="notranslate"> user: useradd </span> userstat
* add to file (to the end of file before <span class="notranslate"> </IfModule>) /usr/local/apache/conf/conf.d/lsapi.conf: <Directory /usr/local/apache/htdocs/>  </span>
lsapi_user_group userstat userstat
</Directory>
* service httpd restart

This is safe solution for easyapache rebuilding and cpanel-mod-lsapi updating.

**PHP page with Suhosin return 503 error**

Make php.ini for suhosin as recommended below:
<div class="notranslate">

```
[suhosin]
suhosin.simulation = Off
suhosin.mail.protect = 1
suhosin.cookie.disallow_nul = Off
suhosin.cookie.max_array_depth = 1000
suhosin.cookie.max_array_index_length = 500
suhosin.cookie.max_name_length = 500
suhosin.cookie.max_totalname_length = 500
suhosin.cookie.max_value_length = 200000
suhosin.cookie.max_vars = 16384
suhosin.get.disallow_nul = Off
suhosin.get.max_array_depth = 1000
suhosin.get.max_array_index_length = 500
suhosin.get.max_name_length = 500
suhosin.get.max_totalname_length = 500
suhosin.get.max_value_length = 1000000
suhosin.get.max_vars = 16384
suhosin.post.disallow_nul = Off
suhosin.post.max_array_depth = 1000
suhosin.post.max_array_index_length = 500
suhosin.post.max_name_length = 500
suhosin.post.max_totalname_length = 500
suhosin.post.max_value_length = 1000000
suhosin.post.max_vars = 16384
suhosin.request.disallow_nul = Off
suhosin.request.max_array_depth = 1000
suhosin.request.max_array_index_length = 500
suhosin.request.max_totalname_length = 500
suhosin.request.max_value_length = 1000000
suhosin.request.max_vars = 16384
suhosin.request.max_varname_length = 524288
suhosin.upload.max_uploads = 300
suhosin.upload.disallow_elf = Off
suhosin.session.cryptua = Off
suhosin.session.encrypt = Off
suhosin.session.max_id_length = 1024
suhosin.executor.allow_symlink = Off
suhosin.executor.disable_eval = Off
suhosin.executor.disable_emodifier = Off
suhosin.executor.include.max_traversal = 8
```
</div>

**PHP page with APC return 503 error**

Make php.ini for APC as recommended below:
<div class="notranslate">

```
[apc]...apc.shm_segments=1apc.shm_size=32...
```
</div>
shared memory should be not less than 32MB

**Messages appearing in error_log: Child process with pid: XXXXX was killed by signal: 11, core dump: 0**

This means that lsphp was crashed. The solution is:

* Check if apc for user enabled. Tune its options as described in previous slide.
* Check if suhosin is enabled for user. Tune its options as described in this article.
* If previous items do not help, contact us at [https://helpdesk.cloudlinux.com/](https://helpdesk.cloudlinux.com/)

**How to get lsphp core dump on crash**

* Configure mod_lsapi to allow lsphp to generate core dumps. In mod_lsapi.conf:

<div class="notranslate">

```
lsapi_backend_coredump On
```
</div>

* Enable core file generation in sysctl:

<div class="notranslate">

```
sysctl -w ‘kernel.core_uses_pid=1’
sysctl -w ‘kernel.core_pattern=core.%p’
```
</div>

* Configure system to change max size of core files. In <span class="notranslate">/etc/security/limits.conf</span> add:

<div class="notranslate">

```
user1 soft core unlimited
user1 hard core unlimited
```
</div>
where <span class="notranslate">user1</span> is the username for which lsphp crashes.

* If <span class="notranslate">/etc/profile.d/limits.sh</span> exists, look up for the following lines:

<div class="notranslate">

```
if [ "$LIMITUSER" != "root" ]; then
ulimit -n 100 -u 35 -m 200000 -d 200000 -s 8192 -c 200000 -v unlimited 2>/dev/null
```
</div>
Substring <span class="notranslate">“-c 200000”</span> must be replaced with <span class="notranslate">“-c unlimited”</span> .

* Add line into <span class="notranslate">ulimit -c unlimited into apachectl</span> script just after another invokes of the <span class="notranslate">ulimit</span> command.

* Do cold restart of Apache with the command like this:

<div class="notranslate">

```
service httpd stop; sleep 2; killall lsphp; service httpd start
```
</div>

* You can make sure that ulimit for lsphp is changed to unlimited successfully with the following command:

<div class="notranslate">

```
cat /proc/PID/limits | grep ‘Max core file size’
```
</div>

where PID is a pid of any lsphp process. <span class="notranslate">ps -u user1 | grep lsphp </span>

* Core dump of lsphp will be created in the DocumentRoot of the corresponding virtual server.
On cPanel server it should map to

**mod_lsapi is not included in output of httpd -M after installation and setup command for cPanel EasyApache 3**

1. Check if the file <span class="notranslate"> _/usr/local/apache/conf/conf.d/lsapi.conf_ </span> exists and not empty;

2. Check if output of the command

<div class="notranslate">

```
cat /usr/local/apache/conf/httpd.conf | grep "/usr/local/apache/conf/conf.d/\*\.conf"
```
</div>
is not empty.

If it is empty:

1. Add to <span class="notranslate"> "include" </span> section of <span class="notranslate"> _/var/cpanel/conf/apache/main_ </span> string:

<span class="notranslate"> </span>
```
"include": '"/usr/local/apache/conf/conf.d/*.conf"'
 "include":
 "directive": 'include'
 "items":
 ...
 -
 "include": '"/usr/local/apache/conf/conf.d/*.conf"' 
 "listen":
```

2. Do:

<div class="notranslate">

```
mkdir -p /usr/local/apache/conf/conf.d/;                                                                                 
cp /usr/share/lve/modlscapi/confs/lsapi.conf /usr/local/apache/conf/conf.d/lsapi.conf
```
</div>

3. Call:

<div class="notranslate">

```
/scripts/rebuildhttpdconf/scripts/restartsrv_httpd
```
</div>

See also mod_lsapi PRO FAQ [here](https://cloudlinux.zendesk.com/hc/articles/360025828414-Apache-mod-lsapi-PRO-FAQ).

### CRIU Support


:::tip Note
<span class="notranslate"> CloudLinux </span> 7, <span class="notranslate"> CloudLinux </span> 7 Hybrid, and <span class="notranslate"> CloudLinux </span> 8 only
:::

CRIU is <span class="notranslate"> _Checkpoint/Restore In Userspace_ </span> , (pronounced <span class="notranslate"> kree-oo </span> ), is a software tool for Linux operating system. Using this tool, you can freeze a running application (or part of it) and checkpoint it as a collection of files on disk. You can then use the files to restore the application and run it exactly as it was during the time of freeze (more information on the link [https://criu.org/Main_Page](https://criu.org/Main_Page) ).

mod_lsapi-1.1-1 is the first beta version with freezing PHP implemented. mod_lsapi now supports the following parameters:

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Values** | **Default**|
|lsapi_criu | Enable/disable CRIU for lsphp freezing. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|
|lsapi_criu_socket_path | Set path to socket for communication with criu service. | [path to socket] | <span class="notranslate"> /var/run/criu/criu_service.socket </span>|
|lsapi_backend_semtimedwait | Enable/disable flag for notification about lsphp started. This method avoid cycles of waiting for lsphp start. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> On </span>|
|lsapi_backend_initial_start | Number of request when lsphp should be freezed. | [number] 0 - no freezing | 0|
|lsapi_criu_use_shm | Method of requests counting. <span class="notranslate"> Off </span> - use shared memory. <span class="notranslate"> Signals </span> - use signals from child processes to parent. | <span class="notranslate"> Off/Signals </span> | <span class="notranslate"> Off </span>|
|lsapi_criu_imgs_dir_path | Path to folder where imgs of freezed PHP will be stored. | [path] | <span class="notranslate"> /var/run/mod_lsapi/ </span>|
|lsapi_criu_debug | Enable/Disable CRIU related debug logging. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|

Example:
<div class="notranslate">

```
lsapi_criu On
lsapi_criu_socket_path /var/run/criu/criu_service.socket
lsapi_backend_semtimedwait On
lsapi_backend_initial_start 15
lsapi_criu_use_shm Off
lsapi_criu_debug Off
```
</div>

When Apache module mod_lsapi detects CRIU enabled (lsapi_criu On) it prepares a directory for images (on the first request of virtualhost) to store ( <span class="notranslate"> lsapi_criu_imgs_dir_path /var/run/mod_lsapi/[dir_name] </span> ), and starts lsphp process. Lsphp increases counter ( <span class="notranslate"> lsapi_criu_use_shm Off|Signals </span> ) via shared memory or signals, when counter reaches limit ( <span class="notranslate"> lsapi_backend_initial_start 15 </span> ), lsphp sends the request to CRIU for freezing. CRIU service makes images of requested processes. Lsphp will not be frozen if counter has not reached the limit. The next time when lsphp will be stopped, it will be unfrozen from the images.

The images of the processes will be saved even if Apache is restarted. But all images will be deleted after server restart by default configuration. This can be modified by setting the new path <span class="notranslate"> lsapi_criu_imgs_dir_path </span> .

**Important!** If php.ini or configuration file from php.d is changed, the images must be deleted manually.

**Note** that CRIU (version lower than criu-lve-3.6-1) can't correctly freeze <span class="notranslate"> lsphp </span> with <span class="notranslate"> PrivateTmp </span> enabled. For correct work, <span class="notranslate"> PrivateTmp </span> must be <span class="notranslate"> false </span> in <span class="notranslate"> httpd.service file </span> . For disabling:

Copy <span class="notranslate"> _httpd.service_ </span> to <span class="notranslate"> _/etc/systemd/system_ </span> and change there <span class="notranslate"> PrivateTmp: 
  </span>
<div class="notranslate">

```
# cat httpd.service
[Unit]
Description=Apache web server managed by cPanel Easy
ApacheConditionPathExists=!/etc/httpddisable
ConditionPathExists=!/etc/apachedisable
ConditionPathExists=!/etc/httpdisable

[Service]Type=forking
ExecStart=/usr/local/cpanel/scripts/restartsrv_httpd --no-verbose
PIDFile=/var/run/apache2/httpd.pid
PrivateTmp=false 

[Install]
WantedBy=multi-user.target 
```
</div>
Or it would be technically better to provide a small override of service file rather than copying the whole new version in <span class="notranslate"> /etc/systemd/system </span> 

[http://www.freedesktop.org/software/systemd/man/systemd.unit.html](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)

<div class="notranslate">

```
mkdir /etc/systemd/system/httpd.service.d
echo "[Service]" >  /etc/systemd/system/httpd.service.d/nopt.conf
echo "PrivateTmp=false" >> /etc/systemd/system/httpd.service.d/nopt.conf
```
</div>

and

<div class="notranslate">

```
# systemctl daemon-reload
```
</div>

**Installation**

Criu is installed with dependency to mod_lsapi-1.1 package. To activate it:

1. Enable service and start it:

<div class="notranslate">

```
systemctl enable criu
systemctl start criu
```
</div>

2. Edit lsapi.conf file, turn CRIU On and set some defaults:

<div class="notranslate">

```
lsapi_criu On
lsapi_criu_socket_path /var/run/criu/criu_service.socket
lsapi_backend_semtimedwait On
lsapi_backend_initial_start 15
lsapi_criu_use_shm Off
```
</div>

3. Restart apache:

<div class="notranslate">

```
service httpd restart
```
</div>



1. An option added to the Apache configuration for cleaning all the images earlier saved by CRIU.

| |  |  | |
|-|--|--|-|
|**Option name** | **Description** | **Value** | **Default**|
|<span class="notranslate">lsapi_reset_criu_on_apache_restart</span> | This option allows cleaning all CRIU images on Apache restart. | <span class="notranslate"> On/Off </span> | <span class="notranslate"> Off </span>|

On the next restart of Apache all of the images will be cleaned.

It can be enabled by writing <span class="notranslate">lsapi_reset_criu_on_apache_restart On </span> in _lsapi.conf_ (Virtual Host and .htaccess do not allow to use this option).

Note that this option works only if <span class="notranslate">lsapi_terminate_backends_on_exit</span> is <span class="notranslate">  On  </span> (default value is <span class="notranslate"> On </span> , it is set in _lsapi.conf_ too).

2. If you need to clean CRIU images for one user you can simply add file to the user's directory with CRIU images (default <span class="notranslate"> _/var/run/mod_lsapi/lsapi_ * _criu_imgs_ </span> ). On the next restart of lsphp the images will be cleaned.

3. Global reset flag for cleaning all earlier saved images by CRIU.

Current mod_lsapi allows cleaning all images only with one flag file.

Create <span class="notranslate"> /usr/share/criu/mod_lsapi/lsphp.criu.reset </span> file. Also don't forget to set such permissions <span class="notranslate"> [nobody:nobody] </span> (or <span class="notranslate"> [apache:apache] </span> for non cPanel) and access mode [700] to the <span class="notranslate"> /usr/share/criu/mod_lsapi </span> directory.

Steps to do :

<div class="notranslate">

```
mkdir /usr/share/criumkdir /usr/share/criu/mod_lsapi
chown nobody:nobody /usr/share/criu/mod_lsapi
touch /usr/share/criu/mod_lsapi/lsphp.criu.reset
```
</div>

On the next requests to all virtual hosts images will be recreated (deleted first and created again later - it depends on lsapi_backend_initial_start value).

4. Аdded possibility to clean CRIU images from user space.

If a user needs to clean CRIU images for lsphp, he should create a file: <span class="notranslate"> ~/mod_lsapi_reset_me_[vhost_name] </span>. Where <span class="notranslate"> [vhost_name] </span> is a ServerName from the VirtualHost block in the configuration file. On the next restart of lsphp, the images will be cleaned.

_Example:_

<div class="notranslate">

```
cd; touch mod_lsapi_reset_me_criu.test.com
```
</div>

where _vhost.conf_ contains:  
<span class="notranslate">`ServerName criu.test.com`</span>

This mode is enabled by default and creates a separate lsphp process for each virtual host.

<span class="notranslate">`mod_lsapi_reset_me[vhost_name]`</span> flag will not work for a user when lsapi_per_user option is <span class="notranslate">`On`</span>.

5. There is (default <span class="notranslate">`off`</span>) option in mod_lsapi that creates only one lsphp process for a user, regardless of the number of his virtual hosts. We don't recommend to use this option with CRIU, but if you use it, make sure that your virtual hosts (under the same user) have the same environment configurations. If they are not the same, this may cause undesirable lsphp process operation.



## Additional integration components

CloudLinux uses various ways to integrate with existing system.

### LVE PAM module

pam_lve.so is a PAM module that sets up LVE environment. It provides easy way to setup LVE for SSH sessions, as well as other PAM enabled applications, such as crontab, su, etc.

pam_lve.so is installed by default when you convert existing server.

Installation:

<div class="notranslate">

```
# yum install pam_lve
```
</div>

After you install <span class="notranslate"> RPM </span>, add the following line to the PAM config file for the required application:

<div class="notranslate">

```
session    required     pam_lve.so 500 1 wheel,other
```
</div>

In this line:
* 500 stands for minimum UID for which LVE will be setup. For any user with UID < 500, LVE will not be setup. If <span class="notranslate">CageFS</span> is installed, use:
<span class="notranslate">`cagefsctl --set-min-uid UID`</span> to setup minimum UID. The parameter in PAM files will be ignored in that case.
* 1 stands for <span class="notranslate">CageFS</span> enabled (0 – <span class="notranslate">CageFS</span> disabled)
* 3rd optional argument defines group of users that will not be placed into LVE or <span class="notranslate">CageFS</span>. Starting with **pam_lve 0.3-7** you can specify multiple groups, comma separated.

:::tip Warning
It is crucial to place all users that su or sudo to root into that group. Otherwise, once such user gains root, user will be inside LVE, and all applications restarted by that user will be inside that user LVE as well.
:::

For example, to enable LVE for SSH access, add that line to the `/etc/pam.d/sshd`. To enable LVE for SU, add that line to the `/etc/pam.d/su`.

By default, module will not place users with group wheel into lve. If you want to use different group to define users that will not be placed into LVE by pam_lve - pass it as the 3rd argument.

:::tip Warning
Be careful when you test it, as if you incorrectly add this line to the `/etc/pam.d/sshd`, it will lock you out ssh. Don't log out of your current SSH session, until you sure it works.
:::

For preventing cases when user enters under usual user (using ssh) and then tries to enter as super user (via sudo or su) - pam_sulve was created, which tries to enter to LVE=1 and leaves it right away. If action fails, user gets message:

<div class="notranslate">

```
!!!!  WARNING: YOU ARE INSIDE LVE !!!!
```
</div>

To check if pam_sulve is enabled on the server:

<div class="notranslate">

```
grep pam_sulve.so /etc/pam.d/*
```
</div>

should not be empty.

### LVE wrappers

* [Placing programs inside LVE](/cloudlinux_os_components/#placing-programs-inside-lve)

LVE wrappers are the set of tools that allow system administrator to run various users, programs & daemons within Lightweight Virtual Environment. This allows system administrator to have control over system resources such program can have. Additionally it prevents misbehaving programs running within LVE to drain system resources and slow down or take down the whole system. The tools are provided by lve-wrappers RPM.

You can install them by running:

<div class="notranslate">

```
$ yum install lve-wrappers
```
</div>

#### **Placing programs inside LVE**

LVE Wrappers provide two tools for placing programs inside LVE: <span class="notranslate">`lve_wrapper`</span> and `lve_suwrapper`.

`/bin/lve_wrapper` can be used by any non-root user, as long as that user is in group lve (see `/etc/groups` file).

**Syntax**

<div class="notranslate">

```
lve_wrapper <command_to_run>
```
</div>

**Example**

<div class="notranslate">

```
$ lve_wrapper make install
```
</div>

The program will be executed within LVE with ID matching user's id.

`/bin/lve_suwrapper` can be used by root user or any user in group lve (see `/etc/groups` file) to execute command within specified LVE.

**Syntax**

<div class="notranslate">

```
lve_suwrapper LVE_ID <command_to_run>
```
</div>

**Example**

<div class="notranslate">

```
# lve_suwrapper 10000 /etc/init.d/postgresql start
```
</div>

**Switches**

* `-f` - force namespace
* `-n` - without namespace

### MPM ITK

CloudLinux <span class="notranslate">httpd RPM</span> comes with <span class="notranslate"> MPM ITK </span> built in. Yet, if you would like to build your own Apache, you need to apply our patch for <span class="notranslate"> MPM ITK </span>

* Download file: [https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)
* Extract: <span class="notranslate">apache2.2-mpm-itk-seculrelve12.patch</span>
* And apply this patch to your Apache source code.

When running <span class="notranslate"> MPM ITK </span>, you should disable <span class="notranslate">mod_hostinglimits</span>. All the functionality needed by <span class="notranslate"> MPM ITK </span> is already built into the patch.

Directives which can be used by Apache with <span class="notranslate"> ITK </span> patch:

* <span class="notranslate">`AssignUserID`</span> - uses ID as LVE ID
* <span class="notranslate">`LVEErrorCodeITK`</span> - error code to display on LVE error (508 by default)
* <span class="notranslate">`LVERetryAfterITK`</span> - same as <span class="notranslate">`LVERetryAfter`</span> - respond with <span class="notranslate">`Retry-After`</span> header when LVE error 508 occurs
* <span class="notranslate">`LVEId`</span> - ovverides id used for LVE ID instead of <span class="notranslate">`AssignUserID`</span>
* <span class="notranslate">`LVEUser`</span> - overrides user to use to retrieve LVE ID, instead of AssignUserID

### HostingLimits module for Apache

* [Additional notes](/cloudlinux_os_components/#additional-notes)
* [Installation](/cloudlinux_os_components/#installation-4)
* [Directives](/cloudlinux_os_components/#directives)
  * [SecureLinks](/cloudlinux_os_components/#securelinks)
  * [SkipErrors](/cloudlinux_os_components/#skiperrors)
  * [AllowedHandlers](/cloudlinux_os_components/#allowedhandlers)
  * [DenyHandlers](/cloudlinux_os_components/#denyhandlers)
  * [LVEErrorCode](/cloudlinux_os_components/#lveerrorcode)
  * [LVEid](/cloudlinux_os_components/#lveid)
  * [LVEUser](/cloudlinux_os_components/#lveuser)
  * [LVEUserGroupID](/cloudlinux_os_components/#lveusergroupid)
  * [LVERetryAfter](/cloudlinux_os_components/#lveretryafter)
  * [LVESitesDebug](/cloudlinux_os_components/#lvesitesdebug)
  * [LVEParseMode](/cloudlinux_os_components/#lveparsemode)
  * [LVEPathRegexp](/cloudlinux_os_components/#lvepathregexp)
  * [LVELimitRecheckTimeout](/cloudlinux_os_components/#lvelimitrechecktimeout)
  * [LVEUse429](/cloudlinux_os_components/#lveuse429)

mod_hostinglimits works with existing <span class="notranslate"> CGI/PHP </span> modules, to put them into LVE context. In most cases the <span class="notranslate"> CGI/PHP </span> process will be placed into LVE with the ID of the user that sites belongs to. mod_hostinglimits detects the user from `SuexecUserGroup` (<span class="notranslate">suexec</span> module), <span class="notranslate">`SuPHP_UserGroup`</span> (from mod_suphp), `AssignUserID` (<span class="notranslate">MPM ITK</span>), <span class="notranslate">`RUidGid` (mod_ruid2 </span> ) directives.

This can be overwritten via LVEId or LVEUser parameter on the Directory level.

:::tip Note
Those parameters will not work with mod_fcgid and mod_cgid.
:::

The order of detection looks as follows:

* LVEId
* LVEUser
* SuexecUserGroup
* suPHP_UserGroup
* RUidGid
* AssignUserID


:::tip Note
LVE doesn't work for mod_include #include due to its "filter" nature.
:::

Example:

<div class="notranslate">

```
LoadModule hostinglimits_module modules/mod_hostinglimits.so
<IfModule mod_hostinglimits.c>
 AllowedHandlers cgi-script php5-script php4-script
 SecureLinks On
</IfModule>
```
</div>

#### **Additional notes**

**mod_hostinglimits** (since version 1.0-22) supports <span class="notranslate">`min-uid - cagefsctl --set-min-uid=600`</span>.

Min UID is read on Apache start/restart and stored in the memory during apache runtime.

If the min UID has changed, you should restart Apache for **mod_hostinglimits** applying new min UID value. Full min UID is supported only with APR.

The following message should appear:

<div class="notranslate">

```
[notice] mod_hostinglimits: found apr extention version 3.
```
</div>

This means that the correct APR is installed with mod_hostinglimits.

mod_hostinglimist has variable for Apache CustomLog format string <span class="notranslate">`%{LVE_ID}y`</span>.

**How to use**:

LogFormat 

<div class="notranslate">

```
"%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i" req for lve "%{LVE_ID}y"
```
</div>

combined

shows in access_log the following info:

<div class="notranslate">

```
*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php HTTP/1.1" 200 43435 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500

*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php?=PHPE9568F34-D428-11d2-A769-00AA001ACF42 HTTP/1.1" 200 2524 "************/1.php""Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500

*.*.*.* - - [09/Apr/2015:07:17:06 -0400] "GET /1.php?=PHPE9568F35-D428-11d2-A769-00AA001ACF42 HTTP/1.1" 200 2146 "************/1.php""Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0" req for lve 500
```
</div>

#### Installation

**cPanel**

Installed by default during EasyApache build. Requires <span class="notranslate">`lve-stats`</span> & <span class="notranslate">`lve-utils`</span> packages to be installed.

**DirectAdmin**

Can be built using <span class="notranslate"> custombuild</span>:

<div class="notranslate">

```
$ yum install liblve-devel
$ cd /usr/local/directadmin/custombuild
$ ./build update
$ ./build set cloudlinux yes
$ ./build apache
$ ./build rewrite_confs
```
</div>

If you run `suphp`, then run the following:

<div class="notranslate">

```
$ ./build suphp
```
</div>

**Plesk**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**ISPmanager**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**InterWorx**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**H-Sphere**

Included by default in H-Sphere 3.5+

**Standard Apache from RPM**

<div class="notranslate">

```
$ yum install mod_hostinglimits
```
</div>

**Custom Apache installation**

Compile from the source: [https://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz)

<div class="notranslate">

```
$ wget https://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz
$ yum install cmake
$ tar -zxvf mod_hostinglimits*.tar.gz
$ cd mod_hostinglimits*
$ cmake .
$ make
$ make install
```
</div>

* Apache Module Identifier: `hostinglimits_module`
* Source Files: `mod_hostinglimits.c`
* Compatibility: MPM prefork, worker, event, ITK

#### Directives

<div class="notranslate">

#### **SecureLinks**

</div>

| | |
|-|-|
|**Description**| Makes sure that for any virtual hosts, only files owned by user specified via SuexecUserGroup or other ways as described above are served. For files owned by any other user apache will return <span class="notranslate">`Access Denied`</span> error. The directive will not affect VirtualHost without user id specified, or with uid < 100|
|**Syntax**| <span class="notranslate">`SecureLinks On`</span>|
|**Default**| <span class="notranslate">`SecureLinks Off`</span>|
|**Context**| server config|

Prevents apache from serving files not owned by user, stopping symlink attacks against php config files.

**Example**

<div class="notranslate">

```
SecureLinks On
```
</div>

***

<div class="notranslate">

#### **SkipErrors**

</div>

| | |
|-|-|
|**Description**| Allow apache to continue if LVE is not available|
|**Syntax**| <span class="notranslate">`SkipErrors On`</span>|
|**Default**| <span class="notranslate">`SkipErrors On`</span>|
|**Context**| server config|
|**<font color="Red">Status</font>**| <font color="Red">deprecated</font>|

Prevents Apache from exiting if LVE is not available.

**Example**

<div class="notranslate">

```
SkipErrors Off
```
</div>

***

<div class="notranslate">

#### **AllowedHandlers**

</div>

| | |
|-|-|
|**Description**| List of handlers that should be placed into LVE, support regexp|
|**Syntax**|`AllowedHandlers cgi-script %^php%  my-script`|
|**Default**| none|
|**Context**| server config|

This directive allows to list handlers which will be intercepted and placed into LVE.

**Examples**

* Match requests handled by cgi-script handler:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers cgi-script 
  ```
  </div>

* Match all requests:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers *
  ```
  </div>
  
* Match all requests that handled by handler that contains PHP:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers %php%
  ```
  </div>
* Match all requests handled by handler that starts with PHP:
  
  <div class="notranslate">
  
  ```
  AllowedHandlers %^php%
  ```
  </div>

***

<div class="notranslate">

#### **DenyHandlers**

</div>

| | |
|-|-|
|**Description**| List of handlers that should not be placed into LVE, support regexp|
|**Syntax**| <span class="notranslate">`DenyHandlers text/html`</span>|
|**Default**| none|
|**Context**| server config|

This directive works together with AllowHandlers, to exclude some handlers from being allowed in LVE.

**Example**:

Match all requests, but <span class="notranslate">`text/*`</span>

<div class="notranslate">

```
AllowedHandlers *DenyHandlers %text/*%
```
</div>

***

<div class="notranslate">

#### **LVEErrorCode**

</div>

| | |
|-|-|
|**Description**| Error code to display once entry is rejected due to maxEntryProcs|
|**Syntax**| values from 500 to 510|
|**Default**| 508|
|**Context**| directory config|

Specifies ErrorCode to use on LVE error (like too many concurrent processes running).

The message that will be displayed by default is:
<div class="notranslate">

```
Resource Limit Is Reached.

The website is temporarily unable to serve your request as it exceeded resource limit. 

Please try again later.
```
</div>

You can redefine error message using `ErrorDocument` directive

Example:
<div class="notranslate">

```
LVEErrorCode 508ErrorDocument 508 508.html
```
</div>

***

<div class="notranslate">

#### **LVEid**

</div>

| | |
|-|-|
|**Description**| Allows to setup separate LVE ID on per directory level. If not set, user ID of a corresponding user is used.|
|**Syntax**|<span class="notranslate">`LVEId number`</span>|
|**Default**| User Id is used|
|**Context**| directory config|

Specifies LVE id for particular directory

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
 LVEId 10001
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVEUser**

</div>

| | |
|-|-|
|**Description**| Allows to setup separate LVE ID on per directory level.|
|**Syntax**|<span class="notranslate">`LVEUser username`</span>|
|**Default**| none|
|**Context**| directory config|

Specifies LVE ID for particular directory.

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
       LVEUser user1
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVEUserGroupID**

</div>

| | |
|-|-|
|**Description**| Use group ID instead of user ID for LVE container number.|
|**Syntax**| <span class="notranslate">`LVEUserGroupID On/Off`</span>|
|**Default**| User Id is used|
|**Context**| global config only|

* If the option enabled, group ID will be used instead of a user ID. Apache will display the following string in error logs:

<div class="notranslate">

```
mod_hostinglimits: use GroupID instead of UID 
mod_hostinglimits: found apr extension version 2 
mod_hostinglimits: apr_lve_environment_init_group check ok
```
</div>

* If a compatible apr library is not found, the following error message will be display in error logs.

<div class="notranslate">

```
mod_hostinglimits:  apr_lve_* not found!!!
```
</div>

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
       LVEUserGroupID On
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVERetryAfter**

</div>

| | |
|-|-|
|**Description**| Returns Retry-After header when LVE error 508 occurs.|
|**Syntax**|`LERetryAfter MINUTES`|
|**Default**| 240 minutes|
|**Context**| directory config|

Specifies interval for <span class="notranslate">`Retry-After`</span> header. The <span class="notranslate">`Retry-After`</span> response-header field can be used to indicate how long the service is expected to be unavailable to the requesting client.

**Example**:

<div class="notranslate">

```
LVERetryAfter 180
```
</div>

***

<div class="notranslate">

#### **LVESitesDebug**

</div>

| | |
|-|-|
|**Description**| Provides extended debug info for listed sites.|
|**Syntax**|<span class="notranslate">`LVESitesDebug test.com test2.com`</span>|
|**Default**| <span class="notranslate"> none </span>|
|**Context**| directory config|

Specifies virtual hosts to provide extra debugging information.

**Example**:

<div class="notranslate">

```
<Directory "/home/user1/domain.com/forums">
       LVESitesDebug abc.com yx.cnet
</Directory>
```
</div>

***

<div class="notranslate">

#### **LVEParseMode**

</div>

| | |
|-|-|
|**Description**| Determines the way LVE ID will be extraced. In Conf|
|**Syntax**|`LVEParseMode CONF` `PATH` `OWNER` [`REDIS`](/limits/#redis-support-for-hostinglimits)|
|Default: | <span class="notranslate">`CONF`</span>|
|Context: | directory config|

* In `CONF` mode, standard way to extract LVE ID is used (SuexecUserGroup, LVEId, or similar directives).

* In <span class="notranslate">`PATH`</span> mode, username is extracted from the home directory path. The default way to match username is via the following regexp: <span class="notranslate">`/home/([^/]*)/`</span> . Custom regexp can be specified in LVEPathRegexp.

* In <span class="notranslate">`OWNER`</span> mode, the owner of the file is used as an LVE ID.

* In <span class="notranslate">[`REDIS`](/limits/#redis-support-for-hostinglimits)</span> mode, LVE ID is retrieved from Redis database.

**Example**:

<div class="notranslate">

```
LVEParseMode CONF
```
</div>

***

<div class="notranslate">

#### **LVEPathRegexp**

</div>

| | |
|-|-|
|**Description**| Regexp used to extract username from the path. Used in conjuction with `LVEParseMode PATH`|
|**Syntax**|`LVEPathRegexp regexp`|
|**Default**| <span class="notranslate">`/home/([^/]*)/`</span>|
|**Context**| directory config|

Used to extract usersname via path.

**Example**:

<div class="notranslate">

```
LVEPathRegexp /home/([^/]*)/
```
</div>

***

<div class="notranslate">

#### **LVELimitRecheckTimeout**

</div>

| | |
|-|-|
|**Description**| Timeout in milliseconds, a site will return EP without lve_enter for LA decreasing after this time|
|**Syntax**|`LVELimitRecheckTimeout number`|
|**Default**| 0|
|**Context**| httpd.conf, virtualhost|

Example:
<span class="notranslate"> </span>
```
LVELimitRecheckTimeout 1000
```

<div class="notranslate">

#### **LVEUse429**

</div>

| | |
|-|-|
|**Description**| Use 429 error code as code returned on max entry limits ( <span class="notranslate"> on/off </span> ).|
|**Syntax**|`LVEUse429 on`|
|**Default**|<span class="notranslate">`off`</span>|
|**Context**| httpd.conf, virtualhost|

**Example**:

<div class="notranslate">

```
LVEUse429 on
```
</div>

Available for RPM based panels, EasyApache 4 and DirectAdmin.

### cPanel/WHM JSON API

* [Parameters](/cloudlinux_os_components/#parameters)
* [Manage reseller limits/users/packages via cPanel/WHM JSON API - JSONHandler](cloudlinux_os_components/#manage-reseller-limits-users-packages-via-cpanel-whm-json-api-jsonhandler)
* [Using a WHM API token](/cloudlinux_os_components/#using-a-whm-api-token)

CloudLinux offers JSON API for [lvectl](/command-line_tools/#lvectl) via WHM. You can access it using the following URL:

<div class="notranslate">

```
https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=list
```
</div>

The output will look as follows:

<div class="notranslate">

```
{"data":[{"ID":"default","CPU":"30","NCPU":"1","PMEM":"1024M","VMEM":"1024M","EP":"28","NPROC":"0","IO":"2048"}]}
```
</div>

#### **Parameters**

|||
|-|-|
|<span class="notranslate">`cgiaction`</span>|always <span class="notranslate">`jsonhandler`</span>|
|<span class="notranslate">`handler`</span>|should match [lvectl](/command-line_tools/#lvectl) command|

For commands like <span class="notranslate">`set`, `destroy`</span> & <span class="notranslate">`delete`</span>, where you need to specify LVE (user) ID, like `lveid=500` (matches user ID 500).

**Example**:

<div class="notranslate">

```
https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=500&speed=30%&io=2048

https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=500&speed=300Mhz&io=2048

https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=500&speed=3Ghz&io=2048
```
</div>

:::tip Note
**Speed** limit can be specified in several units of measure - <span class="notranslate"> %, MHz, GHz </span>. The figures will be different according to the unit of measure.
:::

**Output**:

<div class="notranslate">

```
{"status":"OK"}
```
</div>

To do `set default`, use `lveid=0`, like:

<div class="notranslate">

```
https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set&lveid=0&speed=30%&io=2048
```
</div>

For commands like <span class="notranslate">`apply all`, `destroy all`</span>, use:

<div class="notranslate">

```
handler=apply-all

handler=destroy-all
```
</div>

You can use the following commands that allow to specify user name instead of user ID:

| | |
|-|-|
|<span class="notranslate">`set-user`</span> | Set parameters for a LVE and/or create a LVE using username instead of ID.|
|<span class="notranslate"> `list-user  ` </span> | List loaded LVEs, display username instead of user ID.|
|<span class="notranslate"> `delete-user ` </span> | Delete LVE and set configuration for that user to defaults.|

If the limits for users are set with <span class="notranslate"> cPanel LVE Extension</span>, then turnkey billing solutions can be applied (e.g. WHMCS).


#### Manage reseller limits/users/packages via cPanel/WHM JSON API (JSONHandler)

|  |  |  |
|----|----|--|
|**Action**|**lvectl command**|**JSONHandler**|
|enable  reseller limits|<span class="notranslate">`lvectl set-reseller res1 --speed=35%`</span>|`https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set-reseller&lveid=res1&speed=30%&io=2048`|
|disable reseller limits|<span class="notranslate">`lvectl remove-reseller res1`</span>|`https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=remove-reseller&lveid=res1`|
|set default limits for reseller|<span class="notranslate">`lvectl set-reseller-default res1 --speed=91%`</span>|`https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set-reseller-default&lveid=res1&speed=30%`|
|set limits for package, created by reseller|<span class="notranslate">`lvectl package-set res1_pack1 --reseller res1 --speed=88%`</span>|`https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=package-set&lveid=res1_pack1&reseller=res1&speed=30%`|
|set limits for user, created by reseller|<span class="notranslate">`lvectl set-user r1user1 --reseller res1 --speed=77%`</span>|`https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set-user&lveid=r1user1&reseller=res1&speed=30%`|
|set unlimited for user, created by reseller|<span class="notranslate">`lvectl set-user r1user1 --reseller res1 --unlimited`</span>|`https://IP:2087/cpsess_YOURTOKEN/cgi/CloudLinux.cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=set-user&lveid=r1user1&reseller=res1&unlimited`|

#### Using a WHM API token

You can use a WHM API token with curl as follows:

<div clas="code">

```
curl -X POST -k -s -H "Authorization: whm root:WHM_TOKEN" "https://SERVER_IP:2087/cgi/CloudLinux.cgi?cgiaction=jsonhandler&handler=LVE_METHOD&PARAMETERS
```
</div>

Where:

* <span class="notranslate">`WHM_TOKEN`</span> – a generated WHM API token (see: [Creating an API token](https://documentation.cpanel.net/display/DD/Guide+to+API+Authentication+-+API+Tokens+in+WHM#0ac291c40e454694a8b981c45988c1cb))
* <span class="notranslate">`LVE_METHOD`</span> – lvectl method (for example: <span class="notranslate">`list`</span>. See also: [lvectl](/command-line_tools/#lvectl))
* <span class="notranslate">`PARAMETERS`</span> – all other parametrs and options for a method according to the [documentation](/command-line_tools/#lvectl)


### mod_proctitle

* [How to read mod_proctitle information](/cloudlinux_os_components/#how-to-read-mod-proctitle-information)
* [Tuning parameters](/cloudlinux_os_components/#tuning-parameters)

mod_proctitle is a module for gathering URL information per request. It is available only for Apache 2.4 now.


**For installation:**

cPanel EasyApache 3 and non cPanel ( _CloudLinux 7 only for non cPanel_ ):

<div class="notranslate">

```
# yum install mod_proctitle --enablerepo=cloudlinux-updates-testing
# service httpd restart
```
</div>

cPanel EasyApache 4:

<div class="notranslate">

```
# yum install ea-apache24-mod_proctitle
# service httpd restart
```
</div>
DirectAdmin:
<div class="notranslate">
 
```
# cd /usr/local/directadmin/custombuild
# ./build update
# ./build mod_procticle
```
</div>

#### How to read mod_proctitle information

**How to read information gathered by the module**


For reading information saved by module use the following script (the script is not in the package):
<div class="notranslate">

```
#!/bin/bash

httpd=httpd 

for pid in `/usr/bin/pgrep $httpd`; do
    for tid in `ls /proc/$pid/task`; do
		found=no
		for shm in `ls /dev/shm/apache_title_shm_${pid}_${tid}_* 2>/dev/null`; do
			found=yes
			title=`/usr/bin/tr -d '\0' < $shm`
			thread_id=`/bin/basename "${shm}" | sed "s/apache_title_shm_${pid}_${tid}_//"`
			echo "$pid.$tid - $thread_id - $title"
		break
		done
	if [ "$found" = "no" ]; then
		echo "$pid.$tid not found"
	fi
    done
done
```
</div>
Here are the examples of saved by module:
<div class="notranslate">

```
# sh proctitles_info.sh
571258.571258 NOT FOUND
571300.571300 NOT FOUND
571303.571303 - 000000000000000 - 1466513333.6 test.cloudlinux.com GET /1.php HTTP/1.1
571304.571304 - 000000000000000 - 1466513335.3 test.cloudlinux.com GET /1.php HTTP/1.1
571305.571305 - 000000000000000 - httpd
571306.571306 - 000000000000000 - httpd
571307.571307 - 000000000000000 - httpd
571372.571372 - 000000000000000 - httpd
571374.571374 - 000000000000000 - httpd

Item info:
[pid].[tid] - [posix thread id] - [request info]
```
</div>

Request information can contain:

<span class="notranslate"> _NOT FOUND_ </span> - means that process of Apache doesn't handle requests.<br>
<span class="notranslate"> _httpd_ </span> - request is active and waiting for new connection.<br>
<span class="notranslate"> _[seconds].[tenths of second] [host] [METHOD] [URL] [PROTOCOL]_ </span>

#### Tuning parameters

**Module parameters for tuning**

| | |
|-|-|
|WatchHandlers | List of handlers for monitoring (httpd.conf, virtualhost).|
|ProctitleUseFilter On/Off | Use old method of cleaning information or new via filter (for prefork better to use <span class="notranslate"> Off </span> )|

### alt-suexec

**What is <span class="notranslate">alt-suexec</span> package needed for?**

If you use standard httpd from our repository, but your users' sites do not match standard Apache location of <span class="notranslate">`/var/www`</span>, then you should use alt-suexec.
alt-suexec package brings suEXEC binaries pre-compiled for specific locations, like <span class="notranslate"> /home </span> .

**How to switch suEXEC with alt-suexec**

Based on httpd 2.2.16 basic for Cloudlinux 6, httpd 2.4.6 basic for CloudLinux 7 and httpd 2.4.37 basic for CloudLinux 8, the package brings to a server a set of suEXECs with different <span class="notranslate">DOCUMENT ROOTs</span> and <span class="notranslate">MIN_UID/MIN_GID</span> parameters. The first set of suEXECs is listed by such modes:

<div class="notranslate">

```
# switch_suexec -h
USE_BIZ - DOCUMENT ROOT /biz/ MIN_UID 500 MIN_GID 100 CALLER apache
USE_HOSTING - DOCUMENT ROOT /hosting/ MIN_UID 500 MIN_GID 100 CALLER apache
USE_HSPHERE - DOCUMENT ROOT /hsphere/local MIN_UID 100 MIN_GID 100 CALLER httpd
USE_HOME - DOCUMENT ROOT /home/ MIN_UID 500 MIN_GID 100 CALLER apache
USE_WWW - DOCUMENT ROOT /var/www/ MIN_UID 500 MIN_GID 100 CALLER apache
USE_FSROOT - DOCUMENT ROOT / MIN_UID 500 MIN_GID 100 CALLER apache
USE_STORAGE - DOCUMENT ROOT /storage/content/ MIN_UID 500 MIN_GID 100 CALLER apache
USE_DATAS - DOCUMENT ROOT /datas/ MIN_UID 500 MIN_GID 100 CALLER apache
```
</div>
The package also brings its own utility for installing specific suEXEC:

| | |
|-|-|
|-l | list of available suexec|
|-u | update suexec according to <span class="notranslate"> /etc/sysconfig/alt-suexec </span>|
|-s | set new suexec and install it|
|-p | set new suexec path and install it|
|-o | set new suexec owners and install it|
|-r | restore native apache suexec|

There are two ways to set up new suEXEC binary:

1) via config file <span class="notranslate"> _/etc/sysconfig/alt-suexec_ </span>
2) via utility _switch_suexec_

Here are the examples of how to set up suEXEC with <span class="notranslate"> DOC_ROOT = "/home": </span>

**1.**

1) add string <span class="notranslate"> "USE_HOME" </span> to <span class="notranslate"> _/etc/sysconfig/alt-suexec_   </span>
2) run the command <span class="notranslate"> switch_suexec -u </span>

**2.**

1) <span class="notranslate"> switch_suexec -sUSE_HOME </span>

Result of both methods:
<div class="notranslate">

```
# cat /etc/sysconfig/alt-suexec
USE_HOME
```
</div>

Here is standard suEXEC for CloudLinux 6 clean server:
<div class="notranslate">

``` 
# /usr/sbin/suexec -V
-D AP_DOC_ROOT="/var/www"
-D AP_GID_MIN=100
-D AP_HTTPD_USER="apache"
-D AP_LOG_EXEC="/var/log/httpd/suexec.log"
-D AP_SAFE_PATH="/usr/local/bin:/usr/bin:/bin"
-D AP_UID_MIN=500
-D AP_USERDIR_SUFFIX="public_html"
-D AP_SAFE_DIRECTORY="/usr/local/safe-bin"
```
</div>

Here is output of new suEXEC after <span class="notranslate"> USE_HOME </span> installtion:
<div class="notranslate">

``` 
# /usr/sbin/suexec -V
-D AP_DOC_ROOT="/home/"
-D AP_GID_MIN=100
-D AP_HTTPD_USER="apache"
-D AP_LOG_EXEC="/var/log/httpd/suexec.log"
-D AP_SAFE_PATH="/usr/local/bin:/usr/bin:/bin"
-D AP_UID_MIN=500
-D AP_USERDIR_SUFFIX="public_html"
-D AP_SAFE_DIRECTORY="/usr/local/safe-bin"
```
</div>

Description of other switch_suexec parameters:

| | |
|-|-|
|-p | if suexec binary file will be placed not in standard way <span class="notranslate"> /usr/sbin </span> - specify this new path with p-option|
|-o | if suexec binary file not owned by <span class="notranslate"> root:apache </span> - specify new owner with o-option|

For most cases -p and -o options for standard Apache are useless.

Correct suEXEC will be restored even after httpd update or reinstall.

List of pre-built suEXEC binary files stored without suid bit and not executable.

**How to install alt-suexec?**

For installation run the command:
<div class="notranslate">

```
yum install alt-suexec
```
</div>

**New suexec with custom parameters**

If you need suEXEC with custom parameters absent in current set of alt-suexec, please submit a ticket on [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com/) and we will add new suEXEC with needed parameters.

### cPanel Nginx and application selectors

Recently, cPanel added support for the [Nginx](https://documentation.cpanel.net/display/CKB/Nginx) web server and for [Python](https://documentation.cpanel.net/display/CKB/How+to+Install+a+Python+WSGI+Application) and [Node.js](https://documentation.cpanel.net/display/CKB/How+to+Install+a+Node.js+Application) applications. 

We have checked the compatibility of ea-nginx and cPanel application Selectors with CloudLinux LVE and CageFS.
All tests passed successfully and all processes started by ea-nginx and cPanel selectors are launched inside LVE and CageFS.


Don’t forget, you can use Ruby/Python/Node.js Selectors from CloudLinux. Here you can find a large number of supported versions for Ruby/Python/Node.js applications.

* [CloudLinux Python Selector](/cloudlinux_os_components/#python-selector)
* [CloudLinux Ruby Selector](/cloudlinux_os_components/#ruby-selector)
* [CloudLinux NodeJS Selector](/cloudlinux_os_components/#node-js-selector)

:::tip Note
Nginx support is currently experimental.
:::

### How to use Certbot with alt-python36

To run Certbot with <span class="notranslate">`alt-python36`</span>, follow the next steps:

1. Add a path to the <span class="notranslate">`alt-python36`</span> in the environment variable <span class="notranslate">`PATH`</span> as the first element: <span class="notranslate">`/opt/alt/python36/bin/`</span>.
2. Run Certbot with the <span class="notranslate">`--no-bootstrap`</span> parameter.

**Example:**

The old command to run Certbot on CentOS 6/Cloudlinux OS 6:

<div class="notranslate">

```
# certbot-auto --nginx
```
</div>

The new command to run Certbot on CentOS 6/CloudLinux OS 6:

<div class="notranslate">

```
# PATH="/opt/alt/python36/bin/:$PATH" certbot-auto --no-bootstrap --nginx
```
</div>

## Apache suexec module

### General information and requirements

* [How does it work with CloudLinux?](/cloudlinux_os_components/#how-does-it-work-with-cloudlinux)

This module is used by the Apache HTTP Server to switch to another user before executing CGI programs. The suEXEC feature provides users of the Apache HTTP Server with the ability to run CGI and SSI programs under user IDs different from the user ID of the calling web server (<span class="notranslate">apache/nobody</span>). Normally, when a CGI or SSI program executes, it runs as the same user who is running the web server.

If we are talking about shared hosting where different accounts are launched on the same server, the installation of this module is necessary to ensure security.

#### How does it work with CloudLinux?

The DirectAdmin and CloudLinux (for httpd, httpd24-httpd and cPanel EasyApache 4) both provide a patched version of suexec. For other distributions you can use patches available here:
[https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/da/cl-apache-patches.tar.gz)

1. Besides the ability to run CGI programs under user IDs, suexec with CloudLinux patch adds the ability to run that script under CageFS. 
  :::tip NOTE
  Therefore, this module is necessary for the proper work of PHP Selector.
  :::
2. This module is also necessary for the proper work of mod_hostinglimits. The <span class="notranslate">`SuexecUserGroup`</span> directive indicates for `mod_hostinglimits` in which LVE the user process should be put in.


### Configuration

**SuexecUserGroup Directive**

**Syntax**: <span class="notranslate">SuexecUserGroup User Group</span>

**Context**: `httpd.conf`, `virtualhost`

**Description**: The SuexecUserGroup directive allows you to specify a user and a group for CGI programs to run as. Startup will fail if this directive is specified but the suEXEC feature is disabled.

::: warning Note
Control panels such as cPanel, Plesk, and DirectAdmin add this directive to the Apache configuration automatically when creating a domain. If you use the server without a control panel, make sure this directive is added for each virtual host.
:::


### Installation

The <span class="notranslate">`mod_suexec`</span> installation process varies depending on the control panel and Apache.

* [Installing on cPanel servers with EasyApache 4](/cloudlinux_os_components/#installing-on-cpanel-servers-with-easyapache-4-2)
  * [Via command line](/cloudlinux_os_components/#via-command-line)
  * [Via administrator interface](/cloudlinux_os_components/#via-administrator-interface)
* [Installing on Plesk servers](/cloudlinux_os_components/#installing-on-plesk-servers-2)
* [Installing on DirectAdmin servers](/cloudlinux_os_components/#installing-on-directadmin-servers-2)
* [Installing on servers with no control panel](/cloudlinux_os_components/#installing-on-servers-with-no-control-panel-2)

#### Installing on cPanel servers with EasyApache 4

#### Via command line

1. Install `mod_suexec` through YUM package manager as follows:

  <div class="notranslate">
  
  ```
  $ yum install ea-apache24-mod_suexec
  ```
  </div>

  :::warning NOTE
  `ea-apache24-mod_suexec` conflicts with the `mod_ruid2` therefore, before installing the module, remove `ea-apache24-mod_ruid2` as follows: <span class="notranslate">`$ yum remove ea-apache24-mod_ruid2`</span>
  :::

2. Now, when the module is installed, restart Apache:

  <div class="notranslate">
  
  ``` 
  $ service httpd restart
  ```
  </div>

  :::tip Note
  If you use CageFS + PHP Selector, you should run the <span class="notranslate">`cagefsctl --force-update`</span> command.
  :::

#### Via administrator interface

1. Open EasyApache4 page.
2. Click <span class="notranslate">_Customize_</span> for <span class="notranslate">_Currently installed Packages_</span>.

  ![](/images/mod_suexec_admin_ui_1.png)

3. Click <span class="notranslate">_Apache Modules_</span>. Find <span class="notranslate">`mod_suexec`</span> and click <span class="notranslate">_Yes_</span> to install it.

  ![](/images/mod_suexec_admin_ui_2.png)

4. Select <span class="notranslate">_Review_</span> and <span class="notranslate">_Provision_</span>.

  ![](/images/mod_suexec_admin_ui_3.png)

5. Wait while <span class="notranslate">_Provision_</span> will be finished.
   
   :::tip Note
   If you use CageFS + PHP Selector, you should run the <span class="notranslate">`cagefsctl --force-update`</span> command.
   :::

#### Installing on Plesk servers

This module is integrated into Apache for Plesk control panel by default.

#### Installing on DirectAdmin servers

This module is integrated into Apache for DirectAdmin control panel by default.

#### Installing on servers with no control panel

This module is integrated into httpd Apache rpm provided by Cloudlinux by default.

If you are using an alternative Apache - [httpd24](https://www.cloudlinux.com/cloudlinux-os-blog/entry/httpd24-updated-for-cloudlinux-6), nothing has to be done as this module is also integrated into httpd24-httpd Apache rpm provided by Cloudlinux by default.

