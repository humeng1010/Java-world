---
# 这是文章的标题
title: Java基础第二幕
# 这是页面的图标
# icon: file
# 这是侧边栏的顺序
order: 2

# 设置写作时间
# date: 2020-01-01
# 一个页面可以有多个分类
category:
  - Java基础
# 一个页面可以有多个标签
tag:
  - Java语法
---

::: tip
面向对象的力量
:::

## 面向对象的思想

把现实中的事物全部看成一个个的对象来解决问题，就使得代码看起来很像人的语言。

**Java中需要先定义类，才能创建对象。**

**类是相同事物共同特征的描述，对象是具体存在的实例**

## 定义类的注意事项

类名注意首字母大写，满足驼峰命名法。例如（Student ；Person；Book；Movie）

一个Java文件中可以定义多个类，但是只能有一个类是用public修饰符，而且public的修饰符的类也必须是Java文件名相同

**规范：建议一个Java文件只定义一个类**

#### 类中成分

类中可以定义的5大成分：**成员变量**，**构造器（无参，有参）**，**成员方法（getter，setter，toString...）**，代码块，内部类

```java
package com.meng;

public class Student {
    //1、成员变量
    private String name;
    private int age;

    //2、构造器 分为有参和无参构造器，如果不写构造器，在类内会默认存在一个无参构造器，如果需要写有参构造器，无参构造器会被重载，最好再把无参构造器写出来，否则可能出现new一个无参对象报错。
    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    //3、成员方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```

#### this关键字

作用：出现在成员方法，构造器中代表当前对象的地址，用于指定访问当前对象的成员变量，成员方法。

this出现在构造器或者方法中，哪个对象调用它，this就代表哪个对象。

## 面向对象:内存机制

首先准备一个汽车类

```java
package day02;

public class Car {
    //    成员变量(属性)
    String name;
    double price;

    //    方法(行为)
    public void start() {
        System.out.println(name + "启动了");
    }

    public void run() {
        System.out.println("价格是" + price + "的" + name + "跑的贼快！");
    }

}

```

学生类

```java
package day02;

public class Student {
    String name;
    char gender;
    String hobby;

    public void study() {
        System.out.println("名称:" + name + "性别:" + gender + "爱好:" + hobby + "的学生开始学习了");
    }
}

```

#### 两个对象内存分析

```java
package day02;

import day02.d1OOPArrayList.Car;

//两个对象内存分析
public class Test01 {
    public static void main(String[] args) {
        Car car1 = new Car();
        car1.name = "宝马";
        car1.price = 50.88;
        System.out.println(car1.name);
        System.out.println(car1.price);
        car1.start();
        car1.run();

        Car car2 = new Car();
        car2.name = "奔驰";
        car2.price = 60;
        System.out.println(car2.name);
        System.out.println(car2.price);
        car2.start();
        car2.run();
    }
}

```

![image-20220807093237996](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181714159.png)

1. 首先方法区加载Test.class文件以及执行main方法
2. 发现main方法中需要创建Car对象于是方法区中加载Car.class文件(成员变量、成员方法)
3. 在堆内存中开辟一块内存用于存储new Car()产生的对象(包含成员变量以及成员方法的引用地址)，再把对象的地址交给c1实例存储
4. ......

#### 两个变量指向同一个对象内存图

```java
package day02;

import day02.d1OOPArrayList.Student;

public class Test02 {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "小明";
        s1.gender = '男';
        s1.hobby = "打篮球";
        s1.study();

        Student s2 = s1;
        s2.hobby = "爱提问";
        System.out.println(s2.name);
        System.out.println(s2.gender);
        System.out.println(s1.hobby);
        s2.study();
    }
}

```

![image-20220807094538111](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181714020.png)

#### 垃圾回收

- 注意：当我们堆内存中的对象，没有被任何变量引用(指向)时，就会被判定为内存中的"垃圾"。
- Java存在自动垃圾回收器，会定期自动清理 堆内存中没人引用的对象

## 面向对象的三大特征

#### 面向对象的三大特征：封装、继承、多态。

#### 封装 标准JavaBean

封装的基本思想：合理隐藏（隐藏细节），合理暴露（提供访问入口）

封装步骤：通常将成员变量私有、提供方法进行暴露。

封装作用：提高业务功能的设计的安全性，提高组件化。

#### 特征的含义：

##### 所谓特征就是已经成为Java设计代码的特点，即使毫无意义，通常也需要满足这样的设计要求来编写代码。

