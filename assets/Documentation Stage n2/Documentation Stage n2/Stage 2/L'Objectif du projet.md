L'arborescence
![[Pasted image 20260106171259.png]]

Il y'a un déjà un programme Java qui permet : 
- de récupérer des bulletins de Paye. 
- Puis les convertit techniquement en format PeopleDoc 
- Pour ensuite le placer au bon endroit pour qu'ils soient dans le PeopleDoc -> ce mode opératoire fonctionne pour la France
Le Gros Problème actuel est que: 
-> Pour les pays comme la Suisse et Singapour ADP ne permet pas l'automatisation. 
Solution : mettre en œuvre une "interface" web qui permet a chaque usagers de s'authentifier avec un User(matricule) et un MDP, qui recevra
les fichiers( Bulletin de paie) puis manuellement déclenchera la conversion

# L'IDEE CENTRALE 

Adapter le monteur de conversion de Java en changeant la façon de l'utiliser. 

Avant =
```
Robot -> Serveur -> API -> Conversion 
```
Après =
```
Utilisateur -> page Web -> upload fichier -> Conversion 
```

On passe d'une API appelé automatiquement à une application utilisées par des ~~humains~~ . 

# OBJECTIF FINAL 

Créer une application Spring Boot qui permet : 
1.  Authentification 
2. Charger un fichier ADP 
3. Lancer la conversion
4. Préparer les fichiers pour PeopleDoc 

# CE QUE L'APPLICATION DOIT FAIRE 

Lors de l'authentification il faut faire en sorte que les ID d'un utilisateur de Suisse n'est pas accès à ceux de Singapour. 

# 1) AUTHENTIFICATION (TRES IMPORTANT)

on manipule des données sensibles( Bulletins de paie )
  Donc : 
   - pas d'accès public
   - pas de mots de passe bricolé
  Idéalement :
     - SSO SCOR 
 - l'application récupère : 
     - l'identité de l'utilisateur 
     - sans stocker le MDP 

# 2) LA GESTION DE DROITS PAR PAYS 

Tous les utilisateurs ne peuvent tous faire 

Exemples : 
- RH FRANCE 
- RH SINGAPOUR 
- IT -> tous les pays 

Donc il faut : 
- Des rôles
- un périmètre par pays 


# 3) ECRAN SIMPLE ET UPLOAD DE FICHIERS ADP 

il faut juste : un écran web (un bouton simple : (charger le fichier, lancer la conversion))

Pour le upload, Quand l’utilisateur :

• sélectionne le fichier ADP
• clique sur “charger”

L’application :

• reçoit le fichier
• le stocke sur le serveur
• vérifie qu’il est valide

# 4) LA CONVERSION EXISTANTE

On ne fait seulement que réutilisé le moteur Java existant en : 
- appeler la conversion avec le bon fichier au bon moment 
# 5) PREPARER L'ENVOI VERS PEOPLEDOC

- Les fichiers convertis sont déposés au bon endroit
- Un traitement automatique (existant ou futur) les enverra vers PeopleDoc