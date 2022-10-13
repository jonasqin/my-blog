---
tags: [python,知识学习]
---

# python爬虫

> 本笔记基本内容以《python3网络爬虫开发实战》一书（2008.4第1版）为蓝本，笔记指示页码均可在书中寻找

## 环境配置

- [ ] **爬虫可以简单分为几步：抓取页面，分析页面和存储数据**；在抓取页面的过程中，需要模拟浏览器向服务器发出请求，需要用到requests库；requests库是一个阻塞式HTTP请求库，程序只在请求得到响应后才会进行下一步处理；aiohttp是一个提供异步Web服务的库，借助async/await关键字的写法大大提高效率；官方还推荐安装字符编码检测库cchardet和加速DNS的解析库aiodns；
- [ ] selenium库是一个自动化测试工具，可以驱动浏览器执行特定的动作，抓取一些Javascript渲染的页面十分有效；selenium需要浏览器配合使用，可使用无界面浏览器PhantomJS，抓取过程会在后台进行，不再有窗口出现；不过PhantomJS已经凉了；使用Chrome浏览器，需要其版本号选择对应的ChromeDriver，否则会报错；windows系统建议直接将chromedriver.exe文件拖到python的script目录下，以配置环境变量（或者将chromedriver配置到$PATH）；随后执行`from selenium import webdriver`
 `browser = webdriver.Chrome()`若弹出一个空的Chrome浏览器则配置成功；

解析库的安装

- [ ] lxml库支持HTML和XML的解析，支持XPath解析方式；Beautiful Soup库依赖于lxml库；通过以下代码检验是否安装成功（该库名称就是bs4）；

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup('<p>Hello<p>','lxml')
print(soup.p.string)
```

- [ ] pyquery库提供了和jQuery类似的语法来解析HTML文档，支持CSS选择器；爬虫过程中遇到的验证码需要OCR来识别，tesserocr是python的一个OCR识别库，需要先安装tesseract软件；<br />

```python
import tesserocr
from PIL import Image
image = Image.open('ocr.png')
print(tesserocr.image_to_text(image))
#可以直接调用file_to_text()方法
import tessrocr
print(tesserocr.file_to_text('ocr.png'))
```

- [ ] PIL为python的图像处理标准库，但目前只支持到2.7，可通过pip安装其分支库pillow；
- [ ] 数据库的安装：关系型数据库SQLite，MySQL，Oracle，SQL Server，DB2等以表的形式存储，而非关系型数据库的存储形式是键值对；<br />
- [ ] 存储库的安装：数据库仅提供存储数据的服务，若要和python交互，还需安装一些python存储库，如MySQL需要安装PyMySQL，MongoDB需要PyMongo等；<br />
- [ ] Web库的安装：web服务程序用于搭建网站，python主要使用这些web程序来搭建一些API接口，只需请求接口即可获得新的代理；常用的有Flask与Tornado，可使用pip3安装；<br />
- [ ] 爬虫框架的安装：通过anaconda安装scrapy；<br />
- [ ] 安装docker；Docker是一种流行的容器化实现方案，以轻量的方式实现了应用服务的打包；

## 爬虫基础

#### HTTP基本原理

- [ ] URI为统一资源标志符uniform resource identifier，URL为**统一资源定位符**uniform resource locator，URL/URI唯一指定了网站的访问方式，其中包括了访问协议、访问路径、资源名称；URL是URI的子集，URI还包括统一资源名称universal resource name；URL开头的http,https,ftp,sftp,smb等为**协议类型**；
- [ ] 网页由**超文本**hypertext解析而成，其源代码是一系列HTML代码，其中包含了一系列标签，比如img显示图片，p指定段落等；在浏览器中输入URL回车，浏览器会向网站所在的服务器发送请求，服务器接收到请求后进行处理和解析，然后返回对应的响应，响应中包含了页面的源代码等内容，浏览器对源代码进行解析，将网页呈现出来；
- [ ] **请求**包括：请求方法request method、请求的网址request URL、请求头request headers、请求体request body；常见的请求方法有GET（在浏览器中直接输入URL，包括在搜索框中搜索等）和POST（大多在表单提交时发起，其数据通常以表单的形式传输，而不体现在URL中，因为包含了用户名和密码；上传文件时，由于文件较大，也采用POST方式）；**请求头**用来说明服务器要使用的附加信息，比较重要的有**Host**（用于指定请求资源的主机IP和端口号）、**Cookie**（网站为了辨别用户进行会话跟踪而存储在用户本地的数据，这也是我们输入一次账户密码再次打开网站可以直接进入的原因）、Referer（用于标识请求从何页面发出，可用于来源统计、防盗链处理等）、User-Agent（可以使服务器识别客户使用的操作系统、浏览器的版本及信息，爬虫若无UA，可能会被识别出来）等；请求体一般承载POST请求中的表单数据，GET的请求体为空；<br />
- [ ] **响应**包括：响应状态码response status code，响应头response headers，响应体response body；响应状态码表示服务器的响应状态（200代表服务器正常响应，404代表页面未找到，500代表服务器内部发生错误，更多见$P85$）；响应头包含了服务器对请求的应答信息，如Content-Type，指定了返回的文档类型（text/html：HTML文档；application/x-javascript：Java文件；image/jpeg：图片；等）；**响应体**则是响应的正文数据，比如请求网页时响应体就是网页的HTML代码，请求一张图片时响应体就是图片的二进制数据，响应体就是爬虫要解析的对象；

#### 网页基础

- [ ] 网页由HTML、CSS、Javascript三大部分组成；
- [ ] **HTML**全称为超文本标记语言Hyper Text Markup Language，是网页的基础架构；图片、视频、段落均用不同的标签表示，它们之间又用布局标签div嵌套组合，形成网页的框架；
- [ ] **CSS**全称为层叠样式表cascading style sheets，“层叠”是指当HTML中引用了多个样式（大小、颜色、间距、排列等格式）文件且发生冲突时，浏览器能依据层叠顺序处理；CSS是唯一的网页页面排版样式标准；通常以css文件格式单独加载，通过link标签引入；
- [ ] **Javascript**是一种脚本语言；HTML与CSS配合，提供给用户的只是一种静态信息，缺乏交互性，JS则实现了实时交互的动态功能；通常以js文件单独加载，通过script标签引入；
- [ ] 一个网页的标准形式是html标签内嵌套head和body标签，head内定义网页的配置和引用，body定义网页的正文；根据W3C的HTML DOM标准，HTML文档中的所有内容（整个文档、HTML元素、元素内文本、HTML属性、注释）都是节点，HTML文档称为节点树结构；节点树中的节点拥有层级关系，常称父节点、子节点、兄弟节点，顶端节点称为根；
- [ ] CSS选择器根据id（写法：#后紧跟id内容）、class（写法：.后紧跟class名称）、标签名筛选（例如想选择二级标题，则直接用h2）来定位节点；选择器还支持嵌套选择，在各个选择器之间加上空格分隔开就可以代表嵌套关系，不加空格则表示并列关系；CSS选择器的其他语法规则见$P91$；

```html
#一个简单的HTML实例
<!DOCTYPE html>#定义文档类型
<html>
  <head>#网页头
    <meta charset="UTF-8"#指定了网页编码
          <title>This is a demo</title>#定义了网页标题，会显示到选项卡中
  </head>
