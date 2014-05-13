
var zoo = {};


zoo.random = {
    intInRange: function  (min, max) {
        return parseInt(min + (max - min) * Math.random() +.5, 0);
    },
    booleanValue : function (chance) {
        return (Math.random() >= chance);
    },
    color : function () {
        return "#" + Math.round(Math.random() * 16777215).toString(16);
    },
    floatInRange : function (min, max) {
        return min + (max - min) * Math.random();
    },
    itemInArray : function (items) {
        return items[this.intInRange(0, items.length-1)];
    }
};

// ------------------------------------------------------------------------------------------------------------
// Strings

 zoo.strings = {

    toObject: function(input, format) {
    	var obj = {};
        var value = input;
        var _format = (format && format !== "") ? format : "key:value,";
        var asignerAndDelimiter = _format.replace(/[\w\d]+/g, "");
        var asigner   = asignerAndDelimiter[0];
        var delimiter = asignerAndDelimiter[1];
        
        value = value.toLowerCase().replace(/\s/g, "").split(delimiter);

        for(var n in value){
            var match = value[n].match(new RegExp("([^"+asigner+"]+?)"+asigner+"([\\w\\W]+)"));
            
            if(match){
    	        var key = match[1];
    	        var prob = match[2]
                if(!prob.match(/[^\d-]+/)) 
                    prob = parseInt(prob)
    	        obj[key] = prob;
            }
        }
        return obj;
    }
};


// ------------------------------------------------------------------------------------------------------------
// Utils
// ------------------------------------------------------------------------------------------------------------


zoo.utils = {
    guid: function () {
        var S4 = function () {return (((1+Math.random())*0x10000)|0).toString(16).substring(1);};
       return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
};