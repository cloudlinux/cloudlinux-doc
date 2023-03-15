# ELevate

[[toc]]

:::warning Beta
CloudLinux ELevate project is currently in beta. It allows you to upgrade between major OS versions in-place.
:::

## About the project

:::warning
CloudLinux ELevate project is currently in beta. Expect potenital issues, in particular with third-party packages and/or repositories.
We don't recommend to use or test this tool on your production servers unless you're completely sure about what you're doing.
:::

The ELevate project is an initiative to support migrations between major version of RHEL-derivatives.

The CloudLinux Elevate variant, built on top of the [AlmaLinux ELevate project](https://wiki.almalinux.org/elevate/), aims to provide a streamlined method of upgrading CloudLinux 7 systems to CloudLinux 8 in-place.

The [Leapp utility](https://leapp.readthedocs.io/) is the main tool used to perform the upgrade.

### Available migration paths

:::tip Note
The ELevate project only supports a subset of package repositories it's aware of. It doesn't support external repositories that aren't present in its *list of vendors*. Packages from repositories Leapp is unaware of **will not be upgraded**. This can cause your utilities and services to stop working completely after the update.

This can cause your utilities and services to stop working completely on the post-upgrade machine.

*In particular, machines with control panels other than cPanel present are highly likely to encounter problems after the upgrade.*

You can add the missing components to the upgrade yourself - please check the Contribution section for more information.
:::

At the moment, only migrating from CloudLinux 7 to CloudLinux 8 on:

* *no panel/custom panel* systems
* *cPanel* systems

is supported.

:::warning
CloudLinux ELevate project is currently in beta. Expect potenital issues, in particular with third-party packages and/or repositories.

It is **highly** recommended to ensure you have a backup and/or a snapshot of your system before proceeding with the upgrade. Ideally, perform a trial run in a sandbox to verify that migration functions as expected before you attempt to migrate a system.
:::

:::warning
We disclaim responsibility for incorrect or improper use of the tool. The support team will not be able to help you if you have not followed all the steps described in the documentation or converted a server with a non-cPanel control panel present.

In addition, support will not be provided if you have any third-party utilities that do not function after the upgrade, according to [Support policy](https://www.cloudlinux.com/CloudLinux-and-Imunify-support-policy.pdf). Examples: webserver, DNS server, mail server, database server and other utilities that do not belong to our product line.
:::

### Contribution

ELevate is developed and built as a tool for RHEL-based distributives, not just CloudLinux specifically.
ELevate supports migrating to/from other distributions and is open for all to contribute to and enhance.
You can find more information and FAQ about the AlmaLinux ELevate this project is built upon at [almalinux.org/elevate](https://almalinux.org/elevate) and [Migration SIG](https://wiki.almalinux.org/sigs/Migration), as well as contribute using the ELevate Contribution Guide.

CloudLinux does not provide support related to integrating third-party repositories or packages into the upgrade process. However, you can add the aforementioned components to the Leapp database yourself.
Please check the [Third-party integration](https://github.com/AlmaLinux/leapp-repository/tree/almalinux#third-party-integration) section in the linked README for instructions on integrating external repositories and packages.


## ELevate Guide - no panel/custom panel


This guide contains steps on how to upgrade CloudLinux 7 to CloudLinux 8 on no-panel/custom panel systems.

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

Should any packages or package repositories that are unknown to Leapp be detected, they will also be listed in the report. Consider how leaving the listed items unupgraded will affect the stability of your system.

If the packages listed as unknown in the report are critical for your system, proceeding with the upgrade is **extremely likely** to damage its functionality, up to making the machine unaccessible.

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


### Common upgrade inhibitors

The following actions from the `/var/log/leapp/leapp-report.txt` file are seen frequently:

#### Kernel modules

Some kernel modules are deprecated in the CloudLinux 8 major versions. To proceed with the upgade, unload them.
Leapp will advise on the list of modules to be removed.

```
rmmod floppy pata_acpi btrfs
```

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


## ELevate Guide - cPanel

### Preparing

Make sure your system is fully updated before starting the upgrade process.

```bash
sudo yum -y update
```

Download the cPanel ELevate script.

`wget -O /scripts/elevate-cpanel https://raw.githubusercontent.com/cpanel/elevate/release/elevate-cpanel`
`chmod 700 /scripts/elevate-cpanel`

Run a preupgrade check. No rpm packages will be installed at this phase.

`/scripts/elevate-cpanel --check --upgrade-to=cloudlinux`


:::tip Note
In addition to Leapp-created log files and reports, contained in `/var/log/leapp`, cPanel ELevate also creates an additional log file - `/var/log/elevate-cpanel.log`

It's advised to check the aforementioned files for possible problems and recommended solutions.
:::

Once the preupgrade process completes, the results will be contained in `/var/log/leapp/leapp-report.txt` file.
It's advised to review the report and consider how the changes will affect your system.


### Running

:::warning
The upgrade process requires a certain amount of system resources to complete.
Machines with RAM lower than 4 Gb can potentially face out-of-memory problems during the update.
If such a problem occurs during the *initramfs stage* of the process, the machine can end up in an **inaccessible state**.

Please make sure you have enough resources to perform the upgrade safely, and make sure to have a backup of the system prepared before doing so.
:::


Start the upgrade by running the following command:

`/scripts/elevate-cpanel --start --upgrade-to=cloudlinux`

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


### Troubleshooting

#### CLN registration

Should you encounter an issue with the `switch_cln_channel` actor, make sure that your system is registered with the CLN network.

`rhn_check; echo $?`

If it is not, you may want to force a [re-registration.](https://docs.cloudlinux.com/cloudlinux_installation/#license-activation)


#### DNF plugin installation

You may encounter issues with Leapp DNF actors failing with the following message:
`Cannot obtain data about the DNF configuration.`

To resolve this problem, ensure that the dnf config-manager plugin is installed and is funtioning properly.

If not, enable the corresponding package repository (e.g. `centos-extras`) and install it.

`dnf install 'dnf-command(config-manager)'`


#### DNF transaction failure

The main upgrade transaction is performed while the system is booted into a custom InitRamFS. In there, all the prepared package operations are performed.

While in this state, the system is inaccessble remotely via SSH. However, it can still be accessed through tools such as VNC.

In some cases, the upgrade may encounter an unrecoverable error while running the transaction, which can result in the system remaining in a halfway-upgraded, unusable and partially inaccessible state.

For example, if a package encounters a fatal error inside its `%preun` or `%prein` scriptlets during the upgrade, the transaction and the upgrade process may halt, leaving the system in an unusable state.

It is recommended to remove such packages prior to the upgrade, or, alternatively, add them to the `to_keep` list (see *Transaction Configuration Files* section) to prevent Leapp from attempting to upgrade them.


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


#### Newest kernel

The preupgrade process may stall with the following message:
> Inhibitor: Newest installed kernel not in use

Make sure your system is running the latest kernel before proceeding with the upgrade. If you updated the system recently, a reboot may be sufficient to do so. Otherwise, edit your Grub configuration accordingly.


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
