# Python


We have the ability to deploy and applications via application server. and uses to host and .

This feature is available for CloudLinux 6 or later and requires 0.9-1 or later. It supports only cPanel servers.

Supported versions:

, supported by CloudLinux 6, CloudLinux 7;

, supported by CloudLinux 6, CloudLinux 7;

, supported by CloudLinux 6, CloudLinux 7;

, supported by CloudLinux 6, CloudLinux 7.

Supported versions _(supported by CloudLinux 6 and CloudLinux 7_ ):

1.8;

1.9;

2.0;

2.1;

2.2;

2.3;

2.4.




## Python and Ruby Selector Installation


Install a tools to create isolated environments and module. For servers with EasyApache3:

```
yum install lvemanager alt-python-virtualenv alt-mod-passenger
```

with EasyApache4:

```
yum install lvemanager alt-python-virtualenv ea-apache24-mod-alt-passenger
```

To use you should install alternative packages:

```
yum groupinstall alt-python
```

To use install alternative packages:

```
yum groupinstall alt-ruby 
```

To use MySQL database you should install package:

```
yum install alt-python27-devel
```










## End User Access


1. In area choose _ _ .

![](/images/clip000133.jpg)


2. Create project form will appear. Choose interpreter version for your application, application folder name (project path) and for accessing your application. Click to create an application.

![](/images/clip000233.jpg)

After a little while a new application entry will be appended to the web-page.

![](/images/clip000255.jpg)

3. You can edit path (folder name in homedir, for example ), for application, handler. If you click - the value is converted to input field and thus becomes editable. When editing is complete, click .

![](/images/clip000256.jpg)

4. entry is to specify application entry point. It must be specified as filename, must be callable and separated by colon. If your app is running from file by calling callable app, set .

![](/images/clip000257.jpg)

4. When control is clicked, extensions section will be expanded. It gives the ability to add or remove modules. When start typing in input field, appropriate hints are shown in drop-down list. Choose the entry you want from drop-down and click .

![](/images/clip000261.jpg)

If you click , the corresponding module entry will disappear.

In addition to setting and , the interpreter version can be changed as well by changing the value in select drop-down.

5. No changes are applied to application environment until button is clicked. Before the button is clicked, all changes can be reverted with button.

The newly created application will be supplied with only. A real application ought to be put into application folder. After application is placed into application folder, the parameter can be set.

Click to delete the application - the application folder itself will remain unmoved.

_Note. For _

When creating an application you can use the key , which attaches application to domain. If key is not specified, then the main users domain will be used by default.

To create application run:

```
/usr/bin/selectorctl --interpreter=<python|ruby> --version=VERSION
[--user=USER] [--domain=DOMAIN] [--print-summary] [--json]
–-create-webapp <FOLDER_NAME> <URI>
```

When changing application key can be used simultaneously, in this case not only will be changed, but also the application domain.

To change application run:

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER]
[--domain=NEW_DOMAIN] [--print-summary] [--json] --transit-webapp
<FOLDER_NAME> <NEW_URI>
 
```

The possibility to choose domain when creating an application was added to web interface as well.

![](/images/webapp001_zoom94.png)

Also you can run simple commands from web interface (e.g. you can install packages from specific repositories or control web applications by means of -admin).

![](/images/webapp002_zoom93.png)


## Command Line


All the actions mentioned in Deploy and Settings section can be performed from the command line:

To create application run:

```
/usr/bin/selectorctl --interpreter=<python|ruby> --version=VERSION [--user=USER] [--print-summary] [--json] --create-webapp <FOLDER_NAME> <URI>
```

To delete application:

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --destroy-webapp <FOLDER_NAME>
```

To change application folder name:

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --relocate-webapp <FOLDER_NAME> <NEW_FOLDER_NAME>
```

To change application :

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --transit-webapp <FOLDER_NAME> <NEW_URI>
```

To change application interpreter version:

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --set-user-current --version=<NEW VERSION> <FOLDER_NAME>
```

To set application handler ( only):

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --setup-wsgi=<file_path:callable> <FOLDER_NAME>
```

To install modules to application environment:

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --enable-user-extensions=<module1[,module2...]> <FOLDER_NAME>
```

To remove modules from application environment:

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --disable-user-extensions=<module1[,module2...]> <FOLDER_NAME>
```

To list modules installed in application environment:

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --list-user-extensions <FOLDER_NAME>
```

To print applications summary for a user:

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--json] --user-summary
```

