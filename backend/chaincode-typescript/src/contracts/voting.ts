import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction,
} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import { Vote } from '../entities/vote';
import { CandidateRegisterContract } from './candidateRegister';
import { Candidate } from '../entities/candidate';
import errors from '../messages/errors';
import success from '../messages/success';

@Info({
    title: 'VotingContract',
    description: 'Smart contract for voting',
})
export class VotingContract extends Contract {
    @Transaction()
    @Returns('string')
    public async RegisterVote(
        ctx: Context,
        idVote: string,
        votingCode: number,
        createdAt: number
    ): Promise<string> {
        // Queries the candidate by it's voting code
        const candidateContract = new CandidateRegisterContract();
        const candidates: Candidate[] =
            await candidateContract.QueryCandidateByVotingCode(ctx, votingCode);

        // Checks if the candidate exists
        if (!candidates.length || candidates.length === 0) {
            throw new Error(JSON.stringify(errors.CANDIDATE_DOESNT_EXISTS));
        }

        const isValidTimestamp = (timestamp: number): boolean => {
            const date = new Date(timestamp);
            return !isNaN(date.getTime());
        };

        // Checks if the timestamp is valid
        if (!isValidTimestamp(createdAt)) {
            throw new Error(JSON.stringify(errors.VOTE_INVALID_TIMESTAMP));
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const candidate: Candidate = candidates[0];

            const vote = {
                docType: 'vote',
                idVote,
                createdAt,
                idCandidate: candidate.idCandidate,
            };

            await ctx.stub.putState(
                idVote,
                Buffer.from(stringify(sortKeysRecursive(vote)))
            );
            console.info(`Vote ${idVote} registered.`);

            return JSON.stringify(success.VOTE_REGISTERED);
        } catch (error) {
            console.error('Error registering vote', error);
            throw new Error(JSON.stringify(errors.VOTE_REGISTER_ERROR));
        }
    }

    @Transaction()
    public async GetAllVotes(ctx: Context): Promise<Vote[]> {
        const candidateContract = new CandidateRegisterContract();
        const candidates: Candidate[] =
            await candidateContract.GetAllCandidates(ctx);

        if (!candidates.length || candidates.length === 0) {
            throw new Error(JSON.stringify(errors.CANDIDATE_DOESNT_EXISTS));
        }

        const allResults: Vote[] = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(
                result.value.value.toString()
            ).toString('utf8');
            let record: Vote;
            try {
                record = JSON.parse(strValue) as Vote;
                // Includes the candidate name in the vote object
                record.candidateName = candidates.find(
                    (candidate) => candidate.idCandidate === record.idCandidate
                )?.name;
                if (record.docType === 'vote') {
                    allResults.push(record);
                }
            } catch (err) {
                console.log('Error querying candidates:', err);
            }
            result = await iterator.next();
        }
        return allResults;
    }

    @Transaction()
    public async GetVotesByCandidate(
        ctx: Context,
        idCandidate: string
    ): Promise<Vote[]> {
        const allResults: Vote[] = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(
                result.value.value.toString()
            ).toString('utf8');
            let record: Vote;
            try {
                record = JSON.parse(strValue) as Vote;
                if (
                    record.docType === 'vote' &&
                    record.idCandidate === idCandidate
                ) {
                    allResults.push(record);
                }
            } catch (err) {
                console.log('Error querying votes:', err);
            }
            result = await iterator.next();
        }
        return allResults;
    }
}
