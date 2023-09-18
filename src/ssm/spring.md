---
title: Spring框架
---

### Spring Framework 系统架构图

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864005202-089bfdea-b090-4181-ae0a-fece2a55c9e5.png#averageHue=%23c9cbc5&clientId=u6f4aee90-0016-4&from=paste&height=350&id=u699e691c&name=image.png&originHeight=699&originWidth=1500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=317079&status=done&style=shadow&taskId=u4a4c8319-21d8-4071-8f1d-a94592f051d&title=&width=750)

### IOC(Inversion of control)控制反转*

- 对象的创建权由程序转交给**外部**，这种思想就是控制反转
- Spring提供了一个IoC容器，来充当IoC思想的**外部**--->Core Container 核心容器
- IoC容器负责对象的创建、初始化等一系列操作，被创建或者被管理的对象在IoC容器中称为_Bean_

### DI(Dependency Injection)依赖注入

- 在容器中建立bean与bean之间的**依赖关系**的整个过程

### Bean基础配置

#### Bean别名配置(name属性)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864015117-b932040f-5cc1-41f1-9376-a6c2a17a7f26.png#averageHue=%23f6f4e4&clientId=u6f4aee90-0016-4&from=paste&height=315&id=u9fcff3cf&name=image.png&originHeight=630&originWidth=1500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=527878&status=done&style=shadow&taskId=u74623bde-fab2-4801-9ea4-22030f2d8c6&title=&width=750)

#### Bean作用范围(scope属性)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864043652-7b4bc32f-c600-4831-aeb0-90166f5b3b9d.png#averageHue=%23f0dad5&clientId=u6f4aee90-0016-4&from=paste&height=239&id=u730290ae&name=image.png&originHeight=477&originWidth=1500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=191145&status=done&style=shadow&taskId=u5109e752-f3e8-4656-b23e-eb7b20fc5fd&title=&width=750)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864049681-3ed65114-2bb1-4bcd-90f3-7a11676d222c.png#averageHue=%23fafafa&clientId=u6f4aee90-0016-4&from=paste&height=312&id=u068d4821&name=image.png&originHeight=624&originWidth=1254&originalType=binary&ratio=1&rotation=0&showTitle=false&size=243765&status=done&style=shadow&taskId=u05386e0f-23f2-416d-9353-5a7eae5fbbb&title=&width=627)

### Bean的实例化

#### 构造方法(无参构造)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864056306-adee5926-f7ee-422f-98ae-572afe463e98.png#averageHue=%23fcfae1&clientId=u6f4aee90-0016-4&from=paste&height=371&id=u29006b94&name=image.png&originHeight=742&originWidth=1500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=242075&status=done&style=shadow&taskId=u8f71871a-aa20-406b-91df-244764c9933&title=&width=750)

#### 静态工厂(factory-method)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864062055-9ee45108-f932-4de0-a87b-65e8b42ee265.png#averageHue=%23fdfcea&clientId=u6f4aee90-0016-4&from=paste&height=483&id=u5a914b68&name=image.png&originHeight=966&originWidth=2368&originalType=binary&ratio=1&rotation=0&showTitle=false&size=331184&status=done&style=shadow&taskId=uafa56a1b-808d-4069-905f-a23c5123023&title=&width=1184)

#### 实例工厂(factory-method+factory-bean)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864069019-b838a538-13f5-43f1-9329-7fdf2849c648.png#averageHue=%23fbf9e0&clientId=u6f4aee90-0016-4&from=paste&height=606&id=u16ada723&name=image.png&originHeight=1212&originWidth=2124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=399747&status=done&style=shadow&taskId=u671961d7-1785-45d4-bd26-8d5c3ed0107&title=&width=1062)

##### 实用(implements FactoryBean)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864074695-b60f7b9c-e4a1-44ad-a74c-2aa61baed8ed.png#averageHue=%23fbfae1&clientId=u6f4aee90-0016-4&from=paste&height=603&id=uda41a2de&name=image.png&originHeight=1206&originWidth=2090&originalType=binary&ratio=1&rotation=0&showTitle=false&size=392323&status=done&style=shadow&taskId=u1df35720-3511-4beb-bb8e-e5fbced0a30&title=&width=1045)

### Bean的生命周期

#### Bean的生命周期控制

##### 1(属性：init-method destory-method)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864083447-be830e5f-902e-4f30-9cc5-e572eea70c2c.png#averageHue=%23fbfbe1&clientId=u6f4aee90-0016-4&from=paste&height=519&id=u7fb0e6fa&name=image.png&originHeight=1038&originWidth=2274&originalType=binary&ratio=1&rotation=0&showTitle=false&size=875639&status=done&style=shadow&taskId=u7d0125ae-4f9d-4382-94cd-4030724a933&title=&width=1137)

##### 2(实现接口)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864089654-73425643-cbd7-4909-bc07-356024b315ab.png#averageHue=%23fbfbe0&clientId=u6f4aee90-0016-4&from=paste&height=456&id=u72e98c86&name=image.png&originHeight=912&originWidth=2320&originalType=binary&ratio=1&rotation=0&showTitle=false&size=430226&status=done&style=shadow&taskId=u0bf27ceb-cae1-4cb4-8ee2-5b63bbd8cfd&title=&width=1160)

#### Bean的生命周期

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864095449-15ade6dc-8256-44c1-bfdc-a42c3646ec06.png#averageHue=%23fbfafa&clientId=u6f4aee90-0016-4&from=paste&height=447&id=u613f585c&name=image.png&originHeight=894&originWidth=992&originalType=binary&ratio=1&rotation=0&showTitle=false&size=286414&status=done&style=shadow&taskId=ud473e77d-4e7f-4584-84bd-c06432d2e99&title=&width=496)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864103227-4f2e2299-eb90-4728-860f-4a74aa491cd5.png#averageHue=%23fbfbef&clientId=u6f4aee90-0016-4&from=paste&height=486&id=u85695f7c&name=image.png&originHeight=972&originWidth=2310&originalType=binary&ratio=1&rotation=0&showTitle=false&size=538284&status=done&style=shadow&taskId=u96766e3c-8142-4c9e-ad10-7b3a502734e&title=&width=1155)

