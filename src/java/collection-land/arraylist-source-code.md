---
title: ArrayList源码深入
order: 1
---

## ArrayList扩容原理
当我们写下了如下代码
`ArrayList<Integer> list = new ArrayList<>();`
调用了ArrayList类的无参构造方法创建了一个ArrayList对象实例。
```java
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```
并且给Object[] elementData（用于存储数组列表元素的数组）一个初始的空数组。

当我们调用了add方法将指定的元素添加到elementData末尾的时候
add方法如下
```java
/**
* 将指定的元素追加到此列表的末尾。
*/
public boolean add(E e) {
    //添加元素之前，先调用ensureCapacityInternal方法
    ensureCapacityInternal(size + 1);  // Increments modCount!!
	//这里看到ArrayList添加元素的实质就相当于为数组赋值
	elementData[size++] = e;
	return true;
}
```
简单来说在添加第一个元素之前先进行扩容，具体调用了
`ensureCapacityInternal(size + 1)`方法得到最小扩容量
在接着看上面👆🏻的方法
```java
//得到最小扩容量
private void ensureCapacityInternal(int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
    	// 获取默认的容量和传入参数的较大值
    	minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
	}
	ensureExplicitCapacity(minCapacity);
}

```
> 该方法的参数minCapacity为1，调用Math.max(DEFAULT_CAPACITY, minCapacity);方法之后minCapacity为10。

接着调用`ensureExplicitCapacity(minCapacity);`方法判断是否需要扩容
```java
//判断是否需要扩容
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;
	// overflow-conscious code
	if (minCapacity - elementData.length > 0)
    	//调用grow方法进行扩容，调用此方法代表已经开始扩容了
    	grow(minCapacity);
}

```
因为第一次这个时候minCapacity=10，elementData.length=0；所以肯定需要扩容，继续调用`grow(minCapacity)`方法进行扩容
```java
/**
* 要分配的最大数组大小
*/
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

/**
* ArrayList扩容的核心方法。
*/
private void grow(int minCapacity) {
    // oldCapacity为旧容量，newCapacity为新容量
    int oldCapacity = elementData.length;
	//将oldCapacity 右移一位，其效果相当于oldCapacity /2，
	//我们知道位运算的速度远远快于整除运算，整句运算式的结果就是将新容量更新为旧容量的1.5倍，
	int newCapacity = oldCapacity + (oldCapacity >> 1);
	//然后检查新容量是否大于最小需要容量，若还是小于最小需要容量，那么就把最小需要容量当作数组的新容量，
	if (newCapacity - minCapacity < 0)
    	newCapacity = minCapacity;
	// 如果新容量大于 MAX_ARRAY_SIZE,进入(执行) `hugeCapacity()` 方法来比较 minCapacity 和 MAX_ARRAY_SIZE，
	//如果minCapacity大于最大容量，则新容量则为`Integer.MAX_VALUE`，否则，新容量大小则为 MAX_ARRAY_SIZE 即为 `Integer.MAX_VALUE - 8`。
	if (newCapacity - MAX_ARRAY_SIZE > 0)
    	newCapacity = hugeCapacity(minCapacity);
	// minCapacity is usually close to size, so this is a win:
	elementData = Arrays.copyOf(elementData, newCapacity);
}

```
> **int newCapacity = oldCapacity + (oldCapacity >> 1),所以 ArrayList 每次扩容之后容量都会变为原来的 1.5 倍左右（oldCapacity 为偶数就是 1.5 倍，否则是 1.5 倍左右）！** 奇偶不同，比如 ：10+10/2 = 15, 33+33/2=49。如果是奇数的话会丢掉小数.

- 当 add 第 1 个元素时，oldCapacity 为 0，经比较后第一个 if 判断成立，newCapacity = minCapacity(为 10)。但是第二个 if 判断不会成立，即 newCapacity 不比 MAX_ARRAY_SIZE 大，则不会进入 hugeCapacity 方法。数组容量为 10，add 方法中 return true,size 增为 1。
- 当 add 第 11 个元素进入 grow 方法时，newCapacity 为 15，比 minCapacity（为 11）大，第一个 if 判断不成立。新容量没有大于数组最大 size，不会进入 hugeCapacity 方法。数组容量扩为 15，add 方法中 return true,size 增为 11。
- 以此类推···

总结：
> Q：说一说ArrayList的扩容机制吧。
> A：当我们创建一个ArrayList对象的时候，底层其实是一个Object数组并且在我们创建的时候进行了初始化为空数组；
> 当我们第一次调用add方法进行添加元素的时候，首先会调用`Arrays.copyOf`方法对数组进行一个长度为10的扩容，扩容完毕之后再进行size++和元素的添加。
> 然后第二次调用add方法进行添加元素的时候，因为当前所需容量小于10所以不需要扩容。
> 当添加到第11个元素的时候，因为超过数组的长度10，所以会按照原先的1.5倍左右进行扩容，扩容完毕之后再进行size++和元素的添加。
> ······

