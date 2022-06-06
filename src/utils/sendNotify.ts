/*
 * @Author: lxk0301 https://gitee.com/lxk0301
 * @Date: 2020-08-19 16:12:40
 * @Last Modified by: whyour
 * @Last Modified time: 2021-5-1 15:00:54
 * sendNotify 推送通知功能
 * @param text 通知头
 * @param desp 通知体
 * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
 * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
 */
import * as nodemailer from 'nodemailer';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { defHttp } from './http';
import { logger } from './log';
import { stringify } from './pure';

// 使用一个变量来记录当前的环境变量，避免多个账号复用同一个环境变量
let MyProcessEnv: Record<string, string>;

/**
 * 配置处理为 env
 */
function initEnv() {
  /**
   * 大写命名转换为驼峰命名
   */
  function upperCaseToHump(str: string) {
    return str.toLowerCase().replace(/_(\w)/g, (_match, t: string) => t.toUpperCase());
  }

  const envName = [
    'GOBOT_URL',
    'GOBOT_TOKEN',
    'GOBOT_QQ',
    'SCKEY',
    'QQ_SKEY',
    'QQ_MODE',
    'BARK_PUSH',
    'BARK_SOUND',
    'BARK_GROUP',
    'TG_BOT_TOKEN',
    'TG_USER_ID',
    'TG_PROXY_AUTH',
    'TG_PROXY_HOST',
    'TG_PROXY_PORT',
    'TG_API_HOST',
    'DD_BOT_TOKEN',
    'DD_BOT_SECRET',
    'QYWX_KEY',
    'QYWX_AM',
    'IGOT_PUSH_KEY',
    'PUSH_PLUS_TOKEN',
    'PUSH_PLUS_USER',
  ];
  const message = TaskConfig.message || {};
  MyProcessEnv = {};

  envName.forEach(name => {
    const value = message[upperCaseToHump(name)] || message[name] || process.env[name];
    if (value) {
      MyProcessEnv[name] = value;
    }
  });

  if (TaskConfig.PUSHPLUS_TOKEN) {
    MyProcessEnv.PUSH_PLUS_TOKEN = TaskConfig.PUSHPLUS_TOKEN;
  }
  getEnv();
}

const timeout = 15000; //超时时间(单位毫秒)

// =======================================微信server酱通知设置区域===========================================
//此处填你申请的SCKEY.
//(环境变量名 PUSH_KEY)
let SCKEY = '';

// =======================================Bark App通知设置区域===========================================
//此处填你BarkAPP的信息(IP/设备码，例如：https://api.day.app/XXXXXXXX)
let BARK_PUSH = '';
//BARK app推送铃声,铃声列表去APP查看复制填写
let BARK_SOUND = '';
//BARK app推送消息的分组, 默认为"QingLong"
let BARK_GROUP = 'QingLong';

// =======================================telegram机器人通知设置区域===========================================
//此处填你telegram bot 的Token，telegram机器人通知推送必填项.例如：1077xxx4424:AAFjv0FcqxxxxxxgEMGfi22B4yh15R5uw
//(环境变量名 TG_BOT_TOKEN)
let TG_BOT_TOKEN = '';
//此处填你接收通知消息的telegram用户的id，telegram机器人通知推送必填项.例如：129xxx206
//(环境变量名 TG_USER_ID)
let TG_USER_ID = '';
//tg推送HTTP代理设置(不懂可忽略,telegram机器人通知推送功能中非必填)
let TG_PROXY_HOST = ''; //例如:127.0.0.1(环境变量名:TG_PROXY_HOST)
let TG_PROXY_PORT = ''; //例如:1080(环境变量名:TG_PROXY_PORT)
let TG_PROXY_AUTH = ''; //tg代理配置认证参数
//Telegram api自建的反向代理地址(不懂可忽略,telegram机器人通知推送功能中非必填),默认tg官方api(环境变量名:TG_API_HOST)
let TG_API_HOST = 'api.telegram.org';
// =======================================钉钉机器人通知设置区域===========================================
//此处填你钉钉 bot 的webhook，例如：5a544165465465645d0f31dca676e7bd07415asdasd
//(环境变量名 DD_BOT_TOKEN)
let DD_BOT_TOKEN = '';
//密钥，机器人安全设置页面，加签一栏下面显示的SEC开头的字符串
let DD_BOT_SECRET = '';

