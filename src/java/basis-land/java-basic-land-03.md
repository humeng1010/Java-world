---
# 这是文章的标题
title: Java基础第三幕
# 这是页面的图标
# icon: file
# 这是侧边栏的顺序
order: 3

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
常用API的魔力
:::

## String类

String类定义的变量可以存储字符串，同时String类提供了很多操作字符串的功能，我们可以直接使用

### 不同方式定义字符串的内存原理

![image-20220807110326351](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208071103474.png)

![image-20220807110534539](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208071105574.png)



1. String类常见的面试题

   1. 下面代码运行的结果是？

      ```java
      package com.meng;
      import java.lang.String;
      
      public class StringDemo01 {
          public static void main(String[] args) {
              //通过这种方法创建了两个对象，一个是在字符串常量池中的"abc"，还有一个是在堆内存中new出来的s1。其中s1是在堆内存中的
              String s1 = new String("abc");
      
              //这句代码实际上创建了0个对象！ 因为字符串常量池中已经有"abc"，所以s2并没有在字符串常量池中再创建一个同样的"abc"对象
              String s2 = "abc";
      
              System.out.println(s1 == s2);//s1是在堆内存中的，s2是在字符串常量池中的，
              System.out.println(s1.equals(s2));// ==号比较的实际上是地址
              // （equals若没有重写，比较的其实也是地址，重写equals是为了让它比较内容是否一样,equals在Object里面被重写了，所以s1.equals(s2)为true）
                                         //因为s1和s2的地址不同，所以是false！
          }
      }
      
      ```

      ```java
      package com.meng;
      
      public class StringDemo02 {
          public static void main(String[] args) {
              String s1 = "abc";//字符串常量池
              String s2 = "ab";//字符串常量池
              String s3 = s2 + "c";//运算得到的结果是放在 堆内存 中的
            //这个为什么没有在编译时进行优化呢？因为s2是一个变量，只有在运行时s2才能确定时“ab”
              System.out.println(s1 == s3);//地址不一样，false
          }
      }
      
      ```

      ```java
      package com.meng;
      
      public class StringDemo03 {
          public static void main(String[] args) {
              String s1 = "abc";//字符串常量池
              String s2 = "a"+"b"+"c";//字符串常量池
              //Java存在编译优化机制，也就是在编译时（值是确定的，就是"abc"）会把 "a"+"b"+"c" 直接转为 "abc" ，在运行时常量池中就只有一个对象"abc" （可以通过class文件中查看到）
              System.out.println(s1 == s2);//true
          }
      }
      
      //把class文件反编译后，如下
      
      //
      // Source code recreated from a .class file by IntelliJ IDEA
      // (powered by FernFlower decompiler)
      //
      
      package com.meng;
      
      public class StringDemo03 {
          public StringDemo03() {
          }
      
          public static void main(String[] args) {
              String s1 = "abc";
              String s2 = "abc";//运行时s2就已经是abc，说明编译时进行了编译优化
              System.out.println(s1 == s2);
          }
      }
      
      
      ```

2. 字符串内容比较（equals）

   ```java
   package com.meng;
   
   import java.util.Scanner;
   
   public class StringEqualsDemo04 {
       public static void main(String[] args) {
           //正确的用户名和密码
           String OkName = "admin";//常量池
           String OkPassword = "123456";//常量池
   
           //提示用户输入
           Scanner scanner = new Scanner(System.in);
           System.out.println("username：");
           String name = scanner.next();//用户输入过来的不是以双引号接收的，是放在堆内存中的
           System.out.println("password：");
           String password = scanner.next();//堆内存
   
           //判断
           // == 比较的是地址 常量池地址 != 堆内存地址 所以不能使用双等号比较内容是否一样
           if (OkName == name && OkPassword == password){
               System.out.println("success (==)");
           }else {
               System.out.println("username or password is error (==)");
           }
   
           //equals 精确比较内容是否一致
           if (name.equals(OkName) && password.equals(OkPassword)){
               System.out.println("success (equals)");
           }else {
               System.out.println("username or password is error (equals)");
           }
   
           //equalsIgnoreCase 忽略大小写比较
           if (name.equalsIgnoreCase(OkName) && password.equalsIgnoreCase(OkPassword)){
               System.out.println("success (equalsIgnoreCase)");
           }else{
               System.out.println("username or password is error (equalsIgnoreCase)");
           }
   
       }
   }
   //----------------输出内容---------------------
   /*
   username：
   Admin
   password：
   123456
   username or password is error (==)
   username or password is error (equals)
   success (equalsIgnoreCase)
   
   进程已结束,退出代码0
   */
   ```

