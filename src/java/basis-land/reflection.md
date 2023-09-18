
# 反射

### 反射概述

- 反射是指对于任何一个Class类，在"运行的时候"：都可以直接得到这个类全部成分
- 在运行时，可以直接得到这个类的**构造器对象**：Constructor
- 在运行时，可以直接得到这个类的**成员变量对象**：Field
- 在运行时，可以直接得到这个类的**成员方法对象**：Method
- 这种运行时动态获取类信息以及动态调用类中的成分的能力称为java语言的反射机制

#### 反射的关键

- 反射第一步都是先得到编译后的Class类对象，然后就可以得到Class的全部成分

#### 总结

1. 反射的基本作用、关键？
   - 反射是在运行的时候获取字节码文件对象：然后可以解析类中的全部成分
   - 反射的核心思想和关键就是：得到编译后的Class文件对象

### 反射获取类对象

#### 反射第一步：获取Class文件对象

- Class类中的静态方法：forName(String className)

- 类名.Class

```java
package com.meng.d2_reflect;

public class Student {
}

```

```java
package com.meng.d2_reflect;

/**
 * 目标：反射的第一步：获取Class对象（类对象）
 */
public class Test {
    public static void main(String[] args) throws Exception {
        //1、调用Class类中的一个静态方法:forName（全限名：包名+类名）
        Class c = Class.forName("com.meng.d2_reflect.Student");
        System.out.println(c);

        //2、直接通过类名.Class（常用）
        Class<Student> c1 = Student.class;
        System.out.println(c1);

        //3、通过 对象.getClass() 获取对象对应类的Class对象（常用）
        Student student = new Student();
        Class<? extends Student> c2 = student.getClass();
        System.out.println(c2);

    }
}

```

#### 总结

1. 反射的第一步是什么？

   获取Class类对象，如此才可以解析类中的全部成分

2. 获取Class类对象的三种方式

   - Class c1 = Class.forName("全类名");
   - Class c2 = 类名.Class;
   - Class c3 = 对象.getClass();

### 反射获取构造器对象

- 反射的第一步是先得到类对象，然后从类对象中获取类的成分对象
- Class类中用于获取**构造器**的方法

| 方法                                                                 | 说明                                       |
| -------------------------------------------------------------------- | ------------------------------------------ |
| Constructor< ? >[] getConstructors()                                 | 返回所有构造器对象的数组（只能拿public的） |
| Constructor< ? >[] getDeclaredConstructors()                         | 返回所有构造器对象的数组，存在就能拿到     |
| Constructor< T >[] getConstructor(Class< ? >...parameterTypes)       | 返回单个构造器对象（只能拿public的）       |
| Constructor< T > getDeclaredConstructor(Class< ? >...parameterTypes) | 返回单个构造器对象，存在就能拿到           |

![image-20220812153232036](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121532165.png)



```java
package com.meng.d3_reflect_constructor;

public class Student {
    private String name;
    private int age;

    private Student() {
        System.out.println("无参数构造器执行");
    }

    public Student(String name, int age) {
        System.out.println("有参构造器执行");
        this.name = name;
        this.age = age;
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

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

```java
package com.meng.d3_reflect_constructor;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;

public class TestStudent01 {
    /**
     * 1、getConstructors：
     * 获取全部的构造器，只能获取public修饰的构造器
     * Constructor[] getConstructors()
     */
    @Test
    public void getConstructors() {
        //第一步获取类对象
        Class c = Student.class;
        //提取类中全部的构造器对象(public)
        Constructor[] constructors = c.getConstructors();
        //遍历构造器
        for (Constructor constructor : constructors) {
            System.out.println(constructor.getName() + "===>" + constructor.getParameterCount());
        }
    }

    /**
     * Constructor< ? >[] getDeclaredConstructors()
     * 返回所有构造器对象的数组，存在就能拿到
     */
    @Test
    public void getDeclaredConstructors() {
        Class<Student> c = Student.class;
        //全部
        Constructor<?>[] declaredConstructors = c.getDeclaredConstructors();
        for (Constructor<?> declaredConstructor : declaredConstructors) {
            System.out.println(declaredConstructor.getName() + "===>" + declaredConstructor.getParameterCount());
        }
    }

    /**
     * 3、Constructor< T >[] getConstructor(Class< ? >...parameterTypes)
     * 返回单个构造器对象（只能拿public的）
     */
    @Test
    public void getConstructor() throws NoSuchMethodException {
        Class<Student> c = Student.class;
        //只能取出public的构造器
        Constructor<Student> constructor = c.getConstructor(String.class, int.class);
        System.out.println(constructor);
    }

