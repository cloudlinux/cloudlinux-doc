# ELevate

[[toc]]

:::warning Beta
CloudLinux ELevate project is currently in beta. It allows you to upgrade between major distributions easily.
:::

## About the project

:::warning
CloudLinux ELevate project is currently in beta. Expect potenital issues, in particular with third-party packages and/or repositories.
We don't recommend to use or test this tool on your production servers unless you're completely sure about what you're doing.
:::

The ELevate project is an initiative to support migrations between major version of RHEL-derivatives.

The CloudLinux Elevate variant, built on top of the [AlmaLinux ELevate project](https://wiki.almalinux.org/elevate/), aims to provide a streamlined method of upgrading CloudLinux 7 systems to CloudLinux 8 in-place.

The [Leapp utility](https://leapp.readthedocs.io/) is the main tool used to perform the upgrade.

## Available migration paths

At the moment, only migrating from CloudLinux 7 to CloudLinux 8 on *no-panel* systems is supported.

## Contribution

ELevate is developed and built as a tool for RHEL-based distributives, not just CloudLinux specifically.
ELevate supports migrating to/from other distributions and is open for all to contribute to and enhance.
You can find more information and FAQ about the AlmaLinux ELevate this project is built upon at [almalinux.org/elevate](https://almalinux.org/elevate) and [Migration SIG](https://wiki.almalinux.org/sigs/Migration), as well as contribute using the ELevate Contribution Guide.


## ELevate Quickstart Guide

:::warning
CloudLinux ELevate project is currently in beta. Expect potenital issues, in particular with third-party packages and/or repositories.

It is **highly** recommended to ensure you have a backup and/or a snapshot of your system before proceeding with the upgrade. Ideally, perform a trial run in a sandbox to verify that migration functions as expected before you attempt to migrate a system.
:::

:::warning
We disclaim responsibility for incorrect or improper use of the tool. The support team will not be able to help you if you have not followed all the steps described in the documentation or converted a server with a control panel present.

In addition, support will not be provided if you have any third-party utilities that do not function after the upgrade, according to [Support policy](https://www.cloudlinux.com/CloudLinux-and-Imunify-support-policy.pdf). Examples: webserver, DNS server, mail server, database server and other utilities that do not belong to our product line.
:::

:::tip Note
The ELevate project only supports a subset of package repositories it's aware of. It doesn't support external repositories that aren't present in its *list of vendors*. Packages from repositories Leapp is unaware of will not be upgraded. This can cause your utilities and services to stop working completely after the update.

This can cause your utilities and services to stop working completely on the post-upgrade machine.

*In particular, machines with control panels present are highly likely to encounter problems after the upgrade.*

CloudLinux does not provide support related to integrating third-party repositories or packages into the upgrade process. However, you can add the aforementioned components to the Leapp database yourself.
Please check the (Third-party integration)[https://github.com/AlmaLinux/leapp-repository/tree/almalinux#third-party-integration] section in the linked README for instructions on integrating external repositories.
:::

This guide contains steps on how to upgrade CloudLinux 7 to CloudLinux 8.

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

Start a preupgrade check. In the meanwhile, the Leapp utility creates a special `/var/log/leapp/leapp-report.txt` file that contains possible problems and recommended solutions. No rpm packages will be installed at this phase.

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

If the packages listed as unknown in the report are critical for your system, consider adding the associated repositories to Leapp's database, as described (here)[https://github.com/AlmaLinux/leapp-repository/tree/almalinux#third-party-integration].

### Common upgrade inhibitors

The following actions from the `/var/log/leapp/leapp-report.txt` file are seen most often:

### Kernel modules

Some kernel modules are deprecated in the CloudLinux 8 major versions. To proceed with the upgade, unload them.
Leapp will advise on the list of modules to be removed.

```
rmmod floppy pata_acpi btrfs
```

### SSHD config default mismatch

If your OpenSSH configuration file does not explicitly state the option PermitRootLogin in sshd_config file, this upgrade inhibitor will apperar.
The option's default is "yes" in RHEL7, but will change in RHEL8 to "prohibit-password", which may affect your ability to log onto this machine after the upgrade.

To prevent this from occuring, set the PermitRootLogin option explicity to preserve the default behaivour after migration:

```
echo PermitRootLogin yes | sudo tee -a /etc/ssh/sshd_config
```

or configure the SSHD so that the option is present explicitly, without leaving it to the default behaviour.

### Disabling PAM modules

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