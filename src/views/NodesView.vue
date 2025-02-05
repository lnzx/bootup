<script setup>
import { Button } from '@/components/ui/button'
import AppLayout from '@/components/AppLayout.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { ref } from 'vue'
import { useApi } from '@/composable/useApi'

const api = useApi()

const nodes = ref([])
const loading = ref(true)

const getNodes = () => {
  loading.value = true
  api
    .get('/api/nodes/list')
    .then((res) => {
      nodes.value = res.data
      loading.value = false
    })
    .catch((error) => {
      console.error('获取节点列表失败:', error)
      loading.value = false
    })
}

const add = () => {
  location.href = '/nodes/add'
}

getNodes()
</script>

<template>
  <AppLayout>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">实例</h1>
      </div>

      <div v-show="loading" class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div class="flex flex-col items-center gap-1 text-center">
          <div class="flex flex-col space-y-3">
            <Skeleton class="h-[125px] w-[250px] rounded-xl" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>

      <div v-show="!loading && nodes.length === 0" class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div class="flex flex-col items-center gap-1 text-center">
          <h3 class="text-2xl font-bold tracking-tight">您还没有实例</h3>
          <p class="text-sm text-muted-foreground">点击添加实例按钮即可添加实例</p>
          <Button @click="add"> 添加实例 </Button>
        </div>
      </div>

      <div v-show="!loading && nodes.length > 0" class="grid gap-4">
        <div v-for="node in nodes" :key="node.id" class="rounded-lg border shadow-sm p-4">
          <p>实例名称: {{ node.key }}</p>
          <p>实例名称: {{ node.secret }}</p>
          <p>实例 ID: {{ node.id }}</p>
          <p>实例名称: {{ node.name }}</p>
        </div>
      </div>
    </main>
  </AppLayout>
</template>