### 依赖注入

#### 普通方法

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864117248-c3edc783-6206-4d96-8768-54816846c7ef.png#averageHue=%23fafbe1&clientId=u6f4aee90-0016-4&from=paste&height=571&id=ubbaae8c0&name=image.png&originHeight=1142&originWidth=2308&originalType=binary&ratio=1&rotation=0&showTitle=false&size=686673&status=done&style=shadow&taskId=u2b9bb664-8eaa-4a41-936c-345b5e3f7be&title=&width=1154)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864124123-8fcd9646-84ab-4f67-ac98-2756a26b1231.png#averageHue=%23fafae2&clientId=u6f4aee90-0016-4&from=paste&height=529&id=u2032f81a&name=image.png&originHeight=1058&originWidth=2296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=630473&status=done&style=shadow&taskId=u89f60853-32cb-4132-9e14-1b4cc420cae&title=&width=1148)

#### 构造方法

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864134225-362f6cd5-36af-4225-b060-7146e8064ede.png#averageHue=%23fafae0&clientId=u6f4aee90-0016-4&from=paste&height=576&id=u1ce7e1b9&name=image.png&originHeight=1152&originWidth=2240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=722355&status=done&style=shadow&taskId=u79cc3e03-8c8a-4ff1-9b8f-9795914d9e5&title=&width=1120)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864141179-3e3d3f38-e507-47f3-9bde-40dabba22a8d.png#averageHue=%23f9f9e0&clientId=u6f4aee90-0016-4&from=paste&height=488&id=u5c58f5fd&name=image.png&originHeight=976&originWidth=1994&originalType=binary&ratio=1&rotation=0&showTitle=false&size=677614&status=done&style=shadow&taskId=uc5de4253-ef86-49f5-bc0e-42f5667aec5&title=&width=997)

#### 自动装配

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864147839-750beac6-293f-4976-85c7-e2bc7b2168c9.png#averageHue=%23f5f7e1&clientId=u6f4aee90-0016-4&from=paste&height=188&id=u5b8af860&name=image.png&originHeight=376&originWidth=2206&originalType=binary&ratio=1&rotation=0&showTitle=false&size=429719&status=done&style=shadow&taskId=uaf839ab7-641e-433e-ab64-e69c1ad8b30&title=&width=1103)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864153187-24cf751d-078f-4fc1-99c2-93ee7bfe54f8.png#averageHue=%23f8f8f8&clientId=u6f4aee90-0016-4&from=paste&height=317&id=u18bc8e57&name=image.png&originHeight=634&originWidth=2076&originalType=binary&ratio=1&rotation=0&showTitle=false&size=519162&status=done&style=shadow&taskId=u8976b63b-43b1-4f22-983f-8e84a53b646&title=&width=1038)

#### 注入集合

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="com.red.dao.impl.BookDaoImpl">
        <property name="array">
            <array>
                <value>100</value>
                <value>200</value>
                <value>300</value>
            </array>
        </property>
        <property name="list">
            <list>
                <value>itit</value>
                <value>itit</value>
                <value>i11</value>
            </list>
        </property>
        <property name="set">
            <set>
                <value>hello</value>
                <value>world</value>
                <value>hello</value>
                <value>boy</value>
            </set>
        </property>
        <property name="map">
            <map>
                <entry key="con" value="cha"/>
                <entry key="con1" value="cha1"/>
                <entry key="con" value="cha1"/>
                <entry key="con22" value="cha22"/>
            </map>
        </property>
        <property name="properties">
            <props>
                <prop key="ccc">ccc</prop>
                <prop key="ccc1">ccc1</prop>
                <prop key="ccc">ccc2</prop>
                <prop key="ccc">ccc</prop>
            </props>
        </property>
    </bean>