<body>#网页体
  <div id="container">#定义区块
    <div class="wrapper">
      <h2 class="title">Hello World</h2>
      <p class="text">Hello, this is a paragragh.</p>#p代表段落
    </div>
  </div>
</body>
</html>#html标签的闭合
```

#### 爬虫的基本原理

- [ ] 如果互联网是一张大网，一个个网页则是这张大网的节点，节点间连线则是网页间链接，爬虫爬到一个节点，就可以顺着连线继续爬取下一个节点，便可以爬遍整张网络；
- [ ] 简单来说，爬虫就是获取网页并提取和保存信息的自动化程序；对于常规网页而言，抓取HTML源代码即可，然而很多网页采用Ajax、前端模块化工具创建，整个网页可能都是由JavaScript渲染出来的，原始的HTML代码是一个空壳，对于这样的网页，可以分析其后台Ajax接口，也可以使用selenium、splash这样的库来模拟JS渲染；
- [ ] 静态网页的内容通过写好的HTML代码指定，编写简单，加载速度快，但是可维护性差；而动态网页可以动态解析URL中参数的变化，关联数据库并动态呈现不同的页面内容，不再是一个简单的HTML，而可能由JSP、PHP、Python等语言编写的；
- [ ] **HTTP的无状态**是指HTTP协议对事物处理是没有记忆能力的，也就是说服务器不知道客户端是什么状态；缺少状态记录意味着如果后续需要处理前面的信息则必须重传；为了保持HTTP的连接状态，会话和cookies的技术出现了；会话在服务器，用于保存用户的会话信息，用户在web页之间跳转时存储在会话对象中的变量将不会丢失；cookies在客户端，浏览器再次访问服务器时会自动附带cookies，服务器通过cookies就可以鉴别用户进行响应；爬虫直接将登陆成功后获取的cookies放在请求头中直接请求，而不必重新模拟登录；

#### 代理

- [ ] 网站可能会采取一些反爬虫措施，比如服务器会检测某个IP在单位时间的请求次数，如果超过阈值便会拒绝服务，返回一些错误信息，称为**封IP**；一种有效实现IP伪装的方法是使用代理；代理即指使用代理服务器proxy server，其功能为代理用户去取得网络信息；代理服务器在客户端和服务器之间搭了一个桥，客户端向代理服务器发出请求，代理服务器再向web服务器发送请求，此时web服务器识别的真实IP 就不再是本机IP了，也就实现了IP伪装；爬虫使用代理就是为了隐藏自身IP，避免自身IP被封，爬取过程中可能需要不断更换代理；
- [ ] 代理的分类，根据协议区分，有FTP代理（主要用于访问FTP服务器，端口一般为21、2121等），HTTP代理（主要用于访问网页，端口一般为80、8080、3128等），SSL/TLS代理（主要用于访问加密网站，端口一般为443），RTSP代理（主要用于访问Real流媒体服务器，端口一般为554），Telnet代理（主要用于telnet远程控制，端口一般为23等），POP3/SMTP代理（主要用于POP3/SMTP方式收发邮件，端口一般为110/25），SOCKS代理（单纯传递数据包，端口一般为1080）；
- [ ] 常见的代理设置，可以使用网上的免费代理或者付费代理服务，或者使用ADSL拨号方式，拨一次号换一次IP，稳定性高；
- [ ] 代理IP可能被其他人使用来爬取同样的目标站点而被封禁，或者代理服务器突发故障，又或网络繁忙；所以需要提前做筛选，将不可用的代理剔除掉，保留可用代理，即使用代理池；代理池有四个基本模块：存储模块、获取模块、检测模块、接口模块；
- [ ] [获取随机代理](https://github.com/Python3WebSpider/ProxyPool) 
- [ ] ADSL非对称数字用户环路，其上行和下行带宽不对称，采用频分复用技术把普通的电话线分成了电话、上行和下行3个相对独立的信道，从而避免了相互间的干扰；可利用ADSL实现动态拨号；[使用ADSL爬取微信公众号文章](https://github.com/Python3WebSpider/Weixin)；

## 库

#### urllib库

- [ ] urllib库为python内置的HTTP请求库，包含四个模块：request（传入URL以及额外参数以模拟发送请求）、error（异常处理模块）、parse（工具模块，提供了拆分、解析、合并等URL处理方法）、robotparser（主要用来识别网站的robots.txt文件，然后判断网站是否可以被爬取）；

request模块

- **urlopen()方法**
- [ ] 可以完成简单网页的GET请求抓取；传递参数如下，一一解释：`urllib.request.urlopen(url,data=None,[timeout,]*,cafile=None,capath=None,cadefault=False,context=None)`
- [ ] 第一个参数毫无疑问是用来传递URL的；
- [ ] data参数是可选的，如果传递了这个参数，则请求方式不再是GET而为POST；
- [ ] timeout参数用于设置超时时间，单位为秒，如果请求超出了设置的时间还未得到响应，就会抛出异常，如果不指定参数就会使用全局默认时间；
- [ ] cafile与capath这两个参数分别指定CA证书和它的路径；
- [ ] context参数必须是ssl.SSLContext类型，用来指定SSL设置；
- [ ] cadefault参数现已弃用，默认值为False；

**Request类**

- [ ] 依然使用urlopen()方法发送请求，不过参数不再是URL，而是Request类型的对象，如此便可以灵活配置参数；
- [ ] Request的参数构造：`class urllib.request.Request(url,data=None,headers={},origin_req_host=None,unverifiable=False,method=None)`
- [ ] 只有url是必传参数，其余皆为可选参数；
- [ ] data参数必须为bytes（字节流）类型；
- [ ] headers参数为一个字典，可以通过headers{}直接构造请求头；添加请求头最常用的办法就是通过修改User-Agent来伪装浏览器，将默认的Python-urllib改成要伪装的浏览器；[如何随机更换UA标识](https://blog.csdn.net/codingforhaifeng/article/details/80506199)；header也可以用add_header()方法添加；
- [ ] origin_req_host为请求方的host名称或者IP地址；
- [ ] method参数则指定请求使用的方法，如GET、POST等；

**BaseHandler类**

- [ ] BaseHandler类是所有其他Handler类的父类，Handler类可以做到HTTP请求中一些更高级的操作，例如处理登陆验证、处理cookies、处理代理设置等；
- [ ] 有的网站打开时会弹出提示框，只有输入用户名和密码验证成功时才能查看页面：

```python
from urllib.request import HTTPPasswordMgrWithDefaultRealm,HTTPBasicAuthHandler,build_opener
from urllib.error import URLError

