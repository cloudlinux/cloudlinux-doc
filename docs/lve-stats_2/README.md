# LVE-Stats 2

### Why is it needed?

* Old LVE-statistics store averages as integer numbers, as % of <span class="notranslate">CPU</span> usage. If user used 100% of <span class="notranslate">CPU</span> for 1 second within an hour, it is only 1-2% for a minute, and 0 for 5 minutes. Data in old LVE-statistics is aggregated to 1-hour intervals. So, such peak load will noExat be recorded and we need to store data with much higher precision.
* 100% <span class="notranslate">CPU</span> usage in old lve statistics means “all cores”. On 32 core servers usage is not visible for most users (as they are limited to 1 core).
* Old LVE-statistics does not provide a way to determine a cause of LVE faults, i.e. what processes are running when user hits LVE limits.Example
* Notifications in old LVE-statistics are not accurate because they are based on average values for <span class="notranslate">CPU, IO, IOPS.</span>
* Old LVE-statistics functionality is hard to extend.

### Major improvements and features

* increased precision of statistics;
* <span class="notranslate">CPU</span> usage is calculated  in terms of % of a single core (100% usage means one core);
* lvestats-server emulates and tracks faults for <span class="notranslate">CPU, IO, IOPS</span>;
* lvestats-server saves “snapshots” of user’s processes and queries for each “incident” - added new lve-read-snapshot utility;
* improved notifications about hitting LVE limits (more informative and without false positives);
* implemented ability to add custom plugins;
* MySQL and <span class="notranslate">PostGreSQL</span> support;
* more pretty, scalable, interactive charts;
* snapshots include HTTP-requests.

### What features will be implemented in the future?

* Notifications for control panels other than CPanel.
* Burstable Limits/server health: We are monitoring server health ( <span class="notranslate"> LA </span> , <span class="notranslate"> memory </span> , idle <span class="notranslate"> CPU </span> ) and automatically decreasing/increasing limits based on server health.
* <span class="notranslate">Reseller Limits</span>: plugin would analyze usage per group of users (reseller’s usage), and do actions.
* Suspend/notify plugin: would detect that user is being throttled for 10 minutes, and suspend him (just because), or notify, or increase limits.


## Installation

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

### Downgrade

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

## Configuration

Main configuration file <span class="notranslate">`/etc/sysconfig/lvestats2`</span> contains the following options:

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

Configuration files for plugins are located in <span class="notranslate">`/etc/sysconfig/lvestats.config`</span> directory.

<span class="notranslate">`/etc/sysconfig/lvestats.config/SnapshotSaver.cfg`</span> contains the following options:

* <span class="notranslate">`period_between_incidents`</span> - the minimal interval of time between incidents (in seconds). If minimal interval of time between LVE faults is greater than value specified, than new "incident" will begin and new snapshots will be saved. Default value is 300 seconds.
* <span class="notranslate">`snapshots_per_minute`</span> - the maximum number of snapshots saved per minute for specific LVE id (default is `2`).
* <span class="notranslate">`max_snapshots_per_incident`</span> - the maximum number of snapshots saved for one "incident". Default is `10`.

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
* <span class="notranslate">`NOTIFY_CHARSET_EMAIL`</span> – charset type for email. Available for <span class="notranslate">__lve-stats-2.9.4-1__</span> and later. Default is <span class="notranslate">`us-ascii`</span>. For example: <span class="notranslate">`NOTIFY_CHARSET_EMAIL=utf-8`</span>

