# Python


We have the ability to deploy <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby </span> applications via application server. <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby Selector </span> uses <span class="notranslate"> mod_passenger </span> to host <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby </span> .

This feature is available for CloudLinux 6 or later. It supports only cPanel servers.

You can find a list of supported alt-python and alt-ruby versions using the following commands.

For alt-python:

```
yum grouplist | grep alt-python
```


For alt-ruby:

```
yum grouplist | grep alt-ruby
```


## Python and Ruby Selector Installation






Install tools to create isolated <span class="notranslate"> Python </span> environments and <span class="notranslate"> Passenger Apache </span> module. For servers with EasyApache3:
<span class="notranslate"> </span>
```
yum install lvemanager alt-python-virtualenv alt-mod-passenger
```

with EasyApache4:
<span class="notranslate"> </span>
```
yum install lvemanager alt-python-virtualenv ea-apache24-mod-alt-passenger
```

To use <span class="notranslate"> Python Selector </span> you should install alternative <span class="notranslate"> Python </span> packages:
<span class="notranslate"> </span>
```
yum groupinstall alt-python
```

To use <span class="notranslate"> Ruby Selector </span> install alternative <span class="notranslate"> Ruby </span> packages:
<span class="notranslate"> </span>
```
yum groupinstall alt-ruby 
```

To use MySQL database you should install <span class="notranslate"> alt-python27-devel </span> package:
<span class="notranslate"> </span>
```
yum install alt-python27-devel
```









## End User Access


1. In <span class="notranslate"> _Software/Services_ </span> area choose _ _ <span class="notranslate"> Select Python Environment/Select Ruby Environment </span> .

![](/images/clip000133.jpg)


2. Create project form will appear. Choose interpreter version for your application, application folder name (project path) and <span class="notranslate"> URI </span> for accessing your application. Click <span class="notranslate"> “Create project” </span> to create an application.

![](/images/clip000233.jpg)

After a little while a new application entry will be appended to the web-page.

![](/images/clip000255.jpg)

3. You can edit path (folder name of the project in the home directory, for example, <span class="notranslate"> _/home/clman1/project_name_ </span> ), <span class="notranslate"> uri </span> for application, <span class="notranslate"> wsgi </span> handler. If you click <span class="notranslate"> Edit </span> - the value is converted to input field and thus becomes editable. When editing is complete, click <span class="notranslate"> Save </span> .

![](/images/clip000256.jpg)

4. <span class="notranslate"> Wsgi </span> entry is to specify <span class="notranslate"> python wsgi </span> application entry point. It must be specified as filename, must be callable and separated by colon. If your app is running from file <span class="notranslate"> flask/run.py </span> by calling callable app, set <span class="notranslate"> flask/run.py:app </span> .

![](/images/clip000257.jpg)

4. When <span class="notranslate"> Show </span> control is clicked, <span class="notranslate"> python </span> extensions section will be expanded. It gives the ability to add or remove <span class="notranslate"> python </span> modules. When start typing in input field, appropriate hints are shown in drop-down list. Choose the entry you want from drop-down and click <span class="notranslate"> Add </span> .

![](/images/clip000261.jpg)

If you click <span class="notranslate"> Delete </span> , the corresponding module entry will disappear.

In addition to setting <span class="notranslate"> path, uri </span> and <span class="notranslate"> wsgi </span> , the interpreter version can be changed as well by changing the value in select drop-down.

5. No changes are applied to application environment until <span class="notranslate"> Update </span> button is clicked. Before the <span class="notranslate"> Update </span> button is clicked, all changes can be reverted with <span class="notranslate"> Reset </span> button.

The newly created application will be supplied with <span class="notranslate"> stub </span> only. A real application ought to be put into application folder. After application is placed into application folder, the <span class="notranslate"> wsgi </span> parameter can be set.

Click <span class="notranslate"> Remove </span> to delete the application - the application folder itself will remain unmoved.

_Note. For _ <span class="notranslate"> LVE Manager </span> _ version 0.9-10 and higher:_

When creating an application you can use the key <span class="notranslate"> --domain </span> , which attaches application to domain. If <span class="notranslate"> --domain </span> key is not specified, then the main users domain will be used by default.

