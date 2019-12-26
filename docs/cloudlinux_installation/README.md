# Installation

## Hardware compatibility

CloudLinux supports all the hardware supported by RHEL/CentOS 6.x, with few exceptions. Exceptions are usually hardware that require binary drivers, and that doesn't have any open source alternatives.

At this moment we are aware of only one such case:

| |  | |
|-|--|-|
|**Device** | **Binary Driver** | **Source**|
|<span class="notranslate"> B110i Smart Array RAID controller </span> | hpahcisr | [http://h10032.www1.hp.com/ctg/Manual/c01754456](http://h20000.www2.hp.com/bizsupport/TechSupport/Document.jsp?objectID=c01732801)|
|<span class="notranslate"> B120i/B320i Smart Array SATA RAID Controller </span>  | hpvsa | [http://www8.hp.com/h20195/v2/GetPDF.aspx/c04168333.pdf](http://h20000.www2.hp.com/bizsupport/TechSupport/Document.jsp?objectID=c01732801)|
|<span class="notranslate"> SanDisk DAS Cache </span> |  | [http://www.dell.com/en-us/work/learn/server-technology-components-caching](http://www.dell.com/en-us/work/learn/server-technology-components-caching)|

## Converting existing servers

It is easy to convert your existing CentOS 6.x, 7.x, 8.x server to CloudLinux. The process takes a few minutes and replaces just a handful of RPMs.

* Get <span class="notranslate">`<activation_key>`</span> either by getting [trial subscription](/cloudlinux_installation/#getting-trial-license) or by [purchasing subscription](https://cln.cloudlinux.com/clweb/buy.html).
* Download the conversion script: <span class="notranslate">[cldeploy](https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy)</span>.
* If you have an activation key, run the following commands:
  
<div class="notranslate">

```
$ wget https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy
$ sh cldeploy -k <activation_key>
```
</div>

* If you have an IP-based license, run the following commands:
  
<div class="notranslate">

```
$ sh cldeploy -i
```
</div>

* Reboot by running the following command:
  
<div class="notranslate">

```
$ reboot
```
</div>

Once you have rebooted, you are running CloudLinux kernel with LVE enabled.

* For CloudLinux 6 — (RHEL) 2.6 kernel 
* For CloudLinux 6 hybrid — (RHEL) 3.10 kernel
* For CloudLinux 7 — (RHEL) 3.10 kernel
* For CloudLinux 7 hybrid —  (RHEL) 4.18 kernel
* For CloudLinux 8 —  CloudLinux 8 will follow the upstream (RHEL) 4.18 kernel mainline. All CloudLinux-specific features are added as a separate module (lve-kmod).

The script automatically detects and supports the following control panels:
* cPanel with EA4 ([EA3 is not supported](https://blog.cpanel.com/its-been-a-long-road-but-it-will-be-time-to-say-goodbye-soon/))
* Plesk
* DirectAdmin
* InterWorx <sup>*</sup>
  
It will install CloudLinux kernel, [Apache module](/cloudlinux_os_components/#hostinglimits-module-for-apache), [PAM module](/cagefs/#pam-configuration), [command line tools](/command-line_tools/#command-line-tools-cli) as well as LVE Manager.

:::tip *
For InterWorx cldeploy script installs mod_hostinglimits, lve-utils, lve-stats packages. LVE Manager is not installed.
:::

:::warning Warning
Note that CloudLinux 8 is not supported by control panels automatically yet. Support will be added in 2020.
:::

ISPmanager 5 has native support for CloudLinux. To deploy CloudLinux on a server with ISPmanager 5, you would need to purchase CloudLinux license directly from ISPSystems and follow ISPmanager's deployment guide.

See also [advanced options for cldeploy](/command-line_tools/#cldeploy)

:::tip Note
We normally recommend to install `lvemanager`, `lve-utils`, `lve-stats`, and `cagefs` packages after installing a control panel.  
But when you deploy CloudLinux from the ISO image, these packages will be preinstalled. You can reinstall them after installing the control panel.
:::

#### Explanation of changes

CloudLinux uses the fact that it is very close to CentOS and RHEL to convert systems in place, requiring just one reboot. Our conversion script does the following actions:

* Backups the original repository settings into <span class="notranslate">`/etc/cl-convert-saved`</span>.
* Backups RHEL system ID into <span class="notranslate">`/etc/cl-convert-saved`</span> (RHEL systems only).
* Installs CL repository settings & imports CL RPM key.
* Replaces redhat/centos-release, redhat-release-notes, redhat-logos with CL version.
* Removes cpuspeed RPM (as it conflicts with CPU limits).
* Re-installs CL version of rhnlib/rhnplugin.
* Checks for binary kernel modules, finds replacement if needed.
* Detects OVH servers and fixes mkinitrd issues.
* Detects Linode servers and fixes grub issues.
* Checks if LES is installed.
* Checks that <span class="notranslate">`/etc/fstab`</span> has correct <span class="notranslate">`/dev/root`</span>
* Checks for efi.
* Installs CL kernel, lve-utils, liblve, lve-stats RPMs.
* Installs LVE Manager for cPanel, Plesk, DirectAdmin, and ISPManager<sup>*</sup>
* Installs mod_hostinglimits Apache module <sup>*</sup>:
  * RPM install for Plesk, ISPManager & InterWorx;
  * On Plesk, replaces psa-mod_fcgid* with mod_fcgid;
  * custombuild for DirectAdmin.

:::warning *
Please note that CloudLinux 8 is not supported by control panels automatically yet. Support will be added in 2020.
:::

#### CloudLinux 8 kernel-related features and improvements

#### Memory

* Memory management supports 5-level page tables, increasing the physical memory upper limit to 64 TB.
* Non-Uniform Memory Access (NUMA) node count has been increased from 4 NUMA nodes to 8 NUMA nodes, for even bigger servers.

#### Security

* Code implementing the ext4 file system has been cleaned up, making it better at preventing malicious file system images.
* The TCP listener handling is now completely lockless, making TCP servers faster and more scalable, and improving protection against DDoS attacks.

#### Performance

* Spectre V2 mitigation default changed from IBRS to Retpolines for better performance.
* Intel Omni-Path Architecture (OPA) provides Host Fabric Interface (HFI) hardware with initialization and setup for high-performance data transfers. This gives you high bandwidth, high message rates, and low latency between compute and I/O nodes in clustered environments.
* IOMMU passthrough is now enabled by default. This is beneficial for customers who want to pass-through hardware devices to virtual machines.
* A new writecache module has been implemented for the Device Mapper, allowing SSD drives or other persistent memory to be used as a cache for block write operations. (Note, Caching of read operations is not implemented, since such operations are cached in the RAM pages cache.)
* A flexible process flow control mode (cgroup.type threaded) was added to the cgroup mode to allow process threads to be managed as a single entity. With this mode, threads in the same process don’t have to belong to the same group. They can be separated into different groups, but they must be threaded and placed in the same cgroup hierarchy.
* Improvements were made to on-the-fly resizing of file systems that use bigalloc.
* On ext4 file systems, inode generation scalability on SMP systems is improved.


Script for converting back:

* Restores CentOS repositories, and centos-release/release-notes/logos.
* Removes lve, mod_hostinglimits, lve-stats, lvemanager.
* mod_hostinglimits RPM is removed.

The kernel is not removed - to prevent condition when server has no kernels and wouldn't boot. The command line to remove the kernel is provided.

On cPanel servers, rebuild of Apache with EasyApache will complete the conversion back, but doesn't have to be performed immediately.<sup> *</sup>

On DirectAdmin servers, rebuild of Apache with custombuild will complete the conversion back, but doesn't have to be performed immediately.

:::warning *
Please note that CloudLinux 8 is not supported by control panels automatically yet. Support will be added in 2020.
:::



#### Common issues and troubleshooting during conversion

| | |
|-|-|
|**Issue**|**Solution**|
|Double registration issue with the error: <span class="notranslate">`Maximum usage count of 1 reached`</span>|If you want to use the license on another server or reuse it on the same server after reinstalling, you need to remove the server from CLN and then register the license on your new server. You may use the following page for a reference to remove the server from CLN: [https://docs.cln.cloudlinux.com/index.html?servers.htm](https://docs.cln.cloudlinux.com/index.html?servers.htm) Please don't remove the license, remove only the server.|


## Activation
### Getting trial license

You will need a trial activation key to be able to convert your CentOS server to CloudLinux.  The trial subscription will work for 30 days.

If you have any issues getting activation key or if you have any questions regarding using your trial subscription – contact [sales@cloudlinux.com](mailto:sales@cloudlinux.com) and we will help.

To get the activation key:

1. Register with CloudLinux Network: [https://cln.cloudlinux.com/console/register/customer](https://cln.cloudlinux.com/console/register/customer) (skip it if you already registered)
2. You will receive an email with activation link
3. Login at [https://cln.cloudlinux.com/console/auth/login](https://cln.cloudlinux.com/console/auth/login)
4. Click on `Get Trial Activation Key`

You will get a key that looks like: `12314-d34463a182fede4f4d7e140f1841bcf2`

Use it to register your system or to [convert CentOS server to CloudLinux]() server.

### License activation

To register your server with CloudLinux Network using activation key run:

<div class="notranslate">

```
$ yum install rhn-setup --enablerepo=cloudlinux-base
$ /usr/sbin/rhnreg_ks --force --activationkey=<activation key>
```
</div>

Where activation key is like `1231-2b48feedf5b5a0e0609ae028d9275c93`

If you have IP based license, use <span class="notranslate">`clnreg_ks`</span> command:

<div class="notranslate">

```
$ yum install rhn-setup --enablerepo=cloudlinux-base
$ /usr/sbin/clnreg_ks --force
```
</div>


## Installing new servers

You can download the latest CloudLinux ISO and use it to install CloudLinux on your server:

* **Latest stable CloudLinux 7.7 ISO**:

    * x86_64 version: [https://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/CloudLinux-DVD-x86_64-7.7.iso](https://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/CloudLinux-DVD-x86_64-7.7.iso)
    * Last updated: August 16, 2019


* **Latest stable CloudLinux 6.10 ISO**:

  * x86_64 version: [http://repo.cloudlinux.com/cloudlinux/6/iso/x86_64/CloudLinux-6.10-x86_64-DVD.iso](http://repo.cloudlinux.com/cloudlinux/6/iso/x86_64/CloudLinux-6.10-x86_64-DVD.iso)
  * i386 version: [http://repo.cloudlinux.com/cloudlinux/6/iso/i386/CloudLinux-6.10-i386-DVD.iso](http://repo.cloudlinux.com/cloudlinux/6/iso/i386/CloudLinux-6.10-i386-DVD.iso)
  * Last updated: July 05, 2018


* **Latest stable CloudLinux 5.11 ISO (OBSOLETE)**:  

  * x86_64 version: [http://repo.cloudlinux.com/cloudlinux/5.11/iso/x86_64/CloudLinux-5.11-x86_64-DVD.iso](http://repo.cloudlinux.com/cloudlinux/5.11/iso/x86_64/CloudLinux-5.11-x86_64-DVD.iso)
  * i386 version: [http://repo.cloudlinux.com/cloudlinux/5.11/iso/i386/CloudLinux-5.11-i386-DVD.iso](http://repo.cloudlinux.com/cloudlinux/5.11/iso/i386/CloudLinux-5.11-i386-DVD.iso)
  * Last updated: Oct 10, 2014


:::tip Note
Once you install server from the ISO, make sure you [register your system](/cloudlinux_installation/#license-activation) and then run `yum update`.
:::

:::warning Note
We recommend to reinstall `lvemanager`, `lve-utils`, `lve-stats`, and `cagefs` packages after installing a control panel.
:::



## CloudLinux OS images


* [OpenStack QEMU/KVM](https://download.cloudlinux.com/cloudlinux/images/#kvm-tab)
* [VMware](https://download.cloudlinux.com/cloudlinux/images/#vmware-tab)
* [Google Cloud Engine](https://download.cloudlinux.com/cloudlinux/images/#gce-tab)
* [Amazon Web Services](https://download.cloudlinux.com/cloudlinux/images/#aws-tab)
* [Alibaba Cloud](https://download.cloudlinux.com/cloudlinux/images/#ali-tab)
* [Xen](/cloudlinux_installation/#xen-images)

#### Xen images


To start using Xen image:

* Decompress xen image to: <span class="notranslate">`/var/lib/xen/images/`</span> (depends on your setup)
* Create a config file in <span class="notranslate">`/etc/xen`</span>

Like:

<div class="notranslate">

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
</div>

where:

* <span class="notranslate">`name = "cl6-sample"`</span> - a unique name of the server
* <span class="notranslate">`disk = [ "tap:aio:/var/lib/xen/images/cl6-sample.img,sda,w" ]`</span> - path to image file
* <span class="notranslate">`uuid = "4230bccf-5882-2ac6-7e1c-0e2a60208001"`</span> - a unique id for that server
* <span class="notranslate">`vif = [ "mac=00:16:3e:23:09:10,bridge=xenbr0,script=vif-bridge" ]`</span> - unique MAC
* <span class="notranslate">`[maxmem = 1024 memory = 1024 vcpus = 1]`</span> – resources


Root password: <span class="notranslate">`cloudlinux`</span>

**Disk Images**

* CloudLinux 6 Minimal: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-base.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-base.img.tgz)
* CloudLinux 7 Minimal: [http://download.cloudlinux.com/images/cl6-7/cl7-hvm-base.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl7-hvm-base.img.tgz)
* CloudLinux 6 + cPanel: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-cPanel.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-cPanel.img.tgz)
* CloudLinux 6 + Parallels Plesk: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-Plesk.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-Plesk.img.tgz)
* CloudLinux 6 + DirectAdmin: [http://download.cloudlinux.com/images/cl6-7/cl6-hvm-da.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl6-hvm-da.img.tgz)
* CloudLinux 7 + DirectAdmin: [http://download.cloudlinux.com/images/cl6-7/cl7-hvm-da.img.tgz](http://download.cloudlinux.com/images/cl6-7/cl7-hvm-da.img.tgz)


## Net install

To install CloudLinux over network:

1. Download & boot from netboot image from: [https://repo.cloudlinux.com/cloudlinux/6.10/iso/x86_64/CloudLinux-6.10-x86_64-netinstall.iso](https://repo.cloudlinux.com/cloudlinux/6.10/iso/x86_64/CloudLinux-6.10-x86_64-netinstall.iso). It will boot into CloudLinux installer.

    Alternatively you can configure your PXE server using following folder as reference: [https://repo.cloudlinux.com/cloudlinux/6.10/install/x86_64/images/pxeboot/](https://repo.cloudlinux.com/cloudlinux/6.10/install/x86_64/images/pxeboot/)

2. During the CloudLinux installation, select URL as installation source and enter URL: [http://repo.cloudlinux.com/cloudlinux/6.10/install/x86_64/](http://repo.cloudlinux.com/cloudlinux/6.10/install/x86_64/) and continue with installation.

To install CloudLinux 5.11 instead of 6.10 use the following URL: [http://repo.cloudlinux.com/cloudlinux/5.11/netinstall/x86_64/](http://repo.cloudlinux.com/cloudlinux/5.11/netinstall/x86_64/)

Same URLs can be used to install para-virtualized Xen using either command-line or virt manager.

## Provider-specific guidelines

* [H-Sphere](/cloudlinux_installation/#h-sphere)
* [DigitalOcean](/cloudlinux_installation/#digitalocean)
* [Linode](/cloudlinux_installation/#linode)
* [Virtuozzo and OpenVZ](/cloudlinux_installation/#virtuozzo-and-openvz)

### H-Sphere

:::tip Note
For H-Sphere 3.5+

Please note, that CageFS and PHP Selector are not supported for H-Sphere
:::


#### Requirements

1. CloudLinux with liblve 0.8 or later.
2. Apache 2.2.x or 1.3.
3. mod_suexec should be enabled.

To achieve optimal performance, we recommend to [convert from mod_fastcgi to mod_fcgid](/cloudlinux_installation/#converting-from-mod-fastcgi-to-mod-fcgid).

There is no need to install mod_hostinglimits – it comes built in with H-Sphere. Once you load kernel from CloudLinux with liblve 0.8 or later – it will get enabled.

You can check if LVE is enabled by running:
<span class="notranslate"> </span>
```
$ ps aux | grep httpd | grep DLIBLVE
```

If you see no output, it means that Apache didn't pick up LVE. Try checking file <span class="notranslate">` /hsphere/shared/scripts/apache-get-env.sh`</span>

The following lines should be there:
<div class="notranslate">

```
if [ -e /usr/lib64/liblve.so.0 -o -e /usr/lib/liblve.so.0 ]; then
APENV_DSSL="$APENV_DSSL -DLIBLVE"
fi
```

</div>

If those strings are absent, you should add it, after:

<div class="notranslate">

```
else
APENV_DSSL='-DSSL'
fi
###
```

</div>

and before:

<div class="notranslate">

```
# this is used by apacheGetEnv.pm perl module
if [ "$1" = 'show' ] ; then
set | egrep "^APENV_"
fi
```

</div>

strings.

Restart Apache afterward.

:::tip Note
Don't forget to [convert from mod_fastcgi to mod_fcgid](/cloudlinux_installation/#converting-from-mod-fastcgi-to-mod-fcgid).
:::

#### Converting from mod_fastcgi to mod_fcgid

To achieve the best results in productivity and stability we recommend converting from <span class="notranslate">`mod_fastcgi`</span> to <span class="notranslate">`mod_fcgid`</span>.

:::tip Note
H-Sphere 3.6.3+
:::

1. Download our fcgi.conf file:
   
<div class="notranslate">

```
$ wget -O /hsphere/local/config/httpd2/fcgi.conf http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf
```
</div>

2. Edit <span class="notranslate">`~httpd2/conf/extra/httpd-hostinglimits.conf`</span> to the following state:
   
<div class="notranslate">

```
######
LoadModule hostinglimits_module /hsphere/shared/apache2/modules/mod_hostinglimits.so

<IfModule mod_hostinglimits.c>
SkipErrors Off
AllowedHandlers cgi-script %php% fcgid-script application/x-miva-compiled
DenyHandlers hs-php5-script hs-php53-script hs-php54-script
Include /hsphere/local/config/httpd2/fcgi.conf
 
</IfModule>
#######
```
</div>

3. Go to <span class="notranslate">`P.Servers > web server [Config]`</span> and be sure to have enabled:
   * <span class="notranslate">`apache_version=2`</span>
   * <span class="notranslate">`apache_mpm=prefork`</span>
   * <span class="notranslate">`apache_fastcgi`</span>
   * <span class="notranslate">`apache_fcgid`</span>
   * <span class="notranslate">`PHP version/mode: php_fastcgi`*</span>

:::tip Note
*No changes needed to `httpd.conf.tmpl.custom` or `usermodule.phpmode` as this version provides its own mod_fcgid.
:::

#### Older versions of H-Sphere

1. Compile mod_fcgid module:
   
<div class="notranslate">

```
$ yum install gcc liblve-devel zlib-devel openssl-devel 
$ wget http://apache.osuosl.org//httpd/mod_fcgid/mod_fcgid-2.3.9.tar.gz
$ tar zxvf mod_fcgid-2.3.9.tar.gz
$ cd mod_fcgid-2.3.9/
$ APXS=/hsphere/shared/apache2/bin/apxs ./configure.apxs 
$ make
$ mv modules/fcgid/.libs/mod_fcgid.so /hsphere/shared/apache2/modules
```
</div>

2. Download and apply patch [http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/usemodule.phpmode.patch](http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/usemodule.phpmode.patch) to `/hsphere/local/config/scripts/usemodule.phpmode`:
   
 <div class="notranslate">

```
$ wget http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/usemodule.phpmode.patch 
$ patch /hsphere/local/config/scripts/usemodule.phpmode usemodule.phpmode.patch
```

</div>

3. If `/hsphere/local/config/httpd2/httpd.conf.tmpl.custom` does not exists – create it:
   
<div class="notranslate">

```
$ cp -rp /hsphere/local/config/httpd2/httpd.conf.tmpl /hsphere/local/config/httpd2/httpd.conf.tmpl.custom
```
</div>

Download and apply patch [http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch](http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch) to the <span class="notranslate">`/hsphere/local/config/httpd2/httpd.conf.tmpl.custom`</span>:

<div class="notranslate">

```
$ wget http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch 
$ patch --fuzz=3 /hsphere/local/config/httpd2/httpd.conf.tmpl.cusom  httpd.conf.tmpl.patch
```

</div>

4. Download pre-defined config file [http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf](http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf) to `/hsphere/local/config/httpd2`:

<div class="notranslate">

```
$ wget -O /hsphere/local/config/httpd2/fcgi.conf http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf
```

</div>

5. Download our wrapper file [http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper](http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper) into <span class="notranslate">`/hsphere/shared/php5/bin/`</span> and make it executable:

<div class="notranslate">

```
$ wget -O /hsphere/shared/php5/bin/php-wrapper http://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper
$ chmod 755 /hsphere/shared/php5/bin/php-wrapper
```

</div>

6. Change permissions for <span class="notranslate">`/hsphere/local/home`</span> to 755:
   
<div class="notranslate">

```
$ chmod 755 /hsphere/local/home
```

</div>

7. Edit <span class="notranslate">`~httpd2/conf/extra/httpd-hostinglimits.conf`</span> and add DenyHandlers, so section will look like:
   
<div class="notranslate">

```
<IfModule mod_hostinglimits.c>
SkipErrors Off
AllowedHandlers cgi-script %php% fcgid-script application/x-miva-compiled
DenyHandlers hs-php5-script hs-php53-script hs-php54-script 
</IfModule>
```

</div>

8. Configure physical server from H-Sphere admin > E.Manager > P.Servers > server_name [parameters] icon, settings should be:
 
<div class="notranslate">

```
apache_version = 2
apacha_fastcgi = yes
apache_status = yes
```
</div>


![](/images/sshot-2013-07-30-21-25-48.png)

9. Set PHP configuration to:
    
<div class="notranslate">

```
php_libphp5 enabled but not default
php_fastcgi5 enabled and is default
```
</div>

![](/images/sshot-2013-07-30-21-31-05.png)

Other options could be configured according to personal needs.

When done - click <span class="notranslate">_SUBMIT_</span> to apply changes.

:::tip Note
After updating H-Sphere software on web server with CloudLinux you need to re-apply step 2 (patch usemodule.phpmode) and restart apache with `/hsphere/shared/scripts/apache-restart` script.
:::

### DigitalOcean

How to make CloudLinux work on DigitalOcean:

DigitalOcean doesn't support custom kernels. The droplet (VM) always runs DigitalOcean's kernel. CloudLinux requires its own kernel. To enable CloudLinux work on DigitalOcean droplets, we provide ability to boot into CloudLinux kernel using `kexec` functionality.

How does this work:

* <span class="notranslate"> cldeploy </span> script checks for presence of <span class="notranslate">`/etc/digitalocean`</span>. If the file detected, we assume that this is DigitalOcean droplet;
* <span class="notranslate">`kexec-tools`</span> are installed;
* <span class="notranslate">`kexec`</span> script will be created in <span class="notranslate">`/etc/rc.d/init.d/`</span> and set to run right after <span class="notranslate">`rc.sysinit`</span>.

When executed, script <span class="notranslate">`/etc/rc.d/init.d/kexec`</span> detects the latest installed CloudLinux kernel, and loads that kernel.

If the system cannot boot into CloudLinux kernel (due to any reason), subsequent reboot will skip <span class="notranslate">`kexec`</span>, allow droplet to boot into DigitalOceans' kernel.

To disable booting into Cloudlinux kernel, run:

<div class="notranslate">

```
chkconfig --del kexec
```
</div>

To re-enable booting into CloudLinux kernel, run:
<div class="notranslate">

```
chkconfig --add kexec
```
</div>

#### Adding CloudLinux OS image to DigitalOcean

Custom images are Linux distributions that have been modified to fit the specific needs of DigitalOcean users. You can find some basics of importing a custom CloudLinux OS image below.

Importing custom images to DigitalOcean is free, as you are only charged for the storage of your image. To save money, you can easily import your image, start a Droplet from your image, and delete the image, so you don’t incur any storage costs.

Below, we will describe how to add a qcow2 (QEMU/KVM) CloudLinux OS image as a custom image. You can find more information on image options at [https://www.digitalocean.com/docs/images/custom-images/overview/](https://www.digitalocean.com/docs/images/custom-images/overview/)

1. To choose the right image, navigate to [https://download.cloudlinux.com/cloudlinux/images/#kvm-tab](https://download.cloudlinux.com/cloudlinux/images/#kvm-tab). Several different images are available for download (with and without a control panel).

![](/images/cloudlinuximages.png)

2. Copy the link for the image you are going to use and log into [cloud.digitalocean.com](https://blog.digitalocean.com/custom-images/cloud.digitalocean.com).

Click <span class="notranslate">_Images_</span> on the left of the screen and then choose <span class="notranslate">_Custom Images_</span>. Click the <span class="notranslate">_Import via URL_</span> button and paste the CloudLinux OS image link.

![](/images/customimages.png)

There are several options here, but the most important is <span class="notranslate">_Choose a datacenter region_</span>, i.e. which datacenter region your Droplets should be created in for this image.

![](/images/uploadimage.png)

Click the <span class="notranslate">_Upload Image_</span> button and wait until the image is successfully uploaded.

3. Add your public key to access your droplets using key-based authentication: navigate to the <span class="notranslate">_Security_</span> sidebar menu and click the <span class="notranslate">_Add SSH Key_</span> button.

You can find more information about creating/adding SSH keys in [this article](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/).

![](/images/addsshkey.png)

4. You will then be able to start a CloudLinux OS Droplet using the image.
   
   :::tip Note
   Your Droplet will be created in the same datacenter that your custom image resides in.
   :::

![](/images/startdroplet.png)

5. Now, use your preferred SSH client software to connect to your Droplet. You can find more information on SSH client setup [here](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/).

![](/images/sshclient.png)


### Linode

#### CloudLinux on Linode KVM

To install CloudLinux 7 on Linode KVM server you should perform the following steps:

1. Deploy CL to your Linode following the steps from [this section](/cloudlinux_installation/#converting-existing-servers)

2. Install grub on your system:
   
<div class="notranslate">

```
yum install grub2
```
</div>

3. Add to <span class="notranslate">`/etc/default/grub`</span> the following parameters:
   
<div class="notranslate">

```
GRUB_TIMEOUT=10
GRUB_CMDLINE_LINUX="console=ttyS0,19200n8"
GRUB_DISABLE_LINUX_UUID=true
GRUB_SERIAL_COMMAND="serial --speed=19200 --unit=0 --word=8 --parity=no --stop=1"
```
</div>

4. Update grub config:
   
<div class="notranslate">

```
grub2-mkconfig -o /boot/grub/grub.cfg
```
</div>

5. Edit your Linode profile, change the boot settings to <span class="notranslate">`GRUB 2`</span> .

6. Reboot your Linode.

After reboot you will have fully operational CloudLinux 7 system and can proceed with other configuration you need.

#### CloudLinux on Linode Xen

To install CloudLinux 7 on Linode Xen please perform the following steps:

1. Deploy CL to your Linode following the steps from [this section](/cloudlinux_installation/#converting-existing-servers).

2. Create the file <span class="notranslate">`/boot/grub/menu.lst`</span> with the following content:
   
<div class="notranslate">

```
timeout 5
title CloudLinux 7.1, $KVERSION
root (hd0)
kernel /boot/vmlinuz-$KVERSION root=/dev/xvda1 ro quiet
initrd /boot/initramfs-$KVERSION.img
```
</div>

where <span class="notranslate">`$KVERSION`</span> is the version of the installed CloudLinux 7 kernel.

:::tip Note
You will need to update <span class="notranslate">`/boot/grub/menu.lst`</span> manually after every kernel update.
:::

3. Switch boot settings to <span class="notranslate">`pv-grub-x86_64`</span> and switch off <span class="notranslate">`Auto-configure networking`</span> in Linode settings.

4. Reboot your Linode.

In case if you will migrate to KVM later you will need only switch the boot settings to <span class="notranslate">`GRUB 2`</span>.


### Virtuozzo and OpenVZ


:::warning Note
We’ll be ending support for Virtuozzo and OpenVZ containers on November 1st, 2019.
If you are running Virtuozzo and OpenVZ, you will still be able to use CloudLinux OS but you will need to run hypervisors. See detail on how to run hypervisors [here](/cloudlinux_installation/#cloudlinux-os-images).
:::

:::tip Note
* Virtuozzo 6 and OpenVZ 6 are supported.
* Virtuozzo 7 and OpenVZ 7 are not supported.
:::

:::tip Note
Kernel 2.6.32-042stab088.4 or later required
:::

CloudLinux provides limited support for OpenVZ and Virtuozzo. At this stage only the following functionality works:

* CageFS
* PHP Selector
* max entry processes
* mod_lsapi
* MySQL Governor

No other limits work so far.

#### Installation

VZ Node (needs to be done once for the server):

:::tip Note
Make sure all containers are stopped prior to doing this operation. Or reboot the server after the install.
:::

:::tip Note
Please make sure you have <span class="notranslate">`vzkernel-headers`</span> and <span class="notranslate">`vzkernel-devel`</span> packages installed. If no - install them with `yum`
:::

<div class="notranslate">

```
yum install vzkernel-headers vzkernel-devel

$ wget -P /etc/yum.repos.d/ http://repo.cloudlinux.com/vzlve/vzlve.repo
$ yum install lve-kernel-module
```

</div>

This will setup LVE module for VZ kernel, as well as DKMS to update that module each time VZ kernel is updated.

After this is done, you can add LVE support for any container on a node, at any time.

To make CloudLinux work inside VZ container, VZ node has to be enabled. This should be done for any container where LVE support needs to be added:

<div class="notranslate">

```
$ vzctl set CT_ID --devnodes lve:rw --save
```

</div>

To disable LVE support for Container:

<div class="notranslate">

```
$ vzctl set CT_ID --devnodes lve:none --save
```

</div>

Inside container, follow [standard CloudLinux installation procedures](/cloudlinux_installation/#converting-existing-servers).

CloudLinux license is required for each VZ container.

:::tip Note
Some servers require increasing `fs.ve-mount-nr` on host node, otherwise CageFS will throw errors.
:::

To increase `fs.ve-mount-nr`, on a host node:

1. add <span class="notranslate">`fs.ve-mount-nr = 15000`</span> to <span class="notranslte">`/etc/sysctl.conf`</span>;

2. apply it with <span class="notranslate">`sysctl -p`</span> command.

In very rare cases the value should be increased higher, up to 50000.

## LILO boot loader

CloudLinux can be deployed on servers that don't have grub installed, by installing <span class="notranslate">`хороgrub`</span> first.

To do that:

1. Make sure grub and kernel packages are not excluded. Edit file <span class="notranslate">`/etc/yum.conf`</span> and check <span class="notranslate">`exclude=`</span> line for presence of <span class="notranslate">`kernel* grub*`</span>.

2. Backup lilo config file:
   
<div class="notranslate">

```
mv /etc/lilo.conf /etc/lilo.conf.bak
```
</div>

3. Convert to CloudLinux using <span class="notranslate"> [deploy2cl](/cloudlinux_installation/#converting-existing-servers)</span> utility.

4. Check <span class="notranslate">`grub.conf`</span> – it should be configured automatically:
 
 <div class="notranslate">

 ```
 # cat /boot/grub/grub.conf
default=0
timeout=5
 title CloudLinux Server (2.6.18-294.8.1.el5.lve0.7.33)
      kernel /boot/vmlinuz-2.6.18-294.8.1.el5.lve0.7.33 root=/dev/sda1  ro
      root (hd0,0)
      initrd /boot/initrd-2.6.18-294.8.1.el5.lve0.7.33.img
      title linux centos5_64
      kernel /boot/bzImage-2.6.33.5-xxxx-grs-ipv4-64 root=/dev/sda1  ro
      root (hd0,0)
```
</div>

5. Install grub to master boot record:
   
 <div class="notranslate">

 ```
 /sbin/grub-install /dev/sda
 ```
 </div>

6. Reboot and check that you are running CloudLinux. <span class="notranslate">`uname -r`</span> should show something like: <span class="notranslate">`2.6.18-294.8.1.el5.lve0.7.33`</span>.

## Uninstalling

You can always uninstall CloudLinux. In this case, we will 'convert' the system back to CentOS. Even if the original system was RHEL - we will still convert to CentOS state.

The following actions will be taken:

1. LVE related packages will be removed.
2. CloudLinux repositories & <span class="notranslate">yum</span> plugin will be removed.
3. CentOS repositories will be setup.

At the end, the script will provide instructions on how to finish the conversion back to CentOS. That will require removal of CloudLinux kernel (manual step), and installation of CentOS kernel (if needed).

To uninstall CloudLinux, do:

<div class="notranslate">

```
$ wget -O cldeploy https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy
$ sh cldeploy -c
```
</div>

Now you have converted back to CentOS and it is the time to install kernel.

To delete CloudLinux kernel, run:

<div class="notranslate">

```
rpm -e --nodeps kernel-2.6.32-673.26.1.lve1.4.27.el6.x86_64
```
</div>

To install new CentOS kernel once you deleted CloudLinux kernel, type <span class="notranslate">`yum install kernel`</span>.

If <span class="notranslate">`yum`</span> says that the latest kernel is already installed, it is OK.

Please check your bootloader configuration before rebooting the system.

To remove unused kmods and lve libs run:

<div class="notranslate">

```
yum remove lve kmod*lve*
```
</div>

Kernel package and related LVE packages should be deleted and the required kernel will be installed.

Before the reboot, the following command should be executed for restoring Apache and httpd.conf without <span clas="notranslate">mod_hostinglimits</span>:

**For EasyApache 3:**

<div class="notranslate">

```
/scripts/easyapache --build
```
</div>

**For EasyApache 4:**

<div class="notranslate">

```
/usr/local/bin/ea_install_profile --install /etc/cpanel/ea4/profiles/cpanel/default.json
```
</div>

:::tip Note
Some of the packages from CloudLinux repo will still be present. They are the same as CentOS packages, and don't have to be removed. They will be updated in the future from CentOS repositories, as new versions come out.
:::

## Migration to EasyApache 4

### Advices and limitations

* Use cPanel 11.55.999.66(55.999.66) or higher version.
* <span class="notranslate">Hardened EA4</span> limitations:
  * **ea-php51** and **ea-php52** have no PHP-FPM support. Please use **mod_lsapi** instead.

Follow the instructions [here](/apache_mod_lsapi/#installation) to install and configure mod_lsapi.

### CentOS with EeasyApache 4

If EasyApache 4 was installed earlier on your CentOS server and you would like to migrate to CloudLinux:

1. Convert server from CentOS  6.x or 7.x to CloudLinux (see [these instructions](/cloudlinux_installation/#converting-existing-servers)).

2. Restart Apache service.

### CentOS without EasyApache 4

If EasyApache 4 was not installed earlier on your CentOS server and you would like to migrate to CloudLinux:

1. Convert server from CentOS  6.x or 7.x to CloudLinux (see [these instructions](/cloudlinux_installation/#converting-existing-servers)).

2. Run:
   
<div class="notranslate">

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4; sh cloudlinux_ea3_to_ea4 --convert
```
</div>

(Find examples of <span class="notranslate">`cloudlinux_ea3_to_ea4`</span> script usage below).

### CloudLinux without EasyApache 4

Install EasyApache4 on clean CloudLinux from ISO image or migrate to EasyApache4 on existings CloudLinux servers:

1. Install cPanel.
2. Run:

<div class="notranslate">

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4; sh cloudlinux_ea3_to_ea4 --convert
```
</div>

(Find examples of `cloudlinux_ea3_to_ea4` script usage below).


### More about cloudlinux_ea3_to_ea4 script

About `cloudlinux_ea3_to_ea4` migration script parameters:

<div class="notranslate">

```
cloudlinux_ea3_to_ea4 [ADDITIONS] ACTIONS
```
</div>


Usage:

| | |
|-|-|
|<span class="notranslate">-h, --help</span>  | Print this message|

`Actions` (required parameter, shows what should script do):

| | |
|-|-|
|<span class="notranslate"> -c, --convert </span>  | Convert EA3 to EA4|
|<span class="notranslate"> -r, --revert </span> | Revert to EA3|

`Additions` (optional parameter, adds to action installation of extra components):

| | |
|-|-|
|<span class="notranslate"> -m, --mod_lsapi </span> | Install mod_lsapi|
|<span class="notranslate"> -p, --mod_passenger </span> | Install alt-mod-passenger|
|<span class="notranslate"> -a, --altphp </span> | Install/Update alt-php|


**Examples:**

* If you want to install EA4 with mod_lsapi and update/install alt-php:
  
<div class="notranslate">

```
sh cloudlinux_ea3_to_ea4 --convert --mod_lsapi --altphp 
```
</div>

* If you want to install EA4 with mod_lsapi, alt_mod_passenger and update/install alt-php:
  
<div class="notranslate">

```
sh cloudlinux_ea3_to_ea4 --convert --mod_lsapi --altphp --mod_passenger
```
</div>

* To restore EA3 with mod_lsapi:

<div class="notranslate">

```
sh cloudlinux_ea3_to_ea4 --revert --mod_lsapi
```
</div>

See also: [FAQ](https://cloudlinux.zendesk.com/hc/articles/360025827914-CloudLinux-OS-Installation-FAQ)
