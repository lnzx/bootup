import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2'

const command = new DescribeInstancesCommand({})

export default async function handler(req, res) {
  // 从查询参数中获取 region、key 和 secret
  const { region, key, secret } = req.query

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
      return res.status(200).json({ message: 'No instances found.' })
    }

    const formattedInstances = instances.map((instance) => ({
      id: instance.InstanceId,
      type: instance.InstanceType,
      state: instance?.State?.Name,
      ip: instance?.PublicIpAddress,
      time: instance?.LaunchTime?.toISOString() || '',
    }))

    res.status(200).json(formattedInstances)
  } else {
    res.status(200).json({ message: 'No instances found.' })
  }
}
