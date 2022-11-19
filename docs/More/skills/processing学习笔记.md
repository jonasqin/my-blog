---
tags: [processing,笔记,教程]
---

# processing学习记录

之所以想学processing，是因为看到一些作品，很符合我一直以来对数字生成艺术的想法吧。貌似也不难，感觉可以花点时间学习下。

大部分“方法”（暂时用python里的称呼对应过来）在[官网](https://processing.org/)的reference中都是能找到的，先学了一个小案例：

```java
void setup() {
  size(1000,1000);
  background(#D82E8C);
}

void draw() {
  if (mousePressed) {
    fill(#1DED5D,50);
  } else {
    fill(#DBED1D,50);
  }
  stroke(#951DED);
  strokeWeight(10);
  ellipse(mouseX,mouseY,160,80);
}
```

在processing里分为两类生成函数，一个是`void setup()`一个是`void draw()`，前者是一次性、后者是持续发挥作用。比如示例里，size约定了画布为1000*1000像素，背景色是#D82E8C（直接用RGB色值也可，也可以加一个透明度的参数，0-256区间内）。而draw中是用了一个if-else句式，意思是鼠标按压下去，轨迹都是#1DED5D色；否则就是#DBED1D色。以鼠标所在点为圆心，160为最长直径（横向），80为纵向直径；stroke代表描边颜色，加上-weight后缀代表描边宽度。

值得注意的一点是，processing中所有通过加后缀形式造的方法名称，后缀首字母都是大写的，是一个很好的标识。

除去椭圆ellipse，其他2D图形方法包括：![](https://jojonas-blogs.oss-cn-guangzhou.aliyuncs.com/images/20221119170740.png)

processing中包含很多类变量，int整数型（int x=11）、float浮点型（float x=11.1）、char字符类型(char x='lalala')、string字符串类型（string x="lalala"）、PImage图像类型（用`loadImage()`来“赋值”）。通过定义全局变量，以及x=x+1循环语句，可以生成很多有意思的内容了。（void draw()本身相当于是个无限循环运行的脚本）

比如上个示例，background是放在setup之中的（可以理解为全局设置），如果拖到draw里，也就是每个时间点上，都是这样一个背景，那么鼠标移动就不会带残影了。而如何利用pmouseX等（p应该是prev的意思，指鼠标上一时刻的位置），还可以实现即时绘图。

与或非：`&&`  `||`  `!=`  