/**
 * Created by hxsd on 2016/7/28.
 */
angular.module("buyCart")
    .constant("productsUrl","jsonBox/products.json")
    .constant("categoriesUrl","jsonBox/categories.json")
    .constant("orderUrl","jsonBox/orderStatus.json")
    .controller("buyCartCtrl",function($scope,$http,$location,shopCart,categoriesUrl,productsUrl,orderUrl){
        $scope.data = {};

        $http.get(categoriesUrl).success(function(jsonData){
            $scope.data.categries=jsonData;
        });
        $http.get(productsUrl).success(function(jsonData){
            $scope.data.products=jsonData;
        });

        $scope.data.shipping = [];//新建一个数组保存用户收货信息
        //发送订单的方法
        $scope.sendOrder = function(){
            //需要发送两部分内容，购物车中的信息，以及用户的收货信息
            var order = angular.copy($scope.data.shipping);
            order.products = shopCart.findAll();
            //发送服务器用保密性强的post方式
            $http.post(orderUrl,order)
                .success(function(data,status){
                    //保存服务器返回订单号
                    $scope.data.shipping.orderId = data.orderId;
                    //清空购物车
                    shopCart.clear();
                })
                .error(function(data,status){
                    //保存错误代码
                    $scope.data.shipping.errorStatus = status;
                })
                .finally(function(){
                    $location.path("complete");
                })

        }
});
