import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

async function loginWithGoogle() {
    try {
        const res = await signInWithPopup(auth, new GoogleAuthProvider())
        const user = res.user;
        const q = query(collection(db, "user"), where("userId", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "user"), {
                userId: user.uid,
                name: user.displayName,
                firstLogin: new Date(Date.now()),
                email: user.email,
            });
        }
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

async function logout() {
    signOut(auth);
}

export { loginWithGoogle, logout }