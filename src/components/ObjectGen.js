const ObjectGen = {
    getNewObject: function (index, count) {
        let tempObj = [];

        while (index < count) {
            tempObj.push({
                id: index,
                size: "small",
                pic: null,
            })
            index++;
        }
        return tempObj;
    }
}
export default ObjectGen;