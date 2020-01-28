# RN-firebase-fullstack
react-native와 firebase로 만드는 앱 Example


## 스택
- react-native v6
    - 100% hooks & functional component
    - context api
    - apollo
- firebase
- typescript

## 필요
- 파이어베이스 계정

## 제작순서
1. [typescript로inti](https://facebook.github.io/react-native/docs/typescript)
2. [reactNavigation 설치](https://reactnavigation.org/docs/en/getting-started.html)
3. [firebase 연동](https://invertase.io/oss/react-native-firebase/quick-start/existing-project)
    - [페키지명 바꾸고 하자](https://romeoh.tistory.com/entry/React-Native-%ED%8C%A8%ED%82%A4%EC%A7%80%EB%AA%85-%EB%B2%88%EB%93%A4%EB%AA%85-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0-Package-Bundle-Android-iOS)
    - 앱 이름도 string.xml 에서 변경하자
    - 파이어베이스 로그인해서 프로젝트 생성후 google-services.json 
4. [vector icons 연동](https://github.com/oblador/react-native-vector-icons)
    ```
    // android/app/build.gradle에 이거한줄이면 충분
    apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
    ```
5. Redux & persist
    ```
    yarn add redux react-redux @types/react-redux
    npm install redux-persist
    yarn add @react-native-community/async-storage
    ```