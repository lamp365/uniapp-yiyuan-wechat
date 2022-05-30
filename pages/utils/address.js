import Config from "@/pages/utils/config.js"
  //设置地址信息
export function setAddressInfo(res) {

    var province = res.provinceName || res.province,
      city = res.cityName || res.city,
      country = res.countyName || res.country,
      detail = res.detailInfo || res.detail;

    var totalDetail = city + country + detail;

    if (!isCenterCity(province)) {
      totalDetail = province + totalDetail;
    }

    return totalDetail;
}
	
	//判断是否为直辖市
export function  isCenterCity(name) {
		var centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
			flag = centerCitys.indexOf(name) >= 0;
		return flag;
}