// =======================================企业微信机器人通知设置区域===========================================
//此处填你企业微信机器人的 webhook(详见文档 https://work.weixin.qq.com/api/doc/90000/90136/91770)，例如：693a91f6-7xxx-4bc4-97a0-0ec2sifa5aaa
//(环境变量名 QYWX_KEY)
let QYWX_KEY = '';

// =======================================企业微信应用消息通知设置区域===========================================
/*
 此处填你企业微信应用消息的值(详见文档 https://work.weixin.qq.com/api/doc/90000/90135/90236)
 环境变量名 QYWX_AM依次填入 corpid,corpsecret,touser(注:多个成员ID使用|隔开),agentid,消息类型(选填,不填默认文本消息类型)
 注意用,号隔开(英文输入法的逗号)，例如：wwcff56746d9adwers,B-791548lnzXBE6_BWfxdf3kSTMJr9vFEPKAbh6WERQ,mingcheng,1000001,2COXgjH2UIfERF2zxrtUOKgQ9XklUqMdGSWLBoW_lSDAdafat
 可选推送消息类型(推荐使用图文消息（mpnews）):
 - 文本卡片消息: 0 (数字零)
 - 文本消息: 1 (数字一)
 - 图文消息（mpnews）: 素材库图片id, 可查看此教程(http://note.youdao.com/s/HMiudGkb)或者(https://note.youdao.com/ynoteshare1/index.html?id=1a0c8aff284ad28cbd011b29b3ad0191&type=note)
 */
let QYWX_AM = '';

// =======================================iGot聚合推送通知设置区域===========================================
//此处填您iGot的信息(推送key，例如：https://push.hellyw.com/XXXXXXXX)
let IGOT_PUSH_KEY = '';

// =======================================push+设置区域=======================================
//官方文档：http://www.pushplus.plus/
//PUSH_PLUS_TOKEN：微信扫码登录后一对一推送或一对多推送下面的token(您的Token)，不提供PUSH_PLUS_USER则默认为一对一推送
//PUSH_PLUS_USER： 一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码，如果您是创建群组人。也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送）
let PUSH_PLUS_TOKEN = '';
let PUSH_PLUS_USER = '';

let QQ_SKEY = '';
let QQ_MODE = '';

function getEnv() {
  //==========================云端环境变量的判断与接收=========================

  if (MyProcessEnv.PUSH_KEY) {
    SCKEY = MyProcessEnv.PUSH_KEY;
  }

  if (MyProcessEnv.QQ_SKEY) {
    QQ_SKEY = MyProcessEnv.QQ_SKEY;
  }

  if (MyProcessEnv.QQ_MODE) {
    QQ_MODE = MyProcessEnv.QQ_MODE;
  }

  if (MyProcessEnv.BARK_PUSH) {
    if (
      MyProcessEnv.BARK_PUSH.indexOf('https') > -1 ||
      MyProcessEnv.BARK_PUSH.indexOf('http') > -1
    ) {
      //兼容BARK自建用户
      BARK_PUSH = MyProcessEnv.BARK_PUSH;
    } else {
      BARK_PUSH = `https://api.day.app/${MyProcessEnv.BARK_PUSH}`;
    }
    if (MyProcessEnv.BARK_SOUND) {
      BARK_SOUND = MyProcessEnv.BARK_SOUND;
    }
    if (MyProcessEnv.BARK_GROUP) {
      BARK_GROUP = MyProcessEnv.BARK_GROUP;
    }
  } else {
    if (BARK_PUSH && BARK_PUSH.indexOf('https') === -1 && BARK_PUSH.indexOf('http') === -1) {
      //兼容BARK本地用户只填写设备码的情况
      BARK_PUSH = `https://api.day.app/${BARK_PUSH}`;
    }
  }
  if (MyProcessEnv.TG_BOT_TOKEN) {
    TG_BOT_TOKEN = MyProcessEnv.TG_BOT_TOKEN;
  }
  if (MyProcessEnv.TG_USER_ID) {
    TG_USER_ID = MyProcessEnv.TG_USER_ID;
  }
  if (MyProcessEnv.TG_PROXY_AUTH) TG_PROXY_AUTH = MyProcessEnv.TG_PROXY_AUTH;
  if (MyProcessEnv.TG_PROXY_HOST) TG_PROXY_HOST = MyProcessEnv.TG_PROXY_HOST;
  if (MyProcessEnv.TG_PROXY_PORT) TG_PROXY_PORT = MyProcessEnv.TG_PROXY_PORT;
  if (MyProcessEnv.TG_API_HOST) TG_API_HOST = MyProcessEnv.TG_API_HOST;

  if (MyProcessEnv.DD_BOT_TOKEN) {
    DD_BOT_TOKEN = MyProcessEnv.DD_BOT_TOKEN;
    if (MyProcessEnv.DD_BOT_SECRET) {
      DD_BOT_SECRET = MyProcessEnv.DD_BOT_SECRET;
    }
  }

  if (MyProcessEnv.QYWX_KEY) {
    QYWX_KEY = MyProcessEnv.QYWX_KEY;
  }

  if (MyProcessEnv.QYWX_AM) {
    QYWX_AM = MyProcessEnv.QYWX_AM;
  }

  if (MyProcessEnv.IGOT_PUSH_KEY) {
    IGOT_PUSH_KEY = MyProcessEnv.IGOT_PUSH_KEY;
  }

  if (MyProcessEnv.PUSH_PLUS_TOKEN) {
    PUSH_PLUS_TOKEN = MyProcessEnv.PUSH_PLUS_TOKEN;
  }
  if (MyProcessEnv.PUSH_PLUS_USER) {
    PUSH_PLUS_USER = MyProcessEnv.PUSH_PLUS_USER;
  }
  //==========================云端环境变量的判断与接收=========================
}

