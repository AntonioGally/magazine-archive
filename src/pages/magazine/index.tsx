import { useParams } from "react-router"
import useGetMagazine from "./magazine.api"

const Magazine = () => {
    const { magazineId } = useParams<{ magazineId: string }>()

    const { data } = useGetMagazine(magazineId);

    return (
        <div>{data?.title}</div>
    )
}

export default Magazine;