These values can also be set using [cloudlinux-config CLI](/command-line_tools/#cloudlinux-config) utility

Templates of notifications are located here:

* <span class="notranslate">`/usr/share/lve/emails/en_US/admin_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/reseller_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/user_notify.txt`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/admin_notify.html`</span>
* <span class="notranslate">`/usr/share/lve/emails/en_US/reseller_notify.html`</span>

:::tip Note
Notifications about LVE faults are implemented for CPanel only.
:::

After changing any options above, please restart <span class="notranslate">lvestats</span> service:

<div class="notranslate">

```
service lvestats restart
```
</div>

<span class="notranslate">`/etc/logrotate.d/lvestats`</span> - configuration file for <span class="notranslate">`/var/log/lve-stats.log rotation`</span>

### LVE Stats2 and MySQL DB Server Compatible Work Setup

:::tip Note
Run all the commands below under root.
:::

**1. MySQL Server Setup**

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


**2. Database Setup**

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

**3.** <span class="notranslate">**LVE Stats 2**</span> **Setup**

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


**4. Additional Security Settings**

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


**5. Using Special Characters in Database Password**

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


### LVE Stats 2 and PostgreSQL DB Server Compatible Work Setup


:::tip Note
Run all the commands below under <span class="notranslate">root</span>.
:::

**1.** **<span class="notranslate">PostgreSQL</span>** **Server Installation and Setup**

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


**2. DB for** <span class="notranslate">**lve-stats-2.x**</span> **- Creating and Setup**

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

**3.** <span class="notranslate">**Lve-stats-2.x**</span> **Setup**

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

**4. Additional Security Settings**

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


**5. Using Special Characters in Database Password**

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

### Customize lve-stats-2 notifications 

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

## Command-line Tools

| | |
|-|-|
|<span class="notranslate"> `/usr/sbin/lveinfo` </span> |utility to display historical information about LVE usage.|
|<span class="notranslate"> `/usr/sbin/lvechart` </span> |creates a chart representing LVE usage for user.|
|<span class="notranslate"> `/usr/sbin/dbgovchart` </span> |creates a chart representing MySQL usage for user.|
|<span class="notranslate"> `/usr/sbin/lve-read-snapshot` </span> |displays information from system state (snapshots) for user.|
|<span class="notranslate"> `/usr/sbin/lve-create-db` </span> |creates/recreates database for <span class="notranslate">lve-stats</span>.|
|<span class="notranslate"> `/usr/sbin/cloudlinux-top` </span> |utility provides information about current MySQL and LVE usage of a running system in JSON format.|
|<span class="notranslate"> `/usr/sbin/cloudlinux-statistics` </span> |utility provides historical information about resource usage.|

<div class="notranslate">

### lveinfo

</div>

:::tip Note
<span class="notranslate">lve-stats-2.2-2</span>
:::

**Usage**

<div class="notranslate">

```
lveinfo [-h] [-v] [--dbgov DBGOV] [-f YYYY-MM-DD[HH:MM]]

              [-t YYYY-MM-DD[HH:MM]] [--period PERIOD] [-u USER | --id ID]

              [-d] [-o ALIAS] [-b ALIAS [ALIAS ...]] [-p 0..100]

              [--by-fault ALIAS [ALIAS ...]] [-r FAULTS]

              [--style {user,admin}] [-l LIMIT] [-c [PATH] | -j]

              [--server_id SERVER_ID] [--servers-info]

              [--show-all | --show-columns COLUMN_NAME [COLUMN_NAME ...]]

              [--time-unit TIME_UNIT] [-m {v1,v2}]

              [--blank-value [BLANK_VALUE]]
```
</div>

<span class="notranslate">`lveinfo`</span> is an utility to display historical information about LVE usage.

**Optional arguments**

* <span class="notranslate"> `-h, --help` </span> – show this help message and exit
* <span class="notranslate"> `-v, --version` </span> – show program's version number and exit
* <span class="notranslate"> `--dbgov DBGOV` </span> – show <span class="notranslate"> MySql Governor</span> statistic
* <span class="notranslate"> `-u USER, --user USER` </span> – use username instead of <span class="notranslate"> LVE id</span>, and show only record for that user
* <span class="notranslate"> `--id ID` </span> – will display record only for that <span class="notranslate"> LVE id</span>
* <span class="notranslate"> `-d, --display-username` </span> – try to convert <span class="notranslate"> LVE id</span> into username when possible
* <span class="notranslate"> `-o ALIAS, --order-by ALIAS` </span> – orders results by one of the following:
  | | | |
  |-|-|-|
  |<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|DESCRIPTION|
  |<span class="notranslate">`cpu_avg`</span>|<span class="notranslate">`aCPU`</span>|average CPU usage|
  |<span class="notranslate">`cpu_max`</span>|<span class="notranslate">`mCPU`</span>|max CPU usage|
  |<span class="notranslate">`total_cpu_faults`</span>|<span class="notranslate">`CPUf`</span>|total number of max CPU usage faults|
  |<span class="notranslate">`vmem_avg`</span>|<span class="notranslate">`aVMem`</span>|average virtual memory usage||<span class="notranslate">`vmem_max`</span>|<span class="notranslate">`mVMem`</span>|average virtual memory usage||<span class="notranslate">`total_vmem_faults`</span>|<span class="notranslate">`VMemF`</span>|total number of out of virtual memory faults|
  |<span class="notranslate">`mep_avg`</span>|<span class="notranslate">`aEP`</span>|average number of entry processes (concurrent connections)|
  |<span class="notranslate">`mep_max`</span>|<span class="notranslate">`mEP`</span>|max number of entry processes (concurrent connections)|
  |<span class="notranslate">`total_ep_faults`</span>|<span class="notranslate">`EPf`</span>|total number of max entry processes faults|
  |<span class="notranslate">`pmem_avg`</span>|<span class="notranslate">`aPMem`</span>|average physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`pmem_max`</span>|<span class="notranslate">`mPMem`</span>|max physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`nproc_avg`</span>|<span class="notranslate">`aNproc`</span>|average number of processes (LVE version >= 6)|
  |<span class="notranslate">`nproc_max`</span>|<span class="notranslate">`mNproc`</span>|max number of processes (LVE version >= 6)|
  |<span class="notranslate">`io_avg`</span>|<span class="notranslate">`aIO`</span>|average io usage (LVE version >= 6)|
  |<span class="notranslate">`io_max`</span>|<span class="notranslate">`mIO`</span>|max io usage (LVE version >= 6)|
  |<span class="notranslate">`total_pmem_faults`</span>|<span class="notranslate">`PMemF`</span>|total number of out of physical memory faults (LVE version >= 6)|
  |<span class="notranslate">`total_nproc_faults`</span>|<span class="notranslate">`NprocF`</span>|total number of max processes faults (LVE version >= 6)|
  |<span class="notranslate">`total_io_faults`</span>|<span class="notranslate">`IOf`</span>|total number of max io faults (LVE version >= 6)|
  |<span class="notranslate">`iops_avg`</span>|<span class="notranslate">`aIOPS`</span>|average io operations (LVE version >= 8)|
  |<span class="notranslate">`iops_max`</span>|<span class="notranslate">`mIOPS`</span>|max io operations (LVE version >= 8)|
  |<span class="notranslate">`total_iops_faults`</span>|<span class="notranslate">`IOPSf`</span>|total number of max io operations faults (LVE version >= 8)|
  |<span class="notranslate">`any_faults`</span>|<span class="notranslate">`anyF`</span>|total number of faults of all types|
* <span class="notranslate"> `-b ALIAS [ALIAS ...]` `--by-usage ALIAS [ALIAS ...]`</span> – show LVEs with usage (averaged) within 90 percent of the limit available values:

  | | | | |
  |-|-|-|-|
  |<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|DESCRIPTION|
  |<span class="notranslate">`cpu_avg`</span>|<span class="notranslate">`cpu`</span>|<span class="notranslate">`aCPU`</span>|average CPU usage|
  |<span class="notranslate">`cpu_max`</span>|<span class="notranslate">`cpu_max`</span>|<span class="notranslate">`mCPU`</span>|max CPU usage|
  |<span class="notranslate">`vmem_avg`</span>|<span class="notranslate">`vmem`</span>|<span class="notranslate">`aVMem`</span>|average virtual memory usage|
  |<span class="notranslate">`vmem_max`</span>|<span class="notranslate">`vmem_max`</span>|<span class="notranslate">`mVMem`</span>|max virtual memory usage|
  |<span class="notranslate">`mep_avg`</span>|<span class="notranslate">`mep`</span>|<span class="notranslate">`aEP`</span>|average number of entry processes (concurrent connections)|
  |<span class="notranslate">`mep_max`</span>|<span class="notranslate">`mep_max`</span>|<span class="notranslate">`mEP`</span>|max number of entry processes (concurrent connections)|
  |<span class="notranslate">`pmem_avg`</span>|<span class="notranslate">`pmem`</span>|<span class="notranslate">`aPMem`</span>|average physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`pmem_max`</span>|<span class="notranslate">`pmem_max`</span>|<span class="notranslate">`mPMem`</span>|max physical memory usage (LVE version >= 6)|
  |<span class="notranslate">`nproc_avg`</span>|<span class="notranslate">`nproc`</span>|<span class="notranslate">`aNproc`</span>|average number of processes (LVE version >= 6)|
  |<span class="notranslate">`nproc_max`</span>|<span class="notranslate">`nproc_max`</span>|<span class="notranslate">`mNproc`</span>|max number of processes (LVE version >= 6)|
  |<span class="notranslate">`io_avg`</span>|<span class="notranslate">`io`</span>|<span class="notranslate">`aIO`</span>|average io usage (LVE version >= 6)|
  |<span class="notranslate">`io_max`</span>|<span class="notranslate">`io_max`</span>|<span class="notranslate">`mIO`</span>|max io usage (LVE version >= 6)|
  |<span class="notranslate">`iops_avg`</span>|<span class="notranslate">`iops`</span>|<span class="notranslate">`aIOPS`</span>|average io operations (LVE version >= 8)|
  |<span class="notranslate">`iops_max`</span>|<span class="notranslate">`iops_max`</span>|<span class="notranslate">`mIOPS`</span>|max io operations (LVE version >= 8)|

* <span class="notranslate">`-p 0..100`, `--percentage 0..100`</span> – defines percentage for <span class="notranslate">`--by-usage`</span> option; default `90`
* <span class="notranslate"> `--style {user,admin}` </span> – deprecated, not used.
* <span class="notranslate"> `-l LIMIT`, `--limit LIMIT` </span> – max number of results to display, `10` by default, if `0` no limit
* <span class="notranslate"> `-c [PATH]`, `--csv [PATH]` </span> – save statistics in CSV format; `-` by default (output to screen)
* <span class="notranslate"> `-j`, `--json` </span> – display output in JSON format
* <span class="notranslate"> `--server_id SERVER_ID` </span> – used with central database for multiple servers, default <span class="notranslate">`localhost`</span>
* <span class="notranslate"> `--servers-info` </span> – show servers LVE versions
* <span class="notranslate"> `--show-all` </span> – full output (show all limits); brief output is default; equivalent <span class="notranslate">`--show-columns all`</span>
* <span class="notranslate"> `-show-columns COLUMN_NAME [COLUMN_NAME ...]` </span> – show only the listed columns; <span class="notranslate">`all`</span> for all supported columns
  
  | | |
  |-|-|
  |<span class="notranslate">COLUMN_NAME</span> |DESCRIPTION|
  |<span class="notranslate"> `From ` </span> |Show start period statistics|
  |<span class="notranslate"> `To  ` </span> |Show end period statistics|
  |<span class="notranslate"> `ID ` </span> |LVE Id or username|
  |<span class="notranslate"> `aCPU` </span> |Average <span class="notranslate"> CPU</span> usage|
  |<span class="notranslate"> `uCPU` </span> |The percentage of user-allocated resource <span class="notranslate">CPU</span>|
  |<span class="notranslate"> `mCPU` </span> |deprecated|
  |<span class="notranslate"> `lCPU` </span> |<span class="notranslate">CPU</span> limit|
  |<span class="notranslate">`CPUf`</span> |Out Of <span class="notranslate">CPU</span> usage Faults|
  |<span class="notranslate">`aEP`</span> | Average Entry Processes|
  |<span class="notranslate">`uEP` </span> |The percentage of user-allocated resource Entry processes|
  |<span class="notranslate">`mEP` </span> |deprecated|
  |<span class="notranslate">`lEP` </span> |maxEntryProc limit|
  |<span class="notranslate">`aVMem` </span> |Average Virtual Memory Usage|
  |<span class="notranslate">`uVMem ` </span> |The percentage of user-allocated resource Virtual Memory|
  |<span class="notranslate">`mVMem` </span> |deprecated|
  |<span class="notranslate">`lVMem` </span> |Virtual Memory Limit|
  |<span class="notranslate">`VMemF` </span> |Out Of Memory Faults|
  |<span class="notranslate">`EPf` </span> |Entry processes faults|
  |<span class="notranslate">`aPMem` </span> |Average Physical Memory Usage (LVE version >= 6)|
  |<span class="notranslate">`uPMem` </span> |The percentage of user-allocated resource Physical Memory (LVE version >= 6)|
  |<span class="notranslate">`mPMem` </span> |deprecated (LVE version >= 6)|
  |<span class="notranslate">`lPMem` </span> |Physical Memory Limit (LVE version >= 6)|
  |<span class="notranslate">`aNproc` </span> |Average Number of processes (LVE version >= 6)|
  |<span class="notranslate">`uNproc` </span> |The percentage of user-allocated resource Number of processes (LVE version >= 6)|
  |<span class="notranslate">`mNproc` </span> |deprecated (LVE version >= 6)|
  |<span class="notranslate">`lNproc` </span> |Limit of Number of processes (LVE version >= 6)|
  |<span class="notranslate">`PMemF` </span> |Out Of Physical Memory Faults (LVE version >= 6)|
  |<span class="notranslate">`NprocF` </span> |Number of processes faults (LVE version >= 6)|
  |<span class="notranslate">`aIO` </span> |Average <span class="notranslate">I/O</span> (LVE version >= 6)|
  |<span class="notranslate">`uIO` </span> |The percentage of user-allocated resource <span class="notranslate">I/O</span> (LVE version >= 6)|
  |<span class="notranslate">`mIO` </span> |deprecated (LVE version >= 6)|
  |<span class="notranslate">`lIO` </span> |<span class="notranslate">I/O</span> Limit (LVE version >= 6)|
  |<span class="notranslate">`IOf` </span> |Out Of <span class="notranslate">I/O</span> usage Faults (LVE version >= 6)|
  |<span class="notranslate">`aIOPS` </span> |Average <span class="notranslate">I/O</span> Operations (LVE version >= 8)|
  |<span class="notranslate">`mIOPS` </span> |deprecated (LVE version >= 8)|
  |<span class="notranslate">`uIOPS` </span> |The percentage of user-allocated resource <span class="notranslate">I/O</span> Operations (LVE version >= 8)|
  |<span class="notranslate">`lIOPS` </span> |<span class="notranslate">I/O</span> Operations Limit (LVE version >= 8) </span>|
  |<span class="notranslate">`IOPSf` </span> |Out Of <span class="notranslate">I/O</span> Operations Faults (LVE version >= 8)|

* <span class="notranslate"> `--time-unit TIME_UNIT` </span> – time step for grouping statistic in minutes; 1 min., by default; can use <span class="notranslate">`m\|h\|d`</span> suffixes; for example: `1h or 1h30m or 1d12h`
* <span class="notranslate"> `-m {v1,v2}`, `--compat {v1,v2}` </span> – `v1` - return old output mode; `v2` - new mode; default `v1`; you can change default in config
* <span class="notranslate"> `--blank-value [BLANK_VALUE]` </span> – Use to fill unsupported limits; default `-`
* <span class="notranslate"> `-f YYYY-MM-DD[ HH:MM]`,  `--from YYYY-MM-DD[ HH:MM]`</span> – run report from date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present last 10 minutes are assumed
* <span class="notranslate"> `-t YYYY-MM-DD[ HH:MM]`,  `--to YYYY-MM-DD[ HH:MM]`</span> – run report up to date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present, reports results up to now
* <span class="notranslate"> `--period PERIOD` </span> – time period; specify minutes with <span class="notranslate"> `m`, `h`</span> - hours, days with <span class="notranslate"> `d`</span>, and values: <span class="notranslate"> `today`, `yesterday`; `5m`</span> - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as <span class="notranslate"> `today`</span>
* <span class="notranslate"> `--by-fault ALIAS [ALIAS ...]` </span> – show LVEs which failed on max processes limit or memory limit
  
  | | | | |
  |-|-|-|-|
  |<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|<span class="notranslate">ALIAS</span>|DESCRIPTION|
  |<span class="notranslate">`mcpu`</span>|<span class="notranslate">`cpu`</span>|<span class="notranslate">`CPUf`</span>|total number of max CPU usage faults|
  |<span class="notranslate">`mem`</span>|<span class="notranslate">`vmem`</span>|<span class="notranslate">`VMemF`</span>|total number of out of virtual memory faults|
  |<span class="notranslate">`mep`</span>|<span class="notranslate">`ep`</span>|<span class="notranslate">`EPf`</span>|total number of max entry processes faults|
  |<span class="notranslate">`pmem`</span>|<span class="notranslate">`pmem`</span>|<span class="notranslate">`PMemF`</span>|total number of out of physical memory faults (LVE version >= 6)|
  |<span class="notranslate">`nproc`</span>|<span class="notranslate">`nproc`</span>|<span class="notranslate">`NprocF`</span>|total number of max processes faults (LVE version >= 6)|
  |<span class="notranslate">`io`</span>|<span class="notranslate">`io`</span>|<span class="notranslate">`IOf`</span>|total number of max io faults (LVE version >= 6)|
  |<span class="notranslate">`iops`</span>|<span class="notranslate">`iops`</span>|<span class="notranslate">`IOPSf`</span>|total number of max io operations faults (LVE version >= 8)|
  |<span class="notranslate">`any_faults`</span>|<span class="notranslate">`any`</span>|<span class="notranslate">`anyF`</span>|total number of faults of all types|
* <span class="notranslate"> `-r FAULTS, --threshold FAULTS` </span>– in combination with <span class="notranslate">`--by-fault`</span>, shows only LVEs with number of faults above; default `1`
  
Prefixes <span class="notranslate">`Kb`, `Mb` </span> and <span class="notranslate">`Gb`</span> indicates powers of 1024.

:::tip Note
All <span class="notranslate">ALIAS</span> options are not case sensitive.
:::

<div class="notranslate">

### lvechart

</div>

`/usr/sbin/lvechart` - creates a chart representing LVE usage for user.

**Usage**

<div class="notranslate">

```
/usr/sbin/lvechart [OPTIONS]
```
</div>

**Acceptable options**

| | |
|-|-|
|<span class="notranslate"> `--help ` </span> |This help screen|
|<span class="notranslate"> `--version` </span> |Version number|
|<span class="notranslate"> `--from` </span> |Run report from date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, last 10 minutes are assumed)|
|<span class="notranslate"> `--to=` </span> |Run report up to date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, reports results up to now)|
|<span class="notranslate"> `--period=` </span> |Time period: specify minutes with `m`, `h` - hours, days with `d`, and values: <span class="notranslate">`today`</span>, <span class="notranslate">`yesterday`</span>; `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as today|
|<span class="notranslate"> `--id= ` </span> |<span class="notranslate">`LVE id`</span> will display record only for that <span class="notranslate">LVE id</span>|
|<span class="notranslate"> `--user=` </span> |Use username instead of <span class="notranslate"> LVE id </span>, and show only record for that user|
|<span class="notranslate"> `--server= ` </span> |<span class="notranslate">`Server id`</span> will display record for that server, instead of default (current)|
|<span class="notranslate"> `--output= ` </span> |Filename to save chart as, if not present, output will be sent to STDOUT|
|<span class="notranslate"> `--show-all` </span> |Show all graphs (by default shows graphs for which limits are set)|
|<span class="notranslate"> `--style=` </span> |<span class="notranslate">`admin`, `user`</span> set chart style,  <span class="notranslate">CPU</span> limits are normalized to 100% in user’s style|
|<span class="notranslate"> `--format=` </span> |<span class="notranslate">`svg`, `png`</span> set chart output format|

<div class="notranslate">

### dbgovchart

</div>


`/usr/sbin/dbgovchart` - creates a chart representing MySQL usage for user.`

**Usage**

<div class="notranslate">

```
/usr/sbin/dbgovchart [OPTIONS]
```
</div>

**Acceptable options**

| | |
|-|-|
|<span class="notranslate"> `--help ` </span> |This help screen|
|<span class="notranslate"> `--version` </span> |Version number|
|<span class="notranslate"> `--from=` </span> |Run report from date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, last 10 minutes are assumed)|
|<span class="notranslate"> `--to=` </span> |Run report up to date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format (if not present, reports results up to now)|
|<span class="notranslate"> `--period=` </span> |Time period: specify minutes with `m`,  `h` - hours, days with `d`, and values: <span class="notranslate">`today`</span>, <span class="notranslate">`yesterday`</span>; `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as today`|
|<span class="notranslate"> `--user=` </span> |mysql username|
|<span class="notranslate"> `--output= ` </span> |Filename to save chart as, if not present, output will be sent to <span class="notranslate">STDOUT</span>|
|<span class="notranslate"> `--show-all` </span> |Show all graphs (by default shows graphs for which limits are set)|
|<span class="notranslate"> `--server=` </span> | <span class="notranslate"> `Server id`</span> will display record for that server, instead of default (current)|
|<span class="notranslate"> `--style=` </span> | <span class="notranslate">`admin`, `user`</span> set chart style,  <span class="notranslate">CPU</span> limits are normalized to 100% in user’s style|
|<span class="notranslate"> `--format=` </span> | <span class="notranslate">`svg`, `png`</span> set chart output format|

<div class="notranslate">

### lve-read-snapshot

</div>

**Usage**

<div class="notranslate">

```
lve-read-snapshot [-h] [--version] [-f FROM [FROM ...]] [-t TO [TO ...]
                  [ -p PERIOD | --timestamp TIMESTAMP]
                  [-i ID | -u USER] [-l] [-o file] [-j] [--stats]
                  [--unit unit]
```
</div>

Reads LVE system state snapshots for <span class="notranslate">LVE/user</span>.

**Optional arguments**

* <span class="notranslate">`-h, --help`</span> – show this help message and exit
* <span class="notranslate">`--version`</span> – version number
* <span class="notranslate">`-f FROM [FROM ...]`, `--from FROM [FROM ...]`</span> – run report from date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format, if not present last 10 minutes are assumed (default: `2016-10-24 19:28`)
* <span class="notranslate">`-t TO [TO ...]`, `--to TO [TO ...]`</span> – run report up to date and time in <span class="notranslate">`YYYY-MM-DD HH:MM`</span> format, if not present, reports results up to now (default: `2016-10-24 19:38`)
* <span class="notranslate">`-p PERIOD`, `--period PERIOD`</span> – time period specify minutes with `m`, `h` - hours, days with `d`, and values: <span class="notranslate">`today`, `yesterday`</span>, `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, as well as today (default: `10m`)
* <span class="notranslate">`--timestamp TIMESTAMP`</span> – time stamp in unix format for get one snapshot (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-i ID, --id ID`</span> – LVE id to show records for (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-u USER`, `--user USER`</span> – user account to show records for (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-l`, `--list`</span> – show timestamp list only (default: <span class="notranslate"> `False`</span>)
* <span class="notranslate">`-o file`, `--output file`</span> – filename to save snaphots report to, if not present,output will be sent to <span class="notranslate">STDOUT</span> (default: <span class="notranslate">`None`</span>)
* <span class="notranslate">`-j`, `--json`</span> – output in json format (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--stats`</span> – output stats, instead of snapshots (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--unit unit`</span> – group stats by time unit. Example values `3h`, `24h`, `1d`, `1w`. Other possible value is <span class="notranslate">`auto`</span> for grouping by each incident (default: <span class="notranslate">`1d`</span>)
  
One of <span class="notranslate">`-u --user`</span> or <span class="notranslate">`-i --id`</span> should be specified.

<div class="notranslate">

### lve-create-db

</div>

**Usage**

<div class="notranslate">

```
lve-create-db [-h] [--recreate] [--print-sql]
                   [--update-serverid-prompt] [--update-serverid-auto]
                   [--validate]
```
</div>

Creates a database for <span class="notranslate">lve-stats</span>.

**Optional arguments**

* <span class="notranslate">`-h`, `--help`</span> – show this help message and exit
* <span class="notranslate">`--recreate`</span> – drops and recreates database even if tables exists (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--print-sql`</span> – prints sql and exits, without creating db (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--update-serverid-prompt`</span> – update exist server ID or create new one (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--update-serverid-auto`</span> – update exist server ID with <span class="notranslate">uuid</span> (default: <span class="notranslate">`False`</span>)
* <span class="notranslate">`--validate`</span> – check the correctness of the database structure (default: <span class="notranslate">`False`</span>)

### cloudlinux-top

Utility provides information about current MySQL and LVE usage of a running system in JSON format.

#### **Usage**

<div class="notranslate">

```
cloudlinux_top [-h] [-v] [-j] [--hide-mysql]
               [-u USERNAME | -r FOR_RESELLER] [-d DOMAIN] [-m MAX]
               [-o ORDER_BY]
```
</div>

**Optional arguments**

* <span class="notranslate"> `-h, --help` </span> – show this help message and exit
* <span class="notranslate"> `-v, --version`   </span> – show program version number and exit
* <span class="notranslate"> `-j, --json`   </span> – return data in JSON format
* <span class="notranslate"> `--hide-mysql`   </span> | `don't show MySQL related info
* <span class="notranslate"> `-u USERNAME`, `--username USERNAME` </span> – show data only for a specific user. Can be used to filter the output; returns users with username <span class="notranslate">`%USERNAME%`</span>
* <span class="notranslate"> `-r FOR_RESELLER`, `--for-reseller FOR_RESELLER` </span> – get information only about specified reseller and his users
* <span class="notranslate"> `-d DOMAIN`, `--domain DOMAIN` </span> – show data only for a specific domain. Can be used to filter the output; returns users with domain <span class="notranslate">`%DOMAIN%`</span>
* <span class="notranslate"> `-m MAX`, `--max MAX` </span> – show up to <span class="notranslate">`N`</span> records. If <span class="notranslate">`--max`</span> key is omitted. By default will show top 25 users
* <span class="notranslate"> `-o ORDER_BY`, `--order-by ORDER_BY` </span> – sort output by resource usage; available options: <span class="notranslate">`cpu`, `mysql_cpu`, `io`, `mysql_io`, `iops`, `ep`, `nproc`, `pmem`</span>

#### **Output format**

<div class="notranslate">

```
{
  "mySqlGov": "enabled",              # possible values: enabled, error
  "mySqlGovMode": "abusers",          # see “MySQL Governor > Modes Of Operation”
                                      # if MySQL Governor is not enabled, value is "none"
 
  "resellers": [                      # list of resellers (available only with
                                      # reseller limits feature)
      {
          "id": 1000020005,           # internal record id
          "limit": <lve_section>,     # current limits (last 5 seconds)
          "name": "reseller_name",    # reseller’s login in control panel
          "usage": <lve_section>      # current usage (last 5 seconds)
      }
  ],
  "result": "success",                # see the ‘errors handling’ section
  "timestamp": 1522858537.337549,
  "users": [
      {
          "domain": "domain.com",     # user’s primary domain (from control panel)
          "id": 20005,                # lve_id, same as user id in /etc/passwd file
          "limit": <lve_section>,     # limits for last 5 seconds
          "reseller": "reseler1",     # user’s reseller (from control panel)
          "usage": <lve_section>,     # usage for last 5 seconds
          "username": "user"          # username from /etc/passwd file or “N/A” if user
                                      # with such id does not exist
       }
   ]
 }
```
</div>

The structure<sup> *</sup> of <span class="notranslate">`<lve_section>`</span>:

<div class="notranslate">

```
{
"cpu": {
 "all": 50.0,      # CPU usage or limit (LVE only)
 "mysql": 0.0*     # CPU usage or limit (MySQL Governor only)
},
"ep": 1.0,           # number of entry processes
"io": {
 "all": 0.0,       # IO usage or limit (LVE only)
 "mysql": 0.0**     # IO usage or limit (MySQL Governor only)
},
"iops": 0.0,         # IO operations per second
"mem": 258048,       # memory usage or limit
"pno": 1.0           # number of processes
}
```
</div>


:::tip Note
* you can modify this structure using <span class="notranslate">`--show`</span> option, see [usage examples](/lve-stats_2/#examples) for details.
* MySQL values are only present when <span class="notranslate">MySQL Governor</span> statistics is available and <span class="notranslate">`--hide-mysql`</span> options is not used.
:::

#### **Units of measurement**

For <span class="notranslate">`limits`</span> and <span class="notranslate">`usage`</span> sections we use the following units of measurement.

| | |
|-|-|
|**Value** | **Units of measurement**|
|<span class="notranslate"> cpu (lve and mysql) </span> | percentage of one <span class="notranslate"> CPU </span> core|
|<span class="notranslate"> io (lve and mysql) </span> | bytes per second|
|<span class="notranslate"> iops </span> | number of <span class="notranslate"> IO </span> operations per second|
|<span class="notranslate"> mem </span> | bytes|
|<span class="notranslate"> ep </span> | number of entry processes|
|<span class="notranslate"> pno </span> | number of processes|


#### **Errors handling**

The format of the error message is the same as in the other <span class="notranslate">`cloudlinux- *`</span> utilities. When everything is ok, the <span class="notranslate">`result`</span> value is <span class="notranslate">`success`</span>. Otherwise, it contains error message. In case of unexpected errors, the output will be as follows.

<div class="notranslate">

```
# cloudlinux-top --json 
{
  "context": {
      "error_text": "Very bad error"
  },
  "result": "An error occured: \"%(error_text)s\"",
  "timestamp": 1523871939.639394
}
```
</div>


#### **Examples**


* get 100 users ordered by <span class="notranslate"> CPU </span> usage

  <div class="notranslate">

  ```
  # cloudlinux-top --json --order-by cpu --max=100
  ```
  </div>

* get information about one user

  <div class="notranslate">

  ```
  # cloudlinux-top --json -u username
  ```
  </div>

* get information about reseller and his users

  <div class="notranslate">

  ```
  # cloudlinux-top --json --for-reseller=reseller_name
  ```
  </div>

* show only <span class="notranslate">IO</span> limits and usage

  <div class="notranslate">

  ```
  # cloudlinux-top --json --show=io
  ```
  </div>

<div class="notranslate">

### cloudlinux-statistics

</div>

<span class="notranslate">cloudlinux-statistics</span> is a <span class="notranslate">CLI</span> utility that provides historical information about resource usage.

#### **Usage**

<div class="notranslate">

```
cloudlinux-statistics [-h] [-j] [-v] [--by-usage BY_USAGE]
                      [--percentage 0..100] [--by-fault BY_FAULT]
                      [--threshold THRESHOLD] [--server_id SERVER_ID]
                      [-f FROM] [-t TO] [--period PERIOD]
                      [--limit LIMIT]
                      [--show COLUMN_NAME [COLUMN_NAME ...]]
                      [-o ORDER_BY] [--id ID] [--time-unit TIME_UNIT]
                      [-r FOR_RESELLER]
```
</div>

**Optional arguments**

* <span class="notranslate"> `-h`, `--help` </span> – show this help message and exit
* <span class="notranslate"> `-j`, `--json` </span> – return data in JSON format
* <span class="notranslate"> `-v`, `--version` </span> – show program version number and exit
* <span class="notranslate"> `--server_id SERVER_ID`, `--server-id SERVER_ID` </span> – can be used with the central database for multiple servers; default `...`
* <span class="notranslate"> `--limit LIMIT` </span> – limit the number of results to display, `0` is unlimited
* <span class="notranslate"> `--show COLUMN_NAME [COLUMN_NAME ...]` </span> – show only listed columns; <span class="notranslate">`all`</span> for all supported columns (fields)
  | | |
  |-|-|
  |<span class="notranslate">Key</span>|Fields to show|
  |<span class="notranslate">`all`</span>|all available fields|
  |<span class="notranslate">`cpu`</span>|CPU field|
  |<span class="notranslate">`io`</span>|IO field|
  |<span class="notranslate">`iops`</span>|IOPS field|
  |<span class="notranslate">`ep`</span>|entry processes (concurrent connections) field|
  |<span class="notranslate">`nproc`</span>|number of processes field|
  |<span class="notranslate">`pmem`</span>|physical memory field|
  |<span class="notranslate">`vmem`</span>|virtual memory field|
  |<span class="notranslate">`mysql`</span>|`mysql_cpu` & `mysql_io` field|

* <span class="notranslate"> `-o ORDER_BY`, `--order-by ORDER_BY` </span> – order results by one of the following keys (fields):
  | | |
  |-|-|
  |FIELD|DESCRIPTION|
  |<span class="notranslate">`any_faults`</span>|total number of faults of all types|
  |<span class="notranslate">`cpu`</span>|average CPU usage`</span>|
  |<span class="notranslate">`mysql_cpu`</span>|average MySQL CPU usage`</span>|
  |<span class="notranslate">`io`</span>|average IO usage`</span>|
  |<span class="notranslate">`mysql_io`</span>|average MySQL IO usage`</span>|
  |<span class="notranslate">`iops`</span>|average IO operations; (LVE version >= 8)`</span>|
  |<span class="notranslate">`ep`</span>|average number of entry processes (concurrent connections)`</span>|
  |<span class="notranslate">`nproc`</span>|average number of processes`</span>|
  |<span class="notranslate">`pmem`</span>|average physical memory usage`</span>|
  |<span class="notranslate">`vmem`</span>|average virtual memory usage`</span>|
  |<span class="notranslate">`cpu_faults`</span>|total number of CPU usage faults`</span>|
  |<span class="notranslate">`io_faults`</span>|total number of max IO faults`</span>|
  |<span class="notranslate">`iops_fault`</span>|total number of max IO operations faults; (LVE version >= 8)`</span>|
  |<span class="notranslate">`ep_faults`</span>|total number of max entry processes faults`</span>|
  |<span class="notranslate">`nproc_faults`</span>|total number of max processes faults`</span>|
  |<span class="notranslate">`pmem_faults`</span>|total number of out of physical memory faults`</span>|
  |<span class="notranslate">`vmem_faults`</span>|total number of out of virtual memory faults`</span>|

* <span class="notranslate"> `-r FOR_RESELLER`, `--for-reseller FOR_RESELLER` </span> – show statistics only for given reseller and his users

Filter items by resource usage.

* <span class="notranslate"> `--by-usage BY_USAGE` </span> – show LVEs with usage (averaged) within 90 percent of the limit available values
  | | |
  |-|-|
  |FIELD|DESCRIPTION|
  |<span class="notranslate">`cpu`</span>|average CPU usage|
  |<span class="notranslate">`mysql_cpu`</span>|average MySQL CPU usage|
  |<span class="notranslate">`io`</span>|average IO usage|
  |<span class="notranslate">`mysql_io`</span>|average MySQL IO usage|
  |<span class="notranslate">`iops`</span>|average IO operations; (LVE version >= 8)|
  |<span class="notranslate">`ep`</span>|average number of entry processes (concurrent connections)|
  |<span class="notranslate">`nproc`</span>|average number of processes|
  |<span class="notranslate">`pmem`</span>|average physical memory usage|
  |<span class="notranslate">`vmem`</span>|average virtual memory usage|

* <span class="notranslate"> `-percentage 0..100` </span> – define percentage for <span class="notranslate">`--by-usage`</span> option; default `90`

Filter items by the number of faults.

* <span class="notranslate"> `--by-fault BY_FAULT` </span> – show only accounts that have some faults for the given limit
  | | |
  |-|-|
  |FIELD|DESCRIPTION|
  |<span class="notranslate">`any`</span>|faults of all types|
  |<span class="notranslate">`cpu`</span>|CPU usage faults|
  |<span class="notranslate">`io`</span>|max IO usage faults|
  |<span class="notranslate">`iops`</span>|max IO operations faults; (LVE version >= 8)|
  |<span class="notranslate">`ep`</span>|max entry processes faults|
  |<span class="notranslate">`nproc`</span>|max processes faults|
  |<span class="notranslate">`pmem`</span>|out of physical memory faults|
  |<span class="notranslate">`vmem`</span>|out of virtual memory faults|

* <span class="notranslate"> `--threshold THRESHOLD` </span> – in combination with <span class="notranslate">`--by-fault`</span> shows only accounts with the number of faults more than given; default `1`

Filter items by a time interval.

Allows to get information for the given period of time; you can either set <span class="notranslate">`--from`</span> and <span class="notranslate">`--to`</span> options, or just get information for the recent time period using <span class="notranslate">`--period option`.</span>

:::tip Note
<span class="notranslate">`--from`</span> and <span class="notranslate">`--to`</span> values are ignored when <span class="notranslate">`--period`</span> is set.
:::

* <span class="notranslate"> `-f FROM`, `--from FROM` </span> – run report from date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present, last 10 minutes are assumed
* <span class="notranslate"> `-t TO`, `--to TO` </span> – run report up to date and time in <span class="notranslate">`[YY]YY-MM-DD[ HH:MM]`</span> format; if not present, reports results up to now
* <span class="notranslate"> `--period PERIOD` </span> – time period; specify minutes with <span class="notranslate">`m`</span>, hours with <span class="notranslate">`h`</span>, days with <span class="notranslate">`d`</span>, and values: <span class="notranslate">`today`, `yesterday`</span>; `5m` - last 5 minutes, `4h` - last four hours, `2d` - last 2 days, and <span class="notranslate">`today`</span>

Get detailed statistics.

* <span class="notranslate"> `--id ID` </span> – get detailed statistics for database record with the given id
* <span class="notranslate"> `--time-unit TIME_UNIT` </span> – group statistics using the given time; 1 minute by default. For example: <span class="notranslate">`1h`</span> or <span class="notranslate">`1h30m`</span> or <span class="notranslate">`dynamic`</span>; available only in pair with <span class="notranslate">`--id`</span>


#### **Output format**

There are two different JSON formats used for **summary statistics** and **detailed statistics**.

**Summary statistics**

<div class="notranslate">

```
# cloudlinux-statistics --json
 {
 "resellers": [
   {
     "usage": <lve_section>,
     "faults": <lve_section>,
     "name": "reseller",
     "limits": <lve_section>,
     "id": 1000020005
   }
 ],
 "timestamp": 1522920637,
 "mySqlGov": "enabled",            # possible values: ”enabled”, “error”
 "result": "success",
 "users": [
   {
     "username": "username",
     "domain": "example.com",
     "reseller": "reseller",
     "limits": <lve_section>,
     "faults": <lve_section>,
     "usage": <lve_section>,
     "id": 20005
   }
 ]
 }
```
</div>

**Detailed statistics**

<div class="notranslate">

```
# cloudlinux-statistics --json --id=20001
 {
 "timestamp": 1523011550,
 "mySqlGov": "enabled",           # possible values: ”enabled”, “error”
 "result": "success",
 "user": [
   {
     "usage": <lve_section>,
     "faults": <lve_section>,
     "from": 1523011144,
     "limits": <lve_section>,
     "to": 1523011143
   },
 ...
   {
     "usage": <lve_section>,
     "faults": <lve_section>,
     "from": 1523011204,
     "limits": <lve_section>,
     "to": 1523011203
   }
 ]
 }
```
</div>

For both, **summary statistics** and **detailed statistics**, <span class="notranslate">`<lve_section>`</span> is the same and looks like following<sup> *</sup>.

<div class="notranslate">

```
{
   "ep": {
     "lve": 1        # number of entry processes
   },
   "vmem": {
     "lve": 2428928  # virtual memory usage or limit (deprecated)
   },
   "iops": {
     "lve": 0        # io operations per second
   },
   "io": {
     "lve": 0.0,     # io usage or limit (lve only)
     "mysql": 0.0**   # io usage or limit (mysql only)
   },
   "nproc": {
     "lve": 1        # number of processes in lve
   },
   "cpu": {
     "lve": 25.6,    # cpu usage (lve only)
     "mysql": 0.0*   # cpu usage (mysql governor only)
   },
   "pmem": {
     "lve": 360448   # physical memory usage or limit
   }
 }
```
</div>

:::tip Note
* you can specify only required fields using <span class="notranslate">`--show`</span> option;
* <span class="notranslate">`mysql`</span> fields are only available with <span class="notranslate"> [MySQL Governor](/mysql_governor/#installation)</span> installed.
:::

#### **Units of measurement**

For <span class="notranslate">`limits`</span> and <span class="notranslate">`usage`</span> sections we use the following units of measurement.

| | |
|-|-|
|Value|Units of measurement|
|<span class="notranslate">`cpu` (LVE and MySQL)</span> | percentage of one <span class="notranslate">CPU</span> core|
|<span class="notranslate">`io` (LVE and MySQL) </span> | bytes per second|
|<span class="notranslate">`iops`</span> | number of <span class="notranslate">IO</span> operations per second|
|<span class="notranslate">`pmem`</span> and <span class="notranslate">`vmem`</span> | bytes|
|<span class="notranslate">`ep`</span> | number of entry processes|
|<span class="notranslate">`nproc`</span> | number of processes in LVE|

#### **Errors handling**

The format of the error message is the same as in the other <span class="notranslate">`cloudlinux- *`</span> utilities. When everything is ok, the <span class="notranslate">`result`</span> value is <span class="notranslate">`success`</span>. Otherwise, it contains error message.

<div class="notranslate">

```
# cloudlinux-statistics --json 
{
  "context": {
      "error_text": "Very bad error"
  },
  "result": "An error occured: \"%(error_text)s\"",
  "timestamp": 1523871939.639394
}
```
</div>

#### **Examples**


* get top 10 users ordered by <span class="notranslate">CPU</span> usage for today

<div class="notranslate">

```
# cloudlinux-statistics --json --order-by=cpu --period=today --limit=10
```
</div>

* get users that hit <span class="notranslate">IO</span> limit more than 10 times for today

<div class="notranslate">

```
# cloudlinux-statistics --json --period=today --by-fault=io --threshold=10
```
</diV>

* get users that used more than 80% of <span class="notranslate">CPU</span> in last 24 hours

<div class="notranslate">

```
# cloudlinux-statistics --json --by-usage=cpu --percentage=80 --period=24h
```
</div>

* get information only about reseller and his users

<div class="notranslate">

```
# cloudlinux-statistics --json --for-reseller=reseller_name
```
</div>

* get information only about <span class="notranslate">CPU</span> and <span class="notranslate">IO</span> usage

<div class="notranslate">

```
# cloudlinux-statistics --json --show=cpu,io
```
</div>


## Plugins


LVE <span class="notranslate"> Stats 2 </span> comes with a set of generic plugins:

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


To enable non-default plugin, copy or link it to _/usr/share/lve-stats/plugins_ directory.

For example to enable _ResMEMCollector_ plugin, do:

<div class="notranslate">

```
ln -s /usr/share/lve-stats/plugins.other/res_mem_collector.py /usr/share/lve-stats/plugins/
service lvestats restart
```
</div>


## Creating a Plugin for LVE Stats 2


* [Introduction](/lve-stats_2/#introduction)

* [Server Plugin Arrangement](/lve-stats_2/#server-plugin-arrangement)

* [Plugin Configuration](/lve-stats_2/#plugin-configuration)

* [Types of Plugins](/lve-stats_2/#types-of-plugins)



### Introduction


<span class="notranslate"> LVE Stats 2 </span> complex has scalable architecture, which allows to connect custom plugins.


<span class="notranslate"> LVE Stats </span> server searches for plugins in the directory which is specified with plugins parameter of server’s _/etc/sysconfig/lvestats2_ configuration file. Default directory is <span class="notranslate"> _/usr/share/lve-stats/plugins_. </span>

Each plugin must be of a <span class="notranslate"> Python </span> class, must be written in <span class="notranslate"> Python </span> language and its file must have <span class="notranslate"> .py </span> extension. Files with all other extensions will be ignored. For normal server work access permission 400 is enough; owner – <span class="notranslate"> root </span> .

Plugin classes can be of the same name, but better not, because classes' names can affect the set of parameters in <span class="notranslate"> _set_config_ </span> method. You can find detailed plugins' configuring information below, in appropriate chapter.

Plugin class must contain <span class="notranslate"> _execute()_ </span> method, which is invoked by the server every 5 seconds (by default, can be changed by interval parameter of configuration file).
Also <span class="notranslate"> set_config </span> method (configuration settings) can be available. You can find more info in <span class="notranslate"> [Plugins Configuration](/lve-stats_2/#plugin-configuration) </span> chapter.

Additionally the following attributes can be set (plugin class instance variable):

* <span class="notranslate"> order (integer) </span> - defines plugin's position in the server's plugin list, (more info in <span class="notranslate"> Servers Plugin Arrangement </span> ).
* <span class="notranslate"> timeout (integer </span> or <span class="notranslate"> float </span> ) – the longest allowable duration of one launch of the plugin (execute method). Default value of <span class="notranslate"> timeout </span> parameter is 5 seconds.
* <span class="notranslate"> period (integer) </span> – sets the interval between two launches of execute plugin method in seconds. If not defined, then plugin runs every 5 seconds ( <span class="notranslate"> interval </span> parameter in configuration file).

When <span class="notranslate"> _execute()_   </span> method of the plugin is invoked, the server creates an attribute <span class="notranslate"> _now_ </span> in it, where launch time is recorded. This value is equal to what a standard Python function <span class="notranslate"> _time.time()_ </span> returns. All the plugins launched one after another receive the same  value of <span class="notranslate"> _now_   </span> attribute from the server. <span class="notranslate"> _now_ </span> is overwritten before <span class="notranslate"> _execute()_ </span> method is invoked.

The previous value of now attribute is not saved by the server. If plugin needs it, it has to save it by itself.

Plugin class can be inherited from <span class="notranslate"> _LveStatsPlugin_ </span> class, which is the part of the server itself. This is not obligatory, but inheritance can help to avoid different errors in servers work, particularly if a plugin doesn't contain required execute method.

<span class="notranslate"> _LveStatsPlugin_ </span> class is defined in the file: <span class="notranslate"> _/opt/alt/python27/lib/python2.7/site-packages/lvestats/core/plugin.py_ . </span>

### Server Plugin Arrangement


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

### Plugin Configuration


<span class="notranslate"> LVE Stats 2 </span> Server allows to configure each plugin separately.

On initialization stage the server invokes <span class="notranslate"> _set_config()_ </span> method of the plugin and locates there a dictionary which contains:

* all parameters from file _/etc/sysconfig/lvestats2_ (global).
* plugin's individual configuration file parameters (if one exists). Configuration files must be located in <span class="notranslate"> _/etc/sysconfig/lvestats.config_ </span> directory, have .cfg extension and be the same format as _/etc/sysconfig/lvestats2_ . Files in this directory are matched with the plugins by name. For instance, if plugin class is <span class="notranslate"> _Plugin1_class_ </span> , then server will try to find and download <span class="notranslate"> _/etc/sysconfig/lvestats.config/Plugin1_class.cfg_. </span> Names are case sensitive. If any plugin doesn't have an individual configuration file, then it's not an error. In this case plugin will just receive parameters from _/etc/sysconfig/lvestats2_ .

::: tip Note
An individual configuration file of every plugin is loaded after server configuration file. That is why if it contains any parameters with names similar to ones of server config, then plugin will use parameters from its individual config rather than server config parameters.

If a plugin doesn't require any configuration to be done, then set_config method can be skipped.

In addition, plugins can use their own configuration methods.
:::




### Types of Plugins


According to server architecture, plugins can be of the following types:

* <span class="notranslate"> collectors </span>
* <span class="notranslate"> analyzers </span>
* <span class="notranslate"> persistors </span>
* <span class="notranslate"> notifiers </span>

<span class="notranslate"> Collectors </span> are designed to collect information; <span class="notranslate"> analyzers </span> – to analyze it and form some other data on its basis; <span class="notranslate"> persistors </span> – to save information from the common dictionary into files, databases, etc.; <span class="notranslate"> notifiers </span> - to notify system users about any events.

This division is rather arbitrary. There is an opportunity to execute all the actions on collection, analysis and saving the information in one and only plugin. But at the same time the division into functionally independent parts allows to build flexible and easily configurable system for collecting and processing the data.

Also it is possible to implement the systems of lazy-write, planning of collecting/processing tasks and notifying users about different events.


### Examples of Plugins


Here is a practical example of a user plugin.

Specification:

1. To trace specified file size changes. The name of file being traced must be specified in configuration file, which allows to change it without modifying the plugin itself. If file size has been changed, it has to be written as a message into our log. The name of log must be specified in configuration file as well.

2. File size must be checked with default interval (5 seconds), and log notification must be held once a minute (to avoid resource expend for possibly regular write).

3. System administrator must receive emails with file size at the moment the email was sent. These notifications must be sent even if the file size hasn’t been changed. Notification emails must be read periodicity from configuration file as well as sender/receiver emails .

As file size check, fixing the result and notification sending must be held with different periods, then it’s impossible to realize all the tasks by means of one plugin.
The fact that one minute (60 seconds) is multiple to 5 seconds doesn’t matter in this case, because default period can be changed in server’s configuration file, but the condition of fixing the result once a minute is a part of the specification, which can not be violated. In addition, notification email period is known in advance, as it is specified by user in configuration file.

That is why we realize 4 plugins: <span class="notranslate"> **collector, analyzer, persistor** </span> and <span class="notranslate"> **notifier** </span> .


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

Configuration file <span class="notranslate"> _/etc/sysconfig/lvestats.config/FSize_watcher_saver.cfg_ </span> :
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

Pay attention on <span class="notranslate"> _sys.exit(0)_ </span> command in the end of the handler. Find the information on it in <span class="notranslate"> [Server Plugin Arrangement](/lve-stats_2/#server-plugin-arrangement) </span> section.

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


<span class="notranslate"> Notifier </span> informs system users about any events.
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

## File info and format for /var/lve/info file


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

## Troubleshooting


<span class="notranslate"> lvestats </span> service and utilities write fatal errors to system log.

There is <span class="notranslate"> _/var/log/lve-stats.log_ </span> file with additional information (warnings, tracebacks for errors)