/**
 * sendNotify 推送通知功能
 * @param text 通知头
 * @param desp 通知体
 * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
 * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
 * @returns {Promise<unknown>}
 */
async function sendNotify(
  text,
  desp,
  params = {},
  author = '\n\n本通知 By：https://github.com/catlair/BiliTools',
) {
  initEnv();
  //提供6种通知
  desp += author; //增加作者信息，防止被贩卖等
  await Promise.all([
    serverNotify(text, desp), //微信server酱
    pushPlusNotify(text, desp), //pushplus(推送加)
  ]);
  //由于上述两种微信通知需点击进去才能查看到详情，故text(标题内容)携带了账号序号以及昵称信息，方便不点击也可知道是哪个京东哪个活动
  // text = text.match(/.*?(?=\s?-)/g) ? text.match(/.*?(?=\s?-)/g)[0] : text;
  await Promise.all([
    BarkNotify(text, desp, params), //iOS Bark APP
    tgBotNotify(text, desp), //telegram 机器人
    ddBotNotify(text, desp), //钉钉机器人
    qywxBotNotify(text, desp), //企业微信机器人
    qywxamNotify(text, desp), //企业微信应用消息推送
    iGotNotify(text, desp, params), //iGot
    sendMail(text, desp), //邮件
    customApi(text, desp), //自定义接口
    CoolPush(text, desp), //CoolPush
  ]);
}

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(title: string, text: string) {
  //发件邮箱,密码,收件邮箱,stmp地址[,端口]
  const user = TaskConfig.message?.email;
  if (!user || !user.pass || !user.from || !user.host) return;

  const port: number = Number(user.port) || 465;

  const transporter = nodemailer.createTransport({
    host: user.host,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: user.from,
      pass: user.pass,
    },
  });

  const info = await transporter.sendMail({
    from: `${title} <${user.from}>`, // sender address
    to: user.to, // list of receivers
    subject: title, // Subject line
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    text: text.replace(/\n/g, '\r\n'), // plain text body
    // html: text, // html body
  });

  logger.info(`邮件消息已发送: ${info.messageId}`);
}

async function customApi(title: string, text: string) {
  try {
    const apiTemplate = TaskConfig.MESSAGE_API;
    if (!apiTemplate) return;
    const api = apiTemplate.replace('{title}', title).replace('{text}', text);
    await defHttp.get(api);
  } catch (error) {
    logger.info(`自定义接口消息发送失败: ${error}`);
    logger.error(error);
  }
}

