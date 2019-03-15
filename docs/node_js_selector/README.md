# Node.js Selector


[Overview & Requirements](/node_js_selector/#overview-requirements)
[Requirements](/overview__requirements.html#requirements/)
[Installation](/node_js_selector/#installation)
[Command Line Interface](/node_js_selector/#command-line-interface)
[Hoster](/command_line_interface2.html#hoster/)
[End User](/command_line_interface2.html#enduser/)
[User Interface](/node_js_selector/#user-interface)
[Hoster](/user_interface.html#hoster/)
`o` [How to enable/disable Node.js](/user_interface.html#howtoenabledisablenodejs/)
`o` [How to manage Node.js](/user_interface.html#howtomanagenodejs/)
`o` [Applications column](/user_interface.html#applicationscolumn/)
[End User](/user_interface.html#enduser/)
`o` [How to manage application](/user_interface.html#howtomanageapplication/)
[Node.js Deployment](/node_js_selector/#node-js-deployment)
`o` [Remote Usage of Node.js Interpreters](/node_js_selector/#remote-usage-of-node-js-interpreters)
`o` [Remote Usage of the cloudlinux-selector Utility](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility)


## Overview & Requirements







This feature is available for CloudLinux 7,

It supports cPanel and DirectAdmin servers (Plesk is not supported as it already has Node.js support.) For more details, please go to Plesk & Node.js documentation [here](https://www.plesk.com/blog/product-technology/node-js-plesk-onyx/) and [here](https://docs.plesk.com/en-US/onyx/administrator-guide/website-management/nodejs-support.76652/) .
For more details about



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

Get information related to Node.js: default version, list of supported versions, status of , list of users, their applications, etc:

```
cloudlinux-selector [get] [--json] --interpreter nodejs
```


output for command:

```
{
  "selector_enabled": true | false, 
  "default_version": "6.11.3", 
  "result": "success", 
  "timestamp": 1508667174.220027
  "cache_status": "ready"         //  or “updating” during automatic yum cache rebuild
  "available_versions": {   //  begin of  “versions”
      "6.11.3" : {   //   begin of version "6.11.3"
                  "name_modifier": "", 
                  "status": "enabled",  //  enabled, disabled, not_installed, installing, removing
                  “base_dir”: “/opt/alt/alt-nodejs6”   //  empty when version is not installed
                  “users”: {   //  begin of  “users”
 
                     “user1”: {   //  begin of “user1”
“homedir”: “/home/user1”,                
                         “applications”: {    //  begin of “applications”
                             “apps_dir/app1” : {   //   begin of application “apps_dir/app1”
                                 “domain”: “cltest1.com”,
                                 “app_uri”: “apps/my-app1”,
                                         “app_mode” : “development”,
                                 “startup_file” : “app.js”,
                                 “app_status” : “started”,   // ‘started’ or ‘stopped’
                                 “config_files” : [
                                     “package.json”,
                                     “gruntfile.js”
                                 ],
                                 “env_vars” : {
                                     “var1” : “value1”,
                                     “var2” : “value2”
                                 },
                             },   // end of application “apps_dir/app1”
                             “apps_dir/app2” : {    //   begin of application “apps_dir/app2”
                                  << data for application “apps_dir/app2”  (same structure as for application “apps_dir/app1” above) >>
                             },   //  end of application “apps_dir/app2”
                         },   //  end of “applications”
                      },   //  end of “user1”
                      “user2”: {   //  begin of “user2”
                          << data for user “user2”  (same structure as for “user1” above) >>
                      },   //  end of “user2”
                  },   // end of “users”
                },    //  end of version “6.11.3”
              "8.21.5" : {   //   begin of version "8.21.5"
                    << data for version "8.21.5"  (same structure as for version “6.11.3” above) >>
                },    //  end of version “8.21.5”
            },    //  end of “versions”
}   //   end of json
```


Set default version, supported versions, and status of :

```
cloudlinux-selector set [--json] --interpreter nodejs (--selector-status <enabled,disabled> | --default-version <str> | --supported-versions <str>)
```

**Note** that is disabled by default. If an available Node.js version is not installed is always disabled and it is impossible to enable it.

To set default Node.js version, please use the following command (note that required Node.js version should be enabled):

```
cloudlinux-selector set --json --interpreter=nodejs --default-version=<ver>
```

**Examples** :
This command enables :


```
cloudlinux-selector set --json --interpreter nodejs --selector-status enabled
```


This command sets default Node.js version as 6:


```
cloudlinux-selector set --json --interpreter nodejs --default-version 6
```

This command sets supported Node.js version as 8:

```
cloudlinux-selector set --json --interpreter nodejs --supported-versions='{"6": false, "8": true}'
```

Install required Node.js version:

```
cloudlinux-selector install-version --json --interpreter nodejs --version 8
```

Uninstall required Node.js version:

```
cloudlinux-selector uninstall-version --json --interpreter nodejs --version 8
```

Enable required Node.js version:

```
cloudlinux-selector enable-version --json --interpreter nodejs --version 8
```

Disable required Node.js version (note that it is impossible to disable default Node.js version):

```
cloudlinux-selector disable-version --json --interpreter nodejs --version 8
```

Change version for application(s):

```
cloudlinux-selector set [--json] --interpreter nodejs ((--user <str> |  --domain <str>) --app-root <str> | --from-version <str>) --new-version <str>
```

**Examples** :
This command changes version for the specific application:

```
cloudlinux-selector set --json --interpreter nodejs --user user1 --app-root apps_dir/app1 --new-version 8
```

Common output for all commands:

**_in case of success_** :

```
{
  "result": "success", 
  "timestamp": 1508666792.863358
}
```

**_in case of error:_**

```
{
  "result": "Some error message",
  "details" : "Traceback: ..." ,
  "context": {},
  "timestamp": 1508666792.863358
}
```

**_in case of warning:_**

```
{
  "result": "success",
  "warning" : "Some warning message" ,
  "context": {},
  "timestamp": 1508666792.863358
}
```

To resolve issues related to commands (because they are running in the background) you may use this log file
It contains full output from the performed operation (install or uninstall) and it will be rewritten with each operation.







Get config file for the user applications


```
cloudlinux-selector read-config [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)] --app-root <str> --config-file <name>
```

output:

```
{
          "result": "success",
         "timestamp": 1508666792.863358
           "data": "content of config file as Base64 encoded string"
}
```

**Example** :

This command gets config file for ’s application :

```
cloudlinux-selector read-config --json --interpreter nodejs  --user user1 --app-root app_dir/app1 --config-file package.json
```

Save config file for the user applications

```
cloudlinux-selector save-config [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str> --config-file <path> --content <content of config file as Base64 encoded string>
```

output (the same as for all commands):

```
{
          "result": "success", 
          "timestamp": 1508666792.863358
}
```


**Example** :
This command saves config file for ’s application :
=

```
cloudlinux-selector save-config --json --interpreter nodejs  --user user1 --app-root app_dir/app1 --config-file package.json  --content                                         VGh1ICAyIE5vdiAxMDo0MzoxMiBFRFQgMjAxNwo=
```

Get a list of applications for the specific user

```
cloudlinux-selector [get] [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)]
```


**Example** :
This command gets a list of applications for the :

```
cloudlinux-selector get --json --interpreter nodejs  --user user1
```

Create user application


```
cloudlinux-selector create [--json] --interpreter nodejs [(--user <str> | --domain <str>)] --app-root <str> --app-uri <str> [--version <str>] [--app-mode <str>] [--startup-file <str>] [--env-vars <json string>]
```

**Example** :
This command creates 's application for the domain :

```
cloudlinux-selector create --json --interpreter nodejs --user user1 --app-root my_apps/app1 --app-uri apps/app1
```

or

```
cloudlinux-selector create --json --interpreter nodejs --app-root my_apps/app1 --domain xyz.com --app-uri apps/app1
```

Start, restart, stop, and destroy user application

```
cloudlinux-selector (start | restart | stop | destroy) [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str>
```


**Example** :
This command starts 's application:

```
cloudlinux-selector start --json --interpreter nodejs --user user1 --app-root my_apps/app1
```

Change properties for an application

```

```


**Example 1** :
This command sets a production mode, new domain , new Node.js version 8, new , new application directory and new startup file for application located on the domain :

```
cloudlinux-selector set --json --interpreter nodejs  --user user1 --app-root my_apps/app1 --mode production  --new-app-root new_apps/new_app1  --new-domain new.xyz.com --new-app-uri new_apps/app1  --new-version 8  --startup-file new_app.js --env-vars '{ "var1" : "value1", "var2" : "value2" }'
```

**Example 2** :

```
cloudlinux-selector set --json --interpreter nodejs  --domain xyz.com --app-root my_apps/app1 --mode production  --new-app-root new_apps/new_app1  --new-domain new.xyz.com --new-app-uri new_apps/app1  --new-version 8  --startup-file new_app.js --env-vars '{ "var1" : "value1", "var2" : "value2" }'
```






Run command for the user application

```
cloudlinux-selector install-modules [--json] --interpreter nodejs  [(--user <str> |  --domain <str>)] --app-root <str>
```

**Example** :
This command runs _ _ for application:


```
cloudlinux-selector install-modules --json --interpreter nodejs --user user1 --app-root my_apps/app
```






Run a script from file of a user application, arguments are passed to the script

```
cloudlinux-selector run-script [--json] --interpreter nodejs  [(--user <str> | --domain <str>)] --app-root <str> --script-name <str> [-- <args>...]
```

**Example** :

```
cloudlinux-selector run-script --json --interpreter nodejs --user user1 --app-root my_apps/app --script-name test_script -- --script_opt1 --script_opt2 script_arg1 script_arg2
```

output:


```
{
          "result": "success", 
          "timestamp": 1508666792.863358
           "data": "script output as Base64 encoded string"
}
```

Activate virtual environment of NodeJS:

```
source <home_of_user>/nodevenv/<app_root>/<nodejs_version>/bin/activate
```


This command changes prompt to
**Example** :

```
[newusr@192-168-245-108 ~]$ source /home/newusr/nodevenv/newapp4/newapp3/8/bin/activate
[newapp4/newapp3 (8)] [newusr@192-168-245-108 ~]$
```


After ativation user can use and node from a virtual environment without full paths.


## User Interface



Hoster interface allows to enable and disable Node.js, and manage individual Node.js versions.

Go to . A list of installed Node.js versions is displayed. There are several columns in the list.

— displays Node.js version.
— Node.js package location.
— number of applications that use this Node.js version. Click on a digit to go to the list of applications.
— displays if particular Node.js version is enabled.
— allows to install, delete, and make default a particular Node.js version.
To display all changes immediately click link.

![](/images/nodejsgeneral_zoom70.png)



To enable Node.js move a slider to .
To disable Node.js move a slider back to . 




![](/images/nodejsslider_zoom70.png)






![](/images/nodejsselectorlogo_zoom70.png)


The list of installed Node.js versions allows to enable and disable, install and delete, and set a particular Node.js version as a default.

**Enable and disable particular Node.js version**

To enable particular Node.js version do the following:
Move a disabled slider in the column for a particular Node.js version.
In the confirmation pop-up click to save changes or to close pop-up.

![](/images/nodejsenable_zoom70.png)

To disable particular Node.js version do the following:
Move an enabled slider in the column for a particular Node.js version.
In the confirmation pop-up click to save changes or to close pop-up.

**Install and delete particular Node.js version**

To install particular Node.js version do the following:
Click button in the column for a particular Node.js version.
In the confirmation pop-up click to save changes or to close pop-up.

To delete particular Node.js version do the following:
Click icon in the column for a particular Node.js version.
In the confirmation pop-up click to start uninstall process.
Or close a pop-up without changes.

**Note that it is impossible** :
to remove default Node.js version;
to remove version with applications;
to install or remove version if another installation/uninstall process is running.

![](/images/nodejsconfirmation_zoom70.png)

**Make a particular Node.js version as a default**

To make a particular Node.js version as a default do the following:
Click icon in the column for a particular Node.js version.
In the confirmation pop-up click to save changes or to close pop-up.






![](/images/nodejsmakedefault_zoom70.png)



To view and operate with the list of domains with Node.js versions click on a number in the column for a particular Node.js version. A section with a list of Domains for particular Node.js version will be displayed.

![](/images/nodejsselectordomains_zoom70.png)

Domains are displayed by three. To load more domains click on button.


To change Node.js version for a particular application do the following:
Click icon in the column in a particular application row. A confirmation pop-up will be displayed.
In the pop-up choose Node.js version from a drop-down.
Click to confirm the action or to close the pop-up.
To refresh state of applications in current version you can click link. 





**Note** that icon in end user interface is absent when Node.js is disabled.

![](/images/nodejslogoenduser_zoom70.png)

End User interface allows end users to setup and manage Node.js for their web applications.
Go to .

page is displayed.

![](/images/nodejsusermain_zoom70.png)

There are several columns in the list.
— application URI including the domain.
—  application root directory relative to user's home.
— can be production or development.
— started/stopped — displays if an application is running or not and version of application.
— allows to start, restart, stop, edit, and remove a particular application.


**Start application**

To start a stopped application do the following:
Click icon in the column in a stopped application row.
When an action is completed a icon changes to icon.

**Stop application**

To stop a started application do the following:
Click icon in the column in a started application row.
When an action is completed a icon changes to icon.

![](/images/nodejsuseruistartstop_zoom70.png)

**Restart application**

To restart started application do the following:
Click icon in the column in a started application row. A current row is blocked and when a process is completed it will be unblocked.

**Remove application**

To remove application do the following:
Click icon in the column in a particular application row.
In the confirmation pop-up click to start removing or to close pop-up.
When an action is completed an application will be removed from the table and a confirmation pop-up will be displayed.

![](/images/nodejsuseruirestartremove_zoom70.png)

**Edit application**

To edit application do the following:
Click icon in the column in a particular application row. A particular application tab opens.

![](/images/nodejseditapp_zoom70.png)

The following actions are available:
Restart application — click button.
Stop Node.js — click button.
Run JavaScript script — click button to run a command specified in the section of the package.json file. Specify the name of the script to run plus any parameters then click .
Remove application — click button and confirm the action in a pop-up.
Change Node.js version — choose Node.js version from a drop-down.
Change Application mode — choose application mode from a drop-down. Available modes are and .
Specify Application root — specify in a field a physical address to the application on a server that corresponds with its URI.
Specify Application URL — specify in a field an HTTP/HTTPS link to the application.
Specify Application startup file — specify as .
Run npm install command — click button to install the package(s) described in the file.
Add Environment variables — click and specify a name and a value.



## Node.js Deployment


The first approach - [remote usage of Node.js Interpreters of different versions](/node_js_selector/#remote-usage-of-node-js-interpreters) .
The second approach - [remote usage of the ](/node_js_selector/#remote-usage-of-the-cloudlinux-selector-utility) .

### Remote Usage of Node.js Interpreters


1. Create a Node.js project in . You can download [this archive](http://docs.cloudlinux.com/nodejs_example.zip) and use it as a basis.
2. Install packages on the server in use. See [installation instructions](/node_js_selector/#installation) .
3. Create an application on the server. You can do it by three ways:
`o` Via UI of the Node.js plugin.
`o` Using the following command to create an application:

```
cloudlinux-selector create --interprete=nodejs --json --app-root=<USER_NAME> --app-uri=<APP_NAME> --app-mode=develompent --version=<VERSION> --domain=<DOMAIN>
```
  




![](/images/createapp_zoom70.png)

`o` Choose a location of the application on the server and synchronize the files with the project.
4. Set up in the project created.

![](/images/setconfiguration_zoom70.png)

`o` Specify a path to the remote Node.js interpreter. To be able to specify the remote interpreter, you should install the plugin first. Please find more information [here](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html) , using server access credentials for a user .
`o` Specify initial _JavaScript file_ that will be run with the command (it is the _app.js_ file from the archive).
`o` Specify between a local and a remote project . If you have created your application with the or via plugin UI the should be as follows:

```
/home/<USER_NAME>/<APP_NAME>
```

5. Synchronize the project directories on the local and the remote machine as per specified.
6. Deploy the modules on the remote and the local machine with the command (if there are dependent modules). In the UI you can click the button.
7. Run Node.js application with the configuration set at the [4th step](/remote_usage_of_node_js_interp.html#setuprundebugconfigurations/)  .

![](/images/runapp_zoom60.png)

8. If you are using the application from the archive attached, you can see the running application on the 3003 port —

**Note.** The port should be available to a server user.

![](/images/runningappdomain_zoom70.png)

The following information should be displayed on this page:
A version of the running Node.js interpreter;
Current environment variables;
A current time.
So that, you can be sure that deployed modules are used properly.

If you’d like to use a different version of Node.js to run an application, change a path to the interpreter in the configuration settings of the running.
To apply all changes to the project, synchronize all changes with the server and restart the running application.

9. To debug a script, set breakpoints in the code and run the configuration via Main Menu .

Useful links:
: [https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/idea/configure-node-js-remote-interpreter.html)
Plugin : [https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter](https://plugins.jetbrains.com/plugin/8116-node-js-remote-interpreter)
: [https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html](https://www.jetbrains.com/help/webstorm/configure-node-js-remote-interpreter.html)

**Note.** It is not required to install while working in if you are using this approach.


### Remote Usage of the cloudlinux-selector Utility


Create an application via UI or with the command as described in the Remote Usage of Node.js Interpreters approach, [step 3 (a,b)](/remote_usage_of_node_js_interp.html#createapplication/) .
2. Set up project mapping on the local machine with the created remote application _ _ .
3. Set up the remote commands of the for the following actions:
`o` Restart application;
`o` Install packages;
`o` Run script;
`o` Change Node.js version for the application.
You can see the running app at
To apply all changes, restart the application.