</beans>
```

### 加载Properties文件

1.  开启context命名空间
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864161611-7cccf59a-377c-4cc8-b8fb-0bc014e3823b.png#averageHue=%23f2f0f0&clientId=u6f4aee90-0016-4&from=paste&height=875&id=ub75c6299&name=image.png&originHeight=1750&originWidth=2880&originalType=binary&ratio=1&rotation=0&showTitle=false&size=702857&status=done&style=shadow&taskId=u0891e2f7-bfe4-4a17-81ed-4cb6b9c7521&title=&width=1440) 
2.  使用context空间加载properties文件
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864167852-b31e35e6-eee7-4734-963b-e0e125781cd2.png#averageHue=%23f3f2f2&clientId=u6f4aee90-0016-4&from=paste&height=875&id=u725437ff&name=image.png&originHeight=1750&originWidth=2880&originalType=binary&ratio=1&rotation=0&showTitle=false&size=710290&status=done&style=shadow&taskId=u0027f38f-a456-4429-90db-a95af1db561&title=&width=1440) 
3.  使用属性占位符${}读取properties中的属性
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864173043-2bb9667f-99fa-4393-bebf-29ddd748105b.png#averageHue=%23f5f3f3&clientId=u6f4aee90-0016-4&from=paste&height=875&id=u749f3485&name=image.png&originHeight=1750&originWidth=2880&originalType=binary&ratio=1&rotation=0&showTitle=false&size=649778&status=done&style=shadow&taskId=u48cf9f6a-96d9-4e83-8b01-4b2286ef866&title=&width=1440) 

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864179110-3957f3a3-e0e5-440f-817f-73adb9ded5b7.png#averageHue=%23f9fae1&clientId=u6f4aee90-0016-4&from=paste&height=578&id=uad67c12e&name=image.png&originHeight=1156&originWidth=2248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=798285&status=done&style=shadow&taskId=u3da66745-64ae-4059-a589-6cc58abf52d&title=&width=1124)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864190230-3e8262fd-9880-4248-ab5c-99b6c6fc8b12.png#averageHue=%23f7f6df&clientId=u6f4aee90-0016-4&from=paste&height=513&id=u78b53b8d&name=image.png&originHeight=1026&originWidth=2276&originalType=binary&ratio=1&rotation=0&showTitle=false&size=877438&status=done&style=shadow&taskId=u1e9f931e-80cb-49ce-a034-576c676a2ed&title=&width=1138)

### 容器总结

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864198462-0b059d62-71da-45d8-90aa-514290c4e56a.png#averageHue=%23f9f9f1&clientId=u6f4aee90-0016-4&from=paste&height=375&id=u853e9d81&name=image.png&originHeight=750&originWidth=1978&originalType=binary&ratio=1&rotation=0&showTitle=false&size=506700&status=done&style=shadow&taskId=u86fd5d43-af76-44dd-a692-435b74bfdcc&title=&width=989)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864203880-693c2825-1495-4bd1-84b7-b2deb0731c12.png#averageHue=%23eff1da&clientId=u6f4aee90-0016-4&from=paste&height=358&id=u8e330f59&name=image.png&originHeight=716&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=279315&status=done&style=shadow&taskId=u3bd01925-7718-481d-963b-90268e5cce1&title=&width=793)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864208679-6f0a0b01-c7a9-490d-8fd3-6c44a68ce5a3.png#averageHue=%23f0efd8&clientId=u6f4aee90-0016-4&from=paste&height=520&id=uf9614881&name=image.png&originHeight=1040&originWidth=2302&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1189962&status=done&style=shadow&taskId=u7a231618-4d9b-431c-8bc1-78b35848f3c&title=&width=1151)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864212013-92732bf7-7c71-40b6-b6c6-9643faa5dcb2.png#averageHue=%23fafaef&clientId=u6f4aee90-0016-4&from=paste&height=353&id=ubfa257aa&name=image.png&originHeight=706&originWidth=1888&originalType=binary&ratio=1&rotation=0&showTitle=false&size=409026&status=done&style=shadow&taskId=u49f84053-3ee7-465a-b4a6-47437dfdd6a&title=&width=944)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864215937-a2d5de31-9ec8-497c-948d-e2cc78689239.png#averageHue=%23fbfadf&clientId=u6f4aee90-0016-4&from=paste&height=559&id=u545a1bba&name=image.png&originHeight=1118&originWidth=2312&originalType=binary&ratio=1&rotation=0&showTitle=false&size=777199&status=done&style=shadow&taskId=uaa19ea7e-b604-4b74-879d-c12ef99d88c&title=&width=1156)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864220497-fbf718b3-cd2c-435d-98f0-3be685fbd300.png#averageHue=%23fbfadf&clientId=u6f4aee90-0016-4&from=paste&height=660&id=u172ae971&name=image.png&originHeight=1320&originWidth=2254&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1145209&status=done&style=shadow&taskId=u2594b180-2c7f-4aea-a312-a10f2975d77&title=&width=1127)

### 注解开发*

#### 注解开发定义bean

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864224756-b6924f6b-eeaa-4df5-b15c-55236a65e222.png#averageHue=%23faf9e0&clientId=u6f4aee90-0016-4&from=paste&height=469&id=u6f79d43e&name=image.png&originHeight=938&originWidth=2082&originalType=binary&ratio=1&rotation=0&showTitle=false&size=462391&status=done&style=shadow&taskId=u52f40d22-d3b2-417f-b95c-064b511cbf2&title=&width=1041)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864227977-f0ad4093-7dc2-4230-962b-be1780101672.png#averageHue=%23fcfbee&clientId=u6f4aee90-0016-4&from=paste&height=424&id=u487ae0be&name=image.png&originHeight=848&originWidth=2004&originalType=binary&ratio=1&rotation=0&showTitle=false&size=395151&status=done&style=shadow&taskId=uc0a017f9-8794-4860-ad1d-683a4137618&title=&width=1002)

#### 纯注解开发

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864231088-ebd8f8e8-b918-40bb-afa1-b009a53ddcf4.png#averageHue=%23f8f8e0&clientId=u6f4aee90-0016-4&from=paste&height=539&id=u19f029c9&name=image.png&originHeight=1078&originWidth=2304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=699061&status=done&style=shadow&taskId=ue85351e7-aa9a-4d29-9ff3-6c722d1daa3&title=&width=1152)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864235372-acdd97eb-1b7b-4250-bf14-59e8ff029719.png#averageHue=%23f8f8ec&clientId=u6f4aee90-0016-4&from=paste&height=323&id=u245b46bb&name=image.png&originHeight=646&originWidth=2158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=549534&status=done&style=shadow&taskId=u6e477897-b25e-43bc-ad6c-0ffa5e0b8f1&title=&width=1079)

#### bean作用范围与生命周期管理

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864238299-4678c80c-a341-407e-b431-7e6d1de2b820.png#averageHue=%23fcfbee&clientId=u6f4aee90-0016-4&from=paste&height=281&id=ue4fe5546&name=image.png&originHeight=562&originWidth=1790&originalType=binary&ratio=1&rotation=0&showTitle=false&size=203703&status=done&style=shadow&taskId=u761045ec-4904-4579-a4a6-abbce62876b&title=&width=895)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864241176-20147a8d-8e21-4560-aaf7-5fb11b1f511b.png#averageHue=%23fcfce1&clientId=u6f4aee90-0016-4&from=paste&height=646&id=u97146431&name=image.png&originHeight=1292&originWidth=2164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=885939&status=done&style=shadow&taskId=ud1cfac47-e1b1-4b76-ad09-7a3535002d9&title=&width=1082)

#### 依赖注入

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864245187-8a6d5e34-4b42-4ae9-a8a2-26b3d86bf105.png#averageHue=%23fafadf&clientId=u6f4aee90-0016-4&from=paste&height=641&id=u8e79e1ab&name=image.png&originHeight=1282&originWidth=2348&originalType=binary&ratio=1&rotation=0&showTitle=false&size=800200&status=done&style=shadow&taskId=ub52a4786-db1f-428d-902f-4d370c52395&title=&width=1174)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864248389-ba7844a0-e3cd-4d1e-91c2-bd8a3ec11cab.png#averageHue=%23fafae0&clientId=u6f4aee90-0016-4&from=paste&height=322&id=uadc235bb&name=image.png&originHeight=644&originWidth=2010&originalType=binary&ratio=1&rotation=0&showTitle=false&size=502870&status=done&style=shadow&taskId=u007ee217-b170-4655-b8ac-c53c665c085&title=&width=1005)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864251449-4466a574-5af1-4e50-b60b-1ed46bef48e1.png#averageHue=%23fafae3&clientId=u6f4aee90-0016-4&from=paste&height=254&id=u2f444f39&name=image.png&originHeight=508&originWidth=1566&originalType=binary&ratio=1&rotation=0&showTitle=false&size=196455&status=done&style=shadow&taskId=u5597c4f1-f657-4548-8e16-ae19ad656e2&title=&width=783)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864255370-5a7868af-9d99-4101-b380-2b38aaa031d9.png#averageHue=%23f9f9df&clientId=u6f4aee90-0016-4&from=paste&height=261&id=ud5a12c77&name=image.png&originHeight=522&originWidth=2004&originalType=binary&ratio=1&rotation=0&showTitle=false&size=515626&status=done&style=shadow&taskId=u27dc7ec3-134f-4bef-8ace-32c48543d57&title=&width=1002)

#### 第三方Bean管理

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864258365-d7449cef-d083-450d-928b-a157d52c98f9.png#averageHue=%23fbfbdf&clientId=u6f4aee90-0016-4&from=paste&height=510&id=u2f7166bf&name=image.png&originHeight=1020&originWidth=1886&originalType=binary&ratio=1&rotation=0&showTitle=false&size=497907&status=done&style=shadow&taskId=u0e43f601-66a4-422a-b7f4-c34dba6e50d&title=&width=943)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864261681-3413286c-b035-4af9-a7d7-6cd4d4bff4a0.png#averageHue=%23fbfbe1&clientId=u6f4aee90-0016-4&from=paste&height=560&id=u28b95791&name=image.png&originHeight=1120&originWidth=2272&originalType=binary&ratio=1&rotation=0&showTitle=false&size=462232&status=done&style=shadow&taskId=ub19412c4-3ce6-4862-b332-b0f9920188a&title=&width=1136)

#### 第三方bean依赖注入
注意需要在主配置类上引入这个第三方配置类`@Import(JdbcConfig.class)`并且
引入properties文件`@PropertySource("classpath:jdbc.properties")`

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864265229-776d8b49-c3f5-4f74-acdc-fd380a2558e1.png#averageHue=%23fafadf&clientId=u6f4aee90-0016-4&from=paste&height=513&id=uea52dc1c&name=image.png&originHeight=1026&originWidth=1896&originalType=binary&ratio=1&rotation=0&showTitle=false&size=608632&status=done&style=shadow&taskId=ue3d12027-0c48-42cf-9724-67592ba799c&title=&width=948)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864268045-4ff7ec11-e564-4ce9-9c32-331994e9f427.png#averageHue=%23f9f9df&clientId=u6f4aee90-0016-4&from=paste&height=379&id=u908515f4&name=image.png&originHeight=758&originWidth=2060&originalType=binary&ratio=1&rotation=0&showTitle=false&size=397735&status=done&style=shadow&taskId=ud7254ded-11cd-4785-92a5-02962cf7b35&title=&width=1030)

#### 注解开发总结

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864272900-3dcb5c18-607a-4a71-a52f-b401a1840b79.png#averageHue=%23eff1f1&clientId=u6f4aee90-0016-4&from=paste&height=584&id=uc88b7bfd&name=image.png&originHeight=1168&originWidth=2306&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1354265&status=done&style=shadow&taskId=ua8d4d1db-64e1-4667-88c9-bd70883d648&title=&width=1153)

### Spring整合MyBatis

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864283869-b0ebf7c4-6ab2-4a32-b936-d73e371dc526.png#averageHue=%23f8f4cb&clientId=u6f4aee90-0016-4&from=paste&height=558&id=uf12787fc&name=image.png&originHeight=1116&originWidth=2386&originalType=binary&ratio=1&rotation=0&showTitle=false&size=885921&status=done&style=shadow&taskId=uc271f05b-3c28-412e-a4e8-07efee73289&title=&width=1193)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864287053-24911edf-a428-49d1-b247-8ea5c432f165.png#averageHue=%23fafae0&clientId=u6f4aee90-0016-4&from=paste&height=527&id=u325f0183&name=image.png&originHeight=1054&originWidth=2372&originalType=binary&ratio=1&rotation=0&showTitle=false&size=762009&status=done&style=shadow&taskId=u2898f8ec-a195-4c6c-a6b0-c46e3a822c2&title=&width=1186)
#### 补充
```java
package com.red.dao;

