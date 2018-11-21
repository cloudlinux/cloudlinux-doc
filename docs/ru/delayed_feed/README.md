# Delayed Feed


Delayed feed ensures that your servers will receive patches some amount of hours after the release. That could protect you from possible crashes after some releases.
To implement the delayed feed, add PREFIX=’N’h to _/etc/sysconfig/kcare/kcare.conf_ .

 `PREFIX=prefix ` Patch source prefix, used to test different builds, by downloading builds from a different location

We have options for:

PREFIX=12h
PREFIX=24h
PREFIX=48h


