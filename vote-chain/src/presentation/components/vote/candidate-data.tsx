import React from "react";
import DigitButton from "./digit-button";
import { Candidate } from "../../../core/entities/candidate";

type CandidateDataProps = {
  votingCode: number[];
  candidate: Candidate | null;
};

const CandidateData: React.FC<CandidateDataProps> = ({
  votingCode,
  candidate,
}) => {
  return (
    <div>
      <div className="mb-8">
        <label htmlFor="votingCode" className="text-lg font-semibold">
          Candidate Code
        </label>
        <div className="flex gap-2">
          <DigitButton digit={votingCode[0]} disabled={true} />
          <DigitButton digit={votingCode[1]} disabled={true} />
          <DigitButton digit={votingCode[2]} disabled={true} />
          <DigitButton digit={votingCode[3]} disabled={true} />
          <DigitButton digit={votingCode[4]} disabled={true} />
        </div>
      </div>

      <h2 className="text-lg mb-4 font-semibold">Candidate</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        className="border-2 p-2 rounded-lg w-full bg-white"
        disabled
        value={candidate?.name || ""}
      />
      <label htmlFor="idParty">Party</label>
      <input
        id="idParty"
        type="text"
        className="border-2 p-2 rounded-lg w-full bg-white"
        disabled
        value={candidate?.idParty || ""}
      />
    </div>
  );
};

export default CandidateData;