    /**
     * Constructor< T > getDeclaredConstructor(Class< ? >...parameterTypes)
     * 返回单个构造器对象，存在就能拿到
     */
    @Test
    public void getDeclaredConstructor() throws NoSuchMethodException {
        Class<Student> c = Student.class;
        //按照参数类型取出一个构造器，不管公有还是私有
        Constructor<Student> declaredConstructor = c.getDeclaredConstructor();
        System.out.println(declaredConstructor);
        //定位某个有参构造器
        Constructor<Student> declaredConstructor1 = c.getDeclaredConstructor(String.class, int.class);
        System.out.println(declaredConstructor1);
    }

}

```

#### 使用反射技术获取构造器对象并使用

- 获取构造器的作用依然是初始化一个对象返回

##### Constructor类中用于创建对象的方法

| 方法                                    | 说明                                       |
| --------------------------------------- | ------------------------------------------ |
| T newInstance(Object...initargs)        | 根据指定的构造器创建对象                   |
| public void setAccessible(boolean flag) | 设置为true，表示取消访问检查，进行暴力反射 |

```java
package com.meng.d3_reflect_constructor;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;

public class TestStudent02 {
    /**
     * Constructor< T > getDeclaredConstructor(Class< ? >...parameterTypes)
     * 返回单个构造器对象，存在就能拿到
     */
    @Test
    public void getDeclaredConstructor() throws Exception {
        Class<Student> c = Student.class;
        //按照参数类型取出一个构造器，不管公有还是私有
        Constructor<Student> cons = c.getDeclaredConstructor();
        System.out.println(cons);

        //如果遇到私有的构造器，可以暴力反射
        cons.setAccessible(true);
        Student student = cons.newInstance();
        student.setName("hi");
        student.setAge(1000);
        System.out.println(student);
        /**
         * private com.meng.d3_reflect_constructor.Student()
         * 无参数构造器执行
         * Student{name='hi', age=1000}
         */
        //定位某个有参构造器
        Constructor<Student> cons1 = c.getDeclaredConstructor(String.class, int.class);//获取一个私有的有参的构造器
        System.out.println(cons1);
        cons1.setAccessible(true);//暴力反射，让它可以创建对象，仅仅这一次
        Student s = cons1.newInstance("小明", 18);
        System.out.println(s);
        /**
         * private com.meng.d3_reflect_constructor.Student(java.lang.String,int)
         * 有参构造器执行
         * Student{name='小明', age=18}
         */
    }
}

```

#### 总结

1. 利用反射技术获取构造器对象
   - getDeclaredConstructors()
   - getDeclaredConstructor(Class< ? >...parameterTypes)
2. 反射得到构造器可以做什么？
   - 依然是创建对象的
     - public newInstance(Object...initargs)
   - 如果是非public的构造器，需要打开权限（暴力反射），然后创建对象
     - setAccessible(boolean)
     - **反射可以破坏封装性，私有的也可以执行了**



### 反射获取成员变量对象

- 反射的第一步是获取类对象，然后从类对象中获取类的成分对象
- Class类中用于获取成员变量的方法

| 方法                                  | 说明                                         |
| ------------------------------------- | -------------------------------------------- |
| Field[] getFields()                   | 返回所有成员变量对象的数组（只能那public的） |
| Field[] getDeclaredFields()           | 返回所有成员变量对象的数组，存在就能拿到     |
| Field[] getField(String name)         | 返回单个成员变量对象（只能那public的）       |
| Field[] getDeclaredField(String name) | 返回单个成员变量对象，存在就能拿到           |

```java
package com.meng.d4_reflect_field;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

public class TestFieldDemo1 {
    @Test
    public void getDeclaredFields() {
        Class<Student> studentClass = Student.class;
        Field[] declaredFields = studentClass.getDeclaredFields();
        for (Field declaredField : declaredFields) {
            System.out.println(declaredField.getName() + "===>" + declaredField.getType());
        }

    }

    @Test
    public void getDeclaredField() throws Exception {
        Class<Student> studentClass = Student.class;
        Field name = studentClass.getDeclaredField("name");
        System.out.println(name.getName() + "===>" + name.getType());

    }
}

```

```java
package com.meng.d4_reflect_field;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;

