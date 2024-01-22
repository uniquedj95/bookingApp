<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-container>
      <el-header class="heading">
        <h3>HOTEL BOOKING APP</h3>
        <el-button>Logout</el-button>
      </el-header>

      <el-main style="padding: 2rem;">
        <el-scrollbar>
          <h4>Bookings</h4>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="firstname" label="First Name" />
            <el-table-column prop="lastname" label="Last Name" />
            <el-table-column prop="checkin" label="Check-In Date" />
            <el-table-column prop="checkout" label="Check-Out Date" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElMain, ElButton, ElTable, ElTableColumn } from 'element-plus';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { ref, onMounted } from "vue";
import ApiClient from "../api-client";

const bookings = ref<Array<any>>();

onMounted(async () => {
  bookings.value = await ApiClient.getJson("https://restful-booker.herokuapp.com/booking");
})
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}

.heading {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: CENTERED_ALIGNMENT;
}
</style>

