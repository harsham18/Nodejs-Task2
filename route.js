const express=require("express");

const router=express.Router();

const UserData=require('./data').User;

const addUserValidation=require("./validations/user.validation").addUserValidation;

const getUserReq=(req,res)=>{
    const  uuid=req.params.uuid;
    const data=UserData.find((UserData)=>uuid==UserData.id);
    console.log(data);
    res.send(data);
};

const getAllUsersReq=(req,res)=>{
    res.send(UserData);
};

const createUserReq=(req,res)=>{
    const data=req.body;
    UserData.push(data);
    console.log(data);
    res.send({message:"User created successfully."})
};

const updateUserReq=(req,res)=>{
    const data=req.body;
    const uuid=req.params.uuid;
    const position=UserData.findIndex((UserData)=>uuid==UserData.id);
    if (position!=-1){
        UserData[position]=data;
        res.statusCode=200;
        res.send({message:"User updated successfuly"});
    }
    else{
        res.statusCode=404;
        res.send({message:"No user id with given Id"});
    }
};

const deleteUserReq=(req,res)=>{
    const uuid=req.params.uuid;
    const position=UserData.findIndex((UserData)=>uuid==UserData.id);
    if (position!=-1){
        UserData.splice(position,1);
        res.statusCode=200;
        res.send({message:"User deleted successfully"});
    }
    else{
        res.statusCode=404;
        res.send({message:"No user id with given Id"});
    }
};

const autosuggestReq=(req,res)=>{
    const substr=req.params.str;
    const limit=req.params.limit;
    // console.log(substr,limit);
    const list= UserData.filter((user)=>user.login.includes(substr) && !user.isDeleted)
                .sort((user1,user2)=> user1.login.localeCompare(user2.login))
                .slice(0,limit);
    res.send(list);
};

const answerOtherReq=(req,res)=>{
    res.statusCode=400;
    res.send({message:"Error , couldnot find resource"});
}

router.get('/getUser/:uuid',getUserReq);
router.get('/getAllUsers',getAllUsersReq)
router.post('/createUser',addUserValidation,createUserReq);
router.put('/updateUser/:uuid',addUserValidation,updateUserReq);
router.delete('/deleteUser/:uuid',deleteUserReq);
router.get('/getautosuggest/:str/:limit',autosuggestReq);
router.use('/*',answerOtherReq);


module.exports={
    router:router,
};