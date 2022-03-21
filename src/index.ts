import https from 'https'

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.uploader.register('imgkb', {
      handle,
      name: 'imgkb',
      config: config
    })
  }
  const postOptions = (token, ignoreCertErr, fileName, image) => {
    let requestAgent = new https.Agent({
      // 此处需要取反 忽略证书错误 拒绝未授权证书选项
      rejectUnauthorized: !ignoreCertErr
    })

    return {
      method: 'POST',
      url: `https://imgkb.com/api/upload`,
      agent: requestAgent,
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Host': "https://imgkb.com",
        'User-Agent': 'PicGo',
        'Connection': 'keep-alive',
        'token': token || undefined
      },
      formData: {
        image: {
          value: image,
          options: {
            filename: fileName
          }
        },
        ssl: 'true'
      }
    }
  }
  const handle = async (ctx) => {
    let userConfig = ctx.getConfig('picBed.imgkb')
    if (!userConfig) {
      throw new Error('Can\'t find uploader config')
    }
    const token = userConfig.token
    const ignoreCertErr = userConfig.ignoreCertErr
    const imgList = ctx.output
    for (let i in imgList) {
      let image = imgList[i].buffer
      if (!image && imgList[i].base64Image) {
        image = Buffer.from(imgList[i].base64Image, 'base64')
      }
      const postConfig = postOptions(token, ignoreCertErr, imgList[i].fileName, image)
      let body = await ctx.Request.request(postConfig)

      body = JSON.parse(body)
      if (body.code === 200) {
        delete imgList[i].base64Image
        delete imgList[i].buffer
        imgList[i]['imgUrl'] = body.data.url
      }
      else {
        ctx.emit('notification', {
          title: 'upload failed',
          body: body.message
        })
        throw new Error(body.message)
      }
    }
    return ctx
  }

  const config = ctx => {
    let userConfig = ctx.getConfig('picBed.imgkb')
    if (!userConfig) {
      userConfig = {}
    }
    return [
      {
        name: 'token',
        type: 'input',
        default: userConfig.token,
        required: true,
        message: '认证 token 信息',
        alias: 'Auth token'
      },
      {
        name: 'ignoreCertErr',
        type: 'confirm',
        default: userConfig.ignoreCertErr || false,
        message: '是否忽略证书错误，如果上传失败提示证书过期请设为 true',
        required: true,
        alias: 'Ignore certificate error'
      },
    ]
  }
  return {
    uploader: 'imgkb',
    config: config,
    register
  }
}
