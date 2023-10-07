---
title: SpringBoot开发实用篇
category: 
- SpringBoot
tag: 
- SpringBoot
---

# 热部署
## 手工启动热部署
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154208355-4413e620-7829-4c88-80a8-e64926c933ac.png#clientId=u7695c302-8ba5-4&from=paste&height=291&id=uaa0ff1f4&name=image.png&originHeight=582&originWidth=2198&originalType=binary&ratio=1&rotation=0&showTitle=false&size=262111&status=done&style=none&taskId=ubcd1e96c-fb19-4168-a79d-5cb3d3e1f2e&title=&width=1099)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154297375-e8b94820-363c-4696-a226-2962ac9f1ee2.png#clientId=u7695c302-8ba5-4&from=paste&height=156&id=u53a55a3d&name=image.png&originHeight=312&originWidth=1968&originalType=binary&ratio=1&rotation=0&showTitle=false&size=187893&status=done&style=none&taskId=u2328ca28-cb53-45f5-9ebc-ae88240c2ae&title=&width=984)

## 自动启动热部署
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154493073-6e5eecc1-1a76-4143-b920-cd55cf928b06.png#clientId=u7695c302-8ba5-4&from=paste&height=519&id=ue686c2d9&name=image.png&originHeight=1038&originWidth=1714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=643776&status=done&style=none&taskId=u19b55372-fecb-487e-9bfd-b675bd9834a&title=&width=857)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154500542-b054d498-9ee8-4414-aa6d-c14ebea910a3.png#clientId=u7695c302-8ba5-4&from=paste&height=226&id=ue6adffaf&name=image.png&originHeight=452&originWidth=1372&originalType=binary&ratio=1&rotation=0&showTitle=false&size=196615&status=done&style=none&taskId=ua7069be8-06bf-45eb-94cb-c81e108651b&title=&width=686)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154573976-14506113-8094-4609-9315-a05180c564ca.png#clientId=u7695c302-8ba5-4&from=paste&height=513&id=u218bc01b&name=image.png&originHeight=1026&originWidth=1604&originalType=binary&ratio=1&rotation=0&showTitle=false&size=450351&status=done&style=none&taskId=uef73ce35-13db-471e-82d3-cd902aa186e&title=&width=802)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154585001-949e6dad-51af-4a22-9413-063b7d086291.png#clientId=u7695c302-8ba5-4&from=paste&height=68&id=u3cee6f41&name=image.png&originHeight=136&originWidth=1014&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63737&status=done&style=none&taskId=u32dbd111-4420-4a2c-9df4-e4a4c405610&title=&width=507)
## 热部署范围配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154891119-84faca4c-5420-48d3-b783-873626e66db0.png#clientId=u7695c302-8ba5-4&from=paste&height=283&id=u70ddeb5f&name=image.png&originHeight=566&originWidth=936&originalType=binary&ratio=1&rotation=0&showTitle=false&size=142190&status=done&style=none&taskId=u1cbc9b94-9758-4510-9e05-0d9c8c24b67&title=&width=468)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661154911664-4a1c3911-50b6-43e8-aa3c-22dfe8b3f178.png#clientId=u7695c302-8ba5-4&from=paste&height=166&id=u47ade8ad&name=image.png&originHeight=332&originWidth=2184&originalType=binary&ratio=1&rotation=0&showTitle=false&size=106892&status=done&style=none&taskId=u3cdd8992-3334-4d88-a1e2-9bbd1010ac7&title=&width=1092)
## 禁用热部署
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661155170922-6905c635-a6ac-4811-9d44-a9fbc8a20961.png#clientId=u7695c302-8ba5-4&from=paste&height=214&id=ue35cf96e&name=image.png&originHeight=428&originWidth=2036&originalType=binary&ratio=1&rotation=0&showTitle=false&size=253861&status=done&style=none&taskId=uc3f924df-7936-4a8f-b0bc-c6bb1b5de91&title=&width=1018)
# 第三方Bean属性绑定@ConfigurationProperties
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661155868728-08509076-d304-406a-9133-485bdd3e7b74.png#clientId=ubc4b8139-cdd8-4&from=paste&height=457&id=u80349f97&name=image.png&originHeight=914&originWidth=2204&originalType=binary&ratio=1&rotation=0&showTitle=false&size=397057&status=done&style=none&taskId=u400d11cb-5952-4c42-a488-f80980d6ab7&title=&width=1102)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661156212358-83b96ec9-5503-4326-80e8-34caabac70ad.png#clientId=ubc4b8139-cdd8-4&from=paste&height=559&id=ucb564c72&name=image.png&originHeight=1118&originWidth=2266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=482647&status=done&style=none&taskId=ud12d811c-49de-475f-9ea9-a3d62ec308c&title=&width=1133)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661156251066-a2e0f114-062a-4dbc-8d7c-78e75afb144a.png#clientId=ubc4b8139-cdd8-4&from=paste&height=277&id=u4e10ef8f&name=image.png&originHeight=554&originWidth=2072&originalType=binary&ratio=1&rotation=0&showTitle=false&size=317646&status=done&style=none&taskId=u43ca547f-e05f-461b-9a6a-1b266800969&title=&width=1036)
# 松散绑定(宽松绑定)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661157520233-fd6d00e6-d598-4e4e-9a1c-2c3ddd588fd9.png#clientId=ubc4b8139-cdd8-4&from=paste&height=485&id=u6bf59340&name=image.png&originHeight=970&originWidth=2268&originalType=binary&ratio=1&rotation=0&showTitle=false&size=527025&status=done&style=none&taskId=u7eaecfd4-6009-4291-bb11-85543c85eef&title=&width=1134)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661157546206-a042649d-0570-42e4-b63a-4bc7da1e72fe.png#clientId=ubc4b8139-cdd8-4&from=paste&height=120&id=u8e602147&name=image.png&originHeight=240&originWidth=2144&originalType=binary&ratio=1&rotation=0&showTitle=false&size=120618&status=done&style=none&taskId=u55868e1e-61ce-4a7c-bb0b-ef68a2c6b50&title=&width=1072)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661157921070-af3f5df4-5f9f-400f-84ff-ea06559f9ba1.png#clientId=ubc4b8139-cdd8-4&from=paste&height=505&id=u3e6d34be&name=image.png&originHeight=1010&originWidth=2252&originalType=binary&ratio=1&rotation=0&showTitle=false&size=392401&status=done&style=none&taskId=u8641d66d-0ff9-4d37-bdbe-d2fb256ed63&title=&width=1126)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661158209760-f2a286d5-b59c-4fe8-9721-f9e9d616a4e2.png#clientId=ubc4b8139-cdd8-4&from=paste&height=875&id=u72135a6b&name=image.png&originHeight=1750&originWidth=2880&originalType=binary&ratio=1&rotation=0&showTitle=false&size=762517&status=done&style=none&taskId=u699354a8-8b2e-4ff9-b60f-c5228890c62&title=&width=1440)
# 计量单位的应用
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661158629221-454ab921-67c2-4843-a575-9324c4fea899.png#clientId=ubc4b8139-cdd8-4&from=paste&height=457&id=ubf5910f2&name=image.png&originHeight=914&originWidth=2204&originalType=binary&ratio=1&rotation=0&showTitle=false&size=725769&status=done&style=none&taskId=uf3023c7d-5b75-42db-915b-ec462e373dc&title=&width=1102)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661158906983-01dc87a7-8250-4f19-885f-4734c8f1972a.png#clientId=ubc4b8139-cdd8-4&from=paste&height=467&id=u1c0800af&name=image.png&originHeight=934&originWidth=2196&originalType=binary&ratio=1&rotation=0&showTitle=false&size=454893&status=done&style=none&taskId=u64d0c7e9-e08a-482f-8cfd-a8afd04eb5f&title=&width=1098)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661158926500-4cd92783-6939-45fc-9189-59d20d48a29b.png#clientId=ubc4b8139-cdd8-4&from=paste&height=512&id=u450bb9e4&name=image.png&originHeight=1024&originWidth=2150&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1143303&status=done&style=none&taskId=u5e5cd7a8-476c-409d-873b-658b3e94e99&title=&width=1075)
# bean属性校验
## 数据校验
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661159921714-a71e367c-df49-4656-baba-be1d3275ec60.png#clientId=ubc4b8139-cdd8-4&from=paste&height=364&id=u6bec6631&name=image.png&originHeight=728&originWidth=2178&originalType=binary&ratio=1&rotation=0&showTitle=false&size=385960&status=done&style=none&taskId=u1ac99a81-0943-49c3-8580-54aa04dbf15&title=&width=1089)
```xml
        <!--1.导入JSR303规范-->
        <dependency>
            <groupId>javax.validation</groupId>
            <artifactId>validation-api</artifactId>
        </dependency>
        <!--使用hibernate框架提供的校验器做实现类-->
        <dependency>
            <groupId>org.hibernate.validator</groupId>
            <artifactId>hibernate-validator</artifactId>
        </dependency>
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661159964303-33f747b2-8ddb-462c-b9b2-994c5affcaab.png#clientId=ubc4b8139-cdd8-4&from=paste&height=274&id=u4e1f55aa&name=image.png&originHeight=548&originWidth=1884&originalType=binary&ratio=1&rotation=0&showTitle=false&size=179865&status=done&style=none&taskId=u09f6d11a-230e-4336-b206-d28efeeba27&title=&width=942)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661159978718-00e40a02-11b9-42f4-b923-0b5094cd8966.png#clientId=ubc4b8139-cdd8-4&from=paste&height=329&id=u49ef719f&name=image.png&originHeight=658&originWidth=2144&originalType=binary&ratio=1&rotation=0&showTitle=false&size=256326&status=done&style=none&taskId=u5cbbcbc8-043d-47aa-a7b7-31e845d24a7&title=&width=1072)
```java
package com.red.server;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DataSizeUnit;
import org.springframework.boot.convert.DurationUnit;
import org.springframework.stereotype.Component;
import org.springframework.util.unit.DataSize;
import org.springframework.util.unit.DataUnit;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

