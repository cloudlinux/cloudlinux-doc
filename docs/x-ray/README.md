# X-Ray (BETA)

* [Description](/x-ray/#description)
* [Installation](/x-ray/#installation)
* [How to manage X-Ray](/x-ray/#how-to-manage-x-ray)
* [X-Ray client](/x-ray/#x-ray-client)
* [X-Ray service](/x-ray/#x-ray-agent)
* [FAQ](/x-ray/#faq)

:::warning Note
Please note that <span class="notranslate">X-Ray</span> is a new experimental tool. It is in beta testing now. If you’d like to be a beta tester, please fill out [this form](https://cln.cloudlinux.com/console/dashboard/products). You will be able to use the X-Ray tool after receiving the CLN manager approval.
:::

:::warning Warning!
X-Ray is available only for CloudLinux OS licenses purchased directly, NOT VIA RESELLERS.
:::

:::warning Warning!
X-Ray is available for cPanel, Plesk, and DirectAdmin.
* X-Ray for non-panel installations is not planned.
:::

## Description

<span class="notranslate">X-Ray</span> is a tool developed for website performance monitoring and performance issues detection.

<span class="notranslate">X-Ray</span> can gather and visualize information about top N slowest system functions, external requests, software modules and database queries of the client’s website.

First release of <span class="notranslate">X-Ray</span> is offered for cPanel administrators and support to find the cause of website performance issues.

<span class="notranslate">X-Ray</span> can monitor websites that were developed on cPanel hosts and use PHP (see [PHP version list](/x-ray/#list-of-supported-php-versions)) or WordPress.

## Installation

1. Make sure you have installed **LVE Manager version 6.2 or later**. You can install it with the following command:
   
   <div class="notranslate">

    ```
    # yum install lvemanager --enablerepo=cloudlinux-updates-testing
    ```
    </div>

2. Run the following command:

   <div class="notranslate">

    ```
    # rhn_check
    ```
    </div>

    If the `rhn_check` command is not found, run the following command:

    <div class="notranslate">

    ```
    # yum install rhn-check rhn-setup --enablerepo=cloudlinux-updates-testing
    ```
    </div>

3. Then install the <span class="notranslate">`alt-php-xray`</span> package

    * Via user interface
        * Go to the <span class="notranslate">_X-Ray_</span> tab.
        * Click <span class="notranslate">_Install_</span> to start installation.

        ![](/images/XRayUI.png)

    * Via SSH by running the following command:
  
    <div class="notranslate">

    ```
    # yum install lvemanager alt-php-xray --enablerepo=cloudlinux-updates-testing
    ```
    </div>

4. After installation, use the <span class="notranslate">_Start tracing_</span> button to create your first tracing task for a slow site.

![](/images/XRayStartTracing.png)

## How to manage X-Ray 

### Create a new tracing task

1. Go to the <span class="notranslate">_X-Ray_</span> tab
2. Click the <span class="notranslate">_Start tracing_</span> button to create a new task
3. In the opened popup specify a website URL to trace
4. Click the <span class="notranslate">_Run_</span> button
5. Tracing will run in the default mode. In the default mode <span class="notranslate">X-Ray</span> traces the first 20 requests for a specified URL

![](/images/XRayTracingTask.png)

* **URL** should be a valid URL of the domain which exists on the current hosting server. The URL field supports wildcard matching. To learn more about wildcard matching, click _How to use special characters_.
* **Advanced settings** allow you to set an IP address and tracing options: by time or by number of queries.

    ![](/images/XRayAdvanced.png)

#### Advanced settings

* <span class="notranslate">**Client’s IP**</span>: it is an IPv4 address of a machine to trace. For example, if you have a production website that processes requests from different IP addresses and you do not want to add these requests to the tracing task. So, you can set a specific IP address and <span class="notranslate">X-Ray</span> will analyze requests only from this specific IP address.
Record for
* <span class="notranslate">**Time period**</span>: how much time <span class="notranslate">X-Ray</span> collect the requests (2 days max)
* <span class="notranslate">**Requests**</span>: the amount of requests that <span class="notranslate">X-Ray</span> will collect

After creating, the task appears in the list of tracing tasks.

![](/images/XRayTrcingTaskList.png)

### View tracing tasks list

![](/images/XRayTrcingTaskList1.png)

#### Tracing status

A tracing task can have the following statuses:

* <span class="notranslate">**Running**</span> – tracing is in progress
* <span class="notranslate">**Stopped**</span> – tracing was stopped by administrator
* <span class="notranslate">**On hold**</span> – the same URL already exists in the lists. Task processing will not start automatically. Administrator should start it manually.
* <span class="notranslate">**Completed**</span> – period of time is finished or number of requests is reached.

### Stop tracing task

Click ![](/images/XRayStop.png) to stop the tracing task.

![](/images/XRayStopped.png)

The tracing task status will be changed to <span class="notranslate">**Stopped**</span>. Data will not be collected anymore but you can see already collected information or continue tracing later by clicking ![](/images/XRayStart.png).

### Delete tracing task 

Click ![](/images/XRayDelete.png) to delete the tracing task.

:::warning Warning!
When you have deleted a tracing task, all collected data will be unavailable.
:::

### View collected requests for tracing task

:::warning Warning!
Collected requests are available in the UI for two weeks.
:::

Click ![](/images/XRayView.png) to open a list of collected requests.

#### Tracing tasks

![](/images/XRayCollectedRequests.png)

The slowest request is highlighted.

![](/images/XRaySlowestRequest.png)

* <span class="notranslate">**Collected requests**</span> displays how many requests were collected according to tasks requirements.
* <span class="notranslate">**Pending requests**</span> displays how many of collected requests are not visible in the table yet.

<span class="notranslate">X-Ray</span> collects the following data for each request:

* **Top issues** – the slowest items of a request
* **Software modules/plugins** by execution time (only for WordPress plugins)
* **Database queries** by execution time 
* **External requests** by execution time
* **Other system functions** by execution time 

#### Software modules/plugins

![](/images/XRaySoftwareModulesPlugins.png)

The <span class="notranslate">_Software modules/plugins_</span> section displays the following data:

* **Software type** – a type a module/plugin. For now, <span class="notranslate">X-Ray</span> can analyze only WordPress software
* **Software module** – a name of the WordPress plugin
* **Duration** – plugin execution time
* **Duration (%)** – plugin execution time as a percentage of the total duration of the request

#### Database queries

![](/images/XRayDatabaseQueries.png)

The <span class="notranslate">_Database queries_</span> section displays the following data:

* **Query** – the executed SQL-query
* **File** – the file and the line of the executed query and backtrace
* **Software module** – a WordPress plugin name from which the request was completed. If the request does not belong to any of the WordPress plugin, the name of the function that executed the given request is displayed
* **Calls** – the number of identical SQL queries
* **Duration** – execution time as a percentage of the total duration of a request and the function processing time (in brackets)
 
#### External requests

![](/images/XRayExternalRequests.png)

The <span class="notranslate">_External requests_</span> section displays the following data:

* **URL** – the URL of the executed request
* **File** – the file and the line of the executed request and backtrace
* **Duration** – execution time as a percentage of the total duration of a request and the function processing time (in brackets)
 
#### System functions

![](/images/XRaySystemFunctions.png)

The <span class="notranslate">_System functions_</span> section displays the following data:

* **Function** – the executed function
* **File** – the file and the line of the executed request
* **Duration** – execution time as a percentage of the total duration of a request and the function processing time (in brackets)

## X-Ray client

<span class="notranslate">X-Ray</span> client is a PHP extension named <span class="notranslate">`xray.so`</span>. It analyzes the processing time of the entire request and its parts and then sends the data to the <span class="notranslate">X-Ray</span> agent.

### List of supported PHP versions

The list of currently supported PHP versions:

| | | |
|-|-|-|
|**ALT PHP**:|**EA PHP**:|**Plesk PHP**|
| <ul><li>alt-php54</li><li>alt-php55</li><li>alt-php56</li><li>alt-php70</li><li>alt-php71</li><li>alt-php72</li><li>alt-php73</li><li>alt-php74</li></ul>|<ul><li>ea-php54</li><li>ea-php55</li><li>ea-php56</li><li>ea-php70</li><li>ea-php71</li><li>ea-php72</li><li>ea-php73</li><li>ea-php74</li></ul>|<ul><li>php54</li><li>php55</li><li>php56</li><li>php70</li><li>php71</li><li>php72</li><li>php73</li><li>php74</li></ul>|

### Functions that X-Ray client can hook

#### Database queries

* Functions from [MySQL](https://www.php.net/manual/ru/book.mysql.php) extension:
    * `mysql_query`
    * `mysql_db_query`
    * `mysql_unbuffered_query`
* Functions from [MySQLi](https://www.php.net/manual/ru/book.mysqli.php) extension:
    * `mysqli_query`
    * `mysqli::query`
    * `mysqli_multi_query`
    * `mysqli::multi_query`
    * `mysqli_real_query`
    * `mysqli::real_query`
* Functions from [PDO](https://www.php.net/manual/ru/book.pdo.php) extension:
    * `PDO::exec`
    * `PDO::query`
    * `PDOStatement::execute`

#### External requests

* Function [curl_exec](https://www.php.net/manual/ru/function.exec)

#### System PHP functions

It may be any PHP system function which can be related to a PHP engine or other PHP extension, for example `fopen()` or `json_encode()`. A list of these functions can be found [here](https://www.php.net/manual/en/indexes.functions.php).

### Configuration Options

#### xray.enabled

**Syntax**: `xray.enabled=On/Off`

**Default**: On

**Changeable**: PHP_INI_SYSTEM

**Description**: Enable or disable <span class="notranslate">X-Ray</span> extension from php.ini

-----

#### xray.database_queries

**Syntax**: `xray.database_queries=[number]`

**Default**: 20

**Changeable**: PHP_INI_SYSTEM 

**Description**: The number of the slowest SQL queries which will be sent to the <span class="notranslate">X-Ray</span> agent. The min value is 0 and the max value is 100. If the variable value is more, the default value will be used.

-----

#### xray.external_requests

**Syntax**: `xray.external_requests=[number]`

**Default**: 20

**Changeable**: PHP_INI_SYSTEM  

**Description**: The number of the slowest external requests (the curl_exec function) which will be sent to the <span class="notranslate">X-Ray</span> agent. The min value is 0 and the max value is 100. If the variable value is more, the default value will be used.

-----

#### xray.system_functions

**Syntax**: `xray.system_functions=[number]`

**Default**: 20

**Changeable**: PHP_INI_SYSTEM  

**Description**: The number of the slowest system functions which will be sent to the <span class="notranslate">X-Ray</span> agent. 
The min value is 0 and the max value is 100. If the variable value is more, the default value will be used.

-----

#### xray.backtrace_depth

**Syntax**: `xray.backtrace_depth=[number]`

**Default**: 10

**Changeable**: PHP_INI_SYSTEM  

**Description**: The backtrace depth to the main() function which will be sent to the <span class="notranslate">X-Ray</span> agent. The min value is 0 and the max value is 20. If the variable value is more, the default value will be used.

-----

#### xray.processor

**Syntax**: `xray.processor=[processor_name]`

**Default**: xray

**Changeable**:  PHP_INI_SYSTEM 

**Description**: Tells the <span class="notranslate">X-Ray</span> client which processor to use. The new processors may be added in the future. The default processor is xray which means to send data to the <span class="notranslate">X-Ray</span> agent.

-----

#### xray.tasks

**Syntax**: `xray.tasks=host:uri:ip:id`

**Default**: no value

**Changeable**:  PHP_INI_SYSTEM 

**Description**: The current tracing tasks for the given PHP request. This directive is added automatically by the <span class="notranslate">X-Ray</span> manager when creating a task. It is not allowed to edit manually, as <span class="notranslate">X-Ray</span> may stop working.

-----

#### xray.to_file

**Syntax**: `xray.to_file=On/Off`

**Default**: Off

**Changeable**:  PHP_INI_SYSTEM 

**Description**: Only for debug purposes. Writes to a file data which is sent to the processor.

-----

#### xray.debug

**Syntax**: `xray.debug=On/Off`

**Default**: Off

**Changeable**: PHP_INI_SYSTEM 

**Description**: Only for debug purposes. Enables debug output during request processing. In the On mode can slow down the domain.

-----

#### xray.debug_file

**Syntax**: `xray.debug_file=[path_to_file]`

**Default**: `/tmp/xray-debug.log`

**Changeable**: PHP_INI_SYSTEM 

**Description**: Only for debug purposes. Specifies a file for logging debug information.

## X-Ray agent 
This is a service that receives data from the <span class="notranslate">X-Ray</span> client and sends it to the remote storage.

### Managing X-Ray service

The <span class="notranslate">X-Ray</span> agent is managed by the <span class="notranslate">`service`</span> utility.

* To start the <span class="notranslate">X-Ray</span> agent, run the following command:

    <div class="notranslate">

    ```
    # service xray-agent start
    ```
    </div>

* To stop the <span class="notranslate">X-Ray</span> agent, run the following command:

    <div class="notranslate">

    ```
    # service xray-agent stop
    ```
    </div>

* To restart the <span class="notranslate">X-Ray</span> agent, run the following command:

    <div class="notranslate">

    ```
    # service xray-agent restart
    ```
    </div>

## FAQ

### Does X-Ray affect website performance?

<span class="notranslate">X-Ray</span> affects website performance. Our tests show 5-10 % overhead from a website loading time with <span class="notranslate">X-Ray</span> tracing enabled.
<span class="notranslate">X-Ray</span> allows you to find website performance issues and should not be enabled permanently. If your website is very slow, you can enable <span class="notranslate">X-Ray</span> to find the cause and then disable it.

### What should I do if I see the warning "Task is duplicated by URL"?

This warning means that you already have a task to trace this URL in the list of your tracing tasks. If you see this warning, a new task can be created only with the <span class="notranslate">_On hold_</span> status and you will be able to run it only when the previous task with the same URL will be completed.

Note that the URL field supports wildcard matching and you can have a case when <span class="notranslate">X-Ray</span> is tracing the `URL=domain.com/*` and you are trying to create a new task with `URL=domain.com/xray.php`. In this case, you will see that warning because the `*` URLs array includes `xray.php`.

###  I started a tracing task and made requests to URL but did not see any results in the UI. What should I do?

1. Check that <span class="notranslate">**xray**</span> extension is enabled for the domain. To do so, go to the `phpinfo()` page and make a request. In the phpinfo output try to find the following section:
   
    ![](/images/XRayPHPInfo.png)

If you cannot see that section, try to restart PHP processes for that user (the simplest way is to restart Apache) and check that you can see the <span class="notranslate">**xray**</span> extension.


2. If you can see the <span class="notranslate">**xray**</span> extension in the phpinfo, check that <span class="notranslate">X-Ray</span> agent service is running with the service xray-agent status command. If it is not running, start it with the <span class="notranslate">`service xray-agent start`</span> command.
3. <span class="notranslate">X-Ray</span> may not send data if a site uses a caching plugin, as the caching plugin is outputting HTML, thus there are no PHP scripts to examine. We encountered such issues with sites that use <span class="notranslate">LSCache</span> and <span class="notranslate">WP Super Cache</span> plugins. Check that your site does not use caching plugins. If so, disable it while tracing a site to get information from <span class="notranslate">X-Ray</span>.
4. If you set a client’s IP when creating the tracing task, check that your requests come to the server with this IP via phpinfo (since there may be NAT between your local machine and the server).
   
    ![](/images/XRayPHPInfoRemoteAddr.png)

5. If, after checking the previous items, the issue persists, [contact our support team](https://cloudlinux.zendesk.com/hc/en-us/requests/new).

### What to do if X-Ray is not found in the phpinfo() page?

If you managed to create a tracing task, this means that the <span class="notranslate">`xray.ini`</span> file was created in a system. Therefore, there may be two reasons why it did not appear in the phpinfo page of the domain.

1. PHP process wasn't reloaded after adding the xray.ini. To solve this, you should restart the Apache or fpm service for the domain on which the tracing was started. At the moment, this is done automatically by the <span class="notranslate">X-Ray</span> manager after creating the task.
2. Your domain uses a PHP version different from the one which was detected by the <span class="notranslate">X-Ray</span> manager. To solve this, check the scan dir for additional ini files for your domain.

    ![](/images/XRayScanDir.png)

    Then check the `ini_location` that was passed to the <span class="notranslate">X-Ray</span> manager by running the following command:

    <div class="notranslate">

    ```
    # cat /usr/share/alt-php-xray/manager.log | grep ini_location
    ```
    </div>

    Find your tracing task in the output and check that the <span class="notranslate">`xray.ini`</span> exists in this directory, also check that the `ini` path is the same in the phpinfo page output and in the <span class="notranslate">`ini_location`</span> directive for your tracing task. If they are the same, you should reload your PHP. If they are different that means that the <span class="notranslate">X-Ray</span> manager could not correctly determine the PHP version your domain uses. In this case, contact our support team at [https://cloudlinux.zendesk.com/hc/requests/new](https://cloudlinux.zendesk.com/hc/requests/new).


### I use LiteSpeed, X-Ray is enabled and it is shown in the phpinfo() page but does not collect data when sending requests to a site. What to do?

Check for the <span class="notranslate">`CacheLookup on`</span> option in the `htaccess` file for your domain.
If the option is there, LiteSpeed processes requests bypassing the PHP X-Ray extension.
In this case, to get tracing information, you should remove the <span class="notranslate">`CacheLookup on`</span> option.

### What is the proper format for the URL?

All of the examples below are correct:

* `http://domain.com`
* `http://domain.com/`
* `https://domain.com`
* `https://domain.com/`

You can use any of them with a prefix `www.` and it is also correct.


<Disqus/>


