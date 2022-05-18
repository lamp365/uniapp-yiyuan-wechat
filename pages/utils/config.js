class Config{
  constructor(){}
}

Config.shopToken = 'MDAwMDAwMDAwMLCFoJ4|1';  
Config.debug = true;
Config.restUrl = Config.debug ? 'http://dianfei-dev.com/api/v1/' : "http://bianlidian-dev.com/api/v1/";
Config.wapUrl = 'http://dianfei.qzyzt.com';
   
export default Config; 