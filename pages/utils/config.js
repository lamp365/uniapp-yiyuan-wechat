class Config{
  constructor(){}
}

Config.shopToken = 'M2nxrZXZpbmtldmlu|505';  
Config.debug = false;
Config.restUrl = Config.debug ? 'http://yyshop-dev.com/api/v1/' : "http://yy.coderyun.cn/api/v1/";
Config.wapUrl = 'http://yy-wap.coderyun.cn';
   
export default Config; 