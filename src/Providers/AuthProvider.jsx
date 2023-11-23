import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "@firebase/auth";
import { auth } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (fullName, url) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: url,
        });
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store in client
                const userInfo = {
                    email: currentUser.email,
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                };
                axiosPublic.post("/jwt", userInfo).then((result) => {
                    if (result.data.token) {
                        // console.log(result.data.token);
                        localStorage.setItem("access-token", result.data.token);
                        setLoading(false);
                    }
                });
            } else {
                //remove token from client
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        };
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        login,
        logout,
        googleSignIn,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
