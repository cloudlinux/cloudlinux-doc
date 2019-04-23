# Python and Ruby Selector

We have the ability to deploy <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby </span> applications via application server. <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby Selector </span> uses <span class="notranslate"> mod_passenger </span> to host <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby </span> .

This feature is available for CloudLinux 6 or later. It supports only cPanel servers.

You can find a list of supported <span class="notranslate"> alt-python and alt-ruby </span> versions using the following commands.

<div class="notranslate">
For alt-python:

```
yum grouplist | grep alt-python
```
</div>

<div class="notranslate">
For alt-ruby:

```
yum grouplist | grep alt-ruby
```
</div>

## Python and Ruby Selector Installation

::: tip Note
The instructions below are suitable only for EasyApache 3 and EasyApache 4. You should follow [this instruction](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:enable_ruby_python_selector) if you use LiteSpeed.
:::


Install tools to create isolated <span class="notranslate"> Python </span> environments and <span class="notranslate"> Passenger Apache </span> module. For servers with EasyApache3:
<div class="notranslate">

```
yum install lvemanager alt-python-virtualenv alt-mod-passenger
```
</div>
for EasyApache4:
<div class="notranslate">

```
yum install lvemanager alt-python-virtualenv ea-apache24-mod-alt-passenger
```
</div>

To use <span class="notranslate"> Python Selector </span> you should install alternative <span class="notranslate"> Python </span> packages:
<div class="notranslate">

```
yum groupinstall alt-python
```
</div>
To use <span class="notranslate"> Ruby Selector </span> install alternative <span class="notranslate"> Ruby </span> packages:
<div class="notranslate">

```
yum groupinstall alt-ruby 
```
</div>
To use MySQL database you should install <span class="notranslate"> alt-python27-devel </span> package:
<div class="notranslate">

```
yum install alt-python27-devel
```
</div>

