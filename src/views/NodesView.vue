<script setup>
import { Button } from '@/components/ui/button'
import AppLayout from '@/components/AppLayout.vue'

const add = () => {
  location.href = '/nodes/add'
}
</script>

<template>
  <AppLayout>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">实例</h1>
      </div>
      <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div class="flex flex-col items-center gap-1 text-center">
          <h3 class="text-2xl font-bold tracking-tight">您还没有实例</h3>
          <p class="text-sm text-muted-foreground">点击添加实例按钮即可添加实例</p>
          <Button @click="add"> 添加实例 </Button>
        </div>
      </div>
    </main>
  </AppLayout>
</template>
