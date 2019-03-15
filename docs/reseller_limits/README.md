# Reseller Limits



Reseller limits is a feature that allows hosters to set limits for the resources each reseller can operate with. Hoster also provides controls to the reseller on what resources each reseller’s end user will have. Reseller limits set by a hoster limit the total amount of resources resellers’ end users can consume altogether.

When a hoster has set reseller limits for the particular reseller he provides the reseller with an ability to set limits for his end users within the Reseller Interface.


Starting from the **version**  **3.0-18**  operates with four types of users and their resource usage limits.

The types of users are as follows:

**End User** is a type of user that purchases hosting directly from a hoster and uses it for his own purposes;
**Reseller** is a type of user that buys hosting from a hoster and resells it to his end users;
**Reseller’s End User** is a type of user that purchases hosting from a reseller and uses it for his own purposes.
**Reseller’s End User (no Reseller limit)** is a type of user that purchases hosting from a reseller and uses it for his own purposes but does not have limits set by a reseller. These limits are set by the hoster.


See the comparison Table with types of limits.

| |  |  | |
|-|--|--|-|
|Limits | **Reseller limits** | **Reseller’s end user limits** | **Hoster’s end user limits**|
| | Yes | Yes | Yes|
| | Yes | Yes | Yes|
| | Yes | Yes | Yes|
| | Yes | Yes | Yes|
| | Yes | Yes | Yes|
| | Yes | Yes | Yes|
| | Yes (default for all users) | No | Yes|
| | Yes (supported only for mode) | Yes (supported only for mode) | Yes|


Please note that **Reseller** is a virtual entity. So, he cannot hit the limit. There is reseller's end user with the same name as reseller. This end user is limited as any other reseller's end user. When hoster sets Reseller limits he limits the group of resellers' end users including reseller's end user with the same name as the reseller.

Reseller's end user can hit reseller limit when end user's limit is bigger than reseller's limit. In such case end user will be limited by reseller limit.
Reseller limit can be hit when all resellers’ end users in total use as much resources as reseller limit.
Reseller's end user can hit his limit when end user limit is lower than reseller limit. In such case end user will be limited by his limit.

## Installation and Requirements



Reseller Limits are only supported in kernel starting with the version ** 3.10.0-714.10.2.lve1.5.3.el7 for ** and **3.10.0-714.10.2.lve1.5.3.el6h for ** .

Please note, that if you are using CloudLinux 6 kernel you would have to migrate to CloudLinux 6 Hybrid kernel first in order to be able to use new Reseller Limits functionality.

Use the detailed instruction below:

