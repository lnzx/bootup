import { EC2Client } from '@aws-sdk/client-ec2'

let cachedClient = null
let cachedRegion = null
let cachedKey = null
let cachedSecret = null

export function getEC2Client(region, key, secret) {
  if (!cachedClient || region !== cachedRegion || key !== cachedKey || secret !== cachedSecret) {
    console.log('Creating new EC2 client')
    cachedClient = new EC2Client({
      region: region,
      credentials: {
        accessKeyId: key,
        secretAccessKey: secret,
      },
    })
  } else {
    console.log('Returning cached EC2 client')
  }

  return cachedClient
}
