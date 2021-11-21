import React, { useEffect, useState } from "react"
// import { TiThMenu } from "react-icons/ti"
// import First from "./FirstComp/First"
 import { db } from "./first-connect"
 import { 
     collection, 
     getDocs, 
     addDoc, 
     updateDoc, 
     doc,
    deleteDoc } from "firebase/firestore"
import { async } from "@firebase/util"
import "./index.css"


const App = () => {
    const [users, setUsers] = useState([9]);
    const userCollectionRef = collection(db, "users") 
    const [newName, setNewName] = useState("")
    const [newAge, setNewAge] = useState(0)


    const deleteUser = async (id) => {

        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc)
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id)
        const newFields = {age: age + 1}
        await updateDoc(userDoc, newFields)
    }

    const createUser = async () => {
        await addDoc(userCollectionRef, {name: newName, age: Number(newAge)});
    }

    useEffect(()=>{

        const getUsers = async () => {
            const data = await getDocs(userCollectionRef)
setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getUsers()
    }, [])


return (
    <div>
        <input placeholder="name..." 
        onChange={(event) => {setNewName(event.target.value)}}/>
        <input type="number" placeholder="age..." 
        onChange={(event) => {setNewAge(event.target.value)}}/>
    <button onClick={createUser}>create</button>
{users.map((user) => {
     return (
        <div>
            
            <h1>Name: {user.name}</h1>
            <h1>age: {user.age}</h1>
            <h1>number: {user.number}</h1>
            <button onClick={() => {
                updateUser(user.id, user.age)}}
                >increase age</button>

            <button onClick={()=> {deleteUser(user.id)}}>Delete</button>
        </div>
     );
 })}
        </div>

)
}

export default App