3. String常用API

   ```java
   package com.meng;
   
   /**
    * 掌握String其他常用的API
    */
   public class StringOtherDemo05 {
       public static void main(String[] args) {
           //1、public int length(); 获取字符串长度 (包含空格）
           String name = "I love you China";
           System.out.println(name.length());
           //2、public char charAt(int index); 获取某个索引位置处的字符 (从0开始）
           char wordInName = name.charAt(0);
           System.out.println(wordInName);
   
           System.out.println("------遍历字符串中的每个字符-------");
           for (int i = 0; i < name.length(); i++) {
               System.out.print(name.charAt(i));//print 不换行
           }
   
           System.out.println();
   
           //3、public char[] toCharArray(); 把字符串转换成字符数组
           char[] chars = name.toCharArray();
           for (int i = 0; i < chars.length; i++) {
               System.out.println(chars[i]);
           }
   
           //4、pubic String substring(int beginIndex, int endIndex); 截取内容，包括前面，不包括后面
           String name2 = "Java是最厉害的语言";
           System.out.println(name2.substring(0, 4));//Java
   
           //5、pubic String substring(int beginIndex）; 从当前位置 一直截取到末尾
           System.out.println(name2.substring(4));
   
           //6、public String replace(CharSequence target,CharSequence replacement); 替换关键字
           String name3 = "你在玩什么东西呢？一直送,垃圾";
           String rs = name3.replace("什么东西", "**").replace("送", "**").replace("垃圾", "**");
           System.out.println(rs);
   
           //7、public boolean contains(CharSequence s); 判断字符串中是否包含
           if (name3.contains("垃圾")){
               System.out.println("违规！！！");
           }else {
               System.out.println("未发现");
           }
   
           //8、public boolean startsWith(String prefix); 判断是以什么开始
           System.out.println(name3.startsWith("你在"));
   
           //9、public String[] split(String regex);以什么分割成字符串数组
           String name4 = "唱歌，跳舞，rap，篮球";
           String[] hobbies = name4.split("，");
           for (String hobby : hobbies) {
               System.out.println(hobby);
           }
   
   
       }
   }
   
   ```





## ArrayList

集合与数组类似，也是一种容器，用于装数据的。



数组的特点：数组定义完，并启动后，类型确定，长度固定！在我们进行CRUD（增删改查）时候，数组的缺陷就暴漏出来了。所以我们就需要利用集合。

集合的特点：集合大小不固定，启动后可以动态变化，类型也可以选择不固定的。集合就非常合适做元素个数不确定，且进行CRUD的业务场景。同时集合也提供了非常多且好用的API～



### 快速入门：

#### 对象集合获取：

public ArrayList(); 创建一个空的集合对象

#### 添加数据：

public boolean add(E e);添加一个指定的元素到此集合末尾

public void add(int index,E element);在指定位置添加指定元素



```java
package com.meng.arrayList;

import java.util.ArrayList;

public class ArrayListDemo01 {
    public static void main(String[] args) {
        //1、创建ArrayList对象
        ArrayList list = new ArrayList();
        //2、添加数据
        list.add("JavaSE");
        list.add("HTML");
        list.add("CSS");
        list.add("JS");
        list.add("Vue");
        list.add("JavaWeb");
        list.add("MySQL");
        list.add("Maven");
        list.add("MyBatis");
        list.add("MyBatis-Plus");
        list.add("Spring");
        list.add("Spring-MVC");
        list.add("SpringBoot");
        list.add("SpringCloud");
        list.add("设计模式");
        list.add("数据结构");
        list.add("算法设计");

        //3、打印输出
        System.out.println(list);//打印出的是内容，说明ArrayList重写了toString方法

        //4、给指定位置添加元素
        list.add(1,"注解，反射，多线程，网络编程");//0 1(add) 2(1) 3(2)...
        System.out.println(list);


    }
}

```



#### ArrayList对于泛型的支持

Java认为我们这样ArrayList list = new ArrayList();创建ArrayList对象没有约定泛型并不规范，所以要约定一个泛型。

##### 泛型概述：

ArrayList< E >:其实就是一个泛型类，可以在编译阶段约束集合对象只能操作某种类型的数（E）

例举：

ArrayList< String >;只能操作字符串类型的元素；

ArrayList< Integer >;只能操作整数类型的元素；

**注意：集合中只能存储引用类型，不支持基本数据类型！！！**

```java
package com.meng.arrayList;


import java.util.ArrayList;

public class ArrayListDemo02 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("字符串");
        list.add("dadada~");
//        list.add(2);整型和其他泛型不能添加到String的ArrayList集合中

        ArrayList<Integer> list1 = new ArrayList<>();
        list1.add(100);

        ArrayList<Object> list2 = new ArrayList<>();
        list2.add(100);
        list2.add("hello");


    }
}

```





#### ArrayList常用API

```java
package com.meng.arrayList;

import java.util.ArrayList;

public class ArrayListDemo03 {
    public static void main(String[] args) {
        //1、创建ArrayList对象
        ArrayList<String> list = new ArrayList<>();
        //2、添加数据
        list.add("Spring");
        list.add("Spring-MVC");
        list.add("SpringBoot");
        list.add("SpringCloud");
        list.add("设计模式");
        list.add("数据结构");
        list.add("算法设计");

        //常用API
        //1、public E get(int index) 获取某个索引位置处的元素值（从0开始）
        String s1 = list.get(1);
        System.out.println(s1);
        //2、public int size() 获取集合大小（元素个数）
        int size = list.size();
        System.out.println(size);
        //3、完成集合的遍历 list.fori
        for (int i = 0; i < list.size(); i++) {
            System.out.println("遍历结果："+list.get(i));
        }

        //4、public E remove(int index) 删除某个索引位置处的元素，并返回被删除的元素
        String remove = list.remove(3);
        System.out.println(remove);
        System.out.println(list);

        //5、public boolean remove(Object o) 直接删除元素，删除成功返回true，否则返回false
        //注意：只会删除第一个出现的元素（存在元素相同的情况下）
        boolean b = list.remove("算法设计");
        System.out.println(b);
        System.out.println(list);
        //6、public E set(int index, E element) 修改指定位置的元素，并返回oldValue
        String set = list.set(4, "从入门到如土");
        System.out.println("被修改的："+set);
        System.out.println("修改后的内容："+list);


    }
}

```

#### 案例：

遍历并删除元素

