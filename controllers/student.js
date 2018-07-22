var promise = require('promise');
export class Student{
	constructor(){
// default constructor
      }

    /* INSERT student */
    
    
    insertStudent(req, res,pool) {
        
      var data ={}; var student_course=[];
      data.firstname=req.body.firstname;
      data.lastname=req.body.lastname;
      data.email=req.body.email;
      data.phonenumber=req.body.phonenumber;
      data.dateofjoining=req.body.dateofjoining;
      data.susername=req.body.susername;
      data.spassword=req.body.spassword;
      data.studentcourse = req.body.studentcoursedata;
        
        
       // console.log(data.studentcourse);
        
    var studentdata={
      	firstname:data.firstname,
      	lastname:data.lastname,
      	email:data.email,
      	phonenumber:data.phonenumber,
      	dateofjoining:data.dateofjoining,
        susername:data.susername,
        spassword:data.spassword
      }
     
      // db calls
      
      pool.getConnection((error,connection)=>{
      	  return new promise((resolve,reject)=>{
               if(connection){
                   connection.query('insert into studentdetails set ?',studentdata,(error,student_result)=>{
                        if(student_result){
                              resolve(student_result.insertId);
                         }else{
                            res.status(400).send(
                                {message : error}
                            );
                          }
                  })
        }else{
          res.status(400).send({
              message:error
          })
        }
         }).then((insertid)=>{
          
             for(var item of data.studentcourse){      
                      student_course.push([insertid,item.cid,item.tid,item.timings,item.startdate,item.enddate]);
      
                    }
             
         console.log(student_course);
             
           connection.query('insert into studentcourse (sid,cid,tid,timings,startdate,enddate) VALUES ?',[student_course],(error,studentcourse_result)=>{
                  if(studentcourse_result){
                           res.status(200).send({
                            message :  "student added successfully",
                            data:studentcourse_result
                           })
                   }else{
                           res.status(503).send({message : error});   
                         }
           })

         })


      })

      
      // db calls
     }
    
    
 /* INSERT student */

    
    /* GET students data */
    
    
    getStudents(req,res,pool){
        
        pool.getConnection((error,connection)=>{
            
            if(connection){
                connection.query('select * from studentdetails sd INNER JOIN studentcourse sc ON sd.sid = sc.sid LEFT JOIN trainerdetails td ON sc.tid=td.tid LEFT JOIN course c ON sc.cid=c.cid',(error,getresult)=>{
                    if(getresult){
                    var results=[];
                    var studentcoursedata=["scid","cid","tid","timings","startdate","enddate","trainername","coursename"];
                    var remaining=["sid","firstname","lastname","email","phonenumber","dateofjoining","susername","spassword"];
                        
                        for (var result of getresult){
                            
                            
                            var hasElement =false
                            var i=0;
                            for (var rs of results){
                                //console.log(rs["sid"])
                                i++
                                if (rs["sid"]==result["sid"]){
                                    
                                    console.log(rs["sid"] +"  "+result["sid"])
                                           var coursed={};
                                     var arr=[]; 
                                    for (var r of Object.keys(result)){
                                       
                                        
                                        if(studentcoursedata.indexOf(r)>-1){
                                          //  console.log("Reading keys ........"+rs["studentcoursedetails"][r]);
                                     coursed[r]=result[r];

                                        }
                                       // arr.push(result[r])
                                       /* if(rs[r]!=result[r]){
                                            
                                            if(Array.isArray(rs[r])){
                                                
                                                console.log("in if");
                                                rs[r].push(result[r])
                                            }else{
                                                console.log("in else");
                                            var ar=[]
                                      ar.push(rs[r])
                                      ar.push(result[r])
                                      console.log(ar);
                                      results[i][r]=ar
                                            }
                                        }*/
                                    }
                                                                          //arr.push(coursed)

                                    results[i-1]["studentcoursedata"].push(coursed)
                                      hasElement=true;
                                    break;
                                      
                                }
                                    
                            }
                            if(!hasElement){
                                var dict={}
                                    var coursed={};
                                var coursedetails=[];
                              for (var r of Object.keys(result)){
                                  
                                  if (remaining.indexOf(r)>-1){
                                      dict[r]=result[r]
                                  }
                                  else if(studentcoursedata.indexOf(r)>-1){
                                     coursed[r]=result[r]
                                  }
;
                                  
                                  }
                                                                      coursedetails.push(coursed);
                                
                    dict["studentcoursedata"]=coursedetails;
                                  results.push(dict);


                                

                               console.log(results)
                                
                            }
                        
                            console.log(i+"  incremented")
                           //console.log(results)
                            
                            /*
                            
                              for (var r of Object.keys(result)){
                                  if(results[r]){
                                      if(results[r][0]!=result[r]){
                                          console.log(results[r][0]+"  "+result[r])
                                      var ar=[]
                                      ar.push(results[r])
                                      ar.push(result[r])
                                      results[r]=ar
                                      //console.log(results[r])
                                      }
                                  }
                                  else{
                                      
                                      var ar={}
                                      results[r]=ar{}
                                  }
                              }*/
                        }
                        console.log(results)
                        res.status(200).send({
                            message:"data fetched",
                            data: results
                        })
                     
                  }else{
                      
                      res.status(400).send({
                          message: "Failed in getting data ",
                          data: error
                      })
                     
                     }
                })
                
            }else{
                res.status(400).send({
                            message:error
                   })
                }
         
        })
        
        
        
    }
    
