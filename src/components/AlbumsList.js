import { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } from "../store"
import Skeleton from './Skeleton'
import ExpandablePanel from "./ExpandablePanel"
import Button from "./Button"
import { GoTrashcan } from "react-icons/go"
import AlbumsListItem from "./AlbumsListItem"


const AlbumsList = ({ user }) => {

    const { data, error, isLoading } = useFetchAlbumsQuery(user)
    const [addAlbum, results] = useAddAlbumMutation()
    const [removeAlbum, removeAlbumResults] = useDeleteAlbumMutation()

    const handleAddAlbum = () => {
        addAlbum(user)
    }

    const handleDeleteAlbum = (album) => {
        removeAlbum(album)
    }


    let content
    if(isLoading){
        content = <Skeleton className='h-10 w-full' times={3}/>
    }else if(error){
        content = <div>
            Error loading albums...
        </div>
    }else {
        content = data.map(album => <AlbumsListItem key={album.id} album={album}/>)
    }

    return(
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums by {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading}>
                    + Add Album
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default AlbumsList