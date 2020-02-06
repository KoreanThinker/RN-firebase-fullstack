import React, { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import functions from '@react-native-firebase/functions';
import useNavigation from '../../../hooks/useNavigation';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import styles, { color1, defaultBackgroundColor, defaultMargin } from '../../../components/styles';
import { postType } from '../../../components/types';
import PostCard from './PostCard';
import Header from './Header';
import NotiPostCard from './NotiPostCard';
import BannerAdView from '../../../components/View/BannerAdView';
import HomeScreenFab from '../../../components/Button/HomeScreenFab';
import { sendToast } from '../../../components/functions';
import DefaultActivityIndicator from '../../../components/Indicator/DefaultActivityIndicator';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getPost } from './getPost'


const HomeScreen = () => {
    const navigation = useNavigation()

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<postType[]>([])
    const [isError, setIsError] = useState(false)
    const [afterCreatedAt, setAfterCreatedAt] = useState(0)
    const [isNoMorePost, setIsNoMorePost] = useState(false)
    const [refresing, setRefreshing] = useState(false)

    const initFunction = async () => {
        // 유저 상태확인
        auth().onAuthStateChanged((user: FirebaseAuthTypes.User) => {
            if (user) {
                postInit()
            }
            else {
                navigation.navigate('SignStack')
            }
        });
    }

    const postInit = async () => {
        setIsError(false)
        setIsNoMorePost(false)
        try {
            const res = await getPost(0)
            if (res.length > 0) {
                setAfterCreatedAt(res[res.length - 1].createdAt)
            } else {
                setIsNoMorePost(true)
            }
            setPosts(res as postType[])
            setLoading(false)
            setRefreshing(false)
        } catch (error) {
            console.log('Error: ' + error);
            setIsError(true)
            sendToast('오류')
        }
    }

    //initialize
    useEffect(() => {
        functions().useFunctionsEmulator('http://localhost:5000');
        initFunction()
    }, [])

    const onPost = () => {
        navigation.navigate('PostScreen')
    }

    const onGetMorePost = async () => {
        if (isNoMorePost) return
        setIsError(false)
        try {
            const res = await getPost(afterCreatedAt)
            if (res.length > 0) {
                setAfterCreatedAt(res[res.length - 1].createdAt)
            } else {
                setIsNoMorePost(true)
            }
            const newPosts = res as postType[]
            setPosts(posts.concat(newPosts))
        } catch (error) {
            console.log('Error: ' + error);
            setIsError(true)
            sendToast('오류')
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        postInit()
    }

    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <Header />
            {isError || loading
                ?
                <View style={{ flex: 1, ...styles.alignCenter }}>
                    {isError
                        ?
                        <TouchableWithoutFeedback onPress={postInit}><Text>다시시도</Text></TouchableWithoutFeedback>
                        :
                        <DefaultActivityIndicator />
                    }
                </View>
                :
                <>
                    <FlatList
                        style={{ flex: 1 }}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        refreshing={refresing}
                        onRefresh={onRefresh}
                        data={posts}
                        keyExtractor={(item, index) => `post${index.toString()}`}
                        renderItem={({ item, index }) => {
                            if (index == 0 || index == 7)
                                return (
                                    <>
                                        <PostCard {...item} />
                                        <BannerAdView />
                                    </>
                                )

                            return <PostCard {...item} />
                        }}
                        ListHeaderComponent={<NotiPostCard />}
                        ListFooterComponent={
                            <View style={{ height: 50 + defaultMargin, width: '100%', ...styles.alignCenter, paddingBottom: defaultMargin }} >
                                {!isNoMorePost && <DefaultActivityIndicator />}
                            </View>
                        }
                        onEndReached={onGetMorePost}
                    />

                    <HomeScreenFab
                        onPress={onPost}
                    />
                </>
            }
        </View>
    )
}



export default HomeScreen
