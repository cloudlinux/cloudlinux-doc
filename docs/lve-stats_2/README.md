# LVE-Stats 2



Old LVE-statistics store averages as integer numbers, as % of
100%
Old LVE-statistics does not provide a way to determine a cause of LVE faults, i.e. what processes are running when user hits LVE limits.
Notifications in old LVE-statistics are not accurate because they are based on average values for
Old LVE-statistics functionality is hard to extend.


increased precision of statistics;
 usage is calculated  in terms of % of a single core (100% usage means one core);
lvestats-server emulates and tracks faults for , , ;
lvestats-server saves “snapshots” of user’s processes and queries for each “incident” - added new lve-read-snapshot utility;
improved notifications about hitting LVE limits (more informative and without false positives);
implemented ability to add custom plugins;
MySQL and support;
more pretty, scalable, interactive charts;
snapshots include HTTP-requests.


Notifications for control panels other than CPanel.
Burstable Limits/server health: We are monitoring server health ( , , idle ) and automatically decreasing/increasing limits based on server health.
 : plugin would analyze usage per group of users (reseller’s usage), and do actions.
Suspend/notify plugin: would detect that user is being throttled for 10 minutes, and suspend him (just because), or notify, or increase limits.


## Installation



To install please execute:

```
yum install lve-stats
```

To update:

```
yum update lve-stats
```

Settings of old (ver. 0.x) are imported automatically on the first install/update of new package.

SQLite database file is located in , data from old lve-stats (ver. 0.x) are being migrated automatically in the background. Migrating process can last 2-8 hours (during this time lags are possible when admin is trying to check statistics, at the same time users will not be affected). Migrating the latest 30 days, stable migration is provided.

Currently new supports all databases available in CloudLinux (except for CL5).


If you have any problems after update, downgrade to the previous stable version by running:

```
yum downgrade lve-stats
```

and contact CloudLinux support at




## Configuration




Main configuration file _ _ contains the following options:

- selects appropriate database type to use;

- connection string for and MySQL database, has the following form:

` ` ` `

Default port is used for specific database, if port is not specified (typical port is 3306 for MySQL and 5432 for ). Connection string is not used for sqlite database.

- sets the name of the server (at most 10 characters). This option is to use with centralized database ( or MySQL). For use with sqlite database, value of this option should be "localhost" (without quotes).

– path to directory containing custom plugins for (default path ).

- period of time to write data to database (in seconds); default value is 60 seconds.

- timeout for custom plugins (seconds). If plugin execution does not finish within this period, plugin is terminated. Default value is 5 seconds.

` ` - duration of one cycle of (seconds). This should be less than total duration of execution of all plugins. Default value is 5 seconds. Increasing this parameter makes precision of statistics worse.

- period of time (in days) to keep history in database. Old data is removed from database automatically. Default value is 60 days.

– sets compatibility output mode (compatibility with older lveinfo version).  Value “v1” (without quotes) enables compatibility with old version of . “v2” value enables “ ” output mode, but can break LVE plugins for control panels (statistics in , , etc). Support of v2 mode will be added to LVE plugins in the recent future. When mode parameter is absent, later version of is implied.

- disable snapshots and incidents. Possible values: .

Configuration files for plugins are located in directory.

contains the following options:

- Minimal interval of time between incidents (in seconds). If minimal interval of time between LVE faults is greater than value specified, than new "incident" will begin and new snapshots will be saved. Default value is 300 seconds.

- Maximum number of snapshots saved per minute for specific LVE id (default is 2).

- Maximum number of snapshots saved for one "incident". Default is 10.

contains the following options:

– enables notification for admin  ( , default N);

– enables notification for reseller ( , default N);

- enables notification for customers  ( , default N);

– Y=notify all users, N=notify only hoster's users (whos reseller is root), default = N;

– notify about faults when customer hits 100% of his limit ( , default N);

- notify about faults when customer hits 100% of his limit ( , default N);

- notify about faults when customer hits 100% of his limit ( , default N);

- notify about memory faults ( , default N);

– notify about entry processes faults ( , default N);

– notify about number of processes faults ( , default N);

– minimum number of faults to notify admin (default 1);

– minimum number of faults to notify customer (default 1);

– period of time to notify admin (default 12h);

– period of time to notify customer (default 12h);

- sender email address. For example:

- email message subject.  For example:

Templates of notifications are located here:

_/usr/share/lve/emails/en_US/admin_notify.txt_
_/usr/share/lve/emails/en_US/reseller_notify.txt_
_/usr/share/lve/emails/en_US/user_notify.txt_
_/usr/share/lve/emails/en_US/admin_notify.html_
_/usr/share/lve/emails/en_US/reseller_notify.html_








