# Node.js Selector


[Overview & Requirements](/node_js_selector/#overview-requirements)
[Requirements](/overview__requirements.html#requirements/)
[Installation](/node_js_selector/#installation)
[Command Line Interface](/node_js_selector/#command-line-interface)
[Hoster](/command_line_interface2.html#hoster/)
[End User](/command_line_interface2.html#enduser/)
[User Interface](/node_js_selector/#user-interface)
[Hoster](/user_interface.html#hoster/)
[How to enable/disable Node.js](/user_interface.html#howtoenabledisablenodejs/)
[How to manage Node.js](/user_interface.html#howtomanagenodejs/)
[Applications column](/user_interface.html#applicationscolumn/)
[End User](/user_interface.html#enduser/)
[How to manage application](/user_interface.html#howtomanageapplication/)
[Node.js Deployment](/node_js_selector/#node-js-deployment)
[Remote Usage of Node.js Interpreters](/node_js_selector/#remote-usage-of-node-js-interpreters)
[Remote Usage of the cloudlinux-selector Utility](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility)


## Overview & Requirements


<span class="notranslate"> Node.js Selector <span class="notranslate">  is a CloudLinux component that allows each user to easily create Node.js applications, choose Node.js version and other parameters for applications based on their needs. </span> </span>



<span class="notranslate"> Node.js Selector <span class="notranslate">  supports Node.js versions 6.x, 8.x, 9.x and later. </span> </span>
This feature is available for CloudLinux 7, <span class="notranslate"> CloudLinux 6 hybrid <span class="notranslate">  and CloudLinux 6. </span> </span>
<span class="notranslate"> Node.js Selector <span class="notranslate">  requires  <span class="notranslate"> LVE Manager 4.0 <span class="notranslate">  or later. </span> </span> </span> </span>
It supports cPanel and DirectAdmin servers (Plesk is not supported as it already has Node.js support.) For more details, please go to Plesk & Node.js documentation [here](https://www.plesk.com/blog/product-technology/node-js-plesk-onyx/) and [here](https://docs.plesk.com/en-US/onyx/administrator-guide/website-management/nodejs-support.76652/) .
For more details about <span class="notranslate"> mod_passenger <span class="notranslate">  and Node.js, please read documentation  [here](https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/)  and  [here](https://www.phusionpassenger.com/library/walkthroughs/deploy/nodejs/ownserver/apache/oss/el7/deploy_app.html) . </span> </span>
<span class="notranslate"> Node.js Selector <span class="notranslate">  is working with EasyApache 3 and EasyApache 4. </span> </span>


## Installation




To use Node.js Selector, please install Node.js packages by running the following command:

```
yum groupinstall alt-nodejs6 alt-nodejs8 alt-nodejs9
```

Also, please install LVE Manager, LVE Utils and Fusion Passenger by running the following command:

```
yum install lvemanager lve-utils ea-apache24-mod-alt-passenger
```

For EasyApache 3:

```
yum install lvemanager lve-utils alt-mod-passenger
```

And we recommend to install CageFS for better security (not mandatory) by running the following command:

```
yum install cagefs
```







CloudLinux 7:

```
systemctl restart cpanel.service
```

CloudLinux 6:

```
service cpanel restart
```


To use Node.js Selector, please install Node.js packages by running the following command:

```
yum groupinstall alt-nodejs6 alt-nodejs8 alt-nodejs9
```

Also, please install LVE Manager, LVE Utils and Fusion Passenger by running the following command:

```
yum install lvemanager lve-utils alt-mod-passenger
```

And we recommend to install CageFS for better security (not mandatory) by running the following command:

```
yum install cagefs
```

## Command Line Interface


Below is a list of commands hoster and end user can run in a command line.

Get information related to Node.js: default version, list of supported versions, status of <span class="notranslate"> Node.js Selector </span> , list of users, their applications, etc:
<span class="notranslate"> </span>
```
cloudlinux-selector [get] [--json] --interpreter nodejs
```


<span class="notranslate"> JSON </span> output for <span class="notranslate"> _get_ </span> command:
<span class="notranslate"> </span>
```
{  "selector_enabled": true | false,   "default_version": "6.11.3",   "result": "success",   "timestamp": 1508667174.220027  "cache_status": "ready"         //  or “updating” during automatic yum cache rebuild  "available_versions": {   //  begin of  “versions”      "6.11.3" : {   //   begin of version "6.11.3"                  "name_modifier": "",                   "status": "enabled",  //  enabled, disabled, not_installed, installing, removing                  “base_dir”: “/opt/alt/alt-nodejs6”   //  empty when version is not installed                  “users”: {   //  begin of  “users”                      “user1”: {   //  begin of “user1”“homedir”: “/home/user1”,                                         “applications”: {    //  begin of “applications”                             “apps_dir/app1” : {   //   begin of application “apps_dir/app1”                                 “domain”: “cltest1.com”,                                 “app_uri”: “apps/my-app1”,                                         “app_mode” : “development”,                                 “startup_file” : “app.js”,                                 “app_status” : “started”,   // ‘started’ or ‘stopped’                                 “config_files” : [                                     “package.json”,                                     “gruntfile.js”                                 ],                                 “env_vars” : {                                     “var1” : “value1”,                                     “var2” : “value2”                                 },                             },   // end of application “apps_dir/app1”                             “apps_dir/app2” : {    //   begin of application “apps_dir/app2”                                  << data for application “apps_dir/app2”  (same structure as for application “apps_dir/app1” above) >>                             },   //  end of application “apps_dir/app2”                         },   //  end of “applications”                      },   //  end of “user1”                      “user2”: {   //  begin of “user2”                          << data for user “user2”  (same structure as for “user1” above) >>                      },   //  end of “user2”                  },   // end of “users”                },    //  end of version “6.11.3”              "8.21.5" : {   //   begin of version "8.21.5"                    << data for version "8.21.5"  (same structure as for version “6.11.3” above) >>                },    //  end of version “8.21.5”            },    //  end of “versions”}   //   end of json
```


Set default version, supported versions, and status of <span class="notranslate"> Node.js Selector </span> :
<span class="notranslate"> </span>
```
cloudlinux-selector set [--json] --interpreter nodejs (--selector-status <enabled,disabled> | --default-version <str> | --supported-versions <str>)
```

**Note** that <span class="notranslate"> Node.js Selector </span> is disabled by default. If an available Node.js version is not installed <span class="notranslate"> Node.js Selector </span> is always disabled and it is impossible to enable it.

To set default Node.js version, please use the following command (note that required Node.js version should be enabled):
 <span class="notranslate"> </span>
```
cloudlinux-selector set --json --interpreter=nodejs --default-version=<ver>
```

**Examples** :
This command enables <span class="notranslate"> Node.js Selector </span> :

<span class="notranslate"> </span>
```
cloudlinux-selector set --json --interpreter nodejs --selector-status enabled
```


This command sets default Node.js version as 6:

<span class="notranslate"> </span>
```
cloudlinux-selector set --json --interpreter nodejs --default-version 6
```

This command sets supported Node.js version as 8:
<span class="notranslate"> </span>
```
cloudlinux-selector set --json --interpreter nodejs --supported-versions='{"6": false, "8": true}'
```

Install required Node.js version:
<span class="notranslate"> </span>
```
cloudlinux-selector install-version --json --interpreter nodejs --version 8
```

Uninstall required Node.js version:
<span class="notranslate"> </span>
```
cloudlinux-selector uninstall-version --json --interpreter nodejs --version 8
```

Enable required Node.js version:
<span class="notranslate"> </span>
```
cloudlinux-selector enable-version --json --interpreter nodejs --version 8
```

Disable required Node.js version (note that it is impossible to disable default Node.js version):
<span class="notranslate"> </span>
```
cloudlinux-selector disable-version --json --interpreter nodejs --version 8
```

Change version for application(s):
<span class="notranslate"> </span>
```
cloudlinux-selector set [--json] --interpreter nodejs ((--user <str> |  --domain <str>) --app-root <str> | --from-version <str>) --new-version <str>
```

**Examples** :
This command changes version for the specific application:
<span class="notranslate"> </span>
```
cloudlinux-selector set --json --interpreter nodejs --user user1 --app-root apps_dir/app1 --new-version 8
```

Common output for all <span class="notranslate"> _set_ </span> commands:

**_in case of success_** :
<span class="notranslate"> </span>
```
{  "result": "success",   "timestamp": 1508666792.863358}
```

**_in case of error:_**
<span class="notranslate"> </span>
```
{  "result": "Some error message",  "details" : "Traceback: ..." ,  "context": {},  "timestamp": 1508666792.863358}
```

**_in case of warning:_**
<span class="notranslate"> </span>
```
{  "result": "success",  "warning" : "Some warning message" ,  "context": {},  "timestamp": 1508666792.863358}
```

To resolve issues related to <span class="notranslate"> _install-version/uninstall-version_ </span> commands (because they are running in the background) you may use this log file <span class="notranslate"> _/var/log/cl-nodejs-last-yum.log_ </span>
It contains full <span class="notranslate"> _yum_ </span> output from the <span class="notranslate"> **_latest_** </span> performed operation (install or uninstall) and it will be rewritten with each operation.







Get config file for the user applications

<span class="notranslate"> </span>
```
cloudlinux-selector read-config [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)] --app-root <str> --config-file <name>
```

<span class="notranslate"> JSON </span> output:
<span class="notranslate"> </span>
```
{          "result": "success",         "timestamp": 1508666792.863358           "data": "content of config file as Base64 encoded string"}
```

**Example** :

This command gets config file for <span class="notranslate"> user1 </span> ’s application <span class="notranslate"> app1 </span> :
<span class="notranslate"> </span>
```
cloudlinux-selector read-config --json --interpreter nodejs  --user user1 --app-root app_dir/app1 --config-file package.json
```

Save config file for the user applications
<span class="notranslate"> </span>
```
cloudlinux-selector save-config [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str> --config-file <path> --content <content of config file as Base64 encoded string>
```

<span class="notranslate"> JSON </span> output (the same as for all <span class="notranslate"> _set_ </span> commands):
<span class="notranslate"> </span>
```
{          "result": "success",           "timestamp": 1508666792.863358}
```


**Example** :
This command saves config file for <span class="notranslate"> user1 </span> ’s application <span class="notranslate"> app1 </span> :
=
<span class="notranslate"> </span>
```
cloudlinux-selector save-config --json --interpreter nodejs  --user user1 --app-root app_dir/app1 --config-file package.json  --content                                         VGh1ICAyIE5vdiAxMDo0MzoxMiBFRFQgMjAxNwo=
```

Get a list of applications for the specific user
<span class="notranslate"> </span>
```
cloudlinux-selector [get] [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)]
```


**Example** :
This command gets a list of applications for the <span class="notranslate"> user1 </span> :
<span class="notranslate"> </span>
```
cloudlinux-selector get --json --interpreter nodejs  --user user1
```

Create user application

<span class="notranslate"> </span>
```
cloudlinux-selector create [--json] --interpreter nodejs [(--user <str> | --domain <str>)] --app-root <str> --app-uri <str> [--version <str>] [--app-mode <str>] [--startup-file <str>] [--env-vars <json string>]
```

**Example** :
This command creates <span class="notranslate"> user1 </span> 's application for the domain <span class="notranslate"> xyz.com </span> :
<span class="notranslate"> </span>
```
cloudlinux-selector create --json --interpreter nodejs --user user1 --app-root my_apps/app1 --app-uri apps/app1
```

or
<span class="notranslate"> </span>
```
cloudlinux-selector create --json --interpreter nodejs --app-root my_apps/app1 --domain xyz.com --app-uri apps/app1
```

Start, restart, stop, and destroy user application
<span class="notranslate"> </span>
```
cloudlinux-selector (start | restart | stop | destroy) [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str>
```


**Example** :
This command starts <span class="notranslate"> user1 </span> 's application:
<span class="notranslate"> </span>
```
cloudlinux-selector start --json --interpreter nodejs --user user1 --app-root my_apps/app1
```

Change properties for an application

```

```


**Example 1** :
This command sets a production mode, new domain <span class="notranslate"> new.xyz.com </span> , new Node.js version 8, new <span class="notranslate"> URI </span> , new application <span class="notranslate"> root </span> directory and new startup file for <span class="notranslate"> user1 </span> application located on the domain <span class="notranslate"> xyz.com </span> :
<span class="notranslate"> </span>
```
cloudlinux-selector set --json --interpreter nodejs  --user user1 --app-root my_apps/app1 --mode production  --new-app-root new_apps/new_app1  --new-domain new.xyz.com --new-app-uri new_apps/app1  --new-version 8  --startup-file new_app.js --env-vars '{ "var1" : "value1", "var2" : "value2" }'
```

**Example 2** :
<span class="notranslate"> </span>
```
cloudlinux-selector set --json --interpreter nodejs  --domain xyz.com --app-root my_apps/app1 --mode production  --new-app-root new_apps/new_app1  --new-domain new.xyz.com --new-app-uri new_apps/app1  --new-version 8  --startup-file new_app.js --env-vars '{ "var1" : "value1", "var2" : "value2" }'
```






Run <span class="notranslate"> _npm install_ </span> command for the user application
<span class="notranslate"> </span>
```
cloudlinux-selector install-modules [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)] --app-root <str>
```

**Example** :
This command runs _ _ <span class="notranslate"> npm install </span> _ _ for <span class="notranslate"> user1 </span> application:

<span class="notranslate"> </span>
```
cloudlinux-selector install-modules --json --interpreter nodejs --user user1 --app-root my_apps/app
```





Run a script from <span class="notranslate"> package.json </span> file of a user application, arguments <span class="notranslate"> &lt;args&gt;> </span> are passed to the script
<span class="notranslate"> </span>
```
cloudlinux-selector run-script [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str> --script-name <str> [-- <args>...]
```

**Example** :
<span class="notranslate"> </span>
```
cloudlinux-selector run-script --json --interpreter nodejs --user user1 --app-root my_apps/app --script-name test_script -- --script_opt1 --script_opt2 script_arg1 script_arg2
```

<span class="notranslate"> JSON </span> output:

<span class="notranslate"> </span>
```
{          "result": "success",           "timestamp": 1508666792.863358           "data": "script output as Base64 encoded string"}
```

Activate virtual environment of NodeJS:
<span class="notranslate"> </span>
```
source <home_of_user>/nodevenv/<app_root>/<nodejs_version>/bin/activate
```


This command changes prompt to
**Example** :
<span class="notranslate"> </span>
```
[newusr@192-168-245-108 ~]$ source /home/newusr/nodevenv/newapp4/newapp3/8/bin/activate[newapp4/newapp3 (8)] [newusr@192-168-245-108 ~]$
```


After ativation user can use <span class="notranslate"> _npm_ </span> and node from a virtual environment without full paths.


## User Interface



Hoster interface allows to enable and disable Node.js, and manage individual Node.js versions.

Go to <span class="notranslate"> _LVE Manager → Options Tab → Node.js Section_ </span> . A list of installed Node.js versions is displayed. There are several columns in the list.

<span class="notranslate"> Version </span> — displays Node.js version.
<span class="notranslate"> Path </span> — Node.js package location.
<span class="notranslate"> Applications </span> — number of applications that use this Node.js version. Click on a digit to go to the list of applications.
<span class="notranslate"> Enabled </span> — displays if particular Node.js version is enabled.
<span class="notranslate"> Actions </span> — allows to install, delete, and make default a particular Node.js version.
To display all changes immediately click <span class="notranslate"> _Refresh_ </span> link.

![](/images/nodejsgeneral_zoom70.png)



To enable Node.js move a slider to <span class="notranslate"> _Enable_ </span> .
To disable Node.js move a slider back to <span class="notranslate"> _Disable_ </span> . 




![](/images/nodejsslider_zoom70.png)






![](/images/nodejsselectorlogo_zoom70.png)


The list of installed Node.js versions allows to enable and disable, install and delete, and set a particular Node.js version as a default.

**Enable and disable particular Node.js version**

To enable particular Node.js version do the following:
Move a disabled slider in the <span class="notranslate"> _Enabled_ </span> column for a particular Node.js version.
In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

![](/images/nodejsenable_zoom70.png)

To disable particular Node.js version do the following:
Move an enabled slider in the <span class="notranslate"> _Enabled_ </span> column for a particular Node.js version.
In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

**Install and delete particular Node.js version**

To install particular Node.js version do the following:
Click <span class="notranslate"> _Install_ </span> button in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.

To delete particular Node.js version do the following:
Click <span class="notranslate"> _Bin_ </span> icon in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to start uninstall process.
Or close a pop-up without changes.

**Note that it is impossible** :
to remove default Node.js version;
to remove version with applications;
to install or remove version if another installation/uninstall process is running.

![](/images/nodejsconfirmation_zoom70.png)

**Make a particular Node.js version as a default**

To make a particular Node.js version as a default do the following:
Click <span class="notranslate"> _Double-Tick_ </span> icon in the <span class="notranslate"> _Actions_ </span> column for a particular Node.js version.
In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to save changes or <span class="notranslate"> _Cancel_ </span> to close pop-up.






![](/images/nodejsmakedefault_zoom70.png)



To view and operate with the list of domains with Node.js versions click on a number in the <span class="notranslate"> _Applications_ </span> column for a particular Node.js version. A section with a list of Domains for particular Node.js version will be displayed.

![](/images/nodejsselectordomains_zoom70.png)

Domains are displayed by three. To load more domains click on <span class="notranslate"> _Load More_ </span> button.


To change Node.js version for a particular application do the following:
Click <span class="notranslate"> _Double-Arrow_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row. A confirmation pop-up will be displayed.
In the pop-up choose Node.js version from a drop-down.
Click <span class="notranslate"> _Change_ </span> to confirm the action or <span class="notranslate"> _Cancel_ </span> to close the pop-up.
To refresh state of applications in current version you can click <span class="notranslate"> _Refresh_ </span> link. 





**Note** that <span class="notranslate"> Node.js Selector </span> icon in end user interface is absent when Node.js is disabled.

![](/images/nodejslogoenduser_zoom70.png)

End User interface allows end users to setup and manage Node.js for their web applications.
Go to <span class="notranslate"> _cPanel → Software Section → Select Node.js Version_ </span> .

<span class="notranslate"> _Web Applications_ </span> page is displayed.

![](/images/nodejsusermain_zoom70.png)

There are several columns in the list.
<span class="notranslate"> App URI </span> — application URI including the domain.
<span class="notranslate"> App Root Directory </span> —  application root directory relative to user's home.
<span class="notranslate"> Mode </span> — can be production or development.
<span class="notranslate"> Status </span> — started/stopped — displays if an application is running or not and version of application.
<span class="notranslate"> Actions </span> — allows to start, restart, stop, edit, and remove a particular application.


**Start application**

To start a stopped application do the following:
Click <span class="notranslate"> _Start_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a stopped application row.
When an action is completed a <span class="notranslate"> _Start_ </span> icon changes to <span class="notranslate"> _Stop_ </span> icon.

**Stop application**

To stop a started application do the following:
Click <span class="notranslate"> _Stop_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a started application row.
When an action is completed a <span class="notranslate"> _Stop_ </span> icon changes to <span class="notranslate"> _Start_ </span> icon.

![](/images/nodejsuseruistartstop_zoom70.png)

**Restart application**

To restart started application do the following:
Click <span class="notranslate"> _Restart_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a started application row. A current row is blocked and when a process is completed it will be unblocked.

**Remove application**

To remove application do the following:
Click <span class="notranslate"> _Bin_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row.
In the confirmation pop-up click <span class="notranslate"> _Agree_ </span> to start removing or <span class="notranslate"> _Cancel_ </span> to close pop-up.
When an action is completed an application will be removed from the <span class="notranslate"> _Web Applications_ </span> table and a confirmation pop-up will be displayed.

![](/images/nodejsuseruirestartremove_zoom70.png)

**Edit application**

To edit application do the following:
Click <span class="notranslate"> _Pencil_ </span> icon in the <span class="notranslate"> _Actions_ </span> column in a particular application row. A particular application tab opens.

![](/images/nodejseditapp_zoom70.png)

The following actions are available:
Restart application — click <span class="notranslate"> _Restart_ </span> button.
Stop Node.js — click <span class="notranslate"> _Stop Node.js_ </span> button.
Run JavaScript script — click <span class="notranslate"> _Run JS Script_ </span> button to run a command specified in the <span class="notranslate"> Scripts </span> section of the package.json file. Specify the name of the script to run plus any parameters then click <span class="notranslate"> Ok </span> .
Remove application — click <span class="notranslate"> _Delete_ </span> button and confirm the action in a pop-up.
Change Node.js version — choose Node.js version from a drop-down.
Change Application mode — choose application mode from a drop-down. Available modes are <span class="notranslate"> _Production_ </span> and <span class="notranslate"> _Development_ </span> .
Specify Application root — specify in a field a physical address to the application on a server that corresponds with its URI.
Specify Application URL — specify in a field an HTTP/HTTPS link to the application.
Specify Application startup file — specify as <span class="notranslate"> NAME.js file </span> .
Run npm install command — click <span class="notranslate"> _Run npm install_ </span> button to install the package(s) described in the <span class="notranslate"> package.json </span> file.
Add Environment variables — click <span class="notranslate"> _Add Variable_ </span> and specify a name and a value.



## Node.js Deployment


The first approach - [remote usage of Node.js Interpreters of different versions](/node_js_selector/#remote-usage-of-node-js-interpreters) .
The second approach - [remote usage of the ](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility) <span class="notranslate"> [cloudlinux-selector utility](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility) </span> .

### Remote Usage of Node.js Interpreters


1. Create a Node.js project in <span class="notranslate"> IntelliJ IDEA/WebStorm </span> . You can download [this archive](http://docs.cloudlinux.com/nodejs_example.zip) and use it as a basis.
2. Install <span class="notranslate"> alt-nodejs </span> packages on the server in use. See [installation instructions](/node_js_selector/#installation) .
3. Create an application on the server. You can do it by three ways:
Via UI of the Node.js plugin.
Using the following command to create an application:
<span class="notranslate"> </span>
```
cloudlinux-selector create --interprete=nodejs --json --app-root=<USER_NAME> --app-uri=<APP_NAME> --app-mode=develompent --version=<VERSION> --domain=<DOMAIN>
```
  




![](/images/createapp_zoom70.png)

Choose a location of the application on the server and synchronize the files with the <span class="notranslate"> IntelliJ IDEA </span> project.
4. Set up <span class="notranslate"> Run/Debug Configurations </span> in the project created.

![](/images/setconfiguration_zoom70.png)

Specify a path to the remote Node.js interpreter. To be able to specify the remote interpreter, you should install the <span class="notranslate"> _Node.js Remote Interpreter_ </span> plugin first. Please find more information [here](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html) , using server access credentials for a user <span class="notranslate"> (Main menu — Run — Edit configurations...) </span> .
Specify initial _JavaScript file_ that will be run with the <span class="notranslate"> _node_ </span> command (it is the _app.js_ file from the archive).
Specify <span class="notranslate"> _Path Mappings_ </span> between a local and a remote project <span class="notranslate"> (Preferences — Deployments — Add) </span> . If you have created your application with the <span class="notranslate"> _cloudlinux-selector utility_ </span> or via plugin UI the <span class="notranslate"> _Path Mappings_ </span> should be as follows:
<span class="notranslate"> </span>
```
/home/<USER_NAME>/<APP_NAME>
```

5. Synchronize the project directories on the local and the remote machine as per <span class="notranslate"> _Path Mappings_ </span> specified.
6. Deploy the modules on the remote and the local machine with the <span class="notranslate"> **_npm install_** </span> command (if there are dependent modules). In the UI you can click the <span class="notranslate"> _Run NPM Install_ </span> button.
7. Run Node.js application with the configuration set at the [4th step](/remote_usage_of_node_js_interp.html#setuprundebugconfigurations/)  <span class="notranslate"> (Main menu — Run — Run… — Select configuration) </span> .

![](/images/runapp_zoom60.png)

8. If you are using the application from the archive attached, you can see the running application on the 3003 port — <span class="notranslate"> _http://DOMAIN:3003_ . </span>

**Note.** The port should be available to a server user.

![](/images/runningappdomain_zoom70.png)

The following information should be displayed on this page:
A version of the running Node.js interpreter;
Current environment variables;
A current time.
So that, you can be sure that deployed modules are used properly.

If you’d like to use a different version of Node.js to run an application, change a path to the interpreter in the configuration settings of the running.
To apply all changes to the project, synchronize all changes with the server and restart the running application.

9. To debug a script, set breakpoints in the code and run the configuration via Main Menu <span class="notranslate"> (Main menu — Run — Debug… — Select configuration) </span> .

Useful links:
<span class="notranslate"> IntelliJ IDEA </span> : [https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html)
Plugin <span class="notranslate"> _Node.js Remote Interpreter_ </span> : [https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter](https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter)
<span class="notranslate"> WebStorm </span> : [https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html)

**Note.** It is not required to install <span class="notranslate"> _Passenger_ </span> while working in <span class="notranslate"> IDE </span> if you are using this approach.


### Remote Usage of the cloudlinux-selector Utility


Create an application via UI or with the command as described in the Remote Usage of Node.js Interpreters approach, [step 3 (a,b)](/remote_usage_of_node_js_interp.html#createapplication/) .
2. Set up project mapping on the local machine with the created remote application _ _ <span class="notranslate"> /home/<USER_NAME>/<APP_NAME> </span> _ (Preferences → Deployments → Add)_ .
3. Set up the remote commands of the <span class="notranslate"> cloudlinux-selector (Preferences → Remote SSH External Tools → Add) </span> for the following actions:
Restart application;
Install packages;
Run script;
Change Node.js version for the application.
You can see the running app at <span class="notranslate"> http://DOMAIN/APPLICATION_URL </span>
To apply all changes, restart the application.


