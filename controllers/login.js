//import * as jwt from {jsonwebtoken};
//var jwt = require("jsonwebtoken");
let crypto = require('crypto');

export class Login {

    
constructor(){
//this.authentication_token=authentication_token;
}

/*  ADMIN LOGIN */
    adminLogin(req, res,pool) {
        
    var authentication_token = require('rand-token').generator({
  chars: 'A-Z',
  source: crypto.randomBytes 
});
           let name=req.body.userName;
           let password=req.body.password;
           pool.getConnection((error,connection)=>{
            if(connection){
               connection.query('select * from admin where adminname=? and password=?',[name,password],(error,result)=>{
                if(result){
                    
                if(result.length!=0){
                   
                    
                    console.log(authentication_token);
                    connection.query('select * from admin_auth WHERE authid=? ',[result[0].adminid],(error,result_set)=>{
                        if(result_set){
                           connection.query('update admin_auth set authentication_token=? WHERE authid=?',[authentication_token,result[0].sid],(err,res_set)=>{
                               if(res_set){
                                   console.log("Authentication token updated successfully");
                                     res.status(200).send({
                                            message : "User data fetched successfully",
                                            data:{"sid": result[0].sid,"authenticationtoken": this.authentication_token}
                                                })    
                                   
                               }else{
                                   console.log(err);
                               }
                           }) 
                        }else{
                           
                            connection.query('insert into admin_auth set authid=? and authentication_token=?',[result[0].sid,this.authentication_token],(err,res_set)=>{
                                
                                if(res_set){
                                    console.log("authentication token inserted successfully");
                                    res.status(200).send({
                                            message : "User data fetched successfully",
                                            data:{"sid": result[0].sid,"authenticationtoken": this.authentication_token}
                                                })    
                                }else{
                                    console.log(err);
                                }
                                
                            })
                            
                            
                        }
                    })
                    
                    
        
                }else{
                    
                    

                }
            }else{
               res.send({
                        statuscode: 400,
                        message : "error"
                     }) 
            }

               })
            }else{
                console.log("connection error"+error);
            }
           })
    }  
    
/*  ADMIN LOGIN */

    
/* STUDENT LOGIN */   
    
    studentLogin(req,res,pool){
        let username = req.body.userName;
        let password = req.body.password;
        pool.getConnection((err,connection)=>{
            if(connection){
                connection.query("select *  from studentdetails WHERE susername=?  and spassword=? ",[username,password],(error,result)=>{
                    if(result.length==0){
                        res.status(200).send({
                            message: "No user found"
                        })
                    }else if(result.length>0){
                      //  console.log(result[0].sid);
                        connection.query("select coursename from studentcourse INNER JOIN course ON studentcourse.cid=course.cid and studentcourse.sid=? ",[result[0].sid],(err,result_set)=>{
                            if(result_set){
                                res.status(200).send({
                                    message: "User found",
                                    data: result_set
                                })
                            }
                        })
                    }else{
                        res.status(400).send({
                            data:error
                        })
                    }
                })
            }
        })
    }
    
    
    
    
    
/* STUDENT LOGIN */    
    
/* TRAINER LOGIN */   
    
    //password
    
    
    
    
    
/* TRAINER LOGIN */    
        

}
