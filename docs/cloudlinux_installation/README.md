# Installation

* [Hardware compatibility](/cloudlinux_installation/#hardware-compatibility)
* [Converting existing servers](/cloudlinux_installation/#converting-existing-servers)
* [Activation](/cloudlinux_installation/#activation)
* [Installing new servers](/cloudlinux_installation/#installing-new-servers)
* [CloudLinux OS Shared images](/cloudlinux_installation/#cloudlinux-os-shared-images)
* [Net install](/cloudlinux_installation/#net-install)
* [Provider-specific guidelines](/cloudlinux_installation/#provider-specific-guidelines)
* [LILO boot loader](/cloudlinux_installation/#lilo-boot-loader)
* [Uninstalling](/cloudlinux_installation/#uninstalling)
* [Migration to EasyApache 4](/cloudlinux_installation/#migration-to-easyapache-4)

### Hardware compatibility

CloudLinux OS Shared supports all the hardware supported by RHEL/CentOS, with few exceptions. Exceptions are usually hardware that require binary drivers, and that doesn't have any open source alternatives.

:::tip Note
CloudLinux OS Shared does not support ARM-based CPUs (e.g. Graviton)
:::

There are some incompatible devices with **CL 6**:

| |  | |
|-|--|-|
|**Device** | **Binary Driver** | **Source**|
|<span class="notranslate"> B110i Smart Array RAID controller </span> | hpahcisr | [https://h10032.www1.hp.com/ctg/Manual/c01754456](https://h20000.www2.hp.com/bizsupport/TechSupport/Document.jsp?objectID=c01732801)|
|<span class="notranslate"> B120i/B320i Smart Array SATA RAID Controller </span>  | hpvsa | [https://www8.hp.com/h20195/v2/GetPDF.aspx/c04168333.pdf](https://h20000.www2.hp.com/bizsupport/TechSupport/Document.jsp?objectID=c01732801)|
|<span class="notranslate"> SanDisk DAS Cache </span> |  | [https://www.dell.com/en-us/work/learn/server-technology-components-caching](https://www.dell.com/en-us/work/learn/server-technology-components-caching)|


With RHEL 8 (**CloudLinux OS Shared 8/CloudLinux OS Shared 7 Hybrid**), some devices are no longer supported. You can check the entire list here:
[https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/considerations_in_adopting_rhel_8/hardware-enablement_considerations-in-adopting-rhel-8#removed-hardware-support_hardware-enablement](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/considerations_in_adopting_rhel_8/hardware-enablement_considerations-in-adopting-rhel-8#removed-hardware-support_hardware-enablement)


## Converting existing servers

It is easy to convert your existing CentOS or AlmaLinux server to CloudLinux OS Shared. The process takes a few minutes and replaces just a handful of RPMs.

:::tip Supported OS for conversion
* CentOS 7
* CentOS 8
* AlmaLinux OS 8
* **CentOS Stream versions aren’t supported**
:::

* [CLDeploy Explained](/cloudlinux_installation/#cldeploy-explained).

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

Once you reboot, you are running CloudLinux OS Shared kernel with LVE enabled.

* For CloudLinux OS Shared 6 — (RHEL) 2.6 kernel 
* For CloudLinux OS Shared 6 hybrid — (RHEL) 3.10 kernel
* For CloudLinux OS Shared 7 — (RHEL) 3.10 kernel
* For CloudLinux OS Shared 7 hybrid —  (RHEL) 4.18 kernel
* For CloudLinux OS Shared 8 —  CloudLinux OS Shared 8 follows the upstream (RHEL) 4.18 kernel mainline. All CloudLinux-specific features are added as a separate module (lve-kmod).

The script automatically detects and supports the following control panels:
* cPanel with EA4 ([EA3 is not supported](https://blog.cpanel.com/its-been-a-long-road-but-it-will-be-time-to-say-goodbye-soon/))
* Plesk
* DirectAdmin
* InterWorx <sup>*</sup>
  
It will install CloudLinux OS Shared kernel, [Apache module](/cloudlinux_os_components/#hostinglimits-module-for-apache), [PAM module](/cloudlinux_os_components/#pam-configuration), [command line tools](/command-line_tools/#command-line-tools-cli) as well as LVE Manager.

:::tip Note 
\* For InterWorx cldeploy script installs mod_hostinglimits, lve-utils, lve-stats packages. Find more about LVE Manager installation [here](https://www.interworx.com/support/faq/install-use-cloudlinux-plugin-interworx/)
:::

:::warning
CloudLinux OS Shared 8 supports cPanel 11.94 and newer, Plesk Obsidian 18.0.33.0 and newer and DirectAdmin out of the box.
:::

ISPmanager 5 has native support for CloudLinux OS Shared. To deploy CloudLinux OS Shared on a server with ISPmanager 5, you would need to purchase CloudLinux OS Shared license directly from ISPSystems and follow ISPmanager's deployment guide.

**Starting from version 1.61**, at the end of conversion from CentOS 7.x to CloudLinux OS Shared 7, the cldeploy script converts CloudLinux OS Shared 7 to [CloudLinux OS Shared 7 Hybrid](/cloudlinux_os_kernel/#hybrid-kernels).

Automatic hybridization will be performed for the AMD processors with the following CPU families:

* Zen / Zen+ / Zen 2 / Zen 3
* Hygon Dhyana

Automatic hybridization may be skipped by passing extra option '--no-force-hybridize'.

See also [advanced options for cldeploy](/command-line_tools/#cldeploy)

:::tip Note
We normally recommend to install `lvemanager`, `lve-utils`, `lve-stats`, and `cagefs` packages after installing a control panel.  
But when you deploy CloudLinux OS Shared from the ISO image, these packages will be preinstalled. You can reinstall them after installing the control panel.
:::

#### CLDeploy Explained

By its design, CloudLinux OS Shared is very close to the upstream operating system, CentOS. This makes the conversion process relatively straightforward, requiring just one reboot. Here's what the cldeploy script does when you run it:

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

#### CLDeploy Explained - reverting back to CentOS:

Here's what the cldeploy script does, if one runs it to revert the system back to CentOS:

* Restores CentOS repositories, and centos-release/release-notes/logos.
* Removes lve, mod_hostinglimits, lve-stats, lvemanager.
* mod_hostinglimits RPM is removed.

Note that **cldeploy doesn't remove the kernel** to prevent condition when server has no kernels and wouldn't boot. Instead, we provide the instructions on how you could remove it manually later, when it is safe to do so.

On cPanel servers, rebuild of Apache with EasyApache will complete the conversion back, but doesn't have to be performed immediately.<sup> *</sup>

On DirectAdmin servers, rebuild of Apache with custombuild will complete the conversion back, but doesn't have to be performed immediately.

#### Common issues and troubleshooting during conversion

If you receive any troubles during the conversion process, most likely it is because of some licensing CLN (CloudLinux Network)-related issues. Check our troubleshooting guides here to resolve them:
[https://cloudlinux.zendesk.com/hc/en-us/sections/360004626919](https://cloudlinux.zendesk.com/hc/en-us/sections/360004626919)

## Activation

### Getting trial license

You will need a trial activation key to be able to convert your CentOS server to CloudLinux OS Shared. The trial license subscription will work for 30 days.

If you have any issues getting activation key or if you have any questions regarding using your trial subscription – contact [sales@cloudlinux.com](mailto:sales@cloudlinux.com) and we will help.

To get the activation key:

1. Register with CloudLinux Network: [https://cln.cloudlinux.com/console/register/customer](https://cln.cloudlinux.com/console/register/customer) (skip it if you already registered)
2. You will receive an email with activation link
3. Login at [https://cln.cloudlinux.com/console/auth/login](https://cln.cloudlinux.com/console/auth/login)
4. Click on `Get Trial Activation Key`

You will get a key that looks like: `12314-d34463a182fede4f4d7e140f1841bcf2`

Use it to register your system or to convert CentOS server to CloudLinux OS Shared server.

### License activation

To register your **CloudLinux OS Shared 6/7** server with CloudLinux Network using activation key, run the following command:

<div class="notranslate">

```
$ yum install rhn-setup --enablerepo=cloudlinux-base
$ /usr/sbin/rhnreg_ks --activationkey=<activation key>
```
</div>


To register your **CloudLinux OS Shared 8** server with CloudLinux Network using activation key, run the following command:

<div class="notranslate">

```
$ yum install rhn-setup --enablerepo=cloudlinux-BaseOS
$ /usr/sbin/rhnreg_ks --activationkey=<activation key>
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

You can download the latest CloudLinux OS Shared ISO and use it to install CloudLinux OS Shared on your server:

* **Latest stable CloudLinux OS Shared 8 ISO**:

* [https://www.repo.cloudlinux.com/cloudlinux/8/iso/x86_64/](https://www.repo.cloudlinux.com/cloudlinux/8/iso/x86_64/) - network/DVD installation ISOs

* **Latest stable CloudLinux OS Shared 7 ISO**:

    * x86_64 version: [https://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/](https://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/)


* **Latest stable CloudLinux OS Shared 6 ISO**:

  * x86_64 version: [https://repo.cloudlinux.com/cloudlinux/6/iso/x86_64/](https://repo.cloudlinux.com/cloudlinux/6/iso/x86_64/)
  * i386 version: [https://repo.cloudlinux.com/cloudlinux/6/iso/i386/](https://repo.cloudlinux.com/cloudlinux/6/iso/i386/)


:::tip Note
Once you install server from the ISO, make sure you [register your system](/cloudlinux_installation/#license-activation) and then run `yum update`.
:::

:::warning Note
We recommend to reinstall `lvemanager`, `lve-utils`, `lve-stats`, and `cagefs` packages after installing a control panel.
:::

Mount and boot the image, then follow the steps.

1. Configure a network connection as shown below.
    * the network name depends on your operating system
    * you can specify your hostname

   ![](/images/network_settings.png)

2. Configure installation sources:
   * select the <span class="notranslate">_On the network_</span> installation source and enter the following repository URL: <span class="notranslate">`https://repo.cloudlinux.com/cloudlinux/6/os/x86_64/Packages/`</span> for CloudLinux OS Shared 6 <span class="notranslate">`https://repo.cloudlinux.com/cloudlinux/7/os/x86_64/Packages/`</span> for CloudLinux OS Shared 7 <span
   class="notranslate">`https://repo.cloudlinux.com/cloudlinux/8/BaseOS/x86_64/os`</span> for CloudLinux OS Shared 8.
   * also, in case you'd like to get the latest packages from the **Update** repository, add the additional **Update** repository URL: <span class="notranslate">`https://repo.cloudlinux.com/cloudlinux/6/updates/x86_64/Packages/`</span> for CloudLinux OS Shared 6 <span class="notranslate">`https://repo.cloudlinux.com/cloudlinux/7/updates/x86_64/Packages/`</span> for CloudLinux OS Shared 7 and
   <span class="notranslate">`https://repo.cloudlinux.com/cloudlinux/8/AppStream/x86_64/os/`</span> for CloudLinux OS Shared 8.   

   ![](/images/repository_settings.png)

3. Select software: select the <span class="notranslate">_Minimal install_</span> environment.

   ![](/images/software_selection.png)


## CloudLinux OS Shared images


* [OpenStack QEMU/KVM](https://download.cloudlinux.com/cloudlinux/images/#kvm-tab)
* [VMware](https://download.cloudlinux.com/cloudlinux/images/#vmware-tab)
* [Google Cloud Engine](https://download.cloudlinux.com/cloudlinux/images/#gce-tab)
* [Amazon Web Services](https://download.cloudlinux.com/cloudlinux/images/#aws-tab)
* [Alibaba Cloud](https://download.cloudlinux.com/cloudlinux/images/#ali-tab)
* [Xen](/cloudlinux_installation/#installing-new-servers)

#### Xen images

:::tip Note
We do not provide Xen images of CloudLinux OS Shared anymore, use [ISO images](#installing-new-servers) instead 
:::

## Net install

To install CloudLinux OS Shared over network:

1. Download & boot using the netboot image from: 

**For CloudLinux OS Shared 8**: [https://repo.cloudlinux.com/cloudlinux/8/iso/x86_64/CloudLinux-8.4.3-x86_64-boot.iso](https://repo.cloudlinux.com/cloudlinux/8/iso/x86_64/CloudLinux-8.4.3-x86_64-boot.iso).

Alternatively, you can configure your PXE server using following folder as reference: [https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/images/pxeboot/](https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/images/pxeboot/)

**For CloudLinux OS Shared 7**: [https://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/CloudLinux-netinst-x86_64-7.9.iso](https://repo.cloudlinux.com/cloudlinux/7/iso/x86_64/CloudLinux-netinst-x86_64-7.9.iso). It will boot into CloudLinux installer.

Alternatively, you can configure your PXE server using following folder as reference: [https://repo.cloudlinux.com/cloudlinux/7/install/x86_64/images/pxeboot/](https://repo.cloudlinux.com/cloudlinux/7/install/x86_64/images/pxeboot/)

2. During the CloudLinux OS Shared installation, select URL as installation source and enter URL: 

**For CloudLinux OS Shared 8**: [https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/](https://repo.cloudlinux.com/cloudlinux/8/install/x86_64/os/) and continue with installation. 

**For CloudLinux OS Shared 7**: [https://repo.cloudlinux.com/cloudlinux/7/install/x86_64/](https://repo.cloudlinux.com/cloudlinux/7/install/x86_64/) and continue with installation.

To install CloudLinux 6 instead, use the following URL: [https://repo.cloudlinux.com/cloudlinux/6/install/x86_64/](https://repo.cloudlinux.com/cloudlinux/6/install/x86_64/)

Same URLs can be used to install para-virtualized Xen using either command-line or virt manager.


## Provider-specific guidelines

* [Amazon Web Services](/cloudlinux_installation/#aws)
* [H-Sphere](/cloudlinux_installation/#h-sphere)
* [DigitalOcean](/cloudlinux_installation/#digitalocean)
* [Linode](/cloudlinux_installation/#linode)
* [Virtuozzo and OpenVZ](/cloudlinux_installation/#virtuozzo-and-openvz)

### AWS

CloudLinux OS Shared image list can be found [here](https://download.cloudlinux.com/cloudlinux/images/#aws-tab)

If you are going to use CloudLinux OS Shared with cPanel image, you may find useful the following [article](https://cloudlinux.zendesk.com/hc/en-us/articles/360014130320-How-to-get-CloudLinux-OS-with-cPanel-AMI-working-on-AWS)

### H-Sphere

* [Requirements](/cloudlinux_installation/#requirements)
* [Converting from mod_fastcgi to mod_fcgid](/cloudlinux_installation/#converting-from-mod-fastcgi-to-mod-fcgid)
* [Older versions of H-Sphere](/cloudlinux_installation/#older-versions-of-h-sphere)

:::tip Note
For H-Sphere 3.5+

Please note, that CageFS and PHP Selector are not supported for H-Sphere
:::


#### Requirements

1. CloudLinux OS Shared with liblve 0.8 or later.
2. Apache 2.2.x or 1.3.
3. mod_suexec should be enabled.

To achieve optimal performance, we recommend to [convert from mod_fastcgi to mod_fcgid](/cloudlinux_installation/#converting-from-mod-fastcgi-to-mod-fcgid).

There is no need to install mod_hostinglimits – it comes built in with H-Sphere. Once you load kernel from CloudLinux OS Shared with liblve 0.8 or later – it will get enabled.

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
$ wget -O /hsphere/local/config/httpd2/fcgi.conf https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf
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
$ wget https://apache.osuosl.org//httpd/mod_fcgid/mod_fcgid-2.3.9.tar.gz
$ tar zxvf mod_fcgid-2.3.9.tar.gz
$ cd mod_fcgid-2.3.9/
$ APXS=/hsphere/shared/apache2/bin/apxs ./configure.apxs 
$ make
$ mv modules/fcgid/.libs/mod_fcgid.so /hsphere/shared/apache2/modules
```
</div>

2. Download and apply patch [https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/usemodule.phpmode.patch](https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/usemodule.phpmode.patch) to `/hsphere/local/config/scripts/usemodule.phpmode`:
   
 <div class="notranslate">

```
$ wget https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/usemodule.phpmode.patch 
$ patch /hsphere/local/config/scripts/usemodule.phpmode usemodule.phpmode.patch
```

</div>

3. If `/hsphere/local/config/httpd2/httpd.conf.tmpl.custom` does not exists – create it:
   
<div class="notranslate">

```
$ cp -rp /hsphere/local/config/httpd2/httpd.conf.tmpl /hsphere/local/config/httpd2/httpd.conf.tmpl.custom
```
</div>

Download and apply patch [https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch](https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch) to the <span class="notranslate">`/hsphere/local/config/httpd2/httpd.conf.tmpl.custom`</span>:

<div class="notranslate">

```
$ wget https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/httpd.conf.tmpl.patch 
$ patch --fuzz=3 /hsphere/local/config/httpd2/httpd.conf.tmpl.cusom  httpd.conf.tmpl.patch
```

</div>

4. Download pre-defined config file [https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf](https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf) to `/hsphere/local/config/httpd2`:

<div class="notranslate">

```
$ wget -O /hsphere/local/config/httpd2/fcgi.conf https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/fcgi.conf
```

</div>

5. Download our wrapper file [https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper](https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper) into <span class="notranslate">`/hsphere/shared/php5/bin/`</span> and make it executable:

<div class="notranslate">

```
$ wget -O /hsphere/shared/php5/bin/php-wrapper https://repo.cloudlinux.com/cloudlinux/sources/mod_fcgid-hsphere/php-wrapper
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
After updating H-Sphere software on web server with CloudLinux OS Shared you need to re-apply step 2 (patch usemodule.phpmode) and restart apache with `/hsphere/shared/scripts/apache-restart` script.
:::

### DigitalOcean

* [Adding CloudLinux OS Shared image to DigitalOcean](/cloudlinux_installation/#adding-cloudlinux-os-shared-image-to-digitalocean)

How to make CloudLinux OS Shared work on DigitalOcean:

DigitalOcean doesn't support custom kernels. The droplet (VM) always runs DigitalOcean's kernel. CloudLinux OS Shared requires its own kernel. To enable CloudLinux OS Shared work on DigitalOcean droplets, we provide ability to boot into CloudLinux OS Shared kernel using `kexec` functionality.

How does this work:

* <span class="notranslate"> cldeploy </span> script checks for presence of <span class="notranslate">`/etc/digitalocean`</span>. If the file detected, we assume that this is DigitalOcean droplet;
* <span class="notranslate">`kexec-tools`</span> are installed;
* <span class="notranslate">`kexec`</span> script will be created in <span class="notranslate">`/etc/rc.d/init.d/`</span> and set to run right after <span class="notranslate">`rc.sysinit`</span>.

When executed, script <span class="notranslate">`/etc/rc.d/init.d/kexec`</span> detects the latest installed CloudLinux OS Shared kernel, and loads that kernel.

If the system cannot boot into CloudLinux OS Shared kernel (due to any reason), subsequent reboot will skip <span class="notranslate">`kexec`</span>, allow droplet to boot into DigitalOceans' kernel.

To disable booting into Cloudlinux OS Shared kernel, run:

<div class="notranslate">

```
chkconfig --del kexec
```
</div>

To re-enable booting into CloudLinux OS Shared kernel, run:
<div class="notranslate">

```
chkconfig --add kexec
```
</div>

#### Adding CloudLinux OS Shared image to DigitalOcean

Custom images are Linux distributions that have been modified to fit the specific needs of DigitalOcean users. You can find some basics of importing a custom CloudLinux OS Shared image below.

Importing custom images to DigitalOcean is free, as you are only charged for the storage of your image. To save money, you can easily import your image, start a Droplet from your image, and delete the image, so you don’t incur any storage costs.

Below, we will describe how to add a qcow2 (QEMU/KVM) CloudLinux OS Shared image as a custom image. You can find more information on image options at [https://www.digitalocean.com/docs/images/custom-images/overview/](https://www.digitalocean.com/docs/images/custom-images/overview/)

1. To choose the right image, navigate to [https://download.cloudlinux.com/cloudlinux/images/#kvm-tab](https://download.cloudlinux.com/cloudlinux/images/#kvm-tab). Several different images are available for download (with and without a control panel).

![](/images/cloudlinuximages.png)

2. Copy the link for the image you are going to use and log into [cloud.digitalocean.com](https://blog.digitalocean.com/custom-images/cloud.digitalocean.com).

Click <span class="notranslate">_Images_</span> on the left of the screen and then choose <span class="notranslate">_Custom Images_</span>. Click the <span class="notranslate">_Import via URL_</span> button and paste the CloudLinux OS Shared image link.

![](/images/customimages.png)

There are several options here, but the most important is <span class="notranslate">_Choose a datacenter region_</span>, i.e. which datacenter region your Droplets should be created in for this image.

![](/images/uploadimage.png)

Click the <span class="notranslate">_Upload Image_</span> button and wait until the image is successfully uploaded.

3. Add your public key to access your droplets using key-based authentication: navigate to the <span class="notranslate">_Security_</span> sidebar menu and click the <span class="notranslate">_Add SSH Key_</span> button.

You can find more information about creating/adding SSH keys in [this article](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/).

![](/images/addsshkey.png)

4. You will then be able to start a CloudLinux OS Shared Droplet using the image.
   
   :::tip Note
   Your Droplet will be created in the same datacenter that your custom image resides in.
   :::

![](/images/startdroplet.png)

5. Now, use your preferred SSH client software to connect to your Droplet. You can find more information on SSH client setup [here](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/).

![](/images/sshclient.png)


### Linode

* [CloudLinux OS Shared on Linode KVM](/cloudlinux_installation/#cloudlinux-os-shared-on-linode-kvm)
* [CloudLinux OS Shared on Linode Xen](/cloudlinux_installation/#cloudlinux-os-shared-on-linode-xen)

:::warning Warning
If you are installing CloudLinux OS Shared 8, please make sure you’ve read [https://www.linode.com/community/questions/19397/i-just-upgraded-my-centos-8-linode-and-now-it-wont-boot-how-do-i-fix-this-proble](https://www.linode.com/community/questions/19397/i-just-upgraded-my-centos-8-linode-and-now-it-wont-boot-how-do-i-fix-this-proble)
:::


#### CloudLinux OS Shared on Linode KVM

To install CloudLinux OS Shared 7 on Linode KVM server you should perform the following steps:

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

After reboot you will have fully operational CloudLinux OS Shared 7 system and can proceed with other configuration you need.

#### CloudLinux OS Shared on Linode Xen

To install CloudLinux OS Shared 7 on Linode Xen please perform the following steps:

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

where <span class="notranslate">`$KVERSION`</span> is the version of the installed CloudLinux OS Shared 7 kernel.

:::tip Note
You will need to update <span class="notranslate">`/boot/grub/menu.lst`</span> manually after every kernel update.
:::

3. Switch boot settings to <span class="notranslate">`pv-grub-x86_64`</span> and switch off <span class="notranslate">`Auto-configure networking`</span> in Linode settings.

4. Reboot your Linode.

In case if you will migrate to KVM later you will need only switch the boot settings to <span class="notranslate">`GRUB 2`</span>.


### Virtuozzo and OpenVZ

* [Installation](/cloudlinux_installation/#installation-2)

:::warning Note
Starting from November 1st, 2019, we do not support Virtuozzo and OpenVZ **containers**.
However, you can run CloudLinux OS Shared on OpenVZ 6 and Virtuozzo 6 **hypervisors**. The hypervisor virtualization is the same as for **Xen/KVM/VMware**. Check how to run hypervisors [here](/cloudlinux_installation/#cloudlinux-os-images).
:::

:::tip Note
* Virtuozzo 6 and OpenVZ 6 are supported.
* Virtuozzo 7 and OpenVZ 7 are not supported.
:::

:::tip Note
Kernel 2.6.32-042stab088.4 or later required
:::

CloudLinux OS Shared provides limited support for OpenVZ and Virtuozzo. At this stage only the following functionality works:

* CageFS
* PHP Selector
* max entry processes
* mod_lsapi
* MySQL Governor

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

$ wget -P /etc/yum.repos.d/ https://repo.cloudlinux.com/vzlve/vzlve.repo
$ yum install lve-kernel-module
```

</div>

This will setup LVE module for VZ kernel, as well as DKMS to update that module each time VZ kernel is updated.

After this is done, you can add LVE support for any container on a node, at any time.

To make CloudLinux OS Shared work inside VZ container, VZ node has to be enabled. This should be done for any container where LVE support needs to be added:

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

CloudLinux OS Shared license is required for each VZ container.

:::tip Note
Some servers require increasing `fs.ve-mount-nr` on host node, otherwise CageFS will throw errors.
:::

To increase `fs.ve-mount-nr`, on a host node:

1. add <span class="notranslate">`fs.ve-mount-nr = 15000`</span> to <span class="notranslte">`/etc/sysctl.conf`</span>;

2. apply it with <span class="notranslate">`sysctl -p`</span> command.

In very rare cases the value should be increased higher, up to 50000.

## LILO boot loader

CloudLinux OS Shared can be deployed on servers that don't have grub installed, by installing <span class="notranslate">`хороgrub`</span> first.

To do that:

1. Make sure grub and kernel packages are not excluded. Edit file <span class="notranslate">`/etc/yum.conf`</span> and check <span class="notranslate">`exclude=`</span> line for presence of <span class="notranslate">`kernel* grub*`</span>.

2. Backup lilo config file:
   
<div class="notranslate">

```
mv /etc/lilo.conf /etc/lilo.conf.bak
```
</div>

3. Convert to CloudLinux OS Shared using <span class="notranslate"> [deploy2cl](/cloudlinux_installation/#converting-existing-servers)</span> utility.

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

6. Reboot and check that you are running CloudLinux OS Shared. <span class="notranslate">`uname -r`</span> should show something like: <span class="notranslate">`2.6.18-294.8.1.el5.lve0.7.33`</span>.

## Uninstalling

You can always uninstall CloudLinux OS Shared. In this case, the system will be converted back to CentOS (even if the original system was RHEL)

The following actions will be taken:

1. LVE related packages will be removed.
2. CloudLinux OS Shared repositories & <span class="notranslate">yum</span> plugin will be removed.
3. CentOS repositories will be set up.

In the end, the script will provide instructions on how to finish the conversion back to CentOS. That will require removal of CloudLinux OS Shared kernel (manual step), and installation of CentOS kernel (if needed).

:::warning
Do not forget to free up a CloudLinux OS Shared license by removing the server from the [Servers section of your CLN account](https://docs.cln.cloudlinux.com/dashboard/#servers). After that, if you don't intend to use the license anymore, you can [remove it](https://docs.cln.cloudlinux.com/dashboard/#cloudlinux-os-activation-keys) to avoid being billed for it. 
:::

To uninstall CloudLinux OS Shared, run:

<div class="notranslate">

```
$ wget -O cldeploy https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy
$ sh cldeploy -c
```
</div>

Now you have converted back to CentOS and it is the time to install kernel.

To delete CloudLinux OS Shared kernel, run (change the kernel package name to the one you've been using):

<div class="notranslate">

```
rpm -e --nodeps kernel-2.6.32-673.26.1.lve1.4.27.el6.x86_64
```
</div>

To install new CentOS kernel once you deleted CloudLinux OS Shared kernel, type <span class="notranslate">`yum install kernel`</span>.

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
Some of the packages from CloudLinux OS Shared repo will still be present. They are the same as CentOS packages, and don't have to be removed. They will be updated in the future from CentOS repositories, as new versions come out.
:::

## Migration to EasyApache 4

* [Advices and limitations](/cloudlinux_installation/#advices-and-limitations)
* [CentOS with EasyApache 4](/cloudlinux_installation/#centos-with-easyapache-4)
* [CentOS without EasyApache 4](/cloudlinux_installation/#centos-without-easyapache-4)
* [CloudLinux OS Shared without EasyApache 4](/cloudlinux_installation/#cloudlinux-os-shared-without-easyapache-4)
* [More about cloudlinux_ea3_to_ea4 script](/cloudlinux_installation/#more-about-cloudlinux-ea3-to-ea4-script)

#### Advices and limitations

* Use cPanel 11.55.999.66(55.999.66) or higher version.
* <span class="notranslate">Hardened EA4</span> limitations:
  * **ea-php51** and **ea-php52** have no PHP-FPM support. Please use **mod_lsapi** instead.

Follow the instructions [here](/cloudlinux_os_components/#installation-3) to install and configure mod_lsapi.

#### CentOS with EasyApache 4

If EasyApache 4 was installed earlier on your CentOS server and you would like to migrate to CloudLinux OS Shared:

1. Convert server from CentOS  to CloudLinux (see [these instructions](/cloudlinux_installation/#converting-existing-servers)).

2. Restart Apache service.

#### CentOS without EasyApache 4

If EasyApache 4 was not installed earlier on your CentOS server and you would like to migrate to CloudLinux OS Shared:

1. Convert server from CentOS to CloudLinux OS Shared (see [these instructions](/cloudlinux_installation/#converting-existing-servers)).

2. Run:
   
<div class="notranslate">

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4; sh cloudlinux_ea3_to_ea4 --convert
```
</div>

(Find examples of <span class="notranslate">`cloudlinux_ea3_to_ea4`</span> script usage below).

#### CloudLinux OS Shared without EasyApache 4

Install EasyApache4 on clean CloudLinux OS Shared from ISO image or migrate to EasyApache4 on existings CloudLinux OS Shared servers:

1. Install cPanel.
2. Run:

<div class="notranslate">

```
cd ~; wget https://repo.cloudlinux.com/cloudlinux/sources/cloudlinux_ea3_to_ea4; sh cloudlinux_ea3_to_ea4 --convert
```
</div>

(Find examples of `cloudlinux_ea3_to_ea4` script usage below).


#### More about cloudlinux_ea3_to_ea4 script

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