#### JavaBean

##### 也可以理解为实体类，其对象可以用于在程序中封装数据。

成员变量使用private修饰，提供每一个成员变量的setter/getter方法，必须提供一个无参构造器。

```java
package com.meng;

import java.util.Arrays;

public class User {
    private String name;
    private int age;
    private String[] hobbies;
    private String mail;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String[] getHobbies() {
        return hobbies;
    }

    public void setHobbies(String[] hobbies) {
        this.hobbies = hobbies;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", hobbies=" + Arrays.toString(hobbies) +
                ", mail='" + mail + '\'' +
                '}';
    }
}

```

## 面向对象进阶

### static关键字

#### static关键字的作用，和修饰成员变量的用法

**static是静态的意思，可以修饰成员变量，表示该成员变量只在内存中存储一份，可以被共享访问、修改。**（例如在线人数）

静态成员变量（有static修饰，属于类，堆内存中加载一次）

实例成员变量（无static修饰，存在于每个对象中）

#### static修饰成员变量的内存原理

![image-20220807155545218](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181714498.png)



1. 首先user.class文件加载到方法区，加载类的同时会加载静态成员变量，因为静态成员变量属于类（加载一次，被共享访问，而且在堆内存中）。
2. 在栈内存中加载执行main方法

#### 成员方法的分类

静态成员方法：有static关键字修饰，属于类，推荐使用类名访问，也可以使用对象访问

实例成员方法：无static关键字修饰，属于对象，只能用于对象触发访问。

![image-20220807160857697](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181714739.png)



#### static的应用：工具类，工具类的案例

验证码工具静态类

```java
package com.meng;

import java.util.Random;

public class VerifyTool {
    /**
     * 静态方法
     * @param n
     * @return
     */
    public static String createCode(int n){
        //1、使用String开发一个验证码
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        //2、定义一个变量用于存储验证码
        String code = "";
        //3、循环
        Random random = new Random();
        for (int i = 0; i < n; i++) {
            int index = random.nextInt(chars.length());
            code += chars.charAt(index);
        }
        return code;
    }
}

```

测试类

```java
package com.meng;

public class Test01 {
    public static void main(String[] args) {
        //直接调用静态方法，提高代码的复用，减少代码的重复
        System.out.println(VerifyTool.createCode(4));
    }
}

```

##### 工具类原理和延伸

一次编写处处可用；

建议将工具类的构造器私有，不让工具类对外产生对象（节约内存）

```java
package com.meng;

import java.util.Random;

public class VerifyTool {


    /**
     * 私有构造器！！！！！！！！！！！！！！（建议）因为可以节约内存，详细原因见下面的思考
     */
    private VerifyTool(){

    }

    /**
     * 静态方法
     * @param n
     * @return
     */
    public static String createCode(int n){
        //1、使用String开发一个验证码
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        //2、定义一个变量用于存储验证码
        String code = "";
        //3、循环
        Random random = new Random();
        for (int i = 0; i < n; i++) {
            int index = random.nextInt(chars.length());
            code += chars.charAt(index);
        }
        return code;
    }
}

```

思考：为什么工具类中的方法不用实例方法去做？

答：实例方法需要创建对象调用，此时我们用对象仅仅只是要调用方法，这样只会浪费内存！

### static注意事项（面试常考）

静态方法（static）只能访问静态成员，不可以直接访问实例的成员

实例方法可以访问静态的成员，也可以访问实例的成员

静态方法中是不可以出现static关键字的

#### static应用知识（代码块）

##### 代码块分为：

静态代码块：

格式：static{ }

特点：需要使用static关键字修饰，**随着类的加载而加载，并且自动触发，只执行一次**

使用场景：在类的加载的时候，做一些静态数据的初始化的操作，以便后续使用。

构造代码块（了解，用的少）：

格式{ }

特点：每次创建对象，调用构造器时执行，都会执行该代码块中的代码，并且在构造器执行前执行。

使用场景：初始化实例资源。

### 设计模式（面试）

##### 设计模式、单例模式介绍、饿汉单例模式、懒汉单例模式

单例模式：可以保证系统中，应用该模式的这个类永远只有一个实例，即一个类永远只能创建一个对象。

应用场景：例如任务管理器，我们只需要一个就可以解决问题了，可以节约内存空间。

##### 饿汉单例：

