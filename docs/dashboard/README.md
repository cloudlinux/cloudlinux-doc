# Imunify360 User Interface


Imunify360 dashboard is available directly within your control panel*. It displays all the security events and the latest incidents updated every 30 seconds. It allows filtering and selecting events based on various parameters, reviewing the details of the incidents, managing White, Gray, and Black lists, Blocked ports and configuring settings.

***Note.** _ cPanel, Plesk, and DirectAdmin are supported at the moment. Standalone version are coming soon._

Log in to WHM as an admin and go to Plugins, choose Imunify360 to get to the Imunify360 user interface.

It allows to access:
[Support](/support/) - allows you to contact our support team directly from your Imunify360 User Interface

[Incidents](/incidents/) - the list of all suspicious activity on the server.

[Firewall](/firewall/) - a dashboard of Black, White, Gray lists and Blocked ports with the ability to manage them.

[Malware Scanner](/malware_scanner/) - real-time file scanner.

[Proactive Defense](/proactive_defense/) -  a unique Imunify360 feature that can prevent malicious activity through PHP scripts

[Reputation Management](/reputation_management/) -  analyzing and notifying tool intended to inform about websites blocking and blacklisting.

[KernelCare](/kernelcare_integration/) - KernelCare current state.

[Imunify360 Settings](/settings/) - configuring and controlling Imunify360 options.


## Support


This tab allows you to contact our support team directly from your Imunify360 User Interface. You can create a request and attach some files to it.

To contact our support team in Imunify360 User Interface, please click the _Call_ icon in the top right corner of the page.

![](/images/contactsupport_zoom70.png)

