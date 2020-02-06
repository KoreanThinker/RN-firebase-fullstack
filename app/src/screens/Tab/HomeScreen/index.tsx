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

const data: postType[] = [
    {
        userId: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userId: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    },
    {
        userId: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userId: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    },
    {
        userId: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userId: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    },
    {
        userId: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userId: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    }
]


const HomeScreen = () => {
    const navigation = useNavigation()

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<postType[]>(data)
    const [afterCreatedAt, setAfterCreatedAt] = useState(0)
    const [isError, setIsError] = useState(false)
    const [isNoMorePost, setIsNoMorePost] = useState(false)

    const initFunction = async () => {
        // 유저 상태확인
        auth().onAuthStateChanged((user: FirebaseAuthTypes.User) => {
            if (user) {
                getPost()
            }
            else {
                navigation.navigate('SignStack')
            }
        });
    }

    const getPost = async () => {
        setIsError(false)
        setIsNoMorePost(false)
        const instance = functions().httpsCallable('getPost')
        try {
            const response = await instance({ afterCreatedAt })
            if (response.data == []) setIsNoMorePost(true)
            setPosts(response.data as postType[])
            setLoading(false)

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
    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <Header />
            {isError || loading
                ?
                <View style={{ flex: 1, ...styles.alignCenter }}>
                    {isError
                        ?
                        <TouchableWithoutFeedback onPress={getPost}><Text>다시시도</Text></TouchableWithoutFeedback>
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
                        ListFooterComponent={<View style={{ height: 50 + defaultMargin }} />}
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
