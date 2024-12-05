const Laptop=require('../models/Laptop');
exports.addLaptop=async (req,res)=>{
    try{
        const laptop=new Laptop(req.body);
        await laptop.save();
        res.status(201).json(laptop);

    }catch(error){
        res.status(500).json({message:error.message});

    }
};
exports.getLaptops=async (req,res)=>{
    try{
        const laptops=await Laptop.find();
        res.status(200).json(laptops);

    }catch(error){
        res.status(500).json({message:error.message});

    }
};
exports.updateLaptop=async (req,res)=>{
    try{
        const laptop=await Laptop.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(laptop);



    }catch(error){
        res.status(500).json({message:error.message});

    }
};
exports.deleteLaptop=async(req,res)=>{
    try{
        await Laptop.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Laptop deleted'});


    }catch(error){
        res.status(500).json({message:error.message});

    }
}