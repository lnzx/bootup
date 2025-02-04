<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import { useApi } from '@/composable/useApi'

const api = useApi()

const username = ref('')
const password = ref('')

const login = () => {
  console.log(username.value, password.value)
  if (username.value && password.value) {
    api.post('/api/login', { username: username.value, password: password.value }).then((res) => {
      const data = res.data
      if (data && data.token) {
        localStorage.setItem('token', data.token)
        location.href = '/nodes'
      }
    })
  }
}
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl"> Login to Bootup</CardTitle>
      <CardDescription> Enter your email below to login to your account </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="username">Email</Label>
          <Input id="username" type="email" placeholder="m@example.com" required v-model="username" />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="#" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
          </div>
          <Input id="password" type="password" required v-model="password" />
        </div>
        <Button type="button" class="w-full" @click="login"> Login </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="#" class="underline"> Sign up </a>
      </div>
    </CardContent>
  </Card>
</template>
