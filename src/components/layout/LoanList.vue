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
        <template slot="handle" slot-scope="{ row }">
          <Button type="text" size="small" icon="md-create" class="fix-table-btn" @click="handleEdit(row)">编辑</Button>
        </template>
      </Table>
      <Alert v-else>暂无数据</Alert>
  </div>
</template>
  
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getLoanList } from '@/api/index'
  
@Component
export default class LoanList extends Vue {
  @Prop({ default: '' })  ativeTab!: string
  @Prop({ default: '' })  id!: string|number
  tableHead = [
    { title: '订单号码', minWidth: 140, key: 'loan_no', align: 'center' },
    // { title: '地址', minWidth: 140, key: 'phone', align: 'center' },
    { title: '总数', key: 'loan_balance', minWidth: 140, align: 'center' },
    { title: '滞纳金金额', key: 'overdue_amount', minWidth: 140, align: 'center' },
    { title: '罚金日', key: 'due_date', minWidth: 140, align: 'center' },
    { title: '逾期天数', key: 'overdue_days', minWidth: 140, align: 'center' },
    { title: '还款金额', key: 'due_amount', minWidth: 140, align: 'center' },
    { title: '还款时间', key: 'repayment_date', minWidth: 140, align: 'center' },
    // { title: '实时', key: 'msgTimes', minWidth: 140, align: 'center' },
    { title: '状态', key: 'status', minWidth: 140, align: 'center' }
  ]
  tableData = [
  ]
  tableLoading = false
  @Watch('ativeTab')
  onAtiveTab(val: string, oldVal: string) {
    if (val === 'tab4') {
      this._getList()
    }
  }
  mounted() {
  }
  // 获取列表数据
  _getList() {
    this.tableLoading = true
    getLoanList({id: this.id}, (res: any) => {
      this.tableData = res.data
      this.tableLoading = false
    })
  }
}
</script>
  
<style lang="scss" scoped>
</style>