username = 'username'
password = 'password'
url = 'http://www.douban.com/'

p = HTTPPasswordMgrWithDefaultRealm()
p.add_password(None,url,username,password)
auth_handler = HTTPBasicAuthHandler(p)'''实例化该对象，参数即为添加了用户名和密码的p'''
opener = build_opener(auth_handler)'''使用build_opener函数构建一个Opener实例发送请求'''

try:
	result = opener.open(url)'''利用Opener的open方法打开链接'''
	html = result.read().decode('utf=8')
	print(html)
except URLError as e:
	print(e.reason)
```

- [ ] 又如添加代理：

```python
from urllib.request import ProxyHandler,build_opener
from urllib.error import URLError

proxy_handler = ProxyHandler({
 	'http':'http://127.0.0.1:9743',
  'https':'http://127.0.0.1:9743'
})'''在本地搭建一个代理，运行在9743端口上'''
opener = build_opener(proxy_handler)

try:
    response = opener.open('https://www.baidu.com')'''利用Opener的open方法打开链接'''
    html = response.read().decode('utf=8')
    print(html)
except URLError as e:
    print(e.reason)
```

- [ ] 又如处理cookies；详见$P110$

error模块

- [ ] **URLError类**：是Error模块的基类，它具有一个属性reason，即返回错误的原因；如上，可以避免程序异常终止，使得异常得到有效处理；
- [ ] **HTTPError类**：是URLError的子类，专门用来处理HTTP请求错误，有三个属性：code返回HTTP状态码；reason同父类；headers返回请求头；一个比较好的异常处理写法是，先捕获子类再去捕获父类错误；

parse模块

- [ ] **urlparse()方法**：实现URL的识别和分段；一个URL细分一下，“://”之前是协议scheme，再到第一个“/”之前是域名netloc，再到最后一个“/”之后是访问路径path，再到“;”之前是参数params，“？”之后是查询条件query（一般用于GET类型的URL），“#”之后是锚点，用于定位页面内部的下拉位置；由此可得一个标准URL的格式`scheme://metloc/path；params?query#fragment`；urlunparse()方法与其相反，只接受长度为6的列表；
- [ ] **urlsplit()方法**：与urlparse()类似，但是其params会合并到path之中；urlunsplit()同理；
- [ ] **urljoin()方法**：可用于生成链接，会分析第一个参数base_url的scheme、netloc、path三个参数，若作为第二个参数的新链接没有这三个参数，则会对其进行补充并返回结果；
- [ ] **urlencode()方法**：该方法可以调用字典，将字典类型转化为GET请求参数即query；parse_qs()方法则处理相反的工作返回字典；parse_qsl()与parse_qs()做同样工作，返回类型为元组组成的列表；
- [ ] **quote()方法**：调用内容将其转为URL编码格式；URL中带有中文参数时，可能会有乱码，可用quote()方法将中文字符转化为URL编码；unquote()方法则可以进行URL解码；

