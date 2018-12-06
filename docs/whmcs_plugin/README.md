# Imunify360 WHMCS Plugin


[Overview](/overview1/)
[Installation and Configuration](/installation_and_configuration/)
`o` [Installation and Update](/installation_update/)
`o` [Configuration of Product](/configuration_of_product/)
`o` [Configuration of Add-on](/configuration_of_addon/)
[Management](/management/)
`o` [Link Via Add-on – Optional License](/link_via_addon__optional_licen/)
`o` [Link Products Directly](/link_products_directly/)
`o` [Link Via Configurable Options](/link_via_configurable_options/)
`o` [Link Add-ons Directly](/link_addons_directly/) (for WHMCS 7.2.x and later)
`o` [Imunify360 Key Licenses](/imunify360_key_licenses2/)
`o` [Order](/order/)
`o` [Admin Area](/admin_area/)
`o` [Client Area](/client_area/)
`o` [Licenses List](/licenses_list/)
`o` [Add-on Licenses List](/_addon_licenses_list/) (for WHMCS 7.2.x and later)
[Common Problems](/common_problems/)


## Overview


CloudLinux Licenses For WHMCS allows you to automatically provision CloudLinux, Imunify360, and KernelCare licenses along with selected products. You can provision them for free or as a paid add-on to your product. Owing to CloudLinux Licenses add-on, all module commands on your main product are automatically reproduced on the license product.

**Admin Area Functionality**

Create license
Terminate license
Suspend/Unsuspend license (only IP-based licenses)
Change license IP address
View license details

**Client Area Functionality**

View license details
Change license IP address

**Addon Functionality**

Manage relations between addon and license product
Manage relations between server and license product
Manage relations between configurable options and license product
Automatically add license product to order when relation is triggered
View existing license
Dependencies between module actions - every action: Create, Terminate, Suspend or Unsuspend called on the server product will result with the same action performed on the licensed products
Flexible filtering of existing licenses

**Additionally**

Multi-Language Support – only provisioning module
Supports CloudLinux, KernelCare and Imunify360 Licenses
Supports WHMCS V6 and later


## Installation and Configuration


In this section we will show you how to set up our products.

[Installation and Update](/installation_update/)

[Configuration of Product](/configuration_of_product/)

[Configuration of Add-on](/configuration_of_addon/)









### Installation and Update


**Installation**

1. Download CloudLinux Licenses For WHMCS:
Production: [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip)
Beta: [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip)
2. Upload archive to your WHMCS root folder and extract it. Files should automatically jump into their places.
3. Run the following script:

```
php <whmcs_root>/clDeploy.php --migrate
```

**_Note: if your hosting requires specific files permissions, change them accordingly in the folder: _** `<whmcs_root>/modules/servers/CloudLinuxLicenses`

### Configuration of Product


**Configuration of Product**

Log into your WHMCS admin area and go to _Setup → Products/Services → Products/Services_ . Click _Create a New Group_
Fill _Product Group Name_ (product group will be visible under that name in your WHMCS system) and click _Save Changes_ .
Click _Create a New Product_ . Choose _Other_ from _Product Type_ drop-down menu and previously created product group from Product Group drop-down menu.
Fill _Product Name_ and click _Continue_ .
Set up this product as hidden through marking _Hidden_ checkbox at _Details_ tab. Do not set up pricing for this product, it will be done in another way.
Go to the _Module Settings_ tab and select **_CloudLinux Licenses_** from _Module Name_ drop-down.
Fill _Username_ and _Password_ with your CloudLinux API access details (you can find them on your CLN profile page, username is your login and password is API secret key) and select **_Imunify360_** from _ Product_ drop-down, then choose desired _License Type._ If you'd like to use key based licenses, tick _ Create Key based license_ checkbox.
Click _ Save Changes_ to confirm.
Setup desired _Auto-setup_ options.

### Configuration of Add-on


**Configuration of Add-on**

Go to _Setup → Add-on Modules_ , find _CloudLinux Licenses Add-on_ and click _Activate_ next to it.
The next step is permitting access to this module. Click _Configure_ , select admin roles and confirm by clicking _Save Changes_ .

![](/images/whmcsfig1imunify360licenseforwhmcs_zoom70.png)

