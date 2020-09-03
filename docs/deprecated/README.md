# Deprecated

* [Python Selector (Old)](/deprecated/#python-selector-old)
* [Git for cPanel](/deprecated/#git-for-cpanel)
* [LVE-Stats 0.x](/deprecated/#lve-stats-0-x)
* [OptimumCache](/deprecated/#optimumcache)
* [TPE extension](/deprecated/#tpe-extension)
* [CPU limits](/deprecated/#cpu-limits)
* [Package integration](/deprecated/#package-integration). You can use [Control panel integration guide](/control_panel_integration/) instead.
* [Redis support for HostingLimits]()

## Python Selector (Old)

:::tip Note
This documentation is for the old version of Python Selector. You can find documentation for the new Python Selector [here](/cloudlinux_os_components/#python-selector)
:::

We have the ability to deploy <span class="notranslate"> Python </span> applications via application server. <span class="notranslate"> Python Selector </span> uses <span class="notranslate"> mod_passenger </span> to host <span class="notranslate">Python</span>.

This feature is available for CloudLinux 6 or later. It supports only cPanel servers.

You can find a list of supported <span class="notranslate"> alt-python</span> versions using the following command.

<div class="notranslate">

```
yum grouplist | grep alt-python
```
</div>


### Installation

::: tip Note
The instructions below are suitable only for EasyApache 3 and EasyApache 4. You should follow [this instruction](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:enable_ruby_python_selector) if you use LiteSpeed.
:::
Install tools to create isolated <span class="notranslate"> Python </span> environments and <span class="notranslate"> Passenger Apache </span> module. For servers with EasyApache3:

<div class="notranslate">

```
yum install lvemanager alt-python-virtualenv alt-mod-passenger
```
</div>

for EasyApache4:

<div class="notranslate">

```
yum install lvemanager alt-python-virtualenv ea-apache24-mod-alt-passenger
```
</div>

To use <span class="notranslate"> Python Selector </span> you should install alternative <span class="notranslate"> Python </span> packages:

<div class="notranslate">

```
yum groupinstall alt-python
```
</div>

To use MySQL database you should install <span class="notranslate"> alt-python27-devel </span> package:

<div class="notranslate">

```
yum install alt-python27-devel
```
</div>

::: tip Note
After installation, please make sure that you have unmarked appropriate checkboxes in <span class="notranslate"> LVE Manager Options </span> tab to show <span class="notranslate">Python App</span> in web-interface.
:::

::: tip Note
Adding <span class="notranslate"> Python</span> modules requires executing permissions to gcc/make binaries. Please enable compilers in Compiler Access section of WHM, then run: `cagefsctl --force-update` 
:::

### End user access

1. In <span class="notranslate">_Software/Services_</span> area choose <span class="notranslate">_Select Python Environment_</span>.

![](/images/clip000133.jpg)

2. Create project form will appear. Choose interpreter version for your application, application folder name (project path) and <span class="notranslate"> URI </span> for accessing your application. Click <span class="notranslate"> “Create project” </span> to create an application.

![](/images/clip000233.jpg)

After a little while a new application entry will be appended to the web-page.

![](/images/clip000255.jpg)

3. You can edit path (folder name of the project in the home directory, for example, <span class="notranslate"> _/home/clman1/project_name_ </span> ), <span class="notranslate"> uri </span> for application, <span class="notranslate"> wsgi </span> handler. If you click <span class="notranslate"> Edit </span> - the value is converted to input field and thus becomes editable. When editing is complete, click <span class="notranslate"> Save </span>.

![](/images/clip000256.jpg)

4. <span class="notranslate"> Wsgi </span> entry is to specify <span class="notranslate"> python wsgi </span> application entry point. It must be specified as filename, must be callable and separated by colon. If your app is running from file <span class="notranslate"> flask/run.py </span> by calling callable app, set <span class="notranslate"> flask/run.py:app </span>.

![](/images/clip000257.jpg)

5. When <span class="notranslate"> Show </span> control is clicked, <span class="notranslate"> python </span> extensions section will be expanded. It gives the ability to add or remove <span class="notranslate"> python </span> modules. When start typing in input field, appropriate hints are shown in drop-down list. Choose the entry you want from drop-down and click <span class="notranslate"> Add </span>.

![](/images/clip000261.jpg)

If you click <span class="notranslate"> Delete </span>, the corresponding module entry will disappear.
In addition to setting <span class="notranslate"> path, uri </span> and <span class="notranslate"> wsgi </span> , the interpreter version can be changed as well by changing the value in select drop-down.

6. No changes are applied to application environment until <span class="notranslate"> Update </span> button is clicked. Before the <span class="notranslate"> Update </span> button is clicked, all changes can be reverted with <span class="notranslate"> Reset </span> button.

The newly created application will be supplied with <span class="notranslate"> stub </span> only. A real application ought to be put into application folder. After application is placed into application folder, the <span class="notranslate"> wsgi </span> parameter can be set.

Click <span class="notranslate"> Remove </span> to delete the application - the application folder itself will remain unmoved.

_Note. For <span class="notranslate"> LVE Manager </span> version 0.9-10 and higher:_

When creating an application you can use the key <span class="notranslate"> --domain </span> , which attaches application to domain. If <span class="notranslate"> --domain </span> key is not specified, then the main users domain will be used by default.
To create application run:

<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python --version=VERSION[--user=USER] [--domain=DOMAIN] [--print-summary] [--json]–-create-webapp <FOLDER_NAME> <URI>
```
</div>

When changing application <span class="notranslate"> URI, --domain </span> key can be used simultaneously, in this case not only <span class="notranslate"> URI </span> will be changed, but also the application domain.

To change application <span class="notranslate"> URI </span> run:

<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python [--user=USER][--domain=NEW_DOMAIN] [--print-summary] [--json] --transit-webapp<FOLDER_NAME> <NEW_URI> 
```
</div>

The possibility to choose domain when creating an application was added to web interface as well.

![](/images/webapp001_zoom94.png)

Also, you can run simple commands from web interface (e.g. you can install packages from specific repositories or control web applications by means of <span class="notranslate"> django -admin</span>).

![](/images/webapp002_zoom93.png)


### Hide Python Selector icon

It is possible to hide or show <span class="notranslate">Python Selector</span> icons by marking or unmarking proper checkbox in <span class="notranslate"> LVE Manager _Options_</span> tab.

![](/images/CL-hide-python-ruby.png)

The same result can be accomplished in CLI by running:

<div class="notranslate">

```
cloudlinux-config set --json --data '{"options":{"uiSettings":{"hideRubyApp":false, "hidePythonApp":false}}}'
```
</div>
 
:::tip Note
If you are using cPanel/WHM, you can also configure hide/show <span class="notranslate">CloudLinux Python Selectors</span> in <span class="notranslate">WHM | Feature Manager</span>.
For that, you’d need to first uncheck <span class="notranslate">`Hide Python App in web-interface`</span> in the <span class="notranslate">LVE Manager</span>. This will make the menu appear for all accounts. After that, you are free to disable this app in <span class="notranslate">WHM | Feature Manager</span> for the required feature lists. 
:::


## Git for cPanel

:::tip Note
This package is no longer supported as it may cause dependency issues
:::


Please note that this package is no longer needed, as since cPanel 11.38, you can install git without any issues on cPanel by running:

<div class="notranslate">

```
$ yum install git
```
</div>


To install [git](https://git-scm.com/) on cPanel servers:

<div class="notranslate">

```
$ yum install git-cpanel
```
</div>


## LVE-Stats 0.x

:::tip Note
LVE-STATS-0.X IS NO LONGER SUPPORTED, PLEASE USE [LVE-STATS 2](/cloudlinux_os_components/#lve-stats-2)
:::


 lve-stats package collects LVE usage statistics and allows to query the data.

To install, run:

<div class="notranslate">

```
$ yum install lve-stats
```
</div>


If you are already running lve-stats (in case you are running cPanel LVE plugin), run:

<div class="notranslate">

```
$ yum update lve-stats
```
</div>


This should also be updated automatically next time your system runs system wide update.

The package installs lvestats-server. You can re-start the server by running:

<div class="notranslate">

```
$ service lvestats restart
```
</div>

The package creates sqlite database <span class="notranslate">`/var/lve/lveinfo.db`</span> that stores history information about LVE usage. Up to two months of hourly info is stored for each client. The data for the last hour is stored with 5 minutes interval, and the data for the past 10 minutes is stored with 1 minute interval.

LVE Stats updates <span class="notranslate">`/var/lve/info`</span> every few seconds. That info is used by <span class="notranslate">LVE Manager</span> plugin.

Package consists of lveinfo utility to query LVE usage, and lvechart that allows you to chart usage for individual LVE.

To query historical LVE info, lveinfo command provided. It is located at <span class="notranslate">`/usr/sbin/lveinfo`</span>: 
 
<div class="notranslate">

```
# /usr/sbin/lveinfo [OPTIONS]
-h --help              : this help screen
-v, --version          : version number
-d, --display-username : try to convert LVE id into username when possible
-f, --from=            : run report from date and time in YYYY-MM-DD HH:MM format
      if not present last 10 minutes are assumed
-t, --to=              : run report up to date and time in YYYY-MM-DD HH:MM format
      if not present, reports results up to now
-o, --order-by=        : orders results by one of the following:
      cpu_avg          : average CPU usage
      cpu_max          : max CPU usage
      mep_avg          : average number of entry processes (concurrent connections)
      mep_max          : max number of entry processes (concurrent connections)
      vmem_avg         : average virtual memory usage
      vmem_max         : max virtual memory usage
      pmem_avg         : average physical memory usage
      pmem_max         : max physical memory usage
      nproc_avg        : average number of processes usage
      nproc_max        : max number of processes usage
      io_avg           : average IO usage
      io_max           : max IO usage
      total_mem_faults : total number of out of virtual memory faults (deprecated since 0.8-6)
      total_vmem_faults: total number of out of virtual memory faults (since 0.8-6)
      total_pmem_faults: total number of out of physical memory faults (since 0.8-6)
      total_mep_faults : total number of entry processes faults (deprecated since 0.8-6)
      total_ep_faults  : total number of entry processes faults (since 0.8-6)
      total_nproc_faults: total number of number of processes faults (since 0.8-6)
      any_faults       : total number of any types of faults (since 0.8-6)
    --id=              : LVE id -- will display record only for that LVE id
-u, --user=            : Use username instead of LVE id, and show only record for that user
-l, --limit=           : max number of results to display, 10 by default
-c, --csv              : display output in CSV format
-b, --by-usage         : show LVEs with usage (averaged or max) within 90% percent of the limit
      available values:
      cpu_avg          : average CPU usage
      cpu_max          : max CPU usage
      mep_avg          : average number of entry processes (concurrent connections)
      ep_avg           : average number of entry processes (since 0.8-6)
      mep_max          : max number of entry processes (concurrent connections)
      ep_max           : max number of entry processes (since 0.8-6)
      mem_avg          : average virtual memory usage
      mem_max          : max virtual memory usage
      vmem_avg         : average virtual memory usage
      vmem_max         : max virtual memory usage
      pmem_avg         : average physical memory usage
      pmem_max         : max physical memory usage
      nproc_avg        : average number of processes
      nproc_max        : max number of processes
      io_avg           : average IO usage
      io_max           : max IO usage
-p, --percentage       : defines percentage for --by-usage option
-f, --by-fault         : show LVEs which failed on max entry processes limit or memory limit
      available values: mem, mep.
      since 0.8-6      : vmem, pmem, ep, nproc
    --show-all         : since 0.8-6 only columns for enabled limits will show up. 
-r, --threshold        : in combination with --by-fault, shows only LVEs with number of faults above threshold specified
    --server_id        : used in combination with centralized storage, to access info from any server
    --show-all         : full output (show all limits); brief output by default
```
</div>

**Output**

| | |
|-|-|
|ID |LVE Id or username |
|aCPU |Average CPU usage |
|mCPU |Max CPU usage |
|lCPU |CPU Limit |
|aEP |CPU Limit |
|mEP |Max Entry Processes |
|lEP |Entry Proc limit |
|aNPROC |Average Number of Processes |
|mNPROC |Max Number of Processes |
|lNPROC |Number of Processes limit |
|aVMEM |Average virtual Memory Usage |
|mVMEM |Max virtual Memory Usage |
|lVMEM |Virtual Memory Limit |
|aPMEM |Average physical Memory Usage |
|mPMEM |Max physical Memory Usage |
|lPMEM |Physical Memory Limit |
|aIO |Average IO usage |
|mIO |Max IO usage |
|lIO |IO Limit |
|fVMEM |Out Of Virtual Memory Faults |
|fPMEM |Out Of Physical Memory Faults |
|fEP |Entry processes faults |
|fNPROC |Number of processes faults |

* only enabled limits will show up

**Examples**

Display top 10 users, by max <span class="notranslate"> CPU </span> usage, from Oct 10, 2010 to Oct 15, 2010. Display username if possible:


<div class="notranslate">

```
$ lveinfo --from='2010-10-10' --to='2010-10-15' -o cpu_max --display-username 
ID        aCPU       mCPU     lCPU      aEP      mEP      lEP       aMem       mMem      lMem      MemF     MepF 
777         7        9        10        0        0        25        10M        15M       1G        0        0 
300         2        8        10        0        1        25        1M         3M        1G        0        0 
web2        1        6        10        0        0        25        17K        18M       1G        0        0 
web1        0        0        10        0        0        25        204K       1M        1G        0        0 
```
</div>
Display LVE info about user <span class="notranslate"> web2 </span> , from Oct 10, 2010 to Oct 15, 2010:


<div class="notranslate">

```
$ lveinfo --from='2010-10-10' --to='2010-10-15' --user=web2 --display-username
ID        aCPU       mCPU     lCPU      aEP      mEP      lEP       aMem       mMem       lMem      MemF     MepF 
web2        1        6        10        0        0        25        10M        15M        1G        0        0
```
</div>

### Storing statistics in MySQL

:::tip Note
LVE-STATS-0.X IS NO LONGER SUPPORTED, PLEASE USE [LVE-STATS 2](/cloudlinux_os_components/#lve-stats-2)
:::

 You have to install MySQL-python rpm to store lve-stats on centralized server. Run:

<div class="notranslate">

```
$ yum install MySQL-python
```
</div>


If you have MySQL 5.3+ installed on CloudLinux 5 server, and there is no libmysqlclient_r.so.15 on the server, run:

<div class="notranslate">

```
$ yum --enablerepo=cloudlinux-updates-testing install mysqlclient15
```
</div>


A typical procedure to configure the MySQL database for storing information about multiple servers for lve-stats services looks as follows:

Create database and user. You can do it by executing the following commands:

<div class="notranslate">

```
create database <database>;
grant all on <database>.* to <user> identified by 'password';
flush privileges;
```
</div>

Create database schema:

<div class="notranslate">

```
CREATE TABLE history (id INTEGER,
        cpu INTEGER, cpu_limit INTEGER,
        cpu_max INTEGER,
        ncpu INTEGER,
        mep INTEGER, mep_limit INTEGER,
        mep_max INTEGER,
        io INTEGER, io_limit INTEGER,
        mem INTEGER, mem_limit INTEGER,
        mem_max INTEGER,
        mem_fault INTEGER, mep_fault INTEGER,
        created TIMESTAMP, weight INTEGER, server_id CHAR(10),
        lmemphy INTEGER, memphy INTEGER, memphy_max INTEGER, memphy_fault INTEGER,
        lnproc INTEGER, nproc INTEGER, nproc_max INTEGER, nproc_fault INTEGER,
        lcpuw INTEGER, io_max INTEGER,
        iops INTEGER, liops INTEGER, iops_max INTEGER );
CREATE INDEX idx_history_id ON history(id);
CREATE INDEX idx_history_created ON history(created);
CREATE INDEX idx_history_weight ON history(weight);
CREATE INDEX idx_history_server_id ON history(server_id);
CREATE TABLE last_run (hourly TIMESTAMP, daily TIMESTAMP, server_id CHAR(10), lve_version INTEGER);
CREATE TABLE users (server_id CHAR(10), id INTEGER, username CHAR(20));
CREATE INDEX idx_users_server_id ON users(server_id);
CREATE INDEX idx_users_id ON users(id); 

CREATE TABLE history_gov ( ts INTEGER,
                           username CHAR(64),
                           max_simultaneous_requests INTEGER,
                           sum_cpu FLOAT,
                           sum_write FLOAT,
                           sum_read FLOAT,
                           number_of_iterations INTEGER,
                           max_cpu FLOAT,
                           max_write FLOAT,
                           max_read FLOAT,
                           number_of_restricts INTEGER,
                           limit_cpu_on_period_end INTEGER,
                           limit_read_on_period_end INTEGER,
                           limit_write_on_period_end INTEGER,
                           cause_of_restrict INTEGER,
                           weight INTEGER,
                           server_id char(10)); 

CREATE INDEX idx_history_gov_ts ON history_gov(ts);
CREATE INDEX idx_history_gov_cause_of_restrict ON history_gov(cause_of_restrict);
CREATE INDEX idx_history_gov_number_of_restricts ON history_gov(number_of_restricts); 
CREATE INDEX idx_history_gov_max_simultaneous_requests ON history_gov(max_simultaneous_requests);
CREATE INDEX idx_history_gov_server_id ON history_gov(server_id);
CREATE INDEX idx_history_gov_weight ON history_gov(weight);

CREATE TABLE last_run_gov (hourly TIMESTAMP, daily TIMESTAMP, server_id CHAR(10), lve_version INTEGER);


* Execute following SQL command for each remote server for which you want to store
statistics in this database (make sure you substitute _SERVER_NAME_ with the same
servername as used in lvestats config file on remote server: 

INSERT INTO last_run(hourly, daily, server_id, lve_version) VALUES (UTC_TIMESTAMP(), UTC_TIMESTAMP(), '_SERVER_NAME_', 4);
```
</div>

On each server edit file <span class="notranslate">`/etc/sysconfig/lvestats`</span> & <span class="notranslate">`/etc/sysconfig/lvestats.readonly`</span> as follows:

<div class="notranslate">

```
db_type = mysql
connect_string = host:database:user:password
server_id = _SERVER_NAME_
db_port = _port_
```
</div> 

:::tip Note
lvestats.readonly should have a user that has read only access to all tables from lvestats database.
:::

:::tip Note
_SERVER_NAME_ should be at most 10 characters
:::

:::tip Note
db_port is an optional parameter. Default port would be used.
:::

Select server responsible for compacting database on regular bases by setting <span class="notranslate">`COMPACT=master`</span> in <span class="notranslate">`/etc/sysconfig/lvestats`</span> for that server. Set <span class="notranslate"> COMPACT=slave </span> on all other servers.

Make sure that <span class="notranslate">`/etc/sysconfig/lvestats`</span> is readable only by <span class="notranslate">`root (chmod 600 /etc/sysconfig/lvestats), lvestats.readonly`</span> should be readable by anyone

Restart service:

<div class="notranslate">

```
service lvestats restart
```
</div>

If you use central database to store lvestats data, on each server, execute:

<div class="notranslate">

```
$ /usr/share/lve-stats/save_users_to_database.py 
```
</div>

You just need to execute it once, as it will be later executed via <span class="notranslate"> cron job </span> . That script will store usernames from each server, so that lve-stats would later be able to correctly identify each user.

**Updating MySQL & PostgreSQL schema for lve-stats 0.8+**

If you are using MySQL or PostgreSQL server for lve-stats older then 0.8, make sure to do the following steps to upgrade to latest version:

Stop lvestats service on all your servers.

Connect to your database server, and execute following commands:

<div class="notranslate">

```
ALTER TABLE history ADD lmemphy INTEGER;
ALTER TABLE history ADD memphy INTEGER;
ALTER TABLE history ADD memphy_max INTEGER;
ALTER TABLE history ADD memphy_fault INTEGER;
ALTER TABLE history ADD lnproc INTEGER;
ALTER TABLE history ADD nproc INTEGER;
ALTER TABLE history ADD nproc_max INTEGER;
ALTER TABLE history ADD nproc_fault INTEGER;
ALTER TABLE history ADD lcpuw INTEGER;
ALTER TABLE history ADD io_max INTEGER;
UPDATE history SET lmemphy = 0, memphy = 0, memphy_max = 0, memphy_fault = 0,
       lnproc = 0, nproc = 0, nproc_max = 0, nproc_fault = 0,
       lcpuw = 0, io_max = 0;

ALTER TABLE last_run ADD lve_version INTEGER;
UPDATE last_run SET lve_version = 4;
CREATE TABLE last_run_gov (hourly TIMESTAMP, daily TIMESTAMP, server_id CHAR(10), lve_version INTEGER);
```
</div>
To upgrade scheme to support <span class="notranslate"> MySQL Governor: </span>

<div class="notranslate">

```
CREATE TABLE history_gov ( ts INTEGER,
    username char(64),
    max_simultaneous_requests INTEGER,
    sum_cpu float,
    sum_write float,
    sum_read float,
    number_of_iterations INTEGER,
    max_cpu float,
    max_write float,
    max_read float,
    number_of_restricts INTEGER,
    limit_cpu_on_period_end INTEGER,
    limit_read_on_period_end INTEGER,
    limit_write_on_period_end INTEGER,
    cause_of_restrict INTEGER,
    server_id char(10));

CREATE INDEX idx_history_gov_ts ON history_gov(ts);
CREATE INDEX idx_history_gov_cause_of_restrict ON history_gov(cause_of_restrict);
CREATE INDEX idx_history_gov_number_of_restricts ON history_gov(number_of_restricts);
CREATE INDEX idx_history_gov_max_simultaneous_requests ON history_gov(max_simultaneous_requests);
CREATE INDEX idx_history_gov_server_id ON history_gov(server_id);
```
</div>
Upgrading from lve-stats < 0.9-20:

<div class="notranslate">

```
ALTER TABLE history_gov ADD weight INTEGER;
CREATE INDEX idx_history_gov_weight ON history_gov(weight);
CREATE TABLE last_run_gov (hourly TIMESTAMP, daily TIMESTAMP, server_id CHAR(10), lve_version INTEGER);
```
</div>
Update lve-stats RPM on all your servers.

If you use central database to store lvestats data, execute the following commands:

<div class="notranslate">

```
CREATE TABLE users (server_id CHAR(10), id INTEGER, username CHAR(20));CREATE INDEX idx_users_server_id ON users(server_id);CREATE INDEX idx_users_id ON users(id);
```
</div>
On each server execute:

<div class="notranslate">

```
$ /usr/share/lve-stats/save_users_to_database.py 
```
</div>

You just need to execute it once, as it will be later executed via cron job. That script will store usernames from each server, so that lve-stats would later be able to correctly identify each user.

### Storing statistics in PostgreSQL

:::tip Note
LVE-STATS-0.X IS NO LONGER SUPPORTED, PLEASE USE [LVE-STATS 2](/cloudlinux_os_components/#lve-stats-2)
:::

You have to install <span class="notranslate">`postgresql-python rpm`</span> to store lve-stats on centralized server.

Run:

<div class="notranslate">

```
$ yum install postgresql-python
```
</div>

A typical procedure to configure the PostgreSQL database for storing information about multiple servers for lve-stats services looks as follows:

Create a database and a user. You can do it by executing the following commands:

<div class="notranslate">

```
createdb <database>createuser <user>
```
</div>
Create database schema:

<div class="notranslate">

```
CREATE TABLE history (id INTEGER,
        cpu INTEGER, cpu_limit INTEGER,
        cpu_max INTEGER,
        ncpu INTEGER,
        mep INTEGER, mep_limit INTEGER,
        mep_max INTEGER,
        io INTEGER, io_limit INTEGER,
        mem INTEGER, mem_limit INTEGER,
        mem_max INTEGER,
        mem_fault INTEGER, mep_fault INTEGER,
        created TIMESTAMP, weight INTEGER, server_id CHAR(10),
        lmemphy INTEGER, memphy INTEGER, memphy_max INTEGER, memphy_fault INTEGER,
        lnproc INTEGER, nproc INTEGER, nproc_max INTEGER, nproc_fault INTEGER,
        lcpuw INTEGER, io_max INTEGER,



        iops_max: INTEGER, liops: INTEGER, iops: INTEGER);

CREATE INDEX idx_history_id ON history(id);
CREATE INDEX idx_history_created ON history(created);
CREATE INDEX idx_history_weight ON history(weight);
CREATE INDEX idx_history_server_id ON history(server_id);
CREATE TABLE last_run (hourly TIMESTAMP, daily TIMESTAMP, server_id CHAR(10), lve_version INTEGER);
CREATE TABLE users (server_id CHAR(10), id INTEGER, username CHAR(20));CREATE INDEX idx_users_server_id ON users(server_id);
CREATE INDEX idx_users_id ON users(id);

CREATE TABLE history_gov ( ts INTEGER,
    username char(64),
    max_simultaneous_requests INTEGER,
    sum_cpu float,
    sum_write float,
    sum_read float,
    number_of_iterations INTEGER,
    max_cpu float,
    max_write float,
    max_read float,
    number_of_restricts INTEGER,
    limit_cpu_on_period_end INTEGER,
    limit_read_on_period_end INTEGER,
    limit_write_on_period_end INTEGER,
    cause_of_restrict INTEGER,
    weight INTEGER,
    server_id char(10));

CREATE INDEX idx_history_gov_ts ON history_gov(ts);
CREATE INDEX idx_history_gov_cause_of_restrict ON history_gov(cause_of_restrict);
CREATE INDEX idx_history_gov_number_of_restricts ON history_gov(number_of_restricts);
CREATE INDEX idx_history_gov_max_simultaneous_requests ON history_gov(max_simultaneous_requests);
CREATE INDEX idx_history_gov_server_id ON history_gov(server_id);
CREATE INDEX idx_history_gov_weight ON history_gov(weight);

CREATE TABLE last_run_gov (hourly TIMESTAMP, daily TIMESTAMP, server_id CHAR(10), lve_version INTEGER);

     * Execute following SQL command for each remote server for which you want to store
      statistics in this database (make sure you substitute _SERVER_NAME_ with the same
      servername as used in lvestats config file on remote server:

INSERT INTO last_run(hourly, daily, server_id, lve_version) VALUES (now() AT TIME ZONE 'UTC', now() AT TIME ZONE 'UTC', '_SERVER_NAME_', 4);
```
</div>
On each server edit file <span class="notranslate">`/etc/sysconfig/lvestats`</span> and <span class="notranslate">`/etc/sysconfig/lvestats`</span> as follows:

<div class="notranslate">

```
db_type = postgresql
connect_string = host:database:user:password
server_id = _SERVER_NAME_db_port = _port_
```
</div>   

:::tip Note
lvestats.readonly should have a user that has read only access to history table.
:::

:::tip Note
_SERVER_NAME_ should be at most 10 characters
:::

:::tip Note
db_port is optional, default PostgreSQL port will be used
:::

Select server responsible for compacting database on regular bases by setting <span class="notranslate"> COMPACT=master </span> in <span class="notranslate"> /etc/sysconfig/lvestats </span> for that server. Set <span class="notranslate"> COMPACT=slave </span> on all other servers.

Make sure that <span class="notranslate"> /etc/sysconfig/lvestats </span> is readable only by <span class="notranslate"> root (chmod 600 /etc/sysconfig/lvestats), lvestats.readonly </span> should be readable by anyone.

Restart service:

<div class="notranslate">

```
service lvestats restart
```
</div>
If you use central database to store lvestats data, on each server, execute:

<div class="notranslate">

```
$ /usr/share/lve-stats/save_users_to_database.py 
```
</div>
You just need to execute it once, as it will be later executed via <span class="notranslate"> cron job </span> . That script will store usernames from each server, so that lve-stats would later be able to correctly identify each user.

You are done!


### Compacting in multi-server settings

:::tip Note
LVE-STATS-0.X IS NO LONGER SUPPORTED, PLEASE USE [LVE-STATS 2](/cloudlinux_os_components/#lve-stats-2)
:::

[lve-stats 0.10+]

When you have multiple servers storing LVE statistics to a central database, then you will need to pick one server responsible for compacting data.

On that server, edit file: <span class="notranslate">`/etc/sysconfig/lvestats`</span> and change the option <span class="notranslate">`COMPACT`</span> to <span class="notranslate">`master`</span>.

On all other servers, change that option to <span class="notranslate">`slave`</span>.

Default: <span class="notranslate">`single`</span> – should be used when lve-stats stores data to a single database.

## OptimumCache

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED.
:::

**OptimumCache 0.2+**

OptimumCache is a de-duplicating file cache optimized specifically for shared hosting. Typical shared hosting server runs a number of sites with WordPress and Joomla as well as other popular software. This usually means that there are hundreds of duplicate files that are constantly being read into file cache - both wasting precious disk <span class="notranslate"> IO </span> operations as well as memory. OptimumCache creates a cache of such duplicated files and de-duplicates file cache.
![](/images/embim1.png)

With OptimumCache, if a duplicate of an already loaded file is requested, the file gets loaded from filesystem cache. By doing that, system bypasses disk IO, significantly improving the speed of reading that file, while lowering load on the hard disk. As the file had been read from disk just once, it is cached by filesystem cache just once, minimizing amount of duplicates in file system cache and improving overall cache efficiency. This in turn reduces memory usage, decreases the number of disk operations - all while improving the websites response time.


### Installation

* [Requirements](/deprecated/#requirements)
* [Installation](/deprecated/#installation-2)

:::tip NOTE
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

#### Requirements

* 64bit CloudLinux 6.x or higher
* ext4 filesystem
* kernel lve1.2.55 or later.

#### Installation

<div class="notranslate">

```
# yum install optimumcache
```
</div>

OptimumCache must be provided with list of directories to expect duplicate files be in:

* <span class="notranslate">`# occtl --recursive --mark-dir /home`</span>
* <span class="notranslate">`# occtl --recursive --mark-dir /home2`</span> (for cPanel)
* <span class="notranslate">`# occtl --recursive --mark-dir /var/www`</span> (for Plesk)

OptimumCache is going to index these directories. Thus system load during this period (from hours to days) might be as twice as high. See [Marking directories](/deprecated/#marking-directories).

**Allocating Disk Space for OptimumCache:**

By default OptimumCache will attempt to setup 5GB ploop (high efficiency loopback disk) to be used for the cache in <span class="notranslate">`/var/share/optimumcache/optimumcache.image`</span>

That ploop will be mounted to: <span class="notranslate">`/var/cache/optimumcache`</span>

The ploop image will be located at <span class="notranslate">`/var/share/optimumcache/optimumcache.image`</span>

Allocating OptimumCache disk space for ploop on a fast drives (like SSD) will provide additional performance improvement as more duplicated files would be loaded from fast disks into memory.

**Moving ploop image to another location:**

<div class="notranslate">

```
# occtl --move-ploop /path/to/new/image/file [new size[KMGT]]
```
</div>

`/path/to/new/image/file` must be file path + file name, not a directory name.

Example:

<div class="notranslate">

```
# occtl --move-ploop /var/ssh/optimumcache.image
```
</div>

If <span class="notranslate">`new size`</span> is not mentioned, then value from <span class="notranslate">`/etc/sysconfig/optimumcache`</span> is used. If <span class="notranslate">`/etc/sysconfig/optimumcache`</span> does not mention anything regarding ploop image size, then default 5GB is used.

**Enabling and disabling ploop:**

To turn on ploop:

<div class="notranslate">

```
# occtl --init-ploop
```
</div>

To disable ploop:

<div class="notranslate">

```
# occtl --disable-ploop
```
</div>

If ploop image has been mounted in <span class="notranslate">`/etc/fstab`</span> for OpimumCache-0.1-21 and earlier, you may consider removing this fstab entry in OpimumCache 0.2+. That is because since 0.2+ ploop is mounted automatically at service start.

If you prefer leave that fstab mount point as is, you may see some warnings when you decide to move ploop later via <span class="notranslate">`occtl --move-ploop`</span>.

**Resizing ploop:**

To resize ploop:

<div class="notranslate">

```
# occtl --resize-ploop [new size[KMGT]]
```
</div>

A common reason for resizing ploop is reacting to OptimumCache syslog message like <span class="notranslate">“OptimumCache recommends cache storage size to be at least … GB”</span>.

**Deleting ploop:**

<div class="notranslate">

```
# occtl --delete-ploop
```
</div>

For the case when this action cannot be completed due to <span class="notranslate">“Unable unmount ploop”</span> issue, there is a workaround in “Troubleshooting” section.

Q. I created/resized/moved/deleted ploop. Do I need to rerun the initial mark process?

А. Not needed.

### Using without ploop

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

On servers with kernel prior to lve1.2.55 ploop will not be used (due to ploop related issues in the kernel). Instead cached files will be stored in <span class="notranslate">`/var/cache/optimumcache`</span>.

The cache will be cleaned (shrunk) by 20% once partition on which <span class="notranslate">`OPTIMUMCACHE_MNT`</span> resides has only 10% of free space. You can change that by changing <span class="notranslate">`PURGEAHEAD`</span> param in <span class="notranslate">`/etc/sysconfig/optimumcache`</span>, and restarting optimumcache service.

The cache is cleaned <span class="notranslate">`/etc/cron.d/optimumcache_cron`</span> script optimumcache_purge, which runs every minute:

<div class="notranslate">

```
0-59 * * * * root /usr/share/optimumcache/optimumcache_purge
```
</div>

### Marking directories

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

**Marking directories to be cached:**

<div class="notranslate">

```
# occtl --mark-dir /path/to/site/on/filesystem --recursive
```
</div>

In common scenario admin marks for caching user directories:

<div class="notranslate">

```
# occtl --mark-dir /home /home2 /home3 --recursive
```
</div>

OptimumCache is going to index these directories. Thus system load during this period (from hours to days) might be as twice as high. You can check indexing job status with <span class="notranslate">`at -l`</span> at any time.

**Ignoring particular files & directories:**

OptimumCache tracks files & directories that need to be cached. Once file is modified, it will no longer be tracked by OptimumCache (as there is very little chance that it will have a duplicate). Yet, all new files created in tracked directories are checked for duplicates.

Sometimes you might want to ignore such checks for directories where large number of temporary or new files are created, that will not have duplicates - as such checks are expensive. Directories like mail queue, and tmp directories should be ignored.

You can set a regexp mask for directories that you would like to ignore using:

<div class="notranslate">

```
$ occtl --add-skip-mask REGEX
```
</div>

To list skip masks:

<div class="notranslate">

```
$ occtl --list-skip-mask
```
</div>

To remove skip mask:

<div class="notranslate">

```
$ occtl --remove-skip-mask ID|Tag
```
</div>

At the very end, for those changes to take effect:

<div class="notranslate">

```
$ occtl --check
```
</div>

<span class="notranslate">`occtl --check`</span> is the same lengthy operation as <span class="notranslate">`marking`</span> is. Thus, it’s usage has to be sane, especially for big <span class="notranslate">`home`</span> (>500G).

By default, OptimumCache sets up following skip masks:

| |  | |
|-|--|-|
|id | tag | regex|
|1 | <span class="notranslate">`all_dot_files`</span> | <span class="notranslate">`/\...*`</span>|
|2 | <span class="notranslate">`cagefs`</span> | <span class="notranslate">`^/home/cagefs-skeleton$`</span>|
|3 | <span class="notranslate">`cagefs`</span> | <span class="notranslate">`^/home/cagefs-skeleton/`</span>|
|4 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/cPanelInstall`</span>|
|5 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/cpeasyapache`</span>|
|6 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/aquota`</span>|
|7 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/jailshell`</span>|
|8 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/mail$`</span>|
|9 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/mail/.*`</span>|
|10 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/logs$`</span>|
|11 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/logs/.*`</span>|
|12 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/\.cpanel$`</span>|
|13 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/\.cpanel/.*`</span>|
|14 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/\.cagefs`</span>|
|15 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/[^/]+/\.cagefs/.*`</span>|
|16 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/virtfs`</span>|
|17 | <span class="notranslate">`cpanel`</span> | <span class="notranslate">`^/home[^/]*/virtfs/.*`</span>|
|18 | <span class="notranslate">`not_a_userdir`</span> | <span class="notranslate">`^/home/tmp/`</span>|
|19 | <span class="notranslate">`not_a_userdir`</span> | <span class="notranslate">`^/home/tmp$`</span>|
|20 | <span class="notranslate">`not_a_userdir`</span> | <span class="notranslate">`^/home/ftp/`</span>|
|21 | <span class="notranslate">`not_a_userdir`</span> | <span class="notranslate">`^/home/ftp$`</span>|
|22 | <span class="notranslate">`not_a_userdir`</span> | <span class="notranslate">`^/home/admin/`</span>|
|23 | <span class="notranslate">`not_a_userdir`</span> | <span class="notranslate">`^/home/admin$`</span>|
|24 | <span class="notranslate">`quota`</span> | <span class="notranslate">`^/home[^/]*/quota.user$`</span>|
|25 | <span class="notranslate">`usermisc`</span> | <span class="notranslate">`/quota.user$`</span>|
|26 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/backups$`</span>|
|27 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/backups/`</span>|
|28 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/imap$`</span>|
|29 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/imap/`</span>|
|30 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/Maildir$`</span>|
|31 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/Maildir/`</span>|
|32 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/domains/[^/]+/logs$`</span>|
|33 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/domains/[^/]+/logs/`</span>|
|34 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/domains/[^/]+/public_ftp$`</span>|
|35 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/domains/[^/]+/public_ftp/`</span>|
|36 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/domains/[^/]+/stats$`</span>|
|37 | <span class="notranslate">`users_home`</span> | <span class="notranslate">`^/home/[^/]+/domains/[^/]+/stats/`</span>|

This information is stored in <span class="notranslate">`/etc/container/optimumcache/ignore.d/`</span>.

**Skip mask syntax**

Skip masks use following regexp syntax: [http://www.greenend.org.uk/rjk/tech/regexp.html](http://www.greenend.org.uk/rjk/tech/regexp.html)

For example, to disable caching all directories that contain <span class="notranslate">`*/cache/*`</span>, you should use skip masks like:

<div class="notranslate">

```
/cache/
/cache$
```
</div>

This information is stored in <span class="notranslate">`/etc/container/optimumcache/ignore.d/`</span>


### OptimumCache configuration file

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

<span class="notranslate">`/etc/sysconfig/optimumcache`</span>

<div class="notranslate">

```
OPTIMUMCACHE_MNT=/var/cache/optimumcache

 
# Valency to cache

COUNT=0

 
# Minimal file size to cache, default - cache all files

# MINSIZE=0

 
# Minimal page number in file to start caching, default - 1

PAGEMIN=0

 
# Maximum file size to cache, 10485760 (10MB) by default

# MAXSIZE

 
# Interval between caching attempts, default - 5 seconds

# TIMEOUT=7

 
# Adaptive timeout upper limit (seconds)

# MAXTIMEOUT=160

 
# Adaptive timeout multiplicator and divisor

# TIMEOUT_INCR_MUL=2

# TIMEOUT_DECR_DIV=4

 
# Buffer size in KB for 'optimumcache dump', default is 32MB

# DUMP_BUFFER_SIZE=32000

 
# Extra space in %% of requested to purge, default 20%

# PURGEAHEAD=20

 
# Experimental: Eliminate frequent sync to address IO performance

NOIMMSYNC=1

 
# Logging verbosity, default - 1, verbose

# LOGLEVEL=1

 
# occtl --mark-dir or --check operations IO limit, MB/s, default is 5 MB/s

# OCCTL_LVE_IO_LIMIT=5

 
# occtl --mark-dir or --check operations %cpu limit, default is 50% of one CPU core

# OCCTL_LVE_SPEED_LIMIT=50

 
# Lve ID to associate limits with

# LVEID=5

 
# Collect perf statistics in /var/log/optimumcache_perf. Default is enabled.

# PERF_LOG_ENABLED=1
```
</div>

### Command-line interface

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

OptimumCache is controlled using <span class="notranslate">`occtl`</span> command line utility.

**Usage:**

<div class="notranslate">

```
occtl.py    [-h] [--move-ploop param [param ...]] [--check] [--verbose]

            [--init-ploop [param [param ...]]] [--resize-ploop New Size]

            [--disable-ploop] [--enable-ploop] [--mount-ploop]

            [--unmount-ploop] [--delete-ploop] [--unmark-all]

            [--mark-dir Path [Path ...]] [--unmark-dir Path [Path ...]]

            [--recursive]  [--add-skip-mask Regex]

            [--remove-skip-mask Id|Tag] [--list-skip-mask] [--silent]

            [--ignore-unmount-failure] [--no-lve-limits] [--foreground]

            [--ploop-status] [--remount-cached-points] [--purge]

            [--cancel-pending-jobs] [--report [Period]]

            [--recommend-minmax-size]
```
</div>

Display numbers/percents of cached files:

<div class="notranslate">

```
optimumcache stat
```
</div>

or

<div class="notranslate">

```
optimumcache stat /home
```
</div>

To display statistic for specific mount. In depth display what is being held in cache:

<div class="notranslate">

```
optimumcache dump [--resolve-filenames] [mount]
```
</div>

The option <span class="notranslate">`--resolve-filenames`</span> is experimental and may not apply to all output cached entries.

Optional Arguments:

| | |
|-|-|
|<span class="notranslate">`-h`</span>, <span class="notranslate">`--help`</span>|Show this help message and exit.|
|<span class="notranslate">`--move-ploop param [param ...]`</span>|Move cache from one ploop image to <span class="notranslate">`/path/to/new/image/location [New Size[KMGT]]`</span>.
|<span class="notranslate">`--check`</span>|Check marked files for errors. This task is scheduled as background job, unless <span class="notranslate">`--foreground`</span> is specified.|
|<span class="notranslate">`--verbose`</span>|List what is being checked.|
|<span class="notranslate">`--init-ploop [param [param ...]]`</span>|Create ploop image for the cache <span class="notranslate">`[/path/to/ploop/image [ploop_size] | ploop_size]`</span> - if only one parameter is given, it is considered to be ploop size. Size should be a <span class="notranslate">`NUMBER[KMGT]`</span>.|
|<span class="notranslate">`--resize-ploop New Size`</span>|New Size NUMBER[KMGT].|
|<span class="notranslate">`--disable-ploop`</span>|Disable ploop.|
|<span class="notranslate">`--enable-ploop`</span>|Enable ploop.|
|<span class="notranslate">`--mount-ploop`</span>|Mount ploop image.|
|<span class="notranslate">`--unmount-ploop`</span>|Unmount ploop image.|
|<span class="notranslate">`--delete-ploop`</span>|Delete ploop image. Implies disable ploop, if was enabled.|
|<span class="notranslate">`--unmark-all`</span>|Unmark all marked directories.|
|<span class="notranslate">`--mark-dir Path [Path ...]`</span>|Mark directory for caching.This task is scheduled as background job, unless <span class="notranslate">`--foreground`</span> is specified.|
|<span class="notranslate">`--unmark-dir Path [Path ...]`</span>|Unmark directory for caching.|
|<span class="notranslate">`--recursive`</span>|Is used with mark/unmark dir.|
|<span class="notranslate">`--add-skip-mask Regex`</span>|Regexp to skip files/directories for caching.|
|<span class="notranslate">`--remove-skip-mask Id|Tag`</span>|Remove regexp to skip files/directories by id or tag.|
|<span class="notranslate">`--list-skip-mask`</span>|List regexp to skip files/directories.|
|<span class="notranslate">`--silent`</span>|Do not echo status to stdout/syslog.|
|<span class="notranslate">`--ignore-unmount-failure`</span>|Ignore cannot unmount ploop problem.|
|<span class="notranslate">`--no-lve-limits`</span>|Ignore default LVE limits for <span class="notranslate">`--mark-dir`</span> and <span class="notranslate">`--check`</span> commands. Also implies --foreground.|
|<span class="notranslate">`--foreground`</span>|Don't spawn <span class="notranslate">`--mark-dir`</span> and <span class="notranslate">`--check`</span> commands in background.|
|<span class="notranslate">`--ploop-status`</span>|Check if ploop is mounted.|
|<span class="notranslate">`--purge`</span>|Purge cache storage (takes some time).|
|<span class="notranslate">`--cancel-pending-jobs`</span>|Cancel <span class="notranslate">`--mark-dir`</span> and <span class="notranslate">`--check`</span> commands if were queued or are being run in background.|
|<span class="notranslate">`--report [Period]`</span>|Report statistics for Period (hourly|daily|weekly|monthly).|


### cloudlinux-collect: collect system load statistics

* [cloudlinux-collectl: quick start](/deprecated/#cloudlinux-collectl-quick-start)
* [Install](/deprecated/#install)
* [Measure web site response time](/deprecated/#measure-web-site-response-time)
* [To watch what is being collected](/deprecated/#to-watch-what-is-being-collected)
* [Statistics being collected in details](/deprecated/#statistics-being-collected-in-details)
* [Statistics manual configuration](/deprecated/#statistics-manual-configuration)
* [Running statistics daemon: collectl-cloudlinux](/deprecated/#running-statistics-daemon-collectl-cloudlinux)
* [Analyzing the results](/deprecated/#analyzing-the-results)

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

#### cloudlinux-collectl: quick start

Installing this package automatically starts system load statistics collection in background. cloudlinux-collectl package has no strict dependency on OptimumCache, thus the statistics is collected regardless of whether OptimumCache is installed or not. The aim of having this package pre-installed is to compare system performance before and after installing OptimumCache, thus to measure OptimumCache effectiveness.

#### Install

<div class="notranslate">

```
# yum install cloudlinux-collect --enablerepo=cloudlinux-updates-testing
```
</div>

:::tip Note
cloudlinux-collectl will be installed automatically on optimumcache upgrade to 0.2-23
:::

#### Measure web site response time

cloudlinux-collectl can monitor response time for a configurable set of URLs.

Start monitoring new URL:

<div class="notranslate">

```
# cloudlinux-collect --addurl <alias> <http://url
```
</div>

Example:

<div class="notranslate">

```
# cloudlinux-collect --addurl localhost http://127.0.0.1/index.php
```
</div>

Try <span class="notranslate">`cloudlinux-collectl --help`</span> for more options.

#### To watch what is being collected


<div class="notranslate">

```
# cloudlinux-collect --test
```
</div>

Actual logs are compressed with gzip and kept in <span class="notranslate">`/var/log/optimumcache/collectl`</span> directory.

#### Statistics being collected in details

To monitor what statistics are being collected, try command:

<div class="notranslate">

```
# cloudlinux-collect --test
```
</div>

![](/images/optimumcachecollect_zoom93.png)

Along with common statistics blocks as <span class="notranslate">CPU</span> , disk usage, <span class="notranslate">inodes</span> cached, there are two blocks of data to watch how effectively OptimumCache is functioning.

<span class="notranslate">`OPTIMUMCACHE DETAIL`</span> refers to data, which is similar to output of command

<div class="notranslate">

```
# optimumcache stat
```
</div>

<div class="notranslate">

```
csums:          4964 (99.9%)

             fetched        uncached            cached

inodes:          4967            31               4936    (99.4%)

size:          204177          131072           73104     (35.8%)

RAM:                8              4                4     (50.0%)
```
</div>

Particularly, the last column percent numbers shall match.

The next goes <span class="notranslate">`URLSTATTRACKER DETAIL`</span> block with url response time in milliseconds. Negative values here may pop up unexpectedly. Negative numbers are not milliseconds, but signal about http error response code for that specific url. For instance, -403 will signal for <span class="notranslate">`Forbidden`</span> http error. As for -500 value, it signals not only for <span class="notranslate">`Internal Server Error`</span>, but can be displayed, when there is connection problem with the server, which is specified by the url.

#### Statistics manual configuration

<span class="notranslate">`URLSTATTRACKER DETAIL`</span> is the only statistics, which requires manual configuration. Upon clean installation, it has only <span class="notranslate">`url_localhost`</span> preconfigured:

<div class="notranslate">

```
# cloudlinux-collect --info
```
</div>

<div class="notranslate">

```
url shortname            url

--------------------         ---

localhost                 http://localhost/
```
</div>


To add another URL for monitoring:

<div class="notranslate">

```
## cloudlinux-collect --addurl alt http://192.168.0.102/
```
</div>

To display URLs being monitored list:

<div class="notranslate">

```
# cloudlinux-collect --info
```
</div>

<div class="notranslate">

```
url shortname          url

--------------------          ---

alt                        http://192.168.0.102/

localhost                  http://localhost/
```
</div>



To skip URL from being tracked run command:

<div class="notranslate">

```
# cloudlinux-collect --skip <url short name>
```
</div>

#### Running statistics daemon: collectl-cloudlinux

cloudlinux-collectl has got collectl package as a dependency. Initd script <span class="notranslate">`/etc/init.d/cloudlinux-collectl`</span> will automatically bring up another instance of collectl named <span class="notranslate">`collectl-optimumcache`</span> . collectl-optimumcache daemon instance has a separate config and does not interfere with other running pre-configure collectl daemon (if any).

As it was mentioned, collectl-optimumcache daemon starts automatically on package install, then on server restart events, kicked by regular Initd script <span class="notranslate">`/etc/init.d/cloudlinux-collectl`</span>. Thus, checking the daemon status, stop, restart is trivial:

<div class="notranslate">

```
# service cloudlinux-collect status
collectl-optimumcache (pid  1745) is running…
```
</div>

To start /stop:

<div class="notranslate">

```
# service cloudlinux-collect < start | stop >
```
</div>

#### Analyzing the results

The statistics is being collected into files named <span class="notranslate">`%hostname%-%datetime%.raw.gz`</span> under directory <span class="notranslate">`/var/log/cloudlinux-collect`</span>.

To convert those info format suitable for loading into Excel, LibreOffice Calc, another data mining tool, run the command:

<div class="notranslate">

```
# cloudlinux-collect --genplotfiles
```
</div>

<div class="notranslate">

```
Generate fresh plot files in

         /var/log/cloudlinux-collect/plotfiles

 ```
 </div>


### Uninstall OptimumCache

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

To uninstall OptimumCache, run:

<div class="notranslate">

```
service optimumcache stop
occtl --delete-ploop
:>/var/share/optimumcache_store
yum remove optimumcache
```
</div>

If available, reboot server

After the reboot <span class="notranslate">`pfcache= mount`</span> options will disappear by themselves.

For OptimumCache version prior 0.2-11, uninstalling via rpm package manager does not automatically removes away ploop image. That is because not always possible to unmount it properly due to kernel dependency. If there is no luck with unmounting ploop, then the server will have to be rebooted and will need to remove ploop files manually:

<div class="notranslate">

```
# rm /var/share/optimumcache/optimumcache.image
# rm /var/share/optimumcache/DiskDescriptor.xml
# rm /var/share/optimumcache/DiskDescriptor.xml.lck
```
</div>
 or

<div class="notranslate">

```
# rm /path/to/ploop/image/file
# rm /path/to/ploop/image/DiskDescriptor.xml
# rm /path/to/ploop/image/DiskDescriptor.xml.lck
```
</div>

For OptimumCache version 0.2-11 and later, ploop image will be removed automatically during uninstall. If ploop unmount issue prevents doing that, ploop image clean up will be scheduled after next server reboot.

If uninstall OptimumCache process lasts for too long, please find the solution in Troubleshooting section of this document.


### Troubleshooting

* [Installing for FS is different from Ext4](/deprecated/#installing-for-fs-is-different-from-ext4)
* [Yum fails to install Perl rpms coming with OptimumCache](/deprecated/#yum-fails-to-install-perl-rpms-coming-with-optimumcache)
* [OptimumCache prior 0.2-23: Cannot unmount old ploop image](/deprecated/#optimumcache-prior-0-2-23-cannot-unmount-old-ploop-image)
* [High IO rate](/deprecated/#high-io-rate)
* [High CPU utilization](/deprecated/#high-cpu-utilization)
* [Uninstalling OptimumCache lasts for too long](/deprecated/#uninstalling-optimumcache-lasts-for-too-long)
* [‘Failed to attach peer: Invalid argument’ appears in syslog](/deprecated/#‘failed-to-attach-peer-invalid-argument’-appears-in-syslog)

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED
:::

#### Installing for FS is different from Ext4

For now Ext4 is the only supported file system type. If a host has no Ext4 filesystem mounted, OptimumCache package installation will be abandoned:

<div class="notranslate">

```
Preparing packages for installation...

Cannot continue: Ext4 partition is the only supported by OptimiumCache, there is no one in fstab

error: %pre(optimumcache-0.1-22.el6.cloudlinux.x86_64) scriptlet failed, exit status 1

error:   install: %pre scriptlet failed (2), skipping
```
</div>

Also, an attempt to add for caching directory, which does not reside on Ext4, will fail:

<div class="notranslate">

```
# occtl --mark-dir /home --recursive

mount: / not mounted already, or bad option

optimumcache: Can not mount device. rc[8192]

Error: mark[1]: /usr/bin/optimumcache mark --recursive /home
```
</div>

#### Yum fails to install Perl rpms coming with OptimumCache

If got this error with <span class="notranslate">`yum install optimumcache`</span>

<div class="notranslate">

```
Error: Package: cloudlinux-collect-0.1-6.el6.noarch (cloudlinux-x86_64-server-6)

Requires: perl(Config::Tiny)

Error: Package: cloudlinux-collect-0.1-6.el6.noarch (cloudlinux-x86_64-server-6)

Requires: perl(IO::Socket::SSL)

Error: Package: cloudlinux-collect-0.1-6.el6.noarch (cloudlinux-x86_64-server-6)

Requires: perl(YAML::Tiny)

Error: Package: cloudlinux-collect-0.1-6.el6.noarch (cloudlinux-x86_64-server-6)

Requires: perl(IPC::Run)

You could try using --skip-broken to work around the problem

You could try running: rpm -Va --nofiles --nodigest
```
</div>

Most probably you have excluded <span class="notranslate">`perl*`</span> packages in <span class="notranslate">`/etc/yum.conf`</span> file, in this case to install OptimumCache run:

<div class="notranslate">

```
# yum install optimumcache --disableexcludes=all
```
</div>

#### OptimumCache prior 0.2-23: Cannot unmount old ploop image

This is well-known ploop problem, which may result in failing such actions as resizing or moving ploop in OptimumCache. To workaround this problem use <span class="notranslate">`--ignore-unmount-failure`</span> with <span class="notranslate">`--move-ploop`</span>

<div class="notranslate">

```
# occtl --move-ploop --ignore-unmount-failure
```
</div>

As for resizing ploop, use flavor of <span class="notranslate">`--move-ploop`</span> command instead:

<div class="notranslate">

```
# occtl --move-ploop /path/to/new/image/file [size GB] --ignore-unmount-failure
```
</div>

For your changes to take effect, the server has to be rebooted. Upon reboot, you may clean up manually old ploop image file and <span class="notranslate">`DiskDescriptor.xml`</span> file, which resides in the same directory along with old image.

#### High IO rate

High <span class="notranslate">IO</span> problem was fixed in latest version of OptimumCache (version 0.2-6). The fix is to eliminate <span class="notranslate">`superflows fsync()`</span> calls in OptimumCache operations. To activate this fix in existing installation, flag <span class="notranslate">`NOIMMSYNC=1`</span> has to be manually set in <span class="notranslate">`/etc/syscoconfig/optimumcache`</span>.

To ensure that this parameter is set <span class="notranslate">`ON`</span> in the config, set <span class="notranslate">`LOGLEVEL=2`</span> and execute <span class="notranslate">`service optimumcache restart`</span>. You will see something like this:

<div class="notranslate">

```
optimumcache[1770]: Hash-size: 100000000 min-size: 0 max-size: 18446744071562067968
optimumcache[1770]: Count: 0 Timeout: 5
optimumcache[1770]: Max Timeout: 160 Adaptive Timeout Mul/Div: 2/4
optimumcache[1770]: Iolimit: 0 iopslimit: 0
optimumcache[1770]: No immediate fsync: Yes
optimumcache[1771]: Starting OptimumCache monitor
```
</div>

To update to version 0.2-6, run:

<div class="notranslate">

```
# yum update optimumcache --enablerepo=cloudlinux-updates-testing
```
</div>

#### High CPU utilization

Once it is detected that OptimumCache overuses <span class="notranslate">CPU</span>, it is useful to check, whether checksums reindexing process is running. When reindexing is running, high <span class="notranslate">CPU</span> usage is ok, as far it will certainly drop down after reindexing finished.

Can be checked in <span class="notranslate">`/var/log/messages`</span>

<div class="notranslate">

```
# grep Reindexing /var/log/messages

Feb  4 17:00:55 CL-default-2 occtl[2654]: Reindexing started
```
</div>

If the last line from the output is not <span class="notranslate">`Reindexing finished…`</span>, than indexing is in progress.

Also, can be checked via command <span class="notranslate">`occtl --report`</span>, watch if <span class="notranslate">`PFL_REINDEX_NUM_FILES`</span> and <span class="notranslate">`PFL_REINDEX_THOUGHPUT_KB`</span> identifiers are present in the last series of data:

<div class="notranslate">

```
# occtl --report
- Period starts at: 2015-02-04 17:00
Period Stat:

PFL_ATTACHED:                    170318
PFL_CREATED:                     161583
PFL_ERR_BAD_CSUM:                176
PFL_ERR_INODES:                  879
PFL_FAILED_TO_ATTACH_PEER:       791
PFL_FAILED_TO_ATTACH_PEER_EBUSY: 791

PFL_INODE_IN:                    406167
PFL_PAGEMIN_FILTERED_OUT:        233418
PFL_PAGEMIN_USED:                136082
PFL_REINDEX_NUM_FILES:           192810
PFL_REINDEX_THOUGHPUT_KB:        2904007
PFL_RESTART:                     1
```
</div>

#### Uninstalling OptimumCache lasts for too long

Uninstalling OptimumCache takes time because of files unmark process, which lasts proportionally to number of files, previously marked for caching with <span class="notranslate">`occtl --mark-dir...`</span>. If you see, that <span class="notranslate">`yum remove optimumcache`</span> command is stuck and you have no time to wait for it to finish, or <span class="notranslate">IO</span> load, caused by unmarking files, is undesirable for you, open another console terminal and invoke:

<div class="notranslate">

```
# occtl --cancel-pending-jobs
```
</div>

This command will cancel unmark operation, being run by yum under the hood. So that yum uninstall package transaction will complete very soon.

#### ‘Failed to attach peer: Invalid argument’ appears in syslog

Rather rare problem, try to forcibly update `optimumcache_s` with ploop status.

<div class="notranslate">

```
# occtl --remount-cached-points
```
</div>

## TPE extension

**TPE (Trusted Path Execution)**

The kernel supports <span class="notranslate"> TPE </span> feature out of the box. You can configure it using following files:
<div class="notranslate">

```
·        /proc/sys/kernel/grsecurity/grsec_lock
·        /proc/sys/kernel/grsecurity/tpe
·        /proc/sys/kernel/grsecurity/tpe_gid
·        /proc/sys/kernel/grsecurity/tpe_restrict_all
```
</div>

To enable <span class="notranslate"> TPE </span> feature in a standard way just add following to the end of your <span class="notranslate"> /etc/sysctl.conf </span>
<div class="notranslate">

```
#GRsecurity 
kernel.grsecurity.tpe = 1 
kernel.grsecurity.tpe_restrict_all = 1 
kernel.grsecurity.grsec_lock = 1  
```
</div>

And do:
<div class="notranslate">

```
# sysctl -p
```
</div>  

::: tip Note
Once you set grsec_lock to 1, you will not be able to change TPE options without reboot.
:::

 This <span class="notranslate">Trusted Path Execution</span> feature was adopted from <span class="notranslate">grsecurity</span>.

## CPU limits

:::tip Note
Deprecated

This limit is no longer used, and <span class="notranslate"> [SPEED](/limits/#speed-limits) </span> is used instead
:::

### CPU limits before lve-utils 1.4

<span class="notranslate"> CPU </span> Limits are set by <span class="notranslate"> CPU </span> and <span class="notranslate"> NCPU </span> parameters. <span class="notranslate"> CPU </span> specifies the % of total <span class="notranslate"> CPU </span> of the server available to LVE. <span class="notranslate"> NCPU </span> specifies the number of cores available to LVE. The smallest of the two is used to define how much <span class="notranslate"> CPU </span> power will be accessible to the customer.

| |  |  | |
|-|--|--|-|
|Cores Per Server | <span class="notranslate"> CPU </span> Limit | <span class="notranslate"> NCPU </span> Limit | Real limit|
|1 | 25% | 1 | 25% of 1 core|
|2 | 25% | 1 | 50% of 1 core|
|2 | 25% | 2 | 50% of 1 core|
|4 | 25% | 1 | 100% of 1 core (full core)|
|4 | 25% | 2 | 1 core|
|4 | 50% | 1 | 1 core|
|4 | 50% | 2 | 2 cores|
|8 | 25% | 1 | 1 core|
|8 | 25% | 2 | 2 cores|
|8 | 50% | 2 | 2 cores|
|8 | 50% | 3 | 3 cores|

When user hits <span class="notranslate"> CPU </span> limit, processes within that limit are slowed down. For example, if you set your <span class="notranslate"> CPU </span> limit to 10%, and processes inside LVE want to use more then 10% they will be throttled (put to sleep) to make sure they don't use more then 10%. In reality, processes don't get <span class="notranslate"> CPU </span> time above the limit, and it happens much more often then 1 second interval, but the end result is that processes are slowed down so that their usage is never above the <span class="notranslate"> CPU </span> limit set.

## Package integration

:::tip Note
Deprecated.
:::

:::warning Note
You can use [Control panel integration guide](/control_panel_integration/) instead.
:::

**[lve-utils 1.4+]**

CloudLinux can automatically detect the most popular control panels, like cPanel - and allows to set different limits for users in different packages. It simplifies management as you don't have to choose between one limit that fits all your customers on the server, or individual limits for the customers.

If you have a custom made control panel, with your own 'package' implementation, you can still use CloudLinux framework to manage limits for your packages.

To do that, you would need:

Implement script that would map users to packages.

Configure lvectl to use your script.

**Implementing script**

A script can be written in any language, and it has to be executable.

It should accept the following arguments:

--list-all                        prints [userid package] pairs

Output should look like a list of space separate pairs of user Linux IDs and package names.

<div class="notranslate">

```
100 package1
101 package1
102 package2
103 package3
```
</div>

<span class="notranslate">--userid=id prints package for a user specified </span>

Output should contain package name, like:

<div class="notranslate">

```
package1
```
</div>

<span class="notranslate">--package="package"    prints users for a package specified. </span>

Output should look like a list of user Linux IDs.

<div class="notranslate">

```
100
101
```
</div>

<span class="notranslate">--list-packages prints the list of packages </span>

Output contains a list of names of packages, like:

<div class="notranslate">

```
package1
package2
package3
```
</div>

**Configuring lvectl to use your custom script**

Edit <span class="notranslate">/etc/sysconfig/cloudlinux </span> file.

Edit or modify parameter <span class="notranslate">`CUSTOM_GETPACKAGE_SCRIPT`</span>, and set it to point to your script, like: <span class="notranslate">`CUSTOM_GETPACKAGE_SCRIPT=/absolute/path/to/your/script`</span>


For the script example please check the following article: [https://cloudlinux.zendesk.com/hc/en-us/articles/115004529105-Integrating-LVE-limits-with-packages-for-unsupported-control-panels](https://cloudlinux.zendesk.com/hc/en-us/articles/115004529105-Integrating-LVE-limits-with-packages-for-unsupported-control-panels).

## Redis support for HostingLimits

:::warning Warning!
Starting from **mod_hostinglimits version 1.0-30** Redis is not supported.
:::

Redis support provides a way to query Redis database for LVE id, based on domain in the HTTP request. Given a database like:

<div class="notranslate">

```
xyz.com 10001
bla.com  10002
....
```
</div>

The module will retrieve corresponding LVE id from the database.

To enable Redis support, compile from source: [https://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz](https://repo.cloudlinux.com/cloudlinux/sources/mod_hostinglimits.tar.gz)

The compilation requires hiredis library.

<div class="notranslate">

```
$ wget https://repo.cloudlinux.com/cloudlinux/sources/da/mod_hostinglimits.tar.gz
$ yum install cmake
$ tar -zxvf mod_hostinglimits*.tar.gz
$ cd mod_hostinglimits*
$ cmake -DREDIS:BOOL=TRUE .
$ make
$ make install
```
</div>

To enable Redis mode, specify:

<div class="notranslate">

```
LVEParseMode REDIS
```
</div>

### **LVERedisSocket**

| | |
|-|-|
|**Description**| Socket to use to connect to Redis database.|
|**Syntax**|<span class="notranslate">`LVERedisSocket path`</span>|
|**Default**|<span class="notranslate">`/tmp/redis.sock`</span>|
|**Context**| server config|

Used to specify location of Redis socket.

**Example**:

<div class="notranslate">

```
LVERedisSocket /var/run/redis.sock
```
</div>

### **LVERedisAddr**

| | |
|-|-|
|**Description**| IP/port used to connect to Redis database instead of socket.|
|**Syntax**|<span class="notranslate">`LVERedisAddr IP PORT`</span>|
|**Default**| <span class="notranslate">`none`</span>|
|**Context**|<span class="notranslate">server config</span>|

Used to specify IP and port to connect to Redis instead of using Socket

**Example**:

```
LVERedisAddr 127.0.0.1 6993
```

### **LVERedisTimeout**

| | |
|-|-|
|**Descriptin**| Number of seconds to wait before attempting to re-connect to Redis.|
|**Syntax**|<span class="notranslate">`LERetryAfter SECONDS`</span>|
|**Default**| 60 seconds|
|**Context**|<span class="notranslate">server config</span>|

Number of seconds to wait before attempting to reconnect to Redis after the last unsuccessful attempt to connect.

**Example**:

<div class="notranslate">

```
LVERedisTimeout 120
```
</div>