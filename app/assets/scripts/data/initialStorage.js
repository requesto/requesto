export const initialStorage= {
    user: "",
    folders: [{
        name:"Blog example",
        id: 1,
        items:[
        {
            name:"/posts",
            description:"Get posts",
            type:"GET",
            url:"http://jsonplaceholder.typicode.com/posts"
        }]
    }]
}