To list available interpreters:

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--json] --list
```

To restart application:

```
selectorctl --interpreter ruby --user cltest1 --domain cltest1.com --restart-webapp testapp
```

To choose version:

```
selectorctl --interpreter=ruby --user=$USER -v 2.0
```


## Hide Python and Ruby Selector Icons


It is possible to hide or show and icons by marking or unmarking proper checkboxes in tab:

![](/images/hide-python-ruby-selectors.jpg)




## Deploying Trac using Python Selector


1. In create an application. project script will be located in ( _e.g. _ ).

– is a where web-interface is located. ( _e.g. _ ).

needs version from ** 2.5** to **3.0,** in actual example version 2.7 is used.

2. When the App is created, add the following modules: .

2.1. Alternatively connect to the server via SSH and perform the following steps:

source ~/virtualenv/trac/2.7/bin/activate;

then:

~/virtualenv/trac/2.7/bin/easy_install Trac mysql-python (using );

or

~/virtualenv/trac/2.7/bin/pip install (using ).

3. In cPanel create MySQL database and a user. Add user to database.

![](/images/trac1.jpg)
_In this example _

4. Connect to the server via SSH using your cPanel account.

Create project:


For parameter enter the following: – here the data for connecting MySQL database are specified.





To change encoding, in cPanel run , choose , go to , choose the necessary encoding in section and click .

![](/images/trac2.jpg)

After that you have to repeat the procedure of creating a project. When done, the project must appear:

5. To create project frontend run the following:

~/virtualenv/trac/2.7/bin/trac-admin ~/track_project deploy ~/trac

— is the path to the project,
— is the path, that was specified while setting .

Create topic directory by default:

```
cd ~/public_html/trac
mkdir chrome 
cp -R ~/trac/htdocs/ ~/public_html/trac/chrome/
```

- all project static files are located in this directory; the changes can be added here as well.

6. To add path to file in created application:

Go back to , change for your application to , click to apply changes and then click .

Your Existing application now must look like the following:

![](/images/trac3.jpg)

7. Adding authorization:

In after section add the following lines:

```
AuthType Basic
AuthName "trac"
AuthUserFile /home/tractest/trac/passwd
Require valid-user
```

8. Add new user and create passwd file with admin.

Enter password.

~/virtualenv/trac/2.7/bin/trac-admin  ~/track_project permission add admin

Add admin user to group.

Here the path directory is equal to in your project.

Now is available via .




### Trac


To use with MySQL database you should install package.

To install run:

```
yum install alt-python27-devel --enablerepo=cloudlinux-updates-testing 
```


## Deploying Redmine using Ruby Selector





1. In cPanel create MySQL database and add user to it. In the example given, the databace was created and user was added.

2. In section create an application.

is the directory where all static files will be placed ( _e.g. _ ).
is web-interface URL ( _e.g. _ ).

![](/images/hmfile_hash_f8216d04.png)

3. After the application was created, add the following modules:



![](/images/hmfile_hash_54c4ccdb.png)

**Note** : If error occurs while installing module, then you need to install package on your server:

```
yum install ImageMagick-devel
```

The installation process takes quite along time, about 7-8 minutes. When done, click button to restart the application.

![](/images/hmfile_hash_880db2aa.png)
![](/images/hmfile_hash_553ab55c.png)

3.1 Alternatively, after the application was created, you can add only one module - .

![](/images/redmine_selector_1.png)

![](/images/redmine_selector_2.png)

4. Enter the server via SSH, using your cPanel account.

Download the application [http://www.redmine.org/projects/redmine/wiki/Download](http://www.redmine.org/projects/redmine/wiki/Download) .

In the description given, the latest version (2.6.0) is assumed.

[http://www.redmine.org/releases/redmine-2.6.0.tar.gz](http://www.redmine.org/releases/redmine-2.6.0.tar.gz)


Hereinafter is meaning which was specified while setting application.

```
cp -R ~/redmine-2.6.0/* ~/redmine
cd ~/redmine/config
cp database.yml.example database.yml
```

Edit - add MySQL database connection settings to section.

```
cp -R ~/redmine/public/* ~/public_html/redmine/
cd ~/public_html/redmine
cat htaccess.fcgi.example >> .htaccess
cp dispatch.fcgi.example dispatch.fcgi
```

Go to directory.

Add line into file.

Run alternately:

```
source ~/rubyvenv/redmine/2.1/bin/activate
~/rubyvenv/redmine/2.1/bin/bundle install
```
(if running the alternative installation)

```
~/rubyvenv/redmine/2.1/bin/rake generate_secret_token
RAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake db:migrate
```

- Database migration;

  `RAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake redmine:load_default_data` 
- Loading default data into database.

## Easy Apache 4


Since cPanel and WHM version 66 provides (more information on the [link](https://documentation.cpanel.net/display/66Docs/Application+Manager) ), this allows creating applications with cPanel application manager.

CloudLinux already has and , which allows creating applications with . However, it does not allow using .

It is not correct to install both of those packages on the server because they contain the same module for Apache web server.

The new is available for download from our repository which allows you to run applications via and and .

To install run:

```
# yum install lvemanager alt-python-virtualenv
# yum install ea-ruby24-mod_passenger --enablerepo=cl-ea4-testing
```

To install or follow the instructions on the [link](https://docs.cloudlinux.com/index.html?python_ruby_installation.html) .