在类获取对象的时候，对象已经提前为你创建好了。

###### 设计步骤：

定义一个类，把构造器私有

定义一个静态变量存储这个类的一个对象

```java
package com.meng;

/**
 * 1、定义一个单例类
 */
public class SingleInstance {

    //3、定义一个静态变量，存储一个对象即可：属于类，与类一起加载一次
    public static SingleInstance instance = new SingleInstance();


    //2、单例必须私有构造器
    private SingleInstance(){
        System.out.println("创建了一个对象");
    }

}

```

##### 懒汉单例

真正需要该对象的时候，才去创建一个对象。（延迟加载对象）

###### 设计步骤

定义一个类，把构造器私有。

定义一个静态变量，存储一个对象。

提供一个返回单例的方法。

```java
package com.meng;

/**
 * 1、懒汉单例模式
 */
public class SingleInstance2 {

    //3、定义一个静态变量,属于类，与类一起加载一次,(不能初始化对象，因为它懒）
//    public static SingleInstance2 instance;
    //把静态成员变量设为私有，防止别人调用这个啥都没有的静态变量，会坑到人的
    private static SingleInstance2 instance;

    //2、私有构造器
    private SingleInstance2(){
        System.out.println("创建了一个对象");
    }

    //3、定义一个方法，让其他地方可以调用获取一个对象
    public static SingleInstance2 getInstance(){
        //首先判断是不是已经创建了一个对象，如果没有创建（第一次）就创建一个对象给静态变量，后续就有对象了，就不会再次创建对象了，保障多次创建的是同一个对象
        if (instance == null){
            instance = new SingleInstance2();
        }

        return instance;
    }

}

```

### 继承（面向对象三大特征之一）

##### 继承的基本介绍

什么是继承？

继承就是类与类之间的关系。

多个类可以单独继承某个类（就是一个类可以被多个类继承）

多个类称为子类（派生类），单独的类称为父类（或者基类，超类）

注意：Java不存在多继承（通俗的讲就是：一个类只能有一个父类）

为什么用继承？

继承的好处：提高代码的复用性，减少代码的重复性。

![image-20220807183350757](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181715713.png)



##### 继承设计规范

子类的共同特征放到父类中定义（比如学生和老师都可以继承人类，人类中有学生和老师共有的特征：姓名，年龄，身高，体重...），子类独有的方法要放在子类中单独定义（比如老师有工资，而大部分学生没有工资）

这时候可能会有人想：如果我们把子类所有的方法和属性都定义到人类里面，那子类里面是不是就可以什么都不定义了？

如果我们把子类所有的属性方法定义到父类，那么继承自父类的其他子类都会有这些属性方法，比如老师的工资定义到父类中，而学生继承父类，那么学生也就有工资了，这不符合逻辑！

#### 继承的内存运行原理

![image-20220808075119129](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181715405.png)



#### 继承的特点

1. 子类可以继承父类的属性和行为，但是子类不能继承父类的构造器
2. Java是单继承模式：一个类只能继承一个直接父类
3. Java不支持多继承（这点和C++不一样），但是支持多层继承。
4. Java中所有的类都是Object类的子类。（Object是祖宗）

##### 子类是否可以继承父类的私有成员?

注意:是可以继承父类的私有成员的，只是不能直接访问

<img src="https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181715017.png" alt="image-20220808075839612" style="zoom:50%;" />

当我们new了一个子类构造器，在堆内存中会产生一个对象，而这个对象中是包含了父类成员空间(super)以及子类成员空间(this)，只是父类成员空间中的私有方法不能直接访问(从内存的角度来看是子类可以继承父类的所有属性和方法，只是能不能直接访问，后面我们可以通过反射暴力获取到子类对象的父类的私有方法)

##### 子类是否可以继承父类静态成员?

不能 ---> 虽然子类可以直接使用父类的静态成员(这是共享的)，共享并非继承关系，在内存中只有一份



##### 在子类方法中访问成员（成员变量、成员方法）满足：就近原则

先在子类局部范围找

然后子类成员范围找

然后父类成员范围找，如果父类范围还没有找到就会报错

##### 重写

如果父类中的方法不能够满足子类的方法，在子类中可以对父类中的方法进行重写

##### @Override重写注解

@override是放在重写后的方法上的，作为重写是否正确的校验注解。

加上该注解后如果重写错误，编译阶段会出现错误提示

建议重写方法都加上@override注解，代码安全，优雅！

