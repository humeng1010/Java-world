
# 装饰模式

![image-20220813115051888](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131150994.png)



```java
package day09.DecoratorPattern;

/**
 * 共同父类
 */
public abstract class InputStream {
    public abstract int read();

    public abstract int read(byte[] buffer);

}

```

```java
package day09.DecoratorPattern;

import java.util.Arrays;
/**
* 原始类
*/
public class FileInputStream extends InputStream {
    @Override
    public int read() {
        System.out.println("低性能读取了一个字节a");
        return 97;
    }

    @Override
    public int read(byte[] buffer) {
        buffer[0] = 97;
        buffer[1] = 98;
        buffer[2] = 99;
        System.out.println("低性能的读取了" + Arrays.toString(buffer));
        return 3;
    }
}

```

```java
package day09.DecoratorPattern;

/**
 * 装饰类：继承InputStream拓展原始类的功能
 */
public class BufferedInputStream extends InputStream {
    private InputStream inputStream;

    public BufferedInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    @Override
    public int read() {
        System.out.println("提供8kb缓冲区");
        return inputStream.read();
    }

    @Override
    public int read(byte[] buffer) {
        System.out.println("提供8kb缓冲区");
        return inputStream.read(buffer);
    }
}

```

```java
package day09.DecoratorPattern;
/**
* 运行测试类
*/
public class Demo {
    public static void main(String[] args) {
        FileInputStream fileInputStream = new FileInputStream();
        BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
        int read = bufferedInputStream.read();
        System.out.println(read);
        int read1 = bufferedInputStream.read(new byte[3]);
        System.out.println(read1);
    }
}

```



![image-20220813123046809](https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202208131230895.png)