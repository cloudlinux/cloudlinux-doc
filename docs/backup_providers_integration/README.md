# Backup Providers Integration


**None**
**None**
[Synopsis](/command_line_usage.htm#synopsis/)
[Actions](/command_line_usage.htm#actions/)
[init](/command_line_usage.htm#init/)
[list](/command_line_usage.htm#list/)
[restore](/command_line_usage.htm#restore/)
[cleanup](/command_line_usage.htm#cleanup/)
[extra](/command_line_usage.htm#extra/)
**None**
[Restoring Infected Files](/using_as_library.htm#restoringinfectedfiles/)
[Operating With Backend](/using_as_library.htm#operatingwithbackend/)
[Operating With Backup](/using_as_library.htm#operatingwithbackup/)
[Operating With File in Backup](/using_as_library.htm#operatingwithfileinbackup/)
**None**
[Creating Module](/creating_custom_backup_backend.htm#creatingmodule/)
[Defining Classes](/creating_custom_backup_backend.htm#definingclasses/) 
[Backup Class](/creating_custom_backup_backend.htm#backupclass/)
[FileData Class](/creating_custom_backup_backend.htm#filedataclass/)
[Implementing API Functions](/creating_custom_backup_backend.htm#implementingapifunctions/)

## Overview


**Restore_infected** is a library written in Python 3. It allows to restore files from backups. It supports several backup backends. Each backend is represented as a plugin which uses a particular API to the backup server and provides a user with a common interface to restore individual files regardless of backup backend selected. In addition to the existing backends custom ones can be added.

If one of the files is infected with malware the library can also search for the last uninfected revision of this file in available backups and restore it. By default it uses _ imunify360-agent_ to detect infected files but a custom algorithm can be used instead.

![](/images/restoreinfectedscheme_zoom70.png)

From the figure one can see that the user of the library is supposed to reference it either using command line interface or calling library functions directly. The CLI supports interaction with the _restore algorithm_ but not with the backend API. _Restore algorithm_ doesn’t have a functionality to restore a file from any backup but is capable of restoring files infected with malware instead. It treats absent files as infected ones therefore restores the last revision of those.


## Command Line Usage


A command line interface to restore_infected library is present in the file restore_infected_cli.py. If installed from the RPM, the binary is located in _/usr/bin/restore_infected_ and can be used as _“restore_infected”_ . To use the CLI a backend and an action should be specified.

The library includes the following backup backend plugins:

Acronis;
cPanel;
Plesk.

### Synopsis



```
restore_infected BACKEND ACTION
```
```
 
```
Where _BACKEND_ is one of the backends - predefined or custom and _ACTION_ is one of the actions described below.

### Actions



**init**

The first step most of the plugins will need is initialization. The most common use of it is to save credentials for the backup server.

```
init arg0 arg1 ...
```

The arguments may vary depending on the backend used. To see which arguments are needed for the particular plugin you can call `init` with no arguments:

```
restore_infected acronis init
usage: restore_infected [-h] BACKEND {init,list,restore,cleanup} ...
restore_infected: error: init arguments required: username password
```

To install Acronis backup agent, pass `--provision` option to `init` command. To force installation when agent is present use `--force` option.

**list**

list shows available backups sorted by date starting with the newest.

```
list [--until]
```

If a date string is passed as `--until` , list all backups from now up to that date or all backups otherwise. The date for `--unitil` parameter can be in any format that python-dateutil can parse, e.g. _ "2017-08-01"_ , _"01 Aug 2017"_ , etc.

Example:

```
restore_infected acronis list --until "01 Aug 2017"
2017-08-06T10:22:00
2017-08-05T06:00:00
2017-08-03T12:32:00
```

**restore**

```
restore files [--until]
```

Restore files from backup. `restore` takes a list of files (paths to them) which are considered infected, searches for the first uninfected entry of each file in backups and restores it. Backups older than the date set in `--until` are not considered.

Example:

```
restore_infected acronis restore "/root/file1" "/root/file2" --until "01 Aug 2017"
```

**cleanup**

The most common use is to delete any temporary files created by the plugin. Depending on the backend the functionality may vary or such function might not be present at all.

Example:

```
restore_infected plesk cleanup
```

**extra**

This is for acrivity not connected to restoring from backups.

Currently supported options are
`login_url` (for Acronis backend). This option returns url to log in to Acronis cloud web-interface;
`refresh_token` (for Acronis backend). This option refreshes authentication token to keep it valid.




## Using as Library


### Restoring Infected Files


 
The main purpose of the library is to search for uninfected files and to restore them as a replacement for infected ones. The function responsible for that is located in a module _restore_infected.restore_ :

```
restore_infected(backend, files, until=None, scan_func=scan)
```

Where:

_backend_ is a backend plugin module;
_files_ is a list of files to scan and restore;
_until_ filters the backups before specified date;
_scan_func_ is a function that scans files for malware. It takes a list of files and returns the list of infected ones, by default it uses the function _scan_ from the same module.

For example _restore_infected _ can be called like this:

```
from restore_infected import backup_backends
```
```
from restore_infected.restore import restore_infected
```
```
from restore_infected.helpers import DateTime
```
```
 
```
```
plesk = backup_backends.backend('plesk')
```
```
 
```
```
def my_scan(files):
```
```
  infected = []
```
```
  # scan files here
```
```
  return infected
```
```
 
```
```
restore_infected(
```
```
plesk,
```
```
"/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php",
```
```
until=DateTime("9 Aug 2017"),
```
```
scan_func=my_scan)
```
 
### Operating With Backend


 
A backend plugin can be imported directly from _restore_infected.backup_backends_ . Every plugin has a function called _backups_ which returns the list of objects each of which is representing a backup, and might have optional functions `init` and/or `cleanup` which initialize and cleanup the plugin respectively.

In the following example let’s print out all backups. For _plesk_ in the following example the _init_ function is not needed so we can call backups right away:

```
from restore_infected import backup_backends
```
```
plesk = backup_backends.backend('plesk')
```
```
for backup in plesk.backups():
```
```
       print(backup)
```
```
 
```
This will give us the following list of backups:

```
/var/lib/psa/dumps/clients/u3/domains/u3.pl7.cloudlinux.com/backup_info_1708080701_1708090501.xml
```
```
/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_info_1708090500.xml
```
```
<...>
```
```
/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_info_1707070347_1707070353.xml
```
```
/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_info_1707070347.xml
```
```
 
```
_backups_ has an optional parameter `until` of restore_infected.helpers.DateTime. To filter out backups from 9 Aug 2017 till now the code can be changed like this:

```
from restore_infected import backup_backends
```
```
plesk = backup_backends.backend('plesk')
```
```
from restore_infected.helpers import DateTime
```
```
for backup in plesk.backups(DateTime("9 Aug 2017")):
```
```
       print(backup)
```


### Operating With Backup


 
In the previous step we printed out some backups. Every backup entry regardless of the plugin also has a field _created_ which tells when the actual backup was created. It makes backups comparable.

Example:

```
backups = plesk.backups()
```
```
print(backups[4].created)
```
```
print(backups[5].created)
```
```
print(backups[4] > backups[5])
```
```
Which gives us:
```
```
2017-08-08 07:01:00
```
```
2017-08-08 07:00:00
```
```
True
```
 
### Operating With File in Backup


 
A method _file_data_ returns a representation of a file in this backup as an instance of a class (hereafter this class is referenced to _FileData_ ):

```
print(backup.file_data('/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php'))
```

Output:

```
<FileData(
```
```
fileobj=<ExFileObject name='/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_user-data_1708080700.tgz'>,
```
```
filename='/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php',
```
```
size=418,
```
```
mtime=datetime.datetime(2013, 9, 24, 20, 18, 11)
```
```
>
```
```
 
```
where _mtime_ is the time of the last modification of a file.

Besides these fields, FileData also has a method _restore_ . If _destination_ is passed as a parameter then the file is restored and saved in specified folder saving the directory hierarchy. The default _destination_ is ‘/’ which means that the file is restored to the place of its origin.

Example:

```
from restore_infected import backup_backends
```
```
plesk = backup_backends.backend('plesk')
```
```
backups = plesk.backups()
```
```
filedata = \
```
```
backups[5].file_data('/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php')
```
```
filedata.restore('/home/user/restored_files')
```
```
 
```
It gives no output if zero errors occurred and creates `'var/...'` directories in ` ` `'/home/user/restored_files'` with a restored file.

From now on Acronis backend supports `provision=True/False` (by default `False` ) and ` ` `force=True/False` (by default `False` ) options for _init_ action, to install Acronis backend agent. Use `force` to reinstall agent if it is already present.

As of version 1.2-1, Acronis _init_ takes optional argument ` ` `tmp_dir` to specify temporal directory for installing Acronis backup client.

Example:

```
from restore_infected import backup_backends
```
```
acronis = backup_backends.backend('acronis')
```
```
acronis.init(name, password, provision=True, force=True, tmp_dir=None)
```

`login_ur` l action for return URL to log in to Acronis Web-interface.
```
 
```
Example:

```
from restore_infected import backup_backends
```
```
acronis = backup_backends.backend('acronis')
```
```
token = acronis.login_url()
```

`login_url` action for refreshing authentication token.

Example:

```
from restore_infected import backup_backends
```
```
acronis = backup_backends.backend('acronis')
```
```
acronis.refresh_token()
```

`info` action to return region, schedule and used storage space in JSON format.
```
 
```
Example:

```
from restore_infected import backup_backends
```
```
acronis = backup_backends.backend('acronis')
```
```
info = acronis.info()
```
```
{'schedule': {...}, 'usage': 17890969600, 'region': 'eu2'}
```

`make_initial_backup` makes initial backup after Acronis backup client is installed. By default it does not wait for the backup completion. To wait for the backup to be completed use option ` ` `trace=True` . When such an option is on, current completion percentage is being outputted to log file (by default _ /var/restore_infected/acronis_backup.log_ . Returns `True` if backup is successful and `False` otherwise.

Example:

`from` ` ` `restore_infected` ` ` `import` ` ` `backup_backends`
```
acronis = backup_backends.backend('acronis')
```
```
acronis.make_initial_backup(trace=False)
```

## Creating Custom Backup Backend Plugin


### Creating Module


 
To create a plugin for a particular backup backend a python module should be created in _backup_backends_ folder. The plugin will be registered automatically when a function _backend(name)_ from _backup_backends_ module is called.
If the plugin should be used only in some appropriate systems environment _is_suitable_ function could be implemented, which should return Boolean. It will be called during _backend(name)_ from _backup_backends_ function call and if _is_suitable False_ , then _BackendNonApplicableError_ exception will be raised.

Here is an example of _is_suitable _ function for DirectAdmin module:

```
def is_suitable():
```
```
return os.path.isfile('/usr/local/directadmin/directadmin')
```


### Defining Classes


 
There are two mandatory classes that have to be implemented in the plugin.

**Backup Class**

This class represents a backup. It can have any name since it is not directly referenced to from the outside of the module. It can either be inherited from

```
backup_backends_lib.BackupBase
```
```
 
```
which already have some features (e.g. comparison) implemented or it can be written from scratch. The class must define a method _file_data_ that returns a FileData object (described below). Objects of this class should also be comparable by the date created as if they were actual backups.

**FileData Class**

The second class that has to be implemented is _FileData_ which represents a file in a backup. It must have file size, modify time and a method _restore_ .

### Implementing API Functions


 
There are 3 functions in the plugin, but only one of them is mandatory - _backups_ . This function returns a list of Backup instances. Optional functions are _init_ , _cleanup_ and _info_ that are responsible for the initialization, cleanup and getting some information of the plugin respectively.

```
def init(*args):
```
```
...
```
```
def backups(until=None):
```
```
...
```
```
def cleanup():
```
```
   …
```
```
def info():
```
```
   ...
```
```
 
```
Depending on the features of the backend being integrated, the plugin might have one or more classes and functions responsible to authorise on the backup server and retrieve data from it, however only functions _init_ , _backups_ , _cleanup_ and _info_ are called from the outside of the module.

To check that the plugin works as intended try passing your plugin name to the CLI for example like this:

```
restore_infected <your_backend_name> list
```

To be used in asynchronous libraries _ ‘async_restore_infected’_ routine has been added. Typical use case:

```
import logging
```
```
from restore_infected import backup_backends
```
```
from restore_infected.restore import async_restore_infected
```
```
from defence360agent.malscan.scanner import MalwareScanner
```
```
 
```
```
async def _custom_scan_function(files):
```
```
    if not files:
```
```
        return []
```
```
    still_infected = []
```
```
    scanner = MalwareScanner().scan_filelist()
```
```
    scanner.start(files)
```
```
    result = await scanner.async_wait()
```
```
    if result['results']:
```
```
        still_infected = list(result['results'].keys())
```
```
    return still_infected
```
```
 
```
```
class DummyDumper:
```
```
    @classmethod
```
```
    async def do_restore(cls, files):
```
```
        backend = backup_backends.backend('cpanel')
```
```
        return await async_restore_infected(
```
```
            backend, files, scan_func=_custom_scan_function)
```


For Acronis backup two restore modes are available:
**Download mode - ** a file to be restored is simply pulled by HTTP from backup server;
**Recovery mode -**  _restore_infected_ just sends command to backup server and then waits for the file to be restored is actually placed to expected folder. Its size is equal to expected one.
Recovery mode is used by default because it restores file owner and permissions, too. Though downloading mode can be enabled with passing `‘use_download’` option to `restore_infected` _ _ function. The second optional parameter - `timeout -` can be passed to `restore_infected` function to change the default waiting time (time to wait while a file to be restored is being pulled by recovery agent). By default timeout is 600 seconds.