import com.red.pojo.Book;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface BookDao {
    /**
     * 如果查询参数返回值的名称与实体类的属性名称不匹配，可以使用注解定义映射关系
     *
     */
    @Results(id = "bookResultMap",value = {
            @Result(column = "name",property = "name"),
            @Result(column = "description",property = "description")
    })
    @Insert("insert into tbl_book (type, name, description) values (#{type},#{name},#{description});")
    void save(Book book);
    @Update("update tbl_book set type = #{type}, name = #{name}, description = #{description} where id = #{id} ;")
    void update(Book book);
    @Delete("delete from tbl_book where id = #{id};")
    void delete(Integer id);
    //使用ResultMap定义返回值映射类型
    @ResultMap("bookResultMap")
    @Select("select * from tbl_book where id = #{id};")
    Book getById(Integer id);
    @ResultMap("bookResultMap")
    @Select("select * from tbl_book;")
    List<Book> getAll();
}

```

### Spring整合Junit

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864289715-ed14d60b-9933-4175-8ec3-bc4cbf2947f1.png#averageHue=%23fbfce2&clientId=u6f4aee90-0016-4&from=paste&height=481&id=u7f7c9592&name=image.png&originHeight=962&originWidth=2034&originalType=binary&ratio=1&rotation=0&showTitle=false&size=412801&status=done&style=shadow&taskId=u574851b8-2d74-4008-a8ac-7bad62c84bc&title=&width=1017)

### AOP

![](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208180906970.png#id=aZrBK&originHeight=562&originWidth=2042&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864294066-5956d1b0-354a-485c-abb2-405a61d997a7.png#averageHue=%23f8fbf6&clientId=u6f4aee90-0016-4&from=paste&height=647&id=u4df96fe4&name=image.png&originHeight=1294&originWidth=2474&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2048473&status=done&style=shadow&taskId=ue51377c6-0ae5-4a6a-9a85-c5e699a77d6&title=&width=1237)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864299263-e02db258-9a5b-451c-a00e-3e5d68a964b4.png#averageHue=%23d4d3ce&clientId=u6f4aee90-0016-4&from=paste&height=524&id=ubebd5056&name=image.png&originHeight=1048&originWidth=2302&originalType=binary&ratio=1&rotation=0&showTitle=false&size=884093&status=done&style=shadow&taskId=u2669d40a-9828-48dc-bd1e-3ff6d4e5387&title=&width=1151)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864302923-eac0c09c-65c8-4d60-9bdf-6f038e6fbccc.png#averageHue=%23edecea&clientId=u6f4aee90-0016-4&from=paste&height=512&id=u85765739&name=image.png&originHeight=1024&originWidth=2066&originalType=binary&ratio=1&rotation=0&showTitle=false&size=702350&status=done&style=shadow&taskId=u3d8cda35-4e00-4aaa-b538-91142a1100f&title=&width=1033)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864305996-e51f583b-cd62-41d6-8dd7-8bb8bd99664b.png#averageHue=%23f9f8e4&clientId=u6f4aee90-0016-4&from=paste&height=547&id=u8899344c&name=image.png&originHeight=1094&originWidth=2110&originalType=binary&ratio=1&rotation=0&showTitle=false&size=976568&status=done&style=shadow&taskId=ubee9a7bd-3549-4a07-a6d1-8e02cbb4f96&title=&width=1055)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864308678-3c1b8c7e-af6a-4684-badd-e1a871f7821a.png#averageHue=%23fbfbe1&clientId=u6f4aee90-0016-4&from=paste&height=454&id=uc55c46cd&name=image.png&originHeight=908&originWidth=2132&originalType=binary&ratio=1&rotation=0&showTitle=false&size=465525&status=done&style=shadow&taskId=u845f8d72-476e-4351-967d-df33f7d9c18&title=&width=1066)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864311389-4ee8271d-f67d-443c-9962-7bb671c55da4.png#averageHue=%23fbfbe2&clientId=u6f4aee90-0016-4&from=paste&height=266&id=u6dc14813&name=image.png&originHeight=532&originWidth=2162&originalType=binary&ratio=1&rotation=0&showTitle=false&size=328916&status=done&style=shadow&taskId=ucbf43ddd-907e-41c7-a04d-7e0321aab9e&title=&width=1081)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864314553-416b0c73-3463-455b-8882-56ef6daa7fb3.png#averageHue=%23fafae2&clientId=u6f4aee90-0016-4&from=paste&height=283&id=uc1011b81&name=image.png&originHeight=566&originWidth=2126&originalType=binary&ratio=1&rotation=0&showTitle=false&size=275178&status=done&style=shadow&taskId=u9cea028f-7ba4-457f-b67c-5cdb4deebfb&title=&width=1063)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864316849-d2fb75cb-4fe2-46a7-b0bf-deb50b31dddc.png#averageHue=%23fbfbe0&clientId=u6f4aee90-0016-4&from=paste&height=397&id=u020bf2d4&name=image.png&originHeight=794&originWidth=1994&originalType=binary&ratio=1&rotation=0&showTitle=false&size=413726&status=done&style=shadow&taskId=u00a59e6b-72b9-4e74-839b-acd5a16bd0f&title=&width=997)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864320216-7f127e8f-0bb1-4e60-a87d-6cc5695b33a0.png#averageHue=%23fbfbe1&clientId=u6f4aee90-0016-4&from=paste&height=455&id=u5f4aef60&name=image.png&originHeight=910&originWidth=2156&originalType=binary&ratio=1&rotation=0&showTitle=false&size=645104&status=done&style=shadow&taskId=ua9a04589-2ddc-4d37-a279-11decf23a32&title=&width=1078)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864322906-79b28edc-7a06-4de2-8931-227900a68400.png#averageHue=%23fbfae2&clientId=u6f4aee90-0016-4&from=paste&height=336&id=u9548ad66&name=image.png&originHeight=672&originWidth=1878&originalType=binary&ratio=1&rotation=0&showTitle=false&size=343652&status=done&style=shadow&taskId=u1a35cdc6-6909-4982-a346-cf9f8b24fb0&title=&width=939)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864326450-2715bcc1-b500-4f8f-af4b-78b318cbf037.png#averageHue=%23fcfbe0&clientId=u6f4aee90-0016-4&from=paste&height=652&id=uf4eb67fa&name=image.png&originHeight=1304&originWidth=2098&originalType=binary&ratio=1&rotation=0&showTitle=false&size=573356&status=done&style=shadow&taskId=u641aa805-4005-4d3d-9bb9-e7375d351a6&title=&width=1049)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864329226-6478c0a1-db20-45cf-9d06-8770eabceede.png#averageHue=%23f0efec&clientId=u6f4aee90-0016-4&from=paste&height=421&id=ua007e088&name=image.png&originHeight=842&originWidth=2204&originalType=binary&ratio=1&rotation=0&showTitle=false&size=770589&status=done&style=shadow&taskId=ue613a190-e6ad-468b-9d35-96ca57897ab&title=&width=1102)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864332059-c6587511-ed88-4994-bd35-a281bc9d9f97.png#averageHue=%23e3e2df&clientId=u6f4aee90-0016-4&from=paste&height=199&id=u57784b9c&name=image.png&originHeight=398&originWidth=2062&originalType=binary&ratio=1&rotation=0&showTitle=false&size=432143&status=done&style=shadow&taskId=uf88b4c80-b761-4bcf-bbf4-9d2e48c95f1&title=&width=1031)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864334973-061797bc-58d9-457b-9156-d2c3d821e39f.png#averageHue=%23f5f6e2&clientId=u6f4aee90-0016-4&from=paste&height=562&id=u077dac89&name=image.png&originHeight=1124&originWidth=2328&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1163871&status=done&style=shadow&taskId=ufc2f4892-9070-42d4-915f-390767219ca&title=&width=1164)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864338404-89a15061-a5e4-49d6-9e50-b57777b7e1b3.png#averageHue=%23fbf8f6&clientId=u6f4aee90-0016-4&from=paste&height=478&id=u3e7aa355&name=image.png&originHeight=956&originWidth=2230&originalType=binary&ratio=1&rotation=0&showTitle=false&size=635496&status=done&style=shadow&taskId=u818af247-8078-479e-9e86-db697cfad8a&title=&width=1115)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864342075-45818557-d27d-4b4e-9d17-5ecdbccf210a.png#averageHue=%23f0f2e0&clientId=u6f4aee90-0016-4&from=paste&height=491&id=u194e1fd7&name=image.png&originHeight=982&originWidth=2164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1057183&status=done&style=shadow&taskId=ud688ddc3-6ccc-401e-9a08-10e94a95a09&title=&width=1082)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864344701-5430763c-b9f5-4705-ad3b-af179bc5684a.png#averageHue=%23e9e9e6&clientId=u6f4aee90-0016-4&from=paste&height=405&id=ueec526b2&name=image.png&originHeight=810&originWidth=1906&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1035822&status=done&style=shadow&taskId=uca88bc56-14ed-4b8b-9149-211507717e8&title=&width=953)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864347611-53c2c777-2a3d-4cbb-b30a-1764bf069b51.png#averageHue=%23efeeec&clientId=u6f4aee90-0016-4&from=paste&height=447&id=u82c1a757&name=image.png&originHeight=894&originWidth=2104&originalType=binary&ratio=1&rotation=0&showTitle=false&size=602467&status=done&style=shadow&taskId=u0149823e-3299-4833-91a2-7303483bf6d&title=&width=1052)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864350122-b218097a-c5b7-48cb-b231-8385aa417ef7.png#averageHue=%23f8f8e2&clientId=u6f4aee90-0016-4&from=paste&height=408&id=u88333189&name=image.png&originHeight=816&originWidth=2182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=642613&status=done&style=shadow&taskId=u0ed0dab2-d25a-43bc-8dd5-3d024a92907&title=&width=1091)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864354457-89f100f4-b34c-4446-be9a-202e56c09d95.png#averageHue=%23fcfcf3&clientId=u6f4aee90-0016-4&from=paste&height=442&id=u3a4b3025&name=image.png&originHeight=884&originWidth=2254&originalType=binary&ratio=1&rotation=0&showTitle=false&size=455312&status=done&style=shadow&taskId=u923fb486-414e-4a31-913b-e46231a800e&title=&width=1127)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864357468-592a9ac9-1961-4b37-ab77-e665c3ce5567.png#averageHue=%23fbfbee&clientId=u6f4aee90-0016-4&from=paste&height=461&id=u11c73f12&name=image.png&originHeight=922&originWidth=2316&originalType=binary&ratio=1&rotation=0&showTitle=false&size=548661&status=done&style=shadow&taskId=u7bf3d7b5-421a-4d3c-92be-51e4eda2913&title=&width=1158)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864367910-e6c8cf0d-3f9f-4288-afe1-4f183d400964.png#averageHue=%23f6f6df&clientId=u6f4aee90-0016-4&from=paste&height=487&id=u52299979&name=image.png&originHeight=974&originWidth=2296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1310719&status=done&style=shadow&taskId=uda92d15f-ac9e-4ff5-9970-51612a0fba6&title=&width=1148)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864370864-93b247e2-f533-414c-b012-562c1a06088f.png#averageHue=%23fbfbf2&clientId=u6f4aee90-0016-4&from=paste&height=418&id=u61805763&name=image.png&originHeight=836&originWidth=2226&originalType=binary&ratio=1&rotation=0&showTitle=false&size=517423&status=done&style=shadow&taskId=u5392005b-8cd6-433f-8acb-4521611f89b&title=&width=1113)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864373478-f1b3a55b-53cd-4f0a-be1c-0bdf0d2222b7.png#averageHue=%23fbfbf1&clientId=u6f4aee90-0016-4&from=paste&height=400&id=ue50244ab&name=image.png&originHeight=800&originWidth=2134&originalType=binary&ratio=1&rotation=0&showTitle=false&size=521689&status=done&style=shadow&taskId=u5fda9b1b-dbfc-4c9b-a899-f283f467e5c&title=&width=1067)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864376246-d2217f61-14f4-4b1e-badb-e8f52719318a.png#averageHue=%23f0efec&clientId=u6f4aee90-0016-4&from=paste&height=328&id=uf1ce97ec&name=image.png&originHeight=656&originWidth=2138&originalType=binary&ratio=1&rotation=0&showTitle=false&size=558580&status=done&style=shadow&taskId=u742f5832-19f4-4717-88e0-09e1f458f3a&title=&width=1069)

引入依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>spring_21_case_interface_run_speed</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.20</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.3.17</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.8</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.3.2</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.3.20</version>
        </dependency>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.9.7</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
        </dependency>
    </dependencies>
</project>
```