_Fig 1: Imunify360 License For WHMCS provisioning module configuration._

![](/images/fig2imunify360licenseforwhmcsaddon_zoom70.png)

_Fig 2: Imunify360 License For WHMCS add-on module main page._

## Management


In this section you can find two ways of linking license product with your server product as well as other possibilities of the module.

[Link Via Add-on – Optional License](/link_via_addon__optional_licen/)
[Link Products Directly](/link_products_directly/)
[Link Via Configurable Options](/link_via_configurable_options/)
[Link Add-ons Directly](/link_addons_directly/)
[Imunify360 Key Licenses](/imunify360_key_licenses2/)
[Order](/order/)
[Admin Area](/admin_area/)
[Client Area](/client_area/)
[Licenses List](/licenses_list/)
[Add-on Licenses List](/_addon_licenses_list/)

### Link Via Add-on – Optional License


In order to allow your client to decide whether he wants to order a server with or without the license, we will use Product Add-on. In this way, when the client orders an add-on, the relation will be triggered and the license product will be ordered along with the module.

The following steps must be performed to prepare such connection:

Go to _Setup → Products/Services → Products Add-ons_ and click _Add New Add-on_ .
Fill addon name, set up billing cycle and price. Then tick _ Show_  _on Order_ checkbox, assign add-on to the product and click _Save Changes_ .

![](/images/fig3configurationofproductaddon1_zoom50.png)

![](/images/fig3configurationofproductaddon2_zoom50.png)
_Fig 3: Configuration of product add-on, which will trigger license product adding._


3. Go to _Add-ons → CloudLinux Licenses Add-on → Add-on Relations_ and click _Add Relation_ .
4. Select previously created product add-on and license product as shown below and click _Add Relation_ .

![](/images/fig4creatingrelation_zoom70.png)
_Fig 4: Creating relation between product add-on and provisioning module._

### Link Products Directly


If you want to offer server along with the license, perform the following steps.

**Note.** _ Please do not set up pricing for license provisioning product. In exchange, you can increase a price for server provisioning product._

Prepare license provisioning product as described in the [Configuration of Product](/configuration_of_product/) section of this documentation.
Go to _Add-ons → CloudLinux Licenses Add-on → Products Relations_ and click _Add Relation_ .
Select server provisioning product from the Main product drop-down list and license provisioning product from the Linked _ Product With License_ and click _Add Relation_ .

![](/images/fig5creatingrelationdirectly_zoom70.png)
_Fig 5: Creating relations directly between server and license provisioning modules._



### Link Via Configurable Options