function serverNotify(text, desp, time = 2100) {
  return new Promise(resolve => {
    if (SCKEY) {
      //微信server酱推送通知一个\n不会换行，需要两个\n才能换行，故做此替换
      desp = desp.replace(/[\n\r]/g, '\n\n');
      const options = {
        url: SCKEY.includes('SCT')
          ? `https://sctapi.ftqq.com/${SCKEY}.send`
          : `https://sc.ftqq.com/${SCKEY}.send`,
        params: `text=${text}&desp=${desp}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout,
      };
      setTimeout(() => {
        defHttp
          .post(options)
          .then(data => {
            //server酱和Server酱·Turbo版的返回json格式不太一样
            if (data.errno === 0 || data.data.errno === 0) {
              logger.info('server酱发送通知消息成功🎉');
            } else if (data.errno === 1024) {
              // 一分钟内发送相同的内容会触发
              logger.info(`server酱发送通知消息异常: ${data.errmsg}`);
            } else {
              logger.info(`server酱发送通知消息异常\n${JSON.stringify(data)}`);
            }
          })
          .catch(err => {
            logger.info('发送通知调用API失败！！');
            logger.info(err);
          })
          .finally(() => {
            resolve('');
          });
      }, time);
    } else {
      resolve('');
    }
  });
}

function CoolPush(text, desp) {
  return new Promise(resolve => {
    if (QQ_SKEY) {
      const options = {
        url: `https://push.xuthus.cc/${QQ_MODE}/${QQ_SKEY}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        params: {},
      };

      // 已知敏感词
      text = text.replace(/京豆/g, '豆豆');
      desp = desp.replace(/京豆/g, '');
      desp = desp.replace(/🐶/g, '');
      desp = desp.replace(/红包/g, 'H包');

      if (QQ_MODE === 'email') {
        options.data = {
          t: text,
          c: desp,
        };
      } else {
        options.params = `${text}\n\n${desp}`;
      }

      const pushMode = function (t) {
        switch (t) {
          case 'send':
            return '个人';
          case 'group':
            return 'QQ群';
          case 'wx':
            return '微信';
          case 'ww':
            return '企业微信';
          case 'email':
            return '邮件';
          default:
            return '未知方式';
        }
      };

      defHttp
        .post(options)
        .then(data => {
          if (data.code === 200) {
            logger.info(`酷推发送${pushMode(QQ_MODE)}通知消息成功🎉`);
          } else if (data.code === 400) {
            logger.info(`QQ酷推(Cool Push)发送${pushMode(QQ_MODE)}推送失败：${data.msg}`);
          } else if (data.code === 503) {
            logger.info(`QQ酷推出错，${data.message}：${data.data}`);
          } else {
            logger.info(`酷推推送异常: ${JSON.stringify(data)}`);
          }
        })
        .catch(err => {
          logger.info(`发送${pushMode(QQ_MODE)}通知调用API失败！！`);
          logger.info(err);
        })
        .finally(() => {
          resolve('');
        });
    } else {
      resolve('');
    }
  });
}

