<template>
  <div class="m-model">
    <Form :label-width="80" inline>
      <FormItem label="姓名：">
        <Input v-model="queryInfo.name" />
      </FormItem>
      <FormItem label="手机号：">
        <Input v-model="queryInfo.mobile" clearable/>
      </FormItem>
      <FormItem label="Pancard：">
        <Input v-model="queryInfo.pan_code" clearable/>
      </FormItem>
      <FormItem label="Aadhaar_no:">
        <Input v-model="queryInfo.aadhaar_no" clearable/>
      </FormItem>
      <FormItem label="状态:">
        <Select v-model="queryInfo.state" style="width:200px" clearable>
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <Button
        type="primary"
        style="margin:0 0 30px 30px;"
        :loading="searchLoading"
        @click="search"
      >查询</Button>
    </Form>
    <Table border :columns="columns1" :data="curListInfo" :loading="isTableLoading">
       <template slot="state"  slot-scope="{ row }">
         {{ row.state === 20 ? '正常' : '不正常'}}
        </template>
       <template slot="handle" slot-scope="{ row }">
          <a @click="showBaseInfo(row.id)">查看</a>
        </template>
    </Table>
    <div class="g-page-box" v-if="pageQueryInfo.total">
      <Page :total="pageQueryInfo.total" show-total :page-size="pageQueryInfo.pageSize" @on-change="jumPage" :current="pageQueryInfo.current"/>
    </div>
    <!-- 弹层 -->
    <Modal
      v-model="baseInfoPop"
      title="查看"
      width="1200"
      class="base-info"
      >
      <Tabs :value="ativeTab" :animated="false" @on-click="changeTabs">
        <TabPane label="基本信息" name="tab1">
          <UserInfo :ativeTab="ativeTab" :id="id"/>
        </TabPane>
        <TabPane label="通讯录" name="tab2">
          <Contacts :ativeTab="ativeTab" :id="id"/>
        </TabPane>
        <!-- <TabPane label="通话记录" name="tab3">
          <CallRecords/>
        </TabPane> -->
        <TabPane label="借款记录" name="tab4">
          <LoanList :ativeTab="ativeTab" :id="id"/>
        </TabPane>
      </Tabs>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import UserInfo from '@/components/layout/UserInfo.vue'
import LoanList from '@/components/layout/LoanList.vue'
import CallRecords from '@/components/layout/CallRecords.vue'
import Contacts from '@/components/layout/Contacts.vue'

import {getUserList, getUserInfo} from '@/api/index'

@Component({
  components: {
    UserInfo,
    LoanList,
    Contacts,
    CallRecords
  }
})
export default class UserList extends Vue {
  isTableLoading = false
  searchLoading = false
  baseInfoPop = false

  ativeTab = ''
  id: string | number = ''

  queryInfo: any = {
    name: '',
    mobile: '',
    pan_code: '',
    aadhaar_no: '',
    state: ''
  }
  stateList: Array<any> = [
    {
      value: 0,
      label: '黑名单'
    },
    {
      value: 1,
      label: '普通'
    },
     {
      value: 2,
      label: '白名单'
    }
  ]
  pageQueryInfo: any = {
    current: 1,
    pageSize: 10,
    where_str: {}
  }
  curListInfo: any = []
  columns1: any = [
    { title: '手机号', key: 'mobile' },
    { title: '姓名', key: 'name' },
    { title: '客户端ID', key: 'client_id' },
    { title: '教育背景', key: 'education'},
    { title: '注册时间', key: 'create_time'},
    { title: '注册设备', key: 'platform'},
    { title: '注册渠道', key: 'channel'},
    { title: '状态',
      key: 'create_time',
      slot: 'state'
    },
    { title: '操作',
      key: 'action',
      width: 150,
      align: 'center',
      slot: 'handle'
    },
  ]

  mounted() {
    this._getUserList()
  }

  search(): void {
    this.searchLoading = true
    Object.assign(this.pageQueryInfo, {
      where_str: this.queryInfo,
      current: 1
    })
    this._getUserList()
  }
  showBaseInfo(id: string | number): void {
    this.id = id
    this.baseInfoPop = true
    this.ativeTab = 'tab1'
  }
  jumPage(current: number): void {
    Object.assign(this.pageQueryInfo, {
     current
    })
    this._getUserList()
  }
  changeTabs(name: string) {
    this.ativeTab = name
    // 切换tab后的操作
  }
  _getUserList(): void {
    this.isTableLoading = true
    getUserList(this.pageQueryInfo, (res: any) => {
      const { page, data} = res.data
      this.curListInfo = data
      this.pageQueryInfo.total = page.total
    })
    this.isTableLoading = false
    this.searchLoading = false
  }
}
</script>
<style lang="scss" scoped>
</style>

