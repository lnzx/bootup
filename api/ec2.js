import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2'

const command = new DescribeInstancesCommand({})

export default async function handler(req, res) {
  // 从查询参数中获取 region、key 和 secret
  const { region, key, secret } = req.query

  console.log('EC2 LIST parameters:', { region, key, secret }) // 添加日志

  const client = new EC2Client({
    region: region,
    credentials: {
      accessKeyId: key,
      secretAccessKey: secret,
    },
  })

  const rsp = await client.send(command)

  // 检查 Reservations 和 Instances 是否存在
  if (rsp.Reservations && rsp.Reservations.length > 0) {
    const instances = rsp?.Reservations?.flatMap((reservation) => reservation.Instances) || []
    if (instances.length === 0) {
      return res.status(404).json({ message: 'No instances found.' })
    }

    const instance = instances[0] // 取第一个实例
    const data = {
      id: instance.InstanceId,
      type: instance.InstanceType,
      state: instance.State.Name,
      ip: instance.PublicIpAddress,
      time: instance.LaunchTime ? instance.LaunchTime.toISOString() : '', // 处理 LaunchTime 可能为空的情况
    }

    res.status(200).json(data)
  } else {
    res.status(404).json({ message: 'No instances found.' })
  }
}
