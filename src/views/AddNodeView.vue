<script setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CornerDownLeft } from 'lucide-vue-next'
import AppLayout from '@/components/AppLayout.vue'

import { ref } from 'vue'
import axios from 'axios'

const key = ref('')
const secret = ref('')
const region = ref('')

const instance = ref('')

const getInstances = () => {
  if (key.value && secret.value && region.value) {
    axios
      .get('/api/ec2', {
        params: {
          key: key.value,
          secret: secret.value,
          region: region.value,
        },
      })
      .then((res) => {
        instance.value = JSON.stringify(res.value, null, 2)
      })
  }
}

const getCpu = () => {}
</script>

<template>
  <AppLayout>
    <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="relative hidden flex-col items-start gap-8 md:flex">
        <form class="grid w-full items-start gap-6">
          <fieldset class="grid gap-6 rounded-lg border p-4">
            <legend class="-ml-1 px-1 text-sm font-medium">添加实例</legend>
            <div class="grid gap-3">
              <Label for="keyId">Access Key ID</Label>
              <Input id="keyId" type="input" placeholder="Access Key ID" v-model="key" />
            </div>
            <div class="grid gap-3">
              <Label for="secret">Secret Access Key</Label>
              <Input id="secret" type="input" placeholder="Secret Access Key" v-model="secret" />
            </div>
            <div class="grid gap-3">
              <Label for="region">区域</Label>
              <Select id="region" default-value="us-east-1" v-model="region">
                <SelectTrigger class="col-span-4">
                  <SelectValue placeholder="选择区域" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>美国</SelectLabel>
                    <SelectItem value="us-east-1"> us-east-1 美国东部 (弗吉尼亚北部) </SelectItem>
                    <SelectItem value="us-east-2"> us-east-2 美国东部 (俄亥俄州) </SelectItem>
                    <SelectItem value="us-west-1"> us-west-1 美国西部 (加利福尼亚北部) </SelectItem>
                    <SelectItem value="us-west-2"> us-west-2 美国西部 (俄勒冈州) </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>亚太</SelectLabel>
                    <SelectItem value="ap-south-1"> ap-south-1 亚太地区 (孟买) </SelectItem>
                    <SelectItem value="ap-northeast-3"> ap-northeast-3 亚太地区 (大阪) </SelectItem>
                    <SelectItem value="ap-northeast-2"> ap-northeast-2 亚太地区 (首尔) </SelectItem>
                    <SelectItem value="ap-southeast-1"> ap-southeast-1 亚太地区 (新加坡) </SelectItem>
                    <SelectItem value="ap-southeast-2"> ap-southeast-2 亚太地区 (悉尼) </SelectItem>
                    <SelectItem value="ap-northeast-1"> ap-northeast-1 亚太地区 (东京) </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>加拿大</SelectLabel>
                    <SelectItem value="ca-central-1"> ca-central-1 加拿大 (中部) </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>欧洲</SelectLabel>
                    <SelectItem value="eu-central-1"> eu-central-1 欧洲 (法兰克福) </SelectItem>
                    <SelectItem value="eu-west-1"> eu-west-1 欧洲 (爱尔兰) </SelectItem>
                    <SelectItem value="eu-west-2"> eu-west-2 欧洲 (伦敦) </SelectItem>
                    <SelectItem value="eu-west-3"> eu-west-3 欧洲 (巴黎) </SelectItem>
                    <SelectItem value="eu-north-1"> eu-north-1 欧洲 (斯德哥尔摩) </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>南美洲</SelectLabel>
                    <SelectItem value="sa-east-1"> sa-east-1 南美洲 (圣保罗) </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="flex justify-between gap-3">
              <Button type="button" size="sm" @click="getCpu">查询CPU配额</Button>
              <Button type="button" size="sm" @click="getInstances">查询已有实例</Button>
            </div>
            <div class="grid gap-3">
              <Label for="os">操作系统</Label>
              <Input id="os" type="input" readonly placeholder="ubuntu 24.04 64 位（ARM）" value="ubuntu 24.04 64 位（ARM）" />
            </div>
            <div class="grid gap-3">
              <Label for="role">实例类型</Label>
              <Select default-value="t2.micro">
                <SelectTrigger>
                  <SelectValue placeholder="选择实例类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t2.micro"> t2.micro </SelectItem>
                  <SelectItem value="c8g.8xlarge"> c8g.8xlarge </SelectItem>
                  <SelectItem value="c7g.8xlarge"> c7g.8xlarge </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="grid gap-3">
              <Label for="userdata">UserData</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择UserData" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ssh"> 开启ssh root密码登录 </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </fieldset>

          <div class="grid w-full gap-2">
            <Button type="button">确定添加实例</Button>
          </div>
        </form>
      </div>
      <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <Badge variant="outline" class="absolute right-3 top-3"> Output </Badge>
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <pre class="bg-gray-100 dark:bg-gray-800 rounded-md p-3 overflow-x-auto font-mono text-sm whitespace-pre-wrap">
         {{ formattedJson }}
       </pre
            >
          </div>
        </div>

        <form class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Label for="message" class="sr-only"> Message </Label>
          <Textarea id="message" placeholder="Type your command here..." class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0" />
          <div class="flex items-center p-3 pt-0">
            <Button type="submit" size="sm" class="ml-auto gap-1.5">
              Send Command
              <CornerDownLeft class="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  </AppLayout>
</template>
