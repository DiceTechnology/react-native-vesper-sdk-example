## Get started
1. Follow these instructions to be able to install native Vesper SDK dependencies
### iOS
You will need to provide your credentials in ~/.netrc file to be able to authenticate during pod install phase. Add this inside your ~/.netrc file or create new file if you do not have one

machine d1st2jzonb6gjl.cloudfront.net
login <login>
password <password>

### Android
You will need to provide your JitPack authorisation token
//TODO

2. Setup
    Fill src/constants/CONFIG.ts file with Vesper SDK config

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
