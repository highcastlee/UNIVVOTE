async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;
        const writingList = document.getElementById('writingList');
        
        Object.keys(users).map(function(key){
            const contentDiv = document.createElement('div');
            contentDiv.className='crud-content';
            const userDiv = document.createElement('div');
            userDiv.className='content-user';
            const userName = document.createElement('span');
            //userName 추구 JSON으로 실제 userName 설정해야함
            userName.textContent = Object.keys(users)[0]+' | ';
            const date = document.createElement('span');
            let localDate = new Date();
            date.textContent = localDate.toLocaleDateString();
            const writeDiv = document.createElement('div');
            const writeContent = document.createElement('p');
            writeContent.className='content-text';
            writeContent.textContent = users[key];

            userDiv.appendChild(userName);
            userDiv.appendChild(date);
            writeDiv.appendChild(writeContent);
            contentDiv.appendChild(userDiv);
            contentDiv.appendChild(writeDiv);
            writingList.insertBefore(contentDiv,writingList.firstChild);
            writingList.removeChild(writingList.lastChild);
            
        });

    }catch(err){
        console.log(err);
    }
}

window.onload = getUser;

document.getElementById('writeForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    const name= e.target.writeContent.value;
    if(!name){
        return alert('내용을 입력하세요');
    }
    try{
        await axios.post('/user',{name});
        getUser();
        location.reload();
    }catch(err){
        console.error(err);
    }
});


document.getElementById('voteForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    console.log(e.target);
    const candidate= e.target.candidateNumber.value;
    console.log(candidate);
    if(!candidate){
        return alert('후보자를 선택하세요');
    }
    try{
        await axios.post('/user',{candidate});
        getUser();
        // location.reload();
    }catch(err){
        console.error(err);
    }
});


let writeList = document.getElementById('writingList');
function makeTemplate(){
    if(writeList.childElementCount<4){
        const contentDiv = document.createElement('div');
        contentDiv.className='crud-content'
        const userDiv = document.createElement('div');
        userDiv.className='content-user'
        const userName = document.createElement('span');
        userName.textContent = '김아무개 | ';
        const date = document.createElement('span');
        let localDate = new Date();
        date.textContent = localDate.toLocaleDateString();
        const writeDiv = document.createElement('div');
        const writeContent = document.createElement('p');
        writeContent.className='content-text'
        writeContent.textContent = "총학생회에 응원의 메시지를 남겨주세요!";
        userDiv.appendChild(userName);
        userDiv.appendChild(date);
        writeDiv.appendChild(writeContent);
        contentDiv.appendChild(userDiv);
        contentDiv.appendChild(writeDiv);
        writingList.appendChild(contentDiv);
        makeTemplate();
    }
    return;
};
makeTemplate();