# Deprecated


[Git for cPanel](/deprecated/#git-for-cpanel)
[LVE-Stats 0.x](/deprecated/#lve-stats-0-x)
[OptimumCache](/deprecated/#optimumcache)

## Git for cPanel

:::tip Note
This package is no longer supported as it may cause dependency issues
:::

_Please note that this package is no longer needed, as since cPanel 11.38, you can install git without any issues on cPanel by running:_

<span class="notranslate"> </span>
```
$ yum install git
```


To install [git](http://git-scm.com/) on cPanel servers:

<span class="notranslate"> </span>
```
$ yum install git-cpanel
```


## LVE-Stats 0.x

:::tip Note
LVE-STATS-0.X IS NO LONGER SUPPORTED, PLEASE USE [LVE-STATS 2](/lve-stats_2/)
:::


 lve-stats package collects LVE usage statistics and allows to query the data.

To install, run:

<span class="notranslate"> </span>
```
$ yum install lve-stats
```


If you are already running lve-stats (in case you are running cPanel LVE plugin), run:

<span class="notranslate"> </span>
```
$ yum update lve-stats
```


This should also be updated automatically next time your system runs system wide update.

The package installs lvestats-server. You can re-start the server by running:

<span class="notranslate"> </span>
```
$ service lvestats restart
```

The package creates sqlite database <span class="notranslate">  /var/lve/lveinfo.db </span> that stores history information about LVE usage. Up to two months of hourly info is stored for each client. The data for the last hour is stored with 5 minutes interval, and the data for the past 10 minutes is stored with 1 minute interval.

LVE Stats updates <span class="notranslate"> /var/lve/info </span> every few seconds. That info is used by <span class="notranslate"> LVE Manager </span> plugin.

Package consists of lveinfo utility to query LVE usage, and lvechart that allows you to chart usage for individual LVE.

To query historical LVE info, lveinfo command provided. It is located at <span class="notranslate"> /usr/sbin/lveinfo: 
  </span>
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

#### Output

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

#### Examples

Display top 10 users, by max <span class="notranslate"> CPU </span> usage, from Oct 10, 2010 to Oct 15, 2010. Display username if possible:

<span class="notranslate"> </span>
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

<span class="notranslate"> </span>
<div class="notranslate">

```
$ lveinfo --from='2010-10-10' --to='2010-10-15' --user=web2 --display-username
ID        aCPU       mCPU     lCPU      aEP      mEP      lEP       aMem       mMem       lMem      MemF     MepF 
web2        1        6        10        0        0        25        10M        15M        1G        0        0
```
</div>

### Storing statistics in MySQL

:::tip Note
LVE-STATS-0.X IS NO LONGER SUPPORTED, PLEASE USE [LVE-STATS 2](/lve-stats_2/)
:::

 You have to install MySQL-python rpm to store lve-stats on centralized server. Run:

<span class="notranslate"> </span>
```
$ yum install MySQL-python
```


If you have MySQL 5.3+ installed on CloudLinux 5 server, and there is no  libmysqlclient_r.so.15 on the server, run:

<span class="notranslate"> </span>
```
$ yum --enablerepo=cloudlinux-updates-testing install mysqlclient15
```


A typical procedure to configure the MySQL database for storing information about multiple servers for lve-stats services looks as follows:

Create database and user. You can do it by executing the following commands:

<span class="notranslate"> </span>
<div class="notranslate">

```
create database <database>;
grant all on <database>.* to <user> identified by 'password';
flush privileges;
```
</div>

Create database schema:

<span class="notranslate"> </span>
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
On each server edit file <span class="notranslate"> /etc/sysconfig/lvestats & /etc/sysconfig/lvestats.readonly </span> as follows:

<span class="notranslate"> </span>
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

Select server responsible for compacting database on regular bases by setting <span class="notranslate"> COMPACT=master </span> in <span class="notranslate"> /etc/sysconfig/lvestats </span> for that server. Set <span class="notranslate"> COMPACT=slave </span> on all other servers.

Make sure that <span class="notranslate"> /etc/sysconfig/lvestats </span> is readable only by <span class="notranslate"> root (chmod 600 /etc/sysconfig/lvestats), lvestats.readonly </span> should be readable by anyone

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

#### Updating MySQL & PostgreSQL schema for lve-stats 0.8+

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




 You have to install <span class="notranslate"> postgresql-python rpm </span> to store lve-stats on centralized server. Run:

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
On each server edit file <span class="notranslate"> /etc/sysconfig/lvestats </span> and <span class="notranslate"> /etc/sysconfig/lvestats </span> as follows:

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
LVE-STATS-0.X IS NO LONGER SUPPORTED, PLEASE USE [LVE-STATS 2](/lve-stats_2/)
:::

[lve-stats 0.10+]

When you have multiple servers storing LVE statistics to a central database, then you will need to pick one server responsible for compacting data.

On that server, edit file: <span class="notranslate"> </span> , and change option <span class="notranslate"> **COMPACT** </span> to <span class="notranslate"> **master** </span>

On all other servers, change that option to <span class="notranslate"> **slave** . </span>

Default: <span class="notranslate"> **single** </span> -- should be used when lve-stats stores data to a single database.

## OptimumCache

:::tip Note
OPTIMUMCACHE IS NO LONGER SUPPORTED.
:::

   **OptimumCache 0.2+**

OptimumCache is a de-duplicating file cache optimized specifically for shared hosting. Typical shared hosting server runs a number of sites with WordPress and Joomla as well as other popular software. This usually means that there are hundreds of duplicate files that are constantly being read into file cache - both wasting precious disk <span class="notranslate"> IO </span> operations as well as memory. OptimumCache creates a cache of such duplicated files and de-duplicates file cache.
![](/images/embim1.png)

With OptimumCache, if a duplicate of an already loaded file is requested, the file gets loaded from filesystem cache. By doing that, system bypasses disk IO, significantly improving the speed of reading that file, while lowering load on the hard disk. As the file had been read from disk just once, it is cached by filesystem cache just once, minimizing amount of duplicates in file system cache and improving overall cache efficiency. This in turn reduces memory usage, decreases the number of disk operations - all while improving the websites response time.

Further reading: [http://kb.cloudlinux.com/tag/optimumcache/](http://kb.cloudlinux.com/tag/optimumcache/)


### Installation





64bit CloudLinux 6.x or higher
ext4 filesystem
kernel lve1.2.55 or later.


<span class="notranslate"> </span>
```
# yum install optimumcache
```


OptimumCache must be provided with list of directories to expect duplicate files be in:

<span class="notranslate"> </span>
_# occtl --recursive --mark-dir /home_

_# occtl --recursive --mark-dir /home2_ (for cPanel)

<span class="notranslate"> _# occtl --recursive --mark-dir /var/www_ </span> (for Plesk)

OptimumCache is going to index these directories. Thus system load during this period (from hours to days) might be as twice as high. See 'Marking directories' [ [http://docs.cloudlinux.com/index.html?marking_directories.html](http://docs.cloudlinux.com/index.html?marking_directories.html) ].

**Allocating Disk Space for OptimumCache:**

By default OptimumCache will attempt to setup 5GB ploop (high efficiency loopback disk) to be used for the cache in <span class="notranslate"> /var/share/optimumcache/optimumcache.image </span>

That ploop will be mounted to: <span class="notranslate"> /var/cache/optimumcache  </span>

The ploop image will be located at <span class="notranslate"> /var/share/optimumcache/optimumcache.image </span>

Allocating OptimumCache disk space for ploop on a fast drives (like SSD) will provide additional performance improvement as more duplicated files would be loaded from fast disks into memory.

**Moving ploop image to another location:**

<span class="notranslate"> </span>
```
# occtl --move-ploop /path/to/new/image/file [new size[KMGT]]
```

_/path/to/new/image/file_ must be file path + file name, not a directory name.

Example:

<span class="notranslate"> </span>
# occtl --move-ploop /var/ssh/optimumcache.image


If <span class="notranslate"> ‘new size’ </span> is not mentioned, then value from <span class="notranslate"> /etc/sysconfig/optimumcache </span> is used. If <span class="notranslate"> /etc/sysconfig/optimumcache </span> does not mention anything regarding ploop image size, then default 5GB is used.

**Enabling and disabling ploop:**

To turn on ploop:
<span class="notranslate"> </span>
```
# occtl --init-ploop
```


To disable ploop:
<span class="notranslate"> </span>
```
# occtl --disable-ploop
```

If ploop image has been mounted in <span class="notranslate"> /etc/fstab </span> for OpimumCache-0.1-21 and earlier, you may consider removing this fstab entry in OpimumCache 0.2+. That is because since 0.2+ ploop is mounted automatically at service start.

If you prefer leave that fstab mount point as is, you may see some warnings when you decide to move ploop later via <span class="notranslate"> ‘occtl --move-ploop’ </span> .

**Resizing ploop:**

To resize ploop:

<span class="notranslate"> </span>
```
# occtl --resize-ploop [new size[KMGT]]
```

A common reason for resizing ploop is reacting to OptimumCache syslog message like <span class="notranslate"> “OptimumCache recommends cache storage size to be at least … GB” </span>

**Deleting ploop:**

<span class="notranslate"> </span>
```
# occtl --delete-ploop
```

For the case when this action cannot be completed due to <span class="notranslate"> “Unable unmount ploop” </span> issue, there is a workaround in “Troubleshooting” section.

Q. I created/resized/moved/deleted ploop. Do I need to rerun the initial mark process?
А. Not needed.

### Using without ploop




 On servers with kernel prior to lve1.2.55 ploop will not be used (due to ploop related issues in the kernel). Instead cached files will be stored in <span class="notranslate"> /var/cache/optimumcache </span> .
The cache will be cleaned (shrunk) by 20% once partition on which <span class="notranslate"> OPTIMUMCACHE_MNT </span> resides has only 10% of free space. You can change that by changing <span class="notranslate"> PURGEAHEAD </span> param in <span class="notranslate"> /etc/sysconfig/optimumcache </span> , and restarting optimumcache service.

The cache is cleaned <span class="notranslate"> /etc/cron.d/optimumcache_cron </span> script optimumcache_purge, which runs every minute:
<span class="notranslate"> </span>
0-59 * * * * root /usr/share/optimumcache/optimumcache_purge


### Marking Directories





**Marking directories to be cached:**

<span class="notranslate"> </span>
```
# occtl --mark-dir /path/to/site/on/filesystem --recursive
```

In common scenario admin marks for caching user directories:

<span class="notranslate"> </span>
```
# occtl --mark-dir /home /home2 /home3 --recursive
```


OptimumCache is going to index these directories. Thus system load during this period (from hours to days) might be as twice as high. You can check indexing job status with <span class="notranslate"> 'at -l' </span> at any time.

**Ignoring particular files & directories:**

OptimumCache tracks files & directories that need to be cached. Once file is modified, it will no longer be tracked by OptimumCache (as there is very little chance that it will have a duplicate). Yet, all new files created in tracked directories are checked for duplicates.

Sometimes you might want to ignore such checks for directories where large number of temporary or new files are created, that will not have duplicates - as such checks are expensive. Directories like mail queue, and tmp directories should be ignored.

You can set a regexp mask for directories that you would like to ignore using:
<span class="notranslate"> </span>
```
$ occtl --add-skip-mask REGEX
```


To list skip masks:
<span class="notranslate"> </span>
```
$ occtl --list-skip-mask
```


To remove skip mask:
<span class="notranslate"> </span>
```
$ occtl --remove-skip-mask ID|Tag
```


At the very end, for those changes to take effect:
<span class="notranslate"> </span>
$ occtl --check

‘occtl --check’ is the same lengthy operation as <span class="notranslate"> ‘marking’ </span> is. Thus, it’s usage has to be sane, especially for big <span class="notranslate"> ‘home’ </span> (>500G).

By default, OptimumCache sets up following skip masks:
<span class="notranslate"> </span>
| |  | |
|-|--|-|
|id | tag | regex|
|----- | ------------------ | ---------------|
|1 | all_dot_files | /\...*|
|2 | cagefs | ^/home/cagefs-skeleton$|
|3 | cagefs | ^/home/cagefs-skeleton/|
|4 | cpanel | ^/home[^/]*/cPanelInstall|
|5 | cpanel | ^/home[^/]*/cpeasyapache|
|6 | cpanel | ^/home[^/]*/aquota|
|7 | cpanel | ^/home[^/]*/jailshell|
|8 | cpanel | ^/home[^/]*/[^/]+/mail$|
|9 | cpanel | ^/home[^/]*/[^/]+/mail/.*|
|10 | cpanel | ^/home[^/]*/[^/]+/logs$|
|11 | cpanel | ^/home[^/]*/[^/]+/logs/.*|
|12 | cpanel | ^/home[^/]*/[^/]+/\.cpanel$|
|13 | cpanel | ^/home[^/]*/[^/]+/\.cpanel/.*|
|14 | cpanel | ^/home[^/]*/[^/]+/\.cagefs|
|15 | cpanel | ^/home[^/]*/[^/]+/\.cagefs/.*|
|16 | cpanel | ^/home[^/]*/virtfs|
|17 | cpanel | ^/home[^/]*/virtfs/.*|
|18 | not_a_userdir | ^/home/tmp/|
|19 | not_a_userdir | ^/home/tmp$|
|20 | not_a_userdir | ^/home/ftp/|
|21 | not_a_userdir | ^/home/ftp$|
|22 | not_a_userdir | ^/home/admin/|
|23 | not_a_userdir | ^/home/admin$|
|24 | quota | ^/home[^/]*/quota.user$|
|25 | usermisc | /quota.user$|
|26 | users_home | ^/home/[^/]+/backups$|
|27 | users_home | ^/home/[^/]+/backups/|
|28 | users_home | ^/home/[^/]+/imap$|
|29 | users_home | ^/home/[^/]+/imap/|
|30 | users_home | ^/home/[^/]+/Maildir$|
|31 | users_home | ^/home/[^/]+/Maildir/|
|32 | users_home | ^/home/[^/]+/domains/[^/]+/logs$|
|33 | users_home | ^/home/[^/]+/domains/[^/]+/logs/|
|34 | users_home | ^/home/[^/]+/domains/[^/]+/public_ftp$|
|35 | users_home | ^/home/[^/]+/domains/[^/]+/public_ftp/|
|36 | users_home | ^/home/[^/]+/domains/[^/]+/stats$|
|37 | users_home | ^/home/[^/]+/domains/[^/]+/stats/|

This information is stored in <span class="notranslate"> /etc/container/optimumcache/ignore.d/ </span>

**Skip Mask syntax**

Skip masks use following regexp syntax: [http://www.greenend.org.uk/rjk/tech/regexp.html](http://www.greenend.org.uk/rjk/tech/regexp.html)

For example, to disable caching all directories that contain <span class="notranslate"> */cache/* </span> , you should use skip masks like:

<span class="notranslate"> </span>
/cache/
/cache$

This information is stored in <span class="notranslate"> /etc/container/optimumcache/ignore.d/ </span>


### OptimumCache Configuration File




<span class="notranslate"> </span>
/etc/sysconfig/optimumcache

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


### 




 OptimumCache is controlled using occtl command line utility.
<span class="notranslate"> </span>
| |  | |
|-|--|-|
| |  | |

Display numbers/percents of cached files:

<span class="notranslate"> </span>
```
optimumcache stat
```

or

<span class="notranslate"> </span>
```
optimumcache stat /home
```

To display statistic for specific mount. In depth display what is being held in cache:

```
optimumcache dump [--resolve-filenames] [mount]
```

The option <span class="notranslate"> '--resolve-filenames' </span> is experimental and may not apply to all output cached entries.

Optional Arguments:

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
| | |
| | |



### cloudlinux-collect: Collect System Load Statistics







Installing this package automatically starts system load statistics collection in background. cloudlinux-collectl package has no strict dependency on OptimumCache, thus the statistics is collected regardless of whether OptimumCache is installed or not. The aim of having this package pre-installed is to compare system performance before and after installing OptimumCache, thus to measure OptimumCache effectiveness.



<span class="notranslate"> </span>
```
# yum install cloudlinux-collect --enablerepo=cloudlinux-updates-testing
```

Note: cloudlinux-collectl will be installed automatically on optimumcache upgrade to 0.2-23.



cloudlinux-collectl can monitor response time for a configurable set of URLs.

Start monitoring new URL:

<span class="notranslate"> </span>
```
# cloudlinux-collect --addurl <alias> <[http://url](http://url)
```

example:

<span class="notranslate"> </span>
```
# cloudlinux-collect --addurl localhost [http://127.0.0.1/index.php](http://127.0.0.1/index.php)
```

Try <span class="notranslate"> </span> for more options.


<span class="notranslate"> </span>
```
# cloudlinux-collect --test
```

Actual logs are compressed with gzip and kept in <span class="notranslate"> /var/log/optimumcache/collectl </span> directory.



To monitor what statistics are being collected, try command:

<span class="notranslate"> </span>
```
# cloudlinux-collect --test
```

![](/images/optimumcachecollect_zoom93.png)

Along with common statistics blocks as <span class="notranslate"> CPU </span> , disk usage, <span class="notranslate"> inodes </span> cached, there are two blocks of data to watch how effectively OptimumCache is functioning.

<span class="notranslate"> ‘OPTIMUMCACHE DETAIL’ </span> refers to data, which is similar to output of command

<span class="notranslate"> </span>
```
# optimumcache stat
```







Particularly, the last column percent numbers shall match.

The next goes <span class="notranslate"> URLSTATTRACKER DETAIL </span> block with url response time in milliseconds. Negative values here may pop up unexpectedly. Negative numbers are not milliseconds, but signal about http error response code for that specific url. For instance, -403 will signal for <span class="notranslate"> ‘Forbidden’ </span> http error. As for -500 value, it signals not only for <span class="notranslate"> ‘Internal Server Error’ </span> , but can be displayed, when there is connection problem with the server, which is specified by the url.



<span class="notranslate"> URLSTATTRACKER DETAIL </span> is the only statistics, which requires manual configuration. Upon clean installation, it has only <span class="notranslate"> url_localhost </span> preconfigured:

<span class="notranslate"> </span>
```
# cloudlinux-collect --info
```





To add another url for monitoring:

<span class="notranslate"> </span>
```
# cloudlinux-collect --addurl alt [http://192.168.0.102/](http://192.168.0.102/)
```

To display urls being monitored list:

<span class="notranslate"> </span>
```
# cloudlinux-collect --info
```






To skip URL from being tracked run command:

<span class="notranslate"> </span>
```
# cloudlinux-collect --skip <url short name>
```



cloudlinux-collectl has got collectl package as a dependency. Initd script <span class="notranslate"> /etc/init.d/cloudlinux-collectl </span> will automatically bring up another instance of collectl named <span class="notranslate"> ‘collectl-optimumcache’ </span> . collectl-optimumcache daemon instance has a separate config and does not interfere with other running pre-configure collectl daemon (if any).

As it was mentioned, collectl-optimumcache daemon starts automatically on package install, then on server restart events, kicked by regular Initd script <span class="notranslate"> /etc/init.d/cloudlinux-collectl </span> . Thus, checking the daemon status, stop, restart is trivial:

<span class="notranslate"> </span>
```
# service cloudlinux-collect statuscollectl-optimumcache (pid  1745) is running…
```

To start /stop:

<span class="notranslate"> </span>
```
# service cloudlinux-collect < start | stop >
```




The statistics is being collected into files named <span class="notranslate"> %hostname%-%datetime%.raw.gz </span> under directory <span class="notranslate"> </span>

To convert those info format suitable for loading into Excel, LibreOffice Calc, another data mining tool, run the command:

<span class="notranslate"> </span>
```
# cloudlinux-collect --genplotfiles
```







### Uninstall OptimumCache





To uninstall OptimumCache run:

<span class="notranslate"> </span>
```
service optimumcache stopocctl --delete-ploop:>/var/share/optimumcache_storeyum remove optimumcache
```


If available: reboot server

After the reboot <span class="notranslate"> pfcache= mount </span> options will disappear by themselves.

For OptimumCache version prior 0.2-11, uninstalling via rpm package manager does not automatically removes away ploop image. That is because not always possible to unmount it properly due to kernel dependency. If there is no luck with unmounting ploop, then the server will have to be rebooted and will need to remove ploop files manually:

```
# rm /var/share/optimumcache/optimumcache.image# rm /var/share/optimumcache/DiskDescriptor.xml# rm /var/share/optimumcache/DiskDescriptor.xml.lck
```
 or

```
# rm /path/to/ploop/image/file# rm /path/to/ploop/image/DiskDescriptor.xml# rm /path/to/ploop/image/DiskDescriptor.xml.lck
```

For OptimumCache version 0.2-11 and later, ploop image will be removed automatically during uninstall. If ploop unmount issue prevents doing that, ploop image clean up will be scheduled after next server reboot.

If uninstall OptimumCache process lasts for too long, please find the solution in Troubleshooting section of this document.


### Troubleshooting





**Installing for FS is different from Ext4**

For now Ext4 is the only supported file system type. If a host has no Ext4 filesystem mounted, OptimumCache package installation will be abandoned:

<span class="notranslate"> </span>
||
||
||

Also, an attempt to add for caching directory, which does not reside on Ext4, will fail:
<span class="notranslate"> </span>
||
||
||



If got this error with <span class="notranslate"> ‘yum install optimumcache’: </span>

||
||
||

Most probably you have excluded <span class="notranslate"> "perl*" </span> packages in <span class="notranslate"> /etc/yum.conf </span> file, in this case to install OptimumCache run:

<span class="notranslate"> </span>
```
# yum install optimumcache --disableexcludes=all
```


**OptimumCache prior 0.2-23: ** <span class="notranslate"> Cannot unmount old ploop image </span>

This is well-known ploop problem, which may result in failing such actions as resizing or moving ploop in OptimumCache. To workaround this problem use <span class="notranslate"> ‘--ignore-unmount-failure’ </span> with <span class="notranslate"> --move-ploop: </span>

```
# occtl --move-ploop --ignore-unmount-failure
```

As for resizing ploop, use flavor of <span class="notranslate"> ‘--move-ploop’ </span> command instead:

<span class="notranslate"> </span>
```
# occtl --move-ploop /path/to/new/image/file [size GB] --ignore-unmount-failure
```

For your changes to take effect, the server has to be rebooted. Upon reboot, you may clean up manually old ploop image file and <span class="notranslate"> DiskDescriptor.xml </span> file, which resides in the same directory along with old image.

**High ** <span class="notranslate"> IO </span> ** rate**

High <span class="notranslate"> IO </span> problem was fixed in latest version of OptimumCache (version 0.2-6). The fix is to eliminate <span class="notranslate"> superflows fsync() </span> calls in OptimumCache operations. To activate this fix in existing installation, flag <span class="notranslate"> NOIMMSYNC=1 </span> has to be manually set in <span class="notranslate"> /etc/syscoconfig/optimumcache.  </span>

To ensure that this parameter is set <span class="notranslate"> ON </span> in the config, set <span class="notranslate"> LOGLEVEL=2 </span> and execute <span class="notranslate"> ‘service optimumcache restart’ </span> . You will see something like this:

<span class="notranslate"> </span>
optimumcache[1770]: Hash-size: 100000000 min-size: 0 max-size: 18446744071562067968
optimumcache[1770]: Count: 0 Timeout: 5
optimumcache[1770]: Max Timeout: 160 Adaptive Timeout Mul/Div: 2/4
optimumcache[1770]: Iolimit: 0 iopslimit: 0
optimumcache[1770]: No immediate fsync: Yes
optimumcache[1771]: Starting OptimumCache monitor

To update to version 0.2-6 run:

<span class="notranslate"> </span>
```
# yum update optimumcache --enablerepo=cloudlinux-updates-testing
```


**High ** <span class="notranslate"> CPU </span> ** Utilization**

Once it is detected that OptimumCache overuses <span class="notranslate"> CPU </span> , it is useful to check, whether checksums reindexing process is running. When reindexing is running, high <span class="notranslate"> CPU </span> usage is ok, as far it will certainly drop down after reindexing finished.

Can be checked in <span class="notranslate"> /var/log/messages - </span>

# grep Reindexing /var/log/messages
Feb  4 17:00:55 CL-default-2 occtl[2654]: Reindexing started

If the last line from the output is not <span class="notranslate"> ‘Reindexing finished…” </span> , than indexing is in progress.

Also, can be checked via command <span class="notranslate"> ‘occtl --report’ </span> , watch if <span class="notranslate"> PFL_REINDEX_NUM_FILES </span> and <span class="notranslate"> PFL_REINDEX_THOUGHPUT_KB </span> identifiers are present in the last series of data:
<span class="notranslate"> </span>



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



Uninstalling OptimumCache takes time because of files unmark process, which lasts proportionally to number of files, previously marked for caching with <span class="notranslate"> ‘occtl --mark-dir...’ </span> . If you see, that ‘yum remove optimumcache’ command is stuck and you have no time to wait for it to finish, or <span class="notranslate"> IO </span> load, caused by unmarking files, is undesirable for you, open another console terminal and invoke:

<span class="notranslate"> </span>
```
# occtl --cancel-pending-jobs
```

This command will cancel unmark operation, being run by yum under the hood. So that yum uninstall package transaction will complete very soon.



Rather rare problem, try to forcibly update optimumcache_s with ploop status.

<span class="notranslate"> </span>
```
# occtl --remount-cached-points
```


