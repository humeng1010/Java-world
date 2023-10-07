---
title: SpringBoot原理篇
category: 
- SpringBoot
tag: 
- SpringBoot
---

# 自动配置
## bean加载方式(复习)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661231754081-36f3980f-c586-4bee-85c8-69c85b59f1ce.png#averageHue=%23fcfce1&clientId=u01b376f7-b050-4&from=paste&height=580&id=ue07668bd&name=image.png&originHeight=1160&originWidth=2176&originalType=binary&ratio=1&rotation=0&showTitle=false&size=794244&status=done&style=none&taskId=u802e5c29-252f-4f35-9424-0ad406830ea&title=&width=1088)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661232129391-c89a18b2-4a61-4ef9-9fd7-daf98019c201.png#averageHue=%23fbfadf&clientId=u01b376f7-b050-4&from=paste&height=524&id=ud27a8eac&name=image.png&originHeight=1048&originWidth=2246&originalType=binary&ratio=1&rotation=0&showTitle=false&size=871972&status=done&style=none&taskId=u3e41f1ba-1aa4-4a9f-ad07-7ae5831fff3&title=&width=1123)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661232155551-36676944-c2ab-48c4-ac11-73cc3f3fe4f2.png#averageHue=%23fbfae0&clientId=u01b376f7-b050-4&from=paste&height=570&id=u4b73928b&name=image.png&originHeight=1140&originWidth=2286&originalType=binary&ratio=1&rotation=0&showTitle=false&size=620405&status=done&style=none&taskId=ufb2b5334-2295-4203-84e1-9f6f8f1d7b1&title=&width=1143)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661232387979-0cca9980-9d51-46c3-b57e-599071756205.png#averageHue=%23fcfaea&clientId=u01b376f7-b050-4&from=paste&height=534&id=u08ec53c8&name=image.png&originHeight=1068&originWidth=2230&originalType=binary&ratio=1&rotation=0&showTitle=false&size=407979&status=done&style=none&taskId=ubf22388b-a55c-4a18-8fda-df41bfba68c&title=&width=1115)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661233107130-099f0165-a4b2-4397-8f15-1217113acc8b.png#averageHue=%23faf9df&clientId=u95bb39cb-d99d-4&from=paste&height=562&id=u50852acb&name=image.png&originHeight=1124&originWidth=2214&originalType=binary&ratio=1&rotation=0&showTitle=false&size=666440&status=done&style=none&taskId=u503e4620-dbbb-423b-85a4-2425c4dc50b&title=&width=1107)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661233925021-7b560124-c40d-4467-9b08-e73d92c64328.png#averageHue=%23f8f8df&clientId=u95bb39cb-d99d-4&from=paste&height=571&id=u58fcc150&name=image.png&originHeight=1142&originWidth=2208&originalType=binary&ratio=1&rotation=0&showTitle=false&size=605065&status=done&style=none&taskId=u758f24c4-1640-44b0-8f42-2382d29ca3a&title=&width=1104)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661234121567-dbf9dcda-f7fa-4521-bd5a-a89e7e28a718.png#averageHue=%23fcfbf1&clientId=u95bb39cb-d99d-4&from=paste&height=482&id=u8e13bd95&name=image.png&originHeight=964&originWidth=2324&originalType=binary&ratio=1&rotation=0&showTitle=false&size=443220&status=done&style=none&taskId=u1ba4fe0f-c3da-4b06-af31-00070142c56&title=&width=1162)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661234305364-4f99c6d3-9fc1-41de-90c7-13183994c882.png#averageHue=%23fcfbef&clientId=u95bb39cb-d99d-4&from=paste&height=280&id=ud05247f8&name=image.png&originHeight=560&originWidth=1686&originalType=binary&ratio=1&rotation=0&showTitle=false&size=183531&status=done&style=none&taskId=u87a9402f-8b50-4a27-a8ca-ae3bf98b740&title=&width=843)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661234493750-d0d37708-ae4f-4233-affd-7cd709431da8.png#averageHue=%23faf8e5&clientId=u95bb39cb-d99d-4&from=paste&height=548&id=u204293f5&name=image.png&originHeight=1096&originWidth=2210&originalType=binary&ratio=1&rotation=0&showTitle=false&size=548781&status=done&style=none&taskId=u26a200de-5b9d-4334-8430-0d271326786&title=&width=1105)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661234845552-f738c2f8-2627-4ed8-9984-ffa8f53cacac.png#averageHue=%23fbfae9&clientId=u95bb39cb-d99d-4&from=paste&height=527&id=ua3030e85&name=image.png&originHeight=1054&originWidth=2362&originalType=binary&ratio=1&rotation=0&showTitle=false&size=642730&status=done&style=none&taskId=ud6db53dc-29b9-474c-8b3d-8831c9d2a5f&title=&width=1181)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661235233754-376b3e20-fb84-475f-8c68-f5bf390fc96b.png#averageHue=%23f5f4db&clientId=u95bb39cb-d99d-4&from=paste&height=553&id=u127183e0&name=image.png&originHeight=1106&originWidth=2314&originalType=binary&ratio=1&rotation=0&showTitle=false&size=879208&status=done&style=none&taskId=u6e87ab94-f30f-4147-be51-ba114cd464d&title=&width=1157)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661235627824-84d8ceb4-222e-4b6e-a919-0a83021d9d67.png#averageHue=%23f6f5dd&clientId=u95bb39cb-d99d-4&from=paste&height=538&id=u8bbcfd76&name=image.png&originHeight=1076&originWidth=2272&originalType=binary&ratio=1&rotation=0&showTitle=false&size=646339&status=done&style=none&taskId=u545e81aa-54fa-47b3-a80b-5c95c6e3ea9&title=&width=1136)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661235851486-36ab3450-e109-4dbd-93f0-82e6e3453f27.png#averageHue=%23f8f7f6&clientId=u95bb39cb-d99d-4&from=paste&height=540&id=u17d57e42&name=image.png&originHeight=1080&originWidth=2220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=614026&status=done&style=none&taskId=ubdff8dd6-63e5-42df-a153-fc71c414915&title=&width=1110)



