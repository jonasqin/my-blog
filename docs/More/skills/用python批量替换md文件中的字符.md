# 用python批量替换md文件中的字符

虽然这个用word很容易实现，但我就是不想先将md转docx替换完再换回来，有没有直接一点的方法？<br />这里有一个[教程](https://blog.zhheo.com/p/369dbf41.html)已经把代码弄好了……<br />学习下吧

```python
import os
import re
import time

def modify_md_content(top):
    for root, dirs, files in os.walk(top, topdown=False):
        # 循环文件
        for file_name in files:
            file_name_split = file_name.split('.')

            try:
                if file_name_split[-1] == 'md':
                    # 找到md文件并且复制一份md文件路径
                    md_file_path = os.path.join(root, '.'.join(file_name_split))
                    copy_md_file_path = os.path.join(root, '.'.join([f'{file_name_split[0]}_copy', file_name_split[1]]))

                    # 打开md文件然后进行替换
                    with open(md_file_path, 'r', encoding='utf8') as fr, \
                            open(copy_md_file_path, 'w', encoding='utf8') as fw:
                        data = fr.read()
                        data = re.sub('\?imageslim', '!blogimg', data)
                        # data = re.sub('<br>', '<br>\n', data)
                        # data = re.sub('<br>', '', data)
                        #data = re.sub('^ #.*? ', '', data)

                        fw.write(data)  # 新文件一次性写入原文件内容
                        # fw.flush()

                    # 删除原文件
                    os.remove(md_file_path)
                    # 重命名新文件名为原文件名
                    os.rename(copy_md_file_path, md_file_path)
                    print(f'{md_file_path} done...')
                    time.sleep(0.5)
            except FileNotFoundError as e:
                print(e)
        time.sleep(0.5)


if __name__ == '__main__':
    top = r'/Users/zhanghong/Desktop/_posts'
    modify_md_content(top)
```

导入了三个库，现在都不咋认识了，去查了一下，os模块内函数均与操作系统相关，明显是operation system的简写了；re是正则表达式，找了一篇[简介](https://www.jb51.net/article/223741.htm)；btw发现了一个不错的python库大全——[500个Python模块（库）的详细分类介绍](https://blog.51cto.com/u_15274949/5016199)

To Be Continued...