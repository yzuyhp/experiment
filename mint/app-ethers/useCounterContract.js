import { useState, useRef, useEffect } from "react";
import { ethers } from "ethers";

import artifact from "../smart-contracts/build/contracts/CodeWithJoe.json";

export default function useCounterContract() {
  const contract = useRef();
  const [count, setCount] = useState();
  const account = useRef();

  // function to get current count and update UI
  const updateCount = async () => {
    console.log("account: ", account.current);
    const newCount = await contract.current.balanceOf(account.current);
    setCount(newCount.toString());
  };

  // function to invoke a mutating method on our contract
  const increment = async () => {
    //const tx = await contract.current.increment();

    const tx = await contract.current.mint(account.current, 10000);
    await tx.wait(); // wait for mining
    updateCount(); // update count on UI
  };

  useEffect(() => {
    // this is only run once on component mounting
    const setup = async () => {
      //const provider = new ethers.providers.JsonRpcProvider("http://192.168.124.251:8545");
      //if (typeof window.ethereum !== 'undefined') {
      //    let addr=await ethereum.request({ method: 'eth_requestAccounts' });//授权连接钱包
      //    console.log('用户钱包地址:',addr[0]);
      //}else{
      //    console.log('未安装钱包插件！');
      //}
      console.log("window.ethereum: ", window.ethereum);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const network = await provider.getNetwork();
      const contractAddress = artifact.networks[network.chainId].address;
      console.log("contractAddress: ", contractAddress);

      // instantiate contract instance and assign to component ref variable
      contract.current = new ethers.Contract(
        contractAddress,
        artifact.abi,
        provider.getSigner(),
      );

      const message = 'Get Public Key';
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const digest = ethers.utils.arrayify(ethers.utils.hashMessage(message));
      const address = await ethers.utils.recoverAddress(digest, signature);
      account.current = address;
      console.log("address: ", address);

      // update count on UI
      updateCount();
    };
    setup();
  }, []);

  return { count, increment };
}