robotparser模块

- [ ] Robots协议也称爬虫协议，用于告诉爬虫和搜索引擎哪些页面可以抓取，哪些不可以，通常以robots.txt形式放在网站根目录下；robots.txt中，User-agent指定了该规则对什么爬虫有效（常见的搜索爬虫比如BaiduSpider，Googlebot，360Spider，YodaoBot等），*表示全体爬虫，Disallow和Allow则分别指定不允许（/表示不允许所有）和允许（排除某些限制）爬取的页面；
- [ ] RobotsFileParser类：只需在构造方法中提供robots.txt链接即可`urllib.robotparser.RobotFileParser(url = '')`；也可以不提供，通过set_url()方法设置；
- [ ] read()方法读取robots.txt文件并分析，必须执行；parse()方法用于解析，传入参数为robots.txt某些行的内容；can_fetch()方法传入两个参数，第一个User_agent，第二个是要抓取的URL，返回布尔值，表示是否可以抓取；mtime()返回上次抓取和分析robot.txt的时间；modified()则将当前时间设置为上次抓取和分析robots.txt的时间；

```python
from urllib.robotparser import RobotFileParser

rp = RobotFileParser()
rp.set_url('http://www.baidu.com/robots.txt')
rp.read()
print(rp.can_fetch('*','http://www.baidu.com/s?wd=something')
```

#### requests库

- [ ] 与urllib库的urlopen()方法相应的为get()方法；其他请求类型也直接用相应的方法，比如POST请求就用post()方法；在get()/post()等方法中通过指定files参数来上传文件、通过r.cookies（r见下方代码块）获取Cookies、设置verify参数为False跳过证书验证、proxies参数设置代理、timeout参数指定超时阈值、auth=('username','password')进行身份验证；对于GET请求的参数，可以用字典来存储，如：

