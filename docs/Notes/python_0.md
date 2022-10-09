# python基础知识学习

这份笔记来自研究生时期自学python的一个记录，正好可以顺带回顾一下python的基本概念。

## 基础概念介绍

### 变量

- [ ] 在程序中可以随时修改变量的值，而python将始终记录变量的最新值；
- [ ] **定义Variable**：enemy="hello python world"（单引双引都可以）；名称变量要加"",名称变量只包含字母、数字、下划线_；也不要用python的关键字、函数名或者特殊单词作变量名；慎用l和o，有可能被误认为1和0；
- [ ] =赋值；==等于；!=不等于；+=即可作为加值赋值，又可创建多行字符，属于原地修改运算符（包括-=,*=,/=,%=）；以上符号左右最好多一个空格（格式要求）；**表示乘方运算；%求模运算符（返回余数）；
- [ ] \t制表符；\n换行符；#标注注释；\为转义字符；在三个引号表示的字符串中无需转义字符；
- [ ] 通过 + 与" "拼接字符串；字符串若乘以整数则会输出新字符串；
- [ ] 在要求很多条件都满足才继续运行的程序中，可定义一个变量，用于判断整个程序是否处于活动状态，这个变量被称为**标志**；
- [ ] 用'''前后包围内容表示注释；
- [ ] python可使用反斜线\进行换行操作；

```python
active = True
while active:#（将=True省略了）
    number = 1
    if number == 2:
        active = False
    else:
        print(number)
#将active设置成true，使得程序最初处于活动状态；
```

- [ ] 有两种方式可以声明数据类型是布尔型，其一是直接生命（* = True），其二则是通过==/!=/<等比较；

### 方法

- [ ] 方法通过 . 跟在变量后面，用以定义对变量所做的操作，已知方法并不更改变量本身；
- [ ] () 内则是方法的信息；

```python
常见方法（一）
.title()#首字母大写；.upper()#全部大写；.lower()#全部小写；
.strip()#删除空白；.lstrip() .rstrip()#分别表示开头和结尾；
.append()#在列表尾添加元素
.insert(1, )#在列表第二个位置添加元素
.pop(3)#列表第四个元素被弹出（引用该元素，但列表中该元素被删除）
.sort()永久排序
.sort(reverse=True)永久倒排序
.reverse()永久倒序
```

### 函数

- [ ] **定义函数**
```python
def greet_user(username):
    print('Hello,' + username.title() + '!')
greet_user('jack')
#如上，username为一个形参，表示函数完成工作所需要的一项信息；
#'jack'则为一项实参，实参是调用函数时传递给函数的信息；
```

- [ ] 向函数传递实参的方式有很多，可使用**位置实参**，这要求实参的顺序与形参的顺序相同；也可使用**关键字实参**，其中每个实参都由变量名和值组成；在调用函数时，python必须将函数调用中的每个实参都关联到函数定义中的一个形参，最简单的关联方式即是基于实参的顺序，或者在实参中将名称与值关联起来；在编写函数时，可给每个形参指定**默认值**；
- [ ] 形参名的*让python创建一个元组，并将收到的所有实参都装到这个元组之中，python先匹配位置实参和关键字实参，再将余下的实参都收集到最后一个形参中；

```python
def make_pizza(size,*toppings):
    print('\nMaking a ' + str(size) + '-inch pizza with the following toppings:')
    for topping in toppings:
        print('- ' + topping)
make_pizza(12,'mushrooms','green peppers','extra cheese')
```

- [ ] 可以将函数存储在被称为**模块**的独立文件中，再将模块导入到主程序中；模块是扩展名为.py的文件；

```python
#导入模块中的特定函数
from module_name import function_0,function_1
#引用模块中的函数
import module_name
module_name.function()
#给函数指定别名
import function_0 as f
#导入模块中的所有函数
from module_name import *
```

常用函数

- [ ] 函数sorted(places,reverse=True)暂时倒序
- [ ] 函数str()使python将非字符串值表示为字符串；比如 age=23 将age定义为一个int变量，它不知道age是2和3还是23
- [ ] 函数print()为python的输出函数
- [ ] 函数range()从指定的第一个值开始一直数到第二个值（不包括第二个值）
- [ ] 函数list(range(1,11))将其转化为列表
- [ ] 函数input('...')引号中的...是要求玩家输入内容的提示
- [ ] 函数int()将数字的字符串表示转换为数值表示

```python
prompt = "I'm 17 years old."
prompt += 'how old are you?'
age = input(prompt)
print("I'm" + age + "years old")
```

- [ ] 函数open()接受一个参数（要打开的文件的名称），并返回一个表示文件的对象；调用open()时可以在前面加上with，关键词with在不再需要访问文件后将其关闭；windows系统使用反斜杠\表示**相对文件路径**，而python使用斜杠/；

```python
#可指定读取模式r，写入模式w，附加模式a，读写模式r+等，默认为r；
with open('e:/黄金时代.txt','w') as file:
    contents = file.read()
    print(contents)
```

### 语句

- [ ] cd语句
- [ ] pass语句让python什么都不要做；
- [ ] del语句用于删除；
- [ ] for循环语句：python根据缩进来判断代码行之间的关系，需注意；

```python
numbers = [1,2]
for number in numbers:
    number = number**2
    print(number)
```

- [ ] if语句与条件测试（布尔表达式）

```python
numbers = list(range(1,11))
for number in numbers:
    if number < 4:
        print(number**2)
    elif number < 7:
        print(number)
    elif number < 10:
        print(number-3)
    else:
        print('wow!')
```

- [ ] while语句（选择退出循环的条件）如果条件判断永远为True则循环永不停止，称为无限循环，此时可用CTRL+C关闭程序运行；

```python
number = 1
while number <= 5:
    print(number)
    number += 1
```

- [ ] break语句立即退出循环，不再运行循环中余下的代码，也不管条件测试的结果如何；continue语句则是返回到循环开头，并根据条件测试结果决定是否继续执行循环；
- [ ] import语句允许在当前运行的程序文件中使用模块的代码；需要注意，所有的import语句都应放在文件开头；
- [ ] try/except/else/finally语句用于处理程序正常执行过程中出现的一些异常情况，其完整格式如下，[详见](https://blog.csdn.net/f156207495/article/details/78387617/)；

```python
try:
    Normal execution block
except A:
    Exception A handle
except B:
    Exception B handle
except:
    Other exception handle
else:
    if no exception,get here
finally:
    print("finally")
```

### 列表

- [ ] 列表用[]表示，如：places=['toyko','paris','london','new york']
- [ ] 方括号中索引0表示第一个位置，负数则表示倒数第几个位置；替换列表元素：places[0] = 'beijing'
- [ ] **切片** numbers[1:4] 表示从列表numbers中第二个元素起取三个元素（4-1=3）
- [ ] 可以利用切片创建副本，如 squares = numbers[:]
- [ ] **元组**是不可变的列表，使用圆括号而非方括号来标识；元组元素无法修改，只能通过给存储元组的变量赋值重新定义整个元组；
- [ ] 一些类型比如字符串可以被列表访问，索引字符串的行为就像索引包含字符串中每个字符的列表一样；与字符串一样，+可以拼接列表，*可以重复列表；

### 字典

- [ ] 字典是一系列**键-值**对，每个键都与一个值相关联，可以使用键访问与之相关联的值；值可以是数字、字符串、列表甚至字典；字典存储的是一个对象的多种信息，因此值可以是python中的任意对象；
- [ ] 字典的表示：**{'键名称':'值名称', ... }**
- [ ] 输出字典的值，如：print(cities['London'])
- [ ] 遍历字典（k与v分别指key与value，指键和值）；.item()方法把字典中每对key和value组成一个元组，并把这些元组放在列表中返回；

```python
cities = { 
    'London':'UK', 
    'New York':'America',
    'Paris':'France'
}
#给字典添加新的键值对
cities['Rome'] = 'Itali'
#遍历字典
for k,v in cities.items():
    print('\nKey:' + k)
    print('Value:' + v)
#遍历键
for name in cities.keys():
    print(name.title())
#使用集合（集合类似于列表，但集合中元素不存在重复；此外，集合内元素间没有顺序）
for country in set(cities.values()):
    print('\n' + country.title())
```

- [ ] **嵌套**：包括在字典中嵌套列表、在列表中嵌套字典、在字典中嵌套字典；每当需要在字典中将一个键关联到多个值时，都可以在字典中嵌套一个列表；

```python
#创建一个用于存储外星人的空列表
aliens=[]
#创建30个绿色的外星人
for alien_number in range(30):
    new_alien = {'color':'green','points':5,'speed':'slow'}
    aliens.append(new_alien)
#显示前五个外星人
for alien in aliens[:5]:
    print(alien)
print('...')
#显示创建了多少外星人
print('total number of aliens:' + str(len(aliens)))
```

### 类

- [ ] 类将函数和数据整洁地封装起来；编写类时，定义一大类对象（一切事物皆是对象）都有的通用行为，基于类创建对象时（称作**实例化**），每个对象都自动具备这种通用行为，然后根据需要赋予每个对象独特个性；根据约定，首字母大写的名称指类；类名采用驼峰命名法，即将类名中每个单词的首字母都大写，而不使用下划线，实例名和模块名都采用小写格式，并在单词之间加上下划线；
- [ ] 类中的函数称为方法；

```python
#创建类
class Dog():
   #初始化属性;每个与类相关联的方法调用都自动传递实参self；注意init左右有两个下划线；
    def __init__(self,name,age):
        #self前缀的变量可供类中所有方法使用
        self.name=name
        #获取存储在形参age中的值，并将其存储到变量age中，然后该变量被关联到当前创建的实例；
        #这种可以通过实例访问的变量称为属性；
        self.age=age
#类中使用一个空行来分隔方法；模块中使用两个空行来分隔类；
    #定义类的方法
    def sit(self):
        print(self.name.title() + ' is now sitting')
#创建实例
my_dog = Dog('jack',6)
#调用方法
my_dog.sit()
#创建子类
class BigDog(Dog):
    def __init__(self,name,age)
    #初始化父类属性
    super().__init__(name.age)
```

- [ ] 修改**属性**的值，可以直接通过实例进行修改，可以通过方法进行设置，也可以通过方法递增；
- [ ] 一个类**继承**另一个类时，将自动获得另一个类的所有属性和方法，原有的类称为父类，新类称为子类，子类继承了父类，同时还可以定义自己的属性和方法；要在子类中重写父类的方法，只需定义同名函数即可；
- [ ] 类、模块、包、库：模块的物理表现形式为*.py文件，包为多个*.py文件，库则是处理特定问题的包；

#### 数据

- [ ] python使用模块json来存储与访问*.json数据，使用模块csv来存储与访问*.csv数据；CSV文件是指将数据作为一系列以逗号分隔的值写入，

```python
#先导入json模块
import json
#要存储的数据
numbers = [2,3,5,7,11]
#定义要创建的数据文件
filename = 'numbers.json'
#创建数据文件为对象（数据文件在工作区文件夹创建）
with open(filename,'w') as f_obj:
    #将数据存入数据文件
    json.dump(numbers,f_obj)
#读取数据文件
with open(filename) as f_re:
    data = json.load(f_re)
print(data)
```

### 库

例如

- [ ] **安装matplotlib库**：首先确保已经安装python，然后用pip命令（cmd窗口输入pip即可查看pip命令）安装matplotlib模块；进入到cmd窗口（Windows+R打开运行窗口，输入cmd）下，执行`python -m pip install -U pip setuptools`进行升级；接着键入`python -m pip install matplotlib`进行自动的安装，系统会自动下载安装包；安装完成后，可以用`python -m pip list`查看本机的安装的所有库，确保已经安装成功；最后，进入软件输入`import matplotlib`，如果没有报错，就说明可以使用了；`python -m pip`也可以直接用`pip3`代替；
- [ ] **安装pandas**：同理，输入`python -m pip install pandas`即可；所有python的扩充库均可以如此安装；[matplotlib](#as1xvq)、[pandas](#5gg4ul)、[numpy](#tsgxmm)被称为机器学习三剑客；

#### **matplotlib库 **$（数学绘图）$

pyplot模块

- [ ] plot函数：绘制折线图；
- [ ] show函数：显示图表；
- [ ] title函数：设置图表标题；
- [ ] xlabel/ylabel函数：设置坐标轴标签；
- [ ] tick_params函数：设置刻度标记的大小；

```python
import matplotlib.pyplot as plt
values = [1,2,3,4,5]
squares = [1,4,9,16,25]
plt.plot(values,squares,linewidth = 5)
plt.title('Square Numbers',fontsize=24)
plt.xlabel('value',fontsize=14)
plt.ylabel('Square of Value',fontsize=14)
plt.tick_params(axis = 'both',labelsize=14)
plt.show()
```

得到：<br />![](https://cdn.nlark.com/yuque/0/2019/png/179680/1548671489542-5090d97f-d1de-4c2b-89ea-257c47b658df.png#align=left&display=inline&height=280&originHeight=480&originWidth=640&status=done&width=373)

- [ ] scatter函数：绘制散点图；matplotlib默认蓝色点和黑色轮廓，可使用edgecolor = 'none'删除轮廓；参数s指点的直径；如plt.scatter(x,y,c = 'red',edgecolor = 'none',s = 40)；c = 'red'表示自定义颜色，也可以直接使用RGB颜色；
- [ ] 使用**颜色映射**：plt.scatter(x,y,c = y,cmap = plt.cm.Blues,edgecolor = 'none',s = 40)将y值较小的点显示为浅蓝色，y值较大的点显示为深蓝色；附图显示了cmaps中所有的颜色映射；

![](https://cdn.nlark.com/yuque/0/2019/png/179680/1548672756869-64488d9f-9fdf-4a2e-a210-a6669214241b.png#align=left&display=inline&height=259&originHeight=458&originWidth=1322&status=done&width=747)<br />![](https://cdn.nlark.com/yuque/0/2019/png/179680/1548672763068-89c8039e-756a-446d-8870-0ea9fa399450.png#align=left&display=inline&height=233&originHeight=432&originWidth=1384&status=done&width=747)<br />![](https://cdn.nlark.com/yuque/0/2019/png/179680/1548672770318-6cb561ae-9934-4a75-b901-0f4761ae9673.png#align=left&display=inline&height=262&originHeight=503&originWidth=1435&status=done&width=747)

- [ ] axis函数：设置坐标轴的取值范围；axis(a,b,c,d)表示横坐标a-b，纵坐标范围c-d；
- [ ] savefig函数：savefig('file_name.png',bbox_inches='tight')，第二个实参表示裁去空白区域，无需的话可省略；

_操作实例：一个简单的随机漫步模型_<br />[random_walk.txt](https://www.yuque.com/attachments/yuque/0/2019/txt/179680/1548675418786-67fc4f2c-9892-4faa-bdea-7492d5bc2296.txt?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Ftxt%2F179680%2F1548675418786-67fc4f2c-9892-4faa-bdea-7492d5bc2296.txt%22%2C%22name%22%3A%22random_walk.txt%22%2C%22size%22%3A1237%2C%22ext%22%3A%22txt%22%2C%22type%22%3A%22text%2Fplain%22%2C%22card%22%3A%22file%22%7D)

- [ ] figure函数：用于指定图表大小；figure(dpi=128,figsize=(10,6))，若不指定dpi，python会默认屏幕分辨率位80像素/英寸；

pygal模块（绘制矢量图）

- [ ] Radar函数：雷达图；（注意这个创建实例化对象的过程）

```python
import pygal,numpy
#创建一个实例化对象
radar_chart = pygal.Radar()
#开始作图
radar_chart.x_labels = ['population','beauty','location','economy','weather','environment']
radar_chart.add('city A',[6,7,6,8,9,7])
radar_chart.add('city B',[8,7,8,9,6,5])
radar_chart.add('city C',[4,9,8,9,6,7])
#保存为svg文件
radar_chart.render_to_file('a.svg')
```

- [ ] Line函数：创建线图；
- [ ] HorizontalLine函数：绘制水平线图；
- [ ] Bar函数：创建直方图；

```python
import pygal,numpy
#使用pygal创建一个筛子
from random import randint
class Die():
    def __init__(self,num_sides = 6):
        #筛子默认为6面，若创建实例die_1 = Die(10)，则筛子有10面；
        self.num_sides = num_sides
    def roll(self):
        return randint(1,self.num_sides)
#根据类创建实例
die = Die()
#掷几次筛子，将结果存储在一个列表中
results = []
for roll_num in range(1000):
    result = die.roll()
    results.append(result)
#分析结果
frequencies = []
for value in range(1,die.num_sides + 1):
    frequency = results.count(value)
    frequencies.append(frequency)
#使用pygal对结果进行可视化
hist = pygal.Bar()
hist.title = 'roll dies'
hist.x_labels = ['1','2','3','4','5','6']
hist.x_title = 'result'
hist.y_title = 'frequency'
hist.add('D6',frequencies)
hist.render_to_file('roll_dies.svg')
```

#### **pandas库 **$（数据分析）$

- [ ] Pandas有三种数据结构形式，分别为Series，DataFrame和索引对象，其中数据帧(DataFrame)是一种带行标签和列标签，支持相同类型数据和缺失值的多维数据的二维表格型数据结构，可以简单的理解为数据的行和列的表格；

#### **numpy库 **$（数值计算）$

- [ ] genfromtxt()方法读取TXT文件，若当前数据和代码在同一目录则无需指示目录，delimiter参数指定分隔符，dtype参数指定为str类型或其他；

random模块

- [ ] rand函数：生成一个[0，1）之间的随机浮点数；rand(3,2)表示生成一个3x2的浮点数矩阵；
- [ ] randn函数：返回一个具有标准正态分布的样本；randn(4,3,2)表示生成4个3x2的矩阵；
- [ ] randint函数：返回随机整数；randint(a)指定区间[0,a)；randint(low=5, high=10, size=(3,2))则指定了区间范围[5，10)与返回值规模（3x2矩阵）；
- [ ] normal函数：返回高斯分布随机数；normal(loc=a, scale=b, size=None)，loc均值，scale标准差；
- [ ] shuffle函数：将序列的所有元素重新随机排序，即打乱序列；序列指字符串、列表、元组等；需要注意，shuffle函数只打乱序列，而不返回序列；
- [ ] choice函数：返回一个随机项；例如choice(['a','b','c'])输出abc其中一个，choice(5,3,p=[0.3,0.3,0.4])表示生成3个小于5的随机数，并指定概率分别为0.3，0.3，0.4；
- [ ] binomial函数：binomial(n,p,size=None)表示对一个二项分布$P(N)=C_n^sP^s(1-P)^{n-s}$进行采样，s为成功次数，size为采样次数；如n=5,p=0.2,size=1000表示5个发生概率为0.2的事件，其中s个同时发生的概率，采样1000次，函数返回值为s；

```python
from numpy import random
print(sum(random.binomial(3, 0.2, size=10)==1)/10)
#若直接
print(random.binomial(3, 0.2, size=10)==1)
#则返回的为一个包含True与False的列表；当size很大时，True的个数与size比值很接近P(N)；
```

- [ ] RandomState函数：指定种子值，种子值可以保持每次计算的随机结果不变；用法例如random.RandomState(0).randn(4,3,2)；
- [ ] bytes函数：返回随机字节；bytes(length)中length定义了字节长度；
- [ ] permutation函数：返回一个随机排列；如permutation(10)，permutation([1,2,3,4,5])

random模块里的分布函数

- [ ] 贝塔分布：beta(a,b,size)
- [ ] 二项分布：binomial(n,p,size)
- [ ] 负二项分布：negative_binomial(n,p,size)
- [ ] 卡方分布：chisquare(df,size)
- [ ] 非中心卡方分布：noncentral_chisquare(df,nonc,size)
- [ ] 迪利克雷分布：dirichlet(alpha,size)
- [ ] 指数分布：exponential(scale,size)
- [ ] F分布：f(dfnum,dfden,size)
- [ ] 非中心F分布：noncentral_f(dfnum,dfden,nonc,size)
- [ ] 伽马分布：gamma(shape,scale,size)
- [ ] 几何分布：geometric(p,size)
- [ ] 耿贝尔分布：gumbel(loc,scale,size)
- [ ] 超几何分布：hypergeometric(ngood,nbad,nsample,size)
- [ ] 拉普拉斯分布：laplace(loc,scale,size)
- [ ] 逻辑分布：logistic(loc,scale,size)
- [ ] 对数正态分布：lognormal(mean,sigma,size)
- [ ] 对数级数分布：logseries(p,size)
- [ ] 多项分布：multinomial(n,pvals,size)
- [ ] 正态分布/高斯分布：normal(loc,scale,size)
- [ ] 逆高斯分布：wald(mean,scale,size)
- [ ] 多元正态分布：multivariate_normal(mean,cov,size)
- [ ] 帕累托分布：pareto(a,size)
- [ ] 泊松分布：poisson(lam,size)
- [ ] 三角形分布：triangular(left,mode,right,size)
- [ ] 均匀分布：uniform(low,high,size)
- [ ] 齐普夫分布：zipf(a,size)

array模块

#### **SciPy库**

SciPy（http://scipy.org）是科学计算领域针对不同标准问题域的包集合。以下是SciPy中包含的一些包：scipy.integrate数值积分例程和微分方程求解器scipy.linalg线性代数例程和基于numpy.linalg的矩阵分解scipy.optimize函数优化器（最小化器）和求根算法scipy.signal信号处理工具scipy.sparse稀疏矩阵与稀疏线性系统求解器scipy.specialSPECFUN的包装器。SPECFUN是Fortran语言下实现通用数据函数的包，例如gamma函数。scipy.stats标准的连续和离散概率分布（密度函数、采样器、连续分布函数）、各类统计测试、各类描述性统计。SciPy与NumPy一起为很多传统科学计算应用提供了一个合理、完整、成熟的计算基础。

#### **scikit-learn库**

仅仅七年，scikit-learn就拥有了全世界1500位代码贡献者。其中包含以下子模块。· 分类：SVM、最近邻、随机森林、逻辑回归等· 回归：Lasso、岭回归等· 聚类：k-means、谱聚类等· 降维：PCA、特征选择、矩阵分解等· 模型选择：网格搜索、交叉验证、指标矩阵· 预处理：特征提取、正态化

#### **statsmodel库**

与scikit-learn相比，statsmodels包含经典的（高频词汇）统计学、经济学算法。它所包含的模型如下。· 回归模型：线性回归、通用线性模型、鲁棒线性模型、线性混合效应模型等· 方差分析（ANOVA）· 时间序列分析：AR、ARMA、ARIMA、VAR等模型· 非参数方法：核密度估计、核回归· 统计模型结果可视化statsmodels更专注于统计推理，提供不确定性评价和p值参数。相反，scikit-learn更专注于预测。

### 一键升级所有python库

```python
import pip
from subprocess import call
from pip._internal.utils.misc import get_installed_distributions
for dist in get_installed_distributions():
    call("pip3 install --upgrade " + dist.project_name,shell = True)
```