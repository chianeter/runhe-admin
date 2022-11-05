import router  from '@/router';
import cookie from 'js-cookie'
import store from '@/store/index'
import { Message } from "element-ui";

//路由的保安系统f
router.beforeEach(async(to, from ,next) =>{
        //如果用户没有绑定邮箱 就一直提醒
        if(!store.state.user.email == ''){
            Message({
                type:'warning',
                message:"请先绑定邮箱，否则我一直恶心你"
            })
        }





    let token = store.state.token;
    if(!token){
        //用户刷新 VueX中没有token了 将cookie中的token再次存放到VueX中
        token = cookie.get('rh_id');
        if(!token) {
            //cookie里面没有，代表你就没有登录
            if(to.path == "/login") {
                return next()
            }else{
                return next('/login')
            }
            
        }
        store.commit('saveToken', token);
    }

    // 如果VueX中 没有个人信息，再去获取个人信息
   let userProfilre;
   if(store.state.user.username) {
        userProfilre = store.state.user;
   }else{
    //去获取个人信息

        userProfilre = await store.dispatch('getUserProfile');

   }
   if(!store.state.user.email == ''){
    Message({
        type:'warning',
        message:"请先绑定邮箱，否则我一直恶心你"
    })
}
    
   
   
    //检查有没有token 再去检查有没有个人信息 没有登录
    if(!userProfilre) {
        if(to.path == '/login') {
            next();
        }else {
            cookie.remove('rh_id')
            next('/login')
        }
    }else{
        //登录过的人 又翻墙过来到登陆页面 怎么办 哪来回哪去
        if(to.path == '/login'){
            next(from);
        }else{
            next()
        }
    }




    // //如果用户直接登录页面 那我直接放你走
    // if(to.path == '/login' ){
    //         next();
    // }else{
    // //小伙子看看有没有vip卡 如果有 检查卡是不是假的 如果都好着 放你走
    // //如果过程种有一项有问题 直接送她去login路由
    //     const token = cookie.get('rh_id');
    //     if(!token) {
    //         next("/login")
    //     }else {
    //         next()
    //     }
    //     //有会员卡 去跟后端验证一下 看是不是假的
    //     //如何验证 用你的token去获取一下个人信息 能拿到信息就是好的卡
    //     // if(){

    //     // }

       
    // }
    
})
export default router