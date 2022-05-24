import Config from "@/pages/utils/config.js"
export function addCart(item, counts){
  var cartData = getCartDataFromLocal(); //cartData是数组，item是对象
  
  var isHasInfo = _isHasThatOne(item.id, cartData);

  if (isHasInfo.index == -1) {
	// 缓存没有就直接加入
	 item.counts = counts;
	cartData.push(item);
  } else {
	var  old_item = isHasInfo.data;
	if(old_item.spec_name == item.spec_name){
		item.counts = counts+old_item.counts;
	}else{
		item.counts = counts;
	}
	cartData[isHasInfo.index] = item;
  }

  uni.setStorageSync('local_cart_key', cartData);
}

export function getCartDataFromLocal(flag) {
	var res = uni.getStorageSync('local_cart_key');
	if (!res) {
	  res = [];
	}

	//在下单时过滤掉不下单的商品
	if (flag) {
	  var newRes = [];
	  for (let i = 0; i < res.length; i++) {
		if (res[i].selectStatus) {
		  newRes.push(res[i]);
		}
	  }
	  res = newRes;
	}
	return res;
}
/*
*判断某个商品是否已经添加到购物车，并且返回这个商品的数据以及所在数据的序号
*/
export function _isHasThatOne(id, arr) {
    var item;
    var result = {
      index: -1
    };
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item.id == id) {
        result = {
          index: i,
          data: item
        };
        break; //遍历这个购物车数据，直到遍历到选中的购物车数据就break跳出for循环
      }
    }
    //不管是否是跳出循环都返回result
    return result;
}

/*
   *商品数目加一
   */
  export function addCounts(id) {
    _changeCounts(id, 1);
  }

  /*
   *商品数目减一
   */
  export function cutCounts(id) {
    _changeCounts(id, -1);
  }
  
 /*
*修改商品数目
*id- {int} 商品id
*counts - {int} 商品数量
*/
export function _changeCounts(id, counts) {
    var cartData = getCartDataFromLocal();
    var isHasInfo = _isHasThatOne(id, cartData);
    if (isHasInfo.index != -1) {
      if (isHasInfo.data.counts > 1) {
        cartData[isHasInfo.index].counts += counts;
      }
    }
    //更新本地缓存
    uni.setStorageSync('local_cart_key', cartData);
}

export function deleteCart(ids) {
    //ids不是一串数组
    if (!(ids instanceof Array)) {
      ids = [ids];
    }

    var cartData = getCartDataFromLocal();
    for (let i = 0; i < ids.length; i++) {
      var hasInfo = _isHasThatOne(ids[i], cartData);
      if (hasInfo.index != -1) {
        cartData.splice(hasInfo.index, 1); //删除数组某一项
      }
    }

    //更新本地缓存
    uni.setStorageSync('local_cart_key', cartData);
}