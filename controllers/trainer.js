var promise = require('promise');
export class Trainer {
constructor(){

}

    /* adding trainer detils,course*/
    inserttrainer(req, res,pool) {
          
              var trainername=req.body.trainername;
              var email=req.body.email;
              var phonenumber=req.body.phonenumber;
              var doj=req.body.doj;
              var trainercoursedata=req.body.trainercoursedata;
              var trainerdata={
                trainername:trainername,
                email:email,
                phonenumber:phonenumber,
                dateofjoining:doj
               }
               var trainer_course=[];
              pool.getConnection((error,connection)=>{

                return new promise((resolve,reject)=>{
                  if(connection){
                    connection.query('insert into trainerdetails set ?',trainerdata,(error,addresult)=>{
                          if(addresult){
                                resolve(addresult.insertId);                            
                          }else{
                               res.status(400).send({
                               message:error 
                                 })
                          }
                    })

                  }else{
                    res.status(400).send({
                               message:error
                            })
                  }

                }).then((insertid)=>{
                  for(var item of trainercoursedata){
                     
                          trainer_course.push([insertid,item.cid,item.timings]);
                  }
                  console.log(trainer_course)
                   connection.query('insert into trainercourse (tid,cid,timings) values ?',[trainer_course],(error,tresult)=>{
                              if(tresult){
                                    res.status(200).send({
                                    message :  "trainer added successfully",
                                    data:tresult
                                    })
                              }else{
                                    res.status(400).send({
                                     message:error
                                 })
                              }
                   })
                     

                })
                 
              })

    }  
    /* adding trainer detils close*/
    
    /* get trainers by courseid */
    getTrainerByCourse(req,res,pool){
        let cid=req.params.cid;
        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query('select * from trainercourse tc inner join trainerdetails td on tc.tid=td.tid where tc.cid=?',cid,(error,gettrainers)=>{
                    if(gettrainers){
                        res.status(200).send({
                            message :  "trainer data fetched successfully",
                            data:gettrainers
                           })
                    
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
        
        
    })
                             
    }
    /* get trainers by courseid close*/

    /* get trainers by tid*/
    getTrainersById(req,res,pool){
            let tid=req.params.tid;
            pool.getConnection((error,connection)=>{
                if(connection){

                  connection.query('select * from trainerdetails where tid=?',tid,(error,tidresults)=>{
                          if(tidresults){
                            res.status(200).send({
                            message :  "trainer data fetched successfully",
                            data:tidresults
                           })
                          }else{
                              res.status(400).send({
                              message:error
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
    /* get trainers by tid close*/

    /*get all trainers and trainer courses*/
      getalltrainers(req,res,pool){
        pool.getConnection((error,connection)=>{
                if(connection){
                  connection.query(' select * from trainerdetails inner join trainercourse on trainerdetails.tid=trainercourse.tid inner join course on trainercourse.cid=course.cid',(error,alltrainers)=>{
                          if(alltrainers){
                            res.status(200).send({
                            message :  "all trainers data fetched successfully",
                            data: alltrainers
                           })
                          }else{
                              res.status(400).send({
                              message:error
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
    /*get all trainers close*/

    /*delete a trainerby tid*/
    deltrainerbyid(req,res,pool){
      let tid=req.params.tid;
        pool.getConnection((error,connection)=>{
                if(connection){
                  connection.query('delete trainerdetails,trainercourse,trainerattendance from trainerdetails inner join trainercourse inner join trainerattendance where trainerdetails.tid=trainercourse.tid and trainerdetails.tid=?',tid,(error,deltrainers)=>{
                          if(deltrainers){
                            res.status(200).send({
                            message :  "trainer deleted successfully",
                            data: deltrainers
                           })
                          }else{
                              res.status(400).send({
                              message:error
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
    /* delete a trainerby tid close*/
    /*update trainer */
       updatetrainer(req,res,pool){
             let tid=req.body.tid;
             let trainername=req.body.trainername;
             let email=req.body.email;
             let phonenumber=req.body.phonenumber;
             let doj=req.body.doj;
             let trainercoursedata=req.body.trainercoursedata;
             let tusername=req.body.tusername;
             let tpassword=req.body.tpassword;
         var uptrainerdata={
               trainername:trainername,
               email:email,
               phonenumber:phonenumber,
               dateofjoining:doj,
               tusername:tusername,
               tpassword:tpassword
         }
         pool.getConnection((error,connection)=>{
           return new promise((resolve,reject)=>{
             if(connection){
               connection.query('update trainerdetails set ? WHERE tid=?',[uptrainerdata,tid],(error,trainerres)=>{
                       if(trainerres){
                               for(var item of trainercoursedata){
                                     connection.query('update trainercourse set cid=?,timings=? WHERE tcid=? ',[item.cid,item.timings,item.tcid],(error,update_result)=>{
                                          if(update_result){
                                             res.status(200).send({
                                                 message :  "trainer updated successfully",
                                                 data:update_result
                                                   })

                                          }else{
                                            res.status(400).send({
                                              "message" : error
                                                 })
                                          }
                                     })
                               }
                               

                       }else{
                         res.status(400).send({
                           message:error
                            })
                       }
               })

             }else{
               res.status(400).send({
                       message:error
                   })
             }
           })
         })


       }
    /* upadte trainer */
}