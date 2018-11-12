# KernelCare WHMCS Plugin


[Overview](/overview/)
[Installation & Configuration](/installation_configuration/)
`o` [Installation and Update](/installation_and_update/)
`o` [Configuration of Product](/configuration_of_produc/)
`o` [Configuration of Add-on](/configuration_of_addon/)
[Management](/managemen/)
`o` [Link Via Add-on. Optional License](/link_via_addon_optional_lice/)
`o` [Link Products Directly](/link_products_directly/)
`o` [Link Via Configurable Options](/link_via_configurable_options/)
`o` [Link Add-ons Directly](/link_addons_directly/) (for WHMCS 7.2.x and later)
`o` [KernelCare Key Licenses](/kernelcare_key_licenses/)
`o` [Order](/order/)
`o` [Admin Area](/admin_area/)
`o` [Client Area](/client_area/)
`o` [Licenses List](/licenses_lis/)
`o` [Add-on Licenses List](/add-on_licenses_lis/) (for WHMCS 7.2.x and later)
[Common Problems](/common_problems/)

## Overview


CloudLinux Licenses For WHMCS allows you to automatically provision KernelCare, Imunify360, and CloudLinux licenses along with selected products. You can provision them for free or as a paid add-on to your product. Owing to CloudLinux Licenses add-on, all module commands on your main product are automatically reproduced on the license product.

**Admin Area Functionality**
Create License
Terminate License
Suspend/Unsuspend License (only IP based licenses)
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
[Configuration of Product](/configuration_of_produc/)
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


Log into your WHMCS admin area and go to _Setup → Products/Services → Products/Services_ . Click _Create a New Group_ .
Fill _Product Group Name_ (product group will be visible under that name in your WHMCS system) and click _Save Changes_ .
Click _Create a New Product_ . Choose _Other_ from _Product Type_ drop-down menu and previously created product group from _Product Group_ drop-down menu.
Fill _Product Name_ and click _Continue_ .
Set up this product as hidden by ticking _Hidden_ checkbox at _Details_ tab. Do not set up pricing for this product. Pricing will be done in another way.
Go to the _Module Settings_ tab and select **_CloudLinux Licenses_** from _Module Name_ drop-down.
Fill _Username_ and _Password_ with your CloudLinux API access details and select **_KernelCare_** from _License Type_ drop-down.
Click _Save Changes_ to confirm.


### Configuration of Add-on


Go to the _Setup → Add-on Modules_ , find _CloudLinux Licenses Add-on_ and click _Activate_ next to it.
The next step is permitting access to this module. Click _Configure_ , select admin role and confirm by clicking _Save Changes_ .

