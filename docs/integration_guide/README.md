# Integration Guide


Here you will find the instructions and common techniques used to integrate your software with CloudLinux.

[Detecting and Working with CloudLinux](/integration_guide/#detecting-and-working-with-cloudlinux) .

[Displaying ](/integration_guide/#displaying-cpu-memory-io-limits) [ limits.](/integration_guide/#displaying-cpu-memory-io-limits)

[Integrating LVE Limits with Packages.](/integration_guide/#integrating-lve-limits-with-packages)




## Detecting and Working with CloudLinux


Detecting if system is running CloudLinux/CloudLinux kernel:



```
$ uname -r|grep lve 
```

If you get an output, it means the system is running CloudLinux kernel. CloudLinux kernels have lve in its name, like:

Alternatively you can check for the presence of file.

Check if CageFS is enabled (as ):


```
$ /usr/sbin/cagefsctl --cagefs-status
```

Check if CageFS is enabled for a particular user (as ):


```
$ /usr/sbin/cagefsctl --user-status _USER_NAME_
```

Check if you are inside CageFS:

Check for the presence of file - if present, it means that you are inside CageFS.



## Displaying CPU, Memory & IO limits


Most control panels choose to display CloudLinux usage & limits to end customers. To simplify that, we lve-stats exports a file that can be easily read and processed by a control panel to display the necessary information.

The information is located in the file. This information is updated every 5 minutes, and contains default limits (first line), as well as usage and limits for all customers. If a customer is not present in the file, it means that customer is not active (no scripts were executed recently for the customer), and a customer has default limits (so you can display no usage, and default limits in the control panel for that customer.

The data is stored in a form of one line per customer, with coma separated values.

| | |
|-|-|
|0 | user id|
|1 | |
|2 | limit|
|3 | |
|4 | limit|
|5 | |
|6 | Limit|
|7 | Number of faults|
|8 | Number of faults|
|9 | Limit|
|10 | |
|11 | Number of faults|
|12 | limit|
|13 | |
|14 | fault|
|15 | Reserved|
|16 | Usage|
|17 | Limit|

With LVE version 4 (CloudLinux lve0.x) only the first 9 parameters are available. You can check the the version by reading the first byte of

On the version 6 all 15 parameters should be available.

There is only 2 LVE versions currently used in production. Future versions might add more fields, but will not alter order of existing fields.

Memory is defined in 4KB pages (so, 1024 would mean 1024 4KB pages, or 4MB).

is defined as KB/s.

is defined as % of total number of cores on a server.


## Integrating LVE Limits with Packages


**[lve-utils 1.4+]**

CloudLinux can automatically detect the most popular control panels, like cPanel - and allows to set different limits for users in different packages. It simplifies management as you don't have to choose between one limit that fits all your customers on the server, or individual limits for the customers.

If you have a custom made control panel, with your own 'package' implementation, you can still use CloudLinux framework to manage limits for your packages.

To do that, you would need:

Implement script that would map users <-> packages.

Configure lvectl to use your script.


 A script can be written in any language, and it has to be executable.

It should accept the following arguments:



Output should look like a list of space separate pairs of user Linux IDs and package names.


```
100 package1
101 package1
102 package2
103 package3
```




Output should contain package name, like:


```
package1
```




Output should look like a list of user Linux IDs.


```
100
101
```




Output contains a list of names of packages, like:


```
package1
package2
package3
```




Edit file.

Edit or modify parameter , and set it to point to your script, like:



For the script example please check the following article: [http://kb.cloudlinux.com/2015/02/integrating-lve-limits-with-packages-for-unsupported-control-panel/](http://kb.cloudlinux.com/2015/02/integrating-lve-limits-with-packages-for-unsupported-control-panel/)



