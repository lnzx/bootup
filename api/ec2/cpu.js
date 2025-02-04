import { ServiceQuotasClient, GetServiceQuotaCommand } from '@aws-sdk/client-service-quotas'

const OnDemandStandard = 'L-1216C47A'

export default async function handler(req, res) {
  const { region, key, secret } = req.query

  const client = new ServiceQuotasClient({
    region: region,
    credentials: {
      accessKeyId: key,
      secretAccessKey: secret,
    },
  })

  const command = new GetServiceQuotaCommand({
    ServiceCode: 'ec2',
    QuotaCode: OnDemandStandard,
  })

  const response = await client.send(command)
  res.status(200).json(response.Quota?.Value)
}
