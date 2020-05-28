# For CloudLinux partners

## License portal (CLN)

You can find the complete documentation for the CloudLinux Network (CLN) [here](https://docs.cln.cloudlinux.com/).

## CloudLinux WHMCS plugin

[Overview](/for_cloudlinux_partners/#overview)  
[Installation & configuration](/for_cloudlinux_partners/#installation-configuration)  
[Installation and update](/for_cloudlinux_partners/#installation-and-update)  
[Configuration of product](/for_cloudlinux_partners/#configuration-of-product)  
[Configuration of add-on](/for_cloudlinux_partners/#configuration-of-add-on)  
[Management](/for_cloudlinux_partners/#management)  
[Link via add-on. Optional license](/for_cloudlinux_partners/#link-via-add-on-optional-license)  
[Link products directly](/for_cloudlinux_partners/#link-products-directly)  
[Link via configurable options](/for_cloudlinux_partners/#link-via-configurable-options)  
[Link add-ons directly](/for_cloudlinux_partners/#link-add-ons-directly) (for WHMCS 7.2.x and later)  
[Order](/for_cloudlinux_partners/#order)  
[Admin area](/for_cloudlinux_partners/#admin-area)  
[Client area](/for_cloudlinux_partners/#client-area)  
[Licenses list](/for_cloudlinux_partners/#licenses-list)  
[Addon licenses list](/for_cloudlinux_partners/#add-on-licenses-list) (for WHMCS 7.2.x and later)  
[Common problems](/for_cloudlinux_partners/#common-problems)


### Overview

CloudLinux Licenses for WHMCS allows you to automatically provision CloudLinux, Imunify360, and KernelCare licenses along with selected products. You can provision them for free or as a paid add-on to your product. Owing to CloudLinux Licenses add-on, all module commands on your main product are automatically reproduced on the license product.

**Admin area functionality**
* Create license
* Terminate license
* Suspend/unsuspend license
* Change license IP address
* View license details

**Client area functionality**
* View License Details
* Change License IP Address

**Add-on functionality**
* Manage Relations Between Add-on And License Product
* Manage Relations Between Server And License Product
* Automatically Add License Product To Order When Relation Is Triggered
* View Existing Licenses
* Dependencies Between Module Actions - Every Action: Create, Terminate, Suspend Or Unsuspend Called On The Server Product Will Result With The Same Action Performed On The Licensed Products
* Flexible Filtering Of Existing Licenses

**Additionally**
* Multi-Language Support – Only Provisioning Module
* Supports CloudLinux, KernelCare, and Imunify360 Licenses
* Supports WHMCS V6 and Later

### Installation & configuration

In this section we will show you how to set up our products.

* [Installation and update](/for_cloudlinux_partners/#installation-and-update)
* [Configuration of product](/for_cloudlinux_partners/#configuration-of-product)
* [Configuration of add-on](/for_cloudlinux_partners/#configuration-of-add-on)


#### Installation and update


Download CloudLinux Licenses For WHMCS:<br>
**Production** : [https://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip](https://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip)<br>
**Beta** : [https://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip](https://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip)<br>
Upload archive to your WHMCS root folder and extract it. Files should automatically jump into their places.<br>
Run the following script:
<div class="notranslate">

```
php <whmcs_root>/clDeploy.php --migrate
```
</div>

#### Configuration of product


1. Log into your WHMCS admin area and go to the <span class="notranslate">_Setup → Products/Services → Products/Services_</span>. Click <span class="notranslate">_Create a New Group_</span> .
2. Fill <span class="notranslate"> _Product Group Name_ </span> (product group will be visible under that name in your WHMCS system) and click <span class="notranslate"> _Save Changes_ </span> .
3. Click <span class="notranslate"> _Create a New Product_ </span> . Choose <span class="notranslate"> _Other_ </span> from <span class="notranslate"> _Product Type_ </span> drop-down menu and previously created product group from <span class="notranslate"> _Product Group_ </span> drop-down menu.
4. Fill <span class="notranslate"> _Product Name_ </span> and click <span class="notranslate"> _Continue_ </span> .
5. Set up this product as hidden by ticking <span class="notranslate"> _Hidden_ </span> checkbox at <span class="notranslate"> _Details_ </span> tab. Do not set up pricing for this product. Pricing will be done in another way.
6. Go to the <span class="notranslate"> _Module Settings_ </span> tab and select <span class="notranslate"> **_CloudLinux Licenses_** </span> from <span class="notranslate"> _Module Name_ </span> drop-down.
7. Fill <span class="notranslate"> _Username_ </span> and <span class="notranslate"> _Password_ </span> with your CloudLinux API access details and select **_CloudLinux_** from <span class="notranslate"> _License Type_ </span> drop-down.
8. Click <span class="notranslate"> _Save Changes_ </span> to confirm.

#### Configuration of add-on


1. Go to <span class="notranslate">_Setup → Add-on Modules_</span> , find <span class="notranslate">_CloudLinux Licenses Add-on_</span> and click <span class="notranslate">_Activate_</span> next to it.
2. The next step is permitting access to this module. Click <span class="notranslate"> _Configure_ </span> , select admin role and confirm by clicking <span class="notranslate"> _Save Changes_ </span> .

![](/images/provisioningmoduleconfiguration_zoom90.png)  
_Fig 1: CloudLinux License For WHMCS provisioning module configuration._

![](/images/fig2cloudlinuxlicenseforwhmcsaddonmodulemainpage_zoom70.png)  
_Fig 2: CloudLinux License For WHMCS add-on module main page._


### Management


In this section you can find two ways of linking license product with your server product as well as other possibilities of the module.

* [Link Via Add-on. Optional License](/for_cloudlinux_partners/#link-via-add-on-optional-license)  
* [Link Products Directly](/for_cloudlinux_partners/#link-products-directly)  
* [Link Via Configurable Options](/for_cloudlinux_partners/#link-via-configurable-options)  
* [Link Add-ons Directly](/for_cloudlinux_partners/#link-add-ons-directly) (for WHMCS 7.2.x and later)  
* [Order](/for_cloudlinux_partners/#order)  
* [Admin Area](/for_cloudlinux_partners/#admin-area)  
* [Client Area](/for_cloudlinux_partners/#client-area)  
* [Licenses List](/for_cloudlinux_partners/#licenses-list)  
* [Add-on Licenses List](/for_cloudlinux_partners/#add-on-licenses-list) (for WHMCS 7.2.x and later)


#### Link via add-on. Optional license


In order to allow your client to decide whether he wants to order server with or without a license, we will use Product Add-on. In this way, when the client orders an add-on, the relation will be triggered and the license product will be ordered along with module.

The following steps must be performed to prepare such connection:

1. Go to <span class="notranslate"> _Setup → Products/Services → Products Add-ons_ </span> and click <span class="notranslate"> _Add New Add-on_ </span> .
2. Fill add-on name, set up billing cycle and price.
3. Then tick <span class="notranslate"> _Show_ </span> on <span class="notranslate"> _Order_ </span> checkbox, assign add-on to the product and click <span class="notranslate"> _Save Changes_ </span> .

||
|:-:|
|![](/images/configurationofproductaddon0_zoom70.png)|
|![](/images/configurationofproductaddon1_zoom70.png)|
|![](/images/configurationofproductaddon2_zoom70.png)|
|Fig 3: Configuration of product add-on, which will trigger license product adding.|


4. Go to <span class="notranslate"> _Add-ons → CloudLinux Licenses Add-on → Add-on Relations_ </span> and click <span class="notranslate"> _Add Relation_ </span> .
5. Select previously created product add-on and license product as shown below  and click <span class="notranslate"> _Add Relation_ </span> .

![](/images/fig4creatingrelationbetweenproductaddonandprovisioningmodule_zoom70.png)  
_Fig 4: Creating relations between product add-on and provisioning module._

#### Link products directly


If you want to offer server along with the license, perform the following steps.

**_Note._** _Please do not set up pricing for license provisioning product. In exchange, you can increase a price for server provisioning product._

1. Prepare license provisioning product as described in the [Configuration of Product](/for_cloudlinux_partners/#configuration-of-product) section of this documentation.
2. Go to <span class="notranslate"> _Add-ons → CloudLinux Licenses Add-on → Products Relations_ </span> and click <span class="notranslate"> _Add Relation_ </span> .
3. Select server provisioning product from the <span class="notranslate"> _Main Product_ </span> drop-down list and license provisioning product from <span class="notranslate"> _Linked Product With License_ </span> and click <span class="notranslate"> _Add Relation_ </span> .

![](/images/fig5creatingrelationdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)  
_Fig 5: Creating relations directly between server and license provisioning modules_ .

#### Link via configurable options


In order to allow your client to decide whether he wants to order server with or without license we can use <span class="notranslate"> _Configurable Options_ ( [https://docs.whmcs.com/Addons_and_Configurable_Options)](https://docs.whmcs.com/Addons_and_Configurable_Options)).</span>

Below we will show you what steps to proceed to prepare such connection:

* Configure _CloudLinuxLicenses_ product as described here
* Go to _Setup → Products/Services → Configurable Options_ and click _Create a New Group_ .
* Fill group name and add _New Configurable Option_ , set up billing cycle, price and option type. Then save changes.
* Go to _Add-ons → CloudLinux Licenses Add-on → Configurable Options Relations_ and click _Add Relation_.
* Choose appropriate configurable option and license product which it is assigned to and click _Add Relation_.

**_Note. The plugin doesn’t support “quantity” type of Configurable Options._**

![](/images/fig6creatingrelationsdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)  
_Fig 6: Creating relations directly between server and license provisioning modules._


#### Link add-ons directly


_[for WHMCS 7.2.x and later]_

WHMCS 7.2 introduces the ability to associate <span class="notranslate"> Product Add-ons </span> with <span class="notranslate"> Provisioning Modules </span> .

In order to allow your client to decide whether he wants to order server with or without license we will use product add-on. Below we will show you what steps to proceed to prepare such connection.

1. Go to <span class="notranslate"> _Setup → Products/Services → Products Add-ons_ </span> and click <span class="notranslate"> _Add New Addon_ </span> .
2. Fill add-on name, set up billing cycle and price. Then tick <span class="notranslate"> _Show_ </span> on <span class="notranslate"> _Order_ </span> checkbox, assign an add-on to the product.
3. Go to <span class="notranslate"> _Module Settings_ </span> tab and select <span class="notranslate"> _CloudLinuxLicenses_ </span> from <span class="notranslate"> _Module Name_ </span> drop-down.
4. Fill <span class="notranslate"> _Username_ </span> and <span class="notranslate"> _Password_ </span> with your CloudLinux API access (API secret key) details and select CloudLinux from <span class="notranslate"> _LicenseType_ </span> drop-down.
5. Click <span class="notranslate"> _Save Changes_ </span> to confirm.
![](/images/configurationofproductaddon_zoom70.png)  
_Fig 7: Configuration of product add-on with_ <span class="notranslate"> _Provisioning Modules_. </span>



#### Order


The only difference between two ways of setting up relation is the ability to order server without CloudLinux license.

![](/images/orderingserverwithlicenseaddon_zoom70.png)  
_Fig 8: Ordering server with license add-on._

![](/images/orderingserverlinkeddirectly_zoom70.png)  
_Fig 9: Ordering server linked directly with license product._

#### Admin area


From the admin area it is possible to command such action as create, terminate, suspend/unsuspend and change IP address. Nonetheless, these actions can be ordered only on the server provisioning module and will be automatically reproduced for the license provisioning product.

Only change IP address feature has to be ordered manually.

You can also view the details of created license.

![](/images/cloudlinuxlicensesforwhmcsadminarea_zoom70.png)  
_Fig 10: CloudLinux Licenses For WHMCS Admin Area._

#### Client area


The clients are also able to view their servers license details. And as well as you, they are able to change IP address of their licenses.

![](/images/cloudlinuxlicensesforwhmcsclientarea_zoom70.png)  
_Fig 11: CloudLinux Licenses For WHMCS Client Area._

To change IP address click <span class="notranslate">_Change_</span> as shown on the screen above. Then specify IP address and click <span class="notranslate">_Save_</span>.

![](/images/changinglicenseipaddress_zoom80.png)  
_Fig 12: Changing License IP Address_.

#### Licenses list


You can view the list of all licenses owned by your client at our addon → <span class="notranslate"> _Licenses List_ </span>.  
You can filter the list of licenses by client name, server provisioning products, license provisioning products and license IP address.

 ![](/images/fig13licenseslist_zoom70.png)  
_Fig 13: Licenses list._

#### Add-on licenses list


_[for WHMCS 7.2.x and later]_

You can view a list of all product add-on with <span class="notranslate"> _Provisioning Modules_ </span> licenses owned by your client at our add-on → <span class="notranslate"> _Licenses List_ </span> .

![](/images/fig14addonlicenseslist_zoom70.png)  
_Fig 14: Add-on Licenses List._


### Common problems


After activating the server provisioning product, license provisioning product bounded to it is still pending.  
**Reason** : License IP address may be already taken.  
**Solution** : Change server IP address. 

:::tip Note
Currently, only key-based licenses are available for Imunify360. Support of IP-based licenses will be added soon.
:::

<Disqus/>