let input=process.argv.slice(2);

let fs=require("fs");
let path=require("path");

let commands=[];
let filePaths=[];

function readAllFiles()
{
    let s="";
    for(let i=0;i<filePaths.length;i++)
    {
        s+=fs.readFileSync(filePaths[i]);
        if(filePaths.length>1)
            s+="\r\n";
    }
    return s;
}

for(let i=0;i<input.length;i++)
{   
    if(input[i]=="-n" || input[i]=="-b" || input[i]=="-s")
    {
        commands.push(input[i]);
    }
    else
    {
        if(fs.existsSync(input[i]))
        {
            filePaths.push(input[i]);
        }
        else
        {
            console.error("File Not Found.  Please Enter a valid file path");
            return;
        }
    }
}

if(commands.includes('-n') && commands.includes("-b"))
{
    console.error("Ambigious commands found");
    return;
}


let fileContent=readAllFiles();
let getContentByLine=fileContent.split("\r\n");

// remove excess line breaks
if(commands.includes("-s"))
{
    for(let i=getContentByLine.length-1;i>=0;i--)
    {
        if(getContentByLine[i].length==0)   
        {
            let j=i-1;
            while(j>=0 && getContentByLine[j].length==0)
            {
                j--;
            }
            getContentByLine.splice(j+1,i-j-1);
            i=j;
        }
    }
}

if(commands.includes("-n"))
{
    for(let i=0;i<getContentByLine.length;i++)
    {
        getContentByLine[i]=`${i+1}. ${getContentByLine[i]}`;       
    }
}
// since both are mutually exclusive
else if(commands.includes("-b"))
{
    let c=1;
    for(let i=0;i<getContentByLine.length;i++)
    {
        if(getContentByLine[i].length!=0)
        {
            getContentByLine[i]=`${c}. ${getContentByLine[i]}`;    
            c++;
        }
    }
}


for(let i=0;i<getContentByLine.length;i++)
{
    console.log(getContentByLine[i]);
}