# Upgrade


**How to upgrade from a ‘free patchset’ to a fully functional, paid KernelCare license**

If you installed our complementary Symlink Protection patchset and now would like to take advantage of the comprehensive kernel security updates without reboots that [KernelCare](https://www.kernelcare.com/) delivers, below describes how to do it.

Review our pricing page and purchase a license key [here](https://www.kernelcare.com/pricing/) . If you already have a CLN account, you can purchase a plan by logging into [CLN](https://cln.cloudlinux.com/clweb/login.xhtml) .

If you are using an IP-based license, nothing else is required and you are all set.

If you are using a key-based license, run:

```
$ /usr/bin/kcarectl --register KEY
```

To check if patches were applied, run:

```
$ /usr/bin/kcarectl --info
```

The software will automatically check for new patches every 4 hours, but if you would like to perform an update manually, run:

```
$ /usr/bin/kcarectl --update
```

**Note:**  _‘Free’ patches are changed to ‘default’ now. If you still need symlink protection, you would need to apply ‘extra’ patches - they include symlink protection plus the security fixes for CentOS 6 and CentOS 7 (there are no extra charges for extra patches)._ 

To enable extra patches and apply patch, run:

```
kcarectl --set-patch-type extra --update
```

To enable extra patches without update, run:

```
kcarectll --set-patch-type extra
```

The ‘extra’ patch will be applied on the next automatic update.

To see details run:

```
kcarectl --patch-info
```

You should see something similar to:

`OS: centos6`
`kernel: kernel-2.6.32-696.6.3.el6`
`time: 2017-07-31 22:46:22`
`uname: 2.6.32-696.6.3.el6`

`kpatch-name: 2.6.32/symlink-protection.patch`
`kpatch-description: symlink protection // If you see this patch, it means that you can enable symlink protection.`
`kpatch-kernel: kernel-2.6.32-279.2.1.el6`
`kpatch-cve: N/A`
`kpatch-cvss: N/A`
`kpatch-cve-url: N/A`
`kpatch-patch-url: https://gerrit.cloudlinux.com/#/c/16508/`

`kpatch-name: 2.6.32/symlink-protection.kpatch-1.patch`
`kpatch-description: symlink protection (kpatch adaptation)`
`kpatch-kernel: kernel-2.6.32-279.2.1.el6`
`kpatch-cve: N/A`
`kpatch-cvss: N/A`
`kpatch-cve-url: N/A`
`kpatch-patch-url: https://gerrit.cloudlinux.com/#/c/16508/`

`kpatch-name: 2.6.32/ipset-fix-list-shrinking.patch`
`kpatch-description: fix ipset list shrinking for no reason`
`kpatch-kernel: N/A`
`kpatch-cve: N/A`
`kpatch-cvss:N/A`
`kpatch-cve-url: N/A`
`kpatch-patch-url: https://bugs.centos.org/view.php?id=13499`

To enable Symlink Owner Match Protection, add the following line:

```
Fs.enforce_symlinksifowner =1
```

Into _/etc/sysconfig/kcare/sysctl.conf._ And run:

```
sysctl -w fs.enforce_symlinksifowner=1
```

See [http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html](http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html) for details.

More information can be found here: [http://www.kernelcare.com/faq.php](http://www.kernelcare.com/faq.php) .


