const config = {
  app: 'icebreaker-top-ssg',
  name: 'icebreaker-top-ssg-doc',
  component: 'website',
  stage: 'dev',
  inputs: {
    src: {
      src: './docs',
      index: 'index.html',
      error: 'index.html',
    },
    region: 'ap-shanghai',
    bucket: 'icebreaker-top-ssg-bucket',
    replace: false,
    // https://github.com/serverless-tencent/tencent-component-toolkit/blob/master/src/modules/cos/index.ts
    // const envPath = inputs.code?.envPath || inputs.code?.root;
    // if (inputs.env && Object.keys(inputs.env).length && envPath) {
    //   let script = 'window.env = {};\n';
    //   inputs.env = inputs.env || {};
    //   Object.keys(inputs.env).forEach((e) => {
    //     script += `window.env.${e} = ${JSON.stringify(inputs.env![e])};\n`;
    //   });

    //   const envFilePath = path.join(envPath, 'env.js');
    //   try {
    //     fs.writeFileSync(envFilePath, script);
    //   } catch (e) {
    //     throw new ApiTypeError(`DEPLOY_COS_CREATE_ENV_FILE`, e.message, e.stack);
    //   }
    // }
    // env: {},
    // https://github.com/serverless-components/tencent-website/blob/master/src/serverless.js
    // if (cdnInputs.autoRefresh) {
    //   cdnInputs.refreshCdn = {
    //     urls: [`http://${cdnInputs.domain}`, `https://${cdnInputs.domain}`]
    //   }
    // }
    // tencentCdnOutput = await cdn.deploy(cdnInputs)
    // protocol = tencentCdnOutput.https ? 'https' : 'http'
    // const result = {
    //   domain: `${protocol}://${tencentCdnOutput.domain}`,
    //   cname: tencentCdnOutput.cname
    // }
    // if (cdnInputs.onlyRefresh !== true) {
    //   if (cdnInputs.refreshCdn && cdnInputs.refreshCdn.urls) {
    //     result.refreshUrls = cdnInputs.refreshCdn.urls
    //   }
    //   cdnResult.push(result)
    // }
    hosts: ['icebreaker.top', 'www.icebreaker.top'].reduce((acc, cur) => {
      acc.push({
        host: cur,
        async: true,
        onlyRefresh: true,
        autoRefresh: true,
        refreshCdn: {
          urls: ['http://', 'https://'].reduce((p, c) => {
            p.push(c + cur)
            return p
          }, []),
        },
      })
      return acc
    }, []),
  },
}

module.exports = config