```java
package com.meng.arrayList;

import java.util.ArrayList;

public class ArrayListTest01 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(100);
        list.add(90);
        list.add(70);
        list.add(88);
        list.add(78);
        list.add(79);
        list.add(66);
        list.add(33);
        //删除80分以下的元素
        //[100, 90, 70, 88, 78, 79, 66, 33]
        //[100, 90, 88, 78, 79, 66, 33]
        //[100, 90, 88, 79, 66, 33]
        //[100, 90, 88, 79, 33]   我们发现最后结果还是有80分以下的元素！ 这就是非常经典的bug，
        //                      i
        // 因为要删除时，如果后面的元素元素也是小于80分，这时候删除了本位置的元素，然后下一步就是i++，没有继续判断这个位置是不是小于80，
        // 所以出现了bug。解决方案：
        //一：在判断如果要删除的时候，我们让它删除后i--；也就是让它回到上一个位置，然后再进行循环判断下一个位置是否小于80，不过效率低
        //二：倒序删除！！！
        System.out.println("方法一：");
        System.out.println(list);
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i)<80){
                list.remove(i);
                i--;//方法一，效率低
            }
        }
        System.out.println(list);

        //方法二
        ArrayList<Integer> list2 = new ArrayList<>();
        list2.add(100);
        list2.add(90);
        list2.add(70);
        list2.add(88);
        list2.add(78);
        list2.add(79);
        list2.add(66);
        list2.add(33);
        //[100, 90, 70, 88, 78, 79, 66, 33]
        //[100, 90, 70, 88, 78, 79, 66]
        //[100, 90, 88]
        //  i
        System.out.println("方法二：");
        System.out.println(list2);
        for (int i = list2.size()-1; i>=0; i--){
            if (list2.get(i)<80){
                list2.remove(i);
            }
        }
        System.out.println(list2);
    }
}

```



存储自定义类型（开发中使用最多）

```java
package com.meng.arrayList;

public class Movie {
    private String name;//电影名称
    private double score;//电影评分
    private String actor;//演员

    public Movie() {
    }

    public Movie(String name, double score, String actor) {
        this.name = name;
        this.score = score;
        this.actor = actor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "name='" + name + '\'' +
                ", score=" + score +
                ", actor='" + actor + '\'' +
                '}';
    }
}


```

```java
package com.meng.arrayList;


import java.util.ArrayList;

public class ArrayListTest02 {
    public static void main(String[] args) {
        //1、创建一个自定义电影Movie类
        //2、定义一个ArrayList类存储这些影片
        ArrayList<Movie> movies = new ArrayList<>();
        //3、创建影片对象，封装电影数据，把对象加入到集合中
        Movie m1 = new Movie("长津湖", 9.6, "吴京,易烊千玺");
        Movie m2 = new Movie("奇迹·笨小孩", 9.5, "易烊千玺");
        movies.add(m1);
        movies.add(m2);
        //4、遍历集合中的影片对象，并展示处理
        for (int i = 0; i < movies.size(); i++) {
            Movie movie = movies.get(i);
            System.out.println(movie);
        }
        //迭代器遍历；增强 'for'
        for (Movie movie : movies) {
            System.out.println(movie);
        }


    }
}

```





元素搜索🔍

```java
package com.meng.arrayList;

public class Student {
    private String sId;
    private String name;
    private int age;
    private String className;

    public Student() {
    }

    public Student(String sId, String name, int age, String className) {
        this.sId = sId;
        this.name = name;
        this.age = age;
        this.className = className;
    }

    public String getsId() {
        return sId;
    }

    public void setsId(String sId) {
        this.sId = sId;
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

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    @Override
    public String toString() {
        return "Student{" +
                "sId='" + sId + '\'' +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", className='" + className + '\'' +
                '}';
    }
}

```

```java
package com.meng.arrayList;

import java.util.ArrayList;

public class Seek {
    /**
     * 根据学号，再学生集合中找出学生对象
     * @param students
     * @param id
     * @return
     */
    public Student getStudentById(ArrayList<Student> students, String id){

        for (Student student : students) {
            if (id.equals(student.getsId())){
                return student;
            }
        }
        return null;//查无此人
    }
}

```

```java
package com.meng.arrayList;


import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListTest03 {
    public static void main(String[] args) {
        //1、创建一个自定义Student学生类
        //2、定义一个ArrayList类存储学生对象
        ArrayList<Student> students = new ArrayList<>();
        //3、创建学生对象，封装学生数据，把学生对象加入到集合中
        Student student1 = new Student("20220101", "小胡", 19,"计算机");
        Student student2 = new Student("20220102", "小王", 19,"网络");
        students.add(student1);
        students.add(student2);
        //4、遍历集合
        for (Student student : students) {
            System.out.println(student);
        }
        //5、让用户不断输入学号，可以搜索出学生的信息（独立成方法）

        Seek seek = new Seek();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("请输入学号：");
            String id = scanner.next();
            Student s = seek.getStudentById(students, id);
            if (s == null){
                System.out.println("查无此人");
            }else {
                System.out.println(s);
            }

        }
    }
}

```



## Object、Objects类

### Object类的作用

一个类要么默认继承了Object类，要么间接继承了Object类，Object类是Java中的祖宗类。

Object类的方法是一切子类都可以直接使用的，所以我们需要学习Object类中的方法。

### Object类中的常用方法

|             方法名              |                                   说明                                    |
| :-----------------------------: | :-----------------------------------------------------------------------: |
|    public String toString()     |        默认是返回当前对象在堆内存中的地址信息：类的权限名@内存地址        |
| public Boolean equals(Object o) | 默认是比较当前对象与另一个对象的地址是否相同，相同返回true，不同返回false |

#### toString

