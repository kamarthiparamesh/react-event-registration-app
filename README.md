# Event Registration app

This is a ready-to-use reference app that showcases how to implement Affinidi Login and request data from AIV 

### Setup App

Setting up the reference app is easy, just follow these steps:  
1. Download baseline application code from [linke here](here) and extract the **event-registration-app.zip** file.

```bash
cd event-registration-app
```

2. Unzip the downloaded repository and open it in Visual Studio Code or similar IDE.

3. Open a new terminal in IDE to make further changes (e.g. VSCode > Terminal > New Terminal)

4. Install the dependencies:

```bash
npm install
```

5. Install Affinidi AIV Client Extension NPM package

```bash
npm install @affinidi/client-aiv-extension
```  

6. Create a `.env` file:
```bash
cp .env.example .env
```

7. Check the Application is running:
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the application is running fine.


### Update .env file with Project Scope Token for VP verification
1. Follow the steps to generate token from the readme file under `/scripts/README.MD`

2. Open `.env` file and update the environment variable `PROJECT_SCOPE_TOKEN` with the token generated from previous step
```bash
PROJECT_SCOPE_TOKEN="Copy the contents from file /scripts/token.txt"
```
Note: If Project scope token not set, then a warning will be logged on server and VP verification will be skipped


