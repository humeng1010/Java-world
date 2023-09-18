
# 动态代理

**基于接口设计的！**

![image-20220812163847532](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121638642.png)

1. 明星类 必须实现接口

```java
package day08.d4_proxy;

/**
 * 明星类 必须实现接口
 */
public class Star implements Skill {
    private String name;

    public Star() {
    }

    public Star(String name) {
        this.name = name;
    }

    @Override
    public void jump() {
        System.out.println(this.name + "开始跳舞");
    }

    @Override
    public void sing() {
        System.out.println(this.name + "开始唱歌");
    }
}

```

2. 接口

```java
package day08.d4_proxy;

public interface Skill {
    void jump();

    void sing();
}

```

3. 代理对象

```java
package day08.d4_proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class StarAgentProxy {
    /**
     * 设计一个方法来返回一个明星对象的代理对象
     */
    public static Skill getProxy(Star star) {
        //为明星生成代理对象
        return (Skill) Proxy.newProxyInstance(star.getClass().getClassLoader(),
                star.getClass().getInterfaces(), new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        System.out.println("收首款");
                        //让明星(被代理对象)跳舞唱歌
                        //method 正在调用的方法对象
                        //args 代表这个方法的参数
                        Object rs = method.invoke(star, args);
                        
                        System.out.println("收尾款");
                        return rs;
                    }
                });
    }
}

```

4. 找代理让明星表演

```java
package day08.d4_proxy;

/**
 * 开发出一个动态代理对象出来，理解动态代理的执行流程
 */
public class Test {
    public static void main(String[] args) {
//        1.创建一个类对象，对象的类必须实现接口
        Star star = new Star("明星");
//        为明星对象生成一个代理对象
        Skill star2 = StarAgentProxy.getProxy(star);
        star2.jump();//走代理
        star2.sing();

    }
}

```

![image-20220812172709522](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121727636.png)

![image-20220812172844277](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121728343.png)



# 动态代理应用案例

![image-20220812173211516](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121732599.png)

```java
package day08.d5_proxy_demo;

public interface UserService {
    String login(String name, String password);

    boolean delete(int id);

    String select(String query);
}

```

```java
package day08.d5_proxy_demo;

public class UserServiceImpl implements UserService {

    @Override
    public String login(String name, String password) {
        System.out.println("登陆中...");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if ("admin".equals(name) && "123456".equals(password)) {
            System.out.println("账户密码正确");
            return "登陆成功";
        }
        return "账户/密码错误，登陆失败";
    }

    @Override
    public boolean delete(int id) {
        System.out.println("正在删除" + id + "中...");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (id > 0 && id < 10) {
            System.out.println("删除成功");
            return true;
        }
        System.out.println("删除失败");
        return false;
    }

    @Override
    public String select(String query) {
        System.out.println("正在为你查询" + query + "中...");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return query;
    }
}

```

```java
package day08.d5_proxy_demo;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class UserServiceProxy {
    public static UserService getProxy(UserService userService) {
        return (UserService) Proxy.newProxyInstance(userService.getClass().getClassLoader(), userService.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                long before = System.currentTimeMillis();

                Object rs = method.invoke(userService, args);

                long after = System.currentTimeMillis();
                long time = after - before;
                System.out.println("执行" + method.getName() + "方法花费了" + time + "ms");
                return rs;
            }
        });

    }
}

```

```java
package day08.d5_proxy_demo;

public class Test {
    public static void main(String[] args) {
        long l = System.currentTimeMillis();
        UserServiceImpl userService = new UserServiceImpl();
        UserService proxy = UserServiceProxy.getProxy(userService);
//        登陆
        String loginResult = proxy.login("admin", "123456");
        System.out.println(loginResult);
//        删除
        boolean deleteResult = proxy.delete(2);
        System.out.println(deleteResult);
//        查询
        String selectResult = proxy.select("张三");
        System.out.println(selectResult);
        long l1 = System.currentTimeMillis();
        System.out.println(l1 - l);
    }
}

```

![image-20220812175931701](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121759839.png)

![image-20220812180107353](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208121801415.png)

# 使用泛型定义代理-支持任意接口

```java
package day08.d5_proxy_demo;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class UserServiceProxy {
    public static <T> T getProxy(T obj) {
        return (T) Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                long before = System.currentTimeMillis();

                Object rs = method.invoke(obj, args);

                long after = System.currentTimeMillis();
                long time = after - before;
                System.out.println("执行" + method.getName() + "方法花费了" + time + "ms");
                return rs;
            }
        });

    }
}

```

