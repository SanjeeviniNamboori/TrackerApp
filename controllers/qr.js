 var QRCode = require('qrcode');
var shortid = require('shortid');

export class Qr{
   constructor(){
       
  }
   
  /* GENERATE QR CODE */
   
  generateQrCode(req,res,pool){
let secret_key = "po08!^uj*7";      
let timestamp = new Date();
let uniqueid = shortid.generate();      

var qr_data = {
    secret_key : secret_key,
    uniqueid : uniqueid,
    timestamp :timestamp
}  

var qrData = JSON.stringify(qr_data);
console.log(qrData);
      
      var options = {
  root:__dirname+'/qrcodeimages',
  dotfiles: 'deny',
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  } }
       
     
     
      QRCode.toFile('./controllers/qrcodeimages/qrimage.jpg',qrData , (err,string)=> {
       if (err) {
           res.status(400).send({
                              message:err
                           })  
       }else{
             res.sendFile('qrimage.jpg',options,(err)=>{
                 if(err) console.log(err);
             });
           }
         
       })

  }
   
  /* GENEREATE QR CODE */
    
/* VALIDATE QR CODE  */
    
    validateQrCode(req,res,pool){
        
        
        
        
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
/* VALIDATE QR CODE  */
    
}