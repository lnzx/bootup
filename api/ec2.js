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

  if (rsp.Reservations.length > 0) {
    // 提取第一个Reservation中的第一个实例
    const reservation = rsp.Reservations[0]
    const instance = reservation[0].Instances[0]
    console.log(instance.InstanceId) // 输出: i-0abcd1234efgh5678
    console.log(instance.InstanceType) // 输出: t2.micro
    console.log(instance.State.Name) // 输出: running
    console.log(instance.PublicIpAddress) // 输出: 123.45.67.89
    console.log(instance.LaunchTime.toISOString()) // 输出: running
    const instanceData = {
      InstanceId: instance.InstanceId,
      InstanceType: instance.InstanceType,
      State: instance.State.Name,
      PublicIpAddress: instance.PublicIpAddress,
      LaunchTime: instance.LaunchTime ? instance.LaunchTime.toISOString() : '', // 处理 LaunchTime 可能为空的情况
    }

    res.status(200).json(instanceData)
  }

  res.status(404).json({ message: 'No instances found.' })
}
