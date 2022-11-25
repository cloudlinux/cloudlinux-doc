# CloudLinux OS Admin

[[toc]]

## Description

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

:::tip Note
The CloudLinux OS Admin plan does not include the NodeJS, Python and Ruby selectors as well as the MySQL Governor.
:::


## Installation

CloudLinux OS Admin installation process is the same as for CloudLinux Shared, 
please forward to [installation guide](/cloudlinux_installation) for the detailed instructions.

:::tip Note
The CloudLinux OS Admin can be installed and compatible only with AlmaLinux OS 8
:::

## Components

CloudLinux OS Admin is very close to the regular CloudLinux Shared edition, which means that 
99% of components described in this documentations are available for CloudLinux OS Admin.

The exclusions are:

 - [MySQL Governor](/control_panel_integration/#mysql-governor) is not available 
 - NodeJS, Python and Ruby selectors aren't available, however, [PHP Selector](/cloudlinux_os_components/#php-selector) is available
 - [X-Ray](./cloudlinux-os-plus/#x-ray) is available like with CloudLinux Shared Pro
 - [Accelerate WP](./cloudlinux-os-plus/#acceleratewp) is available like with CloudLinux Shared Pro

The rest of the components are similar with CloudLinux OS Shared.


## FAQ

Q: Is it possible to convert my existing CloudLinux OS Shared server into CloudLinux OS Admin?<br>
A: No, only fresh installation is possible.

Q: Is Centralized Monitoring supported on CloudLinux OS Admin?<br>
A: No, Centralized Monitoring only works with CloudLinux OS Shared Pro license.
