import React from "react";
import Button from "../button";
import { toast } from "react-toastify";
import axiosInstance from "../../../external/axios";
import { ApiResponse } from "../../../core/types/apiResponse";
import ApiSuccess from "../../../core/types/successResponse";

type ActionsProps = {
  votingCode: number | null;
  onClear: () => void;
  validCode: boolean;
};

const Actions: React.FC<ActionsProps> = ({
  votingCode,
  onClear,
  validCode,
}) => {
  const clearVote = () => {
    toast.info("Vote cleared");
    onClear();
  };

  const confirmVote = async (votingCode: number) => {
    if (votingCode === null) {
      toast.error("Vote is empty");
      return;
    }
    if (!validCode || isNaN(votingCode)) {
      toast.error("Invalid candidate code.");
      return;
    }

    if (votingCode < 10000 || votingCode > 99999) {
      toast.error("Invalid candidate code.");
      return;
    }

    const response = await axiosInstance.post("/api/voting", {
      votingCode,
    });

    const data = response.data as ApiResponse;

    if (data.type === ApiSuccess.VOTE_REGISTERED) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    onClear();
  };

  return (
    <div className="flex gap-4 mt-8">
      <Button handler={clearVote} variant="primary" label="Clear" />
      <Button
        handler={() => confirmVote(Number(votingCode))}
        variant="primary"
        label="Confirm"
      />
    </div>
  );
};

export default Actions;
