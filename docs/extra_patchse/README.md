# Extra Patchset


_[KernelCare 2.12-5 or higher]_

KernelCare Extra patchset includes all the security fixes from KernelCare for CentOS 6 & CentOS 7 as well as symlink protection and IPSet bugfix for CentOS 6.

To enable extra patches and apply patch run:

```
kcarectl --set-patch-type extra --update
```

To enable extra patches without update run:

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
`kpatch-description: symlink protection // If you see this patch, it mean that you can enable symlink protection.`
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
`kpatch-cvss: N/A`
`kpatch-cve-url: N/A`
`kpatch-patch-url: https://bugs.centos.org/view.php?id=13499`

To enable Symlink Owner Match Protection, add the following line:

`Fs.enforce_symlinksifowner =1`

to _/etc/sysconfig/kcare/sysctl.conf._ 

And run:

```
sysctl -w fs.enforce_symlinksifowner=1
```

See [http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html](http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html) for details.

