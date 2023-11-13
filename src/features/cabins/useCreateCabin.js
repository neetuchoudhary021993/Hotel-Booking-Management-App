import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useCreateCabin() {
    const queryClient = useQueryClient();

    const {isLoading: iscreating, mutate: createCabin} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New cabin created successfully");
            //refetch data
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (error) => toast.error(error.message),
    });
 return {createCabin, iscreating}
}    