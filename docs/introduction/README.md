# Introduction


Imunify360 is the security solution for Linux web servers based on machine learning technology which utilizes a six-layer approach to provide total protection against any types of malicious attacks or abnormal behavior including distributed brute force attacks.

Imunify360 provides:

Advanced firewall with herd immunity and artificial intelligence for detecting new threats and protecting all servers that run the software -  capable of defending against brute force attacks, DoS attacks, and port scans.

Intrusion Detection and Protection System -  comprehensive collection of “deny” policy rules for blocking all known attacks.

Malware Scanning - automatic scanning file systems for malware injection and quarantining infected files.

Patch Management - rebootless Secure Kernel powered by KernelCare keeps the server secure by automatically patching kernels without having to reboot the server.

Website Reputation Monitoring - analyzing if web-site or IPs are blocked by any blacklists and notifying if they are.

Web Applications Sandboxing (coming soon) - creating safety sandboxes around the applications, preventing a hacker from injecting malware, defacing a web-site, or escalating privileges.

If a user violates Imunify360 security rules (trying to enter a wrong password, etc.), then Imunify360 will automatically block the access to this user IP-address, adding the IP-address to the Gray List.

If, after that, a user will try to access the HTTP port (#80), he will see the [CAPTCHA](/captcha/) . After entering the CAPTCHA correctly, Imunify360 will remove that user from the Gray List. In a case of repeated violation, the IP address will be automatically added to the Gray List again.

An administrator can remove any IP-address from the Gray List and add to the White List if needed. In this case, the user will not be blocked when attempting to violate Imunify360 security rules.