##### 注意事项：

重写方法的名称、形参列表必须与被重写的方法名称和参数列表一致。

私有方法不能被重写。

子类重写父类方法时，访问权限必须大于或者等于父类

子类也不能重写父类的静态方法。

#### 子类继承父类后构造器的特点：

子类中的构造器会默认先访问父类中的无参构造器，然后再执行自己

子类构造器的第一行语句默认都是：super()，不写也存在。

## 包、权限修饰符

包是用来分门别类管理各种不同的文件的，类似于文件夹，建包有利于项目管理和维护。

package 公司域名（com）.技术名称(springboot).javabean

包名建议全部小写，且具备意义

建包语句一般在第一行，IDEA工具会自动生成创建。

导包格式：包名.类名

### 权限修饰符

控制一个对象能够被访问的范围

由小到大：private --->缺省 --->protect --->public

![image-20220808090917489](https://blog-images-1309758663.cos.ap-nanjing.myqcloud.com/202303181715674.png)



### final修饰符

含有final修饰的类不能被继承，final修饰方法，不能被重写，

final修饰变量，变量有且只能被赋值一次(基本类型 数据值不能改变，引用类型 地址值不能改变 但是内容可以改变)

变量有几种：

 局部变量；

 成员变量：

 --静态成员变量

 --实例成员变量

### 常量

常量是使用了**public static final** 修饰的成员变量，必须有初始化值，而且初始化之后不能被改变。

常量的作用和好处：可以用于做系统的配置信息，方便系统维护，同时也提高可读性。

**常量命名规范：英文单词全部大写，多个单词下划线连接起来**

这种方法在编译阶段会把常量名改为字面意思，在运行时提高一些性能。而且便于维护，改一个就可以修改全部

```java
package com.meng;

public class FinalTest {
    public static final String SCHOOL_NAME = "安徽大学";
    public static final String LOGIN_NAME = "admin";
    public static final String PASSWORD = "123456";

    public static void main(String[] args) {
        System.out.println(FinalTest.SCHOOL_NAME);
        System.out.println(LOGIN_NAME);
        System.out.println(PASSWORD);

    }

}

```

## 枚举

### 枚举的概述

枚举是Java中的一种特殊类型

枚举的作用：**做信息的标志和信息的分类**

### 枚举的格式

```java
package com.meng;

/**
 * 枚举类 enum
 */
public enum Season {
    //枚举第一列必须罗列枚举类的 对象 名称，建议全部大写
    SPRING,SUMMER,AUTUMN,WINTER;
}
/*
反编译后的class文件

 */
public final class day02.d2OOP.d5_enum.Season extends java.lang.Enum<day02.d2OOP.d5_enum.Season> {
  public static final day02.d2OOP.d5_enum.Season SPRING;
  public static final day02.d2OOP.d5_enum.Season SUMMER;
  public static final day02.d2OOP.d5_enum.Season AUTUMN;
  public static final day02.d2OOP.d5_enum.Season WINTER;
  public static day02.d2OOP.d5_enum.Season[] values();
  public static day02.d2OOP.d5_enum.Season valueOf(java.lang.String);
  static {};
}


```

### 枚举的特征：

枚举类都是继承了java.lang.Enum类

枚举类都是最终类，不能被继承

枚举类的构造器时私有的，不能对外创建对象

```java
package com.meng;


import static com.meng.Season.SUMMER;

public class Test02 {
    public static void main(String[] args) {

        Test02 test02 = new Test02();
        test02.test(SUMMER);


    }

    public void test(Season season) {
        switch (season) {
            case SPRING:
                System.out.println("万物复苏");
                break;
            case SUMMER:
                System.out.println("夏日炎炎");
                break;
            case AUTUMN:
                System.out.println("落霞与孤鹜齐飞，秋水共长天一色");
                break;
            case WINTER:
                System.out.println("冬天到了，春天的脚步近了");
                break;

        }

    }
}

```

## 抽象类

某个父类知道其所有的子类要完成某个功能，但是每个子类完成的情况不一样，父类就只定义该功能的基本要求，具体实现由子类完成，这个类就可以是一个抽象类，**抽象类其实是一种不完全的设计图**

**抽象类必须使用abstract修饰：**

修饰符 **abstract** class 类名(){}

抽象方法：就是抽象类中定义的子类中必须完成的功能的具体要求。

修饰符 abstract 返回值类型 方法名称（形参列表）；

没有方法体，只有方法签名，必须用abstract修饰。

```java
package com.meng.abstractDemo;

public abstract class Animal {
    private String name;

    public abstract void cry();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```

```java
package com.meng.abstractDemo;


public class Tiger extends Animal {

    @Override
    public void cry() {
        System.out.println("喵呜喵呜");
    }
}

```

```java
package com.meng.abstractDemo;

public class Dog extends Animal{
    @Override
    public void cry() {
        System.out.println("汪汪汪");
    }
}

```

### 抽象类特征：

**有得有失：**得到了抽象方法，失去了创建对象的能力。

**抽象类为什么不能创建对象？**因为抽象类如果能创建对象，那么我们用这个对象调用抽象类中的抽象方法，抽象方法**没有方法体**！所以抽象类不能创建对象！抽象类存在构造器而且还是公有的！因为子类继承抽象类就要首先调用抽象类的构造器，并**
不是**因为抽象类的构造器私有化而导致抽象类不能创建对象的。

类有的成员（成员变量，方法，构造器），抽象类都具备。

抽象类中不一定有抽象方法，但是有抽象方法的一定是抽象类。

一个类继承了这个抽象类，那么这个类必须重写完抽象类中的所有方法，否则这个类也应该定义成为抽象类！

不能用abstract修饰变量、代码块、构造器。

#### final和abstract是什么关系？

##### 互斥关系

## 接口Interface

什么是接口？

接口就是体现规范的，期中用抽象方法定义的一组行为规范，接口是更加彻底的抽象。

接口的定义和特点：

public interface 接口名{

//常量

//抽象方法

}

### 接口的定义：

```java
package com.meng.interfaceTest;

/**
 * 定义一个电脑接口
 */
public interface ComputerInterface {

    //JDK1.8之前接口中的成员只有 常量 和 抽象方法
//    public static final String COMPUTER_NAME = "MacBook";
    //在接口中定义的默认就是静态常量
    String COMPUTER_NAME = "MacBook";
//    public abstract 可以省略不写
    void USB();//USB接口
    void HDMI();//高清接口
    void DP();//数字式视频接口
    void type_c();//type-c接口
}

```

### 接口的实现：

接口是用来被实现的（implements）的，实现接口的类成为实现类，实现类可以理解为所谓的子类。

修饰符 class 实现类 implements 接口1,接口2,接口3...{

}

实现的关键字implements

接口可以被类单实现，也可以被类多实现。

```java
package com.meng.interfaceTest;

/**
 * 外设
 */
public class Peripherals implements ComputerInterface{

    @Override
    public void USB() {
        System.out.println("没有USB接口 -_-!");
    }

    @Override
    public void HDMI() {
        System.out.println("也没有");
    }

    @Override
    public void DP() {
        System.out.println("还是没有");
    }

    @Override
    public void type_c() {
        System.out.println("嘿嘿，有两个，一个电源线接口，另一个空着~");
    }

    public static void main(String[] args) {
        System.out.println(ComputerInterface.COMPUTER_NAME);
        Peripherals peripherals = new Peripherals();
        peripherals.USB();
        peripherals.HDMI();
        peripherals.DP();
        peripherals.type_c();
    }
}

```

### 接口可以多继承

- 规范整合，整合多个接口为同一个接口，便于子类实现

### 接口新增方法、注意事项（了解）

注意：

- **接口不能创建对象**！
- **一个类可以实现多个接口，多个接口中有同样的静态方法不冲突(原因接口的静态方法只能接口自己调用)**
- **一个类继承了父类，同时又实现接口，父类中和接口中有同名的方法，默认使用父类的**
- **一个类实现了多个接口，多个接口中存在同名的默认方法，不冲突，这个类重写该方法即可**
- **一个接口继承了多个接口，是没有问题的，如果多个接口中存在规范冲突则不能多继承**

##### JDK8开始接口新增了一些方法：

##### 默认方法

- 类似之前写的普通实例方法:必须使用default修饰
- 默认会public修饰。需要使用接口的实现类的对象来调用

##### 静态方法

- 默认会public修饰，必须用static修饰
- **接口的静态方法必须使用本身接口名来调用**

##### 私有方法

- 就是私有的实例方法；必须使用private修饰，从**JDK1.9才开始有的**
- 只能在本类中其他的默认方法或者私有方法访问

```java
package com.meng.interfaceTest;

/**
 * 定义一个电脑接口
 */
public interface ComputerInterface01 {

    //JDK1.8之前接口中的成员只有 常量 和 抽象方法
//    public static final String COMPUTER_NAME = "MacBook";
    //在接口中定义的默认就是静态常量
    //String COMPUTER_NAME = "MacBook";
//    public abstract 可以省略不写
//    void USB();//USB接口
//    void HDMI();//高清接口
//    void DP();//数字式视频接口
//    void type_c();//type-c接口

    //---------JDK1.8新增方法----------
    //1、实例方法
    // 接口不能创建对象，必须通过实现类来创建对象调用方法
    default void add(){
        System.out.println("在接口中新增一个接口的时候，会牵一发而动全身，所以用default修饰可以在接口中进行添加方法体");
    }
    //2、静态方法
    //必须使用static修饰，默认使用public
    //接口的静态方法只能用接口名自己调用
    static void add1(){
        System.out.println("Java源码自己会用到");
    }
    //3、私有方法 JDK1.9才支持的(了解即可)切换JDK模块版本：在项目结构中切换，这个语法JDK8不支持
    //必须在接口内部才能被访问
//    private void go(){
//
//    }
}
class Add implements ComputerInterface01{

}

class test{
    public static void main(String[] args) {
        Add add = new Add();
        add.add();
        ComputerInterface01.add1();
    }
}

```

## 多态（面向对象三大特征之一，重点）

### 概述、形式

##### 多态是同类型的对象，执行不同的行为，表现出不同的行为特征。

多态的常见形式：

**父类类型 对象名称 = new 子类构造器**

**接口 对象名称 = new 实现类构造器**（接口也是一种父类，可以理解为干爹）

#### 多态中成员访问的特点

**方法调用：编译看左边，运行看右边**

**变量调用：编译看左边，运行也看左边**（多态侧重行为多态）

#### 优势：

在多态的形势下右边的对象可以实现解耦合，便于扩展和维护。

比如说： Animal a = new Cat(); 如果我们有一天不想用这个猫对象，我们就可以把猫换成狗对象： Animal a = new Dog(); 。然后后续的业务行为随对象而改变，后续的代码无需修改，例如（ a.cry(); )
。解耦合在框架中非常常见，解耦合就是降低两个类之间的联系的紧密程度。

