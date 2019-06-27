# PHP Selector


<span class="notranslate"> PHP Selector </span> is a CloudLinux component that sits on top of CageFS. It allows each user to select PHP version and module based on their needs. <span class="notranslate"> PHP Selector </span> requires account to have CageFS enabled to work.

<span class="notranslate"> PHP Selector </span> is **compatible** with the following technologies: <span class="notranslate"> _suPHP, mod_fcgid, CGI (suexec), LiteSpeed_ </span> .

It is **not compatible** with <span class="notranslate"> _mod_php/DSO_ </span> , including <span class="notranslate"> _mod_ruid2_ </span> and <span class="notranslate"> _MPM ITK_ . </span>

::: tip Note
PHP Selector is not supported for H-Sphere.
:::

## Installation and Update


The installation of <span class="notranslate"> PHP Selector </span> presumes that you already have  [CageFS](/cagefs/)  &  <span class="notranslate"> [LVE Manager](/lve_manager/)  installed. </span>

Use [compatibility matrix](/limits/#compatiblity_matrix) to check if your Web Server/PHP mode is supporting <span class="notranslate"> PHP Selector. </span> If not, you need a change to one of the supported models.

Installation of different versions of PHP & modules:
<div class="notranslate">

```
$ yum groupinstall alt-php
```
</div>

Update CageFS & <span class="notranslate"> LVE Manager with support for PHP Alternatives: </span> 
<div class="notranslate">

```
$ yum update cagefs lvemanager
```
</div>

<span class="notranslate"> **cPanel/WHM** : Make sure 'Select PHP version' </span> is enabled in <span class="notranslate"> Feature Manager </span> .

**IMPORTANT** : Please, do not use settings like <span class="notranslate"> _SuPHP_ConfigPath, PHPRC, PHP_INI_SCAN_DIR_ .  </span> Do not redefine path to <span class="notranslate"> php.ini </span> and ini-files for PHP modules. Doing that can break <span class="notranslate"> PHP Selector </span> functionality.

For example, alternative php5.2 versions should load <span class="notranslate"> _/opt/alt/php52/etc/php.ini_ </span> file and scan <span class="notranslate"> _/opt/alt/php52/etc/php.d_ </span> directory for modules:
<div class="notranslate">

```
Configuration File (php.ini) Path         /opt/alt/php52/etc
Loaded Configuration File                 /opt/alt/php52/etc/php.ini
Scan this dir for additional .ini files   /opt/alt/php52/etc/php.d
additional .ini files parsed              /opt/alt/php52/etc/php.d/alt_php.ini
```
</div>

Those are default locations for <span class="notranslate"> alt-php </span> .

If you need custom PHP settings per user, please change them via <span class="notranslate"> "Edit PHP settings" </span> feature of <span class="notranslate"> PHP Selector </span> .

If a list of default modules is absent on the server in the <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ file for some alt-PHP version and there is _nd_mysqli_ extension in this version, then on installation/update of the LVE Manager, </span> the _mysqli_ extension will be disabled and _nd_mysqli_ extension will be enabled automatically.

* If _nd_mysqli_ module is absent or a list of enabled modules is available, then they won't be changed automatically.
* If alt-PHP is not installed on LVE Manager installation/update, then they won’t be changed automatically.

To change the modules status (enabled/disabled) manually, run the following command in a console:
<div class="notranslate">

```
# /usr/sbin/cloudlinux-selector make-defaults-config --json --interpreter=php
```
</div>

**Update**

To update PHP Selector, run the following command:
<div class="notranslate">

```
yum groupupdate alt-php
```
</div>

This command allows to install newly released versions in <span class="notranslate"> PHP Selector. </span>

### LiteSpeed support

::: tip Note
LiteSpeed detects CloudLinux OS and applies all settings out-of-the-box.
:::

If the settings were not applied, you can use the following steps to set up LiteSpeed to use <span class="notranslate"> PHP Selector. </span>

**How to set up LiteSpeed version lower than 5.3 to use PHP Selector**

To enable <span class="notranslate"> PHP Selector </span> with <span class="notranslate"> LiteSpeed Web Server </span> follow <span class="notranslate"> PHP Selector  </span> [installation guide](/php_selector/#installation-and-update) , and then adjust following settings in <span class="notranslate"> LiteSpeed </span> :

1. <span class="notranslate"> CloudLinux (Admin Console --> Configuration --> Server --> General): CageFS </span>
2. Enable <span class="notranslate"> SuExec: Server--> General --> PHP SuEXEC --> Yes </span>
3. Go to <span class="notranslate"> _External App_ </span> tab, the new <span class="notranslate"> **lsphp_selector** </span> is here.

**_[Note that you can select any other application or create a custom one.]_**

![](/images/litespeed1_zoom70.png)

4. The <span class="notranslate"> _Command_ </span> line should be <span class="notranslate"> **/var/www/cgi-bin/cgi_wrapper/cloudlinux_wrapper** </span> on <span class="notranslate"> Plesk </span> . For other control panels, <span class="notranslate"> _Command_ </span> line should be <span class="notranslate"> **/usr/local/bin/lsphp** </span> .

<span class="notranslate"> _Run On Start Up_ </span> line must contain <span class="notranslate"> **Yes** </span> or <span class="notranslate"> **No** </span> .

For <span class="notranslate"> Plesk </span> :

![](/images/litespeed3_zoom70.png)

For other control panels:

![](/images/litespeed2_zoom70.png)

5. Go to <span class="notranslate"> _Script Handler_ </span> tab. For required suffixes change the <span class="notranslate"> _Handler Name_ </span> to <span class="notranslate"> **lsphp_selector** </span> .

![](/images/litespeed4_zoom70.png)


![](/images/litespeed5_zoom70.png)

**Additional settings for LiteSpeed version 5.3 +**

Go to <span class="notranslate"> Server --> PHP </span> tab. Click <span class="notranslate"> _Edit_ </span> in the <span class="notranslate"> _PHP Handler Defaults_ </span> section. We recommend to set up the following settings:

* Set <span class="notranslate"> _Yes_ </span> in the <span class="notranslate"> _Run On Startup_ </span>
* Make sure to set <span class="notranslate"> _Max Idle Time_ </span> 

![](/images/litespeed_4_zoom70.png)

::: tip Note
In order to use <span class="notranslate"> PHP Selector and custom php.ini, lsphp5 </span> needs to be in SuEXEC non-daemon mode.
:::

::: tip Note
Some PHP configurations require more memory for SuExec to work properly. If you are getting error 500 after switching suEXEC to non-daemon mode, try to increase <span class="notranslate"> Memory Soft Limit and Memory Hard Limit for external App </span> to at least 650/800M.
:::

::: tip Note
If you have LiteSpeed installed not in standard location path, please create a symlink: <span class="notranslate"> 'ln -s /path/to/custom/lsws /usr/local/lsws' then run 'cagefsctl --setup-cl-selector'. </span>
:::

### ISPmanager support


As of July 2013, <span class="notranslate"> PHP Selector </span> support for <span class="notranslate"> ISPmanager </span> is limited to command line utilities. You should still be able to use it.

As always, <span class="notranslate"> PHP Selector </span> requires <span class="notranslate">  CGI, FCGI </span> or <span class="notranslate"> suPHP </span> to work.

You will need to do following modifications:

Create new file <span class="notranslate"> /usr/local/bin/php-cgi-etc: </span>
<div class="notranslate">

```
#!/bin/bash
/usr/bin/php-cgi -c /etc/php.ini "$@"
```
</div>
Make that file executable:
<div class="notranslate">

```
$ chmod +x /usr/local/bin/php-cgi-etc
```
</div>
Edit file <span class="notranslate"> /usr/local/ispmgr/etc/ispmgr.conf </span>

Add a line:
<div class="notranslate">

```
path phpcgibinary /usr/local/bin/php-cgi-etc
```
</div>

Make sure there is no other lines with <span class="notranslate"> _path phpcgibinary_ </span> defined in the file.

Restart <span class="notranslate"> ISPmanager </span> :
<div class="notranslate">

```
$ killall ispmgr
```
</div>

After that <span class="notranslate"> FCGID </span> wrappers <span class="notranslate"> (/var/www/[USER]/data/php-bin/php) </span> for new users will be like this:

<span class="notranslate"> #!/usr/local/bin/php-cgi-etc </span>

You might need to edit/modify wrappers for existing users if you want them to be able to use <span class="notranslate"> PHP Selector </span> . You can leave them as is for users that don't need such functionality.

## Configuration


* [Setting default version and modules](/php_selector/#setting-default-version-and-modules)
* [Individual PHP.ini files](/php_selector/#individual-php-ini-files)
* [Substitute global php.ini for individual customer](/php_selector/#substitute-global-php-ini-for-individual-customer)
* [Managing interpreter version](/php_selector/#managing-interpreter-version)
* [Including ](/php_selector/#including-php-selector-only-with-some-packages-cpanel) <span class="notranslate"> [PHP Selector](/php_selector/#including-php-selector-only-with-some-packages-cpanel) </span> [ only with some packages (cPanel)](/php_selector/#including-php-selector-only-with-some-packages-cpanel)
* [PHP Extensions](/php_selector/#php-extensions)
* [FFmpeg](/php_selector/#ffmpeg)
* [Native PHP Configuration](/php_selector/#native-php-configuration)

### Setting Default Version and Modules


Administrator can set default interpreter version and extensions for all users. All file operations are actually done by CageFS. CageFS takes settings from <span class="notranslate">  /etc/cl.selector/defaults.cfg. </span> Currently the <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> is created and handled by <span class="notranslate"> CloudLinux PHP Selector </span> scripts. It has the following format:
<div class="notranslate">

```
[global]
selector=enabled

[versions]
php=5.4

[php5.4]
modules=json,phar

[php5.3]
modules=json,zip,fileinfo
```
</div>

### Individual PHP.ini files


For each customer, inside CageFS, file <span class="notranslate"> alt_php.ini is located in /etc/cl.php.d/alt-phpXX (XX </span> - version of PHP, like 52 or 53). The file contains PHP extension settings and extension directives selected by customer. This file exists for each customer, for each PHP version.

Note, that this is <span class="notranslate"> 'local' to CageFS, </span> and different users will have different files. The file is not visible in <span class="notranslate"> /etc/cl.php.d </span> outside CageFS. If you would like to view that file, use:
<div class="notranslate">

```
# cagefsctl -e USERNAME 
```
</div>

to enter into CageFS for that user. Then type: <span class="notranslate"> `exit` </span> ; to exit from CageFS

This file has to be updated using <span class="notranslate"> `cagefsctl --rebuild-alt-php-ini` </span> after updating <span class="notranslate"> alt-php </span> RPMs

Admin can change individual settings for PHP extensions by changing that extension's ini file, like editing <span class="notranslate"> /opt/alt/php54/etc/php.d.all/eaccelerator.ini </span> and then running:
<div class="notranslate">

```
cagefsctl --rebuild-alt-php-ini
```
</div>
to propagate the change.

### Substitute global php.ini for individual customer


Sometimes you might want to have a single customer with a different php.ini, than the rest of your customers.

To do that, you will use <span class="notranslate"> [custom.etc directory functionality](/cagefs/#custom-etc-files-per-customer) </span>

1. Move default php.ini into <span class="notranslate"> _/etc_ </span> directory and create a symlink to it:

<div class="notranslate">

```
$ mv /usr/local/lib/php.ini /etc/php.ini
$ ln -fs /etc/php.ini /usr/local/lib/php.ini
```
</div>

2. Change path to php.ini in <span class="notranslate"> _/etc/cl.selector/native.conf_ </span> file to:

<div class="notranslate">

```
php.ini=/etc/php.ini
```
</div>

3. For each user that needs custom file, create directory <span class="notranslate"> _/etc/cagefs/custom.etc/USER_NAME/php.ini_ </span> .

For example if you want to create custom for <span class="notranslate"> USER1 </span> and <span class="notranslate"> USER2 </span> you would create files:  
<span class="notranslate"> _/etc/cagefs/custom.etc/USER1/php.ini_ </span>  
<span class="notranslate"> _/etc/cagefs/custom.etc/USER2/php.ini_ </span>

Create such files for each user that should have custom file.

4. Execute:

<div class="notranslate">

```
$ cagefsctl --force-update 
```
</div>

::: tip Notes

1. Make sure that `php.ini` load path is set to <span class="notranslate">`/etc/php.ini`</span>

2. Users will be able to override settings of those php.ini files (global or custom) via <span class="notranslate">PHP Selector</span>. If you want to prevent that, you should disable <span class="notranslate">PHP Selector</span> feature.

3. Even if <span class="notranslate">PHP Selector</span> is disabled, user can override PHP settings by using <span class="notranslate">`ini_set() php`</span> function in PHP script, or by <span class="notranslate">`php -c`</span> command line option.

4. If you modify anything in <span class="notranslate">`/etc/cagefs/custom.etc`</span> directory, you should execute:

<div class="notranslate">

```
$ cagefsctl --update-etc
```
</div>

in order to apply changes to CageFS for all users.

OR 

<div class="notranslate">

```
$ cagefsctl --update-etc user1 user2
```
</div>

to apply changes to CageFS for specific users.

:::

### Managing interpreter version


Managing interpreter versions is done by means of manipulating a set of symbolic links that point to different versions of interpreter binaries. For example, if default PHP binary is <span class="notranslate"> `/usr/local/bin/php` </span> :

* First we move the default binary inside CageFS to <span class="notranslate"> `/usr/share/cagefs-skeleton/usr/selector` </span> , and make <span class="notranslate"> /usr/local/bin/php </span> a symlink pointing to <span class="notranslate"> /etc/cl.selector/php </span> . This operation is done as part of CageFS deployment.
* Next suppose we have additional PHP version, say 7.2.5. The information about all additional interpreter binaries and paths for them is kept in <span class="notranslate"> /etc/cl.selector/selector.conf </span> . This config file is updated by RPM package manager each time alternative PHP package is added, removed or updated
* <span class="notranslate"> `/usr/bin/selectorctl --list --interpreter=php` </span> will get us list of all available PHP interpreter versions out of <span class="notranslate"> /etc/cl.selector/selector.conf file </span> .
Next we want to know which PHP version is active for a given user (to supply a selected option in options list). We type:
* <span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --user-current` </span> will retrieve PHP version set for a particular user. The script gets the path from <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector/php` </span> symlink, compares it with contents of <span class="notranslate"> /etc/cl.selector/selector.conf </span> file and if path is valid, prints out the current interpreter version.
* <span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --set-user-current=7.2` </span> sets the current PHP version for particular user by creating symlink in <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector` </span> directory. All old symlinks are removed, and new symlinks are set.




### Including PHP Selector only with some packages (cPanel)


<span class="notranslate"> cPanel </span> has a ' <span class="notranslate"> Feature Manager </span> ' in WHM that allows you to disable <span class="notranslate"> PHP Selector </span> for some of the packages that you offer.

In reality it only disables the icon in <span class="notranslate"> cPanel </span> interface. Yet, in most cases it should be enough in shared hosting settings.

You can find more info on ' <span class="notranslate"> Feature Manager </span> ' here: [http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager](http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager)


Once <span class="notranslate"> PHP Selector </span> is enabled, you can find it in the <span class="notranslate"> Feature Manager </span> . Disabling it in <span class="notranslate"> Feature Manager </span> , will remove the icon for users that are using that particular <span class="notranslate"> 'Feature List' </span>

![](/images/screen1-phpselector-featuremanager.png)

### PHP Extensions

**Configuring Alt-PHP modules loading**


<span class="notranslate"> CloudLinux PHP Selector </span> and Alt-PHP can be used in conjunction with <span class="notranslate"> Plesk PHP Selector </span> and <span class="notranslate"> cPanel MultiPHP </span> . To be compatible, <span class="notranslate"> CloudLinux PHP Selector </span> works as follows: modules that are selected in <span class="notranslate"> CloudLinux PHP Selector </span> are loaded for Alt-PHP version selected in <span class="notranslate"> CloudLinux PHP Selector </span> only. For the rest Alt-PHP versions default module set is loaded <span class="notranslate"> ( _/opt/alt/phpXX/etc/php.d/default.ini_ ) </span> . Described above is default behavior.

::: tip Note
If system default PHP version selected in <span class="notranslate"> cPanel MultiPHP Manager is not ea-php, then default module set is loaded for all Alt-PHP versions by default (/opt/alt/phpXX/etc/php.d/default.ini). </span>

When <span class="notranslate"> "php.d.location = selector" option is in effect, modules selected via PHP Selector </span> will be loaded for all alt-php versions.
:::



This behavior is implemented in CageFS-6.1-10 and later.

In <span class="notranslate"> LVE Manager </span> 1.0-9.40+ this behavior can be modified so that modules selected in <span class="notranslate"> CloudLinux PHP Selector </span> would be loaded for all Alt-PHP versions (with CageFS enabled), which can be quite useful if you use  ‘ <span class="notranslate"> per directory </span> ’ or ‘ <span class="notranslate"> per domain </span> ’ Alt-PHP configuration and want to select modules using <span class="notranslate"> CloudLinux PHP Selector </span> .

To modify it, create a file <span class="notranslate"> _/etc/cl.selector/symlinks.rules_ </span> (read-only for regular users) with the following content: <span class="notranslate"> _php.d.location = selector_ </span>

And run the command to apply changes:
<div class="notranslate">

```
/usr/bin/selectorctl --apply-symlinks-rules
```
</div>
To revert to the default behavior:

* Delete <span class="notranslate"> _/etc/cl.selector/symlinks.rules_ </span> file.
* Alternatively remove <span class="notranslate"> _php.d.location_ </span> option from the file.
* Alternatively set <span class="notranslate"> _default_ </span> value for <span class="notranslate"> _php.d.location_ </span> option.

And run the command to apply changes:
<div class="notranslate">

```
/usr/bin/selectorctl --apply-symlinks-rules
```
</div>

### FFmpeg


Due to possible patent issues CloudLinux does not provide <span class="notranslate"> FFmpeg </span> libraries ( [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html) ). We highly recommend researching if you can legally install <span class="notranslate"> FFmpeg </span> extension on your server. This might differ based on where you and your servers are located. More information can be found on the link: [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html)

For your convenience we provide <span class="notranslate"> FFMPEG PHP </span> binding. For them to work, you need to install <span class="notranslate"> FFmpeg </span> package from the “ <span class="notranslate"> Nux Dextop </span> ” repository following the [instructions](http://li.nux.ro/repos.html).

Once <span class="notranslate"> FFmpeg </span> is installed you can install PHP bindings, by running:
<div class="notranslate">

```
yum install alt-php*ffmpeg 
```
</div>

Enable <span class="notranslate"> PHP-FFmpeg </span> extension via <span class="notranslate"> PHP Selector </span> :
<div class="notranslate">

```
selectorctl --enable-extensions=ffmpeg --user USERNAME --version X.Y
```
</div>

### Native PHP Configuration


<span class="notranslate"> PHP Selector </span> requires access to the <span class="notranslate"> native PHP </span> version for proper work. It is specified in the file <span class="notranslate"> _/etc/cl.selector/native.conf_ </span> of the following content (example):
<div class="notranslate">

```
php=/usr/bin/php-cgi
php-cli=/usr/bin/php
php.ini=/etc/php.ini
```
</div>

The file is created when installing CageFS on the servers with <span class="notranslate"> cPanel, Plesk, DA, Interworx and ISP Manager </span> , if it is missing. On all other servers the file is not being created at all.

That is why, if the file is not created automatically, then it must be created manually and correct paths must be written to its directives.

Access permission 644 must be set:
<div class="notranslate">

```
chmod 0644 /etc/cl.selector/native.conf
```
</div>

## Command-line Tools


| | |
|-|-|
|<span class="notranslate"> /usr/bin/cl-selector </span>  | Tool is used to select version of PHP interpreter inside CageFS. Note. The command is obsolete, please use <span class="notranslate"> [selectorctl](/php_selector/#selectorctl) </span> instead.|
|<span class="notranslate"> /usr/bin/alt-php-mysql-reconfigure.py </span> | Reconfigures <span class="notranslate"> alt-php </span> extensions to use correct MySQL library, based on the one installed in the system.|


### selectorctl


<span class="notranslate"> selectorctl </span> is a new tool that replaces <span class="notranslate"> cl-selector </span> (which is deprecated and should not be used anymore) and <span class="notranslate"> piniset </span> . It is available starting with **CageFS 5.1.3** .

All new features will be implemented as part of <span class="notranslate"> selectorctl </span> .

**Common Options**

| | |
|-|-|
|<span class="notranslate"> --interpreter (-i) </span> : | chooses the interpreter to work with. Currently only PHP is supported. If omitted, <span class="notranslate"> --interpreter=php </span> is implied.|
|<span class="notranslate"> --version (-v) </span> : | specifies alternatives version to work with|
|<span class="notranslate"> --user (-u) </span> : | specifies user to take action upon.|
|<span class="notranslate"> --show-native-version (-V) </span> : | prints the version of native interpreter|

**Global Options**

The global options modify settings in <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> file.

| | |
|-|-|
|<span class="notranslate"> --list (-l) </span> : | lists all available alternatives for an interpreter. For instance on server with Alt-PHP installed, it produces the following output. Columns are: short alternative version, full alternative version and path to php-cgi binary. |
| |<span class="notranslate"> $ selectorctl --list <br>5.2 5.2.17 /opt/alt/php52/usr/bin/php-cgi <br>5.3 5.3.28 /opt/alt/php53/usr/bin/php-cgi <br>5.4 5.4.23 /opt/alt/php54/usr/bin/php-cgi <br>5.5 5.5.7 /opt/alt/php55/usr/bin/php-cgi </span>|
|<span class="notranslate"> --summary (-S) </span> : | prints alternatives state summary. Output format: alternative version, state ('e' for 'enabled', '-' otherwise), chosen as default one or not ('d' for 'default', '-' otherwise). For example:| 
| |<span class="notranslate"> $ selectorctl --summary <br>5.2 e - <br>5.3 e - <br>5.4 e - <br>5.5 e - <br>native e d </span>|
| |if used with <span class="notranslate"> `--show-native-version` </span> displays version for native interpreter:|
| |<span class="notranslate"> $ selectorctl --summary --show-native-version <br>5.2 e - <br>5.3 e - <br>5.4 e - <br>5.5 e - <br>native(5.3) e d </span>|
|<span class="notranslate"> --current (-C) </span> : | prints currently globally selected default version (it is stored in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file):|
| |<span class="notranslate"> $ selectorctl --current <br>native native /usr/bin/php </span>|
| |If used with <span class="notranslate"> `--show-native-version` </span> , native interpreter version is displayed as well:|
| |<span class="notranslate"> --current --show-native-version <br>native(5.3) native(5.3.19) /usr/bin/php </span> |
|<span class="notranslate"> --set-current (-B): </span>  | sets specified version as globally default one (in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file). For example, to set current default version of PHP to 5.4, use:|
| |<span class="notranslate"> $ selectorctl --set-current=5.4 </span>|
|<span class="notranslate"> --disable-alternative (-N): </span> | adds <span class="notranslate"> state=disabled </span> option to alternative section. With it a corresponding alternative gets removed from user alternatives selection list. For instance to disable PHP 5.2, run:|
| |<span class="notranslate"> $ selectorctl --disable-alternative=5.2 </span>|
|<span class="notranslate"> --enable-alternative (-Y): </span> | Enables alternative version, removes <span class="notranslate"> state=disabled </span> option, if present, from alternative section. For example to enable PHP 5.2:|
| |<span class="notranslate"> $ selectorctl --enable-alternative=5.2 </span>|
|<span class="notranslate"> --enable-extensions (-E): </span> | enables extensions for particular PHP version by adding comma-separated list of extensions of modules for alternative in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> . Requires <span class="notranslate"> --version </span> option. For example:|
| |<span class="notranslate"> $ selectorctl --enable-extensions=pdo,phar --version=5.2 </span>|
|<span class="notranslate"> --disable-extensions (-D): </span>  | removes extensions for a particular PHP version. Comma-separated list of extensions will be removed from <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> . Requires <span class="notranslate"> --version </span> . Example:|
| |<span class="notranslate"> $ selectorctl --disable-extensions=pdo,phar --version=5.2 </span>|
|<span class="notranslate"> --replace-extensions (-R): </span> | replaces all extensions for particular PHP version to the list of comma separated extensions. Requires <span class="notranslate"> `--version`  option </span> . Example:|
| |<span class="notranslate"> $ selectorctl --replace-extensions=pdo,phar --version=5.2 </span>|
|<span class="notranslate"> --list-extensions (-G): </span> | lists extensions for an alternative for a particular version. Requires <span class="notranslate"> --version </span> . Example:|
| |<span class="notranslate"> $ selectorctl --list-extensions --version=5.3 <br>~ xml <br>- xmlreader <br>- xmlrpc <br>- xmlwriter <br>- xrange <br>+ xsl </span>|
| |Plus sign (+) stands for 'enabled', minus (–) for 'disabled', tilde (~) means compiled into interpreter. Enabled and disabled state relates to presence in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file.|

**End User Options**

All end-user settings are contained in individual user's alt_php.ini files and controlled using selectorctl command.

| | |
|-|-|
|<span class="notranslate"> --user-summary (-s): </span>  | prints user alternatives state summary. Example:|
| |<span class="notranslate"> $ selectorctl --user-summary --user=user1 <br>5.2 e - - <br>5.3 e - - <br>5.4 e - - <br>5.5 e - - <br>native e d s </span>|
| |Columns are: alternative version, state ('e' for 'enabled', '-' otherwise), chosen as default one or not('d' for 'default', '-' otherwise), selected as user default one or not ('s' for 'selected', '-' otherwise). If used with <span class="notranslate"> `--show-native-version` </span> , version for native interpreter is shown in parenthesis:|
| |<span class="notranslate"> $ selectorctl --user-summary --user=user1 --show-native-version <br>5.2 e - - <br>5.3 e - - <br>5.4 e - - <br>5.5 e - - <br>native(5.3) e d s </span>|
| |<span class="notranslate"> `--user` </span> option is required. |
|<span class="notranslate"> --current (-c): </span> | prints currently globally selected default version (in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file):|
| |<span class="notranslate"> $ selectorctl --current <br>5.3 5.3.28 /opt/alt/php53/usr/bin/php-cgi </span>|  
| |If used with <span class="notranslate"> `--show-native-version` </span> to display native version:|
| |<span class="notranslate"> $ selectorctl --user-current --user=user1 <br>5.3 5.3.28 /opt/alt/php53/usr/bin/php-cgi </span>| 
| |<span class="notranslate"> `--user` </span> option is required.|
|<span class="notranslate"> --set-user-current (-b): </span> | sets specified version as the one to use for this end user:|
| |<span class="notranslate"> $ selectorctl --set-user-current=5.4 --user=user1 </span>|
| |changes user symlinks for the PHP interpreter to point to alternative 5.4.|
| |<span class="notranslate"> --user </span> option is required.|
|<span class="notranslate"> --enable-user-extensions (-e): </span> | Enables comma-separated list of extensions for the user user. Information is saved to <span class="notranslate"> _alt_php.ini_ </span> file. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --enable-user-extensions=pdo,phar --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --disable-user-extensions (-d): </span> | Disables extensions provided as comma-separated list. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --disable-user-extensions=pdo,phar --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --replace-user-extensions (-r): </span> | Replaces extensions with a provided comma-separated list of extensions Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options:|
| |<span class="notranslate"> $ selectorctl --replace-user-extensions=pdo,phar --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --reset-user-extensions (-t): </span> | Resets extensions for end user to default list of extensions as defined in <span class="notranslate"> default.cfg </span> . Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --reset-user-extensions --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --list-user-extensions (-g): </span> | lists enabled user extensions for an alternative. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --list-user-extensions --version=5.3 --user=user1 <br>xml <br>xmlreader <br>xmlrpc </span>|
| |if <span class="notranslate"> `--all` </span> option present, command will list all alternatives extensions marked enabled or disabled for given user. For example:|
| |<span class="notranslate"> $ selectorctl --list-user-extensions --version=5.3 --user=user1 --all <br>- xmlreader <br>- xmlrpc <br>- xmlwriter <br>- xrange <br>+ xsl </span>|
| |Plus sign (+) stands for 'enabled', minus (–) stands for 'disabled'. Enabled and disabled state relates to presence or absence of corresponding extensions in user <span class="notranslate"> _alt_php.ini_ </span> file.|
|<span class="notranslate"> --add-options (-k): </span> | adds options (as in <span class="notranslate"> _php.ini_ </span> ) to user <span class="notranslate"> _alt_php.ini_ </span> file. For example:|
| |<span class="notranslate"> $ selectorctl --add-options=log_errors:on,display_errors:on --version=5.2 --user=user1 </span>
| |adds <span class="notranslate"> `log_error` </span> and <span class="notranslate"> `display_errors` </span> options with values <span class="notranslate"> 'on' </span> to user <span class="notranslate"> _alt_php.ini_ </span> file overwriting default values for a user. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
|<span class="notranslate"> --replace-options (-m): </span> | replaces all options in user <span class="notranslate"> _alt_php.ini_ </span> file with specified ones. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --replace-options=log_errors:on,display_errors:on --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --delete-options (-x): </span> | removes custom options from user <span class="notranslate"> _alt_php.ini_ </span> file. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
| |<span class="notranslate"> $ selectorctl --delete-options=log_errors,display_errors --version=5.2 --user=user1 </span>|
|<span class="notranslate"> --print-options (-P): </span> | print options from <span class="notranslate"> _/etc/cl.selector/php.conf_ </span> file with default values or ones overwritten in user's <span class="notranslate"> _alt_php.ini_ </span> file.|
| |<span class="notranslate"> $ selectorctl --print-options --version=5.2 --user=user1 <br>TITLE:allow_url_fopen <br>DEFAULT:On <br>COMMENT:Allows PHP file functions to retrieve data from remote <br>locations over FTP or HTTP. This option is a great security risk, <br>thus do not turn it on without necessity. <br>TYPE:bool <br>... </span>|
| |Requires <span class="notranslate"> `--user`   </span> option. <span class="notranslate"> `--version` </span> option is optional. When <span class="notranslate"> `--version` </span> is omitted, options for current selected version will be printed. By default outputs as plain test. If <span class="notranslate"> `--json` ,  `--csv` ,  `--perl` </span> is specified, outputs data in corresponding format. For example, with <span class="notranslate"> `--perl` </span> option, the output is perl hash structure that can be evaluated. |
|<span class="notranslate"> --reset-options (-z): </span> | removes custom options from <span class="notranslate"> _alt_php.ini_ </span> files for ALL users and versions. Backup files in home folders are cleared.|
| |<span class="notranslate"> $ selectorctl --reset-options </span>|
| |The ranges of affected customers or versions can be narrowed with <span class="notranslate"> `--version` </span> or <span class="notranslate"> `--user`  options </span> :|
| |<span class="notranslate"> $ selectorctl --reset-options --user=user1,user2 --version=5.3,5.4 </span>|
|<span class="notranslate"> --list-users (-L): </span> | list users that use particular version of interpreter, specified with <span class="notranslate"> `--version` </span> option. For example, to see all users that use PHP version 5.3:|
| |<span class="notranslate"> $ selectorctl --list-users --version=5.3 </span>|
|<span class="notranslate"> --change-to-version (-T): </span> | changes all (or particular user) from one interpreter version to another.|
| |<span class="notranslate"> $ selectorctl --change-to-version=5.2 --version=5.3 </span>|

**Additional Options**

| | |
|-|-|
|<span class="notranslate"> --base64 (-Q) </span> | Sometimes PHP options values can contain commas and other symbols that break command line formatting. In such a case convert a <span class="notranslate"> key:value </span> pair into <span class="notranslate"> base64 </span> and pass it as value for option-related arguments. For example, to add <span class="notranslate"> disable_functions=exec,popen,system </span> and <span class="notranslate"> display_errors=on </span> to user options, do the following:|
| |<span class="notranslate"> $ selectorctl --add-options=`echo disable_functions:exec,popen,system|base64 -w 0`,`echo display_errors:on|base64 -w 0` --version=5.2 --user=user1 --base64 </span>|
| |Option <span class="notranslate"> `-w 0`   </span> of <span class="notranslate"> base64 </span> executable stands for <span class="notranslate"> 'disable wrapping of lines' </span> . Without it <span class="notranslate"> base64 </span> output will break the command. |
|<span class="notranslate"> --quiet </span> | makes <span class="notranslate"> selectorctl </span> continue when it encounter option not found in <span class="notranslate"> _php.conf_ </span> . Without it <span class="notranslate"> selectorctl </span> exits with error.|


### Integrating With Control Panels


This is the list of commands that we use to integrate <span class="notranslate"> PHP Selector </span> with control panels. If you need to integrate <span class="notranslate"> PHP Selector </span> with a custom control panel, you might find all the commands here:

**PHP summary:**

Command:
<div class="notranslate">

```
/usr/bin/selectorctl --summary
```
</div>
Result:
<div class="notranslate">

```
4.4 e -
5.1 e -
5.2 e -
5.3 e -
5.4 e -
5.5 e -
5.6 e -
7.0 e -
7.1 e -
native e d
```
</div>
When native PHP version needs to be displayed:

Command:
<div class="notranslate">

```
/usr/bin/selectorctl --summary --show-native-version
```
</div>

Result:
<div class="notranslate">

```
4.4 e -
5.1 e -
5.2 e -
5.3 e -
5.4 e -
5.5 e -
5.6 e -
7.0 e -
7.1 e -
native(5.6) e d
```
</div>

The first column: PHP version  
The second column: enabled or not ( <span class="notranslate"> e </span> - enabled)  
The third column: if selected as default  ( <span class="notranslate"> d </span> - default)

**Set default version:**
<div class="notranslate">

```
/usr/bin/selectorctl --set-current=_VERSION_
```
</div>

**Disable version:**

<div class="notranslate">

```
/usr/bin/selectorctl --disable-alternative=_VERSION_
```
</div>

**Enable version:**

<div class="notranslate">

```
/usr/bin/selectorctl --enable-alternative=_VERSION_
```
</div>

**List Extensions for a version:**

<div class="notranslate">

```
/usr/bin/selectorctl --list-extensions --version=5.6
```
</div>

Result:
<div class="notranslate">

```
- apc
- bcmath
- big_int
- bitset
- bloomy
~ bz2
- bz2_filter
~ calendar
- coin_acceptor
- crack
~ ctype
+ curl
```
</div>

+: enabled  
~: included in php binary (cannot be disabled)  
-: disabled

**Select Default Extensions (enable comma-separated list of extensions globally for a version):**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --enable-extensions=pdo,json,mysql
```
</div>

**Deselect Default Extensions (disable comma-separated list of extensions globally for a version):**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --disable-extensions=pdo,json,mysql
```
</div>

**Replace extensions with comma-separated list of extensions for a version globally:**

<div class="notranslate">

```
/usr/bin/selectorctl --version=5.6 --replace-extensions=pdo,json,mysql
```
</div>

**Select PHP version for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --set-user-current=_VERSION_ --user=_USER_
```
</div>

**List Enabled extensions for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --list-user-extensions --user=_USER_ --version=_VERSION_
```
</div>

**Enable comma-separated list of extensions for a user:**

<div class="notranslate">

```
/usr/bin/selectorctl --enable-user-extensions=pdo,json,mysql --user=_USER_ --version=_VERSION_
```
</div>

**Reset user’s extensions to defaults:**

<div class="notranslate">

```
/usr/bin/selectorctl --reset-user-extensions --user=_USER_ --version=_VERSION_
```
</div>

**Replace user extensions with comma-separated list of extensions:**

<div class="notranslate">

```
/usr/bin/selectorctl --replace-user-extensions=EXT_LIST --user=_USER_ --version=_VERSION_
```
</div>

<span class="notranslate"> _EXT_LIST_ </span> _a is comma separated list of PHP extensions (for example:_  <span class="notranslate"> _pdo,json,mysql_ </span> )

**List available options for php.ini editing:**

<div class="notranslate">

```
/usr/bin/selectorctl --print-options --user=_USER_ --version=_VERSION_ [--json]
```
</div>

**List available options for php.ini editing (print safe strings):**

<div class="notranslate">

```
/usr/bin/selectorctl --print-options-safe --user=_USER_ --version=_VERSION_ [--json]
```
</div>

**Set php.ini options for end user:**

<div class="notranslate">

```
/usr/bin/selectorctl --user=_USER_ --version=_VERSION_ --replace-options=_OPTIONS_ --base64 [--json]
```
</div>

Here is an example of how you can generate <span class="notranslate"> _OPTIONS_ in base64 </span> format:

<div class="notranslate">

```
OPTIONS=`echo disable_functions:exec,syslog|base64 -w 0`,`echo display_errors:off|base64 -w 0`,`echo post_max_size:128M|base64 -w 0`
echo $OPTIONS
```
</div>

## Removing 


It is not possible to remove <span class="notranslate"> PHP Selector </span> from the system completely as it is an essential part of <span class="notranslate"> LVE Manager </span> and CageFS packages. However, you can make PHP Selector unavailable for cPanel and Plesk users.

To do so, go to <span class="notranslate"> _LVE Manager → PHP Selector_ </span> and check <span class="notranslate"> _Disabled_ as PHP Selector </span> status. Doing so allows you to disable web-interface of the <span class="notranslate"> PHP Selector </span> in the user interface but does not reset custom settings (choosing a version of PHP and modules).

To disable <span class="notranslate"> PHP Selector </span> and make it has no effect on a PHP version on the sites, run the following command:

* this command resets PHP versions to Native:

<div class="notranslate">

```
cagefsctl --cl-selector-reset-versions
```
</div>

* this command resets PHP modules to Default:

<div class="notranslate">

```
cagefsctl --cl-selector-reset-modules
```
</div>

::: danger
These commands can affect PHP version of your clients’ web sites. Use them with caution as improper usage might cause your clients’ web sites down.
:::

## Using 


Once <span class="notranslate">PHP Selector</span> is installed, you will see the <span class="notranslate">**Selector**</span> tab in the <span class="notranslate">**LVE Manager**</span>.

![](/images/php_selector.png)

<span class="notranslate"> PHP Selector </span> lets you select default PHP version, as well as modules that will be available to user out of the box.


Inside <span class="notranslate"> cPanel </span>, User will be able to change PHP version they would have:

![](/images/php_selector_user.png)

as well as extensions that they want to use:

![](/images/php_selector_customer.png)

and php.ini settings

![](/images/php_selector_options.png)

All changes are saved automatically.

## Custom PHP.ini options


**[Requires** <span class="notranslate"> **LVE Manager** </span> **0.6+]**

<span class="notranslate"> PHP Selector </span> allows customer to edit php.ini settings. Admin has a full control over which settings can be modified.

To allow settings to be modifiable, it has to be whitelisted in <span class="notranslate"> /etc/cl.selector/php.conf </span>.

Here are some of the examples of allowed directives:
<div class="notranslate">

```
Directive = safe_mode
Default   = Off
Type      = bool
Remark    = <5.4.0
Comment   = Enables PHP safe mode. This mode puts a number of restrictions on scripts (say, access to file system) mainly for security reasons.
```
</div>

<div class="notranslate">

```
Directive = safe_mode_include_dir
Type      = value
Remark    = <5.4.0
Comment   = If PHP is in the safe mode and a script tries to access some files, files from this directory will bypass security (UID/GID) checks. The directory must also be in include_path. For example: /dir/inc
```
</div>

| | |
|-|-|
|Directive | php.ini setting|
|Default | Default value|
|Type | bool, value (any text), list|
|Range | list of values for list Type|
|Comment | explanation of the setting to display in UI|

Default values, that are shown in <span class="notranslate"> PHP Selector </span> web interface, are taken from <span class="notranslate"> '/opt/alt/phpXX/usr/bin/php -i' </span> runtime values, if
directive is not there, it will use ' <span class="notranslate"> default </span> ' value that was set in <span class="notranslate"> php.conf </span> . So, if you wish to change default value of any option for
"alternative" php version, please modify <span class="notranslate"> /opt/alt/phpXX/etc/php.ini </span> files (where XX = 55, 54, 53, etc according to php version).

Admin can modify the settings using <span class="notranslate"> [selectorctl](/php_selector/#selectorctl) </span> command.

Users can use web interface to modify php.ini settings:

![](/images/php_selector_options.png)

## End user files and directories


The following files and directories are created inside CageFS for each customer:

<span class="notranslate"> /etc/cl.selector </span> - PHP binaries symbolic links.

<span class="notranslate"> /usr/selector/php - Native PHP </span> binaries.

<span class="notranslate"> /etc/cl.php.d/alt-php* </span> - Links to enabled modules.

<span class="notranslate"> /home/user/.cl.selector/alt_phpXX.cfg </span> - Config file for custom PHP options.

like:

<span class="notranslate"> /etc/cl.php.d/alt-php54/fileinfo.ini - /opt/alt/php54/etc/php.d.all/fileinfo.ini </span>



## Compiling your own extensions


Sometimes you might want to compile your own PHP extension for your users to use. In most cases, it is better to contact our support by sending us a support [ticket](https://cloudlinux.zendesk.com/hc/requests/new) . We will try to provide such extension for you via regular updates within 5-7 days.

If you have decided that you want to build it on your own, you would need to build it for each and every supported version of PHP that you have installed. The module installation process is a bit different from standard - you would need to use the version of phpize and php-config binaries that come with particular <span class="notranslate"> Alt-PHP </span> version.

The full process for PHP 5.X and 7.X looks as follows:

1. Download and unpack extension, cd into it's directory.

2. Execute our version of phpize if necessary:

<div class="notranslate">

```
/opt/alt/phpXX/usr/bin/phpize
```
</div>

3. Execute configure with our binary:

<div class="notranslate">

```
./configure --with-php-config=/opt/alt/phpXX/usr/bin/php-config
```
</div>

4. Make the <span class="notranslate"> .so </span> file:

<div class="notranslate">

```
make
```
</div>

5. Copy it to the modules directory (on 32-bit server, use <span class="notranslate"> usr/lib/php/modules </span> ).

<div class="notranslate">

```
cp -rp modules/*.so /opt/alt/phpXX/usr/lib64/php/modules/
```
</div>

6. Add ini file for module to <span class="notranslate"> `/opt/alt/phpXX/etc/php.d.all` . </span>

7. Register new <span class="notranslate"> Alt-PHP </span> version with:

<div class="notranslate">

```
$ cagefsctl --setup-cl-selector
```
</div>

## Roll your own PHP


To add your own PHP version in <span class="notranslate"> PHP Selector </span> :

* Create directory in (like:  /opt/alt/php51), and mimic directory structure inside to be similar to the one of PHP versions bundled by <span class="notranslate"> CloudLinux </span> .
* Put all the ini files for all the modules into <span class="notranslate"> /opt/alt/php51/etc/php.d.all </span>
* Create a symbolic link <span class="notranslate"> /opt/alt/php51/etc/php.d -> /etc/cl.php.d/alt-php51 </span>

Place all such files into <span class="notranslate"> /opt/alt/php51/usr/lib/php/modules </span>

Add an absolute path to PHP binaries into <span class="notranslate"> /etc/cl.selector/selector.conf </span> using the following format:

<div class="notranslate">

```
php     5.1 5.1.2 /opt/alt/php51/usr/bin/php-cgi 
php-cli 5.1 5.1.2 /opt/alt/php51/usr/bin/php 
php-fpm 5.1 5.1.2 /opt/alt/php51/usr/sbin/php-fpm
   ^     ^    ^                ^----- absolute path
   |     |    |---------------------- real version
   |     | -------------------------- version to display
   |--------------------------------- binary to 'substitute'
```
</div>

Execute:
<div class="notranslate">

```
cagefsctl --setup-cl-selector
```
</div>

The new PHP version must be available now for selection in <span class="notranslate"> PHP Selector </span> .

## Detect User's PHP Version


**[** <span class="notranslate"> **LVE Manager** </span> **0.5-63 or higher]**

<span class="notranslate"> PHP Selector </span> provides an easy way to figure out which versions are available and selected for end user from the command line. You can get this information by running:

<div class="notranslate">

```
$ selectorctl --interpreter=php --user-summary --user=USERNAME
```
</div>

<div class="notranslate">

```
The output:
5.2 e - -
5.3 e - s
5.4 e - -
5.5 e - -
native e d -
```
</div>

The first column defines the PHP version. <span class="notranslate"> _Native_ </span> means native PHP version, like the one installed by cPanel with EasyApache.

The second column will contain either <span class="notranslate"> **e** </span> or **-.** If <span class="notranslate"> **e**  </span> is present, it means that given version is enabled, and can be selected by the end user.

The third column can have values <span class="notranslate"> **d**   </span> or **-.** If <span class="notranslate"> **d** </span> is present, that version is considered a 'default' version. Only one PHP version will have **d** indicator.

The fourth column can have values <span class="notranslate"> **s**   </span> or **-.** If <span class="notranslate"> **s** is present, that is the selected version, currently being used by the end user. Only one PHP version will have  <span class="notranslate"> **s** </span>  indicator. </span>

In case a user is not inside CageFS, and as such doesn't use <span class="notranslate"> PHP Selector </span> , you will see the following error message:

<div class="notranslate">

```
ERROR:User USERNAME not in CageFS
```
</div>


## PHP Selector without CageFS


**[LVE Manager 2.0-11.1 or higher]**

<span class="notranslate"> PHP Selector </span> can now be used with CageFS turned off (in case when there is only one user account on the server).

To install run:
<div class="notranslate">

```
yum groupinstall alt-phpyum install cagefs lvemanager
```
</div>

(no need to initialize or turn on CageFS)

<div class="notranslate">

```
selectorctl --setup-without-cagefs USER
```
</div>

( <span class="notranslate"> USER </span> - the name of a user who is using selector. If not specified, the first available cPanel account username will be used).

When executing <span class="notranslate"> `--setup-without-cagefs` </span> , the following actions are performed:

* Creating symlinks to the user modules and options for each <span class="notranslate"> Alt-PHP </span> version:  
<span class="notranslate"> _/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini_ </span>

* In user home directory creating:  
<span class="notranslate"> _.cl.selector/_ </span>

“Backup” settings files (selected version, modules, options):  
<span class="notranslate"> _.cl.selector/defaults.cfg_ </span>  
<span class="notranslate"> _.cl.selector/alt_php44.cfg_ </span>

Symlinks to the selected version:  
<span class="notranslate"> _.cl.selector/lsphp -> /opt/alt/php44/usr/bin/lsphp_ </span>  
<span class="notranslate"> _.cl.selector/php.ini -> /opt/alt/php44/etc/php.ini_ </span>  
<span class="notranslate"> _.cl.selector/php-cli -> /opt/alt/php44/usr/bin/php_ </span>  
<span class="notranslate"> _.cl.selector/php -> /opt/alt/php44/usr/bin/php-cgi_ </span>  

Additional symlinks for environment variable <span class="notranslate"> $PATH </span> (search path) in the file <span class="notranslate"> ~/.bashrc </span> :  
<span class="notranslate"> _.cl.selector/selector.path/_ </span>  
<span class="notranslate"> _.cl.selector/selector.path/php-cgi -> ../php_ </span>  
<span class="notranslate"> _.cl.selector/selector.path/php -> ../php-cli_ </span>  

Generated ini files with selected modules and options for each version:
<span class="notranslate"> _.cl.selector/alt_php44.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php51.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php52.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php53.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php54.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php55.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php56.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php70.ini_ </span>  
<span class="notranslate"> _.cl.selector/alt_php71.ini_ </span>  

Symlinks above are being created according to the settings in <span class="notranslate"> ~/.cl.selector/defaults.cfg </span> and <span class="notranslate"> ~/.cl.selector/alt_php44.cfg </span> files (44 - corresponding PHP version), which are storing <span class="notranslate"> PHP Selector </span> settings for the user. These files are usually taken from user home directory backup or when migrating account from another server. Thus, when migrating account from server to server, <span class="notranslate"> PHP Selector </span> settings are saved.

If no <span class="notranslate"> PHP Selector </span> settings backup files are found when running <span class="notranslate"> `selectorctl --setup-without-cagefs` </span> , then default settings from <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> global file are applied (as in selector normal mode). If the file is absent, then native PHP version will be selected for the user.

* The following line: <span class="notranslate"> _PATH=$HOME/.cl.selector/selector.path:$HOME/.cl.selector:$PATH_ </span>

is being added to the user file <span class="notranslate"> _~/.bashrc_   </span>

<span class="notranslate"> Apache </span> PHP handlers settings are not changed.

* Also <span class="notranslate"> `selectorctl --setup-without-cagefs` </span>  command does the following: 

  * Turns off link traversal protection (linksafe);
  * Turns off cagefs service.

To get back to the selector normal mode (“with CageFS”) run:
<div class="notranslate">

```
selectorctl --revert-to-cagefs
```
</div>

(CageFS should be initialized by using <span class="notranslate"> “cagefsctl --init” </span> command before running the command above)

This command removes symlinks:  
<span class="notranslate"> _/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini,_ </span>
turns on link traversal protection (linksafe) and cagefs service.


## Configuring "Global” php.ini options for all Alt-PHP Versions


**[CageFS 6.0-33 or higher, <span class="notranslate"> LVE Manager </span> 2.0-11.2 or higher]**

There is <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, where you can specify values of PHP options that should be applied for all <span class="notranslate"> Alt-PHP </span> versions that are installed on a server. These settings will also be automatically applied to the new <span class="notranslate"> Alt-PHP </span> versions that will be installed later.

Example:  
<span class="notranslate"> _# cat /etc/cl.selector/global_php.ini_ </span>  
<span class="notranslate"> _[Global PHP Settings]_ </span>  
<span class="notranslate"> _date.timezone = Europe/Warsaw_ </span>  
<span class="notranslate"> _error_log = error_log_ </span>  
<span class="notranslate"> _memory_limit = 192M_ </span>  
Sections are ignored. Only name of an option and a value have meaning.

When an option is absent in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, than it is not changed (applied) to php.ini for <span class="notranslate"> Alt-PHP </span> versions.

<span class="notranslate"> date.timezone </span> and <span class="notranslate"> error_log </span> options are handled differently than the others. When these options are not in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, than values for the options will be taken from <span class="notranslate"> "native" </span> php.ini file. And when the option is in php.ini for some <span class="notranslate"> Alt-PHP </span> version already (and its value is not empty), than value from <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> will be NOT applied.


**[CageFS version 6.1.5-1 or later]**

The behavior above is changed for cPanel servers with EasyApache 4. The <span class="notranslate">`/usr/local/lib/php.ini`</span> file is removed for new installations of cPanel v80 and later.

* When <span class="notranslate">`/usr/local/lib/php.ini`</span> file exists, <span class="notranslate">`error_log`</span> and <span class="notranslate">`date.timezone`</span> options will be taken from that <span class="notranslate">`php.ini`</span> file.
* When <span class="notranslate">`/usr/local/lib/php.ini`</span> file does not exist, <span class="notranslate">`error_log`</span> and <span class="notranslate">`date.timezone`</span> options will be taken from the <span class="notranslate">`php.ini`</span> file for system default PHP version selected in MultiPHP Manager.
  
This functionality works when the system default PHP version is <span class="notranslate">`ea-php`</span> only. When the system default PHP version is <span class="notranslate">`alt-php`, `error_log`</span> and <span class="notranslate">`date.timezone`</span> directives will be NOT taken from that <span class="notranslate">`php.ini`</span> file.


To confirm changes (not affecting <span class="notranslate"> "date.timezone" </span> and <span class="notranslate"> "error_log" </span> options) please run:

<div class="notranslate">

```
/usr/sbin/cagefsctl --setup-cl-selector
```
</div>

To confirm changes (including <span class="notranslate"> "date.timezone" </span> and <span class="notranslate"> "error_log" </span> options) please run:

<div class="notranslate">

```
/usr/bin/selectorctl --apply-global-php-ini
```
</div>
or

<div class="notranslate">

```
/usr/sbin/cagefsctl --apply-global-php-ini
```
</div>
(two commands above work the same way).

If you don't want to change <span class="notranslate"> error_log </span> , but want to change <span class="notranslate"> date.timezone </span> , you can execute:

<div class="notranslate">

```
selectorctl --apply-global-php-ini date.timezone
```
</div>

Similarly, command <span class="notranslate"> `selectorctl --apply-global-php-ini error_log` </span> applies <span class="notranslate"> error_log </span> and all other options specified in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, except <span class="notranslate"> date.timezone </span> .

So, you can specify 0, 1 or 2 parameters from the list: <span class="notranslate"> error_log, date.timezone </span> .

Using <span class="notranslate"> `--apply-global-php-ini` </span> without arguments applies all global PHP options including two above.

Example:

<div class="notranslate">

```
selectorctl --apply-global-php-ini error_log
selectorctl --apply-global-php-ini date.timezone
selectorctl --apply-global-php-ini date.timezone error_log
```
</div>

The latter command has the same effect as <span class="notranslate"> `/usr/bin/selectorctl --apply-global-php-ini` </span>


## Bundled PHP Extensions


Large number of PHP extensions are bundled with each version of PHP:

* [PHP 4.4](/php_selector/#php-4-4-extensions)
* [PHP 5.1](/php_selector/#php-5-1-extensions)
* [PHP 5.2](/php_selector/#php-5-2-extensions)
* [PHP 5.3](/php_selector/#php-5-3-extensions)
* [PHP 5.4](/php_selector/#php-5-4-extensions)
* [PHP 5.5](/php_selector/#php-5-5-extensions)
* [PHP 5.6](/php_selector/#php-5-6-extensions)
* [PHP 7.0](/php_selector/#php-7-0-extensions)
* [PHP 7.1](/php_selector/#php-7-1-extensions) 
* [PHP 7.2](/php_selector/#php-7-2-extensions)
* [PHP 7.3](/php_selector/#php-7-3-extensions)




### PHP 4.4 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|bcmath <br>bz2 <br>calendar <br>ctype <br>curl <br>dba <br>dbase <br>dbx <br>domxml <br>exif <br>fileinfo | ftp <br>gd <br>gettext <br>gmp <br>iconv <br>imap <br>interbase <br>ioncube_loader <br>ioncube_loader_4 <br>json <br>ldap  | mbstring <br>mcrypt <br>mhash <br>mysql <br>ncurses <br>odbc <br>openssl <br>overload <br>pcntl <br>pcre <br>pgsql  | posix <br>pspell <br>readline <br>recode <br>session <br>shmop <br>snmp <br>sockets <br>sourceguardian <br>standard <br>sybase_ct <br>sysvmsg  | sysvsem <br>sysvshm <br>tokenizer <br>wddx <br>xml <br>xmlrpc <br>zlib|
</div>

### PHP 5.1 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|bcmath <br>big_int <br>bitset <br>bz2 <br>bz2_filter <br>calendar <br>coin_acceptor <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br>doublemetaphone <br>exif <br>ftp <br>gd <br>geoip | gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>ioncube_loader <br>ioncube_loader_4 <br>ldap <br>libxml  | lzf <br>mbstring <br>mcrypt <br>memcache <br>msgpack <br>mysql <br>mysqli <br>ncurses <br>odbc <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite  | pgsql <br>posix <br>pspell <br>quickhash <br>radius <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>ssh2 <br>standard <br>stats  | stem <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>translit <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>zlib |
</div>

### PHP 5.2 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apm <br>ares <br>bcmath <br>bcompiler <br>big_int <br>bitset <br>bloomy <br>bz2 <br>bz2_filter <br>calendar <br>coin_acceptor <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>enchant <br>exif <br>ffmpeg <br>fileinfo <br>filter | ftp <br>gd <br>gender <br>geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>json <br>ldap <br>libxml <br>lzf  | magickwand <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>msgpack <br>mssql <br>mysql <br>mysqli <br>ncurses <br>oauth <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite  | pgsql <br>phar <br>posix <br>pspell <br>quickhash <br>radius <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite <br>ssh2 <br>standard <br>stats <br>stem <br>stomp  | suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>translit <br>uploadprogress <br>uuid <br>wddx <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaz <br>zend_optimizer <br>zip <br>zlib|
</div>

### PHP 5.3 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apcu <br>apm <br>ares <br>bcmath <br>bcompiler <br>big_int <br>bitset <br>bloomy <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>coin_acceptor <br>core <br>crack <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo| filter <br>ftp <br>functional <br>gd <br>gender <br>geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>huffman <br>iconv <br>idn <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libxml <br>lzf | magickwand <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql <br>phalcon <br>phar  | posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem| sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

### PHP 5.4 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apc <br>apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eaccelerator <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>functional <br>gd | gender <br>geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inclued <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br>magickwand <br>mailparse <br>mbstring| mcrypt <br>memcache <br>memcached <br>mhash <br>mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql <br>phalcon <br>phar  | posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy | timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

### PHP 5.5 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>clamav <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dbx <br>dom <br>doublemetaphone <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip | gettext <br>gmagick <br>gmp <br>gnupg <br>gRPC <br>haru <br>hash <br>hidef <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br>magickwand <br>mailparse <br>mbstring <br>mcrypt | memcache <br>memcached <br>mhash <br>mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql | phalcon <br>phalcon3 <br>phar <br>posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp <br>suhosin | sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaf <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq |
</div>

### PHP 5.6 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>apm <br>ares <br>bcmath <br>big_int <br>bitset <br>brotli <br>bz2 <br>bz2_filter <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbx <br>dom <br>doublemetaphone <br>eio <br>enchant <br>ereg <br>exif <br>ffmpeg <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip <br>gettext | gmagick <br>gmp <br>gnupg <br>gRPC <br>haru <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>ioncube_loader_4 <br>jsmin <br>json <br>ldap <br>libevent <br>libsodium <br>libxml <br>lzf <br>mailparse <br>mbstring <br>mcrypt <br>memcache <br>memcached <br>mhash | mongo <br>mongodb <br>msgpack <br>mssql <br>mysql <br>mysqli <br>mysqlnd <br>ncurses <br>nd_mysql <br>nd_mysqli <br>nd_pdo_mysql <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pgsql <br>phalcon <br>phalcon3 | phar <br>posix <br>propro <br>pspell <br>quickhash <br>radius <br>raphf <br>rar <br>readline <br>recode <br>redis <br>reflection <br>rsync <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>spl_types <br>sqlite3 <br>ssh2 <br>standard <br>stats <br>stem <br>stomp | suhosin <br>sybase_ct <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>translit <br>uploadprogress <br>uri_template <br>uuid <br>wddx <br>weakref <br>xcache_3 <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xrange <br>xsl <br>yaml <br>yaz <br>zend_guard_loader <br>zip <br>zlib <br>zmq|
</div>

### PHP 7.0 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>bitset <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br>gd <br>gender | geoip <br>gettext <br>gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libsodium <br>libxml <br>lzf <br>mailparse <br>mbstring <br>mcrypt | memcached <br>mongodb <br>mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar | posix <br>propro <br>pspell <br>raphf <br>rar <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>suhosin <br>sysvmsg | sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br>yaz <br>zip <br>zlib <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.


### PHP 7.1 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dbase <br>dom <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip <br>gettext | gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>htscanner <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libsodium <br>libxml <br>lzf <br>mailparse <br>mbstring <br>mcrypt <br>memcached | mongodb <br>mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar  | posix <br>propro <br>pspell <br>raphf <br>rar <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>sourceguardian <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>suhosin <br>sysvmsg | sysvsem <br>sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br>zip <br>zlib <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.

### PHP 7.2 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>brotli <br>bz2 <br>calendar <br>core <br>ctype <br>curl <br>date <br>dba <br>dom <br>eio <br>enchant <br>exif <br>fileinfo <br>filter <br>ftp <br>gd <br>gender <br>geoip <br>gettext | gmagick <br>gmp <br>gnupg <br>gRPC <br>hash <br>http <br>iconv <br>igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>ioncube_loader <br>json <br>ldap <br>libxml <br>lzf <br>mailparse <br>mbstring <br>memcached <br>mongodb | mysqli <br>mysqlnd <br>nd_mysqli <br>nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>openssl <br>pcntl <br>pcre <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_mysql <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql <br>phalcon3 <br>phar | posix <br>propro <br>pspell <br>raphf <br>readline <br>redis <br>reflection <br>session <br>shmop <br>simplexml <br>snmp <br>soap <br>sockets <br>spl <br>sqlite3 <br>sqlsrv <br>ssh2 <br>standard <br>stats <br>sysvmsg <br>sysvsem | sysvshm <br>tidy <br>timezonedb <br>tokenizer <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xml <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaml <br>zip <br>zlib <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.


### PHP 7.3 Extensions


<div class="notranslate">

| |  |  |  | |
|-|-|-|-|-|
|apcu <br>bcmath <br>dba <br>dbase <br>dom <br>eio <br>enchant <br>fileinfo <br>gd <br>gender <br>geoip <br>gmagick <br>gnupg <br>grpc <br>http  | igbinary <br>imagick <br>imap <br>inotify <br>interbase <br>intl <br>json <br>ldap <br>lzf <br>mailparse <br>mbstring <br>memcached <br>mongodb <br>mysqlnd <br>nd_mysqli | nd_pdo_mysql <br>_newrelic_ <br>oauth <br>oci8 <br>odbc <br>opcache <br>pdf <br>pdo <br>pdo_dblib <br>pdo_firebird <br>pdo_oci <br>pdo_odbc <br>pdo_pgsql <br>pdo_sqlite <br>pdo_sqlsrv <br>pgsql | phar <br>posix <br>propro <br>pspell <br>raphf <br>redis <br>snmp <br>soap <br>sockets <br>sqlsrv <br>ssh2 <br>stats <br>sysvmsg <br>sysvsem <br>sysvshm <br>tidy | timezonedb <br>trader <br>uploadprogress <br>uuid <br>vips <br>wddx <br>xdebug <br>xmlreader <br>xmlrpc <br>xmlwriter <br>xsl <br>yaf <br>yaml <br>zip <br>zmq|
</div>

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span>.

## Disabling PHP extension globally


If you want to disable PHP extension globally, you don't need to remove file <span class="notranslate"> /opt/alt/phpXX/etc/php.d.all/$EXTENSION.ini </span> . You should just comment out <span class="notranslate"> "extension=" </span> directives in it.

The extension will be visible in <span class="notranslate"> PHP Selector </span> interface, but selecting it in users's interface will take no effect - extension will be disabled in fact.

Reinstalling of <span class="notranslate"> alt-php </span> packages will not reset settings (will not enable extension again).


## Control Panel Integration


[cPanel](/php_selector/#cpanel)

### cPanel


_[Requires CageFS 5.5-6.18+]_

When using EasyApache4 in cPanel, it is possible to change PHP versions for users' domains with <span class="notranslate"> MultiPHP Manager </span> (when PHP is working under <span class="notranslate"> Apache </span> web server). Also it is possible to change system default PHP version with <span class="notranslate"> MultiPHP Manager </span> in WHM.

<span class="notranslate"> MultiPHP Manager </span> in WHM looks as follows:

![](/images/cpanel_integration_zoom57.png)

A user can change PHP version for domain in cPanel interface but can not change System default PHP version.

![](/images/cpanel_integration01.png)

The following <span class="notranslate"> Alt-PHP </span> packages (and higher) provide an ability to select <span class="notranslate"> Alt-PHP </span> version in <span class="notranslate"> MultiPHP Manager </span> :

* alt-php44-4.4.9-71;
* alt-php51-5.1.6-81;
* alt-php52-5.2.17-107;
* alt-php53-5.3.29-59;
* alt-php54-5.4.45-42;
* alt-php55-5.5.38-24;
* alt-php56-5.6.31-7;
* alt-php70-7.0.24-2;
* alt-php71-7.1.10-2;
* alt-php72-7.2.0-0.rc.3.2.

You can remove <span class="notranslate"> Alt-PHP </span> from <span class="notranslate"> cPanel MultiPHP Manager </span> .
To do so set '<span class="notranslate"> _yes_ </span>' or ' <span class="notranslate"> _no_ </span> ' for the <span class="notranslate"> Alt-PHP </span> versions in config file <span class="notranslate"> _/opt/alt/alt-php-config/alt-php.cfg_ </span> and run <span class="notranslate"> _/opt/alt/alt-php-config/multiphp_reconfigure.py_ . </span>
This script manages SCL prefixes for the <span class="notranslate"> Alt-PHP </span> - removes or creates prefixes in <span class="notranslate"> _/etc/scl/prefixes_ . </span>

<div class="notranslate">

```
/opt/alt/alt-php-config/alt-php.cfg
[MultiPHP Manager]
alt-php44 = no
alt-php51 = no
alt-php52 = no
alt-php53 = no
alt-php54 = no
alt-php55 = yes
alt-php56 = yes
alt-php70 = yes
alt-php71 = yes
alt-php72 = yes
```
</div>

::: tip Note
<span class="notranslate"> PHP Selector does not work when Alt-PHP version is selected as system default in MultiPHP Manager. So, all domains will use PHP version selected via MultiPHP Manager. Settings in PHP Selector will be ignored. We recommend to disable PHP Selector </span> in such case.
:::


<span class="notranslate"> PHP Selector </span> works in different ways with EasyApache4 and EasyApache3. CageFS should be enabled for users who use <span class="notranslate"> PHP Selector </span> . The novation is that when using  EasyApache4, actual PHP version used depends on PHP version selected in <span class="notranslate"> MultiPHP Manager </span> . When PHP version chosen for domain in <span class="notranslate"> MultiPHP Manager </span> matches System default PHP version, then <span class="notranslate"> PHP Selector </span> is used to select actual PHP version. If PHP version chosen for domain in <span class="notranslate"> MultiPHP Manager </span> differs from System default PHP version, then PHP version from <span class="notranslate"> MultiPHP Manager </span> is used.

In other words, <span class="notranslate"> PHP Selector </span> deals with changing System default PHP version.

<span class="notranslate"> PHP Selector </span> algorithm for choosing PHP version for domain is as follows:

1. If CageFS is disabled, then <span class="notranslate"> PHP Selector </span> is not active and <span class="notranslate"> MultiPHP Manager PHP </span> version is applied.

2. If CageFS is enabled, then:

2.1. If PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> differs from System default PHP version, then <span class="notranslate"> MultiPHP Manager PHP </span> version is applied.

2.2. If PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> is the same as System default PHP version, then <span class="notranslate"> PHP Selector PHP </span> version is applied:

2.2.1. If <span class="notranslate"> _Native_ </span> option is selected in <span class="notranslate"> PHP Selector </span> , then <span class="notranslate"> MultiPHP Manager PHP version is applied. </span>

2.2.2. If PHP version chosen in <span class="notranslate"> PHP Selector </span> differs from <span class="notranslate"> _Native_ </span> , then <span class="notranslate"> PHP Selector PHP </span> version is applied.

![](/images/cpanel_integration02.png)

![](/images/cpanel_integration03.png)

![](/images/cpanel_integration04.png)

PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> can also be applied to console commands <span class="notranslate"> _/usr/bin/php and /usr/local/bin/php_ . </span> In this case <span class="notranslate"> _.htaccess_ </span> file search is performed in current directory and in parent directories. If the file is found, then PHP version specified in it is applied, if not found, then System default PHP version is applied. System default PHP version can be changed via <span class="notranslate"> PHP Selector </span> .

1. If CageFS is disabled, then <span class="notranslate"> PHP Selector </span> is not active and PHP version from <span class="notranslate"> _.htaccess_ </span> is applied.

2. If CageFS is enabled, then:

2.1. If PHP version specified in <span class="notranslate"> .htaccess </span> file differs from System default, then <span class="notranslate"> _.htaccess_ </span> version is applied.

2.2. If System default PHP version is specified in <span class="notranslate"> _.htaccess_ </span> file, then <span class="notranslate"> PHP Selector </span> version is applied:

2.2.1. If <span class="notranslate"> _Native_ </span> option is chosen in <span class="notranslate"> PHP Selector </span> , then <span class="notranslate"> _.htaccess_ </span> PHP version is applied.

2.2.2. If PHP version chosen in <span class="notranslate"> PHP Selector </span> differs from <span class="notranslate"> _Native_ </span> , then <span class="notranslate">  PHP Selector </span> version is applied.

::: tip Note
cPanel prior to 11.56 does not support hooks to add processing of System default PHP version changes with <span class="notranslate"> MultiPHP Manager. That is why System default PHP version changing is handled by cron job (/etc/cron.d/cagefs_cron file), which executes the command /usr/share/cagefs/setup_multiphp_integration every ten minutes, which means that all System default PHP version changes in MultiPHP Manager </span> are applied in CageFS with 10 minutes delay.
:::

::: tip Note
In cagefs-5.5-6.25 or later, changing of System default PHP version with <span class="notranslate"> MultiPHP Manager </span> will be processed with cPanel WHM hooks.
:::

**PHP Modules**

The set of PHP modules depends on PHP version used for domain or console. If <span class="notranslate"> PHP Selector </span> is active and <span class="notranslate"> Alt-PHP </span> version is chosen, then modules chosen for this <span class="notranslate"> Alt-PHP </span> version in <span class="notranslate"> PHP Selector </span> are used. If <span class="notranslate"> PHP Selector </span> is not active, then modules for PHP version chosen in cPanel MultiPHP are used.

**PHP Options**

cPanel has <span class="notranslate"> MultiPHP INI Editor </span> available in WHM and in cPanel user interface.

<span class="notranslate"> MultiPHP INI Editor </span> allows setting PHP options for any PHP version globally for all domains and users. At this point <span class="notranslate"> _/opt/cpanel/ea-php56/root/etc/php.d/local.ini_ </span> file is generated and options values are written into this file. Such options have higher priority than the options set in <span class="notranslate"> MultiPHP INI Editor </span> in cPanel user interface. <span class="notranslate"> MultiPHP INI Editor </span> allows to set PHP options in <span class="notranslate"> Basic Mode </span> (simplified interface) and in <span class="notranslate"> Editor Mode </span> .

<span class="notranslate"> MultiPHP INI Editor </span> in WHM looks as follows:

![](/images/cpanel_integration05_zoom67.png)

![](/images/cpanel_integration06_zoom67.png)

:::tip Note
cPanel prior to 11.56 does not support hooks to add processing of INI options changing for PHP version with <span class="notranslate"> MultiPHP INI Editor in cPanel WHM. That is why for now the processing of PHP version changing is handled bycron job (/etc/cron.d/cagefs_cron file) which performs the command /usr/share/cagefs/ setup_multiphp_integration every 10 minutes, which means that INI options changes for PHP version in MultiPHP INI Editor </span> in cPanel WHM are being applied with up to 10 minutes delay.
:::

::: tip Note
In cagefs-5.5-6.25 or later, INI options changes for PHP version in <span class="notranslate"> MultiPHP INI Editor </span> in cPanel WHM will be processed by cPanel WHM hooks.
:::

MultiPHP INI Editor in cPanel user interface allows setting options for _php.ini_ files in user home directory or in domain docroot. Changes are applied immediately without delay.

These options priority is lower than ones specified in <span class="notranslate"> MultiPHP INI Editor </span> WHM interface. <span class="notranslate"> MultiPHP INI Editor </span> in cPanel user interface looks as follows

![](/images/cpanel_integration07.png)

![](/images/cpanel_integration08.png)

If <span class="notranslate"> PHP Selector </span> is active, then options set in <span class="notranslate"> PHP Selector </span> are applied, and such options have higher priority than options in custom _php.ini_ file in domain docroot. If <span class="notranslate"> PHP Selector </span> is disabled, then options set in <span class="notranslate"> MultiPHP INI Editor </span> are applied.

**QUIRKS:** When changing System default PHP version, administrator should take into consideration the following quirk. For example, if a user has chosen PHP 5.3 for domain and System default PHP version is PHP 5.5, then <span class="notranslate"> PHP Selector </span> will not be used for user domain. In this case, if administrator switches System default PHP version from 5.5 to 5.3, then <span class="notranslate"> PHP Selector </span> will be activated for user domain and PHP version chosen in <span class="notranslate"> PHP Selector </span> will be applied for domain.

That is why it is recommended for administrator to avoid changing System default PHP version to PHP version that is already used by users. At the same time it is recommended for users to choose inherit for domain and use <span class="notranslate"> PHP Selector </span> to choose PHP version. In this case PHP version chosen in <span class="notranslate"> PHP Selector </span> will be always applied for domain.

