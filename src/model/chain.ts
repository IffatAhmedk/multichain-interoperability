import multichain from 'multichain-node'
import { exec } from 'child_process'


export class Chain {
    host: string
    port: number
    rpcName: string
    rpcPassword: string

    constructor(port: number, rpcPassword: string) {
        this.host = "localhost"
        this.port = port
        this.rpcName = "multichainrpc"
        this.rpcPassword = rpcPassword
    }


    createChain(chainName: string) {
        exec(`multichain-util create ${chainName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`)
                return
            }
            console.log(`Output: ${stdout}`)
        })
        console.log(`Chain ${chainName} successfully created`)
    }

    async establishConntection(): Promise<any> {
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

    startDaemon(chainName: string) {
        exec(`multichaind ${chainName} -daemon`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`)
                return
            }
            console.log(`Output: ${stdout}`)
        })
        console.log(`Chain ${chainName} successfully started`)
    }

    getRpcPort (chainName: string) {
        exec(`multichain-cli ${chainName} getinfo`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error}`)
            return
          }
          const info = JSON.parse(stdout)
          return info.rpcport
        })
      }

    async createAddress(): Promise<any> {
        let address: any;
        try {
            const connection = await multichain({
                port: this.port,
                host: this.host,
                user: this.rpcName,
                pass: this.rpcPassword
            })

            address = await connection.getNewAddress()
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
        return address
    }
}