定义方法的时候，使用父类类型作为参数，该方法就可以接收这父类的一切子类对象，体现出多态的扩展与便利。

public void game（Animal animal）;这样就可以让所有的动物都被game方法接收。

##### 多态产生的一个问题：

多态情况下不能使用子类独有的功能，不过我们可以通过引用类型的转换来调用子类独有的功能。（把大类（动物类）转成小类（猫类），大转小就需要强制类型转换）

### 引用类型的转换

##### 自动类型转换：从子类到父类，子类对象赋值给父类类型的变量指向。

##### 强制类型转换：从父类到子类，子类 对象变量 = （子类）父类类型的变量

作用：可以解决多态下的劣势，实现调用子类独有的功能。

例如：Animal a = new Dog(); 因为a此时的类型是Animal，所以我们不知道 a 到底是哪一类具体的动物，如果我们想调用Dog中独有的吃骨头方法（eat），我们就需要对 a 对象进行强制类型转换：Dog d = (
Dog) a; 然后再 d.eat();才能调用子类中独有的方法

###### 至于为什么多态的父类不能调用子类的独有方法？例如：Animal a = new Dog(); 此时 a对象 的 引用类型 是 Animal动物，但是吃骨头是狗独有的行为方法，而Animal都不会吃骨头，如果用没有强转的a对象能调用到狗的吃骨头，这是不符合逻辑的。所以只能狗吃骨头，我们就得把a对象的Animal类型强转成Dog类型（Dog d = (Dog) a;)，这个时候原来的动物对象就被确认确确实实是狗，我们才可以让 d 调用吃骨头。注意强转的时候一定要复合逻辑！不能把猫转换成狗！！！Java在强制类型转换的时候有一个建议：如下

