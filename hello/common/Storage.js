export default class Storage { 
  constructor() { 
  } 

  static getInstance() {  
    if (!Storage.instance) {  
      Storage.instance = new Storage();  
    }  
    return Storage.instance;  
  }

  setProp(key,value){
  	this[key]=value;
  }
  getProp(key){
  	return this[key];
  }
}  