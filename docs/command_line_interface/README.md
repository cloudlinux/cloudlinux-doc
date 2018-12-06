# Command-line Interface


For access to Imunify360 agent features from command-line interface, use the following command:

```
imunify360-agent
```

Optional arguments:

| | |
|-|-|
| | Returns the help message|
| | IP address for adding it to the whitelist|
| | Level of logging input to the console|
```
 
```
Basic usage:

```
imunify360-agent [command] [--option1] [--option2]...
```
```
 
```
```
Available commands:
```
```
       3rdparty            Make Imunify360 the primary IDS
```
```
       blacklist           Return/Edit IP blacklist
```
```
       blocked-port        Return/Edit list of blocked ports
```
```
       check-domains       Send domain list check
```
```
       clean               Clean the incidents
```
```
       checkdb             Check database integrity
```
```
       doctor              Collect info about system and send it to CloudLinux
```
```
       features            Manage available features for Imunify360
```
```
       get                 Returns list of incidents
```
```
       graylist            Return/Edit IP gray list
```
```
       import              Import data
```
```
       infected-domains    Returns infected domain list
```
```
       malware             Allows to manage malware options
```
```
       migratedb           Check and repair database if it is corrupted
```
```
       plugins             Command for manipulating Imunify360 plugin
```
```
       register            Registration the agent
```
```
       rstatus             Query the server to check if the license is valid
```
```
       rules               Allows user to manage disabled rules
```
```
       unregister          Unregistration the agent
```
```
       vendors             Command for manipulating Imunify360 vendors
```
```
       version             Show version
```
```
       whitelist           Return/Edit operator for IP and domain white list
```
```
       proactive           Allows to manage Proactive Defense feature {Available starting with Imunify360 3.7.0 Beta}
```
```
 
```
```
 
```
Optional arguments for the commands:

| | |
|-|-|
| | Shows this help message. |
| | Returns data in JSON format. |
| | Filters output by country code. Requires valid country code as argument. Find valid country codes [here](http://www.nationsonline.org/oneworld/country_code_list.htm) in column ISO ALPHA-2 CODE. |
| | Filters output by abuser's IP or by subnet in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) . Example: `--by-ip 1.2.3.0/24` . |
| | Can be: any, gray (Gray List), white (White List), black (Black List). Filters output based on the list type. Example: ` --by-list black` . |
| | limits the output with specified number of incidents. Must be a number greater than zero. By default, equals 100. |
| | Offset for pagination. By default, equals 0. |
| | Allows to set the end of the period for filter. Format is a timestamp. |
| | Show only IP’s that have been added manually.|
| | Show IP’s that have been added both automatically and manually.|
| | Allows to return data in good-looking view if option --json is used.|

## 3rdparty



Command for disabling 3rd party IDS (currently they are cPHulk and fail2ban) and make Imunify360 agent the primary IDS.

Usage:

```
imunify360-agent 3rdparty [-h]
```

**Command** is a positional argument and can be:

| | |
|-|-|
| | Show conflicts with other software.|
| | List other IDS that might be running concurrently with Imunify360.|

Optional arguments:

| | |
|-|-|
| | Show this help message.|
 
## Blacklist



This command allows to view or edit actual IPs in the blacklist.

Usage:

```
imunify360-agent blacklist [subject] [command] <value> [--option]
```
```
 
```
`subject ` is a positional argument and can be:

| | |
|-|-|
| | Allows to manipulate with countries in the Black List.|
| | Allows to manipulate with IPs in the Black List.|

`command` is a second positional argument and can be:

| | |
|-|-|
| | add item(-s) to Black List|
| | remove item(-s) from Black List|
| | move item(-s) to Black List|
| | edit comment on item in the Black List|
| | list items(-s) in Black List|


Please note that by default **list** command outputs only first 100 items in the list as if it was run as `blacklist ip list --limit 100` .
To check whether specific IP address is in the list, you can run the following command:

```
blacklist ip list --by-ip 12.34.56.78
```

where 12.34.56.78 is that specific IP address.

`value` is an item to manipulate with. It can be IP itself or a country code (find necessary country codes here in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) in the column ISO ALPHA-2 CODE).

`option` can be one or few of the optional arguments specified above and one more:

| | |
|-|-|
| | allows to add comment to the item|

_Examples:_

The following commands add IP 1.2.3.4 to the Black List with a comment “one bad IP”:

```
imunify360-agent blacklist ip add 1.2.3.4 --comment “one bad ip”
```

The following command returns a list of IPs in the Black List which are from Bolivia:

