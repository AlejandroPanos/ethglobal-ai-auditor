/* Imports */
const { ZgFile, Indexer } = require("@0gfoundation/0g-ts-sdk");
const { ethers } = require("ethers");
const fs = require("fs");

/* Functions */
const uploadReport = async (filePath) => {
  try {
    // Initialise provider and signer wallet
    const provider = new ethers.JsonRpcProvider(process.env.ZG_RPC_URL);
    const signer = new ethers.Wallet(process.env.ZG_KEY, provider);

    // Initialize indexer
    const indexer = new Indexer(process.env.ZG_INDEXER_URL);

    // Create the file from the temp file path
    const file = await ZgFile.fromFilePath(filePath);
    const [tree, treeErr] = await file.merkleTree();

    // Check for merkle tree error
    if (treeErr !== null) {
      throw new Error(`Merkle tree error: ${treeErr}`);
    }

    // Get the root hash
    const rootHash = tree?.rootHash();

    // Upload the file to 0G
    const [tx, uploadErr] = await indexer.upload(file, process.env.ZG_RPC_URL, signer);

    // Check for upload errors
    if (uploadErr !== null) {
      throw new Error(`Document upload error: ${uploadErr}`);
    }

    // Close and return root hash
    await file.close();
    return rootHash;
  } catch (error) {
    console.error("0G upload error:", error);
    throw error;
  }
};

const downloadReport = async (rootHash, outputPath) => {
  try {
    // Initialize indexer
    const indexer = new Indexer(process.env.ZG_INDEXER_URL);

    // Check for errors
    const err = await indexer.download(rootHash, outputPath, true);

    if (err !== null) {
      throw new Error(`Download error: ${err}`);
    }

    // Return the output path
    return outputPath;
  } catch (error) {
    console.error("0G download error:", error);
    throw error;
  }
};
