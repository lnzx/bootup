<script setup>
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Bell, CircleUser, Menu, Zap, Search, Server } from 'lucide-vue-next'
import { useUserSession } from '@/stores/userSession'

const userSession = useUserSession()

const logout = () => {
  userSession.clearToken()
  location.href = '/'
}
</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/nodes" class="flex items-center gap-2 font-semibold">
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
            <a href="/nodes" class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
              <Server class="h-4 w-4" />
              实例
            </a>
          </nav>
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
                <Server class="h-5 w-5" />
                实例
              </a>
            </nav>
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
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <slot></slot>
    </div>
  </div>
</template>
