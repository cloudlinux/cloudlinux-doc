# Introduction

[[toc]]

## CloudLinux OS editions

|**Features**|**CloudLinux OS Solo**|**CloudLinux OS Admin**|**CloudLinux OS Shared**|**CloudLinux OS Shared Pro**|
|:-:|:-:|:-:|:-:|:-:|
|Maximum amount of hosting accounts|1|5|unlimited|unlimited|
|Limits (LVE Manager)|No|**Yes***|**Yes**|**Yes**|
|Cage FS|No|**Yes**|**Yes**|**Yes**|
|MySQL Governor|No|No|**Yes**|**Yes**|
|PHP Selector|**Yes**|**Yes**|**Yes**|**Yes**|
|Other Selectors (Python, Node.js, Ruby)|No|No|**Yes**|**Yes**|
|HardenedPHP|No|**Yes**|**Yes**|**Yes**|
|Apache mod_lsapi PRO|**Yes**|**Yes**|**Yes**|**Yes**|
|SecureLinks|No|**Yes**|**Yes**|**Yes**|
|Website monitoring tool|**Yes**|**Yes**|**Yes**|**Yes**|
|Website monitoring alerts|**Yes**|No|No|No|
|Slow Site analyzer|**Yes**|**Yes**|**Yes**|**Yes**|
|PHP X-Ray|**Yes**|**Yes**|No|**Yes**|
|Centralized Monitoring|No|No|No|**Yes**|
|AccelerateWP|**Yes**|**Yes**|No|**Yes**|
|Support 24/7|**Yes**|**Yes**|**Yes**|**Yes**|
|Priority support|No|No|No|**Yes**|

\* Limits are disabled by default.

### CloudLinux OS Solo
CloudLinux OS Solo is designed for installation on VPS or VDS servers. 
This edition has major difference agains all other, so you should look for the detailed docs 
[here](https://docs.solo.cloudlinux.com/introduction/).


### CloudLinux OS Admin

CloudLinux OS Admin is designed for shared hosting providers who want to flawlessly migrate their 
big shared hosting customer to individual VPS with same CloudLinux features as on Shared hosting. 
At the same time you will be able to separate such a user's websites if necessary and isolate them 
with CageFS for efficient and extra security.

Also it may be suitable for a little server with less than 5 customers on it, but be careful, 
there is no migration to Shared edition available.

Most of the features of CloudLinux OS Shared are available in this edition, with a small differences:

- lve limits are set to unlimited by default (can be changed in CloudLinux Manager at any time)
- MySQL Governor is not available in this edition
- the license itself does not allow more than 5 users to be hosted on server.

### CloudLinux OS Shared (Pro)

CloudLinux OS Shared is designed for shared hosting providers. 
It isolates each customer into a separate “Lightweight Virtualized Environment” (LVE), 
which allocates and limits server resources, like memory, CPU and the number of simultaneous connections, 
for each web hosting tenant. This ensures that tenants cannot jeopardize the stability of your servers, 
causing all sites to slow down or even come to a halt. CloudLinux OS Shared also “cages” tenants from one another 
to avoid security breaches. This way, unstable scripts or malware are not able to sprawl across your customer sites, 
causing severe harm.

Purchasing CloudLinux OS Shared Pro license extends your CloudLinux OS Shared 
functionality with even more useful [features](/cloudlinux-os-plus/). 


## CloudLinux OS components

**CloudLinux Manager**

LVE is a Lightweight Virtualized Environment.
CloudLinux Manager allows you to maintain fine-tuned control over your resources, 
including CPU, IO rate, memory, inodes, numbers of processes, and concurrent connections, 
that any single account can use. Now you can limit resource abuse, while allowing good customers to use what they need.

[See more](/lve_manager/).

**CageFS**

CageFS is a virtualized, per-user file system that uniquely encapsulates each customer, 
preventing users from seeing each other and viewing sensitive information. CageFS prevents a large number of attacks, 
including most privilege escalation and information disclosure attacks. It is completely transparent to your customers, 
without any need for them to change their scripts.

[See more](/cloudlinux_os_components/#cagefs).

**MySQL Governor**

:::tip Note
This component is not available in CloudLinux OS Admin edition.
:::

MySQL Governor tracks CPU and disk IO usage for every user in real time and throttles MySQL queries by using LVE limits. By using the [dbtop](/command-line_tools/#dbtop) utility, it is possible to see the database usage on a per-customer basis, ensuring that the system admin always know what is going on.

[See more](/cloudlinux_os_components/#mysql-governor).

**PHP Selector**

PHP Selector allows end users to select the specific version of PHP they need. It allows ultimate flexibility by offering all 
popular versions of PHP, with more than 120 PHP extensions to choose from.

[See more](/cloudlinux_os_components/#php-selector).

**Ruby Selector**

Ruby Selector allows end users to choose the Ruby version for applications and install additional modules 
to the application environment. Ruby Selector uses `mod_passenger` for delivering optimum performance.

[See more](/cloudlinux_os_components/#ruby-selector).

**Python Selector**

Python Selector allows end users to choose the Python version for applications and install additional modules. 
Python Selector uses `mod_passenger` to get the best performance from Python applications.

[See more](/cloudlinux_os_components/#python-selector).

<span class="notranslate">**Node.js Selector** </span>

Node.js Selector is a CloudLinux OS Shared component that allows each user to easily create Node.js applications, 
choose Node.js version and other parameters for applications based on their needs.

[See more](/cloudlinux_os_components/#node-js-selector).

**Apache mod_lsapi PRO**

Mod_lsapi PRO is the fastest PHP handler for Apache. It is a drop-in replacement for SuPHP, FCGID, RUID2, and ITK. 
It has a low memory footprint and understands `.htaccess` PHP directives.

[See more](/cloudlinux_os_components/#apache-mod-lsapi-pro).

**Reseller limits**

Reseller limits is a feature that allows hosters to set limits for the resources each Reseller can operate with. 
Server admin also provides controls on what resources each end user will have. Reseller limits set by a hoster 
limit the total amount of resources resellers’ end users can consume altogether.

When a hoster has set reseller limits for the particular reseller he provides the reseller with an ability to 
set limits for his end users within the Reseller Interface.

[See more](/cloudlinux_os_components/#reseller-limits).

<span class="notranslate"> **LVE-stats 2** </span>

<span class="notranslate"> LVE-stats 2 </span> collects LVE usage statistics (CPU, memory, disk space usage) 
and allows to collect the usage data.

[See more](/cloudlinux_os_components/#lve-stats-2).

## CloudLinux OS life cycle

CloudLinux OS follows the life cycle policy of RHEL. 
Using a supported operating system is critical to maintaining a stable server environment.

Currently, the following versions are available and supported:

| |  | |
|-|--|-|
|Operating System | Release Date| End of Life and Support|
|CloudLinux OS Shared 6 | Feb 1, 2011 | Nov 30, 2020 ([ELS until June 30, 2024](https://docs.cln.cloudlinux.com/billing/#cloudlinux-os-6-extended-lifecycle-support)) |
|CloudLinux OS Shared 7 | Apr 1, 2015 | Jun 30, 2024 |
|CloudLinux OS Shared (Pro) 8 | Mar 17, 2020 | May 31, 2029 |
|CloudLinux OS Solo (8) | Mar 17, 2020 | May 31, 2029 |
|CloudLinux OS Admin (8) | Mar 17, 2020 | May 31, 2029 |