pojo

```java
package com.red.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    private Integer id;
    private String name;
    private Double money;
}
```

config

```java
package com.red.config;

import org.springframework.context.annotation.*;

@Configuration
@PropertySource("classpath:jdbc.properties")
@ComponentScan("com.red")
@Import({JdbcConfig.class, MybatisConfig.class})
@EnableAspectJAutoProxy
public class SpringConfig {
    
}
```

```java
package com.red.config;


import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

public class JdbcConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setDriverClassName(driver);
        druidDataSource.setUrl(url);
        druidDataSource.setUsername(username);
        druidDataSource.setPassword(password);
        return druidDataSource;
    }
}
```

```java
package com.red.config;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

public class MybatisConfig {

    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setTypeAliasesPackage("com.red.pojo");
        sqlSessionFactoryBean.setDataSource(dataSource);
        return sqlSessionFactoryBean;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("com.red.dao");
        return mapperScannerConfigurer;
    }
}
```

service

```java
package com.red.service;

import com.red.pojo.Account;

import java.util.List;

public interface AccountService {
    void save(Account account);

    void delete(Integer id);

    void update(Account account);

    List<Account> findAll();

    Account findById(Integer id);
}
```

```java
package com.red.service.impl;

import com.red.dao.AccountDao;
import com.red.pojo.Account;
import com.red.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountDao accountDao;

    @Override
    public void save(Account account) {
        accountDao.save(account);
    }

    @Override
    public void delete(Integer id) {
        accountDao.delete(id);
    }

    @Override
    public void update(Account account) {
        accountDao.update(account);
    }

    @Override
    public List<Account> findAll() {
        return accountDao.findAll();
    }

    @Override
    public Account findById(Integer id) {
        return accountDao.findById(id);
    }
}
```

