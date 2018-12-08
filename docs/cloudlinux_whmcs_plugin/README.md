# CloudLinux WHMCS Plugin


[Overview](/overview/)
[Installation & Configuration](/installation_configuration/)
`o` [Installation and Update](/installation_and_update.html#installationupdate/)
`o` [Configuration of Product](/configuration_of_product/)
`o` [Configuration of Add-on](/configuration_of_addon/)
[Management](/management/)
`o` [Link Via Add-on. Optional License](/link_via_add-on_optional_lice/)
`o` [Link Products Directly](/link_products_directly/)
`o` [Link Via Configurable Options](/link_via_configurable_options/)
`o` [Link Add-ons Directly](/link_add-ons_directly/) (for WHMCS 7.2.x and later)
`o` [Order](/order/)
`o` [Admin Area](/admin_area/)
`o` [Client Area](/client_area/)
`o` [Licenses List](/licenses_list/)
`o` [Addon Licenses List](/addon_licenses_list/) (for WHMCS 7.2.x and later)
[Common Problems](/common_problems/)


## Overview


CloudLinux Licenses for WHMCS allows you to automatically provision CloudLinux, Imunify360, and KernelCare licenses along with selected products. You can provision them for free or as a paid add-on to your product. Owing to CloudLinux Licenses add-on, all module commands on your main product are automatically reproduced on the license product.

**Admin Area Functionality**
Create License
Terminate License
Suspend/Unsuspend License
Change License IP Address
View License Details

**Client Area Functionality**
View License Details
Change License IP Address

**Add-on Functionality**
Manage Relations Between Add-on And License Product
Manage Relations Between Server And License Product
Automatically Add License Product To Order When Relation Is Triggered
View Existing Licenses
Dependencies Between Module Actions - Every Action: Create, Terminate, Suspend Or Unsuspend Called On The Server Product Will Result With The Same Action Performed On The Licensed Products
Flexible Filtering Of Existing Licenses

**Additionally**
Multi-Language Support – Only Provisioning Module
Supports CloudLinux, KernelCare, and Imunify360 Licenses
Supports WHMCS V6 and Later


## Installation & Configuration


In this section we will show you how to set up our products.

[Installation and Update](/installation_and_update/)
[Configuration of Product](/configuration_of_product/)
[Configuration of Add-on](/configuration_of_addon/)


### Installation and Update


Download CloudLinux Licenses For WHMCS:
**Production** : [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip)
**Beta** : [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip)
Upload archive to your WHMCS root folder and extract it. Files should automatically jump into their places.
Run the following script:

```
php <whmcs_root>/clDeploy.php --migrate
```


### Configuration of Product


Log into your WHMCS admin area and go to the . Click .
Fill (product group will be visible under that name in your WHMCS system) and click .
Click . Choose from drop-down menu and previously created product group from drop-down menu.
Fill and click .
Set up this product as hidden by ticking checkbox at tab. Do not set up pricing for this product. Pricing will be done in another way.
Go to the tab and select from drop-down.
Fill and with your CloudLinux API access details and select **_CloudLinux_** from drop-down.
Click to confirm.

### Configuration of Add-on


Go to , find and click next to it.
The next step is permitting access to this module. Click , select admin role and confirm by clicking .

![](/images/provisioningmoduleconfiguration_zoom90.png)
_Fig 1: CloudLinux License For WHMCS provisioning module configuration._

![](/images/fig2cloudlinuxlicenseforwhmcsaddonmodulemainpage_zoom70.png)
_Fig 2: CloudLinux License For WHMCS add-on module main page._


## Management


In this section you can find two ways of linking license product with your server product as well as other possibilities of the module.

[Link Via Add-on. Optional License](/link_via_add-on_optional_lice/)
[Link Products Directly](/link_products_directly/)
[Link Via Configurable Options](/link_via_configurable_options/)
[Link Add-ons Directly](/link_add-ons_directly/) (for WHMCS 7.2.x and later)
[Order](/order/)
[Admin Area](/admin_area/)
[Client Area](/client_area/)
[Licenses List](/licenses_list/)
[Add-on Licenses List](/addon_licenses_list/) (for WHMCS 7.2.x and later)


### Link Via Add-on. Optional License


In order to allow your client to decide whether he wants to order server with or without a license, we will use Product Add-on. In this way, when the client orders an add-on, the relation will be triggered and the license product will be ordered along with module.

The following steps must be performed to prepare such connection:

Go to and click .
Fill add-on name, set up billing cycle and price.
Then tick on checkbox, assign add-on to the product and click .

![](/images/configurationofproductaddon0_zoom70.png)

![](/images/configurationofproductaddon1_zoom70.png)

![](/images/configurationofproductaddon2_zoom70.png)
_Fig 3: Configuration of product add-on, which will trigger license product adding._


Go to and click .
Select previously created product add-on and license product as shown below  and click .

![](/images/fig4creatingrelationbetweenproductaddonandprovisioningmodule_zoom70.png)
_Fig 4: Creating relations between product add-on and provisioning module._

### Link Products Directly


If you want to offer server along with the license, perform the following steps.

**_Note._** _ Please do not set up pricing for license provisioning product. In exchange, you can increase a price for server provisioning product._

Prepare license provisioning product as described in the [Configuration of Product](/configuration_of_product/) section of this documentation.
Go to and click .
Select server provisioning product from the drop-down list and license provisioning product from and click .

![](/images/fig5creatingrelationdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)
_Fig 5: Creating relations directly between server and license provisioning modules_ .

### Link Via Configurable Options


In order to allow your client to decide whether he wants to order server with or without license we can use _ Configurable Options_ ( [https://docs.whmcs.com/Addons_and_Configurable_Options)](https://docs.whmcs.com/Addons_and_Configurable_Options)) .

Below we will show you what steps to proceed to prepare such connection:

Configure _CloudLinuxLicenses_ product as described here
Go to _Setup → Products/Services → Configurable Options_ and click _Create a New Group_ .
Fill group name and add _New Configurable Option_ , set up billing cycle, price and option type. Then save changes.
Go to _Add-ons → CloudLinux Licenses Add-on → Configurable Options Relations_ and click _ Add Relation_ .
Choose appropriate configurable option and license product which it is assigned to and click _ Add Relation_ .

**_Note. The plugin doesn’t support “quantity” type of Configurable Options._**

![](/images/fig6creatingrelationsdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)
_Fig 6: Creating relations directly between server and license provisioning modules._


### Link Add-ons Directly


_[for WHMCS 7.2.x and later]_

WHMCS 7.2 introduces the ability to associate with .

In order to allow your client to decide whether he wants to order server with or without license we will use product add-on. Below we will show you what steps to proceed to prepare such connection.

Go to _ _ and click .
Fill add-on name, set up billing cycle and price. Then tick on checkbox, assign an add-on to the product.
Go to tab and select from drop-down.
Fill and with your CloudLinux API access (API secret key) details and select CloudLinux from drop-down.
Click to confirm.
![](/images/configurationofproductaddon_zoom70.png)
_Fig 7: Configuration of product add-on with _



### Order


The only difference between two ways of setting up relation is the ability to order server without CloudLinux license.

![](/images/orderingserverwithlicenseaddon_zoom70.png)
_Fig 8: Ordering server with license add-on._

![](/images/orderingserverlinkeddirectly_zoom70.png)
_Fig 9: Ordering server linked directly with license product._

### Admin Area


From the admin area it is possible to command such action as create, terminate, suspend/unsuspend and change IP address. Nonetheless, these actions can be ordered only on the server provisioning module and will be automatically reproduced for the license provisioning product.

Only change IP address feature has to be ordered manually.

You can also view the details of created license.

![](/images/cloudlinuxlicensesforwhmcsadminarea_zoom70.png)
_Fig 10: CloudLinux Licenses For WHMCS Admin Area._

### Client Area


The clients are also able to view their servers license details. And as well as you, they are able to change IP address of their licenses.

![](/images/cloudlinuxlicensesforwhmcsclientarea_zoom70.png)
_Fig 11: CloudLinux Licenses For WHMCS Client Area._

To change IP address click as shown on the screen above. Then specify IP address and click .

![](/images/changinglicenseipaddress_zoom80.png)
_Fig 12: Changing License IP Address_ .

### Licenses List


You can view the list of all licenses owned by your client at our addon → .
You can filter the list of licenses by client name, server provisioning products, license provisioning products and license IP address.

 ![](/images/fig13licenseslist_zoom70.png)
_Fig 13: Licenses list._

### Add-on Licenses List


_ [for WHMCS 7.2.x and later]_

You can view a list of all product add-on with licenses owned by your client at our add-on → .

![](/images/fig14addonlicenseslist_zoom70.png)
_Fig 14: Add-on Licenses List._


## Common Problems


After activating the server provisioning product, license provisioning product bounded to it is still pending.
**Reason** : License IP address may be already taken.
**Solution** : Change server IP address. 