```python
import requests
data = {
  'name':'germey',
  'age':'22'
}
r = requests.get("http://httpbin.org/get",params=data)
print(r.text)
#返回类型为str类型，但为JSON格式，若想直接解析返回结果得到字典格式，可使用
print(r.json())
```

- [ ] 如何保存百度图标？同理可以此方法获取音频、视频等；

```python
import requests
r = requests.get("http://www.baidu.com/favicon.ico")
with open('favicon.ico','wb') as f:
  f.write(r.content)
```

- [ ] 使用text属性获取响应内容（str类型），content获取响应内容（bytes类型），status_code获取状态码，headers获取响应头，cookies获取cookies，url获取URL，history获取请求历史等；

![未命名_meitu_0.jpg](https://cdn.nlark.com/yuque/0/2019/jpeg/179680/1550046651944-a22bc0b2-785e-4db3-8b87-a98206c40ccb.jpeg#align=left&display=inline&height=1640&name=%E6%9C%AA%E5%91%BD%E5%90%8D_meitu_0.jpg&originHeight=1243&originWidth=558&size=375915&status=done&width=736)

- [ ] session()方法可以模拟同一个会话，使得前后登录不必重复设置Cookies，可用于模拟在一个浏览器中打开同一站点的不同页面；

#### 正则表达式

- [ ] 正则表达式是处理字符串的强大工具；正则表达式匹配用一定的规则将特定的文本提取出来；一个常用的匹配方法是match()，向其传入要匹配的字符串以及正则表达式，就可以检测该正则表达式是否匹配字符串；对于match()的结果可以有group()输出匹配到的内容，span()输出结果的位置范围；

```python
import re
content = 'Hello 123 4567 World_this is a regex demo'
result = re.match('^Hello\s\d\d\d\s\d{4}\s\w{10}',content)
print(result)
#^匹配字符串开头，\s匹配空格，\d匹配数字，\w匹配字母及下划线；
# .*可以匹配除换行符外的任意字符；因为.可以匹配任意字符，而*则代表匹配前面的字符无限次；
#如果想提取4567，则可以利用子表达式对应分组提取，标志为()；
result_1 = re.match('^Hello\s\d{3}\s(\d+)\sWorld',content)
print(result_1.group(1))
```

![搜狗截图19年02月13日1622_1.png](https://cdn.nlark.com/yuque/0/2019/png/179680/1550046193500-5400c031-634d-4f25-8de8-27ad2a142e53.png#align=left&display=inline&height=608&name=%E6%90%9C%E7%8B%97%E6%88%AA%E5%9B%BE19%E5%B9%B402%E6%9C%8813%E6%97%A51622_1.png&originHeight=907&originWidth=1112&size=771458&status=done&width=746)

- [ ] 在**贪婪匹配**下， .* 会匹配尽可能多的内容；如需使用非贪婪匹配（匹配尽可能少的内容），则需在.*之后加一个?变成.*?；使用修饰符re.S作为match()匹配的参数，即可使.*?的匹配包括换行符在内；

![搜狗截图19年02月13日1626_2.png](https://cdn.nlark.com/yuque/0/2019/png/179680/1550046377415-6e4b23cf-27da-4e81-81ae-ea0430cbd658.png#align=left&display=inline&height=222&name=%E6%90%9C%E7%8B%97%E6%88%AA%E5%9B%BE19%E5%B9%B402%E6%9C%8813%E6%97%A51626_2.png&originHeight=331&originWidth=1110&size=291901&status=done&width=746)

- [ ] **转义匹配**：在字符前加反斜线（与latex语法一样），比如匹配.时用\.；
- [ ] match()方法从字符串的开头开始匹配，更适用于检测某个字符串是否符合某个正则表达式的规则；search()字符串则在匹配时扫描整个字符串，返回第一个匹配成功的结果；findall()则在search()方法的基础上返回所有匹配成功的结果；
- [ ] sub()方法用于替换字符，传入的第一个参数为要替换的字符串，第二个参数则是要替换成的字符串（赋值为空则是去掉原字符串），第三个参数则是原字符串content；
- [ ] compile()方法可以将正则字符串编译成正则表达式对象，以便在后面的匹配中使用；compile()方法中也可以直接使用re.S，这样在之后的匹配中就不必额外使用re.S修饰符了；

#### 解析库

XPath

- [ ] 网页的节点可以定义id、class等属性，节点间还具有层次关系，在网页中可以通过XPath或CSS选择器来定位节点；

![2019-03-02_09-32-52.jpg](https://cdn.nlark.com/yuque/0/2019/jpeg/179680/1551490439858-a4644d7e-385f-4828-af9d-89ebe54ee66a.jpeg#align=left&display=inline&height=220&name=2019-03-02_09-32-52.jpg&originHeight=394&originWidth=1337&size=236980&status=done&width=746)

- [ ] 想获取li节点内部的文本，可以使用/逐步寻找子节点，也可以直接用//直接选取：

```python
from lxml import etree

html = etree.parse('./test.html',etree.HTMLParser())
result = html.xpath('//li[@class="item-0"]/a/text()')#或者'//li[@class="item-0"]//text()'
print(result)
```

- [ ] 上面代码块中，`[@class="item-0"]`为属性匹配（中括号加属性名和值来限定某个属性），而`/@href`为属性获取（获取节点的href属性）；只知道匹配对象多个属性中的一个时，可使用contains()方法括起该属性；
- [ ] 某些属性可能同时匹配了多个节点，此时可以利用索引按序选择；比如传入1表示第一个节点，传入last()表示最后一个节点，传入position()<3表示位置小于3也就是1和2的节点，传入last()-2表示倒数第三个节点；
- [ ] XPath提供了很多节点轴选择方法，/ancestor::*'可以获取所有的祖先节点，/attribute::*'可以获取所有属性值，可将*改为限定条件，child、descendant、following（当前节点之后的所有节点）同理；

Beautiful Soup

- [ ] BS是python的一个HTML或XML的解析库，借助网页的结构和属性等特性来解析网页，而不必写复杂的正则表达式；BS自动将输入文档转化为Unicode编码（为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求），输出文档转化为UTF-8编码（用1到6个字节编码Unicode字符）；BS在解析时实际依赖解析器，和XPath一样可以自动更正格式：

![2019-03-02_14-49-49.jpg](https://cdn.nlark.com/yuque/0/2019/jpeg/179680/1551509439722-9e63f99e-c351-4db5-8174-63a9e3f4cdb5.jpeg#align=left&display=inline&height=274&name=2019-03-02_14-49-49.jpg&originHeight=485&originWidth=1321&size=367059&status=done&width=746)

```python
html = """
something
"""
from bs4 import BeautifulSoup
soup = BeautifulSoup(html,'lxml')#完成BS对象的初始化，并将其赋值给soup对象
print(soup.prettify())#prettify()方法可以把要解析的字符串以标准的缩进格式输出
print(soup.title.string)#选出HTML中的title节点，并调用string属性得到其中文本
```

- [ ] 提取节点信息：name属性获取节点名称；attrs属性获取节点所有属性（返回字典形式），还可以直接在节点后加.[属性名]就可以获取属性值了；string属性获取节点的文本内容；
- [ ] 关联节点：contents属性获取直接子节点，children属性获取子孙节点，parent属性获取直接父节点，parents获取所有父节点，next_sibling和previous_sibling属性获取节点的下一个和上一个兄弟元素；
- [ ] 方法选择器find_all(name,attrs,recursive,text,**kwargs)查询所有符合条件（名称，属性，等）的节点；find()与之同理，不过只返回匹配到的第一个元素；以此延伸出find一族的方法，例如find_parents()，find_next_siblings()等；
- [ ] 使用CSS选择器时，只需调用select()方法，传入相应的CSS选择器即可；

pyquery

- [ ] 和BS一样，初始化pyquery时也需传入HTML文本或者URL来初始化一个PyQuery对象；
- [ ] pyquery的用法基本与BS相同；
- [ ] html()方法返回的是第一个节点的内部HTML文本；text()方法则返回了所有匹配的节点内部的纯文本，中间用一个空格分隔开，则返回结果是一个字符串；
- [ ] pyquery提供了很多节点操作的方法；例如addClass和removeClass；
- [ ] 更完整的CSS选择器用法：[http://www.w3school.com.cn/css/index.asp](http://www.w3school.com.cn/css/index.asp)

## 数据存储

- [ ] TXT文本存储：一个实例[zhihu.py.txt](https://www.yuque.com/attachments/yuque/0/2019/txt/179680/1551533872509-c1d90d67-6843-48a4-aae1-1dbace3aa360.txt?_lake_card=%7B%22uid%22%3A%22rc-upload-1551531179007-3%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Ftxt%2F179680%2F1551533872509-c1d90d67-6843-48a4-aae1-1dbace3aa360.txt%22%2C%22name%22%3A%22zhihu.py.txt%22%2C%22size%22%3A688%2C%22type%22%3A%22text%2Fplain%22%2C%22ext%22%3A%22txt%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22card%22%3A%22file%22%7D)
- [ ] JSON文件（JavaScript Object Notation）存储：JSON通过**对象和数组的自由组合**来表示数据，构造简介，结构化程度高，是一种轻量级的数据交换格式；对象使用{}括起，数据结构为{key1:value1,key2:value2,…}的键值对结构；数组用[]括起，数据结构为["java","vb",…]的索引结构；使用load()方法将字符串转为JSON对象；使用dumps()将JSON对象转化为字符串，indent=2参数可以保存格式，2代表缩进字符个数，为防止中文变成Unicode字符，需要指定ensure_ascii=False；JSON的数据需要用双引号来包围，不能使用单引号；
- [ ] CSV全称Comma-Separated Values，中文可以叫做逗号分隔值/字符分隔值，其文件以纯文本形式存储表格数据；每条记录由字段组成，字段间的分隔符是其他字符或字符串，常见为逗号或制表符；

```python
import csv
with open('data','w') as csvfile:#如果要写入中文，需要给open()指定参数'utf-8'
  writer = csv.writer(csvfile,delimiter = ' ')
  #初始化写入对象，delimiter参数更改了分隔符为空格，默认为逗号
  writer.writerow(['id','name','age'])
  writer.writerow(['10001','Mike','20'])
  writer.writerow(['10002','Bob','22'])
  writer.writerow(['10003','Jordan','21'])
  #也可通过writerows()方法写入多行，此时参数为二维列表
```

- [ ] 关系型数据库基于关系模型，而关系模型通过二维表来保存，每一列是一个字段，每一行是一条记录；表可以看作某个实体的集合，而实体之间存在联系，通过表与表之间的关联关系来体现，如主键外键的关联关系；多个表组成了关系型数据库；
- [ ] 插入、更新和删除操作都是对数据库进行更改的操作，而更改操作都必须为一个事务，所以这些操作的标准写法就是：

```python
try:
  cursor.execute(sql)
  db.commit()
 except:
  db.rollback()
```

![2019-03-03_10-34-15.jpg](https://cdn.nlark.com/yuque/0/2019/jpeg/179680/1551580567538-f368a186-3f12-4634-90ae-36d3f3c7a38a.jpeg#align=left&display=inline&height=203&name=2019-03-03_10-34-15.jpg&originHeight=362&originWidth=1329&size=306505&status=done&width=746)

- [ ] SQL知识参照这个笔记：[https://www.yuque.com/oldog/note/sql](https://www.yuque.com/oldog/note/sql)
- [ ] 非关系型数据库包括键值存储数据库、列存储数据库、文档型数据库、图形数据库；NoSQL基于键值对，且无需经过SQL层的解析，数据之间没有耦合性，性能非常高；常见的有MongoDB和Redis，见书P214；

## 动态渲染页面爬取

Ajax 

- [ ] Ajax即异步的JavaScript和XML，利用JS在保证页面不被刷新、链接不改变的情况下与服务器交换数据并更新部分网页；Ajax加载是一种异步加载方式，原始的页面最初不会包含某些数据，在原始页面加载完之后，会再向服务器请求某个接口获取数据，然后数据才被处理从而呈现到网页上，这就是发送了一个Ajax请求；
- [ ] [如何理解python中的'NoneType' object is not iterable？](https://blog.csdn.net/yjk13703623757/article/details/77918633)

selenium 

- [ ] selenium是一个自动化测试工具，利用它可以驱动浏览器执行特定的动作，同时还可以获取浏览器当前呈现的页面的源代码，做到可见即可爬：

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

browser = webdriver.Chrome()#初始化对象
try:
    browser.get('https://www.baidu.com')#传入URL请求网页
    input = browser.find_element_by_id('kw')#寻找搜索框节点（可根据ID、CSS选择器、XPath等）
    input.send_keys('Python')#输入文字；清空文字用clear()；点击按钮用click()；
    input.send_keys(Keys.ENTER)
    wait = WebDriverWait(browser,10)
    wait.until(EC.presence_of_element_located((By.ID,'content_left')))
    print(browser.current_url)
    print(browser.get_cookies())
    print(browser.page_source)#输出网页源代码
finally:
    browser.close()
```

- [ ] 对于没有特定执行对象的操作例如鼠标拖曳、键盘按键等，可以通过动作链来执行；
- [ ] 通过execute_script()方法直接模拟运行JS，由此可以实现API没有提供的功能；
- [ ] page_source()方法获取节点属性；
- [ ] 直接调用节点的text属性就可以得到节点内部的文本信息，同理还有id属性、location属性、tag_name属性、size属性等；
- [ ] 网页中有一种节点叫做iframe，也就是子Frame，相当于页面的子页面，其结构与外部网页的结构完全一致；selenium默认只在父Frame之中操作，需要switch_to.frame()方法进行Frame的切换；
- [ ] 在selenium中，get()方法会在网页框架加载结束后结束执行，此时如果获取page_source，可能并非浏览器完全加载完成的页面，所以需要延时等待一段时间，确保节点已经加载出来；隐式等待implicitly_wait()当查找节点而节点没有立即出现之时，将等待一段时间再查找，默认等待时间为0；显式等待则指定一个最长等待时间，在时间内加载出节点则返回该节点，否则抛出超时异常；
- [ ] forward()方法与back()方法实现网页的前进与后退；

Splash <br />使用selenium爬取淘宝商品 <br />代码地址：[https://github.com/Python3WebSpider/TaobaoProduct/blob/master/spider.py](https://github.com/Python3WebSpider/TaobaoProduct/blob/master/spider.py)

```python
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from urllib.parse import quote

browser = webdriver.Chrome()#实例化对象
wait = WebDriverWait(browser, 10)#设置延迟时间
KEYWORD = 'iPad'

from pyquery import PyQuery as pq
def get_products():
    """
    提取商品数据
    """
    html = browser.page_source#获取页面源代码
    doc = pq(html)#构造PyQuery解析对象
    items = doc('#mainsrp-itemlist .items .item').items()#使用CSS选择器提取商品列表
    for item in items:
        product = {
            'image': item.find('.pic .img').attr('data-src'),
            'price': item.find('.price').text(),
            'deal': item.find('.deal-cnt').text(),
            'title': item.find('.title').text(),
            'shop': item.find('.shop').text(),
            'location': item.find('.location').text()
        }#find()方法传入CSS选择器遍历列表，获取单个商品的特定内容，赋值给字典product
        print(product)
        
def index_page(page):
    """
    抓取索引页
    :param page: 页码
    """
    print('正在爬取第', page, '页')
    try:
        url = 'https://s.taobao.com/search?q=' + quote(KEYWORD)
        browser.get(url)
        if page > 1:
          	#获取页码输入框
            input = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '#mainsrp-pager div.form > input')))
            #获取确定按钮
            submit = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '#mainsrp-pager div.form > span.btn.J_Submit')))
            input.clear()
            input.send_keys(page)
            submit.click()
        #确定是否跳转到对应的页码（根据当前高亮页码）
        wait.until(
            EC.text_to_be_present_in_element((By.CSS_SELECTOR, '#mainsrp-pager li.item.active > span'), str(page)))
        #传入.m-itemlist .items .item等选择器，对应着商品信息
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.m-itemlist .items .item')))
        get_products()
    except TimeoutException:
        index_page(page)

MONGO_URL = 'localhost'
MONGO_DB = 'taobao'
MONGO_COLLECTION = 'products'
client = pymongo.MongoClient(MONGO_URL)
db = client[MONGO_DB]
def save_to_mongo(result):
    """
    保存至MongoDB
    :param result: 结果
    """
    try:
        if db[MONGO_COLLECTION].insert(result):
            print('存储到MongoDB成功')
    except Exception:
        print('存储到MongoDB失败')

def main():
    """
    遍历每一页
    """
    for i in range(1, MAX_PAGE + 1):
        index_page(i)
    browser.close()
save_to_mongo(product)

if __name__ == '__main__':
    main()
```

有关于CSS选择器：[http://www.w3school.com.cn/cssref/css_selectors.asp](http://www.w3school.com.cn/cssref/css_selectors.asp)<br />[有关__name__ == '__main__'](https://blog.csdn.net/zhusongziye/article/details/79505803) 

## 验证码的识别

图形验证码 

- [ ] 需要安装tesserocr库，利用OCR技术进行识别；由于存在多余线条的干扰，可用Image对象的convert()方法传入参数L将图片转化为灰度图像，传入参数1可将图片进行二值化处理；

极验滑动验证码 

- [ ] 识别验证需要三步：模拟点击验证按钮；识别滑动缺口的位置（获取点击前后的两张对比图片，二者不一致的地方即为缺口）；模拟拖动滑块；

点触验证码 <br />宫格验证码 

## 模拟登录

- [ ] 利用requests的session实现模拟登陆操作：[https://github.com/Python3WebSpider](https://github.com/Python3WebSpider/GithubLogin)；
- [ ] 如果要做大规模抓取，就需要很多账号，每次请求随机选取一个账号，以降低单个账号的访问频率，降低被封概率；这就需要用到cookies池；cookies池的架构和代理池类似，分为：获取模块、存储模块、检测模块、接口模块；[https://github.com/Python3WebSpider/CookiesPool](https://github.com/Python3WebSpider/CookiesPool)；

## APP的爬取

- [ ] [Charles](https://www.cnblogs.com/jiayuchn-test/p/8875105.html) 可用于APP的抓包分析，得到APP运行过程中发生的所有网络请求和响应内容；

## Scrapy

- [ ] scrapy的基本框架；
- [ ] 代码：https://github.com/Python3WebSpider/ScrapyDownloaderTest
- [ ] 实例代码地址：https://github.com/Python3WebSpider/Images360

