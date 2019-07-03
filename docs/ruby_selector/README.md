# Ruby Selector

We have the ability to deploy <span class="notranslate">Ruby</span> applications via application server. <span class="notranslate">Ruby Selector</span> uses <span class="notranslate">`mod_passenger`</span> to host <span class="notranslate"> Ruby</span>.

This feature is available for CloudLinux 6 or later. It supports only cPanel servers.

You can find a list of supported <span class="notranslate">`alt-ruby`</span> versions using the following commands.

<div class="notranslate">

```
yum grouplist | grep alt-ruby
```
</div>

## Ruby Selector Installation

::: tip Note
The instructions below are suitable only for EasyApache 3 and EasyApache 4. You should follow [this instruction](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:cloudlinux:enable_ruby_python_selector) if you use LiteSpeed.
:::

To use <span class="notranslate">Ruby Selector</span> install alternative <span class="notranslate">Ruby</span> packages:

<div class="notranslate">

```
yum groupinstall alt-ruby 
```
</div>

To use MySQL database you should install <span class="notranslate">`alt-python27-devel`</span> package:

<div class="notranslate">

```
yum install alt-python27-devel
```
</div>

::: tip Note
After installation, please make sure that you have unmarked appropriate checkboxes in <span class="notranslate"> VE Manager Options</span> tab to show <span class="notranslate">Ruby App</span> in web-interface. Find the instructions on the [link](/ruby_selector/#hide-ruby-selector-icons).
:::

::: tip Note
Adding Ruby modules requires executing permissions to <span class="notranslate">`gcc/make`</span> binaries. Please enable compilers in Compiler Access section of WHM, then run: <span class="notranslate">`cagefsctl --force-update`</span>
:::

## End User Access


1. In <span class="notranslate">_Software/Services_</span> area choose <span class="notranslate">_Select Ruby Environment_</span>.

![](/images/clip000133.jpg)


2. Create project form will appear. Choose interpreter version for your application, application folder name (project path) and <span class="notranslate"> URI </span> for accessing your application. Click <span class="notranslate"> “Create project” </span> to create an application.

![](/images/clip000233.jpg)

After a little while a new application entry will be appended to the web-page.

![](/images/clip000255.jpg)

3. You can edit path (folder name of the project in the home directory, for example, <span class="notranslate">`/home/clman1/project_name`</span>), <span class="notranslate"> uri </span> for application, <span class="notranslate"> wsgi </span> handler. If you click <span class="notranslate"> Edit </span> - the value is converted to input field and thus becomes editable. When editing is complete, click <span class="notranslate"> Save </span>.

![](/images/clip000256.jpg)

4. <span class="notranslate"> Wsgi </span> entry is to specify <span class="notranslate"> python wsgi </span> application entry point. It must be specified as filename, must be callable and separated by colon. If your app is running from file <span class="notranslate"> flask/run.py </span> by calling callable app, set <span class="notranslate">`flask/run.py:app`</span>.

![](/images/clip000257.jpg)

5. When <span class="notranslate"> Show </span> control is clicked, <span class="notranslate"> python </span> extensions section will be expanded. It gives the ability to add or remove <span class="notranslate"> python </span> modules. When start typing in input field, appropriate hints are shown in drop-down list. Choose the entry you want from drop-down and click <span class="notranslate"> Add </span>.

![](/images/clip000261.jpg)

If you click <span class="notranslate">Delete</span>, the corresponding module entry will disappear.

In addition to setting <span class="notranslate"> path, uri </span> and <span class="notranslate">`wsgi`</span>, the interpreter version can be changed as well by changing the value in select drop-down.

6. No changes are applied to application environment until <span class="notranslate"> Update </span> button is clicked. Before the <span class="notranslate"> Update </span> button is clicked, all changes can be reverted with <span class="notranslate"> Reset </span> button.

The newly created application will be supplied with <span class="notranslate"> stub </span> only. A real application ought to be put into application folder. After application is placed into application folder, the <span class="notranslate"> wsgi </span> parameter can be set.

Click <span class="notranslate"> Remove </span> to delete the application - the application folder itself will remain unmoved.

:::tip Note
For <span class="notranslate"> LVE Manager </span> version 0.9-10 and higher
:::

When creating an application you can use the key <span class="notranslate">`--domain`</span>, which attaches application to domain. If <span class="notranslate">`--domain`</span> key is not specified, then the main users domain will be used by default.

To create application run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<ruby> --version=VERSION[--user=USER] [--domain=DOMAIN] [--print-summary] [--json]–-create-webapp <FOLDER_NAME> <URI>
```
</div>
When changing application URI, <span class="notranslate">`--domain`</span> key can be used simultaneously, in this case not only <span class="notranslate"> URI </span> will be changed, but also the application domain.

To change application <span class="notranslate"> URI </span> run:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=<ruby> [--user=USER][--domain=NEW_DOMAIN] [--print-summary] [--json] --transit-webapp<FOLDER_NAME> <NEW_URI> 
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
/usr/bin/selectorctl --interpreter=ruby --version=VERSION [--user=USER] [--print-summary] [--json] --create-webapp <FOLDER_NAME> <URI>
```
</div>
To delete application:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=ruby [--user=USER] [--print-summary] [--json] --destroy-webapp <FOLDER_NAME>
```
</div>
To change application folder name:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=ruby [--user=USER] [--print-summary] [--json] --relocate-webapp <FOLDER_NAME> <NEW_FOLDER_NAME>
```
</div>

To change application <span class="notranslate"> URI </span> :
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=ruby [--user=USER] [--print-summary] [--json] --transit-webapp <FOLDER_NAME> <NEW_URI>
```
</div>

To change application interpreter version:
<div class="notranslate">

```
/usr/bin/selectorctl --interpreter=ruby [--user=USER] [--print-summary] [--json] --set-user-current --version=<NEW VERSION> <FOLDER_NAME>
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

## Hide Ruby Selector Icons


It is possible to hide or show <span class="notranslate">Ruby Selector</span> icon by marking or unmarking proper checkboxes in <span class="notranslate"> LVE Manager Options</span> tab.

![](/images/CL-hide-python-ruby.png)


The same result can be accomplished in CLI by running:

<div class="notranslate">

```
cloudlinux-config set --json --data '{"options":{"uiSettings":{"hideRubyApp":false}}}'
```
</div>
 
:::tip Note
If you are using cPanel/WHM, you can also configure hide/show <span class="notranslate">CloudLinux Ruby Selectors</span> in <span class="notranslate">WHM | Feature Manager</span>.
For that, you’d need to first uncheck <span class="notranslate">`Hide Ruby App in web-interface`</span> in the <span class="notranslate">LVE Manager</span>. This will make the menu appear for all accounts. After that, you are free to disable this app in <span class="notranslate">WHM | Feature Manager</span> for the required feature lists. 
:::


## Deploying Redmine using Ruby Selector

::: tip Note
Provided instructions are valid for older <span class="notranslate"> Redmine </span> version 2.6.0. New versions guide could be found at [http://kb.cloudlinux.com/2016/12/how-to-run-redmine-with-ruby-selector/](http://kb.cloudlinux.com/2016/12/how-to-run-redmine-with-ruby-selector/)
:::

1. In cPanel create MySQL database and add user to it. In the example given, the databace <span class="notranslate"> _redminet_redmine_ </span> was created and user <span class="notranslate"> _redminet_redmine_ </span> was added.

2. In <span class="notranslate"> **Setup Ruby App**</span> section create an application.

<span class="notranslate"> App Directory</span> is the directory where all static files will be placed ( _e.g._ <span class="notranslate">`redmine`</span>).
<span class="notranslate"> App URI </span> is web-interface URL ( _e.g._ <span class="notranslate"> _redmine_ </span> _web-interface will be located in_ <span class="notranslate"> _YOUR_DOMAIN/redmine_ </span>).

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

## EasyApache 4


Since cPanel/WHM version 66 provides <span class="notranslate">ea-ruby24-mod_passenger</span> (more information on the [link](https://documentation.cpanel.net/display/66Docs/Application+Manager)), this allows creating <span class="notranslate"> Ruby </span> applications with cPanel application manager.

CloudLinux already has <span class="notranslate"> Python </span> and <span class="notranslate"> Ruby Selector </span> , which allows creating applications with <span class="notranslate"> ea-apache24-mod-alt-passenger </span> . However, it does not allow using <span class="notranslate"> cPanel application manager </span> .

It is not correct to install both of those packages on the server because they contain the same <span class="notranslate"> passenger </span> module for Apache web server.

The new <span class="notranslate"> ea-ruby24-mod_passenger </span> is available for download from our <span class="notranslate"> updates-testing (beta) </span> repository which allows you to run applications via <span class="notranslate"> cPanel application manager </span> and <span class="notranslate"> Ruby Selector</span>.

To install run:
<div class="notranslate">

```
# yum install lvemanager alt-python-virtualenv
# yum install ea-ruby24-mod_passenger --enablerepo=cl-ea4-testing
```
</div>