In order to allow your client to decide whether he wants to order server with or without license we can use _Configurable Options_ ( [https://docs.whmcs.com/Addons_and_Configurable_Options](https://docs.whmcs.com/Addons_and_Configurable_Options) ).

Below we will show what steps to proceed to prepare such connection:
Configure _CloudLinuxLicenses_ product as described [here](/configuration_of_product/) .
Go to _Setup → Products/Services → Configurable Options_ and click _Create a New Group_ .
Fill group name and add _New Configurable Option_ , set up billing cycle, price and option type. Then save changes.
Go to _Add-ons → CloudLinux Licenses Add-on → Configurable Options Relations_ and click _ Add Relation_ .
Choose appropriate configurable option and license product which it is assigned to and click _Add relation_ .

**_Notes:_**

**_Plugin doesn’t support “quantity” type of Configurable Options._**
**_A related product can’t contain two (or more) products with the same license type;_**
**_If you have changed Dedicated IP of the main product, then each related IP-based product will terminate an old IP license and create a new one for a new IP._**

![](/images/fig6creatingrelationdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)

_Fig 6: Creating relation directly between server and license provisioning modules._

### Link Add-ons Directly


_[for WHMCS 7.2.x and later]_

WHMCS 7.2 introduces the ability to associate Product Add-ons with Provisioning Modules.

In order to allow your client to decide whether he wants to order server with or without license we will use product addon. Below we will show you what steps to proceed to prepare such connection:

Go to _Setup → Products/Services → Products Add-ons_ and click _Add New Add-on._
Fill add-on name, set up billing cycle and price. Then tick _Show on Order_ checkbox, assign add-on to product.
Go to the _Module Settings_ tab and select _CloudLinux Licenses_ from _Module Name_ drop-down.
Fill _Username_ and _Password_ with your CloudLinux API access (API secret key) details and select desired license type from _License Type_ drop-down. Click _Save Changes_ to confirm.

![](/images/fig6configurationofproductaddon_zoom50.png)

_Fig 7: Configuration of product add-on with Provisioning Modules._




### Imunify360 Key Licenses


1. To set Imunify360 Key license while adding service in Module Settings, do the following:

choose **_Imunify360_** in _License Type_ drop-down;
mark _Use Key_ (instead of IP address) checkbox;
enter IP registration token (API secret key) from _Profile_ page in CLN;
in Max Users field enter the number of users per server;
in _Key Limit_ field enter the number of servers and click _Save Changes_ ;

![](/images/fig7imunify360productsettings_zoom50.png)
_Fig 8: Imunify360 Product settings._

the _License Key Custom Field_ will be automatically added;
the _License Key Custom Field_ is displayed while editing service.

2. To edit service do the following:
when _ Service Created Successfully_ message appears, you can edit _Service_ ;
enter information and settings and click _Save Changes._

![](/images/fig8imunify360servicesettings_zoom50.png)
_Fig 9: Imunify360 Service settings._




### 


All the services registered in the account are displayed in _My Products & Services_ area. When you choose particular Product/Service and click _View Details_ , you can view Product information, change license key, view Add-ons or make changes in Management Actions section.

![](/images/fig9clientproductslist_zoom50.png)
_Fig 10: Client’s products list._

![](/images/fig10licensesdetails_zoom50.png)


_Fig 11: Licenses details._

To order and purchase a new service do the following:
choose _Category → Imunify360 Group_ and click _Order Now_ on a particular service;

![](/images/fig11orderproductsgroup_zoom50.png)
_Fig 12: Order - Products group._

choose _Billing Cycle_ if possible;
enter information in _Configure Server_ area;
choose _Available Add-ons_ and click _ Continue Shopping_ to proceed or _Checkout_ to view service details;

![](/images/fig12orderconfigureproduct_zoom50.png)
_Fig 13: Order - Configure product._

enter _Promotional Code_ in a specific field if you have one;
choose _Payment Method_ and click _ Continue Shopping_ .

![](/images/fig13orderreviewandcheckout_zoom50.png)
_Fig 14: Order - review and checkout._



### Admin Area


From the admin area it is possible to command such actions as create, terminate, suspend/unsuspend and change IP address. Nonetheless, these actions can be ordered only on the server provisioning module and will be automatically reproduced for the license provisioning product.

Only change IP address functionality have to be ordered manually.

You can also view the details of created license.

![](/images/fig14imunify360licensesforwhmcsadminarea_zoom50.png)

_Fig 15: Imunify360 Licenses For WHMCS admin area._


### Client Area


The clients are also able to view their servers license details. And as well as you, they are able to change IP address of their licenses.

![](/images/fig15imunify360licensesforwhmcsclientarea_zoom50.png)
_Fig 16: Imunify360 Licenses For WHMCS Client Area._

To change IP address, click _Change_ as shown on the screen above. Then specify IP address and click _Save_ .
![](/images/fig16changinglicenseipaddress_zoom70.png)
_Fig 17: Changing License IP Address._


### Licenses List


You can view the list of all licenses owned by your client at our add-on → _Licenses List_ .
You can filter the list of licenses by client name, server provisioning products, license provisioning products and license IP address/Key.

![](/images/fig18licenseslist_zoom70.png)
_Fig 18: Licenses List._


###  Add-on Licenses List


_[for WHMCS 7.2.x and later]_

You can view list of all product add-on with Provisioning Modules licenses owned by your client at our addon → Licenses List.

![](/images/fig19addonlicenseslist_zoom70.png)
_Fig 19: Add-on Licenses List._

## Common Problems


After activating the server provisioning product, license provisioning product bounded to it is still pending.

**Reason** : License IP address may be already taken.
**Solution** : Change server IP address.

**_Note_** _. Currently, only key-based licenses are available for Imunify360. Support of IP-based licenses will be added soon._


