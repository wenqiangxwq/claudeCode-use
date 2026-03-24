<script setup lang="ts">
import { ref } from 'vue'

const statsData = ref([
  { title: '总用户数', value: '10,234', icon: 'User' },
  { title: '总订单数', value: '5,678', icon: 'ShoppingCart' },
  { title: '总收入', value: '¥123,456', icon: 'Money' },
  { title: '活跃用户', value: '3,456', icon: 'TrendCharts' }
])
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col v-for="item in statsData" :key="item.title" :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-title">{{ item.title }}</div>
              <div class="stat-value">{{ item.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>销售趋势</span>
          </template>
          <div class="chart-placeholder">图表区域</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>访问统计</span>
          </template>
          <div class="chart-placeholder">图表区域</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: 0;
}

.stat-card {
  .stat-content {
    display: flex;
    align-items: center;
  }

  .stat-info {
    flex: 1;
  }

  .stat-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  background: #f5f7fa;
}
</style>