To create application run:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=<python|ruby> --version=VERSION[--user=USER] [--domain=DOMAIN] [--print-summary] [--json]–-create-webapp <FOLDER_NAME> <URI>
```

When changing application <span class="notranslate"> URI, --domain </span> key can be used simultaneously, in this case not only <span class="notranslate"> URI </span> will be changed, but also the application domain.

To change application <span class="notranslate"> URI </span> run:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER][--domain=NEW_DOMAIN] [--print-summary] [--json] --transit-webapp<FOLDER_NAME> <NEW_URI> 
```

The possibility to choose domain when creating an application was added to web interface as well.

![](/images/webapp001_zoom94.png)

Also you can run simple commands from web interface (e.g. you can install packages from specific repositories or control web applications by means of <span class="notranslate"> django </span> -admin).

![](/images/webapp002_zoom93.png)


## Command Line


All the actions mentioned in Deploy and Settings section can be performed from the command line:

To create application run:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=<python|ruby> --version=VERSION [--user=USER] [--print-summary] [--json] --create-webapp <FOLDER_NAME> <URI>
```

To delete application:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --destroy-webapp <FOLDER_NAME>
```

To change application folder name:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --relocate-webapp <FOLDER_NAME> <NEW_FOLDER_NAME>
```

To change application <span class="notranslate"> URI </span> :
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --transit-webapp <FOLDER_NAME> <NEW_URI>
```

To change application interpreter version:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --set-user-current --version=<NEW VERSION> <FOLDER_NAME>
```

To set application <span class="notranslate"> WSGI </span> handler ( <span class="notranslate"> Python </span> only):
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --setup-wsgi=<file_path:callable> <FOLDER_NAME>
```

To install modules to application environment:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --enable-user-extensions=<module1[,module2...]> <FOLDER_NAME>
```

To remove modules from application environment:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --disable-user-extensions=<module1[,module2...]> <FOLDER_NAME>
```

To list modules installed in application environment:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --list-user-extensions <FOLDER_NAME>
```

To print applications summary for a user:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--json] --user-summary
```

