# Basic Management


To disable automatic updates:

Edit file /etc/sysconfig/kcare/kcare.conf

```
AUTO_UPDATE=False 
```

To check the updated ('effective') version run:

```
$ /usr/bin/kcarectl --uname 
```

We provide convenience script _/usr/bin/kcare-uname_ that has same syntax as _uname_ .

To see applied patches run:

```
$ /usr/bin/kcarectl --patch-info 
```