```java
package com.toString;

public class Student {//extends Object
    private String name;
    private int age;
    private char gender;

    public Student() {
    }

    public Student(String name, int age, char gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
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

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                '}';
    }
}

```

```java
package com.toString;

public class Test1 {
    public static void main(String[] args) {
        Student student = new Student("胖虎", 18, '男');
        /*String s = student.toString();
        System.out.println(s);*/
        System.out.println(student.toString());
        //直接输出对象变量，默认可以省略toString
        System.out.println(student);
        //在开发中直接输出对象，默认输出对象的地址，其实是毫无意义的
        //开发中输出对象变量，我们更多希望的是看到对象的内容是什么，而不是对象的地址
        //所以我们就需要在Student类中重写toString让它可以输出内容
        System.out.println(student);
    }
}

```

#### equals 

```java
package com.toString;


import java.util.Objects;

public class Student {//extends Object
    private String name;
    private int age;
    private char gender;

    public Student() {
    }

    public Student(String name, int age, char gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
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

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    //先尝试自己重写equals
    /*@Override
    public boolean equals(Object o){
        //1、判断o是不是学生类型
        if (o instanceof Student){
            //2、判断2个对象的内容是否一样
            //this是主调的对象
            //字符串的比较还是要用equals，字符串本身就重写了equals，比较本身内容
            //o是Object类型，我们需要强转为学生
//            if (this.name.equals(((Student) o).name) && this.age == ((Student) o).age && this.gender == ((Student) o).gender){
//                return true;
//            }else {
//                return false;
//            }
            return this.name.equals(((Student) o).name) && this.age == ((Student) o).age && this.gender == ((Student) o).gender;
        }else {
            //学生只能和学生比较，否则返回false
            return false;
        }
    }*/

    //IDEA自动生成，重写equals也会重写hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;//先判断了是不是自己和自己比较
        if (o == null || getClass() != o.getClass()) return false;//如果o是null，就是传进来一个空进来，或，判断类型是否一样
        //如果通过了上面的层层判断，就进行正式的内容比较啦(因为此时的o就是学生类型且不为空)
        //首先把Object类型的o强转为Student类型的student，如果进行一一比较
        //注意，这时候进行字符串比较，调用的是Objects里面的equals，而不是直接调用name字符串里面的equals，可以防止空指针异常（就是怕我们传进去一个空值进去比较）
        Student student = (Student) o;
        return age == student.age && gender == student.gender && Objects.equals(name, student.name);
    }
    //重写equals也会重写hashCode
    @Override
    public int hashCode() {
        return Objects.hash(name, age, gender);
    }


    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                '}';
    }
}

```

```java
package com.toString;

public class Test2 {
    public static void main(String[] args) {
        Student student1 = new Student("胖虎", 18, '男');
        Student student2 = new Student("胖虎", 18, '男');
        //不重写equals会调用Object里面的equals，默认比较地址是否相同,我们完全可以使用 == 号比较
        System.out.println(student1.equals(student2));//不重写equals就是比较地址，false
        System.out.println(student1 == student2);//false
        //但是我们大多数都是想要比较内容是否相同，所以我们就需要在子类中重写equals
        System.out.println(student1.equals(student2));
    }
}

```



### Objects

Objects类与Object还是继承关系，Object是自从JDK1.7才有的

#### equals

官方进行字符串比较的时候没有用对象自己的equals方法，而是调用Objects的equals的方法来比较两个对象

Objects的equals比较更安全

Objects.equals(name, student.name); 和 name.equals(student.name);

因为后面的一种name可能为空( 就变成了null.equals() )，会报空指针异常，而前面的一种更加安全。

Object.equals

直接比较地址

```java
public boolean equals(Object obj) {
        return (this == obj);
    }
```

String name;

name.equals

比较字符串内容

```java
    /**
     * Compares this string to the specified object.  The result is {@code
     * true} if and only if the argument is not {@code null} and is a {@code
     * String} object that represents the same sequence of characters as this
     * object.
     *
     * @param  anObject
     *         The object to compare this {@code String} against
     *
     * @return  {@code true} if the given object represents a {@code String}
     *          equivalent to this string, {@code false} otherwise
     *
      将此字符串与指定对象进行比较。当且仅当参数不为null并且是表示与此对象相同的字符序列的String对象时，结果才为true 。
			参形：
			anObject - 与此String进行比较的对象
			返回值：true给定对象表示与此String等效的字符串，则为 true，否则为false
     */
    public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = value.length;
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                        return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }
```



Objects.equals

进行非空判断，更安全。

注意：需要在子类中重写equals才是比较内容，否则它会找父类Object中的equals比较地址

```java
public static boolean equals(Object a, Object b) {
        return (a == b) || (a != null && a.equals(b));
    }
```



#### isNull

判断变量是否为null，为null返回true，反之false

和 == 号判断是否为null一毛一样，不过调用API判断逼格更高。（专业）

```java
package com.toString;

import java.util.Objects;

public class Test2 {
    public static void main(String[] args) {
        Student student2 = new Student("胖虎", 18, '男');
        Student student3 = null;

        System.out.println(Objects.isNull(student1));
        System.out.println(student1 == null);

        System.out.println(Objects.isNull(student3));
        System.out.println(student3 == null);


    }
}

```

##### 注意点：

```java
//调用Objects的equals比较内容需要重写equals，否则比较的就是地址
        System.out.println(Objects.equals(student1,student2));

```



## StringBuilder

StringBuilder是一个可变字符串类，我们可以把它看成一个对象容器

**作用**：提高字符串的操作效率，如拼接、修改等。

