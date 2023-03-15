import { GoTrashcan } from "react-icons/go"
import ExpandablePanel from "./ExpandablePanel"
import Button from "./Button"
import { useDeleteAlbumMutation } from "../store"
import PhotosList from "./PhotosList"


const AlbumsListItem = ({ album }) => {
    const [removeAlbum, results] = useDeleteAlbumMutation()

    const handleDeleteAlbum = (album) => {
        removeAlbum(album)
    }

    const header = (
        <>
            <Button className='mr-3' loading={results.isLoading} onClick={e => handleDeleteAlbum(album)}> <GoTrashcan /></Button>
            {results.error && 'Error while deleting user...'}
            {album.title}
        </>
    )
    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    )
}

export default AlbumsListItem