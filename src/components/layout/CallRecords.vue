<template>
  <div class="m-page">
     <Table
        border
        :columns="tableHead"
        :data="tableData"
        :loading="tableLoading"
        v-if="tableData.length > 0"
      >
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>Loading</div>
        </Spin>
        <template slot="status" slot-scope="{ row }">
          {{row.status  > 0 ? '拨通' : '暂停'}}
        </template>
        <template slot="call_type" slot-scope="{ row }">
            {{row.call_type  > 0 ? '手机' : '座机'}}
        </template>
      </Table>
      <Alert v-else>暂无数据</Alert>
  </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { getRecordsList } from '@/api/index'
  
@Component
export default class CallRecords extends Vue {
  tableHead = [
    { title: '姓名', minWidth: 140, key: 'call_name', align: 'center' },
    { title: '电话', minWidth: 140, key: 'call_mobile', align: 'center' },
    { title: '通话日期', key: 'call_time', minWidth: 140, align: 'center' },
    { title: '通话时长', key: 'call_length', minWidth: 140, align: 'center' },
    // { title: '通话地点', key: 'msgTimes', minWidth: 140, align: 'center' },
    { title: '通话状态', key: 'status', slot: 'status', minWidth: 140, align: 'center' },
    { title: '通话类型', key: 'call_type', slot: 'call_type', minWidth: 140, align: 'center' },
  ]
  tableData = [
  ]
  tableLoading = false

  mounted() {
  this._getList()
  }
  // 获取列表数据
  _getList() {
    this.tableLoading = true
    getRecordsList({}, (res: any) => {
      this.tableData = res.data
      this.tableLoading = false
    })
  }
}
</script>
  
<style lang="scss" scoped>
</style>