//@Component
@Data
@ConfigurationProperties(prefix = "servers")
@Validated
public class ServerConfig {
    private String ipAddress;
    @Max(value = 8888,message = "最大值不能超过8888")
    @Min(value = 202,message = "最小值不能低于202")
    private String port;
    private Long timeout;
    @DurationUnit(ChronoUnit.HOURS)
    private Duration serverTimeOut;
//    @DataSizeUnit(DataUnit.MEGABYTES)
    private DataSize dataSize;
}

```
## 一个注意点
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661160309246-bff72036-b4fd-422b-bef6-ad3ac14b9937.png#clientId=ubc4b8139-cdd8-4&from=paste&height=121&id=ue37150c2&name=image.png&originHeight=242&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&size=167586&status=done&style=none&taskId=u843c1371-6c3b-4d52-99e0-9131f9a3d85&title=&width=700)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661160389631-4840b36a-c6ed-416f-a69e-f4607c7af423.png#clientId=ubc4b8139-cdd8-4&from=paste&height=405&id=u71ac5d66&name=image.png&originHeight=810&originWidth=2170&originalType=binary&ratio=1&rotation=0&showTitle=false&size=784741&status=done&style=none&taskId=u22acf554-47ff-4e49-9500-6826122bdb2&title=&width=1085)
# 测试
## 加载测试专用属性
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661161071668-7a3286bd-af49-4934-b972-e94846767b6b.png#clientId=ubc4b8139-cdd8-4&from=paste&height=446&id=uca44836f&name=image.png&originHeight=892&originWidth=2194&originalType=binary&ratio=1&rotation=0&showTitle=false&size=458164&status=done&style=none&taskId=ued372c43-b498-49bc-99d2-5c7eacc84f4&title=&width=1097)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661161132557-1ac71b77-37fc-44e0-9487-cbdb0cbecf64.png#clientId=ubc4b8139-cdd8-4&from=paste&height=392&id=uef959b9e&name=image.png&originHeight=784&originWidth=2232&originalType=binary&ratio=1&rotation=0&showTitle=false&size=370182&status=done&style=none&taskId=uf77c7ab9-4403-44ff-a03d-c1870047f46&title=&width=1116)
## 加载测试专用配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661214520935-584c1fed-52a6-4605-8ce9-34eae6282984.png#clientId=u6f63784d-fbab-4&from=paste&height=418&id=u5f77e5d3&name=image.png&originHeight=836&originWidth=2184&originalType=binary&ratio=1&rotation=0&showTitle=false&size=482427&status=done&style=none&taskId=uc0701a4e-a0aa-4d7a-bc40-04acda8678b&title=&width=1092)
## 测试类中启动web环境
### web环境模拟测试
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661214930093-494d7304-661e-4b54-b480-00967731102b.png#clientId=u6f63784d-fbab-4&from=paste&height=479&id=u95357f28&name=image.png&originHeight=958&originWidth=2278&originalType=binary&ratio=1&rotation=0&showTitle=false&size=594333&status=done&style=none&taskId=u827f67a5-5385-4105-9030-1523938c593&title=&width=1139)
### 发送虚拟请求
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661215420675-19b8f131-4b80-4c54-b7b9-86a6ba46636b.png#clientId=u6f63784d-fbab-4&from=paste&height=509&id=uafe42c09&name=image.png&originHeight=1018&originWidth=2226&originalType=binary&ratio=1&rotation=0&showTitle=false&size=556684&status=done&style=none&taskId=u13d22ce9-83fe-453d-ace8-4b0c11b3308&title=&width=1113)
### 请求状态匹配
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661215784891-ce3160fd-2781-4aa7-9e7d-c04c7b84e0dd.png#clientId=u6f63784d-fbab-4&from=paste&height=463&id=u33586b7f&name=image.png&originHeight=926&originWidth=2164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=594180&status=done&style=none&taskId=u888b0a23-3928-4020-a637-1dd7b7ed2bb&title=&width=1082)
### 请求体匹配
#### 字符串
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661215944349-6734480a-cca4-4c00-b435-52cf6aa373d9.png#clientId=u6f63784d-fbab-4&from=paste&height=477&id=u08d93c39&name=image.png&originHeight=954&originWidth=2184&originalType=binary&ratio=1&rotation=0&showTitle=false&size=593370&status=done&style=none&taskId=u03620f82-0eea-41ff-8087-08185c0e83c&title=&width=1092)
#### json匹配
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661216156409-161e4a86-a737-4834-9119-de313feb548b.png#clientId=u6f63784d-fbab-4&from=paste&height=476&id=ud8131bd7&name=image.png&originHeight=952&originWidth=2194&originalType=binary&ratio=1&rotation=0&showTitle=false&size=648102&status=done&style=none&taskId=u8c74446e-695e-496c-9c9f-072789f4505&title=&width=1097)
### 请求头匹配
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661216244091-91454a6d-90dd-425d-ad0d-8bedb8a94580.png#clientId=u6f63784d-fbab-4&from=paste&height=371&id=uc312de41&name=image.png&originHeight=742&originWidth=2192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=481366&status=done&style=none&taskId=u3abc4bc7-6a7f-491b-8841-1c24c92cbd8&title=&width=1096)
### 业务层测试数据回滚
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661216626503-86750253-c560-418e-a362-cbc76e5208fc.png#clientId=u6f63784d-fbab-4&from=paste&height=496&id=ucec2fdb5&name=image.png&originHeight=992&originWidth=2210&originalType=binary&ratio=1&rotation=0&showTitle=false&size=463556&status=done&style=none&taskId=uc90c4eda-8667-4f90-9c63-91c59c61525&title=&width=1105)
### 测试用例设置随机值
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661217009681-a5666512-8eb0-4582-8f35-a97a6a658d69.png#clientId=u6f63784d-fbab-4&from=paste&height=493&id=u8eda12db&name=image.png&originHeight=986&originWidth=2180&originalType=binary&ratio=1&rotation=0&showTitle=false&size=683293&status=done&style=none&taskId=u1da47e44-e061-48a6-a8e0-dec9047b255&title=&width=1090)
# 内置数据源
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661217177940-9b564e2e-ac26-4757-9f82-f4d11cb88987.png#clientId=u6f63784d-fbab-4&from=paste&height=289&id=u334ab83f&name=image.png&originHeight=578&originWidth=2036&originalType=binary&ratio=1&rotation=0&showTitle=false&size=303500&status=done&style=none&taskId=u4a44c1da-6577-44ef-966e-4e753ea3e85&title=&width=1018)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661217253900-93f71e7c-1638-44dd-b92a-ca3fe2b2ff62.png#clientId=u6f63784d-fbab-4&from=paste&height=545&id=uf36c61fa&name=image.png&originHeight=1090&originWidth=2192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=553145&status=done&style=none&taskId=u1e7f2361-1bb5-4bd7-bcd2-c7a4476c289&title=&width=1096)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661218632543-ba0533b5-42b7-4a16-a7bc-cb013fac068d.png#clientId=u6f63784d-fbab-4&from=paste&height=407&id=ua0853241&name=image.png&originHeight=814&originWidth=2172&originalType=binary&ratio=1&rotation=0&showTitle=false&size=349003&status=done&style=none&taskId=u2054aa14-cab6-4373-ad37-0bc731813fa&title=&width=1086)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661218690401-9f15b85c-9a05-405b-a288-94f6a67347c2.png#clientId=u6f63784d-fbab-4&from=paste&height=554&id=uac81dff4&name=image.png&originHeight=1108&originWidth=2270&originalType=binary&ratio=1&rotation=0&showTitle=false&size=791283&status=done&style=none&taskId=u47904200-e652-4732-b462-4180e188da5&title=&width=1135)
# Jdbc Template
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661218825722-2f24dcbe-61d9-4533-9423-a313c4258989.png#clientId=u6f63784d-fbab-4&from=paste&height=314&id=u034523bf&name=image.png&originHeight=628&originWidth=2190&originalType=binary&ratio=1&rotation=0&showTitle=false&size=270011&status=done&style=none&taskId=u2c1e65a0-726e-498e-9534-7c190427847&title=&width=1095)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661218839533-3fb2e007-b451-4c6f-9502-23a2244d99a3.png#clientId=u6f63784d-fbab-4&from=paste&height=598&id=ufff8109d&name=image.png&originHeight=1196&originWidth=2322&originalType=binary&ratio=1&rotation=0&showTitle=false&size=827030&status=done&style=none&taskId=u7ed27374-0cbd-46d7-9e7b-cdae070d403&title=&width=1161)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661219345571-f4527d7a-cbbe-4f30-ac06-4bcca7fd7d51.png#clientId=u6f63784d-fbab-4&from=paste&height=525&id=uc364b016&name=image.png&originHeight=1050&originWidth=2156&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1069748&status=done&style=none&taskId=ua44f7356-670e-4f8f-9ab5-c78080cf924&title=&width=1078)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661219379386-abc9024a-acfd-4fb6-a294-3c15593cb329.png#clientId=u6f63784d-fbab-4&from=paste&height=203&id=u9856b110&name=image.png&originHeight=406&originWidth=2180&originalType=binary&ratio=1&rotation=0&showTitle=false&size=205187&status=done&style=none&taskId=u48a985f2-6ef3-43d6-be90-fa121cca55d&title=&width=1090)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661219390529-f0978862-b674-4f55-9769-61dde284e9d8.png#clientId=u6f63784d-fbab-4&from=paste&height=306&id=uf5313569&name=image.png&originHeight=612&originWidth=2162&originalType=binary&ratio=1&rotation=0&showTitle=false&size=167796&status=done&style=none&taskId=u79e2c14b-a798-4da8-81b1-d3f5aecb658&title=&width=1081)
# 内嵌数据库
## SQL
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661219475368-0bb4c596-e775-4724-bea7-5468510f56a2.png#clientId=u6f63784d-fbab-4&from=paste&height=164&id=u8aaea44e&name=image.png&originHeight=328&originWidth=1632&originalType=binary&ratio=1&rotation=0&showTitle=false&size=133185&status=done&style=none&taskId=u3bbbfbbb-d82e-4a90-bbaa-f548297f5da&title=&width=816)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661219574342-8049f0ad-6f4b-4ffa-91be-e967378635b6.png#clientId=u6f63784d-fbab-4&from=paste&height=439&id=u3597a463&name=image.png&originHeight=878&originWidth=2176&originalType=binary&ratio=1&rotation=0&showTitle=false&size=566432&status=done&style=none&taskId=ubdecd816-a059-42f7-8907-19188f79e48&title=&width=1088)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661219702933-15cc1f66-e686-46f6-8bf1-b0c11fb3c13e.png#clientId=u6f63784d-fbab-4&from=paste&height=381&id=u0d2678af&name=image.png&originHeight=762&originWidth=2162&originalType=binary&ratio=1&rotation=0&showTitle=false&size=213467&status=done&style=none&taskId=ue77752d5-c049-4dd1-b16b-8b7559cc869&title=&width=1081)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661220014554-6ce32397-ce9e-43ef-9b07-574ce1623cb2.png#clientId=u6f63784d-fbab-4&from=paste&height=462&id=ue5f2fc0f&name=image.png&originHeight=924&originWidth=2208&originalType=binary&ratio=1&rotation=0&showTitle=false&size=407763&status=done&style=none&taskId=u9c0737c2-8c70-4a83-bb5f-ac1301dea49&title=&width=1104)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661220070708-856dcd11-bc47-4f6f-b7bf-69db45a6821d.png#clientId=u6f63784d-fbab-4&from=paste&height=321&id=ueeb9e7fb&name=image.png&originHeight=642&originWidth=1902&originalType=binary&ratio=1&rotation=0&showTitle=false&size=189009&status=done&style=none&taskId=u7ab3f440-eaab-4b95-b550-e709f9d9780&title=&width=951)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661220165810-1190b221-0fe1-44e3-bc2b-ebf757a24ae4.png#clientId=u6f63784d-fbab-4&from=paste&height=469&id=u909f68d7&name=image.png&originHeight=938&originWidth=2190&originalType=binary&ratio=1&rotation=0&showTitle=false&size=579272&status=done&style=none&taskId=ue4d349ee-4329-4692-85a9-7ec1685a4e0&title=&width=1095)
## NoSQL
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661220375718-62158ce3-8bad-4a07-8812-aa538fe33b37.png#clientId=u6f63784d-fbab-4&from=paste&height=248&id=u57ed9d47&name=image.png&originHeight=496&originWidth=2230&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157239&status=done&style=none&taskId=u41a78f46-ac78-4b2f-9ec9-993cc62ba84&title=&width=1115)
### Redis
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661220442461-116bd03f-c5ac-4d2d-a353-b99fe5cb4c52.png#clientId=u6f63784d-fbab-4&from=paste&height=285&id=uf6c317c9&name=image.png&originHeight=570&originWidth=1832&originalType=binary&ratio=1&rotation=0&showTitle=false&size=322156&status=done&style=none&taskId=u444a71fb-b822-4920-8a82-23bee41b1ee&title=&width=916)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661221153082-6b1aebd8-d4db-46a0-be25-d44fedaad031.png#clientId=u6f63784d-fbab-4&from=paste&height=253&id=u14753986&name=image.png&originHeight=506&originWidth=2150&originalType=binary&ratio=1&rotation=0&showTitle=false&size=199821&status=done&style=none&taskId=u895b7606-0ac8-4410-88ce-4d528d115ae&title=&width=1075)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661221169372-f19efb04-c904-4778-8173-3a9ed33ec5b8.png#clientId=u6f63784d-fbab-4&from=paste&height=542&id=u84665b4c&name=image.png&originHeight=1084&originWidth=1460&originalType=binary&ratio=1&rotation=0&showTitle=false&size=168960&status=done&style=none&taskId=u22421243-0428-447a-9caf-75b49d2d944&title=&width=730)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661221183316-9cac8857-a58b-45b5-8750-189d0b50aead.png#clientId=u6f63784d-fbab-4&from=paste&height=542&id=udbe607d1&name=image.png&originHeight=1084&originWidth=1460&originalType=binary&ratio=1&rotation=0&showTitle=false&size=139468&status=done&style=none&taskId=uc17829d5-e78f-4fae-920e-88df6754f18&title=&width=730)
#### SpringBoot整合Redis
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661222462747-35741b2a-ecf6-4e61-921d-4677b9fce0dc.png#clientId=u905bb36c-43ea-4&from=paste&height=221&id=u39ed8155&name=image.png&originHeight=442&originWidth=2136&originalType=binary&ratio=1&rotation=0&showTitle=false&size=239389&status=done&style=none&taskId=ud9a8af68-fd77-48d7-bd25-1dfcce32edb&title=&width=1068)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661222449116-04ed37bd-c1d3-4bea-b958-4d26124e1ab7.png#clientId=u905bb36c-43ea-4&from=paste&height=306&id=uf88f2f26&name=image.png&originHeight=612&originWidth=2234&originalType=binary&ratio=1&rotation=0&showTitle=false&size=175238&status=done&style=none&taskId=u19266fd4-e0e7-4962-aa19-0f01218aaaf&title=&width=1117)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661222498940-23bd40ad-2f96-4228-bcf6-060be4ba6cf0.png#clientId=u905bb36c-43ea-4&from=paste&height=360&id=u1e5dc5dd&name=image.png&originHeight=720&originWidth=1772&originalType=binary&ratio=1&rotation=0&showTitle=false&size=628317&status=done&style=none&taskId=u408144b7-be56-4c79-a581-64abe2f07f1&title=&width=886)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661222509301-39aae5df-2543-4927-8c83-cad77127f8b1.png#clientId=u905bb36c-43ea-4&from=paste&height=514&id=ud570c2b1&name=image.png&originHeight=1028&originWidth=2190&originalType=binary&ratio=1&rotation=0&showTitle=false&size=362591&status=done&style=none&taskId=u1ef877da-6aff-4612-a09f-b75c880a769&title=&width=1095)![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661222540578-2bedbfc4-013a-4fcc-a796-c6d18bb294b6.png#clientId=u905bb36c-43ea-4&from=paste&height=507&id=u9ee00f51&name=image.png&originHeight=1014&originWidth=2180&originalType=binary&ratio=1&rotation=0&showTitle=false&size=571560&status=done&style=none&taskId=u010d2202-930b-459d-a8ae-db788c7dd16&title=&width=1090)
```java
package com.red;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import javax.annotation.Resource;

