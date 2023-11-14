import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useEditCabin() {
    const queryClient = useQueryClient();
    const {isLoading: isEditing, mutate: editCabin} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin edited successfully");
            //refetch data
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            // reset();
        },
        onError: (error) => toast.error(error.message),
    });

    return {editCabin, isEditing}
}