import { GoTrashcan, GoSync } from "react-icons/go"
import Button from "./Button"
import { deleteUser } from "../store"
import { useThunk } from "../customHooks/useThunk"
import ExpandablePanel from "./ExpandablePanel"
import AlbumsList from "./AlbumsList"

const  UsersListItem = ({ user }) => {

    const [doDeleteUser, isLoading, error] = useThunk(deleteUser(user))

    const handleDelete = () => {
        doDeleteUser()
    }

    const header = <>
                    <Button className='mr-3' loading={isLoading} onClick={handleDelete}> <GoTrashcan /></Button>
                    {error && 'Error while deleting user...'}
                    {user.name}
    </>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}/>
        </ExpandablePanel>
    )
}

export default UsersListItem