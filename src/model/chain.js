import multichain from 'multichain-node'
import { exec } from 'child_process'


export class Chain {
    host
    port
    rpcName
    rpcPassword

    constructor(port, rpcPassword) {
        this.host = "localhost"
        this.port = port
        this.rpcName = "multichainrpc"
        this.rpcPassword = rpcPassword
    }


    static createChain(chainName) {
        exec(`multichain-util create ${chainName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`)
                return
            }
            console.log(`Output: ${stdout}`)
        })
        console.log(`Chain ${chainName} successfully created`)
        // getRpcPort()
        return {

        }
    }

    async establishConntection() {
        let connection;
        try {
            connection = await multichain({
                port: this.port,
                host: this.host,
                user: this.rpcName,
                pass: this.rpcPassword
            })
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
        return connection
    }

    startDaemon(chainName) {
        exec(`multichaind ${chainName} -daemon`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`)
                return
            }
            console.log(`Output: ${stdout}`)
        })
        console.log(`Chain ${chainName} successfully started`)
    }

    getRpcPort(chainName) {
        exec(`multichain-cli ${chainName} getinfo`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`)
                return
            }
            const info = JSON.parse(stdout)
            return info.rpcport
        })
    }

    async createAddress() {
        let address;
        try {
            const connection = await multichain({
                port: this.port,
                host: this.host,
                user: this.rpcName,
                pass: this.rpcPassword
            })

            address = await connection.getNewAddress()
            

            await connection.grant({ addresses: address, permissions: "receive" }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Address ${address} has been created with receiving rights`);
                }
            });
            console.log(address);
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
        return address
    }

    
    async issueTokens({ address, marks, courseName }) {
        try {
        const chain = await multichain({
            port: this.port,
            host: this.host,
            user: this.rpcName,
            pass: this.rpcPassword
        })

        await chain.issue({ address: address, asset: courseName, qty: marks, units: 1.0 }, (err, res) => {
            console.log(res)
        });
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }

    async transferTokens({ fromAddress, toAddress, amount, assetName }) {
        try {
        const senderChain = await multichain({
            port: this.port,
            host: this.host,
            user: this.rpcName,
            pass: this.rpcPassword
        })

        await senderChain.sendFrom({from: fromAddress, to: toAddress, amount: [amount, assetName], sendall: false}, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }


}