async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;
        console.log(users);
        let list = document.getElementById('writeList');
        
        Object.keys(users).map(function(key){
            const contentDiv = document.createElement('div');
            contentDiv.className='crud-content'
            const userDiv = document.createElement('div');
            userDiv.className='content-user'
            const userName = document.createElement('span');
            userName.textContent = users.key+' | ';
            const date = document.createElement('span');
            let localDate = new Date();
            date.textContent = localDate.toLocaleDateString();
            const writeDiv = document.createElement('div');
            const writeContent = document.createElement('p');
            writeContent.className='content-text'
            writeContent.textContent = users[key];

            userDiv.appendChild(userName);
            userDiv.appendChild(date);
            writeDiv.appendChild(writeContent);
            contentDiv.appendChild(userDiv);
            contentDiv.appendChild(writeDiv);
            
            list.insertBefore(contentDiv,list.firstChild);
            console.log("try실행");

        });

        console.log(list);
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
