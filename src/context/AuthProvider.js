import React, { useContext, useState, useEffect } from "react"
import { auth, db, storageRef } from "../firebase"



const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function createUser(email, password, name,phone_number,file) {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password).then(function(result) {
        const user = auth.currentUser;
        user.updateProfile({
          displayName: name,

        }).then(()=>{
          var fileExt = file.name.split('.').pop();
          console.log(user.uid+'.'+fileExt)
          storageRef.child(user.uid+'.'+fileExt).put(file).then(()=>{
            storageRef.child(user.uid+'.'+fileExt).getDownloadURL()
            .then((url) => {
              db.collection("users").doc(user.uid).set({
                displayName:name,
                uid:user.uid,
                email:email,
                phoneNumber:phone_number,
                isParticipant:true,
                photoURL:url
              }).then(()=>{
                resolve()
              }).catch(error => reject("error creating profile"));
            })
            .catch(error => reject(error));
          })
          .catch(error => reject(error));

            })
          })
        })
  } 

  function login(email, password) {
    return new Promise((resolve, reject) => {
      db.collection("users").where("email","==",email).onSnapshot((docs)=>{
        if(!docs.empty)
        {
          docs.forEach(doc=>{
            if(doc.exists)
          {
                auth.signInWithEmailAndPassword(email, password).then(() => {
                  resolve()
                })
                .catch(error => reject(error));
          }
          else
          {
            reject({message:"no such account exists"})
          }
          })
        }
        else
        {
          reject({message:"no such account exists"})
        }
      })
    })
  }

  function logout() {
    sessionStorage.clear();  
        setCurrentUser()
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user && user.uid)
      {
        db.collection("users").doc(user.uid).onSnapshot((docs)=>{
          console.log(docs)
          if(docs.exists)
            {
              setCurrentUser(docs.data())
              setLoading(false)
            }else
            {
              logout()
            }
          })
      }else
        logout()
        setLoading(false)
      
    })

    return unsubscribe
  }, [])



  const value = {
    currentUser,
    createUser,
    logout,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}