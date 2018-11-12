# Config Options


kcarectl behavior can be configured using _/etc/sysconfig/kcare/kcare.conf_

| | |
|-|-|
|`AUTO_UPDATE=True|False` | True - enable auto-update; False - disable auto-update.|
|`chkconfig kcare off` | Disable auto-update after restart.|
|`PATCH_METHOD=normal|nofreeze|smart` | Normal - (default) use freezer; Nofreeze - don't use freezer to freeze processes. Smart - smart freezer freezes only threads that need to be frozen for patching [kernelcare 2.3+].|
|`PATCH_SERVER` | Server to use to download patches.|
|`REGISTRATION_URL` | Licensing server.|
|`PREFIX=prefix` | Patch source prefix, used to test different builds, by downloading builds from a different location, based on prefix (v2.2+)|
|`UPDATE_POLICY=REMOTE|LOCAL|LOCAL_FIRST [since 1.6] ` | Depending on the policy, on server startup, use: REMOTE - (default) patches from patch server. LOCAL - only locally cached patches, if none cached (caching is done automatically) - do nothing. LOCAL_FIRST - see if locally cached patches exist, and load them. If not, try getting them from remote server.|
|`IGNORE_UNKNOWN_KERNEL=True|False` `[since 2.5-4]` | Don't provide notification if unknown kernel on auto-update.|
|`LOAD_KCARE_SYSCTL [since 2.7-1]` | Controls if /etc/sysconfig/kcare/sysctl.conf will be loaded on patchset load. True by default.|
|`--set-patch-type extra` | To enable extra patches.|
|`--set-patch-type free` | To enable free patches.|
|`STICKY_PATCH=KEY` | Retrieve sticky patch from KEY (see CLN, Key Edit); not supported for IP based servers or ePortal.|
|`STICKY_PATCH=DDMMYY` | Stick patch to a particular date. More info at [Sticky Patches](/sticky_patches/) .|



