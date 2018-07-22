import  {Student}   from "./controllers/student.js";
import {Trainer} from "./controllers/trainer.js";

export class route {
    constructor(pool,router) {
        this.router = router;
        this.getroutes(pool,this.router);
        this.student = new Student();
        this.gettrainers=new Trainer();
        
    }
    getroutes(pool,router) {
        
/*STUDENT ROUTES */
        
router.get('/getstudents',(req,res)=>{this.student.getStudents(req,res,pool);})
   
        
/*STUDENT ROUTES */
        
        

/* COURSES ROUTES */


router.post('/viewcourses',(req,res)=>{this.course.viewCourses(req,res,pool);})
   

/* COURSES ROUTES */
          router.get('/gettrainersbycourse/:cid', (req, res) => {
           this.gettrainers.getTrainerByCourse(req,res,pool);
        })
        
    
       
        
        
        router.get('/getstudentsbyid/:sid',(req,res)=>{
            this.addstudent.getStudentById(req,res,pool);
            
        })
        router.get('/test',(req,res)=>{
            
            res.status(200).send({
                            message: "holaaaa!! test successfull!"
                        })
            
        })
        /* trainer routes */
        router.get('/gettrainersbycourse/:cid', (req, res) => {
           this.gettrainers.getTrainerByCourse(req,res,pool);
        })

        router.get('/gettrainersbyid/:tid',(req,res)=>{
            this.gettrainers.getTrainersById(req,res,pool);
        })
        router.get('/getalltrainers',(req,res)=>{
            this.gettrainers.getalltrainers(req,res,pool);
        })

        router.get('/deletetrainer/:tid',(req,res)=>{
            this.gettrainers.deltrainerbyid(req,res,pool);
        })
        
        /* trainer routes */
        
        
    }


}
