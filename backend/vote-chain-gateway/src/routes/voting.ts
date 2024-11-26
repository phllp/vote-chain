import { Router } from 'express';
import { invokeTransaction } from '../blockchain/blockchain';
import { Contract } from '@hyperledger/fabric-gateway';
import { getAllVotes, registerVote } from '../blockchain/voting';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

router.get('/status', (req, res) => {
  res.sendStatus(200);
});

router.get('/', async (req, res) => {
  const response = await invokeTransaction(getAllVotes);
  console.log(response);
  res.send(response);
});

router.post('/', async (req, res) => {
  const { votingCode } = req.body;
  const idVote = uuidv4();
  const response = await invokeTransaction(async (contract: Contract) => {
    return await registerVote(contract, idVote, votingCode);
  });
  res.send(response);
});

export default router;
