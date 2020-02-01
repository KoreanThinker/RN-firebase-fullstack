import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import functions from '@react-native-firebase/functions';
import useNavigation from '../../../hooks/useNavigation';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { color1, defaultBackgroundColor, defaultMargin } from '../../../components/styles';
import { postType } from '../../../components/types';
import PostCard from './PostCard';
import Header from './Header';
import NotiPostCard from './NotiPostCard';
import BannerAdView from '../../../components/View/BannerAdView';
import HomeScreenFab from '../../../components/Button/HomeScreenFab';

const data: postType[] = [
    {
        userid: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userid: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    },
    {
        userid: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userid: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    },
    {
        userid: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userid: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    },
    {
        userid: 'honey476@naver.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFocVdrh7XQ-XWjzCDgkUvEflBfBts5IxFoH2JhpjsAFj-O_PC&s',
    },
    {
        userid: 'coderhyun476@gmail.com',
        description: '여러분 모두 반갑습니다. 좋은 하루 되세요',
        image: null,
    }
]


const HomeScreen = () => {
    const navigation = useNavigation()

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<postType[]>(data)

    const get = async () => {
        const instance = functions().httpsCallable('getHello')
        try {
            const response = await instance()
            setLoading(false)
        } catch (error) {
            console.log('Error: ' + error);
            setLoading(false)
        }
    }

    const initFunction = async () => {
        // 유저 상태확인
        auth().onAuthStateChanged((user: FirebaseAuthTypes.User) => {
            if (user) {

            }
            else {
                navigation.navigate('SignStack')
            }
        });
    }

    //initialize
    useEffect(() => {
        functions().useFunctionsEmulator('http://localhost:5000');
        get()
        initFunction()
    }, [])

    const onPost = () => {
        navigation.navigate('PostScreen')
    }
    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <Header />
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
        </View>
    )
}



export default HomeScreen
