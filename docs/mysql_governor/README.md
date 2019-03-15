# MySQL Governor


[ 0.8-32+]

is software to monitor and restrict MySQL usage in shared hosting environment. The monitoring is done via resource usage statistics per each MySQL thread.

can also kill off slow queries.

has multiple modes of operations, depending on the configuration. It can work in monitor only mode, or it can use different throttling scenarious.

allows to restrict customers who use too much resources. It supports following limits:

| |  | |
|-|--|-|
| | % | speed relative to one core. 150% would mean one and a half cores|
| | bytes | bytes read. Cached reads are not counted, only those that were actually read from disk will be counted|
| | bytes | bytes written. Cached writes are not counted, only once data is written to disk, it is counted|

You can set different limits for different periods: current, short, med, long. By default those periods are defined as 1 second, 5 seconds, 1 minute and 5 minutes. They can be re-defined using [configuration file](/mysql_governor/#configuration) . The idea is to use larger acceptable values for shorter periods. Like you could allow a customer to use two cores (200%) for one second, but only 1 core (on average) for 1 minute, and only 70% within 5 minutes. That would make sure that customer can burst for short periods of time.

When customer is restricted, the customer will be placed into special LVE with ID 3. All restricted customers will be placed into that LVE, and you can control amount of resources available to restricted customers. Restricted customers will also be limited to only 30 concurrent connections. This is done so they wouldn't use up all the MySQL connections to the server.



## Installation





**_ _**
**_MySQL Governor is compatible only with MySQL 5.x, 8.0; MariaDB & Percona Server 5.6._**

To install on your server install package at first:




Then configure properly.

The installation is currently supported only on , as well as on servers without control panel.

If you are installing on a server running MySQL already, set your current MySQL version before calling installation script:




Please make sure to specify your current MySQL version instead of XX as follows:

55 — MySQL v5.5
56 — MySQL v5.6
57 — MySQL v5.7
80 — MySQL v8.0 [requires 1.2-37+; database packages are available in only, so, please use flag instead of ]

If you are installing on a server running already, do instead:




Please make sure to specify your current version instead of as follows:

55 — MariaDB v5.5
100 — MariaDB v10.0
101 — MariaDB v10.1
102 — MariaDB v10.2
103 — MariaDB v10.3 [requires 1.2-36+; database packages are available in only, so, please use flag instead of ]


Installation for [requires 1.1-22+ or 1.2-21+]:




Please note that will be updated from repositories.

If you are installing on a server without MySQL at all, you have an opportunity to choose desired MySQL version to be installed with installation script. Use flag before calling the installation script:




could be chosen from the list of versions currently supported by :




Generally, and channels contain different version of MySQL packages - contains newer version than




Starting with version 1.2 when installing asks for a confirmation of a database version to be installed. To avoid such behavior for the automatic installations, please use flag.

For example:




Please note that restore of previous packages in case of failed installation would also be confirmed with flag.




## Removing 


To remove :

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --delete
```

The script will install original MySQL server, and remove .


## Modes Of Operation


**[**

has multiple modes of operation. Some of them are experimental at this moment.
Mode:
In this mode will not throttle customer's queries, instead it will let you monitor the MySQL usage to see the abusers at any given moment of time (and historically). This mode is good when you are just starting and want to see what is going on
In that mode once customer reaches the limits specified in the , all customer's queries will be running inside LVE with id 3. This means that when you have 5 customers restricted at the same time, all queries for all those 5 customers will be sharing same LVE. The larger the number of restricted customers - the less resources per restricted customer will be available
In that mode, once user goes over the limits specified in the , all customer's queries will execute inside that user's LVE. We believe this mode will help with the condition when the site is still fast, but MySQL is slow (restricted) for that user. If someone abuses MySQL, it will cause queries to share LVE with PHP processes, and PHP processes will also be throttled, causing less of a new queries being sent to MySQL. _Requires  _
This way there are no need for separate limits for MySQL. Depending on overhead we see in the future, we might decide to use it as a primary way of operating . The benefits of this approach is that limits are applied to both PHP & MySQL at the same time, all the time, preventing any spikes what so ever. _Requires _

If file is absent on the server, " " mode works emulate " ".

With and mode, once user is restricted, the queries for that user will be limited as long as user is using more than limits specified. After a minute that user is using less, we will unrestricted that user.

You can specify modes of operation using or by changing [configuration file](/mysql_governor/#configuration) .
file is located in

## Configuration


configuration is located in 

It is best to modify it using tool.

Once configuration file is updated, please, restart the using:

```
$ service db_governor restart
```

Example configuration:

```
<governor>
 
<!--  'off' - do not throttle anything, monitoring only -->
<!--  'abusers' - when user reaches the limit, put user's queries into LVE for that user -->
<!--  'all' - user's queries always run inside LVE for that user -->
<!--  'single' - single LVE=3 for all abusers. -->
<!-- 'on' - deprecated (old restriction type) -->
<!-- To change resource usage of restricted user in LVE mode use command /usr/sbin/lvectl set 3 --cpu=<new value> --ncpu=<new value> --io=<new value> --        save-all-parameters -->
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
<!-- timeout - penalty period when user not restricted, but if he hit his limit during this period he will be restricted with higher level of restrict (for more long time) --        >
<!- level1, level2, level3, level4 - period of restriction user for different level of restriction. During this period all user's requests will be placed into LVE container         -->
```
```
<!-- if user hits any of the limits during period of time specified in timeout, higher         level of restrict will be used to restrict user. If user was already on level4, level4         will be applied again -->
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
<!-- Files are saved in /var/lve/dbgovernor-store and being kept here during 10 days --        >
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


## Starting And Stopping


To start:

```
$ service db_governor start
```

To stop:

```
$ service db_governor stop
```


## Mapping a User to Database 


**[**

Traditionally used prefixes to map user to database. With the latest version, we automatically generate mapping for and control panels (other panels will follow).

The mapping file is located in:

The format of the file:

```
[dbuser_name1] [account_name1] [UID1]
...
[dbuser_nameN] [account_nameN] [UIDN]
```

For example:

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

This would specify that db users: belong to user with uid (lve id)  502
db user belongs to user with uid 505, etc...

This file is checked for modifications every 5 minutes.

If you need to force reload of that file, run:

```
service db_governor restart
```


## Log Files




error log is used to track any problems that might have



Restrict log is located in

Restrictions:

```
_timestamp_ _username_ LIMIT_ENFORCED _limit_setting_ __current_value_                         _restrict_level__ SERVER_LOAD TRACKED_VALUES_DUMP 
... 
```


 = load averages followed by output of
 is available with format
 is available with format

## Change MySQL version


If you would like to change to a different MySQL version, or switch to you have to start by backing up existing databases.







```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```


* If you are using or - recompile .

To install beta version of MySQL:

```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install-beta
```


can be one of the following:

| | |
|-|-|
| | default version of MySQL for given OS release (or cPanel settings)|
| | MySQL v5.0|
|mysql51 | MySQL v5.1|
|mysql55 | MySQL v5.5|
|mysql56 | MySQL v5.6|
|mysql57 | MySQL v5.7|
|mysql80 | MySQL v8.0 [requires MySQL Governor 1.2-37+; database packages are available in Beta only, so, please use flag instead of ]|
|mariadb55 | MariaDB v5.5|
|mariadb100 | MariaDB v10.0|
|mariadb101 | MariaDB v10.1|
|mariadb102 | MariaDB v 10.2|
|mariadb103 | MariaDB v 10.3 [requires 1.2-36+; database packages are available in only, so, please use flag instead of ]|
|percona56 | Percona v 5.6|


* We don't recommend to downgrade from MySQL v5.6, MariaDB 10.x



MySQL Governor starting from version 1.2-37 (in Beta since December 11th 2018) supports MySQL 8.0 installation.

## Command-line Tools


-- monitor MySQL usage on per user bases. More info...
-- command line tool to manage
-- provides historical information about usage and customer restrictions. [More info...](/mysql_governor/#lveinfo-dbgov)
-- generate charts for MySQL usage. [More info...](/mysql_governor/#dbgovchart)


### dbtop


Utility to monitor MySQL usage. Requires to be running. It shows usage for the current, mid and long intervals.



show one time user list (no interactive mode)
refresh interval for interactive mode (in seconds)


toggle color mode and two-color mode
 - quit program
sort table by username
sort table by cpu column
sort table by read column
sort table by write column
sort by restriction level
sort by time before restrictions will be lifted.

Control keys, that sort table, displays into header of table bold and underlined symbol.
Sorted field will be highlighted by *.
field shows current stage, reason for restriction and number of seconds before restriction will be lifted:
Values of column ' ' - cause of restriction or freezing:
Possible stages: - - , 1 - Restriction 1, 2 - Restriction 2, 3 - Restriction 3, 4 -- restriction level 4

(current value of parameter)
(average value of 5 last values of parameter)
(average value of 15 last values of parameter)
(average value of 30 last values of parameter)
and parameter which is cause of restriction
- first level restricted account with short average restriction with 12 seconds left before re-enabled.



- number in %, shows usage by user
· - number of bytes (kbytes, mbytes, gbytes) which user reads per second
· - number of bytes (kbytes, mbytes, gbytes) write user reads per second


Accounts highlighted in color means that the account is restricted.
Accounts highlighted in color are in cool down period

Command line parameters of utility:
refresh period in seconds ( )

### dbctl


usage:


set parameters for a
list users & their limits. It will list all users who had been active since restart,  as well as those for who explicit limits were set
list restricted customers, with their limits, restriction reason, and time period they will still be restricted
ignore particular user
start observing particular user again
remove limits for user/use defaults
restrict user using lowest level (or if specified, using the specified level)
unrestrict username (configuration file remains unchanged)
unrestrict all restricted users (configuration file remains unchanged)
show this message
version number
set mode of operation. Available values:
 - monitor only, don't throttle
- when user reaches the limit, put user's queries into LVE for that user (experimental)
- user's queries always run inside LVE for that user (experimental)
- single LVE for all abusers.
- same as (deprecated)



set default parameter
set parameter for user



limit (pct) usage
limit (MB/s) usage
limit (MB/s) usage
level (1,2,3 or 4) specified (deprecated) - this option is available only for period mode:

(see http://docs.cloudlinux.com/index.html?mysql_governor_configuration.html)

The default mode is the " " - when a user hits limits, the account will be marked as restricted and if the user does not hit the limit again during " " account will be unrestricted. This mode doesn't have any additional levels/penalties.


Changing the "unlimit" can be done only via the configuration file (see [http://docs.cloudlinux.com/index.html?mysql_governor_configuration.html](http://docs.cloudlinux.com/index.html?mysql_governor_configuration.html) ).
limit time (in seconds) for long running queries

Options for parameter :





Examples:

```
$ dbctl set test2 --cpu=150,100,70,50 --read=2048,1500,1000,800
```

sets individual limits for period) and periods) for user

```
$ dbctl set default --cpu=70,60,50,40
```

changes default limits.

All new limits will be applied immediately

To unrestrict user:

```
$ dbctl unrestrict username
```

To unrestrict all users:

```
$ dbctl unrestrict-all 
```

To restrict user:

```
$ dbctl restrict dbgov
```

To restrict user to level 2 restriction:

```
$ dbctl restrict dbgov --level=2
```

To make to ignore user:

```
$ dbctl ignore username
```

Delete user's limits, and use defaults instead:

```
$ dbctl delete username
```

Show limits as bytes:

```
$dbctl list --bb
```


### lveinfo --dbgov


tool is a part of package. It was extended to collect historical information about MySQL usage.



```
Displays information about historical Db Governor usage
Usage: lveinfo [OPTIONS]
 
-h --help              : this help run report from date and time in YYYY-MM-DD HH:MM format if not present last 10 mscreen
-v, --version          : version number
-f, --from=            : inutes are assumed
-t, --to=              : run report up to date and time in YYYY-MM-DD HH:MM format
      if not present, reports results up to now
    --period=          : time period
      usage            : specify minutes with m,  h - hours, days with d, and values:
                       : today, yesterday; 5m - last 5 minutes, 4h -- last four hours,
                       : 2d - last 2 days, as well as today
-o, --order-by=        : orders results by one of the following:
      con              : average connections
      cpu              : average CPU usage
      read             : average READ usage
      write            : average WRITE usage
-u, --user=            : mysql username
-l, --limit=           : max number of results to display, 10 by default
-c, --csv              : display output in CSV format
-b, --format           : show only specific fields into output
      available values:
      ts               : timestamp records
      username         : user name
      con              : average connections
      cpu              : average CPU usage
      read             : average READ usage
      write            : average WRITE usage
      lcpu             : CPU limit
      lread            : READ limit
      lwrite           : WRITE limit
    --show-all         : full output (show all limits); brief output is default
 
-o, --order-by=        : orders results by one of the following:
      ts               : timestamp records
      username         : user name
      max_sim_req      : max simultaneous requests
      sum_cpu          : average CPU usage
      sum_write        : average WRITE usage
      sum_read         : average READ usage
      num_of_rest      : number of restricts
      limit_cpu_end    : limit CPU on period end
      limit_read_end   : limit READ on period end
      limit_write_end  : limit WRITE on period end
    --id=              : LVE id -- will display record only for that LVE id
-u, --user=            : Use username instead of LVE id, and show only record for that
                       : user
-l, --limit=           : max number of results to display, 10 by default
-c, --csv              : display output in CSV format
-b, --by-usage         : show LVEs with usage (averaged or max) within 90% percent
                       : of the limit
      available values:
      sum_cpu          : average CPU usage
      sum_write        : average WRITE usage
      sum_read         : average READ usage
      num_of_rest      : number of restricts
      limit_cpu_end    : limit CPU on period end
      limit_read_end   : limit READ on period end
      limit_write_end  : limit WRITE on period end
    --show-all         : full output (show all limits); brief output is default
 
TS                     : timestamp records
USER                   : user name
CPU                    : average CPU usage
READ                   : average READ usage
WRITE                  : average WRITE usage
CON                    : average connections
lCPU                   : CPU limit
lREAD                  : READ limit
lWRITE                 : WRITE limit
RESTRICT               : C-cpu restrict, R- read restrict, W- write restrict
```

Example:

```
root@cpanel1 [~/ttttt]# lveinfo --dbgov --user=dbgov --period=1d --limit=10
TS                   USER   CPU     READ    WRITE   CON     lCPU    lREAD   lWRITE   RESTRICT  
2012-12-06 11:14:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:13:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:12:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:11:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:10:49  dbgov   9       0.0     0.0     1       90      1000    1000                
2012-12-06 11:09:49  dbgov   90      0.0     0.0     1       90      1000    1000     C          
2012-12-06 11:08:49  dbgov   0       0.0     0.0     0       400     1000    1000                
2012-12-06 11:07:49  dbgov   0       0.0     0.0     0       400     1000    1000                
2012-12-06 11:06:49  dbgov   0       0.0     0.0     0       400     1000    1000   
```


### dbgovchart


is analog of tool to create charts representing customer's to MySQL usage

Usage:

Acceptable options are:

```
--help      This help screen
--version   Version number
--from=     Run report from date and time in YYYY-MM-DD HH:MM format
            if not present last 10 minutes are assumed
--to=       Run report up to date and time in YYYY-MM-DD HH:MM format
            if not present, reports results up to now
--period=   Time period
            specify minutes with m,  h - hours, days with d, and values:
            today, yesterday
            5m - last 5 minutes, 4h - last four hours, 2d - last 2 days,
            as well as today
--user=     mysql username
--output=   Filename to save chart as, if not present, output will be sent to STDOUT
--show-all  Show all graphs (by default shows graphs for which limits are set)
```


Charts examples:
![](/images/1111.png)
![](/images/1111_2.png)

## Backing Up MySQL


On server disable MySQL service monitoring before doing the job:

```
$ whmapi1 configureservice service=mysql enabled=1 monitored=0
```

Execute as :

```
$ mkdir -p ~/mysqlbkp
$ service mysql restart --skip-networking --skip-grant-tables
$ mysql_upgrade
$ mysqldump --all-databases --routines --triggers > ~/mysqlbkp/dbcopy.sql
$ service mysql stop
$ cp -r /var/lib/mysql/mysql ~/mysqlbkp/
$ service mysql start
```

On server enable monitoring back:

```
$ whmapi1 configureservice service=mysql enabled=1 monitored=1
```








## abrt


We have created a plugin for tool to automatically upload core dumps in case crashes.

To install the plugin:

```
$ yum install cl-abrt-plugin --enablerepo=cloudlinux-updates-testing
```

It will monitor crash reports for

You can modify to monitor other software as well by adding them to .

```
AppLists=/usr/sbin/db_governor,/usr/sbin/dbtop,/usr/sbin/dbctl
```


## Troubleshooting




and have only file for managing the service, but the file has functions, so it is supported by .

For adding extra limits, do the following:

1. Run:

```
mkdir /etc/systemd/system/mariadb.service.d/
```

2. Run:

```
touch /etc/systemd/system/mariadb.service.d/limits.conf
```

3. Add the following content to the the file :

```
[Service] 
LimitNOFILE=99999
```




This may be caused by changing root/administrator credentials without updating MySQL configuration file.

When you change root or administrator credentials in Plesk or DirectAdmin, you also need to update MySQL configuration file. This could be done with the following command (available since governor-mysql 1.2-38):


```
/usr/share/lve/dbgovernor/mysqlgovernor.py --update-config-auth
```

The command updates credentials in MySQL configuration file and restarts service afterwards.

After applying the command MySQL successfully connects to MySQL.



