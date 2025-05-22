export const checkduplicate = (n) => {
    console.log(n,'bbbbbbbb2')
    try {
       var result =  n.reduce((unique, o) => {
            if(!unique.some(obj => obj.label === o.label)) {
              unique.push(o);
            }
            return unique;
        },[]);
        return result;
    } catch (err) {
      return 0
    }
  }