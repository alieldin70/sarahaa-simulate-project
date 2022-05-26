 const multer=require('multer');
 const path=require('path');
 const {nanoid}=require('nanoid');
 const fs=require('fs');
 const validtypes={
     image:['image/jpg','image/png','image/jpeg']
 };
 function Mymulter(custompath,typevalid){
    const fullpath=path.join(__dirname,`../uploads/${custompath}`);
    if(!fs.existsSync(fullpath)){
fs.mkdirSync(fullpath,{recursive:true});
     }
    const storage =  multer.diskStorage({
        destination: function (req,file,cb){
            req.filedistenation=`uploads${custompath}`;
            cb(null,fullpath)
         },
         filename:function(req,file,cb){
const fullfilename=nanoid()+'_'+file.originalname;
cb(null,fullfilename);
         }
     })
     const fileFilter= function(req,file,cb){
         if(typevalid.includes(file.mimetype)){
             cb(null,true);
         }
         else
         {
            req.filevalidation=true;
             cb(null,false);
         }
     };
const uploads=multer({dest:fullpath,fileFilter,storage});
return uploads
 }
 module.exports={Mymulter,validtypes};