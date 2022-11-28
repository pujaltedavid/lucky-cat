# lucky-cat

> Source code, tools and small documentation created for luckycat translator.

Welcome to **LuckyCat**, the first Human to Cat and viceversa unique online translator. Sometimes you want to be a cat but you don't know how to express yourself.

The current web app can be visited at https://luckycat.tk/

<img src="/readme-files/home-desktop.png" alt="Home translation example in desktop mode">

![Homepage translation example desktop mode gif](https://github.com/pujaltedavid/lucky-cat/blob/master/readme-files/desktop-gif.gif)

<img src="/readme-files/home-phone.jpg" alt="Home translation example in mobile mode" width="300">

### Jump quickly

- [What is LuckyCat](#what-is-luckycat)
- [About the Algorithm](#about-the-algorithm)
- [Multi Language support](#multi-language-support)
- [Some technical aspects](#some-technical-aspects)
- [Usage](#usage)
- [Easter egg](#easter-egg)

# What is LuckyCat

LuckyCat is basically a project that I did when I was sick at home, it took around 5 days so chill 😵🤙.

It is a translator between human languages and cat language. However, since science has not gone too deep in the field of animal communication, the translation works as a **encoder-decoder**. This translator is unique and commutative, that is, a translation from human to cat is the same as for the cat to human $human(cat(human)) = human$

However, not all the cats from all the countries speak equally. A spanish cat communicates differently than an english one, that is why the translator is available in different languages (it's not because of the language model, is due to the cat culture 🐈).

If you are going to translate something in another language, you can change to that language so the translation would have a better result.

# About the Algorithm

# Multi language support

![Homepage translation example desktop mode gif](https://github.com/pujaltedavid/lucky-cat/blob/master/readme-files/multi-language-phone.gif)

For now, the language supports the following human languages:

- english
- spanish
- catalan

There are more to come in the future. For each language, a dataset of most frequent words is needed and the current languages contain about 65500 words each.

# Some technical aspects

compression, storage to cloud storage

# Usage

Firebase is used for all the hosting. Apart of the hosting, the data necessary for the translation is stored on Firebase Cloud Storage. This way, less bandwidth is used for hosting and it is only downloaded the language needed, instead of all of them. Obviously, if the user switches between all the languages in their visit, all the languages are download and cached on their browser.

The main aspects related to the web app daily usage limits are (according to Firebase limits as the day this is written):

- **50K read storage hits**. That means, 25K users that use a single language or $50,000 \over (n+1)$ users, being n the number of languages required for the visit (one hit for cat language and the others for the human languages).

- **1GB storage bandwidth**. The cat language has a size of 175KB and the human languages about 250KB. So, this leads to a limit of $10^6 \over 175 + 250 \cdot n$ users, being n the number of languages.

- **360MB of hosting bandwidth**. This is the most restrictive one, as the production build has a size of nearly 800KB. This is due to some libraries that can not be compressed. This is $360 / 0.8 = 480$ users.

Assuming the user uses two languages $n=2$, the first limit leads 16.6K, the second 14.8K and the third **480 daily users**.

For now, that is the daily usage limit, however, in a future some libraries may be replaced, lowering down the bundle size, hence smoothing the third limit.

# Easter Egg
