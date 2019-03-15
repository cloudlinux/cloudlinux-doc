# PHP Selector


is a CloudLinux component that sits on top of CageFS. It allows each user to select PHP version and module based on their needs. requires account to have CageFS enabled to work.

is **compatible** with the following technologies: _ _ .

It is **not compatible** with , including and





## Installation and Update


The installation of

Use [compatibility matrix](http://docs.cloudlinux.com/index.html?compatiblity_matrix.html) to check if your Web Server/PHP mode is supporting

Installation of different versions of PHP & modules:

```
$ yum groupinstall alt-php
```

Update CageFS & with support for PHP Alternatives:

```
$ yum update cagefs lvemanager
```

: Make sure 'Select PHP version' is enabled in .

**IMPORTANT** : Please, do not use settings like Do not redefine path to and ini-files for PHP modules. Doing that can break functionality.

For example, alternative php5.2 versions should load file and scan directory for modules:

```
Configuration File (php.ini) Path         /opt/alt/php52/etc
Loaded Configuration File                 /opt/alt/php52/etc/php.ini
Scan this dir for additional .ini files   /opt/alt/php52/etc/php.d
additional .ini files parsed              /opt/alt/php52/etc/php.d/alt_php.ini
```

Those are default locations for .

If you need custom PHP settings per user, please change them via " " feature of .

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



To enable with follow [installation guide](/php_selector/#installation-and-update) , and then adjust following settings in :


Enable
Go to tab, the new ** ** is here.

**_[Note that you can select any other application or create a custom one.]_**

![](/images/litespeed1_zoom70.png)
The line should be on . For other control panels, line should be .
line must contain or .

For :

![](/images/litespeed3_zoom70.png)

For other control panels:

![](/images/litespeed2_zoom70.png)

Go to tab. For required suffixes change the to .

![](/images/litespeed4_zoom70.png)


![](/images/litespeed5_zoom70.png)


Go to tab. Click in the section. We recommend to set up the following settings:

Set in the
Make sure to set  _ _  ![](/images/litespeed_4_zoom70.png)













### ISPmanager


As of July 2013, support for is limited to command line utilities. You should still be able to use it.

As always, requires or to work.

You will need to do following modifications:

Create new file

```
#!/bin/bash
/usr/bin/php-cgi -c /etc/php.ini "$@"
```

Make that file executable:

```
$ chmod +x /usr/local/bin/php-cgi-etc
```

Edit file

Add line:

```
path phpcgibinary /usr/local/bin/php-cgi-etc
```

Make sure there is no other lines with defined in the file.

Restart :

```
$ killall ispmgr
```

After that wrappers for new users will be like this:



You might need to edit/modify wrappers for existing users if you want them to be able to use . You can leave them as is for users that don't need such functionality.

## Configuration


[Setting default version and modules](/php_selector/#setting-default-version-and-modules)

[Individual PHP.ini files](/php_selector/#individual-php-ini-files)

[Substitute global php.ini for individual customer](/php_selector/#substitute-global-php-ini-for-individual-customer)

[Managing interpreter version](/php_selector/#managing-interpreter-version)

[Including ](/php_selector/#including) [ only with some packages (](/php_selector/#including) [)](/php_selector/#including)

[PHP Extensions](/php_selector/#php-extensions)

[FFmpeg](/php_selector/#ffmpeg)

[Native PHP Configuration](/php_selector/#native-php)










### Setting Default Version and Modules


Administrator can set default interpreter version and extensions for all users. All file operations are actually done by CageFS. CageFS takes settings from Currently the is created and handled by scripts. It has the following format:

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


### Individual PHP.ini files


For each customer, inside CageFS, file alt_php.ini is located in - version of PHP, like 52 or 53). The file contains PHP extension settings and extension directives selected by customer. This file exists for each customer, for each PHP version.

Note, that this is 'local' to CageFS, and different users will have different files. The file is not visible in outside CageFS. If you would like to view that file, use:

```
# cagefsctl -e USERNAME 
```

to enter into CageFS for that user. Then type: ; to exit from CageFS

This file has to be updated using after updating RPMs

Admin can change individual settings for PHP extensions by changing that extension's ini file, like editing and then running:

```
cagefsctl --rebuild-alt-php-ini
```

to propagate the change.

### Substitute global php.ini for individual customer


Sometimes you might want to have a single customer with a different php.ini, than the rest of your customers.

To do that, you will use

1. Move default php.ini into directory and create a symlink to it:

```
$ mv /usr/local/lib/php.ini /etc/php.ini
$ ln -fs /etc/php.ini /usr/local/lib/php.ini
```

2. Change path to in file to:

```
php.ini=/etc/php.ini
```

3. For each user that needs custom file, create directory .

For example if you want to create custom for and you would create files:

_/etc/cagefs/custom.etc/_ **_USER1_** _/php.ini_
_/etc/cagefs/custom.etc/_ **_USER2_** _/php.ini_

Create such files for each user that should have custom file.

4.Execute:

```
$ cagefsctl --force-update
 
```





_Make sure that php.ini load path is set to _

_Users will be able to override settings of those php.ini files (global or custom) via _

_Even if _

_If you modify anything in _

```
$ cagefsctl --update-etc
```

_in order to apply changes to CageFS for all users or:_

```
$ cagefsctl --update-etc user1 user2
```

_to apply changes to CageFS for specific users._


### Managing interpreter version


Managing interpreter versions is done by means of manipulating a set of symbolic links that point to different versions of interpreter binaries. For example, if default PHP binary is :

First we move the default binary inside CageFS to , and make a symlink pointing to . This operation is done as part of CageFS deployment.
Next suppose we have additional PHP version, say 7.2.5. The information about all additional interpreter binaries and paths for them is kept in . This config file is updated by RPM package manager each time alternative PHP package is added, removed or updated
will get us list of all available PHP interpreter versions out of .
Next we want to know which PHP version is active for a given user (to supply a selected option in options list). We type:
will retrieve PHP version set for a particular user. The script gets the path from symlink, compares it with contents of file and if path is valid, prints out the current interpreter version.
sets the current PHP version for particular user by creating symlink in directory. All old symlinks are removed, and new symlinks are set.




### Including 


has a ' ' in WHM that allows you to disable for some of the packages that you offer.

In reality it only disables the icon in interface. Yet, in most cases it should be enough in shared hosting settings.

You can find more info on ' ' here: [http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager](http://docs.cpanel.net/twiki/bin/view/11_30/WHMDocs/FeatureManager)


Once is enabled, you can find it in the . Disabling it in , will remove the icon for users that are using that particular '

![](/images/screen1-phpselector-featuremanager.png)

### PHP Extensions




and Alt-PHP can be used in conjunction with and . To be compatible, works as follows: modules that are selected in are loaded for Alt-PHP version selected in only. For the rest Alt-PHP versions default module set is loaded . Described above is default behavior.





This behavior is implemented in CageFS-6.1-10 and later.

In 1.0-9.40+ this behavior can be modified so that modules selected in would be loaded for all Alt-PHP versions (with CageFS enabled), which can be quite useful if you use  ‘ ’ or ‘ ’ Alt-PHP configuration and want to select modules using .

To modify it, create a file (read-only for regular users) with the following content:

And run the command to apply changes:

```
/usr/bin/selectorctl --apply-symlinks-rules
```

To revert to the default behavior:

Delete _ _ file.
Alternatively remove option from the file.
Alternatively set _ _ value for option.

And run the command to apply changes:

```
/usr/bin/selectorctl --apply-symlinks-rules
```


### FFmpeg


Due to possible patent issues CloudLinux does not provide libraries ( [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html) ). We highly recommend researching if you can legally install extension on your server. This might differ based on where you and your servers are located. More information can be found on the link: [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html)

For your convenience we provide binding. For them to work, you need to install package from the “ ” repository following the [instructions](http://li.nux.ro/repos.html) .

Once is installed you can install PHP bindings, by running:

```
yum install alt-php*ffmpeg 
```

Enable extension via :

```
selectorctl --enable-extensions=ffmpeg --user USERNAME --version X.Y
```


### Native PHP


requires access to the version for proper work. It is specified in the file of the following content (example):

```
php=/usr/bin/php-cgi
php-cli=/usr/bin/php
php.ini=/etc/php.ini
```

The file is created when installing CageFS on the servers with cPanel, Plesk, DA, Interworx and , if it is missing. On all other servers the file is not being created at all.

That is why, if the file is not created automatically, then it must be created manually and correct paths must be written to its directives.

Access permission 644 must be set:

```
chmod 0644 /etc/cl.selector/native.conf
```


## Command-line Tools


| | |
|-|-|
| | Tool is used to select version of PHP interpreter inside CageFS. Note. The command is obsolete, please use instead.|
| | Reconfigures extensions to use correct MySQL library, based on the one installed in the system.|


### selectorctl


is a new tool that replaces (which is deprecated and should not be used anymore) and . It is available starting with **CageFS 5.1.3** .

All new features will be implemented as part of .



| | |
|-|-|
|: | chooses the interpreter to work with. Currently only PHP is supported. If omitted, is implied.|
|: | specifies alternatives version to work with|
|: | specifies user to take action upon.|
|: | prints the version of native interpreter|



The global options modify settings in file.

| | |
|-|-|
|: | lists all available alternatives for an interpreter. For instance on server with Alt-PHP installed, it produces the following output. Columns are: short alternative version, full alternative version and path to php-cgi binary. |
|: | prints alternatives state summary. Output format: alternative version, state ( for 'enabled', '-' otherwise), chosen as default one or not (' ' for 'default', '-' otherwise). For example: if used with `,` displays version for native interpreter:|
|: | prints currently globally selected default version (it is stored in file):  If used with , native interpreter version is displayed as well: |
| | sets specified version as globally default one (in file). For example, to set current default version of PHP to 5.4, use:|
| | adds option to alternative section. With it a corresponding alternative gets removed from user alternatives selection list. For instance to disable PHP 5.2, run:|
| | Enables alternative version, removes option, if present, from alternative section. For example to enable PHP 5.2:|
| | enables extensions for particular PHP version by adding comma-separated list of extensions of modules for alternative in _ _ . Requires option. For example:|
| | removes extensions for a particular PHP version. Comma-separated list of extensions will be removed from . Requires . Example:|
| | replaces all extensions for particular PHP version to the list of comma separated extensions. Requires . Example:|
| | lists extensions for an alternative for a particular version. Requires ` ` . Example:  Plus sign (+) stands for 'enabled', minus (–) for 'disabled', tilde (~) means compiled into interpreter. Enabled and disabled state relates to presence in file.|
| | |





| | |
|-|-|
| | prints user alternatives state summary. Example:  Columns are: alternative version, state (' ' for 'enabled', '-' otherwise), chosen as default one or not(' ' for 'default', '-' otherwise), selected as user default one or not ('s' for 'selected', '-' otherwise). If used with , version for native interpreter is shown in parenthesis: option is required. |
| | prints currently globally selected default version (in file):  If used with to display native version: option is required.|
| | sets specified version as the one to use for this end user:  changes user symlinks for the PHP interpreter to point to alternative 5.4.  option is required.|
| | Enables comma-separated list of extensions for the user user. Information is saved to file. Requires and ` ` options.|
| | Disables extensions provided as comma-separated list. Requires and options.|
| | Replaces extensions with a provided comma-separated list of extensions Requires and options:|
| | Resets extensions for end user to default list of extensions as defined in . Requires and options.|
| | lists enabled user extensions for an alternative. Requires ` ` and ` ` options.  if option present, command will list all alternatives extensions marked enabled or disabled for given user. For example:  Plus sign (+) stands for 'enabled', minus (–) stands for 'disabled'. Enabled and disabled state relates to presence or absence of corresponding extensions in user file.|
| | adds options (as in ) to user file. For example:  adds and options with values ' ' to user _ _ file overwriting default values for a user. Requires and options.|
| | replaces all options in user file with specified ones. Requires ` ` and options.|
| | removes custom options from user file. Requires and options.|
| | print options from file with default values or ones overwritten in user's _ _ file.  Requires option. ` ` option is optional. When is omitted, options for current selected version will be printed. By default outputs as plain test. If is specified, outputs data in corresponding format. For example, with option, the output is perl hash structure that can be evaluated. |
| | removes custom options from _ _ files for ALL users and versions. Backup files in home folders are cleared. The ranges of affected customers or versions can be narrowed with or :|
| | list users that use particular version of interpreter, specified with option. For example, to see all users that use PHP version 5.3:|
| | changes all (or particular user) from one interpreter version to another.|



| | |
|-|-|
| | Sometimes PHP options values can contain commas and other symbols that break command line formatting. In such a case convert a pair into and pass it as value for option-related arguments. For example, to add and to user options, do the following: Option of executable stands for ' '. Without it output will break the command. |
| | makes continue when it encounter option not found in . Without it exits with error.|


### Integrating With Control Panels


This is the list of commands that we use to integrate with control panels. If you need to integrate with a custom control panel, you might find all the commands here:

**PHP summary:**

Command:

```
/usr/bin/selectorctl --summary
```

Result:

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

When native PHP version needs to be displayed:

Command:

```
/usr/bin/selectorctl --summary --show-native-version
```

Result:

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

The first column: PHP version
The second column: enabled or not ( - enabled)
The third column: if selected as default  ( - default)

**Set default version:**

```
/usr/bin/selectorctl --set-current=_VERSION_
```

**Disable version:**

```
/usr/bin/selectorctl --disable-alternative=_VERSION_
```

**Enable version:**

```
/usr/bin/selectorctl --enable-alternative=_VERSION_
```

**List Extensions for a version:**

```
/usr/bin/selectorctl --list-extensions --version=5.6
```

Result:

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

+ - enabled
~ - included in php binary (cannot be disabled)
- - disabled

**Select Default Extensions (enable comma-separated list of extensions globally for a version):**

```
/usr/bin/selectorctl --version=5.6 --enable-extensions=pdo,json,mysql
```

**Deselect Default Extensions (disable comma-separated list of extensions globally for a version):**

```
/usr/bin/selectorctl --version=5.6 --disable-extensions=pdo,json,mysql
```

**Replace extensions with comma-separated list of extensions for a version globally:**

```
/usr/bin/selectorctl --version=5.6 --replace-extensions=pdo,json,mysql
```

**Select PHP version for a user:**

```
/usr/bin/selectorctl --set-user-current=_VERSION_ --user=_USER_
```

**List Enabled extensions for a user:**

```
/usr/bin/selectorctl --list-user-extensions --user=_USER_ --version=_VERSION_
```

**Enable comma-separated list of extensions for a user:**

```
/usr/bin/selectorctl --enable-user-extensions=pdo,json,mysql --user=_USER_ --version=_VERSION_
```

**Reset user’s extensions to defaults:**

```
/usr/bin/selectorctl --reset-user-extensions --user=_USER_ --version=_VERSION_
```

**Replace user extensions with comma-separated list of extensions:**

```
/usr/bin/selectorctl --replace-user-extensions=EXT_LIST --user=_USER_ --version=_VERSION_
```



**List available options for php.ini editing:**

```
/usr/bin/selectorctl --print-options --user=_USER_ --version=_VERSION_ [--json]
```

**List available options for php.ini editing (print safe strings):**

```
/usr/bin/selectorctl --print-options-safe --user=_USER_ --version=_VERSION_ [--json]
```

**Set php.ini options for end user:**

```
/usr/bin/selectorctl --user=_USER_ --version=_VERSION_ --replace-options=_OPTIONS_ --base64 [--json]
```

Here is an example of how you can generate format:

```
OPTIONS=`echo disable_functions:exec,syslog|base64 -w 0`,`echo display_errors:off|base64 -w 0`,`echo post_max_size:128M|base64 -w 0`
echo $OPTIONS
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


Once is installed you will see " " tab in :

![](/images/php_selector.png.png)

lets you select default PHP version, as well as modules that will be available to user out of the box.


Inside , User will be able to change PHP version they would have:

![](/images/php_selector_user.png.png)
as well as extensions that they want to use:
![](/images/phpselector_customer.png)

and php.ini settings
![](/images/phpselector_options.png)

## Custom PHP.ini options


**[Requires **

allows customer to edit php.ini settings. Admin has a full control over which settings can be modified.

To allow settings to be modifiable, it has to be whitelisted in

Here are some of the examples of allowed directives:

```
Directive = safe_mode
Default   = Off
Type      = bool
Remark    = <5.4.0
Comment   = Enables PHP safe mode. This mode puts a number of restrictions on scripts (say, access to file system) mainly for security reasons.
```



```
Directive = safe_mode_include_dir
Type      = value
Remark    = <5.4.0
Comment   = If PHP is in the safe mode and a script tries to access some files, files from this directory will bypass security (UID/GID) checks. The directory must also be in include_path. For example: /dir/inc
```


| | |
|-|-|
|Directive | php.ini setting|
|Default | Default value|
|Type | bool, value (any text), list|
|Range | list of values for list Type|
|Comment | explanation of the setting to display in UI|

Default values, that are shown in web interface, are taken from runtime values, if
directive is not there, it will use ' ' value that was set in . So, if you wish to change default value of any option for
"alternative" php version, please modify files (where XX = 55, 54, 53, etc according to php version).

Admin can modify the settings using command.

Users can use web interface to modify php.ini settings:

![](/images/phpselector_options.png)

## End user files and directories


The following files and directories are created inside CageFS for each customer:

- PHP binaries symbolic links.

binaries.

Links to enabled modules.

- Config file for custom PHP options.

like:





## Compiling your own extensions


Sometimes you might want to compile your own PHP extension for your users to use. In most cases, it is better to contact our support by sending us a support [ticket](https://cloudlinux.zendesk.com/hc/requests/new) . We will try to provide such extension for you via regular updates within 5-7 days.

If you have decided that you want to build it on your own, you would need to build it for each and every supported version of PHP that you have installed. The module installation process is a bit different from standard - you would need to use the version of phpize and php-config binaries that come with particular version.

The full process for PHP 5.X and 7.X looks as follows:

1. Download and unpack extension, cd into it's directory.

2. Execute our version of phpize if necessary:

```
/opt/alt/phpXX/usr/bin/phpize
```


3. Execute configure with our binary:

```
./configure --with-php-config=/opt/alt/phpXX/usr/bin/php-config
```

4. Make the file:

```
make
```

5. Copy it to the modules directory (on 32-bit server, use ).

```
cp -rp modules/*.so /opt/alt/phpXX/usr/lib64/php/modules/
```

6. Add ini file for module to

7. Register new version with:

```
$ cagefsctl --setup-cl-selector
```


## Roll your own PHP


To add your own PHP version in :

Create directory in (like: ), and mimic directory structure inside to be similar to the one of PHP versions bundled by .

Put all the ini files for all the modules into

Create a symbolic link

Place all such files into

Add an absolute path to PHP binaries into using the following format:

```
php     5.1 5.1.2 /opt/alt/php51/usr/bin/php-cgi 
php-cli 5.1 5.1.2 /opt/alt/php51/usr/bin/php 
php-fpm 5.1 5.1.2 /opt/alt/php51/usr/sbin/php-fpm
   ^     ^    ^                ^----- absolute path 
   |     |    |---------------------- real version 
   |     | -------------------------- version to display 
   |--------------------------------- binary to 'substitute'
```

Execute:

```
cagefsctl --setup-cl-selector
```

The new PHP version must be available now for selection in .

## Detect User's PHP Version


**[**

provides an easy way to figure out which versions are available and selected for end user from the command line. You can get this information by running:

```
$ selectorctl --interpreter=php --user-summary --user=USERNAME
```


```
The output:
```

The first column defines the PHP version. means native PHP version, like the one installed by cPanel with EasyApache.

The second column will contain either or **-.** If is present, it means that given version is enabled, and can be selected by the end user.

The third column can have values or **-.** If is present, that version is considered a 'default' version. Only one PHP version will have **d** indicator.

The fourth column can have values or **-. ** If

In case a user is not inside CageFS, and as such doesn't use , you will see the following error message:

```
ERROR:User USERNAME not in CageFS
```



## PHP Selector


**[LVE Manager 2.0-11.1 or higher]**

can now be used with CageFS turned off (in case when there is only one user account on the server).

To install run:

```
yum groupinstall alt-php
yum install cagefs lvemanager
```

(no need to initialize or turn on CageFS)

```
selectorctl --setup-without-cagefs USER
```

( - the name of a user who is using selector. If not specified, the first available cPanel account username will be used).

When executing , the following actions are performed:

Creating symlinks to the user modules and options for each version:

_/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini_

In user home directory creating:

_.cl.selector/_

“Backup” settings files (selected version, modules, options):

_.cl.selector/defaults.cfg_
_.cl.selector/alt_php44.cfg_

Symlinks to the selected version:

_.cl.selector/lsphp -> /opt/alt/php44/usr/bin/lsphp_
_.cl.selector/php.ini -> /opt/alt/php44/etc/php.ini_
_.cl.selector/php-cli -> /opt/alt/php44/usr/bin/php_
_.cl.selector/php -> /opt/alt/php44/usr/bin/php-cgi_

Additional symlinks for environment variable (search path) in the file :

_.cl.selector/selector.path/_
_.cl.selector/selector.path/php-cgi -> ../php_
_.cl.selector/selector.path/php -> ../php-cli_

Generated ini files with selected modules and options for each version:

_.cl.selector/alt_php44.ini_
_.cl.selector/alt_php51.ini_
_.cl.selector/alt_php52.ini_
_.cl.selector/alt_php53.ini_
_.cl.selector/alt_php54.ini_
_.cl.selector/alt_php55.ini_
_.cl.selector/alt_php56.ini_
_.cl.selector/alt_php70.ini_
_.cl.selector/alt_php71.ini_

Symlinks above are being created according to the settings in and files (44 - corresponding PHP version), which are storing settings for the user. These files are usually taken from user home directory backup or when migrating account from another server. Thus, when migrating account from server to server, settings are saved.

If no settings backup files are found when running , then default settings from _ _ global file are applied (as in selector normal mode). If the file is absent, then native PHP version will be selected for the user.

The following line:

is being added to the user file



Also

`o` Turns off link traversal protection (linksafe);
`o` Turns off cagefs service.

To get back to the selector normal mode (“with CageFS”) run:

```
selectorctl --revert-to-cagefs
```

(CageFS should be initialized by using command before running the command above)

This command removes symlinks:

_/opt/alt/php55/link/conf/alt_php.ini -> /home/USER/.cl.selector/alt_php55.ini,_ turns on link traversal protection (linksafe) and cagefs service.


## Configuring "


**[CageFS 6.0-33 or higher, **

There is _ _ _ _ file, where you can specify values of PHP options that should be applied for all versions that are installed on a server. These settings will also be automatically applied to the new versions that will be installed later.

Example:

_# cat /etc/cl.selector/global_php.ini _
_[Global PHP Settings]_
_date.timezone = Europe/Warsaw_
_error_log = error_log_
_memory_limit = 192M_

Sections are ignored. Only name of an option and a value have meaning.

When an option is absent in _ _ file, than it is not changed (applied) to php.ini for versions.

and options are handled differently than the others. When these options are not in file, than values for the options will be taken from php.ini file. And when the option is in php.ini for some version already (and its value is not empty), than value from will be NOT applied.

To confirm changes (not affecting and options) please run:

```
/usr/sbin/cagefsctl --setup-cl-selector
```

To confirm changes (including and options) please run:

```
/usr/bin/selectorctl --apply-global-php-ini
```

or

```
/usr/sbin/cagefsctl --apply-global-php-ini
```

(two commands above work the same way).

If you don't want to change , but want to change , you can execute:

```
selectorctl --apply-global-php-ini date.timezone
```

Similarly, command applies and all other options specified in file, except .

So, you can specify 0, 1 or 2 parameters from the list: .

Using without arguments applies all global PHP options including two above.

Example:

```
selectorctl --apply-global-php-ini error_log
selectorctl --apply-global-php-ini date.timezone
selectorctl --apply-global-php-ini date.timezone error_log
```

The latter command has the same effect as


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



| |  |  |  | |
|-|--|--|--|-|
|bcmath bz2 calendar ctype curl dba dbase dbx domxml exif fileinfo | ftp gd gettext gmp iconv imap interbase ioncube_loader ioncube_loader_4 json ldap  | mbstring mcrypt mhash mysql ncurses odbc openssl overload pcntl pcre pgsql  | posix pspell readline recode session shmop snmp sockets sourceguardian standard sybase_ct sysvmsg  | sysvsem sysvshm tokenizer wddx xml xmlrpc zlib|


### PHP 5.1 Extensions




| |  |  |  | |
|-|--|--|--|-|
|bcmath big_int bitset bz2 bz2_filter calendar coin_acceptor crack ctype curl date dba dbase dom doublemetaphone exif ftp gd geoip | gettext gmagick gmp gnupg haru hash huffman iconv idn igbinary imagick imap inclued inotify interbase ioncube_loader ioncube_loader_4 ldap libxml  | lzf mbstring mcrypt memcache msgpack mysql mysqli ncurses odbc openssl pcntl pcre pdo pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite  | pgsql posix pspell quickhash radius readline redis reflection session shmop simplexml snmp soap sockets sourceguardian spl ssh2 standard stats  | stem sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer translit wddx xdebug xml xmlreader xmlrpc xmlwriter xsl zlib |


### PHP 5.2 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apc apm ares bcmath bcompiler big_int bitset bloomy bz2 bz2_filter calendar coin_acceptor crack ctype curl date dba dbase dbx dom doublemetaphone eaccelerator enchant exif ffmpeg fileinfo filter  | ftp gd gender geoip gettext gmagick gmp gnupg haru hash hidef htscanner huffman iconv idn igbinary imagick imap inclued inotify interbase intl ioncube_loader ioncube_loader_4 json ldap libxml lzf  | magickwand mailparse mbstring mcrypt memcache memcached mhash mongo msgpack mssql mysql mysqli ncurses oauth odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite  | pgsql phar posix pspell quickhash radius rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite ssh2 standard stats stem stomp  | suhosin sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer translit uploadprogress uuid wddx xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaz zend_optimizer zip zlib|










### PHP 5.3 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apc apcu apm ares bcmath bcompiler big_int bitset bloomy brotli bz2 bz2_filter calendar clamav coin_acceptor core crack ctype curl date dba dbase dbx dom doublemetaphone eaccelerator eio enchant ereg exif ffmpeg fileinfo  | filter ftp functional gd gender geoip gettext gmagick gmp gnupg haru hash hidef htscanner http huffman iconv idn igbinary imagick imap inclued inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libxml lzf  | magickwand mailparse mbstring mcrypt memcache memcached mhash mongo msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql phalcon phar  | posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite sqlite3 ssh2 standard stats stem stomp suhosin sybase_ct sysvmsg sysvsem  | sysvshm tidy timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaml yaz zend_guard_loader zip zlib zmq|


### PHP 5.4 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apc apcu apm ares bcmath big_int bitset brotli bz2 bz2_filter calendar clamav core ctype curl date dba dbase dbx dom doublemetaphone eaccelerator eio enchant ereg exif ffmpeg fileinfo filter ftp functional gd | gender geoip gettext gmagick gmp gnupg haru hash hidef htscanner http iconv igbinary imagick imap inclued inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libsodium libxml lzf magickwand mailparse mbstring | mcrypt memcache memcached mhash mongo mongodb msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql phalcon phar  | posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite3 ssh2 standard stats stem stomp suhosin sybase_ct sysvmsg sysvsem sysvshm tidy | timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaml yaz zend_guard_loader zip zlib zmq|


### PHP 5.5 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apcu apm ares bcmath big_int bitset brotli bz2 bz2_filter calendar clamav core ctype curl date dba dbase dbx dom doublemetaphone eio enchant ereg exif ffmpeg fileinfo filter ftp gd gender geoip  | gettext gmagick gmp gnupg gRPC haru hash hidef htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libsodium libxml lzf magickwand mailparse mbstring mcrypt  | memcache memcached mhash mongo mongodb msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql   | phalcon phalcon3 phar posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite3 ssh2 standard stats stem stomp suhosin   | sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaf yaml yaz zend_guard_loader zip zlib zmq |






### PHP 5.6 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apcu apm ares bcmath big_int bitset brotli bz2 bz2_filter calendar core ctype curl date dba dbx dom doublemetaphone eio enchant ereg exif ffmpeg fileinfo filter ftp gd gender geoip gettext | gmagick gmp gnupg gRPC haru hash htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader ioncube_loader_4 jsmin json ldap libevent libsodium libxml lzf mailparse mbstring mcrypt memcache memcached mhash | mongo mongodb msgpack mssql mysql mysqli mysqlnd ncurses nd_mysql nd_mysqli nd_pdo_mysql oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pgsql phalcon phalcon3 | phar posix propro pspell quickhash radius raphf rar readline recode redis reflection rsync session shmop simplexml snmp soap sockets sourceguardian spl spl_types sqlite3 ssh2 standard stats stem stomp | suhosin sybase_ct sysvmsg sysvsem sysvshm tidy timezonedb tokenizer trader translit uploadprogress uri_template uuid wddx weakref xcache_3 xdebug xml xmlreader xmlrpc xmlwriter xrange xsl yaml yaz zend_guard_loader zip zlib zmq|


### PHP 7.0 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath bitset brotli bz2 calendar core ctype curl date dba dbase dom eio enchant exif fileinfo filter ftp gd gender | geoip gettext gmagick gmp gnupg gRPC hash htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader json ldap libsodium libxml lzf mailparse mbstring mcrypt | memcached mongodb mysqli mysqlnd nd_mysqli nd_pdo_mysql newrelic* oauth oci8 odbc opcache openssl pcntl pcre pdf pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql phalcon3 phar | posix propro pspell raphf rar readline redis reflection session shmop simplexml snmp soap sockets sourceguardian spl sqlite3 sqlsrv ssh2 standard stats suhosin sysvmsg | sysvsem sysvshm tidy timezonedb tokenizer trader uploadprogress uuid vips wddx xdebug xml xmlreader xmlrpc xmlwriter xsl yaml yaz zip zlib zmq|


* Please note that to use extension you should set your own in your own file.
Please find more info about in the [ documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .






### PHP 7.1 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath brotli bz2 calendar core ctype curl date dba dbase dom eio enchant exif fileinfo filter ftp gd gender geoip gettext | gmagick gmp gnupg gRPC hash htscanner http iconv igbinary imagick imap inotify interbase intl ioncube_loader json ldap libsodium libxml lzf mailparse mbstring mcrypt memcached | mongodb mysqli mysqlnd nd_mysqli nd_pdo_mysql newrelic* oauth oci8 odbc opcache openssl pcntl pcre pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql phalcon3 phar  | posix propro pspell raphf rar readline redis reflection session shmop simplexml snmp soap sockets sourceguardian spl sqlite3 sqlsrv ssh2 standard stats suhosin sysvmsg  | sysvsem sysvshm tidy timezonedb tokenizer trader uploadprogress uuid vips wddx xdebug xml xmlreader xmlrpc xmlwriter xsl yaml zip zlib zmq|


* Please note that to use extension you should set your own in your own file.
Please find more info about in the [ documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .

### PHP 7.2 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath brotli bz2 calendar core ctype curl date dba dom eio enchant exif fileinfo filter ftp gd gender geoip gettext | gmagick gmp gnupg gRPC hash http iconv igbinary imagick imap inotify interbase intl ioncube_loader json ldap libxml lzf mailparse mbstring memcached mongodb | mysqli mysqlnd nd_mysqli nd_pdo_mysql newrelic* oauth oci8 odbc opcache openssl pcntl pcre pdo pdo_dblib pdo_firebird pdo_mysql pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql phalcon3 phar  | posix propro pspell raphf readline redis reflection session shmop simplexml snmp soap sockets spl sqlite3 sqlsrv ssh2 standard stats sysvmsg sysvsem | sysvshm tidy timezonedb tokenizer trader uploadprogress uuid vips wddx xml xmlreader xmlrpc xmlwriter xsl yaml zip zlib zmq|

* Please note that to use extension you should set your own in your own file.
Please find more info about in the [ documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .




### PHP 7.3 Extensions



| |  |  |  | |
|-|--|--|--|-|
|apcu bcmath dba dbase dom eio enchant fileinfo gd gender geoip gmagick gnupg grpc http  | igbinary imagick imap inotify interbase intl json ldap lzf mailparse mbstring memcached mongodb mysqlnd nd_mysqli | nd_pdo_mysql newrelic oauth oci8 odbc opcache pdf pdo pdo_dblib pdo_firebird pdo_oci pdo_odbc pdo_pgsql pdo_sqlite pdo_sqlsrv pgsql | phar posix propro pspell raphf redis snmp soap sockets sqlsrv ssh2 stats sysvmsg sysvsem sysvshm tidy | timezonedb trader uploadprogress uuid vips wddx xdebug xmlreader xmlrpc xmlwriter xsl yaf yaml zip zmq|


* Please note that to use extension you should set your own in your own file.
Please find more info about in the [New Relic documentation](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) .

## Disabling PHP extension globally


If you want to disable PHP extension globally, you don't need to remove file . You should just comment out directives in it.

The extension will be visible in interface, but selecting it in users's interface will take no effect - extension will be disabled in fact.

Reinstalling of packages will not reset settings (will not enable extension again).


## Control Panel Integration


[cPanel](/php_selector/#php-selector)

### PHP Selector


_[Requires CageFS 5.5-6.18+]_

When using EasyApache4 in cPanel, it is possible to change PHP versions for users' domains with (when PHP is working under web server). Also it is possible to change system default PHP version with in WHM.

in WHM looks as follows:

![](/images/cpanel_integration_zoom57.png)

A user can change PHP version for domain in cPanel interface but can not change System default PHP version.

![](/images/cpanel_integration01.png)

The following packages (and higher) provide an ability to select version in :

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


You can remove from .
To do so set _'_ or _'_ for the versions in config file and run
This script manages SCL prefixes for the - removes or creates prefixes in

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





works in different ways with EasyApache4 and EasyApache3. CageFS should be enabled for users who use . The novation is that when using  EasyApache4, actual PHP version used depends on PHP version selected in . When PHP version chosen for domain in matches System default PHP version, then is used to select actual PHP version. If PHP version chosen for domain in differs from System default PHP version, then PHP version from is used.

In other words, deals with changing System default PHP version.

algorithm for choosing PHP version for domain is as follows:

1. If CageFS is disabled, then is not active and version is applied.

2. If CageFS is enabled, then:

2.1. If PHP version chosen in differs from System default PHP version, then version is applied.

2.2. If PHP version chosen in is the same as System default PHP version, then version is applied:

2.2.1. If _ _ option is selected in , then

2.2.2. If PHP version chosen in differs from , then version is applied.

![](/images/cpanel_integration02.png)

![](/images/cpanel_integration03.png)

![](/images/cpanel_integration04.png)

PHP version chosen in can also be applied to console commands In this case file search is performed in current directory and in parent directories. If the file is found, then PHP version specified in it is applied, if not found, then System default PHP version is applied. System default PHP version can be changed via .

1. If CageFS is disabled, then is not active and PHP version from is applied.

2. If CageFS is enabled, then:

2.1. If PHP version specified in .htaccess file differs from System default, then version is applied.

2.2. If System default PHP version is specified in file, then version is applied:

2.2.1. If option is chosen in , then PHP version is applied.

2.2.2. If PHP version chosen in differs from , then version is applied.








The set of PHP modules depends on PHP version used for domain or console. If is active and version is chosen, then modules chosen for this version in are used. If is not active, then modules for PHP version chosen in cPanel MultiPHP are used.


cPanel has available in WHM and in cPanel user interface.

allows setting PHP options for any PHP version globally for all domains and users. At this point file is generated and options values are written into this file. Such options have higher priority than the options set in in cPanel user interface. allows to set PHP options in (simplified interface) and in .

in WHM looks as follows:

![](/images/cpanel_integration05_zoom67.png)

![](/images/cpanel_integration06_zoom67.png)







MultiPHP INI Editor in cPanel user interface allows setting options for _ php.ini_ files in user home directory or in domain docroot. Changes are applied immediately without delay.

These options priority is lower than ones specified in WHM interface. in cPanel user interface looks as follows

![](/images/cpanel_integration07.png)

![](/images/cpanel_integration08.png)

If is active, then options set in are applied, and such options have higher priority than options in custom _php.ini_ file in domain docroot. If is disabled, then options set in are applied.

**QUIRKS:** When changing System default PHP version, administrator should take into consideration the following quirk. For example, if a user has chosen PHP 5.3 for domain and System default PHP version is PHP 5.5, then will not be used for user domain. In this case, if administrator switches System default PHP version from 5.5 to 5.3, then will be activated for user domain and PHP version chosen in will be applied for domain.

That is why it is recommended for administrator to avoid changing System default PHP version to PHP version that is already used by users. At the same time it is recommended for users to choose inherit for domain and use to choose PHP version. In this case PHP version chosen in will be always applied for domain.

