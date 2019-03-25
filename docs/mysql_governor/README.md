# MySQL Governor


[ <span class="notranslate"> MySQL Governor </span> 0.8-32+]

<span class="notranslate"> MySQL Governor </span> is software to monitor and restrict MySQL usage in shared hosting environment. The monitoring is done via resource usage statistics per each MySQL thread.

<span class="notranslate"> MySQL Governor </span> can also kill off slow <span class="notranslate"> SELECT </span> queries.

<span class="notranslate"> MySQL Governor </span> has multiple modes of operations, depending on the configuration. It can work in monitor only mode, or it can use different throttling scenarious.

<span class="notranslate"> MySQL Governor </span> allows to restrict customers who use too much resources. It supports following limits:

| |  | |
|-|--|-|
|<span class="notranslate"> CPU </span> | % | <span class="notranslate"> CPU </span> speed relative to one core. 150% would mean one and a half cores|
|<span class="notranslate"> READ </span> | bytes | bytes read. Cached reads are not counted, only those that were actually read from disk will be counted|
|<span class="notranslate"> WRITE </span> | bytes | bytes written. Cached writes are not counted, only once data is written to disk, it is counted|

You can set different limits for different periods: current, short, med, long. By default those periods are defined as 1 second, 5 seconds, 1 minute and 5 minutes. They can be re-defined using [configuration file](/mysql_governor/#configuration) . The idea is to use larger acceptable values for shorter periods. Like you could allow a customer to use two cores (200%) for one second, but only 1 core (on average) for 1 minute, and only 70% within 5 minutes. That would make sure that customer can burst for short periods of time.

When customer is restricted, the customer will be placed into special LVE with ID 3. All restricted customers will be placed into that LVE, and you can control amount of resources available to restricted customers. Restricted customers will also be limited to only 30 concurrent connections. This is done so they wouldn't use up all the MySQL connections to the server.



## Installation





**_ _**
**_MySQL Governor is compatible only with MySQL 5.x, 8.0; MariaDB & Percona Server 5.6._**

To install <span class="notranslate"> MySQL Governor </span> on your server install <span class="notranslate"> governor-mysql </span> package at first:




Then configure <span class="notranslate"> MySQL Governor </span> properly.

The installation is currently supported only on <span class="notranslate"> cPanel, Plesk, DirectAdmin, ISPmanager, InterWorx </span> , as well as on servers without control panel.

If you are installing <span class="notranslate"> CloudLinux </span> on a server running MySQL already, set your current MySQL version before calling installation script:




Please make sure to specify your current MySQL version instead of XX as follows:

55 — MySQL v5.5
56 — MySQL v5.6
57 — MySQL v5.7
80 — MySQL v8.0 [requires <span class="notranslate"> MySQL Governor </span> 1.2-37+; database packages are available in <span class="notranslate"> Beta </span> only, so, please use <span class="notranslate"> `--install-beta` </span> flag instead of <span class="notranslate"> `--install` </span> ]

If you are installing <span class="notranslate"> CloudLinux </span> on a server running <span class="notranslate"> MariaDB </span> already, do instead:




Please make sure to specify your current <span class="notranslate"> MariaDB </span> version instead of <span class="notranslate"> XX </span> as follows:

55 — MariaDB v5.5
100 — MariaDB v10.0
101 — MariaDB v10.1
102 — MariaDB v10.2
103 — MariaDB v10.3 [requires <span class="notranslate"> MySQL Governor </span> 1.2-36+; database packages are available in <span class="notranslate"> Beta </span> only, so, please use <span class="notranslate"> `--install-beta` </span> flag instead of <span class="notranslate"> `--install` </span> ]


Installation for <span class="notranslate"> Percona Server 5.6 </span> [requires <span class="notranslate"> MySQL Governor </span> 1.1-22+ or 1.2-21+]:




Please note that <span class="notranslate"> MySQL/MariaDB/Percona </span> will be updated from <span class="notranslate"> CloudLinux </span> repositories.

If you are installing <span class="notranslate"> MySQL Governor </span> on a server without MySQL at all, you have an opportunity to choose desired MySQL version to be installed with <span class="notranslate"> MySQL Governor </span> installation script. Use <span class="notranslate"> --mysql-version </span> flag before calling the installation script:




<span class="notranslate"> MYSQL_VERSION </span> could be chosen from the list of versions currently supported by <span class="notranslate"> MySQL Governor </span> :




Generally, <span class="notranslate"> stable </span> and <span class="notranslate"> beta </span> channels contain different version of MySQL packages - <span class="notranslate"> beta </span> contains newer version than <span class="notranslate"> stable or the same one. If you would like to install  <span class="notranslate"> beta </span>  packages, use  <span class="notranslate"> --install-beta </span>  flag instead of  <span class="notranslate"> --install </span>  when calling installation script: </span>




Starting with <span class="notranslate"> MySQL Governor </span> version 1.2 when installing <span class="notranslate"> MySQL/MariaDB MySQL Governor </span> asks for a confirmation of a database version to be installed. To avoid such behavior for the automatic installations, please use <span class="notranslate"> --yes </span> flag.

For example:




Please note that restore of previous packages in case of failed installation would also be confirmed with <span class="notranslate"> --yes </span> flag.




## Removing 


To remove <span class="notranslate"> MySQL Governor </span> :
<span class="notranslate"> </span>
```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --delete
```

The script will install original MySQL server, and remove <span class="notranslate"> MySQL Governor </span> .


## Modes Of Operation


**[** <span class="notranslate"> MySQL Governor </span> ** 1.0+]**

<span class="notranslate"> MySQL Governor </span> has multiple modes of operation. Some of them are experimental at this moment.
Mode:
<span class="notranslate"> **off -- Monitor Only** :  </span> In this mode <span class="notranslate"> MySQL Governor </span> will not throttle customer's queries, instead it will let you monitor the MySQL usage to see the abusers at any given moment of time (and historically). This mode is good when you are just starting and want to see what is going on
<span class="notranslate"> **single -- Single restricted's LVE for all restricted customers (deprecated)** :  </span> In that mode once customer reaches the limits specified in the <span class="notranslate"> MySQL Governor </span> , all customer's queries will be running inside LVE with id 3. This means that when you have 5 customers restricted at the same time, all queries for all those 5 customers will be sharing same LVE. The larger the number of restricted customers - the less resources per restricted customer will be available
<span class="notranslate"> **abusers - Use LVE for a user to restrict queries (default mode)** :  </span> In that mode, once user goes over the limits specified in the <span class="notranslate"> MySQL Governor </span> , all customer's queries will execute inside that user's LVE. We believe this mode will help with the condition when the site is still fast, but MySQL is slow (restricted) for that user. If someone abuses MySQL, it will cause queries to share LVE with PHP processes, and PHP processes will also be throttled, causing less of a new queries being sent to MySQL. _Requires  _ <span class="notranslate"> dbuser-map </span> _ file_
<span class="notranslate"> **all - Always run queries inside user's LVE** :  </span> This way there are no need for separate limits for MySQL. Depending on overhead we see in the future, we might decide to use it as a primary way of operating <span class="notranslate"> MySQL Governor </span> . The benefits of this approach is that limits are applied to both PHP & MySQL at the same time, all the time, preventing any spikes what so ever. _Requires _ <span class="notranslate"> dbuser-map </span> _ file_

If <span class="notranslate"> dbuser-map </span> file is absent on the server, " <span class="notranslate"> abusers </span> " mode works emulate " <span class="notranslate"> single </span> ".

With <span class="notranslate"> **single**   </span> and <span class="notranslate"> **abusers**   </span> mode, once user is restricted, the queries for that user will be limited as long as user is using more than limits specified. After a minute that user is using less, we will unrestricted that user.

You can specify modes of operation using <span class="notranslate"> [dbctl](/mysql_governor/#dbctl) </span> or by changing [configuration file](/mysql_governor/#configuration) .
<span class="notranslate"> dbuser-map </span> file is located in

## Configuration


<span class="notranslate"> MySQL Governor </span> configuration is located in <span class="notranslate"> /etc/container/mysql-governor.xml </span> 

It is best to modify it using <span class="notranslate"> [dbctl](/mysql_governor/#dbctl) </span> tool.

Once configuration file is updated, please, restart the <span class="notranslate"> MySQL Governor </span> using:
<span class="notranslate"> </span>
```
$ service db_governor restart
```

Example configuration:
<span class="notranslate"> </span>
```
<governor> <!--  'off' - do not throttle anything, monitoring only --><!--  'abusers' - when user reaches the limit, put user's queries into LVE for that user --><!--  'all' - user's queries always run inside LVE for that user --><!--  'single' - single LVE=3 for all abusers. --><!-- 'on' - deprecated (old restriction type) --><!-- To change resource usage of restricted user in LVE mode use command /usr/sbin/lvectl set 3 --cpu=<new value> --ncpu=<new value> --io=<new value> --        save-all-parameters --><lve use="on|single|off|abusers|all"/> <!-- connection information --><!-- If host, login and password are not present, this information is taken from /etc/my.cnf and ~root/.my.cnf --><!-- Use symbol specified in prefix to figure out hosting accounts (mysql username will be split using prefix_separator, and first part will be used as account name). If prefix is not set, or empty -- don’t use prefixes/accounts --> <!-- db governor will try to split MySQL user names using prefix separator (if present)and statistics will be aggregated for the prefix (account name) --><connector host="..." login="..." password=".." prefix_separator="_"/> <!-- Intervals define historical intervals for burstable limits. In seconds --><intervals short="5" mid="60" long="300"/> <!-- log all errors/debug info into this log --><log file=”/var/log/dbgovernor-error.log” mode=”DEBUG|ERROR”/> <!-- s -- seconds, m -- minutes, h -- hours, d -- days --><!-- on restart, restrict will disappear --><!-- log file will contain information about all restrictions that were take --><!-- timeout - penalty period when user not restricted, but if he hit his limit during this period he will be restricted with higher level of restrict (for more long time) --        ><!- level1, level2, level3, level4 - period of restriction user for different level of restriction. During this period all user's requests will be placed into LVE container         -->
```
```
<!-- if user hits any of the limits during period of time specified in timeout, higher         level of restrict will be used to restrict user. If user was already on level4, level4         will be applied again --><!-- attribute format set an restrict log format:SHORT -  restrict info onlyMEDIUM - restrict info, _all_tracked_values_LONG - restrict info, _all_tracked_values_, load average and vmstat infoVERYLONG - restrict info, _all_tracked_values_, load average and vmstat info, slow query info --><!-- script -- path to script to be triggered when account is restricted --><!-- user_max_connections - The number of simultaneous connections of blocked user (in LVE mode) --> <!-- restriction levels/format are deprecated --><restrict level1="60s" level2="15m" level3="1h" level4="1d" timeout="1h"log="/var/log/dbgovernor-restrict.log" format="SHORT|MEDIUM|LONG|VERYLONG"script="/path/to/script"user_max_connections="30"/> <!-- period (deprecated) - period based restriction that has multiple levels (see above) --><!-- limit (by default) - when user hits limits, the account will be marked as restricted and if user does not hit  limit again during "unlimit=1m" account will be unrestricted. This mode doesn't have any additional levels/penalties. --><restrict_mode use="period|limit" unlimit="1m"/><!-- killing slow SELECT queries (no other queries will be killed) --><!-- if "log" attribute was set all killed queries will be saved in log file --><!-- slow parameter in the <limit name="slow" current="30"/> will no be applied without enabling slow_queries --> <slow_queries run="on|off" log="/var/log/dbgovernor-kill.log"/> <!-- Enable or disable saving of statistics for lve-stats - On - enabled, Off-disabled --><statistic mode="on|off"></statistic><!-- Enable logging user queries on restrict, can be On or Off --><!-- Files are saved in /var/lve/dbgovernor-store and being kept here during 10 days --        ><logqueries use="on|off"></logqueries><default><!-- -1 not use limit(by default, current - required) --><limit name="cpu" current="150" short="100" mid="90" long="65"/><limit name="read" current="100000000" short="90000000" mid="80000000" long="70000000"/><limit name="write" current="100000000" short="90000000" mid="80000000" long="70000000"/><!-- Time to kill slow SELECT queries for account, can be different for accounts in seconds(but unit can be specified) --><!-- enabled only when slow_queries run="on" --><!-- s -- seconds, m -- minutes, h -- hours, d -- days --><limit name="slow" current="30"/></default><!-- name will matched account name, as extracted via prefix extraction --> <!-- mysql_name will match exact MySQL user name. If both name and mysql_name are present, system will produce error --><!-- mode restrict -- default mode, enforcing restrictions --><!-- mode norestrict -- track usage, but don’t restrict user --> <!-- mode ignore -- don’t track and don’t restrict user --><user name=”xxx” mysql_name=”xxx” mode=”restrict|norestrict|ignore”><limit...></user> <!-- debug mode for particular user. The information logged to restrict log. --><debug_user name="xxx"/> </governor>
```


## Starting And Stopping


To start:
<span class="notranslate"> </span>
```
$ service db_governor start
```

To stop:
<span class="notranslate"> </span>
```
$ service db_governor stop
```


## Mapping a User to Database 


**[** <span class="notranslate"> MySQL Governor </span> ** 1.x]**

Traditionally <span class="notranslate"> MySQL Governor </span> used prefixes to map user to database. With the latest version, we automatically generate <span class="notranslate"> user -> database user </span> mapping for <span class="notranslate"> cPanel </span> and <span class="notranslate"> DirectAdmin </span> control panels (other panels will follow).

The mapping file is located in: <span class="notranslate"> /etc/container/dbuser-map </span>

The format of the file:
<span class="notranslate"> </span>
```
[dbuser_name1] [account_name1] [UID1]...[dbuser_nameN] [account_nameN] [UIDN]
```

For example:
<span class="notranslate"> </span>
```
pupkinas_u2 pupkinas 502pupkinas_u1 pupkinas 502pupkinas_u3 pupkinas 502pupkin2a_uuu1 pupkin2a 505pupkin10_p10 pupkin10 513pupkin5a_u1 pupkin5a 508pupkin3a_qq1 pupkin3a 506pupkin3a_test22 pupkin3a 506pupkin3a_12 pupkin3a 506
```

This would specify that db users: <span class="notranslate"> pupkinas_us2, pupkinas_u1, pupkinas_u3 </span> belong to user <span class="notranslate"> pupkinas </span> with uid (lve id)  502
db user <span class="notranslate"> pupkin2a_uuu1 </span> belongs to user <span class="notranslate"> pupkin2a </span> with uid 505, etc...

This file is checked for modifications every 5 minutes.

If you need to force reload of that file, run:
<span class="notranslate"> </span>
```
service db_governor restart
```


## Log Files


<span class="notranslate"> </span>

<span class="notranslate"> MySQL Governor </span> error log is used to track any problems that <span class="notranslate"> MySQL Governor </span> might have

<span class="notranslate"> </span>

Restrict log is located in <span class="notranslate"> /var/log/dbgovernor-restrict.log </span>

Restrictions:
<span class="notranslate"> </span>
```
_timestamp_ _username_ LIMIT_ENFORCED _limit_setting_ __current_value_                         _restrict_level__ SERVER_LOAD TRACKED_VALUES_DUMP ... 
```

 <span class="notranslate"> TRACKED_VALUES_DUMP=busy_time:xx,cpu_time:xx,... </span>
 <span class="notranslate"> SERVER_LOAD </span> = load averages followed by output of <span class="notranslate"> vmstat </span>
 <span class="notranslate"> TRACKED_VALUES_DUMP </span> is available with <span class="notranslate"> MEDIUM & LONG </span> format
 <span class="notranslate"> SERVER_LOAD </span> is available with <span class="notranslate"> LONG </span> format

## Change MySQL version


If you would like to change to a different MySQL version, or switch to <span class="notranslate"> MariaDB </span> you have to start by backing up existing databases.






<span class="notranslate"> </span>
```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --mysql-version=MYSQL_VERSION$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install
```


* If you are using <span class="notranslate"> cPanel </span> or <span class="notranslate"> DirectAdmin </span> - recompile <span class="notranslate"> Apache </span> .

To install beta version of MySQL:
<span class="notranslate"> </span>
```
$ /usr/share/lve/dbgovernor/mysqlgovernor.py --install-beta
```


<span class="notranslate"> MYSQL_VERSION </span> can be one of the following:

| | |
|-|-|
|<span class="notranslate"> auto </span> | default version of MySQL for given OS release (or cPanel settings)|
|<span class="notranslate"> mysql50   </span> | MySQL v5.0|
|mysql51 | MySQL v5.1|
|mysql55 | MySQL v5.5|
|mysql56 | MySQL v5.6|
|mysql57 | MySQL v5.7|
|mysql80 | MySQL v8.0 [requires MySQL Governor 1.2-37+; database packages are available in Beta only, so, please use `--install-beta` flag instead of ` --install` ]|
|mariadb55 | MariaDB v5.5|
|mariadb100 | MariaDB v10.0|
|mariadb101 | MariaDB v10.1|
|mariadb102 | MariaDB v 10.2|
|mariadb103 | MariaDB v 10.3 [requires <span class="notranslate"> MySQL Governor </span> 1.2-36+; database packages are available in <span class="notranslate"> Beta </span> only, so, please use <span class="notranslate"> `--install-beta` </span> flag instead of <span class="notranslate"> `--install` </span> ]|
|percona56 | Percona v 5.6|


* We don't recommend to downgrade from MySQL v5.6, MariaDB 10.x



MySQL Governor starting from version 1.2-37 (in Beta since December 11th 2018) supports MySQL 8.0 installation.

## Command-line Tools


<span class="notranslate"> dbtop </span> -- monitor MySQL usage on per user bases. More info...
<span class="notranslate"> dbctl </span> -- command line tool to manage <span class="notranslate"> DB Governor configuration.  [More info...](/mysql_governor/#dbctl) </span>
<span class="notranslate"> lveinfo --dbgov </span> -- provides historical information about usage and customer restrictions. [More info...](/mysql_governor/#lveinfo-dbgov)
<span class="notranslate"> dbgovchar </span> -- generate charts for MySQL usage. [More info...](/mysql_governor/#dbgovchart)


### dbtop


Utility to monitor MySQL usage. Requires <span class="notranslate"> db_governor </span> to be running. It shows usage for the current, mid and long intervals.



<span class="notranslate"> -c </span> show one time user list (no interactive mode)
<span class="notranslate"> -r interval </span> refresh interval for interactive mode (in seconds)


<span class="notranslate"> z </span> toggle color mode and two-color mode
<span class="notranslate"> q </span>  <span class="notranslate"> F10, Ctrl-c </span> - quit program
<span class="notranslate"> u </span> sort table by username
<span class="notranslate"> c </span> sort table by cpu column
<span class="notranslate"> r </span> sort table by read column
<span class="notranslate"> w </span> sort table by write column
<span class="notranslate"> l </span> sort by restriction level
<span class="notranslate"> t </span> sort by time before restrictions will be lifted.

Control keys, that sort table, displays into header of table bold and underlined symbol.
Sorted field will be highlighted by *.
<span class="notranslate"> CAUSE </span> field shows current stage, reason for restriction and number of seconds before restriction will be lifted:
Values of column ' <span class="notranslate"> CAUSE </span> ' - cause of restriction or freezing:
Possible stages: - - <span class="notranslate"> OK </span> , 1 - Restriction 1, 2 - Restriction 2, 3 - Restriction 3, 4 -- restriction level 4

<span class="notranslate"> c - current </span> (current value of parameter)
<span class="notranslate"> s - short </span> (average value of 5 last values of parameter)
<span class="notranslate"> m - middle </span> (average value of 15 last values of parameter)
<span class="notranslate"> l - long </span> (average value of 30 last values of parameter)
and parameter which is cause of restriction
<span class="notranslate"> 1/s:busy_time/12 </span> - first level restricted account with short average restriction <span class="notranslate"> by busy_time </span> with 12 seconds left before re-enabled.



<span class="notranslate"> cpu </span> - number in %, shows <span class="notranslate"> cpu </span> usage by user
· <span class="notranslate"> read </span> - number of bytes (kbytes, mbytes, gbytes) which user reads per second
· <span class="notranslate"> write </span> - number of bytes (kbytes, mbytes, gbytes) write user reads per second


Accounts highlighted in color means that the account is restricted.
Accounts highlighted in color are in cool down period

Command line parameters of <span class="notranslate"> dbtop </span> utility:
<span class="notranslate"> -r - dbtop </span> refresh period in seconds ( <span class="notranslate"> dbtop -r12 </span> )

### dbctl


usage: <span class="notranslate"> dbctl command [parameter] [options] </span>


<span class="notranslate"> set </span> set parameters for a <span class="notranslate"> db_governor </span>
<span class="notranslate"> list </span> list users & their limits. It will list all users who had been active since <span class="notranslate"> Governor </span> restart,  as well as those for who explicit limits were set
<span class="notranslate"> list-restricted </span> list restricted customers, with their limits, restriction reason, and time period they will still be restricted
<span class="notranslate"> ignore </span> ignore particular user
<span class="notranslate"> watch </span> start observing particular user again
<span class="notranslate"> delete </span> remove limits for user/use defaults
<span class="notranslate"> restrict </span> restrict user using lowest level (or if <span class="notranslate"> --level </span> specified, using the specified level)
<span class="notranslate"> unrestrict </span> unrestrict username (configuration file remains unchanged)
<span class="notranslate"> unrestrict-all </span> unrestrict all restricted users (configuration file remains unchanged)
<span class="notranslate"> --help </span> show this message
<span class="notranslate"> --version </span> version number
<span class="notranslate"> --lve-mode </span> set <span class="notranslate"> DB Governor </span> mode of operation. Available values: <span class="notranslate"> off|abusers|all|single|on </span>
 <span class="notranslate"> off </span> - monitor only, don't throttle
<span class="notranslate"> abusers </span> - when user reaches the limit, put user's queries into LVE for that user (experimental)
<span class="notranslate"> all </span> - user's queries always run inside LVE for that user (experimental)
<span class="notranslate"> single </span> - single LVE for all abusers.
<span class="notranslate"> on </span> - same as <span class="notranslate"> single </span> (deprecated)



<span class="notranslate"> default </span> set default parameter
<span class="notranslate"> usrename </span> set parameter for user



<span class="notranslate"> --cpu=N </span> limit <span class="notranslate"> CPU </span> (pct) usage
<span class="notranslate"> --read=N </span> limit <span class="notranslate"> READ </span> (MB/s) usage
<span class="notranslate"> --write=N </span> limit <span class="notranslate"> WRITE </span> (MB/s) usage
<span class="notranslate"> --level=N </span> level (1,2,3 or 4) specified (deprecated) - this option is available only for period mode:

<span class="notranslate"> <restrict_mode use="period"/> </span> (see http://docs.cloudlinux.com/index.html?mysql_governor_configuration.html)

The default mode is the " <span class="notranslate"> limit </span> " - when a user hits limits, the account will be marked as restricted and if the user does not hit the limit again during " <span class="notranslate"> unlimit=1m </span> " account will be unrestricted. This mode doesn't have any additional levels/penalties.
<span class="notranslate"> <restrict_mode use="limit" unlimit="1m"/> </span>

Changing the "unlimit" can be done only via the configuration file (see [http://docs.cloudlinux.com/index.html?mysql_governor_configuration.html](http://docs.cloudlinux.com/index.html?mysql_governor_configuration.html) ).
<span class="notranslate"> --slow=N </span> limit time (in seconds) for long running <span class="notranslate"> SELECT </span> queries

Options for parameter <span class="notranslate"> list </span> :

<span class="notranslate"> `--kb`                      show limits in Kbytes no pretty print </span>
<span class="notranslate"> `--bb`                      show limits in bytes no pretty print </span>
<span class="notranslate"> `--mb`                      show limits in Mbytes no pretty prin </span>

Examples:
<span class="notranslate"> </span>
```
$ dbctl set test2 --cpu=150,100,70,50 --read=2048,1500,1000,800
```

sets individual limits for <span class="notranslate"> cpu (current, short, middle </span> period) and <span class="notranslate"> read (current, short, middle, long </span> periods) for user <span class="notranslate"> test2 </span>
<span class="notranslate"> </span>
```
$ dbctl set default --cpu=70,60,50,40
```

changes default <span class="notranslate"> cpu </span> limits.

All new limits will be applied immediately

To unrestrict user:
<span class="notranslate"> </span>
```
$ dbctl unrestrict username
```

To unrestrict all users:
<span class="notranslate"> </span>
```
$ dbctl unrestrict-all 
```

To restrict user:
<span class="notranslate"> </span>
```
$ dbctl restrict dbgov
```

To restrict user to level 2 restriction:
<span class="notranslate"> </span>
```
$ dbctl restrict dbgov --level=2
```

To make <span class="notranslate"> Governor </span> to ignore user:
<span class="notranslate"> </span>
```
$ dbctl ignore username
```

Delete user's limits, and use defaults instead:
<span class="notranslate"> </span>
```
$ dbctl delete username
```

Show limits as bytes:
<span class="notranslate"> </span>
```
$dbctl list --bb
```


### lveinfo --dbgov


<span class="notranslate"> lveinfo </span> tool is a part of <span class="notranslate"> lve-stats </span> package. It was extended to collect historical information about MySQL usage.

<span class="notranslate"> $ lveinfo --dbgov --help </span>
<span class="notranslate"> </span>
```
Displays information about historical Db Governor usageUsage: lveinfo [OPTIONS] -h --help              : this help run report from date and time in YYYY-MM-DD HH:MM format if not present last 10 mscreen-v, --version          : version number-f, --from=            : inutes are assumed-t, --to=              : run report up to date and time in YYYY-MM-DD HH:MM format      if not present, reports results up to now    --period=          : time period      usage            : specify minutes with m,  h - hours, days with d, and values:                       : today, yesterday; 5m - last 5 minutes, 4h -- last four hours,                       : 2d - last 2 days, as well as today-o, --order-by=        : orders results by one of the following:      con              : average connections      cpu              : average CPU usage      read             : average READ usage      write            : average WRITE usage-u, --user=            : mysql username-l, --limit=           : max number of results to display, 10 by default-c, --csv              : display output in CSV format-b, --format           : show only specific fields into output      available values:      ts               : timestamp records      username         : user name      con              : average connections      cpu              : average CPU usage      read             : average READ usage      write            : average WRITE usage      lcpu             : CPU limit      lread            : READ limit      lwrite           : WRITE limit    --show-all         : full output (show all limits); brief output is default -o, --order-by=        : orders results by one of the following:      ts               : timestamp records      username         : user name      max_sim_req      : max simultaneous requests      sum_cpu          : average CPU usage      sum_write        : average WRITE usage      sum_read         : average READ usage      num_of_rest      : number of restricts      limit_cpu_end    : limit CPU on period end      limit_read_end   : limit READ on period end      limit_write_end  : limit WRITE on period end    --id=              : LVE id -- will display record only for that LVE id-u, --user=            : Use username instead of LVE id, and show only record for that                       : user-l, --limit=           : max number of results to display, 10 by default-c, --csv              : display output in CSV format-b, --by-usage         : show LVEs with usage (averaged or max) within 90% percent                       : of the limit      available values:      sum_cpu          : average CPU usage      sum_write        : average WRITE usage      sum_read         : average READ usage      num_of_rest      : number of restricts      limit_cpu_end    : limit CPU on period end      limit_read_end   : limit READ on period end      limit_write_end  : limit WRITE on period end    --show-all         : full output (show all limits); brief output is default TS                     : timestamp recordsUSER                   : user nameCPU                    : average CPU usageREAD                   : average READ usageWRITE                  : average WRITE usageCON                    : average connectionslCPU                   : CPU limitlREAD                  : READ limitlWRITE                 : WRITE limitRESTRICT               : C-cpu restrict, R- read restrict, W- write restrict
```

Example:
<span class="notranslate"> </span>
```
root@cpanel1 [~/ttttt]# lveinfo --dbgov --user=dbgov --period=1d --limit=10TS                   USER   CPU     READ    WRITE   CON     lCPU    lREAD   lWRITE   RESTRICT  2012-12-06 11:14:49  dbgov   9       0.0     0.0     1       90      1000    1000                2012-12-06 11:13:49  dbgov   9       0.0     0.0     1       90      1000    1000                2012-12-06 11:12:49  dbgov   9       0.0     0.0     1       90      1000    1000                2012-12-06 11:11:49  dbgov   9       0.0     0.0     1       90      1000    1000                2012-12-06 11:10:49  dbgov   9       0.0     0.0     1       90      1000    1000                2012-12-06 11:09:49  dbgov   90      0.0     0.0     1       90      1000    1000     C          2012-12-06 11:08:49  dbgov   0       0.0     0.0     0       400     1000    1000                2012-12-06 11:07:49  dbgov   0       0.0     0.0     0       400     1000    1000                2012-12-06 11:06:49  dbgov   0       0.0     0.0     0       400     1000    1000   
```


### dbgovchart


<span class="notranslate"> dbgovchart </span> is analog of <span class="notranslate"> lvechart </span> tool to create charts representing customer's to MySQL usage

Usage: <span class="notranslate"> `/usr/sbin/dbgovchart [OPTIONS` </span>

Acceptable options are:
<span class="notranslate"> </span>
```
--help      This help screen--version   Version number--from=     Run report from date and time in YYYY-MM-DD HH:MM format            if not present last 10 minutes are assumed--to=       Run report up to date and time in YYYY-MM-DD HH:MM format            if not present, reports results up to now--period=   Time period            specify minutes with m,  h - hours, days with d, and values:            today, yesterday            5m - last 5 minutes, 4h - last four hours, 2d - last 2 days,            as well as today--user=     mysql username--output=   Filename to save chart as, if not present, output will be sent to STDOUT--show-all  Show all graphs (by default shows graphs for which limits are set)
```


Charts examples:
![](/images/1111.png)
![](/images/1111_2.png)

## Backing Up MySQL


On <span class="notranslate"> cPanel </span> server disable MySQL service monitoring before doing the job:
<span class="notranslate"> </span>
```
$ whmapi1 configureservice service=mysql enabled=1 monitored=0
```

Execute as <span class="notranslate"> root </span> :
<span class="notranslate"> </span>
```
$ mkdir -p ~/mysqlbkp$ service mysql restart --skip-networking --skip-grant-tables$ mysql_upgrade$ mysqldump --all-databases --routines --triggers > ~/mysqlbkp/dbcopy.sql$ service mysql stop$ cp -r /var/lib/mysql/mysql ~/mysqlbkp/$ service mysql start
```

On <span class="notranslate"> cPanel </span> server enable monitoring back:
<span class="notranslate"> </span>
```
$ whmapi1 configureservice service=mysql enabled=1 monitored=1
```








## abrt


We have created a plugin for <span class="notranslate"> abrt </span> tool to automatically upload core dumps in case <span class="notranslate"> MySQL Governor </span> crashes.

To install the plugin:
<span class="notranslate"> </span>
```
$ yum install cl-abrt-plugin --enablerepo=cloudlinux-updates-testing
```

It will monitor crash reports for <span class="notranslate"> `/usr/sbin/db_governor, /usr/sbin/dbtop and /usr/sbin/dbctl` </span>

You can modify <span class="notranslate"> `/etc/libreport/plugins/dropbox.conf` </span> to monitor other software as well by adding them to <span class="notranslate"> AppList </span> .
<span class="notranslate"> </span>
```
AppLists=/usr/sbin/db_governor,/usr/sbin/dbtop,/usr/sbin/dbctl
```


## Troubleshooting




<span class="notranslate"> MariaDB 5.5 </span> and <span class="notranslate"> MariaDB 10.0 </span> have only file for managing the service, but the file has <span class="notranslate"> LSB </span> functions, so it is supported by <span class="notranslate"> `systemd` </span> .

For adding extra limits, do the following:

1. Run:
<span class="notranslate"> </span>
```
mkdir /etc/systemd/system/mariadb.service.d/
```

2. Run:
<span class="notranslate"> </span>
```
touch /etc/systemd/system/mariadb.service.d/limits.conf
```

3. Add the following content to the the file <span class="notranslate"> `/etc/systemd/system/mariadb.service.d/limits.conf` </span> :
<span class="notranslate"> </span>
```
[Service] LimitNOFILE=99999
```




This may be caused by changing root/administrator credentials without updating MySQL <span class="notranslate"> Governor </span> configuration file.

When you change root or administrator credentials in Plesk or DirectAdmin, you also need to update MySQL <span class="notranslate"> Governor </span> configuration file. This could be done with the following command (available since governor-mysql 1.2-38):
<span class="notranslate"> </span>

```
/usr/share/lve/dbgovernor/mysqlgovernor.py --update-config-auth
```

The command updates credentials in MySQL <span class="notranslate"> Governor </span> configuration file and restarts <span class="notranslate"> db_governor </span> service afterwards.

After applying the command MySQL <span class="notranslate"> Governor </span> successfully connects to MySQL.