aop

```java
package com.red.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ProjectAdvice {
    /**
     * 匹配业务层的所有方法
     */
    @Pointcut("execution(* com.red.service.*Service.*(..))")
    private void servicePt() {
    }

    @Around("servicePt()")
    public void runSpeed(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Signature signature = proceedingJoinPoint.getSignature();
        String className = signature.getDeclaringTypeName();
        String methodName = signature.getName();
        
        long beforeTime = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) {
            proceedingJoinPoint.proceed();
        }
        long afterTime = System.currentTimeMillis();
        long time = afterTime - beforeTime;
        System.out.println("万次执行" + className + "." + methodName + "方法耗时" + time + "ms");
    }
}
```

test

```java
package com.red.service;


import com.red.config.SpringConfig;
import com.red.pojo.Account;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @Test
    public void testFindById() {
        Account account = accountService.findById(1);
//        System.out.println(account);
    }

    @Test
    public void testFindAll() {
        List<Account> accounts = accountService.findAll();
//        System.out.println(accounts);
    }
}
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864388470-067d439c-32f4-493f-895f-7205432e0a40.png#averageHue=%23f9f9df&clientId=u6f4aee90-0016-4&from=paste&height=581&id=u6e0f9aad&name=image.png&originHeight=1162&originWidth=2200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=871374&status=done&style=shadow&taskId=u1e0ef1b2-d615-4712-9345-271b404e23c&title=&width=1100)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864392644-d656e24a-8865-4b49-bea6-fbcd3a3dbbc2.png#averageHue=%23f8f8de&clientId=u6f4aee90-0016-4&from=paste&height=599&id=ua2ff3fff&name=image.png&originHeight=1198&originWidth=2050&originalType=binary&ratio=1&rotation=0&showTitle=false&size=748151&status=done&style=shadow&taskId=ubb0071c9-7035-4870-93c1-b17e7071c60&title=&width=1025)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864395729-9c5c3132-770c-481b-aa10-283cf0f51090.png#averageHue=%23f8f7df&clientId=u6f4aee90-0016-4&from=paste&height=521&id=uaf49bab1&name=image.png&originHeight=1042&originWidth=1950&originalType=binary&ratio=1&rotation=0&showTitle=false&size=921908&status=done&style=shadow&taskId=uafa2da3a-b6af-4f2a-ad61-be412d6327a&title=&width=975)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864398558-18928c46-676c-4603-a3e9-71b9b383a4f3.png#averageHue=%23fbfbe0&clientId=u6f4aee90-0016-4&from=paste&height=654&id=udcacce6c&name=image.png&originHeight=1308&originWidth=2336&originalType=binary&ratio=1&rotation=0&showTitle=false&size=516980&status=done&style=shadow&taskId=uba692b0f-32ea-4307-8a9b-1044dc3b472&title=&width=1168)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864401704-10f7cdb8-e094-4acf-ae50-8a9eadd9ee90.png#averageHue=%23fafadf&clientId=u6f4aee90-0016-4&from=paste&height=525&id=u437de62c&name=image.png&originHeight=1050&originWidth=2224&originalType=binary&ratio=1&rotation=0&showTitle=false&size=770623&status=done&style=shadow&taskId=u784ed25a-93bf-4845-abf3-5053af128ba&title=&width=1112)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864405427-c2259892-e196-4422-9837-9fc8438c2b4d.png#averageHue=%23faf7f7&clientId=u6f4aee90-0016-4&from=paste&height=467&id=ufd79db92&name=image.png&originHeight=934&originWidth=2046&originalType=binary&ratio=1&rotation=0&showTitle=false&size=729233&status=done&style=shadow&taskId=ub94712e8-129a-4ab3-8231-1d35c76f865&title=&width=1023)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864408532-acaab9b6-f35c-484b-91aa-470b2655fb7b.png#averageHue=%23fbf7f7&clientId=u6f4aee90-0016-4&from=paste&height=286&id=u9dc2f7fa&name=image.png&originHeight=572&originWidth=2124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=419053&status=done&style=shadow&taskId=udf9c2572-272e-4ad8-b939-406af135258&title=&width=1062)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864411395-8be97030-de58-4511-8c91-88852da8c586.png#averageHue=%23fcfafa&clientId=u6f4aee90-0016-4&from=paste&height=467&id=u5ac422a7&name=image.png&originHeight=934&originWidth=2066&originalType=binary&ratio=1&rotation=0&showTitle=false&size=418484&status=done&style=shadow&taskId=uf23eb0dd-4022-4f66-b5b3-5825f87a1ba&title=&width=1033)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864416126-8e6ceb1f-8b1f-476e-a07b-5aa82218afee.png#averageHue=%23fcfafa&clientId=u6f4aee90-0016-4&from=paste&height=467&id=u0d13c22d&name=image.png&originHeight=934&originWidth=2066&originalType=binary&ratio=1&rotation=0&showTitle=false&size=418484&status=done&style=shadow&taskId=uad3ccd69-0d7f-48ba-8b83-9ab8b737a84&title=&width=1033)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864419924-a585efb4-c50b-4526-8990-2d27050d51d0.png#averageHue=%23fcfaf9&clientId=u6f4aee90-0016-4&from=paste&height=391&id=u4aa5bbb5&name=image.png&originHeight=782&originWidth=1954&originalType=binary&ratio=1&rotation=0&showTitle=false&size=380586&status=done&style=shadow&taskId=uf9669e78-5cf3-4334-b504-5f1c2e1f96f&title=&width=977)

### Spring事务
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864424134-d319f0d7-b059-4f63-80bc-76dcc98b68dc.png#averageHue=%23fbfaed&clientId=u6f4aee90-0016-4&from=paste&height=525&id=ufa3a47d3&name=image.png&originHeight=1050&originWidth=2296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=593295&status=done&style=shadow&taskId=u772c0681-3b78-4827-b037-313f8242af6&title=&width=1148)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864431872-6932ed7c-fe43-4c80-a32f-0198a05d45d2.png#averageHue=%23fbf8f1&clientId=u6f4aee90-0016-4&from=paste&height=562&id=u0fe336ee&name=image.png&originHeight=1124&originWidth=2288&originalType=binary&ratio=1&rotation=0&showTitle=false&size=617146&status=done&style=shadow&taskId=ub506768e-e37d-4257-a3fc-c22a913b263&title=&width=1144)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864437861-6496d295-b57a-4756-959f-b0be38799387.png#averageHue=%23f8f8e2&clientId=u6f4aee90-0016-4&from=paste&height=493&id=u575a0f81&name=image.png&originHeight=986&originWidth=2284&originalType=binary&ratio=1&rotation=0&showTitle=false&size=699149&status=done&style=shadow&taskId=u2c4af733-b147-4458-8e1f-1e8d09338de&title=&width=1142)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864441577-9b0f6f21-f330-4ed2-98dd-8ccd44eb601a.png#averageHue=%23fcf9e8&clientId=u6f4aee90-0016-4&from=paste&height=359&id=u09748bad&name=image.png&originHeight=718&originWidth=2154&originalType=binary&ratio=1&rotation=0&showTitle=false&size=341416&status=done&style=shadow&taskId=u5e96d97c-44a3-470c-9b84-4fa96323b63&title=&width=1077)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864448967-2c6626cc-2c84-447d-b883-c35fdd5acd21.png#averageHue=%23e8dbda&clientId=u6f4aee90-0016-4&from=paste&height=593&id=uc34224ed&name=image.png&originHeight=1186&originWidth=2248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=705241&status=done&style=shadow&taskId=u54bc806c-c675-454f-8bb3-408ff11baa4&title=&width=1124)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864452905-c2eee293-175e-4296-b5c9-2d62787c3924.png#averageHue=%23f9f9e0&clientId=u6f4aee90-0016-4&from=paste&height=508&id=ue099afd8&name=image.png&originHeight=1016&originWidth=2358&originalType=binary&ratio=1&rotation=0&showTitle=false&size=634127&status=done&style=shadow&taskId=ucb90dbde-ad10-42cf-a272-4a459aeee06&title=&width=1179)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1660864456766-3b743c42-1579-447d-81d8-bd88097596eb.png#averageHue=%23e7dddc&clientId=u6f4aee90-0016-4&from=paste&height=632&id=u77f56867&name=image.png&originHeight=1264&originWidth=2252&originalType=binary&ratio=1&rotation=0&showTitle=false&size=542047&status=done&style=shadow&taskId=u483d806a-c196-4c2c-afe4-833fb340d55&title=&width=1126)
> 事务管理员负责协调所有对数据库的操作，并确保事务的原子性。默认情况下，在该事务中的所有数据库操作都是由事务协调员管理的，要么同时成功，要么同时失败。
> 但是，如果方法上配置了@Transactional(propagation = Propagation.REQUIRES_NEW)注解，则该事务协调员将不再加入事务管理员的管理，而是自己成为事务管理员，拥有自己的事务协调。这意味着该方法中的数据库操作将不会受到外部事务的影响，并且可以独立回滚。
> 所以上面的转账案例需要在转账业务方法上单独配置@Transactional(propagation = Propagation.REQUIRES_NEW)注解注解。

