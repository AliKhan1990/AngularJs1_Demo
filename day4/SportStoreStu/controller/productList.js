/**
 * Created by hxsd on 2016/7/28.
 */
angular.module("buyCart")
    .constant("activeClass","btn-info active")
    .controller("productListController",function($scope,activeClass,shopCart){

    $scope.selectedCategory = null;
//----------------------左导航点击事件（商品列表点击）
    $scope.selectedClickCategory = function(category){
        $scope.selectedCategory = category;
        $scope.currentPage = 1;
    };
//---------------------商品列表view
    $scope.showByCategory = function(product){
        return $scope.selectedCategory == null || $scope.selectedCategory == product.category;
    };
//----------------------选择后样式
    $scope.getActiveClass = function(category){
        return category == $scope.selectedCategory ? activeClass : "";
    };
//初始化两个参数 当前页 与 页面容量：方便修改
    $scope.currentPage = 1;
    $scope.pageSize = 3;

    //分页选择
    $scope.selectPage = function(pageNum){
        $scope.currentPage = pageNum;
    };

    //高亮操作
    $scope.getActivePageClass = function (pageBtn) {
        return pageBtn == $scope.currentPage ? activeClass:"";
    };

    $scope.addToCart = function(product){
        shopCart.add(product);
    }
});