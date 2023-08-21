const modelOption = {
    toJSON : {
        virtuals : true,
        tranfrom : (_,obj) => {
            delete obj._id,
            return obj;
        }
    },
    toObject : {
        virtuals : true,
        tranfrom : (_,obj) => {
            delete obj._id,
            return obj;
        }
    },
    versionKey : false,
    timeStamp : true
}

export default modelOption