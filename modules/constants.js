/**
 * 常量聚集JS类。
 * 此类中常量为全局变量。
 * 新加入常量时候一定要严禁，否则可能影响到其他人的业务逻辑。
 * Created by Mike on 2015/7/31.
 */
//0：开发环境  1:测试环境 2：生成环境  
var ENVIRONMENT =0;
var CDFG_IP = [
     {
    	 Header: 'http://',
    	 MAIN: '127.0.0.1',
    	 COLON: ':',
    	 PORT: '8082'
     },{
         Header: 'http://',
         MAIN: '10.205.138.135',
         COLON: ':',
         PORT: '8080'
     },{
		 Header: 'http://',
		 MAIN: '10.205.138.144',
		 COLON: ':',
		 PORT: '8080'
	 }
];

var LOGIN_URL="/UserManagementWeb/login.jsp"

var CUR_IP = CDFG_IP[ENVIRONMENT];
var	CDFG_SERVER = CUR_IP.Header + CUR_IP.MAIN + CUR_IP.COLON + CUR_IP.PORT;//数据服务器地址

/*UserManamegent*/
var USERMANAGEMENT_PATH = CDFG_SERVER + "/UserManagementApi";

