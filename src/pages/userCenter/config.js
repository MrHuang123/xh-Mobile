const Mine = res=> require.ensure([], ()=>res(require('./mine.vue')),'Mine');
const Certification = res=> require.ensure([], ()=>res(require('./certification.vue')),'Certification');
const MyBusiness = res=> require.ensure([], ()=>res(require('./myBusiness.vue')),'MyBusinessc');
const ChangeNickname = res=> require.ensure([], ()=>res(require('./changeNickname.vue')),'ChangeNickname');
const ChangeRealName = res=> require.ensure([], ()=>res(require('./changeRealName.vue')),'ChangeRealName');
const ChangeCard = res=> require.ensure([], ()=>res(require('./changeCard.vue')),'ChangeCard');
const PersonalInformation = res=> require.ensure([], ()=>res(require('./personalInformation.vue')),'PersonalInformation');
const ChangeEmail = res=> require.ensure([], ()=>res(require('./changeEmail.vue')),'ChangeEmail');
const ChangeCorporateName = res=> require.ensure([], ()=>res(require('./changeCorporateName.vue')),'ChangeCorporateName');
const ChangeCompanyAddress = res=> require.ensure([], ()=>res(require('./changeCompanyAddress.vue')),'ChangeCompanyAddress');
const ChangeUsername = res=> require.ensure([], ()=>res(require('./changeUsername.vue')),'ChangeUsername');
// const NationalBrand = res=> require.ensure([], ()=>res(require('./nationalBrand.vue')),'NationalBrand');

const CertificationRealName = res=> require.ensure([], ()=>res(require('./certificationRealName.vue')),'CertificationRealName');
const ChangeIndustry = res=> require.ensure([], ()=>res(require('./changeIndustry.vue')),'ChangeIndustry');
const ChangPosition = res=> require.ensure([], ()=>res(require('./changPosition.vue')),'ChangPosition');
const ChangeMobileNum= res=> require.ensure([], ()=>res(require('./changeMobileNum.vue')),'ChangeMobileNum');
const ContactUs= res=> require.ensure([], ()=>res(require('./contactUs.vue')),'ContactUs');
const Feedback= res=> require.ensure([], ()=>res(require('./feedback.vue')),'Feedback');
const FeedbackName= res=> require.ensure([], ()=>res(require('./feedbackName.vue')),'FeedbackName');
const FeedbackPhone= res=> require.ensure([], ()=>res(require('./feedbackPhone.vue')),'FeedbackPhone');

export default [
    {
        path : '/userCenter',
        component:{
        render(){
            return (
            <div>
                <router-view></router-view>
            </div>
            )
        }
        },
        redirect:'/userCenter/mine',
        children:[
            //我的
            {
                path:'mine',
                component:Mine,
                name:'mine'
            },
            //反馈
            {
                path:'feedback/feedbackName',
                component:FeedbackName,
                name:'feedbackName',
            },
            {
                path:'feedback/feedbackPhone',
                component:FeedbackPhone,
                name:'feedbackPhone',
            },
             {
                path:'feedback',
                component:Feedback,
                name:'feedback',
            },
            //联系我们
            {
                path:'contactUs',
                component:ContactUs,
                name:'contactUs'
            },
            // 实名认证
            {
                path:'certification',
                component:Certification,
                name:'certification'
            },
             // 实名认证修改真实姓名
             {
                path:'certificationRealName',
                component:CertificationRealName,
                name:'certificationRealName'
            },
            // 个人信息
            {
                path:'personalInformation',
                component:PersonalInformation,
                name:'personalInformation'
            },
             // 修改账号(不可修改)
             {
                path:'changeUsername',
                component:ChangeUsername,
                name:'changeUsername'
            },
            // 修改昵称
            {
                path:'changeNickname',
                component:ChangeNickname,
                name:'changeNickname'
            },
            // 修改真实姓名
            {
                path:'changeRealName',
                component:ChangeRealName,
                name:'changeRealName'
            },
             // 修改Email/
             {
                path:'changeEmail',
                component:ChangeEmail,
                name:'changeEmail'
            },
            // 修改手机号
            {
                path:'changeMobileNum',
                component:ChangeMobileNum,
                name:'changeMobileNum'
            },
             // 修改公司名称
             {
                path:'changeCorporateName',
                component:ChangeCorporateName,
                name:'changeCorporateName'
            },
             // 修改行业
             {
                path:'changeIndustry',
                component:ChangeIndustry,
                name:'changeIndustrye'
            },
             // 修改职务
             {
                path:'changPosition',
                component:ChangPosition,
                name:'changPosition'
            },
            // 修改公司地址
            {
                path:'changeCompanyAddress',
                component:ChangeCompanyAddress,
                name:'changeCompanyAddress'
            },
            // 修改身份证号
            {
                path:'changeCard',
                component:ChangeCard,
                name:'changeCard'
            },
             // 民族品牌
            //  {
            //     path:'nationalBrand',
            //     component:NationalBrand,
            //     name:'nationalBrand'
            // },
        ]
    }
]