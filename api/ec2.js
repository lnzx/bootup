import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2'

const command = new DescribeInstancesCommand({})

export default async function handler(req, res) {
  const region = req.query.region
  const key = req.query.key
  const secret = req.query.secret

  const client = new EC2Client({
    region: region,
    credentials: {
      accessKeyId: key,
      secretAccessKey: secret,
    },
  })

  const rsp = await client.send(command)

  if (rsp.Reservations) {
    const instance = rsp.Reservations[0].Instances[0] // 提取第一个Reservation中的第一个实例
    res.status(200).json({
      id: instance.InstanceId,
      type: instance.InstanceType,
      state: instance.State.Name,
      ip: instance.PublicIpAddress,
      time: instance.LaunchTime ? instance.LaunchTime.toISOString() : '', // 处理 LaunchTime 可能为空的情况
    })
  } else {
    res.status(404).json({ message: 'No instances found.' })
  }
}