A support ticket will be created and an email will be sent to a specified email address. When a status of your request will change you receive a notification to your email address. You will be able to track your request via [https://cloudlinux.zendesk.com/hc/](https://cloudlinux.zendesk.com/hc/) and email.


## Incidents


Choose _Incidents_ tab to view and manage the list of all the [incidents](/terminology/) . The table displays a list of detected incidents with all the information about the incidents reasons.

Use filters to show the exact list of incidents:

_Timeframe_ - allows filtering incidents by different time periods.
_List_ - allows filtering incidents by White, Black, or Gray lists, or showing the incidents from all lists.
_IP_ - allows showing all the incidents of a proper IP address. Tick _ Description/IP_ checkbox to enable input field where you can enter a proper IP or a part of it and filter the list by clicking on magnifier or pressing Enter.
_Country _ - allows filtering the incidents by abusers country. Tick _Country_ checkbox to enable input field with auto-complete where you can enter a proper country and  filter the incidents by clicking magnifier or pressing Enter.

![](/images/tloi_zoom86.png)

Switch _Auto-refresh_ to enable or disable automatic refresh of the incidents in the table without reloading the web-page.
Set the number of incidents to be shown on a page by choosing the number of items per page in the bottom right of the page.

![](/images/auto_refresh_zoom92.png)

The list of incidents contains the following information:

_Date_ - the time when the incident happened.
_IP_ - the IP address of the abuser.
There is a color indication for IP address.
`o` A gray bubble means that this IP address is currently in the gray list (so, every connection from this IP address will redirect to the CAPTCHA).
`o` A blue bubble means that this IP address is currently in no one list (white list/gray list/black list). IP is not blocked.
`o` A white bubble means that this IP address is currently in the white list. IP will never be blocked by Imunify360.
`o` A black bubble means that this IP address is currently in the black list. And access from this IP is totally blocked without ability to unblock by the CAPTCHA.
`o` No bubble is shown when this incident doesn’t contain IP address.
_Country_ - country origin of the abuser IP address.
_№ of Times_ - the number of times the abuser tried to repeat the action.
_Event _ - description of the event or suspicious activity (as it is described by OSSEC and Mod_Security sensors).
_Severity_ - severity level of the incidents (as it is estimated in [OSSEC severity levels](http://ossec-docs.readthedocs.io/en/latest/manual/rules-decoders/rule-levels.html) and [Mod_Security severity levels](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual#severity) ). The color of severity means:

`o` Green - Mod_Security levels 7-5, OSSEC levels 00-03;
`o` Orange - Mod_Security level 4, OSSEC levels 04-10;
`o` Red - Mod_Security levels 3-0, OSSEC levels 11-15.

![](/images/list.jpg)

Click on an Incident to expand the detailed information.

![](/images/expand.jpg)

Actions available for the Incidents:

Disabling the rule of the incident and add it to the list of Disabled rules. Click ban icon in a proper incident row and confirm the action:

![](/images/disable_ossec_zoom85.png)

Adding an IP to the Black or White list, click cog icon and choose the action:

![](/images/move_button_zoom94.png)





## Firewall


_Firewall_ tab allows viewing and managing the IP addresses in the lists:

White list - allows to always accept IPs from the list.
Gray list - an auto-generated list of all the IPs blocked by Imunify360, based on Sensors alerts and alerts from the central server.
Black list - allows to always block IPs from the list.
Blocked ports - allows to manage the list of blocked ports.

**White list**

Click _Firewall_ in the main menu then choose _ White List_ .

Use filters to show the exact list of the IPs:

_Page size_ - allows setting the number of the incidents to be shown on the page.
_IP_ - allows filtering the list by IP. Tick _ IP_ checkbox to enable input field where you can enter an IP or a part of.
_Country_ - allows filtering the list by country origin. Tick _Country_ checkbox to enable an input field with autocomplete where you can enter a country name. Imunify360 will show the list of IPs of the chosen country.

You can perform the following actions with the IPs in the White list:

Adding the IPs manually.
Adding comments to the IPs.
Moving the IPs from the White list to the Black list.
Removing the IPs from the list.

**1. How to manually add the IPs:**

To add an IP to the White list click _Add_ on the right side of the page:

![](/images/add.jpg)

In the pop-up choose _Add IP_ tab and specify the following:

_1. Enter IP_ - add IP or subnet in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) .

_2. Enter a comment_ - add a comment to the IP or subnet (optional).

3. Choose where to add the IP or subnet to the Black or to White List.

3.1 For White list it is possible to tick _Full Access_ checkbox to make this IP or subnet ignore the rules in Blocked ports. The IPs with full access have a crown icon in the IP column. Note that it is possible to grant or remove full access afterwards in the table, just click cog icon and choose _Grant Full Access_ to grant or _Remove Full Access_ to remove it.

![](/images/hmfile_hash_1d7287fc.jpg)

When done, click _ Add IP_ to confirm your action or Cancel to hide pop-up.


![](/images/add_ip_zoom76.png)

You will see a notification if an IP has been added successfully:

![](/images/added_zoom80.png)

**2. How to add a comment to the IP:**

In the proper IP row click plus sign (+) in the _Comment_ column, type a comment and click _ Save_ in the pop-up:

![](/images/add_comment_zoom72.png)

To remove a comment just delete the text in the pop-up and click Save.

**3. How to move IPs from the White List to the Black List:**

To move several IPs from the White list to the Black list choose proper IPs (use checkboxes), click _Move permanently_ at the top of the table and choose Black list in the drop-down.

![](/images/move_ip_zoom97.png)

To move one IP address, click on a cog icon in proper IP row and choose Black List in the drop-down.

 ![](/images/move_ip_01.jpg)
You will see a notification if an IP is moved successfully.

![](/images/success.jpg)
**4. How to remove IP addresses from the White list:**

To remove several IPs from the White list, choose proper IPs (use checkboxes) and click _Delete permanently_ .

![](/images/remove_zoom86.png)

To move an exact IP just click trash icon in front of a proper IP address.

You will see a notification if an IP is deleted successfully:

![](/images/success_01_zoom75.png)

Whitelisted trusted services
Imunify360 has a predefined whitelisted services. The actual list always available here.

**5. Whitelisted trusted services**

Imunify360 has a predefined whitelisted services. The actual list always available on the [link](https://files.imunify360.com/static/whitelist/v2/) .

**Gray List**

Choose _ Firewall_ tab in the main menu then click _ Gray List_ .

Use filters to show the exact list of IPs:

_Page size_ - allows setting the number of the incidents to be shown on the page.
_IP_ - allows filtering the list by IP. Tick _ IP_ checkbox to enable input field where you can enter an IP or part of IP.
_Country_ - allows filtering the list by country origin. Tick _Country_ checkbox to enable an input field with autocomplete where you can enter a country name. Imunify360 will show the list of IPs of the chosen country.

The only Removing IPs from the list is available in the Gray list:

**How to remove IPs from the Gray list:**

To remove several IPs from the Gray list choose IPs in the list (use checkboxes) and click _Delete permanently_ .

![](/images/remove_ip_fro_gray.jpg)

To remove an exact IP click on a trash icon in front of a proper IP.

You will see a notification if the IP is deleted successfully.

![](/images/success_01_zoom76.png)
**Black List**

Choose _Firewall_ tab in the main menu then click _ Black List_ .

Use filters to show an exact list of the IPs:

_Page size_ - allows setting the number of the incidents to be shown on the page.
_IP_ - allows filtering the list by IP. Tick _ IP_ checkbox to enable input field where you can enter an IP or a part of.
_Country_ - allows filtering the list by country origin. Tick _Country_ checkbox to enable an input field with autocomplete where you can enter a country name. Imunify360 will show the list of IPs of the chosen country.

The following actions are available with IPs in the Black list:

Adding the IPs manually.
Adding the country.
Adding comments to the IPs.
Moving IPs from the Black list to the White list.
Removing the IPs manually.

**1. How to manually add the IPs:**

To add an IP to the Black List click _ Add_ on the right side of the page.

![](/images/firewallblacklistwarning_zoom70.png)

In the pop-up choose _Add IP_ tab and fill out:

_Enter IP - an IP or subnet in _
_Enter a comment - type a comment to the IP or subnet (optional)._
_Choose Black List radio button._

When done, click _ Add IP_ to confirm your action or _ Cancel_ to hide pop-up.

![](/images/add_ip_black_zoom81.png)

You will see a notification if the IP is added successfully.

![](/images/added_zoom92.png)

_[required Imunify360 Beta version 2.7.4 or later]_

If _Show only manually added_ switcher is disabled (default setting) than IPs automatically blocked by Imunify360 without access to CAPTCHA are displayed in a Black List along with manually added IPs. They have _Imunify360_ in the **Source** column and _Automatically blocked due to distributed attack_ in **Comment** column.

**Note** that regardless of switched CSF off or on, blocked by Imunify360 IPs exist along with CSF deny list.Warning displayed at the top of the table says that CSF is running and can be used for blacklisting along with Imunify360.

**2. How to manually add a country:**

To add a country to the Black List click _ Add_ on the right side of the page:

![](/images/add_black.jpg)

In the pop-up choose _ Add Country_ tab and fill out:

_Enter country - autocomplete field. Just start typing._
_Enter comment - type a comment to the IP or subnet (optional)._

When done, click _ Add Country_ to confirm or _ Cancel_ to hide pop-up.

![](/images/north_korea_zoom92.png)

You will see a notification if a country has been added successfully.

![](/images/sucess_country_zoom82.png)

**3. How to add a comment to the IP:**

In a proper IP line click plus sign (+) in the Comment column, add a comment and click _Save_ in the pop-up:

![](/images/add_comment_zoom86.png)

To remove a comment just delete the text in the pop-up and click _ Save_ .

**4. How to move the IPs from the Black list to the White list:**

To move the IPs from the Black list to the White list choose proper IPs in the list (use checkboxes), click _Move permanently_ at the top of the table and choose White list in the drop-down.

![](/images/move_ip_black.jpg)

To move an exact IP just click on a cog icon in a proper IP row and choose White list in the drop-down.

 ![](/images/move_black.jpg)
You will see a notification if an IP is moved to the White list successfully.

![](/images/success.jpg)
**5. How to remove IPs from the Black list**

To remove IPs from the Black List choose proper IPs in the table (use checkboxes) and click _Delete permanently_ .

![](/images/delete_permanently.jpg)
To remove an exact IP just click on a trash icon in the row.

You will see a notification if an IP is successfully deleted.

![](/images/success_01_zoom75.png)

### Blocked ports



This feature allows to block specific ports for TCP/UDP connection. It is also possible to add specific IPs or subnet as a whitelisted, so that the rule for the port will not work.

Click _Firewall_ and choose _Blocked Ports_ .

**Note.** _ If CSF integration enabled, then Blocked Ports will be disabled. Imunify360 imports Closed ports and their whitelisted IPs from CSF._

Use filters to show the exact list of IPs:

Page size - allows setting the number of the incidents to be shown on the page.
IP - allows filtering the list by IP. Tick IP checkbox to enable input field where you can enter an IP or a part of.
Description - allows filtering the list by text in notes.

The following actions are available for the ports:

Adding port to the list of blocked ports.
Editing ports in the list of blocked ports.

**Adding a port to the list of blocked ports**

On the Firewall page choose _Blocked ports_ and click _Add Port_ . In the pop-up window specify the following:

Port - the number of the port to be added to the list of blocked ports.
TCP/UDP - tick the checkboxes of connection types for the port that should be blocked.
Description (optional) - add a text to be added as a note for the port.
List of IPs/Subnets - add IPs or subnets to the Whitelist separated by commas. They will be able to use the port.

Click _Add Port_ to proceed or _Cancel_ to close pop-up.

![](/images/add_port.jpg)
**Editing ports in the blocked ports list**

To add an IP or a subnet to the Whitelist for the port, click _+IP_ and in the Add IP/Subnet pop-up window specify the following:

Enter IP - IP or subnet that should be added to the whitelist.
Enter description - enter the text to be added as a note to the IP or subnet.

![](/images/add_ip_ports.jpg)

In the blocked ports list it is possible to edit notes for IPs and ports. Click pen icon near the note and make changes.

![](/images/add_port_01.jpg)

To delete port or separate IP/subnet, click trash icon in the row of the element.

![](/images/add_port_02.jpg)




## Malware Scanner


Click _Malware Scanner_ in the main menu of Imunify360 user interface to get to the Malware Scanner page.

**Note** . _The functionality described on this page depends on _

Imunify360 Malware Scanner can scan file systems for malware injection and quarantine infected files.

This is also a real time file scanner for vulnerability and it does:

Scanning files uploaded via FTP (supporting [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd) ).

Scanning files uploaded via HTTP/HTTPS.

Scanning files for changes via [inotify](https://en.wikipedia.org/wiki/Inotify) .

On-demand scanning (any folder you need).

Note that when using Mod_Security for real-time scans, it is only possible to detect file owner if Apache is running with `mod_ruid2` configured. In other cases, the user for these files will always be the user a web server is running under (usually `nobody` ).

Malware scanning allows you to:

observe scanner activity;
start on-demand file scanner;
manage malicious and quarantined files;
manage ignore list.

**Observing Malware Scanner activity**

Go to _Malware Scanner_ page and choose _ Dashboard_ tab. On this page, the file scanning activity from the beginning of the current day is displayed by default. It is possible to use a _Timeframe_ filter to observe scanner activity within the particular time period.

![](/images/malwarescannerdashboard_zoom70.png)

The scanner activity is filtered by:
_Malicious_ - the number of files where Malware Scanner has detected a malicious activity. It is possible to configure the action to be applied to the files:
`o` Delete permanently;
`o` Move to quarantine;
`o` Try to restore from backup;
`o` Display in dashboard.
Please find more details in the [Malware Scanner settings](/malware/) section.
_Quarantined_ - the number of quarantined files that are not available for the user.
_Restored from quarantine_ - the list of the files restored from the quarantine manually.


**On-demand file scanner**

It is possible to scan a specific directory for malware. Go to _Malware Scanner_ page and choose _ On-demand scan_ tab. Then proceed the following steps:

1. Enter a folder name you need to scan in the _Folder to scan_ field. Start typing with the slash “/”.

It is possible to use Advanced settings:

_Filename mask_ . It allows to set file type for scanning (for example, “*.php” - all the files with extension php). Default setting is “*” which means all files without restriction.
_Ignore mask_ . It allows to set file type to ignore (for example, “*.html” - will ignore all file with extension html).

2. Click _Start_ .

![](/images/malwarescannerondemandscan_zoom70.png)

At the top right corner Malware Scanner progress and status are displayed:
Scanner is stopped - means that there is no scanning process running.
Scanning…% - means that the scanner is working at the moment. A percentage displays the scanning progress. You can also see the scanning status beneath the Mask or Advanced options.
![](/images/ondemandscannerprogressbar_zoom70.png)

After Malware Scanner stops on-demand scanning you will see the results in the table below with the following information:

_Date_ - the date when the scanning process was started.
_Path_ - the name of the folder that was scanned.
_Total_ - the total number of files scanned.
_Malicious -_ the number of malicious files found during the scanning.
_Action - _ you can click on an icon in this column to perform particular actions.

![](/images/malwarescannerondemand_zoom70.png)

To review and manage malicious files go to _Malicious Files_ tab described below.


**Managing files detected as malicious**

Go to _Malware Scanner_ → _Dashboard_ → _Malicious Files_ . This page has a table with malicious and quarantined files.

![](/images/malwarescannerdashboardgeneral_zoom70.png)

Use filters to show a list of files in a table:

_Timeframe_ - allows to filter files for different time period of detection.
_Page size_ - allows to set the number of files to be shown on a page.
_Search field_ - allows to search files by filename.


**Malicious Files Table**

The following information is available in the table:

Date/time of detection - hover mouse over clock icon to show the exact time when file was detected as malicious.
Username - file owner name.
File - the path where the file is located.
Scan type - shows which way was used to detect the malicious activity. Can be one of the following:
`o` On-demand, which means that the file was found during manual scanning;
`o` Real-time, which means that the file was detected during real-time scanning process.
Reason - describes the signature which was detected during the scanning process. Names in this column depend on the signature vendor.
Quarantined - displays whether a file is put on quarantine or not.
Actions - displays the possible actions with a file.

It is possible to manage suspicious files in the table:

Delete files permanently
Add to ignore list
View file content
Restore from quarantine
Restore from backup
Cleanup files from malicious code

**Delete files permanently**

Click _cog_ icon in the file line and choose _ Delete permanently_ in the drop-down.

![](/images/maliciousfilesdeletepermanently_zoom70.png)

To do mass action tick several checkboxes or one in the table header to perform action on all files and click _cog_ icon or _Group Actions_ link above the table. Choose _Delete permanently_ in the drop-down.

![](/images/maliciousfilesdeletepermanentlygroupaction_zoom70.png)

**Add to ignore list**

_Add to ignore list_ action is performed simultaneously with _Restore from quarantine_ action. Please go to [Restore from quarantine](/malware_scanner.htm#restorefromquarantine/) section.
Read more about [ignore list](/terminology/) .
**Note** . If a file is added to ignore list Malware Scanner will no longer scan this file.

**View file content**

Click _eye_ icon in the file line and the file content will be displayed in the pop-up. Only the first 100Kb of the file content will be shown in case if a file has bigger size.

**Restore from quarantine**

Click _fish_ icon in the file line and approve the action in the pop-up. It is possible to send a file to Imunify360 team for analysis and add file to the ignore list. To do so, tick _Submit to the Imunify360 team for analysis_ checkbox and/or _Add to ignore list_ checkbox and confirm by clicking _Yes, Restore_ .

![](/images/malwarescannerrestorefromquarantine_zoom70.png)

To do mass action tick several checkboxes or one in the table header to perform action on all files and click _Not malware. Restore from quarantine_ above the table. Confirm the action in the pop-up.

![](/images/malwarescannerrestorefromquarantinemass_zoom70.png)

**Restore from backup**

Click _cog_ icon in the file line and choose _Try to restore clean version from backup_ in the prop-down. Confirm the action in the pop-up bу clicking _Yes, restore from backup._

![](/images/malwarescannerrestorefrombackup_zoom70.png)
To do mass action tick several checkboxes or one in the table header to perform action on all files and click _cog_ icon or _Group actions_ link above the table. Then choose _Try to restore clean version from backup_ in the drop-down.

![](/images/malwarescannerrestorefrombackupmass_zoom70.png)

**Cleanup files from malicious code**

_{Available starting with Imunify360 version 3.7.1 Beta}_

This feature allows users to cleanup infected files from malicious code or to remove a malicious files.
Click _Cleanup_ icon in the file line. Cleanup confirmation pop-up opens.

![](/images/malwarecleanupclickicon_zoom70.png)

Click _Yes, cleanup_ to confirm the action or _Cancel_ to close the pop-up.
![](/images/cleanupconfirmationpopup_zoom80.png)

File status will change to _ Cleanup in progress_ . When cleanup will be finished the status changes to _Cleaned_ .
To do mass action tick several checkboxes or one in the table header to perform action on all files and click _Cleanup_ icon or _ Cleanup files_ above the table. Confirm the action in Cleanup confirmation pop-up or click _Cancel_ to close the pop-up.

![](/images/cleanupmassaction_zoom70.png)

To cleanup all files, click _Cleanup all_ button and confirm the action in the confirmation pop-up or click _Cancel_ to close the pop-up.

![](/images/cleanupall_zoom70.png)
A user can restore original file cleaned or removed by Malware Cleanup before the infected file expiration date. The keeping period is set in [Malware Scanner Settings](/malware.htm#malwarecleanup/) section.

### Managing Ignore List



Go to Malware Scanner page and choose _Ignore List_ tab. The table on the page shows all items (files and folders) added to ignore list and date and time when they have been added.

To add new file or new path to the ignore list do the following:

Click _Add new file_ or directory;
In the pop-up enter the path to be added;
Click _Add_ .

![](/images/addnewfileordirectory_zoom70.png)

**Note** . Wildcards are not supported when adding paths to Ignore List. For example, the following paths are not supported:
/home/*/mail/
/home/user/*.html
/home/*

To delete the item click a recycle bin icon and confirm the action. The item(s) will be rechecked by Malware Scanner after removal.

To search file or folder in the Ignore List use Search input field above the table.




## Proactive Defense


### Overview


 
Proactive Defense is a unique Imunify360 feature that can prevent malicious activity through PHP scripts. It is available as a PHP module for Apache and LiteSpeed web servers and analyzes script activity using known patterns like obfuscated command injection, malicious code planting, sending spam, SQL injection etc.

### User Interface


 
Go to Imunify360 → Proactive Defense.

![](/images/proactivedefensemain_zoom70.png)

Here you can set a mode, view detected events and perform actions on them.

![](/images/proactivedefensegeneralui_zoom70.png)

**Mode Settings**

The following Proactive Defense modes are available:
Disabled —  means that Proactive Defense feature is not working and a system is not protected enough (default mode);
Log Only — means that possible malicious activity is only logged, no actions are performed.
Kill Mode — the highest level of protection — the script is terminated as soon as malicious activity is detected.
To select a mode, tick the desired checkbox. When an action is completed, you will see a pop-up with the successful mode changing message.
![](/images/proactivedefensemodesettings_zoom70.png)

Note that the data is logged in all modes except Disabled.
Note that  a user can disable Proactive Defense anytime. Any mode that is not disabled (for user’s hosting account) by admin can be activated by user.

**Detected Events**

The Detected Events table displays all the necessary information about PHP scripts with malicious activity detected by Imunify360 Proactive Defense.
![](/images/proactivedefensedetectedevents_zoom70.png)

You can filter items by time frame in a _Timframe_ dropdown and search a certain entity in a search field.
The items in the _ Detected Events_ table are displayed per 25 on a page. To change a number of items displayed, click the number at the bottom right corner _Items per page_ and select a desired number in the dropdown.
To go to the next or the previous page click >> or << button or click a desired page number.
The _Detected Events_ table includes the following columns:
Group/individual action checkbox — allows to perform actions on one or several desired entities;
Detection Date/Time — displays the date and the exact time of event detected. To view the exact time click the clock icon in the desired event line. To order the events from the last to the first or vice versa click the ▲ icon in the Date/Time of detection column header;
Description — displays a special Proactive Defense rule according to which a suspicious activity was detected;
Script Path — displays the path to the suspicious script. A number near the path describes how many times this event has repeated;
Host — displays the host of the script.
First script call from — displays the IP in which the first call of the script was detected.  White color means that this IP is whitelisted; black color means that this IP is blacklisted; gray color means that this IP is graylisted; all the others IPs are blue colored.
Action — displays the current mode;
Actions — allows to view details and perform actions on the event.

**Actions**

The following actions are available for the detected event:
View file content;
Move IP to the Black List;
Move file to Ignore List (ignore detected rule) — allows a user to exclude a file from Proactive Defense analysis for a particular rule; _{Available starting with Imunify360 3.7.0 Beta}_
Move file to Ignore List (ignore all rules) — allows a user to exclude a file from Proactive Defense analysis for all rules; _{Available starting with Imunify360 3.7.0 Beta}_
Remove file from Ignore List — allows a user to include ignored file to Proactive Defense analysis again. _{Available starting with Imunify360 3.7.0 Beta_ }

**View file content**

This action can be performed in two ways.

**The first way**

Click the _View details_ icon in the row of the desired event. Here you can see the same information as in the table and plus all environment variables and their values. Then, click _View file content_ button. The file content will be displayed in a new pop-up.

![](/images/proactivedefenseviewfilecontent_zoom70.png)

**The second way**
Click the gear icon in the row of the desired event and choose _View file content_ .

![](/images/proactivedefenseviewfilecontentway2_zoom70.png)

The file content will be displayed in a new pop-up.
![](/images/proactivedefensefilecontent_zoom70.png)
The group action is not available for viewing file content.

**Move IP to the Black List**

Click the _View details_ icon in the row of the desired event. Then, click _Block IP_ button. To move the IP to the Black list click _Yes, move to Black list_ . In the pop-up displayed click _Yes, move to black list_ to complete the action or _Cancel_ to return to the _Details_ window. When a file is added to the Black list, you will see the confirmation pop-up.

![](/images/proactivedefenseblockip_zoom70.png)

**Move file to Ignore List (ignore detected rule)**
_{Available starting with Imunify360 3.7.0 Beta}_

**The first way**
Click _cog_ icon in the row of the desired event and choose _Ignore detected rule for the file_ . Click _Yes, add to Ignore List_ in the confirmation pop-up or click _Cancel_ to close pop-up. Now you can see this file on the Ignore List tab.
![](/images/proactivedefenseignoredetectedruleforfile_zoom70.png)

**The second way**
Click _View details_ icon and then in the file details pop-up click _Ignore detected rule for this file. _ Click _Yes, add to Ignore List_ in the confirmation pop-up or click _Cancel_ to close the pop-up. Now you can see this file on the Ignore List tab.

![](/images/proactivedefenseignoredetectedruleforfile1_zoom70.png)

**Move file to Ignore List (ignore all rules)**
_{Available starting with Imunify360 3.7.0 Beta}_

**The first way**
Click cog icon in the row of the desired event and choose _Ignore all rules for the file_ . Click _Yes, add to Ignore List_ in the confirmation pop-up or click _Cancel_ to close pop-up. The file will be moved to Ignore List tab.
![](/images/proactivedefenseignoreallrulesforfile_zoom70.png)

**The second way**
Click _View details_ icon and then in the file details pop-up click _Ignore all rules for this file. _ Click _Yes, add to Ignore List_ in the confirmation pop-up or click _Cancel_ to close the pop-up. Now you can see this file on the Ignore List tab.

![](/images/proactivedefenseignoreallrulesforfile1_zoom70.png)

**Remove file from Ignore List**
_{Available starting with Imunify360 3.7.0 Beta}_

On the Ignore List tab click _Bin_ icon and confirm the action.
![](/images/proactivedefenseignorelistbin_zoom70.png)

To perform bulk action, tick required checkboxes and click _Remove from ignore list_ at the top of the table, then confirm the action in the pop-up.

**Ignore List tab**

_{Available starting with Imunify360 3.7.0 Beta}_

Here, there is a table with files with ignored rules. If file is added to Ignore List, Proactive Defense will not analyze scripts activity from this file for all or specified rule.
![](/images/proactivedefenseignorelist_zoom70.png)

The _Ignore List_ table includes the following columns:

Add Date/Time — displays the date and the exact time of adding a file. To view the exact time click the clock icon in the desired file line. To order the files from the last to the first or vice versa click the ▲ icon in the Add Date/Time column header.
Script Path — displays the path to the script.
Rules to ignore — displays the pattern to be ignored.
Actions — allows to view details and perform actions on the file.

**How to test Proactive Defense**

1. Set Proactive Defense to _ Log only_ mode (requests will not be blocked) or to _Kill mode_ to kill all requests.
2. Create a file with the following content:

```
<?php system('wget -V');?>  
```
```
 
```
3. Place this file on the server.
4. Call a test page with the script from the point 2.
5. If Proactive Defense is disabled, you will see Wget version in a web-browser.
6. If Proactive Defense is enabled and _ Log only_ mode is set, you will see the string _Rule for the testing of malicious_ in the _Detected Events_ table.
7. If Proactive Defense is enabled and _Kill mode_ is set, the test page returns an error.



## Reputation Management


Choose _Reputation Management_ in the main menu of the Imunify360 user interface to get to the Reputation Management page.

Based on the [Google Safe Browsing](https://safebrowsing.google.com/) , the Reputation Management allows to check if a domain registered on your server is safe or not.

How it works:

We get a list of domains periodically (via crontab).
Send it to the central Imunify360 server.
Get results from it.
Add bad domains to the list of Reputation Management.

If a domain or an IP is blocked, then this information will be available in the table below. Imunify360 uses [Google Safe Browsing](https://safebrowsing.google.com/) technology. If a user’s website appears in this table, then it would be useful to send this [link](https://developers.google.com/webmasters/hacked/) to the user. This instruction can help to solve problems with the domain.

At the top of the page (also in the main menu near Reputation Management item), Imunify360 shows the number of affected domains. This number is a quantity of affected domains that exist on the server.

The table shows:

_ID_ - domain owner username.
_URL_ - the affected domain link.
_Type_ - read more about types [on the link](https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatType) (we still do not support THREAT_TYPE_UNSPECIFIED and POTENTIALLY_HARMFUL_APPLICATION).
_Detection time _ - exact time when the Reputation Management has detected the domain.

![](/images/reputation_zoom73.png) 

Click on a link icon in the Action column to copy the URL to the clipboard.

**Note.**  _Reputation management online and browser look may differ. This is because Google Safe Browsing has an issue described on github _



## KernelCare Integration


Imunify360 has [KernelCare](https://www.cloudlinux.com/all-products/product-overview/kernelcare) KernelCare integration. To install KernelCare go to the [Settings](/settings/) tab and click _ Install KernelCare_ .

![](/images/kc_int.jpg)

To observe current KernelCare status in the Imunify360 main menu choose _KernelCare_ tab.

Here you can check:

Effective Kernel Version - version of the kernel that KernelCare enable on the server
Real Kernel Version - real version of the kernel.
Update mode - auto updated mode On or Off.
Uptime - uptime of the kernel in days.

To disable auto update mode toggle the Update mode switch to No.


![](/images/kcint.jpg)

**Note. ** _If you have KernelCare license(s) on the same server(s), then cancel this license in CLN because KernelCare will be free for that server. If you do not know how to cancel licenses then _

**Note** **_._** _ KernelCare tab can load slowly on a highly loaded system._

Read more about KernelCare [on the link](https://www.cloudlinux.com/all-products/product-overview/kernelcare) .

## Settings


Choose _ Settings_ in the main menu to get to the Imunify360 settings page.
The following tabs are available:

[General](/general/)
[Malware](/malware/)
[Backups](/backups/)
[Disables Rules](/disabled_rules/)
[Attributions](/attributions/)

### General


Go to _Imunify360 → Settings → General. _ The following sections are available _:_

[Installation](/general.htm#installation/)
[DoS Protection](/general.htm#dosprotection/)
[Auto White List](/general.htm#autowhitelist/)
[Incidents Logging](/general.htm#incidentslogging/)
[Error Reporting](/general.htm#errorreporting/)

#### Installation



Here you can install and uninstall the following components:
[HardenedPHP](/general.htm#hardenedphp/)
[Invisible Captcha](/general.htm#invisiblecaptcha/)
[KernelCare](/general.htm#kernelcare/)

![](/images/settingsgeneralinstallation.png)


**HardenedPHP**

To install or uninstall HardenedPHP click on a button related. Please find additional information about HardenedPHP in [this article](https://www.cloudlinux.com/hardenedphp) .
During HardenedPHP installation process the installation log will appear and will update automatically.

**Note** . Hardened PHP is free on the servers with Imunify360 installed.

![](/images/kc_install_log_zoom91.png)


**Invisible Captcha**

**Overview**

This feature allows to automatically determine if the user is a human. The system falls back to CAPTCHA solving if the algorithm determines that a user may not be a human.
It is possible to enable Invisible CAPTCHA feature via Imunify360 user interface (UI) and via command line interface (CLI).

**How to install Invisible CAPTCHA**

Go to Imunify360 → Settings → General → Installation → Invisible CAPTCHA and click on Install Invisible CAPTCHA button. Confirm the installation in the pop-up.

![](/images/invisiblecaptchainstall_zoom70.png)

**How to check if Invisible CAPTCHA is currently installed**

Go to Imunify360 → Settings → General →Installation → Invisible CAPTCHA. The red Remove Invisible CAPTCHA button means that Invisible CAPTCHA is enabled.

![](/images/invisiblecaptchaenabled_zoom70.png)

**How to uninstall Invisible CAPTCHA**

Go to Imunify360 → Settings → General → Installation → Invisible CAPTCHA and click on Remove Invisible CAPTCHA button. Confirm the action in the pop-up.

![](/images/invisiblecaptcharemove_zoom70.png)


**KernelCare**

To install or uninstall KernelCare click on a button related. Please find additional information about Hardened PHP [here](https://www.cloudlinux.com/all-products/product-overview/kernelcare) .
**Note** . KernelCare is free on the servers with Imunify360 installed.

Click _Save changes_ button on the bottom of the section to save changes.

#### DoS Protection



DoS Protection section allows to enable or disable DoS protection. Tick checkbox _ Enable Dos Protection_ .
It is possible to configure how Imunify360 will behave:

_Max Connections_ - allows to setup the number of simultaneous connections allowed before IP will be blocked.
_Check delay_ - allows to setup period in seconds between each DoS detection system will be activated and will check a server for DoS attack.



Click _Save changes_ button on the bottom of the section to save changes.

#### Auto White List


 
Auto White List section allows to automatically add admin IP to the White List each time when he logs in to hosting panel and enters Imunify360 user interface.
In _Timeout_ field enter the number of minutes - the IP will be removed from the white list automatically after this time.
**Note ** 0 means adding IP to the White List permanently.
 

Click _Save changes_ button on the bottom of the section to save changes.

#### Incidents Logging


 
In this section it is possible to control what kind of incidents will be shown in the [Incidents page](/incidents/) .
Move the slider to change your preferences.


 
There are 15 available levels related to [OSSEC](http://ossec-docs.readthedocs.io/en/latest/manual/rules-decoders/rule-levels.html) and [ModSecurity](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual#severity) severity levels:

| |  | |
|-|--|-|
|Log level | ModSecurity | OSSEC|
|1 | 7 - DEBUG | 01 - None|
|2 | 6 - INFO | 02 - System low priority notification|
|3 | 5 - NOTICE | 03 - Successful/Authorized events|
|4 | 4 - WARNING | 04 - System low priority error|
|5 | 4 - WARNING | 05 - User generated error|
|6 | 3 - ERROR | 06 - Low relevance attack|
|7 | 3 - ERROR | 07 - “Bad word” matching.|
|8 | 3 - ERROR | 08 - First time seen|
|9 | 3 - ERROR | 09 - Error from invalid source|
|10 | 3 - ERROR | 10 - Multiple user generated errors|
|11 | 3 - ERROR | 11 - Integrity checking warning|
|12 | 2 - CRITICAL | 12 - High importancy event|
|13 | 2 - CRITICAL | 13 - Unusual error (high importance)|
|14 | 1 - ALERT | 14 - High importance security event.|
|15 | 0 - EMERGENCY | 15 - Severe attack|

Autocleanup configuration allows to keep the Incidents page clean by default. The possible settings are as follow:

_Keep incidents for the last days - _ set the number of days Imunify360 will keep the incidents.
_Keep maximum incidents count - _ set maximum quantity of the incidents to keep on the server.
_Auto-refresh time for Incidents page_ - set Incidents page auto-refresh time in seconds.

Click _Save changes_ button on the bottom of the section to save changes.

#### Error Reporting


 
Tick _Enable Sentry error reporting_ checkbox to send reports to Imunify360 error reports server.

 
Click _Save changes_ button on the bottom of the section to save changes.

### Malware


Go to _Imunify360 → Settings → Malware. _ Here you can configure General and Malware Cleanup (available starting with Imunify360 version 3.7.1 Beta) Settings.

**Note. ** _Read _

**General**

_Automatically scan all modified files_ - enables real-time scanning for modified files using [inotify](https://en.wikipedia.org/wiki/Inotify) library. The Scanner searches for modified files in user’s DocumentRoot directories. Note. It requires inotify to be installed and may put an additional load on a system.
_Automatically scan any file uploaded using web_ - enables real-time scanning of all the files that were uploaded via http/https. **Note** . It requires [ModSecurity](https://modsecurity.org/) to be installed.
_Automatically scan any file uploaded using ftp_ - enables real-time scanning of all the files that were uploaded via ftp. **Note** . It requires [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd) to be used as FTP service.
_Automatically send suspicious and malicious files for analysis_ —  malicious and suspicious files will be sent to the Imunify360 Team for analysis automatically.
_Try to restore from backup first_ - allows to restore file as soon as it was detected as malicious from backup if a clean copy exists. If a clean copy does not exist or it is outdated, default action will be applied. See also [CloudLinux Backup](/backups/) .
_Use backups not older than (days)_ - allows to set the a maximum age of a clean file.
_Default action on detect_ - configure Malware Scanner actions when detecting malicious activity.
Delete permanently.
Quarantine file in place.
Just display in dashboard.
Tick required checkboxes and click _Save changes_ button.

**Malware Cleanup**

_{Available starting with Imunify360 version 3.7.1 Beta}_

_Trim file instead of removal_ — do not remove infected file during cleanup but make the file zero-size (for malwares like web-shells);
_Keep original files for … days_ — the original infected file is available for restore within the defined period. Default is 14 days.
Click _Save changes_ button to apply all changes.

![](/images/malwarescannersettings_zoom70.png)

### Backups


**Note. Imunify360 beta version 2.7.0 and later required**
 
#### Content



[Overview](/overview/)
1.1. Requirements
[User Interface](/user_interface/)
2.1. How to enable backups
CloudLinux Backup
Acronis Backup
cPanel or Plesk Backup
2.2. How to disable backups
2.3. How to manage CloudLinux Backup
Manage backups
Change CloudLinux Backup storage size
Schedule CloudLinux Backup
2.4. How to restore file



#### Overview


Imunify360 provides customers with an ability to integrate with backup providers and automatically or manually restore files from their backup if they have become infected. Only administrator can choose backup provider but end user has an ability to backup and restore files within this selected backup provider.

The following integrated with Imunify360 backup providers are available:
CloudLinux Backup;
Hosting panel Backup (cPanel or Plesk);
Acronis Backup.

**Requirements**

Imunify360 version 2.7.0 and later.
For Acronis Backup, it is required to have Acronis account.
For hosting panel backup, it is required to configure backup option by the administrator of the hosting panel.


#### User Interface


This section describes the following:
how to [enable](/user_interface.htm#howtoenablebackups/) and [disable](/user_interface.htm#howtodisablebackups/) backups;
how to [manage](/user_interface.htm#howtomanageclbackup/) CloudLinux Backup;
how to [resize](/user_interface.htm#resizeclbackup/) CloudLinux Backup;
how to [schedule](/user_interface.htm#scheduleclbackup/) CloudLinux Backup;
how to [restore](/user_interface.htm#howtorestorefile/) files.

**How to enable backups**

To enable backups log in to a hosting panel as administrator, go to Imunify360 plugin and do the following.
Go to _Imunify360 → Settings → Backups_ . If the feature is not currently used the _Backup and restore_ is _Disabled_ . To enable it select backup provider from the dropdown.

Available providers:
[CloudLinux Backup](https://www.imunify360.com/cloudlinux-backup) ;
[Acronis Backup](https://www.acronis.com/en-eu/) ;
cPanel or Plesk Backup (according to user’s hosting panel).

![](/images/settingsbackup.png)

**CloudLinux Backup**

CloudLinux Backup option provides a customer with the most integrated with Imunify360 backup feature. It is powered by the Acronis technology, but you do not need to have an active Acronis account (if you have an existing Acronis account and would like to continue using it, [skip to the next section](/user_interface.htm#acronisbackup/) for choosing an Acronis Backup option).

CloudLinux Backup offers 10 GB of free storage space, and you can purchase additional space as needed.

With this backup and restore service, you can restore malicious or suspicious files from the backup if a clean version exists, schedule backups, see total and used storage space, and locate the data storage server. You can learn more about the CloudLinux Backup for Imunify360 [here](https://www.imunify360.com/cloudlinux-backup) .

To activate CloudLinux Backup follow the next simple steps:
Select _CloudLinux Backup_ in a dropdown.
Press the _Connect Backup_ button.
You will be redirected to the CloudLinux Network page which opens in a new tab. Please log in with existing CloudLinux Network (CLN) credentials otherwise create a new account.
On the purchase page, you can choose and purchase required size of the storage.
After successful payment, the installation will be in progress and you will see a Welcome Page with the follow-up instructions. Note, that installation can take up to 10 minutes depending on specific server size. You can use Imunify360 as usual during the installation process. Also, we will send an email with detailed information to the specified email address.
You can see the purchased storage space on the _Settings → Backups_ tab.
Imunify360 creates an initial backup of a current server. If all is OK the system returns successful message otherwise, please contact our support team.
You can see used and total storage space on the _Settings → Backups_ tab.

![](/images/backuprestorecloudlinux.png)

**Acronis Backup**

Choose it if you have Acronis account. So that Imunify360 can use backups to restore malicious or suspicious files from the backup if a clean version exists.

Select _Acronis Backup_ from the drop-down;
Enter _Acronis username_ and _password_ ;
Press the _Connect Backup_ button.

Imunify360 checks if Acronis agent is already installed. If not, Imunify360 installs it. Then Imunify360 checks, if a backup of entire server exists, if not, Imunify360 creates a backup of a current server. If all is OK the system returns successful message.

![](/images/acronisbackup.png)

**cPanel or Plesk Backup**

Choose cPanel/Plesk backup.
Select _cPanel/Plesk Backup_ ;
Press the _ Connect Backup_ button.

![](/images/backuprestorecpanel.png)
After successful connection, Imunify360 will return an appropriate message.

**How to disable backups**

To disable backups do the following:
Go to _Imunify360 → Settings → Backups_ .
Move the slider to _Disabled_ .
Imunify360 returns confirmation window.
Click on _Yes, disable backup_ to disable backups or press Cancel to close the window. Note, that if you use CloudLinux Backup your backup will be still active in CloudLinux Network (CLN). To disable backup totally and terminate billing, please log in to [CLN](https://cln.cloudlinux.com/clweb/login.xhtml) and deactivate CloudLinux Backup manually on the current server.

![](/images/disablebackup.png)

**How to manage CloudLinux Backup**

Go to _ Imunify360 → Settings → Backups_ . The following actions are available:
[Disable](/user_interface.htm#howtodisablebackups/) backups feature;
[Manage](/user_interface.htm#howtomanageclbackup/) CloudLinux Backup;
[Change](/user_interface.htm#resizeclbackup/) CloudLinux Backup storage size;
[Schedule](/user_interface.htm#scheduleclbackup/) CloudLinux Backup.

**Manage CloudLinux Backup**

Press the _Manage Backups_ button. You will be redirected to the _Backup Management Console_ . The console opens in a new tab in the browser. Please go to [documentation](https://www.acronis.com/en-us/support/documentation/BackupService/index.html#33836.html) to find out more information.
![](/images/managebackups.png)

**Change CloudLinux Backup storage size**

Click on _Resize_ link. You will be redirected to the CloudLinux Network where you can add or remove storage space.
![](/images/resize.png)

After successful payment, the backup storage size will be increased. Imunify360 creates an initial backup of a current server if it was not done before or it just increases the storage size.
On the _Settings → Backups_ tab you can see the actual and used amount of backup storage in GB.
If you get an error message, please follow the instructions in the message or [contact our support team](https://cloudlinux.zendesk.com/hc/requests/new) .

**Schedule CloudLinux Backup**

Press the _Manage Backups_ button. You will be redirected to the _Backup Management Console_ (read the documentation [here](https://www.acronis.com/en-us/support/documentation/BackupService/index.html#33507.html) ). When a schedule is set it is displayed on the _Backups_ tab.

**How to restore file**

To restore a file do the following:

Go to _ Imunify360 → Malware Scanner._
Find the file to restore in the table and click on _cog_ icon then click _Try to restore clean version from backup_ .
In the pop-up confirm the action by clicking _Yes, restore from backup_ or click _Cancel_ .

You can configure the automatic restore. Please find more details [here](/malware/) .


### Disabled Rules


Go to _Settings_ page and choose _Disabled rules_ . This page allows user to manage disabled rules which have already been added.

**Note** . _You can also add a new rule to the Disabled rules list on _

The list of disabled rules contains:

_Rule ID_ —  ID number of the rule provided by the plugin;
_Plugin_ —  the name of the firewall plugin of the added rule;
_Description_ — rule description or details of the rule from ModSecurity or OSSEC;
_Domains_ —  the list of the domains for which the rule is disabled (blank field means all domains).

To add a new rule click _Add Rule_ button.

![](/images/disabledrulesaddbutton_zoom70.png)

In the pop-up specify the following:

_Rule ID_ — ID provided by firewall plugin;
Select firewall plugin from the drop-down (ossec for OSSEC, modsec for ModSecurity);
_Description_ — rule  description or details from ModSecurity or OSSEC;
_Domains_ — this option is available only for modsec firewall plugin. Specify comma-separated list of domains for which this rule will be disabled. Leave empty to disable for all domains.
Click _Add Rule_ to add rule to the list or _Cancel_ to close the pop-up.

![](/images/addrule_zoom90.png)

To edit the list of domains where the rule should be disabled, click edit icon in the row of the rule and enter domains registered on the server separated by comma.

**Note** . _It is possible to specify domains only for ModSecurity rules. For OSSEC rules it is always applies to all domains._

![](/images/disabledruleseditbutton_zoom70.png)

To remove the rule from disabled list click _Enable_ and confirm action in the pop-up.

![](/images/disabledrulesenablepopup_zoom60.png)

### Attributions


Click _Settings_ and choose _Attributions_ tab to observe a list of [IDS](/terminology/) install on the server.

_Name_ - name of the IDS.
_Version_ - IDS version.
_License_ - under which licenses this IDS is working.
_Link_ - URL to the IDS official page.

![](/images/pfattr.jpg)

**Hosting panels specific settings**

_cPanel_

It is possible to enable Service Status checker for Imunify360. Perform the following steps:

Go to Service Configuration and choose Service Manager.

In Additional Services section tick imunify360-agent and imunify360-captcha checkboxes.

Click Save and wait until cPanel enables the Service Status checker for Imunify360.

![](/images/cpanel.jpg)

If succeeded, the status of Imunify360 service will be displayed at Service Status section of Server Status.

![](/images/service_status.jpg)