@SpringBootTest
class Springboot06RedisApplicationTests {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void testSet(){
        ValueOperations ops = redisTemplate.opsForValue();
        ops.set("age",41);
    }

    @Test
    void testGet(){
        ValueOperations ops = redisTemplate.opsForValue();
        Object age = ops.get("age");
        System.out.println(age);
    }
    @Test
    void testHSet(){
        HashOperations ops = redisTemplate.opsForHash();
        ops.put("info","a","aa");
    }
    @Test
    void testHGet(){
        HashOperations ops = redisTemplate.opsForHash();
        Object age = ops.get("info","a");
        System.out.println(age);
    }

    @Test
    void contextLoads() {
    }

}

```
通过上面的操作我们发现了一些问题，比如我们想要用这个测试案例操作我们客户端中存储的数据，却发现我们取不到数据，这是为什么呢?

- 因为我们客户端中存储的key-value都是字符串，我们创建RedisTemplate对象的时候发现后面需要传递泛型，不传递则是Object对象类型的，以对象类型进行操作，所以我们可以使用StringRedisTemplate对象操作客户端中存入的数据

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661223391727-70ce856d-ebeb-4b15-992d-558691e5c910.png#clientId=u905bb36c-43ea-4&from=paste&height=414&id=u04a03a98&name=image.png&originHeight=828&originWidth=2184&originalType=binary&ratio=1&rotation=0&showTitle=false&size=579193&status=done&style=none&taskId=uc48292a8-6634-4d76-a9f7-b0764eab732&title=&width=1092)
#### SpringBoot读取Redis客户端
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661223409552-415ee16e-99b4-45a5-9f9b-40c3979c9744.png#clientId=u905bb36c-43ea-4&from=paste&height=418&id=u091a97d9&name=image.png&originHeight=836&originWidth=2148&originalType=binary&ratio=1&rotation=0&showTitle=false&size=608304&status=done&style=none&taskId=u2fa7dbda-b376-401c-b9ed-644e3c87f1a&title=&width=1074)
```java
package com.red;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
public class StringRedisTemplateTest {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    @Autowired
    private RedisTemplate<String,String> redisTemplate;
    @Test
    void testStrGet(){
        //使用StringRedisTemplate
        ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
        String name = ops.get("name");
        System.out.println(name);

        //或者指定RedisTemplate的泛型
        ValueOperations<String, String> ops1 = redisTemplate.opsForValue();
        String name1 = ops1.get("name");
        System.out.println(name1);

        System.out.println(name==name1);//false

    }
}

