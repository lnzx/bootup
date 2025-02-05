import { RunInstancesCommand, AuthorizeSecurityGroupIngressCommand } from '@aws-sdk/client-ec2'
import path from 'path'
import fs from 'fs/promises'
import { getEC2Client } from './client.js'

export default async function handler(req, res) {
  const body = req.body
  console.log(body)
  const client = getEC2Client(body.region, body.key, body.secret)

  // 调用安全组规则添加函数
  await tryAuthorizeSecurityGroupIngress(client)

  const filePath = path.join(process.cwd(), 'scripts', 'UserData.sh')
  let content = await fs.readFile(filePath, 'utf8')
  content = content.replaceAll('aws-XXXX', body.name)
  console.log(content)
  const base64Content = Buffer.from(content).toString('base64')

  // 执行创建命令
  const command = new RunInstancesCommand({
    ImageId: req.body.os, // 必须指定 AMI ID 先前台输入，后面优化
    InstanceType: req.body.type, // 例如 t2.micro
    MinCount: 1,
    MaxCount: 1,
    UserData: base64Content,
    TagSpecifications: [
      {
        ResourceType: 'instance',
        Tags: [{ Key: 'Name', Value: body.name }],
      },
    ],
  })

  const rsp = await client.send(command)

  // 添加判断，确保 rsp.Instances 存在且不为空
  if (rsp.Instances && rsp.Instances.length > 0) {
    const id = rsp.Instances[0].InstanceId
    res.status(200).json(id)
  } else {
    // 如果没有创建任何实例，则返回一个错误响应
    console.error('创建 EC2 实例失败，没有返回任何实例信息')
    res.status(500).json({ error: '创建 EC2 实例失败' })
  }
}

// 提取的安全组规则添加函数
async function tryAuthorizeSecurityGroupIngress(client) {
  await client
    .send(
      new AuthorizeSecurityGroupIngressCommand({
        GroupName: 'default',
        IpPermissions: [
          {
            IpProtocol: '-1', // 所有协议
            IpRanges: [
              {
                CidrIp: '0.0.0.0/0', // 所有IP
              },
            ],
          },
        ],
      }),
    )
    .then(() => {
      console.log('安全组规则添加成功')
    })
    .catch((sgError) => {
      if (sgError.name === 'InvalidPermission.Duplicate') {
        console.log('安全组规则已存在，跳过添加')
      } else {
        console.error('添加安全组规则失败:', sgError)
      }
    })
}