##### 建议

Java建议强转转换前使用 instanceof 判断当前对象的**真实类型**，再进行强制类型转换

变量名 **instanceof** 真实类型

判断关键字（instanceof）左边的变量**指向的对象的真实类型**，是否是右边的类型或者是其子类型，是就返回true，反之false；

```java
package com.meng.instanceofDemo;

/**
 * 定义一个抽象类的动物
 * 定义一个'叫'的方法体
 */
public abstract class Animal {
    public abstract void cry();
}

```

```java
package com.meng.instanceofDemo;

public class Cat extends Animal{
    @Override
    public void cry() {
        System.out.println("喵喵喵");
    }
    //猫独有的方法抓老鼠
    public void catchMice(){
        System.out.println("猫在抓老鼠");
    }
}

```

```java
package com.meng.instanceofDemo;

public class Dog extends Animal{
    @Override
    public void cry() {
        System.out.println("汪汪汪");
    }
    public void eat(){
        System.out.println("狗在吃骨头");
    }
}

```

```java
package com.meng.instanceofDemo;

public class Test {
    public static void main(String[] args) {
        Animal animal = new Dog();//我们以后只需要把Cat修改为Dog，就可以把猫换成狗，而且下面的什么都不用动
        animal.cry();//我们不强转成子类类型就只能调用父类中的通用方法
        test(animal);//我们调用下面的test方法对animal进行类型的判断然后调用独有的方法

    }
    public static void test(Animal animal){
        //这时候我们不能知道传进来的到底是猫是狗，所以我们需要对Animal进行判断
        if (animal instanceof Dog){
            Dog dog = (Dog) animal;
            dog.eat();
        }else if (animal instanceof Cat){
            Cat cat = (Cat) animal;
            cat.catchMice();
        }
    }
}

```

