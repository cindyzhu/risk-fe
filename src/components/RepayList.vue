<template>
  <div class="m-page">
    <Form :label-width="100" inline>
      <FormItem label="姓名：">
      <Input v-model="queryInfo.name" clearable />
      </FormItem>
      <FormItem label="手机号：">
        <Input v-model="queryInfo.mobile" clearable />
      </FormItem>
      <FormItem label="借款ID：">
        <Input v-model="queryInfo.loan_no" clearable />
      </FormItem>
      <FormItem label="状态:">
        <Select v-model="queryInfo.direct_reject" style="width:200px" clearable>
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="时间：">
      <DatePicker type="daterange" split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
      </FormItem>
      <Button
        type="primary"
        style="margin-left: 30px;"
        :loading="searchLoading"
        @click="search"
      >查询</Button>
    </Form>
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
      <template slot="state" slot-scope="{ row }">
      {{+row.direct_reject > 0 ? '机审通过': '机审拒绝'}}
      </template>
      <template slot="handle" slot-scope="{ row }">
        <Button type="text" size="small" icon="md-create" class="fix-table-btn" @click="handleEdit(row)">编辑</Button>
      </template>
    </Table>
    <Alert v-else>暂无数据</Alert>
    <div class="g-page-box" v-if="pageQueryInfo.total">
      <Page :total="pageQueryInfo.total" show-total :page-size="pageQueryInfo.pageSize" @on-change="jumPage" :current="pageQueryInfo.current"/>
    </div>
  </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { getRepayList } from '@/api/index'
  
@Component
export default class RepayList extends Vue {
  tableHead = [
    { title: '用户姓名', minWidth: 140, key: 'name', align: 'center' },
    { title: '手机号', minWidth: 140, key: 'mobile', align: 'center' },
    { title: '借款ID', minWidth: 140, key: 'loan_no', align: 'center' },
    { title: '模型评分', minWidth: 140, key: 'score_new', align: 'center' },
    { title: '老客评分', minWidth: 140, key: 'score_old', align: 'center' },
    { title: '西瓜分', minWidth: 140, key: 'sf_score', align: 'center' },
    { title: '命中直拒规则', minWidth: 140, key: 'reject_rules', align: 'center' },
    { title: '命中信审规则', minWidth: 140, key: 'credit_rules', align: 'center' },
    // { title: '实际还款金额', minWidth: 140, key: 'phone', align: 'center' },
    { title: '授信状态', minWidth: 140,  align: 'center', slot: 'state' },
  ]
  tableData = [
  ]
  tableLoading = false
  searchLoading = false
  stateList: Array<any> = [
    {
      value: 0,
      label: '通过'
    },
    {
      value: 1,
      label: '拒绝'
    }
  ]
  pageQueryInfo: any = {
    current: 1,
    total: 0,
    pageSize: 10,
    where_str: {}
  }
  queryInfo: any = {
    name: '',
    mobile: '',
    direct_reject: ''
  }
  mounted() {
  this._getList()
  }
  search(): void {
    this.searchLoading = true
    Object.assign(this.pageQueryInfo, {
      where_str: this.queryInfo,
      current: 1
    })
    this._getList()
  }
  jumPage(current: number): void {
    Object.assign(this.pageQueryInfo, {
     current
    })
    this._getList()
  }
  // 获取列表数据
  _getList() {
    this.tableLoading = true
    getRepayList({}, (res: any) => {
      const {data, page} = res.data
      this.pageQueryInfo.total = page.total
      this.tableData = data
      this.tableLoading = false
      this.searchLoading = false
    })
  }
}
</script>
  
<style lang="scss" scoped>
</style>