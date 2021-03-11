 import React, { Component } from 'react';
//
// import ProfilePicture from "profile-picture"
// import "profile-picture/build/ProfilePicture.css"
 import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
 import {Avatar} from "antd";
class ImageUploader extends Component {

    render() {
        return(
                <Avatar style={{ marginLeft:'auto',marginRight:'auto', display:'block'}} size={150} icon={<UserOutlined />} />
            )


    }
}
export default ImageUploader