### StringBuilder构造器

| 名称                             | 说明                                           |
| -------------------------------- | ---------------------------------------------- |
| public StringBuilder()           | 创建一个空白的可变的字符串对象，不包含任何内容 |
| public StringBuilder(String str) | 创建一个指定字符串内容的可变字符串对象         |

### StringBuilder常用方法

| 方法名称                              | 说明                                                |
| ------------------------------------- | --------------------------------------------------- |
| public StringBuilder append(任意类型) | 添加数据并返回StringBuilder对象本身                 |
| public StringBuilder reverse()        | 将对象内容反转                                      |
| public int length()                   | 返回对象内容长度                                    |
| public String toString()              | 通过toString()就可以实现把StringBuilder转换为String |



```java
package com.stringbuilder;

/**
 * 目标：学会StringBuilder操作字符串，最终还需要知道StringBuilder性能好的原因
 */
public class Demo01 {
    public static void main(String[] args) {
        StringBuilder stringBuilder = new StringBuilder();//""
        stringBuilder.append("a");
        System.out.println(stringBuilder);
        stringBuilder.append("b");
        stringBuilder.append(1);
        stringBuilder.append(false);
        stringBuilder.append(3.33);
        stringBuilder.append("abc");
        stringBuilder.append(2.4f);
        System.out.println(stringBuilder);

        //支持链式编程
        StringBuilder stringBuilder1 = new StringBuilder();
        stringBuilder1.append("https://").append("www.").append("apple").append(".com");
        System.out.println(stringBuilder1);

        //反转内容
        stringBuilder1.reverse().append("反转");
        System.out.println(stringBuilder1);
        //长度
        //insert插入
        stringBuilder1.insert(0,"22");
        System.out.println(stringBuilder1);
        System.out.println(stringBuilder1.length());

        //注意：StringBuilder只是拼接字符串的手段，效率好
        //最终的目的还是要恢复成String类型。才能复合方法的参数
        String s = stringBuilder1.toString();
        test(s);


    }
    public static void test(String s){
        System.out.println("方法中的");
        System.out.println(s);
    }
}

```

##### StringBuilder性能好的原因：

与String相比，StringBuilder在拼接字符串的时候，堆内存中只有一个我们new出来的对象，而String在运算拼接字符串的时候，（String底层拼接字符串的原理就是：每次进行运算拼接都会new 一个StringBuilder对象进行拼接，然后toString返回String类型的对象）会在堆内存中创建多个StringBuilder对象，所以效率低。

String内容不可变、拼接字符串性能差

StringBuilder内容可变、拼接字符串性能好，代码优雅

定义字符串使用String

拼接、修改等操作字符串使用StringBuilder，最终一定要toString把StringBuilder转为String类型。

![](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208081615469.png)

![image-20220808162154769](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208081621868.png)







## Math

### 概述：

见名知意，即包含了基本的数学运算方法的类，Math没有提供公开的构造器。

Math的构造器是被私有的，不能对外创建对象，但是Math中的方法都是静态的，可以直接通过类名进行访问。

### Math中的常用方法

| 方法名                                      | 说明                                    |
| ------------------------------------------- | --------------------------------------- |
| public static int abs(int a)                | 获取参数绝对值                          |
| public static double ceil(double a)         | 向上取整                                |
| public static double floor(double a)        | 向下取整                                |
| public static int round(float a)            | 四舍五入                                |
| public static int max(int a,int b)          | 获取两个int值中较大的值                 |
| public static double pow(double a,double b) | 返回a的b次幂的值                        |
| public static double random()               | 返回值为double的随机值，范围[ 0.0,1.0 ) |



## System

System的功能是通用的，都是直接用类名调用即可，所以System不能被实例化。

### System中常用方法

| 方法名                                                                             | 说明                                                                      |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| public static void exit(int status)                                                | 终止当前运行的Java虚拟机，非零表示异常终止                                |
| public static long currentTimeMillis()                                             | 返回当前系统的时间毫秒值的形式。1970-1-1到目前的时间毫秒值（C语言的生日） |
| public static void arraycopy(数组源数组，起始索引，目的地数组，起始索引，拷贝个数) | 数组拷贝                                                                  |

测试电脑执行十万次循环所需要的时间

```java
package com.time;

public class test1 {
    public static void main(String[] args) {
        //循环开始的时候时间
        long startTime = System.currentTimeMillis();
        System.out.println(startTime);
        //十万次循环
        for (int i = 0; i < 1e5; i++) {
            System.out.println("输出"+i);
        }
        //循环结束的时候的时间
        long endTime = System.currentTimeMillis();
        System.out.println(endTime);
        //把毫秒值转换成秒
        System.out.println((endTime - startTime)/1000.0);
    }
}

//0.192s

```



## BigDecimal

### BigDecimal作用

用于解决浮点型运算精度失真的问题

```java
package com;

public class Test01 {
    public static void main(String[] args) {
        System.out.println(0.09+0.01);//0.09999999999999999
        System.out.println(1.0-0.32);//0.6799999999999999
        System.out.println(1.015*100);//101.49999999999999
        System.out.println(1.301/100);//0.013009999999999999
        System.out.println("---------------");
        double c = 0.1+0.2;
        System.out.println(c);//0.30000000000000004
        
    }
}

```

### 使用步骤

创建对象BigDecimal封装浮点型数据（最好的方式是调用方法）

public static BigDecimal valueOf (double val):包装浮点型成为BigDecimal对象

##### Java开发手册中(嵩山版）：

禁止使用构造方法 BigDecimal(double) 的方式把double值转化为BigDecimal对象。

