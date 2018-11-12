# Sticky Patches


_[This functionality is not available to ePortal customers. If you are using ePortal, please use _

Sometimes you don't want to use the latest patches, but you'd like to control which patches are get installed instead. For example, you have tested the patch released on 25th of May 2018 and want to use that patch across all servers.

You can do it by setting `STICKY_PATCH=250518` (ddmmyy format) in `/etc/sysconfig/kcare/kcare.conf`
This guarantees that when `kcarectl` ` ` `--update` or `kcarectl` ` ` `--auto-update` is called, you will get patches from that date and not the newest patches.

With `STICKY_PATCH` you can go back as far as 60 days.

Alternatively, you can set `STICKY_PATCH=KEY`
This way you can control the date from which patches will be applied using KernelCare keys in CLN.
On update, the actual date will be retrieved from CLN (from Key settings) for the key used to register a particular server (not supported for IP based servers).

This is very useful if you want to test patches in QA first and later roll them out to production without doing any changes on the systems.

Here is how you can do that:

Set `STICKY_PATCH=KEY` on all your servers.
Register QA servers with one KEY, and Production servers with ANOTHER key.
Then, stop new updates for Production servers. In CLN set _Sticky Tag_ to _yesterday_ . You can do it by editing KEY in CLN in DDMMYY format.
Now, for example, let's use patches as of 03052018 (DDMMYY format). Set them for your QA server key. On the next auto-update, your QA servers will get those patches (auto-updates are typically every 4 hours).

Once you are happy with this patches, set the same Sticky Tag for Production servers key. In 4 hours your production servers should be updated to the same patches that QA servers were.

**_Note_** . You can choose any date within the last 60 days. You cannot choose today's date or date in the future.


