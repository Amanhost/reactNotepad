import React, { useEffect, useState } from "react";

const CallAPI3time = () => {
  const [data, setAPIdata] = useState([]);
  const [count, setCount] = useState(0);

  const apidata = async () => {
    let resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resp2 = await resp.json();
    setAPIdata(resp2);
  };
  useEffect(() => {
    if (count < 3) {
      apidata();
      setCount(count + 1);
    }
  }, [count]);
  console.log(count);

  return <div>CallAPI3time</div>;
};

export default CallAPI3time;
