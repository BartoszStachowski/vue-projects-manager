<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient.ts';
console.log(supabase);
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
