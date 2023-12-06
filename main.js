// app.js
document.addEventListener('DOMContentLoaded', async () => {
    // Connect to the local Ethereum node
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error('No Ethereum provider detected. Please install MetaMask or use a browser with Ethereum support.');
        return;
    }

    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with the actual contract address

    // Load the contract
    const contract = new window.web3.eth.Contract([
        // ABI (Contract Interface)
        {
            "constant": false,
            "inputs": [{"name": "x", "type": "uint256"}],
            "name": "set",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "get",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ], contractAddress);

    // Display the current stored value
    const currentValueElement = document.getElementById('currentValue');
    const updateCurrentValue = async () => {
        const currentValue = await contract.methods.get().call();
        currentValueElement.textContent = currentValue;
    };

    updateCurrentValue();

    // Set a new value when the button is clicked
    window.setValue = async () => {
        const newValue = document.getElementById('newValue').value;
        await contract.methods.set(newValue).send({ from: window.ethereum.selectedAddress });
        updateCurrentValue();
    };
});