```
#### 客户端选择jedis(SpringBoot默认lettuce)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661224077192-8a9baf04-3064-4aa3-a603-3df49b611205.png#clientId=u905bb36c-43ea-4&from=paste&height=228&id=uece7d343&name=image.png&originHeight=456&originWidth=2164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=165767&status=done&style=none&taskId=u02710da6-3f39-4a94-9d6a-aea3bbf7319&title=&width=1082)
```xml
 <!--    SpringBoot操作客户端默认是lettuce, 我们可以选择使用jedis    -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
        </dependency>
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661224121904-e99fb031-850c-4749-96b4-ba8d30f0089f.png#clientId=u905bb36c-43ea-4&from=paste&height=455&id=u318cd245&name=image.png&originHeight=910&originWidth=2182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=220941&status=done&style=none&taskId=udb04eeb1-952e-46e2-bf0c-3bcfc5748d2&title=&width=1091)
```yaml
spring:
  redis:
    host: localhost
    port: 6379
    client-type: jedis
    jedis:
      pool:
        max-active: 16
    lettuce:
      pool:
        max-active: 16

```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26314652/1661224207576-5f762606-2ff3-4578-86e2-abe7d998024b.png#clientId=u905bb36c-43ea-4&from=paste&height=237&id=ub1166d8d&name=image.png&originHeight=474&originWidth=2252&originalType=binary&ratio=1&rotation=0&showTitle=false&size=511144&status=done&style=none&taskId=u8a1b7722-721e-4a48-b5b3-95d0475fe3f&title=&width=1126)
