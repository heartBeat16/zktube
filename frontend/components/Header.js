import { ConnectButton } from "web3uikit"

export default function Header() {
    return (<>
<div class="h-2"></div>
                <ConnectButton moralisAuth={false}/>
                <hr class="h-1 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                </>
    )
}