::: tip Note
After installation, please make sure that you have unmarked appropriate checkboxes in <span class="notranslate"> LVE Manager Options </span> tab to show <span class="notranslate"> Ruby or Python App </span> in web-interface. Find the instructions on the [link](/python_and_ruby_selector/#hide-python-and-ruby-selector-icons).
:::

::: tip Note
Adding <span class="notranslate"> Python and Ruby modules requires executing permissions to gcc/make binaries. Please enable compilers in Compiler Access section of WHM, then run: cagefsctl --force-update </span>
:::

## End User Access


1. In <span class="notranslate"> _Software/Services_ </span> area choose <span class="notranslate"> _Select Python Environment/Select Ruby Environment_ </span> .

![](/images/clip000133.jpg)


2. Create project form will appear. Choose interpreter version for your application, application folder name (project path) and <span class="notranslate"> URI </span> for accessing your application. Click <span class="notranslate"> “Create project” </span> to create an application.

![](/images/clip000233.jpg)

After a little while a new application entry will be appended to the web-page.

![](/images/clip000255.jpg)

3. You can edit path (folder name of the project in the home directory, for example, <span class="notranslate"> _/home/clman1/project_name_ </span> ), <span class="notranslate"> uri </span> for application, <span class="notranslate"> wsgi </span> handler. If you click <span class="notranslate"> Edit </span> - the value is converted to input field and thus becomes editable. When editing is complete, click <span class="notranslate"> Save </span> .

![](/images/clip000256.jpg)

4. <span class="notranslate"> Wsgi </span> entry is to specify <span class="notranslate"> python wsgi </span> application entry point. It must be specified as filename, must be callable and separated by colon. If your app is running from file <span class="notranslate"> flask/run.py </span> by calling callable app, set <span class="notranslate"> flask/run.py:app </span> .

![](/images/clip000257.jpg)

5. When <span class="notranslate"> Show </span> control is clicked, <span class="notranslate"> python </span> extensions section will be expanded. It gives the ability to add or remove <span class="notranslate"> python </span> modules. When start typing in input field, appropriate hints are shown in drop-down list. Choose the entry you want from drop-down and click <span class="notranslate"> Add </span> .

![](/images/clip000261.jpg)

If you click <span class="notranslate"> Delete </span> , the corresponding module entry will disappear.

In addition to setting <span class="notranslate"> path, uri </span> and <span class="notranslate"> wsgi </span> , the interpreter version can be changed as well by changing the value in select drop-down.

6. No changes are applied to application environment until <span class="notranslate"> Update </span> button is clicked. Before the <span class="notranslate"> Update </span> button is clicked, all changes can be reverted with <span class="notranslate"> Reset </span> button.

The newly created application will be supplied with <span class="notranslate"> stub </span> only. A real application ought to be put into application folder. After application is placed into application folder, the <span class="notranslate"> wsgi </span> parameter can be set.

Click <span class="notranslate"> Remove </span> to delete the application - the application folder itself will remain unmoved.

_Note. For <span class="notranslate"> LVE Manager </span> version 0.9-10 and higher:_

When creating an application you can use the key <span class="notranslate"> --domain </span> , which attaches application to domain. If <span class="notranslate"> --domain </span> key is not specified, then the main users domain will be used by default.

To create application run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> --version=VERSION[--user=USER] [--domain=DOMAIN] [--print-summary] [--json]–-create-webapp <FOLDER_NAME> <URI>
```
</div>
When changing application <span class="notranslate"> URI, --domain </span> key can be used simultaneously, in this case not only <span class="notranslate"> URI </span> will be changed, but also the application domain.

To change application <span class="notranslate"> URI </span> run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER][--domain=NEW_DOMAIN] [--print-summary] [--json] --transit-webapp<FOLDER_NAME> <NEW_URI> 
```
</div>
The possibility to choose domain when creating an application was added to web interface as well.

![](/images/webapp001_zoom94.png)

Also, you can run simple commands from web interface (e.g. you can install packages from specific repositories or control web applications by means of <span class="notranslate"> django </span> -admin).

![](/images/webapp002_zoom93.png)


## Command Line


All the actions mentioned in Deploy and Settings section can be performed from the command line:

To create application run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> --version=VERSION [--user=USER] [--print-summary] [--json] --create-webapp <FOLDER_NAME> <URI>
```
</div>
To delete application:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --destroy-webapp <FOLDER_NAME>
```
</div>
To change application folder name:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --relocate-webapp <FOLDER_NAME> <NEW_FOLDER_NAME>
```
</div>

To change application <span class="notranslate"> URI </span> :
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --transit-webapp <FOLDER_NAME> <NEW_URI>
```
</div>

To change application interpreter version:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<python|ruby> [--user=USER] [--print-summary] [--json] --set-user-current --version=<NEW VERSION> <FOLDER_NAME>
```
</div>
To set application <span class="notranslate"> WSGI </span> handler ( <span class="notranslate"> Python </span> only):
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --setup-wsgi=<file_path:callable> <FOLDER_NAME>
```
</div>
To install modules to application environment:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --enable-user-extensions=<module1[,module2...]> <FOLDER_NAME>
```
</div>
To remove modules from application environment:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --disable-user-extensions=<module1[,module2...]> <FOLDER_NAME>
```
</div>
To list modules installed in application environment:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--print-summary] [--json] --list-user-extensions <FOLDER_NAME>
```
</div>
To print applications summary for a user:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--json] --user-summary
```
</div>
To list available interpreters:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=python [--user=USER] [--json] --list
```
</div>
To restart application:
<div class="notranslate">

```
selectorctl --interpreter ruby --user cltest1 --domain cltest1.com --restart-webapp testapp
```
</div>
To choose <span class="notranslate"> Ruby </span> version:
<div class="notranslate">

```
selectorctl --interpreter=ruby --user=$USER -v 2.0
```
</div>

## Hide Python and Ruby Selector Icons


It is possible to hide or show <span class="notranslate">Python</span> and <span class="notranslate">Ruby Selector</span> icons by marking or unmarking proper checkboxes in <span class="notranslate"> LVE Manager _Options_</span> tab.

![](/images/CL-hide-python-ruby.png)


The same result can be accomplished in CLI by running:

<div class="notranslate">

```
cloudlinux-config set --json --data '{"options":{"uiSettings":{"hideRubyApp":false, "hidePythonApp":false}}}'
```
</div>
 
:::tip Note
If you are using cPanel/WHM, you can also configure hide/show <span class="notranslate">CloudLinux Python/Ruby Selectors</span> in <span class="notranslate">WHM | Feature Manager</span>.
For that, you’d need to first uncheck <span class="notranslate">`Hide Python App in web-interface`</span> in the <span class="notranslate">LVE Manager</span>. This will make the menu appear for all accounts. After that, you are free to disable this app in <span class="notranslate">WHM | Feature Manager</span> for the required feature lists. 
:::

## Deploying Trac using Python Selector


1. In <span class="notranslate"> **Setup Python App** </span> create an application. <span class="notranslate"> Trac </span> project <span class="notranslate"> WSGI </span> script will be located in <span class="notranslate"> **App Directory** </span> ( _e.g._ <span class="notranslate"> _trac_ </span> ).

<span class="notranslate"> App URI </span> – is a <span class="notranslate"> URL </span> where web-interface is located. ( _e.g._ <span class="notranslate"> _Trac_ </span> – web-interface is located in <span class="notranslate"> _YOUR_DOMAIN/trac_ </span> ).

<span class="notranslate"> Trac </span> needs <span class="notranslate"> Python </span> version from **2.5** to **3.0,** in actual example version 2.7 is used.

2. When the App is created, add the following modules: <span class="notranslate"> Trac, Genshi, MySQL-python </span> .

2.1. Alternatively, connect to the server via SSH and perform the following steps:

<span class="notranslate"> 
source ~/virtualenv/trac/2.7/bin/activate; </span>

then:

<span class="notranslate"> 
~/virtualenv/trac/2.7/bin/easy_install Trac mysql-python (using easy_install </span> );

or

<span class="notranslate">
~/virtualenv/trac/2.7/bin/pip install trac mysql-python </span> 
(using <span class="notranslate"> pip </span> ).

3. In cPanel create MySQL database and a user. Add user to database.

![](/images/trac1.jpg)

_In this example_ <span class="notranslate"> _DB tractest_trac_ </span> _and user_ <span class="notranslate"> _tractest_trac_ </span> _were created._

4. Connect to the server via SSH using your cPanel account.

Create <span class="notranslate"> Trac </span> project:
 <span class="notranslate"> ~/virtualenv/trac/2.7/bin/trac-admin  ~/trac_project initenv </span>

For <span class="notranslate"> "Database connection string" </span> parameter enter the following: <span class="notranslate"> mysql://user:password@localhost/database_name </span> – here the data for connecting MySQL database are specified.

::: tip Note
In case of "... The charset and collation of database are 'latin1' and 'latin1_swedish_ci' error the database must be created with one of (('utf8', 'utf8_bin'), ('utf8mb4', 'utf8mb4_bin')) ..."  while creating the project, you should change database encoding.
:::

To change encoding, in cPanel run <span class="notranslate"> phpMyAdmin </span> , choose <span class="notranslate"> DB </span> , go to <span class="notranslate"> Operations </span> , choose the necessary encoding in <span class="notranslate"> Collation </span> section and click <span class="notranslate"> Go </span> .

![](/images/trac2.jpg)

After that you have to repeat the procedure of creating a project. When done, the <span class="notranslate"> Trac </span> project must appear: <span class="notranslate"> ~/trac_project </span>

5. To create project frontend run the following:

<span class="notranslate">
~/virtualenv/trac/2.7/bin/trac-admin ~/track_project deploy ~/trac </span>

<span class="notranslate"> ~/track_project </span> — is the path to the project,
<span class="notranslate"> ~/trac </span> — is the path, that was specified while setting <span class="notranslate"> App Directory </span> .

Create topic directory by default:
<div class="notranslate">

```
cd ~/public_html/trac
mkdir chrome 
cp -R ~/trac/htdocs/ ~/public_html/trac/chrome/
```
</div>
- all project static files are located in this directory; the changes can be added here as well.

6. To add path to <span class="notranslate"> WSGI </span> file in created application:

Go back to <span class="notranslate"> cPanel Setup Python App </span> , change <span class="notranslate"> “WSGI file location” </span> for your application to <span class="notranslate"> cgi-bin/trac.wsgi </span> , click <span class="notranslate"> Update </span> to apply changes and then click <span class="notranslate"> Restart </span> .

Your Existing application now must look like the following:

![](/images/trac3.jpg)

7. Adding authorization:

In <span class="notranslate"> ~/public_html/trac/.htaccess </span> after <span class="notranslate"> CLOUDLINUX PASSENGER CONFIGURATION </span> section add the following lines:
<div class="notranslate">

```
AuthType Basic
AuthName "trac"
AuthUserFile /home/tractest/trac/passwd
Require valid-user
```
</div>

8. Add new user and create passwd file <span class="notranslate"> /usr/local/apache/bin/htpasswd </span> with <span class="notranslate"> ~/trac/passwd </span> admin.

Enter password.

<span class="notranslate">
~/virtualenv/trac/2.7/bin/trac-admin  ~/track_project permission add admin TRAC_ADMIN </span>

Add admin user to <span class="notranslate"> TRAC_ADMIN </span> group.

Here the path <span class="notranslate"> trac </span> directory is equal to <span class="notranslate"> App Directory </span> in your project.

Now <span class="notranslate"> Trac </span> is available via <span class="notranslate"> YOUR_DOMAIN/trac </span> .




### Trac with MySQL


To use <span class="notranslate"> Trac </span> with MySQL database you should install <span class="notranslate"> alt-python27-devel </span> package.

To install run:
<div class="notranslate">

```
yum install alt-python27-devel --enablerepo=cloudlinux-updates-testing 
```
</div>

## Deploying Redmine using Ruby Selector

::: tip Note
Provided instructions are valid for older <span class="notranslate"> Redmine </span> version 2.6.0. New versions guide could be found at [http://kb.cloudlinux.com/2016/12/how-to-run-redmine-with-ruby-selector/](http://kb.cloudlinux.com/2016/12/how-to-run-redmine-with-ruby-selector/)
:::

1. In cPanel create MySQL database and add user to it. In the example given, the databace <span class="notranslate"> _redminet_redmine_ </span> was created and user <span class="notranslate"> _redminet_redmine_ </span> was added.

2. In <span class="notranslate"> **Setup Ruby App** </span> section create an application.

<span class="notranslate"> App Directory </span> is the directory where all static files will be placed ( _e.g._ <span class="notranslate"> _redmine_ </span> ).
<span class="notranslate"> App URI </span> is web-interface URL ( _e.g._ <span class="notranslate"> _redmine_ </span> _web-interface will be located in_ <span class="notranslate"> _YOUR_DOMAIN/redmine_ </span> ).

![](/images/hmfile_hash_f8216d04.png)

3. After the application was created, add the following modules:
<span class="notranslate"> bundle, i18n#0.6.11, builder#3.0.4, rails#3.2.19, mime-types#1.25.1, mocha#1.0.0, jquery-rails#3.1.2, coderay, fastercsv, request_store, rbpdf, mysql2, selenium-webdriver, rmagick, shoulda#3.3.2, ruby-openid#2.3.0, request_store#1.0.5, capybara#2.1.0, net-ldap#0.3.1, rack-openid, shoulda-matchers#1.4.1, redcarpet#2.3.0, yard, rake#10.4.2, bigdecimal. </span>


![](/images/hmfile_hash_54c4ccdb.png)

**Note** : If error occurs while installing <span class="notranslate"> rmagic </span> module, then you need to install <span class="notranslate"> ImageMagick-devel </span> package on your server:
<div class="notranslate">

```
yum install ImageMagick-devel
```
</div>
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
<div class="notranslate">

```
cp -R ~/redmine-2.6.0/* ~/redmine
cd ~/redmine/config
cp database.yml.example database.yml
```
</div>
Edit <span class="notranslate"> config/database.yml </span> - add MySQL database connection settings to <span class="notranslate"> Production </span> section.
<div class="notranslate">

```
cp -R ~/redmine/public/* ~/public_html/redmine/
cd ~/public_html/redmine
cat htaccess.fcgi.example >> .htaccess
cp dispatch.fcgi.example dispatch.fcgi
```
</div>
Go to <span class="notranslate"> cd ~/redmine </span> directory.

Add <span class="notranslate"> gem "bigdecimal" </span> line into <span class="notranslate"> Gemfile </span> file.

Run alternately:
<div class="notranslate">

```
source ~/rubyvenv/redmine/2.1/bin/activate
~/rubyvenv/redmine/2.1/bin/bundle install
```
</div>
(if running the alternative installation)
<div class="notranslate">

```
~/rubyvenv/redmine/2.1/bin/rake generate_secret_token
RAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake db:migrate
```
</div>
- Database migration;  

<span class="notranslate"> `RAILS_ENV=production ~/rubyvenv/redmine/2.1/bin/rake redmine:load_default_data`  </span> 
- Loading default data into database.

## Easy Apache 4


Since cPanel/WHM version 66 provides <span class="notranslate"> ea-ruby24-mod_passenger </span> (more information on the [link](https://documentation.cpanel.net/display/66Docs/Application+Manager) ), this allows creating <span class="notranslate"> Ruby </span> applications with cPanel application manager.

CloudLinux already has <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby Selector </span> , which allows creating applications with <span class="notranslate"> ea-apache24-mod-alt-passenger </span> . However, it does not allow using <span class="notranslate"> cPanel application manager </span> .

It is not correct to install both of those packages on the server because they contain the same <span class="notranslate"> passenger </span> module for Apache web server.

The new <span class="notranslate"> ea-ruby24-mod_passenger </span> is available for download from our <span class="notranslate"> updates-testing (beta) </span> repository which allows you to run applications via <span class="notranslate"> cPanel application manager </span> and <span class="notranslate"> CloudLinux Python </span> and <span class="notranslate"> Ruby Selector </span> .

To install run:
<div class="notranslate">

```
# yum install lvemanager alt-python-virtualenv
# yum install ea-ruby24-mod_passenger --enablerepo=cl-ea4-testing
```
</div>

To install <span class="notranslate"> Ruby </span> or <span class="notranslate"> Python Selector </span> follow the instructions on the [link](/python_and_ruby_selector/#python-and-ruby-selector-installation).


