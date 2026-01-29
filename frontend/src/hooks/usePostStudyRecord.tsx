import { useMutation } from "@tanstack/react-query";
import { postStudyRecord, PostStudyRecordParams } from "@/src/lib/studyRecords";

export const usePostStudyRecord = () => {
  return useMutation({
    mutationFn: (params: PostStudyRecordParams) => postStudyRecord(params),
  });
};