```
service lvestats restart
```

- configuration file for

### LVE Stats2






**1. MySQL Server Setup**

If MySQL Server is not installed, then install it according to control panel documentation.

For non-panel system:

_(CloudLinux 6)_

```
yum install mysql mysql-server
service mysqld start
chkconfig mysqld on
```

_(CloudLinux 7)_

```
yum install mariadb mariadb-server
systemctl start mariadb.service
systemctl enable mariadb.service
```


**2. Database Setup**

1. Run MySQL administrative utility: .

2. In utility run the commands:

a.

```
CREATE DATABASE db_lvestats2;
```

creating server DB. Also, check **_Note_** below.

b.

```
CREATE USER 'lvestats2'@'localhost' IDENTIFIED BY 'lvestats2_passwd';
```

creating a user for server to work under. Also, check **_Note_** below.

c.

```
GRANT ALL PRIVILEGES ON db_lvestats2.* TO 'lvestats2'@'localhost';
```

granting all the privileges for all DB tables to the user. Use the username and DB name from points a. and b. above.

d.

```
FLUSH PRIVILEGES;
```

refreshing privileges information.

e. Exit administrative utility .





**3. **

Stop server running the command:

```
service lvestats stop
```

In server configuration file _/etc/sysconfig/lvestats2_ edit the following options:

_db_type = mysql_
_connect_string = lvestats2:lvestats2_passwd@localhost/db_lvestats2_

Note that option value is used in format: . Username, password and DB name must be the same as in point 2.b. of Database Setup above.

After making changes in configuration files run

```
/usr/sbin/lve-create-db
 
```
for DB primary initialization (creating tables, indexes, etc). There is no need to create anything in the DB manually.

When done, restart server running:

```
service lvestats restart
```


**4. Additional Security Settings**

If you need to provide access to information utilities ( ) for different users, then we recommend creating one more DB user with read-only privilege to guarantee information security. It can be done by running the following commands in administrative utility:

a.

```
CREATE USER 'lvestats2_read'@'localhost' IDENTIFIED BY 'lvestats2_read_passwd';
```

creating a user (check **_Note_** above).

b.

```
GRANT SELECT ON db_lvestats2.* TO 'lvestats2_read'@'localhost';
```

granting read-only privilege to the user.

c.

```
FLUSH PRIVILEGES;
```

refreshing privileges information.

If server is set correctly (see information below), the information utilities will work under this user.

If you need to provide access to information utilities to other users, then in order to guarantee information security you should do the following:

а) Assign permission 600 to the main configuration file ( _/etc/sysconfig/lvestats2_ ), so that it could be read only by server and by utilities that run under root.

b) Copy , assign permission 644 to the new file, so that it could be read by any user but could only be changed by root.

с) In file, in the line _ _ , specify DB user with read-only permission, created above.

These steps allow hiding main DB user username/password from other system users.

If there is no need in such access differentiation, then _ _ file access permission should be 644, so that it could be read by all users and could be changed only by root.


**5. Using Special Characters in Database Password**

