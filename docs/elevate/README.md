# ELevate

[[toc]]

:::warning Beta
CloudLinux ELevate project is currently in beta. Expect potenital issues, in particular with third-party packages and/or repositories.
We don't recommend to use or test this tool on your production servers unless you're completely sure about what you're doing.
:::

:::warning
We disclaim responsibility for incorrect or improper use of the tool. The support team will not be able to help you if you have not followed all the steps described in the documentation or converted a server with a non-cPanel control panel present.

In addition, support will not be provided if you have any third-party utilities that do not function after the upgrade, according to [Support policy](https://www.cloudlinux.com/CloudLinux-and-Imunify-support-policy.pdf). Examples: webservers, DNS servers, mail servers, database servers and other utilities that do not belong to our product line.
:::

## FAQ

### What is Elevate?
The ELevate project is an initiative to support migrations between major version of RHEL-derivatives.

The CloudLinux Elevate variant, built on top of the [AlmaLinux ELevate project](https://wiki.almalinux.org/elevate/), aims to provide a streamlined method of upgrading CloudLinux 7 systems to CloudLinux 8 in-place.

The [Leapp utility](https://leapp.readthedocs.io/) is the main tool used to perform the upgrade.

ELevate is a project aimed to provide the ability to migrate between major versions of RHEL-based distributions from 7.x to 8.x. It combines Red Hat's Leapp framework with a community created library and service for the migration metadata set required for it.


### Is it ready for production use?

Not entirely.

While the Elevate project and its surrounding ecosystem is mature, support for CloudLinux has been introduced quite recently, and as such, hasn't been thoroughy tested and verified yet.

In particular, systems with configurations and packages that substantially differ from a typical CloudLinux 7 installation could encounter issues previously not seen before.


### Can it break something on my system?

**<font color="Red">Yes.</font>**

A full system upgrade is an inherently invasive procedure In some cases, due to different system configurations, package errors or even power failures, you may encounter issues during the upgrade process that can't be automatically recovered from.

Said issues may be severe, **<font color="Red">up to and including rendering the system completely inaccessible.</font>**

To that end, we **highly recommend never running Elevate on a system without a backup ready**.

Ideally, perform a trial run in a disposable environment, like a VM or a sandbox, to verify that migration functions as expected before you attempt to migrate a system.


### Will it upgrade everything I have on my system?

It depends. It's possible that Elevate will not upgrade some software, especially one that isn't related to CloudLinux or a supported panel.

The ELevate project only supports a subset of package repositories it's aware of - that is, package repositories that are included in its configuration files.

Packages from repositories Leapp is unaware of **will not be upgraded**.

It's possible to add missing repositories and packages to Elevate yourself, if you're so inclined. Please check the [Contribution](/elevate/#contribution) section for more information on how to do so.


### Will it interrupt my server's functionality?

Yes.

One of the major steps of the upgrade process involves rebooting into a special `initramfs` environment, from which the system's software is upgraded. During that period of time, the system will be mostly non-functional and inaccessible.

This stage may take **up to an hour**, so schedule the upgrade accordingly.

During the preparation stages - that is, when the upgrade process is first *initiated* and before the system is rebooted - the system's services will function normally.

CloudLinux 7 no panel/custom panel and cPanel upgrade scenarios behave somewhat differently during the preparation stage. The cPanel scenario will disable the site functionality from this stage up until completion, while the no-panel/custom panel scenario will not.


### How long does it take?

Depending on the amount and size of the packages that need to be updated, the upgrade process may take a long time, up to several hours. This time also varies with the machine's resources and the speed of internet connection.

If the machine remains unresponsive for more than 2 hours after rebooting, assume the upgrade process failed during the post-reboot phase.


### How do I use it?

Depending on the web panel you have installed on your system, the upgrade process will require different steps.

At the moment, Elevate migration from CloudLinux 7 to CloudLinux 8 is supported on:

* *no panel/custom panel* systems;
* *cPanel* systems.


#### I have a CL7 system with no webpanel/a custom webpanel installed, how do I upgrade to CL8?

In such case, you can upgrade through the Leapp tool directly.

Please refer to the [CloudLinux 7 with no panel/custom panel ELevate Scenario](#elevate-scenario---cloudlinux-7-with-no-panel-or-a-custom-panel) for step-by-step instructions.

#### I have a CL7 system with cPanel installed, how do I upgrade to CL8?

With cPanel present on the machine, you need to run the upgrade process through the `elevate-cpanel` tool.

Please refer to the [CloudLinux 7 with cPanel ELevate Scenario](#elevate-scenario---cloudlinux-7-with-cpanel) for step-by-step instructions.

#### I have a CL7 system with DirectAdmin/Plesk/another panel installed, how do I upgrade to CL8?

Unfortunately, CloudLinux Elevate doesn't support these system configurations yet.

Instead, you can create a new machine with CloudLinux 8 and migrate your system's license and configuration to it.

Please refer to the following documentation links for instructions on how to do so:

* [How to Backup & Migrate All CloudLinux Settings to Another Server](https://cloudlinux.zendesk.com/hc/en-us/articles/115004277894-How-to-Backup-Migrate-All-CloudLinux-Settings-to-Another-Server)
* [How to Restore PHP Selector Options](https://cloudlinux.zendesk.com/hc/en-us/articles/115004517465)
* [How to obtain activation keys, register and migrate servers ](https://cloudlinux.zendesk.com/hc/en-us/articles/115003888573-How-to-obtain-activation-keys-register-and-migrate-servers)


### I ran into a problem during the upgrade process, what do I do?

Please check the Troubleshooting section directly below.

### The Troubleshooting section doesn't have an issue that I'm having. What now?

Please contact CloudLinux Support with a description of your issue.

When filing an issue, include:
- Steps to reproduce the issue
- All files in `/var/log/leapp`
- `/var/lib/leapp/leapp.db`
- journalctl
- If you want, you can also send anything else would you like to provide (e.g. storage info)

**For your convenience you can pack all logs with this command:**

`# tar -czf leapp-logs.tgz /var/log/leapp /var/lib/leapp/leapp.db`

Then you may attach only the `leapp-logs.tgz` file.

Before gathering data, if possible, re-run the *leapp* command that encountered an issue with the `--debug` flag, e.g.: `leapp upgrade --debug`.


## Troubleshooting

Here is a list of problems you may encounter during the upgrade attempt.

### Common issues

These issues may be encountered during any Elevate Scenario.

#### Newest kernel

The preupgrade/upgrade process may halt with the following message:
> Inhibitor: Newest installed kernel not in use

Make sure your system is running the latest kernel before proceeding with the upgrade. If you updated the system recently, a reboot may be sufficient to do so. Otherwise, edit your Grub configuration accordingly.


#### Kernel modules deprecated

Some kernel modules are deprecated in the CloudLinux 8 major versions. To proceed with the upgade, unload them.
Leapp will advise on the list of modules to be removed.

```
rmmod floppy pata_acpi btrfs
```


#### Package repository defined multiple times

You may encounter the following error message when attempting to upgrade:

```
Inhibitor: A YUM/DNF repository defined multiple times
```

Refer to the `/var/log/leapp/leapp-report.txt` for the details on the repository in question.

To correct the issue, examine your yum reposiory configuration and clear out any dupicate entries before restarting the upgrade process.


#### SSHD config default mismatch

If your OpenSSH configuration file does not explicitly state the option PermitRootLogin in sshd_config file, this upgrade inhibitor will apperar.

The option's default is "yes" in RHEL7, but will change in RHEL8 to "prohibit-password", which may affect your ability to log onto this machine after the upgrade.

To prevent this from occuring, set the PermitRootLogin option explicity to preserve the default behaivour after migration:

```
echo PermitRootLogin yes | sudo tee -a /etc/ssh/sshd_config
```

Alternatively, configure the SSHD so that the option is present explicitly, without leaving it to the default behaviour.


#### Disabling PAM modules

PAM module pam_pkcs11 is no longer available in RHEL-8 since it was replaced by SSSD.
Leaving this module in PAM configuration may lock out the system.

Allow Leapp to disable the pam_pkcs11 module in PAM configuration by adding an entry to the Leapp answerfile:

```
sudo leapp answer --section remove_pam_pkcs11_module_check.confirm=True
```

#### CLN registration

Should you encounter an issue with the `switch_cln_channel` actor, make sure that your system is registered with the CLN network.

`rhn_check; echo $?`

If it is not, you may want to force a [re-registration.](https://docs.cloudlinux.com/cloudlinux_installation/#license-activation)


#### DNF plugin installation

You may encounter issues with Leapp DNF actors failing with the following message:
`Cannot obtain data about the DNF configuration.`

To resolve this problem, ensure that the **dnf config-manager plugin** is installed and is functioning properly.

If not, enable the corresponding package repository (e.g. `centos-extras`) and install it.

`dnf install 'dnf-command(config-manager)'`


#### DNF transaction failure

The main upgrade transaction is performed while the system is booted into a custom InitRamFS. From there, all the package operations prepared during the previous steps are performed.

While in this state, the system is inaccessble remotely via SSH. However, it can still be accessed through tools such as VNC.

In some cases, the upgrade may encounter an unrecoverable error while running the transaction, which can result in the system remaining in a halfway-upgraded, unusable and partially inaccessible state.

For example, if a package encounters a fatal error inside its `%preun` or `%prein` scriptlets during the upgrade, the transaction and the upgrade process may halt, leaving the system in an unusable state.

It is recommended to remove such packages prior to the upgrade, or, alternatively, add them to the `to_keep` list (see *Transaction Configuration Files* section) to prevent Leapp from attempting to upgrade them.


### Elevate cPanel Scenario issues

These issues can occur during the upgrade on CloudLinux 7 + cPanel systems.

#### Outdated cPanel version

You may encounter the following error message when attempting to upgrade:

```
This installation of cPanel *YOUR_CPANEL_VERSION* does not appear to be up to date. Please upgrade cPanel to a most recent version.
```

You need to have an updated cPanel installation to proceed with the upgrade.
Please refer to the [Latest cPanel & WHM Builds (All Architectures)](http://httpupdate.cpanel.net/) and ensure you have a cPanel updated to a version from one of the following tiers: STABLE, RELEASE, CURRENT or EDGE.

LTS versions are not supported.


#### EasyApache 4 packages

You may encounter the following error message when attempting to upgrade:

```
[WARN] *** Elevation Blocker detected: ***
  One or more EasyApache 4 package(s) are not compatible with CloudLinux 8.
  Please remove these packages before continuing the update.
  - ea-apache24-mod-unsupported-package
	- ...
```

Review and remove the listed EasyApache packages, then restart the process.


#### Unsupported third-party components

You may encounter the following error message when attempting to upgrade:

```
One or more enabled YUM repo are currently unsupported.
You should disable these repositories and remove packages installed from them
before continuing the update.

Consider reporting this limitation to https://github.com/cpanel/elevate/issues
```

`elevate-cpanel` checks for presence of unknown enabled repositories and blocks the migration process if one is found.

The packages from the listed repositories **won't be properly upgraded** if Leapp doesn't contain their data in its configuration files.

It's recommended to follow the provided suggestion and remove the repositories and packages before running the upgrade.

If you'd like to add the configuration data for new repositories and packages to Leapp, please refer to the **Contribution** section of the manual for information on the proper procedure for doing so.


## Known issues

### Web servers
Litespeed web server's installation scheme is currently incompatible with Elevate.

It can be updated *after* the upgrade is complete, but won't be automatically upgraded with the rest of the system during the Elevate process.

The same limitation applies to NGINX installations not provided through cPanel or CloudLinux mechanisms.

## Contribution

ELevate is developed and built as a tool for RHEL-based distributives, not just CloudLinux specifically.

ELevate supports migrating to/from other distributions and is open for all to contribute to and enhance.

You can find more information and FAQ about the AlmaLinux ELevate this project is built upon at [almalinux.org/elevate](https://almalinux.org/elevate) and [Migration SIG](https://wiki.almalinux.org/sigs/Migration), as well as contribute using the ELevate Contribution Guide.

CloudLinux does not provide support related to integrating third-party repositories or packages into the upgrade process. However, you can add the aforementioned components to the Leapp database yourself.

Please check the [Third-party integration](https://github.com/AlmaLinux/leapp-repository/tree/almalinux#third-party-integration) section in the linked README for instructions on integrating external repositories and packages.


## ELevate Scenario - CloudLinux 7 with no panel or a custom panel

This scenario contains steps on how to upgrade CloudLinux 7 to CloudLinux 8 on no-panel/custom panel systems.

1. First of all, make sure that your CloudLinux 7 is fully upgraded and on the latest kernel version.

2. After that, download the elevate-testing.repo file with the project testing repo:

```
sudo curl https://repo.almalinux.org/elevate/testing/elevate-testing.repo -o /etc/yum.repos.d/elevate-testing.repo
```

3. Import the ELevate GPG key:

```
sudo rpm --import https://repo.almalinux.org/elevate/RPM-GPG-KEY-ELevate
```

4. Install leapp packages and migration data for the CloudLinux OS.

```
sudo yum install -y leapp-upgrade leapp-data-cloudlinux
```

### Pre-upgrade

Start a preupgrade check. In the meanwhile, the Leapp utility creates a special `/var/log/leapp/leapp-report.txt` file that contains possible problems and recommended solutions. No rpm packages will be installed during this phase.

:::danger WARNING
The preupgrade check will likely fail as the default CloudLinux 7 doesn't meet all requirements for migration. That is expected.
:::

```
sudo leapp preupgrade
```


This summary report will help you get a picture of whether it is possible to continue the upgrade.

The preupgrade process may stall with the following message:

```
Inhibitor: Newest installed kernel not in use
```

Make sure your system is running the latest kernel before proceeding with the upgrade. If you updated the system recently, a reboot may be sufficient to do so. Otherwise, edit your Grub configuration accordingly.

:::tip Note
In certain configurations, Leapp generates `/var/log/leapp/answerfile` with true/false questions. Leapp utility requires answers to all these questions in order to proceed with the upgrade.
:::

Once the preupgrade process completes, the results will be contained in the file `/var/log/leapp/leapp-report.txt`.

It's advised to review the report and consider how the changes will affect your system.

:::danger WARNING
In particular, pay attention to the packages that will not be upgraded during the transaction.

Should any packages or package repositories that are unknown to Leapp be detected, they will be listed in the report. Consider how leaving the listed items unupgraded will affect the stability of your system.

If the packages listed as unknown in the report are critical for your system, proceeding with the upgrade is **extremely likely** to damage its functionality, up to making the machine unaccessible.
:::

If you'd like to perform an upgrade on a system with unknown packages/repositories reported, and you're confident about all the potential risks, consider first adding the unknown repositories to Leapp's database, as described [here](https://github.com/AlmaLinux/leapp-repository/tree/almalinux#third-party-integration).


### Transaction Configuration Files

If you want to manually override the framework's upgrade actions for specific packages, you may do so by editing the files contained in `/etc/leapp/transaction/`.

These configuration files have priority over automatic package upgrade resolutions and Package Elevation Service data.

The configuration files are as follows:
* to_install
  * Install these packages. Don't remove them or preserve them as-is.
* to_remove
  * Remove these packages. Do not attempt to keep them or upgrade them.
* to_keep
  * Do not upgrade these packages. Keep them as they are on the system.
* to_reinstall
  * Remove these packages during the update, then reinstall them. Mostly useful for packages that have the same version string between major versions, and thus won't be upgraded automatically.


### Upgrade

Start an upgrade. You’ll be offered to reboot the system after this process is completed.


```bash
sudo leapp upgrade
sudo reboot
```


:::tip Note
The upgrade process after the reboot may take a long time, up to 40-50 minutes, depending on the machine resources. If the machine remains unresponsive for more than 2 hours, assume that the upgrade process has failed during the post-reboot phase.
If it's still possible to access the machine in some way, for example, through remote VNC access, the logs containing the information on what went wrong are located in this folder: `/var/log/leapp`.
:::

A new entry in GRUB called ELevate-Upgrade-Initramfs will appear. The system will be automatically booted into it. Observe the update process in the console.

After the reboot, login into the system and check the migration report. Verify that the current OS is the one you need.


```bash
cat /etc/redhat-release
cat /etc/os-release
rpm -qa | grep el7 # check if there are unupgraded packages present
cat /var/log/leapp/leapp-report.txt
cat /var/log/leapp/leapp-upgrade.log
```

In addition, check the leapp logs for .rpmnew configuration files that may have been created during the upgrade process. In some cases os-release or yum package files may not be replaced automatically, requiring the user to rename the .rpmnew files manually.


## ELevate Scenario - CloudLinux 7 with cPanel

This scenario contains steps on how to upgrade CloudLinux 7 to CloudLinux 8 on systems with cPanel present.

### Preparing

Make sure your system is fully updated before starting the upgrade process.

```bash
sudo yum -y update
```

In addition, make sure your system is running the latest available version of cPanel.

Download the cPanel ELevate script.

`wget -O /scripts/elevate-cpanel https://raw.githubusercontent.com/cpanel/elevate/release/elevate-cpanel`
`chmod 700 /scripts/elevate-cpanel`

Run a preupgrade check. No rpm packages will be installed during this phase.

`/scripts/elevate-cpanel --check --upgrade-to=cloudlinux`


:::tip Note
In addition to Leapp-created log files and reports, contained in `/var/log/leapp`, cPanel ELevate also creates an additional log file - `/var/log/elevate-cpanel.log`

It's advised to check the aforementioned files for possible problems and recommended solutions.
:::

Once the preupgrade process completes, the results will be contained in `/var/log/leapp/leapp-report.txt` file.

It's advised to review the report and consider how the changes will affect your system.

:::danger WARNING
In particular, pay attention to the packages that will not be upgraded during the transaction.

Should any packages or package repositories that are unknown to Leapp be detected, they will be listed in the report. Consider how leaving the listed items unupgraded will affect the stability of your system.

If the packages listed as unknown in the report are critical for your system, proceeding with the upgrade is **extremely likely** to damage its functionality, up to making the machine unaccessible.
:::

### Running

:::warning
The upgrade process requires a certain amount of system resources to complete.

Machines with RAM lower than 4 Gb can potentially face out-of-memory problems during the update.
If such a problem occurs during the *initramfs stage* of the process, the machine can end up in an **inaccessible state**.

Please make sure you have enough resources to perform the upgrade safely, and make sure to have a backup of the system prepared before doing so.
:::


Start the upgrade by running the following command:

`/scripts/elevate-cpanel --start --upgrade-to=cloudlinux`

:::tip Note
By default, the system will be automatically restarted during the upgrade process when nessesary. You can make the process require manual reboots by adding the switch `--manual-reboots`.

`/scripts/elevate-cpanel --start --manual-reboots --upgrade-to=cloudlinux`
:::

The system will reboot several times during the process. While the upgrade is in progress, the system's MOTD will change.

Check the current status of the upgrade process with:
`/scripts/elevate-cpanel --status`

Monitor the elevation log for issues:
`/scripts/elevate-cpanel --log`

In case of errors, once resolved, you can continue the migration process:
`/scripts/elevate-cpanel --continue`


:::tip Note
During one of the later upgrade phases, the system will reboot into a custom initramfs, in which the main package upgrade transaction will take place.
During this time, the system will be inaccessible through SSH.


The upgrade process after the reboot may take a long time, up to 40-50 minutes, depending on the machine resources. If the machine remains unresponsive for more than 2 hours, assume the upgrade process failed during the post-reboot phase.
If it's still possible to access the machine in some way, for example, through remote VNC access, the logs containing the information on what went wrong are located in this folder: `/var/log/leapp`, as well as here: `/var/log/elevate-cpanel.log`
:::


### Post-upgrade

After the reboot, login into the system and check:

* the status: `/scripts/elevate-cpanel --status`
* the log: `/var/log/elevate-cpanel.log`
* the Leapp report: `/var/log/leapp/leapp-report.txt`


Verify that the current OS is the one you were upgrading to.

```bash
cat /etc/redhat-release
cat /etc/os-release
```

Check the leapp logs for .rpmnew configuration files that may have been created during the upgrade process. In some cases  files like `/etc/os-release` or yum package files may not be replaced automatically - in particular, when said files were modified - requiring the user to rename the .rpmnew files manually.

