
# 工厂模式

![image-20220813113550510](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131135600.png)

```java
package day09;

public abstract class Computer {
    private String name;
    private double price;

    public abstract void start();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}

```

```java
package day09;

import day09.FactoryPattern.Computer;

public class Huawei extends Computer {
    @Override
    public void start() {
        System.out.println(getName() + "开机了");
    }
}

```

```java
package day09;

import day09.FactoryPattern.Computer;

public class Mac extends Computer {


    @Override
    public void start() {
        System.out.println(getName() + "开机了");
    }
}

```

```java
package day09;

import day09.FactoryPattern.Computer;
import day09.FactoryPattern.Huawei;
import day09.FactoryPattern.Mac;

public class FactoryPattern {
    /**
     * 定义一个方法，创建对象返回
     *
     * @param info
     * @return
     */
    public static Computer createComputer(String info) {
        switch (info) {
            case "Mac":
                Computer computer1 = new Mac();
                computer1.setName("MacBook Air");
                computer1.setPrice(9999);
                return computer1;
            case "Huawei":
                Computer computer2 = new Huawei();
                computer2.setName("华为");
                computer2.setPrice(9980);
                return computer2;
            default:
                return null;
        }
    }
}

```

```java
package day09;

import day09.FactoryPattern.Computer;
import day09.FactoryPattern.FactoryPattern;

public class FactoryDemo {
    public static void main(String[] args) {
        Computer mac = FactoryPattern.createComputer("Mac");
        mac.start();
        Computer huawei = FactoryPattern.createComputer("Huawei");
        huawei.start();
    }
}

```

![image-20220813114627864](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131146930.png)

![image-20220813114820905](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131148983.png)

