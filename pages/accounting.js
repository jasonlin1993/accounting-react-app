import React, { useEffect, useState } from "react";
import Form from "./Form";
import { useRouter } from "next/router";
import firebase from "../utils/firebase";

export default function Accounting() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
}
