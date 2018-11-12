# Command Line Tools


/usr/bin/kcarectl - Manage KernelCare patches for your kernel.

/usr/bin/kcare-uname - Print certain system information.

## kcarectl


_/usr/bin/kcarectl_ - Manage KernelCare patches for your kernel.

| | |
|-|-|
|`-i, --info` | Display information about patches installed by KernelCare.|
|`-u, --update ` | Download latest patches, and apply them to current kernel.|
|`--smart-update  [since 1.6] ` | The same as --update, but uses [UPDATE_POLICY](/config_options/) to decide where to get patches.|
|`--unload` | Unload patches.|
|`--auto-update` | Check if update is needed and update.|
|`--patch-info` | Lists applied patches.|
|`--force  [since 2.3] ` | When used with update, forces applying the patch even if unable to freeze some threads.|
|`--uname` | Prints safe kernel version.|
|`--license-info` | Output current license info.|
|`--register KEY` | Register using KernelCare Key.|
|`--register-autoretry [since 2.5]` | If registration fails retries registration indefinitely.|
|`--unregister` | Unregister from KernelCare for Key based servers.|
|`--test` | Try test builds instead of production builds (deprecated, use --prefix=test instead).|
|`--prefix` | Patch source prefix, used to test different builds, by downloading builds from a different location, based on prefix (v2.2+)|
|`--version` | Print KernelCare version.|
|`--import-key PATH` | Import gpg key.|
|`--set-monitoring-key` | Set monitoring key for IP based licenses. 16 to 32 characters, alphanumeric only [version 2.1+]|
|`--freezer  [since 2.3] ` | none: don't freeze any threads; full: freeze all threads; smart: freezes only threads that need to be frozen for patching. If option is not selected, best freezer method is chosen automatically.|
|`--check [since 2.4-1]` | Check if new patchset is available, without updating. Exit code 0 means there is a new kernel. 1 when there is no new kernel.|
|`--doctor [since 2.6]` | Send a report to CloudLinux support staff for diagnostics.|
|`--set-patch-type extra ` | To enable extra patches.|
|`--set-patch-type free` | To enable free patches.|
|`--set-sticky-patch SET_STICKY_PATCH` | Set patch to stick to date in format DDMMYY or retrieve it from KEY if set to KEY (no support for ePortal). Empty to unstick.   More info at [Sticky Patches](/sticky_patches/) .|
|`--tag COMMAND` | Adds an extra _Tag_ field for a server. COMMAND is a user-defined parameter. More info at [Managing Servers](/managing_servers.htm#addingextratagfield/) .|

## kcare-uname


Print certain system information.  With no OPTION, same as -s.

| | |
|-|-|
|-a, --all | print all information in the following order, except omit -p and -i if unknown:|
|-s, --kernel-name | print the kernel name|
|-n, --nodename | print the network node hostname|
|-r, --kernel-release | print the kernel release|
|-v, --kernel-version | print the kernel version|
|-m, --machine | print the machine hardware name|
|-p, --processor | print the processor type or "unknown"|
|-i, --hardware-platform | print the hardware platform or "unknown"|
|-o, --operating-system | print the operating system|
|--help | display this help and exit|
|--version | output version information and exit|

