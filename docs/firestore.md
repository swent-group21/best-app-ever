## Firebase / Firestore tutorial

In this tutorial you will learn how to use the firebase backend using our Firestore
storage.

### Understanding our backend

We have conveniently created a specific directory for different configurations used
to access the backend. This folder is called firebase.

### `Firebase.ts`

In the first we have the majority of our configuration which intialise the connection
to all the necessary backend components. Such as the app, our firestore, our authentification, and our storage. It will also export these constants to any other file by importing this type (.ts)

### `FirestoreCtrl.ts`

Here will be the main create and get functions in which read and write operations into
the backend will be performed.

Take the get and create user functions of examples of how to access the "users" database.

#### Other example files to follow

The types directory contains types which can be used to orchestrate connections with the
firestoreCtrl backend read and write functions. An example can be found in the `Auth.ts` file which first creates the user using the auth service `createUserWithEmailAndPassword` then adds it into our database `createUser`

#### Tutorials and Documentation

[Getting Data](https://firebase.google.com/docs/firestore/query-data/get-data)

[Manage Users](https://firebase.google.com/docs/auth/web/manage-users)