public class TestFieldDemo2 {
    /**
     * 给成员变量赋值
     *
     * @throws Exception
     */
    @Test
    public void setField() throws Exception {
        //1、获取类对象
        Class<Student> studentClass = Student.class;
        //利用反射机制创建对象（类中的所有的构造器，和属性都是私有的）
        //2、获取私有的有参构造器
        Constructor<Student> declaredConstructor = studentClass.getDeclaredConstructor(String.class, int.class);
        //3、暴力反射，打开私有权限
        declaredConstructor.setAccessible(true);
        //4、然后用私有的构造器进行新实例化一个对象student
        Student student = declaredConstructor.newInstance("小明", 10);
        //5、获取类对象中的私有的属性（成员变量）
        Field age = studentClass.getDeclaredField("age");
        //6、暴力反射、打开属性的私有权限
        age.setAccessible(true);
        //7、然后对student中的age属性进行注入赋值（更改student对象的年龄）
        age.set(student, 100);

        //取值
        int nowAge = (int) age.get(student);
        System.out.println(nowAge);
        //8、输出student发现私有属性已经被修改
        System.out.println(student);

    }
}

```



#### 总结

1. 利用反射技术获取成员变量的方式
   - 获取类中成员变量对象的方法
     - getDeclaredFields()
     - getDeclaredField(String name)
2. 反射得到成员变量可以做什么？
   - 依然是在某个对象中取值和赋值
     - void set(Object obj,Object value);
     - Object get(Object obj);
   - 如果某个成员变量是非public的，需要打开权限（暴力反射），然后再取值、赋值
     - setAccessible(boolean)



### 反射获取方法对象

- 反射的第一步是先得到类对象，然后从类对象中获取类的成分对象
- Class类中用于获取成员方法的方法

| 方法                                                             | 说明                                         |
| ---------------------------------------------------------------- | -------------------------------------------- |
| Method[] getMethods()                                            | 返回所有成员方法对象的数组（只能那public的） |
| Method[] getDeclaredMethods()                                    | 返回所有成员方法对象的数组，存在就可以拿到   |
| Method getMethod(String name,Class<?>...parameterTypes)          | 返回单个成员方法对象（只能拿public的）       |
| Method getDeclaredMethods(String name,Class<?>...parameterTypes) | 返回单个成员方法对象，存在就可以拿到         |

#### 使用反射技术获取方法对象并使用

- 获取成员方法的作用依然是在某个对象中执行此方法

#### Method类中用于触发执行的方法

| 方法                                    | 说明                                                                                                                                      |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Object invoke(Object obj,Object...args) | 运行方法：<br>参数一：用obj对象调用调用该方法<br>参数二：调用方法的传递的参数（如果没有就不写）<br>返回值：方法的返回值（如果没有就不写） |

```java
package com.meng.d5_reflect_method;

public class Dog {
    private String name;

    public Dog() {
    }

    public Dog(String name) {
        this.name = name;
    }

    public void run() {
        System.out.println("狗跑的贼快~~");
    }

    private void eat() {
        System.out.println("狗吃骨头");
    }

    private String eat(String name) {
        System.out.print("狗吃" + name);
        return "吃的很开心";
    }

    public static void inAddr() {
        System.out.println("在世界上有很多单身狗");
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}

```

```java
package com.meng.d5_reflect_method;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

public class TestMethod1 {
    @Test
    public void getDeclaredMethods() {
        //1、获取类对象
        Class<Dog> dogClass = Dog.class;
        //2、提取全部方法
        Method[] declaredMethods = dogClass.getDeclaredMethods();
        //3、遍历全部方法
        for (Method declaredMethod : declaredMethods) {
            System.out.println(" 方法名称 " + declaredMethod.getName() +
                    " 返回值类型 " + declaredMethod.getReturnType() +
                    " 参数个数 " + declaredMethod.getParameterCount());
        }
    }

