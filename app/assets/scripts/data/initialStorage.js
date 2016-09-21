export const initialStorage= {
    user: "",
    folders: [{
        name:"Blog example",
        id: 1,
        items:[{
            name:"/posts",
            description:"Get posts",
            type:"GET",
            url:"http://jsonplaceholder.typicode.com/posts"
        },{
            name:"/posts?userId=1",
            description:"Get posts filter by userId",
            type:"GET",
            url:"http://jsonplaceholder.typicode.com/posts",
            params:{
                "userId":"1"
            }
        },{
            name:"/posts",
            description:"Get posts filter by userId",
            type:"POST",
            url:"http://jsonplaceholder.typicode.com/posts",
            body:{
                title: "foo",
                body: "bar",
                userId: "1"
            }
        },{
            name:"/posts/1",
            description:"Patch post",
            type:"PUT",
            url:"http://jsonplaceholder.typicode.com/posts/1"
        },{
            name:"/posts/1",
            description:"Delete post",
            type:"DELETE",
            url:"http://jsonplaceholder.typicode.com/posts/1"
        },{
            name:"/posts/1",
            description:"Patch post",
            type:"PATCH",
            url:"http://jsonplaceholder.typicode.com/posts/1"
        }]
    }]
}