## bean加载控制(复习)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661235941520-5a9185e5-d066-4113-9773-4f1328c97612.png#averageHue=%23fafaf9&clientId=u95bb39cb-d99d-4&from=paste&height=92&id=u79983346&name=image.png&originHeight=184&originWidth=1812&originalType=binary&ratio=1&rotation=0&showTitle=false&size=122068&status=done&style=none&taskId=u5a070411-11d5-4b56-a717-4b72e1dacf9&title=&width=906)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661236065956-e6e8ce0d-f6d6-4ebf-88a0-1e46ad221a3f.png#averageHue=%23faf9df&clientId=u95bb39cb-d99d-4&from=paste&height=493&id=ued55a3f7&name=image.png&originHeight=986&originWidth=2246&originalType=binary&ratio=1&rotation=0&showTitle=false&size=563205&status=done&style=none&taskId=u30b08f77-9edb-4406-8c78-14f7a1887d3&title=&width=1123)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661236115171-b06390f4-cff1-436e-889b-52d9ce03d406.png#averageHue=%23fafae0&clientId=u95bb39cb-d99d-4&from=paste&height=448&id=ub6d2c4ea&name=image.png&originHeight=896&originWidth=2362&originalType=binary&ratio=1&rotation=0&showTitle=false&size=574495&status=done&style=none&taskId=u21b2259b-d3c9-4250-b07e-903250f1b37&title=&width=1181)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661236145705-59a41504-813f-4b75-b428-8fe1e6f06ef5.png#averageHue=%23f6f5dc&clientId=u95bb39cb-d99d-4&from=paste&height=473&id=u3c732927&name=image.png&originHeight=946&originWidth=2340&originalType=binary&ratio=1&rotation=0&showTitle=false&size=870699&status=done&style=none&taskId=ub4881c37-ee89-422a-af76-80ba4747972&title=&width=1170)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661236192265-6cd30736-5731-4a70-a70d-710456d5421f.png#averageHue=%23f5f6dc&clientId=u95bb39cb-d99d-4&from=paste&height=452&id=u9162807c&name=image.png&originHeight=904&originWidth=2334&originalType=binary&ratio=1&rotation=0&showTitle=false&size=745059&status=done&style=none&taskId=u71b1c8f1-e131-4b3d-84d4-47338e0b7dd&title=&width=1167)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661236264102-2356d8fa-94d3-4ef0-a575-8f1f6612983f.png#averageHue=%23fbfafa&clientId=u95bb39cb-d99d-4&from=paste&height=569&id=u9e759007&name=image.png&originHeight=1138&originWidth=2348&originalType=binary&ratio=1&rotation=0&showTitle=false&size=593557&status=done&style=none&taskId=u76b7f089-3835-41c8-b05e-fd6829cb99c&title=&width=1174)
### 编程式
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661236736801-fedc45c0-7ffb-46d7-89df-58c5e57cef74.png#averageHue=%23f9f9df&clientId=u95bb39cb-d99d-4&from=paste&height=481&id=ud7d36a11&name=image.png&originHeight=962&originWidth=2314&originalType=binary&ratio=1&rotation=0&showTitle=false&size=600957&status=done&style=none&taskId=udca123b9-df13-4b66-9f2c-2fc01afa986&title=&width=1157)
### 注解式(重点)@Conditional
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661236813138-a8c39f98-208d-46f6-9e39-ca6e7ea4658c.png#averageHue=%23fbfbfa&clientId=u95bb39cb-d99d-4&from=paste&height=85&id=u0e214e2a&name=image.png&originHeight=170&originWidth=1896&originalType=binary&ratio=1&rotation=0&showTitle=false&size=104823&status=done&style=none&taskId=uaf19b1b2-296a-42d8-84f3-0297c21ad1e&title=&width=948)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661237517074-fb9224c7-e733-4c6e-bd4b-b1791b3eb75e.png#averageHue=%23fdfcee&clientId=u95bb39cb-d99d-4&from=paste&height=498&id=u47c5dc2c&name=image.png&originHeight=996&originWidth=2158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=247099&status=done&style=none&taskId=u514648f4-4c9f-4cc2-b445-6882833a644&title=&width=1079)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661237527623-a876c3ac-b7cd-4313-bb53-25b8c84205d7.png#averageHue=%23fdfce9&clientId=u95bb39cb-d99d-4&from=paste&height=423&id=ua6065eef&name=image.png&originHeight=846&originWidth=2158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=273618&status=done&style=none&taskId=u997843b8-0618-4148-931d-14c15076c39&title=&width=1079)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661237555270-b37a7370-5971-49d4-8d9c-81874c9332aa.png#averageHue=%23fcfce0&clientId=u95bb39cb-d99d-4&from=paste&height=396&id=u90079562&name=image.png&originHeight=792&originWidth=2158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=235651&status=done&style=none&taskId=u5eab8d0f-42d6-4d3a-87eb-556e4596e2d&title=&width=1079)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661237563727-580c0c03-a332-4f26-ac6b-898142334ef0.png#averageHue=%23fcfbe0&clientId=u95bb39cb-d99d-4&from=paste&height=405&id=u817cace3&name=image.png&originHeight=810&originWidth=2164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=257210&status=done&style=none&taskId=u5eb207d6-9d32-4b3d-832b-a621e8cd02d&title=&width=1082)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661237574828-51e2c69b-71cc-4502-9865-7363f9b46ba7.png#averageHue=%23fcfce0&clientId=u95bb39cb-d99d-4&from=paste&height=400&id=ud5674ba2&name=image.png&originHeight=800&originWidth=2084&originalType=binary&ratio=1&rotation=0&showTitle=false&size=233919&status=done&style=none&taskId=u7122b68d-61a8-4abc-af56-3d233a3b377&title=&width=1042)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661237606103-cab6b547-fa1a-4dc1-8964-bf7b01b95c95.png#averageHue=%23fcfbe0&clientId=u95bb39cb-d99d-4&from=paste&height=497&id=u499711fc&name=image.png&originHeight=994&originWidth=2240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=377326&status=done&style=none&taskId=u4a65f55b-cc06-4d80-9bab-1d19a511ab8&title=&width=1120)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661237987120-13aa3e2e-dcf7-4e25-a724-0691b1456678.png#averageHue=%23fbfadf&clientId=u95bb39cb-d99d-4&from=paste&height=430&id=u17bc1b3a&name=image.png&originHeight=860&originWidth=2252&originalType=binary&ratio=1&rotation=0&showTitle=false&size=403262&status=done&style=none&taskId=ue81c248b-9ebe-40d0-9a56-7efd73940a7&title=&width=1126)

