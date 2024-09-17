const MAX_IMAGE_SIZE = 2 * 1024 * 1024
const extensions = ["jpg" , "jpeg" , "png"]
module.exports = (fileSize , extension) => {
    const exists = extensions.forEach(ext => ext == extension);
    if(fileSize > MAX_IMAGE_SIZE){
        return 'Please Upload Minimum Image..';
    }else if(!exists){
        return false;
    }else{
        return true;
    }
}