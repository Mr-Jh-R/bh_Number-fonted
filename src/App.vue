<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <BasicLayouts/>
    </a-config-provider>

  </div>
</template>


<script setup lang="ts">

import BasicLayouts from "@/layouts/BasicLayouts.vue";
import { healthUsingGet } from "@/api/mainController.ts";
import { useLoginUserStore } from "@/stores/useLoginUserStore.ts";

const loginUserStore = useLoginUserStore();
loginUserStore.fetchLoginUser();

healthUsingGet().then((res) => {
  console.log(res.data);
})

import zhCN from 'ant-design-vue/es/locale/zh_CN';
const locale = zhCN;
</script>

<style scoped>

</style>
