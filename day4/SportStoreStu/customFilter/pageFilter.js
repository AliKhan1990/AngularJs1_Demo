/**
 * Created by hxsd on 2016/7/28.
 */
//过滤模块


    //----------商品过滤器------------------------------------------
var myFilter = angular.module("customFilter",[]);//给此模块命名为“customFilter”
myFilter.filter("range",function(){
    return function(products,currentPage,pageSize){//product为过滤后的商品   currentPage为当前页面  pageSize为页面容量
        if(angular.isArray(products) && angular.isNumber(currentPage) && angular.isNumber(pageSize) ){
            //商品显示起始坐标
            var startIndex = (currentPage - 1) * pageSize;//得到起始坐标，即每页的第1个商品坐标
            //商品坐标大于商品数量时返回：空
            if(startIndex >= products.length){
                return [];
                //否则返回两个参数
            }else{
                //从数组返回从startIndex下标的pageSize容量的元素
                return products.splice(startIndex,pageSize);
            }
        }else{
            //返回整个数组，貌似用于首页显示全部商品
            return products;
        }

    }
});

//--------------分页按钮的构建，此过滤器为的是看有多少分页，构建内容以1开始的数组，然后通过ng-repeat方式来遍历数组，构建按钮

myFilter.filter("pageCount",function(){
    return function(products,pageSize){//product为传入商品
        if(angular.isArray(products) && angular.isNumber(pageSize)){
            var navArr = [];

            var navCont = Math.ceil(products.length / pageSize);//navCont为构建页数

            for(var index=0;index<navCont;index++){
                navArr.push(index+1);//组建navArr数组[1,2,3,4]..
            }
            if(navArr.length<=1){//此部分为判断数组长度为零时跳出循环，即不构建按钮（只有一页的情况下无意义）
                return;
            }else{
                return navArr;
            }

         }
    }
});
