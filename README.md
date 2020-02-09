# RN-firebase-fullstack
react-native와 firebase로 만드는 앱 Example


## 스택
- react-native v6.15
    - 100% hooks & functional component
    - redux
- firebase
- typescript

## 디자인
- https://xd.adobe.com/view/e395ed49-30ac-40a2-62f4-710b3ae04de4-95a4/

## 필요
- 구글계정
    - 파이어베이스
    - PlayStore
    - ADMOB
- 페이스북 (페이스북 로그인 용)

## 앱 순서
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
    `yarn add redux react-redux @types/react-redux`
    `npm install redux-persist`
    `yarn add @react-native-community/async-storage`
6. functions

## 서버 순서
1. 파이어베이스에 로그인
    `firebase login`
2. [firebase init functions](https://firebase.google.com/docs/functions/typescript)
    - 로컬에서 실행하는 방법 (Hot load) server/functions level에서
        - 터미널 1
          `yarn build --watch`
        - 터미널 2
            `yarn start`
3. [firestore 접속 하기](https://stackoverflow.com/a/58140389)
## 알아둘것
#### 페이스북 로그인
1. https://developers.facebook.com/ 요기서 앱만들고
    - 페이스북 로그인 추가
    - 키해시 **Xo8WBi6jzSxKDVR4drqm84yr9iU=** 이거로 추가 (0.61.5 버전 공용 디버그키)
    - SSO도 켜주면됨
    - firebase에서 facebook로그인 키면서 받을수 있는 OAuth주소를 facebook dev에 등록
2. 나머지는 [요기참조](https://invertase.io/oss/react-native-firebase/v6/auth/social-auth#facebook)
3. 빌드하다가 **Task :app:transformDexArchiveWithExternalLibsDexMergerForDebug FAILED**이런 버그 발생시
    ```
    // android/app/build.gradle
    defaultConfig {
            ........
            multiDexEnabled true   // <--- this line
    }
    ```
4. [자세한 내용은 커밋을 통해 확인가능](https://github.com/KoreanThinker/RN-firebase-fullstack/commit/6d76d0fc1cca67b39ce36fe476176fef740d82f7)
#### 구글 로그인
1. [이거](https://invertase.io/oss/react-native-firebase/v6/auth/social-auth#google)보고 따라하면됨
2.  SHA-1 인증서를 등록해야되는데 아래 명령어로 확인이 가능하다 (project/app/android에서) / release후에는 playconsole에서 확인가능하다
    ```
    ./gradlew signingReport

    주의!!! 여러가지 패키지 들이 뜰텐데 Task :app:signingReport이거 안에 SHA1로 하면된다 Store주소 확인하고쓰자
    ```
3. [자세한 내용은 커밋을 통해 확인가능](https://github.com/KoreanThinker/RN-firebase-fullstack/commit/ea7cf2e670483c19575a7a7e19a9d078d5710279)
#### GOOGLE ADMOB
1. [링크](https://invertase.io/oss/react-native-firebase/v6/admob/quick-start)보고 따라하면됨
2. [자세한 내용은 커밋을 통해 확인가능](https://github.com/KoreanThinker/RN-firebase-fullstack/commit/474215326c204abbeb5eb51edd0273d12cba1e59)

#### 채팅 백엔드
- https://github.com/JinHoSo/firebase-chat-server
- 위에 링크 참고
#### splash & icon
- https://dev-yakuza.github.io/ko/react-native/react-native-splash-screen/
- https://dev-yakuza.github.io/ko/react-native/react-native-make/

위에 두개를 참조할 것 만약 안된다면 MainActivaty.java의 onCreated 확인바람 (아래 스플레시 호출시 mainactivity 변경이 생김)
```
 // 스플레시 app level에서
 react-native set-splash --platform android --path ./src/assets/splash.png --resize cover --background "#ffffff"
 // 아이콘 app level에서
 react-native set-icon --path ./src/assets/icon.png
```
#### release
- https://dev-yakuza.github.io/ko/react-native/android-running-on-device/
- 커밋 참조바람
- google signin sha-1
    - playconsole에서 찾을 수 있다.
- facebook release key hash
    - https://developers.facebook.com/docs/android/getting-started?locale=ko_KR#release-key-hash
    - 위링크보고 따라하면 된다 (CMD로 하면되고 명령 실행하는 위치는 상관없다)
    ```
    // 형식
    keytool -exportcert -alias <RELEASE_KEY_ALIAS> -keystore <RELEASE_KEY_PATH> | PATH_TO_OPENSSL_LIBRARY\bin\openssl sha1 -binary | PATH_TO_OPENSSL_LIBRARY\bin\openssl base64
    // 예시
    keytool -exportcert -alias koreanthinker -keystore C:\Users\HYUN\project\rn-firebase-fullstack\app\android\app\rn-firebase-fullstack-release-key.keystore | C:\SSL\bin\openssl sha1 -binary | C:\SSL\bin\openssl base64
    ```
#### 보안상 업로드하지 못한 파일들
- google-services.json
    - 파이어베이스에서 다운받을 수 있음
    - android/app에 넣으면됨
- secret.json
    - 비밀번호 같은것들을 저장해놓기 위해 만들어 놨다
    - ```const secret = require('../../../secret.json');``` 이런식으로 사용한다
- firebase.json
    - admob appid정보가 들어있다

- 파이어스토어 접속 키
    - [링크](https://stackoverflow.com/a/58140389)보고하면됨
    - ./server/functions/key level 에 넣고 사용하면됨