## bean依赖属性配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661392637296-20c83a2e-26d6-488e-bbc6-a28e8843fdb8.png#averageHue=%23fbfbe1&clientId=ue06a861b-a5d2-4&from=paste&height=500&id=ua037815d&name=image.png&originHeight=1000&originWidth=2194&originalType=binary&ratio=1&rotation=0&showTitle=false&size=824383&status=done&style=none&taskId=u5e14e99e-d0cc-45c7-a210-0c36625f03e&title=&width=1097)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661392655728-4cbc647e-239a-4940-acd2-e860ed9b9a20.png#averageHue=%23fdfde2&clientId=ue06a861b-a5d2-4&from=paste&height=365&id=u2ceccba7&name=image.png&originHeight=730&originWidth=2182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=174527&status=done&style=none&taskId=uc44a0fa5-f08f-4aaa-8cf3-42416ccf2c0&title=&width=1091)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661393139613-519f026d-8380-4d62-a53e-05414a9efe1c.png#averageHue=%23fbfbe0&clientId=ue06a861b-a5d2-4&from=paste&height=354&id=ue3322f96&name=image.png&originHeight=708&originWidth=1738&originalType=binary&ratio=1&rotation=0&showTitle=false&size=300710&status=done&style=none&taskId=u1cd6a510-b3c9-417f-a661-d352dadc19b&title=&width=869)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661393145482-66e4f967-b10f-4237-90a0-cafd1525afae.png#averageHue=%23f9f8de&clientId=ue06a861b-a5d2-4&from=paste&height=344&id=u59475a65&name=image.png&originHeight=688&originWidth=1534&originalType=binary&ratio=1&rotation=0&showTitle=false&size=470279&status=done&style=none&taskId=u59b531c4-b67e-41c0-9ac8-68918e0939a&title=&width=767)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661393509797-8e76ff23-bfe4-4377-8490-03ca4fd2b51f.png#averageHue=%23f3f4db&clientId=ue06a861b-a5d2-4&from=paste&height=714&id=u4a65303a&name=image.png&originHeight=1428&originWidth=2858&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3970339&status=done&style=none&taskId=u0fbecee2-1572-4d5c-8e2d-b10c685f88d&title=&width=1429)
```java
package com.red.play;

import lombok.Data;

@Data
public class Cat {
    private String name;
    private Integer age;
}

```
```java
package com.red.play;

import lombok.Data;

@Data
public class Mouse {
    private String name;
    private Integer age;
}

```
```java
package com.red.play;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

//@Component
@Data
@ConfigurationProperties(prefix = "play")
public class TomAndJerryProperties {
    private Cat cat;
    private Mouse mouse;
}

```
```yaml
play:
#  cat:
#    name: andy
#    age: 3
  mouse:
    name: s
    age: 3



```
```java
package com.red.play;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

//@Component
@Data
@EnableConfigurationProperties({TomAndJerryProperties.class})
public class TomAndJerry {
    private  Cat cat;
    private  Mouse mouse;
    private TomAndJerryProperties tomAndJerryProperties;

    public TomAndJerry(TomAndJerryProperties tomAndJerryProperties){
        this.tomAndJerryProperties = tomAndJerryProperties;
        cat = new Cat();
        cat.setName(tomAndJerryProperties.getCat()!=null&&StringUtils.hasText(tomAndJerryProperties.getCat().getName())
                ?tomAndJerryProperties.getCat().getName():"tom");
        cat.setAge(tomAndJerryProperties.getCat()!=null&&tomAndJerryProperties.getCat().getAge()!=null
                ?tomAndJerryProperties.getCat().getAge():3);
        mouse = new Mouse();
        mouse.setName(tomAndJerryProperties.getMouse()!=null&&StringUtils.hasText(tomAndJerryProperties.getMouse().getName())
                ?tomAndJerryProperties.getMouse().getName():"jerry");
        mouse.setAge(tomAndJerryProperties.getMouse()!=null&&tomAndJerryProperties.getMouse().getAge()!=null
                ?tomAndJerryProperties.getMouse().getAge():3);
    }
    public void play(){
        System.out.println(cat.getAge()+"岁的"+cat.getName()+"正在和"+ mouse.getAge()+"岁的"+mouse.getName()+"玩耍");

    }

}

```
## 自动配置原理(重点)-内部工作原理
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661397841082-26a8fca3-05fc-4784-adb7-99f602bd39b0.png#averageHue=%23f2f1f1&clientId=ue06a861b-a5d2-4&from=paste&height=455&id=uda1d3d83&name=image.png&originHeight=910&originWidth=2304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=574843&status=done&style=none&taskId=u02111025-c805-49d5-b122-bdd221672db&title=&width=1152)
### 分析AutoConfigurationPackages.Registrar.class 
> 主要是用于配置自动扫描启动类下的包的


