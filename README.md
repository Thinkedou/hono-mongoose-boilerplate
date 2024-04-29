# Hono 🔥- Mongoose - Ts

_Copy .env.example to a .env file_
  

-  `npm install`
-  `npm run dev`

## Proposition de modèle
**creations**
 ```js   
 {
	imgUri: "https://cdn-www.konbini.com/files/2023/05/Sans-titre-15.png?width=1920&quality=undefined&format=webp",
	prompt: "violet grimes with elves ears",
	categories: ["dall-e","fantasy" ],
	author: {
		firstName: "Jean-Michel",
		lastName: "AI"
	},
	publicationDate: "2024-02-15T11:34:43.542Z",
	createdAt: "2024-02-15T11:34:43.542Z",
	updatedAt: "2024-02-15T11:35:43.542Z"
}
```
**comments**
 ```js  
 {
	comment:"",
	isPublish:true,
	author: {
		firstName: "Maryse",
		lastName: "Comment"
	},
	creationParentRef:"65cdf6d3f25e19cef0a2ba92",
	publicationDate: "2024-02-15T12:34:43.542Z"
}
```


  ## ToDo
 - [ ] Renseigner les vars pour se connecter à votre instance Atlas
 - [ ] Créer un premier modèle mongoose simple "creations"
 - [ ] Brancher le /creations avec la bonne req mongo (all)
 - [ ] Compléter le modèle avec des contraintes
 - [ ] Brancher toutes les opérations CRUD sur /creations
 - [ ] Créer le modèle "comments" qui aura une ref vers son parent "creations"
 - [ ] Créer un queryHelper pour gérer les url query params (pagination, limit, projection)
 - [ ] Ajouter un middleware pour garder le nombre de comments synchro sur le parent

## Bonus
Quelques exemples de prompts ici: 

[public prompts](https://publicprompts.art/)

[best dalle-3 prompts](https://anakin.ai/blog/best-dalle-3-prompts/)

[Best Firefly promps](https://imaginewithrashid.com/21-best-adobe-firefly-prompts-for-amazing-pictures/)