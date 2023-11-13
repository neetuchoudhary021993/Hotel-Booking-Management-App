import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useDeleteCabin() {

    const queryClient = useQueryClient()
const {isLoading:isDeleting, mutate: deleteCabin} = useMutation({
 mutationFn: deleteCabins,
 onSuccess: () => {
     toast.success("cabin successfully deleted");
     //invalidate the query
     queryClient.invalidateQueries({
         queryKey:['cabins']
     })
 },
 onError: (error) => toast.error(error.message)

})
  return {deleteCabin, isDeleting}
}

export default useDeleteCabin

