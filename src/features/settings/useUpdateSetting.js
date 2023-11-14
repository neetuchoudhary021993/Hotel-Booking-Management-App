import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";


export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {isLoading: isUpdating, mutate: updateSetting} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("setting successfully updated");
            //refetch data
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
            // reset();
        },
        onError: (error) => toast.error(error.message),
    });

    return {updateSetting, isUpdating}
}