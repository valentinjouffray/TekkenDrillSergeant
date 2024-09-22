# Tekken Drill Sergeant
## General use
This app is designed to be used on mobile and PC using Ionic as a frontend framework.

It serves as a way for users to reinforce their knowledge and execution in Tekken but can also be applied to many other fighting games in general.

This app can be used to take notes about drills that you want to train in order to learn or improve. It is useful most for this purpose and implements functionalities, that are not present in most note taking apps, to help you along the way.

## Presentation
The app consists of characters and their respective drills.

Characters are defined by their:
- Name
- Games
- Description

Drills are defined by their:
- Name
- Description
- Character
- Tags
## Functionalities
- Create drills
- Consult drills per characters
- Consult characters
## Capacitor functionalities
- Filesystem
## AI Disclaimer
Mock data is AI generated based on Tekken context. Hence why some drills may be nonsensical for people who actually play the game.

What constitutes mock data:
- Character sheets
- Drill sheets
## Compatible Android version
Android 14
## Possible errors when running on mobile device
### Compilation
- Missing sdk

You want to create a local.properties and write inside:
````ini
sdk.dir=C:\\Users\\UserName\\AppData\\Local\\Android\\sdk
````
Where Username is you username and be careful because the SDK folder can either be Sdk or sdk.
[Source](https://stackoverflow.com/a/48155800)
- Missing folder for drills

My android devices could create the drills folder, yours might not be able to.