### 分析AutoConfigurationImportSelector
> 首先我们发现这个类实现了很多接口可以分为三类：
> 1. BeanClassLoaderAware,ResourceLoaderAware, BeanFactoryAware, EnvironmentAware
>    1. Aware：感知，发现；
>    2. 作用：可以在当前类(必须是bean)里面使用BeanClassLoader，ResourceLoader，... 的方法
>    3. 例如：在一个bean中实现ApplicationContextAware接口，并重写set方法，就可以获取到ApplicationContext并调用方法
>    4. ![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678099523364-e5d3216c-2ba4-4ca1-801b-8da9329ee1dc.png#averageHue=%23272d37&clientId=u84081457-0317-4&from=paste&height=512&id=u7e065a29&name=image.png&originHeight=1024&originWidth=2560&originalType=binary&ratio=2&rotation=0&showTitle=false&size=211372&status=done&style=none&taskId=u1778a103-8545-46d0-9ca7-d77bc3bfb15&title=&width=1280)
> 2. Ordered 
>    1. 对当前这个类在spring容器中进行排序的接口
>    2. ![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678099671400-b729d110-e9f4-4ed3-aeed-0b75c11033f8.png#averageHue=%23282d37&clientId=u84081457-0317-4&from=paste&height=614&id=u6d1986bf&name=image.png&originHeight=1228&originWidth=1912&originalType=binary&ratio=2&rotation=0&showTitle=false&size=202219&status=done&style=none&taskId=u866b0d1b-09e0-45bc-aa2f-5ec7181df0a&title=&width=956)
>    3. 防止加载错乱
> 3. DeferredImportSelector （延迟导入选择器）
>    1. ![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678104590243-0f0c58f6-44a2-4934-bc31-62496d9c3be5.png#averageHue=%23292f39&clientId=u84081457-0317-4&from=paste&height=286&id=ub9d2318b&name=image.png&originHeight=572&originWidth=1638&originalType=binary&ratio=2&rotation=0&showTitle=false&size=132930&status=done&style=none&taskId=ud7147155-461e-4ca4-a0ca-511a8f52116&title=&width=819)


# 自定义starter
> 开发一个记录ip访问的次数的starter

![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678172245945-ed4da3a2-d218-47ad-a03c-b1d758eea487.png#averageHue=%23272d36&clientId=u47d61bda-5680-4&from=paste&height=381&id=u8b55d675&name=image.png&originHeight=762&originWidth=2606&originalType=binary&ratio=2&rotation=0&showTitle=false&size=238458&status=done&style=none&taskId=udfa99026-f1e6-4444-a221-1a286b0aa70&title=&width=1303)![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678172266978-14040ce3-a4b9-498e-8602-fa80acdf356d.png#averageHue=%23262c35&clientId=u47d61bda-5680-4&from=paste&height=416&id=u6da8d8db&name=image.png&originHeight=832&originWidth=2624&originalType=binary&ratio=2&rotation=0&showTitle=false&size=181193&status=done&style=none&taskId=ue4453d9f-b68e-4c07-830d-4d8dd8f4e28&title=&width=1312)![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678172281352-45acc74c-2c43-41aa-b7fc-19f5b9b4e628.png#averageHue=%23272d36&clientId=u47d61bda-5680-4&from=paste&height=488&id=u1a5b6b67&name=image.png&originHeight=976&originWidth=2636&originalType=binary&ratio=2&rotation=0&showTitle=false&size=292063&status=done&style=none&taskId=u59f017af-730a-49de-8022-b79902ad80d&title=&width=1318)![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678172784505-7558d42c-8b6a-4e76-a05e-7e991e309958.png#averageHue=%23272d36&clientId=u47d61bda-5680-4&from=paste&height=364&id=u83da1985&name=image.png&originHeight=728&originWidth=2536&originalType=binary&ratio=2&rotation=0&showTitle=false&size=168905&status=done&style=none&taskId=u15b7263a-4506-41a2-934c-a5b00cbff5b&title=&width=1268)

> 注意定时任务在注解中的，在注解中获取bean的属性方法：使用EL表达式
> 使用`${}`获取配置文件中的属性的时候，如果配置文件没有配置可以在后面跟上默认值，写法：
> `${tools.ip.cycle:5}`

![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678172957634-5d06718e-2e0e-4038-8c86-4456da723c85.png#averageHue=%23272d37&clientId=u47d61bda-5680-4&from=paste&height=422&id=udf3bdc4b&name=image.png&originHeight=844&originWidth=1876&originalType=binary&ratio=2&rotation=0&showTitle=false&size=197159&status=done&style=none&taskId=u47f2de7f-dccb-4c78-9624-87a6b87f116&title=&width=938)

# 核心原理
## SpringBoot的启动流程
![image.png](https://cdn.nlark.com/yuque/0/2023/png/26314652/1678177288053-5fd491fa-d39c-4b3a-9e6b-d405e91e57ae.png#averageHue=%23fbfbfa&clientId=u47d61bda-5680-4&from=paste&height=343&id=u6df69873&name=image.png&originHeight=686&originWidth=1550&originalType=binary&ratio=2&rotation=0&showTitle=false&size=339562&status=done&style=none&taskId=u75c1d85a-53c1-494c-978a-d26e9983572&title=&width=775)