/**
 * New node file
 */
var ejs= require('ejs');
var mysql = require('mysql');
var mainConnectionPool;
var Cpool=[];
var poolflag=[];
var size;
var poolDetails;

mainConnectionPool={
		Cpool : Cpool,
		obtainConnectionFromPool : obtainConnectionFromPool,
		returnObtainedConnectionForPool : returnObtainedConnectionForPool
};
//return connection to Pool...
var returnObtainedConnectionForPool= function(index)
{
	 poolflag[index]=0;
//Adding the connection from the client back to the connection pool
	 
};


var obtainConnectionFromPool= function(callback)
{
var connection;
var connectionFound=0;
var index;
var err="ERROR";
//Check if there is a connection available. There are times when all the connections in the pool may be used up
for(var i=0;i<size;i++){
		if(poolflag[i]==0){
			index=i;
			connection=Cpool[i];
			connectionFound=1;
			poolflag[i]=1;
			console.log("connection found");
			break;
			}
		}
if(connectionFound==0)
	 {
	 console.log("Connection not found");
	 }
//Giving away the connection from the connection pool
callback(index,connection);
};

mainConnectionPool={
		Cpool : Cpool,
		obtainConnectionFromPool : obtainConnectionFromPool,
		returnObtainedConnectionForPool : returnObtainedConnectionForPool
};

function createMyPool(details){

	poolDetails={
			  host     : details.host,
			  user     : details.user,
			  password : details.password,
			  database	: details.database
			}
	;
	size=details.connectionLimit;
	Cpool.length = size;
	poolflag.length = size;
	for(var i=0;i<size;i++){
		poolflag[i] = 0;
		}
	createMyConnectionPool(size);
	return mainConnectionPool;
}


function createMyConnectionPool(size){
	for(var i=0;i<size;i++){
		Cpool[i] = mysql.createConnection(poolDetails);
	}
}


exports.createMyPool=createMyPool;