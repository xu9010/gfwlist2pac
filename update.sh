#!/bin/sh
cd `dirname $0`
git reset --hard
git pull


rm -rf env
virtualenv env
source env/bin/activate

# 固定使用3.0.1版
(cd genpac-a390426bdf6b36ac7abb78e32819cd93fb41e619; pip install .) 
# (cd genpac; git checkout a390426; python setup.py install) # 3.0.1版
# pip install genpac==3.0.1 # 备选在线安装

# 备份到本地repo
wget -O gfwlist/gfwlist.txt https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt


# genpac \
# 	--format pac \
# 	--pac-proxy "SOCKS5 127.0.0.1:1081" \
# 	--gfwlist-local gfwlist/gfwlist.txt \
# 	--user-rule-from user-rule.txt \
# 	-o gfwlist_1081.pac

genpac \
	--format pac \
	--pac-proxy "SOCKS5 127.0.0.1:1081" \
	--gfwlist-url "https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" \
	--user-rule-from user-rule.txt \
	-o gfwlist_1081.pac
sed -e '3d' -i gfwlist_1081.pac # 删除带无用日期的注释


genpac \
	--format pac \
	--pac-proxy "SOCKS5 127.0.0.1:7890" \
	--gfwlist-url "https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" \
	--user-rule-from user-rule.txt \
	-o gfwlist_7890.pac
sed -e '3d' -i gfwlist_1081.pac # 删除带无用日期的注释

deactivate

git add gfwlist/gfwlist.txt
git add *.pac
git commit -m "[$(LANG=C date)]auto update"
git push -f origin master