说明：BigDecimal(double)存在精度损失风险，在精度计算或值比较的场景中可能会导致业务功能逻辑异常。

如：BigDecimal b = new BigDecimal(0.1F);实际的存储值为：0.10000000149

正例：优先推荐入参为String的构造方法，或使用BigDecimal的valueOf 方法，此方法内部起始执行了Double的toString，而Double的toString按double的实际能表达的精度对尾数进行了截断。

BigDecimal recommend1 = new BigDecimal("0.1");

BigDecimal recommend2 = BigDecimal.valueOf(0.1);



### BigDecimal常用API

| 方法名                                                             | 说明 |
| ------------------------------------------------------------------ | ---- |
| public BigDecimal add(BigDecimal b)                                | 加法 |
| public BigDecimal subtract(BigDecimal b)                           | 减法 |
| public BigDecimal multiply(BigDecimal b)                           | 乘法 |
| public BigDecimal divide(BigDecimal b)                             | 除法 |
| public BigDecimal divide(另一个BigDecimal对象，精确几位，舍入模式) | 除法 |

```java
package com;


import java.math.BigDecimal;
import java.math.RoundingMode;

public class Test01 {
    public static void main(String[] args) {
        System.out.println(0.09+0.01);//0.09999999999999999
        System.out.println(1.0-0.32);//0.6799999999999999
        System.out.println(1.015*100);//101.49999999999999
        System.out.println(1.301/100);//0.013009999999999999
        System.out.println("---------------");
        double a = 0.1;
        double b = 0.2;
        double c = a+b;
        System.out.println(c);//0.30000000000000004
        System.out.println("----------------");
        //包装浮点型对象成为大数据对象 BigDecimal
        BigDecimal a1 = BigDecimal.valueOf(a);
        BigDecimal b1 = BigDecimal.valueOf(b);
//        BigDecimal c1 = a1.add(b1);
//        BigDecimal c1 = a1.subtract(b1);
//        BigDecimal c1 = a1.multiply(b1);
        BigDecimal c1 = a1.divide(b1);
        System.out.println(c1);//BigDecimal内重写了toString方法

        //BigDecimal只是一个手段，我们最终还是要用double类型去接收结果
        double rs = c1.doubleValue();
        System.out.println(rs);//这个时候就可以传给double类型的参数了

        //注意事项：BigDecimal一定是要精度运算的
        BigDecimal a11 = BigDecimal.valueOf(10);
        BigDecimal b11 = BigDecimal.valueOf(3);
//        BigDecimal c11 = a11.divide(b11);报异常 ArithmeticException
//        System.out.println(c11);
        //   c11 = a11/b11          除数   保留几位小数     一半上升（四舍五入）
        BigDecimal c11 = a11.divide(b11, 2, RoundingMode.HALF_UP);
        System.out.println(c11);

    }
}

```

### 总结：

1. BigDecimal的作用是什么？

   解决浮点型运算精度失真问题

2. BigDecimal的对象如何获取？

   BigDecimal b = BigDecimal.valueOf(0.1);





## Date

Date类的对象在Java中代表的是当前所在系统的此刻日期时间。

```java
package com.date;

import java.util.Date;

public class DateDemo {
    public static void main(String[] args) {
        //创建一个Date对象，代表当前系统此刻的时间对象
        Date date = new Date();
        System.out.println(date);
        //获取时间毫秒值
        System.out.println(date.getTime());//date.getTime()
        System.out.println(System.currentTimeMillis());//通过系统获得

        //计算出当前时间往后走1小时100秒的的时间
        Date date1 = new Date();//创建一个日期对象
        System.out.println(date1);//先输出一下

        long date2 = date1.getTime() + (60 * 60 + 100) * 1000;//把date1转为时间毫秒值再加上1小时100秒

        Date date3 = new Date(date2);//把date2的毫秒值转成日期对象，有两种方式：1、Date date3 = new Date(date2); 2、date3.setTime(date2)
        System.out.println(date3);//输出date3


    }
}

```

### 总结：

1. 日期对象如何创建，如何获取时间毫秒值？

   Date date = new Date();//创建日期对象

   Long time = date.getTime();//获取日期对象的时间毫秒值

2. 时间毫秒值怎么恢复成日期对象？

   1. Date d = new Date(time);

   2. d.setTime(time);



## SimpleDateFormat（简单日期格式化类）

### SimpleDateFormat类的作用：

可以对Date对象或时间毫秒值**格式化**成我们喜欢的时间形式。

也可以把字符串的时间形式**解析**成日期对象。

### SimpleDateFormat的构造器

| 构造器                                  | 说明                                     |
| --------------------------------------- | ---------------------------------------- |
| public SimpleDateFormat()               | 构造一个SimpleDateFormat，使用默认格式   |
| public SimpleDateFormat(String pattern) | 构造一个SimpleDateFormat，使用指定的格式 |

### SimpleDateFormat的格式化方法

| 格式化方法                              | 说明                              |
| --------------------------------------- | --------------------------------- |
| public final String format(Date date)   | 将日期格式化成日期/时间字符串     |
| public final String format(Object time) | 将时间毫秒值转化成日期/时间字符串 |

