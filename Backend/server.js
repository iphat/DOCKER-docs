import app from "./src/app.js"

const PORT = 9000

app.get("/", (req,res) => {
    res.status(200).json({message: "Hello world"});
})

app.get("/api/data", (req,res) => {
    const data = {
        id: 1,
        name: "sample name",
        description: "hi this is iphat"
    };
    res.status(200).json(data);
});

app.get("/api/users", (req,res) =>{
    const users = [
        {id: 1, name: "Alice"},
        {id: 2, name: "Bob"},
        {id: 3, name: "jack"}
    ]
    res.json(users);
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})