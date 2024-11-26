enum ApiErrors {
  CANDIDATE_DOESNT_EXISTS = "CANDIDATE_DOESNT_EXISTS",
  CANDIDATE_UPDATE_ERROR = "CANDIDATE_UPDATE_ERROR",
  CANDIDATE_HAS_VOTES = "CANDIDATE_HAS_VOTES",
  CANDIDATE_ALREADY_EXISTS = "CANDIDATE_ALREADY_EXISTS",
  PARTY_NOT_FOUND = "PARTY_NOT_FOUND",
  CANDIDATE_DELETE_ERROR = "CANDIDATE_DELETE_ERROR",
  ASSET_TYPE_MISMATCH = "ASSET_TYPE_MISMATCH",
  INVALID_VOTING_CODE = "INVALID_VOTING_CODE",
  VOTING_CODE_ALREADY_EXISTS = "VOTING_CODE_ALREADY_EXISTS",
  VOTE_INVALID_TIMESTAMP = "VOTE_INVALID_TIMESTAMP",
  VOTE_REGISTER_ERROR = "VOTE_REGISTER_ERROR",
}

export default ApiErrors;
