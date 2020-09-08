# Introduction

[[toc]]

### What is CloudLinux

CloudLinux is designed for shared hosting providers. It isolates each customer into a separate “Lightweight Virtualized Environment” (LVE), which allocates and limits server resources, like memory, CPU and the number of simultaneous connections, for each web hosting tenant. This ensures that tenants cannot jeopardize the stability of your servers, causing all sites to slow down or even come to a halt. CloudLinux OS also “cages” tenants from one another to avoid security breaches. This way, unstable scripts or malware are not able to sprawl across your customer sites, causing severe harm.

### CloudLinux life cycle

CloudLinux supports the same life cycle policy as RHEL. Using a supported operating system is critical to maintaining a stable server environment.

Currently, the following version are supported:

| |  | |
|-|--|-|
|Operating System | Release Date| End of Life and Support|
|CloudLinux 8 | Mar 17, 2020 | May 31, 2029 |
|CloudLinux 7 | Apr 1, 2015 | Jun 30, 2024 |
|CloudLinux 6 | Feb 1, 2011 | Nov 30, 2020 ([Extended Support until June 30, 2024](https://www.cloudlinux.com/extended-support-cloudlinux-os-6)) |

### Description of CloudLinux components

* **LVE Manager**

  LVE is a Lightweight Virtualized Environment.
  LVE Manager allows you to maintain fine-tuned control over your resources, including CPU, IO rate, memory, inodes, numbers of processes, and concurrent connections, that any single account can use. Now you can limit resource abuse, while allowing good customers to use what they need.

  [See more](/lve_manager/).
* **CageFS**

    CageFS is a virtualized, per-user file system that uniquely encapsulates each customer, preventing users from seeing each other and viewing sensitive information. CageFS prevents a large number of attacks, including most privilege escalation and information disclosure attacks. It is completely transparent to your customers, without any need for them to change their scripts.

    [See more](/cloudlinux_os_components/#cagefs).
* **MySQL Governor**

    MySQL Governor tracks CPU and disk IO usage for every user in real time and throttles MySQL queries by using LVE limits. By using the [dbtop](/command-line_tools/#dbtop) utility, it is possible to see the database usage on a per-customer basis, ensuring that the system admin always know what is going on.

    [See more](/cloudlinux_os_components/#mysql-governor).
* **PHP Selector**

    PHP Selector allows end users to select the specific version of PHP they need. It allows ultimate flexibility by offering all popular versions of PHP, with more than 120 PHP extensions to choose from.

    [See more](/cloudlinux_os_components/#php-selector).
* **Ruby Selector**

    Ruby Selector allows end users to choose the Ruby version for applications and install additional modules to the application environment. Ruby Selector uses `mod_passenger` for delivering optimum performance.

    [See more](/cloudlinux_os_components/#ruby-selector).
* **Python Selector**

    Python Selector allows end users to choose the Python version for applications and install additional modules. Python Selector uses `mod_passenger` to get the best performance from Python applications.

    [See more](/cloudlinux_os_components/#python-selector).
* <span class="notranslate"> **Node.js Selector** </span>

    Node.js Selector is a CloudLinux component that allows each user to easily create Node.js applications, choose Node.js version and other parameters for applications based on their needs.

    [See more](/cloudlinux_os_components/#node-js-selector).
* **Apache mod_lsapi PRO**

    Mod_lsapi PRO is the fastest PHP handler for Apache. It is a drop-in replacement for SuPHP, FCGID, RUID2, and ITK. It has a low memory footprint and understands `.htaccess` PHP directives.

    [See more](/cloudlinux_os_components/#apache-mod-lsapi-pro).
* **Reseller limits**

    Reseller limits is a feature that allows hosters to set limits for the resources each Reseller can operate with. Server admin also provides controls on what resources each end user will have. Reseller limits set by a hoster limit the total amount of resources resellers’ end users can consume altogether.

    When a hoster has set reseller limits for the particular reseller he provides the reseller with an ability to set limits for his end users within the Reseller Interface.

    [See more](/cloudlinux_os_components/#reseller-limits).
* <span class="notranslate"> **LVE-stats 2** </span>

    <span class="notranslate"> LVE-stats 2 </span> collects LVE usage statistics (CPU, memory, disk space usage) and allows to collect the usage data.

    [See more](/cloudlinux_os_components/#lve-stats-2).

