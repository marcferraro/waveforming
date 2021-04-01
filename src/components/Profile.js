import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Input, Button } from '@material-ui/core'

const Profile = props => {
    const auth = useSelector(state => state.auth)
    const [avatar, setAvatar] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState('')

    const handleAvatar = event => {
        setAvatar(event.target.files[0])
    }
    
    const handleAvatarUrl = url => {
        console.log(url)
        setAvatarUrl('http://localhost:3000' + url)
    }

    const submitAvatar = () => {
        const formData = new FormData();
        formData.append("avatar", avatar)
        
        fetch(`http://localhost:3000/avatar/${auth.id}`, {
            method: "PATCH",
            body: formData
          })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            handleAvatarUrl(data.avatarUrl)
        })
    }

    return(
        <div >
            <Typography gutterBottom variant="h3">
                {auth.username}
            </Typography>
            <Avatar onClick={() => console.log(avatarUrl)} alt="avatar" src={`http://localhost:3000${auth.avatar}`}></Avatar>
            <Typography paragraph>
                Update Avatar: 
                <Input onChange={handleAvatar} type="file" id="avatar-upload" />
                <Button onClick={submitAvatar} type="submit">Submit</Button>
            </Typography>
        </div>
    )
}

export default Profile