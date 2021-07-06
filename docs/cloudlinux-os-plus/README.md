# CloudLinux OS+

* [X-Ray](/cloudlinux-os-plus/#x-ray)
  * [Description](/cloudlinux-os-plus/#description)
  * [Installation](/cloudlinux-os-plus/#installation)
  * [How to manage <span class="notranslate">X-Ray</span>](/cloudlinux-os-plus/#how-to-manage-x-ray)
  * [Managing tracing task](/cloudlinux-os-plus/#managing-tracing-task)
  * [Managing continuous tasks](/cloudlinux-os-plus/#managing-continuous-tasks)
  * [End-user X-Ray plugin](/cloudlinux-os-plus/#end-user-x-ray-plugin)
  * [X-Ray automated throttling detection](/cloudlinux-os-plus/#x-ray-automated-throttling-detection)
  * [<span class="notranslate">X-Ray</span> client](/cloudlinux-os-plus/#x-ray-client)
  * [<span class="notranslate">X-Ray</span> service](/cloudlinux-os-plus/#x-ray-agent)
  * [FAQ](/cloudlinux-os-plus/#faq)
* [Centralized Monitoring](/cloudlinux-os-plus/#centralized-monitoring)
  * [Description](/cloudlinux-os-plus/#description-2)
  * [Installation](/cloudlinux-os-plus/#installation-2)
  * [Centralized Monitoring: mode without session expired](/cloudlinux-os-plus/#centralized-monitoring-mode-without-session-expired)
  * [Centralized Monitoring user interface](/cloudlinux-os-plus/#centralized-monitoring-user-interface)
  * [Alert Manager](/cloudlinux-os-plus/#alert-manager)
  * [FAQ](/cloudlinux-os-plus/#faq-2)
  * [Troubleshooting](/cloudlinux-os-plus/#troubleshooting)

## X-Ray

* [Description](/cloudlinux-os-plus/#description)
* [Installation](/cloudlinux-os-plus/#installation)
* [How to manage <span class="notranslate">X-Ray</span>](/cloudlinux-os-plus/#how-to-manage-x-ray)
* [<span class="notranslate">X-Ray</span> client](/cloudlinux-os-plus/#x-ray-client)
* [<span class="notranslate">X-Ray</span> service](/cloudlinux-os-plus/#x-ray-agent)
* [FAQ](/cloudlinux-os-plus/#faq)

### Description

:::warning Warning!
<span class="notranslate">X-Ray</span> is available out of the box for cPanel, Plesk, and DirectAdmin. For other control panels you should implement integration as described [here](/control_panel_integration/#how-to-integrate-x-ray-with-a-control-panel)
:::

<span class="notranslate">X-Ray</span> is a tool developed for website performance monitoring and performance issues detection.

<span class="notranslate">X-Ray</span> can gather and visualize information about top N slowest system functions, external requests, software modules and database queries of the client’s website.

### Installation

1. Make sure you have CloudLinux OS+ subscription (only non-reseller accounts apply)

2. Make sure you have installed **LVE Manager version 6.2 or later**. You can install or update it with the following commands:
   * installation

   <div class="notranslate">

    ```
    # yum install lvemanager
    ```
    </div>

    * update
   
   <div class="notranslate">

    ```
    # yum update lvemanager
    ```
    </div>
3. X-Ray will be activated on all your servers during 4 hours. You will see the X-Ray tab in the LVE Manager UI.

4. For instant activation, run the following command:

   <div class="notranslate">

    ```
    # rhn_check
    ```
    </div>

    If the `rhn_check` command is not found, run the following command:

    <div class="notranslate">

    ```
    # yum install rhn-check rhn-setup
    ```
    </div>

5. Then install the <span class="notranslate">`alt-php-xray`</span> package

    * Via user interface
        * Go to the <span class="notranslate">_X-Ray_</span> tab.
        * Click <span class="notranslate">_Install_</span> to start installation.

        ![](/images/XRayUI.png)

    * Via SSH by running the following command:
  
    <div class="notranslate">

    ```
    # yum install lvemanager alt-php-xray
    ```
    </div>

6. After installation, use the <span class="notranslate">_Start tracing_</span> button to create your first tracing task for a slow site.

![](/images/XRayStartTracing.png)

### How to manage X-Ray

X-Ray provides two options for monitoring domain requests speed: Tracing task and Continuous task.

:::warning Warning
To use Continuous task, update your LVE Manager and alt-PHP-X-Ray packages to versions lvemanager-6.2.9-1 and alt-php-xray-0.2-1 by running the following command:
```
yum update lvemanager alt-php-xray
```
::: 

* **Tracing task** is a task created manually for a specific URL to collect server requests. The task will end either after a specified number of requests to the URL or after a specified time (maximum after two days). It is not possible here to automatically email a report but it is possible to export the report in PDF and send to a user.

* **Continuous task** is a task that initiates a daily hourly tracing requests for a specified domain and email a monitoring report. Continuous task can't stop automatically, you need to stop it manually.

In fact, continuous task allows to automatically create a tracing task for each new day, with the ability to get a report for the past day.

#### Tracing tasks tab

The *Tracing tasks* tab contains a list of all tracing tasks created both manually and automatically via continuous tasks.

![](/images/XRayTracingTaskCreated.png)

The *Created* column shows how a task was created – automatically (by continuous task) or manually.

#### Continuous tracing tab

:::warning Warning
To use Continuous task, update your LVE Manager and alt-PHP-X-Ray packages to versions lvemanager-6.2.9-1 and alt-php-xray-0.2-1 by running the following command:
```
yum update lvemanager alt-php-xray
```
::: 
  
The *Continuous tracing* tab contains a list of continuous tasks for which tracing tasks will be created automatically for a new day for a specific domain.

![](/images/XRayContinuousTasksList.png)

### Managing tracing task

#### Creating a new tracing task

1. Go to the <span class="notranslate">_X-Ray_</span> tab
2. Click the <span class="notranslate">_Start tracing_</span> button to create a new task
3. In the opened popup specify a website URL to trace
4. Click the <span class="notranslate">_Run_</span> button
5. Tracing will run in the default mode. In the default mode <span class="notranslate">X-Ray</span> traces the first 20 requests for a specified URL

![](/images/XRayTracingTask.png)

* <span class="notranslate">**URL**</span> should be a valid URL of the domain which exists on the current hosting server. The URL field supports wildcard matching. To learn more about wildcard matching, click _How to use special characters_.
* <span class="notranslate">**Advanced settings**</span> allow you to set an IP address and tracing options: by time or by number of queries.

    ![](/images/XRayAdvanced.png)

**Advanced settings**

* <span class="notranslate">**Client’s IP**</span>: it is an IPv4 address of a machine to trace. For example, if you have a production website that processes requests from different IP addresses and you do not want to add these requests to the tracing task. So, you can set a specific IP address and <span class="notranslate">X-Ray</span> will analyze requests only from this specific IP address.
Record for
* <span class="notranslate">**Time period**</span>: how much time <span class="notranslate">X-Ray</span> collect the requests (2 days max)
* <span class="notranslate">**Requests**</span>: the amount of requests that <span class="notranslate">X-Ray</span> will collect

After creating, the task appears in the list of tracing tasks.

![](/images/XRayTrcingTaskList.png)

#### Viewing tracing tasks list

![](/images/XRayTrcingTaskList1.png)

Tasks created *Manually* are simply tracing tasks.

#### Tracing status

A tracing task can have the following statuses:

* <span class="notranslate">**Running**</span> – tracing is in progress
* <span class="notranslate">**Stopped**</span> – tracing was stopped by administrator
* <span class="notranslate">**On hold**</span> – the same URL already exists in the lists. Task processing will not start automatically. Administrator should start it manually.
* <span class="notranslate">**Completed**</span> – period of time is finished or number of requests is reached.

#### Collected requests for tracing task

:::warning Warning!
Collected requests are available in the UI for two weeks.
:::

Click ![](/images/XRayView.png) to open a list of collected requests.

#### Tracing tasks

![](/images/XRayCollectedRequests.png)

The slowest request is highlighted.

![](/images/XRaySlowestRequest.png)

* <span class="notranslate">**Total**</span> displays how many requests were collected according to tasks requirements.
* <span class="notranslate">**Pending**</span> displays how many of collected requests are not visible in the table yet.
* <span class="notranslate">**Throttled**</span> displays the number of requests during the execution of which the LVE limits were exceeded.
* <span class="notranslate">**Slow**</span> displays the number of requests lasting more than one second.

There are filters for the request types and the indicator of a filter used now.

![](/images/FilterIndicator.png)

If slow requests were not detected during the tracing task, the following is displayed. Here, you can also view all requests.

![](/images/RecordedSession.png)


<span class="notranslate">X-Ray</span> collects the following data for each request:

* <span class="notranslate">**Top issues**</span> – the slowest items of a request
* <span class="notranslate">**Software modules/plugins**</span> by execution time (only for WordPress plugins)
* <span class="notranslate">**Database queries**</span> by execution time 
* <span class="notranslate">**External requests**</span> by execution time
* <span class="notranslate">**Other system functions**</span> by execution time 

#### Software modules/plugins

![](/images/XRaySoftwareModulesPlugins.png)

The <span class="notranslate">_Software modules/plugins_</span> section displays the following data:

* <span class="notranslate">**Software type**</span> – a type a module/plugin. For now, <span class="notranslate">X-Ray</span> can analyze only WordPress software
* <span class="notranslate">**Software module**</span> – a name of the WordPress plugin
* <span class="notranslate">**Duration**</span> – plugin execution time
* <span class="notranslate">**Duration (%)**</span> – plugin execution time as a percentage of the total duration of the request

#### Database queries

![](/images/XRayDatabaseQueries.png)

The <span class="notranslate">_Database queries_</span> section displays the following data:

* <span class="notranslate">**Query**</span> – the executed SQL-query
* <span class="notranslate">**File**</span> – the file and the line of the executed query and backtrace
* <span class="notranslate">**Software module**</span> – a WordPress plugin name from which the request was completed. If the request does not belong to any of the WordPress plugin, the name of the function that executed the given request is displayed
* <span class="notranslate">**Calls**</span> – the number of identical SQL queries
* <span class="notranslate">**Duration**</span> – execution time as a percentage of the total duration of a request and the function processing time (in brackets)
 
#### External requests

![](/images/XRayExternalRequests.png)

The <span class="notranslate">_External requests_</span> section displays the following data:

* <span class="notranslate">**URL**</span> – the URL of the executed request
* <span class="notranslate">**File**</span> – the file and the line of the executed request and backtrace
* <span class="notranslate">**Duration**</span> – execution time as a percentage of the total duration of a request and the function processing time (in brackets)
 
#### System functions

![](/images/XRaySystemFunctions.png)

The <span class="notranslate">_System functions_</span> section displays the following data:

* <span class="notranslate">**Function**</span> – the executed function
* <span class="notranslate">**File**</span> – the file and the line of the executed request
* <span class="notranslate">**Duration**</span> – execution time as a percentage of the total duration of a request and the function processing time (in brackets)

#### Stopping tracing task

Click ![](/images/XRayStop.png) to stop the tracing task.

![](/images/XRayStopped.png)

The tracing task status will be changed to <span class="notranslate">**Stopped**</span>. Data will not be collected anymore but you can see already collected information or continue tracing later by clicking ![](/images/XRayStart.png).

#### Deleting tracing task 

Click ![](/images/XRayDelete.png) to delete the tracing task.

:::warning Warning!
When you have deleted a tracing task, all collected data will be unavailable.
:::

### Managing continuous tasks

#### Creating a new continuous task

1. Click the *Create continuous tracing*  button 

![](/images/XRayCreateContinuousTaskBtn.png)

2. Specify URL in the *Domain* field and email in the *Email for reports* field and click the *Create* button.

![](/images/XRayCreateContinuousTaskForm.png)

3. You can see a new task in the *Continuous tracing* tab in the X-Ray UI.

![](/images/XRayContinuousTracingTab.png)

4. If you stop a continuous tracing task, a new task for the next 24 hours will not be created. The task for the current day will be finished at midnight and the report will be emailed.

5. If you delete a continuous tracing task, the task for the current day will be finished at midnight and the report will be emailed.

#### Viewing continuous tasks list

You can find a list of continuous tracing tasks in the _Continuous tracing_ tab.

![](/images/XRayContinuousTracingTasksList.png)

You can find automatically created tasks in the _Tracing tasks_ tab marked as _Automatically_ in the _Created_ column.

![](/images/XRayContinuousTracingTasksListCreated.png)

The [statuses for automatically created tasks](/cloudlinux-os-plus/#tracing-status) are the same as for tracing task.

To view detailed info about an automatically created task, click ![](/images/XRayView1.png). You will get requests grouped by hour.

![](/images/XRayContinuousTracingTasksListGrouped.png)

Click to a group to open a list of the requests.

![](/images/XRayContinuousTracingTasksRequestsList.png)

The following data is collected for each request:

* Software modules/plugins by execution time (only for WordPress plugins)
* Database queries by execution time
* External requests by execution time
* Other system functions by execution time

#### Stopping automatic tracing task

Stopping automatic tracing task (a part of continuous tracing task) affects only the automatic tracing task for the current day. A new task for the next day will be created at the end of the day.

To stop the continuous tracing task completely, see [Creating a new continuous task, paragraph 4](/cloudlinux-os-plus/#creating-a-new-continuous-task).


#### Deleting automatic tracing task

Deleting automatic tracing task (a part of continuous tracing task) affects only the automatic tracing task for the current day. A new task for the next day will be created at the end of the day.

To delete the continuous tracing task completely, see [Creating a new continuous task, paragraph 5](/cloudlinux-os-plus/#creating-a-new-continuous-task).


#### Continuous task daily report

1. Users get daily reports on their emails. An example of a report is shown below:

    ![](/images/XRayContinuousTaskDaylyReportExample.png)

2. Click the link in the email to show the detailed report:

    ![](/images/XRayContinuousTaskDaylyReportCollectedRequests.png)

3. You can view requests grouped by hour:

    ![](/images/XRayContinuousTaskDaylyReportByHourRequests.png)

4. You can also view the detailed information about request:

    ![](/images/XRayContinuousTaskDaylyReportRequestDetails.png)

### End-user X-Ray plugin

:::warning Warning
To use the end-user X-Ray plugin, update your LVE Manager and X-Ray packages to the `lvemanager-6.3.9-1` (or later) and `alt-php-xray-0.3-1` (or later) by running the following command:
```
# yum update lvemanager alt-php-xray
```
:::

#### How to enable/disable the end-user X-Ray plugin

You can hide or show the end-user X-Ray plugin icon by ticking or unticking the proper checkbox in the LVE Manager.

Go to _LVE Manager → Options Tab → User interface settings_.

![](/images/HideXRayAppCheckbox.png)

:::tip Note
The X-Ray plugin icon in the end-user interface is hidden when the checkbox is ticked.
:::

![](/images/XRayAppUIIcon.png)

#### How to manage the end-user X-Ray plugin

The web interface of the end-user X-Ray plugin is almost the same as the X-Ray administrator interface.

![](/images/XRayEndUserUI.png)

But there are some differences and they are described further.

* End-users can create tasks only for their domains from the drop-down list:
    ![](/images/XRayEndUserUIStart.png)
* To specify URL or wildcard, end-users should use the input field next to the domain:
    ![](/images/XRayEndUserUiSpecifyURL.png)

You can read about all other basic interface elements and managing tracing tasks in the [Managing tracing task section](/cloudlinux-os-plus/#managing-tracing-task).

:::warning Note
Tracing tasks created by an end-user will also be displayed in the administrator interface and administrators can manage the end-user's tasks the same way as they manage their own. At the same time, tasks created by the administrator or other end-users will not be displayed in the UI of the current user.
:::

#### End-user X-Ray plugin limitations

* The end-user X-Ray plugin does not support creating continuous tasks.
* The end-user has a limit of tracing tasks running at a time. Before starting the next task, the end-user should wait for the completion of the previous ones or forcefully stop the running ones. Otherwise, the user will get the next error:
    
    ![](/images/XRayEndUserUIError.png)
    :::warning Note
    The current limit is one tracing task per user. 
    :::
* The administrator and the end-user can’t run the tracing task for the same Domain/URL at the same time. Once, the administrator started a specific tracing task, the end-user will not be able to duplicate it. And the same is true for the administrators – they will just see the running task for the specific domain and see the notification that they're trying to create a tracing task with a duplicated URL.
* If continuous tracing is enabled for the domain, the end-user will not be able to create a new task for this domain because the same rule works - it will be a duplicate of the existing tracing tasks. The next warning will appear:
    
    ![](/images/XRayEndUserUIWarning.png)

    To solve this, the existing running tasks for the same Domain/URL should be stopped or completed. You can find more details about this in the [FAQ](/cloudlinux-os-plus/#what-should-i-do-if-i-see-the-warning-task-is-duplicated-by-url).

* If a user's tracing task was created for a domain which is using the FPM handler there's an additional limitation.  To avoid  frequent reloads of the particular FPM service, **Start tracing** ,  **Stop tracing** or  **Continue tracing** action would be blocked in case if the latest reload of a corresponding FPM service was done less than 1 minute ago.  
If a user gets such an error message - it means that  1 reload  in  1 minute for a particular FPM service has been already done.  Just try performing the same operation once again in a while.

![](/images/XRayEndUserFPMerror.png)
	
### X-Ray automated throttling detection

The X-Ray automated throttling detection system checks if the account exceeds LVE limits by CPU or by IO/IOPS during the HTTP request execution. Requests with exceeded LVE limits are indicated in both X-Ray Administrator and X-Ray User plugins.

If CPU limiting was detected for a particular request, it is indicated in the X-Ray UI that the system itself has slowed down the request processing due to CPU throttling and this is apparently not a performance issue in the PHP code.

If limiting by IO and IOPS in total was detected for a particular request, it is indicated in the X-Ray UI in the same manner, except for the cause of slowing down the request -- IO throttling.

The case of both limiting for the request is also possible.

![](/images/CPUIOLimiting.png)

Requests with exceeded LVE limits are also marked in the request detailed view.

![](/images/RequestDetails.png)

Requests with exceeded LVE limits are marked in the PDF report as well.

![](/images/XRayMonitoringReport.png)

:::warning Note
**CPU throttling detection** is available since `alt-php-xray-0.3-2` and `lvemanager-xray-0.5-2`.
**IO/IOPS throttling detection** is available since `alt-php-xray-0.3-7` and `lvemanager-xray-0.7-1`.
- `kmod-lve-2.0-23` (and later) for CloudLinux 8 or CloudLinux 7 hybrid
- `kernel-1.5-58` (and later) for CloudLinux 7 or CloudLinux 6 hybrid

are also required to utilize the feature of **IO/IOPS throttling detection**.
:::

:::warning Warning
X-Ray automated throttling detection feature is not supported for CloudLinux 6
:::


### X-Ray client

<span class="notranslate">X-Ray</span> client is a PHP extension named <span class="notranslate">`xray.so`</span>. It analyzes the processing time of the entire request and its parts and then sends the data to the <span class="notranslate">X-Ray</span> agent.

#### List of supported PHP versions

The list of currently supported PHP versions:

| | | | | |
|-|-|-|-|-|
|**ALT PHP**:|**EA PHP**:|**Plesk PHP**|**DirectAdmin PHP**|**Other panels PHP**|
| <ul><li>alt-php54</li><li>alt-php55</li><li>alt-php56</li><li>alt-php70</li><li>alt-php71</li><li>alt-php72</li><li>alt-php73</li><li>alt-php74</li></ul>|<ul><li>ea-php54</li><li>ea-php55</li><li>ea-php56</li><li>ea-php70</li><li>ea-php71</li><li>ea-php72</li><li>ea-php73</li><li>ea-php74</li></ul>|<ul><li>php54</li><li>php55</li><li>php56</li><li>php70</li><li>php71</li><li>php72</li><li>php73</li><li>php74</li></ul>|<ul><li>php54</li><li>php55</li><li>php56</li><li>php70</li><li>php71</li><li>php72</li><li>php73</li><li>php74</li></ul>|<ul><li>54</li><li>55</li><li>56</li><li>70</li><li>71</li><li>72</li><li>73</li><li>74</li></ul>|

:::warning Warning!
<span class="notranslate">[php-zts](/cloudlinux_os_components/#how-to-configure-alt-php72-zts-to-use-with-php-selector)</span> and [custom PHPs, rolled in selector](/cloudlinux_os_components/#roll-your-own-php), are not supported
:::

#### Functions that X-Ray client can hook

#### Database queries

* Functions from the [MySQL](https://www.php.net/manual/ru/book.mysql.php) extension:
    * <span class="notranslate">`mysql_query`</span>
    * <span class="notranslate">`mysql_db_query`</span>
    * <span class="notranslate">`mysql_unbuffered_query`</span>
* Functions from the [MySQLi](https://www.php.net/manual/ru/book.mysqli.php) extension:
    * <span class="notranslate">`mysqli_query`</span>
    * <span class="notranslate">`mysqli::query`</span>
    * <span class="notranslate">`mysqli_multi_query`</span>
    * <span class="notranslate">`mysqli::multi_query`</span>
    * <span class="notranslate">`mysqli_real_query`</span>
    * <span class="notranslate">`mysqli::real_query`</span>
* Functions from the [PDO](https://www.php.net/manual/ru/book.pdo.php) extension:
    * <span class="notranslate">`PDO::exec`</span>
    * <span class="notranslate">`PDO::query`</span>
    * <span class="notranslate">`PDOStatement::execute`</span>

#### External requests

* Function [curl_exec](https://www.php.net/manual/ru/function.exec)

#### System PHP functions

It may be any PHP system function which can be related to a PHP engine or other PHP extension, for example <span class="notranslate">`fopen()`</span> or <span class="notranslate">`json_encode()`</span>. A list of these functions can be found [here](https://www.php.net/manual/en/indexes.functions.php).

#### Configuration Options

<div class="notranslate">

#### xray.enabled

</div>

**Syntax**: <span class="notranslate">`xray.enabled=On/Off`</span>

**Default**: <span class="notranslate">On</span>

**Changeable**: <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: Enable or disable <span class="notranslate">X-Ray</span> extension from php.ini

-----

<div class="notranslate">

#### xray.database_queries

</div>

**Syntax**: <span class="notranslate">`xray.database_queries=[number]`</span>

**Default**: 20

**Changeable**: <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: The number of the slowest SQL queries which will be sent to the <span class="notranslate">X-Ray</span> agent. The min value is 0 and the max value is 100. If the variable value is more, the default value will be used.

-----

<div class="notranslate">

#### xray.external_requests

</div>

**Syntax**: <span class="notranslate">`xray.external_requests=[number]`</span>

**Default**: 20

**Changeable**: <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: The number of the slowest external requests (the curl_exec function) which will be sent to the <span class="notranslate">X-Ray</span> agent. The min value is 0 and the max value is 100. If the variable value is more, the default value will be used.

-----

<div class="notranslate">

#### xray.system_functions

</div>

**Syntax**: <span class="notranslate">`xray.system_functions=[number]`</span>

**Default**: 20

**Changeable**: <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: The number of the slowest system functions which will be sent to the <span class="notranslate">X-Ray</span> agent. 
The min value is 0 and the max value is 100. If the variable value is more, the default value will be used.

-----

<div class="notranslate">

#### xray.backtrace_depth

</div>

**Syntax**: <span class="notranslate">`xray.backtrace_depth=[number]`</span>

**Default**: 10

**Changeable**: <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: The backtrace depth to the main() function which will be sent to the <span class="notranslate">X-Ray</span> agent. The min value is 0 and the max value is 20. If the variable value is more, the default value will be used.

-----

<div class="notranslate">

#### xray.processor

</div>


**Syntax**: <span class="notranslate">`xray.processor=[processor_name]`</span>

**Default**: <span class="notranslate">xray</span>

**Changeable**:  <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: Tells the <span class="notranslate">X-Ray</span> client which processor to use. The new processors may be added in the future. The default processor is xray which means to send data to the <span class="notranslate">X-Ray</span> agent.

-----

<div class="notranslate">

#### xray.tasks

</div>

**Syntax**: <span class="notranslate">`xray.tasks=host:uri:ip:id`</span>

**Default**: <span class="notranslate">no value</span>

**Changeable**:  <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: The current tracing tasks for the given PHP request. This directive is added automatically by the <span class="notranslate">X-Ray</span> manager when creating a task. It is not allowed to edit manually, as <span class="notranslate">X-Ray</span> may stop working.

-----

<div class="notranslate">

#### xray.to_file

</div>

**Syntax**: <span class="notranslate">`xray.to_file=On/Off`</span>

**Default**: <span class="notranslate">Off</span>

**Changeable**:  <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: Only for debug purposes. Writes to a file data which is sent to the processor.

-----

<div class="notranslate">

#### xray.debug

</div>

**Syntax**: <span class="notranslate">`xray.debug=On/Off`</span>

**Default**: <span class="notranslate">Off</span>

**Changeable**: <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: Only for debug purposes. Enables debug output during request processing. In the On mode can slow down the domain.

-----

<div class="notranslate">

#### xray.debug_file

</div>

**Syntax**: <span class="notranslate">`xray.debug_file=[path_to_file]`</span>

**Default**: <span class="notranslate">`/tmp/xray-debug.log`</span>

**Changeable**: <span class="notranslate">PHP_INI_SYSTEM</span>

**Description**: Only for debug purposes. Specifies a file for logging debug information.


### X-Ray agent 


This is a service that receives data from the <span class="notranslate">X-Ray</span> client and sends it to the remote storage.

#### Managing X-Ray service

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

### FAQ

#### Does X-Ray affect website performance?

<span class="notranslate">X-Ray</span> affects website performance. Our tests show 5-10 % overhead from a website loading time with <span class="notranslate">X-Ray</span> tracing enabled.
<span class="notranslate">X-Ray</span> allows you to find website performance issues and should not be enabled permanently. If your website is very slow, you can enable <span class="notranslate">X-Ray</span> to find the cause and then disable it.

#### What should I do if I see the warning "Task is duplicated by URL"?

This warning means that you already have a task to trace this URL in the list of your tracing tasks. If you see this warning, a new task can be created only with the <span class="notranslate">_On hold_</span> status and you will be able to run it only when the previous task with the same URL will be completed.

Note that the URL field supports wildcard matching and you can have a case when <span class="notranslate">X-Ray</span> is tracing the <span class="notranslate">`URL=domain.com/*`</span> and you are trying to create a new task with <span class="notranslate">`URL=domain.com/xray.php`</span>. In this case, you will see that warning because the `*` URLs array includes <span class="notranslate">`xray.php`</span>.

####  I started a tracing task and made requests to URL but did not see any results in the UI. What should I do?

1. Check that <span class="notranslate">**xray**</span> extension is enabled for the domain. To do so, go to the <span class="notranslate">`phpinfo()`</span> page and make a request. In the phpinfo output try to find the following section:
   
    ![](/images/XRayPHPInfo.png)

If you cannot see that section, try to restart PHP processes for that user (the simplest way is to restart Apache) and check that you can see the <span class="notranslate">**xray**</span> extension.


2. If you can see the <span class="notranslate">**xray**</span> extension in the phpinfo, check that <span class="notranslate">X-Ray</span> agent service is running with the service xray-agent status command. If it is not running, start it with the <span class="notranslate">`service xray-agent start`</span> command.
3. <span class="notranslate">X-Ray</span> may not send data if a site uses a caching plugin, as the caching plugin is outputting HTML, thus there are no PHP scripts to examine. We encountered such issues with sites that use <span class="notranslate">LSCache</span> and <span class="notranslate">WP Super Cache</span> plugins. Check that your site does not use caching plugins. If so, disable it while tracing a site to get information from <span class="notranslate">X-Ray</span>.
4. If you set a client’s IP when creating the tracing task, check that your requests come to the server with this IP via phpinfo (since there may be NAT between your local machine and the server).
   
    ![](/images/XRayPHPInfoRemoteAddr.png)

5. If, after checking the previous items, the issue persists, [contact our support team](https://cloudlinux.zendesk.com/hc/en-us/requests/new).

#### What to do if X-Ray is not found in the phpinfo() page?

If you managed to create a tracing task, this means that the <span class="notranslate">`xray.ini`</span> file was created in a system. Therefore, there may be two reasons why it did not appear in the phpinfo page of the domain.

1. PHP process wasn't reloaded after adding the xray.ini. To solve this, you should restart the Apache or fpm service for the domain on which the tracing was started. At the moment, this is done automatically by the <span class="notranslate">X-Ray</span> manager after creating the task.
2. Your domain uses a PHP version different from the one which was detected by the <span class="notranslate">X-Ray</span> manager. To solve this, check the scan dir for additional ini files for your domain.

    ![](/images/XRayScanDir.png)

    Then check the <span class="notranslate">`ini_location`</span> that was passed to the <span class="notranslate">X-Ray</span> manager by running the following command:

    <div class="notranslate">

    ```
    # cat /usr/share/alt-php-xray/manager.log | grep ini_location
    ```
    </div>

    Find your tracing task in the output and check that the <span class="notranslate">`xray.ini`</span> exists in this directory, also check that the `ini` path is the same in the phpinfo page output and in the <span class="notranslate">`ini_location`</span> directive for your tracing task. If they are the same, you should reload your PHP. If they are different that means that the <span class="notranslate">X-Ray</span> manager could not correctly determine the PHP version your domain uses. In this case, contact our support team at [https://cloudlinux.zendesk.com/hc/requests/new](https://cloudlinux.zendesk.com/hc/requests/new).


#### I use LiteSpeed, X-Ray is enabled and it is shown in the phpinfo() page but does not collect data when sending requests to a site. What to do?

Check for the <span class="notranslate">`CacheLookup on`</span> option in the `htaccess` file for your domain.
If the option is there, LiteSpeed processes requests bypassing the PHP X-Ray extension.
In this case, to get tracing information, you should remove the <span class="notranslate">`CacheLookup on`</span> option.

#### What is the proper format for the URL?

All of the examples below are correct:

* `http://domain.com`
* `http://domain.com/`
* `https://domain.com`
* `https://domain.com/`

You can use any of them with a prefix `www.` and it is also correct.

#### What packages are required for X-Ray?

Required packages:

* `lvemanager` >= 6.2.10-1
* `alt-php-xray` >= 0.2-1



## Centralized Monitoring


* [Description](/cloudlinux-os-plus/#description-2)
* [Installation](/cloudlinux-os-plus/#installation-2)
* [Centralized Monitoring: mode without session expired](/cloudlinux-os-plus/#centralized-monitoring-mode-without-session-expired)
* [Centralized Monitoring user interface](/cloudlinux-os-plus/#centralized-monitoring-user-interface)
* [Alert Manager](/cloudlinux-os-plus/#alert-manager)
* [FAQ](/cloudlinux-os-plus/#faq-2)
* [Troubleshooting](/cloudlinux-os-plus/#troubleshooting)

### Description

<span class="notranslate">Centralized Monitoring</span> is a tool that allows hosting administrators to monitor load for all their servers and users.

<span class="notranslate">Centralized Monitoring</span> allows you to:

* View system metrics for all clients’ end servers
* View the LVE statistics per user for all clients’ end servers

### Installation

:::tip Note
Make sure that `cm.cloudlinux.com` is available on your end server.
:::

1. Make sure you have a CloudLinux OS+ subscription.
2. Make sure you have installed the **lve-utils** package version 4.2.21-2 or later. You can install or update it with the following commands:
    * installation
    ```
    yum install lve-utils
    ```
    * update
    ```
    yum update lve-utils
    ```
3. Log in to the [https://cm.cloudlinux.com/](https://cm.cloudlinux.com/) using CLN credentials (if you are already logged in via CLN, authorization via CM is not necessary, it uses SSO).
4. Activate statistics collection on all your servers via the Centralized Monitoring UI ([https://cm.cloudlinux.com](https://cm.cloudlinux.com)) or via the CLN UI [https://cln.cloudlinux.com/console/cloudlinux/centralized-monitoring](https://cln.cloudlinux.com/console/cloudlinux/centralized-monitoring).
    ![](/images/CMInstallationProd.png)
5. Within 5 hours from the activation, statistics collection and sending to the central server will be set up automatically: all required packages and components will be installed. For new, just registered servers, statistics collection and sending will be set up automatically within 5 hours.
6. Make sure you have activated statistics collection (see paragraph 4) otherwise you will not be able to set up your servers. For instant set up of a registered server after statistics collection was enabled, run the following commands for all servers:
    ```
    # rhn_check	
    # /usr/share/cloudlinux/cl_plus/manage_clplus enable
    ```
    **Note**: If the `rhn_check` command is not found, run the following command:
    ```
    # yum install/update rhn-check rhn-setup
    ```
7. After 5 hours (or after the manual setup), check that statistics for all registered servers is collected via [https://cm.cloudlinux.com/#/servers](https://cm.cloudlinux.com/#/servers). And check that user statistics on the servers is collected via [https://cm.cloudlinux.com/#/users](https://cm.cloudlinux.com/#/users).
    :::tip Note
    User statistics will be available only for users that were loaded starting from connecting the server to the Centralized Monitoring.
    :::


### Centralized Monitoring: mode without session expired

Users can monitor server’s or user’s load for a long time using the mode without session expired.

To turn on the mode without session expired, follow the next steps:

1. Log in to the [cln.cloudlinux.com](https://cln.cloudlinux.com/console/) via your account
2. Open the [cm.cloudlinux.com](https://cm.cloudlinux.com/#/servers) in a new browser tab/window (please, use the same browser as in step 1)
3. Use the toggle to turn on/off 10 min auto logout

    ![](/images/AutoLogout.png)

Your session in the [cln.cloudlinux.com](https://cln.cloudlinux.com/console/) will expire in 10 min. But your session in the [cm.cloudlinux.com](https://cm.cloudlinux.com/#/servers) will not expire while your browser tab remains open.


### Centralized Monitoring user interface


You can access <span class="notranslate">Centralized Monitoring</span> in your [CLN account](https://cln.cloudlinux.com/).
Click <span class="notranslate">C-Monitoring</span> in the left menu.

![](/images/CMCLNAccount.png)

#### Servers


This page contains the list of all clients’ end servers. The server appears in the list after finishing [Installation](/cloudlinux-os-plus/#installation-2). By default, there is a descending sort by CPU usage.

![](/images/CMAllServers.png)

The following values are available for each server:

* <span class="notranslate">**Load Avg 15m**</span> – average system load for the last 15 min
* <span class="notranslate">**CPU Usage**</span> – CPU usage for the last 15 min (the number of cores can be found in the hint)
* <span class="notranslate">**Memory Usage**</span> – free available memory, the second value is the total memory for the last 15 min
* <span class="notranslate">**IO read/write**</span> – disk read bytes/disk written bytes for the last 15 min

:::tip Note
The values are calculated using a 15 min time period but the metric state is updated automatically every minute by default or you can choose from one of the predefined periods.
:::

* <span class="notranslate">**Idle state**</span> – there were no statistics for the server for the last minute. 
* <span class="notranslate">**N/A state**</span> – there were no statistics for the server for the last 30 days. This can happen if a new server was added but statistics sending was not configured.

There is no pagination on the <span class="notranslate">_All servers_</span> page and all columns can be sorted by absolute value.
Use the search tool to operate with the data.

#### Servers details

To get the detailed statistics for the server via charts, click a desired server line in the table.
All charts are auto-refreshed and there is an ability to select the period for metrics data to be updated for the chart.

![](/images/CMUPdates.png)

:::warning Note
We store the metrics data for one month only.
:::

#### Charts for server metrics

#### Visualization of the most popular server states

![](/images/CMMostPopularStates.png)

#### Disk space usage

![](/images/CMDiskSpaceUsage.png)

#### Open file descriptor/Context switches

![](/images/CMOpenFileDescriptorContextSwitches.png)

#### System load 1m , 5m, 15m

![](/images/CMSystemLoad.png)

#### CPU usage (total, system, user, iowait, steal)

![](/images/CMSCPUUsag.png)

#### Network traffic usage

![](/images/CMNetworkTrafficUsage.png)

#### Disk space usage

![](/images/CMDiskSpaceUsageBasics.png)

#### Memory usage (total, used, available)

![](/images/CMMemoryUsage.png)

#### Time spent doing I/Os

![](/images/CMTimeSpentDoingIO.png)

#### Disk IOps Completed

![](/images/CMDiskIOpsCompleted.png)

#### Disk read/write data

![](/images/CMDiskReadWriteData.png)

#### Disk read/write time

![](/images/CMDiskReadWriteTime.png)

#### Apache connections (number)/Number of requests per minute/Max connections


:::warning Note
In the current version, we collect these metrics for the cPanel end servers only. We are planning to add other panels support soon.
:::

:::warning Note
In the current version, we collect these metrics only for Apache (NOT for LiteSpeed, Nginx, etc.). The charts will be empty for LiteSpeed, Nginx, etc..
:::

#### MySQL queries

![](/images/CMMySQLQueries.png)

#### The most loaded server users for the last minute

![](/images/CMMostLoadedUsers.png)

We calculate the user’s load by LVE statistics that we collect on the end server.
The idle state for the user means that the LVE statistics were not collected for the last minute for some reason.

In each cell there are current usage/limit values for the basic LVE limits:

* CPU Usage
* Entry Processes
* Physical Memory Usage
* IOPS
* IO Usage
* Number of Processes
* MySQL CPU
* MySQL IO

In the hint, there is a number of faults for each limit. The values in the columns are underlined (it is red if load-to-limit ratio >=90%  and it is yellow if load-to-limit ratio >= 50%). For the current implementation, the only sort by the load-to-limit ratio is available.
By default, there is a descending sort by the CPU usage column.

When sorting by a column, the lines with the load-to-limit ratio >=90% for this column will have the red background color, and lines with the load-to-limit ratio >=50% for this column will have the yellow background color.

:::tip Note
The users with unlimited resources (∞) will be at the bottom of the table. 
:::

#### Users

This page contains all users for the all server of the client and their LVE statistics for the last minute. You can select the number of users on this page and search by user’s data.

The description of this page is the same as [*The most loaded server users for the last minute*](/cloudlinux-os-plus/#the-most-loaded-server-users-for-the-last-minute) of the top 5 loaded users.


![](/images/CMUsers.png)

User’s metrics data can be sorted by the load-to-limit ratio and by the absolute value.

The absolute value is used to analyse the load produced by unlimited users.

The value of the load-to-limit ratio is convenient to use in the analysis of how many resources the users consume and whether they need to change the limits.

The values like this ![](/images/CMvalue.png) means that the resource is unlimited and 500.2 MB is the current usage of it.

Metrics data of _Idle users_ is not used in the sorting, so such users always will be at the end of the list.  The sorting can be done for only one metric.

#### Charts for Users metrics 

:::warning Note
We store the metrics data for one month only.
:::

On the user details page, the admin can find the charts for all LVE limits.

![](/images/CMUsersCharts.png)


### Alert Manager

Alert Manager allows you to create a server or user alert for selected metrics and email the triggered events.

#### Alert Manager page

![](/images/CMAlertManager1.png)

The Alert Manager page contains a table with the following:

* **Alert name** - a unique alert name
* **Tracking metric** - a name of a server/user metric which will trigger the alert notification
* **# of servers** - number of servers on which the metric will be tracked
  * click ![](/images/CMAlertManager2.png) to view a list of servers host names
* **# of users** - number of users for which the metric will be tracked
  * click ![](/images/CMAlertManager2.png) to view a list of users names
* **Value** - a condition for the alert rule which will be applied to the tracking metrics
* **Email** - email to send the triggered events notifications
* **Type** - a type of the alert rule
* **# of triggered events** - the number of events from the time, when alert rule was created
  * ![](/images/CMAlertManager3.png) the event is still firing
* **Time  of the last trigger** - the time of last triggered event, it is the time in your browser time zone
* **Actions** - click ![](/images/CMAlertManager4.png) to edit and ![](/images/CMAlertManager5.png) to delete the alert rule

**Color Codes**

* **Red** color means that the event with the condition "more than" is still firing.
* **Green** color means that the event with the condition "less than" is still firing.

#### Creating an alert

To create a new alert, click the _Create alert_ button.

![](/images/CMAlertManager7.png)

Next, fill out the opened popup.

![](/images/CMAlertManager6.png)

* **Name of alert** - a unique alert name
* **Alert type** - an admin can create a **user** or a **server** alert. [What is the difference between them?](/cloudlinux-os-plus/#difference-between-the-server-alert-and-the-user-alert)
* **Select user/server** - admin will see such dropdown depending on a [case of alert creating](/cloudlinux-os-plus/#cases-of-alert-creating)
* **Notify me** - the condition of the alert trigger
* **Duration** - how much time the condition should be actual to trigger the notification
* **Notify me on email** - the email to send notifications

#### Editing an alert

An admin can edit any field in the Alert except the Alert type.

#### Difference between the server alert and the user alert

The **server alert** is used to track the state of the  whole server, it does not track user state on the server.
The **server alert** tracks the next list of metrics:

1. Context switches
2. System load (1m)
3. System load (5m)
4. System load (15m)
5. CPU Basic (total)
6. CPU Basic (system)
7. CPU Basic (user)
8. CPU Basic (iowait)
9. CPU Basic (steal)
10. Network Traffic Basic (`eht0_receive`)
11. Network Traffic Basic (`eht0_transmit`)
12. Network Traffic Basic (`ehtN_receive`)
13. Network Traffic Basic (`ehtN_transmit`)
14. Disk Space Used Basic (`mountpoint: <0>`)
15. Disk Space Used Basic (`mountpoint: <1>`)
16. Disk Space Used Basic (`mountpoint: <N>`)
17. Memory Basic (available)
18. Memory Basic (used)
19. Time spent Doing I/Os
20. Disk IOps Writes Completed
21. Disk IOps Reads Completed
22. Disk Read Data
23. Disk Write Data
24. Disk Read Time
25. Disk Write Time
26. Apache connections
27. Number of requests per minute
28. MySQL queries
29. Hardware Temperature (`chip<0>`)
30. Hardware Temperature (`sensor<0>`)
31. Hardware Temperature (`chip<N>`)
32. Hardware Temperature (`sensor<N>`)
33. Open File Description

During creating a server alert an admin should select the type of metrics as the first step. The list of servers will be collected according to the availability of these metrics on the server.

For example, for now, we do not collect Apache metrics for non-cPanel servers, so you will get only cPanel servers as a list of servers for these metrics.

We're planning to implement support for other panels/web servers in the next releases.

:::tip Small limitation
We collect the server list according to having their statistics in our database (this behavior will be changed in the next releases).
:::

For example, if server state is N/A or idle more than 24 hours, it will not be visible in the list for the alert.

The **user alert** tracks the next list of LVE metrics:

1. CPU Usage (current usage)
2. CPU Usage (faults)
3. Entry Processes (current usage)
4. Entry Processes (faults)
5. Physical Memory Usage (current usage)
6. Physical Memory Usage (faults)
7. IOPS (current usage)
8. IOPS (faults)
9. IO Usage (current usage)
10. IO Usage (faults)
11. Number of Processes (current usage)
12. Number of Processes (faults)
13. MySQL CPU (current usage)
14. MySQL CPU (faults)
15. MySQL IO (current usage)

:::tip Small limitation
We collect the server list according to having their statistics in our database (this behavior will be changed in the next releases).
:::

For example, if the user state is N/A or idle more than 24 hours, it will not be visible in the list for the alert.

#### Cases of alert creating

* Creating a server alert for the selected metrics for one server
* Creating a server alert for the selected metrics for all servers (the default value)
  
In this two cases, you will not see the dropdown for selecting users because the metrics will track the server state. 

* Creating a user alert for one user, so admin can select a server and a user.
* Creating a user alert for all users on several servers/all servers (in this case admin can't select users - all users will be selected automatically)

#### What is the Firing state of the alert?

This is the state of an alert that has been active for longer than the configured threshold duration.


#### Alert notifications

![](/images/CMAlertManager8.png)

* **Alert name** - the link to the alert page
* **Firing target** - the link to the server details page



### FAQ

#### How can I disable collecting and sending statistics on a client’s server?

Run this command:

<div class="notranslate">

```
/usr/share/cloudlinux/cl_plus/manage_clplus disable
```
</div>


#### Where can I view all my servers load?

You can find all your servers load in your CM personal account here: [https://cm.cloudlinux.com/#/servers](https://cm.cloudlinux.com/#/servers) or in your CLN personal account here: [https://cln.cloudlinux.com/console/cloudlinux/centralized-monitoring](https://cln.cloudlinux.com/console/cloudlinux/centralized-monitoring).


#### Where can I view all my users load?

You can find all your users load in your CM personal account here: [https://cm.cloudlinux.com/#/users](https://cm.cloudlinux.com/#/users) or in your CLN personal account here: [https://cln.cloudlinux.com/console/cloudlinux/centralized-monitoring](https://cln.cloudlinux.com/console/cloudlinux/centralized-monitoring)


#### Where can I view a server load details for a period?

Click the desired server in the server list in the UI.

#### Where can I view a user load details for the period?

Click the desired user in the user list in the UI.

#### How long are statistics stored in the central database?

30 days.

#### How can I change the charts period on the details page?

Choose the desired period in the upper right corner or select it directly on the chart.

#### I don’t understand how to read the user load chart.

The user load chart contains three lines:

* limit
* current load
* count of faults
  
Limit and current load are drawing regarding the left vertical axis, the count of faults is drawing regarding the right vertical axis. You can focus on a particular line by clicking a required legend.


### Troubleshooting

#### I can't see a server statistics

1. Check that your server is registered by key or by IP license of the CloudLinux+ account, i.e., it should be seen in the list of servers in your CLN account here: [https://cln.cloudlinux.com/console/auth/login](https://cln.cloudlinux.com/console/auth/login)
2. Check that the following required packages are installed on the end server:
* <span class="notranslate">`cl-end-server-tools`</span> >= 1.0.7-1
* <span class="notranslate">`cl-node-exporter`</span> >= 1.1.0-2
* <span class="notranslate">`rhn-client-tools`</span>
    * CloudLinux 6 >= 1.1.15-3.el6.cloudlinux.26
    * CloudLinux 7 >= 2.0.2-31.el7.clouldinux
    * CloudLinux 8 >= 2.8.16-14.module_el8.1.0+6074+9dc6073e.cloudlinux.2
* <span class="notranslate">`lve-stats`</span> >= 3.0.7-2
* <span class="notranslate">`lve-utils`</span> >= 4.2.21-2
* <span class="notranslate">`alt-python27-cllib`</span> >= 2.1.13-1
* `lvemanager` >= 6.2.10-1
3. Check that service collecting and sending statistics is running:

<div class="notranslate">

```
service cl_plus_sender status
```
</div>

4. Check that log of the <span class="notranslate">_cl_plus_sender_</span> service doesn't contain errors:
   
<div class="notranslate">

```
/var/log/clplus_sender.log
```
</div>

#### Where can I view the events log on the client's server?

You can view the events log on the client's server here: 

<div class="notranslate">

```
/var/log/clplus_sender.log
```
</div>

#### Can I get monitoring metrics from LiteSpeed, Nginx or other (Not Apache) web server?

Starting from end-server-tools-1.0.7, it supports collecting and sending statistics from the Apache and LiteSpeed web servers.

LiteSpeed is supported on cPanel and DirectAdmin control panels.

Each minute the statistics collection daemon checks which web server is started. If LiteSpeed is started, the daemon will collect data from it, otherwise, it checks if Apache is started.

When the daemon detects that the server is changed, it writes the following line into the statistics collection daemon log `/var/log/clplus_sender.log`:

```
2020-10-09 17:25:31,462: (CL+_sender_daemon) [INFO] Apache/Litespeed collector: Using Apache
```
or

```
2020-10-09 18:13:03,897: (CL+_sender_daemon) [INFO] Apache/Litespeed collector: Using Litespeed
```

If the daemon can't detect either Apache or LiteSpeed, it writes to the log the following:

```
2020-10-09 17:33:38,399: (CL+_sender_daemon) [INFO] Apache/Litespeed collector: Apache or Litespeed stopped or absent, collector will not work
```

The statistics collection daemon reacts to the server changing automatically, no need to restart it.

:::warning Warning
Please note that the daemon checks the server type once in a minute, so the data sent on a minute of switching can be unreliable.
:::

#### Logging data sent to pushgateway to the statistics collection daemon log

Starting from `cl-end-server-tools` v.1.0.6-1, the statistics collection daemon allows to log data sent to pushgateway to its log `/var/log/clplus_sender.log`.

To start logging, run the following command: 

```
touch /var/lve/cmt_debug_logging
```

To stop logging, run the following command: 

```
rm -f /var/lve/cmt_debug_logging
```

You don't need to restart the daemon after starting/stopping logging. The presence of a control file is evaluated "on the fly".

:::warning Warning
Use this logging with caution because when it is enabled, the size of the daemon log `/var/log/clplus_sender.log` will increase each minute minimum on 3-4 KB. The actual increase size depends on the number of active users' processes on a server.
:::

### Known issues

* MySQL Governor statistics in some cases is collected incorrectly
* Sorting by MySQL Governor statistics ignores idle users
* Sorting from the search result set does not work
* Sorting by ratio for unlimited users works incorrectly
