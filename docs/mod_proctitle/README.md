# mod_proctitle

mod_proctitle is a module for gathering URL information per request. It is available only for Apache 2.4 now.


**For installation:**

cPanel EasyApache 3 and non cPanel ( _CloudLinux 7 only for non cPanel_ ):

<div class="notranslate">

```
# yum install mod_proctitle --enablerepo=cloudlinux-updates-testing
# service httpd restart
```
</div>

cPanel EasyApache 4:

<div class="notranslate">

```
# yum install ea-apache24-mod_proctitle
# service httpd restart
```
</div>
DirectAdmin:
<div class="notranslate">
 
```
# cd /usr/local/directadmin/custombuild
# ./build update
# ./build mod_procticle
```
</div>

## How to Read mod_proctitle Information

**How to read information gathered by the module**


For reading information saved by module use the following script (the script is not in the package):
<div class="notranslate">

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
</div>
Here are the examples of saved by module:
<div class="notranslate">

```
# sh proctitles_info.sh
571258.571258 NOT FOUND
571300.571300 NOT FOUND
571303.571303 - 000000000000000 - 1466513333.6 test.cloudlinux.com GET /1.php HTTP/1.1
571304.571304 - 000000000000000 - 1466513335.3 test.cloudlinux.com GET /1.php HTTP/1.1
571305.571305 - 000000000000000 - httpd
571306.571306 - 000000000000000 - httpd
571307.571307 - 000000000000000 - httpd
571372.571372 - 000000000000000 - httpd
571374.571374 - 000000000000000 - httpd

Item info:
[pid].[tid] - [posix thread id] - [request info]
```
</div>

Request information can contain:

<span class="notranslate"> _NOT FOUND_ </span> - means that process of Apache doesn't handle requests.<br>
<span class="notranslate"> _httpd_ </span> - request is active and waiting for new connection.<br>
<span class="notranslate"> _[seconds].[tenths of second] [host] [METHOD] [URL] [PROTOCOL]_ </span>

## Tuning Parameters


**Module parameters for tuning**

| | |
|-|-|
|WatchHandlers | List of handlers for monitoring (httpd.conf, virtualhost).|
|ProctitleUseFilter On/Off | Use old method of cleaning information or new via filter (for prefork better to use <span class="notranslate"> Off </span> )|


