
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
  import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAE5yDOCsYf5AAm9PxPFuAZAHx9XkkAxG8",
    authDomain: "control-clientes-b6a88.firebaseapp.com",
    projectId: "control-clientes-b6a88",
    storageBucket: "control-clientes-b6a88.appspot.com",
    messagingSenderId: "889046678141",
    appId: "1:889046678141:web:9ce502bc7b466a129f8f14"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig),
    db = getFirestore();

  //get Tasks
  export const getTasks = () => getDocs(collection(db, 'tasks'));

//get tasks with real-time update
  export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

  //get task
  export const getTask = (id) => getDoc(doc(db, 'tasks', id));

  // add Task 
  export const addTask = (title, description) => addDoc(collection(db, 'tasks'), {title, description});

  //delete task 
  export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

  //update task
  export const updateTask = (id, data) => updateDoc(doc(db, 'tasks', id), data);
