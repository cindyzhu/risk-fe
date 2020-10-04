<template>
  <div class="m-detail" v-if="Object.keys(userInfo).length">
    <div class="table-title">基本信息</div>
    <div class="m-detail-table">
    <Row>
      <Col span="6" class-name="col title">姓名</Col>
      <Col span="6" class-name="col">{{userInfo.name}}</Col>
      <Col span="6" class-name="col title">性别</Col>
      <Col span="6" class-name="col">{{userInfo.gender}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">年龄</Col>
      <Col span="6" class-name="col">{{userInfo.age}}</Col>
      <Col span="6" class-name="col title">银行账户</Col>
      <Col span="6" class-name="col">{{userInfo.cardNo}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">所属银行</Col>
      <Col span="6" class-name="col">{{userInfo.bank}}</Col>
      <Col span="6" class-name="col title">用户银行卡姓名</Col>
      <Col span="6" class-name="col">{{userInfo.beneName}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">注册时间</Col>
      <Col span="18" class-name="col">{{userInfo.registTime}}</Col>
     </Row>
    <Row>
      <Col span="6" class-name="col title">aadharr地址</Col>
       <Col span="18" class-name="col" style="line-height:1.2;">{{userInfo.idAddr}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">电话</Col>
      <Col span="6" class-name="col">{{userInfo.mobile}}</Col>
      <Col span="6" class-name="col title">当前地址</Col>
      <Col span="6" class-name="col">{{userInfo.liveAddr}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">当前详细地址</Col>
      <Col span="18" class-name="col">{{userInfo.liveDetailAddr}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">GPS地址</Col>
      <Col span="18" class-name="col">{{userInfo.registerAddr}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">注册GPS地址</Col>
      <Col span="18" class-name="col">{{userInfo.registerCoordinate}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">注册终端</Col>
      <Col span="6" class-name="col">{{userInfo.platform}}</Col>
      <Col span="6" class-name="col title">渠道名称</Col>
      <Col span="6" class-name="col">{{userInfo.channelName}}</Col>
    </Row>
    <!-- <Row>
      <Col span="6" class-name="col title">个人电子邮箱</Col>
      <Col span="6" class-name="col">{{userInfo.email}}</Col>
      <Col span="6" class-name="col title">公司电子邮箱</Col>
      <Col span="6" class-name="col">{{userInfo.officeEmail}}</Col>
    </Row> -->
    </div>
    <div class="table-title">公司信息</div>
    <div class="m-detail-table">
    <Row>
      <Col span="6" class-name="col title">公司名称</Col>
      <Col span="6" class-name="col">{{userInfo.companyName}}</Col>
      <Col span="6" class-name="col title">职位</Col>
      <Col span="6" class-name="col">{{userInfo.occupation}}</Col>
      <Col span="6" class-name="col title">工资</Col>
      <Col span="18" class-name="col">{{userInfo.salary}}</Col>
    </Row>
    </div>
    <div class="table-title">通讯录信息</div>
    <div class="m-detail-table">
    <template v-for="(item, index) in userContactInfo">
    <Row :key='"row-" + index' v-if="index < 1">
      <Col span="6" class-name="col title">紧急联系人姓名</Col>
      <Col span="6" class-name="col">{{item.contact_name}}</Col>
      <Col span="6" class-name="col title">紧急联系人电话</Col>
      <Col span="6" class-name="col">{{item.contact_mobile}}</Col>
      <Col span="6" class-name="col title">紧急联系人与本人关系</Col>
      <Col span="18" class-name="col">{{item.relation}}</Col>
    </Row>
    <Row :key='"row-" + index' v-else>
      <Col span="6" class-name="col title">其他紧急联系人姓名</Col>
      <Col span="6" class-name="col">{{item.contact_name}}</Col>
      <Col span="6" class-name="col title">其他紧急联系人电话</Col>
      <Col span="6" class-name="col">{{item.contact_mobile}}</Col>
      <Col span="6" class-name="col title">其他紧急联系人与本人关系</Col>
      <Col span="18" class-name="col">{{item.relation}}</Col>
    </Row>
     </template>
    </div>
    <!-- <div class="table-title">验证信息</div>
    <div class="m-detail-table">
    <Row>
      <Col span="6" class-name="col title">银行账户</Col>
      <Col span="6" class-name="col">{{+userInfo.userAuth.bankCardState === 30 ? '成功' : '失败'}}</Col>
      <Col span="6" class-name="col title">联系人</Col>
      <Col span="6" class-name="col">{{+userInfo.userAuth.contactState === 30 ? '成功' : '失败'}}</Col>
    </Row>
    <Row>
      <Col span="6" class-name="col title">个人信息</Col>
      <Col span="6" class-name="col">{{+userInfo.userAuth.personalInfoState === 30 ? '成功' : '失败'}}</Col>
      <Col span="6" class-name="col title">身份认证</Col>
      <Col span="6" class-name="col">{{+userInfo.userAuth.realNameAuthState === 30 ? '成功' : '失败'}}</Col>
    </Row>
    </div> -->
</div>
</template>
<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {getUserInfo} from '@/api/index'
@Component
export default class UserInfo extends Vue {
  @Prop({ default: '' })  ativeTab!: string
  @Prop({ default: '' })  id!: string|number
  userInfo = {}
  userContactInfo = []
  @Watch('ativeTab')
  onAtiveTab(val: string, oldVal: string) {
    if (val === 'tab1') {
      this._getUserInfo()
    }
  }
  mounted() {
  }
  _getUserInfo(): void {
    getUserInfo({
      id: this.id
    }, (res: any) => {
      const {user_info, contact_info} = res.data
      this.userInfo = user_info
      this.userContactInfo = contact_info
    })
  }
}
</script>
<style lang="scss" scoped>
.m-detail{
  .table-title {
    border-left: 3px solid #4195f1;
    padding-left: 6px;
    color: #4195f1;
    font-weight: 800;
    font-size: 14px;
    line-height: 1.5;
    margin: 10px 0;
  }
  .m-detail-table{
    border-left: 1px solid #e9eaec;
    border-top: 1px solid #e9eaec;
    .col{
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      text-indent: 20px;
      &.title{
        padding-left: 0;
        color: #495060;
        font-weight: bold;
        background-color: #f8f8f9;
        
      }
    }
  }
}
</style>