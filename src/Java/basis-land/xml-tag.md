
# XML

## XML的概述

![image-20220812181457115](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121814238.png)







## XML的创建、语法规则

![image-20220813103031843](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131030994.png)

![image-20220813103624311](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131036441.png)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--注释：根标签有且只有一个-->
<student>
    <name>小王</name>
    <age>20</age>
    <friend>
        <name>小李</name>
        <age>22</age>
    </friend>

    <sql>
        select * from tb_user where age &lt; 18;
        select * from tb_user where age &lt; 18 &amp;&amp; age > 10;
      <!--CDATA区中可以按照原来的方式解析-->
        <![CDATA[
        select * from tb_user where age < 10;
        ]]>
    </sql>
</student>
```

![image-20220813104327660](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131043695.png)

![image-20220813105114797](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131051871.png)

```dtd
<!ELEMENT books (book+)>
        <!ELEMENT book (bookName,author,price)>
        <!ELEMENT bookName (#PCDATA)>
        <!ELEMENT author (#PCDATA)>
        <!ELEMENT price (#PCDATA)>
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE books SYSTEM "data.dtd">
<books>
    <book>
        <bookName>西游记</bookName>
        <author>吴承恩</author>
        <price>100</price>
    </book>
    <book>
        <bookName>西游记</bookName>
        <author>吴承恩</author>
        <price>100</price>
    </book>
    <book>
        <bookName>西游记</bookName>
        <author>吴承恩</author>
        <price>100</price>
    </book>
</books>
```

![image-20220813105237548](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131052620.png)

![image-20220813105331038](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131053119.png)

![image-20220813105410833](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131054928.png)

![image-20220813105655574](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131056662.png)

![image-20220813105959987](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131100058.png)

![image-20220813110045653](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131100738.png)



# XML的解析技术

![image-20220813110215014](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131102077.png)

![image-20220813110303201](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131103245.png)

![image-20220813110747061](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131107132.png)

![image-20220813110810494](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131108556.png)

![image-20220813111355648](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131113721.png)

![image-20220813111410216](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131114282.png)









# XML的检索技术：Xpath



![image-20220813111732708](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131117783.png)