```java
package com.simpleDateFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SimpleDateFormatDemo1 {
    public static void main(String[] args) {
        //1、日期对象
        Date date = new Date();
        System.out.println(date);
        //2、格式化这个日期对象（指定最终格式化的形式）                    年  月  日  时 分 秒 星期 上下午
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss EEE a");
        //3、开始格式化日期对象成为喜欢的字符串形式
        String rs = dateFormat.format(date);
        System.out.println(rs);

        System.out.println("----------格式化毫秒值-------------");

        //4、格式化时间毫秒值
        //需求：请问100后的时间是
        Date date1 = new Date();
        long time = date1.getTime() + 100 * 1000;
        String s = dateFormat.format(time);
        System.out.println(s);

        System.out.println("-----------解析字符串时间，下一部分:Test1------------");



    }
}

```

```java
package com.simpleDateFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Test1 {
    public static void main(String[] args) throws ParseException {
        //使用SimpleDateFormat解析字符串时间成为日期对象
        String dateStr = "2021年08月06日 11:11:11";
        System.out.println(dateStr);
        //把字符串时间解析成时间对象：形式务必和字符串中的形式一毛一样，否则会出现bug
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        //然后解析
        Date date = sdf.parse(dateStr);
        //往后走2天14小时49分22秒       为了保险起见在第一个2后面加L，变成long类型，防止毫秒值过大越界
        long time = date.getTime() + (2L*24*60*60+14*60*60+49*60+22)*1000;
        //格式化这个时间毫秒值
        String format = sdf.format(time);
        System.out.println(format);
    }
}

```

### 总结：

1. SimpleDateFormat可以格式化哪些时间形式？

   ```java
   SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
   sdf.format(date);
   sdf.format(time);
   ```

2. SimpleDateFormat如何进行字符串时间的解析？

   ```java
   mpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
   Date d = sdf.parse("2022年2月28日 14:23:30");//解析格式必须要一样
   ```





## Calendar

### Calendar概述

Calendar代表了系统此刻日期对应的日历对象。

Calendar是一个抽象类，不能直接创建对象。

|                  方法                  |              说明              |
| :------------------------------------: | :----------------------------: |
|       public int get(int field)        |    获取日期中的某个字段信息    |
| public void set(int field, int value)  |     修改日历的某个字段信息     |
| public void add(int field, int amount) | 为某个字段增加或者减少指定的值 |
|      public final Date getTime()       |        获取此刻日期对象        |
|     public long getTimeInMillis()      |        获取此刻的毫秒值        |



```java
package com.calendar;

import java.util.Calendar;
import java.util.Date;

public class CalendarDemo1 {
    public static void main(String[] args) {
        //1、拿到系统此时的日历对象
        Calendar cal = Calendar.getInstance();
        System.out.println(cal);
        //2、获取日历信息
        int year = cal.get(Calendar.YEAR);
        System.out.println(year);
        int month = cal.get(Calendar.MONTH);
        System.out.println(month);
        int weekOfYear = cal.get(Calendar.WEEK_OF_YEAR);
        System.out.println(weekOfYear);
        //3、修改日历中的某个字段信息(我们一般不会去修改日历中的时间，因为牵一发而动全身，后面的日历时间就会全都改变）
        //cal.set(Calendar.HOUR,10);
        //System.out.println(cal);
        //4、增加减少指定的值
        //64天,59分后
        cal.add(Calendar.DAY_OF_YEAR,64);
        cal.add(Calendar.MINUTE,59);
        //5、拿到此刻的日期对象
        Date time = cal.getTime();
        System.out.println(time);
        //6、拿到时间毫秒值
        long timeInMillis = cal.getTimeInMillis();
        System.out.println(timeInMillis);

    }
}

```



**注意：Calendar是一个可变日期对象，一旦修改后其对象本身表示的时间将会产生变化**



## JDK8新增的日期API



JDK8新增的日期类，API非常多建议查阅JDK文档

| 类                    | 说明                       |
| --------------------- | -------------------------- |
| LocalDate             | 不包含具体时间的日期       |
| LocalTime             | 不包含日期的时间           |
| **LocalDateTime**     | 包含了日期以及时间         |
| Instant               | 代表的是时间戳             |
| **DateTimeFormatter** | 用于做时间的格式化和解析的 |
| **Duration**          | 用于计算两个”时间“的间隔   |
| **Period**            | 用于计算两个”日期“的间隔   |

其次，新的API的类型几乎全部都是不变类型（和String的使用类似），可以放心使用，不必担心被修改发生牵一发而动全身。

### LocalDate、LocalTime、LocalDateTime

- 他们分别代表日期、时间、日期时间对象，他们类的实例是不可变对象
- 他们三者构建对象和API都是通用的
- ![image-20220809104348616](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091043713.png)
- ![image-20220809105047333](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091050369.png)
- ![image-20220809134847701](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091348761.png)
- ![image-20220809134957404](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091349465.png)
- ![image-20220809135057623](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091350690.png)





```java
package com.time;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Test1 {
    public static void main(String[] args) {
        //1、获取本地的日期对象
        LocalDate now = LocalDate.now();
        System.out.println("今天的日期："+now);//今天的日期：2022-02-28

        int year = now.getYear();
        System.out.println("year:"+year);

        int month = now.getMonthValue();
        System.out.println("month:"+month);

        int dayOfYear = now.getDayOfYear();
        System.out.println("dayOfYear:"+dayOfYear);


        //--------------------
        LocalTime now1 = LocalTime.now();
        System.out.println(now1);
        //--------------------最全的，综合了LocalDate和LocalTime
        LocalDateTime now2 = LocalDateTime.now();
        System.out.println(now2);
        System.out.println(now2.getYear());

    }
}

```



## 包装类

### 概述

包装类其实就是八种基本数据类型对应的引用类型。（Java为了实现万物皆对象）

