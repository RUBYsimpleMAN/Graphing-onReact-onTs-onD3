import CryptoJS from 'crypto-js';

class Block {
  public id: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = ( id: number,
                                previousHash: string,
                                data: string,
                                timestamp: number
                              ): string => CryptoJS.SHA256( id +
                                                            previousHash +
                                                            data +
                                                            timestamp )
                              .toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.id === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number';

  constructor(
    id: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number,
  ) {
    this.id = id;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  };
}

const genesisBlock: Block = new Block(0, '098723450987', '', 'FirstBlock', 12131415);

let blockchain: [Block] = [genesisBlock];

const getLastBlockFromArray = (): Block => blockchain[blockchain.length - 1];

const getTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const lastBlock: Block = getLastBlockFromArray();
  const newId: number = lastBlock.id + 1;
  const newTimestamp: number = getTimestamp();
  const newHash: string = Block.calculateBlockHash( newId,
                                                    lastBlock.hash,
                                                    data,
                                                    newTimestamp);
  const newBlock: Block = new Block(newId,
                                    newHash,
                                    lastBlock.hash,
                                    data,
                                    newTimestamp);
  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.id,
                                                                            aBlock.hash,
                                                                            // aBlock.previousHash,
                                                                            aBlock.data,
                                                                            aBlock.timestamp)

const isBlockValid = (candidateBlock: Block, lastBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (lastBlock.id + 1 !== candidateBlock.id) {
    return false;
  } else if (lastBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) === candidateBlock.hash) {
    return false;
  }
  return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLastBlockFromArray())) {
    blockchain.push(candidateBlock)
  }
}

createNewBlock('2-й блок')
createNewBlock('3-й блок')
createNewBlock('4-й блок')
createNewBlock('5-й блок')
createNewBlock('6-й блок')
createNewBlock('7-й блок')

const toExport: [Block] = blockchain;

export default toExport;