```
imunify360-agent blacklist --by-country-code BO
```

 
## Blocked ports


 
This command allows to view or edit ports, IPs, and protocols in the list of blocked ports.

Usage:

```
imunify360-agent blocked-port [command] <value> [--option]
```

`command` is a first positional argument and can be:

| | |
|-|-|
| | add item(-s) to blocked ports|
| | remove item(-s) from blocked ports|
| | edit comment on item in the blocked ports|
| | list items(-s) in blocked ports|

`value` is an item to manipulate with. `value ` is ‘:’ separated pair of port number and protocol: 5432:tcp, 28:udp

`option` can be one or few of the optional arguments specified above and some more:

| | |
|-|-|
| | allows to add comment to the item|
| | allows to add IP addresses to ignore list of the blocked port (port won’t be blocked for this IP addresses).|

_Example:_

The following command blocks port 5555 for tcp connections with a comment “Some comment”:

```
imunify360-agent blocked-port add 5555:tcp --comment “Some comment”
```
 
## Check-domains



Allows to send domains list to check on Imunify360 central server. This command requires cPanel. After domains checked, the results is available via command `infected-domains` . Please note that the server requires some time for checking and the results may not be ready immediately.

Usage:

```
imunify360-agent check-domains [--optional arguments]
```

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | return data in JSON format|
| | Allows to return data in good-looking view if option --json is used.|

## Clean



Clean the incident list.

Usage:

```
imunify360-agent clean [--optional arguments]
```
```
 
```
Optional arguments:
```
 
```
| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Cleanups incidents from database, if there are more than specified days quantity. Example: `--days 5` . This option will cause deletion of all incidents that are older than 5 days from today.|
| | Leaves only limited number of the incidents in the database and deletes the others. Example: `--limit 5000` . This option will leave only 5000 new incidents and delete the others.|

## Checkdb



Checks database integrity. In case database is corrupt, then this command saves backup copy of the database at _/var/imunify360_ and tries to restore integrity of the original database. Note that if this command cannot restore database integrity, then it will destroy the original broken database. Use `migratedb` command to create new clean database.

Usage:

```
imunify360-agent checkdb [-h]
```

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Allows to return data in good-looking view if option --json is used.|


## Doctor



Collecting information about Imunify360 state, generating the report and sending it to Imunify360 Support Team. This command can be used in case of any troubles or issues with Imunify360. This command will generate a key to be sent to Imunify360 Support Team. With that key Imunify360 Support Team can help with any problem as fast as possible.

Usage:

```
imunify360-agent doctor [-h]
```
```
 
```
Optional arguments:
```
 
```
| | |
|-|-|
| | Show this help message.|
| | |
|-|-|
| | Return data in JSON format.|
| | Allows to return data in good-looking view if option --json is used.|
 
## Features



Allows to enable or disable additional CloudLinux software included in Imunify360 for free. The following software is available:

