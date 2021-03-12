# Le Bus Magique Twitch Giveaways

Ce bot récupère les achats de tickets avec les points de chaîne et les enregistre, tant qu'il est actif.

## Installer le bot

``npm install``

## Configurer le bot

Créer un fichier .env avec les informations suivantes :

```
PORT=0000
CHANNEL=0000000
REWARD=0abcde1f-34gh-5678-9ij0-123456klmno7
```

- PORT : port à écouter, exemple : 3000 (http://localhost:3000)
- CHANNEL : identifiant de la chaîne Twitch
- REWARD : identifiant de la récompense personnalisée

## Démarrer le bot

``node index.js``

## Arrêter le bot

Utilisez la combinaison de touches : Ctrl+C.

## OBS Studio

Créer une source "Navigateur" :
- URL : http://localhost:3000
- Largeur : largeur de votre écran
- Hauteur : hauteur de votre écran

Cocher :
- Désactiver la source quand elle n'est pas visible
- Rafraîchir le navigateur lorsque la scène devient active

Pour activer les boutons, clic droit sur la scène > Ineragir.

Les boutons, de gauche à droite :
- Recharger la fenêtre (et donc les tickets et le gagnant)
- Révéler le gagnant
- Valider le gagnant et supprimer son ticket
- Supprimer tous les tickets

**Attention :** les tickets sont enregistrés en base de données (SQLite), donc lorsque vous effectuez une action (valider le gagnant, supprimer tous les tickets), cela n'a d'effet que sur la base de données. **Il faut penser aussi à compléter les demandes sur Twitch.**
