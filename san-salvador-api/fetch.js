fetch('http://localhost:3000/api/routes')
.then(res => res.json())
.then(data => console.log(data));