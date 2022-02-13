# Before running the app

I can recommend [vscode](https://code.visualstudio.com/) as an all purpose text editor and for following this README. You should have this repository checked out with [git](https://git-scm.com/downloads) and [node.js](https://nodejs.org/en/) installed.

# Running the app

go to the app folder (`cd app`)

initially you need to install dependencies with `npm install`

then to run the app as a react application do `npm start` or `npx @ionic/cli serve`.

to run it inside storybook do `npm run storybook`

# Managing Questions

The questions are loaded as files from `/app/public/assets/data`.

First the App loads the `bundles.json` file and it loads the `[id].json` file for each bundle. So if the `bundles.json` file looks like this

```
[
    {
        "id": "hp1",
        "name": "Harry Potter - 1 Philosopher’s Stone"
    },
    {
        "id": "hp2",
        "name": "Harry Potter - 2 Chamber of Secrets"
    },
    {
        "id": "hp3",
        "name": "Harry Potter - 3 Prisoner of Azkaban"
    }
]
```

the App knows 3 Harry Potter Books and will download the files `hp1.json`, `hp2.json` and `hp3.json` from the `/app/public/assets/data` folder.

## Adding a new bundle

Now if you want to add a new bundle you would first create this file and then add a new entry in the `bundles.json` (do not forget to set the commas correctly!)

There is a script in the `/scripts` folder that helps converting a plaintext file into a json file containing a bundle of questions.

You can run the script with `node convert.js ./example.txt`. Then copy the `example.json` file to `/app/public/assets/data` and add `{ "id": "example", "name": "My Example Bundle" }` to the `bundles.json` file.

## Adding a new question

You can add a new question by editing the `.json` file directly or by regenerating it using the convert script.
