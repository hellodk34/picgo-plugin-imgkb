## picgo-plugin-imgkb

这是一个基于 imgkb.com 图床的 PicGo 图片上传插件。基于 `PicGo V2.3.0` 开发。

# 更新日志

- v1.0.0 支持 imgkb.com 图床，支持忽略证书错误
- v1.0.1 更新 readme 文案
- v1.0.2 支持所有兰空图床，原有 uploader `imgkb` 保持不变，设置项增加服务器地址（配置时请不要以 `/` 结尾）

![20220322100519](https://img.github.luxe/2022/179b6b02de109.png)

---

# 简介

[imgkb.com](https://imgkb.com/) 是一个宣称永久免费的图床，支持永久外链，全球 CDN 分发。

建议大家注册使用，注册即可免费获得 10GB 的空间，注册用户采用备案域名，使用全球 CDN 加速；未注册用户采用国内服务器进行全球加速。

# 安装和使用

## 1. 在线安装

打开 PicGo 详细窗口，选择插件设置，搜索 **imgkb** (author 是 `hellodk`) 安装。

![20220321175521](https://img.ukx.cn/abcdocker/2022/03/21/3def0d41e0565/3def0d41e0565.png)

## 2. 离线安装

克隆该项目，解压缩并 cd 到路径 `/path/to/picgo-plugin-imgkb`，执行

`npm install ./picgo-plugin-imgkb` 。

## 3. 使用方法

注册好图床网站账号后进入 https://imgkb.com/user/settings.html 页面

![20220321162502](https://img.ukx.cn/abcdocker/2022/03/21/be39ac1dd70ee/be39ac1dd70ee.png)

- 查看自己的 `token`，妥善保存，请勿泄露，后续设置 PicGo 需要填入此 `token`
- `默认上传文件夹` 可以不配置，设置后默认上传至该路径

配置该图床并设为默认图床

![20220321163809](https://img.ukx.cn/abcdocker/2022/03/21/c52ea75151377/c52ea75151377.png)

由于源站使用 Let's Encrypt 颁发的免费证书，有效期只有 90 天，在测试上传中经常遇到 `certificate has expired` 错误，打开开关 `Ignore certificate error` 即可成功上传。

# 致谢

- 感谢 [imgkb.com 图床](https://imgkb.com/)
- 感谢 [PicGo 项目](https://github.com/Molunerfinn/PicGo)

# 开源许可证

Released under the [MIT License](https://github.com/hellodk34/picgo-plugin-imgkb/blob/main/LICENSE).
