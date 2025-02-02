import React, { useEffect, useState } from "react";

const UserData = () => {
  const [data, setAPIdata] = useState([]);
  const [count, setCount] = useState(0);

  // const apidata = async () => {
  //   let resp = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   const resp2 = await resp.json();
  //   setAPIdata(resp2);
  // };

  useEffect(() => {
    datacall();
  }, []);
  function datacall() {
    setInterval(async () => {
      let resp = await fetch("https://jsonplaceholder.typicode.com/posts");
      const resp2 = await resp.json();
      setAPIdata(resp2);
      setCount(count + 1);
    }, 500);
  }
  console.log("count", count);
  return <div>UserData</div>;
};

export default UserData;
