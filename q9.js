const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://UtkarshJN:72fVAaJA7CBNM1bR@cluster0.ynfjui7.mongodb.net/")
.then(()=>console.log("Connection "))
.catch((err)=>console.log(err))

const schema=new mongoose.Schema({
    sid:{
        require:true,
        type:String
    },
    Name:{
        type:String,
        require:true
    },
    Subject:{
        type:String,
        require:true
    },
    Branch:{
        type:String,
        require:true
    },
    Marks:{
        type:Number,
        require:true
    },
})

const Student=new mongoose.model("student",schema)

const creactdoc=async()=>{
    const val1=new Student({
        sid:"salik123",
        Name:"Salik",
        Subject:"Node",
        Branch:"CSE",
        Marks:91
    })
    const val2=new Student({
        sid:"aryan123",
        Name:"Aryan",
        Subject:"Node",
        Branch:"CSE",
        Marks:89
    })
    const val3=new Student({
        sid:"nikhil123",
        Name:"Nikhil",
        Subject:"Node",
        Branch:"CSE",
        Marks:90
    })
    const res1=await val1.save()
    const res2=await val2.save()
    const res3=await val3.save()
    console.log(res1+"\n"+res2+"\n"+res3)
}

const sort=async()=>{
    const sorts={Marks:1}
    const res=await Student.find().sort(sorts)
    console.log(res)
}
creactdoc()
sort()