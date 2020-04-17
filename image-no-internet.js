import React, { Component } from 'react'
import { View, Image } from 'react-native'

const NoInternet = () => (
    <Image source={require('./assets/no-internet2.jpg')}
        style={{ width: 300, height: 250, margin: 10 }}
    />
)
export default NoInternet
/*
<Image source={{ uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png' }}
        style={{ width: 200, height: 200 }}
    />

*/