    @Test
    public void getDeclaredMethod() throws Exception {
        //1、获取类对象
        Class<Dog> dogClass = Dog.class;
        //2、获取类对象中的run方法
        Method run = dogClass.getDeclaredMethod("run");
        //3、创建一个dog对象
        Dog dog = new Dog();
        //4、使用类对象中的run方法告诉这个dog应该跑（没有返回值）
        run.invoke(dog);
        //5、使用类对象获取eat的方法
        Method eat = dogClass.getDeclaredMethod("eat", String.class);
        //6、暴力反射，打开权限
        eat.setAccessible(true);
        //7、使用eat方法告诉这个狗：狗你应该吃骨头
        String rs = (String) eat.invoke(dog, "骨头");
        System.out.println(rs);
    }
}

```

#### 总结

1. 利用反射技术获取成员方法对象的方式
   - 获取类中的成员方法对象
     - getDeclaredMethods()
     - getDeclaredMethod(String name,Class<?>...parameterTypes)
2. 反射得到成员方法可以做什么？
   - 依然是在某个对象中触发该方法执行
     - Object invoke(Object obj,Object...args)
   - 如果某个成员方法是非public的，需要打开权限（暴力反射），然后再触发执行
     - setAccessible(boolean)



### 反射的作用-绕过编译阶段为集合添加数据

- 反射是作用在运行时的技术，此时集合的泛型将不能产生约束了，此时是可以为集合存入其他任意类型的元素的
- 泛型只是在编译的阶段可以约束集合只能操作某种数据类型，在编译成Class文件进入运行阶段的时候，其真实类型都是ArrayList了，泛型相当于被擦出了。

```java
package com.meng.d6_reflect_genericity;

import java.lang.reflect.Method;
import java.util.ArrayList;

public class ReflectDemo {
    public static void main(String[] args) throws Exception {
        ArrayList<String> list1 = new ArrayList<>();
        ArrayList<Integer> list2 = new ArrayList<>();
        System.out.println(list1.getClass());
        System.out.println(list2.getClass());
        System.out.println(list1.getClass() == list2.getClass());//true
        /**
         * class java.util.ArrayList
         * class java.util.ArrayList
         * 虽然在编译阶段对ArrayList的泛型进行了约束，但是我们看到运用反射得到在运行阶段的时候list1和list2的类型都是ArrayList的，没有泛型进行约束
         * 所以我们就可以利用反射绕过编译阶段对集合添加其他泛型的数据
         */
        System.out.println("=======================");
        list2.add(33);
//        list2.add("hello");
        Class<? extends ArrayList> list2Class = list2.getClass();
        //先获取ArrayList.class文件中所有的方法
        Method[] declaredMethods = list2Class.getDeclaredMethods();
        //遍历
        for (Method declaredMethod : declaredMethods) {
            System.out.println(declaredMethod);
        }
        //获取add方法
        Method add = list2Class.getDeclaredMethod("add", Object.class);
        //执行add方法，向list2中注入"hello"字符串类型的值
        add.invoke(list2, "hello");
        System.out.println(list2);//[33, hello]
      
        System.out.println("------------------");
        ArrayList list3 = list2;
        list3.add("另一种方式突破泛型");
        list3.add(true);
        System.out.println(list3);

    }
}

```

#### 总结

1. 反射为何可以给约定了泛型的集合存入其他类型的元素？
   - 编译成class文件进入运行阶段的时候，泛型会自动擦除
   - 反射是作用在运行的时候的技术，此时已近不存在泛型了



### 反射的作用-通用框架的底层原理

- 设计一个框架可以保存所有类型对象的属性和值

```java
package com.meng.d7_reflect_framework;

public class Student {
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
package com.meng.d7_reflect_framework;

public class Teacher {
    private String name;
    private int age;
    private char gender;
    private double salary;

    public Teacher() {
    }

    public Teacher(String name, int age, char gender, double salary) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.salary = salary;
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

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                ", salary=" + salary +
                '}';
    }
}

```

```java
package com.meng.d7_reflect_framework;

import java.io.FileOutputStream;
import java.io.PrintStream;
import java.lang.reflect.Field;

public class MybatisUtil {
    public static void save(Object obj) {
        try (
                PrintStream ps = new PrintStream(new FileOutputStream("src/data.txt", true));

        ) {
            //1、提取这个变量的全部成员变量
            Class<?> objClass = obj.getClass();
            ps.println("=========" + objClass.getSimpleName() + "===========");//objClass.getSimpleName()获取这个类的简单类名，例如Student类获取的就是Student

            //2、提取这个类的成员变量
            Field[] declaredFields = objClass.getDeclaredFields();

            for (Field declaredField : declaredFields) {
                String name = declaredField.getName();//成员变量的名字

                declaredField.setAccessible(true);//暴力反射

                String value = declaredField.get(obj) + "";//通过成员变量得到成员变量的值
                ps.println(name + "=" + value);

            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

```java
package com.meng.d7_reflect_framework;

import org.junit.jupiter.api.Test;

public class TestReflectDemo {
    @Test
    public void testAddAllClass() {
        Student student = new Student("小明", 10, '男');
        MybatisUtil.save(student);
        Teacher teacher = new Teacher("小猴", 28, '男', 10000);
        MybatisUtil.save(teacher);

    }
}

```

#### 总结

1. 反射的作用？
   - 可以在运行时得到一个类的全部成分然后操作
   - 可以破坏封装线（很突出）
   - 也可以破坏泛型的约束性（很突出）
   - 更重要的用途是适合做Java的高级框架