To list available interpreters:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--json] --list
```

To restart application:
<span class="notranslate"> </span>
```
selectorctl --interpreter ruby --user cltest1 --domain cltest1.com --restart-webapp testapp
```

To choose <span class="notranslate"> Ruby </span> version:
<span class="notranslate"> </span>
```
selectorctl --interpreter=ruby --user=$USER -v 2.0
```


## Hide Python and Ruby Selector Icons


It is possible to hide or show <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby Selector </span> icons by marking or unmarking proper checkboxes in <span class="notranslate"> LVE Manager  _Options_ </span> tab:

![](/images/hide-python-ruby-selectors.jpg)




## Deploying Trac using Python Selector


1. In <span class="notranslate"> **Setup Python App** </span> create an application. <span class="notranslate"> Trac </span> project <span class="notranslate"> WSGI </span> script will be located in <span class="notranslate"> **App Directory** </span> ( _e.g. _ <span class="notranslate"> trac </span> ).

<span class="notranslate"> App URI </span> – is a <span class="notranslate"> URL </span> where web-interface is located. ( _e.g. _ <span class="notranslate"> Trac </span> _ – web-interface is located in _ <span class="notranslate"> YOUR_DOMAIN/trac </span> ).

<span class="notranslate"> Trac </span> needs <span class="notranslate"> Python </span> version from ** 2.5** to **3.0,** in actual example version 2.7 is used.

2. When the App is created, add the following modules: <span class="notranslate"> Trac, Genshi, MySQL-python </span> .

2.1. Alternatively connect to the server via SSH and perform the following steps:
<span class="notranslate"> </span>
source ~/virtualenv/trac/2.7/bin/activate;

then:
<span class="notranslate"> </span>
~/virtualenv/trac/2.7/bin/easy_install Trac mysql-python (using <span class="notranslate"> easy_install </span> );

or
<span class="notranslate"> </span>
~/virtualenv/trac/2.7/bin/pip install <span class="notranslate"> trac mysql-python </span> (using <span class="notranslate"> pip </span> ).

3. In cPanel create MySQL database and a user. Add user to database.

![](/images/trac1.jpg)
_In this example _ <span class="notranslate"> DB tractest_trac </span> _ and user _ <span class="notranslate"> tractest_trac </span> _ were created._

4. Connect to the server via SSH using your cPanel account.

Create <span class="notranslate"> Trac </span> project:
 <span class="notranslate"> ~/virtualenv/trac/2.7/bin/trac-admin  ~/trac_project initenv </span>

For <span class="notranslate"> "Database connection string" </span> parameter enter the following: <span class="notranslate"> mysql://user:password@localhost/database_name </span> – here the data for connecting MySQL database are specified.





To change encoding, in cPanel run <span class="notranslate"> phpMyAdmin </span> , choose <span class="notranslate"> DB </span> , go to <span class="notranslate"> Operations </span> , choose the necessary encoding in <span class="notranslate"> Collation </span> section and click <span class="notranslate"> Go </span> .

![](/images/trac2.jpg)

After that you have to repeat the procedure of creating a project. When done, the <span class="notranslate"> Trac </span> project must appear: <span class="notranslate"> ~/trac_project </span>

5. To create project frontend run the following:
<span class="notranslate"> </span>
~/virtualenv/trac/2.7/bin/trac-admin ~/track_project deploy ~/trac

<span class="notranslate"> ~/track_project </span> — is the path to the project,
<span class="notranslate"> ~/trac </span> — is the path, that was specified while setting <span class="notranslate"> App Directory </span> .

Create topic directory by default:
<span class="notranslate"> </span>
```
cd ~/public_html/tracmkdir chrome cp -R ~/trac/htdocs/ ~/public_html/trac/chrome/
```

- all project static files are located in this directory; the changes can be added here as well.

6. To add path to <span class="notranslate"> WSGI </span> file in created application:

Go back to <span class="notranslate"> cPanel Setup Python App </span> , change <span class="notranslate"> “WSGI file location” </span> for your application to <span class="notranslate"> cgi-bin/trac.wsgi </span> , click <span class="notranslate"> Update </span> to apply changes and then click <span class="notranslate"> Restart </span> .

Your Existing application now must look like the following:

![](/images/trac3.jpg)

7. Adding authorization:

In <span class="notranslate"> ~/public_html/trac/.htaccess </span> after <span class="notranslate"> CLOUDLINUX PASSENGER CONFIGURATION </span> section add the following lines:
<span class="notranslate"> </span>
```
AuthType BasicAuthName "trac"AuthUserFile /home/tractest/trac/passwdRequire valid-user
```

8. Add new user and create passwd file <span class="notranslate"> /usr/local/apache/bin/htpasswd </span> with <span class="notranslate"> ~/trac/passwd </span> admin.

Enter password.
<span class="notranslate"> </span>
~/virtualenv/trac/2.7/bin/trac-admin  ~/track_project permission add admin <span class="notranslate"> TRAC_ADMIN </span>

Add admin user to <span class="notranslate"> TRAC_ADMIN </span> group.

Here the path <span class="notranslate"> trac </span> directory is equal to <span class="notranslate"> App Directory </span> in your project.

Now <span class="notranslate"> Trac </span> is available via <span class="notranslate"> YOUR_DOMAIN/trac </span> .




### Trac


To use <span class="notranslate"> Trac </span> with MySQL database you should install <span class="notranslate"> alt-python27-devel </span> package.

To install run:
<span class="notranslate"> </span>
```
yum install alt-python27-devel --enablerepo=cloudlinux-updates-testing 
```


## Deploying Redmine using Ruby Selector





1. In cPanel create MySQL database and add user to it. In the example given, the databace <span class="notranslate"> _redminet_redmine_ </span> was created and user <span class="notranslate"> _redminet_redmine_ </span> was added.

2. In <span class="notranslate"> **Setup Ruby App** </span> section create an application.

<span class="notranslate"> App Directory </span> is the directory where all static files will be placed ( _e.g. _ <span class="notranslate"> redmine </span> ).
<span class="notranslate"> App URI </span> is web-interface URL ( _e.g. _ <span class="notranslate"> redmine </span> _ web-interface will be located in _ <span class="notranslate"> YOUR_DOMAIN/redmine </span> ).

![](/images/hmfile_hash_f8216d04.png)

3. After the application was created, add the following modules:
<span class="notranslate"> </span>


![](/images/hmfile_hash_54c4ccdb.png)

**Note** : If error occurs while installing <span class="notranslate"> rmagic </span> module, then you need to install <span class="notranslate"> ImageMagick-devel </span> package on your server:
<span class="notranslate"> </span>
```
yum install ImageMagick-devel
```

The installation process takes quite along time, about 7-8 minutes. When done, click <span class="notranslate"> Restart </span> button to restart the application.

![](/images/hmfile_hash_880db2aa.png)
![](/images/hmfile_hash_553ab55c.png)

3.1 Alternatively, after the application was created, you can add only one module - <span class="notranslate"> bundle </span> .

![](/images/redmine_selector_1.png)

![](/images/redmine_selector_2.png)

4. Enter the server via SSH, using your cPanel account.

Download the application [http://www.redmine.org/projects/redmine/wiki/Download](http://www.redmine.org/projects/redmine/wiki/Download) .

In the description given, the latest version <span class="notranslate"> Redmine </span> (2.6.0) is assumed.

[http://www.redmine.org/releases/redmine-2.6.0.tar.gz](http://www.redmine.org/releases/redmine-2.6.0.tar.gz)
<span class="notranslate"> tar xzf redmine-2.6.0.tar.gz </span>

Hereinafter <span class="notranslate"> 'redmine' </span> is <span class="notranslate"> App Directory </span> meaning which was specified while setting <span class="notranslate"> Ruby </span> application.
<span class="notranslate"> </span>
```
cp -R ~/redmine-2.6.0/* ~/redminecd ~/redmine/configcp database.yml.example database.yml
```

Edit <span class="notranslate"> config/database.yml </span> - add MySQL database connection settings to <span class="notranslate"> Production </span> section.
<span class="notranslate"> </span>
```
cp -R ~/redmine/public/* ~/public_html/redmine/cd ~/public_html/redminecat htaccess.fcgi.example >> .htaccesscp dispatch.fcgi.example dispatch.fcgi
```

Go to <span class="notranslate"> cd ~/redmine </span> directory.

Add <span class="notranslate"> gem "bigdecimal" </span> line into <span class="notranslate"> Gemfile </span> file.

Run alternately:
<span class="notranslate"> </span>
```
source ~/rubyvenv/redmine/2.1/bin/activate~/rubyvenv/redmine/2.1/bin/bundle install
```
(if running the alternative installation)
<span class="notranslate"> </span>
```
~/rubyvenv/redmine/2.1/bin/rake generate_secret_tokenRAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake db:migrate
```

- Database migration;
<span class="notranslate"> </span>
  `RAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake redmine:load_default_data` 
- Loading default data into database.

## Easy Apache 4


Since cPanel and WHM version 66 provides <span class="notranslate"> ea-ruby24-mod_passenger </span> (more information on the [link](https://documentation.cpanel.net/display/66Docs/Application+Manager) ), this allows creating <span class="notranslate"> Ruby </span> applications with cPanel application manager.

CloudLinux already has <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby Selector </span> , which allows creating applications with <span class="notranslate"> ea-apache24-mod-alt-passenger </span> . However, it does not allow using <span class="notranslate"> cPanel application manager </span> .

It is not correct to install both of those packages on the server because they contain the same <span class="notranslate"> passenger </span> module for Apache web server.

The new <span class="notranslate"> ea-ruby24-mod_passenger </span> is available for download from our <span class="notranslate"> updates-testing (beta) </span> repository which allows you to run applications via <span class="notranslate"> cPanel application manager </span> and <span class="notranslate"> CloudLinux Python </span> and <span class="notranslate"> Ruby Selector </span> .

To install run:
<span class="notranslate"> </span>
```
# yum install lvemanager alt-python-virtualenv# yum install ea-ruby24-mod_passenger --enablerepo=cl-ea4-testing
```

To install <span class="notranslate"> Ruby </span> or <span class="notranslate"> Python Selector </span> follow the instructions on the [link](https://docs.cloudlinux.com/index.html?python_ruby_installation.html) .