       /* GET students data */
    
    
    /* GET students by ID */
    
    
    getStudentById(req,res,pool){
        let sid = req.params.sid;
        console.log(sid);
        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query("SELECT * from studentcourse sc INNER JOIN studentdetails sd ON sd.sid = sc.sid LEFT JOIN trainerdetails td ON sc.tid=td.tid  LEFT JOIN course c ON sc.cid=c.cid WHERE sd.sid=? ",sid,(err,result_id)=>{
                    if(result_id){
                        console.log(result_id);
                        res.status(200).send({
                            message: "Record found ",
                            data: result_id
                        })
                    }else if(err){
                        res.status(400).send({
                            message: "Query error",
                            data: err
                        })
                    }
                    
                })
            }
        })
        
        
    }
    
      /* GET students by ID */

    
    
    /* UPDATE students data */
    
    
    updateStudent(req,res,pool){
        var data={}; var student_course=[];
        data.sid = req.body.sid;
        data.firstname= req.body.firstname;
        data.lastname = req.body.lastname;
        data.email = req.body.email;
        data.phonenumber = req.body.phonenumber;
        data.dateofjoining = req.body.dateofjoining;
        data.susername =  req.body.susername;
        data.spassword = req.body.spassword;
        data.studentcourse = req.body.studentcoursedata;
        
        console.log(data.studentcourse);
        
        
               var studentdata={
                            firstname:data.firstname,
                            lastname:data.lastname,
                            email:data.email,
                            phonenumber:data.phonenumber,
                            dateofjoining:data.dateofjoining,
                            susername:data.susername,
                            spassword:data.spassword
                       }
      
      // db calls
      
    /*  for(var item of data.studentcourse){
          student_course.push([item.scid,item.cid,item.tid,item.timings,item.startdate,item.enddate]);
      }    */
      
      pool.getConnection((error,connection) => {
            return new promise((resolve,reject)=>{
            if(connection){
                connection.query('update studentdetails set ? WHERE sid=?',[studentdata,data.sid],(error,student_details)=>{
                    if(student_details){
                        
                       for(var item of data.studentcourse){
                       
                        connection.query('update studentcourse set cid=?,tid=?,timings=?,startdate=?,enddate=? WHERE scid=? ',[item.cid,item.tid,item.timings,item.startdate,item.enddate,item.scid],(error,update_result)=>{
                            if(update_result){
                               console.log("updated ");
                                
                            }else{
                                res.status(400).send({
                                    "message" : error
                                })
                            }
                        } )
                        
                        
                    }// end of for 
                        res.status(200).send({
                                    "message" : "Updated successfully",
                                    "data" : data
                                })
                    }
                    else{
                        console.log(error);
                    }
                    
                })
                
                
            }else{
                
                res.status(400).send({
                    message: error
                })
            }
          
      })
     })        
        
     // db calls   
        
    }
    

     /* UPDATE students data */
    
    
   /*DELETE a student*/
    
    deleteStudent(req,res,pool){
        let sid=req.body.sid;
        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query('delete studentdetails,studentcourse,studentattendance from studentdetails inner join studentcourse inner join studentattendance where studentdetails.sid=studentcourse.sid and studentattendance.sid=?',[sid],(error,dresult)=>{
                    if(dresult){
                        
                        res.status(200).send({
                            message: "student deleted",
                            data: dresult})
                       }else{
                            res.status(400).send({
                                   message: error
                                  })
                          }
                 })
            }else{
                res.status(400).send({
                    message: error
                })
            }
        })
    } 
    
   /*DELETE a student*/
    
    
    

    
    
}

