# PHP Selector


<span class="notranslate"> PHP Selector </span> is a CloudLinux component that sits on top of CageFS. It allows each user to select PHP version and module based on their needs. <span class="notranslate"> PHP Selector </span> requires account to have CageFS enabled to work.

<span class="notranslate"> PHP Selector </span> is **compatible** with the following technologies: _ _ <span class="notranslate"> suPHP, mod_fcgid, CGI (suexec), LiteSpeed </span> .

It is **not compatible** with <span class="notranslate"> _mod_php/DSO_ </span> , including <span class="notranslate"> _mod_ruid2_ </span> and <span class="notranslate"> _MPM ITK_ . </span>





## Installation and Update


The installation of <span class="notranslate"> PHP Selector presumes that you already have  [CageFS](/cagefs/)  &  <span class="notranslate"> [LVE Manager](/lve_manager/)  installed. </span> </span>

Use [compatibility matrix](http://docs.cloudlinux.com/index.html?compatiblity_matrix.html) to check if your Web Server/PHP mode is supporting <span class="notranslate"> PHP Selector. If not, you need a change to one of the supported models. </span>

Installation of different versions of PHP & modules:
<span class="notranslate"> </span>
```
$ yum groupinstall alt-php
```

Update CageFS & <span class="notranslate"> LVE Manager </span> with support for PHP Alternatives:
<span class="notranslate"> </span>
```
$ yum update cagefs lvemanager
```

<span class="notranslate"> **cPanel/WHM** </span> : Make sure 'Select PHP version' is enabled in <span class="notranslate"> Feature Manager </span> .

**IMPORTANT** : Please, do not use settings like <span class="notranslate"> _SuPHP_ConfigPath, PHPRC, PHP_INI_SCAN_DIR_ .  </span> Do not redefine path to <span class="notranslate"> php.ini </span> and ini-files for PHP modules. Doing that can break <span class="notranslate"> PHP Selector </span> functionality.

For example, alternative php5.2 versions should load <span class="notranslate"> _/opt/alt/php52/etc/php.ini_ </span> file and scan <span class="notranslate"> _/opt/alt/php52/etc/php.d_ </span> directory for modules:
<span class="notranslate"> </span>
```
Configuration File (php.ini) Path         /opt/alt/php52/etcLoaded Configuration File                 /opt/alt/php52/etc/php.iniScan this dir for additional .ini files   /opt/alt/php52/etc/php.dadditional .ini files parsed              /opt/alt/php52/etc/php.d/alt_php.ini
```

Those are default locations for <span class="notranslate"> alt-php </span> .

If you need custom PHP settings per user, please change them via " <span class="notranslate"> Edit PHP settings </span> " feature of <span class="notranslate"> PHP Selector </span> .

If a list of default modules is absent on the server in the _/etc/cl.selector/defaults.cfg_ file for some alt-PHP version and there is _nd_mysqli_ extension in this version, then on installation/update of the LVE Manager, the _mysqli_ extension will be disabled and _nd_mysqli_ extension will be enabled automatically.

If _ nd_mysqli_ module is absent or a list of enabled modules is available, then they won't be changed automatically.
If alt-PHP is not installed on LVE Manager installation/update, then they won’t be changed automatically.

To change the modules status (enabled/disabled) manually, run the following command in a console:

```
# /usr/sbin/cloudlinux-selector make-defaults-config --json --interpreter=php
```


To update PHP Selector, run the following command:

```
yum groupupdate
```

This command allows to install newly released versions in PHP Selector.

### LiteSpeed support





If the settings were not applied, you can use the following steps to set up LiteSpeed to use PHP Selector.



To enable <span class="notranslate"> PHP Selector </span> with <span class="notranslate"> LiteSpeed Web Server </span> follow <span class="notranslate"> PHP Selector  </span> [installation guide](/php_selector/#installation-and-update) , and then adjust following settings in <span class="notranslate"> LiteSpeed </span> :

<span class="notranslate"> CloudLinux (Admin Console --> Configuration --> Server --> General): CageFS </span>
Enable <span class="notranslate"> SuExec: Server--> General --> PHP SuEXEC --> Yes </span>
Go to <span class="notranslate"> _External App_ </span> tab, the new ** ** <span class="notranslate"> lsphp_selector </span> is here.

**_[Note that you can select any other application or create a custom one.]_**

![](/images/litespeed1_zoom70.png)
The <span class="notranslate"> _Command_ </span> line should be <span class="notranslate"> **/var/www/cgi-bin/cgi_wrapper/cloudlinux_wrapper** </span> on <span class="notranslate"> Plesk </span> . For other control panels, <span class="notranslate"> _Command_ </span> line should be <span class="notranslate"> **/usr/local/bin/lsphp** </span> .
<span class="notranslate"> _Run On Start Up_ </span> line must contain <span class="notranslate"> **Yes** </span> or <span class="notranslate"> **No** </span> .

For <span class="notranslate"> Plesk </span> :

![](/images/litespeed3_zoom70.png)

For other control panels:

![](/images/litespeed2_zoom70.png)

Go to <span class="notranslate"> _Script Handler_ </span> tab. For required suffixes change the <span class="notranslate"> _Handler Name_ </span> to <span class="notranslate"> **lsphp_selector** </span> .

![](/images/litespeed4_zoom70.png)


![](/images/litespeed5_zoom70.png)


Go to <span class="notranslate"> Server --> PHP </span> tab. Click <span class="notranslate"> _Edit_ </span> in the <span class="notranslate"> _PHP Handler Defaults_ </span> section. We recommend to set up the following settings:

Set <span class="notranslate"> _Yes_ </span> in the <span class="notranslate"> _Run On Startup_ </span>
Make sure to set <span class="notranslate"> _Max Idle Time_ </span>  _ _  ![](/images/litespeed_4_zoom70.png)













### ISPmanager


As of July 2013, <span class="notranslate"> PHP Selector </span> support for <span class="notranslate"> ISPmanager </span> is limited to command line utilities. You should still be able to use it.

As always, <span class="notranslate"> PHP Selector </span> requires <span class="notranslate">  CGI, FCGI </span> or <span class="notranslate"> suPHP </span> to work.

You will need to do following modifications:

Create new file
<span class="notranslate"> </span>
```
#!/bin/bash/usr/bin/php-cgi -c /etc/php.ini "$@"
```

Make that file executable:
<span class="notranslate"> </span>
```
$ chmod +x /usr/local/bin/php-cgi-etc
```

Edit file

Add line:
<span class="notranslate"> </span>
```
path phpcgibinary /usr/local/bin/php-cgi-etc
```

Make sure there is no other lines with <span class="notranslate"> </span> defined in the file.

Restart <span class="notranslate"> ISPmanager </span> :
<span class="notranslate"> </span>
```
$ killall ispmgr
```

After that <span class="notranslate"> FCGID </span> wrappers <span class="notranslate"> </span> for new users will be like this:

<span class="notranslate"> #!/usr/local/bin/php-cgi-etc </span>

You might need to edit/modify wrappers for existing users if you want them to be able to use <span class="notranslate"> PHP Selector </span> . You can leave them as is for users that don't need such functionality.

## Configuration


[Setting default version and modules](/php_selector/#setting-default-version-and-modules)

[Individual PHP.ini files](/php_selector/#individual-php-ini-files)

[Substitute global php.ini for individual customer](/php_selector/#substitute-global-php-ini-for-individual-customer)

[Managing interpreter version](/php_selector/#managing-interpreter-version)

[Including ](/php_selector/#including) <span class="notranslate"> [PHP Selector](/php_selector/#including) </span> [ only with some packages (](/php_selector/#including) <span class="notranslate"> [cPanel](/php_selector/#including) </span> [)](/php_selector/#including)

[PHP Extensions](/php_selector/#php-extensions)

[FFmpeg](/php_selector/#ffmpeg)

[Native PHP Configuration](/php_selector/#native-php)










### Setting Default Version and Modules


Administrator can set default interpreter version and extensions for all users. All file operations are actually done by CageFS. CageFS takes settings from <span class="notranslate"> </span> Currently the <span class="notranslate"> </span> is created and handled by <span class="notranslate"> CloudLinux PHP Selector </span> scripts. It has the following format:
<span class="notranslate"> </span>
```
[global]selector=enabled [versions]php=5.4 [php5.4]modules=json,phar [php5.3]modules=json,zip,fileinfo
```


### Individual PHP.ini files


For each customer, inside CageFS, file alt_php.ini is located in <span class="notranslate"> (XX </span> - version of PHP, like 52 or 53). The file contains PHP extension settings and extension directives selected by customer. This file exists for each customer, for each PHP version.

Note, that this is 'local' to CageFS, and different users will have different files. The file is not visible in <span class="notranslate"> </span> outside CageFS. If you would like to view that file, use:
<span class="notranslate"> </span>
```
# cagefsctl -e USERNAME 
```

to enter into CageFS for that user. Then type: <span class="notranslate"> `exit` </span> ; to exit from CageFS

This file has to be updated using <span class="notranslate"> `cagefsctl --rebuild-alt-php-ini` </span> after updating <span class="notranslate"> alt-php </span> RPMs

Admin can change individual settings for PHP extensions by changing that extension's ini file, like editing <span class="notranslate"> </span> and then running:
<span class="notranslate"> </span>
```
cagefsctl --rebuild-alt-php-ini
```

to propagate the change.

### Substitute global php.ini for individual customer


Sometimes you might want to have a single customer with a different php.ini, than the rest of your customers.

To do that, you will use

1. Move default php.ini into <span class="notranslate"> _/etc_ </span> directory and create a symlink to it:
<span class="notranslate"> </span>
```
$ mv /usr/local/lib/php.ini /etc/php.ini$ ln -fs /etc/php.ini /usr/local/lib/php.ini
```

2. Change path to in <span class="notranslate"> _/etc/cl.selector/native.conf_ </span> file to:
<span class="notranslate"> </span>
```
php.ini=/etc/php.ini
```

3. For each user that needs custom file, create directory <span class="notranslate"> _/etc/cagefs/custom.etc/_ **_USER_NAME_** _/php.ini_ </span> .

For example if you want to create custom for <span class="notranslate"> USER1 </span> and <span class="notranslate"> USER2 </span> you would create files:
<span class="notranslate"> </span>
_/etc/cagefs/custom.etc/_ **_USER1_** _/php.ini_
_/etc/cagefs/custom.etc/_ **_USER2_** _/php.ini_

Create such files for each user that should have custom file.

4.Execute:
<span class="notranslate"> </span>
```
$ cagefsctl --force-update 
```





_Make sure that php.ini load path is set to _ <span class="notranslate"> /etc/php.ini </span> _._

_Users will be able to override settings of those php.ini files (global or custom) via _ <span class="notranslate"> PHP Selector </span> _. if you want to prevent that, you should disable _ <span class="notranslate"> PHP Selector </span> _ feature._

_Even if _ <span class="notranslate"> PHP Selector </span> _ is disabled, user can override php settings by using _ <span class="notranslate"> ini_set() php </span> _ function in php script, or by _ <span class="notranslate"> "php -c" </span> _ command line option._

_If you modify anything in _ <span class="notranslate"> /etc/cagefs/custom.etc </span> _ directory, you should execute:_
<span class="notranslate"> </span>
```
$ cagefsctl --update-etc
```

_in order to apply changes to CageFS for all users or:_
<span class="notranslate"> </span>
```
$ cagefsctl --update-etc user1 user2
```

_to apply changes to CageFS for specific users._


### Managing interpreter version


Managing interpreter versions is done by means of manipulating a set of symbolic links that point to different versions of interpreter binaries. For example, if default PHP binary is <span class="notranslate"> `/usr/local/bin/php` </span> :

First we move the default binary inside CageFS to <span class="notranslate"> `/usr/share/cagefs-skeleton/usr/selector` </span> , and make <span class="notranslate"> /usr/local/bin/php </span> a symlink pointing to <span class="notranslate"> /etc/cl.selector/php </span> . This operation is done as part of CageFS deployment.
Next suppose we have additional PHP version, say 7.2.5. The information about all additional interpreter binaries and paths for them is kept in <span class="notranslate"> </span> . This config file is updated by RPM package manager each time alternative PHP package is added, removed or updated
<span class="notranslate"> `/usr/bin/selectorctl --list --interpreter=php` </span> will get us list of all available PHP interpreter versions out of <span class="notranslate"> /etc/cl.selector/selector.conf file </span> .
Next we want to know which PHP version is active for a given user (to supply a selected option in options list). We type:
<span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --user-current` </span> will retrieve PHP version set for a particular user. The script gets the path from <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector/php` </span> symlink, compares it with contents of <span class="notranslate"> /etc/cl.selector/selector.conf </span> file and if path is valid, prints out the current interpreter version.
<span class="notranslate"> `/usr/bin/selectorctl --user USERNAME --interpreter=php --set-user-current=7.2` </span> sets the current PHP version for particular user by creating symlink in <span class="notranslate"> `/var/cagefs/LAST_TWO_DIGITS_OF_UID/USERNAME/etc/cl.selector` </span> directory. All old symlinks are removed, and new symlinks are set.




### Including 


<span class="notranslate"> cPanel </span> has a ' <span class="notranslate"> Feature Manager </span> ' in WHM that allows you to disable <span class="notranslate"> PHP Selector </span> for some of the packages that you offer.

In reality it only disables the icon in <span class="notranslate"> cPanel </span> interface. Yet, in most cases it should be enough in shared hosting settings.

You can find more info on ' <span class="notranslate"> Feature Manager </span> ' here: [http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager](http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager)


Once <span class="notranslate"> PHP Selector </span> is enabled, you can find it in the <span class="notranslate"> Feature Manager </span> . Disabling it in <span class="notranslate"> Feature Manager </span> , will remove the icon for users that are using that particular <span class="notranslate"> 'Feature List </span> '

![](/images/screen1-phpselector-featuremanager.png)

### PHP Extensions




<span class="notranslate"> CloudLinux PHP Selector </span> and Alt-PHP can be used in conjunction with <span class="notranslate"> Plesk PHP Selector </span> and <span class="notranslate"> cPanel MultiPHP </span> . To be compatible, <span class="notranslate"> CloudLinux PHP Selector </span> works as follows: modules that are selected in <span class="notranslate"> CloudLinux PHP Selector </span> are loaded for Alt-PHP version selected in <span class="notranslate"> CloudLinux PHP Selector </span> only. For the rest Alt-PHP versions default module set is loaded <span class="notranslate"> ( _/opt/alt/phpXX/etc/php.d/default.ini_ ) </span> . Described above is default behavior.





This behavior is implemented in CageFS-6.1-10 and later.

In <span class="notranslate"> LVE Manager </span> 1.0-9.40+ this behavior can be modified so that modules selected in <span class="notranslate"> CloudLinux PHP Selector </span> would be loaded for all Alt-PHP versions (with CageFS enabled), which can be quite useful if you use  ‘ <span class="notranslate"> per directory </span> ’ or ‘ <span class="notranslate"> per domain </span> ’ Alt-PHP configuration and want to select modules using <span class="notranslate"> CloudLinux PHP Selector </span> .

To modify it, create a file <span class="notranslate"> _/etc/cl.selector/symlinks.rules_ </span> (read-only for regular users) with the following content: <span class="notranslate"> _php.d.location = selector_ </span>

And run the command to apply changes:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --apply-symlinks-rules
```

To revert to the default behavior:

Delete _ _ <span class="notranslate"> /etc/cl.selector/symlinks.rules </span> file.
Alternatively remove <span class="notranslate"> _php.d.location_ </span> option from the file.
Alternatively set _ _ <span class="notranslate"> default </span> value for <span class="notranslate"> _php.d.location_ </span> option.

And run the command to apply changes:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --apply-symlinks-rules
```


### FFmpeg


Due to possible patent issues CloudLinux does not provide <span class="notranslate"> FFmpeg </span> libraries ( [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html) ). We highly recommend researching if you can legally install <span class="notranslate"> FFmpeg </span> extension on your server. This might differ based on where you and your servers are located. More information can be found on the link: [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html)

For your convenience we provide <span class="notranslate"> FFMPEG PHP </span> binding. For them to work, you need to install <span class="notranslate"> FFmpeg </span> package from the “ <span class="notranslate"> Nux Dextop </span> ” repository following the [instructions](http://li.nux.ro/repos.html) .

Once <span class="notranslate"> FFmpeg </span> is installed you can install PHP bindings, by running:
<span class="notranslate"> </span>
```
yum install alt-php*ffmpeg 
```

Enable <span class="notranslate"> PHP-FFmpeg </span> extension via <span class="notranslate"> PHP Selector </span> :
<span class="notranslate"> </span>
```
selectorctl --enable-extensions=ffmpeg --user USERNAME --version X.Y
```


### Native PHP


<span class="notranslate"> PHP Selector </span> requires access to the <span class="notranslate">  native PHP </span> version for proper work. It is specified in the file <span class="notranslate"> _/etc/cl.selector/native.conf_ </span> of the following content (example):
<span class="notranslate"> </span>
```
php=/usr/bin/php-cgiphp-cli=/usr/bin/phpphp.ini=/etc/php.ini
```

The file is created when installing CageFS on the servers with cPanel, Plesk, DA, Interworx and <span class="notranslate"> ISP Manager </span> , if it is missing. On all other servers the file is not being created at all.

That is why, if the file is not created automatically, then it must be created manually and correct paths must be written to its directives.

Access permission 644 must be set:
<span class="notranslate"> </span>
```
chmod 0644 /etc/cl.selector/native.conf
```


## Command-line Tools


| | |
|-|-|
|<span class="notranslate"> /usr/bin/cl-selector </span>  | Tool is used to select version of PHP interpreter inside CageFS. Note. The command is obsolete, please use <span class="notranslate"> [selectorctl](/php_selector/#selectorctl) </span> instead.|
|<span class="notranslate"> /usr/bin/alt-php-mysql-reconfigure.py </span> | Reconfigures <span class="notranslate"> alt-php </span> extensions to use correct MySQL library, based on the one installed in the system.|


### selectorctl


<span class="notranslate"> selectorctl </span> is a new tool that replaces <span class="notranslate"> cl-selector </span> (which is deprecated and should not be used anymore) and <span class="notranslate"> piniset </span> . It is available starting with **CageFS 5.1.3** .

All new features will be implemented as part of <span class="notranslate"> selectorctl </span> .



| | |
|-|-|
|<span class="notranslate"> --interpreter (-i) </span> : | chooses the interpreter to work with. Currently only PHP is supported. If omitted, <span class="notranslate"> --interpreter=php </span> is implied.|
|<span class="notranslate"> --version (-v) </span> : | specifies alternatives version to work with|
|<span class="notranslate"> --user (-u) </span> : | specifies user to take action upon.|
|<span class="notranslate"> --show-native-version (-V) </span> : | prints the version of native interpreter|



The global options modify settings in <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> file.

| | |
|-|-|
|<span class="notranslate"> --list (-l) </span> : | lists all available alternatives for an interpreter. For instance on server with Alt-PHP installed, it produces the following output. Columns are: short alternative version, full alternative version and path to php-cgi binary. <span class="notranslate"> </span> |
|<span class="notranslate"> --summary (-S) </span> : | prints alternatives state summary. Output format: alternative version, state ( <span class="notranslate"> 'e' </span> for 'enabled', '-' otherwise), chosen as default one or not (' <span class="notranslate"> d </span> ' for 'default', '-' otherwise). For example: <span class="notranslate"> </span> if used with <span class="notranslate"> `--show-native-version` </span> displays version for native interpreter: <span class="notranslate"> </span>|
|<span class="notranslate"> --current (-C) </span> : | prints currently globally selected default version (it is stored in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file): <span class="notranslate"> </span>  If used with <span class="notranslate"> `--show-native-version` </span> , native interpreter version is displayed as well: <span class="notranslate"> </span> |
|<span class="notranslate"> --set-current (-B): </span>  | sets specified version as globally default one (in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file). For example, to set current default version of PHP to 5.4, use: <span class="notranslate"> </span>|
|<span class="notranslate"> --disable-alternative (-N): </span> | adds <span class="notranslate"> state=disabled </span> option to alternative section. With it a corresponding alternative gets removed from user alternatives selection list. For instance to disable PHP 5.2, run: <span class="notranslate"> </span>|
|<span class="notranslate"> --enable-alternative (-Y): </span> | Enables alternative version, removes <span class="notranslate"> state=disabled </span> option, if present, from alternative section. For example to enable PHP 5.2: <span class="notranslate"> </span>|
|<span class="notranslate"> --enable-extensions (-E): </span> | enables extensions for particular PHP version by adding comma-separated list of extensions of modules for alternative in _ _ <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> . Requires <span class="notranslate"> --version </span> option. For example: <span class="notranslate"> </span>|
|<span class="notranslate"> --disable-extensions (-D): </span>  | removes extensions for a particular PHP version. Comma-separated list of extensions will be removed from <span class="notranslate"> /etc/cl.selector/defaults.cfg </span> . Requires <span class="notranslate"> --version </span> . Example: <span class="notranslate"> </span>|
|<span class="notranslate"> --replace-extensions (-R): </span> | replaces all extensions for particular PHP version to the list of comma separated extensions. Requires <span class="notranslate"> `--version`  option </span> . Example: <span class="notranslate"> </span>|
|<span class="notranslate"> --list-extensions (-G): </span> | lists extensions for an alternative for a particular version. Requires ` ` <span class="notranslate"> --version </span> . Example: <span class="notranslate"> </span>  Plus sign (+) stands for 'enabled', minus (–) for 'disabled', tilde (~) means compiled into interpreter. Enabled and disabled state relates to presence in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file.|
| | |





| | |
|-|-|
|<span class="notranslate"> --user-summary (-s): </span>  | prints user alternatives state summary. Example: <span class="notranslate"> </span>  Columns are: alternative version, state (' <span class="notranslate"> e </span> ' for 'enabled', '-' otherwise), chosen as default one or not(' <span class="notranslate"> d </span> ' for 'default', '-' otherwise), selected as user default one or not ('s' for 'selected', '-' otherwise). If used with <span class="notranslate"> `--show-native-version` </span> , version for native interpreter is shown in parenthesis: <span class="notranslate"> </span> <span class="notranslate"> `--user` </span> option is required. |
|<span class="notranslate"> --current (-c): </span> | prints currently globally selected default version (in <span class="notranslate"> _/etc/cl.selector/defaults.cfg_ </span> file): <span class="notranslate"> </span>  If used with <span class="notranslate"> `--show-native-version` </span> to display native version: <span class="notranslate"> </span> <span class="notranslate"> `--user` </span> option is required.|
|<span class="notranslate"> --set-user-current (-b): </span> | sets specified version as the one to use for this end user: <span class="notranslate"> </span>  changes user symlinks for the PHP interpreter to point to alternative 5.4.  <span class="notranslate"> --user </span> option is required.|
|<span class="notranslate"> --enable-user-extensions (-e): </span> | Enables comma-separated list of extensions for the user user. Information is saved to <span class="notranslate"> _alt_php.ini_ </span> file. Requires <span class="notranslate"> `--version` </span> and ` ` <span class="notranslate"> --user </span> options. <span class="notranslate"> </span>|
|<span class="notranslate"> --disable-user-extensions (-d): </span> | Disables extensions provided as comma-separated list. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options. <span class="notranslate"> </span>|
|<span class="notranslate"> --replace-user-extensions (-r): </span> | Replaces extensions with a provided comma-separated list of extensions Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options: <span class="notranslate"> </span>|
|<span class="notranslate"> --reset-user-extensions (-t): </span> | Resets extensions for end user to default list of extensions as defined in <span class="notranslate"> default.cfg </span> . Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options. <span class="notranslate"> </span>|
|<span class="notranslate"> --list-user-extensions (-g): </span> | lists enabled user extensions for an alternative. Requires ` ` <span class="notranslate"> --version </span> and ` ` <span class="notranslate"> --user </span> options. <span class="notranslate"> </span>  if <span class="notranslate"> `--all` </span> option present, command will list all alternatives extensions marked enabled or disabled for given user. For example: <span class="notranslate"> </span>  Plus sign (+) stands for 'enabled', minus (–) stands for 'disabled'. Enabled and disabled state relates to presence or absence of corresponding extensions in user <span class="notranslate"> _alt_php.ini_ </span> file.|
|<span class="notranslate"> --add-options (-k): </span> | adds options (as in <span class="notranslate"> _php.ini_ </span> ) to user <span class="notranslate"> _alt_php.ini_ </span> file. For example: <span class="notranslate"> </span>  adds <span class="notranslate"> `log_error` </span> and <span class="notranslate"> `display_errors` </span> options with values ' <span class="notranslate"> on </span> ' to user _ _ <span class="notranslate"> alt_php.ini </span> file overwriting default values for a user. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options.|
|<span class="notranslate"> --replace-options (-m): </span> | replaces all options in user <span class="notranslate"> _alt_php.ini_ </span> file with specified ones. Requires ` ` <span class="notranslate"> --version </span> and <span class="notranslate"> `--user` </span> options. <span class="notranslate"> </span>|
|<span class="notranslate"> --delete-options (-x): </span> | removes custom options from user <span class="notranslate"> _alt_php.ini_ </span> file. Requires <span class="notranslate"> `--version` </span> and <span class="notranslate"> `--user` </span> options. <span class="notranslate"> </span>|
|<span class="notranslate"> --print-options (-P): </span> | print options from <span class="notranslate"> _/etc/cl.selector/php.conf_ </span> file with default values or ones overwritten in user's _ _ <span class="notranslate"> alt_php.ini </span> _ _ file. <span class="notranslate"> </span>  Requires <span class="notranslate"> `--user`   </span> option. ` ` <span class="notranslate"> --version </span> option is optional. When <span class="notranslate"> `--version` </span> is omitted, options for current selected version will be printed. By default outputs as plain test. If <span class="notranslate"> `--json` ,  `--csv` ,  `--perl` </span> is specified, outputs data in corresponding format. For example, with <span class="notranslate"> `--perl` </span> option, the output is perl hash structure that can be evaluated. |
|<span class="notranslate"> --reset-options (-z): </span> | removes custom options from _ _ <span class="notranslate"> alt_php.ini </span> files for ALL users and versions. Backup files in home folders are cleared. <span class="notranslate"> </span> The ranges of affected customers or versions can be narrowed with <span class="notranslate"> `--version` </span> or <span class="notranslate"> `--user`  options </span> : <span class="notranslate"> </span>|
|<span class="notranslate"> --list-users (-L): </span> | list users that use particular version of interpreter, specified with <span class="notranslate"> `--version` </span> option. For example, to see all users that use PHP version 5.3: <span class="notranslate"> </span>|
|<span class="notranslate"> --change-to-version (-T): </span> | changes all (or particular user) from one interpreter version to another. <span class="notranslate"> </span>|



| | |
|-|-|
|<span class="notranslate"> --base64 (-Q) </span> | Sometimes PHP options values can contain commas and other symbols that break command line formatting. In such a case convert a <span class="notranslate"> key:value </span> pair into <span class="notranslate"> base64 </span> and pass it as value for option-related arguments. For example, to add <span class="notranslate"> disable_functions=exec,popen,system </span> and <span class="notranslate"> display_errors=on </span> to user options, do the following: <span class="notranslate"> </span> Option <span class="notranslate"> `-w 0`   </span> of <span class="notranslate"> base64 </span> executable stands for ' <span class="notranslate"> disable wrapping of lines </span> '. Without it <span class="notranslate"> base64 </span> output will break the command. |
|<span class="notranslate"> --quiet </span> | makes <span class="notranslate"> selectorctl </span> continue when it encounter option not found in <span class="notranslate"> _php.conf_ </span> . Without it <span class="notranslate"> selectorctl </span> exits with error.|


### Integrating With Control Panels


This is the list of commands that we use to integrate <span class="notranslate"> PHP Selector </span> with control panels. If you need to integrate <span class="notranslate"> PHP Selector </span> with a custom control panel, you might find all the commands here:

**PHP summary:**

Command:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --summary
```

Result:
<span class="notranslate"> </span>
```
4.4 e -5.1 e -5.2 e -5.3 e -5.4 e -5.5 e -5.6 e -7.0 e -7.1 e -native e d
```

When native PHP version needs to be displayed:

Command:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --summary --show-native-version
```

Result:
<span class="notranslate"> </span>
```
4.4 e -5.1 e -5.2 e -5.3 e -5.4 e -5.5 e -5.6 e -7.0 e -7.1 e -native(5.6) e d
```

The first column: PHP version
The second column: enabled or not ( <span class="notranslate"> e </span> - enabled)
The third column: if selected as default  ( <span class="notranslate"> d </span> - default)

**Set default version:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --set-current=_VERSION_
```

**Disable version:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --disable-alternative=_VERSION_
```

**Enable version:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --enable-alternative=_VERSION_
```

**List Extensions for a version:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --list-extensions --version=5.6
```

Result:
<span class="notranslate"> </span>
```
- apc- bcmath- big_int- bitset- bloomy~ bz2- bz2_filter~ calendar- coin_acceptor- crack~ ctype+ curl
```

+ - enabled
~ - included in php binary (cannot be disabled)
- - disabled

**Select Default Extensions (enable comma-separated list of extensions globally for a version):**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --version=5.6 --enable-extensions=pdo,json,mysql
```

**Deselect Default Extensions (disable comma-separated list of extensions globally for a version):**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --version=5.6 --disable-extensions=pdo,json,mysql
```

**Replace extensions with comma-separated list of extensions for a version globally:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --version=5.6 --replace-extensions=pdo,json,mysql
```

**Select PHP version for a user:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --set-user-current=_VERSION_ --user=_USER_
```

**List Enabled extensions for a user:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --list-user-extensions --user=_USER_ --version=_VERSION_
```

**Enable comma-separated list of extensions for a user:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --enable-user-extensions=pdo,json,mysql --user=_USER_ --version=_VERSION_
```

**Reset user’s extensions to defaults:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --reset-user-extensions --user=_USER_ --version=_VERSION_
```

**Replace user extensions with comma-separated list of extensions:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --replace-user-extensions=EXT_LIST --user=_USER_ --version=_VERSION_
```

<span class="notranslate"> _EXT_LIST_  is comma separated list of PHP extensions (for example:  <span class="notranslate"> pdo,json,mysql </span> ) </span>

**List available options for php.ini editing:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --print-options --user=_USER_ --version=_VERSION_ [--json]
```

**List available options for php.ini editing (print safe strings):**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --print-options-safe --user=_USER_ --version=_VERSION_ [--json]
```

**Set php.ini options for end user:**
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --user=_USER_ --version=_VERSION_ --replace-options=_OPTIONS_ --base64 [--json]
```

Here is an example of how you can generate <span class="notranslate"> _OPTIONS_ in base64 </span> format:
<span class="notranslate"> </span>
```
OPTIONS=`echo disable_functions:exec,syslog|base64 -w 0`,`echo display_errors:off|base64 -w 0`,`echo post_max_size:128M|base64 -w 0`echo $OPTIONS
```

## Removing 


It is not possible to remove PHP Selector from the system completely as it is an essential part of LVE Manager and CageFS packages. However, you can make PHP Selector unavailable for cPanel and Plesk users.

To do so, go to _LVE Manager → PHP Selector_ and check _Disabled_ as PHP Selector status. Doing so allows you to disable web-interface of the PHP Selector in the user interface but does not reset custom settings (choosing a version of PHP and modules).

To disable PHP Selector and make it has no effect on a PHP version on the sites, run the following command:

this command resets PHP versions to Native:

```
cagefsctl --cl-selector-reset-versions
```

this command resets PHP modules to Default:

```
cagefsctl --cl-selector-reset-modules
```






## Using 


Once <span class="notranslate"> PHP Selector </span> is installed you will see " <span class="notranslate"> Selector </span> " tab in <span class="notranslate"> LVE Manager </span> :

![](/images/php_selector.png.png)

<span class="notranslate"> PHP Selector </span> lets you select default PHP version, as well as modules that will be available to user out of the box.


Inside <span class="notranslate"> cPanel </span> , User will be able to change PHP version they would have:

![](/images/php_selector_user.png.png)
as well as extensions that they want to use:
![](/images/phpselector_customer.png)

and php.ini settings
![](/images/phpselector_options.png)

## Custom PHP.ini options


**[Requires ** <span class="notranslate"> LVE Manager </span> ** 0.6+]**

<span class="notranslate"> PHP Selector </span> allows customer to edit php.ini settings. Admin has a full control over which settings can be modified.

To allow settings to be modifiable, it has to be whitelisted in <span class="notranslate"> </span>

Here are some of the examples of allowed directives:
<span class="notranslate"> </span>
```
Directive = safe_modeDefault   = OffType      = boolRemark    = <5.4.0Comment   = Enables PHP safe mode. This mode puts a number of restrictions on scripts (say, access to file system) mainly for security reasons.
```


<span class="notranslate"> </span>
```
Directive = safe_mode_include_dirType      = valueRemark    = <5.4.0Comment   = If PHP is in the safe mode and a script tries to access some files, files from this directory will bypass security (UID/GID) checks. The directory must also be in include_path. For example: /dir/inc
```


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

![](/images/phpselector_options.png)

## End user files and directories


The following files and directories are created inside CageFS for each customer:

<span class="notranslate"> </span> - PHP binaries symbolic links.

<span class="notranslate">  - Native PHP </span> binaries.

<span class="notranslate"> </span> Links to enabled modules.

<span class="notranslate"> </span> - Config file for custom PHP options.

like:

<span class="notranslate"> </span>



## Compiling your own extensions


Sometimes you might want to compile your own PHP extension for your users to use. In most cases, it is better to contact our support by sending us a support [ticket](https://cloudlinux.zendesk.com/hc/requests/new) . We will try to provide such extension for you via regular updates within 5-7 days.

If you have decided that you want to build it on your own, you would need to build it for each and every supported version of PHP that you have installed. The module installation process is a bit different from standard - you would need to use the version of phpize and php-config binaries that come with particular <span class="notranslate"> Alt-PHP </span> version.

The full process for PHP 5.X and 7.X looks as follows:

1. Download and unpack extension, cd into it's directory.

2. Execute our version of phpize if necessary:
<span class="notranslate"> </span>
```
/opt/alt/phpXX/usr/bin/phpize
```


3. Execute configure with our binary:
<span class="notranslate"> </span>
```
./configure --with-php-config=/opt/alt/phpXX/usr/bin/php-config
```

4. Make the <span class="notranslate"> .so </span> file:
<span class="notranslate"> </span>
```
make
```

5. Copy it to the modules directory (on 32-bit server, use <span class="notranslate"> </span> ).
<span class="notranslate"> </span>
```
cp -rp modules/*.so /opt/alt/phpXX/usr/lib64/php/modules/
```

6. Add ini file for module to <span class="notranslate"> `/opt/alt/phpXX/etc/php.d.all` . </span>

7. Register new <span class="notranslate"> Alt-PHP </span> version with:
<span class="notranslate"> </span>
```
$ cagefsctl --setup-cl-selector
```


## Roll your own PHP


To add your own PHP version in <span class="notranslate"> PHP Selector </span> :

Create directory in (like: ), and mimic directory structure inside to be similar to the one of PHP versions bundled by <span class="notranslate"> CloudLinux </span> .

Put all the ini files for all the modules into <span class="notranslate"> </span>

Create a symbolic link

Place all such files into <span class="notranslate"> </span>

Add an absolute path to PHP binaries into using the following format:
<span class="notranslate"> </span>
```
php     5.1 5.1.2 /opt/alt/php51/usr/bin/php-cgi php-cli 5.1 5.1.2 /opt/alt/php51/usr/bin/php php-fpm 5.1 5.1.2 /opt/alt/php51/usr/sbin/php-fpm   ^     ^    ^                ^----- absolute path    |     |    |---------------------- real version    |     | -------------------------- version to display    |--------------------------------- binary to 'substitute'
```

Execute:
<span class="notranslate"> </span>
```
cagefsctl --setup-cl-selector
```

The new PHP version must be available now for selection in <span class="notranslate"> PHP Selector </span> .

## Detect User's PHP Version


**[** <span class="notranslate"> LVE Manager </span> ** 0.5-63 or higher]**

<span class="notranslate"> PHP Selector </span> provides an easy way to figure out which versions are available and selected for end user from the command line. You can get this information by running:
<span class="notranslate"> </span>
```
$ selectorctl --interpreter=php --user-summary --user=USERNAME
```


```
The output:<span class="notranslate"></span>
`5.2 e - -`
`5.3 e - s`
`5.4 e - -`
`5.5 e - -`
`native e d -`
```

The first column defines the PHP version. <span class="notranslate"> _Native_ </span> means native PHP version, like the one installed by cPanel with EasyApache.

The second column will contain either <span class="notranslate"> **e** </span> or **-.** If <span class="notranslate"> **e**   </span> is present, it means that given version is enabled, and can be selected by the end user.

The third column can have values <span class="notranslate"> **d**   </span> or **-.** If <span class="notranslate"> **d** </span> is present, that version is considered a 'default' version. Only one PHP version will have **d** indicator.

The fourth column can have values <span class="notranslate"> **s**   </span> or **-. ** If <span class="notranslate"> **s ** is present, that is the selected version, currently being used by the end user. Only one PHP version will have  <span class="notranslate"> **s** </span>  indicator. </span>

In case a user is not inside CageFS, and as such doesn't use <span class="notranslate"> PHP Selector </span> , you will see the following error message:
<span class="notranslate"> </span>
```
ERROR:User USERNAME not in CageFS
```



## PHP Selector


**[LVE Manager 2.0-11.1 or higher]**

<span class="notranslate"> PHP Selector </span> can now be used with CageFS turned off (in case when there is only one user account on the server).

To install run:
<span class="notranslate"> </span>
```
yum groupinstall alt-phpyum install cagefs lvemanager
```

(no need to initialize or turn on CageFS)
<span class="notranslate"> </span>
```
selectorctl --setup-without-cagefs USER
```

( <span class="notranslate"> USER </span> - the name of a user who is using selector. If not specified, the first available cPanel account username will be used).

When executing <span class="notranslate"> `--setup-without-cagefs` </span> , the following actions are performed:

Creating symlinks to the user modules and options for each <span class="notranslate"> Alt-PHP </span> version:
<span class="notranslate"> </span>
_/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini_

In user home directory creating:
<span class="notranslate"> </span>
_.cl.selector/_

“Backup” settings files (selected version, modules, options):
<span class="notranslate"> </span>
_.cl.selector/defaults.cfg_
_.cl.selector/alt_php44.cfg_

Symlinks to the selected version:
<span class="notranslate"> </span>
_.cl.selector/lsphp -> /opt/alt/php44/usr/bin/lsphp_
_.cl.selector/php.ini -> /opt/alt/php44/etc/php.ini_
_.cl.selector/php-cli -> /opt/alt/php44/usr/bin/php_
_.cl.selector/php -> /opt/alt/php44/usr/bin/php-cgi_

Additional symlinks for environment variable <span class="notranslate"> $PATH </span> (search path) in the file <span class="notranslate"> ~/.bashrc </span> :
<span class="notranslate"> </span>
_.cl.selector/selector.path/_
_.cl.selector/selector.path/php-cgi -> ../php_
_.cl.selector/selector.path/php -> ../php-cli_

Generated ini files with selected modules and options for each version:
<span class="notranslate"> </span>
_.cl.selector/alt_php44.ini_
_.cl.selector/alt_php51.ini_
_.cl.selector/alt_php52.ini_
_.cl.selector/alt_php53.ini_
_.cl.selector/alt_php54.ini_
_.cl.selector/alt_php55.ini_
_.cl.selector/alt_php56.ini_
_.cl.selector/alt_php70.ini_
_.cl.selector/alt_php71.ini_

Symlinks above are being created according to the settings in <span class="notranslate"> </span> and <span class="notranslate"> </span> files (44 - corresponding PHP version), which are storing <span class="notranslate"> PHP Selector </span> settings for the user. These files are usually taken from user home directory backup or when migrating account from another server. Thus, when migrating account from server to server, <span class="notranslate"> PHP Selector </span> settings are saved.

If no <span class="notranslate"> PHP Selector </span> settings backup files are found when running <span class="notranslate"> `selectorctl --setup-without-cagefs` </span> , then default settings from _ _ <span class="notranslate"> </span> global file are applied (as in selector normal mode). If the file is absent, then native PHP version will be selected for the user.

The following line: <span class="notranslate"> _PATH=$HOME/.cl.selector/selector.path:$HOME/.cl.selector:$PATH_ </span>

is being added to the user file <span class="notranslate"> _~/.bashrc_   </span>

<span class="notranslate"> Apache PHP handlers settings are not changed. </span>

Also <span class="notranslate"> `selectorctl --setup-without-cagefs`  command does the following:  </span>

Turns off link traversal protection (linksafe);
Turns off cagefs service.

To get back to the selector normal mode (“with CageFS”) run:
<span class="notranslate"> </span>
```
selectorctl --revert-to-cagefs
```

(CageFS should be initialized by using <span class="notranslate"> “cagefsctl --init” </span> command before running the command above)

This command removes symlinks:
<span class="notranslate"> </span>
_/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini,_ turns on link traversal protection (linksafe) and cagefs service.


## Configuring "


**[CageFS 6.0-33 or higher, ** <span class="notranslate"> LVE Manager </span> ** 2.0-11.2 or higher]**

There is _ _ <span class="notranslate"> / </span> _ _ file, where you can specify values of PHP options that should be applied for all <span class="notranslate"> Alt-PHP </span> versions that are installed on a server. These settings will also be automatically applied to the new <span class="notranslate"> Alt-PHP </span> versions that will be installed later.

Example:
<span class="notranslate"> </span>
_# cat /etc/cl.selector/global_php.ini _
_[Global PHP Settings]_
_date.timezone = Europe/Warsaw_
_error_log = error_log_
_memory_limit = 192M_

Sections are ignored. Only name of an option and a value have meaning.

When an option is absent in _ _ <span class="notranslate"> /etc/cl.selector/global_php.ini </span> file, than it is not changed (applied) to php.ini for <span class="notranslate"> Alt-PHP </span> versions.

<span class="notranslate"> date.timezone </span> and <span class="notranslate"> error_log </span> options are handled differently than the others. When these options are not in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, than values for the options will be taken from <span class="notranslate"> "native" </span> php.ini file. And when the option is in php.ini for some <span class="notranslate"> Alt-PHP </span> version already (and its value is not empty), than value from <span class="notranslate"> / _etc/cl.selector/global_php.ini_   </span> will be NOT applied.

To confirm changes (not affecting <span class="notranslate"> "date.timezone" </span> and <span class="notranslate"> "error_log" </span> options) please run:
<span class="notranslate"> </span>
```
/usr/sbin/cagefsctl --setup-cl-selector
```

To confirm changes (including <span class="notranslate"> "date.timezone" </span> and <span class="notranslate"> "error_log" </span> options) please run:
<span class="notranslate"> </span>
```
/usr/bin/selectorctl --apply-global-php-ini
```

or
<span class="notranslate"> </span>
```
/usr/sbin/cagefsctl --apply-global-php-ini
```

(two commands above work the same way).

If you don't want to change <span class="notranslate"> error_log </span> , but want to change <span class="notranslate"> date.timezone </span> , you can execute:
<span class="notranslate"> </span>
```
selectorctl --apply-global-php-ini date.timezone
```

Similarly, command <span class="notranslate"> " `selectorctl --apply-global-php-ini error_log` " </span> applies <span class="notranslate"> error_log </span> and all other options specified in <span class="notranslate"> _/etc/cl.selector/global_php.ini_ </span> file, except <span class="notranslate"> date.timezone </span> .

So, you can specify 0, 1 or 2 parameters from the list: <span class="notranslate"> error_log, date.timezone </span> .

Using <span class="notranslate"> `--apply-global-php-ini`   </span> without arguments applies all global PHP options including two above.

Example:
<span class="notranslate"> </span>
```
selectorctl --apply-global-php-ini error_logselectorctl --apply-global-php-ini date.timezoneselectorctl --apply-global-php-ini date.timezone error_log
```

The latter command has the same effect as <span class="notranslate"> `/usr/bin/selectorctl --apply-global-php-ini` </span>


## Bundled PHP Extensions


Large number of PHP extensions are bundled with each version of PHP:

[PHP 4.4](/php_selector/#php-4-4-extensions)
[PHP 5.1](/php_selector/#php-5-1-extensions)
[PHP 5.2](/php_selector/#php-5-2-extensions)
[PHP 5.3](/php_selector/#php-5-3-extensions)
[PHP 5.4](/php_selector/#php-5-4-extensions)
[PHP 5.5](/php_selector/#php-5-5-extensions)
[PHP 5.6](/php_selector/#php-5-6-extensions)
[PHP 7.0](/php_selector/#php-7-0-extensions)
[PHP 7.1](/php_selector/#php-7-1-extensions) 
[PHP 7.2](/php_selector/#php-7-2-extensions)
[PHP 7.3](/php_selector/#php-7-3-extensions)




### PHP 4.4 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|bcmath bz2 calendar ctype curl dba dbase dbx domxml exif fileinfo | ftp gd gettext gmp iconv imap interbase ioncube_loader ioncube_loader_4 json ldap  | mbstring mcrypt mhash mysql ncurses odbc openssl overload pcntl pcre pgsql  | posix pspell readline recode session shmop snmp sockets sourceguardian standard sybase_ct sysvmsg  | sysvsem sysvshm tokenizer wddx xml xmlrpc zlib|


### PHP 5.1 Extensions


<span class="notranslate"> </span>

| |  |  |  | |
|-|--|--|--|-|
|bcmath big_int bitset bz2 bz2_filter calendar coin_acceptor crack ctype curl date dba dbase dom doublemetaphone exif ftp gd geoip | gettext gmagick gmp gnupg haru hash huffman iconv idn igbinary imagick imap inclued inotify interbase ioncube_loader ioncube_loader_4 ldap libxml  | lzf mbstring mcrypt memcache msgpack mysql mysqli ncurses odbc openssl pcntl pcre pdo pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite  | pgsql posix pspell quickhash radius readline redis reflection session shmop simplexml snmp soap sockets sourceguardian spl ssh2 standard stats  | stem sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer translit wddx xdebug xml xmlreader xmlrpc xmlwriter xsl zlib |


### PHP 5.2 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apc apm ares bcmath bcompiler big_int bitset bloomy bz2 bz2_filter calendar coin_acceptor crack ctype curl date dba dbase dbx dom doublemetaphone eaccelerator enchant exif ffmpeg fileinfo filter  | ftp gd gender geoip gettext gmagick gmp gnupg haru hash hidef htscanner huffman iconv idn igbinary imagick imap inclued inotify interbase intl ioncube_loader ioncube_loader_4 json ldap libxml lzf  | magickwand mailparse mbstring mcrypt memcache memcached mhash mongo msgpack mssql mysql mysqli ncurses oauth odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite  | pgsql phar posix pspell quickhash radius rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite ssh2 standard stats stem stomp  | suhosin sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer translit uploadprogress uuid wddx xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaz zend_optimizer zip zlib|










### PHP 5.3 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apc apcu apm ares bcmath bcompiler big_int bitset bloomy brotli bz2 bz2_filter calendar clamav coin_acceptor core crack ctype curl date dba dbase dbx dom doublemetaphone eaccelerator eio enchant ereg exif ffmpeg fileinfo  | filter ftp functional gd gender geoip gettext gmagick gmp gnupg haru hash hidef htscanner http huffman iconv idn igbinary imagick imap inclued inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libxml lzf  | magickwand mailparse mbstring mcrypt memcache memcached mhash mongo msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql phalcon phar  | posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite sqlite3 ssh2 standard stats stem stomp suhosin sybase_ct sysvmsg sysvsem  | sysvshm tidy timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaml yaz zend_guard_loader zip zlib zmq|


### PHP 5.4 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apc apcu apm ares bcmath big_int bitset brotli bz2 bz2_filter calendar clamav core ctype curl date dba dbase dbx dom doublemetaphone eaccelerator eio enchant ereg exif ffmpeg fileinfo filter ftp functional gd | gender geoip gettext gmagick gmp gnupg haru hash hidef htscanner http iconv igbinary imagick imap inclued inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libsodium libxml lzf magickwand mailparse mbstring | mcrypt memcache memcached mhash mongo mongodb msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql phalcon phar  | posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite3 ssh2 standard stats stem stomp suhosin sybase_ct sysvmsg sysvsem sysvshm tidy | timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaml yaz zend_guard_loader zip zlib zmq|


### PHP 5.5 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apcu apm ares bcmath big_int bitset brotli bz2 bz2_filter calendar clamav core ctype curl date dba dbase dbx dom doublemetaphone eio enchant ereg exif ffmpeg fileinfo filter ftp gd gender geoip  | gettext gmagick gmp gnupg gRPC haru hash hidef htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libsodium libxml lzf magickwand mailparse mbstring mcrypt  | memcache memcached mhash mongo mongodb msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql   | phalcon phalcon3 phar posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite3 ssh2 standard stats stem stomp suhosin   | sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaml yaz zend_guard_loader zip zlib zmq |






### PHP 5.6 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apcu apm ares bcmath big_int bitset brotli bz2 bz2_filter calendar core ctype curl date dba dbx dom doublemetaphone eio enchant ereg exif ffmpeg fileinfo filter ftp gd gender geoip gettext | gmagick gmp gnupg gRPC haru hash htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libsodium libxml lzf mailparse mbstring mcrypt memcache memcached mhash | mongo mongodb msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql phalcon phalcon3 | phar posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite3 ssh2 standard stats stem stomp | suhosin sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaml yaz zend_guard_loader zip zlib zmq|


### PHP 7.0 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath bitset brotli bz2 calendar core ctype curl date dba dbase dom eio enchant exif fileinfo filter ftp gd gender | geoip gettext gmagick gmp gnupg gRPC hash htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader json ldap libsodium libxml lzf mailparse mbstring mcrypt | memcached mongodb mysqli mysqlnd nd_mysqli nd_pdo_mysql newrelic* oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql phalcon3 phar | posix propro pspell raphf rar readline redis reflection session shmop simplexml snmp soap sockets sourceguardian spl sqlite3 sqlsrv ssh2 standard stats suhosin sysvmsg | sysvsem sysvshm tidy timezonedb tokenizer trader uploadprogress uuid vips wddx xdebug xml xmlreader xmlrpc xmlwriter xsl yaml yaz zip zlib zmq|


* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span> [ documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .






### PHP 7.1 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath brotli bz2 calendar core ctype curl date dba dbase dom eio enchant exif fileinfo filter ftp gd gender geoip gettext | gmagick gmp gnupg gRPC hash htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader json ldap libsodium libxml lzf mailparse mbstring mcrypt memcached | mongodb mysqli mysqlnd nd_mysqli nd_pdo_mysql newrelic* oauth oci8 odbc opcache openssl pcntl pcre pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql phalcon3 phar  | posix propro pspell raphf rar readline redis reflection session shmop simplexml snmp soap sockets sourceguardian spl sqlite3 sqlsrv ssh2 standard stats suhosin sysvmsg  | sysvsem sysvshm tidy timezonedb tokenizer trader uploadprogress uuid vips wddx xdebug xml xmlreader xmlrpc xmlwriter xsl yaml zip zlib zmq|


* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span> [ documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .

### PHP 7.2 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath brotli bz2 calendar core ctype curl date dba dom eio enchant exif fileinfo filter ftp gd gender geoip gettext | gmagick gmp gnupg gRPC hash http iconv igbinary imagick imap inotify interbase intl ioncube_loader json ldap libxml lzf mailparse mbstring memcached mongodb | mysqli mysqlnd nd_mysqli nd_pdo_mysql newrelic* oauth oci8 odbc opcache openssl pcntl pcre pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql phalcon3 phar  | posix propro pspell raphf readline redis reflection session shmop simplexml snmp soap sockets spl sqlite3 sqlsrv ssh2 standard stats sysvmsg sysvsem | sysvshm tidy timezonedb tokenizer trader uploadprogress uuid vips wddx xml xmlreader xmlrpc xmlwriter xsl yaml zip zlib zmq|

* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the <span class="notranslate"> [New Relic](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) </span> [ documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .




### PHP 7.3 Extensions


<span class="notranslate"> </span>
| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath dba dbase dom eio enchant fileinfo gd gender geoip gmagick gnupg grpc http  | igbinary imagick imap inotify interbase intl json ldap lzf mailparse mbstring memcached mongodb mysqlnd nd_mysqli | nd_pdo_mysql newrelic oauth oci8 odbc opcache pdf pdo pdo_dblib pdo_firebird pdo_oci pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql | phar posix propro pspell raphf redis snmp soap sockets sqlsrv ssh2 stats sysvmsg sysvsem sysvshm tidy | timezonedb trader uploadprogress uuid vips wddx xdebug xmlreader xmlrpc xmlwriter xsl yaf yaml zip zmq|


* Please note that to use <span class="notranslate"> **newrelic** </span> extension you should set your own <span class="notranslate"> _New Relic License Key_ </span> in your own <span class="notranslate"> _/opt/alt/php7*/etc/php.ini_ </span> file.
Please find more info about <span class="notranslate"> New Relic License Key </span> in the [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .

## Disabling PHP extension globally


If you want to disable PHP extension globally, you don't need to remove file <span class="notranslate"> /opt/alt/phpXX/etc/php.d.all/$EXTENSION.ini </span> . You should just comment out <span class="notranslate"> "extension=" </span> directives in it.

The extension will be visible in <span class="notranslate"> PHP Selector </span> interface, but selecting it in users's interface will take no effect - extension will be disabled in fact.

Reinstalling of <span class="notranslate"> alt-php </span> packages will not reset settings (will not enable extension again).


## Control Panel Integration


[cPanel](/php_selector/#php-selector)

### PHP Selector


_[Requires CageFS 5.5-6.18+]_

When using EasyApache4 in cPanel, it is possible to change PHP versions for users' domains with <span class="notranslate"> MultiPHP Manager </span> (when PHP is working under <span class="notranslate"> Apache </span> web server). Also it is possible to change system default PHP version with <span class="notranslate"> MultiPHP Manager </span> in WHM.

<span class="notranslate"> MultiPHP Manager </span> in WHM looks as follows:

![](/images/cpanel_integration_zoom57.png)

A user can change PHP version for domain in cPanel interface but can not change System default PHP version.

![](/images/cpanel_integration01.png)

The following <span class="notranslate"> Alt-PHP </span> packages (and higher) provide an ability to select <span class="notranslate"> Alt-PHP </span> version in <span class="notranslate"> MultiPHP Manager </span> :
<span class="notranslate"> </span>
alt-php44-4.4.9-71;
alt-php51-5.1.6-81;
alt-php52-5.2.17-107;
alt-php53-5.3.29-59;
alt-php54-5.4.45-42;
alt-php55-5.5.38-24;
alt-php56-5.6.31-7;
alt-php70-7.0.24-2;
alt-php71-7.1.10-2;
alt-php72-7.2.0-0.rc.3.2.


You can remove <span class="notranslate"> Alt-PHP </span> from <span class="notranslate"> cPanel MultiPHP Manager </span> .
To do so set _'_ <span class="notranslate"> yes </span> _'_ or _'_ <span class="notranslate"> no </span> _'_ for the <span class="notranslate"> Alt-PHP </span> versions in config file <span class="notranslate"> _/opt/alt/alt-php-config/alt-php.cfg_   </span> and run <span class="notranslate"> _/opt/alt/alt-php-config/multiphp_reconfigure.py_ . </span>
This script manages SCL prefixes for the <span class="notranslate"> Alt-PHP </span> - removes or creates prefixes in <span class="notranslate"> / _etc/scl/prefixes_ . </span>
<span class="notranslate"> </span>
```
/opt/alt/alt-php-config/alt-php.cfg[MultiPHP Manager]alt-php44 = noalt-php51 = noalt-php52 = noalt-php53 = noalt-php54 = noalt-php55 = yesalt-php56 = yesalt-php70 = yesalt-php71 = yesalt-php72 = yes
```





<span class="notranslate"> PHP Selector </span> works in different ways with EasyApache4 and EasyApache3. CageFS should be enabled for users who use <span class="notranslate"> PHP Selector </span> . The novation is that when using  EasyApache4, actual PHP version used depends on PHP version selected in <span class="notranslate"> MultiPHP Manager </span> . When PHP version chosen for domain in <span class="notranslate"> MultiPHP Manager </span> matches System default PHP version, then <span class="notranslate"> PHP Selector </span> is used to select actual PHP version. If PHP version chosen for domain in <span class="notranslate"> MultiPHP Manager </span> differs from System default PHP version, then PHP version from <span class="notranslate"> MultiPHP Manager </span> is used.

In other words, <span class="notranslate"> PHP Selector </span> deals with changing System default PHP version.

<span class="notranslate"> PHP Selector </span> algorithm for choosing PHP version for domain is as follows:

1. If CageFS is disabled, then <span class="notranslate"> PHP Selector </span> is not active and <span class="notranslate"> MultiPHP Manager PHP </span> version is applied.

2. If CageFS is enabled, then:

2.1. If PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> differs from System default PHP version, then <span class="notranslate"> MultiPHP Manager PHP </span> version is applied.

2.2. If PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> is the same as System default PHP version, then <span class="notranslate"> PHP Selector PHP </span> version is applied:

2.2.1. If _ _ <span class="notranslate"> Native </span> option is selected in <span class="notranslate"> PHP Selector </span> , then <span class="notranslate"> MultiPHP Manager PHP version is applied. </span>

2.2.2. If PHP version chosen in <span class="notranslate"> PHP Selector </span> differs from <span class="notranslate"> _Native_ </span> , then <span class="notranslate"> PHP Selector PHP </span> version is applied.

![](/images/cpanel_integration02.png)

![](/images/cpanel_integration03.png)

![](/images/cpanel_integration04.png)

PHP version chosen in <span class="notranslate"> MultiPHP Manager </span> can also be applied to console commands <span class="notranslate"> _/usr/bin/php and /usr/local/bin/php_ . </span> In this case <span class="notranslate"> _.htaccess_ </span> file search is performed in current directory and in parent directories. If the file is found, then PHP version specified in it is applied, if not found, then System default PHP version is applied. System default PHP version can be changed via <span class="notranslate"> PHP Selector </span> .

1. If CageFS is disabled, then <span class="notranslate"> PHP Selector </span> is not active and PHP version from <span class="notranslate"> _.htaccess_ </span> is applied.

2. If CageFS is enabled, then:

2.1. If PHP version specified in .htaccess file differs from System default, then <span class="notranslate"> _.htaccess_ </span> version is applied.

2.2. If System default PHP version is specified in <span class="notranslate"> _.htaccess_ </span> file, then <span class="notranslate"> PHP Selector </span> version is applied:

2.2.1. If <span class="notranslate"> _Native_ </span> option is chosen in <span class="notranslate"> PHP Selector </span> , then <span class="notranslate"> _.htaccess_ </span> PHP version is applied.

2.2.2. If PHP version chosen in <span class="notranslate"> PHP Selector </span> differs from <span class="notranslate"> _Native_ </span> , then <span class="notranslate">  PHP Selector </span> version is applied.








The set of PHP modules depends on PHP version used for domain or console. If <span class="notranslate"> PHP Selector </span> is active and <span class="notranslate"> Alt-PHP </span> version is chosen, then modules chosen for this <span class="notranslate"> Alt-PHP </span> version in <span class="notranslate"> PHP Selector </span> are used. If <span class="notranslate"> PHP Selector </span> is not active, then modules for PHP version chosen in cPanel MultiPHP are used.


cPanel has <span class="notranslate"> MultiPHP INI Editor </span> available in WHM and in cPanel user interface.

<span class="notranslate"> MultiPHP INI Editor </span> allows setting PHP options for any PHP version globally for all domains and users. At this point <span class="notranslate"> _/opt/cpanel/ea-php56/root/etc/php.d/local.ini_ </span> file is generated and options values are written into this file. Such options have higher priority than the options set in <span class="notranslate"> MultiPHP INI Editor </span> in cPanel user interface. <span class="notranslate"> MultiPHP INI Editor </span> allows to set PHP options in <span class="notranslate"> Basic Mode </span> (simplified interface) and in <span class="notranslate"> Editor Mode </span> .

<span class="notranslate"> MultiPHP INI Editor </span> in WHM looks as follows:

![](/images/cpanel_integration05_zoom67.png)

![](/images/cpanel_integration06_zoom67.png)





<span class="notranslate"> </span>

MultiPHP INI Editor in cPanel user interface allows setting options for _ php.ini_ files in user home directory or in domain docroot. Changes are applied immediately without delay.

These options priority is lower than ones specified in <span class="notranslate"> MultiPHP INI Editor </span> WHM interface. <span class="notranslate"> MultiPHP INI Editor </span> in cPanel user interface looks as follows

![](/images/cpanel_integration07.png)

![](/images/cpanel_integration08.png)

If <span class="notranslate"> PHP Selector </span> is active, then options set in <span class="notranslate"> PHP Selector </span> are applied, and such options have higher priority than options in custom _php.ini_ file in domain docroot. If <span class="notranslate"> PHP Selector </span> is disabled, then options set in <span class="notranslate"> MultiPHP INI Editor </span> are applied.

**QUIRKS:** When changing System default PHP version, administrator should take into consideration the following quirk. For example, if a user has chosen PHP 5.3 for domain and System default PHP version is PHP 5.5, then <span class="notranslate"> PHP Selector </span> will not be used for user domain. In this case, if administrator switches System default PHP version from 5.5 to 5.3, then <span class="notranslate"> PHP Selector </span> will be activated for user domain and PHP version chosen in <span class="notranslate"> PHP Selector </span> will be applied for domain.

That is why it is recommended for administrator to avoid changing System default PHP version to PHP version that is already used by users. At the same time it is recommended for users to choose inherit for domain and use <span class="notranslate"> PHP Selector </span> to choose PHP version. In this case PHP version chosen in <span class="notranslate"> PHP Selector </span> will be always applied for domain.

