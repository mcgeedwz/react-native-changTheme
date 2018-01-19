/**
 * api list
 * 
 * @author andy 2017.11.2
 * 
 */
const hhzapi = {
    //====================================================================//
    //=========================== home:首页接口 ===========================//
    //  
    //=========================== home:首页接口 ===========================//
    /** 获取首页轮薄图接口
     * @params 
     *  method : 调用方法
     *  req_source : 请求来源
     */
    mapi_home_slideshow(obj){
        return {
            "method"            :    'mapi.home.slideshow',
            "req_source"        :    'app'
        }
    },


     /** 宝贝说首页
     * @params 
     *  method : 调用方法
     *  req_source : 请求来源
     */
    mapi_home_babysayIndex(obj){
        return {
            "method"            :    'mapi.home.babysayIndex',
            "member_id"         :     this.isNull(obj.member_id) ? '' : obj.member_id,
            "req_source"        :    'app'
        }
    },

    /** 宝贝说列表页
     * @params 
     *  method : 调用方法
     *  req_source : 请求来源
     */
    mapi_home_babysayList(obj){
        return {
            "method"            :    'mapi.home.babysayList',
            "member_id"         :     this.isNull(obj.member_id) ? '' : obj.member_id,
            "offset"            :     this.isNull(obj.offset) ? '' : obj.offset,     //  当前页
            "size"              :     this.isNull(obj.size) ? '' : obj.size,     //  当前页 
            "req_source"        :    'app'
        }
    },


    /** 首页场景单图配置数据
     * @params 
     *  method : 调用方法
     *  req_source : 请求来源
     */
    mapi_home_advertising(obj){
        return {
            "method"            :    'mapi.home.advertising',
            "req_source"        :    'app'
        }
    },
    //=====================================================================//
    //=========================== goods:商品接口 ===========================//
    /** 获取商品分类接口
     * @params 
     *  method : 调用方法
     *  req_type : 类型  m_home_header  m_category
     *  req_tiers : 深度,默认2级
     *  req_orderby : 排序
     *  req_source : 请求来源
     */
    mapi_product_getClassify(obj){
        return {
            "method"            :    'mapi.product.getClassify',
            "req_type"          :    this.isNull(obj.req_type) ? '' : obj.req_type,
            "req_tiers"         :    this.isNull(obj.req_tiers) ? '' : obj.req_tiers,
            "req_orderby"       :    this.isNull(obj.req_orderby) ? '' : obj.req_orderby,
            "req_source"        :    'app'
        }
    },
    /**
     * @desc 获取特定分类下的商品列表
     * @params
     *  |req_type |是  |string |类型,有category(分类)，tag(标签)，search(搜索)  |
     *  |cat_id |是  |int |类型,商品分类id  |
     *  |cat_type |是  |int |类型,商品分类id  |
     *  |tag_id |是  |int |商品标签id |
     *  |brand_id |是  |int |品牌id |
     *  |search_key |是  |string |关键字搜索 |
     *  |current_page |否  |string |页码，默认为1   |
     *  |page_size |否  |string |每页数量,默认10   |
     *  |req_orderby |否  |string |排序方式，默认d_order desc |
     *  |req_source |否  |string |请求渠道:app;mb;wx;alipay   |
     *
     */
    mapi_product_getGallery(obj){
        return {
            "method"            :    'mapi.product.getGallery',
            "req_type"          :    this.isNull(obj.req_type) ? '' : obj.req_type,
            "cat_id"            :    this.isNull(obj.cat_id) ? '' : obj.cat_id,
            "cat_type"          :    this.isNull(obj.cat_type) ? '' : obj.cat_type,
            "tag_id"            :    this.isNull(obj.tag_id) ? '' : obj.tag_id,
            "brand_id"          :    this.isNull(obj.brand_id) ? '' : obj.brand_id,
            "search_key"        :    this.isNull(obj.search_key) ? '' : obj.search_key,
            "current_page"      :    this.isNull(obj.current_page) ? '' : obj.current_page,
            "page_size"         :    this.isNull(obj.page_size) ? '' : obj.page_size,
            "req_orderby"       :    this.isNull(obj.req_orderby) ? '' : obj.req_orderby,
            "req_source"        :    'app'
        }
    },
    /**
     * @desc 获取单个商品数据接口
     * @params
     *    
     *
     */
    mapi_product_getProduct(obj){
        return {
            "method"            :    'mapi.product.getProduct',
            "goods_id"          :    this.isNull(obj.goods_id) ? '' : obj.goods_id,
            "product_id"        :    this.isNull(obj.product_id) ? '' : obj.product_id,
            "member_id"         :    this.isNull(obj.member_id) ? '' : obj.member_id,
            "req_source"        :    'app'
        }
    },
    //=========================== goods:商品接口:end ===========================//
    
    //=====================================================================//
    //=========================== order:订单接口 ===========================//
    /**
     * @desc mapi.cart.add 加入购物车
     * @parmas 
     *  member_id,
     *  req_mode  : add增加； update直接修改
     *  req_source 
     *  
     */
    mapi_cart_add(obj){
        return {
            "method"            :    'mapi.cart.add',
            "member_id"         :    this.isNull(obj.member_id) ? '' : obj.member_id,
            "goods_id"          :    this.isNull(obj.goods_id) ? '' : obj.goods_id,
            "product_id"        :    this.isNull(obj.product_id) ? '' : obj.product_id,
            "quantity"          :    this.isNull(obj.quantity) ? '' : obj.quantity,
            "obj_type"          :    this.isNull(obj.obj_type) ? '' : obj.obj_type,
            "req_mode"          :    this.isNull(obj.req_mode) ? '' : obj.req_mode,
            "req_source"        :    'app'
        }
    },
    /**
     * @desc //mapi.cart.delete  清空购物车
     * @parmas 
     *  member_id
     *  req_source 
     *  
     */
    mapi_cart_delete(obj){
        return {
            "method"            :    'mapi.cart.delete',
            "member_id"         :    this.isNull(obj.member_id) ? '' : obj.member_id,
            "goods_id"          :    this.isNull(obj.goods_id) ? '' : obj.goods_id,
            "product_id"        :    this.isNull(obj.product_id) ? '' : obj.product_id,
            "obj_type"          :    this.isNull(obj.obj_type) ? '' : obj.obj_type,
            "req_source"        :    'app'
        }
    },

    /**
     * @desc 获取指定会员订单列表
     * @parmas 
     *  member_id,
     *  [order_classify,  //全部(all)；待付款(obligation)；待发货(wdeliver)；待收货(wreceive)；已完成(finish);  已取消(cancel)
     *  current_page,
     *  page_size,
     *  req_orderby,]
     *  req_source 
     *  
     *  @author andy 2017.2.10  15:07
     */
    mapi_order_olist(obj){
        return {
            "method"            :    'mapi.order.olist',
            "member_id"         :    this.isNull(obj.member_id) ? '' : obj.member_id,
            "order_classify"    :    this.isNull(obj.order_classify) ? '' : obj.order_classify,
            "current_page"      :    this.isNull(obj.current_page) ? '' : obj.current_page,
            "page_size"         :    this.isNull(obj.page_size) ? '' : obj.page_size,
            "req_orderby"       :    this.isNull(obj.req_orderby) ? '' : obj.req_orderby,
            "req_source"        :    'app'
        }
    },
    /**
     * @desc 获取指定会员单个订单数据
     * @parmas 
     *  order_id,
     *  req_source 
     *  
     *  @author andy 2017.2.10  15:07
     */
    mapi_order_detail(obj){
        return {
            "method"            :    'mapi.order.detail',
            "order_id"          :    this.isNull(obj.order_id) ? '' : obj.order_id,
            "req_source"        :    'app'
        }
    },
    //=========================== order:订单接口:end ===========================//

    //=====================================================================//
    //=========================== member:会员接口 ===========================//
    /**
     * @desc 微信登陆接口,点击购物车时，或者点击我的时，检查有无绑定，
     *                                                  绑定直接返回数据，
     *                                                  没绑定那么申请绑定 --->建议暂时采用原有直接绑定方法，方便了解之前的代码，以便改进
     * @extparams
     *  open_id   ------> 查有无绑定 ------> 没绑定直接绑定-->然后返回数据
     *  
     *  pam_type    :登陆类型  wx;gb;qq;sina; alipay
     *  login_name  :登陆名
     *  password    :登陆密码
     *  extparams   :登陆额外参数
     *  req_source  : 请求来源
     */
    mapi_member_pam_login(obj){
        return {
            "method"            :    'mapi.member.pam.login',
            "pam_type"          :    this.isNull(obj.pam_type) ? '' : obj.pam_type,
            "auth_code"         :    this.isNull(obj.auth_code) ? '' : obj.auth_code,
            "login_name"        :    this.isNull(obj.login_name) ? '' : obj.login_name,
            "password"          :    this.isNull(obj.password) ? '' : obj.password,
            "extparams"         :    this.isNull(obj.extparams) ? '' : obj.extparams,
            "req_source"        :    'app'
        }
    },
    /**
     * @desc 注册会员信息
     *
     * @params 
     */
    mapi_member_pam_regSignup(obj){
        return {
            "method"            :    'mapi.member.pam.regSignup',
            "pam_type"          :    this.isNull(obj.pam_type) ? '' : obj.pam_type,
            "username"          :    this.isNull(obj.username) ? '' : obj.username,
            "password"          :    this.isNull(obj.password) ? '' : obj.password,
            "phonecode"         :    this.isNull(obj.phonecode) ? '' : obj.phonecode,
            "extparams"         :    this.isNull(obj.extparams) ? '' : obj.extparams,
            "req_source"        :    'app'
        }
    },
    /**
     * @desc 注册会员信息
     * @params 
     *      mobile
     *      module : signup/forgetpwd
     * @author 陈忠良 
     */
    mapi_member_pam_sendVcode(obj){
        return {
            "method"            :    'mapi.member.pam.sendVcode',
            "mobile"            :    this.isNull(obj.mobile) ? '' : obj.mobile,
            "module"            :    this.isNull(obj.module) ? '' : obj.module,
            "req_source"        :    'app'
        }
    },

    /**
     * @desc 会员中心首页
     * @params 
     *     
     * @J 
     */
    mapi_member_memberInfo(obj){
        return {
            "method"            :    'mapi.member.memberInfo',
            "member_id"         :    this.isNull(obj.member_id) ? '' : obj.member_id,
            "req_source"        :    'app'
        }
    },

    /**
     * @desc 会员中心签到
     * @params 
     *     
     * @J 
     */
    mapi_member_signIn(obj){
        return {
            "method"            :    'mapi.member.signIn',
            "member_id"         :    this.isNull(obj.member_id) ? '' : obj.member_id,

            "req_source"        :    'app'
        }
    },
    //=========================== member:会员接口:end ===========================//
    isNull(data){
        return (data === null || typeof data === "undefined" || data === '') ? true : false;
    }
};
export default hhzapi;