## 补充知识

### 内部类

内部类就是一个定义在一个类里面的类，里面的类可以理解成寄生，外部类可以理解成宿主。（与现实世界进行对接）

### 匿名内部类

本质上是一个没有名字的局部内部类，定义在方法中，代码块中，等。

#### 作用：

方便创建子类对象，最终的目的为了简化代码编写。

#### 格式：

Animal animal1 = new Animal() { @Override public void run() { System.out.println("老虎跑的快"); } };

#### 特点：

匿名内部类是一个**没有名字的内部类**

匿名内部类写出来就会产生一个匿名内部类的对象

相当于创建的子类对象，我们认为是什么类就是什么类，可不是动物对象！因为抽象类不能创建对象的

我们new出来的相当于Animal的子类！！！子类可以给到父类，这是多态的写法

```java
package com.meng.anonymous;

public class Test {
    public static void main(String[] args) {
        //普通写法（抽象类不能被创建对象）
        Animal animal = new Tiger();
        animal.run();

        //匿名内部类：
        //匿名内部类是一个没有名字的内部类
        //匿名内部类写出来就会产生一个匿名内部类的对象
        //相当于创建的子类对象，我们认为是什么类就是什么类，可不是动物对象！因为抽象类不能创建对象的
        //我们new出来的相当于Animal的子类！！！子类可以给到父类，这是多态的写法
        Animal animal1 = new Animal() {
            @Override
            public void run() {
                System.out.println("老虎跑的快");
            }
        };
        animal1.run();
    }
}

class Tiger extends Animal{

    @Override
    public void run() {
        System.out.println("老虎跑的快");
    }
}

abstract class Animal{
    public abstract void run();
}

```

使用形式：

```java
package com.meng.anonymous;

public class Test2 {
    public static void main(String[] args) {

        //匿名内部类：创建一个接口的子类学生对象，
        // 以后用到Lambda表达式就一行代码就ok了
        Swimming s1 = new Swimming() {
            @Override
            public void swimming() {
                System.out.println("学生在游泳");
            }
        };
        go(s1);

        Swimming s2 = new Swimming() {
            @Override
            public void swimming() {
                System.out.println("老师在游泳");
            }
        };
        go(s2);

        //我们还可以直接把匿名内部类直接作为方法的入参传送给方法
        go(new Swimming() {
            @Override
            public void swimming() {
                System.out.println("我在游泳");
            }
        });
        //Lambda表达式就一行代码就ok了,这个以后讲述
        Swimming s3 = () -> System.out.println("Lambda在游泳");
        go(s3);

        go(() -> System.out.println("Lambda在游泳!!"));
    }
    public static void go(Swimming swimming){
        System.out.println("开始...");
        swimming.swimming();
        System.out.println("结束...");
    }
}

/**
 * 定义一个接口：游泳
 */
interface Swimming{
    void swimming();
}
```

开发中不是我们主动定义匿名内部类，而是别人需要我们写或者我们可以写的时候才会使用。

匿名内部类的代码可以实现代码的进一步简化！