Install CloudLinux 7 or on a new server. Follow the instructions described [here](http://docs.cloudlinux.com/index.html?installing_new_servers.html) . Or you can convert your CentOS 6.x or CentOS 7.x system to CloudLinux 6 or CloudLinux 7 respectively. To do this, follow the instructions described on the [link](http://docs.cloudlinux.com/index.html?converting_existing_servers.html) .
If you have installed the CloudLinux 6, please convert it to the . Follow the instructions described [here](https://docs.cloudlinux.com/index.html?hybrid_kernel.html) .
Install with Reseller Limit support or update it up to version 3.0-18 (or later) by running the following commands:

```
yum install kernel lve cagefs lvemanager lve-utils lve-stats --disableexcludes=main
```



```
yum update
```



```
reboot
```


For with Reseller Limit support, please run the following commands:


```
yum install kernel lve cagefs lvemanager lve-utils lve-stats --disableexcludes=main
```



```
yum update
```



```
reboot
```




## How to Enable and Disable Reseller Limits


To start using a new feature **Reseller limits** you would have to enable reseller limits for a particular reseller first.

To enable **Reseller** access, please do the following:

Log in with a Hoster access.
You can create a new account or give privileges to an existing account.
For new account tick a checkbox in the box.
![](/images/resellersettings.png)

**_Note_** . _If checkbox_ **_ _** _ is not selected when creating Reseller in cPanel WHM, then user account _ **_Reseller_** _ will belong to root, not to reseller _ **_Reseller_** _. In such case, the user _ **_Reseller_** _ will be managed by the root. So, LVE limits specified by the root will be applied to the user _ **_Reseller_** _. User _ **_Reseller_** _ will not be limited by Reseller limits._
_When the checkbox is selected, user _ **_Reseller_** _ will be limited by Reseller limits (in addition to personal user limits set by Reseller)._

Give privileges to the proper Reseller account to make all features work.
Go to the tab and choose a particular reseller you want to enable Reseller limits for and click on the pencil icon.
In the pop-up window move the slider . Click for the question _ _ , set limits for that reseller if you you want them to be different from the default limits, otherwise default server limits will be applied. Than click the button.

![](/images/hmfile_hash_00664772.png)


Please note, that resellers’ end users can use as much resources in total as it is provided for that particular reseller by a hoster. The summary usage of all end users that belong to that particular reseller will not exceed the amount of resources provided to reseller by a hoster. If no Reseller Limits are set, reseller’s end user will be limited by default limits set by a hoster.

To disable Reseller limits, please do the following:

Go to the tab, choose a particular reseller and click on the pencil icon.
In the pop-up window move the slider _ _ . Click for the question . Than click the button.

Please note, that if you disable Reseller limits everything will work the same as before. All the end user limits set by the reseller will be saved. But all custom default reseller limits will be disabled.



## Hoster Interface


Hoster interface allows to monitor and manage limits for hosters’ end users, resellers and resellers’ end users, and also manage packages and monitor statistics.

Hoster credentials allow to control limits for hosters’ end users and resellers. To control reseller end user limits Hoster has to log in as Reseller.

Log in as Hoster to get access to the following functionality.

[ ](/reseller_limits/#current-usage) tab allows to monitor users and resellers resource usage at the moment.
[ ](/reseller_limits/#users) tab with the list of all users and resellers allows viewing and managing all the users and resellers limits.
[ ](/reseller_limits/#statistics) tab displays the statistics of resource usage for particular timeframe or particular user.
[ ](/reseller_limits/#options) tab allows to set LVE faults email notifications for hoster, users, and resellers.
[ ](/reseller_limits/#packages) tab allows to manage resellers packages limits;
[ ](/reseller_limits/#selector) tab allows to control settings.


### Current Usage


Choose tab to monitor users, resellers and resellers’ end users resource usage at the moment displayed in the table.

table provides information on usage of and MySQL), , data throughput ( and MySQL), read/write operations per second ( ), number of processes ( ), and entry processes ( ).

Resource usage values are being refreshed every 10 seconds by default which is set in field. You can set by choosing a value from the drop-down. You can refresh the table manually by clicking or you can freeze the values by clicking button. Usage values will not change until the next manual refresh. To unfreeze click on button. The countdown will continue.

Tick checkbox to hide the information on MySQL usage.

The list of users can be filtered by and . Hoster can view all types of users: _End users_ , _Resellers_ , _Reseller’s end users_ , _ Reseller’s end users (no Reseller limit)_ . But hoster can only manage _End users, Resellers, _ and _ Reseller’s end users (no Reseller limit_ ). To manage Reseller’s end users hoster should login as a reseller.

In the drop-down you can choose the number of user to be displayed on the page.

![](/images/currentusagetabhoster_zoom60.png)



### Users


Choose tab to view the list of all users and manage their limits.

To filter the list by user type click and in the drop-down choose:

End users -  to manage hosts end users only.
Resellers - to manage resellers only.
Reseller’s end users - to manage resellers’ end users only.
Reseller’s end users (no Reseller limits) - to manage resellers’ end users that do not have limits specified by reseller (these limits are specified by the hoster).

To filter the list by click and choose the value in the drop-down.

Note that a hoster can view the list of resellers’ end users and their limits, but can not manage resellers’ end users limits (if those are set by reseller).

A hoster can view the limits of all types of users and manage the limits for hosters’ end users and resellers’ end users (only those with Reseller Limits disabled).
Tick to show users with CageFS file system enabled.
Tick to show users with ignored .

![](/images/userstabhoster_zoom70.png)



Click on a pencil icon in column to edit limits for a particular user. The following actions are available:

Enable/disable CageFS;
_ _ - to reset limits to default values;
Apply _ _ to set the limits to unlimited;
Setting the limits values:
`o` 
`o` 
`o` 
`o`  
`o` 
`o` 
`o` 
`o` 
`o` 
`o`  (hard and soft) (for end users and resellers’ end users (with no Reseller Limits), if a hoster has enabled in cPanel settings).

Click to save changes or to close pop-up window.

![](/images/actionshoster.png)

Click on icon to view the history of a particular user resource usage. Choose time frame to view the history for a particular time period.

![](/images/historyhoster.jpg)




### Statistics


Choose tab to view end users, resellers and resellers’ end users limits usage statistics.

The following parameters can be displayed in the statistics table:

 usage per user;
 usage per user;
 usage per user;
 usage per user;
 usage per user;
 usage per user;
 usage per user;
 usage per user.

Click button and select columns from the drop-down to set which parameters should be displayed in the table.

Statistics table can be filtered by:

_ _ - to view the statistics for a particular period;
_ _ - to view a particular limit type usage only;
_ _ - to view top used limits only;
_ _ - to view the limits that are approaching maximum provided value;
_ _ - the limits that have reached the maximum value.

Click to choose type of users to be displayed - End users, Resellers, Resellers’ end users or Resellers’ end users (no Reseller limit) by ticking checkbox in the drop-down.

![](/images/statisticstabhoster_zoom70.png)


Click on a chart icon in column to view the detailed resource usage history for a particular account. Use timeframe drop-down to view the history for a particular period of time.

![](/images/history_charts_zoom70.png)



### Options


A hoster can set email notifications for panel administrator, reseller customer, and resellers’ customers in cases of limits faults. Choose tab to manage LVE Faults email notifications.

In section tick the required checkboxes to set a type of notification.

- notify hoster when his end users have exceeded minimum number of faults set for particular limits.
- notify reseller when his end users have exceeded minimum number of faults set for particular limits.
- notify hosters’ end users when they have exceeded limits.
- notify resellers’ end users when they have exceeded limits.

![](/images/optionstabemailnotifhoster.png)

In section tick the checkboxes to include required limits to the notifications.
Set the frequency of email notifications sending in .

![](/images/optionshosterfaultstoinclude.png)

In section enter the number of faults required for the notification to be sent for _ _ .

![](/images/optionstabhosterminimumftn.png)


In section you can reset inode limits to default values and tick .
In section tick the required checkboxes to apply user interface settings.
In section you can customize .

![](/images/optionstabhosterinodes.png)


### Packages


tab allows to set the limits for as many users as you need by editing packages of the limits. Each account belonging to a particular package adheres to those limits.

Choose tab to view and modify:

limits for user packages (created by hoster);
limits for reseller packages (created by hoster);
limits for resellers’ end users packages if reseller limits are not set for that reseller (hoster access allows identifying a particular reseller’s end user belonging to a particular reseller (created by reseller)).
![](/images/packageshostertab_zoom70.png)

To modify package limits click on a pencil icon in column in a particular package row. The following limits for this package are available for setting:

 in percent (%);
 (can be set as unlimited by setting 0);
 (can be set as unlimited by setting 0);
 (can be set as unlimited by setting 0);
 limits;
 ;
 (can be set as unlimited by setting 0);
 (for end users and resellers’ end users (with no Reseller Limits), if a hoster has enabled in cPanel settings.)

When limits are set click to apply changes or to close the window.


### Selector


tab allows to control settings.

In choose or from the drop-down to enable or disable PHP Selector.

In choose PHP version or from the drop-down to apply.

In choose required PHP versions to support.

Choose default modules from the list for a particular version of PHP or for .

![](/images/selector01_zoom70.png)

![](/images/selector02_zoom70.png)


## Reseller Interface


Reseller interface is designed to manage limits for resellers’ end users, to monitor statistics and the history of resource usage and to modify reseller’s end user packages limits.

Log in under a particular reseller credentials to have access to the following functionality:

[ ](/reseller_limits/#current-usage) tab - allows to monitor resellers’ end users resource usage at the moment;
[ ](/reseller_limits/#historical-usage) tab - allows to control resellers’ end users resource usage history;
[ ](/reseller_limits/#users) tab with the list of all resellers’ end users allows to view and manage all the reseller’s end user limits;
[ ](/reseller_limits/#statistics) tab displays the statistics of resource usage for particular timeframe or particular reseller's end user;
[ ](/reseller_limits/#options) tab allows to set LVE Faults email notifications.
[ ](/reseller_limits/#packages) tab allows to manage reseller’s end user packages limits.

Please note that reseller can manage all his end users via Reseller Interface. Reseller cannot manage or limits, neither his own nor for his users.


### Current Usage


Current usage table provides the information on the usage of , read/write operations per second (IOPS), number of processes (PNO), and entry processes (EP).
Resource usage data is being refreshed every 10 seconds which is set by default in field. You can set by choosing the value from the drop-down. You can refresh the table manually by clicking or you can freeze the values by clicking button. Usage values will not change until the next manual refresh. To unfreeze click on button. The countdown will continue.

Reseller cannot manage INODE or MYSQL limits. Neither his own, nor for his users.

The bottom line star in the table displays the total reseller resource usage. It means, that all the usage of resellers’ end users and of his own is displayed as a summary for each parameter.
![](/images/currentusagetabresellerr_zoom70.png)



### Historical Usage


Choose tab to view reseller and resellers’ end users resource usage history and faults. The list of users can be filtered by .

When reseller’s end user reaches the limits set by hoster for the reseller, this will be displayed on the chart. Please note, that in this case reseller’s end user would not necessarily reaches his limits set by the reseller. These faults are not displayed on the chart.

On the page the reseller is also able to see the list of (based on resource usage, for the same period as charts/overall usage). Click on a icon in the column to view resource usage statistics for particular user.

Click on link in the top of the list to go to the _ _ page to view or manage the rest of users.

![](/images/historicalusageresellertab_zoom70.png)


### Users


Choose tab to view and manage the list of all resellers’ end users and resource usage limits provided for them. The following limits are available for the resellers’ end users: .

You can filter the list by Tick checkbox to display only users with disabled.

![](/images/userstabreseller_zoom70.png)




Click on a pencil icon in column to edit limits for a particular user. The following actions are available:

Click to reset limits to default values.
Click for to set unlimited resources to a user.
Set values for , and NPROC and click to save changes or to close the window.

![](/images/userstabpopup_zoom70.png)





### Statistics


Choose _Statistics_ tab to view resource usage limits statistics.

table can be filtered by .

The following parameters are displayed:

 per user;
 usage per user;
 usage per user;
 usage per user;
 usage per user;
 usage per user.

![](/images/statisticstabreseller_zoom70.png)


Use _Charts_ icon in the _View_ column to view detailed resource usage charts for a particular period of time.

For example, 7 days period chart.

![](/images/sevendayschartresellers_zoom70.png)



### Options


Choose tab to set user email notifications for resellers’ end users.

In section tick appropriate checkboxes to set the required type of notification.

![](/images/optionsresellernotify_zoom70.png)


- notify reseller when his users have exceeded limits.
- notify resellers’ end users when they have exceeded limits.
- notify reseller when overall resource usage limits are reached.

In section tick checkboxes to include particular limits to email notifications.

![](/images/options02_zoom70.png)

In section enter the number of faults required for the notification to be sent for reseller and customer. You can also set the reseller notification frequency.

Set the frequency of sending the reseller email notifications in section.

![](/images/options03_zoom70.png)

Click _Save Changes_ to apply changes.

### Packages


Choose tab to view and modify limits for reseller’s packages.

![](/images/packagesreseller_zoom70.png)

Click on a pencil icon in a package row to set the following limits for a package:

 limit;
 (can be set as unlimited by setting 0);
 limits;
 limits;
 limits.

When limits are set click to apply changes.

