// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs=require('fs');
var router = express.Router();

var Pic=require('./../models/pics');

//
var homeRoute = router.route('/');

homeRoute
.get(function(req,res){
	var QueryWhere = eval("("+req.query.where+")");
	var QuerySort = eval("("+req.query.sort+")");
	var QuerySelect = eval("("+req.query.select+")");
	var QuerySkip = eval("("+req.query.skip+")");
	var QueryLimit = eval("("+req.query.limit+")");
	var QueryCount = eval("("+req.query.count+")");

	Pic.find(QueryWhere).sort(QuerySort).select(QuerySelect).skip(QuerySkip).limit(QueryLimit).exec(function(err,pics){
		if(err){
			res.status(500);
			res.json({message:'There is a server error'});
			res.send(err);
		}else{
		res.status(200);
		res.json({message:'All the pics are listed',data:pics});}

	});

})
.post(function(req,res){
	var pic=new Pic();

  pic.event=req.body.event;
  pic.uploader=req.body.uploader;
  pic.name=req.body.name;
  pic.commentBlocks=req.body.commentBlocks;
  pic.path=req.body.path;
//	user.profilepic=fs.readFileSync('smallpic.jpg');

  pic.save(function(err){
		if(err){
			res.status(404);
			return console.error(err);

		}
		else{
			res.status(201);
			res.json({message:'The new pic is created',data:pic});
		}
	});
})
.options(function(req, res){
      res.writeHead(200);
      res.end();
});

var picsIDRoute = router.route('/:pic_id');

picsIDRoute
.get(function(req,res){
	Pic.findById(req.params.pic_id,function(err,pic){
		if(err){
			res.status(404);
			res.json({message:'The pic is not found'});
			res.send(err);
		}
		else{
		res.status(200);
		res.json({message:'The pic is found',data:pic});}
	});
})
.put(function(req,res){
	Pic.findById(req.params.pic_id,function(err,pic){
		if(err){
			res.status(404);
			res.json({message:'The pic is not found'});
			res.send(err);
		}else{
      pic.event=req.body.event;
      pic.uploader=req.body.uploader;
      pic.name=req.body.name;
      pic.commentBlocks=req.body.commentBlocks;
      pic.path=req.body.path;
      pic.image=req.body.image;

      pic.save(function(err){
				if (err){
					res.status(500);
					res.json({message:'There is a server error when updating'});
					res.send(err);
				}else{
					res.status(201);
					res.json({message:'Pic Updated',data:pic});
				}
			});
		}
	});
})
.delete(function(req,res){
	Pic.remove({
		_id:req.params.pic_id
	},function(err,pic){
		if(err){
			res.status(404);
			res.json({message:'The Pic does not exit'});
			res.send(err);
		}else{
		res.json({message:'Successfully deleted Pic'});
		}
	});
});

module.exports=router;
