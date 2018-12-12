# Installation

[[toc]]

## Converting Existing Servers


It is easy to switch server from CentOS 6.x or 7.x to CloudLinux. The process takes a few minutes and replaces just a handful of RPMs.

·        Get either by getting or by [purchasing subscription](https://cln.cloudlinux.com/clweb/buy.html) .
·        Download script: .
·        Execute (if you have IP based license, execute ).
·        Reboot.

If you have activation key:

```
$ wget https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy
$ sh cldeploy -k <activation_key>
```
If you have IP-based license:

```
$ sh cldeploy -i
$ reboot
```

Once you have rebooted, you are running CloudLinux kernel with LVE enabled.

The script automatically detects and supports the following control panels: cPanel with EA3, Plesk, DirectAdmin, InterWorx. It will install CloudLinux kernel, [Apache module](/hostinglimits_module_for_apache/) , [PAM module](/pam_configuration/) , [command line tools](/advanced_options_for_cldeploy/) as well as LVE Manager.

ISPmanager 5 has native support for CloudLinux. To deploy CloudLinux on a server with ISPmanager 5, you would need to purchase CloudLinux license directly from ISPSystems and follow ISPmanager's deployment guide.




### Advanced Options for cldeploy




Usage:














The script will install the following to the server:

1.        Register server with CLN.
2.        Install CloudLinux kernel, lve libraries, lve-utils, lve-stats and pam_lve packages.
3.        It will attempt to detect control panel and do the following actions:

a. _For cPanel & DirectAdmin_ :
I.        recompile Apache to install mod_hostinglimits;
II.        install LVE Manager.

b. _For Plesk, ISPManager & InterWorx_ :
I.        Update httpd and install mod_hostinglimits;
II.        install LVE Manager.

To disable installation of LVE Manager and mod_hostinglimits, please use option.

To disable installation of kernel & CLN registration, please use option.

To install only, use option.

Examples:


```
$ cldeploy --key xx-xxxxxx                   # convert RHEL/CentOS to CL by using activation key, install control panel components
$ cldeploy --byip --conversion-only            # convert RHEL/CentOS to CL by ip, don't install control panel components
$ cldeploy --components-only                  # install control panel components on already converted system
$ cldeploy --hostinglimits                         # update httpd and install mod_hostinglimits 
```


### Explanation Of Changes


CloudLinux uses the fact that it is very close to CentOS and RHEL to convert systems in place, requiring just one reboot. Our conversion script does the following actions:

Backup of original repository settings into .
Backup of RHEL system id into (RHEL systems only).
Installs CL repository settings & imports CL RPM key.
Replaces redhat/centos-release, redhat-release-notes, redhat-logos with CL version.
Removes cpuspeed RPM (as it conflicts with CPU limits).
Re-installs CL version of rhnlib/rhnplugin.
Checks for binary kernel modules, finds replacement if needed.
Detects OVH servers and fixes mkinitrd issues.
Detects Linode servers and fixes grub issues.
Checks if LES is installed.
Checks that has correct
Checks for efi.
Installs CL kernel, lve-utils, liblve, lve-stats RPMs.
Installs LVE Manager for cPanel, Plesk, DirectAdmin, ISPManager & InterWorx
Installs mod_hostinglimits apache module:
`o` RPM install for Plesk, ISPManager & InterWorx;
`o` On Plesk, replaces psa-mod_fcgid* with mod_fcgid;
`o` EasyApache rebuild for cPanel;
`o` custombuild for DA.


Script for converting back:

Restores CentOS repositories, and centos-release/release-notes/logos.
Removes lve, mod_hostinglimits, lve-stats, lvemanager.
mod_hostinglimits RPM is removed.

The kernel is not removed - to prevent condition when server has no kernels and wouldn't boot. The command line to remove the kernel is provided.

On cPanel servers, rebuild of Apache with EasyApache will complete the conversion back, but doesn't have to be performed immediately.

On DirectAdmin servers, rebuild of Apache with custombuild will complete the conversion back, but doesn't have to be performed immediately.

## Installing new servers


You can download the latest CloudLinux ISO and use it to install CloudLinux on your server:


x86_64 version: [http://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/CloudLinux-DVD-x86_64-7.5.iso](http://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/CloudLinux-DVD-x86_64-7.5.iso)
_Last Updated: May 14, 2018_


x86_64 version: [http://repo.cloudlinux.com/cloudlinux/6/iso/x86_64/CloudLinux-6.9-x86_64-DVD.iso](http://repo.cloudlinux.com/cloudlinux/6/iso/x86_64/CloudLinux-6.9-x86_64-DVD.iso)
i386 version: [http://repo.cloudlinux.com/cloudlinux/6/iso/i386/CloudLinux-6.9-i386-DVD.iso](http://repo.cloudlinux.com/cloudlinux/6/iso/i386/CloudLinux-6.9-i386-DVD.iso)
Last Updated: April 6, 2017


x86_64 version: [http://repo.cloudlinux.com/cloudlinux/5.11/iso/x86_64/CloudLinux-5.11-x86_64-DVD.iso](http://repo.cloudlinux.com/cloudlinux/5.11/iso/x86_64/CloudLinux-5.11-x86_64-DVD.iso)
i386 version: [http://repo.cloudlinux.com/cloudlinux/5.11/iso/i386/CloudLinux-5.11-i386-DVD.iso](http://repo.cloudlinux.com/cloudlinux/5.11/iso/i386/CloudLinux-5.11-i386-DVD.iso)
Last Updated: Oct 10, 2014





## CloudLinux OS Images


[OpenStack QEMU/KVM](https://download.cloudlinux.com/cloudlinux/images/#kvm-tab)

[VMware](https://download.cloudlinux.com/cloudlinux/images/#vmware-tab)

[Google Cloud Engine](https://download.cloudlinux.com/cloudlinux/images/#gce-tab)

[Amazon Web Services](https://download.cloudlinux.com/cloudlinux/images/#aws-tab)

[Alibaba Cloud](https://download.cloudlinux.com/cloudlinux/images/#ali-tab)

[Xen](/xen_images/)

### Xen Images


To start using Xen image:

Decompress xen image to: (depends on your setup)

Create a config file in

Like:


```
name = "cl6-sample"
uuid = "4230bccf-5882-2ac6-7e1c-0e2a60208001"
maxmem = 1024
memory = 1024
vcpus = 1
bootloader = "/usr/bin/pygrub"
on_poweroff = "destroy"
on_reboot = "restart"
on_crash = "restart"
vfb = [ "type=vnc,vncunused=1,key=en-us" ]
disk = [ "tap:aio:/var/lib/xen/images/cl6-sample.img,sda,w" ]
vif = [ "mac=00:16:3e:23:09:10,bridge=xenbr0,script=vif-bridge" ]
```

where:

- unique name of the server
- path to image file
- uniquie id for that server
- unique MAC
resources

_Root password: _

**Disk Images**

CloudLinux 6 Minimal: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-base.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-base.img.tgz)

CloudLinux 7 Minimal: [http://download.cloudlinux.com/images/cl6-7/cl7-hvm-base.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl7-hvm-base.img.tgz)

CloudLinux 6 + cPanel: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-cPanel.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-cPanel.img.tgz)

CloudLinux 6 + Parallels Plesk: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-Plesk.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-Plesk.img.tgz)

CloudLinux 6 + DirectAdmin: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-da.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-da.img.tgz)

CloudLinux 7 + DirectAdmin: [http://download.cloudlinux.com/images/cl6-7/cl7-hvm-da.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl7-hvm-da.img.tgz)


## Net Install


To install CloudLinux over network:

Download & boot from netboot image from: [http://repo.cloudlinux.com/cloudlinux/6.6/iso/x86_64/CloudLinux-6.6-x86_64-netboot.iso](http://repo.cloudlinux.com/cloudlinux/6.6/iso/x86_64/CloudLinux-6.6-x86_64-netboot.iso) .

It will boot into CloudLinux installer.

Alternatively you can configure your PXE server using following folder as reference: [http://repo.cloudlinux.com/cloudlinux/6.6/install/x86_64/images/pxeboot/ ](http://repo.cloudlinux.com/cloudlinux/6.6/install/x86_64/images/pxeboot/%20)

During the CloudLinux installation select URL as installation source and enter URL: [http://repo.cloudlinux.com/cloudlinux/6.6/install/x86_64/](http://repo.cloudlinux.com/cloudlinux/6.6/install/x86_64/) and continue with installation.

To install CloudLinux 5.10 instead of 6.6 use the following URL: [http://repo.cloudlinux.com/cloudlinux/5.10/netinstall/x86_64/](http://repo.cloudlinux.com/cloudlinux/5.10/netinstall/x86_64/)
 Same URLs can be used to install para-virtualized Xen using either command-line or virt manager.

## 







1. CloudLinux with liblve 0.8 or later.
2. Apache 2.2.x or 1.3.
3. mod_suexec should be enabled.

To achieve optimal performance, we recommend to [convert from mod_fastcgi to mod_fcgid](/mod_fastcgi_to_mod_fcgid/)



There is no need to install mod_hostinglimits -- it comes built in with H-Sphere. Once you load kernel from CloudLinux with liblve 0.8 or later -- it will get enabled.

You can check if LVE is enabled by running:

```
$ ps aux | grep httpd | grep DLIBLVE
```

If you see no output, it means that Apache didn't pick up LVE. Try checking file

The following lines should be there:

```
if [ -e /usr/lib64/liblve.so.0 -o -e /usr/lib/liblve.so.0 ]; then
 APENV_DSSL="$APENV_DSSL -DLIBLVE"
fi
```

If those strings are absent, you should add it, after:

```
else
 APENV_DSSL='-DSSL'
fi
###
```

and before:

```
# this is used by apacheGetEnv.pm perl module
if [ "$1" = 'show' ] ; then
 set | egrep "^APENV_"
fi
```

strings. Restart Apache afterward.


* don't forget to [convert from mod_fastcgi to mod_fcgid](/mod_fastcgi_to_mod_fcgid/)

### Converting from mod_fastcgi to mod_fcgid


To achieve the best results in productivity and stability we recommend converting from to .






**Step 1:** 

Download our fcgi.conf file:

```
$ wget -O /hsphere/local/config/httpd2/fcgi.conf 
```


**Step 2:**

Edit to the following state:

```
######
LoadModule hostinglimits_module /hsphere/shared/apache2/modules/mod_hostinglimits.so
```
```
 
<IfModule mod_hostinglimits.c>
SkipErrors Off
AllowedHandlers cgi-script %php% fcgid-script application/x-miva-compiled
DenyHandlers hs-php5-script hs-php53-script hs-php54-script
Include /hsphere/local/config/httpd2/fcgi.conf
```
```
 
</IfModule>
#######
```


**Step 4:**

Go to and be sure to have enabled:







*** ** **_No changes needed to httpd.conf.tmpl.custom or usermodule.phpmode as this version provides its own mod_fcgid._**




**Step 1: **

Compile mod_fcgid module:

```
$ yum install gcc liblve-devel zlib-devel openssl-devel 
$ wget http://apache.osuosl.org//httpd/mod_fcgid/mod_fcgid-2.3.9.tar.gz
$ tar zxvf mod_fcgid-2.3.9.tar.gz
$ cd mod_fcgid-2.3.9/
$ APXS=/hsphere/shared/apache2/bin/apxs ./configure.apxs 
$ make
$ mv modules/fcgid/.libs/mod_fcgid.so /hsphere/shared/apache2/modules
```

**Step 2: **

Download and apply patch http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/usemodule.phpmode.patch to /hsphere/local/config/scripts/usemodule.phpmode:

```
$ wget 
$ patch /hsphere/local/config/scripts/usemodule.phpmode usemodule.phpmode.patch
 
```

**Step 3:**

If does not exists - create it:

```
$ cp -rp /hsphere/local/config/httpd2/httpd.conf.tmpl /hsphere/local/config/httpd2/httpd.conf.        tmpl.custom
```

Download and apply patch [http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch](http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch) to :

```
$ wget 
$ patch --fuzz=3 /hsphere/local/config/httpd2/httpd.conf.tmpl.cusom  httpd.conf.tmpl.patch
```

**Step 4:**

Download pre-defined config file [http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf](http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf) to

```
$ wget -O /hsphere/local/config/httpd2/fcgi.conf 
```

**Step 5:**

Download our wrapper file [http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper](http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper) into and make it executable:

```
$ wget -O /hsphere/shared/php5/bin/php-wrapper 
$ chmod 755 /hsphere/shared/php5/bin/php-wrapper
```

**Step 6:**

Change permissions for to 755:

```
$ chmod 755 /hsphere/local/home
```

**Step 7:**

Edit and add DenyHandlers, so section will look like:

```
<IfModule mod_hostinglimits.c>
SkipErrors Off
AllowedHandlers cgi-script %php% fcgid-script application/x-miva-compiled
DenyHandlers hs-php5-script hs-php53-script hs-php54-script 
</IfModule>
```

**Step 8:**

Configure physical server from H-Sphere admin > E.Manager > P.Servers > server_name [parameters] icon, settings should be:

```
apache_version = 2
apacha_fastcgi = yes
apache_status = yes
```


![](/images/sshot-2013-07-30-21-25-48.png)

**Step 9:**

Set PHP configuration to:

```
php_libphp5 enabled but not default
php_fastcgi5 enabled and is default
```

![](/images/sshot-2013-07-30-21-31-05.png)

Other options could be configured according to personal needs.
When done - click SUBMIT to apply changes.





## Virtuozzo and OpenVZ






_* _ **_Kernel 2.6.32-042stab088.4 or later required_**

CloudLinux provides limited support for OpenVZ and Virtuozzo. At this stage only the following functionality works:
_CageFS_
_PHP Selector_
_max entry processes_
_mod_lsapi_
_MySQL Governor_

No other limits work so far.



VZ Node (needs to be done once for the server):

**Note. ** _Make sure all containers are stopped prior to doing this operation. Or reboot the server after the install._

_Please make sure you have _


```
yum install vzkernel-headers vzkernel-devel
```


```
$ wget -P /etc/yum.repos.d/ 
$ yum install lve-kernel-module
```

This will setup LVE module for VZ kernel, as well as DKMS to update that module each time VZ kernel is updated.

After this is done, you can add LVE support for any container on a node, at any time.

To make CloudLinux work inside VZ container, VZ node has to be enabled. This should be done for any container where LVE support needs to be added:

```
$ vzctl set CT_ID --devnodes lve:rw --save
```

To disable LVE support for Container:

```
$ vzctl set CT_ID --devnodes lve:none --save
```

Inside container, follow standard CL installation procedures: http://docs.cloudlinux.com/index.html?converting_existing_servers.html

CloudLinux license is required for each VZ container.







## Getting Trial License


You will need a trial activation key to be able to convert your CentOS server to CloudLinux.  The trial subscription will work for 30 days.

If you have any issues getting activation key or if you have any questions regarding using your trial subscription -- contact [sales@cloudlinux.com](mailto:sales@cloudlinux.com) and we will help.

To get the activation key:

1.        Register with CloudLinux Network: [https://cln.cloudlinux.com/console/register/customer](https://cln.cloudlinux.com/console/register/customer) (skip it if you already registered)
2.        You will receive an email with activation link
3.        Login at [https://cln.cloudlinux.com/console/auth/login](https://cln.cloudlinux.com/console/auth/login)
4.        Click on Get Trial Activation Key

You will get a key that looks like: 12314-d34463a182fede4f4d7e140f1841bcf2

Use it to register your system or to [convert CentOS server to CloudLinux](/converting_existing_servers/) server.


## Registering CloudLinux Server


To register your server with CloudLinux Network using activation key run:

```
$ yum install rhn-setup --enablerepo=cloudlinux-base
$ /usr/sbin/rhnreg_ks --activationkey=<activation key> --force
```

Where activation key is like 1231-2b48feedf5b5a0e0609ae028d9275c93

If you have IP based license, use command:

```
$ yum install rhn-setup --enablerepo=cloudlinux-base
$ /usr/sbin/clnreg_ks --force
```


## CloudLinux on DigitalOcean


How to make CloudLinux work on DigitalOcean:

DigitalOcean doesn't support custom kernels. The droplet (VM) always runs DigitalOcean's kernel. CloudLinux requires its own kernel. To enable CloudLinux work on DigitalOcean droplets, we provide ability to boot into CloudLinux kernel using kexec functionality.

How does this work:

script checks for presence of . If the file detected, we assume that this is DigitalOcean droplet;
are installed;
script will be created in and set to run right after .

When executed, script detects latest installed CloudLinux kernel, and loads that kernel.

If the system cannot boot into CloudLinux kernel (due to any reason), subsequent reboot will skip , allow droplet to boot into DigitalOceans' kernel.

To disable booting into Cloudlinux kernel, run:

```
chkconfig --del kexec
```

To re-enable booting into CloudLinux kernel, run:

```
chkconfig --add kexec
```



## CloudLinux on Linode




To install CloudLinux 7 on Linode KVM server you should perform the following steps:

1. Deploy CL to your Linode following the steps from this section: [http://docs.cloudlinux.com/index.html?converting_existing_servers.html](http://docs.cloudlinux.com/index.html?converting_existing_servers.html)

2. Install grub on your system:

```
yum install grub2
```

3. Add to the following parameters:

```
GRUB_TIMEOUT=10
GRUB_CMDLINE_LINUX="console=ttyS0,19200n8"
GRUB_DISABLE_LINUX_UUID=true
GRUB_SERIAL_COMMAND="serial --speed=19200 --unit=0 --word=8 --parity=no --stop=1"
```

4. Update grub config:

```
grub2-mkconfig -o /boot/grub/grub.cfg
```

5. Edit your Linode profile, change the boot settings to .

6. Reboot your Linode.

After reboot you will have fully operational CloudLinux 7 system and can proceed with other configuration you need.



To install CloudLinux 7 on Linode Xen please perform the following steps:

1. Deploy CL to your Linode following the steps from this section: [http://docs.cloudlinux.com/index.html?converting_existing_servers.html](http://docs.cloudlinux.com/index.html?converting_existing_servers.html)

2. Create file with the following content:

```
timeout 5
title CloudLinux 7.1, $KVERSION
root (hd0)
kernel /boot/vmlinuz-$KVERSION root=/dev/xvda ro quiet
initrd /boot/initramfs-$KVERSION.img
```

where is the version of installed CL7 kernel.

Please note that you will need to update manually after every kernel update.

3. Switch boot settings to and switch off in Linode settings.

4. Reboot your Linode.

In case if you will migrate to KVM later you will need only switch the boot settings to .



## Servers with LILO boot loader


CloudLinux can be deployed on servers that don't have grub installed, by installing first.

To do that:

1.        Make sure grub and kernel packages are not excluded. Edit file and check line for presence of kernel* grub*.

2.        Backup lilo config file:

```
mv /etc/lilo.conf /etc/lilo.conf.bak
```

3.        Convert to CloudLinux using utility.

4.        Check -- it should be configured automatically:


5.        Install grub to master boot record:


6.        Reboot and check that you are running CloudLinux. should show something like: .


## Migrating to EasyApache 4




Use cPanel 11.55.999.66(55.999.66) or higher version.

limitations:

**ea-php51** and ** ea-php52** have no PHP-FPM support. Please use **mod_lsapi** instead.

Follow the instructions at [http://docs.cloudlinux.com/index.html?mod_lsapi_installation.html](http://docs.cloudlinux.com/index.html?mod_lsapi_installation.html) to install and configure mod_lsapi.



If EasyApache 4 was installed earlier on your CentOS server and you would like to migrate to CloudLinux:

1. Convert server from CentOS  6.x or 7.x to CloudLinux: ( [http://docs.cloudlinux.com/index.html?converting_existing_servers.html](http://docs.cloudlinux.com/index.html?converting_existing_servers.html) )

2. Restart Apache service.



If EasyApache 4 was not installed earlier on your CentOS server and you would like to migrate to CloudLinux:

1. Convert server from CentOS  6.x or 7.x to CloudLinux ( [http://docs.cloudlinux.com/index.html?converting_existing_servers.html](http://docs.cloudlinux.com/index.html?converting_existing_servers.html) )

2. Run:

```
cd ~; wget 
```

(Find examples of script usage below).



Install EasyApache4 on clean CloudLinux from ISO image or migrate to EasyApache4 on existings CloudLinux servers:

1. Install cPanel.

2. Run:

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4; sh cloudlinux_ea3_to_ea4 --convert
```

(Find examples of cloudlinux_ea3_to_ea4 script usage below).



To migrate back to EA3 for CloudLinux run:

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4; sh cloudlinux_ea3_to_ea4 --revert
```



About cloudlinux_ea3_to_ea4 migration script parameters:

_cloudlinux_ea3_to_ea4 [ADDITIONS] ACTIONS_

Usage:

| | |
|-|-|
| | Print this message|

Actions (required parameter, shows what should script do):

| | |
|-|-|
| | Convert EA3 to EA4|
| | Revert to EA3|

Additions (optional parameter, adds to action installation of extra components):

| | |
|-|-|
| | Install mod_lsapi|
| | Install alt-mod-passenger|
| | Install/Update alt-php|




_Examples:_

If you want to install EA4 with mod_lsapi and update/install alt-php:

```
sh cloudlinux_ea3_to_ea4 --convert --mod_lsapi --altphp 
```

If you want to install EA4 with mod_lsapi, alt_mod_passenger and update/install alt-php:

```
sh cloudlinux_ea3_to_ea4 --convert --mod_lsapi --altphp --mod_passenger
```

To restore EA3 with mod_lsapi:

```
sh cloudlinux_ea3_to_ea4 --revert --mod_lsapi
```

[Frequently asked questions (FAQ)](/faq/)

### FAQ


**When do we need to call**

```
cd ~; wget 
sh cloudlinux_ea3_to_ea4 --convert  
```

**script?**

1. Migration from EasyApache 3 to EasyApache 4.

The main difference between EasyApache 3 and EasyApache 4 for CloudLinux is the repositories used for packages. For this reason, we need to use packages from the _cl-ea4_ repository or _cl-ea4-testing_ beta for EasyApache 4. Running this script we update all native ea-* packages from CloudLinux repository. In this case, non-native packages for Apache include mod_lsapi and alt-mod-passenger (CloudLinux feature). So, if mod_lsapi or alt-mod-passenger (or both) were installed on EasyApache3, the script should be run with additional options as it described on the link [https://docs.cloudlinux.com/cpanel_easyapache_4.html](https://docs.cloudlinux.com/cpanel_easyapache_4.html) .

Also, our script starts cPanel EasyApache 3 migration to EasyApache 4 Process. Read more about Profile changes, Apache changes, PHP changes on the link [https://documentation.cpanel.net/display/EA4/The+EasyApache+3+to+EasyApache+4+Migration+Process](https://documentation.cpanel.net/display/EA4/The+EasyApache+3+to+EasyApache+4+Migration+Process)

2. Migration from EasyApache 4 CentOS to EasyApache 4 CloudLinux.

When cPanel is installed with EasyApache 4 on a clean CloudLinux (or it was CentOS converted to CloudLinux), the installation of the ea-* packages comes from the EA4 cPanel repository. Most packages from the EA4 cPanel repository are not compatible with CloudLinux packages and this can lead to various errors. For this reason, we need to run this script to update the ea-* packages from the CloudLinux repository.

If there was a need to return back EasyApache 4 packages from the EA4 cPanel repository, we need to run:

```
cd ~; wget 
sh cloudlinux_ea3_to_ea4 --restore-cpanel-ea4-repo
```

**When do we need to call**

```
cd ~; wget 
sh cloudlinux_ea3_to_ea4 --revert
```

**script?**

1. Reverting back to EasyApache 3.

Revert back is possible only if EasyApache 3 was previously installed, and then converted to EasyApache 4. If cPanel was originally installed with EasyApache 4, there is no way to convert to EasyApache 3.


## Uninstalling CloudLinux


You can always uninstall CloudLinux. In this case, we will 'convert' the system back to CentOS. Even if the original system was RHEL - we will still convert to CentOS state.

The following actions will be taken:

LVE related packages will be removed.
CloudLinux repositories & plugin will be removed.
CentOS repositories will be setup.

At the end, the script will provide instructions on how to finish the conversion back to CentOS. That will require removal of CloudLinux kernel (manual step), and installation of CentOS kernel (if needed).

To uninstall CloudLinux, do:

```
$ wget -O cldeploy 
$ sh cldeploy -c
```

Now you have converted back to CentOS and it is the time to install kernel.

To delete CloudLinux kernel run:

```
rpm -e --nodeps kernel-2.6.32-673.26.1.lve1.4.27.el6.x86_64
```

To install new CentOS kernel once you deleted CloudLinux kernel, type

If says that the latest kernel is already installed, it is OK.

Please check your bootloader configuration before rebooting the system.

To remove unused kmods and lve libs run:

```
yum remove lve kmod*lve*
```

Kernel package and related LVE packages should be deleted and the required kernel will be installed.

Before the reboot the following command should be executed for restoring Apache and httpd.conf without mod_hostinglimits:

For EasyApache 3:

```
/scripts/easyapache --build
```

For EasyApache 4:

```
/usr/local/bin/ea_install_profile --install /etc/cpanel/ea4/profiles/cpanel/default.json
```

Please note that some of the packages from CloudLinux repo will still be present. They are the same as CentOS packages, and don't have to be removed. They will be updated in the future from CentOS repositories, as new versions come out.


