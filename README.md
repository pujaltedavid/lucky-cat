# lucky-cat

> Source code, tools and small documentation created for luckycat translator.

Welcome to [LuckyCat](https://luckycat.tk), the first Human to Cat and viceversa unique online translator.

The current web app can be visited at https://luckycat.tk/

Cats are above humans, don't deny it. Sometimes you want to be a cat but you don't know how to express yourself. Now you can.

<img src="/readme-files/home-desktop.png" alt="Home translation example in desktop mode">

![Homepage translation example desktop mode gif](https://github.com/pujaltedavid/lucky-cat/blob/master/readme-files/desktop-gif.gif)

<img src="/readme-files/home-phone.jpg" alt="Home translation example in mobile mode" width="300">

### Jump quickly

- [What is LuckyCat](#what-is-luckycat)
- [About the Algorithm](#about-the-algorithm)
- [Multi Language support](#multi-language-support)
- [Usage](#usage)
- [Some technical aspects](#some-technical-aspects)
- [Easter egg](#easter-egg)

# What is LuckyCat

LuckyCat is basically a web app that I did when I was sick at home, it took around 5 days so chill 😵🤙.

It is a translator between human languages and cat language. However, since science has not gone too deep in the field of animal communication, the translation works as a **encoder-decoder** using a simple **language model**. This translator is unique and commutative, that is, a translation from human to cat is the same as for the cat to human $human(cat(human)) = human$.

However, not all the cats from all the countries speak equally. A spanish cat communicates differently than an english one, that is why the translator is available in different languages (it's not because of the language model, is due to the cat culture 🐈).

If you are going to translate something in another language, you can change to that language so the translation would have a better result.

# About the Algorithm

The translation algorithm can be splitted into two parts. The human-to-cat and the cat-to-human, encoder and decoder respectively from now on.

A quick way to understand the algorithm is:

encoder: human word => number => cat word

decoder: cat word => number => human word

## Encoder

The encoder only encodes [ASCII](https://www.asciitable.com/) lowercase characters, hence all the input from this encoder is lowercased and [unidecoded](https://www.npmjs.com/package/unidecode). This helps storing larger data and produce better translations.

### Human to number

It uses a small language model. This model refers to the most common words in a language. This list of frequency words is sorted into most to least frequent. Then, each word from this language is mapped into each word from cat language.

From now on, our data structure that contains words would be referred as a language.

Currently, the languages consist of 65500 words. However, not all words that the user may type exist in the frequency list, that is why not only entire words are stored on the language. The language also uses some common syllable occurences or joint characters that are common. That happens a lot in catalan language, where weak pronouns are used. Another use case is verb conjugation.

So, when a word can not be mapped, it is splitted into parts that are mapped separately. There will always be a splitted mapping, as all the ascii characters appear in the languages (the base case will be a single character).

Let's see an example for the spanish language. Currently, the word _carbonara_ does not exist in the language (our data structure), so it is automatically splitted into _carbon_ + _ara_, and each part mapped to cat language. One can see this by typing it on the webpage and using spanish language.

How are this splittings encoded? Each word is separated from others by a **space**, but if there is a splitted mapping, the separation is a **comma**.

|        |            |      |      |     ,      |        |       |        |         |
| :----: | :--------: | :--: | :--: | :--------: | :----: | :---: | :----: | ------- |
| quiero | espaguetis |  a   |  la  |   carbon   |  ara   |  con  | mucho  | queso   |
| meeOow |  NeOoowW   | mEow | Meow | mEEoOowww, | mmeoww | meooW | mmeeOW | mmMEOWW |

### Number to cat

We have talked about how the words are recognised into our language, but how are they mapped into the cat language?

A list for the cat language (meowish) is also created, however not by frequency. Meowish consists of four characters: **meow**. However these characters can be pronounced differently. Each character can adopt lowercase and uppercase, and can be repeated up to three times to obtain all the combinations. Finally there are some extra characters, as cats have ancient words that are pronounced differently from the regular ones: **niau**. However this last ancient characters are not repeated and only used lowercase or uppercase.

These characters are combined to create up to 65536 combinations. Then this combinations are sorted by their length, so meow would come before mmmeeeooowww. There is an exception however, ancient meowish characters are least used, so they come at the end, behaving like longer characters.

Now the human and cat language are created, only the mappings have to be made. The first word of human language is mapped into the first word of meowish, and so on... pretty simple. This helps using less meowish characters for more frequent human words.

Example for catalan language (most common words):

| Catalan | Meowish |
| :-----: | :-----: |
|   que   |  meow   |
|   de    |  meoW   |
|   la    |  meOw   |
|    i    |  mEow   |
|   no    |  Meow   |
|    a    |  meoww  |
|   el    |  meOW   |
|   es    |  meoow  |

## Decoder

The decoder uses the same technique. For each type of meow, it looks for the mapping of the human language, if the separators are commas, it joins the words.

## Data structures

One can notice that this algorithm runs each time a user types a single character on the input, nearly without noticeable lag.

To store this mappings, a javascript map/object is used like this.

```javascript
humanToCat[humanWord] = catWord
catToHuman[catWord] = humanWord
```

Using this kind of object gives us constant $O(1)$ access time as it uses hash tables internally. It is pretty useful as regular arrays would give us linear $O(n)$ access time, being $n$ the length of the hole language.

When switching human languages, the same method is used, but new language objects are cached.

# Multi language support

![Homepage translation example desktop mode gif](https://github.com/pujaltedavid/lucky-cat/blob/master/readme-files/multi-language-phone.gif)

For now, the app supports the following human languages:

- english
- spanish
- catalan

The user can select the language that is going to use on their translation. This way, the selected language model is used, producing a more optimal translation result (shorter cat translation, see [Algorithm section](#about-the-algorithm)).

There are more to come in the future. For each language, a dataset of most frequent words is needed and the current languages contain about 65500 words each.

# Usage

Firebase is used as backend as a service (more on [Some technical aspects section](#some-technical-aspects)). Apart of the hosting, the data necessary for the translation is stored on Firebase Cloud Storage. This way, less bandwidth is used for hosting and only the needed language is downloaded, instead of all of them. Obviously, if the user switches between all the languages in their visit, all the languages will be download and cached on their browser.

The main aspects related to the web app daily usage limits are (according to Firebase limits as the day this is written):

- **50K read storage hits**. That means, 25K users that use a single language or $50,000 \over (n+1)$ users, being n the number of languages required for the visit (one hit for cat language and the others for the human languages).

- **1GB storage bandwidth**. The cat language has a size of 175KB and the human languages about 250KB. So, this leads to a limit of $10^6 \over 175 + 250 \cdot n$ users, being n the number of languages.

- **360MB of hosting bandwidth**. This is the most restrictive one, as the production build has a size of nearly 800KB. This is due to some libraries that can not be compressed. This is $360 / 0.8 = 480$ users.

Assuming the user uses two languages $n=2$, the first limit leads 16.6K, the second 14.8K and the third **480 daily users**.

For now, the limit is 480 daily users, however, in a future some libraries may be replaced, lowering down the bundle size, hence smoothing the third limit.

# Some technical aspects

The web app is build with JavaScript using [ReactJS](https://reactjs.org/).

As stated in [usage section](#usage), [Firebase](https://firebase.google.com/) is used as backend as a service. The language datasets are stored on Firebase [Cloud Storage](https://cloud.google.com/storage), separated from the web itself, that is stored on [Firebase Hosting](https://firebase.google.com/docs/hosting). This is to reduce hosting bandwidth (that is more expensive) and also reduce load time as not all the human languages are downloaded, only those asked for the user.

The datasets are preprocessed and cleaned with python.

The datasets are in a [csv](https://en.wikipedia.org/wiki/Comma-separated_values) format. They have a size of more than 500KB each (except meowish, that has around 319KB format). The meowish could be entirely calculated, however that would increase loading time and storage bandwidth is not an issue, as explained in [usage section](#usage).

However, the meowish csv contains mappings to the real meowish.

example: AAAA => meow, ABCD => mEooWw

But, how are they stored? The csv files are compressed using [lz-string](https://www.npmjs.com/package/lz-string) algorithm, a fast javascript implementation of [LZW algorithm](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Welch). This algorithm is known to produce good results with human language. This compression produces binary output that is stored on Cloud Storage, and downloaded and uncompressed each time. The compression and uncompression is nearly instantaneous.

This compression helps reducing the language size a bit.

| language |  csv  | csv compressed |  rate  |
| :------: | :---: | :------------: | :----: |
| meowish  | 319KB |     175KB      | 54.86% |
| english  | 513KB |     251KB      | 48.93% |
| spanish  | 562KB |     253KB      | 45.02% |
| catalan  | 577KB |     251KB      | 43.5%  |

LZW is intended to compress human language, however it did a great job with meowish. Maybe humans and cats are not so different after all?

Main libraries used:

- [react-fontawesome](https://fontawesome.com/v6/docs/) for cool free icons.
- [lz-string](https://www.npmjs.com/package/lz-string) for compressing the datasets.
- [react-device-detect](https://github.com/duskload/react-device-detect) for detecting browser devices (if using on mobile or not).
- [unidecoded](https://www.npmjs.com/package/unidecode) to convert UTF-8 to a representation in US-ASCII characters.

# Easter Egg

The cat likes to be petted, however **not too much** as there is so much work to do on the [cat kingdom](https://ghibli.fandom.com/wiki/The_Cat_Returns#To_the_Cat_King's_Palace).
