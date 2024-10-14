# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).



## Get started
1. Follow these instructions to be able to install native Vesper SDK dependencies
### iOS

You will need to provide your credentials in ~/.netrc file to be able to authenticate during pod install phase. About .netrc file Add this inside your ~/.netrc file or create new file if you do not have one

machine d1st2jzonb6gjl.cloudfront.net
login <login>
password <password>
Android VesperSDK auth

### Android
You will need to provide your JitPack authorisation token in the app.json

"android": {
  "extraMavenRepos": [
    "https://muxinc.jfrog.io/artifactory/default-maven-release-local",
    {
      "url": "https://jitpack.io",
      "credentials": {
        "username": "<AUTH_TOKEN>"
      }
    }
  ],
},

2. Setup
    Fill .env file with Vesper SDK config

3. Install dependencies

   ```bash
   npm install
   ```
    
4. Start the app

   ```bash
    # iOS
    npm run ios
    
    # Android
    npm run android
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
