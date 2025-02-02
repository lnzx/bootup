<script setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Bell, CircleUser, Home, Menu, Zap, Search, Server, Package2, CornerDownLeft } from 'lucide-vue-next'
import { ref } from 'vue'

const instances = ref([])

const getinstances = () => {
  instances.value = [{ id: 'id-11111111' }, { id: 'id-222222222' }]
}

const delInstance = () => {
  console.log('del i-xx')
}
</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Zap class="h-6 w-6" />
            <span class="">Bootup</span>
          </a>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <a href="/" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Home class="h-4 w-4" />
              Dashboard
            </a>
            <a href="#" class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
              <Server class="h-4 w-4" />
              实例
            </a>
          </nav>
        </div>
        <div class="mt-auto p-4">
          <Card>
            <CardHeader class="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription> Unlock all features and get unlimited access to our support team. </CardDescription>
            </CardHeader>
            <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" class="w-full"> Upgrade </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
              <a href="#" class="flex items-center gap-2 text-lg font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Bootup</span>
              </a>
              <a href="#" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                <Home class="h-5 w-5" />
                Dashboard
              </a>
              <a href="#" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                <Server class="h-5 w-5" />
                实例
              </a>
            </nav>
            <div class="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription> Unlock all features and get unlimited access to our support team. </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" class="w-full"> Upgrade </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search instances..." class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="relative hidden flex-col items-start gap-8 md:flex">
          <form class="grid w-full items-start gap-6">
            <fieldset class="grid gap-6 rounded-lg border p-4">
              <legend class="-ml-1 px-1 text-sm font-medium">添加实例</legend>
              <div class="grid gap-3">
                <Label for="keyId">Access Key ID</Label>
                <Input id="keyId" type="input" placeholder="Access Key ID" />
              </div>
              <div class="grid gap-3">
                <Label for="secret">Secret Access Key</Label>
                <Input id="secret" type="input" placeholder="Secret Access Key" />
              </div>
              <div class="grid gap-3">
                <Label for="region">区域</Label>
                <Select id="region" default-value="us-east-1">
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
                <Button type="button" size="sm">查询CPU配额</Button>
                <div class="flex gap-3">
                  <Button type="button" size="sm" @click="getinstances">查询已有实例</Button>
                </div>
                <Button type="button" size="sm" @click="delInstance">删除实例</Button>
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
              <Checkbox id="terms" />
              <label for="terms" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Accept terms and conditions </label>
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
    </div>
  </div>
</template>
