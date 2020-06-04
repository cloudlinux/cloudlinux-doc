# Introduction

* [What is CloudLinux OS](/introduction/#what-is-cloudlinux-os)
* [Description of the CloudLinux OS components](/introduction/#description-of-the-cloudlinux-os-components)
* [CloudLinux OS lifecycle](/introduction/#cloudlinux-os-lifecycle)

## What is CloudLinux OS

CloudLinux OS is designed for shared hosting providers. It isolates each customer into a separate “Lightweight Virtualized Environment” (LVE), which partitions, allocates, and limits server resources, like memory, CPU, and connections, for each tenant. This ensures that tenants cannot jeopardize the stability of your servers, causing all sites to slow down or even come to a halt. CloudLinux OS also “cages” tenants from one another to avoid security breaches. This way, unstable scripts or malware are not able to sprawl across your customer sites, causing severe harm.

## Description of the CloudLinux OS components

* **LVE Manager**

  LVE is the Lightweight Virtual Environment.
  LVE Manager allows you to maintain fine-tuned control over your resources, including CPU, IO, memory, inodes, numbers of processes, and concurrent connections, that any single account can use. It is lightweight and transparent. Now you can limit abusers while allowing good customers to use what they need.

  [See more](/lve_manager/).
* **CageFS**

    CageFS is a virtualized, per-user file system that uniquely encapsulates each customer, preventing users from seeing each other and viewing sensitive information. CageFS prevents a large number of attacks, including most privilege escalation and information disclosure attacks. It is completely transparent to your customers, without any need for them to change their scripts.

    [See more](/cloudlinux_os_components/#cagefs).
* **MySQL Governor**

    MySQL Governor tracks CPU and disk IO usage for every user in real time and throttles MySQL queries by using same-per-user LVE limits. By using the [dbtop utility](/command-line_tools/#dbtop), it is possible to see usage as it happens on a per-customer basis, ensuring that system admins always know what is going on.

    [See more](/cloudlinux_os_components/#mysql-governor).
* **PHP Selector**

    The PHP Selector allows end users to select the specific version of PHP they need. It allows ultimate flexibility by offering all popular versions of PHP, with more than 120 PHP extensions to choose from.

    [See more](/cloudlinux_os_components/#php-selector).
* **Ruby Selector**

    The Ruby Selector allows end users to choose the Ruby version for applications and install additional modules (gems) to the application environment. Ruby Selector uses `mod_passenger` for optimum performance.

    [See more](/cloudlinux_os_components/#ruby-selector).
* **Python Selector**

    The Python Selector allows end users to choose the Python version as an application and install additional modules. Python Selector uses `mod_passenger` to get the best performance from Python applications.

    [See more](/cloudlinux_os_components/#python-selector).
* **Node.js Selector**

    Node.js Selector is a CloudLinux component that allows each user to easily create Node.js applications, choose Node.js version and other parameters for applications based on their needs.

    [See more](/cloudlinux_os_components/#node-js-selector).
* **Apache mod_lsapi PRO**

    Mod_lsapi PRO is the fastest and most reliable way to serve PHP pages. It is a drop-in replacement for SuPHP, FCGID, RUID2, and ITK. It has a low memory footprint and understands PHP directives from `.htaccess` files.

    [See more](/cloudlinux_os_components/#apache-mod-lsapi-pro).
* **Reseller limits**


    Reseller limits is a feature that allows hosters to set limits for the resources each reseller can operate with. Hoster also provides controls to the reseller on what resources each reseller’s end user will have. Reseller limits set by a hoster limit the total amount of resources resellers’ end users can consume altogether.

    When a hoster has set reseller limits for the particular reseller he provides the reseller with an ability to set limits for his end users within the Reseller Interface.

    [See more](/cloudlinux_os_components/#reseller-limits).
* **LVE-stats 2**

    LVE-stats 2 collects LVE usage statistics (CPU, memory, disk space usage) and allows to query the data.

    [See more](/cloudlinux_os_components/#lve-stats-2).

## CloudLinux OS lifecycle

CloudLinux supports the same end-of-life policy as RHEL. Using a supported operating system is critical to maintaining a stable server environment.

Currently supported:

| |  | |
|-|--|-|
|Operating System | Released | End of Life & Support|
|CloudLinux 8 | Mar 17, 2020 | May 31, 2029|
|CloudLinux 7 | Apr 1, 2015 | Jun 30, 2024|
|CloudLinux 6 | Feb 1, 2011 | Nov 30, 2020 ([Extended Support - June 30, 2024](https://www.cloudlinux.com/extended-support-cloudlinux-os-6))|

<Disqus/>