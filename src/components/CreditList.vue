<template>
  <div class="m-model">
    <Form :label-width="100">
      <Row style="left:-26px">
        <Col span="6">
          <FormItem label="名称：">
            <Input v-model="queryInfo.name"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <Button
            type="primary"
            style="margin-left: 30px;"
            :loading="searchLoading"
            @click="search"
          >查询</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="columns1" :data="curListInfo" :loading="isTableLoading"></Table>
    <div class="g-page-box" v-if="pageInfo.total">
      <Page :total="pageInfo.total" show-total :page-size="pageInfo.pageSize" @on-change="jumPage"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { getPageList } from '@/common/until'

@Component
export default class CreditList extends Vue {

  @Getter('list') list: any
  @Action('getList') getList: any

  isTableLoading = false
  searchLoading = false
  queryInfo: any = {
    name: ''
  }
  pageQueryInfo: any = {
    page_num: 1,
    per_page_num: 1000000,
    where_str: {}
  }
  pageInfo: any = {
    page: 1,
    total: 0,
    pageSize: 20
  }
  curListInfo: any = []
  columns1: any = [
    { title: '日期', key: 'title' },
    { title: '接口名称', key: 'title' },
    { title: '调用PV', key: 'title' },
    { title: '调用UV', key: 'create_time' },
    { title: '客户类型（新客/老客）', key: 'operator'},
    { title: '授信通过UV', key: 'operator'},
    { title: '授信通过率', key: 'operator'},
    { title: '花费', key: 'operator'}
  ]

  mounted() {
    this._getModelList()
  }

  search(): void {
    this.searchLoading = true
    Object.assign(this.pageQueryInfo, {
      where_str: this.queryInfo,
      page_num: 1
    })
    this._getModelList()
  }
   jumPage(page: number): void {
    Object.assign(this.pageInfo, {
     page
    })
    this.curListInfo = getPageList(this.list, this.pageInfo)
  }
  _getModelList(): void {
    this.isTableLoading = true
    this.pageInfo.page = 1
    this.getList(this.pageQueryInfo).then(() => {
      this.pageInfo.total = this.list.length
      this.curListInfo = getPageList(this.list, this.pageInfo)
    })
    this.isTableLoading = false
    this.searchLoading = false
  }
}
</script>
<style lang="scss" scoped>
</style>

