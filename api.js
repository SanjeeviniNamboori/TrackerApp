import {Login} from "./controllers/login.js";
import {Trainer} from "./controllers/trainer.js";
import {Student} from "./controllers/student.js";
import {Course} from "./controllers/course.js";
import {Qr} from "./controllers/qr.js";

export class api {
    
    
    constructor(pool,router) {
        this.router = router;
        this.routes(pool,this.router);
        this.student = new Student();
        this.login= new Login();
        this.trainer = new Trainer();
        this.course=new Course();
        this.qr = new Qr();
        
     
    }
    routes(pool,router) {
        
        /* TEST ROUTES */
//        
//        router.post('/login',(req,res)=>{
//            console.log(req.body.role+req.body.userName+req.body.password);
//            
//        })
        
router.get('/qr',(req,res)=>{
    this.qr.generateQrCode(req,res,pool);
})        
        
        
        /* TEST ROUTES */
/*LOGIN ROUTES */
  
router.post('/login',(req,res)=>{
    let role = req.body.role;
    if(role == "ADMIN"){
        this.login.adminLogin(req,res,pool);
    }else if(role == "STUDENT"){
        this.login.studentLogin(req,res,pool);
    }else if(role == "TRAINER"){
        this.login.trainerLogin(req,res,pool);
    }
})        
        
/* LOGIN ROUTES */        
        
/* STUDENT ROUTES */
        
router.post('/addstudent',(req,res)=>{this.student.insertStudent(req,res,pool);})
router.post('/updatestudent',(req,res)=>{this.student.updateStudent(req,res,pool);})
router.post('/deletestudent',(req,res)=>{this.student.deleteStudent(req,res,pool);})

/* STUDENT ROUTES */



/* TRAINER ROUTES */

router.post('/addtrainer', (req, res) => { 
         
           this.trainer.inserttrainer(req,res,pool);

        })
router.post('/updatetrainer',(req,res)=>{
           this.trainer.updatetrainer(req,res,pool);
       })
/* TRAINER ROUTES */






/* COURSES ROUTES */

router.post('/addcourses',(req,res)=>{this.course.addCourse(req,res,pool);})
router.post('/deletecourses',(req,res)=>{this.course.deleteCourses(req,res,pool);})
router.post('/updatecourses',(req,res)=>{this.course.updateCourse(req,res,pool);})    

/* COURSES ROUTES */

       
        router.post('/adminlogin', (req, res) => { 
            this.loginobj.loginadmin(req,res,pool);
        })

        router.post('/tslogin', (req, res) => {
            this.trainerlogin.login(req, res,pool);
        })

        
        
        
    }
}
