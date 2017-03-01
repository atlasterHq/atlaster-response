module.exports = function(req,res){
  this.req = req;
  this.res = res;
  this.httpStatus = 200;
  this.message = "OK";
  this.data = null;

  this.ok = ()=>{
    this.flush();
  }

  this.insert = ()=>{
    this.httpStatus = 201;
    this.message = "CREATED";
    this.flush();
  }

  this.list = (data)=>{
    this.data = data;
    this.flush();
  }

  this.customResponse = (httpStatus,message,data)=>{
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
    this.flush();
  }

  this.dataOr404 = (data)=>{
    if(data == null){
      this.httpStatus = 404;
      this.message = "Resource not found";
    }else{
      this.httpStatus = 200;
      this.message = "OK";
      this.data = data;
    }
    this.flush();
  }

  this.err = (err)=>{
    console.log(err.message);
    this.httpStatus = 400;
    this.message = err.message;
    this.flush();
  }

  this.flush = ()=>{
    var respCtx = {
      meta:{
        code: this.httpStatus,
        message: this.message
      }
    };
    if(this.data != null)
      respCtx.data = this.data;
    res.status(this.httpStatus).json(respCtx);
  }
};
