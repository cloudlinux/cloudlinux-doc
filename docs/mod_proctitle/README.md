# mod_proctitle




**For installation:**

cPanel EasyApache 3 and non cPanel ( _CloudLinux 7 only for non cPanel_ ):


```
# yum install mod_proctitle --enablerepo=cloudlinux-updates-testing
# service httpd restart
```


cPanel EasyApache 4:


```
# yum install ea-apache24-mod_proctitle
# service httpd restart
```

DirectAdmin: 
```
# cd /usr/local/directadmin/custombuild
# ./build update
# ./build mod_procticle
```


## How to Read 




For reading information saved by module use the following script (the script is not in the package):

```
# CAT PROCTITLES_INFO.SH
#!/BIN/BASH

HTTPD=HTTPD
 
FOR PID IN `/USR/BIN/PGREP $HTTPD`; DO
    FOR TID IN `LS /PROC/$PID/TASK`; DO
        FOUND=NO
        FOR SHM IN `LS /DEV/SHM/APACHE_TITLE_SHM_${PID}_${TID}_* 2>/DEV/NULL`; DO
            FOUND=YES
            TITLE=`/USR/BIN/TR -D '\0' < $SHM`
            THREAD_ID=`/BIN/BASENAME "${SHM}" | SED "S/APACHE_TITLE_SHM_${PID}_${TID}_//"`
            ECHO "$PID.$TID - $THREAD_ID - $TITLE"
            BREAK
        DONE
        IF [ "$FOUND" = "NO" ]; THEN
            ECHO "$PID.$TID NOT FOUND"
        FI
    DONE
DONE
```

Here are the examples of saved by module:

_# sh proctitles_info.sh_
_571258.571258 NOT FOUND_
_571300.571300 NOT FOUND_
_571303.571303 - 000000000000000 - 1466513333.6 test.cloudlinux.com GET /1.php HTTP/1.1_
_571304.571304 - 000000000000000 - 1466513335.3 test.cloudlinux.com GET /1.php HTTP/1.1_
_571305.571305 - 000000000000000 - httpd_
_571306.571306 - 000000000000000 - httpd_
_571307.571307 - 000000000000000 - httpd_
_571372.571372 - 000000000000000 - httpd_
_571374.571374 - 000000000000000 - httpd_

_Item info:_
_[pid].[tid] - [posix thread id] - [request info]_

Request information can contain:

- means that process of Apache doesn't handle requests.
- request is active and waiting for new connection.


## Tuning Parameters




| | |
|-|-|
| | List of handlers for monitoring (httpd.conf, virtualhost).|
| | Use old method of cleaning information or new via filter (for prefork better to use )|