| 基本数据类型 | 引用数据类型 |
| ------------ | ------------ |
| byte         | Byte         |
| short        | Short        |
| int          | Integer      |
| long         | Long         |
| char         | Character    |
| float        | Float        |
| double       | Double       |
| boolean      | Boolean      |

集合和泛型其实也只能支持包装类，不支持基本数据类型。（ArrayList< Integer >)



自动装箱：基本数据类型的数据和变量可以直接赋值给包装类型的变量

自动拆箱：包装类型的变量可以直接赋值给基本数据类型的变量



### 包装类的特有的功能

包装类的变量的默认值可以是null，容错率高。

包装类可以把基本数据类型转换成字符串形式toString（用的不多 ，其实我们完全可以这样：num = num1 + "" ;让他加一个空字符串）

##### 可以把字符串类型转换成真实的数据类型（非常有用）

Integer.parseInt("字符串类型的整数")

```java

String age = "20";
//转换真实类型（int）
int age1 = Integer.parseInt(age);
System.out.println(age1);

```

不过我们发现还是不方便，我们可以用这个：Integer.valueOf("字符串类型的整数");    Double.valueOf("字符串类型的小数")



## Arrays类

### Arrays类概述

数组操作工具类，专门用于数组操作元素的。

### Arrays类常用的API

| 方法名                                                            |                                                     |
| ----------------------------------------------------------------- | --------------------------------------------------- |
| public static String toString(类型[] a)                           | 对数组进行排序                                      |
| public static void sort(类型[] a)                                 | 对数组进行默认升序排序                              |
| public static < T > void sort(类型[] a,Comparator< ? super T > c) | 使用比较器对象自定义排序                            |
| public static int binarySearch(int[] a, int[] key)                | 二分搜索数组中的数据，存在返回 索引 ，不存在返回 -1 |

![image-20220809142249247](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091422391.png)



```java
package com.arrays;

import java.util.Arrays;

public class ArraysDemo1 {
    public static void main(String[] args) {
        int[] arr = {10,2,55,23,24,100};
        System.out.println(arr);//打印地址
        //String rs = Arrays.toString(arr);
        //System.out.println(rs);
        System.out.println(Arrays.toString(arr));//打印数组内容

        //排序（默认升序）
        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr));//API调用

        //二分搜索技术（前提数组必须排好序才支持，否则出bug）数据结构中的内容：就是从中间开始先比较大小然后选择是在前半段还是在后半段，然后再和中间的比较...
        int index = Arrays.binarySearch(arr, 55);//查找到返回索引，查找不到返回 负数（规律 ： -（应该插入的位置的索引+1） ）
        System.out.println(index);



    }
}

```

![image-20220809143211150](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091432198.png)

```java
package day03.d7_arrays;

public class Student {
    private String name;
    private int age;
    private double height;

    public Student() {
    }

    public Student(String name, int age, double height) {
        this.name = name;
        this.age = age;
        this.height = height;
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

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", height=" + height +
                '}';
    }
}

```

```java
package day03.d7_arrays;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * 自定义数组排序规则Comparator比较器
 */
public class ArrayDemo2 {
    public static void main(String[] args) {
        Integer[] ages = {20, 18, 30, 11, 21, 55, 33};
        Arrays.sort(ages);
        System.out.println(Arrays.toString(ages));
//
        Arrays.sort(ages, new Comparator<Integer>() {

            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1;
            }
        });
        System.out.println(Arrays.toString(ages));

//        学生数组对象
        Student[] students = {
                new Student("1", 20, 189.0),
                new Student("2", 22, 185.0),
                new Student("3", 19, 177.0),
                new Student("4", 21, 182.0)
        };
        Arrays.sort(students, new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
//                比较浮点型可以这样写
                return Double.compare(o1.getHeight(), o2.getHeight());
            }
        });
        System.out.println(Arrays.toString(students));


//        学生集合对象
        List<Student> list = new ArrayList<>();
        list.add(new Student("1", 20, 189.0));
        list.add(new Student("2", 22, 185.0));
        list.add(new Student("3", 19, 177.0));
        list.add(new Student("4", 21, 182.0));
        list.sort(new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                return o1.getAge() - o2.getAge();
            }
        });
        System.out.println(list);
    }
}

```



## 选择排序和二分查找

![image-20220809153449345](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091534389.png)

```java
package day03.d8_sort_binarysearch;

import java.util.Arrays;

/**
 * 选择排序
 */
public class Test1 {
    public static void main(String[] args) {
        int[] arr = {6, 1, 5, 2, 3, 7, 4};
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr[j]) {
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(arr));
    }
}

```







![image-20220809153403483](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208091534614.png)

```java
package day03.d8_sort_binarysearch;

import java.util.Arrays;
import java.util.Objects;

/**
 * 二分查找
 */
public class Test2 {
    public static void main(String[] args) {
        int[] arr = {22, 11, 44, 55, 88, 33, 99};
        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr));

        System.out.println(binarySearch(arr, 33));

    }

    /**
     * 二分查找
     *
     * @param arr
     * @param data
     * @return 索引值
     */
    public static int binarySearch(int[] arr, int data) {
        if (Objects.isNull(arr)) return -1;
//        定义左右位置
        int left = 0;
        int right = arr.length - 1;
        while (left <= right) {
//            取中间索引
            int middleIndex = (left + right) / 2;
//            判断当前中间位置的元素和要找的大小情况
            if (data > arr[middleIndex]) {
//                右查找
                left = middleIndex + 1;

            } else if (data < arr[middleIndex]) {
//                左查找
                right = middleIndex - 1;

            } else {
                return middleIndex;
            }
        }
//        没有这个元素
        return -1;
    }
}

```