Since scheme is used in config option, then usage of special characters in user DB password is not allowed . To use special symbols in the password, it must be converted to [escape-sequence](https://en.wikipedia.org/wiki/Percent-encoding) . You can convert a password to escape-sequence in a console as follows:

```
echo -n '[You_P@$$]:' | perl -MURI::Escape -ne 'print uri_escape($_)."\n"'
%5BYou_P%40%24%24%5D%3A
```

Or replace the symbols manually:

```
 !    #    $    &    '    (    )    *    +    ,    /    :    ;    =    ?    @   [    ]
%21  %23  %24  %26  %27  %28  %29  %2A  %2B  %2C  %2F  %3A  %3B  %3D  %3F  %40  %5B %5D
```

After that _сonnect_string_ will look as follows:

  `сonnect_string=lvestats2:%5BYou_P%40%24%24%5D%3A@localhost/db_lvestats2`  ` ` 

### LVE Stats 2


_Note. Run all the commands below under _

**1. **



For control panels use proper documentation for installation on the links: [сPanel](https://documentation.cpanel.net/display/CKB/Install+or+Update+PostgreSQL+on+Your+cPanel+Server) , [Plesk](https://kb.plesk.com/en/123729) .

For non-panel CloudLinux run the following commands:

_(CloudLinux 6)_

```
yum install postgresql-server postgresql
service postgresql initdb
service postgresql start
chkconfig postgresql on
```

_(CloudLinux 7)_

```
yum install postgresql-server postgresql
postgresql-setup initdb
systemctl start postgresql
systemctl enable postgresql
```




1. In file change user authentication mode. Add the following lines (place before all other authentication parameters):

```
# IPv4 local connections for lve-stats-2.x
host dblvestat all 127.0.0.1/32 password
# IPv6 local connections for lve-stats-2.x
host dblvestat all ::1/128 password
 
```

These lines enable user authentication by the password for connections. You can set other modes if needed.

3. Apply config changes by running:

```
service postgresql restart
```


**2. DB for **

1. Run standard administrative utility:

```
sudo -u postgres psql postgres
 
```
( for сPanel).

2. In utility run:

a.

```
CREATE DATABASE dblvestat;
```

creating server DB. Also, check **_Note_** below.

b.

```
CREATE USER lvestat WITH password 'passw';
```

creating a user for server to work under. Also, check **_Note_** below.

c.

```
GRANT ALL privileges ON DATABASE dblvestat TO lvestat;
```

granting user all privileges for work with .

d. utility. (Alternatively ).




**3. **

Stop server by running:

```
service lvestats stop
```

In server config file _ _ edit options for connecting to DB:

```
db_type = postgresql
connect_string=lvestat:passw@localhost/dblvestat
If DB is going to be used as centralized for multiple hosts then collect_usernames parameter must be changed:
collect_usernames=true
```

Note that option value is of the format: . Username, password and DB name must be the same as in Database Setup section above.

After making changes in configuration files, for DB primary initialization (creating tables, indexes, etc) run:

```
/usr/sbin/lve-create-db 
```

There is no need to create anything in the DB manually. When done, restart server by running:

```
service lvestats restart
```


**4. Additional Security Settings**

If you need to provide access to information utilities ( ) for other users (or if is disabled), then in order to guarantee DB security the following steps are required:

a. Create a DB user with read-only permission:

```
CREATE USER lvestat_read WITH password 'passw';
GRANT CONNECT ON DATABASE dblvestat to lvestat_read;
\connect dblvestat;
GRANT SELECT ON lve_stats2_history, lve_stats2_history_gov, lve_stats2_history_x60, lve_stats2_incident, lve_stats2_servers, lve_stats2_snapshot, lve_stats2_user TO lvestat_read;
```

b. Assign root ownership and permission 600 to the main configuration file ( ), so that it could be read only by server and by utilities that run under root.

c. Copy , assign permission 644 to the new file, so that it could be read by any user but could be changed only by root.

d. In file, in the line _connect_string_ , specify DB user with read-only permission, created above.

These steps allow hiding main DB user username/password from other system users.

If there is no need in such access differentiation, then file access permission should be 644, so that it could be read by all users and could be changed only by .

When done restart server by running:

```
service lvestats restart
```


**5. Using Special Characters in Database Password**

Since scheme is used in config option, then usage of special characters in user DB password is not allowed . To use special symbols in the password, it must be converted to [escape-sequence](https://en.wikipedia.org/wiki/Percent-encoding) . You can convert a password to escape-sequence in a console as follows:

```
echo -n '[You_P@$$]:' | perl -MURI::Escape -ne 'print uri_escape($_)."\n"'
%5BYou_P%40%24%24%5D%3A
```

Or replace the symbols manually:

```
!    #    $    &    '    (    )    *    +    ,    /    :    ;    =    ?    @    [    ]
%21  %23  %24  %26  %27  %28  %29  %2A  %2B  %2C  %2F  %3A  %3B  %3D  %3F  %40  %5B  %5D
```

After that _сonnect_string_ will look as follows:

  `сonnect_string=lvestats2:%5BYou_P%40%24%24%5D%3A@localhost/db_lvestats2` 

### Customize 


is used as a template engine for the notifications.

The templates for notifications are located in ` ` , where - is the directory with localization name (language codes are formed according to and ). By default the templates for English are set: ` ` .

contains the following templates:

 for administrator;
` ` for reseller;
` ` for user.

The notification is formed as _ _ . The plain text is taken from the files, html version - from the template. In case when only one template is present ( or ) the notification is sent as a type notification. It is better to use type notifications because when a mail client can not display an html-format message, then it will be displayed as plain text version.

To localize notifications copy standard templates into directory with the proper locale name and translate the template. Also you can customize the main template making proper changes into it.

The list of variables that can be used in the template:

| |  | |
|-|--|-|
|Variable | Example | Description|
| |  | Notification receiver user name. Taken from profile in the control panel, by default - for user, for administrator, for reseller.|
| |  | Notification receiver email address.|
| |  | Main domain. Available only for user.|
| |  | Locale in which the notification is sent. Available only for user.|
| |  | User reseller. Available only for user.|
| |  | Verification and notification sending period.|
| |  | User login in the system.|
| | 500 | User ID in the system.|
| |  | See description in output. Available only for users|
| |  | html table with the list of users that exceeded limits. Available for administrator and reseller.|
| |  | ascii - table with the list of users that exceeded limits. Available only for admins and resellers.|

Sender’s email address by default is administrator email address from control panel settings if there is no email in the control panel).

It can be changed with option in the config

For example:



To apply changes restart service:

```
service lvestats restart
```

for CloudLinux 7

```
systemctl restart lvestats.service
```

Default subject is “ ”.  It can be changed for each template (and for localized templates as well). To change subject, in the very beginning of the file (no blank lines allowed in the beginning of the template) add the field , leave two blank lines after it and add template body.

Customized subjects can be taken only from the templates with the resolution . Changes apply without restart.

For backward compatibility the subject can be also changed with the key ` ` in the config

Customized subjects have higher priority than the key

Example for the file

```
Subject: Customized subject example
Dear {{TONAME}},
```
```
 
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

 
If your account is regularly exceeding it's available resources, please consider upgrading to a higher level hosting plan that includes more resources. If you have any questions or need help with anything, just reply to this email and let us know.
 
Sincerely,
 
Your Friendly Web Hosting Support Team
```


## Command-line Tools




| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |


### lveinfo


















| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| | |
|-|-|
| | |
| |  |  | |
|-|--|--|-|
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
|-|--|--|-|
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| |  |  | |
| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
|-|--|-|
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| |  | |
| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| |  |  |  | |
|-|--|--|--|-|
| |  |  |  | |
| |  |  |  | |
| |  |  |  | |
| |  |  |  | |
| |  |  |  | |
| |  |  |  | |
| |  |  |  | |
| |  |  |  | |
| |  |  |  | |
| | |
|-|-|
| | |






### lvechart








| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |


### dbgovchart








| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |


### lve-read-snapshot














































### lve-create-db



























### cloudlinux-top


[Usage](/cloudlinux_top.html#usage/)
[Output format](/cloudlinux_top.html#output_format/)
[Units of measurement](/cloudlinux_top.html#units_of_measurement/) 
[Errors handling](/cloudlinux_top.html#errors_handling/)
[Examples](/cloudlinux_top.html#examples/)

Utility provides information about current MySQL and LVE usage of a running system in JSON format.








Optional arguments.

| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |




```
{
   "mySqlGov": "enabled",              # possible values: enabled, error
   "mySqlGovMode": "abusers",          # see “
                                       # if MySQL Governor is not enabled, value is "none"
 
   "resellers": [                      # list of resellers (available only with
                                       # 
       {
           "id": 1000020005,           # internal record id
           "limit": <lve_section>,     # current limits (last 5 seconds)
           "name": "reseller_name",    # reseller’s login in control panel
           "usage": <lve_section>      # current usage (last 5 seconds)
       }
   ],
   "result": "success",                # see the ‘
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


The structure* of :


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

* you can modify this structure using option, see [usage examples](/cloudlinux_top.html#examples/) for details.
** mysql values are only present when statistics is available and options is not used.




For and sections we use the following units of measurement.

| | |
|-|-|
|**Value** | **Units of measurement**|
| | percentage of one core|
| | bytes per second|
| | number of operations per second|
| | bytes|
| | number of entry processes|
| | number of processes|




The format of the error message is the same as in the other utilities. When everything is ok, the value is . Otherwise, it contains error message `. ` In case of unexpected errors, the output will be as follows.


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





get 100 users ordered by usage


```
# cloudlinux-top --json --order-by cpu --max=100
```


get information about one user


```
# cloudlinux-top --json -u username
```


get information about reseller and his users


```
# cloudlinux-top --json --for-reseller=reseller_name
```


show only limits and usage


```
# cloudlinux-top --json --show=io
```


### cloudlinux-statistics


[Usage](/cloudlinux-statistics.html#usage/)
[Output format](/cloudlinux-statistics.html#output_format/)
[Units of measurement](/cloudlinux-statistics.html#units_of_measurement/)
[Errors handling](/cloudlinux-statistics.html#errors_handling/)
[Examples](/cloudlinux-statistics.html#examples/)

cloudlinux-statistics is a utility that provides historical information about resource usage.












Optional arguments.

| | |
|-|-|
| | |
| | |
| | |
| | |
| | |
| | |
| | |
| | |
`               `
Filter items by resource usage.

| | |
|-|-|
| | |
| | |


Filter items by the number of faults.

| | |
|-|-|
| | |
| | |
`             `
Filter items by a time interval.

Allows to get information for the given period of time; you can either set and options, or just get information for the recent time period using
and values are ignored when is set.

| | |
|-|-|
| | |
| | |
| | |

Get detailed statistics.

| | |
|-|-|
| | |
| | |
`    `



**Summary statistics**


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


**Detailed statistics**


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


For both, **summary statistics** and **detailed statistics** , is the same and looks like following*.


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


* you can specify only required fields using option;
** fields are only available with installed.


For and sections we use the following units of measurement.

| | |
|-|-|
|**Value** | **Units of measurement**|
| | percentage of one core|
| | bytes per second|
| | number of operations per second|
|and | bytes|
| | number of entry processes|
| | number of processes in LVE|


The format of the error message is the same as in the other utilities. When everything is ok, the value is . Otherwise, it contains error message `.`

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




get top 10 users ordered by usage for today


```
# cloudlinux-statistics --json --order-by=cpu --period=today --limit=10
```


get users that hit limit more than 10 times for today


```
# cloudlinux-statistics --json --period=today --by-fault=io --threshold=10
```


get users that used more than 80% of in last 24 hours


```
# cloudlinux-statistics --json --by-usage=cpu --percentage=80 --period=24h
```


get information only about reseller and his users


```
# cloudlinux-statistics --json --for-reseller=reseller_name
```


get information only about and usage


```
# cloudlinux-statistics --json --show=cpu,io
```


## Plugins


LVE comes with a set of generic plugins:

| |  |  |  | |
|-|--|--|--|-|
|Plugin Name | Order | Default | Period (seconds) | Description|
|LVECollector | 1000 | Y | 5 | Collects usage/limits data from /proc/lve/list|
|CPUInfoCollector | 2000 | Y | 5 | collents info about|
|LVEUsernamesCollector | 3000 | Y | 3600 | collects usernames & user ids to match later on|
|LVEUsageAnalyzer | 4000 | Y | 5 | analyzes usage of LVE|
|LveUsageAggregator | 5000 | Y | 60 | aggregates data by time periods|
|DBGovSaver | 6000 | Y | 5 | Saves data about database governor|
|FileSaver | 7000 | Y | 5 | Saves LVE data into /var/lve/info|
|CloudLinuxTopFileSaver | 8000 | Y | 60 | saves data used by to /var/lve/cloudlinux-top.json|
|DBSaver | 9000 | Y | 60 | save LVE data to dabase|
|DbUsernamesSaver | 10000 | Y | 3600 | saves users name to database|
|DBSaverX60 | 11000 | Y | 3600 | saves aggregated hourly data into database|
|SnapshotSaver | 12000 | Y | 30 | collects & saves snapshots data|
|StatsNotifier | 13000 | Y | varied | notify user/admin based on usage|
|HistoryCleaner | 14000 | Y | 3600 | removes old usage|
|ResMEMCollector | 1500 | N | 30 | collects physical memory usage from processes RES field instead of /proc/lve/list|
|LVEDestroyer | - | N | 5 | destroys LVEs that weren't active for X iterations. Number of iterations is passed from config using iterations variable. means plugin disabled|


To enable non-default plugin, copy or link it to _ /usr/share/lve-stats/plugins_ directory.

For example to enable _ ResMEMCollector_ plugin, do:


```
ln -s /usr/share/lve-stats/plugins.other/res_mem_collector.py /usr/share/lve-stats/plugins/
service lvestats restart
```



## Creating a Plugin for 


[Introduction](/lve-stats_2/#introduction)

[Server Plugin Arrangement](/lve-stats_2/#server-plugin-arrangement)

[Plugin Configuration](/lve-stats_2/#plugin-configuration)

[Types of Plugins](/lve-stats_2/#types-of-plugins)





### Introduction


complex has scalable architecture, which allows to connect custom plugins.


server searches for plugins in the directory which is specified with plugins parameter of server’s /etc/sysconfig/lvestats2 configuration file. Default directory is _ _ /usr/share/lve-stats/plugins.

Each plugin must be of a class, must be written in language and its file must have extension. Files with all other extensions will be ignored. For normal server work access permission 400 is enough; owner – .

Plugins' classes can be of the same name, but better not, because classes' names can affect the set of parameters in _set_config_ method. You can find detailed plugins' configuring information below, in appropriate chapter.

Plugin's class must contain method, which is invoked by the server every 5 seconds (by default, can be changed by interval parameter of configuration file).
Also method (configuration settings) can be available. You can find more info in chapter.

Additionally the following attributes can be set (plugin class instance variable):

 - defines plugin's position in the server's plugin list, (more info in ).
 or ) – the longest allowable duration of one launch of the plugin (execute method). Default value of parameter is 5 seconds.
 – sets the interval between two launches of execute plugin method in seconds. If not defined, then plugin runs every 5 seconds ( parameter in configuration file).

When method of the plugin is invoked, the server creates an attribute in it, where launch time is recorded. This value is equal to what a standard Python function _time.time()_ returns. All the plugins launched one after another receive the same  value of attribute from the server. is overwritten before method is invoked.

The previous value of now attribute is not saved by the server. If plugin needs it, it has to save it by itself.

Plugin's class can be inherited from class, which is the part of the server itself. This is not obligatory, but inheritance can help to avoid different errors in servers work, particularly if a plugin doesn't contain required execute method.

class is defined in the file: _/opt/alt/python27/lib/python2.7/site-packages/lvestats/core/plugin.py_ .

### Server Plugin Arrangement


When the server starts, it performs the search of plugins in the directory specified in /etc/sysconfig/lvestats2 configuration file. This directory is scanned only when the server starts, therefore if any plugin was added into the directory, the server has to be restarted with the following command:

```
service lvestats restart.
```

After successful restart the plugins are graded and executed  ascending by attribute. If any plugin's attribute is not set, it is considered as a Python language constant _sys.maxint_ (which is usually 9223372036854775807). This in fact means that such plugins will be executed in the last.
If any plugins has similar meanings, their execution order is unpredictable.

The server invokes method of all plugins one after another.

When the server invokes method of any plugin, it transmits a data dictionary ( _lve_data_ argument) into plugin. The dictionary is common for all the plugins. Any plugin can read, write and change any data in this dictionary. server doesn't control this area. That is why one must be careful while developing new plugins, in order not to change or corrupt other plugins' data which can break their functionality.

If an exception occurs in method, its text and python stack trace is recorded into server log /var/log/lve-stats and all the changes made to _lve_data_ dictionary before the exception happened are lost.

The keys of the _lve_data_ dictionary are recommended to look like , in order the plugins do not corrupt other data accidentally.

Server contains some standard plugins which define and use the following keys in the common dictionary lve_data: and . User plugins can use data from these keys, but it is recommended not to change them if there is no special need, because it can break the next plugins in the execution queue.

| | |
|-|-|
|Key | Content|
| | LVE version. The same as console command|
| | Dictionary, that contains lve id’s as keys and LVEStat class objects as values. Every LVEStat object contains values of usages and limits taken from     /proc/lve/list file for every . Dictionary keys – , including 0 for “ ” LVE. This dictionary is updated on each iteration of lvestats-server (every 5 seconds by default). LVEStat – is a standard server class, it can be imported with the command from _lvestats.core.lvestat_  The class is described in the file /opt/alt/python27/lib/python2.7/site-packages/lvestats/core/lvestat.py. Here you can find the whole list of data fields and their functions.|
| | _stats_ content from the previous iteration. Before the first iteration – empty dictionary.|
| | When LVE_VERSION is 4, real frequency in multiplied by number of cores. When LVE_VERSION > 4, speed is in conventional units and equals to 1000000000 * cores (1 per core).|
| | Quantity of /cores.|
| | Contains accumulated LVE statistics for each 5-seconds interval in current minute. Cleared each minute.|
| | Contains aggregated LVE Statistics for “previous” minute to store to database. Overwritten each minute.|

Each plugin’s instance lifetime is from the moment it was loaded till the server stops working. But if method working time exceeds timeout, the plugin will be terminated and restarted in the next iteration. All changes to the _lve_data_ dictionary will be lost.

During servers graceful shutdown (restart, server shutdown, commands ), each plugin receives SIGTERM signal.
This is useful to correctly unload the plugin (terminate all subsidiary processes, save data to files etc.). If a plugin doesn't need to “finalize” its execution before termination, then there's no need to implement this signal handler. Below you can see an example of such handler.




### Plugin Configuration


Server allows to configure each plugin separately.

On initialization stage the server invokes method of the plugin and locates there a dictionary which contains:

all parameters from file /etc/sysconfig/lvestats2 (global).
plugin's individual configuration file parameters (if one exists). Configuration files must be located in /etc/sysconfig/lvestats.config directory, have .cfg extension and be the same format as /etc/sysconfig/lvestats2. Files in this directory are matched with the plugins by name. For instance, if plugin's class is , then server will try to find and download /etc/sysconfig/lvestats.config/Plugin1_class.cfg. Names are case sensitive. If any plugin doesn't have an individual configuration file, then it's not an error. In this case plugin will just receive parameters from /etc/sysconfig/lvestats2.








### Types of Plugins


According to server architecture, plugins can be of the following types:






are designed to collect information; – to analyze it and form some other data on its basis; – to save information from the common dictionary into files, databases, etc.; - to notify system users about any events.

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

That is why we realize 4 plugins: ** ** and .


#### Collector


aim is to determine the size of a proper file.

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

Plugin algorithm is extremely simple – file size is read and written into data dictionary. Files name is read from _set_config_ method configuration. If the name is not specified, then is written into appropriate variable. All the errors are completely ignored (e.g. if specified file doesn't exist or there's no way to read any of it's information).

attribute is specified as 0 to make this plugin go the first among three. Data collector must always be the first in plugins logical chain, because it provides all the necessary information for the analyzer which goes the next. Specific values of я can be of any kind, but what is important is that when the server starts, all the plugins line up in proper sequence: .

In order to make plugin work, we have to create configuration file /etc/sysconfig/lvestats.config/FSize_watcher_collector.cfg with the following content:

```
# Config file for FSize_watcher_collector plugin
# Please define monitoring file here
#file_to_monitoring = /usr/local/cpanel/logs/error_log
file_to_monitoring = /usr/local/cpanel/logs/access_log
```

Note that file’s name without .cfg extension matches plugin class name.

option is read by plugin in method and contains file’s full name for monitoring.

Files for monitoring, suggested in the actual example - /usr/local/cpanel/logs/error_log and /usr/local/cpanel/logs/access_log - are real, these are cPanel control panel logs.

The first file is errors log; the second is appeal log, is refreshed during common work with panel (e.g. if user email address is changed).

Errors log tracking is more important, but appeal log monitoring allows to illustrate plugins work more in details, because it is refreshed more often.

Note that plugin can monitor one file only.

#### Analizer


decides if the file's size has changed and gives a command to persistor to refresh log.


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
# Plugin run period in seconds
period = 60
 
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

This plugin is extremely simple as well. It starts after , searches for file size in the dictionary and compares it with the previous index. If it has changed, then it writes a sign of presence of a new size into the dictionary. If no changes seen, then sign resets. The previous file size is stored in the plugin itself in variable. Note that they are stored during the whole server lifetime.

If file size is not found in data dictionary, then plugin just ends.

All the errors are completely ignored.

is unconfigurable, that is why it doesn’t require any configuration file and it doesn’t contain method.

Plugin starts every 60 seconds (1 minute), because we need data fixation to be performed one time in a minute.


#### Persistor


saves information from the common dictionary into files, databases, etc.

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

Configuration file _/etc/sysconfig/lvestats.config/FSize_watcher_saver.cfg_ :

```
# Config file for FSize_watcher_saver.py plugin
# Please define log filename here
log_filename = /var/log/FSize_watcher.log
```

This plugin starts after , checks new file size flag, and if positive – writes it into log. If the flag is cleared (which means the size hasn't changed), then plugin simply ends.

Starts once in a minute (period=60).

Also this plugin shows the work of signal handler.

Plugin constructor registers handler-function of a  proper signal: This means, that when the server finishes its work, then method of plugin class will be invoked. In the actual example the function just writes a notification into log, tracing the fact of it's invocation.

Pay attention on command in the end of the handler. Find the information on it in section.

In addition see into examples of file log /var/log/FSize_watcher.log formed by the plugins above:

_Tue Feb  3 13:06:24 2015 - FSize_watcher started. Monitoring file: /usr/local/cpanel/logs/access_log, saving data period=60 sec_
_Tue Feb  3 13:06:24 2015 - FSize_watcher: file size is 122972890 bytes_
_Tue Feb  3 13:07:25 2015 - FSize_watcher: file size is 122975507 bytes_
_Tue Feb  3 13:08:25 2015 - FSize_watcher: file size is 122978124 bytes_
_Tue Feb  3 13:09:25 2015 - FSize_watcher: file size is 122978997 bytes_
_Tue Feb  3 13:10:25 2015 - FSize_watcher: file size is 122981033 bytes_
_Tue Feb  3 13:11:25 2015 - FSize_watcher: file size is 122982052 bytes_
_Tue Feb  3 13:13:25 2015 - FSize_watcher: file size is 122983798 bytes_
_Tue Feb  3 13:20:15 2015 - File watcher saver plugin: TERMINATE_

and

_Thu Feb  5 13:07:27 2015 - FSize_watcher started. Monitoring file: /usr/local/cpanel/logs/error_log, saving data period=60 sec_
_Thu Feb  5 13:07:27 2015 - FSize_watcher: file size is 14771849 bytes_
_Thu Feb  5 14:03:32 2015 - FSize_watcher: file size is 14771995 bytes_
_Thu Feb  5 15:01:36 2015 - FSize_watcher: file size is 14772434 bytes_
_Thu Feb  5 17:15:47 2015 - FSize_watcher: file size is 14772873 bytes_
_Thu Feb  5 18:47:54 2015 - FSize_watcher: file size is 14775213 bytes_
_Thu Feb  5 19:11:56 2015 - FSize_watcher: file size is 14775652 bytes_
_Thu Feb  5 21:09:05 2015 - FSize_watcher: file size is 14776091 bytes_
_Thu Feb  5 23:06:14 2015 - FSize_watcher: file size is 14776530 bytes_
_Fri Feb  6 00:47:23 2015 - FSize_watcher: file size is 14778870 bytes_
_Fri Feb  6 01:02:24 2015 - FSize_watcher: file size is 14779309 bytes_
_Fri Feb  6 02:00:28 2015 - FSize_watcher: file size is 14779434 bytes_
_Fri Feb  6 03:16:34 2015 - FSize_watcher: file size is 14779873 bytes_
_Fri Feb  6 05:04:42 2015 - FSize_watcher: file size is 14779998 bytes_
_Fri Feb  6 05:12:43 2015 - FSize_watcher: file size is 14780437 bytes_
_Fri Feb  6 05:56:50 2015 - FSize_watcher: file size is 14780551 bytes_
_Fri Feb  6 06:01:50 2015 - FSize_watcher: file size is 14780975 bytes_
_Fri Feb  6 06:03:51 2015 - FSize_watcher: file size is 14782183 bytes_
_Fri Feb  6 06:04:51 2015 - FSize_watcher: file size is 14782575 bytes_
_Fri Feb  6 06:18:52 2015 - FSize_watcher: file size is 14782647 bytes_
_Fri Feb  6 06:21:52 2015 - FSize_watcher: file size is 14782898 bytes_
_Fri Feb  6 06:48:54 2015 - FSize_watcher: file size is 14785238 bytes_
_Fri Feb  6 07:09:56 2015 - FSize_watcher: file size is 14785677 bytes_
_Tue Feb  6 08:03:15 2015 - File watcher saver plugin: TERMINATE_

You can see that log record is being held once a minute (what we actually need), new file size is written.

Also we can notice that handler was executed, signaling that plugin received the notification about server shut-down.


#### Notifier


informs system users about any events.

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
# this plugin should be third in chain
order = 3
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

Configuration file _/etc/sysconfig/lvestats.config/FSize_watcher_notifier.cfg_ :

```
# Config file for FSize_watcher_notifier.py plugin
# Please define email options here
 
NOTIFY_FROM_EMAIL=user@hostname
NOTIFY_FROM_SUBJECT=Message from FSize_watcher_notifier
NOTIFY_TO_EMAIL=admin@hostname
NOTIFY_PERIOD=12h
```

Plugin’s index number equals 3 ( ), that is why starts after the rest. But since it uses only data formed by , then its order may equal any number bigger that order (>0).

reads the necessary parameters from the configuration (email address, topic, period) and writes them into its own log as reference.

Plugin’s method checks the availability of all the necessary data (email parameters, collectors data) and sends the message. All the notifications are written into the own log.

If any data is missing,  the message is not sent.

Log example:

_Thu Feb  5 11:51:34 2015 - FSize_watcher_notifier plugin: configure_
_       - Period: 60.0_
_       - From: user@hostname_
_       - To: admin@hostname_
_       - Subject: 'Message from FSize_watcher_notifier'_
_Thu Feb  5 11:51:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent_
_Thu Feb  5 11:52:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent_
_Thu Feb  5 11:53:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent_
_Thu Feb  5 11:54:35 2015 - FSize_watcher_notifier plugin: email message was successfully sent_
_Thu Feb  5 11:57:00 2015 - FSize_watcher_notifier plugin: configure_
_       - Period: 43200.0_
_       - From: user@hostname_
_       - To: admin@hostname_
_       - Subject: 'Message from FSize_watcher_notifier'_
_Thu Feb  5 11:57:00 2015 - FSize_watcher_notifier plugin: email message was successfully sent_


## File info and format for /var/lve/info file


This file is used by control panels to display to user their 'current' usage. The file is updated every 5 seconds by lve-stats.

When writing to this file we make sure that: average is never more then for that resource.

Example:

0,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0
600,1,20,2492,2500,70,262144,0,0,262144,33,0,100,1,0,0,0,1024,1024,0,5,0,0
200,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0
500,0,20,0,2500,0,262144,0,0,262144,0,0,100,0,0,0,0,1024,1024,0,0,0,0

First line of the file is ' '.

Fields:

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

## Troubleshooting


service and utilities write fatal errors to system log.

There is _ /var/log/lve-stats.log_ file with additional information (warnings, tracebacks for errors)