![](https://docs.kernelcare.com/kernelcarelicenseforwhmcs_zoom70.png)
_Fig 1: KernelCare License For WHMCS provisioning module configuration._

![](https://docs.kernelcare.com/fig2kernelcarelicenseforwhmcsaddonmodulemainpage_zoom70.png)
_Fig 2: KernelCare License For WHMCS add-on module main page._


## Management


In this section you can find two ways of linking license product with your server product as well as other possibilities of the module.

[Link Via Add-on. Optional License](/link_via_addon_optional_lice/)
[Link Products Directly](/link_products_directly/)
[Link Via Configurable Options](/link_via_configurable_options/)
[Link Add-ons Directly](/link_addons_directly/) (for WHMCS 7.2.x and later)
[KernelCare Key Licenses](/kernelcare_key_licenses/)
[Order](/order/)
[Admin Area](/admin_area/)
[Client Area](/client_area/)
[Licenses List](/licenses_lis/)
[Add-on Licenses List](/add-on_licenses_lis/) (for WHMCS 7.2.x and later)

### Link Via Add-on. Optional License


In order to allow your client to decide whether he wants to order server with or without a license we will use Product Add-on. In this way, when the client orders an add-on, the relation will be triggered and the license product will be ordered along with module.

The following steps must be performed to prepare such connection:

Go to _Setup → Products/Services → Products Add-ons_ and click _Add New Add-on_ .
Fill add-on name, set up billing cycle and price.
Then tick _Show on Order_ checkbox, assign add-on to the product and click _Save Changes_ .

![](https://docs.kernelcare.com/fig3configurationofproductaddon1_zoom70.png)
![](https://docs.kernelcare.com/fig3configurationofproductaddon2_zoom70.png)
![](https://docs.kernelcare.com/fig3-3_zoom50.png)

_Fig 3: Configuration of product add-on, which will trigger license product adding._

Go to _Add-ons → CloudLinux Licenses Add-on → Add-on Relations_ and click _Add Relation_ .
Select previously created product add-on and license product as shown below and click _Add Relation_ .

![](https://docs.kernelcare.com/fig4creatingrelation_zoom70.png)
_Fig 4: Creating relation between product add-on and provisioning module._


### Link Products Directly


If you want to offer server along with the license, perform the following steps.

**_Note. _** _Please do_ _ not set up pricing for license provisioning product. In exchange, you can increase a price for server provisioning product._

Prepare license provisioning product as described in the [Configuration of Product](/configuration_of_produc/) section of this documentation.
Go to _Add-ons → CloudLinux Licenses Add-on → Products Relations_ and click _Add Relation_ .
Select server provisioning product from the Main _ product_ drop-down list and license provisioning product from _Linked Product With License_ and click _Add Relation_ .

![](https://docs.kernelcare.com/fig5creatingrelationdirectly_zoom70.png)
_Fig 5: Creating relations directly between server and license provisioning modules._

### Link Via Configurable Options


In order to allow your client  to decide whether he wants to order server with or without license we can use Configurable Options ( [https://docs.whmcs.com/Addons_and_Configurable_Options](https://docs.whmcs.com/Addons_and_Configurable_Options) ).

Below we will show you what steps to proceed to prepare such connection:
Configure CloudLinuxLicenses product as described [here](/configuration_of_produc/) .
Go to _Setup → Products/Services → Configurable Options_ and click _Create a New Group_ .
Fill group name and add _New Configurable Option_ , set up billing cycle, price and option type. Then save changes.
Go to _Add-ons → CloudLinux Licenses Add-on → Configurable Options Relations_ and click _Add Relation_ .
Choose appropriate configurable option and license product which it is assigned to and click _Add relation_ .

**_Note. The plugin doesn’t support “quantity” type of Configurable Options._**
![](https://docs.kernelcare.com/fig6creatingrelationdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)
_Fig 6: Creating relations directly between server and license provisioning modules._


### Link Add-ons Directly


_[for WHMCS 7.2.x and later]_

WHMCS 7.2 introduces the ability to associate Product Add-ons with Provisioning Modules.

In order to allow your client to decide whether he wants to order server with or without license we will use product add-on. Below we will show you what steps to proceed to prepare such connection.

Go to _Setup → Products/Services → Products Add-ons_ and click _Add New Add-on_ .
Fill add-on name, set up billing cycle and price. Then tick _Show on Order_ checkbox, assign add-on to the product.
Go to _Module Settings_ tab and select _CloudLinux Licenses_ from _Module Name_ drop-down.
Fill _Username_ and _Password_ with your CloudLinux API access (API secret key) details and select **_KernelCare_** from _License Type_ drop-down.
Click _Save Changes_ to confirm.
![](https://docs.kernelcare.com/fig6configurationofproductaddonwithprovisioningmodules_zoom70.png)
_Fig 7: Configuration of product add-on with Provisioning Modules._

### KernelCare Key Licenses


To set KernelCare Key license while adding service in Module Settings do the following:

choose **_KernelCare_** in _License Type_ drop-down;
mark _ Use Key_ (instead of IP address) checkbox;
enter IP registration token (API secret key) from Profile page in CLN;
in _Key Limit_ field enter the number of servers and click _Save Changes;_
![](https://docs.kernelcare.com/fig7setupkernelcarelicense_zoom70.png)
_Fig 8: Setup KernelCare License._

the _License Key Custom Field_ will be automatically added.
![](https://docs.kernelcare.com/fig8licensekeycustomfield_zoom70.png)

_Fig 9: License Key Custom Field is displayed while editing service._

To edit service do the following:
when _Service Created Successfully_ message appears, you can edit _Service_ ;
specify all proper information and settings and click _Save Changes._

![](https://docs.kernelcare.com/fig9editingservice._zoom70.png)
_Fig 10: Editing service._


### Order


All the services registered in the account are displayed in _ My Products & Services_ area. When you choose particular Product/Service and click _View Details_ , you can view Product information, change license key, view Add-ons or make changes in _Management Actions_ section.

![](https://docs.kernelcare.com/fig10clientproductslist_zoom70.png)
_Fig 11: Client’s products list._

![](https://docs.kernelcare.com/fig11licensesdetails_zoom70.png)
_Fig 12: Licenses details._

To order and purchase a new service do the following:

choose _Category → KernelCare Group_ and click _Order Now_ on a particular service;

![](https://docs.kernelcare.com/fig12orderproductsgroup_zoom70.png)
_Fig 13: Order - Products group._

choose _ Billing Cycle_ if possible;
enter information in _Configure Server_ area;
choose _Available Add-ons_ and click _Continue Shopping_ to proceed or _Checkout_ to view service details;

![](https://docs.kernelcare.com/hmfile_hash_2e6c26d3.png)
_Fig 14: Order - Configure product._

enter _Promotional Code_ in a specific field if you have one;
choose _Payment Method_ and click _Continue Shopping_ .

![](https://docs.kernelcare.com/fig14orderreviewandcheckout_zoom70.png)
_Fig 15: Order - review and checkout._



### Admin Area


From the admin area it is possible to command such action as create, terminate, suspend/unsuspend and change IP address or License Key. Nonetheless, these actions can be ordered only on the server provisioning module and will be automatically reproduced for the license provisioning product.

Only change IP address feature has to be ordered manually.

You can also view the details of created license.

![](https://docs.kernelcare.com/fig15kernelcarelicenses_zoom70.png)
_Fig 16: KernelCare Licenses For WHMCS admin area._

### Client Area


The clients are also able to view their servers license details. And as well as you, they are able to change IP address or License Key of their licenses.

![](https://docs.kernelcare.com/fig16kernelcarelicenses_zoom70.png)
_Fig 17: KernelCare Licenses For WHMCS client area._

To change IP address or License Key click _Change_ as shown on the screen above. Then specify IP address or License Key and click _Save_ .

![](https://docs.kernelcare.com/fig17changinglicensekeyoripaddress_zoom70.png)
_Fig 18: Changing License Key or IP address._




### Licenses List


You can view the list of all licenses owned by your client at our add-on → _Licenses List_ .
You can filter the list of licenses by client name, server provisioning products, license provisioning products and license IP address/Key.

![](https://docs.kernelcare.com/fig18-newlicenseslist_zoom70.png)
_Fig 19: Licenses List._



### Add-on Licenses List


_[for WHMCS 7.2.x and later]_

You can view a list of all product add-on with _Provisioning Modules_ licenses owned by your client at our add-on → _Licenses List_ .

![](https://docs.kernelcare.com/fig19newaddonlicenseslist_zoom70.png)
_Fig 20: Add-on Licenses List._

## Common Problems


After activating the server provisioning product, license provisioning product bounded to it is still pending.
**Reason** : License IP address may be already taken.
**Solution** : Change server IP address.

**_Note_** _. Currently, only key-based licenses are available for Imunify360. Support of IP-based licenses will be added soon._


