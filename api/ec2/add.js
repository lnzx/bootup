import { EC2Client, RunInstancesCommand, DescribeSecurityGroupsCommand } from '@aws-sdk/client-ec2'
import path from 'path'
import fs from 'fs/promises'

export default async function handler(req, res) {
  const body = req.body

  console.log(body)

  const client = new EC2Client({
    region: body.region,
    credentials: {
      accessKeyId: body.key,
      secretAccessKey: body.secret,
    },
  })

  const describeCommand = new DescribeSecurityGroupsCommand({
    Filters: [
      {
        Name: 'group-name',
        Values: ['default'],
      },
    ],
  })

  const response = await client.send(describeCommand)
  if (!response.SecurityGroups?.[0]?.GroupId) {
    throw new Error('Default security group not found')
  }
  const groupId = response.SecurityGroups[0].GroupId
  console.log('groupId:', groupId)

  const filePath = path.join(process.cwd(), 'scripts', 'UserData.sh')
  let content = await fs.readFile(filePath, 'utf8')
  content = content.replaceAll('aws-XXXX', body.name)
  const base64Content = Buffer.from(content).toString('base64')

  // 执行创建命令
  const command = new RunInstancesCommand({
    ImageId: req.body.amiId, // 必须指定 AMI ID
    InstanceType: req.body.type, // 例如 t2.micro
    MinCount: 1,
    MaxCount: 1,
    UserData: base64Content,
    SecurityGroupIds: [groupId], // 安全组
    TagSpecifications: [
      {
        ResourceType: 'instance',
        Tags: [{ Key: 'Name', Value: body.name }],
      },
    ],
  })

  const rsp = await client.send(command)
  const id = rsp.Instances[0].InstanceId
  res.status(200).json(id)
}