function BarkNotify(text, desp, params = {}) {
  return new Promise(resolve => {
    if (BARK_PUSH) {
      const options = {
        url: `${BARK_PUSH}/${encodeURIComponent(text)}/${encodeURIComponent(
          desp,
        )}?sound=${BARK_SOUND}&group=${BARK_GROUP}&${stringify(params)}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout,
      };
      defHttp
        .get(options)
        .then(data => {
          if (data.code === 200) {
            logger.info('Bark APP发送通知消息成功🎉');
          } else {
            logger.info(`Bark APP发送通失败：${data.message}`);
          }
        })
        .catch(err => {
          logger.info('Bark APP发送通知调用API失败！！');
          logger.error(err);
        })
        .finally(() => {
          resolve('');
        });
    }
    resolve('');
  });
}

function tgBotNotify(text, desp) {
  return new Promise(async resolve => {
    if (TG_BOT_TOKEN && TG_USER_ID) {
      const options = {
        url: `https://${TG_API_HOST}/bot${TG_BOT_TOKEN}/sendMessage`,
        data: `chat_id=${TG_USER_ID}&text=${text}\n\n${desp}&disable_web_page_preview=true`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout,
      };
      if (TG_PROXY_HOST && TG_PROXY_PORT) {
        const tunnel = await import('tunnel');
        const httpsAgent = tunnel.httpsOverHttp({
          proxy: {
            host: TG_PROXY_HOST,
            port: +TG_PROXY_PORT,
            proxyAuth: TG_PROXY_AUTH,
          },
          maxSockets: 1, // 单个代理最大连接数
        });
        Object.assign(options, { httpsAgent });
      }
      defHttp
        .post(options)
        .then(data => {
          if (data.ok) {
            logger.info('Telegram发送通知消息成功🎉。');
          } else if (data.error_code === 400) {
            logger.info('请主动给bot发送一条消息并检查接收用户ID是否正确。');
          } else if (data.error_code === 401) {
            logger.info('Telegram bot token 填写错误。');
          }
        })
        .catch(err => {
          logger.info('telegram发送通知消息失败！！');
          logger.info(err);
        })
        .finally(() => {
          resolve('');
        });
    } else {
      resolve('');
    }
  });
}
function ddBotNotify(text, desp) {
  return new Promise(resolve => {
    const options = {
      url: `https://oapi.dingtalk.com/robot/send?access_token=${DD_BOT_TOKEN}`,
      data: {
        msgtype: 'text',
        text: {
          content: ` ${text}\n\n${desp}`,
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
      timeout,
    };
    if (!DD_BOT_TOKEN) {
      resolve('');
      return;
    }
    if (DD_BOT_SECRET) {
      const crypto = require('crypto');
      const dateNow = Date.now();
      const hmac = crypto.createHmac('sha256', DD_BOT_SECRET);
      hmac.update(`${dateNow}\n${DD_BOT_SECRET}`);
      const result = encodeURIComponent(hmac.digest('base64'));
      options.url = `${options.url}&timestamp=${dateNow}&sign=${result}`;
    }
    defHttp
      .post(options)
      .then(data => {
        if (data.errcode === 0) {
          logger.info('钉钉发送通知消息成功🎉。');
        } else {
          logger.info(`钉钉发送通知失败：${data.errmsg}`);
        }
      })
      .catch(err => {
        logger.info('钉钉发送通知消息失败！！');
        logger.info(err);
      });
    resolve('');
  });
}

function qywxBotNotify(text, desp) {
  return new Promise(resolve => {
    const options = {
      url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${QYWX_KEY}`,
      data: {
        msgtype: 'text',
        text: {
          content: ` ${text}\n\n${desp}`,
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
      timeout,
    };
    if (QYWX_KEY) {
      defHttp
        .post(options)
        .then(data => {
          if (data.errcode === 0) {
            logger.info('企业微信发送通知消息成功🎉。');
          } else {
            logger.info(`企业微信发送通知失败：${data.errmsg}`);
          }
        })
        .catch(err => {
          logger.info('企业微信发送通知消息失败！！');
          logger.info(err);
        })
        .finally(() => {
          resolve('');
        });
    }
    resolve('');
  });
}

function ChangeUserId(desp) {
  const QYWX_AM_AY = QYWX_AM.split(',');
  if (QYWX_AM_AY[2]) {
    const userIdTmp = QYWX_AM_AY[2].split('|');
    let userId = '';
    for (let i = 0; i < userIdTmp.length; i++) {
      // const count = '账号' + (i + 1);
      const count2 = '签到号 ' + (i + 1);
      if (desp.match(count2)) {
        userId = userIdTmp[i];
      }
    }
    if (!userId) userId = QYWX_AM_AY[2];
    return userId;
  } else {
    return '@all';
  }
}

function qywxamNotify(text, desp) {
  return new Promise(resolve => {
    if (QYWX_AM) {
      const QYWX_AM_AY = QYWX_AM.split(',');
      const options_accesstoken = {
        url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken`,
        data: {
          corpid: `${QYWX_AM_AY[0]}`,
          corpsecret: `${QYWX_AM_AY[1]}`,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout,
      };
      defHttp
        .post(options_accesstoken)
        .then(data => {
          const html = desp.replace(/\n/g, '<br/>');
          const json = JSON.parse(data);
          const accesstoken = json.access_token;
          let options;

          switch (QYWX_AM_AY[4]) {
            case '0':
              options = {
                msgtype: 'textcard',
                textcard: {
                  title: `${text}`,
                  description: `${desp}`,
                  url: 'https://github.com/whyour/qinglong',
                  btntxt: '更多',
                },
              };
              break;

            case '1':
              options = {
                msgtype: 'text',
                text: {
                  content: `${text}\n\n${desp}`,
                },
              };
              break;

            default:
              options = {
                msgtype: 'mpnews',
                mpnews: {
                  articles: [
                    {
                      title: `${text}`,
                      thumb_media_id: `${QYWX_AM_AY[4]}`,
                      author: `智能助手`,
                      content_source_url: ``,
                      content: `${html}`,
                      digest: `${desp}`,
                    },
                  ],
                },
              };
          }
          if (!QYWX_AM_AY[4]) {
            //如不提供第四个参数,则默认进行文本消息类型推送
            options = {
              msgtype: 'text',
              text: {
                content: `${text}\n\n${desp}`,
              },
            };
          }
          options = {
            url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accesstoken}`,
            data: {
              touser: `${ChangeUserId(desp)}`,
              agentid: `${QYWX_AM_AY[3]}`,
              safe: '0',
              ...options,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          };
          defHttp
            .post(options)
            .then(data => {
              if (data.errcode === 0) {
                logger.info(
                  '成员ID:' + ChangeUserId(desp) + '企业微信应用消息发送通知消息成功🎉。',
                );
              } else {
                logger.info(`企业微信应用：${data.errmsg}`);
              }
            })
            .catch(err => {
              logger.info('成员ID:' + ChangeUserId(desp) + '企业微信应用消息发送通知消息失败！！');
              logger.info(err);
            })
            .finally(() => {
              resolve('');
            });
        })
        .catch(err => {
          logger.error('企业微信应用消息发送通知消息失败！！');
        });
    } else {
      resolve('');
    }
  });
}

function iGotNotify(text, desp, params = {}) {
  return new Promise(resolve => {
    if (IGOT_PUSH_KEY) {
      // 校验传入的IGOT_PUSH_KEY是否有效
      const IGOT_PUSH_KEY_REGX = new RegExp('^[a-zA-Z0-9]{24}$');
      if (!IGOT_PUSH_KEY_REGX.test(IGOT_PUSH_KEY)) {
        logger.info('您所提供的IGOT_PUSH_KEY无效');
        resolve('');
        return;
      }
      const options = {
        url: `https://push.hellyw.com/${IGOT_PUSH_KEY.toLowerCase()}`,
        params: `title=${text}&content=${desp}&${stringify(params)}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout,
      };
      defHttp
        .post(options)
        .then(data => {
          if (typeof data === 'string') data = JSON.parse(data);
          if (data.ret === 0) {
            logger.info('iGot发送通知消息成功🎉');
          } else {
            logger.info(`iGot发送通知消息失败：${data.errMsg}`);
          }
        })
        .catch(err => {
          logger.info('发送通知调用API失败！！');
          logger.info(err);
        })
        .finally(() => {
          resolve('');
        });
    } else {
      resolve('');
    }
  });
}

function pushPlusNotify(text, desp) {
  return new Promise(resolve => {
    if (PUSH_PLUS_TOKEN) {
      desp = desp.replace(/[\n\r]/g, '<br>'); // 默认为html, 不支持plaintext
      const params = {
        token: `${PUSH_PLUS_TOKEN}`,
        title: `${text}`,
        content: `${desp}`,
        topic: `${PUSH_PLUS_USER}`,
      };
      const options = {
        url: `https://www.pushplus.plus/send`,
        params,
        headers: {
          'Content-Type': ' application/json',
        },
        timeout,
      };
      defHttp
        .post(options)
        .then(data => {
          if (data.code === 200) {
            logger.info(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息完成。`);
          } else {
            logger.info(
              `push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息失败：${data.msg}`,
            );
          }
        })
        .catch(err => {
          logger.info(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息失败！！`);
          logger.info(err);
        })
        .finally(() => {
          resolve('');
        });
    } else {
      resolve('');
    }
  });
}

/**
 * 发送消息到其他设备
 * @param title 标题
 * @param text 文本内容
 */
export async function sendMessage(title: string, text: string) {
  logger.info('----【消息推送】----');
  // 处理 title
  title = `Bili-${TaskModule.nickname}-${title}`;
  await sendNotify(title, text, undefined, '');
}
