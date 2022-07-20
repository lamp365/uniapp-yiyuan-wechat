class Config{
  constructor(){}
}

Config.shopToken = 'M2gO0O0OO0O0O|2';  
Config.debug = true;
Config.restUrl = Config.debug ? 'http://yyshop-dev.com/api/v1/' : "http://yy.coderyun.cn/api/v1/";
Config.wapUrl = 'http://yy-wap.coderyun.cn';
   
export default Config; 