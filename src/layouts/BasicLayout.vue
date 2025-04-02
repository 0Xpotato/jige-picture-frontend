<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout>
        <GlobalSider class="sider"/>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">
                <a href="https://gitee.com/Lucky__Style">鸡哥云图库 by 程序员鸡哥</a>
<!--                <a href="https://gitee.com/Lucky__Style">鸡哥智能协同云图库 by 程序员鸡哥</a>-->
<!--        <a type="link">鸡哥智能协同云图库 by 程序员鸡哥</a>-->
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalSider from '@/components/GlobalSider.vue'
</script>

<style scoped>
#basicLayout .header {
  padding-inline: 20px;
  background: white;
  color: unset;
  margin-bottom: 1px;
}

#basicLayout .content {
  padding: 36px;
  background: linear-gradient(to right, #fefefe, #fff); /*从左到右渐变色 margin-bottom: 30px;*/
}

#basicLayout .footer {
  background: #efefef;
  padding: 12px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#basicLayout .sider{
  background: #fff;
  padding-top: 20px;
  border-right: 0.5px solid #eee;
}

#basicLayout :deep(.ant-menu-root) {
  border-bottom: none !important;
  border-inline-end: none !important;
}
</style>
