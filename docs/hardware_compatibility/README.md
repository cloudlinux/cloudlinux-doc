# Hardware Compatibility


CloudLinux supports all the hardware supported by RHEL/CentOS 6.x, with few exceptions. Exceptions are usually hardware that require binary drivers, and that doesn't have any open source alternatives.

At this moment we are aware of only one such case:

| |  | |
|-|--|-|
|**Device** | **Binary Driver** | **Source**|
|<span class="notranslate"> B110i Smart Array RAID controller </span> | hpahcisr | [http://h10032.www1.hp.com/ctg/Manual/c01754456](http://h20000.www2.hp.com/bizsupport/TechSupport/Document.jsp?objectID=c01732801)|
|<span class="notranslate"> B120i/B320i Smart Array SATA RAID Controller </span>  | hpvsa | [http://www8.hp.com/h20195/v2/GetPDF.aspx/c04168333.pdf](http://h20000.www2.hp.com/bizsupport/TechSupport/Document.jsp?objectID=c01732801)|
|<span class="notranslate"> SanDisk DAS Cache </span> |  | [http://www.dell.com/en-us/work/learn/server-technology-components-caching](http://www.dell.com/en-us/work/learn/server-technology-components-caching)|

