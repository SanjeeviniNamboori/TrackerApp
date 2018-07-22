'use strict';


var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.should();
chai.use(chaiHttp);

function returnsName(name){
                      return name;
                      }



describe('courses',function(){
    
    it('should insert a course', function(){
        
//        var Obj = {
//            "coursename" : "bigdata"
//        }
        
        chai.request('http://localhost:3000').post('/addcourses').send({coursename: "bigdata"}).end((err,res)=>{
            
            expect(res.statusCode).to.equal(200);
            expect(res.data).to.be.an('object');
            done();
            
        })
        
    
        
    })
     
         })