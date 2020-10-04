<template>
  <div class="m-page">
    <Form :label-width="80" inline>
      <FormItem label="姓名：">
        <Input v-model="queryInfo.contact_name" />
      </FormItem>
      <FormItem label="手机号：">
        <Input v-model="queryInfo.contact_mobile" />
      </FormItem>
      <Button
        type="primary"
        style="margin-left: 30px"
        :loading="searchLoading"
        @click="search"
        >查询</Button
      >
    </Form>
    <Table
      border
      :columns="tableHead"
      :data="tableData"
      :loading="tableLoading"
      v-if="tableData.length > 0"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size="18" class="spin-icon" />
        <div>Loading</div>
      </Spin>
      <template slot="handle" slot-scope="{ row }">
        <Button
          type="text"
          size="small"
          icon="md-create"
          class="fix-table-btn"
          @click="handleEdit(row)"
          >编辑</Button
        >
      </template>
    </Table>
    <Alert v-else>暂无数据</Alert>
    <div class="g-page-box" v-if="pageQueryInfo.total">
      <Page
        :total="pageQueryInfo.total"
        show-total
        :page-size="pageQueryInfo.pageSize"
        :current="pageQueryInfo.current"
        @on-change="jumPage"
      />
    </div>
  </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator'
import { getContactsList } from '@/api/index'

@Component
export default class Contacts extends Vue {
  @Prop({ default: '' })  ativeTab!: string
  @Prop({ default: '' })  id!: string|number
  tableHead = [
    { title: '姓名', minWidth: 140, key: 'contact_name', align: 'center' },
    { title: '电话', minWidth: 140, key: 'contact_mobile', align: 'center' },
    { title: '通话次数', key: 'call_times', minWidth: 140, align: 'center' },
  ]
  tableData = []
  tableLoading = false
  searchLoading = false

  pageQueryInfo: any = {
    current: 1,
    pageSize: 10,
    total: 0,
    where_str: {},
  }
  queryInfo: any = {
    contact_name: '',
    contact_mobile: '',
  }
  @Watch('ativeTab')
  onAtiveTab(val: string, oldVal: string) {
    if (val === 'tab2') {
      this._getList()
    }
  }
  mounted() {

  }
  search(): void {
    this.searchLoading = true
    Object.assign(this.pageQueryInfo, {
      where_str: this.queryInfo,
      current: 1,
    })
    this._getList()
  }
  jumPage(current: number): void {
    Object.assign(this.pageQueryInfo, {
      current,
    })
    this._getList()
  }
  // 获取列表数据
  _getList() {
    this.tableLoading = true
    Object.assign(this.pageQueryInfo, { id: this.id})
    getContactsList(this.pageQueryInfo, (res: any) => {
      const { data, page } = res.data
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