import Head from "next/head";
import { contractAddresses, abi } from "../constants"
import Header from "../components/Header";
import { useMoralis, useWeb3Contract  } from "react-moralis";
import {useState,useEffect} from 'react';
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import { useRouter } from 'next/router';

export default function Verify() {
  const {Moralis, isWeb3Enabled,chainId: chainIdHex,account } = useMoralis();
  const [responseBytes, setResponseBytes] = useState("");
const chainId = parseInt(chainIdHex)
const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
const dispatch = useNotification()
const handleNewNotification = () => {
  dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
  })
}
const router = useRouter();
const youtubeURL = `https://www.youtube.com/watch?v=${storedInitialParam1}`;


  return (
    <div>
      <Header />
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className="flex justify-center rounded overflow-hidden shadow-lg p-8 w-1/2 ml-auto mr-auto">
 <div>Verify your credentials using zkPass TransGate. 
To be eligible to watch the video you must have more than 10000 USDT in <span class="font-bold">Binance chain</span></div>
{!responseBytes ? (<div class="pt-6">try {
    const appid = "8fb9d43c-2f24-424e-a98d-7ba34a5532f5"
    const connector = new TransgateConnect(appid)
    const isAvailable = await connector.isTransgateAvailable()

    if (isAvailable) {
      const schemaId = "516a720e-29a4-4307-ae7b-5aec286e446e"

      const res = await connector.launch(schemaId)
      
    } else {
      console.log('Please install TransGate')
    }
  } catch (error) {
    c):null}
            </div>
          ) : (
            <div>{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
          )}
        </div>
      ) : (
        <div>Please connect to a Wallet</div>
      )}
    </div>
  );
}
var storedInitialParam1="mOtULdszHqY";