[KernelCare](https://www.cloudlinux.com/all-products/product-overview/kernelcare)
[HardenedPHP](https://www.cloudlinux.com/hardenedphp)
Invisible Captcha

Usage:

```
imunify360-agent features [-h] [command] <feature name>
```

`command` is a positional arguments and can be :

| | |
|-|-|
| | allows to enable software|
| | allows to disable software|
| | allows to check the status of the software|
| | allows to list all available software|

Optional arguments:

| | |
|-|-|
| | Show this help message.|

_Examples:_

1.The following command checks if KernelCare is installed:

```
imunify360-agent features status kernelcare
```

2.The following command installs KernelCare:

```
imunify360-agent features install kernelcare
```

3.The following command uninstalls KernelCare:

```
imunify360-agent features remove kernelcare
```


## Get



The command returns the lists of incidents.

Usage:

```
imunify360-agent get [--required argument] [--optional argument]...
```
```
 
```
Option can be one or few of the optional arguments listed above and one more.

| | |
|-|-|
| | timeframe, allows to specify the amount of time starting from the current day. Should be greater than (or equal to) 1 minute. Can be specified in format: `<int>m` - minutes, example ` --period 30m` `<int>h` - hours, example `--period 4h` `<int>d` - days, example `--period 7d` `today` - for today, example `--period today` `yesterday` - for yesterday, example `--period yesterday` For example, ` --period 5d` will return a list of incidents for 5 days. |
| | Allows to set start time to filter the list of incidents by period.|
| | Allows to set finish time to filter the list of incidents by period.|
| | Allows to set severity to filter the list of incidents.|

_Example:_

The following command shows the incidents (in JSON format) for recent 1 hour, filtered by country code UA and filtered by Black List IPs:

```
imunify360-agent get --period 1h --by-country-code UA --by-list black --json
```

## Graylist



This command allows to view or edit actual IP blacklist.

Usage:

`imunify360-agent graylist ip [command] [--optional argument]`
```
 
```
Available commands:
```
 
```
| | |
|-|-|
| | Allows to remove IP from Gray List.|
| | Allows to list IPs in Gray List.|
```
 
```
Optional arguments:

| | |
|-|-|
| | Show this help message.|

Optional arguments for `list` :

| | |
|-|-|
| | Returns data in JSON format.|
| | Filters output by country code. Requires valid country code as argument. Find valid country codes  in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) in column ISO ALPHA-2 CODE.|
| | Filters output by abuser's IP or by subnet in CIDR notation. Example: `--by-ip 1.2.3.0/24`|
| | Limits the output with specified number of IPs. Must be a number greater than zero. By default, equals 100.|
| | Offset for pagination. By default, equals 0.|
| | Allows to return data in good-looking view if option --json is used.|

Please note that by default **list** command outputs only first 100 items in the list as if it was run as `graylist` ` ` `ip` ` ` `list` ` ` `--limit` ` ` `100` .
To check whether specific IP address is in the list, you can run the following command:

```
graylist ip list --by-ip 12.34.56.78
```

where 12.34.56.78 is that specific IP address.

_Example:_

The following command will remove IP 1.2.3.4 from the Gray List:

```
imunify360-agent graylist ip delete 1.2.3.4
```

## Import



This command allows to import Black and White lists from the other 3rd party IDS (only CSF supported at the moment) to Imunify360 database.
Note. If CSF is enabled, then it is not necessary to run the command because Imunify360 is integrated with CSF.

Usage:

```
imunify360-agent import [-h] {blocked-ports, wblist} ...
```
```
 
```
Positional arguments:

| | |
|-|-|
|`blocked-ports        ` | Import blocked-ports from other IDS.|
|`wblist` | Import white/black list from other IDS.|
```
  
```
Optional arguments:

| | |
|-|-|
|`-h, --help` | Show this help message.|
```
 
```
_Example:_

_The following command will import Black and White lists from the 3rd party IDS:_

```
imunify360-agent import wblist
```
```
 
```
## Infected-domains



Allows to retrieve infected domains list.

Usage:

```
imunify360-agent infected-domains [-h] [--optional arguments]
```
```
 
```
Optional arguments for ` list` :

| | |
|-|-|
| | Returns data in JSON format.|
| | Limits the output with the specified number of domains. Must be a number greater than zero. By default, equals 100.|
| | Offset for pagination. By default, equals 0.|
| | Allows to return data in a good-looking view if option `--json` is used.|
 
## Malware



Allows to manage malware options.

Usage:

```
imunify360-agent malware [-h] [--optional arguments]
```
```
 
```
Available commands:

| | |
|-|-|
| | Show indicators for dashboard.|
| | Allows to add, delete or show files which will not be scanned.|
| | Allows to manage malicious files.|
| | Allows to manage on-demand scanner.|
| | Allows to read malware files.|
| | Allows to manage suspicious files.|
 
```
 
```
Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Returns data in JSON format.|
| | Limits the output with the specified number of domains. Must be a number greater than zero. By default, equals 100.|
| | Offset for pagination. By default, equals 0.|
| | Allows to return data in a good-looking view if option `--json` is used.|
| | Start date.|
| | End date.|
| | Returns results for a chosen user.|

**Command** is a second positional argument for `ignore ` and can be:

| | |
|-|-|
| | Add a file or files divided by space to the ignore list.|
| | Delete an ignored file or files divided by space from the list.|
| | Show a list of ignored files.|
 
**Command** is a second positional argument for `malicious` and can be:

| | |
|-|-|
| | Delete malicious file or files divided by space.|
| | Show a list of malicious files.|
| | Move a file or files divided by space to the ignore list.|
| | Allows to add malicious files to quarantine.|
| | Restore source files from backup.|
| | Restore files from quarantine.|

**Command** is a second positional argument for `on-demand` and can be:

| | |
|-|-|
| | Start on-demand scanner for the path specified after the `start` command, for example: _ imunify360-agent malware on-demand start --path /home/\<username\>/public_html/_|
| | Returns a list of all on-demand scanner session results.|
| | Show current status for on-demand scanner.|
| | Stop current scanning.|

**Command** is a second positional argument for `suspicious` and can be:

| | |
|-|-|
| | Delete suspicious file or files divided by space.|
| | Show a list of suspicious files.|
| | Move suspicious files divided by space to the ignore list.|
| | Move suspicious files divided by space to the quarantine|
 
## Migratedb



Allows to create clean database if it was corrupted. Note: use `checkdb` to check database health.

Usage:

```
Imunify360-agent migratedb [-h]
```

Optional arguments:

| | |
|-|-|
| | Show this help message.|


## Plugins



Command for manipulating Imunify360 plugins.

Usage:

```
imunify360-agent [command]
```

**Command** is a positional argument and can be:

| | |
|-|-|
| | Enable Imunify360 plugin.|
| | Disable Imunify360 plugin.|

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Return data in good-looking view if option --json is used.|

 
## Register



Allows to register and activate Imunify360. You can use it in case if Imunify360 was not activated during installation process or in case if activation key of the Imunify360 was changed for any reason. If you do not know what is an activation key or have any problem with it then, please, read [Installation guide](/installation/) or contact our [support team](https://cloudlinux.zendesk.com/hc/en-us/requests/new) .

Usage:

```
imunify360-agent register [--optional arguments] [KEY]
```

Activation key is a positional argument:

| | |
|-|-|
| | Register with activation key (use `IPL` to register by IP).|

If you will use this command without the `KEY` argument, then it will try to register and activate current activation key.

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Allows to return data in good-looking view if option --json is used.|

_Example 1:_

_The following command will register and activate Imunify360 with the provided activation key:_

```
imunify360-agent register IM250sdfkKK245kJHIL
```

_Example 2:_

_If you have an IP-based license, you can use _ `IPL` _ argument to register and activate Imunify360:_

```
imunify360-agent register IPL
```
```
 
```
## Rstatus



Allows to check if Imunify360 server license is valid.

Usage:

```
imunify360-agent rstatus [--optional arguments]
```

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Allows to return data in good-looking view if option --json is used.|

## Rules



This command allows user to manage rules disabled for firewall plugins Imunify360 uses.

Usage:

```
imunify360-agent rules [command] [--option] <value> [--option] <value>
```

Command is a positional argument and can be:

| | |
|-|-|
| | Add a new rule to the disabled rules list.|
| | Remove a rule from the disabled rules list.|
| | Display the list of the disabled rules.|

Option can be:

| | |
|-|-|
| | ID number of the rule provided by the firewall plugin.|
| | Firewall plugin name. Can be one of the following: `modsec` for ModSecurity; `ossec` for OSSEC.|
| | Name of the added rule or details of the rule from ModSecurity or OSSEC.|

_Example 1_ :
The following command adds a rule with id 42 and name ‘Rule name’ for the ModSecurity rules to the disabled rules list:

```
imunify360-agent rules disable --id 42 --plugin modsec --name 'Rule name'
```

_Example 2:_
The following command removes a rule with id 42 for the ModSecurity rules from the disabled rules list:

```
imunify360-agent rules enable --id 42 --plugin modsec
```

_Example 3:_
The following command displays the list of disabled rules:

```
imunify360-agent rules list-disabled
```

The list is displayed as follows:

```
{'plugin': 'modsec', 'id': '214920', 'domains': ['captchatest.com'], 'name': 'Imported from config'}
```
```
{'plugin': 'modsec', 'id': '42', 'domains': None, 'name': 'Rule name'}
```
```
{'plugin': 'ossec', 'id': '1003', 'domains': None, 'name': 'Imported from config'}
```
```
{'plugin': 'ossec', 'id': '2502', 'domains': None, 'name': 'User missed the password more than one time'}
```
```
 
```
Where
_plugin_ — is a firewall plugin name (modsec for ModSecurity and ossec for OSSEC);
_id_ — is id number of the rule provided by the firewall plugin;
_domains_ — the list of the domains for which the rule is disabled (None means all domains)*.
_name_ — rule description or details of the rule from ModSecurity or OSSEC.

* **Note** . _Domains are specified only for ModSecurity rules. For OSSEC rules it is always applies to all domains._
 
## Unregister



Allows to unregister and disable Imunify360 on the server. **Note** that to remove Imunify360 from the server it needs to be [uninstalled](/uninstall/) .

Usage:

```
imunify360-agent unregister [--optional arguments]
```

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Allows to return data in good-looking view if option --json is used.|

## Vendors



Command for manipulating Imunify360 vendors.

Usage:

```
imunify360-agent [command]
```

**Command** is a positional argument and can be:

| | |
|-|-|
| | install ModSecurity vendors. This command will install Imunify360 vendor and [ Comodo WAF](https://modsecurity.comodo.com/) if there are no conflicts with other installed vendors.|
| | uninstall ModSecurity vendors.|

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Return data in good-looking view if option --json is used.|

## Version


```
 
```
Allows to view the actual Imunify360 version installed on the server.

Usage:

```
imunify360-agent version [-h] [--json]
```

Optional arguments:

| | |
|-|-|
| | Show this help message.|
| | Return data in JSON format.|
| | Allows to return data in good-looking view if option --json is used.|

## Submit false positive or false negative to Imunify360 team for analysis


 
To submit file as false positive (if Imunify360 considers file as a malicious but it actually doesn’t) you can use the following command:

```
imunify360-agent submit false-positive <file>
```

To submit file as false negative (if Imunify360 considers file as a non-malicious but it actually does) you can use the following command:
```
 
```
```
imunify360-agent submit false-negative <file>
```

Optional arguments:

| | |
|-|-|
| | Email to send.|
| | User email.|
| | Show this help message|
| | Return data in JSON format.|
| | Allows to return data in good-looking view if option --json is used.|
 
## Whitelist 



This command allows to view or edit actual IPs and domains in the Whitelist.

Usage:

```
imunify360-agent whitelist [subject] [command] <value> [--option]
```
```
 
```
```
subject
```
```
 
```
| | |
|-|-|
| | |
| | |
```
 
```
`command` is a second positional argument and can be:

| | |
|-|-|
| | Add item (-s) to the White List.|
| | Remove item (-s) from the White List.|
| | Move item (-s) to the White List.|
| | Edit comment on the item in the White List.|
| | List items (-s) in the White List.|

Please note that by default **list** command outputs only first 100 items in the list as if it was run as `whitelist` ` ` `ip` ` ` `list` ` ` `--limit` ` ` `100` .
To check whether specific IP address is in the list, you can run the following command:

```
whitelist ip list --by-ip 12.34.56.78
```

where 12.34.56.78 is that specific IP address.

`value` is an item to manipulate with. It can be IP itself or a country code (find the necessary country codes in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) in ISO ALPHA-2 CODE column), or a domain name.

`option ` can be one or few of the optional arguments from the table above and one more:

| | |
|-|-|
| | Allows to add a comment to the item.|
| | Only for `move` and `edit` commands. Allows to grant full access to the IP or subnet ignoring the rules in Blocked ports.|
| | Only for `move` and `edit` commands. Allows to remove full access of the IP or subnet.|

_Examples:_

The following commands adds IP 1.2.3.4 to the White List with a comment “one bad ip”:

```
imunify360-agent whitelist ip add 1.2.3.4 --comment “one good ip”
```

The following command returns a list of IPs in the White List which are from Bolivia:

```
imunify360-agent whitelist --by-country-code BO
```

The following command adds domain with a name example.com to the White List:

```
imunify360-agent whitelist domain add example.com
```

The following command checks domains in the White List:

```
imunify360-agent whitelist domain list
```


**Proactive**

These commands allow to manage Proactive Defense feature.

Usage:

```
imunify360-agent proactive [command] [--option] <value>
```

Available commands:

| | |
|-|-|
| | allows to remove a file from Proactive Defense Ignore List.|
| | allows to remove a rule for a file from Proactive Defense Ignore List.|
| | allows to list Proactive Defense events.|
| | allows to show details for the event.|
| | allows to list files included to Proactive Defense Ignore List.|
| | allows to add a file to Proactive Defense Ignore List.|

Option can be one or few of the optional arguments listed above and one more.

| | |
|-|-|
| | for ` ignore add, ignore delete path, ignore delete rule` commands. Allows to specify a path to the file.|
| | for ` details, ignore delete rule` commands. Allows to specify rule id.|
| | only for ` ignore add` command. Allows to specify rule id.|
| | only for ` ignore add` command. Allows to specify rule name.|

Examples:

This command adds a file located at /home/user/index.php to Proactive Defense Ignore List for the rule id 12 and name _Suspicious detection rule_ .
It means that Proactive Defense will not analyze this file according to this rule:

```
imunify360-agent proactive ignore add --path /home/user/index.php --rule-id 12 --rule-name 'Suspicious detection rule'
```

This command removes files located at _<path to file 1>_ and _<path to file 2>_ from Proactive Defense Ignore List:

```
imunify360-agent proactive ignore delete path <path to file 1> <path to file 2>
```




