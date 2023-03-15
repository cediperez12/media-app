import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUsers, addNewUser, deleteUser } from '../store'
import Skeleton from './Skeleton'
import Button from './Button'
import { useThunk } from '../customHooks/useThunk'
import UsersListItem from './UsersListItem'

const UsersList = () => {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers())
    const [doAddNewUser, isCreatingUser, creatingUserError] = useThunk(addNewUser())

    const { data } = useSelector(state => state.users)

    useEffect(() => {
        doFetchUsers()
    }, [])

    const handleUserAdd = () => {
        doAddNewUser()
    }

    if(loadingUsersError){
        return <div>Error fetching data...</div>
    }

    return (
        <>
            <div className='flex flex-row justify-between m-3'>
                <h1 className='m-2 text-xl'>Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
                { creatingUserError && 'Error occured while creating new user...'}
            </div>
            {
                isLoadingUsers ? 
                <Skeleton times={5} className='h-10 w-full' /> : 
                data.map(user => 
 
                    <UsersListItem key={user.id} user={user}/>
                )
            }
        </>
    )
}

export default UsersList